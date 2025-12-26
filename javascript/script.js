     // Initialize EmailJS with your Public Key
        (function() {
            emailjs.init("SQYLKtPsQO78Q8yyz"); // Your EmailJS public key
        })();

        // Theme toggle functionality
        var themeToggle = document.getElementById('themeToggle');
        var themeIcon = document.getElementById('themeIcon');
        var body = document.body;

        var savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggle.onclick = function() {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        };

        // Smooth scrolling with offset for fixed navbar
        var links = document.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < links.length; i++) {
            links[i].onclick = function(e) {
                var href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    var target = document.querySelector(href);
                    if (target) {
                        // Get navbar height
                        var navbarHeight = document.querySelector('.navbar').offsetHeight;
                        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
                return false;
            };
        }

        // EmailJS Contact Form Submission
        var contactForm = document.getElementById('contactForm');
        var submitBtn = document.getElementById('submitBtn');
        
        if (contactForm) {
            contactForm.onsubmit = function(e) {
                e.preventDefault();
                
                // Show loading state
                var originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
                submitBtn.disabled = true;
                
                // Collect form data - Use exact parameter names that match your EmailJS template
                var formData = {
                    name: document.getElementById('name').value,       // Use 'name' instead of 'from_name'
                    email: document.getElementById('email').value,     // Use 'email' instead of 'from_email'
                    message: document.getElementById('message').value,
                    reply_to: document.getElementById('email').value   // Important for reply functionality
                };
                
                // Send email using EmailJS
                emailjs.send('service_xbjo10p', 'template_hsy4ykr', formData)
                    .then(function(response) {
                        // Show success message
                        showAlert('success', 'Message Sent!', 'Thank you ' + formData.name + '! Your message has been sent successfully.');
                        contactForm.reset();
                        
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, function(error) {
                        // Show error message with instructions
                        showAlert('danger', 'Configuration Required!', 'Please check your EmailJS template configuration. The recipient email is not set.');
                        console.log('EmailJS Error Details:', error);
                        
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
                
                return false;
            };
        }

        // Function to show custom alert
        function showAlert(type, title, message) {
            // Remove existing alerts
            var existingAlert = document.querySelector('.custom-alert');
            if (existingAlert) {
                existingAlert.remove();
            }
            
            // Create alert element
            var alertDiv = document.createElement('div');
            alertDiv.className = 'custom-alert alert alert-' + type + ' alert-dismissible fade show';
            alertDiv.innerHTML = `
                <strong>${title}</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            // Add to body
            document.body.appendChild(alertDiv);
            
            // Auto remove after 5 seconds
            setTimeout(function() {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 5000);
        }

        // Animation for cards on scroll
        var cards = document.querySelectorAll('.skill-card, .project-card, .timeline-content, .service-card');
        for (var j = 0; j < cards.length; j++) {
            cards[j].style.opacity = '0';
            cards[j].style.transform = 'translateY(20px)';
            cards[j].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }

        if (window.IntersectionObserver) {
            var observer = new IntersectionObserver(function(entries) {
                for (var k = 0; k < entries.length; k++) {
                    if (entries[k].isIntersecting) {
                        entries[k].target.style.opacity = '1';
                        entries[k].target.style.transform = 'translateY(0)';
                    }
                }
            }, { threshold: 0.1 });

            for (var l = 0; l < cards.length; l++) {
                observer.observe(cards[l]);
            }
        }
        
        // Mobile-specific timeline adjustments
        function adjustTimelineForMobile() {
            var timelineItems = document.querySelectorAll('.timeline-item');
            var timeline = document.querySelector('.timeline');
            
            if (window.innerWidth <= 768) {
                // Add mobile-specific class to timeline
                if (timeline) {
                    timeline.classList.add('timeline-mobile');
                }
                
                // Adjust all timeline items for mobile
                timelineItems.forEach(function(item) {
                    var leftContent = item.querySelector('.timeline-left');
                    var rightContent = item.querySelector('.timeline-right');
                    
                    if (leftContent) {
                        leftContent.style.textAlign = 'left';
                        leftContent.style.paddingLeft = '70px';
                        leftContent.style.paddingRight = '20px';
                    }
                    
                    if (rightContent) {
                        rightContent.style.textAlign = 'left';
                        rightContent.style.paddingLeft = '70px';
                        rightContent.style.paddingRight = '20px';
                    }
                });
            } else {
                // Reset for desktop
                if (timeline) {
                    timeline.classList.remove('timeline-mobile');
                }
                
                timelineItems.forEach(function(item) {
                    var leftContent = item.querySelector('.timeline-left');
                    var rightContent = item.querySelector('.timeline-right');
                    
                    if (leftContent) {
                        leftContent.style.textAlign = 'right';
                        leftContent.style.paddingLeft = '0';
                        leftContent.style.paddingRight = '50%';
                    }
                    
                    if (rightContent) {
                        rightContent.style.textAlign = 'left';
                        rightContent.style.paddingLeft = '50%';
                        rightContent.style.paddingRight = '0';
                    }
                });
            }
        }
        
        // Run on load and resize
        window.addEventListener('load', adjustTimelineForMobile);
        window.addEventListener('resize', adjustTimelineForMobile);
        
        // Test EmailJS configuration
        function testEmailJS() {
            var testData = {
                name: "Test User",
                email: "test@example.com",
                message: "This is a test message from portfolio contact form",
                reply_to: "test@example.com"
            };
            
            emailjs.send('service_xbjo10p', 'template_hsy4ykr', testData)
                .then(function(response) {
                    console.log('TEST SUCCESS', response);
                    showAlert('success', 'Test Successful!', 'EmailJS is working correctly!');
                }, function(error) {
                    console.log('TEST FAILED', error);
                    showAlert('danger', 'Test Failed', 'Check your EmailJS template configuration.');
                });
        }
        
        // Uncomment to test
        // testEmailJS();
    