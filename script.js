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