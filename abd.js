// --- TARJIMA TIZIMI (MULTILANGUAGE) ---
const translations = {
    'uz': {
        'nav_home': 'Asosiy',
        'nav_projects': 'Loyihalarim',
        'hero_salom': 'Salom, Men',
        'hero_description': 'Men raqamli olamda eng zamonaviy texnologiyalar bilan chiroyli interfeyslar yarataman.',
        'hero_btn': 'Tanishish',
        'typing_words': '["Dilnura", "Veb Developer", "UI/UX Designer"]'
    },
    'en': {
        'nav_home': 'Home',
        'nav_projects': 'Projects',
        'hero_salom': 'Hello, I am',
        'hero_description': 'I create beautiful interfaces in the digital world using state-of-the-art technologies.',
        'hero_btn': 'Discover',
        'typing_words': '["Dilnura", "Web Developer", "UI/UX Designer"]'
    }
    // Boshqa tillarni ham shu yerga qo'shishingiz mumkin
};

// Joriy tilni olish (Default: uz)
let currentLang = localStorage.getItem('portfolio_lang') || 'uz';

function updateLanguage() {
    const data = translations[currentLang];
    
    // Matnlarni yangilash
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (data[key]) {
            element.innerText = data[key];
        }
    });

    // Typing effektini yangilash
    if (typingWords) {
        typingWords = JSON.parse(data['typing_words']);
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;
    }
}

// Tilni almashtirish funksiyasi
function switchLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('portfolio_lang', lang);
        updateLanguage();
    }
}

// --- TYPING EFFEKTI ---
let typingWords = ["Dilnura", "Veb Developer", "UI/UX Designer"]; // Default
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = typingWords[wordIndex];
    const typingElement = document.getElementById("typing");

    if (!typingElement) return;

    if (isDeleting) {
        typingElement.innerHTML = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.innerHTML = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 70 : 130;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1800; // So'z oxirida pauza
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        speed = 400; // Keyingi so'zga o'tishdan oldin pauza
    }

    setTimeout(typeEffect, speed);
}

// --- KUN VA TUN REJIMI (DARK/LIGHT MODE) ---
const bodyElement = document.body;
const modeSwitch = document.getElementById("modeSwitch");

// Joriy rejimni olish (Default: dark)
let currentMode = localStorage.getItem('portfolio_mode') || 'dark';

function applyMode() {
    if (currentMode === 'light') {
        bodyElement.classList.add('light-mode');
        modeSwitch.innerHTML = '<i class="fas fa-sun"></i>'; // Quyosh ikonkasi
    } else {
        bodyElement.classList.remove('light-mode');
        modeSwitch.innerHTML = '<i class="fas fa-moon"></i>'; // Oy ikonkasi
    }
}

// Rejimni almashtirish funksiyasi
function switchMode() {
    currentMode = (currentMode === 'dark') ? 'light' : 'dark';
    localStorage.setItem('portfolio_mode', currentMode);
    applyMode();
}

// --- SICHQONCHA ORQASIDAGI OQ YULDUZLAR EFFEKTI (MOUSE TRAIL) ---
const trailCanvas = document.getElementById("mouseTrailCanvas");
const trailCtx = trailCanvas.getContext("2d");

trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;

const trailParticles = [];

function TrailParticle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1; // 1-3px
    this.speedX = Math.random() * 0.5 - 0.25; // -0.25 dan 0.25 gacha
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = getComputedStyle(document.documentElement).getPropertyValue('--mouse-trail-color');
    this.life = 1; // 100% life
}

TrailParticle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.02; // Tezda yo'qoladi
    if (this.size > 0.1) this.size -= 0.1;
}

TrailParticle.prototype.draw = function() {
    trailCtx.fillStyle = this.color.replace(')', `, ${this.life})`); // Alfa-kanal orqali shaffoflik
    trailCtx.beginPath();
    trailCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    trailCtx.fill();
}

function handleTrailParticles() {
    for (let i = 0; i < trailParticles.length; i++) {
        trailParticles[i].update();
        trailParticles[i].draw();
        
        if (trailParticles[i].life <= 0) {
            trailParticles.splice(i, 1);
            i--;
        }
    }
}

function animateTrail() {
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    handleTrailParticles();
    requestAnimationFrame(animateTrail);
}

// Sichqoncha harakatini tinglash
window.addEventListener('mousemove', function(event) {
    for (let i = 0; i < 2; i++) { // Bitta harakatda 2 ta zarracha
        trailParticles.push(new TrailParticle(event.x, event.y));
    }
});

// --- ORQA FONDAGI KOSMOS EFFEKTI (BG CANVAS) ---
const bgCanvas = document.getElementById("bgCanvas");
const bgCtx = bgCanvas.getContext("2d");

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

const stars = [];

function createStars() {
    stars.length = 0;
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            r: Math.random() * 1.5 + 0.5,
            speedY: Math.random() * 0.2 + 0.1
        });
    }
}

function drawStars() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.fillStyle = getComputedStyle(document.body).backgroundColor; // Hozirgi fondan foydalanish
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    bgCtx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted');
    stars.forEach(star => {
        bgCtx.beginPath();
        bgCtx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        bgCtx.fill();
        star.y += star.speedY;
        if (star.y > bgCanvas.height) star.y = 0;
    });
    requestAnimationFrame(drawStars);
}

// --- INITIALIZATION (ISHGA TUSHIRISH) ---
window.addEventListener('DOMContentLoaded', () => {
    updateLanguage(); // Tilni qo'llash
    typeEffect(); // Typing effektini boshlash
    applyMode(); // Rejimni qo'llash
    
    createStars();
    drawStars();
    animateTrail();

    // Resize hodisasi
    window.addEventListener('resize', () => {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
        createStars();
    });
});