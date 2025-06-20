// Donation Form Submission
document.getElementById('donationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const amount = document.getElementById('customAmount').value;
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const method = document.getElementById('paymentMethod').value;
    
    try {
        const response = await fetch('/api/donations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                fullName: name,
                email,
                paymentMethod: method
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to process donation');
        }

        alert(`Thank you, ${name}! Your donation of MK${amount} has been received. Check your email for confirmation.`);
        this.reset();
        document.querySelectorAll('.donation-amount').forEach(btn => btn.classList.remove('active'));
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your donation. Please try again later.');
    }
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                message
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to send message');
        }

        alert(`Thank you, ${name}! Your message has been sent. Check your email for confirmation.`);
        this.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again later.');
    }
});