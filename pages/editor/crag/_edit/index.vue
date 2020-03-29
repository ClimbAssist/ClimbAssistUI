<template>
  <keep-alive>
    <component :is="editTabs" />
  </keep-alive>
</template>

<script>
import Model from "../../../../components/editor/crag/ModelEdit.vue";
import Info from "../../../../components/editor/crag/InfoEdit.vue";
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
  methods: {},
  components: {
    model: Model,
    info: Info
  },
  async fetch({ store, params }) {
    if (store.state.editor.sampleData) {
      store.commit("editor/updateCrag", store.state.filter.countries[0].regions[0].areas[0].subAreas[0].crags[1]);
      store.commit("editor/updateSubArea", store.state.filter.countries[0].regions[0].areas[0].subAreas[0]);
      store.commit("editor/updateArea", store.state.filter.countries[0].regions[0].areas[0]);
      store.commit("editor/updateRegion", store.state.filter.countries[0].regions[0]);
      store.commit("editor/updateCountry", store.state.filter.countries[0]);
      return;
    }
    const api = (await axios.get("/v1/crags/" + params.edit + "?depth=2")).data;

    let crag = api.data;
    if (!crag.walls) {
      crag.walls = [];
    }
    for (let i in crag.walls) {
      if (!crag.walls[i].routes) {
        crag.walls[i].routes = [];
      }
    }
    console.info("cragView Walls");
    console.log(crag);
    store.commit("editor/updateCrag", crag);

    const subArea = (await axios.get("/v1/sub-areas/" + crag.subAreaId)).data;
    console.info("subArea");
    console.log(subArea);
    store.commit("editor/updateSubArea", subArea.data);

    const area = (await axios.get("/v1/areas/" + subArea.data.areaId)).data;
    console.info("area");
    console.log(area);
    store.commit("editor/updateArea", area.data);

    const region = (await axios.get("/v1/regions/" + area.data.regionId)).data;
    console.info("region");
    console.log(region);
    store.commit("editor/updateRegion", region.data);

    const country = (await axios.get("/v1/countries/" + region.data.countryId))
      .data;
    console.info("country");
    console.log(country);
    store.commit("editor/updateCountry", country.data);
  },
  created() {
    this.$store.commit("editor/editView", "info");
    this.$store.commit("filter/updateFilterText", "");
    this.$store.commit("editor/updateMapTile", "outdoors-v11")
    this.$store.commit("editor/clearMapEdit")
  },
  mounted() {
    this.$store.commit("sidebar/updateSidebar", "editorcragV");
  },
  destroyed() {
    this.$store.commit("editor/editView", null);
    this.$store.commit("sidebar/updateSidebar", "defaultV");
  }
};
</script>
