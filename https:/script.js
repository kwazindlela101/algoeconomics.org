// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Create sparkline charts
    createSparklineCharts();
    
    // Today's Brief CTA functionality
    const briefButton = document.querySelector('.brief-btn');
    if (briefButton) {
        briefButton.addEventListener('click', function() {
            alert("Thank you for your interest! We're preparing your free market brief and will email it to you shortly.");
        });
    }

    // NEW: Live Market Data Updates
    updateMarketData();
    setInterval(updateMarketData, 30000);

    // NEW: Newsletter Form Handler
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('.btn');
            
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitBtn.style.background = 'var(--success)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // NEW: Cookie Consent
    initializeCookieConsent();

    // NEW: Simulate live updates every 2 minutes
    setInterval(simulateLiveUpdates, 120000);
});

function createSparklineCharts() {
    // Data for different African cities
    const cities = [
        { id: 'lagosChart', data: [65, 59, 80, 81, 76, 75, 80], color: 'rgba(45, 80, 22, 1)' },
        { id: 'nairobiChart', data: [45, 55, 65, 75, 80, 85, 90], color: 'rgba(45, 80, 22, 1)' },
        { id: 'johannesburgChart', data: [80, 75, 70, 65, 60, 65, 70], color: 'rgba(45, 80, 22, 1)' }
    ];

    cities.forEach(city => {
        const ctx = document.getElementById(city.id);
        if (ctx) {
            new Chart(ctx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        data: city.data,
                        borderColor: city.color,
                        backgroundColor: 'rgba(45, 80, 22, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    }
                }
            });
        }
    });
}

// NEW: Live Market Data Function
function updateMarketData() {
    const indicators = [
        { selector: '.indicator:nth-child(1) .indicator-value', min: 7400, max: 7800 },
        { selector: '.indicator:nth-child(2) .indicator-value', min: 1.25, max: 1.30, decimals: 4 },
        { selector: '.indicator:nth-child(3) .indicator-value', min: 72000, max: 76000 },
        { selector: '.indicator:nth-child(4) .indicator-value', min: 1400, max: 1600, decimals: 2 }
    ];

    indicators.forEach(indicator => {
        const change = (Math.random() - 0.5) * 2;
        const currentElement = document.querySelector(`${indicator.selector}`);
        if (currentElement) {
            const currentValue = parseFloat(currentElement.textContent.replace(/,/g, ''));
            const newValue = currentValue * (1 + change/100);
            const formattedValue = indicator.decimals ? 
                newValue.toFixed(indicator.decimals) : 
                Math.round(newValue).toLocaleString();
            
            currentElement.textContent = formattedValue;
            
            // Update change indicator
            const changeElement = currentElement.parentElement.querySelector('.indicator-change');
            if (changeElement) {
                changeElement.className = `indicator-change ${change >= 0 ? 'positive' : 'negative'}`;
                changeElement.innerHTML = `${change >= 0 ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>'} ${Math.abs(change).toFixed(1)}%`;
            }
        }
    });
}

// NEW: Cookie Consent Function
function initializeCookieConsent() {
    if (!localStorage.getItem('cookiesAccepted')) {
        const cookieConsent = document.createElement('div');
        cookieConsent.id = 'cookieConsent';
        cookieConsent.className = 'cookie-consent';
        cookieConsent.innerHTML = `
            <div class="container">
                <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button id="acceptCookies" class="btn btn-small">Accept</button>
                    <button id="declineCookies" class="btn btn-small btn-outline">Decline</button>
                </div>
            </div>
        `;
        document.body.appendChild(cookieConsent);

        document.getElementById('acceptCookies').addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.remove();
        });

        document.getElementById('declineCookies').addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'false');
            cookieConsent.remove();
        });
    }
}

// NEW: Real-time News Alerts
function simulateLiveUpdates() {
    const events = [
        "BREAKING: Bank of England holds interest rates at 5.25%",
        "NEW: Nigerian GDP grows 3.2% in Q2 2024",
        "ALERT: South African Rand strengthens against Dollar",
        "UPDATE: Kenya secures $500M IMF funding"
    ];
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    showNewsAlert(randomEvent);
}

function showNewsAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'news-alert';
    alert.innerHTML = `
        <div class="container">
            <span class="alert-badge">LIVE</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close">&times;</button>
        </div>
    `;
    
    document.body.prepend(alert);
    
    // Add close functionality
    alert.querySelector('.alert-close').addEventListener('click', function() {
        alert.remove();
    });
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 10000);
}

// NEW: Error handling for charts
try {
    createSparklineCharts();
} catch (error) {
    console.warn('Chart initialization failed:', error);
}

// NEW: Network status indicator
window.addEventListener('online', () => {
    showNotification('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showNotification('You are currently offline', 'warning');
});

function showNotification(message, type) {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
