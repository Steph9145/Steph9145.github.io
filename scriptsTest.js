document.addEventListener('DOMContentLoaded', (event) => {
    let currentIndex = 0;
    let isPlaying = false; // Initialiser à false pour éviter de redémarrer immédiatement
    let interval;
    const images = document.querySelectorAll('.carousel img');
    const dots = document.querySelectorAll('.carousel-indicators .dot');

    // Titres des projets
    const titles = [
        "Etude de marché",
        "Gestion de l'eau en Afrique",
        "Analyse des besoins nutritionnels",
        "Analyse des inégalités",
        "Gestion d'une boutique de vins",
        "Gestion des ventes dans une librairie",
        "Détection des faux billets",
        "Gestion des logs"
    ];

    // Descriptions détaillées des projets avec des phrases formatées
    const descriptions = [
        `<p>Analyse des groupements de pays cibles pour exporter nos poulets</p>
         <ul>
             <li>Sélection des données pertinentes sur FAO (open source)</li>
             <li>Préparation, nettoyage et l’analyse exploratoire des données</li>
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
             <li>Optimisation des niveaux de stock</li>
             <li>Création de rapports de performance</li>
         </ul>`,
         
        `<p>Détection des faux billets - Machine Learning</p>
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
         
        `<p>Gestion des logs pour une meilleure maintenance</p>
         <ul>
             <li>Collecte et analyse des journaux système</li>
             <li>Développement d'outils pour la visualisation des logs</li>
             <li>Identification des anomalies et des problèmes</li>
             <li>Proposition de solutions pour améliorer la performance</li>
             <li>Documentation et rapports de maintenance</li>
         </ul>`
    ];

    // Logos associés à chaque projet
    const logos = [
    [
        { src: "Images/powerbi-Logo.png", alt: "Logo 1" },
        { src: "Images/python-logo.png", alt: "Logo 2" }
    ],
    [
        { src: "Images/python-logo.png", alt: "Logo 3" },
        { src: "Images/excel-logo.png", alt: "Logo 4" }
    ],
    [
        { src: "Images/powerbi-Logo.png", alt: "Logo 5" },
        { src: "Images/sklearn-logo.png", alt: "Logo 6" }
    ],
    [
        { src: "Images/python-logo.png", alt: "Logo 7" },
        { src: "Images/knime-logo.png", alt: "Logo 8" }
    ],
    [
        { src: "Images/sklearn-logo.png", alt: "Logo 9" },
        { src: "Images/python-logo.png", alt: "Logo 10" }
    ],
    [
        { src: "Images/sql-logo.png", alt: "Logo 11" },
        { src: "Images/powerbi-Logo.png", alt: "Logo 12" }
    ],
    [
        { src: "Images/python-logo.png", alt: "Logo 13" }
    ],
    [
        { src: "Images/sql-logo.png", alt: "Logo 15" },
        { src: "Images/excel-logo.png", alt: "Logo 16" }
    ]
];
    // Librairies associées à chaque projet
    const libraries = [
    [
        { src: "Images/powerbi-Logo.png", alt: "Logo 1" },
        { src: "Images/excel-logo.png", alt: "Logo 2" }
    ],
    [
        { src: "Images/Matplot-logo.png", alt: "Logo 3" },
        { src: "Images/sklearn-logo.png", alt: "Logo 4" }
    ],
    [
        { src: "Images/powerbi-Logo.png", alt: "Logo 5" },
        { src: "Images/sklearn-logo.png", alt: "Logo 6" }
    ],
    [
        { src: "Images/plotly-logo.png", alt: "Logo 7" },
        { src: "Images/knime-logo.png", alt: "Logo 8" }
    ],        [
        { src: "Images/sklearn-logo.png", alt: "Logo 9" },
        { src: "Images/plotly-logo.png", alt: "Logo 10" }
    ],
    [
        { src: "Images/sql-logo.png", alt: "Logo 11" },
        { src: "Images/powerbi-Logo.png", alt: "Logo 12" }
    ],
    [
        { src: "Images/sklearn-logo.png", alt: "Logo 13" },
        { src: "Images/Statsmodels-logo.png", alt: "Logo 14" },
        { src: "Images/Matplot-logo.png", alt: "Logo 13" },
        { src: "Images/seaborn-logo.png", alt: "Logo 14" }
    ],
    [
        { src: "Images/sql-logo.png", alt: "Logo 15" },
        { src: "Images/excel-logo.png", alt: "Logo 16" }
    ]
];


    function showSlide(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        images[index].classList.add('active');
        dots[index].classList.add('active');
        // Mise à jour du titre du projet
        document.getElementById("project-title").innerText = titles[index];
        // Mise à jour de la description du projet
        document.getElementById("project-description").innerHTML = descriptions[index];
        // Mise à jour des logos
        const projectLogosContainer = document.getElementById('project-logos');
        projectLogosContainer.innerHTML = ''; // Vider le conteneur de logos actuel

        logos[index].forEach(logo => {
            const img = document.createElement('img');
            img.src = logo.src;
            img.alt = logo.alt;
            img.classList.add('logo');
            projectLogosContainer.appendChild(img);
        });
        // Mise à jour des logos des librairies
        const projectLibrariesContainer = document.getElementById('project-libraries');
        projectLibrariesContainer.innerHTML = ''; // Vider le conteneur de librairies actuel

        libraries[index].forEach(library => {
            const img = document.createElement('img');
            img.src = library.src;
            img.alt = library.alt;
            img.classList.add('logo');
            projectLibrariesContainer.appendChild(img);
    });
}

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showSlide(currentIndex);
    }

    function startCarousel() {
        if (!isPlaying) {
            isPlaying = true; // Change l'état à jouer
            interval = setInterval(showNextImage, 2000); // Définir l'intervalle de défilement
            document.getElementById('play-icon').style.display = 'none';
            document.getElementById('stop-icon').style.display = 'block';
        }
    }

    function stopCarousel() {
        if (isPlaying) {
            clearInterval(interval);
            isPlaying = false; // Change l'état à pause
            document.getElementById('play-icon').style.display = 'block';
            document.getElementById('stop-icon').style.display = 'none';
        }
    }

    // Ajouter un événement de clic pour démarrer/arrêter le carrousel
    document.querySelector('.carousel').addEventListener('click', () => {
        if (isPlaying) {
            stopCarousel();
        } else {
            startCarousel();
        }
    });

    // Ajouter des événements de clic aux points d'indicateur
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            if (isPlaying) {
                stopCarousel();
            }
        });
    });

    // Initialiser le carrousel à l'ouverture de la page
    showSlide(currentIndex);
    startCarousel(); // Appelle cette fonction pour commencer automatiquement
});
