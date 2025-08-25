/**
 * PORTFOLIO WEBSITE - MAIN JAVASCRIPT
 * ===================================
 * 
 * This file contains the core JavaScript functionality for Mihara Amandi's portfolio website.
 * It handles navigation, mobile menu, form validation, scroll animations, and typing effects.
 * 
 * ARCHITECTURE OVERVIEW:
 * - Class-based structure for better organization and maintainability
 * - Modular design with separate methods for different functionalities
 * - Event-driven architecture with proper event delegation
 * - Performance-optimized with debouncing and throttling
 * 
 * PERFORMANCE OPTIMIZATION NOTES:
 * - Use requestAnimationFrame for smooth animations
 * - Implement debouncing for scroll events
 * - Lazy load non-critical resources
 * - Use Intersection Observer for efficient scroll detection
 * - Minimize DOM queries and cache selectors
 * - Use passive event listeners where appropriate
 * - Implement service worker for caching
 * 
 * RESPONSIVE DESIGN DECISIONS:
 * - Mobile-first approach with progressive enhancement
 * - Touch-friendly interactions for mobile devices
 * - Adaptive navigation based on screen size
 * - Flexible form validation for different input types
 * 
 * ACCESSIBILITY FEATURES:
 * - Keyboard navigation support
 * - ARIA labels and roles
 * - Screen reader compatibility
 * - Focus management for modal dialogs
 * - Reduced motion support
 */

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupFormHandling();
        this.setupIntersectionObserver();
        this.setupTypingEffect();
        this.setupScrollEffects();
        this.setupProjectFilter();
        this.setupFilterButtonAnimations();
        this.setupPerformanceOptimizations();
        this.initializeNavigationAnimations();
    }

    initializeNavigationAnimations() {
        // Initialize navigation items with staggered animations
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        });

        // Initialize mobile menu items
        const mobileMenuItems = document.querySelectorAll('.mobile-nav-link');
        mobileMenuItems.forEach((item, index) => {
            item.style.animationDelay = `${0.1 + (index * 0.05)}s`;
        });

        // Add smooth scroll behavior to the page
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    // ===== NAVIGATION & SMOOTH SCROLLING =====
    setupNavigation() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        const header = document.querySelector('.modern-header');
        const mobileMenuBtn = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        
        // Scroll effect for header
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.modern-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    // Add click animation
                    this.addClickAnimation(link);
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update active navigation link
                    this.updateActiveNavLink(targetId);
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
        
        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Mobile menu close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        
        // Close mobile menu when clicking outside
        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    this.closeMobileMenu();
                }
            });
        }
        
        // Close mobile menu when clicking on links
        const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    addClickAnimation(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }

    addHoverAnimation(element) {
        element.style.transform = 'translateY(-2px)';
        element.style.transition = 'transform 0.2s ease-out';
    }

    removeHoverAnimation(element) {
        element.style.transform = 'translateY(0)';
    }

    setupHeaderScrollAnimation() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', this.throttle(() => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease-out';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
                header.style.transition = 'transform 0.3s ease-out';
            }
            
            lastScrollY = currentScrollY;
        }, 100));
    }

    updateActiveNavLink(targetId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current link
        const activeLink = document.querySelector(`a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateActiveNavLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.updateActiveNavLink(`#${sectionId}`);
            }
        });
    }



    toggleMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenu && mobileMenuBtn) {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
    }

    openMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenu && mobileMenuBtn) {
            mobileMenu.classList.add('active');
            mobileMenuBtn.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenu && mobileMenuBtn) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    // ===== FORM HANDLING =====
    setupFormHandling() {
        const contactForm = document.querySelector('#contact form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });

            // Real-time validation
            const formInputs = contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        const isValid = this.validateForm(data);
        
        if (isValid) {
            this.showLoadingState(form);
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                this.showSuccessMessage();
                form.reset();
                this.hideLoadingState(form);
            }, 2000);
        } else {
            this.showErrorMessage('Please fix the errors above.');
        }
    }

    validateForm(data) {
        let isValid = true;
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            this.showFieldError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }

        // Email validation
        if (!this.isValidEmail(data.email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Subject validation
        if (!data.subject || data.subject.trim().length < 5) {
            this.showFieldError('subject', 'Subject must be at least 5 characters long');
            isValid = false;
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            this.showFieldError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch (fieldName) {
            case 'name':
                if (!value || value.length < 2) {
                    this.showFieldError(fieldName, 'Name must be at least 2 characters long');
                    return false;
                }
                break;
            case 'email':
                if (!this.isValidEmail(value)) {
                    this.showFieldError(fieldName, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'subject':
                if (!value || value.length < 5) {
                    this.showFieldError(fieldName, 'Subject must be at least 5 characters long');
                    return false;
                }
                break;
            case 'message':
                if (!value || value.length < 10) {
                    this.showFieldError(fieldName, 'Message must be at least 10 characters long');
                    return false;
                }
                break;
        }
        
        this.clearFieldError(field);
        return true;
    }

    showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const errorElement = document.querySelector(`[name="${fieldName}"] + .error-message`) || 
                           this.createErrorElement(field);
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.classList.add('error');
    }

    clearFieldError(field) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.style.display = 'none';
            field.classList.remove('error');
        }
    }

    createErrorElement(field) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
        return errorElement;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showLoadingState(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }

    hideLoadingState(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
    }

    showSuccessMessage() {
        this.showNotification('Message sent successfully!', 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // ===== INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Trigger staggered animations for child elements
                    const staggeredElements = entry.target.querySelectorAll('.stagger-on-scroll > *');
                    if (staggeredElements.length > 0) {
                        entry.target.classList.add('animate');
                    }
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    }

    // ===== TYPING EFFECT =====
    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;

        const roles = [
            'Full-Stack Developer',
            'UI/UX Designer',
            'Problem Solver',
            'Creative Thinker'
        ];

        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeText = () => {
            const currentRole = roles[currentRoleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && currentCharIndex === currentRole.length) {
                // Pause at end
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typingSpeed = 500;
            }

            setTimeout(typeText, typingSpeed);
        };

        // Start typing effect after a delay
        setTimeout(typeText, 1000);
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translateY(${rate}px)`;
            });
        }

        // Navbar background on scroll
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // Progress bar for page scroll
        this.setupScrollProgress();
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transform origin-left';
        progressBar.style.transform = 'scaleX(0)';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            progressBar.style.transform = `scaleX(${scrollPercent})`;
        });
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    setupPerformanceOptimizations() {
        // Debounce scroll events with requestAnimationFrame
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                this.handleScroll();
            });
        }, { passive: true });
        
        // Throttle resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) return;
            resizeTimeout = setTimeout(() => {
                this.handleResize();
                resizeTimeout = null;
            }, 100);
        }, { passive: true });

        // Lazy load images
        this.setupLazyLoading();

        // Preload critical resources
        this.preloadResources();
        
        // Register service worker for caching
        this.registerServiceWorker();
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
        
        // Setup hero button animations
        this.setupHeroButtonAnimations();
    }
    
    handleScroll() {
        // Handle scroll events efficiently
        const scrollY = window.scrollY;
        this.updateActiveNavigation(scrollY);
    }
    
    handleResize() {
        // Handle resize events efficiently
        this.updateMobileMenu();
    }
    
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log(`${entry.name}: ${entry.value}`);
                    }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
            } catch (e) {
                console.warn('Performance monitoring not supported');
            }
        }
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // ===== HERO BUTTON ANIMATIONS =====
    setupHeroButtonAnimations() {
        const heroButtons = document.querySelectorAll('.hero-btn');
        
        heroButtons.forEach(button => {
            // Add click animation
            button.addEventListener('click', (e) => {
                this.addButtonClickEffect(button, e);
            });

            // Add hover sound effect (optional)
            button.addEventListener('mouseenter', () => {
                this.addButtonHoverEffect(button);
            });

            // Add ripple effect on click
            button.addEventListener('mousedown', (e) => {
                this.createRippleEffect(button, e);
            });
        });
    }

    addButtonClickEffect(button, event) {
        // Add loading state briefly
        button.classList.add('loading');
        
        setTimeout(() => {
            button.classList.remove('loading');
        }, 500);

        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    addButtonHoverEffect(button) {
        // Add subtle bounce effect
        button.style.animation = 'buttonBounce 0.3s ease-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 300);
    }

    createRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ===== PROJECT FILTER FUNCTIONALITY =====
    setupProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card.modern-card');
        const statusCount = document.querySelector('.status-count');
        const statusText = document.querySelector('.status-text');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                const count = button.getAttribute('data-count');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                this.filterProjects(filter, projectCards, statusCount, statusText, count);
                
                // Add click animation
                this.addFilterButtonClickEffect(button);
            });
        });
    }

    filterProjects(filter, projectCards, statusCount, statusText, count) {
        let visibleCount = 0;
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.classList.add('visible');
                card.style.animation = 'fadeInUp 0.6s ease-out';
                visibleCount++;
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });
        
        // Update status
        if (statusCount) {
            statusCount.textContent = visibleCount;
        }
        
        if (statusText) {
            const filterText = filter === 'all' ? 'all' : filter;
            statusText.innerHTML = `Showing <span class="status-count">${visibleCount}</span> projects`;
        }
        
        // Add staggered animation delay for visible cards
        const visibleCards = document.querySelectorAll('.project-card.modern-card.visible');
        visibleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // ===== FILTER BUTTON ANIMATIONS =====
    setupFilterButtonAnimations() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            // Add click animation
            button.addEventListener('click', (e) => {
                this.addFilterButtonClickEffect(button, e);
            });
            
            // Add hover sound effect (optional)
            button.addEventListener('mouseenter', () => {
                this.addFilterButtonHoverEffect(button);
            });
            
            // Add ripple effect on click
            button.addEventListener('mousedown', (e) => {
                this.createFilterRippleEffect(button, e);
            });
        });
    }
    
    addFilterButtonClickEffect(button, event) {
        // Add loading state briefly
        button.classList.add('clicking');
        
        setTimeout(() => {
            button.classList.remove('clicking');
        }, 200);
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    addFilterButtonHoverEffect(button) {
        // Add subtle bounce effect
        button.style.animation = 'filterBtnPulse 0.3s ease-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 300);
    }
    
    createFilterRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
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

        images.forEach(img => imageObserver.observe(img));
    }

    preloadResources() {
        // Preload critical CSS and fonts
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    // ===== UTILITY FUNCTIONS =====
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Export for use in other modules
window.PortfolioApp = PortfolioApp;
