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
  async fetch({ store, params, redirect }) {
    if (store.state.editor.sampleData) {
      store.commit("editor/updateCrag", store.state.filter.countries[0].regions[0].areas[0].subAreas[0].crags[1]);
      store.commit("editor/updateZoom", store.state.filter.countries[0].regions[0].areas[0].subAreas[0].crags[1].location.zoom);
      store.commit("editor/setParking", store.state.filter.countries[0].regions[0].areas[0].subAreas[0].crags[1].parking);
      store.commit("editor/setCurrentPath", store.state.filter.countries[0].regions[0].areas[0].subAreas[0].crags[1].paths);
      store.commit("editor/updateLocation", {lng: store.state.filter.countries[0].regions[0].areas[0].subAreas[0].crags[1].location.longitude, lat: store.state.filter.countries[0].regions[0].areas[0].subAreas[0].crags[1].location.latitude});
      store.commit("editor/updateSubArea", store.state.filter.countries[0].regions[0].areas[0].subAreas[0]);
      store.commit("editor/updateArea", store.state.filter.countries[0].regions[0].areas[0]);
      store.commit("editor/updateRegion", store.state.filter.countries[0].regions[0]);
      store.commit("editor/updateCountry", store.state.filter.countries[0]);
      return;
    }
    try {
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
      store.commit("editor/updateCrag", crag);
      if (crag.location.zoom) {
        store.commit("editor/updateZoom", crag.location.zoom);
      }
      if (crag.location.longitude) {
        store.commit("editor/updateLocation", {lng: crag.location.longitude, lat: crag.location.latitude});
      }
      if (crag.parking) {
        store.commit("editor/setParking", crag.parking);
      }
      if (crag.paths) {
        store.commit("editor/setCurrentPath", crag.paths);
      }

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
    } catch(error) {
      redirect('/editor/crag/' + params.edit + '/debugger');
    }
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
    //clear sidebar
    this.$store.commit("editor/editView", null);
    this.$store.commit("sidebar/updateSidebar", "defaultV");
    //clear map
    this.$store.commit("editor/updateZoom", undefined);
    this.$store.commit("editor/updateLocation", {lng: undefined, lat:undefined});
    this.$store.commit("editor/updateMapSelector", "location")
    this.$store.commit("editor/clearParking");
    this.$store.commit("editor/clearPath")
  }
};
</script>
