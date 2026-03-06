// --- 1. Three.js Animated Background ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15; // Spread
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xff0033,
    transparent: true,
    opacity: 0.8,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Grid Floor
const gridHelper = new THREE.GridHelper(20, 20, 0xff0033, 0x444444);
gridHelper.rotation.x = Math.PI / 2.5;
gridHelper.position.y = -2;
scene.add(gridHelper);

camera.position.z = 3;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = mouseY * 0.2;
    particlesMesh.rotation.y += mouseX * 0.2;

    // Gentle wave effect
    gridHelper.position.z = (elapsedTime * 0.2) % 1;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// --- 2. Cinematic Intro Animation (GSAP) ---
const timeline = gsap.timeline();

timeline.to(".neon-line", { width: "100%", duration: 1, ease: "power2.inOut" })
        .from(".glitch", { opacity: 0, y: 20, duration: 1 })
        .from(".fade-text", { opacity: 0, duration: 1 })
        .to("#intro-overlay", { opacity: 0, duration: 1, delay: 1, pointerEvents: "none" })
        .from("#hero", { opacity: 0, y: 50, duration: 1 });


// --- 3. 3D Rotating Carousel ---
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const radius = 250; // Distance from center
let currdeg = 0;

// Arrange items in a circle
items.forEach((item, index) => {
    const angle = (360 / items.length) * index;
    item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
});

// Auto Rotate
function rotateCarousel() {
    currdeg -= 0.5; // Speed
    carousel.style.transform = `rotateY(${currdeg}deg)`;
    requestAnimationFrame(rotateCarousel);
}
rotateCarousel();

// Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel-container').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel-container').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) currdeg -= 60; // Swipe Left
    if (touchStartX - touchEndX < -50) currdeg += 60; // Swipe Right
});


// --- 4. Scroll Story Animation ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));


// --- 5. AI Chatbot Logic ---
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chatbot-container');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatBody = document.getElementById('chat-body');

// Toggle Chat
chatToggle.addEventListener('click', () => chatContainer.classList.add('active'));
closeChat.addEventListener('click', () => chatContainer.classList.remove('active'));

// Message Logic
function addMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('msg', sender);
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(text) {
    const lowerText = text.toLowerCase();
    let reply = "I didn't quite catch that. Try asking about Alamin's services or contact info.";

    if (lowerText.includes('who') || lowerText.includes('alamin')) {
        reply = "Alamin Khan is a 23-year-old Freelance Web Developer from Manikganj, passionate about futuristic UI.";
    } else if (lowerText.includes('service') || lowerText.includes('offer')) {
        reply = "He offers Frontend Development, UI/UX Animation, and Website Optimization.";
    } else if (lowerText.includes('contact') || lowerText.includes('hire')) {
        reply = "You can contact him via WhatsApp: 01326251753 or Facebook.";
    } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        reply = "Hello there! How can I help you today?";
    }

    setTimeout(() => addMessage(reply, 'bot'), 500);
}

sendBtn.addEventListener('click', () => {
    const text = chatInput.value;
    if (text.trim() === "") return;
    addMessage(text, 'user');
    botReply(text);
    chatInput.value = "";
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
