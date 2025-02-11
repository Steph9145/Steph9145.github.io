document.addEventListener('DOMContentLoaded', () => {
    // Scroll automatiquement en haut de la page avec un léger délai
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100); // 100 millisecondes

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
    const closeButton = document.getElementById('close-button');
    const documentContainer = document.getElementById('document-container');
    const documentFrame = document.getElementById('document-frame');
    const documentVideo = document.getElementById('document-video');
    const videoSource = document.getElementById('video-source');

    const documentTitleElement = document.getElementById('document-title'); // Sélectionne l'élément du titre


    // Tableau des projets
    const projects = [
        {
            title: "Marketing Analytics",
            description: `
                
                <p style="text-align: center; font-size: 20px;"><strong>Exploration de données et application Streamlit</strong></p>
                <ul>
                    <li class='line-spacing'>E.D.A., Clustering & Prediction Modeling</li>
                    <li class='line-spacing'></li>
                    <li class='line-spacing'></li>
                    <li class='line-spacing'></li>
                    </ul>
                `,
                document: "Projets/M_Campaigns/Mc_camp.html",
            comment: "Commentaires Marketing Analytics",
            toolsLogos: [
                { src: "Images/Logo_Streamlit.png", alt: "Streamlit" },
                { src: "Images/Jupyter-logo.png", alt: "Jupyter" },
                { src: "Images/Logo_Python_NP.png", alt: "Python" },
                { src: "Images/Statsmodels-logo.png", alt: "Statsmodels" },
                { src: "Images/sklearn-logo.png", alt: "SKlearn" }
            ],
            librariesLogos: [
                { src: "Images/Matplot-logo.png", alt: "Matplotlib" },
                { src: "Images/seaborn-logo.png", alt: "Seaborn" },
                { src: "Images/plotly-logo.png", alt: "potlyb" }
            ]
        },
        {
            title: "Prévisions Législatives 2024",
            description: `
                
                <p style="text-align: center; font-size: 20px;"><strong>Prévisions basées sur l'analyse comportementale de l'électorat</strong></p>
                <ul>
                    <li class='line-spacing'>Collecte résultats Elections Européennes 2024 et Elections Législatives 2022</li>
                    <li class='line-spacing'>Reprise des résultats définitifs du 1er tour (pour le second tour)</li>
                    <li class='line-spacing'>Mise en place des hypothèses</li>
                    <li class='line-spacing'>Mise en concordance des listes électorales</li>
                    <li class='line-spacing'>Analyses et créations des règles de calcul des prévisions</li>
                    <li class='line-spacing'>Créations des règles de repport de votes</li>
                    <li class='line-spacing'>Visualisation des résultats par circonscription</li>   
                    <li class='line-spacing'>Analyse des erreurs de prévisions</li>
                    </ul>
                `,
                document: "Projets/Leg2024/Leg2024.html",
            comment: "Commentaires Législatives 2024",
            toolsLogos: [
                { src: "Images/Jupyter-logo.png", alt: "Jupyter" },
                { src: "Images/Logo_Python_NP.png", alt: "Python" },
                { src: "Images/excel-logo.png", alt: "Excel" },
                { src: "Images/power-query-banner.png", alt: "Excel" }
            ],
            librariesLogos: [
                { src: "Images/Matplot-logo.png", alt: "Matplotlib" },
                { src: "Images/seaborn-logo.png", alt: "Seaborn" },
                { src: "Images/Logo_folium.png", alt: "Folium" }
            ]
        },
        {
            title: "Etude Médecins Généralistes",
            description: `
            <p style="text-align: center; font-size: 20px;"><strong>Etat des lieux - Médecins Généralistes Libéraux</strong></p>
            <ul>
                <li class='line-spacing'>Collecte de données Multi-sources</li>
                <li class='line-spacing'>Analyse préparatoire des fichiers - EDA</li>
                <li class='line-spacing'>Analyse de l'évolution démographiques de 2012 à 2023</li>
                <li class='line-spacing'>Présence sur le territoire en Mars 2024</li>
                <li class='line-spacing'>Mise en relief d'inisghts</li>
                <li class='line-spacing'>Restitution des analyses via dashboard Power BI</li>
            </ul>
                `,
            document: "Projets/MedecinsG/MedecinsG.html",
            comment: "Commentaires Médecins",
            toolsLogos: [
                { src: "Images/powerbi-Logo.png", alt: "Power BI"},
                
                { src: "Images/excel-logo.png", alt: "Excel" }
            ],
            librariesLogos: [
                { src: "Images/Logo_PBI_DAX.png", alt: "Power BI"},
                { src: "Images/power-query-banner.png", alt: "Excel"}
            ]
        },
        {
            title: "Détection de faux billets - Machine Learning",
            description: `
                <p style="text-align: center; font-size: 20px;"><strong>Détection de faux billets - Machine Learning</strong></p>
                <ul>
                    <li class='line-spacing'>Collecte de données sur les caractéristiques des billets</li>
                    <li class='line-spacing'>Analyse exploratoire (EDA)</li>
                    <li class='line-spacing'>Régression linéaire : Modèle prédictif pour remplacer valeurs manquantes</li>
                    <li class='line-spacing'>Analyses et métriques le modèle</li>
                    <li class='line-spacing'>Création modèle K-means + PCA</li>
                    <li class='line-spacing'>Régression Logistique Statsmodels et Sklearn</li>
                    <li class='line-spacing'>Algorithme: Analyse des résultats et ajustements</li>
                    <li class='line-spacing'>Outil de définition du seuil d’acceptation</li>
                </ul>
                `,
            document: "Projets/Billets/Billet.html",
            comment: "Commentaires pour le projet d'étude de marché - Export.",
            toolsLogos: [
                { src: "Images/Logo_Python_NP.png", alt: "Python" },
                { src: "Images/Statsmodels-logo.png", alt: "Statsmodels" },
                { src: "Images/sklearn-logo.png", alt: "Scikit-learn" }
            ],
            librariesLogos: [
                { src: "Images/Logo_SciPy.png", alt: "SciPy" },
                { src: "Images/seaborn-logo.png", alt: "Seaborn" },
                { src: "Images/Matplot-logo.png", alt: "Matplotlib" },
                { src: "Images/plotly-logo.png", alt: "plotly" }
            ]
        },
        {
            title: "Analyse des inégalités",
            description: `
                <p style="text-align: center; font-size: 20px;"><strong>Analyse des inégalités de genre en entreprise</strong></p>
                <ul>
                    <li class='line-spacing'>Collecte de données sur les écarts de salaire</li>
                    <li class='line-spacing'>Évaluation des opportunités de carrière</li>
                    <li class='line-spacing'>Analyse des politiques d'équité en entreprise</li>
                    <li class='line-spacing'>Proposition de stratégies pour améliorer l'égalité des sexes</li>
                    <li class='line-spacing'>Suivi des progrès et recommandations</li>
                </ul>
                `,
            document: "Projets/EgaliteHF/EgalitésFH.html",
            comment: "Commentaires pour le projet d'étude de marché - Export.",
            toolsLogos: [
                { src: "Images/sql-logo.png", alt: "SQL" },
                { src: "Images/knime-logo.png", alt: "KNIME" }
            ],
            librariesLogos: [
                { src: "Images/powerbi-Logo.png", alt: "Power BI" },
                { src: "Images/excel-logo.png", alt: "Excel" }
            ]
        },
        {
            title: "Etude de marché - Export",
            description: `
                <p style="text-align: center; font-size: 20px;"><strong>Analyse des groupements de pays cibles pour exporter nos poulets</strong></p>
                <ul>
                    <li class='line-spacing'>Sélection des données pertinentes sur FAO (open source)</li>
                    <li class='line-spacing'>Préparation, nettoyage et analyse exploratoire des données</li>
                    <li class='line-spacing'>Classification ascendante hiérarchique / dendrogramme</li>
                    <li class='line-spacing'>k-means</li>
                    <li class='line-spacing'>Comparaison des méthodes de clustering puis ACP</li>
                    <li class='line-spacing'>Choix du cluster et présentation des résultats</li>
                </ul>
            `,
            document: "Projets/EMexp_poulet/Export_Poul.html",
            comment: "Commentaires pour le projet d'étude de marché - Export.",
            toolsLogos: [
                
                { src: "Images/Jupyter-logo.png", alt: "Jupyter" },
                { src: "Images/Logo_Python_NP.png", alt: "Python" },
                { src: "Images/Logo_Geopandas.png", alt: "Logo_Geopandas" }
            ],
            librariesLogos: [
                { src: "Images/Matplot-logo.png", alt: "Matplotlib" },
                { src: "Images/seaborn-logo.png", alt: "Seaborn" },
                { src: "Images/plotly-logo.png", alt: "plotly" },
                { src: "Images/Logo_folium.png", alt: "Folium" }
            ]
        },
        {
            title: "Gestion de l'eau en Afrique",
            description: `
                <p style="text-align: center; font-size: 20px;"><strong>Gestion de l'eau en Afrique pour améliorer l'accès</strong></p>
                <ul>
                    <li class='line-spacing'>Analyse des besoins en eau potable</li>
                    <li class='line-spacing'>Conception de systèmes de distribution</li>
                    <li class='line-spacing'>Évaluation des ressources en eau disponibles</li>
                    <li class='line-spacing'>Planification des infrastructures nécessaires</li>
                    <li class='line-spacing'>Coordination avec les autorités locales</li>
                </ul>
                `,
            document: "Projets/Eau_potable/Eau_potable.html",
            comment: "Commentaires pour le projet d'étude de marché - Export.",
            toolsLogos: [
                { src: "Images/powerbi-Logo.png", alt: "Power BI" },
                { src: "Images/python-logo.png", alt: "Python" } 
            ],
            librariesLogos: [
                { src: "Images/powerbi-Logo.png", alt: "Power BI" },
                { src: "Images/excel-logo.png", alt: "Excel" }
            ]
        },
        {
            title: "Optimisation de la gestion de données",
            description: `
                <p style="text-align: center; font-size: 20px;"><strong>Optimiser la gestion des données d'une boutique</strong></p>
                <ul>
                    <li class='line-spacing'>Analyse exploratoire des fichiers</li
                    ><li class='line-spacing'>Mise en concordance et jointures des tables</li>
                    <li class='line-spacing'>Mise à l'écart des valeurs nulles et manquantes</li>
                    <li class='line-spacing'>Analyse des outliers (valeurs aberrantes) et débrief</li>
                    <li class='line-spacing'>Réponses aux demandes initiales (CA global, par produit...)</li>
                    <li class='line-spacing'>Analyse sur l'état des stocks sur les 10% des références les plus vendues</li>
                </ul>
                `,
            document: "Projets/BoutiqueVin/Vins.html",
            comment: "Commentaires pour le projet d'étude de marché - Export.",
            toolsLogos: [
                { src: "Images/Jupyter-logo.png", alt: "Jupyter" },
                { src: "Images/Logo_Python_NP.png", alt: "Python" }
            ],
            librariesLogos: [
                { src: "Images/Matplot-logo.png", alt: "Matplotlib" },
                { src: "Images/seaborn-logo.png", alt: "Seaborn" }
            ]
        },
        {
            title: "Gestion des ventes dans une librairie",
            description: `
                <p style="text-align: center; font-size: 20px;"><strong>Gestion des ventes et inventaire dans une librairie</strong></p>
                <ul>
                    <li class='line-spacing'>Suivi des ventes et des inventaires</li>
                    <li class='line-spacing'>Mise en place d'un système de gestion des commandes</li>
                    <li class='line-spacing'>Analyse des préférences des clients</li>
                    <li class='line-spacing'>Optimisation des achats et des stocks</li>
                    <li class='line-spacing'>Création de promotions ciblées</li>
                </ul>
                `,
            document: "Projets/Librairie/Librairie.html",
            comment: "Commentaires pour le projet d'étude de marché - Export.",
            toolsLogos: [
                { src: "Images/Jupyter-logo.png", alt: "Jupyter" },
                { src: "Images/Logo_Python_NP.png", alt: "Python" },
                { src: "Images/Statsmodels-logo.png", alt: "Statsmodels" },
                { src: "Images/sklearn-logo.png", alt: "Scikit-learn" }
            ],
            librariesLogos: [
                { src: "Images/Logo_Prophet.png", alt: "Prophet" },
                { src: "Images/Logo_SciPy.png", alt: "SciPy" },
                { src: "Images/Matplot-logo.png", alt: "Matplotlib" },
                { src: "Images/seaborn-logo.png", alt: "Seaborn" }
            ]
        }
    ]

        function updateSlide(index) {
            if (!projects[index]) {
                console.error("Projet non trouvé pour l'index : ", index);
                return;
            }
            images.forEach((img, i) => img.classList.toggle('active', i === index));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            projectTitle.textContent = projects[index].title;
            projectDescription.innerHTML = projects[index].description;
            updateLogos(index);
            documentLink.href = projects[index].document;
            updateDocumentLinkText();
            updateCloseButtonState();
        }
    
        function updateLogos(index) {
            toolsContainer.innerHTML = '';
            librariesContainer.innerHTML = '';
            projects[index].toolsLogos.forEach(logo => {
                const img = document.createElement('img');
                img.src = logo.src;
                img.alt = logo.alt;
                img.classList.add('logo');
                toolsContainer.appendChild(img);
            });
            projects[index].librariesLogos.forEach(logo => {
                const img = document.createElement('img');
                img.src = logo.src;
                img.alt = logo.alt;
                img.classList.add('logo');
                librariesContainer.appendChild(img);
            });
        }
    
        function showNextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlide(currentIndex);
        }
    
        function showPreviousSlide() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlide(currentIndex);
        }
    
        function startCarousel() {
            if (!isPlaying && !isDocumentOpen) {
                interval = setInterval(showNextSlide, 3000);
                isPlaying = true;
                playIcon.style.display = 'none';
                stopIcon.style.display = 'inline';
                updateDocumentLinkText();
            }
        }
    
        function stopCarousel() {
            if (isPlaying) {
                clearInterval(interval);
                isPlaying = false;
                playIcon.style.display = 'inline';
                stopIcon.style.display = 'none';
                updateDocumentLinkText();
            }
        }
    
        function currentSlide(index) {
            if (isDocumentOpen) return;
            clearInterval(interval);
            isPlaying = false;
            playIcon.style.display = 'inline';
            stopIcon.style.display = 'none';
            currentIndex = index;
            updateSlide(currentIndex);
        }
    
        function toggleDocumentContainer() {
            if (documentContainer.classList.contains('hidden')) {
                documentContainer.classList.remove('hidden');
                isDocumentOpen = true;
                stopCarousel();
                disableCarouselControls(true);

                // Désactive le scroll en ajoutant la classe no-scroll au body
                document.body.classList.add('no-scroll');
    
                // Met à jour le titre du document dans .Title-Close-container
                const currentProject = projects[currentIndex];
                if (documentTitleElement) {
                    documentTitleElement.textContent = currentProject.title;
                }
    
                // Ajoute un délai avant d'exécuter le défilement
                setTimeout(() => {
                    window.scrollTo({
                        top: documentContainer.getBoundingClientRect().top + window.scrollY - 60,
                        behavior: 'smooth'
                    });
                }, 100); // Ajuste le délai si nécessaire
    
            } else {
                documentContainer.classList.add('hidden');
                isDocumentOpen = false;
                startCarousel();
                disableCarouselControls(false);
                
                document.body.classList.remove('no-scroll'); // Débloque le scroll

                // Efface le titre dans .Title-Close-container
                if (documentTitleElement) {
                    documentTitleElement.textContent = '';
                }
    
                // Défilement vers le haut après la fermeture du document
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            updateDocumentLinkText();
            updateCloseButtonState();
        }
    
        function loadDocument() {
            const currentProject = projects[currentIndex];
            console.log('Chargement du document : ', currentProject.document); // Vérifiez ce que vous obtenez ici
            if (currentProject.document.endsWith('.html')) {
                updateDocumentContent(currentProject.document, false);
            } else if (currentProject.document.endsWith('.mp4')) {
                updateDocumentContent(currentProject.document, true);
            } else {
                console.error('Type de document non pris en charge');
            }
        }
    
        function updateDocumentContent(url, isVideo) {
            if (isVideo) {
                documentFrame.style.display = 'none';
                documentVideo.style.display = 'block';
                videoSource.src = url;
                documentVideo.load();
            } else {
                documentVideo.style.display = 'none';
                documentFrame.style.display = 'block';
                documentFrame.src = url;
            }
        }
    
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
                documentLink.textContent = 'En savoir plus';
                documentLink.classList.add('active-link');
                documentLink.classList.remove('disabled-link', 'default-link');
            }
        }
    
        function disableCarouselControls(disable) {
            images.forEach(img => img.style.pointerEvents = disable ? 'none' : 'auto');
            dots.forEach(dot => dot.style.pointerEvents = disable ? 'none' : 'auto');
        }
    
        images.forEach(img => img.addEventListener('click', () => {
            if (!isDocumentOpen) {
                isPlaying ? stopCarousel() : startCarousel();
            }
        }));

        dots.forEach((dot, i) => dot.addEventListener('click', () => {
            currentSlide(i);
        }));
    
        documentLink.addEventListener('click', (event) => {
            event.preventDefault(); // Éviter le comportement par défaut du lien
            toggleDocumentContainer();
            if (isDocumentOpen) {
                loadDocument(); // Charger le document lors de l'ouverture
            }
        });
    
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                if (isDocumentOpen) {
                    toggleDocumentContainer(); // Appelle la même fonction que pour 'Fermer le document'
                }
            });
        }
    
        function updateCloseButtonState() {
            if (isDocumentOpen) {
                closeButton.classList.remove('disabled-button'); // Rendre le bouton cliquable
            } else {
                closeButton.classList.add('disabled-button'); // Rendre le bouton non cliquable
            }
        }
    
        updateSlide(currentIndex);
        startCarousel();
    });