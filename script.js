// script.js - Complete Premium Birthday Surprise Website
// =======================================================

// ========== 1. GLOBAL VARIABLES & CONFIGURATION ==========
const birthdayName = "Garima";   // ✨ Change this to the special person's name ✨
const audioFile = "./birthday-music.mp3";            // Replace with your local MP3 path: "assets/song.mp3"
const videoFile = "";            // Replace with your video file: "assets/birthday.mp4"

// Gallery placeholder images (high-quality unsplash / loremflick)
const galleryImages = [
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format",
  "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format",
  "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=600&auto=format",
  "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?w=600&auto=format",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format"
];

// Memory cards content (emotional, mature messages)
const memoryMessages = [
"हर साल birthday आता है, लेकिन कुछ लोगों के लिए थोड़ा extra effort करने का मन अपने आप हो जाता है। शायद तुम उन्हीं लोगों में से हो। ✨",

"समय के साथ बहुत सी चीज़ें बदल जाती हैं — बातें, लोग, priorities… लेकिन कुछ लोगों के लिए अच्छी wishes कभी पुरानी नहीं होतीं। 🌙",

"यह जरूरी नहीं कि हर बात हमेशा कही जाए, लेकिन कुछ लोग ऐसे होते हैं जिनके लिए दिल से अच्छा सोचना अपने आप होता रहता है। 🌸",

"उम्मीद है तुम्हारा आने वाला साल तुम्हें अच्छे moments, सही लोग, नई opportunities और बहुत सारी genuine खुशियाँ दे। 💫",

"ज़िंदगी कभी perfect नहीं होती, लेकिन उम्मीद है तुम्हारी जिंदगी में हमेशा ऐसे moments रहें जिन्हें याद करके मुस्कुराया जा सके। 🌼",

"वैसे तो यह सिर्फ एक website है, लेकिन इसके पीछे time, effort और एक simple सी बात है — तुम्हारा birthday थोड़ा और special लगे। 🎁",

"कुछ gifts expensive होते हैं, कुछ memorable… यह वाला बस अलग बनाने की कोशिश की है। क्योंकि normal wish भेजना थोड़ा boring लगा 😄",

"वैसे एक बात माननी पड़ेगी — normal birthday wish भेजना easy था, लेकिन थोड़ा hatke करना ज़्यादा मज़ेदार लगा 😄",

"अगर यह website थोड़ी over लगे… तो हाँ, थोड़ा time ज़्यादा लग गया था बनाने में 😂",

"वैसे tension मत लेना — इसमें कोई hidden exam नहीं है, बस scroll करना है 😌",

"Birthday वाले दिन calories count नहीं होतीं… तो cake बिना guilt के खाना 🎂😄",

"और हाँ… इतनी लंबी website देखकर यह मत सोचना कि मैं free बैठा था 😭",

"अगर यहाँ तक scroll कर लिया है… तो respect मिलता है तुम्हें 🫡😄",

"वैसे honestly, simple HBD लिखकर काम चल सकता था… लेकिन थोड़ा effort वाला option चुन लिया 😌✨",

"बस इतना याद रखना — birthday तुम्हारा है, लेकिन extra overthinking शायद मेरी हो गई website बनाते-बनाते 😂",

"चलो अब smile करो 😄 आखिर birthday है boss 🎉",

"Birthday सिर्फ age बढ़ने का reminder नहीं होता — यह एक नया chapter भी होता है। उम्मीद है तुम्हारा यह chapter बहुत अच्छा जाए। 📖",

"तुम जहाँ भी रहो, जैसी भी रहो — बस genuinely खुश रहना, life enjoy करना और अपने goals पूरे करना। ⭐",

"Happy Birthday 🎂 बाकी सब अपनी जगह, लेकिन honestly — उम्मीद है तुम्हारे चेहरे की smile कभी कम न हो। ❤️"
];

// Surprise messages (hidden stars / hearts)
const secretMessages = {
  secretSurprise1: "⭐ You are the most brilliant supernova in this universe ⭐",
  secretSurprise2: "💛 Every moment with you is a golden memory. Keep shining 💛",
  secretSurprise3: "🌙 May your dreams reach the farthest galaxy, limitless and free 🌙",
  secretSurprise4: "🌟 Your kindness lights up every dark corner – never forget that 🌟",
  secretSurprise5: "🎁 This day is as special as you are, infinitely precious. Cheers to you! 🎁"
};

