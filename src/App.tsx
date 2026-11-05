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
        setProgress(Math.min(window.scrollY / openingDistance, 1))
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

  return (
    <main className="landing">
      <section className="reveal-track" aria-label="Portfolio">
        <div className="scene">
          <h1 className="mobile-name">{profile.name}</h1>
          <div className="scroll-invitation" style={{ opacity: 1 - progress }}>
            <ArrowDown size={20} strokeWidth={1.8} aria-hidden="true" />
            <span className="scroll-copy--desktop">Scroll to lift the visor</span>
            <span className="scroll-copy--mobile">Scroll to visit the website</span>
          </div>

          <div
            className="visor-panel visor-panel--top"
            style={{ transform: `translate3d(0, ${-progress * 104}%, 0)` }}
            aria-hidden="true"
          >
            <span className="visor-arc visor-arc--left" />
            <span className="visor-arc visor-arc--right" />
            <span className="visor-lens visor-lens--left" style={{ opacity: 1 - progress }}>
              <span
                className="visor-reflection-shift"
                style={{ transform: `translate3d(${progress * 60}px, 0, 0)` }}
              >
                <span className="visor-reflection" />
              </span>
            </span>
            <span className="visor-lens visor-lens--right" style={{ opacity: 1 - progress }}>
              <span
                className="visor-reflection-shift"
                style={{ transform: `translate3d(${progress * 60}px, 0, 0)` }}
              >
                <span className="visor-reflection" />
              </span>
            </span>
            <span className="nose-notch" />
          </div>
          <div
            className="visor-panel visor-panel--bottom"
            style={{ transform: `translate3d(0, ${progress * 104}%, 0)` }}
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="home-section" id="home">
        <div className="home-shell">
          <header className="home-header">
            <h1 className="home-wordmark">
              <a href="#home">{profile.name}</a>
            </h1>
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
              <nav className="home-socials" aria-label="Profili personali">
                <a
                  className="home-social-link"
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
                  <span className="home-social-tooltip" aria-hidden="true">LinkedIn</span>
                </a>
                <a
                  className="home-social-link"
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
                  <span className="home-social-tooltip" aria-hidden="true">GitHub</span>
                </a>
                <a
                  className="home-social-link"
                  href="/curriculum.pdf"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Curriculum"
                  title="Curriculum"
                >
                  <FontAwesomeIcon icon={faFileLines} aria-hidden="true" />
                  <span className="home-social-tooltip" aria-hidden="true">Curriculum</span>
                </a>
              </nav>
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
