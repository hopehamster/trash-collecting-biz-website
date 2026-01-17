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
    initLightbox();
    initParallax();
    initLazyLoading();
    initMagneticButtons();
    initVideoPlayer();
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

    // Input sanitization function to prevent XSS
    function sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation (US format)
    function validatePhone(phone) {
        const phoneRegex = /^[\d\s\(\)\-]+$/;
        const digits = phone.replace(/\D/g, '');
        return phoneRegex.test(phone) && digits.length >= 10 && digits.length <= 15;
    }

    // Rate limiting check (client-side warning)
    function checkRateLimit() {
        const lastSubmit = localStorage.getItem('form_last_submit');
        if (lastSubmit) {
            const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit);
            const minInterval = 60000; // 1 minute
            if (timeSinceLastSubmit < minInterval) {
                return false;
            }
        }
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Get form inputs
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const phoneInput = form.querySelector('#phone');
        const messageInput = form.querySelector('#message');
        
        // Validate and sanitize inputs
        const name = nameInput ? sanitizeInput(nameInput.value.trim()) : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const message = messageInput ? sanitizeInput(messageInput.value.trim()) : '';
        
        // Validation
        if (!name || name.length < 2) {
            showNotification('Please enter a valid name (at least 2 characters).', 'error');
            if (nameInput) nameInput.focus();
            return;
        }
        
        if (!email || !validateEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            if (emailInput) emailInput.focus();
            return;
        }
        
        if (!phone || !validatePhone(phone)) {
            showNotification('Please enter a valid phone number.', 'error');
            if (phoneInput) phoneInput.focus();
            return;
        }
        
        if (message.length > 5000) {
            showNotification('Message is too long. Please keep it under 5000 characters.', 'error');
            if (messageInput) messageInput.focus();
            return;
        }
        
        // Rate limiting check
        if (!checkRateLimit()) {
            showNotification('Please wait a moment before submitting again. Thank you!', 'error');
            return;
        }
        
        // Update form values with sanitized data
        if (nameInput) nameInput.value = name;
        if (emailInput) emailInput.value = email;
        if (messageInput) messageInput.value = message;
        
        // Set _replyto field for FormSubmit.co (allows recipient to reply directly to sender)
        const replyToField = form.querySelector('#form-replyto');
        if (replyToField) {
            replyToField.value = email;
        }
        
        const data = new FormData(event.target);

        // Disable button and show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Store submission time for rate limiting
        localStorage.setItem('form_last_submit', Date.now().toString());

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
                    if (data.error) {
                        status.innerHTML = data.error;
                        showNotification(data.error, 'error');
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form";
                        showNotification('Oops! There was a problem submitting your form', 'error');
                    }
                }).catch(() => {
                    status.innerHTML = "Thanks for your submission!";
                    status.className = "success-message";
                    form.reset();
                    showNotification('Thanks for your submission! We\'ll be in touch soon.', 'success');
                });
            }
        }).catch(error => {
            console.error('Form error:', error);
            status.innerHTML = "Oops! There was a problem submitting your form";
            showNotification('Oops! There was a problem submitting your form. Please try again or call us directly.', 'error');
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
 * Lightbox Gallery
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery__item img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox__close">&times;</button>
        <button class="lightbox__prev">‹</button>
        <button class="lightbox__next">›</button>
        <div class="lightbox__content">
            <img class="lightbox__image" src="" alt="">
            <div class="lightbox__caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(img => ({
        src: img.src,
        alt: img.alt,
        caption: img.closest('.gallery__item').querySelector('.gallery__label')?.textContent || ''
    }));

    function openLightbox(index) {
        currentIndex = index;
        const img = images[index];
        lightbox.querySelector('.lightbox__image').src = img.src;
        lightbox.querySelector('.lightbox__image').alt = img.alt;
        lightbox.querySelector('.lightbox__caption').textContent = img.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    }

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox__next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', prevImage);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

/**
 * Enhanced Parallax Effects
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroContent = hero.querySelector('.hero__content');
                
                if (heroContent && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
                }

                // Parallax for background
                if (scrolled < window.innerHeight) {
                    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn--primary, .btn--secondary');
    
    buttons.forEach(button => {
        button.classList.add('btn--magnetic');
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

/**
 * Video Player
 */
