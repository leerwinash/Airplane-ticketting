const sqlite3 = require('sqlite3').verbose();

// Connect to the database (or create if it doesn't exist)
const db = new sqlite3.Database('./airline_ticketing.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Create a table for storing flight bookings
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        flight_id TEXT NOT NULL,
        class_type TEXT NOT NULL,
        travel_date TEXT NOT NULL,
        passengers INTEGER NOT NULL,
        total_price INTEGER NOT NULL
    )`, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Bookings table is ready.");
        }
    });
});

// Function to add a new booking
function addBooking(flightId, classType, travelDate, passengers, totalPrice) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO bookings (flight_id, class_type, travel_date, passengers, total_price) 
             VALUES (?, ?, ?, ?, ?)`,
            [flightId, classType, travelDate, passengers, totalPrice],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            }
        );
    });
}

// Function to get all bookings
function getBookings() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM bookings`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Function to delete a booking by ID
function deleteBooking(bookingId) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM bookings WHERE id = ?`, [bookingId], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ message: "Booking deleted successfully" });
            }
        });
    });
}

// Export functions to use in other files
module.exports = {
    addBooking,
    getBookings,
    deleteBooking
};
