<template>
  <keep-alive>
    <component :is="editTabs" />
  </keep-alive>
</template>

<script>
import Model from "../../../../../components/editor/route/ModelEdit.vue";
import Info from "../../../../../components/editor/route/InfoEdit.vue";
import axios from "axios";
export default {
  middleware: 'authentication',
  data() {
    return {};
  },
  computed: {
    editTabs() {
      return this.$store.state.editor.editTabs;
    }
  },
  components: {
    model: Model,
    info: Info
  },
  methods: {},
  async fetch({ store, params, redirect }) {
    if (store.state.editor.sampleData) {
      store.commit("editor/updateCrag", store.state.filter.countries[0].regions[0].areas[0].subAreas[0].crags[1]);
      store.commit("editor/updateSubArea", store.state.filter.countries[0].regions[0].areas[0].subAreas[0]);
      store.commit("editor/updateArea", store.state.filter.countries[0].regions[0].areas[0]);
      store.commit("editor/updateRegion", store.state.filter.countries[0].regions[0]);
      store.commit("editor/updateCountry", store.state.filter.countries[0]);
      return;
    }
    try {
      let api = (await axios.get("/v1/crags/" + params.edit + "?depth=4")).data;
      let crag = api.data;

      if (!crag.walls) {
        crag.walls = [];
      }
      for (let wi in crag.walls) {
        if (!crag.walls[wi].routes) {
          crag.walls[wi].routes = [];
        }
        for (let ri in crag.walls[wi].routes) {
          crag.walls[wi].routes[ri].points = []
          if (!crag.walls[wi].routes[ri].pitches) {
            crag.walls[wi].routes[ri].pitches =[];
          }
          for (let pi in crag.walls[wi].routes[ri].pitches) {

            if (!crag.walls[wi].routes[ri].pitches[pi].points) {
              crag.walls[wi].routes[ri].pitches[pi].points = [];
            }
            crag.walls[wi].routes[ri].points = crag.walls[wi].routes[ri].points.concat(crag.walls[wi].routes[ri].pitches[pi].points)
          }
        }
      }
      console.log("crag")
      console.log(crag)
      store.commit("editor/updateCrag", crag);

      let subArea = (await axios.get("/v1/sub-areas/" + crag.subAreaId)).data;
      console.info("subArea");
      console.log(subArea);
      store.commit("editor/updateSubArea", subArea.data);

      let area = (await axios.get("/v1/areas/" + subArea.data.areaId)).data;
      console.info("area");
      console.log(area);
      store.commit("editor/updateArea", area.data);

      let region = (await axios.get("/v1/regions/" + area.data.regionId)).data;
      console.info("region");
      console.log(region);
      store.commit("editor/updateRegion", region.data);

      let country = (await axios.get("/v1/countries/" + region.data.countryId)).data;
      console.info("country");
      console.log(country);
      store.commit("editor/updateCountry", country.data);
    } catch(error) {
      redirect('/editor/crag/' + params.edit + '/debugger')
    }
  },
  created() {
    this.$store.commit("editor/editView", "info");
  },
  mounted() {
    this.$store.commit("sidebar/updateSidebar", "editorrouteV");
  },
  destroyed() {
    this.$store.commit("editor/editView", null);
    this.$store.commit("sidebar/updateSidebar", "defaultV");
  }
};
</script>
