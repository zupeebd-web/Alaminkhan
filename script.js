 // --- 1. Three.js Subtle Background (Professional White Theme) ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles - Blue/Grey Clean Dots
const geometry = new THREE.BufferGeometry();
const count = 1000;
const posArray = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x2563eb, // Blue particles
    transparent: true,
    opacity: 0.6
});

const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

camera.position.z = 3;

// Mouse Movement Effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX * 0.0005;
    mouseY = event.clientY * 0.0005;
});

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();
    
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = mouseY;
    particlesMesh.rotation.y += mouseX;
    
    // Wave motion
    particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.1;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// --- 2. Carousel Logic (3 Specific Images) ---
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const radius = 220; // Distance from center

// Position items in 3D circle
items.forEach((item, index) => {
    // 4 items (3 images + 1 duplicate for full circle effect or just spacing)
    // Using 4 divisions to make it square/circular
    const angle = index * 90; 
    item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
});

let currDeg = 0;
function rotateCarousel() {
    currDeg -= 0.2; // Slow smooth rotation
    carousel.style.transform = `rotateY(${currDeg}deg)`;
    requestAnimationFrame(rotateCarousel);
}
rotateCarousel();


// --- 3. Advanced Chatbot Logic (Bangla + English) ---
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.querySelector('.chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

chatToggle.addEventListener('click', () => chatWindow.classList.add('active'));
closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

// Message Sender
function addMessage(text, type) {
    const div = document.createElement('div');
    div.classList.add('msg', type);
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Bot Brain (Response Logic)
function getBotResponse(input) {
    const text = input.toLowerCase();

    // Keywords mapping
    const greetings = ['hi', 'hello', 'salam', 'assalamu alaikum', 'kemon', 'how are you'];
    const identity = ['name', 'nam', 'who', 'tumi ke', 'parichay', 'identity'];
    const owner = ['alamin', 'owner', 'malik', 'sir'];
    const info = ['age', 'boyosh', 'old', 'birthday'];
    const location = ['home', 'bari', 'thaken', 'live', 'address', 'manikganj', 'location'];
    const work = ['work', 'kaj', 'profession', 'ki koren', 'job', 'service', 'offer'];
    const skills = ['skill', 'pare', 'language', 'tech', 'technology'];
    const contact = ['contact', 'jogajog', 'number', 'phone', 'whatsapp', 'facebook', 'email', 'hire'];
    
    // Logic
    if (greetings.some(w => text.includes(w))) {
        return "ওয়ালাইকুম আসসালাম! আমি আল আমিন স্যারের পার্সোনাল এসিস্ট্যান্ট। আমি ভালো আছি, আপনি কেমন আছেন?";
    }
    
    if (identity.some(w => text.includes(w))) {
        return "আমি একটি AI চ্যাটবট, আমাকে তৈরি করেছেন আল আমিন স্যার।";
    }

    if (info.some(w => text.includes(w))) {
        return "আল আমিন স্যারের বয়স ২৩ বছর।";
    }

    if (location.some(w => text.includes(w))) {
        return "স্যারের বাসা মানিকগঞ্জ, বাংলাদেশ।";
    }

    if (work.some(w => text.includes(w))) {
        return "আল আমিন স্যার একজন প্রফেশনাল ফ্রিল্যান্স ওয়েব ডেভেলপার। তিনি ওয়েবসাইট ডিজাইন, ডেভেলপমেন্ট এবং অপ্টিমাইজেশন এর কাজ করেন।";
    }

    if (skills.some(w => text.includes(w))) {
        return "স্যারের স্কিলগুলো হলো: HTML, CSS, JavaScript, React, এবং Creative Animation (GSAP/Three.js)।";
    }

    if (contact.some(w => text.includes(w))) {
        return "স্যারের সাথে যোগাযোগ করতে পারেন:\nWhatsApp: 01326251753\nঅথবা পেজের নিচের ফেসবুক বাটনে ক্লিক করুন।";
    }

    // Default Fallback for Unknown Topics
    return "দুঃখিত, আমি আল আমিন স্যার ছাড়া অন্য কোনো বিষয় সম্পর্কে জানিনা। দয়া করে স্যারের কাজ বা যোগাযোগ নিয়ে প্রশ্ন করুন।";
}

// Event Listeners for Chat
function handleChat() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    addMessage(userText, 'user');
    chatInput.value = "";

    // Simulate thinking delay
    setTimeout(() => {
        const botText = getBotResponse(userText);
        addMessage(botText, 'bot');
    }, 600);
}

sendBtn.addEventListener('click', handleChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});

// --- 4. Intro Animations (GSAP) ---
gsap.from(".navbar", { y: -100, duration: 1, ease: "power2.out" });
gsap.from(".hero-text", { x: -100, opacity: 0, duration: 1, delay: 0.5 });
gsap.from(".carousel-container", { scale: 0, opacity: 0, duration: 1.5, delay: 0.5, ease: "back.out(1.7)" });
