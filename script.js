/**
 * Victory Bell 2025 - USC vs UCLA Game Day Networking Playbook
 * Interactive functionality
 */

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Filter Tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventsList = document.querySelector('.events-list');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Apply filter
            const filter = btn.dataset.filter;
            eventsList.className = 'events-list';

            if (filter !== 'all') {
                eventsList.classList.add(`filter-${filter}`);
            }

            // Close all expanded events when filtering
            document.querySelectorAll('.event-card.active').forEach(card => {
                card.classList.remove('active');
            });
        });
    });

    // Dynamic Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

// Toggle Event Details (Global function for onclick)
function toggleEvent(card) {
    // Optional: Close other open cards (accordion behavior)
    // Uncomment below for single-card behavior
    // const activeCards = document.querySelectorAll('.event-card.active');
    // activeCards.forEach(c => {
    //     if (c !== card) c.classList.remove('active');
    // });

    card.classList.toggle('active');

    // Scroll the card into view if it's being opened on mobile
    if (card.classList.contains('active') && window.innerWidth < 768) {
        setTimeout(() => {
            const headerOffset = 90;
            const elementPosition = card.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }, 100);
    }
}

// Copy Script to Clipboard
function copyScript(card) {
    const scriptText = card.querySelector('.script-text').textContent;

    navigator.clipboard.writeText(scriptText).then(() => {
        // Visual feedback
        card.classList.add('copied');
        const hint = card.querySelector('.copy-hint');
        const originalText = hint.innerHTML;
        hint.innerHTML = '<i class="fas fa-check"></i> Copied!';

        // Show toast
        showToast('Script copied to clipboard!');

        // Reset after 2 seconds
        setTimeout(() => {
            card.classList.remove('copied');
            hint.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy. Please try again.');
    });
}

// Toast Notification
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}
