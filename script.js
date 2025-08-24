// Smooth scrolling for navigation links
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

// Update active navigation link based on scroll position
const navLinks = document.querySelectorAll('.nav-links a');
const footerLinks = document.querySelectorAll('.footer-link[data-section]');
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            footerLinks.forEach(link => link.classList.remove('active'));
            
            const correspondingNav = document.querySelector(`a[href="#${section.id}"]`);
            if (correspondingNav) {
                correspondingNav.classList.add('active');
            }
            
            const correspondingFooter = document.querySelector(`.footer-link[data-section="${section.id}"]`);
            if (correspondingFooter) {
                correspondingFooter.classList.add('active');
            }
        }
    });
}

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const moonIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light');
    moonIcon.classList.remove('fa-moon');
    moonIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', function() {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    
    if (isLight) {
        moonIcon.classList.remove('fa-moon');
        moonIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        moonIcon.classList.remove('fa-sun');
        moonIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Initial call

// Add subtle animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add initial styles and observe sections
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
async function loadSpotifyNowPlaying() {
  try {
    const res = await fetch('http://localhost:8888/current-track');
    const data = await res.json();

    const profilePicUrl = "akanksha.jpg"; // path to your profile image

    const widget = document.getElementById('spotifyNowPlaying');

    if (!data.playing) {
      widget.innerHTML = `
        <img src="${profilePicUrl}" alt="Spotify avatar" class="spotify-avatar" />
        <div class="spotify-track-details">
          <span class="profile-name">Akanksha</span>
          <span class="track-info" style="color:#b3b3b3;font-style:italic;">Not listening right now! Probably working or studying.</span>
        </div>
      `;
      return;
    }

    const item = data.item;
    const artistNames = item.artists.map(a => a.name).join(' • ');

    widget.innerHTML = `
      <img src="${profilePicUrl}" alt="Spotify avatar" class="spotify-avatar" />
      <div class="spotify-track-details">
        <span class="profile-name">Akanksha</span>
        <span class="track-info"><b>${item.name}</b> &ndash; ${artistNames}</span>
        <span class="album-info"><span class="spotify-icon">⏺️</span>${item.album.name}</span>
      </div>
    `;
  } catch (e) {
    document.getElementById('spotifyNowPlaying').innerHTML =
      `<span style="color:#b3b3b3;">Cannot fetch Spotify status right now.</span>`;
  }
}
window.addEventListener('DOMContentLoaded', loadSpotifyNowPlaying);
