<template>
  <div class="bubble-button-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="goo">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix"
                         values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>

    <span class="button--bubble__container" ref="buttonContainer">
      <div class="button button--bubble">
        <slot></slot>
      </div>
      <span class="button--bubble__effect-container">
        <span class="circle top-left"></span>
        <span class="circle top-left"></span>
        <span class="circle top-left"></span>

        <span class="button effect-button"></span>

        <span class="circle bottom-right"></span>
        <span class="circle bottom-right"></span>
        <span class="circle bottom-right"></span>
      </span>
    </span>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  const buttons = document.querySelectorAll('.button--bubble__container')

  buttons.forEach(container => {
    if (container.dataset.bubbleAttached === 'true') return
    container.dataset.bubbleAttached = 'true'

    const button = container.querySelector('.button--bubble')
    const $circlesTopLeft = container.querySelectorAll('.circle.top-left')
    const $circlesBottomRight = container.querySelectorAll('.circle.bottom-right')
    const effectButton = container.querySelector('.button.effect-button')

    const tl = gsap.timeline()
    const tl2 = gsap.timeline()
    const btTl = gsap.timeline({ paused: true })

    tl.to($circlesTopLeft, {
      duration: 1.2,
      x: -25,
      y: -25,
      scaleY: 2,
      ease: 'slow(0.1, 0.7, false)'
    })
        .to($circlesTopLeft[0], { duration: 0.1, scale: 0.2, x: '+=6', y: '-=2' })
        .to($circlesTopLeft[1], { duration: 0.1, scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '<')
        .to($circlesTopLeft[2], { duration: 0.1, scale: 0.2, x: '-=15', y: '+=6' }, '<')
        .to($circlesTopLeft[0], { duration: 1, scale: 0, x: '-=5', y: '-=15', opacity: 0 })
        .to($circlesTopLeft[1], { duration: 1, scale: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '<')
        .to($circlesTopLeft[2], { duration: 1, scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '<')

    const tlBt1 = gsap.timeline()
    const tlBt2 = gsap.timeline()

    tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 }).add(tl)

    tl2.set($circlesBottomRight, { x: 0, y: 0 })
        .to($circlesBottomRight, {
          duration: 1.1,
          x: 30,
          y: 30,
          ease: 'slow(0.1, 0.7, false)'
        })
        .to($circlesBottomRight[0], { duration: 0.1, scale: 0.2, x: '-=6', y: '+=3' })
        .to($circlesBottomRight[1], { duration: 0.1, scale: 0.8, x: '+=7', y: '+=3' }, '<')
        .to($circlesBottomRight[2], { duration: 0.1, scale: 0.2, x: '+=15', y: '-=6' }, '<')
        .to($circlesBottomRight[0], { duration: 1, scale: 0, x: '+=5', y: '+=15', opacity: 0 })
        .to($circlesBottomRight[1], { duration: 1, scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '<')
        .to($circlesBottomRight[2], { duration: 1, scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '<')

    tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 }).add(tl2)

    btTl.add(tlBt1)
        .to(effectButton, { duration: 0.8, scaleY: 1.1 }, 0.1)
        .add(tlBt2, 0.2)
        .to(effectButton, {
          duration: 1.8,
          scale: 1,
          ease: 'elastic.out(1.2, 0.4)'
        }, 1.2)

    btTl.timeScale(2.6)

    button.addEventListener('mouseover', () => {
      btTl.restart()
    })
  })
})
</script>

<style scoped lang="scss">
$dark-blue: transparent;
$dark-blue-bubbles: #AB577A;
$green: #90feb5;
$action-color: $green;

* {
  box-sizing: border-box;
}

.bubble-button-wrapper {
  height: 100%;
  text-align: center;
}

.button {
  background-color: $dark-blue;
  border: none;
  border-radius: 5px;
  color: #fff;
  display: inline-block;
  font-size: 14px;
  font-weight: 100;
  text-decoration: none;
  user-select: none;
  letter-spacing: 1px;
  padding: 10px 20px;
  text-transform: uppercase;
  transition: all 0.1s ease-out;

  &:hover {
    color: #fff;
  }

  &:active {
    transform: scale(0.95);
  }

  &--bubble {
    position: relative;
    z-index: 2;
    background: none;

    &__container {
      position: relative;
      display: inline-block;

      .effect-button {
        position: absolute;
        width: 50%;
        height: 25%;
        top: 50%;
        left: 25%;
        z-index: 1;
        transform: translateY(-50%);
        background: $dark-blue-bubbles;
        transition: background 0.1s ease-out;
      }
    }
  }
}

.button--bubble__effect-container {
  position: absolute;
  display: block;
  width: 200%;
  height: 400%;
  top: -150%;
  left: -50%;
  filter: url('#goo');
  transition: all 0.1s ease-out;
  pointer-events: none;

  .circle {
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 15px;
    background: $dark-blue-bubbles;
    transition: background 0.1s ease-out;

    &.top-left {
      top: 40%;
      left: 27%;
    }

    &.bottom-right {
      bottom: 40%;
      right: 27%;
    }
  }
}

.goo {
  position: absolute;
  visibility: hidden;
  width: 1px;
  height: 1px;
}
</style>
