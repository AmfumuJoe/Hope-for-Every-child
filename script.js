// Mobile Navigation Toggle
document.querySelector('.hamburger').addEventListener('click', function(e) {
    e.stopPropagation();
    const nav = document.getElementById('mainNav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});

// Close menu when clicking outside
document.addEventListener('click', function() {
    if (window.innerWidth <= 480) {
        document.getElementById('mainNav').style.display = 'none';
    }
});

// Prevent clicks inside nav from closing it
document.getElementById('mainNav').addEventListener('click', function(e) {
    e.stopPropagation();
});

// Reset nav display on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 480) {
        document.getElementById('mainNav').style.display = 'flex';
    } else {
        document.getElementById('mainNav').style.display = 'none';
    }
});

// Initialize nav display based on screen size
if (window.innerWidth <= 480) {
    document.getElementById('mainNav').style.display = 'none';
}

// Donation Form Functionality
function selectAmount(amount) {
    document.getElementById('customAmount').value = amount;
    
    const buttons = document.querySelectorAll('.donation-amount');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
}

document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = document.getElementById('customAmount').value;
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const method = document.getElementById('paymentMethod').value;
    
    alert(`Thank you, ${name}! Your donation of MK${amount} has been received. We'll email you at ${email} with payment instructions.`);
    
    this.reset();
    document.querySelectorAll('.donation-amount').forEach(btn => btn.classList.remove('active'));
});

// Contact Form Functionality
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
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        if (window.innerWidth <= 480) {
            document.getElementById('mainNav').style.display = 'none';
        }
    });
});