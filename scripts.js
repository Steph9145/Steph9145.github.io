document.addEventListener('DOMContentLoaded', () => {
    // Scroll automatiquement en haut de la page avec un léger délai
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100); // 10 millisecondes
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
    const projectCommentElement = document.getElementById('project-comment');
    const documentContainer = document.getElementById('document-container');
    const documentFrame = document.getElementById('document-frame');
    const documentVideo = document.getElementById('document-video');
    const videoSource = document.getElementById('video-source');

    // Titres des projets
    const titles = [
        "Etude de marché - Export",
        "Gestion de l'eau en Afrique",
        "Etude Médecins Généralistes Libéraux",
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
        "Projets/Medecins.mp4",
        "Projets/Egal_Hom_Fem.mp4",
        "Projets/OCSS_P10_DA_GITHUB.html",
        "Projets/OCSS_P6_DA-GITHUB1.html",
        "Projets/OCSS_P10_DA_GITHUB.html",
        "Projets/Results2024_Legis_circonscriptions.html"
    ];

    const projectComments = [
        "Commentaires pour le projet d'étude de marché - Export.",
        "Commentaires pour la gestion de l'eau en Afrique.",
        `<p>Les Chiffres Clés, ce que je voulais voir:</p>
    <ul>
        <li>👉 Evolution de 2012 à 2023 des médecins et de la population</li>
        <li>👉 Evolution de N-1 à N (année choisie) des médecins et de la population</li>
    </ul>
    <p>👉 Comparer 2012 à l'année choisie:</p>
    <ul>
        <li>➡ Population</li>
        <li>➡ Médecin</li>
        <li>➡ Patientèle moyenne par médecin</li>
        <li>➡ Parité Femmes/Hommes médecins</li>
    </ul>
    <p>🖼️ Utilisation de visuels en courbe, en histogramme et géographique pour illustrer les chiffres et les lieux concernés.</p>
    <p>🪄 Utilisation de filtres pour l'année, la région et le département pour affiner l'analyse.</p>
    <p>🎁 J'ai également ajouté une animation montrant l'évolution de la sélection (Régions + Départements) entre 2012 et 2023 (pour le fun 😁)</p>
    <p>Je ne vais pas mettre mon analyse complète dans ce post, juste 2 ou 3 faits à retenir sur la période 2012-2023:</p>
    <ul>
        <li>👉 La France a perdu 7 400 médecins (-11,5%) pendant que la population augmentait de 4% et est passée de 1020 Habs à 1200 Habs par médecins</li>
        <li>👉 Si le bassin méditerranéen reste bien couvert (PACA+ Occitanie), l'évolution des médecins a baissé de plus de 14% et est passée de 830 Habs à 1030 Habs par médecins</li>
        <li>👉 La côte Atlantique (Bretagne, Pays de la Loire et Nouvelle-Aquitaine) reste stable, passant de 980 Habs à 1061 Habs par médecins</li>
    </ul>
    <p>La bonne nouvelle, d'une façon générale, est que la France a quasiment atteint la parité dans cette profession.</p>
    <p>La seconde partie de mon projet concerne la présence géolocalisée d'une base de 48,5k médecins généralistes et leur densité par cantons (plus pertinent que les communes) en 2024.</p>`,
        "Commentaires sur les inégalités de genre en entreprise.",
        "Commentaires pour la gestion d'une boutique de vins en ligne.",
        "Commentaires pour la gestion des ventes dans une librairie.",
        "Commentaires sur la détection de faux billets avec Machine Learning.",
        `<p>👉 La démarche pour le 1er Tour:</p>
    <ul>
        <li>Utilisation des résultats des législatives 2022 et surtout des Européennes 2024.</li>
        <li>Choix de prévoir les résultats du 1er tour par circonscription.</li>
        <li>Prise en compte des divisions intra-parti (split des LR entre Ensemble et RN, split de la liste "RÉVEILLER L'EUROPE" entre Ensemble et UG).</li>
        <li>Estimation de +30% de participation par circonscription par rapport aux Européennes.</li>
    </ul>
    <p>➕ Avantage :</p>
    <ul>
        <li>Les choix pris permettent d'obtenir des prévisions cohérentes comparées aux résultats réels du 1er tour.</li>
    </ul>
    <p>➖ Biais :</p>
    <ul>
        <li>J'ai "sacrifié" les LR en les splittant sur 3 listes (Ensemble, LR et RN) pour toutes les circonscriptions, ce qui a eu pour effet de minimiser les résultats des candidats LR sans alliance.</li>
    </ul>`
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
        images.forEach((img, i) => img.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        projectTitle.textContent = titles[index];
        projectDescription.innerHTML = descriptions[index];
        updateLogos(index);
        documentLink.href = projectDocuments[index];
        projectCommentElement.innerHTML = projectComments[index];
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
            updateDocumentLinkText();
        }
    }

    // Arrête le carrousel automatique
    function stopCarousel() {
        if (isPlaying) {
            clearInterval(interval);
            isPlaying = false;
            playIcon.style.display = 'inline';
            stopIcon.style.display = 'none';
            updateDocumentLinkText();
        }
    }

    // Affiche une diapositive spécifique
    function currentSlide(index) {
        if (isDocumentOpen) return;
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
            stopCarousel();
            disableCarouselControls(true);
            window.scrollTo({
                top: documentContainer.getBoundingClientRect().top + window.scrollY - 100,
                behavior: 'smooth'
            });
        } else {
            documentContainer.classList.add('hidden');
            isDocumentOpen = false;
            startCarousel();
            disableCarouselControls(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        updateDocumentLinkText();
    }

    // Fonction pour activer ou désactiver le lien et modifier son texte
    function updateDocumentLinkText() {
        if (isDocumentOpen) {
            documentLink.textContent = 'Fermer le document';
            documentLink.classList.add('default-link');
            documentLink.classList.remove('active-link', 'disabled-link');
        } else if (isPlaying) {
            documentLink.textContent = 'Choisir un projet';
            documentLink.classList.add('disabled-link');
            documentLink.classList.remove('active-link', 'default-link');
        } else {
            documentLink.textContent = 'Voir le document du projet';
            documentLink.classList.add('active-link');
            documentLink.classList.remove('disabled-link', 'default-link');
        }
    }

    // Fonction pour activer ou désactiver les contrôles du carrousel
    function disableCarouselControls(disable) {
        images.forEach(img => img.style.pointerEvents = disable ? 'none' : 'auto');
        dots.forEach(dot => dot.style.pointerEvents = disable ? 'none' : 'auto');
    }

    // Gestion des clics sur les images pour démarrer/arrêter le carrousel
    images.forEach(img => img.addEventListener('click', () => {
        if (!isDocumentOpen) {
            isPlaying ? stopCarousel() : startCarousel();
        }
    }));

    // Gestion des clics sur les points pour afficher la diapositive correspondante
    dots.forEach((dot, i) => dot.addEventListener('click', () => {
        currentSlide(i);
    }));

    // Gestion du clic sur le lien pour afficher/masquer le document
    documentLink.addEventListener('click', (event) => {
        if (isDocumentOpen) {
            event.preventDefault();
            toggleDocumentContainer();
        } else if (!isPlaying) {
            event.preventDefault();
            toggleDocumentContainer();
            document.querySelector('#document-container iframe').src = projectDocuments[currentIndex];
        }
    });

    // Initialisation de la diapositive actuelle et démarrage du carrousel
    updateSlide(currentIndex);
    startCarousel();
});