// Bistro Pirati - Piratski JavaScript 🏴‍☠️
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;

                try {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } catch (e) {
                    window.scrollTo(0, targetPosition);
                }

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                }
            }
        });
    });

    // Mobile menu toggle
    function createMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('mobile-active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('mobile-active');
                    navToggle.classList.remove('active');
                }
            });
        }
    }

    createMobileMenu();

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                alert('Molimo unesite sva obavezna polja / Please fill in all required fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Molimo unesite valjan email / Please enter a valid email address');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Šaljemo...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Ahoy! Vaša poruka je poslana kao u boci preko mora! 🏴‍☠️\n\nJavit ćemo vam se uskoro s detaljima o najnovijim BIGA pizzama!\n\nHvala što ste se pridružili našoj piratskoj posadi! ⚓');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Navbar scroll effect with pirate flair
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar like a pirate ship disappearing
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar like a ship emerging from the horizon
            navbar.style.transform = 'translateY(0)';
        }

        // Add treasure glow effect when at top
        if (scrollTop < 50) {
            navbar.style.boxShadow = '0 8px 32px rgba(255, 215, 0, 0.3)';
        } else {
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
        }

        lastScrollTop = scrollTop;
    });

    // Add scroll transition to navbar
    navbar.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease';

    // Optimized scroll animations - reduced performance impact
    function animateOnScroll() {
        const elements = document.querySelectorAll('.pizza-card, .feature-card, .info-card, .menu-category');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Simplified entrance effect to prevent overlapping
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });

        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // Add optimized CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: smoothEnter 0.5s ease-out forwards;
        }

        @keyframes smoothEnter {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);

    animateOnScroll();

    // Random pirate quotes that appear
    const pirateQuotes = [
        "Ahoy! Najbolje BIGA pizze u Jadranu! 🏴‍☠️",
        "Yo ho ho! Franko pravi čaroliju s tijestom! ⚓",
        "Batten down the hatches - Edward Blackbeard pizza je stigla! 🍕",
        "Crypto friendly kao što pirat treba! ⚡",
        "Torpedo di Fiume - samo za hrabre mornare! 🔥",
        "Avast ye! Premium sastojci iz cijele Europe! 💰"
    ];

    // Optimized pirate quotes - reduced frequency to prevent spam
    function showPirateQuote() {
        if (Math.random() < 0.2) { // Reduced to 20% chance
            const randomQuote = pirateQuotes[Math.floor(Math.random() * pirateQuotes.length)];

            const quotePopup = document.createElement('div');
            quotePopup.textContent = randomQuote;
            quotePopup.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--pirate-gold), var(--treasure-copper));
                color: var(--pirate-black);
                padding: 1rem 1.5rem;
                border-radius: 15px;
                box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
                max-width: 300px;
                z-index: 1001;
                font-size: 0.9rem;
                font-weight: 600;
                border: 2px solid var(--rum-brown);
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.4s ease;
                font-family: 'Rum Raisin', cursive;
            `;

            document.body.appendChild(quotePopup);

            // Simplified animation
            requestAnimationFrame(() => {
                quotePopup.style.opacity = '1';
                quotePopup.style.transform = 'translateY(0)';
            });

            // Remove after 3 seconds
            setTimeout(() => {
                quotePopup.style.opacity = '0';
                quotePopup.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    if (quotePopup.parentNode) {
                        quotePopup.parentNode.removeChild(quotePopup);
                    }
                }, 400);
            }, 3000);
        }
    }

    // Show quote on certain scroll positions
    let quoteShown = false;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

        if (scrollPercent > 25 && !quoteShown) {
            showPirateQuote();
            quoteShown = true;
        }

        if (scrollPercent < 10) {
            quoteShown = false;
        }
    });

    // Pizza card hover effects with pirate sounds (visual feedback)
    const pizzaCards = document.querySelectorAll('.pizza-card');
    pizzaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';

            // Add treasure sparkle effect
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 1.5rem;
                animation: sparkle 1s ease-out forwards;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.appendChild(sparkle);

            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Crypto section easter egg
    const cryptoSection = document.getElementById('crypto');
    if (cryptoSection) {
        let clickCount = 0;
        cryptoSection.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 3) {
                const cryptoMessage = document.createElement('div');
                cryptoMessage.innerHTML = '🏴‍☠️ EASTER EGG! 🏴‍☠️<br>Arr! Crypto pirati su pronašli digitalno blago! ⚡💰<br><small>Triple click aktivirao piratski crypto mod!</small>';
                cryptoMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, var(--pirate-black), var(--pirate-red));
                    color: var(--pirate-gold);
                    padding: 2rem;
                    border-radius: 20px;
                    box-shadow: 0 15px 50px rgba(255, 215, 0, 0.5);
                    z-index: 2000;
                    text-align: center;
                    border: 3px solid var(--pirate-gold);
                    font-family: 'Pirata One', cursive;
                    animation: treasureFound 2s ease-out;
                `;

                document.body.appendChild(cryptoMessage);

                setTimeout(() => {
                    cryptoMessage.remove();
                    clickCount = 0;
                }, 3000);
            }
        });
    }

    // Add treasure found animation
    const treasureStyle = document.createElement('style');
    treasureStyle.textContent = `
        @keyframes treasureFound {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(-180deg);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(treasureStyle);

    console.log('🏴‍☠️ Ahoy! Dobrodošli u Bistro Pirati! ⚓');
    console.log('🍕 Franko pravi najbolje BIGA pizze u Jadranu!');
    console.log('⚡ Crypto friendly piratska destinacija!');
});