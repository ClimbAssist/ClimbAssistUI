<template>
  <div id="background" :style="{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ),url(${url}), url(${fallbackUrl})` }">
    <v-container justify-space-around class="white--text text--darken-2">
      <div style="height: 100px;">
      </div>
      <v-layout wrap justify-center>
        <h2 class="display-2">
          3D Climbing Topos and Guides
        </h2>
      </v-layout>
      <v-layout wrap class="ma-5">
        <v-flex v-for="(item, i) in items" class="clickbox ma-2" :key='i' @click="setRoute(item.to)">
          <v-icon dark x-large class="ma-2">
            {{item.icon}}
          </v-icon>
          <h3>
          {{item.title}}
          </h3>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import backgroundUrl from '../static/splash.webp'
import backgroundUrlTall from '../static/splashTall.webp'
import backgroundUrlJpg from '../static/splash.jpg'
import backgroundUrlJpgTall from '../static/splashTall.jpg'
export default {
  name: "home",
  data: () => ({
    drawer: null,
    url: undefined,
    urlJpg: undefined,
    items: [
      {
        icon: "fa-info",
        title: "About",
        to: "/about"
      },
      {
        icon: "fa-hands-helping",
        title: "Contribute",
        to: "/contribute"
      },
      {
        icon: "fa-directions",
        title: "Take A Tour",
        to: "/demo"
      }
    ],
  }),
  props: {
    source: String
  },
  methods: {
    setRoute(to) {
      this.$router.push(to)
    },
    getBackground() {
      if (window.innerWidth < 960) {
        this.url = backgroundUrlTall
        this.urlJpg = backgroundUrlJpgTall
      } else {
        this.url = backgroundUrl;
        this.urlJpg = backgroundUrlJpg
      }
    }
  },
  computed: {
    height() {
      let content = document.getElementsByClassName('v-content')
      var topNav = document.getElementsByClassName("v-app-bar");
      var footer = document.getElementsByClassName("v-footer");
      let height = window.innerheight
      return height;
    }
  },
  created() {
    window.addEventListener('resize', this.getBackground, false)
    this.getBackground();
  }
};
</script>
<style scoped>
#background {
  height: 100%;

  background-size: cover;
}
.clickbox {
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: white;
}
.clickbox:hover {
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(255, 255, 255, 0.19);
  cursor: pointer;
}
</style>
