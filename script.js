// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    document.querySelector('.hamburger').addEventListener('click', function() {
        const nav = document.getElementById('mainNav');
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });

    // Donation Form Functionality
    const donationAmounts = document.querySelectorAll('.donation-amount');
    donationAmounts.forEach(amount => {
        amount.addEventListener('click', function() {
            document.getElementById('customAmount').value = this.dataset.amount;
            
            // Remove active class from all buttons
            donationAmounts.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Donation Form Submission
    document.getElementById('donationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = document.getElementById('customAmount').value;
        const name = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const method = document.getElementById('paymentMethod').value;
        
        alert(`Thank you, ${name}! Your donation of MK${amount} has been received. We'll email you at ${email} with payment instructions.`);
        
        this.reset();
        donationAmounts.forEach(btn => btn.classList.remove('active'));
    });
    
    // Contact Form Submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        alert(`Thank you, ${name}! Your message has been sent. We'll contact you at ${email} soon.`);
        
        this.reset();
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu after click
            if (window.innerWidth <= 480) {
                document.getElementById('mainNav').style.display = 'none';
            }
        });
    });
});