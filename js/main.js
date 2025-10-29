document.addEventListener('DOMContentLoaded', function() {
    // Interactive Video Effect
    const initVideoEffect = () => {
        const video = document.getElementById('bg-video');
        const canvas = document.getElementById('video-overlay');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        // Initial resize
        resizeCanvas();
        
        // Handle window resize
        window.addEventListener('resize', resizeCanvas);
        
        // Particle system
        const particles = [];
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 3000); // Adjust density
        
        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.originalX = this.x;
                this.originalY = this.y;
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = Math.random() * 30 + 1;
                this.color = `hsl(${Math.random() * 60 + 190}, 100%, 70%)`;
                this.velocity = Math.random() * 0.5 + 0.5;
                this.angle = 0;
            }
            
            update(mouse) {
                // Mouse interaction
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let maxDistance = 100;
                
                if (distance < maxDistance) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density * 0.6;
                    let directionY = forceDirectionY * force * this.density * 0.6;
                    
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Return to original position
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
                
                // Floating effect
                this.angle += 0.01;
                this.x += Math.sin(this.angle * this.velocity) * 0.5;
                this.y += Math.cos(this.angle * this.velocity) * 0.5;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        // Mouse position
        const mouse = {
            x: null,
            y: null
        };
        
        // Track mouse movement
        canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        
        // Reset mouse position when leaving canvas
        canvas.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });
        
        // Initialize particles
        function initParticles() {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(mouse);
                particles[i].draw();
            }
            
            // Connect particles
            connectParticles();
            
            requestAnimationFrame(animate);
        }
        
        // Connect nearby particles with lines
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(100, 200, 255, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Initialize and start animation
        initParticles();
        animate();
        
        // Re-initialize on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resizeCanvas();
                initParticles();
            }, 250);
        });
    };
    
    // Initialize video effect if elements exist
    if (document.getElementById('bg-video') && document.getElementById('video-overlay')) {
        initVideoEffect();
    }
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Course data - this would typically come from a backend API
    const courses = [
        {
            id: 1,
            title: 'Get to Know the Metaverse',
            description: 'Chapter 1',
            image: 'assets/imgs/01_front_ch01.png',
            hoverImage: 'assets/imgs/01_front_ch01.gif',
            duration: '8 weeks',
            level: 'Beginner'
        },
        {
            id: 2,
            title: 'Application and Technology',
            description: 'Chapter 2',
            image: 'assets/imgs/01_front_ch02.png',
            hoverImage: 'assets/imgs/01_front_ch02.gif',
            duration: '10 weeks',
            level: 'Intermediate'
        },
        {
            id: 3,
            title: 'Ecology and Development',
            description: 'Chapter 3',
            image: 'assets/imgs/01_front_ch03.png',
            hoverImage: 'assets/imgs/01_front_ch03.png',
            duration: '12 weeks',
            level: 'Advanced'
        },
        {
            id: 4,
            title: 'Future with AI and its Practices',
            description: 'Chapter 4',
            image: 'assets/imgs/01_front_ch04.png',
            hoverImage: 'assets/imgs/01_front_ch04.gif',
            duration: '6 weeks',
            level: 'Beginner'
        }
    ];

    // Function to create course cards
    function createCourseCard(course) {
        return `
            <div class="course-card" data-aos="fade-up" data-course-id="${course.id}">
                <div class="course-img-container">
                    <img src="${course.image}" alt="${course.title}" class="course-img static-img">
                    <img src="${course.hoverImage}" alt="${course.title}" class="course-img hover-img">
                </div>
                <div class="course-content">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span class="level">${course.level}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Handle course card click
    function handleCourseClick(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            if (courseId === 1) {
                // Navigate to ch01.html for the first course
                window.location.href = 'ch01.html';
            } else {
                // Default action for other courses
                console.log('Course clicked:', course.title);
            }
        }
    }

    // Add event delegation for course cards
    function setupCourseCardEvents() {
        const courseGrid = document.querySelector('.course-grid');
        if (courseGrid) {
            courseGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.course-card');
                if (card) {
                    const courseId = parseInt(card.dataset.courseId, 10);
                    handleCourseClick(courseId);
                }
            });
        }
    }

    // Render courses
    function renderCourses() {
        const courseGrid = document.querySelector('.course-grid');
        if (courseGrid) {
            courseGrid.innerHTML = courses.map(course => createCourseCard(course)).join('');
            setupCourseCardEvents();
        }
    }

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNav() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.remove('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', highlightNav);
    
    // Initial render
    renderCourses();
    highlightNav();

    // Add loading animation
    window.addEventListener('load', function() {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    });

    // Add animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.course-card, .feature, h2, .hero .container > *');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial styles for animation
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.course-card, .feature, h2, .hero .container > *');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Trigger initial animation
        setTimeout(animateOnScroll, 300);
    });

    // Add scroll event for animations
    window.addEventListener('scroll', animateOnScroll);

    // Graffiti elements functionality has been removed

    // Add loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loader"></div>';
    document.body.prepend(loadingScreen);

    // Remove loading screen after page loads
    window.addEventListener('load', () => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    });
});

// Add service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
