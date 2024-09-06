document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let isPlaying = false; // État du carrousel
    let interval;
    
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
        `<p>Analyse des groupements de pays cibles pour exporter nos poulets</p>
         <ul>
             <li>Sélection des données pertinentes sur FAO (open source)</li>
             <li>Préparation, nettoyage et analyse exploratoire des données</li>
             <li>Classification ascendante hiérarchique / dendrogramme</li>
             <li>k-means</li>
             <li>Comparaison des méthodes de clustering puis ACP</li>
             <li>Choix du cluster et présentation des résultats</li>
         </ul>`,
        `<p>Gestion de l'eau en Afrique pour améliorer l'accès</p>
         <ul>
             <li>Analyse des besoins en eau potable</li>
             <li>Conception de systèmes de distribution</li>
             <li>Évaluation des ressources en eau disponibles</li>
             <li>Planification des infrastructures nécessaires</li>
             <li>Coordination avec les autorités locales</li>
         </ul>`,
        `<p>Analyse des besoins nutritionnels à l'échelle mondiale</p>
         <ul>
             <li>Collecte de données nutritionnelles globales</li>
             <li>Analyse des carences en micronutriments</li>
             <li>Modélisation des besoins alimentaires par région</li>
             <li>Élaboration de recommandations pour les politiques alimentaires</li>
             <li>Collaboration avec des organisations internationales</li>
         </ul>`,
        `<p>Analyse des inégalités de genre en entreprise</p>
         <ul>
             <li>Collecte de données sur les écarts de salaire</li>
             <li>Évaluation des opportunités de carrière</li>
             <li>Analyse des politiques d'équité en entreprise</li>
             <li>Proposition de stratégies pour améliorer l'égalité des sexes</li>
             <li>Suivi des progrès et recommandations</li>
         </ul>`,
        `<p>Gestion d'une boutique de vins en ligne</p>
         <ul>
             <li>Création d'un catalogue de produits</li>
             <li>Développement de fonctionnalités de recherche</li>
             <li>Mise en place d'un système de paiement sécurisé</li>
             <li>Gestion des stocks et des commandes</li>
             <li>Analyse des tendances de vente et retour client</li>
         </ul>`,
        `<p>Gestion des ventes et inventaire dans une librairie</p>
         <ul>
             <li>Suivi des ventes et des inventaires</li>
             <li>Mise en place d'un système de gestion des commandes</li>
             <li>Analyse des préférences des clients</li>
             <li>Optimisation des achats et des stocks</li>
             <li>Création de promotions ciblées</li>
         </ul>`,
        `<p>Détection de faux billets - Machine Learning</p>
         <ul>
             <li>Collecte de données sur les caractéristiques des billets</li>
             <li>Analyse exploratoire (EDA)</li>
             <li>Régression linéaire : Modèle prédictif pour remplacer valeurs manquantes</li>
             <li>Analyses et métriques le modèle</li>
             <li>Création modèle K-means + PCA</li>
             <li>Régression Logistique Statsmodels et Sklearn</li>
             <li>Algorithme: Analyse des résultats et ajustements</li>
             <li>Outil de définition du seuil d’acceptation</li>
         </ul>`,
        `<p>Analyse des résultats des élections législatives 2024</p>
         <ul>
             <li>Collecte des résultats par circonscription</li>
             <li>Analyse des tendances de vote</li>
             <li>Visualisation des résultats par région</li>
             <li>Comparaison avec les élections précédentes</li>
             <li>Élaboration de prévisions et recommandations</li>
         </ul>`
    ];

    const projectDocuments = [
        "OCSS_P4_DA-GITHUB.html",  // Document pour le premier projet
        "OCSS_P6_DA-GITHUB1.html",  // Document pour le deuxième projet
        "OCSS_P5_DA-GITHUB.html", // Document pour le troisième projet
        "OCSS_P4_DA-GITHUB.html",     // Document pour le quatrième projet
        "OCSS_P10_DA_GITHUB.html",        // Document pour le cinquième projet
        "OCSS_P6_DA-GITHUB1.html",      // Document pour le sixième projet
        "OCSS_P10_DA_GITHUB.html", // Document pour le septième projet
        "OCSS_P5_DA-GITHUB.html"     // Document pour le huitième projet
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
            { src: "Images/Matplot-logo.png", alt: "Matplotlib" }
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
        // Met à jour l'état du lien
        toggleDocumentLink();
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
        if (!isPlaying) {
            interval = setInterval(showNextSlide, 3000);
            isPlaying = true;
            playIcon.style.display = 'none';
            stopIcon.style.display = 'inline';
            toggleDocumentLink();
        }
    }

    // Arrête le carrousel automatique
    function stopCarousel() {
        if (isPlaying) {
            clearInterval(interval);
            isPlaying = false;
            playIcon.style.display = 'inline';
            stopIcon.style.display = 'none';
            toggleDocumentLink();
        }
    }

    // Affiche une diapositive spécifique
    function currentSlide(index) {
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
        } else {
            documentContainer.classList.add('hidden');
        }
    }

    // Fonction pour activer ou désactiver le lien et modifier son texte
    function toggleDocumentLink() {
        if (isPlaying) {
            documentLink.classList.add('disabled-link');
            documentLink.textContent = 'Choisissez un projet'; // Texte quand désactivé
        } else {
            documentLink.classList.remove('disabled-link');
            documentLink.textContent = 'Voir le document du projet'; // Texte quand activé
        }
    }

    // Gestion des clics sur les images pour démarrer/arrêter le carrousel
    images.forEach(img => {
        img.addEventListener('click', () => {
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
        if (isPlaying) {
            event.preventDefault(); // Empêche le comportement par défaut du lien
        } else {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            toggleDocumentContainer();
            // Assure-toi que l'iframe pointe vers le bon document
            document.querySelector('#document-container iframe').src = projectDocuments[currentIndex];
        }
    });

    // Met à jour le lien du document à chaque changement de diapositive
    document.addEventListener('visibilitychange', toggleDocumentLink);

    // Initialisation de la diapositive actuelle
    updateSlide(currentIndex);
    startCarousel();
});