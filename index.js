var express = require('express');
var app=express();
app.use(express.static(__dirname+'/frontend'));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/frontend/index.html");
})
app.get('/home',function(req,res){
    res.sendFile(__dirname+"/frontend/index.html");
})
app.get('/bookflight',function(req,res){
    res.sendFile(__dirname+"/frontend/bookflight.html");
})
app.get('/myflights',function(req,res){
    res.sendFile(__dirname+"/frontend/myflights.html");
})
var port=process.env.PORT || 3000;
app.listen(port,function(){
    console.log('site run on http://localhost:'+port);
});
function updateTotalPrice() {
    let classType = document.getElementById("class-type").value;
    let passengers = document.getElementById("passengers-count").value;

    let price = 0;
    if (classType.includes("First class")) price = 300;
    else if (classType.includes("Business class")) price = 200;
    else if (classType.includes("Economy class")) price = 100;

    let totalPrice = price * passengers;
    document.getElementById("total-price").innerText = `Total Price: $${totalPrice}`;
}

function bookFlight() {
    let totalPrice = document.getElementById("total-price").innerText;

    Swal.fire({
        title: "Booking Confirmed!",
        text: totalPrice,
        icon: "success",
        confirmButtonText: "OK"
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const bookButton = document.querySelector(".button-center");

    if (bookButton) {
        bookButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission

            const flightId = document.getElementById("flight-id").value;
            const classType = document.getElementById("class-type").value;
            const travelDate = document.getElementById("travel-date-time").value;
            const passengers = document.getElementById("passengers-count").value;

            if (!travelDate || passengers <= 0) {
                alert("Please select a valid date and number of passengers.");
                return;
            }

            // Create booking object
            const booking = {
                flightId,
                classType,
                travelDate,
                passengers,
            };

            // Retrieve existing bookings
            let bookedFlights = JSON.parse(localStorage.getItem("bookedFlights")) || [];
            bookedFlights.push(booking);

            // Store updated bookings
            localStorage.setItem("bookedFlights", JSON.stringify(bookedFlights));

            // Show success alert
            Swal.fire({
                title: "Flight Booked!",
                text: `Your flight ${flightId} on ${travelDate} has been booked.`,
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                window.location.href = "myflights.html"; // Redirect to My Flights page
            });
        });
    }
});
