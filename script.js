// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
    observeAnimations();
});

// Smooth scrolling for navigation links
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function observeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in-on-scroll 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.method-card, .case-card, .finding, .data-chart').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// INTERACTIVE HOVER EFFECTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    addCardInteractivity();
    addDataVisualizationInteractivity();
});

function addCardInteractivity() {
    const cards = document.querySelectorAll('.case-card, .method-card, .finding');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

function addDataVisualizationInteractivity() {
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.3) drop-shadow(0 0 10px rgba(255, 0, 110, 0.5))';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });

    const statBoxes = document.querySelectorAll('.stat-box');
    
    statBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(255, 0, 110, 0.2)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// ============================================
// SCROLL PROGRESS INDICATOR (Optional)
// ============================================

function updateScrollProgress() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Add subtle visual feedback during scroll
    document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// NAVBAR ACTIVE STATE
// ============================================

window.addEventListener('scroll', function() {
    updateNavbarActiveState();
});

function updateNavbarActiveState() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ============================================
// STAGGERED ANIMATION FOR LIST ITEMS
// ============================================

function staggerListItems() {
    const lists = document.querySelectorAll('.finding ul, .sources-list ul');
    
    lists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.animation = `fade-in-up 0.6s ease-out ${index * 0.1}s forwards`;
            item.style.opacity = '0';
        });
    });
}

// Call on page load
window.addEventListener('load', staggerListItems);

// ============================================
// ACCESSIBILITY - KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or overlays if needed
    }
});

// ============================================
// TRACK PAGE METRICS (Optional - for monitoring engagement)
// ============================================

const pageMetrics = {
    sectionViews: {},
    startTime: Date.now(),
    
    trackSectionView(sectionId) {
        if (!this.sectionViews[sectionId]) {
            this.sectionViews[sectionId] = 0;
        }
        this.sectionViews[sectionId]++;
    },
    
    getTimeSpent() {
        return (Date.now() - this.startTime) / 1000; // in seconds
    }
};

// Optional: Track which sections users spend time on
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            if (sectionId) {
                pageMetrics.trackSectionView(sectionId);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});
