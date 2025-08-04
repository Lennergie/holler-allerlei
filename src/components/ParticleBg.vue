<template>
  <div id="particles-js"></div>
</template>

<script setup>
import { onMounted, nextTick } from "vue";

onMounted(() => {
  const particles = document.createElement("script");
  particles.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
  );
  document.head.appendChild(particles);
  setTimeout(() => {
    particlesJS.load("particles-js", "/particles.json", function () {});
  }, 500);
});
</script>

<style scoped>
#particles-js {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>
