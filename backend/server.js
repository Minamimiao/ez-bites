const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});