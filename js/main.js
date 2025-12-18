// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            const isActive = navUl.classList.toggle('active');
            menuToggle.innerHTML = isActive ? '✕' : '☰';
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        // Close menu when clicking a link
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('active');
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Image lazy loading handler
function initImageLoading() {
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
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.classList.add('loaded');
        });
    }
    
    // Mark eager images as loaded immediately
    document.querySelectorAll('img[loading="eager"]').forEach(img => {
        img.classList.add('loaded');
    });
}

// Contact Form Validation and Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const rodoInput = document.getElementById('rodo');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    // Real-time validation
    function validateField(field, errorElement) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'To pole jest wymagane';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Podaj prawidłowy adres email';
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\+\-\(\)]{9,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Podaj prawidłowy numer telefonu';
            }
        }

        if (isValid) {
            field.classList.remove('error');
            errorElement.textContent = '';
        } else {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    // Add event listeners for real-time validation
    [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(field => {
        if (field) {
            field.addEventListener('blur', () => {
                const errorElement = document.getElementById(field.id + 'Error');
                if (errorElement) validateField(field, errorElement);
            });
        }
    });

    if (rodoInput) {
        rodoInput.addEventListener('change', () => {
            const errorElement = document.getElementById('rodoError');
            if (errorElement) {
                if (rodoInput.checked) {
                    errorElement.textContent = '';
                } else {
                    errorElement.textContent = 'Musisz zaakceptować politykę prywatności';
                }
            }
        });
    }

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const nameValid = validateField(nameInput, document.getElementById('nameError'));
        const emailValid = validateField(emailInput, document.getElementById('emailError'));
        const phoneValid = phoneInput.value.trim() ? validateField(phoneInput, document.getElementById('phoneError')) : true;
        const subjectValid = validateField(subjectInput, document.getElementById('subjectError'));
        const messageValid = validateField(messageInput, document.getElementById('messageError'));
        
        const rodoValid = rodoInput.checked;
        if (!rodoValid) {
            document.getElementById('rodoError').textContent = 'Musisz zaakceptować politykę prywatności';
        } else {
            document.getElementById('rodoError').textContent = '';
        }

        if (!nameValid || !emailValid || !phoneValid || !subjectValid || !messageValid || !rodoValid) {
            formMessage.classList.add('active', 'error');
            formMessage.textContent = 'Proszę poprawić błędy w formularzu';
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.classList.add('active');
        formMessage.classList.remove('active');

        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            subject: subjectInput.value,
            message: messageInput.value.trim(),
            rodo: rodoInput.checked
        };

        try {
            // TODO: Replace with your backend endpoint or use Formspree/EmailJS
            // Example with Formspree (uncomment and add your Formspree ID):
            /*
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            */

            // Simulate API call (remove this in production)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success message
            formMessage.classList.add('active', 'success');
            formMessage.textContent = 'Dziękujemy! Twoja wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.';
            
            // Reset form
            form.reset();
            
        } catch (error) {
            // Error message
            formMessage.classList.add('active', 'error');
            formMessage.textContent = 'Wystąpił błąd podczas wysyłania wiadomości. Proszę spróbować ponownie lub skontaktować się telefonicznie.';
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            if (btnText) btnText.style.display = 'inline-block';
            if (btnLoading) btnLoading.classList.remove('active');
        }
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('[data-lightbox]');
    
    if (!lightbox || galleryItems.length === 0) return;

    let currentIndex = 0;
    const images = Array.from(galleryItems);

    function openLightbox(index) {
        currentIndex = index;
        const item = images[currentIndex];
        const img = item.querySelector('img');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = item.getAttribute('data-title') || img.alt;
        
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        updateNavigation();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        const item = images[currentIndex];
        const img = item.querySelector('img');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = item.getAttribute('data-title') || img.alt;
        
        updateNavigation();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        const item = images[currentIndex];
        const img = item.querySelector('img');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = item.getAttribute('data-title') || img.alt;
        
        updateNavigation();
    }

    function updateNavigation() {
        if (images.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'flex';
            lightboxNext.style.display = 'flex';
        }
    }

    // Open lightbox on gallery item click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Navigation
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrev();
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNext();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
        }
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;

    function toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleScrollButton);
    toggleScrollButton(); // Check initial state

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initImageLoading();
    initContactForm();
    initLightbox();
    initScrollToTop();
});
