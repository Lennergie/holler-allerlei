import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

export function animateHeadlines() {
  const headlines = document.querySelectorAll('.reveal')

  headlines.forEach((el) => {
    const split = new SplitText(el, {
      type: 'lines',
      linesClass: 'line'
    })

    split.lines.forEach((line) => {
      gsap.set(line, { backgroundSize: '200% 100%', backgroundPositionX: '100%' })

      gsap.to(line, {
        backgroundPositionX: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: line,
          start: 'top 75%',
          end: 'bottom 75%',
          scrub: 3,
        }
      })
    })
  })
}

export function animateHeroHeadlines() {
  const headlines = document.querySelectorAll('.heroReveal')

  headlines.forEach((el) => {
    const split = new SplitText(el, {
      type: 'lines',
      linesClass: 'line'
    })

    split.lines.forEach((line) => {
      gsap.set(line, { backgroundSize: '200% 100%', backgroundPositionX: '100%' })

      gsap.to(line, {
        backgroundPositionX: '0%',
        ease: 'none',
        stagger: 2,
        duration: "2",
      })
    })
  })
}

export function animateContents() {
    const content = document.querySelectorAll('.contentReveal')

    content.forEach((el) => {
        gsap.set(el, { opacity: 0 })
        gsap.to(el, {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'center 75%',
            scrub: 3
            }
        })
    })
}