function initVideoPlayer() {
    const videoContainer = document.querySelector('.about__video-container');
    const video = document.getElementById('team-video');
    const playButton = document.getElementById('video-play-button');
    
    if (!video || !videoContainer) return;
    
    const videos = [
        'videos/team-action-1.mov',
        'videos/team-action-2.mov',
        'videos/team-action-3.mov',
        'videos/team-action-palm-tree.mov'
    ];
    
    // Reorder videos: team actions first, then palm tree at the end
    // This ensures team videos play together, then palm tree video
    
    let currentVideoIndex = 0;
    let isPlaying = false;
    
    function loadVideo(index) {
        currentVideoIndex = index;
        const videoSrc = videos[currentVideoIndex];
        console.log(`🔄 Loading video ${currentVideoIndex + 1}: ${videoSrc}`);
        console.log(`📹 Current video src before change: ${video.src}`);
        
        // Pause and reset current video
        video.pause();
        video.currentTime = 0;
        
        // Add loading class for fade effect
        video.classList.add('loading');
        
        // Completely remove the src to force browser to release the old video
        const oldSrc = video.src;
        video.src = '';
        video.load();
        
        // Small delay to ensure browser releases old video
        setTimeout(() => {
            // Set new source with cache busting to prevent browser caching
            const newSrc = videoSrc + '?v=' + currentVideoIndex + '&t=' + Date.now();
            video.src = newSrc;
            
            // Force reload
            video.load();
            
            // Also clear any potential loop behavior
            video.loop = false;
            
            console.log(`✅ New video src set to: ${video.src}`);
            console.log(`🎬 Video element readyState: ${video.readyState}`);
        }, 50);
    }
    
    function playVideo() {
        // If video hasn't been loaded yet, load the first one
        if (!video.src || video.src === '') {
            loadVideo(0);
        }
        
        video.play().then(() => {
            videoContainer.classList.add('playing');
            isPlaying = true;
        }).catch(err => {
            console.log('Video play error:', err);
        });
    }
    
    function pauseVideo() {
        video.pause();
        videoContainer.classList.remove('playing');
        isPlaying = false;
    }
    
    // Play on click
    videoContainer.addEventListener('click', () => {
        if (video.paused || video.ended) {
            playVideo();
        } else {
            pauseVideo();
        }
    });
    
    // Play button click
    if (playButton) {
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            playVideo();
        });
    }
    
    // Loop to next video when current ends
    video.addEventListener('ended', () => {
        console.log('🎬 Video ended event fired!');
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        console.log(`📹 Video ${currentVideoIndex + 1} ended. Loading video ${nextIndex + 1}...`);
        
        // Load the next video
        loadVideo(nextIndex);
        
        // Wait for video to be ready, then play
        video.addEventListener('loadeddata', function playNext() {
            console.log(`✅ Video ${nextIndex + 1} loaded, starting playback...`);
            video.classList.remove('loading'); // Remove loading class for fade in
            
            video.play().then(() => {
                console.log(`▶️ Now playing video ${nextIndex + 1} of ${videos.length}`);
            }).catch(err => {
                console.log('❌ Error playing next video:', err);
            });
            // Remove this listener so it doesn't fire multiple times
            video.removeEventListener('loadeddata', playNext);
        }, { once: true });
    });
    
    // Handle video load errors
    video.addEventListener('error', (e) => {
        console.log('Video error, trying next video');
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        if (nextIndex !== currentVideoIndex) {
            loadVideo(nextIndex);
            setTimeout(() => video.play(), 100);
        }
    });
    
    // Auto-play on hover (optional - can be removed if too aggressive)
    let hoverTimeout;
    videoContainer.addEventListener('mouseenter', () => {
        hoverTimeout = setTimeout(() => {
            if (video.paused || video.ended) {
                playVideo();
            }
        }, 2000); // Play after 2 seconds of hover
    });
    
    videoContainer.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        // Don't pause on mouse leave - let user control
    });
    
    // Initialize with first video (but don't autoplay)
    loadVideo(0);
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

