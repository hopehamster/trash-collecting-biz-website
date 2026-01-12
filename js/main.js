/**
 * WE DO IT ALL - Main JavaScript
 * Handles navigation, animations, and interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initFormHandling();
    initAnimations();
    updateYear();
});

/**
 * Preloader
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });
}

/**
 * Navigation
 */
function initNavigation() {
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (navClose) {
        navClose.addEventListener('click', function() {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking nav links
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
            
            // Update active state
            navLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    navMenu.addEventListener('click', function(e) {
        if (e.target === navMenu) {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Scroll Effects - Active nav link on scroll
 */
function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function setActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav__link[href="#' + sectionId + '"]');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Run on load
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Form Handling
 */
function initFormHandling() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById("my-form-status");

    if (!form) return;

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        // Disable button and show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "Thanks for your submission!";
                status.className = "success-message";
                form.reset();
                showNotification('Thanks for your submission! We\'ll be in touch soon.', 'success');
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        showNotification(data["errors"].map(error => error["message"]).join(", "), 'error');
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form";
                        showNotification('Oops! There was a problem submitting your form', 'error');
                    }
                })
            }
        }).catch(error => {
            status.innerHTML = "Oops! There was a problem submitting your form";
            showNotification('Oops! There was a problem submitting your form', 'error');
        }).finally(() => {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
    
    form.addEventListener("submit", handleSubmit);

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            if (value.length >= 6) {
                value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6);
            } else if (value.length >= 3) {
                value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
            }
            e.target.value = value;
        });
    }
}

/**
 * Show Notification
 */
function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification notification--' + type;
    notification.innerHTML = `
        <span class="notification__icon">${type === 'success' ? '✓' : '!'}</span>
        <span class="notification__message">${message}</span>
        <button class="notification__close">&times;</button>
    `;

    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            background: #fff;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        .notification--success {
            border-left: 4px solid #4ade80;
        }
        .notification--error {
            border-left: 4px solid #f4c430;
        }
        .notification__icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #fff;
        }
        .notification--success .notification__icon {
            background: #4ade80;
        }
        .notification--error .notification__icon {
            background: #f4c430;
        }
        .notification__message {
            flex: 1;
            font-size: 14px;
            color: #333;
        }
        .notification__close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
            padding: 0;
            line-height: 1;
        }
        .notification__close:hover {
            color: #333;
        }
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;

    // Add styles to head if not already added
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Close button handler
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', function() {
        removeNotification(notification);
    });

    // Auto remove after 5 seconds
    setTimeout(function() {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    if (!notification) return;
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(function() {
        notification.remove();
    }, 300);
}

/**
 * Scroll Animations
 */
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease ' + (index * 0.1) + 's, transform 0.5s ease ' + (index * 0.1) + 's';
        observer.observe(card);
    });

    // Observe other elements
    const animateElements = document.querySelectorAll('.about__content, .gallery__item, .info-card, .feature');
    animateElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styles
    const animateStyles = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animateStyles;
    document.head.appendChild(styleSheet);

    // Parallax effect for hero waves
    const waves = document.querySelectorAll('.wave');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        waves.forEach(function(wave, index) {
            const speed = 0.1 * (index + 1);
            wave.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
        });
    });
}

/**
 * Update Copyright Year
 */
function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Smooth scroll polyfill for older browsers
 */
(function() {
    if ('scrollBehavior' in document.documentElement.style) {
        return;
    }

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

/**
 * Service Worker Registration (for PWA capabilities - optional)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('ServiceWorker registered:', registration.scope);
        //     })
        //     .catch(function(error) {
        //         console.log('ServiceWorker registration failed:', error);
        //     });
    });
}

/**
 * Console Easter Egg
 */
console.log('%c🗑️ WE DO IT ALL', 'font-size: 24px; font-weight: bold; color: #1a5a3a;');
console.log('%cJunk-Clean Ups & More | Las Vegas, NV', 'font-size: 14px; color: #ff6b35;');
console.log('%c📞 Call us: 562-538-7451', 'font-size: 12px; color: #666;');

