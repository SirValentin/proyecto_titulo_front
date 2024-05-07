// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "dayjs-nuxt",
    "@pinia/nuxt",
    "nuxt-primevue",
    "@sidebase/nuxt-auth",
  ],
  runtimeConfig: {
    public: {
      baseURL:
        process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api/v1",
    },
  },
  dayjs: {
    locales: ["es"],
    plugins: [
      "utc",
      "timezone",
      "localeData",
      "localizedFormat",
      "weekday",
      "isoWeek",
      "isToday",
      "toObject",
      "weekOfYear",
      "isSameOrAfter",
    ],
    defaultLocale: "es",
    defaultTimezone: "America/Santiago",
  },
  primevue: {
    components: {
      include: [
        "Button",
        "DataTable",
        "Dialog",
        "Column",
        "ColumnGroup",
        "Row",
        "InputText",
        "TabView",
        "TabPanel",
      ],
    },
    options: {},
  },
  components: [{ path: "~/components", pathPrefix: false }],
  devtools: { enabled: true },
  css: [
    "vue-multiselect/dist/vue-multiselect.css",
    "~/assets/scss/main.css",
    "primevue/resources/themes/aura-light-green/theme.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  auth: {
    baseURL: process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api/v1",
    globalAppMiddleware: true,
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/token/login/", method: "post" },
        signOut: { path: "/token/logout/ ", method: "post" },
        signUp: { path: "/users/", method: "post" },
        getSession: { path: "/users/me/", method: "get" },
      },
      token: {
        type: "Token ",
        signInResponseTokenPointer: "/auth_token",
      },
    },
  },
});
