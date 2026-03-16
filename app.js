const UI = {
    quotes: document.querySelectorAll('.quote'),
    overlay: (id) => document.getElementById(id),
    lang: 'en'
};

// 1. Hero Slider
let qIdx = 0;
if (UI.quotes.length) {
    setInterval(() => {
        UI.quotes[qIdx].classList.remove('active');
        qIdx = (qIdx + 1) % UI.quotes.length;
        UI.quotes[qIdx].classList.add('active');
    }, 3000);
}

// 2. Universal Modal Handler
function openM(id) {
    const m = UI.overlay(id);
    if (!m) return;
    m.style.display = 'flex';
    setTimeout(() => m.classList.add('active'), 10);
}

function closeM(id) {
    const m = UI.overlay(id);
    if (!m) return;
    m.classList.remove('active');
    setTimeout(() => {
        m.style.display = 'none';
        if(id === 'portalModal') resetSelection();
    }, 500);
}

// 3. Language Engine
function toggleLang() {
    UI.lang = UI.lang === 'en' ? 'hi' : 'en';
    document.getElementById('langBtn').innerText = UI.lang === 'en' ? 'हिन्दी' : 'English';
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${UI.lang}`);
    });
}

// 4. Content Loaders
function openInfo(title, desc, isHTML = false) {
    document.getElementById('infoTitle').innerText = title;
    const descEl = document.getElementById('infoDesc');
    isHTML ? descEl.innerHTML = desc : descEl.innerText = desc;
    openM('infoModal');
}

function openBio(name, post, details, email = "") {
    const content = `<div style="color:var(--orange);font-weight:700;margin-bottom:10px;">${post}</div>
                     <div style="line-height:1.6;">${details}</div>
                     ${email ? `<br>📧 <a href="mailto:${email}" style="color:var(--accent);text-decoration:none;">${email}</a>` : ""}`;
    openInfo(name, content, true);
}

// 5. Contact Logic
function sendMessage() {
    const name = document.getElementById('senderName').value;
    if(!name) return alert("Please enter your name");
    
    const btn = document.querySelector('.glass-submit-btn');
    btn.innerText = "Sending...";
    
    setTimeout(() => {
        btn.innerText = "Sent! ✅";
        btn.style.background = "var(--green)";
        alert(`Thanks ${name}, message sent!`);
        ['senderName', 'senderPhone', 'messageBody'].forEach(id => document.getElementById(id).value = "");
    }, 1200);
}

// Helper: Image Zoom & Login
function zoomImg(el) {
    document.getElementById('zoomedImg').src = el.querySelector('img').src;
    openM('zoomOverlay');
}
function closeZoom() { closeM('zoomOverlay'); }
function showL(t) { 
    document.getElementById('selectionMenu').style.display='none'; 
    document.getElementById('loginForm').style.display='block';
    document.getElementById('lTitle').innerText = t + ' Login';
}
function resetSelection() {
    document.getElementById('selectionMenu').style.display='block';
    document.getElementById('loginForm').style.display='none';
}