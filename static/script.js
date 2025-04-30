// Scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

// Optional: basic search functionality
document.getElementById('searchBar').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.game-block').forEach(block => {
        const name = block.querySelector('strong').innerText.toLowerCase();
        block.style.display = name.includes(query) ? '' : 'none';
    });
});
