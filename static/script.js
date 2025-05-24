// Pure vanilla JavaScript animations - no external dependencies

window.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const splashText = splash.querySelector(".splash-text");

    // Helper function for smooth animations
    function animate(element, properties, options = {}) {
        const duration = options.duration || 1000;
        const easing = options.easing || 'ease-out';
        const delay = options.delay || 0;
        
        return new Promise(resolve => {
            setTimeout(() => {
                const keyframes = [];
                
                if (properties.opacity) {
                    keyframes.push({
                        opacity: properties.opacity[0]
                    }, {
                        opacity: properties.opacity[1]
                    });
                }
                
                if (properties.scale) {
                    properties.scale.forEach((scale, i) => {
                        if (!keyframes[i]) keyframes[i] = {};
                        keyframes[i].transform = `scale(${scale})`;
                    });
                }
                
                if (properties.y) {
                    keyframes.push({
                        transform: `translateY(${properties.y[0]}px)`
                    }, {
                        transform: `translateY(${properties.y[1]}px)`
                    });
                }

                const animation = element.animate(keyframes, {
                    duration,
                    easing,
                    fill: 'forwards'
                });
                
                animation.onfinish = resolve;
            }, delay);
        });
    }

    // 🌟 Splash text entrance animation
    if (splashText) {
        splashText.style.opacity = '0';
        splashText.style.transform = 'scale(0.6)';
        
        animate(splashText, {
            opacity: [0, 1],
            scale: [0.6, 1]
        }, { duration: 1000 });
    }

    // 🚀 Combined splash screen exit animation
    const handleSplashExit = () => {
        if (!splash) return;
        
        if (splashText) {
            animate(splashText, {
                opacity: [1, 0],
                y: [0, -30]
            }, { duration: 600 }).then(() => {
                splash.style.opacity = '0';
                setTimeout(() => {
                    if (splash) splash.remove();
                }, 800);
            });
        } else {
            // Fallback if no splash text
            splash.style.opacity = '0';
            setTimeout(() => {
                if (splash) splash.remove();
            }, 1000);
        }
    };

    // Trigger splash exit after 2 seconds
    setTimeout(handleSplashExit, 2000);
});

// Load event for additional safety
window.addEventListener("load", () => {
    const splash = document.getElementById('splash');
    // Only run if splash still exists (backup removal)
    if (splash && splash.style.opacity !== '0') {
        setTimeout(() => {
            if (splash) {
                splash.style.opacity = '0';
                setTimeout(() => {
                    if (splash) splash.remove();
                }, 1000);
            }
        }, 3000); // Slightly longer delay for load event
    }
});

// 🔍 Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            document.querySelectorAll('.game-card').forEach(card => {
                const nameElement = card.querySelector('h2');
                if (nameElement) {
                    const name = nameElement.innerText.toLowerCase();
                    card.style.display = name.includes(query) ? '' : 'none';
                }
            });
        });
    }
});

// 🎮 Scroll-in animation for game cards with random delay
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const randomDelay = Math.random() * 300; // 0-300ms random delay
            
            setTimeout(() => {
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(50px)' },
                    { opacity: 1, transform: 'translateY(0px)' }
                ], {
                    duration: 800,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
            }, randomDelay);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize game card animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.game-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // 🧠 Animate header and buttons on scroll
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(40px)' },
                    { opacity: 1, transform: 'translateY(0px)' }
                ], {
                    duration: 700,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                headerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.header h1, .buttons .neon-button').forEach(el => {
        el.style.opacity = '0';
        headerObserver.observe(el);
    });
});