// ========== 2. DOM ELEMENTS ==========
const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");
const enterBtn = document.getElementById("enterBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const musicIconSpan = document.getElementById("musicIcon");
const bgAudio = document.getElementById("bgAudio");
const galleryGrid = document.getElementById("galleryGrid");
const memoriesGrid = document.getElementById("memoriesGrid");
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".close-lightbox");
const toast = document.getElementById("customToast");

// Video element setup
const birthdayVideo = document.getElementById("birthdayVideo");
if (videoFile && birthdayVideo) {
  birthdayVideo.querySelector("source").src = videoFile;
  birthdayVideo.load();
}

// ========== 3. AUDIO SETUP ==========
if (bgAudio && audioFile) {
  bgAudio.src = audioFile;
  bgAudio.load();
}
let isMusicPlaying = false;

// Play/Pause Music
function toggleMusic() {
  if (!bgAudio) return;
  if (isMusicPlaying) {
    bgAudio.pause();
    musicIconSpan.innerText = "🎵";
    isMusicPlaying = false;
  } else {
    bgAudio.play().catch(e => console.log("Audio play prevented until user interaction, click again"));
    musicIconSpan.innerText = "⏸️";
    isMusicPlaying = true;
  }
}
if (playPauseBtn) {
  playPauseBtn.addEventListener("click", toggleMusic);
}

// ========== 4. TYPING EFFECT (intro) ==========
const typedLine1 = document.getElementById("typedLine1");
const typedLine2 = document.getElementById("typedLine2");
const line1Text = "A Small Surprise";
const line2Text = `Happy Birthday ${birthdayName}`;

function typeWriter(element, text, speed, callback) {
  let i = 0;
  element.innerHTML = "";
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) callback();
  }
  typing();
}

// Start typing animation on load
window.addEventListener("load", () => {
  typeWriter(typedLine1, line1Text, 70, () => {
    typeWriter(typedLine2, line2Text, 70, null);
  });
});

// ========== 5. INTRO FADE + HIDE/SHOW MAIN (fix hidden page bug) ==========
function revealMainWebsite() {
  if (!introScreen || !mainContent) return;
  introScreen.classList.add("fade-out");
  setTimeout(() => {
    introScreen.style.display = "none";   // completely remove intro
    mainContent.classList.remove("hidden");  // show main content
    document.body.style.overflow = "auto";  // ensure scrolling
    // Also try to play audio after user gesture (autoplay policies)
    if (bgAudio && audioFile && !isMusicPlaying) {
      bgAudio.play().then(() => {
        isMusicPlaying = true;
        if(musicIconSpan) musicIconSpan.innerText = "⏸️";
      }).catch(() => {});
    }
  }, 1000);
}

if (enterBtn) {
  enterBtn.addEventListener("click", revealMainWebsite);
}

// ========== 6. CANVAS ANIMATED STARS BACKGROUND ==========
const canvas = document.getElementById("starCanvas");
let ctx = canvas.getContext("2d");
let stars = [];
let starCount = 250;

function initStars() {
  stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.15,
      twinkle: Math.random() * 0.05,
    });
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
}

function drawStars() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    let glow = Math.sin(Date.now() * 0.001 * s.twinkle) * 0.2 + 0.6;
    ctx.fillStyle = `rgba(255, 225, 140, ${s.alpha * glow})`;
    ctx.fill();
    // small movement
    s.x += s.speedX;
    s.y += s.speedY;
    if (s.x < 0) s.x = canvas.width;
    if (s.x > canvas.width) s.x = 0;
    if (s.y < 0) s.y = canvas.height;
    if (s.y > canvas.height) s.y = 0;
  }
  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", () => {
  resizeCanvas();
});
resizeCanvas();
drawStars();

// ========== 7. PHOTO GALLERY (dynamic + Lightbox) ==========
function buildGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = "";
  galleryImages.forEach((imgUrl, idx) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = `Birthday memory ${idx+1}`;
    img.loading = "lazy";
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(imgUrl);
    });
    card.appendChild(img);
    galleryGrid.appendChild(card);
  });
}

function openLightbox(imageSrc) {
  if (!lightboxModal || !lightboxImg) return;
  lightboxImg.src = imageSrc;
  lightboxModal.style.display = "flex";
}
function closeLightboxModal() {
  if (lightboxModal) lightboxModal.style.display = "none";
}
if (closeLightbox) closeLightbox.addEventListener("click", closeLightboxModal);
lightboxModal?.addEventListener("click", (e) => {
  if (e.target === lightboxModal) closeLightboxModal();
});

