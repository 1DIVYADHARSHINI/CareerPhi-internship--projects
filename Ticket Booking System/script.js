document.addEventListener("DOMContentLoaded", function() {
    // Show login modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementsByClassName('close')[0];

    if (loginBtn && loginModal && closeModal) {
        loginBtn.onclick = function() {
            loginModal.style.display = 'block';
        };

        closeModal.onclick = function() {
            loginModal.style.display = 'none';
        };

        window.onclick = function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
            }
        };
    }

    // Booking Form Logic
    document.getElementById('confirmBooking').addEventListener('click', function() {
        const concert = document.getElementById('concert').value;
        const ticketType = document.getElementById('ticketType').value;
        const quantity = document.getElementById('ticketQuantity').value;
        const errorMessage = document.getElementById('error-message');
        const bookingSummary = document.getElementById('bookingSummary');

        // Validate form inputs
        if (!concert || !ticketType || !quantity) {
            errorMessage.innerHTML = '<p>Please select all required fields</p>';
            errorMessage.style.color = 'red';
            return;
        } else {
            errorMessage.innerHTML = ''; // Clear any previous error messages
        }

        // Calculate ticket prices
        let pricePerTicket;
        if (ticketType === "General Admission") {
            pricePerTicket = 80;
        } else if (ticketType === "VIP") {
            pricePerTicket = 150;
        }

        const totalPrice = pricePerTicket * quantity;

        // Display booking summary
        document.getElementById('summaryConcert').innerText = concert;
        document.getElementById('summaryTicketType').innerText = ticketType;
        document.getElementById('summaryQuantity').innerText = quantity;
        document.getElementById('summaryPrice').innerText = `$${totalPrice}`;

        // Show booking summary section
        bookingSummary.style.display = 'block';
    });

    // Edit Booking
    document.getElementById('editBooking').addEventListener('click', function() {
        document.getElementById('bookingSummary').style.display = 'none';
    });

    // Confirm Booking
    document.getElementById('confirm').addEventListener('click', function() {
        alert('Your booking has been confirmed!');
        document.getElementById('booking-form').reset();
        document.getElementById('bookingSummary').style.display = 'none';
    });

    // Navigation logic for home page 'Book Now' button
    const bookNowBtn = document.querySelector('.btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            window.location.href = 'booking.html'; // Navigate to booking page
        });
    }
});
