document.addEventListener('DOMContentLoaded', function() {
    // Burger menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Theme toggle - ИСПРАВЛЕННАЯ ЧАСТЬ
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Проверяем сохранённую тему или используем светлую по умолчанию
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        let newTheme;
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            newTheme = 'dark';
        } else {
            newTheme = 'light';
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Modal window
    const modal = document.querySelector('.modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModal = document.querySelector('.close-modal');
    
    openModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show an alert
        alert('Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.');
        
        // Reset form and close modal
        this.reset();
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-image, .product-card, .review');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.about-image, .product-card, .review').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Auto-scroll reviews
    const reviewsSlider = document.querySelector('.reviews-slider');
    let scrollAmount = 0;
    let scrollInterval;
    
    function startAutoScroll() {
        scrollInterval = setInterval(function() {
            scrollAmount += 1;
            reviewsSlider.scrollLeft = scrollAmount;
            
            if (scrollAmount >= reviewsSlider.scrollWidth - reviewsSlider.clientWidth) {
                scrollAmount = 0;
                reviewsSlider.scrollLeft = 0;
            }
        }, 30);
    }
    
    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }
    
    reviewsSlider.addEventListener('mouseenter', stopAutoScroll);
    reviewsSlider.addEventListener('mouseleave', startAutoScroll);
    
    startAutoScroll();
});