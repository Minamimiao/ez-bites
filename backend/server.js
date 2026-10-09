const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const { createDatabaseConfig } = require("./database-config");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool(createDatabaseConfig());

app.get("/", (req, res) => {
    res.send("Restaurant Backend is running!");
});

app.get("/api/menu", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM menu_items ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            error: "Failed to fetch menu"
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});