import { useEffect, useState } from 'react'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
          <header className="identity">
            <h1
              style={{
                transform: `translate3d(-50%, calc(-50% - ${6 + progress * 19}vh), 0)`,
              }}
            >
              {profile.name}
            </h1>
            <nav
              className="social-links"
              aria-label="Profili social"
              style={{
                transform: `translate3d(-50%, calc(-50% + ${6 + progress * 19}vh), 0)`,
              }}
            >
              <a
                className="social-link"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FontAwesomeIcon
                  className="brand-icon"
                  icon={faLinkedin}
                  aria-hidden="true"
                />
              </a>
              <a
                className="social-link"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <FontAwesomeIcon
                  className="brand-icon"
                  icon={faGithub}
                  aria-hidden="true"
                />
              </a>
            </nav>
          </header>

          <div
            className="visor-panel visor-panel--top"
            style={{ transform: `translate3d(0, ${-progress * 104}%, 0)` }}
            aria-hidden="true"
          />
          <div
            className="visor-panel visor-panel--bottom"
            style={{ transform: `translate3d(0, ${progress * 104}%, 0)` }}
            aria-hidden="true"
          />
        </div>
      </section>
    </main>
  )
}

export default App
