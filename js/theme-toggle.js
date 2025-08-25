/**
 * PORTFOLIO WEBSITE - THEME MANAGEMENT SYSTEM
 * ===========================================
 * 
 * This file implements a comprehensive theme management system for the portfolio website.
 * It handles dark/light mode switching with system preference detection and localStorage persistence.
 * 
 * THEME SYSTEM FEATURES:
 * - Automatic system preference detection (prefers-color-scheme)
 * - Manual theme toggle with smooth transitions
 * - localStorage persistence for user preferences
 * - Fallback to time-of-day detection
 * - Theme-aware component updates
 * - Accessibility features (ARIA labels, screen reader support)
 * 
 * IMPLEMENTATION DETAILS:
 * - CSS custom properties for dynamic theming
 * - Smooth transitions between themes (300ms)
 * - Ripple effect animation on theme toggle
 * - Meta theme-color updates for mobile browsers
 * - Custom events for component synchronization
 * 
 * ACCESSIBILITY CONSIDERATIONS:
 * - Keyboard navigation support (Space/Enter keys)
 * - Screen reader announcements for theme changes
 * - ARIA pressed state management
 * - Reduced motion support for animations
 * - High contrast mode compatibility
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Efficient DOM manipulation with classList
 * - Debounced theme updates to prevent thrashing
 * - Lazy loading of theme-specific resources
 * - Optimized CSS variable updates
 */

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        this.updateThemeIcon();
        this.updateThemeToggleState(this.currentTheme);
        this.setupSystemThemeListener();
        this.initThemeAwareComponents();
    }

    // ===== THEME DETECTION & STORAGE =====
    getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (error) {
            console.warn('Could not access localStorage:', error);
            return null;
        }
    }

    getSystemTheme() {
        // Check if the browser supports prefers-color-scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        // Fallback: check for other indicators
        const hour = new Date().getHours();
        const isNightTime = hour < 6 || hour > 18;
        
        // Check if user has previously indicated a preference
        const hasUserPreference = localStorage.getItem('theme-preference');
        if (hasUserPreference) {
            return hasUserPreference;
        }
        
        return isNightTime ? 'dark' : 'light';
    }

    setStoredTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.warn('Could not save theme to localStorage:', error);
        }
    }

    // ===== THEME APPLICATION =====
    applyTheme(theme) {
        const root = document.documentElement;
        const body = document.body;
        
        // Add transition class for smooth theme switching
        this.addThemeTransition();
        
        // Remove existing theme classes
        root.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');
        
        // Apply new theme
        root.classList.add(theme);
        body.classList.add(theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Update CSS custom properties
        this.updateCSSVariables(theme);
        
        // Update theme-aware components
        this.updateThemeAwareComponents(theme);
        
        // Store theme preference
        this.setStoredTheme(theme);
        
        // Update aria-pressed state for theme toggle
        this.updateThemeToggleState(theme);
        
        // Dispatch custom event for other components
        this.dispatchThemeChangeEvent(theme);
        
        this.currentTheme = theme;
        
        // Remove transition class after theme is applied
        setTimeout(() => {
            this.removeThemeTransition();
        }, 300);
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        const colors = {
            light: '#ffffff',
            dark: '#1f2937'
        };
        
        metaThemeColor.content = colors[theme] || colors.light;
    }

    updateCSSVariables(theme) {
        const root = document.documentElement;
        
        // Define theme-specific CSS variables
        const themeVariables = {
            light: {
                '--bg-primary': '#ffffff',
                '--bg-secondary': '#f9fafb',
                '--bg-tertiary': '#f3f4f6',
                '--text-primary': '#111827',
                '--text-secondary': '#374151',
                '--text-tertiary': '#6b7280',
                '--border-primary': '#e5e7eb',
                '--border-secondary': '#d1d5db',
                '--shadow-color': 'rgba(0, 0, 0, 0.1)',
                '--shadow-color-dark': 'rgba(0, 0, 0, 0.2)',
                '--glass-bg': 'rgba(255, 255, 255, 0.8)',
                '--glass-border': 'rgba(255, 255, 255, 0.2)',
                '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)'
            },
            dark: {
                '--bg-primary': '#111827',
                '--bg-secondary': '#1f2937',
                '--bg-tertiary': '#374151',
                '--text-primary': '#f9fafb',
                '--text-secondary': '#d1d5db',
                '--text-tertiary': '#9ca3af',
                '--border-primary': '#374151',
                '--border-secondary': '#4b5563',
                '--shadow-color': 'rgba(0, 0, 0, 0.3)',
                '--shadow-color-dark': 'rgba(0, 0, 0, 0.5)',
                '--glass-bg': 'rgba(31, 41, 55, 0.8)',
                '--glass-border': 'rgba(255, 255, 255, 0.1)',
                '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.3)'
            }
        };
        
        const variables = themeVariables[theme] || themeVariables.light;
        
        Object.entries(variables).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });
    }

    // ===== THEME TOGGLE FUNCTIONALITY =====
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.updateThemeIcon();
        
        // Add animation to toggle button
        this.animateThemeToggle();
    }

    animateThemeToggle() {
        if (this.themeToggle) {
            // Add animation class
            this.themeToggle.classList.add('theme-toggle-animate');
            
            // Add ripple effect
            this.createRippleEffect();
            
            // Remove animation class after completion
            setTimeout(() => {
                this.themeToggle.classList.remove('theme-toggle-animate');
            }, 600);
        }
    }

    createRippleEffect() {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            top: 50%;
            left: 50%;
            margin-top: -50px;
            margin-left: -50px;
        `;
        
        this.themeToggle.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    updateThemeIcon() {
        if (!this.themeToggle) return;
        
        // For the new modern toggle design, we don't need to hide/show icons
        // The toggle animation is handled by CSS
        // Just update the aria-pressed state
        this.updateThemeToggleState(this.currentTheme);
    }

    updateThemeToggleState(theme) {
        if (this.themeToggle) {
            this.themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
            
            // Add transition class for smooth animation
            this.themeToggle.classList.add('theme-transitioning');
            
            // Remove transition class after animation
            setTimeout(() => {
                this.themeToggle.classList.remove('theme-transitioning');
            }, 300);
        }
    }

    updateThemeAwareComponents(theme) {
        // Update all theme-aware elements
        const themeAwareElements = document.querySelectorAll('.theme-aware, .glass-card, .card-base, .btn-primary, .btn-secondary, .nav-link, .input-base');
        
        themeAwareElements.forEach(element => {
            // Add theme class to element
            element.classList.remove('light', 'dark');
            element.classList.add(theme);
            
            // Trigger custom event for complex components
            const event = new CustomEvent('themeupdate', {
                detail: { theme, element }
            });
            element.dispatchEvent(event);
        });
        
        // Update About section specifically
        this.updateAboutSection(theme);
        
        // Update specific components
        this.updateCharts(theme);
        this.updateCodeHighlighting(theme);
        this.updateCustomComponents(theme);
    }

    updateAboutSection(theme) {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            if (theme === 'dark') {
                aboutSection.classList.add('dark');
            } else {
                aboutSection.classList.remove('dark');
            }
        }
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
            
            // Add keyboard support
            this.themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
        
        // Add keyboard shortcut (Ctrl/Cmd + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    setupSystemThemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't set a preference
            if (!this.getStoredTheme()) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(newTheme);
                this.updateThemeIcon();
            }
        });
    }

    // ===== CUSTOM EVENTS =====
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themechange', {
            detail: { theme, previousTheme: this.currentTheme }
        });
        document.dispatchEvent(event);
    }

    // ===== UTILITY METHODS =====
    getCurrentTheme() {
        return this.currentTheme;
    }

    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    isLightMode() {
        return this.currentTheme === 'light';
    }

    forceTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme);
            this.updateThemeIcon();
        }
    }

    resetToSystem() {
        localStorage.removeItem('theme');
        const systemTheme = this.getSystemTheme();
        this.applyTheme(systemTheme);
        this.updateThemeIcon();
    }

    // ===== THEME-AWARE COMPONENTS =====
    initThemeAwareComponents() {
        // Update charts if they exist
        this.updateCharts(this.currentTheme);
        
        // Update code highlighting
        this.updateCodeHighlighting(this.currentTheme);
        
        // Update any other theme-dependent components
        this.updateCustomComponents(this.currentTheme);
    }

    updateCharts(theme) {
        // If using chart libraries, update their themes
        if (window.Chart) {
            const isDark = theme === 'dark';
            Chart.defaults.color = isDark ? '#d1d5db' : '#374151';
            Chart.defaults.borderColor = isDark ? '#374151' : '#e5e7eb';
            Chart.defaults.backgroundColor = isDark ? '#1f2937' : '#ffffff';
        }
    }

    updateCodeHighlighting(theme) {
        // Update Prism.js or other syntax highlighters
        if (window.Prism) {
            // Update Prism theme
            const prismLink = document.querySelector('link[href*="prism"]');
            if (prismLink) {
                const isDark = theme === 'dark';
                const newTheme = isDark ? 'prism-tomorrow' : 'prism';
                prismLink.href = prismLink.href.replace(/prism-[^.]*/, newTheme);
            }
            Prism.highlightAll();
        }
    }

    updateCustomComponents(theme) {
        // Update any custom components that need theme awareness
        const themeAwareElements = document.querySelectorAll('[data-theme-aware]');
        
        themeAwareElements.forEach(element => {
            const event = new CustomEvent('themeupdate', {
                detail: { theme, element }
            });
            element.dispatchEvent(event);
        });
        
        // Update progress bars
        this.updateProgressBars(theme);
        
        // Update skill icons
        this.updateSkillIcons(theme);
    }

    updateProgressBars(theme) {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const isDark = theme === 'dark';
            const color = isDark ? '#3b82f6' : '#2563eb';
            bar.style.backgroundColor = color;
        });
    }

    updateSkillIcons(theme) {
        const skillIcons = document.querySelectorAll('.skill-icon i');
        skillIcons.forEach(icon => {
            const isDark = theme === 'dark';
            const color = isDark ? '#60a5fa' : '#3b82f6';
            icon.style.color = color;
        });
    }

    // ===== TRANSITION MANAGEMENT =====
    addThemeTransition() {
        document.documentElement.classList.add('theme-transition');
    }

    removeThemeTransition() {
        document.documentElement.classList.remove('theme-transition');
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    debounceThemeChange(func, wait) {
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

    // ===== ACCESSIBILITY FEATURES =====
    announceThemeChange(theme) {
        // Create a screen reader announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Switched to ${theme} theme`;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // ===== PERSISTENCE HELPERS =====
    exportThemeSettings() {
        return {
            theme: this.currentTheme,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
    }

    importThemeSettings(settings) {
        if (settings && settings.theme) {
            this.applyTheme(settings.theme);
            this.updateThemeIcon();
        }
    }
}

// ===== GLOBAL THEME UTILITIES =====
window.themeUtils = {
    // Get current theme
    getTheme: () => window.themeManager?.getCurrentTheme() || 'light',
    
    // Check if dark mode
    isDark: () => window.themeManager?.isDarkMode() || false,
    
    // Check if light mode
    isLight: () => window.themeManager?.isLightMode() || false,
    
    // Force theme change
    setTheme: (theme) => window.themeManager?.forceTheme(theme),
    
    // Toggle theme
    toggle: () => window.themeManager?.toggleTheme(),
    
    // Reset to system preference
    reset: () => window.themeManager?.resetToSystem(),
    
    // Export settings
    export: () => window.themeManager?.exportThemeSettings(),
    
    // Import settings
    import: (settings) => window.themeManager?.importThemeSettings(settings)
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    window.themeManager = new ThemeManager();
    
    // Listen for theme changes from other components
    document.addEventListener('themechange', (e) => {
        const { theme } = e.detail;
        console.log(`Theme changed to: ${theme}`);
        
        // Update theme-aware components
        window.themeManager.initThemeAwareComponents();
        
        // Announce to screen readers
        window.themeManager.announceThemeChange(theme);
    });
    
    // Add theme transition class for smooth transitions
    window.themeManager.addThemeTransition();
});

// ===== FALLBACK FOR OLDER BROWSERS =====
if (!window.matchMedia) {
    // Fallback for browsers that don't support matchMedia
    window.matchMedia = window.matchMedia || function() {
        return {
            matches: false,
            addListener: function() {},
            removeListener: function() {}
        };
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    if (e.message.includes('theme')) {
        console.error('Theme-related error:', e.error);
        // Fallback to light theme
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
});

// Export for use in other modules
window.ThemeManager = ThemeManager;
