import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'mpa',
  input: {
    home: 'index.html',
    privacy: 'bpf-politicas-privacidade/index.html',
  },
})
