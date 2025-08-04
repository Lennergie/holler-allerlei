import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@tsparticles/vue3', 'tsparticles']
    },
    ssr: {
      noExternal: ['@tsparticles/vue3', 'tsparticles']
    }
  },
});
