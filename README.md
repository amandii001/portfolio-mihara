# Mihara Amandi - Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and JavaScript. Features a dynamic theme system, smooth animations, and comprehensive accessibility features.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/amandii001)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mihara-amandi-310a422a0/)
[![Instagram](https://img.shields.io/badge/Instagram-Profile-pink?style=for-the-badge&logo=instagram)](https://www.instagram.com/a.mandiiiii/profilecard/?igsh=MW9yeWNpb29rYnliYw==)

## 🚀 Live Demo

[View Live Portfolio](https://amandii001.github.io/portfolio-mihara/)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟 Features

### Core Features
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark/Light Theme**: Automatic system preference detection with manual toggle
- **Smooth Animations**: CSS keyframes and JavaScript-controlled animations
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Performance Optimized**: Lazy loading, critical CSS, and Core Web Vitals optimization

### Interactive Elements
- **Navigation**: Smooth scrolling with active link highlighting
- **Mobile Menu**: Hamburger menu with slide animations
- **Contact Form**: Client-side validation with success/error states
- **Project Filtering**: Filter projects by technology stack
- **Typing Effect**: Dynamic text animation in hero section
- **Scroll Animations**: Intersection Observer API for scroll-triggered effects

### Visual Design
- **Glassmorphism**: Modern glass-like effects with backdrop blur
- **Gradient Backgrounds**: Animated gradients with smooth transitions
- **Typography**: Inter font family with responsive sizing
- **Color Scheme**: CSS custom properties for consistent theming
- **Icons**: Font Awesome integration for scalable icons

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local development server (optional but recommended)

### Installation

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd portfolio-mihara
   ```

2. **Local Development Server**
   ```bash
   # Using Python (Python 3.x)
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in Browser**
   ```
   http://localhost:8000
   ```

### File Structure
```
portfolio-mihara/
├── index.html              # Main HTML file with semantic structure
├── css/
│   ├── styles.css          # Core styles and theme system
│   └── animations.css      # Custom animations and keyframes
├── js/
│   ├── main.js            # Core functionality and interactions
│   ├── animations.js      # Animation controllers and effects
│   └── theme-toggle.js    # Theme management system
├── images/
│   └── placeholder-profile.jpg  # Profile image placeholder
├── site.webmanifest       # PWA configuration
├── robots.txt             # Search engine crawling rules
├── sitemap.xml           # Site structure for SEO
├── sw.js                 # Service Worker for PWA features
└── README.md             # This documentation file
```

## 🎨 Customization Guide

### Personal Information
Update the following sections in `index.html`:

1. **Hero Section** (lines ~50-80)
   ```html
   <h1 class="text-4xl md:text-6xl font-bold">Mihara Amandi</h1>
   <p class="text-xl md:text-2xl">Software Engineering Student</p>
   ```

2. **About Section** (lines ~100-150)
   ```html
   <p>Your personal description here...</p>
   ```

3. **Contact Information** (lines ~400-450)
   ```html
   <p>Email: your-email@example.com</p>
   <p>Phone: +1234567890</p>
   ```

### Styling Customization

#### Color Scheme
Modify CSS custom properties in `css/styles.css` (lines ~20-60):
```css
:root {
  --primary-500: #3b82f6;    /* Primary blue */
  --secondary-500: #8b5cf6;  /* Secondary purple */
  --accent-500: #10b981;     /* Accent green */
}
```

#### Typography
Update font imports in `index.html` (line ~15):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

#### Animations
Customize animations in `css/animations.css`:
- **Fade-in**: Lines ~10-30
- **Typing Effect**: Lines ~40-60
- **Progress Bars**: Lines ~70-90

### Adding New Projects
1. **HTML Structure** (in `index.html`, around line 300):
   ```html
   <div class="project-card" data-category="web">
     <img src="images/project-image.jpg" alt="Project Name">
     <div class="project-content">
       <h3>Project Name</h3>
       <p>Project description...</p>
       <div class="project-tech">
         <span class="tech-badge">HTML</span>
         <span class="tech-badge">CSS</span>
       </div>
       <div class="project-links">
         <a href="#" class="btn-primary">Live Demo</a>
         <a href="#" class="btn-secondary">GitHub</a>
       </div>
     </div>
   </div>
   ```

2. **JavaScript Filter** (in `js/main.js`, around line 150):
   ```javascript
   const projectFilters = {
     'all': 'All Projects',
     'web': 'Web Development',
     'mobile': 'Mobile Apps',
     'design': 'UI/UX Design'
   };
   ```

## 🌐 Browser Compatibility

### Supported Browsers
- **Chrome**: 90+ (Full support)
- **Firefox**: 88+ (Full support)
- **Safari**: 14+ (Full support)
- **Edge**: 90+ (Full support)

### Feature Support Matrix
| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Grid | ✅ | ✅ | ✅ | ✅ |
| Flexbox | ✅ | ✅ | ✅ | ✅ |
| CSS Custom Properties | ✅ | ✅ | ✅ | ✅ |
| Intersection Observer | ✅ | ✅ | ✅ | ✅ |
| Service Workers | ✅ | ✅ | ✅ | ✅ |
| Backdrop Filter | ✅ | ✅ | ✅ | ✅ |

### Fallbacks
- **CSS Custom Properties**: Fallback colors defined for older browsers
- **Backdrop Filter**: Alternative styling for unsupported browsers
- **Intersection Observer**: Graceful degradation to basic animations

## ⚡ Performance Optimization

### Core Web Vitals
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Loading Performance
1. **Critical CSS Inlining**: Above-the-fold styles inlined in HTML
2. **Font Loading**: `display=swap` for Google Fonts
3. **Image Optimization**: Lazy loading with placeholder images
4. **Resource Preloading**: DNS prefetch and preconnect for external resources

### JavaScript Performance
1. **Debouncing**: Scroll and resize events debounced
2. **Throttling**: Animation frame optimization
3. **Lazy Loading**: Non-critical animations loaded on demand
4. **Service Worker**: Caching strategy for offline support

### Optimization Techniques
```javascript
// Debounced scroll handler (main.js, line ~200)
const debouncedScroll = debounce(() => {
  // Scroll handling logic
}, 16); // ~60fps

// Throttled animation (animations.js, line ~100)
const throttledAnimation = throttle(() => {
  requestAnimationFrame(() => {
    // Animation logic
  });
}, 16);
```

## 🔧 Development Guidelines

### Code Organization
- **Separation of Concerns**: HTML structure, CSS styling, JS behavior
- **Modular JavaScript**: Class-based architecture for maintainability
- **CSS Methodology**: Utility-first with Tailwind CSS
- **File Naming**: Descriptive names with consistent conventions

### Best Practices
1. **Semantic HTML**: Use appropriate tags for structure
2. **Accessibility**: ARIA labels, keyboard navigation, color contrast
3. **Performance**: Optimize images, minimize HTTP requests
4. **SEO**: Meta tags, structured data, clean URLs
5. **Security**: Input validation, XSS prevention

### Testing Checklist
- [ ] Responsive design on all breakpoints
- [ ] Theme switching functionality
- [ ] Form validation and submission
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Performance metrics
- [ ] Cross-browser compatibility

## 📱 Progressive Web App (PWA)

### Features
- **Installable**: Add to home screen functionality
- **Offline Support**: Service Worker caching
- **Push Notifications**: Ready for implementation
- **App-like Experience**: Full-screen mode

### Configuration
- **Web Manifest**: `site.webmanifest` for PWA metadata
- **Service Worker**: `sw.js` for caching and offline support
- **Icons**: Multiple sizes for different devices

## 🔍 SEO Optimization

### Meta Tags
- **Title**: Descriptive page title with keywords
- **Description**: Compelling meta description
- **Keywords**: Relevant keywords for search engines
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags

### Structured Data
- **Person Schema**: Personal information markup
- **Organization Schema**: Professional details
- **WebSite Schema**: Site structure information

### Technical SEO
- **Sitemap**: `sitemap.xml` for search engine crawling
- **Robots.txt**: Crawling instructions
- **Canonical URLs**: Prevent duplicate content
- **Clean URLs**: Semantic URL structure

## 🛡️ Security Considerations

### Client-Side Security
- **Input Validation**: Client-side form validation
- **XSS Prevention**: Sanitize user inputs
- **CSP Headers**: Content Security Policy (server-side)
- **HTTPS**: Secure connections for production

### Data Protection
- **No Sensitive Data**: Avoid storing sensitive information in client-side code
- **API Security**: Use secure endpoints for form submissions
- **Privacy**: Respect user privacy and GDPR compliance

## 🚀 Deployment

### Static Hosting
1. **Netlify**: Drag and drop deployment
2. **Vercel**: Git-based deployment
3. **GitHub Pages**: Free hosting for public repositories
4. **Firebase Hosting**: Google's hosting solution

### Production Checklist
- [ ] Minify CSS and JavaScript
- [ ] Optimize images (WebP format)
- [ ] Enable compression (Gzip/Brotli)
- [ ] Set up CDN for global performance
- [ ] Configure HTTPS
- [ ] Set up monitoring and analytics

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- **HTML**: Semantic markup, accessibility attributes
- **CSS**: Consistent naming, responsive design
- **JavaScript**: ES6+ syntax, error handling
- **Documentation**: Clear comments and README updates

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icon library
- **Google Fonts**: Typography
- **Inter Font**: Modern typeface
- **CSS Grid & Flexbox**: Modern layout techniques

## 📞 Support

For questions, issues, or contributions:
- **Email**: miharaamandi4@gmail.com
- **Phone**: +94 70 105 4113
- **Location**: Galle, Sri Lanka
- **GitHub**: [amandii001](https://github.com/amandii001)
- **LinkedIn**: [Mihara Amandi](https://www.linkedin.com/in/mihara-amandi-310a422a0/)
- **Instagram**: [a.mandiiiii](https://www.instagram.com/a.mandiiiii/profilecard/?igsh=MW9yeWNpb29rYnliYw==)

## 🐙 GitHub Repository Setup

### Initial Setup
```bash
# Initialize git repository (if not already done)
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/amandii001/portfolio-mihara.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Regular Updates
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Update: [describe your changes]"

# Push to GitHub
git push origin main
```

### GitHub Pages Deployment
1. Go to your GitHub repository
2. Navigate to **Settings** > **Pages**
3. Select **Source**: "Deploy from a branch"
4. Choose **Branch**: "main" and **Folder**: "/ (root)"
5. Click **Save**
6. Your site will be available at: `https://amandii001.github.io/portfolio-mihara/`

### Branch Management
```bash
# Create a new feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push feature branch
git push origin feature/new-feature

# Merge to main (after pull request)
git checkout main
git merge feature/new-feature
git push origin main
```

---

**Built with ❤️ using modern web technologies**
