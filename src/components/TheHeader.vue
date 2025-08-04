<template>
  <div
    class="fixed w-full px-3 py-1 lg:px-10 lg:py-3 z-100 bg-[var(--mainBg)] shadow"
  >
    <div class="block lg:hidden flex justify-between items-center w-full h-[60px]">
      <a href="/" class="z-100">
        <img
          :src="'./Logo_black.png'"
          alt="Hollder Allerlei"
          class="w-[140px]"
        />
      </a>
      <div class="w-[40px] flex center items-ceter gap-2 flex-col navBtn z-100">
        <span class="w-full block h-[2px] bg-black"></span>
        <span class="w-full block h-[2px] bg-black"></span>
        <span class="w-full block h-[2px] bg-black"></span>
      </div>
      <nav
        class="mobileNav fixed top-0 left-0 w-full h-screen flex justify-center items-center flex-col gap-3 bg-[var(--mainBg)]"
      >
        <a class="menuItem" href="/sortiment">Sortiment</a>
        <a class="menuItem" href="/selbstgemachtes">Selbstgemachtes</a>
        <a class="menuItem" href="/ueberUns">Über uns</a>
        <a class="mt-10 lg:mt-0 lg:ml-10" href="/kontakt">
          <TheButton>Kontakt</TheButton>
        </a>
      </nav>
    </div>
    <div class="hidden lg:flex flex justify-between items-center w-full">
      <a href="/">
        <img
          :src="'./Logo_black.png'"
          alt="Holler Allerlei"
          class="w-[200px] hover:scale-110 transition-transform"
        />
      </a>
      <nav class="flex justify-between items-center gap-5">
        <a class="menuItem" href="/sortiment">Sortiment</a>
        <a class="menuItem" href="/selbstgemachtes">Selbstgemachtes</a>
        <a class="menuItem" href="/ueberUns">Über uns</a>
        <a class="mt-10 lg:mt-0 lg:ml-10" href="/kontakt">
          <TheButton>Kontakt</TheButton>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import TheButton from "./TheButton.vue";
import { onMounted, ref } from "vue";
import gsap from "gsap";

onMounted(() => {
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;
  const toggleMenu = document.querySelector(".navBtn");
  const menuItem = document.querySelectorAll(".mobileNav .menuItem");

  const tl = gsap.timeline({ reversed: true });

  tl.from("nav.mobileNav", {
    duration: 0.6,
    ease: "power3.inOut",
    top: "-100%",
  })
    .from("nav.mobileNav a", {
      duration: 0.3,
      opacity: 0,
      y: 20,
      ease: "power3.inOut",
      stagger: 0.05,
    })
    .to(".navBtn", {
      duration: 0.3,
      rotation: 45,
      ease: "power3.inOut",
      stagger: 0,
    });

  function onClickMobileMenuItem() {
    tl.reverse();
  }

  function animateIt() {
    tl.reversed() ? tl.play() : tl.reverse();
  }

  var mediaQueryList = window.matchMedia("(min-width: 1024px)");

  // Set things up on load
  if (mediaQueryList.matches) {
    tl.pause(1);
  } else {
    toggleMenu.addEventListener("click", animateIt);
    menuItem.forEach((item) => {
      item.addEventListener("click", onClickMobileMenuItem);
    });
    tl.pause(0);
  }

  // This handles resizes, when passing that breakpoint at 1024px
  function toggleStateOnResize(e) {
    console.log("Breakpoint of 1024px passed.");

    if (e.matches) {
      // WIDE SCREEN
      toggleMenu.removeEventListener("click", animateIt);
      tl.pause(1);
    } else {
      // NARROW SCREEN
      toggleMenu.addEventListener("click", animateIt);
      tl.pause(0).reversed(true);
    }
  }

  mediaQueryList.addListener(toggleStateOnResize);
});
</script>

<style scoped>
.menuItem {
  font-family: "ExpletusSans";
  font-size: 20px;
  display: inline-block;
  position: relative;
}

.menuItem::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #fff;
  transition: transform 0.25s ease-out;
}

.menuItem:hover::after {
  transform: scaleX(1);
}

.menuItem::after {
  transform-origin: bottom right;
}

.menuItem:hover::after {
  transform-origin: bottom left;
}
@media screen and (max-width: 1024px) {
  .menuItem {
    font-size: 35px;
  }
}
</style>
