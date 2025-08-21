// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.section');
    
    // Update active navigation item based on scroll position
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                const correspondingNav = document.querySelector(`[data-section="${section.id}"]`);
                if (correspondingNav) {
                    correspondingNav.classList.add('active');
                }
            }
        });
    }
    
    // Smooth scroll to section when nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const moonIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'light') {
        moonIcon.classList.remove('fa-moon');
        moonIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'light') {
            moonIcon.classList.remove('fa-moon');
            moonIcon.classList.add('fa-sun');
        } else {
            moonIcon.classList.remove('fa-sun');
            moonIcon.classList.add('fa-moon');
        }
    });
    
    // Scroll event listener for active navigation
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial call to set active nav
    updateActiveNav();
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to the main heading
    const mainHeading = document.querySelector('.intro-content h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.style.borderRight = '2px solid #60a5fa';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                mainHeading.style.borderRight = 'none';
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section-indicator');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or return to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // Add smooth reveal animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
});

// Add CSS for light theme
const lightThemeStyles = `
    body[data-theme="light"] {
        background-color: #ffffff;
        color: #1f2937;
    }
    
    body[data-theme="light"] .section-indicator {
        background: rgba(0, 0, 0, 0.1);
        color: #3b82f6;
    }
    
    body[data-theme="light"] .intro-content h1 {
        background: linear-gradient(135deg, #1f2937 0%, #3b82f6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    body[data-theme="light"] .tagline {
        color: #6b7280;
    }
    
    body[data-theme="light"] .about-text {
        color: #374151;
    }
    
    body[data-theme="light"] .about-text strong {
        color: #1f2937;
    }
    
    body[data-theme="light"] h2,
    body[data-theme="light"] h3 {
        color: #1f2937;
    }
    
    body[data-theme="light"] .skill-tag {
        background: #1f2937;
        color: #ffffff;
    }
    
    body[data-theme="light"] .timeline-content,
    body[data-theme="light"] .project-card,
    body[data-theme="light"] .education-card,
    body[data-theme="light"] .achievement-item,
    body[data-theme="light"] .volunteering-item {
        background: rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    body[data-theme="light"] .timeline-content li,
    body[data-theme="light"] .project-card p,
    body[data-theme="light"] .achievement-item p {
        color: #374151;
    }
    
    body[data-theme="light"] .bottom-nav {
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    body[data-theme="light"] .nav-item {
        color: #6b7280;
    }
    
    body[data-theme="light"] .nav-item:hover,
    body[data-theme="light"] .nav-item.active {
        color: #1f2937;
        background: rgba(59, 130, 246, 0.1);
    }
    
    body[data-theme="light"] .theme-toggle {
        background: rgba(0, 0, 0, 0.1) !important;
    }
    
    body[data-theme="light"] .theme-toggle:hover {
        background: rgba(0, 0, 0, 0.2) !important;
    }
`;

// Inject light theme styles
const styleSheet = document.createElement('style');
styleSheet.textContent = lightThemeStyles;
document.head.appendChild(styleSheet);
