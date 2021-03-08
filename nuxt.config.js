const pkg = require("./package");
const webpack = require("webpack");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  // mode: "spa",
  generate: {
    dir: "dist/static"
  },
  // router: {
  //   base: '/static/'
  // },
  /*
   ** Headers of the page
   */
  head: {
    title: "Climb Assist",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href: "https://api.mapbox.com/mapbox-gl-js/v0.50.0/mapbox-gl.css"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["@fortawesome/fontawesome-free/css/all.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  buildModules: [
    // Doc: https://axios.nuxtjs.org/usage
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-121073899-1"
      }
    ],
    [
      "@nuxtjs/google-adsense",
      {
        id: "ca-pub-5881021151869346"
      }
    ],
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    "@nuxtjs/pwa"
  ],
  /*
   ** Axios module configuration
   */
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: "#449947",
          trad: "#FF3E49",
          sport: "#36A2EB",
          boulder: "#FFFF70"
        }
      }
    },
    icons: {
      iconfont: "fa"
    }
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // proxy: true
    baseURL: "/"
  },

  /*
   ** Build configuration
   */
  build: {
    publicPath: "/static/_nuxt",
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: "mapbox-gl"
      })
    ],
    loaders: {},

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      //gltf loader
      config.module.rules.push({
        test: /\.(glb|gltf)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      });
    }
  }
};
