<template>
  <div>
    <keep-alive>
      <component :is="frameTabs" />
    </keep-alive>
    <v-overlay
          :value="displayOverlay"
          :z-index="zIndex"
        >
        <component :is="overlay[overlayIndex]"/>
      <v-btn
        @click="displayOverlay = false"
        class="ma-2 darken-1"
        color="grey"
      >
        Stop Tour
      </v-btn>
      <v-btn
        color="primary"
        class="ma-2"
        @click="nextOverlay()"
      >
      {{nextButtonText}}
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import Model from "../../components/crag/Model.vue";
import MapCrag from "../../components/crag/CragMap.vue";
import Info from "../../components/crag/Info.vue";
import One from "../../components/demo/One.vue";
import Two from "../../components/demo/Two.vue";
import Three from "../../components/demo/Three.vue";
import Four from "../../components/demo/Four.vue";
import Five from "../../components/demo/Five.vue";
import Six from "../../components/demo/Six.vue";
import Seven from "../../components/demo/Seven.vue";
import Eight from "../../components/demo/Eight.vue";
import Nine from "../../components/demo/Nine.vue";
import Ten from "../../components/demo/Ten.vue";
import axios from "axios";
export default {
  data() {
    return {
      displayOverlay: true,
      overlayIndex: 0,
      absolute: false,
      zIndex: 10,
      nextButtonText: "Next",
      overlay: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    };
  },
  watch: {
    filter: {
      handler() {
        this.$store.commit("frame/updateActiveRoute", null);
      },
      deep: true
    }
  },
  computed: {
    frameTabs() {
      return this.$store.state.frame.frameTabs;
    },
    filter() {
      return this.$store.state.filter.filter;
    },
    crag() {
      return this.$store.state.filter.cragState
    }
  },
  methods: {
    nextOverlay() {
      this.overlayIndex++;
      if (this.overlayIndex===1) {
        this.zIndex=4
      } else {
        this.zIndex=5
      }
      if (this.overlayIndex === 5) {
        this.$store.commit("frame/cragView", "mapcrag")
      }
      if (this.overlayIndex === 6) {
        this.$store.commit("frame/cragView", "model")
      }
      if (this.overlay.length < this.overlayIndex + 1) {
        this.displayOverlay = false;
      }
      else if (this.overlay.length === this.overlayIndex + 1)
      {
        this.nextButtonText = "done"
      }
    },
    string_to_slug(str) {
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to = "aaaaeeeeiiiioooouuuunc------";
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

      return str;
    }
  },
  components: {
    model: Model,
    mapcrag: MapCrag,
    info: Info,
    one: One,
    two: Two,
    three: Three,
    four: Four,
    five: Five,
    six: Six,
    seven: Seven,
    eight: Eight,
    nine: Nine,
    ten: Ten
  },
  async fetch({ store, params }) {
    for (let i in store.state.filter.loadedCrags) {
      if (store.state.filter.loadedCrags[i].cragId == "bell-buttress") {
        store.commit("filter/updateCrag", store.state.filter.loadedCrags[i]);
        return;
      }
    }

    const api = (await axios.get("/v1/crags/bell-buttress?depth=4")).data;

    let crag = api.data;

    for (let wi in crag.walls) {
      for (let ri in crag.walls[wi].routes) {
        crag.walls[wi].routes[ri].points = []
        crag.walls[wi].routes[ri].distance = 0;
        for (let pi in crag.walls[wi].routes[ri].pitches) {
          if (crag.walls[wi].routes[ri].pitches[pi].distance) {
            crag.walls[wi].routes[ri].distance += crag.walls[wi].routes[ri].pitches[pi].distance
          }
          crag.walls[wi].routes[ri].points = crag.walls[wi].routes[ri].points.concat(crag.walls[wi].routes[ri].pitches[pi].points)
        }
      }
    }
    crag.area = {
      name: "Boulder Canyon",
      areaId: "boulder-canyon"
    };
    store.commit("filter/updateCrag", crag);
    store.commit("filter/updateLoadedCrags", crag);
  },
  created() {
    this.$store.commit("filter/updateFilterText", "");
    this.$store.commit("frame/cragView", "info");
  },
  mounted() {
    this.$store.commit("sidebar/updateSidebar", "frameV");
    this.$store.commit("demo/updateDrawer", false)
  },
  destroyed() {
    this.$store.commit("sidebar/updateSidebar", "defaultV");
    this.$store.commit("frame/cragView", null);
    this.$store.commit("frame/updateActiveRoute", null);
  },
  head() {
    return {
      title: "Climb Assist - " + this.$store.state.filter.cragState.name,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.$store.state.filter.cragState.description }
      ]
    }
  }
};
</script>

<style scoped>
.addnav {
  padding-top: 60px;
  margin-bottom: 60px;
}
#map {
  height: 800px;
}
</style>
