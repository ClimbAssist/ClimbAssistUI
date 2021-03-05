<template>
  <div
    id="background"
    :style="{
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${url}), url(${urlJpg})`
    }"
  >
    <v-container
      v-for="(country, i) in countries"
      :key="i"
      class="white--text text--darken-2"
      fluid
    >
      <div class="text-xs-center" v-if="!dataSet">
        <p>loading</p>
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div class="text-xs-center" v-if="loadError">
        <p>{{ loadError }}</p>
      </div>
      <v-layout class="pt-10 pb-10" wrap justify-center>
        <h2 class="display-2">
          3D Climbing Topos and Guides
        </h2>
      </v-layout>
      <!-- <v-layout wrap class="ma-5">
        <v-flex v-for="(item, i) in items" class="clickbox ma-2" :key='i' @click="setRoute(item.to)">
          <v-icon dark x-large class="ma-2">
            {{item.icon}}
          </v-icon>
          <h3>
          {{item.title}}
          </h3>
        </v-flex>
      </v-layout> -->
      <v-sheet
        v-for="(region, si) in country.regions"
        :key="si"
        rounded
        class="ma-5"
        elevation="8"
        color="rgba(0,0,0,0.3)"
      >
        <h2 class="white--text pt-2">{{ region.name }}</h2>
        <v-slide-group v-model="model" class="pa-4" show-arrows="desktop">
          <v-slide-item v-for="(area, ai) in region.areas" :key="ai">
            <v-hover>
              <template v-slot:default="{ hover, focus }">
                <v-card
                  color="grey lighten-1"
                  class="ma-4"
                  @click="toArea(i, si, ai, area)"
                >
                  <!-- <v-img
                    src="https://picsum.photos/350/165?random"
                    aspect-ratio="1"
                    height="200"
                    width="200"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    class="white--text align-end"
                  >
                    <v-card-title>
                      {{ area.name }}
                    </v-card-title></v-img
                  > -->
                  <div style="height:200px; width:200px;"></div>

                  <v-fade-transition>
                    <v-overlay v-if="hover || focus" absolute>
                      {{ area.description.substring(0, 100) }}
                    </v-overlay>
                  </v-fade-transition>
                  <!-- <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon
                    v-if="active"
                    color="white"
                    size="48"
                    v-text="'mdi-close-circle-outline'"
                  ></v-icon>
                </v-scale-transition>
              </v-row> -->
                </v-card>
              </template>
            </v-hover>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import backgroundUrl from "../static/splash.webp";
import backgroundUrlTall from "../static/splashTall.webp";
import backgroundUrlJpg from "../static/splash.jpg";
import backgroundUrlJpgTall from "../static/splashTall.jpg";
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
    ]
  }),
  props: {
    source: String
  },
  methods: {
    setRoute(to) {
      this.$router.push(to);
    },
    getBackground() {
      if (window.innerWidth < 960) {
        this.url = backgroundUrlTall;
        this.urlJpg = backgroundUrlJpgTall;
      } else {
        this.url = backgroundUrl;
        this.urlJpg = backgroundUrlJpg;
      }
    },
    toArea(i, si, ai, area) {
      this.$router.push({
        name: "areas-area",
        params: {
          countryKey: i,
          stateKey: si,
          areaKey: ai,
          area: area.areaId
        }
      });
    }
  },
  computed: {
    height() {
      let content = document.getElementsByClassName("v-content");
      var topNav = document.getElementsByClassName("v-app-bar");
      var footer = document.getElementsByClassName("v-footer");
      let height = window.innerheight;
      return height;
    },
    ...mapGetters({
      filteredRoutes: "filter/filteredRoutes"
    }),
    countries() {
      return this.$store.state.filter.countries;
    },
    dataSet() {
      return this.$store.state.filter.dataSet;
    },
    loadError() {
      return this.$store.state.filter.loadError;
    }
  },
  created() {
    window.addEventListener("resize", this.getBackground, false);
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
