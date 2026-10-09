const fs = require("node:fs");
const path = require("node:path");
const { Client } = require("pg");

const SSL_URL_OPTIONS = new Set([
    "ssl", "sslmode", "sslrootcert", "sslcert", "sslkey", "sslnegotiation"
]);
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function createDatabaseConfig(databaseUrl = process.env.DATABASE_URL) {
    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not set");
    }

    let url;
    try {
        url = new URL(databaseUrl);
        if (!["postgres:", "postgresql:"].includes(url.protocol)) {
            throw new Error("Invalid protocol");
        }
    } catch {
        // Avoid including a connection string or password in startup logs.
        throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL");
    }

    // pg lets URL SSL options override an explicit ssl object. Remove them so
    // neither sslmode=require nor sslmode=no-verify can disable verification.
    for (const key of [...url.searchParams.keys()]) {
        if (SSL_URL_OPTIONS.has(key.toLowerCase())) {
            url.searchParams.delete(key);
        }
    }

    // Use pg's actual host parsing, including duplicate ?host= parameters and
    // PGHOST defaults. Constructing a Client does not open a connection.
    let host;
    try {
        const parameters = new Client({
            connectionString: url.toString(),
            ssl: false
        }).connectionParameters;
        host = parameters.host.toLowerCase().replace(/^\[|\]$/g, "");
    } catch {
        throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL");
    }
    const isLocalDatabase = LOCAL_HOSTS.has(host);

    return {
        connectionString: url.toString(),
        ssl: isLocalDatabase
            ? false
            : {
                  rejectUnauthorized: true,
                  ca: fs.readFileSync(
                      path.join(__dirname, "certs", "aiven-ca.pem"),
                      "utf8"
                  )
              }
    };
}

module.exports = { createDatabaseConfig };
