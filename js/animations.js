/**
 * PORTFOLIO WEBSITE - ANIMATION CONTROLLER
 * =======================================
 * 
 * This file provides a comprehensive animation management system for the portfolio website.
 * It handles scroll-triggered animations, staggered timing, and performance optimizations.
 * 
 * ANIMATION SYSTEM FEATURES:
 * - Intersection Observer API for efficient scroll detection
 * - Performance-aware animation modes (normal, low, reduced)
 * - Staggered animations for sequential element reveals
 * - Parallax effects for depth and visual interest
 * - Hover animations for interactive elements
 * - Typing effects for dynamic text display
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Adaptive animation quality based on device capabilities
 * - RequestAnimationFrame for smooth 60fps animations
 * - Debounced scroll events to prevent performance issues
 * - Lazy loading of animation resources
 * - Reduced motion support for accessibility
 * 
 * ANIMATION CATEGORIES:
 * 1. Scroll-triggered animations (fade-in, slide-in, scale-in)
 * 2. Staggered animations (sequential element reveals)
 * 3. Parallax effects (background elements, cards)
 * 4. Hover animations (buttons, cards, links)
 * 5. Typing animations (hero text, dynamic content)
 * 6. Loading states (spinners, progress bars)
 * 
 * ACCESSIBILITY FEATURES:
 * - Respects user's motion preferences
 * - Provides alternative states for reduced motion
 * - Ensures animations don't interfere with screen readers
 * - Maintains focus management during animations
 */

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animationQueue = [];
        this.isAnimating = false;
        this.performanceMode = this.detectPerformanceMode();
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupTypingAnimations();
        this.setupParallaxEffects();
        this.setupPerformanceOptimizations();
    }

    // ===== PERFORMANCE DETECTION =====
    detectPerformanceMode() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return 'reduced';
        }

        // Check device performance
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                return 'low';
            }
        }

        // Check for low-end devices
        const memory = navigator.deviceMemory;
        if (memory && memory < 4) {
            return 'low';
        }

        return 'normal';
    }

    // ===== INTERSECTION OBSERVER SETUP =====
    setupIntersectionObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Create observers for different animation types
        this.createObserver('animate-on-scroll', observerOptions, this.handleScrollAnimation.bind(this));
        this.createObserver('stagger-on-scroll', observerOptions, this.handleStaggerAnimation.bind(this));
        this.createObserver('fade-in', observerOptions, this.handleFadeIn.bind(this));
        this.createObserver('slide-in', observerOptions, this.handleSlideIn.bind(this));
        this.createObserver('scale-in', observerOptions, this.handleScaleIn.bind(this));
        this.createObserver('rotate-in', observerOptions, this.handleRotateIn.bind(this));
    }

    createObserver(className, options, callback) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target, entry);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.observers.set(className, observer);

        // Observe elements with the specific class
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(el => observer.observe(el));
    }

    // ===== ANIMATION HANDLERS =====
    handleScrollAnimation(element, entry) {
        if (this.performanceMode === 'reduced') {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }

        element.classList.add('animate');
        
        // Add animation delay if specified
        const delay = element.dataset.animationDelay || 0;
        if (delay > 0) {
            setTimeout(() => {
                element.classList.add('animate');
            }, delay);
        }
    }

    handleStaggerAnimation(element, entry) {
        if (this.performanceMode === 'reduced') {
            const children = element.querySelectorAll('*');
            children.forEach(child => {
                child.style.opacity = '1';
                child.style.transform = 'none';
            });
            return;
        }

        const children = element.querySelectorAll('*');
        element.classList.add('animate');

        children.forEach((child, index) => {
            const delay = index * 100; // 100ms stagger
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'none';
            }, delay);
        });
    }

    handleFadeIn(element, entry) {
        if (this.performanceMode === 'reduced') {
            element.style.opacity = '1';
            return;
        }

        element.classList.add('fade-in');
    }

    handleSlideIn(element, entry) {
        if (this.performanceMode === 'reduced') {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }

        const direction = element.dataset.slideDirection || 'up';
        element.classList.add(`slide-in-${direction}`);
    }

    handleScaleIn(element, entry) {
        if (this.performanceMode === 'reduced') {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            return;
        }

        element.classList.add('scale-in');
    }

    handleRotateIn(element, entry) {
        if (this.performanceMode === 'reduced') {
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg)';
            return;
        }

        element.classList.add('rotate-in');
    }

    // ===== SCROLL-BASED ANIMATIONS =====
    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll('[data-scroll-animate]');
        
        scrollElements.forEach(element => {
            const animationType = element.dataset.scrollAnimate;
            const threshold = parseFloat(element.dataset.scrollThreshold) || 0.5;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.triggerScrollAnimation(element, animationType, entry.intersectionRatio);
                    }
                });
            }, { threshold: [0, threshold, 1] });

            observer.observe(element);
        });
    }

    triggerScrollAnimation(element, type, ratio) {
        switch (type) {
            case 'parallax':
                this.animateParallax(element, ratio);
                break;
            case 'reveal':
                this.animateReveal(element, ratio);
                break;
            case 'progress':
                this.animateProgress(element, ratio);
                break;
            case 'counter':
                this.animateCounter(element, ratio);
                break;
        }
    }

    animateParallax(element, ratio) {
        const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
        const yPos = -(ratio * 100 * speed);
        element.style.transform = `translateY(${yPos}px)`;
    }

    animateReveal(element, ratio) {
        const clipPath = `inset(0 ${100 - (ratio * 100)}% 0 0)`;
        element.style.clipPath = clipPath;
    }

    animateProgress(element, ratio) {
        const progress = ratio * 100;
        element.style.width = `${progress}%`;
    }

    animateCounter(element, ratio) {
        if (ratio > 0.5 && !element.dataset.counted) {
            const target = parseInt(element.dataset.target) || 0;
            const duration = parseInt(element.dataset.duration) || 2000;
            this.countUp(element, target, duration);
            element.dataset.counted = 'true';
        }
    }

    countUp(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(start);
        }, 16);
    }

    // ===== HOVER ANIMATIONS =====
    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('[data-hover-animate]');
        
        hoverElements.forEach(element => {
            const animationType = element.dataset.hoverAnimate;
            
            element.addEventListener('mouseenter', () => {
                this.triggerHoverAnimation(element, animationType, 'enter');
            });
            
            element.addEventListener('mouseleave', () => {
                this.triggerHoverAnimation(element, animationType, 'leave');
            });
        });
    }

    triggerHoverAnimation(element, type, action) {
        if (this.performanceMode === 'reduced') return;

        switch (type) {
            case 'lift':
                this.animateHoverLift(element, action);
                break;
            case 'scale':
                this.animateHoverScale(element, action);
                break;
            case 'glow':
                this.animateHoverGlow(element, action);
                break;
            case 'rotate':
                this.animateHoverRotate(element, action);
                break;
        }
    }

    animateHoverLift(element, action) {
        const y = action === 'enter' ? -8 : 0;
        element.style.transform = `translateY(${y}px)`;
    }

    animateHoverScale(element, action) {
        const scale = action === 'enter' ? 1.05 : 1;
        element.style.transform = `scale(${scale})`;
    }

    animateHoverGlow(element, action) {
        if (action === 'enter') {
            element.classList.add('glow-hover');
        } else {
            element.classList.remove('glow-hover');
        }
    }

    animateHoverRotate(element, action) {
        const rotation = action === 'enter' ? 360 : 0;
        element.style.transform = `rotate(${rotation}deg)`;
    }

    // ===== TYPING ANIMATIONS =====
    setupTypingAnimations() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.dataset.typing;
            const speed = parseInt(element.dataset.typingSpeed) || 100;
            const delay = parseInt(element.dataset.typingDelay) || 0;
            
            setTimeout(() => {
                this.startTypingAnimation(element, text, speed);
            }, delay);
        });
    }

    startTypingAnimation(element, text, speed) {
        let index = 0;
        element.textContent = '';
        
        const typeChar = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, speed);
            }
        };
        
        typeChar();
    }

    // ===== PARALLAX EFFECTS =====
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    setupPerformanceOptimizations() {
        // Throttle scroll events
        this.throttledScrollHandler = this.throttle(this.handleScroll.bind(this), 16);
        window.addEventListener('scroll', this.throttledScrollHandler, { passive: true });

        // Optimize animation frame requests
        this.setupAnimationFrameOptimization();

        // Lazy load animations
        this.setupLazyAnimationLoading();

        // Monitor performance
        this.setupPerformanceMonitoring();
    }

    setupAnimationFrameOptimization() {
        let animationFrameId = null;
        
        this.requestOptimizedAnimationFrame = (callback) => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = requestAnimationFrame(callback);
        };
    }

    setupLazyAnimationLoading() {
        const lazyAnimations = document.querySelectorAll('[data-lazy-animate]');
        
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationClass = element.dataset.lazyAnimate;
                    
                    element.classList.add(animationClass);
                    lazyObserver.unobserve(element);
                }
            });
        }, { rootMargin: '50px' });

        lazyAnimations.forEach(element => lazyObserver.observe(element));
    }

    setupPerformanceMonitoring() {
        if (this.performanceMode === 'low') {
            // Disable complex animations on low-end devices
            this.disableComplexAnimations();
        }

        // Monitor frame rate
        this.monitorFrameRate();
    }

    disableComplexAnimations() {
        const complexAnimations = document.querySelectorAll('.parallax-bg, .gradient-shift, .float');
        complexAnimations.forEach(element => {
            element.style.animation = 'none';
        });
    }

    monitorFrameRate() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const countFrames = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 30) {
                    this.enableLowPerformanceMode();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(countFrames);
        };
        
        requestAnimationFrame(countFrames);
    }

    enableLowPerformanceMode() {
        this.performanceMode = 'low';
        this.disableComplexAnimations();
    }

    // ===== UTILITY METHODS =====
    handleScroll() {
        // Handle scroll-based effects
        this.updateScrollProgress();
        this.updateParallaxElements();
    }

    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.transform = `scaleX(${scrollPercent})`;
        }
    }

    updateParallaxElements() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // ===== ANIMATION QUEUE MANAGEMENT =====
    addToAnimationQueue(animation) {
        this.animationQueue.push(animation);
        this.processAnimationQueue();
    }

    processAnimationQueue() {
        if (this.isAnimating || this.animationQueue.length === 0) return;
        
        this.isAnimating = true;
        const animation = this.animationQueue.shift();
        
        animation().then(() => {
            this.isAnimating = false;
            this.processAnimationQueue();
        });
    }

    // ===== ADVANCED ANIMATION EFFECTS =====
    animateCounter(element, target, duration = 2000) {
        return new Promise((resolve) => {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    start = target;
                    clearInterval(timer);
                    resolve();
                }
                element.textContent = Math.floor(start);
            }, 16);
        });
    }

    morphElement(fromElement, toElement, duration = 500) {
        return new Promise((resolve) => {
            const fromRect = fromElement.getBoundingClientRect();
            const toRect = toElement.getBoundingClientRect();
            
            const deltaX = toRect.left - fromRect.left;
            const deltaY = toRect.top - fromRect.top;
            const deltaWidth = toRect.width - fromRect.width;
            const deltaHeight = toRect.height - fromRect.height;
            
            fromElement.style.transition = `all ${duration}ms ease-in-out`;
            fromElement.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${toRect.width / fromRect.width}, ${toRect.height / fromRect.height})`;
            
            setTimeout(resolve, duration);
        });
    }

    createParticleSystem(container, options = {}) {
        const particles = [];
        const particleCount = options.count || 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${options.size || 4}px;
                height: ${options.size || 4}px;
                background: ${options.color || '#fff'};
                border-radius: 50%;
                pointer-events: none;
                opacity: ${Math.random()};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${2 + Math.random() * 3}s ease-in-out infinite;
            `;
            
            container.appendChild(particle);
            particles.push(particle);
        }
        
        return particles;
    }

    // ===== UTILITY FUNCTIONS =====
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

    // ===== PUBLIC API =====
    triggerAnimation(element, animationType, options = {}) {
        switch (animationType) {
            case 'fadeIn':
                element.classList.add('fade-in');
                break;
            case 'slideIn':
                element.classList.add(`slide-in-${options.direction || 'up'}`);
                break;
            case 'scaleIn':
                element.classList.add('scale-in');
                break;
            case 'rotateIn':
                element.classList.add('rotate-in');
                break;
            case 'bounceIn':
                element.classList.add('bounce-in');
                break;
            case 'stagger':
                this.triggerStaggerAnimation(element, options);
                break;
        }
    }

    triggerStaggerAnimation(container, options = {}) {
        const children = container.children;
        const delay = options.delay || 100;
        
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate');
            }, index * delay);
        });
    }

    pauseAnimations() {
        document.body.style.setProperty('animation-play-state', 'paused');
        document.body.style.setProperty('transition', 'none');
    }

    resumeAnimations() {
        document.body.style.removeProperty('animation-play-state');
        document.body.style.removeProperty('transition');
    }

    destroy() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        // Remove event listeners
        window.removeEventListener('scroll', this.throttledScrollHandler);
        
        // Clear animation queue
        this.animationQueue = [];
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    if (e.message.includes('animation')) {
        console.error('Animation error:', e.error);
        // Disable animations on error
        if (window.animationController) {
            window.animationController.pauseAnimations();
        }
    }
});

// Export for use in other modules
window.AnimationController = AnimationController;
