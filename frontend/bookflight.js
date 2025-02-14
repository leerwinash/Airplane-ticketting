function bookFlight() {
    let flightID = document.getElementById("flight-id").value;
    let classType = document.getElementById("class-type").value;
    let travelDate = document.getElementById("travel-date-time").value;
    let passengers = document.getElementById("passengers-count").value;

    let price = classType.includes("First class") ? 300 : classType.includes("Business class") ? 200 : 100;
    let totalPrice = price * passengers;

    let flightData = {
        flight_id: flightID,
        class_type: classType,
        travel_date: travelDate,
        passengers: passengers,
        total_price: totalPrice
    };

    // Save booking to localStorage
    let storedFlights = JSON.parse(localStorage.getItem("bookedFlights")) || [];
    storedFlights.push(flightData);
    localStorage.setItem("bookedFlights", JSON.stringify(storedFlights));

    console.log("Flights saved to localStorage:", storedFlights);

    // Send booking data to backend API
    fetch("http://localhost:3000/bookflight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flightData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Booking successful! Flight ID: " + data.flight_id);
        window.location.href = "myflights.html";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Booking failed. Please try again.");
    });
}
