import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Cloud,
  Eye,
  GitBranch,
  List,
  MessageCircle,
  Puzzle,
  RefreshCw,
  Smartphone,
  UserRoundCog,
  Users,
  X,
  Briefcase,
  Images,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import inYourEyesCover from './assets/projects/inyoureyes.jpg'
import claimCamCover from './assets/projects/claimcam.jpg'
import portraitPhoto from './assets/Foto.jpg'
import mushroomPhoto from './assets/Fungo.jpeg'
import './App.css'

const projectPhotoModules = import.meta.glob<string>('./assets/projects/*/*.jpg', {
  eager: true,
  import: 'default',
})
const projectPhotos = (folder: string) =>
  Object.entries(projectPhotoModules)
    .filter(([path]) => path.includes(`/projects/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url)

const profile = {
  name: 'Edoardo Rolfo',
  linkedinUrl: 'https://www.linkedin.com/in/edoardo-rolfo',
  githubUrl: 'https://github.com/DE-R-V',
}

const resumeRequestRecipient = 'edoardo.rolfo.er@gmail.com'
const resumeRequestEmailSubject = 'Richiesta CV dal sito'
type RegionsByCountry = Record<string, string[]>
const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

const socialProfiles = [
  { name: 'LinkedIn', url: profile.linkedinUrl, icon: faLinkedin },
  { name: 'GitHub', url: profile.githubUrl, icon: faGithub },
  { name: 'resume', url: '/curriculum.pdf', icon: faFileLines },
]

const skillAreaIcons = [Cloud, Smartphone, Eye, GitBranch, RefreshCw, Users, MessageCircle, Puzzle, UserRoundCog] as const

const translations = {
  it: {
    pageTitle: 'Portfolio personale',
    pageDescription: 'Portfolio personale con una landing page a sipario.',
    profilesLabel: 'Profili personali',
    resumeLabel: 'Curriculum',
    resumeRequestTitle: 'Richiedi il curriculum',
    resumeRequestDescription: 'Compila i dati: riceverò la richiesta e ti invierò il CV via email.',
    firstNameLabel: 'Nome',
    lastNameLabel: 'Cognome',
    companyLabel: 'Azienda',
    countryLabel: 'Nazione',
    regionLabel: 'Regione / Stato',
    cityLabel: 'Città',
    selectPlaceholder: 'Seleziona…',
    positionLabel: 'Posizione offerta o d’interesse',
    recruiterEmailLabel: 'Email del recruiter a cui inviare il CV',
    openEmailAction: 'Invia richiesta',
    sendingAction: 'Invio in corso…',
    requestSentMessage: 'Richiesta inviata! Ti risponderò al più presto.',
    requestErrorMessage: 'Invio non riuscito. Riprova o scrivimi direttamente via email.',
    cancelAction: 'Annulla',
    closeDialogLabel: 'Chiudi modulo',
    languageLabel: 'Seleziona lingua / Select language',
    scrollDesktop: 'Scorri per esplorare il sito',
    scrollMobile: 'Scorri per conoscermi',
    mainNavigation: 'Navigazione principale',
    journeyNavigation: 'Percorso',
    projectsNavigation: 'Progetti',
    skillsNavigation: 'Competenze',
    contactNavigation: 'Contatti',
    skillsViewsLabel: 'Visualizzazione competenze',
    skillsListView: 'Lista',
    skillsFusionView: 'Come?',
    portraitAlt: 'Ritratto di Edoardo Rolfo',
    aboutKicker: 'CHI SONO',
    aboutRolePrefix: 'Sono il tuo futuro',
    aboutRoles: ['collega', 'amico', 'software developer'],
    aboutIntroduction: 'Sono Edoardo, software developer con circa 3 anni di esperienza professionale e una laurea magistrale in Informatica.',
    discoverAbout: 'Su di me',
    aboutPageKicker: 'OLTRE LA PANORAMICA',
    aboutPageTitle: 'Mi piace creare cose utili, insieme.',
    aboutPageParagraphs: [
      'Sono socievole, collaborativo e determinato: mi piace condividere ciò che imparo, lavorare insieme e curare i dettagli. Cerco progetti che abbiano un impatto concreto sulle persone; per me contano più il valore di ciò che si costruisce e il gruppo di lavoro del settore o dello stack.',
      'Fuori dal lavoro mi trovi tra videogiochi, storytelling e worldbuilding, extended reality e raccolta funghi. Parlo italiano, sono a livello C1 in inglese e sto imparando lo svedese (A1).',
    ],
    aboutImageAlt: 'Edoardo con un fungo raccolto durante una passeggiata',
    overviewAction: 'Torna alla panoramica',
    journeyKicker: 'FORMAZIONE E LAVORO',
    journeyTitle: 'Il mio percorso',
    journeyTimelineLabel: 'Timeline di formazione e lavoro',
    journeyCloseDetails: 'Chiudi i dettagli',
    journeyItems: [
      {
        kind: 'LAVORO',
        date: 'Mag 2024 — oggi',
        title: 'Software Developer',
        organization: 'Reply SPA, Torino',
        summary: 'Infrastruttura B2B, app iOS e progetti XR.',
        description: [
          'Infrastruttura backend B2B multi-tenant: provisioning con Terraform e deployment Kubernetes tramite Helm.',
          'Dashboard Grafana tramite Terraform per Loki, Prometheus e Tempo, con log, metriche e tracing distribuito.',
          'Automazione di test e deployment con GitLab CI.',
          'Sviluppo e manutenzione di un’app iOS per eventi usata da migliaia di persone, con notifiche in tempo reale, validazione QR e sincronizzazione in background fino a 6.000 record per ciclo.',
          'Modernizzazione di un’app macOS legacy: elaborazione delle immagini passata da circa 10 a centinaia di asset in pochi secondi.',
          'Contributo ad applicazioni VR per Meta Quest 3 con esperienze collaborative.',
          'Sviluppo di esperienze immersive per Apple Vision Pro per testare le capacità del dispositivo: contenuti multimediali, simulazioni e consultazione di dati su modelli 3D e animazioni.',
        ],
      },
      {
        kind: 'LAUREA MAGISTRALE',
        date: '2021 — 2024',
        title: 'Laurea magistrale in Informatica',
        organization: 'Università di Torino',
        summary: 'Specializzazione in Realtà Virtuale e Computer Vision.',
        description: 'Specializzazione in Realtà Virtuale e Computer Vision (VR & CV).',
      },
      {
        kind: 'LAVORO',
        date: 'Set 2023 — Mar 2024',
        title: 'XR Developer, tirocinio',
        organization: 'TIM S.p.A., Torino',
        summary: 'Porting XR su Meta Quest Pro e Meta Quest 3.',
        description: [
          'Porting completo di un’applicazione da mobile e HoloLens a Meta Quest Pro e Meta Quest 3.',
          'Adattamento di interfaccia, interazioni e gestione dei contenuti ai nuovi dispositivi e modelli di interazione XR.',
        ],
      },
      {
        kind: 'LAUREA TRIENNALE',
        date: '2018 — 2021',
        title: 'Laurea triennale in Informatica',
        organization: 'Università di Torino',
        summary: '',
        description: 'Laurea triennale in Informatica conseguita all’Università di Torino.',
      },
    ],
    projectsKicker: 'SELEZIONE',
    projectsTitle: 'Progetti personali',
    featuredProjectLabel: 'Vincitore XRCC 2025',
    featuredProjectTitle: 'InYourEyes',
    featuredProjectDescription: 'Ho guidato sviluppo e team end-to-end di un’app interattiva per simulare disabilità visive: dalla strategia di prodotto e roadmap al design delle interazioni e al prototipo pronto all’uso.',
    featuredProjectDetails: 'Vincitrice di XR Creator Con 2025, InYourEyes è un’app per Meta Quest 3 che usa le tecnologie immersive per mostrare come le patologie della vista alterano la percezione, con l’obiettivo di informare e sensibilizzare. Ho costruito le interazioni insieme al UI designer, unendo competenze XR e UI/UX.',
    secondProjectLabel: 'Finalista XRCC 2026',
    secondProjectTitle: 'ClaimCam',
    secondProjectDescription: 'App XR per workflow assicurativi con ricostruzione 3D della scena tramite Gaussian Splatting, selezionata per XR Creator Con 2026.',
    secondProjectDetails: 'Il progetto porta in XR il lavoro di periti e assicuratori: la scena di un sinistro viene ricostruita in 3D con il Gaussian Splatting, così da poterla esplorare e documentare anche a distanza.',
    thirdProjectLabel: '.NET MAUI / Blazor',
    thirdProjectTitle: 'BudgetBuddy',
    thirdProjectDescription: 'Web app per pianificare e tenere sotto controllo il budget mensile e annuale.',
    thirdProjectDetails: 'Permette di registrare entrate e uscite, organizzarle per categoria e confrontare l’andamento mese per mese con gli obiettivi annuali.',
    fourthProjectLabel: 'XR / Unity',
    fourthProjectTitle: 'UI Centering',
    fourthProjectDescription: 'Piccolo esperimento XR con un’interfaccia che si ricentra automaticamente nel campo visivo dell’utente.',
    fourthProjectDetails: 'Il pannello segue lo sguardo con un movimento morbido, restando sempre leggibile senza risultare invadente: una base riutilizzabile per interfacce XR più comode.',
    fifthProjectLabel: 'Esercitazione / C#',
    fifthProjectTitle: 'LeetCode',
    fifthProjectDescription: 'Raccolta delle mie soluzioni ai problemi di LeetCode, per allenare algoritmi e strutture dati. Tutte le soluzioni sono scritte da me, senza l’uso dell’AI.',
    fifthProjectDetails: 'Un modo per tenermi allenato sulle basi: ogni soluzione è un esercizio di ragionamento, ottimizzazione e scrittura di codice pulito in C#.',
    projectRepoLinkLabel: 'Vedi su GitHub',
    previousProjects: 'Progetti precedenti',
    nextProjects: 'Progetti successivi',
    projectPageLabel: 'Pagina progetti',
    workProjectsNoteLabel: 'Progetti lavorativi',
    workProjectsNote: 'Non posso mostrare i progetti lavorativi, ma posso raccontarteli di persona.',
    workProjectsNoteAction: 'Parliamone',
    skillsKicker: 'COMPETENZE',
    skillsTitle: 'Le mie competenze',
    skillsFusionTitle: 'Come contribuiscono le competenze',
    skillsFusionDescription: 'Scegli una competenza per ciascuna area e osserva nell’esempio come si combinano.',
    skillsCarouselLabel: 'Macroaree di competenza',
    previousSkill: 'Macroarea precedente',
    nextSkill: 'Macroarea successiva',
    skillsDetailsTitle: 'Competenze dell’area',
    technicalSkillsGroup: 'TECH SKILLS',
    softSkillsGroup: 'SOFT SKILLS',
    skillsLanguagesTitle: 'LINGUE',
    skillsLanguages: ['Italiano madrelingua', 'Inglese C1', 'Svedese A1'],
    skillsGeneralTitle: 'Sviluppo software',
    skillsGeneral: [
      'Architettura software e design pattern',
      'Programmazione a oggetti e principi SOLID',
      'Testing automatico',
      'Algoritmi e strutture dati',
    ],
    skillsCombinationTitle: 'Esempio concreto',
    skillsCombinationSource: 'Esempio tratto da',
    projectGalleryOpen: 'Guarda le foto',
    projectGalleryPrevious: 'Foto precedente',
    projectGalleryNext: 'Foto successiva',
    projectGalleryPhoto: 'Foto',
    skillsCombinationEmpty: 'Per questa coppia non c’è ancora un esempio da raccontare.',
    skillsItems: [
      { title: 'Cloud e infrastruttura', description: 'Terraform & AWS, Helm & Kubernetes.' },
      { title: 'Sviluppo iOS', description: 'Swift, SwiftUI & UIKit.' },
      { title: 'XR, VR & Computer Vision', description: 'Unity & C#, XR Development.' },
      { title: 'Delivery', description: 'DevOps, Git & GitLab CI/CD.' },
      { title: 'Adattabilità', description: 'Imparare in fretta, Cambiare contesto' },
      { title: 'Spirito di squadra', description: 'Collaborazione, Coordinamento tra team' },
      { title: 'Apertura al feedback', description: 'Ascolto attivo, Miglioramento continuo' },
      { title: 'Problem solving', description: 'Analisi, Soluzioni pragmatiche' },
      { title: 'Leadership e ownership', description: 'Iniziativa, Responsabilità' },
    ],
    skillCombinationDescriptions: {
      '0:0': {
        label: 'INFRASTRUTTURA B2B / REPLY',
        description: 'Appena entrato nel progetto ho dovuto coprire fronti molto diversi: dall’abilitare Keycloak e configurarne accessi e permessi alla definizione con Terraform delle risorse AWS necessarie ai servizi.',
      },
      '0:1': {
        label: 'INFRASTRUTTURA B2B / REPLY',
        description: 'Mantenere l’infrastruttura significa confrontarsi e coordinarsi di continuo con gli sviluppatori dei microservizi: ogni modifica a risorse, permessi o deploy va concordata, perché ha effetti diretti sul loro lavoro e viceversa.',
      },
      '0:2': {
        label: 'OSSERVABILITÀ / REPLY',
        description: 'Ho costruito le dashboard Grafana su un flusso costante di feedback con gli sviluppatori, partendo dalle reali necessità di monitoraggio di ciascun microservizio e affinando log, metriche e tracing man mano che emergevano nuove esigenze.',
      },
      '0:3': {
        label: 'STREAMING MEDIAMTX / REPLY',
        description: 'Certificati TLS installati a mano sulle EC2 di streaming, senza i permessi per gestirli, causavano problemi ricorrenti: ho ridisegnato l’infrastruttura come codice con Terraform, bilanciando i costi di nuovi componenti come i Network Load Balancer con una migrazione senza interruzioni di servizio né perdita di configurazioni e dati.',
      },
      '0:4': {
        label: 'AMBIENTE DEMO / REPLY',
        description: 'Ho preso in mano la creazione di un ambiente demo parallelo a dev sullo stesso cluster: dopo un kick-off iniziale ho lavorato su ciascun microservizio, collaborando con chi lo sviluppava, finché il deploy su demo non è stato funzionante, indipendente e completo.',
      },
      '1:0': {
        label: 'DA VISIONOS A IOS / REPLY',
        description: 'Per esigenze aziendali sono passato da sviluppatore XR su visionOS a sviluppatore mobile iOS nel giro di una settimana, facendo leva sulla mia esperienza con SwiftUI per diventare subito operativo su un’app già in produzione.',
      },
      '1:1': {
        label: 'APP EVENTI / REPLY',
        description: 'Le app iOS e Android dovevano apparire e comportarsi in modo praticamente identico, mentre la parte web dipendeva interamente dalla comunicazione con il nativo: la collaborazione costante con i colleghi ci ha permesso di consegnare un’app che ha soddisfatto pienamente il cliente, nonostante scadenze strettissime.',
      },
      '1:2': {
        label: 'APP EVENTI / REPLY',
        description: 'Con un cliente molto esigente e requisiti che cambiavano spesso, ho imparato ad accogliere il feedback anche quando significava rifare da zero funzionalità già concluse, mantenendo qualità e scadenze senza perdere la motivazione.',
      },
      '1:3': {
        label: 'APP EVENTI / REPLY',
        description: 'Ho costruito da zero una pipeline con Swift Combine per recuperare, elaborare e aggiornare oltre 6.000 record in cicli di circa 30 secondi, mantenendoli coerenti tra i dispositivi. Un approccio simile su macOS ha decuplicato le prestazioni.',
      },
      '1:4': {
        label: 'APP EVENTI / REPLY',
        description: 'In assenza di indicazioni chiare ho dato all’app iOS la direzione che mi sembrava più logica per non bloccare gli sviluppi, assumendomene poi la responsabilità davanti al manager e spiegando le scelte fatte.',
      },
      '2:0': {
        label: 'MULTI-DEVICE / XR',
        description: 'Ho sviluppato per dispositivi molto diversi tra loro, da Meta Quest e Apple Vision Pro a HoloLens e smartphone per la realtà aumentata, adattando ogni volta interazioni, prestazioni e vincoli tecnici alla piattaforma.',
      },
      '2:1': {
        label: 'ESPERIENZE VR / REPLY',
        description: 'Nelle esperienze VR a cui ho lavorato, il coordinamento con altri sviluppatori su feature diverse, con i 3D artist e con i VFX artist è stato fondamentale per integrare il lavoro di tutti e portare i progetti a termine con successo.',
      },
      '2:2': {
        label: 'INYOUREYES / XRCC 2025',
        description: 'In InYourEyes ho costruito le interazioni partendo dai feedback del UI designer: unendo la mia esperienza in XR alle sue intuizioni da esperto di UI/UX, abbiamo reso l’esperienza più chiara e naturale da usare dentro il visore.',
      },
      '2:3': {
        label: 'TIROCINIO XR / TIM',
        description: 'I modelli 3D avevano trasformazioni non normalizzate e generavano collider sproporzionati o troppo pesanti per il visore: ho scritto un algoritmo depth-first che calcola una bounding box minima per ogni elemento e le unisce in un collider approssimato, facile da usare e leggero da calcolare.',
      },
      '2:4': {
        label: 'INYOUREYES / HACKATHON',
        description: 'Negli hackathon mi pongo come punto di riferimento tecnico del team, anche su ambiti in cui non sono pienamente formato. Con InYourEyes ho guidato il progetto senza esperienza da PM, arrivando al secondo posto.',
      },
      '3:0': {
        label: 'PIPELINE CI/CD / REPLY',
        description: 'Ho lavorato su molte pipeline diverse, adattandone ambienti, variabili e flussi alle esigenze dei singoli microservizi, così che ognuno potesse essere testato e rilasciato in modo coerente con il resto dell’infrastruttura.',
      },
      '3:1': {
        label: 'PIPELINE CI/CD / REPLY',
        description: 'Mantengo pipeline chiare e documentate, così che anche i colleghi che sviluppano i microservizi possano capire e gestire in autonomia i propri rilasci, senza dipendere ogni volta da chi segue l’infrastruttura.',
      },
      '3:2': {
        label: 'CODE REVIEW / REPLY',
        description: 'Le merge request sono un momento di confronto: accolgo i commenti dei colleghi come occasione per migliorare il codice e cerco di restituire review chiare e costruttive, spiegando il perché di ogni suggerimento.',
      },
      '3:3': {
        label: 'PIPELINE CI/CD / REPLY',
        description: 'Quando una pipeline si blocca, analizzo log e configurazione passo per passo per isolare la causa, che sia una variabile mancante, un permesso o una dipendenza, e sbloccare il rilascio senza scorciatoie rischiose.',
      },
      '3:4': {
        label: 'PIPELINE TERRAFORM / REPLY',
        description: 'Ho modificato di mia iniziativa le pipeline delle merge request per evitare deploy inutili e ottenere solo piani Terraform reali, così da poter rivedere e riadattare il codice senza deploy rischiosi sugli ambienti condivisi.',
      },
    },
    contactKicker: 'CONTATTI',
    contactTitle: 'Contatti',
    contactDescription: 'Per opportunità e collaborazioni, scrivimi:',
    contactEmailLabel: 'Scrivimi via email',
    backToTop: 'Torna all’inizio',
    siteCredit: 'Progettato e realizzato da Edoardo Rolfo con il supporto di Copilot.',
  },
  en: {
    pageTitle: 'Personal portfolio',
    pageDescription: 'Personal portfolio with a curtain-style landing page.',
    profilesLabel: 'Social profiles',
    resumeLabel: 'Resume',
    resumeRequestTitle: 'Request the CV',
    resumeRequestDescription: 'Fill in the details: I will receive your request and send you the CV by email.',
    firstNameLabel: 'First name',
    lastNameLabel: 'Last name',
    companyLabel: 'Company',
    countryLabel: 'Country',
    regionLabel: 'Region / State',
    cityLabel: 'City',
    selectPlaceholder: 'Select…',
    positionLabel: 'Position offered or of interest',
    recruiterEmailLabel: 'Recruiter email to send the CV to',
    openEmailAction: 'Send request',
    sendingAction: 'Sending…',
    requestSentMessage: 'Request sent! I will get back to you soon.',
    requestErrorMessage: 'Sending failed. Please try again or email me directly.',
    cancelAction: 'Cancel',
    closeDialogLabel: 'Close form',
    languageLabel: 'Select language / Seleziona lingua',
    scrollDesktop: 'Scroll to explore the website',
    scrollMobile: 'Scroll down to know about me',
    mainNavigation: 'Main navigation',
    journeyNavigation: 'Journey',
    projectsNavigation: 'Projects',
    skillsNavigation: 'Skills',
    contactNavigation: 'Contact',
    skillsViewsLabel: 'Skills view',
    skillsListView: 'List',
    skillsFusionView: 'How?',
    portraitAlt: 'Portrait of Edoardo Rolfo',
    aboutKicker: 'ABOUT',
    aboutRolePrefix: 'I could be your future',
    aboutRoles: ['colleague', 'friend', 'software developer'],
    aboutIntroduction: 'I’m Edoardo, a software developer with around 3 years of professional experience and a master’s degree in Computer Science.',
    discoverAbout: 'About me',
    aboutPageKicker: 'BEYOND THE OVERVIEW',
    aboutPageTitle: 'I like building useful things, together.',
    aboutPageParagraphs: [
      'I’m sociable, collaborative, and determined. I enjoy sharing what I learn, working as a team, and taking care of the details. I’m looking for projects with a tangible impact on people; the value of the work and the people I build it with matter more to me than the sector or tech stack.',
      'Outside work, you’ll find me playing video games, exploring storytelling and worldbuilding, getting into extended reality, or out mushroom foraging. I’m a native Italian speaker, have C1 English, and I’m learning Swedish (A1).',
    ],
    aboutImageAlt: 'Edoardo with a mushroom he found while out walking',
    overviewAction: 'Back to overview',
    journeyKicker: 'EDUCATION & WORK',
    journeyTitle: 'My journey',
    journeyTimelineLabel: 'Education and work timeline',
    journeyCloseDetails: 'Close details',
    journeyItems: [
      {
        kind: 'WORK',
        date: 'May 2024 — Present',
        title: 'Software Developer',
        organization: 'Reply S.p.A., Turin',
        summary: 'B2B infrastructure, iOS apps and XR projects.',
        description: [
          'Provisioned multi-tenant B2B backend infrastructure with Terraform and managed Kubernetes deployments with Helm.',
          'Configured Grafana dashboards with Terraform for Loki, Prometheus and Tempo observability data, covering logs, metrics and distributed tracing.',
          'Automated testing and deployment workflows with GitLab CI.',
          'Developed and maintained a production iOS event app used by thousands of attendees and staff, with real-time notifications, QR validation and background synchronization for up to 6,000 records per cycle.',
          'Modernized a legacy macOS app, increasing image-processing throughput from around 10 assets to hundreds in seconds.',
          'Contributed to VR applications for Meta Quest 3 featuring collaborative experiences.',
          'Developed immersive experiences for Apple Vision Pro to test the device’s capabilities, including multimedia content, simulations, and data exploration on 3D models and animations.',
        ],
      },
      {
        kind: 'MASTER’S DEGREE',
        date: '2021 — 2024',
        title: 'Master’s degree in Computer Science',
        organization: 'University of Turin',
        summary: 'Specialization in Virtual Reality and Computer Vision.',
        description: 'Specialization in Virtual Reality and Computer Vision (VR & CV).',
      },
      {
        kind: 'WORK',
        date: 'Sep 2023 — Mar 2024',
        title: 'XR Developer, internship',
        organization: 'TIM S.p.A., Turin',
        summary: 'XR port to Meta Quest Pro and Meta Quest 3.',
        description: [
          'Ported an application from mobile and HoloLens to Meta Quest Pro and Meta Quest 3.',
          'Adapted the UI, interactions and content management for the new devices and XR interaction models.',
        ],
      },
      {
        kind: 'BACHELOR’S DEGREE',
        date: '2018 — 2021',
        title: 'Bachelor’s degree in Computer Science',
        organization: 'University of Turin',
        summary: 'Computer Science at the University of Turin.',
        description: 'Bachelor’s degree in Computer Science from the University of Turin.',
      },
    ],
    projectsKicker: 'SELECTED WORK',
    projectsTitle: 'Personal Projects',
    featuredProjectLabel: 'XRCC 2025 Award Winner',
    featuredProjectTitle: 'InYourEyes',
    featuredProjectDescription: 'Led the team and end-to-end development of an interactive visual impairment simulation app, from product strategy and feature roadmap to interaction design and a ready-to-use prototype.',
    featuredProjectDetails: 'Winner of XR Creator Con 2025, InYourEyes is a Meta Quest 3 app that uses immersive technologies to show how vision pathologies alter perception, aiming to inform and raise awareness.',
    secondProjectLabel: 'XRCC 2026 Finalist',
    secondProjectTitle: 'ClaimCam',
    secondProjectDescription: 'An XR insurance workflow app using Gaussian Splatting for 3D scene reconstruction, selected for showcase at XR Creator Con 2026.',
    secondProjectDetails: 'The project brings the work of loss adjusters and insurers into XR: the scene of a claim is reconstructed in 3D with Gaussian Splatting, so it can be explored and documented remotely.',
    thirdProjectLabel: '.NET MAUI / Blazor',
    thirdProjectTitle: 'BudgetBuddy',
    thirdProjectDescription: 'A web app to plan and keep track of monthly and annual budgets.',
    thirdProjectDetails: 'It lets you record income and expenses, organize them by category, and compare month-by-month trends with annual goals.',
    fourthProjectLabel: 'XR / Unity',
    fourthProjectTitle: 'UI Centering',
    fourthProjectDescription: 'A small XR experiment with an interface that automatically re-centres itself in the user’s field of view.',
    fourthProjectDetails: 'The panel follows the user’s gaze with smooth motion, staying readable without being intrusive: a reusable foundation for more comfortable XR interfaces.',
    fifthProjectLabel: 'Practice / C#',
    fifthProjectTitle: 'LeetCode',
    fifthProjectDescription: 'A collection of my solutions to LeetCode problems, used to practise algorithms and data structures. Every solution is written by me, without the use of AI.',
    fifthProjectDetails: 'A way to keep my fundamentals sharp: each solution is an exercise in reasoning, optimization, and writing clean C# code.',
    projectRepoLinkLabel: 'View on GitHub',
    previousProjects: 'Previous projects',
    nextProjects: 'Next projects',
    projectPageLabel: 'Projects page',
    workProjectsNoteLabel: 'Professional projects',
    workProjectsNote: 'I can’t show my work projects here, but I’m happy to talk about them in person.',
    workProjectsNoteAction: 'Let’s talk',
    skillsKicker: 'SKILLS',
    skillsTitle: 'Skills',
    skillsFusionTitle: 'How the skills contribute',
    skillsFusionDescription: 'Choose one skill from each area to see how they work together in the example.',
    skillsCarouselLabel: 'Skill areas',
    previousSkill: 'Previous skill area',
    nextSkill: 'Next skill area',
    skillsDetailsTitle: 'Area skills',
    technicalSkillsGroup: 'TECH SKILLS',
    softSkillsGroup: 'SOFT SKILLS',
    skillsLanguagesTitle: 'LANGUAGES',
    skillsLanguages: ['Native Italian', 'English C1', 'Swedish A1'],
    skillsGeneralTitle: 'Software development',
    skillsGeneral: [
      'Software architecture & design patterns',
      'Object-oriented programming & SOLID',
      'Automated testing',
      'Algorithms & data structures',
    ],
    skillsCombinationTitle: 'A real example',
    skillsCombinationSource: 'Example from',
    projectGalleryOpen: 'View photos',
    projectGalleryPrevious: 'Previous photo',
    projectGalleryNext: 'Next photo',
    projectGalleryPhoto: 'Photo',
    skillsCombinationEmpty: 'There is no example to share for this pairing yet.',
    skillsItems: [
      { title: 'Cloud & infrastructure', description: 'Terraform & AWS, Helm & Kubernetes.' },
      { title: 'iOS development', description: 'Swift, SwiftUI & UIKit.' },
      { title: 'XR, VR & Computer Vision', description: 'Unity & C#, XR development.' },
      { title: 'Delivery', description: 'DevOps, Git & GitLab CI/CD.' },
      { title: 'Adaptability', description: 'Fast learning, Context switching' },
      { title: 'Teamwork', description: 'Collaboration, Cross-team coordination' },
      { title: 'Feedback-driven', description: 'Active listening, Continuous improvement' },
      { title: 'Problem solving', description: 'Analysis, Pragmatic solutions' },
      { title: 'Leadership & ownership', description: 'Initiative, Accountability' },
    ],
    skillCombinationDescriptions: {
      '0:0': {
        label: 'B2B INFRASTRUCTURE / REPLY',
        description: 'As soon as I joined the project, I had to cover very different fronts: from enabling Keycloak and configuring its access and permissions to defining the AWS resources the services needed with Terraform.',
      },
      '0:1': {
        label: 'B2B INFRASTRUCTURE / REPLY',
        description: 'Maintaining the infrastructure means constant discussion and coordination with the microservice developers: every change to resources, permissions, or deployments has to be agreed on, because it directly affects their work and vice versa.',
      },
      '0:2': {
        label: 'OBSERVABILITY / REPLY',
        description: 'I built the Grafana dashboards around a continuous feedback loop with the developers, starting from the real monitoring needs of each microservice and refining logs, metrics, and tracing as new needs emerged.',
      },
      '0:3': {
        label: 'MEDIAMTX STREAMING / REPLY',
        description: 'TLS certificates installed by hand on the streaming EC2 instances, without the permissions to manage them, kept causing issues: I redesigned the infrastructure as code with Terraform, balancing the cost of new components such as Network Load Balancers with a migration that caused no downtime and lost no configuration or data.',
      },
      '0:4': {
        label: 'DEMO ENVIRONMENT / REPLY',
        description: 'I took charge of creating a demo environment alongside dev on the same cluster: after an initial kick-off, I worked through each microservice with its developers until the demo deployment was functional, independent, and complete.',
      },
      '1:0': {
        label: 'FROM VISIONOS TO IOS / REPLY',
        description: 'Due to business needs, I moved from visionOS XR developer to iOS mobile developer within a week, building on my SwiftUI experience to become productive right away on an app already in production.',
      },
      '1:1': {
        label: 'EVENT APP / REPLY',
        description: 'The iOS and Android apps had to look and behave almost identically, while the web part depended entirely on communication with the native layer: constant collaboration with my colleagues let us deliver an app that fully satisfied the client despite very tight deadlines.',
      },
      '1:2': {
        label: 'EVENT APP / REPLY',
        description: 'With a very demanding client and frequently changing requirements, I learned to embrace feedback even when it meant rebuilding finished features from scratch, while keeping quality and deadlines on track.',
      },
      '1:3': {
        label: 'EVENT APP / REPLY',
        description: 'I built a Swift Combine pipeline from scratch to fetch, process, and update 6,000+ records in cycles of about 30 seconds while keeping them consistent across devices. A similar approach on macOS delivered a 10x performance boost.',
      },
      '1:4': {
        label: 'EVENT APP / REPLY',
        description: 'Without clear direction, I set the course for the iOS app that made the most sense to me so development could move forward, then took responsibility for it in front of my manager and explained the choices I made.',
      },
      '2:0': {
        label: 'MULTI-DEVICE / XR',
        description: 'I have developed for very different devices, from Meta Quest and Apple Vision Pro to HoloLens and AR on smartphones, adapting interactions, performance, and technical constraints to each platform.',
      },
      '2:1': {
        label: 'VR EXPERIENCES / REPLY',
        description: 'In the VR experiences I worked on, coordinating with other developers on different features, with 3D artists, and with VFX artists was key to bringing everyone’s work together and delivering the projects successfully.',
      },
      '2:2': {
        label: 'INYOUREYES / XRCC 2025',
        description: 'In InYourEyes I built the interactions around feedback from the UI designer: by combining my XR expertise with their UI/UX insights, we made the experience clearer and more natural to use inside the headset.',
      },
      '2:3': {
        label: 'XR INTERNSHIP / TIM',
        description: 'The 3D models had non-normalized transforms that produced oversized colliders or ones too heavy for the headset: I wrote a depth-first algorithm that computes a minimum bounding box for each element and merges them into an approximate collider that is easy to interact with and cheap to compute.',
      },
      '2:4': {
        label: 'INYOUREYES / HACKATHONS',
        description: 'At hackathons I act as the team’s technical point of reference, even in areas where I am not fully trained. With InYourEyes I led the project with no PM experience and reached second place.',
      },
      '3:0': {
        label: 'CI/CD PIPELINES / REPLY',
        description: 'I have worked on many different pipelines, adapting their environments, variables, and flows to the needs of each microservice so every one of them could be tested and released consistently with the rest of the infrastructure.',
      },
      '3:1': {
        label: 'CI/CD PIPELINES / REPLY',
        description: 'I keep pipelines clear and documented so that the developers of each microservice can understand and manage their own releases independently, without always depending on whoever looks after the infrastructure.',
      },
      '3:2': {
        label: 'CODE REVIEW / REPLY',
        description: 'Merge requests are a moment for discussion: I welcome colleagues’ comments as a chance to improve the code and aim to give clear, constructive reviews in return, explaining the reasoning behind each suggestion.',
      },
      '3:3': {
        label: 'CI/CD PIPELINES / REPLY',
        description: 'When a pipeline gets stuck, I go through logs and configuration step by step to isolate the cause, whether it is a missing variable, a permission, or a dependency, and unblock the release without risky shortcuts.',
      },
      '3:4': {
        label: 'TERRAFORM PIPELINES / REPLY',
        description: 'On my own initiative, I changed the merge request pipelines to avoid unnecessary deployments and produce only real Terraform plans, so code could be reviewed and reworked without risky deploys on shared environments.',
      },
    },
    contactKicker: 'CONTACT',
    contactTitle: 'Contact',
    contactDescription: 'For opportunities and collaborations, get in touch:',
    contactEmailLabel: 'Email me',
    backToTop: 'Back to top',
    siteCredit: 'Designed and built by Edoardo Rolfo with support from Copilot.',
  },
} as const

type Language = keyof typeof translations
type JourneyItem = {
  kind: string
  date: string
  title: string
  organization: string
  summary: string
  description: string | readonly string[]
}

function LanguageSelector({
  language,
  label,
  onSelect,
}: {
  language: Language
  label: string
  onSelect: (language: Language) => void
}) {
  return (
    <div className="language-selector" role="group" aria-label={label}>
      {(['it', 'en'] as const).map((option) => (
        <button
          key={option}
          className="language-option"
          type="button"
          aria-pressed={language === option}
          onClick={() => onSelect(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function ProfileName({
  className,
  linked = false,
}: {
  className: string
  linked?: boolean
}) {
  return (
    <h1 className={className}>
      {linked ? <a href="#home">{profile.name}</a> : profile.name}
    </h1>
  )
}

function ProfileSocials({
  className,
  linkClassName,
  profilesLabel,
  resumeLabel,
  onResumeClick,
  withTooltips = false,
  withLabels = false,
}: {
  className: string
  linkClassName: string
  profilesLabel: string
  resumeLabel: string
  onResumeClick: () => void
  withTooltips?: boolean
  withLabels?: boolean
}) {
  return (
    <nav className={className} aria-label={profilesLabel}>
      {socialProfiles.map(({ name, url, icon }) => {
        const label = name === 'resume' ? resumeLabel : name
        const content = (
          <>
            <FontAwesomeIcon icon={icon} aria-hidden="true" />
            {withLabels && <span>{label}</span>}
            {withTooltips && (
              <span className="home-social-tooltip" aria-hidden="true">{label}</span>
            )}
          </>
        )

        if (name === 'resume') {
          return (
            <button
              key={name}
              className={linkClassName}
              type="button"
              aria-label={label}
              title={label}
              onClick={onResumeClick}
            >
              {content}
            </button>
          )
        }

        return (
          <a
            key={name}
            className={linkClassName}
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
          >
            {content}
          </a>
        )
      })}
    </nav>
  )
}

function App() {
  const [progress, setProgress] = useState(0)
  const [projectPage, setProjectPage] = useState(0)
  const [skillsView, setSkillsView] = useState<'inventory' | 'fusion'>('fusion')
  const [selectedSkillIndices, setSelectedSkillIndices] = useState([2, 0])
  const [skillWheelRotations, setSkillWheelRotations] = useState([-180, 0])
  const [draggingSkillWheel, setDraggingSkillWheel] = useState<number | null>(null)
  const wheelDrag = useRef<{
    groupIndex: number
    pointerId: number
    lastAngle: number
    lastTimestamp: number
    accumulatedAngle: number
    angularVelocity: number
    rotation: number
    selectedIndex: number
    hasDragged: boolean
  } | null>(null)
  const suppressWheelClick = useRef(false)
  const [language, setLanguage] = useState<Language>(() => (
    window.localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'it'
  ))
  const [resumeRequestOpen, setResumeRequestOpen] = useState(false)
  const [regionsByCountry, setRegionsByCountry] = useState<RegionsByCountry | null>(null)
  const [selectedCountry, setSelectedCountry] = useState('IT')
  const [resumeRequestStatus, setResumeRequestStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [aboutPageOpen, setAboutPageOpen] = useState(false)
  const [aboutRoleIndex, setAboutRoleIndex] = useState(0)
  const [selectedJourneyItem, setSelectedJourneyItem] = useState<JourneyItem | null>(null)
  const [projectGallery, setProjectGallery] = useState<{ title: string; photos: string[]; index: number } | null>(null)
  const projectGalleryDialog = useRef<HTMLDialogElement>(null)
  const resumeRequestDialog = useRef<HTMLDialogElement>(null)
  const journeyDialog = useRef<HTMLDialogElement>(null)
  const overviewPageHeading = useRef<HTMLHeadingElement>(null)
  const aboutPageHeading = useRef<HTMLHeadingElement>(null)
  const previousAboutPageOpen = useRef(false)
  const copy = translations[language]
  const skillGroups = [
    { title: copy.technicalSkillsGroup, skills: copy.skillsItems.slice(0, 4), iconOffset: 0 },
    { title: copy.softSkillsGroup, skills: copy.skillsItems.slice(4), iconOffset: 4 },
  ]

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const updateProgress = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        if (reducedMotion.matches) {
          setProgress(1)
          return
        }

        const openingDistance = window.innerHeight * 1.1
        const nextProgress = window.scrollY >= openingDistance - 1
          ? 1
          : window.scrollY / openingDistance
        setProgress(nextProgress)
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    reducedMotion.addEventListener('change', updateProgress)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateProgress)
      reducedMotion.removeEventListener('change', updateProgress)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.title = copy.pageTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.pageDescription)
    window.localStorage.setItem('portfolio-language', language)
  }, [copy.pageDescription, copy.pageTitle, language])

  useEffect(() => {
    const dialog = resumeRequestDialog.current
    if (!dialog) return

    if (resumeRequestOpen && !dialog.open) dialog.showModal()
    if (!resumeRequestOpen && dialog.open) dialog.close()
  }, [resumeRequestOpen])

  useEffect(() => {
    const dialog = projectGalleryDialog.current
    if (!dialog) return

    if (projectGallery && !dialog.open) dialog.showModal()
    if (!projectGallery && dialog.open) dialog.close()
  }, [projectGallery])

  const stepProjectGallery = (direction: number) => {
    setProjectGallery((gallery) => gallery && {
      ...gallery,
      index: (gallery.index + direction + gallery.photos.length) % gallery.photos.length,
    })
  }

  useEffect(() => {
    const dialog = journeyDialog.current
    if (!dialog) return

    if (selectedJourneyItem && !dialog.open) dialog.showModal()
    if (!selectedJourneyItem && dialog.open) dialog.close()
  }, [selectedJourneyItem])

  useEffect(() => {
    const journey = journeyDialog.current
    const resume = resumeRequestDialog.current
    if (!journey || !resume) return

    const closeOnBackdrop = (dialog: HTMLDialogElement, close: () => void) => (event: MouseEvent) => {
      const bounds = dialog.getBoundingClientRect()
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        close()
      }
    }

    const closeJourneyOnBackdrop = closeOnBackdrop(journey, () => setSelectedJourneyItem(null))
    const closeResumeOnBackdrop = closeOnBackdrop(resume, () => setResumeRequestOpen(false))
    journey.addEventListener('click', closeJourneyOnBackdrop)
    resume.addEventListener('click', closeResumeOnBackdrop)

    return () => {
      journey.removeEventListener('click', closeJourneyOnBackdrop)
      resume.removeEventListener('click', closeResumeOnBackdrop)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setAboutRoleIndex((index) => (index + 1) % copy.aboutRoles.length)
    }, 3600)

    return () => window.clearInterval(interval)
  }, [copy.aboutRoles.length])

  useEffect(() => {
    const mobileView = window.matchMedia('(max-width: 700px)').matches
    const scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'

    if (aboutPageOpen) {
      aboutPageHeading.current?.focus({ preventScroll: true })
      if (mobileView) {
        aboutPageHeading.current?.closest('.home-hero')?.scrollIntoView({
          block: 'start',
          behavior: scrollBehavior,
        })
      }
    } else if (previousAboutPageOpen.current) {
      overviewPageHeading.current?.focus({ preventScroll: true })
      if (mobileView) {
        overviewPageHeading.current?.closest('.home-hero')?.scrollIntoView({
          block: 'start',
          behavior: scrollBehavior,
        })
      }
    }

    previousAboutPageOpen.current = aboutPageOpen
  }, [aboutPageOpen])

  useEffect(() => {
    if (!resumeRequestOpen || regionsByCountry) return
    void import('./data/regions.json').then((module) => setRegionsByCountry(module.default as RegionsByCountry))
  }, [regionsByCountry, resumeRequestOpen])

  const countryNames = new Intl.DisplayNames([language], { type: 'region' })
  const countryOptions = Object.keys(regionsByCountry ?? { IT: [] })
    .map((code) => ({ code, name: countryNames.of(code) ?? code }))
    .sort((a, b) => a.name.localeCompare(b.name, language))
  const regionOptions = regionsByCountry?.[selectedCountry] ?? []

  const handleResumeRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    if (formData.get('botcheck')) return
    const values = {
      firstName: String(formData.get('firstName')),
      lastName: String(formData.get('lastName')),
      company: String(formData.get('company')),
      country: new Intl.DisplayNames(['it'], { type: 'region' }).of(String(formData.get('country'))) ?? '',
      region: String(formData.get('region') ?? ''),
      city: String(formData.get('city') ?? ''),
      position: String(formData.get('position')),
      recruiterEmail: String(formData.get('recruiterEmail')),
    }
    const subject = resumeRequestEmailSubject
    const location = [values.city, values.region, values.country].filter(Boolean).join(', ')
    const body = [
      'Nuova richiesta CV dal sito.',
      '',
      `Nome: ${[values.firstName, values.lastName].filter(Boolean).join(' ')}`,
      `Email recruiter: ${values.recruiterEmail}`,
      `Azienda: ${values.company}`,
      `Sede: ${location}`,
      `Posizione: ${values.position}`,
      `Lingua del sito: ${language.toUpperCase()}`,
    ].join('\n')

    if (!web3FormsAccessKey) {
      window.location.href = `mailto:${resumeRequestRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setResumeRequestOpen(false)
      return
    }

    setResumeRequestStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          subject,
          from_name: `${values.firstName} ${values.lastName}`,
          replyto: values.recruiterEmail,
          message: body,
        }),
      })
      const result = await response.json() as { success?: boolean }
      if (!response.ok || !result.success) throw new Error('Web3Forms request failed')
      form.reset()
      setResumeRequestStatus('sent')
    } catch {
      setResumeRequestStatus('error')
    }
  }

  const setSelectedSkillIndex = (groupIndex: number, index: number) => {
    setSelectedSkillIndices((indices) => indices.map((selectedIndex, currentGroupIndex) => (
      currentGroupIndex === groupIndex ? index : selectedIndex
    )))
  }

  const selectSkill = (groupIndex: number, index: number, direction?: -1 | 1) => {
    const group = skillGroups[groupIndex] ?? skillGroups[0]
    const skillCount = group.skills.length
    const nextIndex = (index + skillCount) % skillCount
    const previousIndex = selectedSkillIndices[groupIndex] ?? 0
    const delta = nextIndex - previousIndex
    const shortestDelta = ((delta + skillCount / 2 + skillCount) % skillCount) - skillCount / 2
    const rotationStep = nextIndex === previousIndex ? 0 : direction ?? shortestDelta

    setSkillWheelRotations((rotations) => rotations.map((rotation, currentGroupIndex) => (
      currentGroupIndex === groupIndex ? rotation - rotationStep * 360 / skillCount : rotation
    )))
    setSelectedSkillIndex(groupIndex, nextIndex)
  }

  const startSkillWheelDrag = (event: ReactPointerEvent<HTMLDivElement>, groupIndex: number) => {
    if (!event.isPrimary || event.button !== 0) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const angle = Math.atan2(
      event.clientY - bounds.top - bounds.height / 2,
      event.clientX - bounds.left - bounds.width / 2,
    ) * 180 / Math.PI

    wheelDrag.current = {
      groupIndex,
      pointerId: event.pointerId,
      lastAngle: angle,
      lastTimestamp: event.timeStamp,
      accumulatedAngle: 0,
      angularVelocity: 0,
      rotation: skillWheelRotations[groupIndex] ?? 0,
      selectedIndex: selectedSkillIndices[groupIndex] ?? 0,
      hasDragged: false,
    }
    setDraggingSkillWheel(groupIndex)

    const captureTarget = event.target instanceof Element
      ? event.target.closest<HTMLElement>('.skills-orbit-option') ?? event.currentTarget
      : event.currentTarget
    captureTarget.setPointerCapture(event.pointerId)
  }

  const moveSkillWheelDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = wheelDrag.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const angle = Math.atan2(
      event.clientY - bounds.top - bounds.height / 2,
      event.clientX - bounds.left - bounds.width / 2,
    ) * 180 / Math.PI
    let angleDelta = angle - drag.lastAngle
    if (angleDelta > 180) angleDelta -= 360
    if (angleDelta < -180) angleDelta += 360
    const elapsed = Math.max(event.timeStamp - drag.lastTimestamp, 1)
    drag.angularVelocity = drag.angularVelocity * 0.65 + (angleDelta / elapsed) * 0.35
    drag.lastAngle = angle
    drag.lastTimestamp = event.timeStamp
    drag.accumulatedAngle += angleDelta
    drag.rotation += angleDelta
    if (Math.abs(drag.accumulatedAngle) >= 5) drag.hasDragged = true
    setSkillWheelRotations((rotations) => rotations.map((rotation, groupIndex) => (
      groupIndex === drag.groupIndex ? drag.rotation : rotation
    )))

    const skillCount = skillGroups[drag.groupIndex]?.skills.length ?? 0
    if (skillCount === 0) return

    const anglePerSkill = 360 / skillCount
    while (Math.abs(drag.accumulatedAngle) >= anglePerSkill / 2) {
      const angularDirection = Math.sign(drag.accumulatedAngle)
      const skillDirection = angularDirection > 0 ? -1 : 1
      drag.selectedIndex = (drag.selectedIndex + skillDirection + skillCount) % skillCount
      setSelectedSkillIndex(drag.groupIndex, drag.selectedIndex)
      drag.accumulatedAngle -= angularDirection * anglePerSkill
    }
  }

  const finishSkillWheelDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = wheelDrag.current
    if (!drag || drag.pointerId !== event.pointerId) return

    wheelDrag.current = null
    setDraggingSkillWheel(null)
    const skillCount = skillGroups[drag.groupIndex]?.skills.length ?? 0
    if (skillCount > 0) {
      const anglePerSkill = 360 / skillCount
      const momentum = drag.hasDragged
        ? Math.max(-anglePerSkill * 2, Math.min(anglePerSkill * 2, drag.angularVelocity * 140))
        : 0
      const projectedAngle = drag.accumulatedAngle + momentum
      const snappedSteps = Math.round(projectedAngle / anglePerSkill)
      const remainder = projectedAngle - snappedSteps * anglePerSkill
      const nextIndex = (drag.selectedIndex - snappedSteps + skillCount * 2) % skillCount
      setSkillWheelRotations((rotations) => rotations.map((rotation, groupIndex) => (
        groupIndex === drag.groupIndex ? drag.rotation + momentum - remainder : rotation
      )))
      setSelectedSkillIndex(drag.groupIndex, nextIndex)
    }

    if (drag.hasDragged) {
      suppressWheelClick.current = true
      window.setTimeout(() => {
        suppressWheelClick.current = false
      }, 0)
    }
  }

  const curtainProgress = progress * progress * (3 - 2 * progress)
  const revealVisibility = Math.min(curtainProgress * 1.35, 1)
  const projectCards = [
    {
      number: '01',
      style: 'featured',
      label: copy.featuredProjectLabel,
      title: copy.featuredProjectTitle,
      description: copy.featuredProjectDescription,
      details: copy.featuredProjectDetails,
      href: 'https://github.com/DE-R-V/in-your-eyes',
      cover: inYourEyesCover,
      photos: projectPhotos('inyoureyes'),
    },
    {
      number: '02',
      style: 'idea',
      label: copy.secondProjectLabel,
      title: copy.secondProjectTitle,
      description: copy.secondProjectDescription,
      details: copy.secondProjectDetails,
      href: 'https://github.com/finley-Sun/ClaimCam',
      cover: claimCamCover,
      photos: projectPhotos('claimcam'),
    },
    {
      number: '03',
      style: 'study',
      label: copy.thirdProjectLabel,
      title: copy.thirdProjectTitle,
      description: copy.thirdProjectDescription,
      details: copy.thirdProjectDetails,
      href: 'https://github.com/DE-R-V/BudgetBuddy',
    },
    {
      number: '04',
      style: 'study',
      label: copy.fourthProjectLabel,
      title: copy.fourthProjectTitle,
      description: copy.fourthProjectDescription,
      details: copy.fourthProjectDetails,
      href: 'https://github.com/DE-R-V/ui-centering',
    },
    {
      number: '05',
      style: 'practice',
      label: copy.fifthProjectLabel,
      title: copy.fifthProjectTitle,
      description: copy.fifthProjectDescription,
      details: copy.fifthProjectDetails,
      href: 'https://github.com/DE-R-V/LeetCode',
    },
  ] as { number: string; style: string; label: string; title: string; description: string; details?: string; href?: string; cover?: string; photos?: string[] }[]
  const projectPageSize = 2
  const projectPageCount = Math.ceil(projectCards.length / projectPageSize)
  const visibleProjectCards = projectCards.slice(
    projectPage * projectPageSize,
    (projectPage + 1) * projectPageSize,
  )
  const technicalSkillIndex = selectedSkillIndices[0] ?? 0
  const softSkillIndex = selectedSkillIndices[1] ?? 0
  const technicalSkill = skillGroups[0].skills[technicalSkillIndex] ?? copy.skillsItems[0]
  const softSkill = skillGroups[1].skills[softSkillIndex] ?? copy.skillsItems[4]
  const combinationKey = `${technicalSkillIndex}:${softSkillIndex}` as keyof typeof copy.skillCombinationDescriptions
  const combinationExample = copy.skillCombinationDescriptions[combinationKey]

  return (
    <main className="landing">
      <section className="reveal-track" aria-label={copy.pageTitle}>
        <div
          className="scene"
          style={{ pointerEvents: revealVisibility < 1 ? 'auto' : 'none' }}
        >
          <div
            className="reveal-haze reveal-haze--deep"
            style={{ opacity: 0.4 * (1 - curtainProgress) }}
            aria-hidden="true"
          />
          <div
            className="reveal-haze reveal-haze--surface"
            style={{ opacity: 0.24 * (1 - curtainProgress) }}
            aria-hidden="true"
          />
          <div
            className="curtain-panel curtain-panel--top"
            style={{ transform: `translate3d(0, ${-curtainProgress * 108}%, 0)` }}
          >
            {curtainProgress < 0.85 && (
              <LanguageSelector
                language={language}
                label={copy.languageLabel}
                onSelect={setLanguage}
              />
            )}
            <ProfileName className="mobile-name" />
          </div>
          <div
            className="curtain-panel curtain-panel--bottom"
            style={{ transform: `translate3d(0, ${curtainProgress * 108}%, 0)` }}
          >
            <ProfileSocials
              className="mobile-socials"
              linkClassName="mobile-social-link"
              profilesLabel={copy.profilesLabel}
              resumeLabel={copy.resumeLabel}
              onResumeClick={() => { setResumeRequestStatus('idle'); setResumeRequestOpen(true) }}
            />
            <div className="scroll-invitation">
              <ArrowDown size={20} strokeWidth={1.8} aria-hidden="true" />
              <span className="scroll-copy--desktop">{copy.scrollDesktop}</span>
              <span className="scroll-copy--mobile">{copy.scrollMobile}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`home-section${curtainProgress < 1 ? ' home-section--pinned' : ''}`}
        id="home"
        aria-hidden={revealVisibility === 0}
        inert={revealVisibility === 0}
        style={{
          opacity: revealVisibility,
          filter: `blur(${(1 - curtainProgress) * 8}px)`,
          pointerEvents: revealVisibility === 0 ? 'none' : 'auto',
        }}
      >
        <div className="home-shell">
          <header className="home-header">
            <ProfileName className="home-wordmark" linked />
            <div className="home-header-tools">
              <ProfileSocials
                className="home-socials"
                linkClassName="home-social-link"
                profilesLabel={copy.profilesLabel}
                resumeLabel={copy.resumeLabel}
                onResumeClick={() => { setResumeRequestStatus('idle'); setResumeRequestOpen(true) }}
                withTooltips
              />
              {curtainProgress >= 0.85 && (
                <LanguageSelector
                  language={language}
                  label={copy.languageLabel}
                  onSelect={setLanguage}
                />
              )}
            </div>
          </header>

          <section className="home-hero" id="profilo">
            <div className={`profile-pages${aboutPageOpen ? ' profile-pages--about' : ''}`}>
              <div
                className="profile-page profile-page--overview"
                aria-hidden={aboutPageOpen}
                inert={aboutPageOpen}
              >
                <div className="portrait-placeholder">
                  <img className="portrait-photo" src={portraitPhoto} alt={copy.portraitAlt} />
                </div>

                <div className="home-copy">
                  <p className="home-kicker">{copy.aboutKicker}</p>
                  <h2 ref={overviewPageHeading} tabIndex={-1}>
                    {copy.aboutRolePrefix}{' '}
                    <span className="home-role-word" key={aboutRoleIndex}>
                      {copy.aboutRoles[aboutRoleIndex]}
                    </span>
                  </h2>
                  <p className="home-description">{copy.aboutIntroduction}</p>
                  <button
                    className="home-link"
                    type="button"
                    onClick={() => setAboutPageOpen(true)}
                  >
                    <span>{copy.discoverAbout}</span>
                    <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <span className="home-nav-divider" aria-hidden="true" />
                  <nav className="home-nav" aria-label={copy.mainNavigation}>
                    <a className="home-link" href="#percorso">
                      <span>{copy.journeyNavigation}</span>
                      <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                    <a className="home-link" href="#progetti">
                      <span>{copy.projectsNavigation}</span>
                      <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                    <a className="home-link" href="#skills">
                      <span>{copy.skillsNavigation}</span>
                      <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                    <span className="home-nav-divider" aria-hidden="true" />
                    <a className="home-link" href="#contatti">
                      <span>{copy.contactNavigation}</span>
                      <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  </nav>
                </div>
              </div>

              <div
                className="profile-page profile-page--about"
                aria-hidden={!aboutPageOpen}
                inert={!aboutPageOpen}
              >
                <div className="portrait-placeholder portrait-placeholder--about">
                  <img className="portrait-photo" src={mushroomPhoto} alt={copy.aboutImageAlt} />
                </div>

                <div className="about-page-copy">
                  <p className="home-kicker">{copy.aboutPageKicker}</p>
                  <h2 ref={aboutPageHeading} tabIndex={-1}>{copy.aboutPageTitle}</h2>
                  {copy.aboutPageParagraphs.map((paragraph) => (
                    <p className="about-page-description" key={paragraph}>{paragraph}</p>
                  ))}
                  <button
                    className="home-link overview-return"
                    type="button"
                    onClick={() => setAboutPageOpen(false)}
                  >
                    <ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span>{copy.overviewAction}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="journey-section" id="percorso" aria-labelledby="journey-title">
        <div className="section-shell">
          <div className="section-heading journey-heading">
            <p className="section-kicker">{copy.journeyKicker}</p>
            <h2 id="journey-title">{copy.journeyTitle}</h2>
          </div>
          <div className="journey-rail" role="region" aria-label={copy.journeyTimelineLabel} tabIndex={0}>
            <ol className="journey-list">
              {copy.journeyItems.map((item) => {
                const isWork = item.kind === 'WORK' || item.kind === 'LAVORO'

                return (
                  <li
                    className={`journey-entry${isWork ? ' journey-entry--work' : ''}`}
                    key={`${item.date}-${item.title}`}
                  >
                    <span className="journey-marker" aria-hidden="true" />
                    <button
                      className="journey-card"
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls="journey-dialog"
                      aria-label={`${item.title}, ${item.date}`}
                      onClick={() => setSelectedJourneyItem(item)}
                    >
                      <span className="journey-meta">
                        <time className="journey-date">{item.date}</time>
                        <span className="journey-kind">{item.kind}</span>
                      </span>
                      <span className="journey-card-title" role="heading" aria-level={3}>
                        {item.title}
                      </span>
                      {item.organization && (
                        <span className="journey-organization">{item.organization}</span>
                      )}
                      <span className="journey-card-summary">{item.summary}</span>
                      <span className="journey-card-action" aria-hidden="true">
                        <ArrowRight size={16} strokeWidth={1.8} />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      <dialog
        className="journey-dialog"
        id="journey-dialog"
        ref={journeyDialog}
        aria-labelledby="journey-dialog-title"
        aria-describedby="journey-dialog-description"
        onCancel={() => setSelectedJourneyItem(null)}
        onClose={() => setSelectedJourneyItem(null)}
      >
        {selectedJourneyItem && (
          <>
            <div className="journey-dialog-header">
              <p className="journey-dialog-kicker">
                {selectedJourneyItem.kind}, {selectedJourneyItem.date}
              </p>
              <button
                className="journey-dialog-close"
                type="button"
                aria-label={copy.journeyCloseDetails}
                onClick={() => setSelectedJourneyItem(null)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <h2 id="journey-dialog-title">{selectedJourneyItem.title}</h2>
            {selectedJourneyItem.organization && (
              <p className="journey-dialog-organization">{selectedJourneyItem.organization}</p>
            )}
            {typeof selectedJourneyItem.description === 'string' ? (
              <p id="journey-dialog-description" className="journey-dialog-description">
                {selectedJourneyItem.description}
              </p>
            ) : (
              <ul id="journey-dialog-description" className="journey-dialog-list">
                {selectedJourneyItem.description.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </dialog>

      <dialog
        className="project-gallery-dialog"
        ref={projectGalleryDialog}
        aria-labelledby="project-gallery-title"
        onCancel={() => setProjectGallery(null)}
        onClose={() => setProjectGallery(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setProjectGallery(null)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') stepProjectGallery(-1)
          if (event.key === 'ArrowRight') stepProjectGallery(1)
        }}
      >
        {projectGallery && (
          <>
            <div className="project-gallery-header">
              <h2 id="project-gallery-title">{projectGallery.title}</h2>
              <span className="project-gallery-counter">
                {projectGallery.index + 1} / {projectGallery.photos.length}
              </span>
              <button
                className="resume-request-close"
                type="button"
                aria-label={copy.closeDialogLabel}
                onClick={() => setProjectGallery(null)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="project-gallery-stage">
              <button
                className="project-gallery-arrow project-gallery-arrow--previous"
                type="button"
                aria-label={copy.projectGalleryPrevious}
                onClick={() => stepProjectGallery(-1)}
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
              <img
                key={projectGallery.photos[projectGallery.index]}
                src={projectGallery.photos[projectGallery.index]}
                alt={`${projectGallery.title}, ${copy.projectGalleryPhoto.toLowerCase()} ${projectGallery.index + 1}`}
              />
              <button
                className="project-gallery-arrow project-gallery-arrow--next"
                type="button"
                aria-label={copy.projectGalleryNext}
                onClick={() => stepProjectGallery(1)}
              >
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="project-gallery-thumbs">
              {projectGallery.photos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  aria-label={`${copy.projectGalleryPhoto} ${index + 1}`}
                  aria-current={index === projectGallery.index}
                  onClick={() => setProjectGallery({ ...projectGallery, index })}
                >
                  <img src={photo} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </>
        )}
      </dialog>

      <dialog
        className="resume-request-dialog"
        ref={resumeRequestDialog}
        aria-labelledby="resume-request-title"
        onCancel={() => setResumeRequestOpen(false)}
        onClose={() => setResumeRequestOpen(false)}
      >
        <div className="resume-request-header">
          <div>
            <h2 id="resume-request-title">{copy.resumeRequestTitle}</h2>
            <p>{copy.resumeRequestDescription}</p>
          </div>
          <button
            className="resume-request-close"
            type="button"
            aria-label={copy.closeDialogLabel}
            onClick={() => setResumeRequestOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <form className="resume-request-form" onSubmit={handleResumeRequest}>
          <input className="resume-request-honeypot" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label>
            <span>{copy.firstNameLabel} <span className="resume-request-required" aria-hidden="true">*</span></span>
            <input autoComplete="given-name" name="firstName" required />
          </label>
          <label>
            <span>{copy.lastNameLabel}</span>
            <input autoComplete="family-name" name="lastName" />
          </label>
          <label>
            <span>{copy.companyLabel} <span className="resume-request-required" aria-hidden="true">*</span></span>
            <input autoComplete="organization" name="company" required />
          </label>
          <label>
            <span>{copy.countryLabel} <span className="resume-request-required" aria-hidden="true">*</span></span>
            <select
              name="country"
              required
              value={selectedCountry}
              onChange={(event) => setSelectedCountry(event.target.value)}
            >
              {countryOptions.map(({ code, name }) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </label>
          {regionOptions.length > 0 ? (
            <label>
              <span>{copy.regionLabel}</span>
              <select key={selectedCountry} name="region" defaultValue="">
                <option value="">{copy.selectPlaceholder}</option>
                {regionOptions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </label>
          ) : null}
          <label className={regionOptions.length > 0 ? undefined : 'resume-request-field--wide'}>
            <span>{copy.cityLabel}</span>
            <input autoComplete="address-level2" name="city" />
          </label>
          <label className="resume-request-field--wide">
            <span>{copy.positionLabel} <span className="resume-request-required" aria-hidden="true">*</span></span>
            <input name="position" required />
          </label>
          <label className="resume-request-field--wide">
            <span>{copy.recruiterEmailLabel} <span className="resume-request-required" aria-hidden="true">*</span></span>
            <input autoComplete="email" name="recruiterEmail" type="email" required />
          </label>
          {resumeRequestStatus === 'sent' || resumeRequestStatus === 'error' ? (
            <p
              className={`resume-request-status resume-request-status--${resumeRequestStatus} resume-request-field--wide`}
              role="status"
            >
              {resumeRequestStatus === 'sent' ? copy.requestSentMessage : copy.requestErrorMessage}
            </p>
          ) : null}
          <div className="resume-request-actions resume-request-field--wide">
            <button
              className="resume-request-cancel"
              type="button"
              onClick={() => setResumeRequestOpen(false)}
            >
              {copy.cancelAction}
            </button>
            <button className="resume-request-submit" type="submit" disabled={resumeRequestStatus === 'sending'}>
              {resumeRequestStatus === 'sending' ? copy.sendingAction : copy.openEmailAction}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </form>
      </dialog>

      <section className="projects-section" id="progetti">
        <div className="section-shell">
          <div className="section-heading">
            <p className="section-kicker">{copy.projectsKicker}</p>
            <h2>{copy.projectsTitle}</h2>
          </div>
          <div
            className={`projects-mosaic${visibleProjectCards.length === 1 ? ' projects-mosaic--single' : ''}`}
            id="projects-mosaic"
          >
            {visibleProjectCards.map((project, index) => (
              <article
                className={`project-card project-card--${project.style} project-card--showcase-${index === 0 ? 'primary' : 'secondary'}`}
                key={project.number}
              >
                {project.cover ? (
                  <div className={`project-art project-art--${project.style} project-art--cover`}>
                    <img src={project.cover} alt="" loading="lazy" decoding="async" />
                    {project.photos && project.photos.length > 0 && (
                      <button
                        className="project-gallery-trigger"
                        type="button"
                        onClick={() => setProjectGallery({ title: project.title, photos: project.photos ?? [], index: 0 })}
                      >
                        <Images size={17} strokeWidth={1.8} aria-hidden="true" />
                        <span>{copy.projectGalleryOpen}</span>
                        <span className="project-gallery-count">{project.photos.length}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className={`project-art project-art--${project.style}`} aria-hidden="true">
                    <span className="project-art-number">{project.number}</span>
                    <div className="project-art-frame">
                      <span className="project-art-rule" />
                      <div className="project-art-lines">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                )}
                <div className="project-card-copy">
                  <div className="project-card-meta">
                    <p className="project-card-label">{project.label}</p>
                    <span>{project.number}<span aria-hidden="true"> / </span>{String(projectCards.length).padStart(2, '0')}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-card-description">{project.description}</p>
                  {project.details && <p className="project-card-details">{project.details}</p>}
                  {project.href && (
                    <a
                      className="project-card-link"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.projectRepoLinkLabel} ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          {projectPageCount > 1 && (
            <nav className="projects-pagination" aria-label={copy.projectsTitle}>
              <button
                className="projects-pagination-button"
                type="button"
                aria-label={copy.previousProjects}
                aria-controls="projects-mosaic"
                disabled={projectPage === 0}
                onClick={() => setProjectPage((page) => Math.max(0, page - 1))}
              >
                <ArrowLeft size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>{copy.previousProjects}</span>
              </button>
              <div className="projects-page-list" role="group" aria-label={copy.projectPageLabel}>
                {Array.from({ length: projectPageCount }, (_, pageIndex) => (
                  <button
                    className="projects-page-button"
                    key={pageIndex}
                    type="button"
                    aria-label={`${copy.projectPageLabel} ${pageIndex + 1}`}
                    aria-current={projectPage === pageIndex ? 'page' : undefined}
                    onClick={() => setProjectPage(pageIndex)}
                  >
                    <span>{String(pageIndex + 1).padStart(2, '0')}</span>
                    <span className="projects-page-progress" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <button
                className="projects-pagination-button"
                type="button"
                aria-label={copy.nextProjects}
                aria-controls="projects-mosaic"
                disabled={projectPage === projectPageCount - 1}
                onClick={() => setProjectPage((page) => Math.min(projectPageCount - 1, page + 1))}
              >
                <span>{copy.nextProjects}</span>
                <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </nav>
          )}
          <aside className="projects-work-note" aria-label={copy.workProjectsNoteLabel}>
            <p className="projects-work-note-copy">{copy.workProjectsNote}</p>
            <a className="projects-work-note-link" href="#contatti">
              {copy.workProjectsNoteAction}
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>

      <section className="skills-section" id="skills" aria-labelledby="skills-title">
        <div className="section-shell">
          <div className="section-heading">
            <p className="section-kicker">{copy.skillsKicker}</p>
            <h2 id="skills-title">{copy.skillsTitle}</h2>
          </div>
          <div className="skills-view-mobile-switch" role="group" aria-label={copy.skillsViewsLabel}>
            <button
              className="skills-view-mobile-option skills-view-mobile-option--inventory"
              type="button"
              aria-controls="skills-inventory-panel"
              aria-pressed={skillsView === 'inventory'}
              onClick={() => setSkillsView('inventory')}
            >
              <List size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>{copy.skillsListView}</span>
            </button>
            <button
              className="skills-view-mobile-option skills-view-mobile-option--fusion"
              type="button"
              aria-controls="skills-fusion-panel"
              aria-pressed={skillsView === 'fusion'}
              onClick={() => setSkillsView('fusion')}
            >
              <MessageCircle size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>{copy.skillsFusionView}</span>
            </button>
          </div>
          <div className="skills-view-container" data-active-view={skillsView}>
            <div className="skills-view-pane skills-view-pane--inventory">
                <div
                  className="skills-view-panel skills-inventory"
                  id="skills-inventory-panel"
                  aria-hidden={skillsView !== 'inventory'}
                  inert={skillsView !== 'inventory'}
                >
            <section className="skills-inventory-group skills-inventory-group--technical" aria-labelledby="skills-technical-title">
              <h3 id="skills-technical-title">{skillGroups[0].title}</h3>
              <div className="skills-inventory-domains">
                {skillGroups[0].skills.map((skill) => (
                  <div className="skills-inventory-domain" key={skill.title}>
                    <h4>{skill.title}</h4>
                    <ul className="skill-tags">
                      {skill.description.split(',').map((item) => {
                        const label = item.trim().replace(/\.$/, '')
                        return <li className="skill-tag" key={label}>{label}</li>
                      })}
                    </ul>
                  </div>
                ))}
                <div className="skills-inventory-domain skills-inventory-domain--general">
                  <h4>{copy.skillsGeneralTitle}</h4>
                  <ul className="skill-tags">
                    {copy.skillsGeneral.map((skill) => <li className="skill-tag" key={skill}>{skill}</li>)}
                  </ul>
                </div>
              </div>
            </section>
            <section className="skills-inventory-group skills-inventory-group--soft" aria-labelledby="skills-soft-title">
              <h3 id="skills-soft-title">{skillGroups[1].title}</h3>
              <ul className="skills-simple-list">
                {skillGroups[1].skills.map((skill) => <li key={skill.title}>{skill.title}</li>)}
              </ul>
            </section>
            <section className="skills-inventory-group skills-inventory-group--languages" aria-labelledby="skills-languages-title">
              <h3 id="skills-languages-title">{copy.skillsLanguagesTitle}</h3>
              <ul className="skills-simple-list">
                {copy.skillsLanguages.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
                </div>
              <button
                className="skills-view-trigger skills-view-trigger--inventory"
                type="button"
                aria-controls="skills-inventory-panel"
                aria-label={copy.skillsListView}
                aria-hidden={skillsView === 'inventory'}
                tabIndex={skillsView === 'inventory' ? -1 : 0}
                onClick={() => setSkillsView('inventory')}
              >
                <List size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>{copy.skillsListView}</span>
                <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
            <div className="skills-view-pane skills-view-pane--fusion">
                <div
                  className="skills-view-panel skills-fusions"
                  id="skills-fusion-panel"
                  aria-labelledby="skills-fusion-title"
                  aria-hidden={skillsView !== 'fusion'}
                  inert={skillsView !== 'fusion'}
                >
            <h3 className="skills-fusions-title" id="skills-fusion-title">{copy.skillsFusionTitle}</h3>
                <p className="skills-fusions-description">{copy.skillsFusionDescription}</p>
          <div className="skills-explorer">
            <div className="skills-gear-display">
            <div className="skills-gears skills-gears--desktop">
              {skillGroups.map((group, groupIndex) => {
                const selectedIndex = selectedSkillIndices[groupIndex] ?? 0
                const rotation = skillWheelRotations[groupIndex] ?? 0
                return (
                  <div
                    className={`skills-wheel-column ${groupIndex === 0 ? 'skills-wheel-column--technical' : 'skills-wheel-column--soft'}`}
                    key={group.title}
                  >
                    <span className="skills-gear-title">{group.title}</span>
                    <div className="skills-wheel-controls skills-gear-selector">
                      <button
                        className="skills-wheel-arrow"
                        type="button"
                        aria-label={`${group.title}: ${copy.previousSkill}`}
                        onClick={() => selectSkill(groupIndex, selectedIndex - 1, -1)}
                      >
                        <ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
                      </button>
                      <span className="skills-wheel-selected-skill" aria-live="polite">{group.skills[selectedIndex]?.title}</span>
                      <button
                        className="skills-wheel-arrow"
                        type="button"
                        aria-label={`${group.title}: ${copy.nextSkill}`}
                        onClick={() => selectSkill(groupIndex, selectedIndex + 1, 1)}
                      >
                        <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                      </button>
                    </div>
                    <div
                      className={`skills-orbit${draggingSkillWheel === groupIndex ? ' skills-wheel--dragging' : ''}`}
                      role="group"
                      aria-label={`${group.title}: ${copy.skillsCarouselLabel}`}
                      onPointerDown={(event) => startSkillWheelDrag(event, groupIndex)}
                      onPointerMove={moveSkillWheelDrag}
                      onPointerUp={finishSkillWheelDrag}
                      onPointerCancel={finishSkillWheelDrag}
                      onClickCapture={(event) => {
                        if (!suppressWheelClick.current) return
                        event.preventDefault()
                        event.stopPropagation()
                        suppressWheelClick.current = false
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowLeft') {
                          event.preventDefault()
                          selectSkill(groupIndex, selectedIndex - 1, -1)
                        }
                        if (event.key === 'ArrowRight') {
                          event.preventDefault()
                          selectSkill(groupIndex, selectedIndex + 1, 1)
                        }
                      }}
                    >
                      <div className="skills-orbit-ring" aria-hidden="true" />
                      <div className="skills-orbit-nodes" style={{ transform: `rotate(${rotation}deg)` }}>
                        {group.skills.map((skill, index) => {
                          const angle = (index / group.skills.length) * Math.PI * 2 - Math.PI / 2
                          const SkillIcon = skillAreaIcons[group.iconOffset + index]
                          return (
                            <button
                              className="skills-orbit-option"
                              key={skill.title}
                              type="button"
                              title={skill.title}
                              aria-label={skill.title}
                              aria-pressed={selectedIndex === index}
                              aria-controls="skill-detail-panel"
                              style={{
                                left: `${50 + Math.cos(angle) * 37}%`,
                                top: `${50 + Math.sin(angle) * 37}%`,
                              }}
                              onClick={() => selectSkill(groupIndex, index)}
                            >
                              <span className="skills-orbit-icon" style={{ transform: `rotate(${-rotation}deg)` }}>
                                <SkillIcon size={21} strokeWidth={1.8} aria-hidden="true" />
                              </span>
                            </button>
                          )
                        })}
                      </div>
                      <div className="skills-orbit-center" aria-hidden="true">
                        <span>{group.title}</span>
                        <h3>{group.skills[selectedIndex]?.title}</h3>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="skills-mobile-skill-selectors">
                {skillGroups.map((group, groupIndex) => {
                  const selectedIndex = selectedSkillIndices[groupIndex] ?? 0
                  return (
                    <label
                      className={`skills-mobile-skill-select ${groupIndex === 0 ? 'skills-mobile-skill-select--technical skills-wheel-column--technical' : 'skills-mobile-skill-select--soft skills-wheel-column--soft'}`}
                      key={group.title}
                    >
                      <span>{group.title}</span>
                      <select
                        value={selectedIndex}
                        aria-controls="skill-detail-panel"
                        onChange={(event) => selectSkill(groupIndex, Number(event.target.value))}
                      >
                        {group.skills.map((skill, index) => {
                          return (
                            <option key={skill.title} value={index}>{skill.title}</option>
                          )
                        })}
                      </select>
                    </label>
                  )
                })}
            </div>
            </div>
            <article className="skill-combination" id="skill-detail-panel" aria-live="polite">
              <div className="skill-combination-copy">
                <h3 className="skill-combination-pair">
                  <span className="skill-combination-pair--technical">{technicalSkill.title}</span>
                  <span className="skill-combination-plus" aria-hidden="true">+</span>
                  <span className="skill-combination-pair--soft">{softSkill.title}</span>
                </h3>
                <ul className="skill-tags skill-combination-tags">
                  {technicalSkill.description.split(',').map((item) => {
                    const label = item.trim().replace(/\.$/, '')
                    return <li className="skill-tag" key={label}>{label}</li>
                  })}
                </ul>
                <ul className="skill-tags skill-combination-tags skill-combination-tags--soft">
                  {softSkill.description.split(',').map((item) => {
                    const label = item.trim().replace(/\.$/, '')
                    return <li className="skill-tag" key={label}>{label}</li>
                  })}
                </ul>
                {combinationExample && (
                  <p className="skill-combination-source">
                    <Briefcase size={14} strokeWidth={1.8} aria-hidden="true" />
                    <span>{copy.skillsCombinationSource}</span>
                    <strong>{combinationExample.label}</strong>
                  </p>
                )}
                <p>{combinationExample?.description ?? copy.skillsCombinationEmpty}</p>
              </div>
            </article>
            </div>
            </div>
              <button
                className="skills-view-trigger skills-view-trigger--fusion"
                type="button"
                aria-controls="skills-fusion-panel"
                aria-label={copy.skillsFusionView}
                aria-hidden={skillsView === 'fusion'}
                tabIndex={skillsView === 'fusion' ? -1 : 0}
                onClick={() => setSkillsView('fusion')}
              >
                <MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>{copy.skillsFusionView}</span>
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contatti" aria-labelledby="contact-title">
        <div className="section-shell">
          <div className="section-heading section-heading--dark">
            <p className="section-kicker">{copy.contactKicker}</p>
            <h2 id="contact-title">{copy.contactTitle}</h2>
          </div>
          <div className="contact-shell">
            <p className="contact-note">{copy.contactDescription}</p>
            <div className="contact-details">
              <a
                className="contact-email"
                href={`mailto:${resumeRequestRecipient}`}
                aria-label={`${copy.contactEmailLabel}: ${resumeRequestRecipient}`}
              >
                <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                <span>{resumeRequestRecipient}</span>
                <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
              </a>
              <ProfileSocials
                className="contact-socials"
                linkClassName="contact-social-link"
                profilesLabel={copy.profilesLabel}
                resumeLabel={copy.resumeLabel}
                onResumeClick={() => { setResumeRequestStatus('idle'); setResumeRequestOpen(true) }}
                withLabels
              />
            </div>
            <a className="contact-return" href="#home">
              {copy.backToTop}
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <p className="contact-attribution">{copy.siteCredit}</p>
            <div className="contact-language-selector">
              <LanguageSelector language={language} label={copy.languageLabel} onSelect={setLanguage} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
