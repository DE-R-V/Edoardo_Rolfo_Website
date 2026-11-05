import { useEffect, useState } from 'react'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowDown, ArrowRight, ImagePlus } from 'lucide-react'
import './App.css'

const profile = {
  name: 'Nome Cognome',
  linkedinUrl: 'https://www.linkedin.com/in/tuo-profilo/',
  githubUrl: 'https://github.com/tuo-username',
}

const socialProfiles = [
  { name: 'LinkedIn', url: profile.linkedinUrl, icon: faLinkedin },
  { name: 'GitHub', url: profile.githubUrl, icon: faGithub },
  { name: 'Curriculum', url: '/curriculum.pdf', icon: faFileLines },
]

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
  withTooltips = false,
}: {
  className: string
  linkClassName: string
  withTooltips?: boolean
}) {
  return (
    <nav className={className} aria-label="Profili personali">
      {socialProfiles.map(({ name, url, icon }) => (
        <a
          key={name}
          className={linkClassName}
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label={name}
          title={name}
        >
          <FontAwesomeIcon icon={icon} aria-hidden="true" />
          {withTooltips && (
            <span className="home-social-tooltip" aria-hidden="true">{name}</span>
          )}
        </a>
      ))}
    </nav>
  )
}

function App() {
  const [progress, setProgress] = useState(0)

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

  const curtainProgress = progress * progress * (3 - 2 * progress)
  const revealVisibility = Math.min(curtainProgress * 1.35, 1)

  return (
    <main className="landing">
      <section className="reveal-track" aria-label="Portfolio">
        <div className="scene">
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
            />
            <div className="scroll-invitation">
              <ArrowDown size={20} strokeWidth={1.8} aria-hidden="true" />
              <span className="scroll-copy--desktop">Scroll to explore the website</span>
              <span className="scroll-copy--mobile">Scroll to visit the website</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`home-section${curtainProgress < 1 ? ' home-section--pinned' : ''}`}
        id="home"
        style={{
          opacity: revealVisibility,
          filter: `blur(${(1 - curtainProgress) * 8}px)`,
        }}
      >
        <div className="home-shell">
          <header className="home-header">
            <div className="home-identity">
              <ProfileName className="home-wordmark" linked />
              <ProfileSocials
                className="home-socials"
                linkClassName="home-social-link"
                withTooltips
              />
            </div>
            <nav className="home-nav" aria-label="Navigazione principale">
              <a href="#profilo">Profilo</a>
              <a href="#progetti">Progetti</a>
              <a href="#contatti">Contatti</a>
            </nav>
          </header>

          <section className="home-hero" id="profilo">
            <div className="portrait-placeholder" role="img" aria-label="Spazio per una foto personale">
              <ImagePlus size={32} strokeWidth={1.5} aria-hidden="true" />
              <span className="portrait-caption">La tua foto</span>
              <span className="portrait-index">RITRATTO / 01</span>
            </div>

            <div className="home-copy">
              <p className="home-kicker">CHI SONO</p>
              <h2>Una breve presentazione.</h2>
              <p className="home-description">
                Racconta qui il tuo percorso, di cosa ti occupi e cosa ti appassiona.
              </p>
              <a className="home-link" href="#progetti">
                <span>Scopri i progetti</span>
                <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </section>

      <section className="projects-section" id="progetti">
        <div className="section-shell">
          <div className="section-heading">
            <p className="section-kicker">01 / SELEZIONE</p>
            <h2>Progetti</h2>
          </div>
          <div className="project-note">
            <span className="project-index">01</span>
            <p>Una selezione dei lavori e delle idee che raccontano il tuo percorso.</p>
            <ArrowRight size={20} strokeWidth={1.6} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="contact-section" id="contatti">
        <div className="section-shell contact-shell">
          <div>
            <p className="section-kicker">02 / CONTATTI</p>
            <h2>Contatti</h2>
          </div>
          <p className="contact-note">
            Email e altri riferimenti potranno trovare spazio qui.
          </p>
          <a className="contact-return" href="#home">
            Torna all’inizio
            <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
