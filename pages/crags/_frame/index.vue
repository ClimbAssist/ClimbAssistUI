<template>
  <keep-alive>
    <component :is="frameTabs" />
  </keep-alive>
</template>

<script>
import Model from "../../../components/crag/Model.vue";
import MapCrag from "../../../components/crag/CragMap.vue";
import Info from "../../../components/crag/Info.vue";
import axios from "axios";
export default {
  data() {
    return {};
  },
  watch: {
    filter: {
      handler() {
        this.$store.commit("frame/updateActiveRoute", null);
      },
      deep: true,
    },
  },
  computed: {
    frameTabs() {
      return this.$store.state.frame.frameTabs;
    },
    filter() {
      return this.$store.state.filter.filter;
    },
    crag() {
      return this.$store.state.filter.cragState;
    },
  },
  methods: {
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
    },
  },
  components: {
    model: Model,
    mapcrag: MapCrag,
    info: Info,
  },
  async fetch({ store, params }) {
    if (
      store.state.filter.cragState &&
      store.state.filter.cragState.cragId === params.frame
    ) {
      return;
    } else {
      for (let i in store.state.filter.loadedCrags) {
        if (store.state.filter.loadedCrags[i].cragId === params.frame) {
          store.commit("filter/updateCrag", store.state.filter.loadedCrags[i]);
          return;
        }
      }
      const api = (await axios.get("/v1/crags/" + params.frame + "?depth=4"))
        .data;

      let crag = api.data;
      if (!crag.walls) {
        crag.walls = [];
      }

      for (let wi in crag.walls) {
        if (!crag.walls[wi].routes) {
          crag.walls[wi].routes = [];
        }
        for (let ri in crag.walls[wi].routes) {
          crag.walls[wi].routes[ri].points = [];
          crag.walls[wi].routes[ri].distance = 0;
          if (!crag.walls[wi].routes[ri].pitches) {
            crag.walls[wi].routes[ri].pitches = [];
          }
          for (let pi in crag.walls[wi].routes[ri].pitches) {
            if (crag.walls[wi].routes[ri].pitches[pi].distance) {
              crag.walls[wi].routes[ri].distance +=
                crag.walls[wi].routes[ri].pitches[pi].distance;
            }
            if (!crag.walls[wi].routes[ri].pitches[pi].points) {
              crag.walls[wi].routes[ri].pitches[pi].points = [];
            }
            crag.walls[wi].routes[ri].points = crag.walls[wi].routes[
              ri
            ].points.concat(crag.walls[wi].routes[ri].pitches[pi].points);
          }
        }
      }
      if (params.countryKey) {
        crag.area = {
          name:
            store.state.filter.countries[params.countryKey].regions[
              params.stateKey
            ].areas[params.areaKey].name,
          areaId:
            store.state.filter.countries[params.countryKey].regions[
              params.stateKey
            ].areas[params.areaKey].areaId,
        };
      } else {
        const subAreaApi = (await axios.get("/v1/sub-areas/" + crag.subAreaId))
          .data;
        const areaApi = (await axios.get("/v1/areas/" + subAreaApi.data.areaId))
          .data;
        crag.area = areaApi.data;
      }
      store.commit("filter/updateCrag", crag);
      store.commit("filter/updateLoadedCrags", crag);
    }
  },
  created() {
    this.$store.commit("filter/updateFilterText", "");
    if (this.$route.query.viewer) {
      this.$store.commit("frame/cragView", "model");
    } else {
      this.$store.commit("frame/cragView", "info");
    }
  },
  mounted() {
    this.$store.commit("sidebar/updateSidebar", "frameV");
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
        {
          hid: "description",
          name: "description",
          content: this.$store.state.filter.cragState.description,
        },
      ],
    };
  },
};
</script>

<style scoped>
.addnav {
  padding-top: 60px;
  margin-bottom: 60px;
}
</style>
