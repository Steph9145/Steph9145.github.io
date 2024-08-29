let currentIndex = 0;
let isPlaying = true;
let interval;
const images = document.querySelectorAll('.carousel img');
const dots = document.querySelectorAll('.carousel-indicators .dot');
const titles = [
    "Projet : Analyse des données du jeu",
    "Projet : Gestion de l'eau en Afrique",
    "Projet : Analyse des besoins nutritionnels",
    "Projet : Analyse des inégalités",
    "Projet : Gestion d'une boutique de vins",
    "Projet : Gestion des ventes dans une librairie",
    "Projet : Détection des faux billets",
    "Projet : Gestion des logs"
];
const descriptions = [
    "Analyse des données du jeu Crazy Chicken.",
    "Gestion de l'eau en Afrique pour améliorer l'accès.",
    "Analyse des besoins nutritionnels à l'échelle mondiale.",
    "Analyse des inégalités de genre en entreprise.",
    "Gestion d'une boutique de vins en ligne.",
    "Gestion des ventes et inventaire dans une librairie.",
    "Détection des faux billets avec apprentissage machine.",
    "Gestion des logs pour une meilleure maintenance."
];

function showSlide(index) {
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    images[index].classList.add('active');
    dots[index].classList.add('active');
    document.getElementById("project-title").innerText = titles[index];
    document.getElementById("project-description").innerText = descriptions[index];
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
}

function startCarousel() {
    if (!isPlaying) {
        isPlaying = true;
        interval = setInterval(showNextImage, 3000); // Changer la durée si nécessaire
        document.getElementById('play-icon').style.display = 'none';
        document.getElementById('stop-icon').style.display = 'block';
    }
}

function stopCarousel() {
    if (isPlaying) {
        clearInterval(interval);
        isPlaying = false;
        document.getElementById('play-icon').style.display = 'block';
        document.getElementById('stop-icon').style.display = 'none';
    }
}

// Gestion des événements pour démarrer/arrêter le carrousel
document.querySelector('.carousel').addEventListener('mouseover', stopCarousel);
document.querySelector('.carousel').addEventListener('mouseout', startCarousel);

// Initialisation du carrousel
showSlide(currentIndex);
startCarousel();
