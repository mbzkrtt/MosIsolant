/* ========================================
   SCRIPT.JS - IsoConfort Pro
   Gestion des interactions du site
   ======================================== */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       1. MENU BURGER (NAVIGATION MOBILE)
       ======================================== */
    
    const burgerMenu = document.querySelector('.burger-menu, .burger-btn, .menu-burger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Ouvrir/fermer le menu mobile
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            
            // Toggle sur nav ou nav-links selon la structure
            if (nav) {
                nav.classList.toggle('active');
            }
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }
    
    // Fermer le menu quand on clique sur un lien
    const allNavLinks = document.querySelectorAll('.nav a, .nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (burgerMenu) {
                burgerMenu.classList.remove('active');
            }
            if (nav) {
                nav.classList.remove('active');
            }
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    
    /* ========================================
       2. GESTION DU FORMULAIRE DE CONTACT
       ======================================== */
    
    const contactForm = document.getElementById('contactForm') || document.getElementById('contact-form');
    const successMessage = document.getElementById('successMessage') || document.getElementById('messageConfirmation');
    const errorMessage = document.getElementById('errorMessage') || document.getElementById('messageErreur');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Validation basique
            const isValid = validateForm();
            
            if (!isValid) {
                e.preventDefault();
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Veuillez remplir tous les champs obligatoires.';
                }
                return false;
            }
            
            // Si Formspree n'est pas configuré, simuler l'envoi
            if (contactForm.action.includes('VOTRE_ID_FORMSPREE')) {
                e.preventDefault();
                
                // Simuler un délai d'envoi
                setTimeout(() => {
                    contactForm.reset();
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }
                    if (errorMessage) {
                        errorMessage.style.display = 'none';
                    }
                    
                    // Cacher le message de succès après 5 secondes
                    setTimeout(() => {
                        if (successMessage) {
                            successMessage.style.display = 'none';
                        }
                    }, 5000);
                }, 500);
                
                return false;
            }
        });
    }
    
    // Fonction de validation du formulaire
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            
            if (!field.value.trim()) {
                isValid = false;
                if (formGroup) {
                    formGroup.classList.add('error');
                }
            } else {
                if (formGroup) {
                    formGroup.classList.remove('error');
                }
            }
        });
        
        // Validation email
        const emailField = document.getElementById('email');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                const formGroup = emailField.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.add('error');
                }
            }
        }
        
        // Validation téléphone
        const telField = document.getElementById('telephone');
        if (telField && telField.value) {
            const telRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
            const cleanTel = telField.value.replace(/\s/g, '');
            if (!telRegex.test(cleanTel)) {
                isValid = false;
                const formGroup = telField.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.add('error');
                }
            }
        }
        
        // Validation code postal
        const zipField = document.getElementById('zipcode');
        if (zipField && zipField.value) {
            const zipRegex = /^[0-9]{5}$/;
            if (!zipRegex.test(zipField.value)) {
                isValid = false;
                const formGroup = zipField.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.add('error');
                }
            }
        }
        
        return isValid;
    }
    
    // Enlever l'erreur quand l'utilisateur commence à taper
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('error');
            }
        });
    });
    
    
    /* ========================================
       3. DÉFILEMENT FLUIDE POUR LES ANCRES
       ======================================== */
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ne pas intercepter les liens vides (#)
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    /* ========================================
       4. ANIMATION DES CHIFFRES (STATS)
       ======================================== */
    
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        stats.forEach(stat => {
            const finalValue = stat.textContent;
            
            // Si c'est un nombre, animer
            if (!isNaN(parseInt(finalValue))) {
                const duration = 2000;
                const start = 0;
                const end = parseInt(finalValue);
                const increment = end / (duration / 16);
                let current = start;
                
                stat.textContent = '0';
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= end) {
                        stat.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            }
        });
        
        statsAnimated = true;
    }
    
    // Déclencher l'animation quand la section est visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    
    /* ========================================
       5. ANIMATION AU SCROLL (FADE IN)
       ======================================== */
    
    const fadeElements = document.querySelectorAll('.service-card, .card, .advantage-item, .value-card, .valeur-bloc, .realisation-card, .testimonial');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    
    /* ========================================
       6. HEADER STICKY - OMBRE AU SCROLL
       ======================================== */
    
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    
    /* ========================================
       7. FORMATAGE AUTOMATIQUE DU TÉLÉPHONE
       ======================================== */
    
    const phoneInput = document.getElementById('telephone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            
            // Formater le numéro : 06 12 34 56 78
            if (value.length > 0) {
                value = value.match(/.{1,2}/g).join(' ');
                e.target.value = value;
            }
        });
    }
    
});


/* ========================================
   FIN DU SCRIPT
   ======================================== */