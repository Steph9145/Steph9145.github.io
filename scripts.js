document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let isPlaying = false; // État du carrousel
    let interval;
    let isDocumentOpen = false; // État du document

    // Sélection des éléments du DOM
    const images = document.querySelectorAll('.carousel img');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    const playIcon = document.getElementById('play-icon');
    const stopIcon = document.getElementById('stop-icon');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const toolsContainer = document.getElementById('project-tools-logos');
    const librariesContainer = document.getElementById('project-libraries-logos');
    const documentLink = document.getElementById('project-document-link');
    const documentContainer = document.getElementById('document-container');

    // Titres des projets
    const titles = [
        "Etude de marché - Export",
        "Gestion de l'eau en Afrique",
        "Analyse des besoins nutritionnels",
        "Analyse des inégalités",
        "Gestion d'une boutique de vins",
        "Gestion des ventes dans une librairie",
        "Détection des faux billets",
        "Législatives 2024"
    ];

    // Descriptions détaillées des projets
    const descriptions = [
        "<p>Analyse des groupements de pays cibles pour exporter nos poulets</p><ul><li class='line-spacing'>Sélection des données pertinentes sur FAO (open source)</li><li class='line-spacing'>Préparation, nettoyage et analyse exploratoire des données</li><li class='line-spacing'>Classification ascendante hiérarchique / dendrogramme</li><li class='line-spacing'>k-means</li><li class='line-spacing'>Comparaison des méthodes de clustering puis ACP</li><li class='line-spacing'>Choix du cluster et présentation des résultats</li></ul>",
        "<p>Gestion de l'eau en Afrique pour améliorer l'accès</p><ul><li class='line-spacing'>Analyse des besoins en eau potable</li><li class='line-spacing'>Conception de systèmes de distribution</li><li class='line-spacing'>Évaluation des ressources en eau disponibles</li><li class='line-spacing'>Planification des infrastructures nécessaires</li><li class='line-spacing'>Coordination avec les autorités locales</li></ul>",
        "<p>Analyse des besoins nutritionnels à l'échelle mondiale</p><ul><li class='line-spacing'>Collecte de données nutritionnelles globales</li><li class='line-spacing'>Analyse des carences en micronutriments</li><li class='line-spacing'>Modélisation des besoins alimentaires par région</li><li class='line-spacing'>Élaboration de recommandations pour les politiques alimentaires</li><li class='line-spacing'>Collaboration avec des organisations internationales</li></ul>",
        "<p>Analyse des inégalités de genre en entreprise</p><ul><li class='line-spacing'>Collecte de données sur les écarts de salaire</li><li class='line-spacing'>Évaluation des opportunités de carrière</li><li class='line-spacing'>Analyse des politiques d'équité en entreprise</li><li class='line-spacing'>Proposition de stratégies pour améliorer l'égalité des sexes</li><li class='line-spacing'>Suivi des progrès et recommandations</li></ul>",
        "<p>Gestion d'une boutique de vins en ligne</p><ul><li class='line-spacing'>Création d'un catalogue de produits</li><li class='line-spacing'>Développement de fonctionnalités de recherche</li><li class='line-spacing'>Mise en place d'un système de paiement sécurisé</li><li class='line-spacing'>Gestion des stocks et des commandes</li><li class='line-spacing'>Analyse des tendances de vente et retour client</li></ul>",
        "<p>Gestion des ventes et inventaire dans une librairie</p><ul><li class='line-spacing'>Suivi des ventes et des inventaires</li><li class='line-spacing'>Mise en place d'un système de gestion des commandes</li><li class='line-spacing'>Analyse des préférences des clients</li><li class='line-spacing'>Optimisation des achats et des stocks</li><li class='line-spacing'>Création de promotions ciblées</li></ul>",
        "<p>Détection de faux billets - Machine Learning</p><ul><li class='line-spacing'>Collecte de données sur les caractéristiques des billets</li><li class='line-spacing'>Analyse exploratoire (EDA)</li><li class='line-spacing'>Régression linéaire : Modèle prédictif pour remplacer valeurs manquantes</li><li class='line-spacing'>Analyses et métriques le modèle</li><li class='line-spacing'>Création modèle K-means + PCA</li><li class='line-spacing'>Régression Logistique Statsmodels et Sklearn</li><li class='line-spacing'>Algorithme: Analyse des résultats et ajustements</li><li class='line-spacing'>Outil de définition du seuil d’acceptation</li></ul>",
        "<p>Analyse des résultats des élections législatives 2024</p><ul><li class='line-spacing'>Collecte des résultats par circonscription</li><li class='line-spacing'>Analyse des tendances de vote</li><li class='line-spacing'>Visualisation des résultats par région</li><li class='line-spacing'>Comparaison avec les élections précédentes</li><li class='line-spacing'>Élaboration de prévisions et recommandations</li></ul>"
    ];
    

    const projectDocuments = [
        "Projets/OCSS_P4_DA-GITHUB.html",
        "Projets/OCSS_P6_DA-GITHUB1.html",
        "Projets/OCSS_P5_DA-GITHUB.html",
        "Projets/OCSS_P4_DA-GITHUB.html",
        "Projets/OCSS_P10_DA_GITHUB.html",
        "Projets/OCSS_P6_DA-GITHUB1.html",
        "Projets/OCSS_P10_DA_GITHUB.html",
        "Projets/Results2024_Legis_circonscriptions.html"
    ];

    // Logos des outils pour chaque projet
    const toolsLogos = [
        [
            { src: "Images/powerbi-Logo.png", alt: "Power BI" },
            { src: "Images/python-logo.png", alt: "Python" }
        ],
        [
            { src: "Images/python-logo.png", alt: "Python" },
            { src: "Images/excel-logo.png", alt: "Excel" }
        ],
        [
            { src: "Images/powerbi-Logo.png", alt: "Power BI" },
            { src: "Images/sklearn-logo.png", alt: "Scikit-learn" }
        ],
        [
            { src: "Images/python-logo.png", alt: "Python" },
            { src: "Images/knime-logo.png", alt: "KNIME" }
        ],
        [
            { src: "Images/sklearn-logo.png", alt: "Scikit-learn" },
            { src: "Images/python-logo.png", alt: "Python" }
        ],
        [
            { src: "Images/sql-logo.png", alt: "SQL" },
            { src: "Images/powerbi-Logo.png", alt: "Power BI" }
        ],
        [
            { src: "Images/python-logo.png", alt: "Python" }
        ],
        [
            { src: "Images/sql-logo.png", alt: "SQL" },
            { src: "Images/excel-logo.png", alt: "Excel" }
        ]
    ];

    // Logos des librairies pour chaque projet
    const librariesLogos = [
        [
            { src: "Images/powerbi-Logo.png", alt: "Power BI" },
            { src: "Images/excel-logo.png", alt: "Excel" }
        ],
        [
            { src: "Images/Matplot-logo.png", alt: "Matplotlib" },
            { src: "Images/sklearn-logo.png", alt: "Scikit-learn" }
        ],
        [
            { src: "Images/powerbi-Logo.png", alt: "Power BI" },
            { src: "Images/sklearn-logo.png", alt: "Scikit-learn" }
        ],
        [
            { src: "Images/plotly-logo.png", alt: "Plotly" },
            { src: "Images/knime-logo.png", alt: "KNIME" }
        ],
        [
            { src: "Images/sklearn-logo.png", alt: "Scikit-learn" },
            { src: "Images/python-logo.png", alt: "Python" }
        ],
        [
            { src: "Images/sql-logo.png", alt: "SQL" },
            { src: "Images/knime-logo.png", alt: "KNIME" }
        ],
        [
            { src: "Images/sklearn-logo.png", alt: "Scikit-learn" },
            { src: "Images/Matplot-logo.png", alt: "Matplotlib" },
            { src: "Images/seaborn-logo.png", alt: "Seaborn" },
            { src: "Images/Numpy-logo.png", alt: "Numpy" }
        ],
        [
            { src: "Images/sql-logo.png", alt: "SQL" },
            { src: "Images/excel-logo.png", alt: "Excel" }
        ]
    ];

    // Met à jour la diapositive active
    function updateSlide(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        projectTitle.textContent = titles[index];
        projectDescription.innerHTML = descriptions[index];
        updateLogos(index);

        // Met à jour le lien du document
        documentLink.href = projectDocuments[index];
        updateDocumentLinkText();
    }

    // Met à jour les logos des outils et librairies
    function updateLogos(index) {
        toolsContainer.innerHTML = '';
        librariesContainer.innerHTML = '';
        toolsLogos[index].forEach(logo => {
            const img = document.createElement('img');
            img.src = logo.src;
            img.alt = logo.alt;
            img.classList.add('logo');
            toolsContainer.appendChild(img);
        });
        librariesLogos[index].forEach(logo => {
            const img = document.createElement('img');
            img.src = logo.src;
            img.alt = logo.alt;
            img.classList.add('logo');
            librariesContainer.appendChild(img);
        });
    }

    // Affiche la diapositive suivante
    function showNextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide(currentIndex);
    }

    // Affiche la diapositive précédente
    function showPreviousSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide(currentIndex);
    }

    // Démarre le carrousel automatique
    function startCarousel() {
        if (!isPlaying && !isDocumentOpen) {
            interval = setInterval(showNextSlide, 3000);
            isPlaying = true;
            playIcon.style.display = 'none';
            stopIcon.style.display = 'inline';
            updateDocumentLinkText(); // Met à jour le texte du lien
        }
    }

    // Arrête le carrousel automatique
    function stopCarousel() {
        if (isPlaying) {
            clearInterval(interval);
            isPlaying = false;
            playIcon.style.display = 'inline';
            stopIcon.style.display = 'none';
            updateDocumentLinkText(); // Met à jour le texte du lien
        }
    }

    // Affiche une diapositive spécifique
    function currentSlide(index) {
        if (isDocumentOpen) return; // Ne fait rien si le document est ouvert
        clearInterval(interval);
        isPlaying = false;
        playIcon.style.display = 'inline';
        stopIcon.style.display = 'none';
        currentIndex = index;
        updateSlide(currentIndex);
    }

    // Affiche ou masque le conteneur du document du projet
    function toggleDocumentContainer() {
        if (documentContainer.classList.contains('hidden')) {
            documentContainer.classList.remove('hidden');
            isDocumentOpen = true;
            stopCarousel(); // Arrête le carrousel lorsqu'un document est ouvert
            disableCarouselControls(true); // Désactive les contrôles du carrousel
            
            // Calculer la position du document-container avec un espace au bas de la page pour éviter le pied de page
            const containerOffset = documentContainer.getBoundingClientRect().top + window.scrollY;
            const offsetAdjustment = 100; // Ajuster cette valeur si nécessaire pour un espace supplémentaire
            window.scrollTo({
                top: containerOffset - offsetAdjustment,
                behavior: 'smooth'
            });
        } else {
            documentContainer.classList.add('hidden');
            isDocumentOpen = false;
            startCarousel(); // Relance le carrousel lorsqu'on ferme le document
            disableCarouselControls(false); // Réactive les contrôles du carrousel
            // Scroll vers le haut de la page quand le document est fermé
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        }
        updateDocumentLinkText(); // Met à jour le texte du lien après modification de isDocumentOpen
    }

    // Fonction pour activer ou désactiver le lien et modifier son texte
    function updateDocumentLinkText() {
        if (isDocumentOpen) {
            documentLink.textContent = 'Fermer le document';
            documentLink.classList.remove('active-link');
            documentLink.classList.add('default-link');
        } else if (isPlaying) {
            documentLink.textContent = 'Choisir un projet';
            documentLink.classList.remove('active-link');
            documentLink.classList.add('disabled-link');
        } else {
            documentLink.textContent = 'Voir le document du projet';
            documentLink.classList.remove('disabled-link');
            documentLink.classList.add('active-link');
        }
    }

    // Fonction pour activer ou désactiver les contrôles du carrousel
    function disableCarouselControls(disable) {
        images.forEach(img => {
            img.style.pointerEvents = disable ? 'none' : 'auto';
        });
        dots.forEach(dot => {
            dot.style.pointerEvents = disable ? 'none' : 'auto';
        });
    }

    // Gestion des clics sur les images pour démarrer/arrêter le carrousel
    images.forEach(img => {
        img.addEventListener('click', () => {
            if (isDocumentOpen) return; // Ignore les clics si le document est ouvert
            if (isPlaying) {
                stopCarousel();
            } else {
                startCarousel();
            }
        });
    });

    // Gestion des clics sur les points pour afficher la diapositive correspondante
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide(i);
        });
    });

    // Gestion du clic sur le lien pour afficher/masquer le document
    documentLink.addEventListener('click', (event) => {
        if (isDocumentOpen) {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            toggleDocumentContainer(); // Ferme le document
            
        } else if (!isPlaying) {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            toggleDocumentContainer(); // Ouvre le document
            document.querySelector('#document-container iframe').src = projectDocuments[currentIndex];
        }
    });

    // Initialisation de la diapositive actuelle
    updateSlide(currentIndex);
    startCarousel();
});