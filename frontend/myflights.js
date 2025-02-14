import React, { useEffect, useState } from "react";

const MyFlights = () => {
    const [bookedFlights, setBookedFlights] = useState([]);

    useEffect(() => {
        // Get booked flights from local storage
        const storedFlights = JSON.parse(localStorage.getItem("bookedFlights")) || [];
        setBookedFlights(storedFlights);
    }, []);
    document.addEventListener("DOMContentLoaded", function () {
        const flightContainer = document.getElementById("myFlightsContainer");
    
        // Retrieve booked flights from localStorage
        const bookedFlights = JSON.parse(localStorage.getItem("bookedFlights")) || [];
    
        if (bookedFlights.length === 0) {
            flightContainer.innerHTML = `<h2 class="text-center">You have not travelled with us yet :(</h2>
                <p class="text-center">Give us an opportunity to serve you, <a href="./bookflight.html">book your next flight with us</a></p>`;
        } else {
            let flightListHTML = `<h2 class="text-center">My Flights</h2><ul class="list-group">`;
    
            bookedFlights.forEach((flight, index) => {
                flightListHTML += `
                    <li class="list-group-item">
                        <strong>Flight:</strong> ${flight.flightId} <br>
                        <strong>Class:</strong> ${flight.classType} <br>
                        <strong>Date:</strong> ${flight.travelDate} <br>
                        <strong>Passengers:</strong> ${flight.passengers}
                    </li>`;
            });
    
            flightListHTML += "</ul>";
            flightContainer.innerHTML = flightListHTML;
        }
    });
    
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Flights</h2>
            {bookedFlights.length === 0 ? (
                <p>No flights booked yet.</p>
            ) : (
                <ul className="space-y-2">
                    {bookedFlights.map((flight, index) => (
                        <li key={index} className="border p-4 rounded-lg shadow">
                            <strong>{flight.airline}</strong> - {flight.flightNumber} <br />
                            <small>From {flight.departure} to {flight.destination}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyFlights;
