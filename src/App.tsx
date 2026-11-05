import { useEffect, useRef, useState, type FormEvent } from 'react'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowDown, ArrowLeft, ArrowRight, ImagePlus, X } from 'lucide-react'
import './App.css'

const profile = {
  name: 'Edoardo Rolfo',
  linkedinUrl: 'https://www.linkedin.com/in/tuo-profilo/',
  githubUrl: 'https://github.com/tuo-username',
}

const resumeRequestRecipient = 'edoardo.rolfo.er@gmail.com'

const socialProfiles = [
  { name: 'LinkedIn', url: profile.linkedinUrl, icon: faLinkedin },
  { name: 'GitHub', url: profile.githubUrl, icon: faGithub },
  { name: 'resume', url: '/curriculum.pdf', icon: faFileLines },
]

const translations = {
  it: {
    pageTitle: 'Portfolio personale',
    pageDescription: 'Portfolio personale con una landing page a sipario.',
    profilesLabel: 'Profili personali',
    resumeLabel: 'Curriculum',
    resumeRequestTitle: 'Richiedi il curriculum',
    resumeRequestDescription: 'Compila i dati e prepara una richiesta da inviare via email.',
    firstNameLabel: 'Nome',
    lastNameLabel: 'Cognome',
    companyLabel: 'Azienda',
    companyLocationLabel: 'Località dell’azienda',
    positionLabel: 'Posizione offerta o d’interesse',
    recruiterEmailLabel: 'Email del recruiter a cui inviare il CV',
    emailSubject: 'Richiesta curriculum',
    openEmailAction: 'Apri email precompilata',
    cancelAction: 'Annulla',
    closeDialogLabel: 'Chiudi modulo',
    languageLabel: 'Seleziona lingua / Select language',
    scrollDesktop: 'Scorri per esplorare il sito',
    scrollMobile: 'Scorri per visitare il sito',
    mainNavigation: 'Navigazione principale',
    journeyNavigation: 'Percorso',
    projectsNavigation: 'Progetti',
    skillsNavigation: 'Competenze',
    contactNavigation: 'Contatti',
    portraitAlt: 'Spazio per una foto personale',
    portraitCaption: 'La tua foto',
    portraitIndex: 'RITRATTO / 01',
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
    aboutImageAlt: 'Spazio per una seconda immagine personale',
    aboutImageCaption: 'Seconda immagine da scegliere',
    aboutImageIndex: 'RITRATTO / 02',
    overviewAction: 'Torna alla panoramica',
    journeyKicker: '01 / FORMAZIONE E LAVORO',
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
    projectsKicker: '02 / SELEZIONE',
    projectsTitle: 'Progetti personali',
    featuredProjectLabel: 'Vincitore XRCC 2025',
    featuredProjectTitle: 'InYourEyes',
    featuredProjectDescription: 'Ho guidato sviluppo e team end-to-end di un’app interattiva per simulare disabilità visive: dalla strategia di prodotto e roadmap al design delle interazioni e al prototipo pronto all’uso.',
    secondProjectLabel: 'Finalista XRCC 2026',
    secondProjectTitle: 'ClaimCam',
    secondProjectDescription: 'App XR per workflow assicurativi con ricostruzione 3D della scena tramite Gaussian Splatting, selezionata per XR Creator Con 2026.',
    skillsKicker: '03 / COMPETENZE',
    skillsTitle: 'Le mie competenze',
    skillsItems: [
      { title: 'Cloud e infrastruttura', description: 'Terraform, Helm, AWS, Kubernetes.' },
      { title: 'Sviluppo iOS', description: 'Swift, SwiftUI, UIKit.' },
      { title: 'XR, VR & Computer Vision', description: 'Unity, C#, XR Development.' },
      { title: 'Delivery', description: 'Agile, DevOps, Git, GitLab CI/CD.' },
      { title: 'Collaborazione', description: 'Adattabilità, team player, feedback-driven, people-oriented.' },
      { title: 'Lingue', description: 'Italiano madrelingua, inglese C1, svedese A1.' },
    ],
    contactKicker: '04 / CONTATTI',
    contactTitle: 'Contatti',
    contactDescription: 'Cittadino UE, pronto a trasferirmi in Svezia senza necessità di sponsorship. Per opportunità e collaborazioni, scrivimi:',
    contactEmailLabel: 'Scrivimi via email',
    backToTop: 'Torna all’inizio',
  },
  en: {
    pageTitle: 'Personal portfolio',
    pageDescription: 'Personal portfolio with a curtain-style landing page.',
    profilesLabel: 'Social profiles',
    resumeLabel: 'Resume',
    resumeRequestTitle: 'Request the CV',
    resumeRequestDescription: 'Fill in the details to prepare an email request.',
    firstNameLabel: 'First name',
    lastNameLabel: 'Last name',
    companyLabel: 'Company',
    companyLocationLabel: 'Company location',
    positionLabel: 'Position offered or of interest',
    recruiterEmailLabel: 'Recruiter email to send the CV to',
    emailSubject: 'CV request',
    openEmailAction: 'Open prefilled email',
    cancelAction: 'Cancel',
    closeDialogLabel: 'Close form',
    languageLabel: 'Select language / Seleziona lingua',
    scrollDesktop: 'Scroll to explore the website',
    scrollMobile: 'Scroll to visit the website',
    mainNavigation: 'Main navigation',
    journeyNavigation: 'Journey',
    projectsNavigation: 'Projects',
    skillsNavigation: 'Skills',
    contactNavigation: 'Contact',
    portraitAlt: 'Space for a personal portrait',
    portraitCaption: 'Your photo',
    portraitIndex: 'PORTRAIT / 01',
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
    aboutImageAlt: 'Space for a second personal image',
    aboutImageCaption: 'Second image to be chosen',
    aboutImageIndex: 'PORTRAIT / 02',
    overviewAction: 'Back to overview',
    journeyKicker: '01 / EDUCATION & WORK',
    journeyTitle: 'My journey',
    journeyTimelineLabel: 'Education and work timeline',
    journeyCloseDetails: 'Close details',
    journeyItems: [
      {
        kind: 'WORK',
        date: 'May 2024 — Present',
        title: 'Software Developer',
        organization: 'Reply SPA, Turin',
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
    projectsKicker: '02 / SELECTED WORK',
    projectsTitle: 'Personal Projects',
    featuredProjectLabel: 'XRCC 2025 Award Winner',
    featuredProjectTitle: 'InYourEyes',
    featuredProjectDescription: 'Led the team and end-to-end development of an interactive visual impairment simulation app, from product strategy and feature roadmap to interaction design and a ready-to-use prototype.',
    secondProjectLabel: 'XRCC 2026 Finalist',
    secondProjectTitle: 'ClaimCam',
    secondProjectDescription: 'An XR insurance workflow app using Gaussian Splatting for 3D scene reconstruction, selected for showcase at XR Creator Con 2026.',
    skillsKicker: '03 / SKILLS',
    skillsTitle: 'Skills',
    skillsItems: [
      { title: 'Cloud & infrastructure', description: 'Terraform, Helm, AWS, Kubernetes.' },
      { title: 'iOS development', description: 'Swift, SwiftUI, UIKit.' },
      { title: 'XR, VR & Computer Vision', description: 'Unity, C#, XR development.' },
      { title: 'Delivery', description: 'Agile, DevOps, Git, GitLab CI/CD.' },
      { title: 'Collaboration', description: 'Adaptability, team player, feedback-driven, people-oriented.' },
      { title: 'Languages', description: 'Native Italian, English C1, Swedish A1.' },
    ],
    contactKicker: '04 / CONTACT',
    contactTitle: 'Contact',
    contactDescription: 'EU citizen, ready to relocate to Sweden with no visa sponsorship required. For opportunities and collaborations, get in touch:',
    contactEmailLabel: 'Email me',
    backToTop: 'Back to top',
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
  const [language, setLanguage] = useState<Language>(() => (
    window.localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'it'
  ))
  const [resumeRequestOpen, setResumeRequestOpen] = useState(false)
  const [aboutPageOpen, setAboutPageOpen] = useState(false)
  const [aboutRoleIndex, setAboutRoleIndex] = useState(0)
  const [selectedJourneyItem, setSelectedJourneyItem] = useState<JourneyItem | null>(null)
  const resumeRequestDialog = useRef<HTMLDialogElement>(null)
  const journeyDialog = useRef<HTMLDialogElement>(null)
  const overviewPageHeading = useRef<HTMLHeadingElement>(null)
  const aboutPageHeading = useRef<HTMLHeadingElement>(null)
  const previousAboutPageOpen = useRef(false)
  const copy = translations[language]

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
    const dialog = journeyDialog.current
    if (!dialog) return

    if (selectedJourneyItem && !dialog.open) dialog.showModal()
    if (!selectedJourneyItem && dialog.open) dialog.close()
  }, [selectedJourneyItem])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setAboutRoleIndex((index) => (index + 1) % copy.aboutRoles.length)
    }, 2400)

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

  const handleResumeRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = {
      firstName: String(formData.get('firstName')),
      lastName: String(formData.get('lastName')),
      company: String(formData.get('company')),
      location: String(formData.get('location')),
      position: String(formData.get('position')),
      recruiterEmail: String(formData.get('recruiterEmail')),
    }
    const subject = `${copy.emailSubject} - ${values.company}`
    const body = [
      `${copy.firstNameLabel}: ${values.firstName}`,
      `${copy.lastNameLabel}: ${values.lastName}`,
      `${copy.companyLabel}: ${values.company}`,
      `${copy.companyLocationLabel}: ${values.location}`,
      `${copy.positionLabel}: ${values.position}`,
      `${copy.recruiterEmailLabel}: ${values.recruiterEmail}`,
    ].join('\n')

    window.location.href = `mailto:${resumeRequestRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setResumeRequestOpen(false)
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
    },
    {
      number: '02',
      style: 'idea',
      label: copy.secondProjectLabel,
      title: copy.secondProjectTitle,
      description: copy.secondProjectDescription,
    },
  ]

  return (
    <main className="landing">
      <LanguageSelector
        language={language}
        label={copy.languageLabel}
        onSelect={setLanguage}
      />
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
              onResumeClick={() => setResumeRequestOpen(true)}
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
            <ProfileSocials
              className="home-socials"
              linkClassName="home-social-link"
              profilesLabel={copy.profilesLabel}
              resumeLabel={copy.resumeLabel}
              onResumeClick={() => setResumeRequestOpen(true)}
              withTooltips
            />
          </header>

          <section className="home-hero" id="profilo">
            <div className={`profile-pages${aboutPageOpen ? ' profile-pages--about' : ''}`}>
              <div
                className="profile-page profile-page--overview"
                aria-hidden={aboutPageOpen}
                inert={aboutPageOpen}
              >
                <div className="portrait-placeholder" role="img" aria-label={copy.portraitAlt}>
                  <ImagePlus size={32} strokeWidth={1.5} aria-hidden="true" />
                  <span className="portrait-caption">{copy.portraitCaption}</span>
                  <span className="portrait-index">{copy.portraitIndex}</span>
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
                <div
                  className="portrait-placeholder portrait-placeholder--about"
                  role="img"
                  aria-label={copy.aboutImageAlt}
                >
                  <ImagePlus size={32} strokeWidth={1.5} aria-hidden="true" />
                  <span className="portrait-caption">{copy.aboutImageCaption}</span>
                  <span className="portrait-index">{copy.aboutImageIndex}</span>
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
          <label>
            <span>{copy.firstNameLabel}</span>
            <input autoComplete="given-name" name="firstName" required />
          </label>
          <label>
            <span>{copy.lastNameLabel}</span>
            <input autoComplete="family-name" name="lastName" required />
          </label>
          <label>
            <span>{copy.companyLabel}</span>
            <input autoComplete="organization" name="company" required />
          </label>
          <label>
            <span>{copy.companyLocationLabel}</span>
            <input name="location" required />
          </label>
          <label className="resume-request-field--wide">
            <span>{copy.positionLabel}</span>
            <input name="position" required />
          </label>
          <label className="resume-request-field--wide">
            <span>{copy.recruiterEmailLabel}</span>
            <input autoComplete="email" name="recruiterEmail" type="email" required />
          </label>
          <div className="resume-request-actions resume-request-field--wide">
            <button
              className="resume-request-cancel"
              type="button"
              onClick={() => setResumeRequestOpen(false)}
            >
              {copy.cancelAction}
            </button>
            <button className="resume-request-submit" type="submit">
              {copy.openEmailAction}
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
          <div className="projects-mosaic">
            {projectCards.map((project) => (
              <article
                className={`project-card project-card--${project.style}`}
                key={project.number}
              >
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
                <div className="project-card-copy">
                  <p className="project-card-label">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p className="project-card-description">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section" id="skills" aria-labelledby="skills-title">
        <div className="section-shell">
          <div className="section-heading">
            <p className="section-kicker">{copy.skillsKicker}</p>
            <h2 id="skills-title">{copy.skillsTitle}</h2>
          </div>
          <div className="skills-list">
            {copy.skillsItems.map((skill, index) => (
              <article className="skill-item" key={skill.title}>
                <span className="skill-item-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </div>
              </article>
            ))}
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
                onResumeClick={() => setResumeRequestOpen(true)}
                withLabels
              />
            </div>
            <a className="contact-return" href="#home">
              {copy.backToTop}
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
