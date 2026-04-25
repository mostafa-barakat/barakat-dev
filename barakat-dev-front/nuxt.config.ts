// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: "http://127.0.0.1:8000/api",
    },
  },
  css: ["@/assets/style/main.css"],
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "Barakat Dev",
      link: [
        // 1. إعداد الأيقونة (Favicon)
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        // 2. إعداد مكتبة Font Awesome (منفصلة تماماً)
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        },
      ],
    },
  },
});
