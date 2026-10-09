# Aiven PostgreSQL TLS verification

Remote PostgreSQL connections use the public Aiven project CA certificate in
`certs/aiven-ca.pem`, with `rejectUnauthorized: true`. Node verifies the server
certificate chain and hostname. There is no fallback that skips verification.
Local `localhost`, `127.0.0.1`, and `::1` connections keep TLS disabled for the
existing local development setup.

`DATABASE_URL` remains the only required connection environment variable.
SSL URL parameters are removed before passing the URL to `pg`, because `pg`
can otherwise replace the explicitly configured certificate verification.
Database credentials must remain in the ignored `.env` file or in Render's
environment variables. The bundled CA certificate is public and has no private
key; it can be committed with the backend.

Before deploying, test this CA against the actual Aiven `DATABASE_URL`. The
local configuration currently may point to a local database, so a local syntax
or development test alone does not establish that the certificate matches the
hosted database.

Deploy `server.js`, `database-config.js`, and `certs/aiven-ca.pem` together to
the existing Render backend. No Vercel configuration or database schema change
is needed. After deployment, check `/api/menu` on the Render service.

When Aiven notifies you of a project CA rotation, download the updated CA bundle
from the service's Overview / Connection information / CA Certificate section,
replace `certs/aiven-ca.pem`, test the connection, and deploy the updated file.
Do not re-enable `rejectUnauthorized: false` to bypass a certificate error.

References:
- https://aiven.io/docs/products/postgresql/howto/connect-node
- https://aiven.io/docs/platform/concepts/tls-ssl-certificates
- https://node-postgres.com/features/ssl