// ========== 8. MEMORIES CARDS ==========
function buildMemories() {
  if (!memoriesGrid) return;
  memoriesGrid.innerHTML = "";
  memoryMessages.forEach((msg, index) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    const msgPara = document.createElement("p");
    msgPara.className = "memory-message";
    msgPara.innerText = `✧ ${msg} ✧`;
    card.appendChild(msgPara);
    memoriesGrid.appendChild(card);
  });
}

// ========== 9. HIDDEN SURPRISE STARS / HEARTS (Toast popup) ==========
function showToast(message) {
  if (!toast) return;
  toast.innerText = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) scale(1)";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) scale(0.9)";
  }, 3000);
}

function initHiddenSurprises() {
  for (const [id, msg] of Object.entries(secretMessages)) {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("click", (e) => {
        e.stopPropagation();
        showToast(msg);
        // add little joy animation
        element.style.transform = "scale(1.5)";
        setTimeout(() => { element.style.transform = ""; }, 300);
      });
    }
  }
}

// ========== 10. EXTRA: VIDEO FALLBACK AND SMOOTH SCROLLING ==========
// Smooth scroll for better experience
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ========== 11. INITIALIZE EVERYTHING AFTER DOM ==========
document.addEventListener("DOMContentLoaded", () => {
  buildGallery();
  buildMemories();
  initHiddenSurprises();
  
  // Ensure main content is hidden at start & intro visible
  mainContent.classList.add("hidden");
  introScreen.style.display = "flex";
  introScreen.classList.remove("fade-out");
  
  // Additional fix: if there is any audio autoplay blocker, just setup
  if (bgAudio && audioFile) {
    bgAudio.volume = 0.6;
  }
  
  // For mobile responsiveness ensure canvas works on orientation change
  window.dispatchEvent(new Event('resize'));
});

// ========== 12. ADDITIONAL: HOVER GOLD EFFECT FOR GALLERY & FLOATING ELEGANCE ==========
// This ensures that lightbox closing via ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightboxModal && lightboxModal.style.display === "flex") {
    closeLightboxModal();
  }
});

// make sure stars background z-index remains below content, but canvas is already fixed.
// small fallback for video poster elegance
if (birthdayVideo && !videoFile) {
  birthdayVideo.controls = true;
  birthdayVideo.poster = "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format";
}

// ✨ FIX hidden page issue: when clicking Enter Surprise, any pending audio resume is safe
// Ensure music icon update consistent
setInterval(() => {
  if (bgAudio && !bgAudio.paused && !isMusicPlaying) {
    isMusicPlaying = true;
    if(musicIconSpan) musicIconSpan.innerText = "⏸️";
  } else if (bgAudio && bgAudio.paused && isMusicPlaying) {
    isMusicPlaying = false;
    if(musicIconSpan) musicIconSpan.innerText = "🎵";
  }
}, 500);

// ===== MAGIC PHOTO ALBUM =====
const albumImages = ["images/photo1.jpg", "images/photo2.jpg", "images/photo3.jpg", "images/photo4.jpg", "images/photo5.jpg"];
const openAlbumBtn = document.getElementById("openAlbumBtn");
const albumContainer = document.getElementById("albumContainer");
const albumImage = document.getElementById("albumImage");
const pauseAlbumBtn = document.getElementById("pauseAlbumBtn");

let currentAlbumIndex = 0;
let albumPaused = false;
let albumInterval;

function startAlbum() {
  albumImage.src = albumImages[currentAlbumIndex];
  albumInterval = setInterval(() => {
    if (!albumPaused) {
      albumImage.classList.add("flip-animation");
      setTimeout(() => {
        currentAlbumIndex++;
        if (currentAlbumIndex >= albumImages.length) currentAlbumIndex = 0;
        albumImage.src = albumImages[currentAlbumIndex];
      }, 700);
      setTimeout(() => { albumImage.classList.remove("flip-animation"); }, 1500);
    }
  }, 3000);
}

openAlbumBtn.addEventListener("click", () => {
  albumContainer.classList.remove("album-hidden");
  albumContainer.classList.add("album-show");
  if (!albumInterval) startAlbum();
});

pauseAlbumBtn.addEventListener("click", () => {
  albumPaused = true;
  pauseAlbumBtn.innerText = "▶ Resume Album";
  setTimeout(() => {
    albumPaused = false;
    pauseAlbumBtn.innerText = "⏸ Pause Album";
  }, 10000);
});
