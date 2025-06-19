function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            // Update URL without reloading
            history.pushState({}, '', page);
        })
        .catch(err => console.error('Error loading page:', err));
}

// Handle browser back/forward buttons
window.onpopstate = function() {
    loadPage(window.location.pathname);
};

// Update the hamburger menu click handler
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

// Update smooth scrolling
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
