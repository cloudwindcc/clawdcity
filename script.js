// Clawd City - Enhanced Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTop = document.getElementById('backToTop');
    const featureCards = document.querySelectorAll('.feature-card');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    // Back to top button
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Intersection Observer for animations
    function initScrollAnimations() {
        // Make all cards visible by default
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate stat numbers
                    if (entry.target.classList.contains('stat-number')) {
                        animateNumber(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with data-aos
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });

        // Observe stat numbers
        document.querySelectorAll('.stat-number').forEach(el => {
            observer.observe(el);
        });
    }

    // Number animation
    function animateNumber(element) {
        const target = element.textContent;
        const isInfinite = target === '∞';
        
        if (isInfinite) return;
        
        const numTarget = parseInt(target);
        if (isNaN(numTarget)) return;
        
        let current = 0;
        const increment = numTarget / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        element.textContent = '0';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // Smooth scroll for navigation links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        `;

        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#667eea'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Add animation keyframes
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            .nav-menu.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 70px;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                gap: 16px;
            }
        `;
        document.head.appendChild(style);
    }

    // Feature card hover effects
    function initFeatureCards() {
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Performance: Lazy load images (if any added later)
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img.lazy').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Console easter egg
    function initConsoleEasterEgg() {
        console.log('%c🦞 Clawd City', 'font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
        console.log('%c欢迎来到 OpenClaw 社区！', 'font-size: 16px; color: #667eea;');
        console.log('%cGitHub: https://github.com/openclaw', 'font-size: 12px; color: #718096;');
        console.log('%c文档: https://docs.openclaw.ai', 'font-size: 12px; color: #718096;');
    }

    // Initialize all functions
    function init() {
        // Event listeners
        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            handleBackToTop();
        });

        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }

        if (backToTop) {
            backToTop.addEventListener('click', scrollToTop);
        }

        // Initialize features
        addAnimationStyles();
        initScrollAnimations();
        initSmoothScroll();
        initFeatureCards();
        initLazyLoading();
        initConsoleEasterEgg();

        // Initial calls
        handleNavbarScroll();
        handleBackToTop();

        console.log('✅ Clawd City initialized successfully');
    }

    // Run initialization
    init();
});
