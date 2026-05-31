import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vue from '@astrojs/vue';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.holler-allerlei.de',
  integrations: [vue(), sitemap()],
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