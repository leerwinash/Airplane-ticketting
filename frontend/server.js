const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database("./bookings.db", (err) => {
    if (err) console.error("Database connection error:", err);
    else console.log("Connected to SQLite database");
});

// Create table
db.run(
    `CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        flight_id TEXT,
        class_type TEXT,
        travel_date TEXT,
        passengers INTEGER,
        total_price REAL
    )`
);

// API to get all bookings
app.get("/bookings", (req, res) => {
    db.all("SELECT * FROM bookings", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API to create a new booking
app.post("/bookings", (req, res) => {
    const { flight_id, class_type, travel_date, passengers, total_price } = req.body;

    db.run(
        `INSERT INTO bookings (flight_id, class_type, travel_date, passengers, total_price) VALUES (?, ?, ?, ?, ?)`,
        [flight_id, class_type, travel_date, passengers, total_price],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: "Booking created successfully" });
        }
    );
});

// API to delete a booking
app.delete("/bookings/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM bookings WHERE id = ?`, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Booking deleted successfully" });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
