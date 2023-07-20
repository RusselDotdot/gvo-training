// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  plugins:['@/plugins/antd'],
  css: ["~/assets/styles/index.scss"],
})
