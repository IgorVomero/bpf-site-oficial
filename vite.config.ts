import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'mpa',
  input: {
    home: 'index.html',
    privacy: 'bpf-politicas-privacidade/index.html',
    about: 'quem-somos/index.html',
    companies: 'empresas/index.html',
    users: 'usuarios/index.html',
    establishments: 'estabelecimentos/index.html',
  },
})
