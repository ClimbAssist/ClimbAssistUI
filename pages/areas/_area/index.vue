<template>
  <keep-alive>
    <component :is="areaTabs" />
  </keep-alive>
</template>

<script>
import AreaMap from "../../../components/area/AreaMap.vue";
import Info from "../../../components/area/Info.vue";
import axios from "axios";
export default {
  data() {
    return {
    };
  },
  computed: {
    areaTabs() {
      return this.$store.state.area.areaTabs;
    }
  },
  components: {
    areamap: AreaMap,
    info: Info
  },
  async fetch({ store, params }) {
    if (
      store.state.filter.areaState &&
      store.state.filter.areaState.areaId === params.area
    ) {
      return;
    } else if (params.areaKey != null) {
      store.commit(
        "filter/updateArea",
        store.state.filter.countries[params.countryKey].regions[params.stateKey]
          .areas[params.areaKey]
      );
    } else {
      const api = (await axios.get("/v1/areas/" + params.area + "?depth=4")).data;

      let area = api.data;
      if (!area.subAreas) {
        area.subAreas = [];
      }

      let fill = {
        minLatitude: undefined,
        maxLatitude: undefined,
        minLongitude: undefined,
        maxLongitude: undefined
      };

      for (let subi in area.subAreas) {
        if (!area.subAreas[subi].crags) {
          area.subAreas[subi].crags = [];
        }
        // set subArea locations and Fills
        if (area.subAreas[subi].crags.length > 1) {
          let minLatitude = area.subAreas[subi].crags[0].location.latitude;
          let minLongitude = area.subAreas[subi].crags[0].location.longitude;
          let maxLatitude = area.subAreas[subi].crags[0].location.latitude;
          let maxLongitude = area.subAreas[subi].crags[0].location.longitude;
          for (let ckey in area.subAreas[subi].crags) {
            if (!area.subAreas[subi].crags[ckey].walls) {
              area.subAreas[subi].crags[ckey].walls = [];
            }
            for (let wkey in area.subAreas[subi].crags[ckey].walls) {
              if (!area.subAreas[subi].crags[ckey].walls[wkey].routes) {
                area.subAreas[subi].crags[ckey].walls[wkey].routes = []
              }
            }
            if (
              area.subAreas[subi].crags[ckey].location.latitude < minLatitude
            ) {
              minLatitude = area.subAreas[subi].crags[ckey].location.latitude;
            }
            if (
              area.subAreas[subi].crags[ckey].location.latitude > maxLatitude
            ) {
              maxLatitude = area.subAreas[subi].crags[ckey].location.latitude;
            }
            if (
              area.subAreas[subi].crags[ckey].location.longitude < minLongitude
            ) {
              minLongitude = area.subAreas[subi].crags[ckey].location.longitude;
            }
            if (
              area.subAreas[subi].crags[ckey].location.longitude > maxLongitude
            ) {
              maxLongitude = area.subAreas[subi].crags[ckey].location.longitude;
            }
          }
          if (fill.maxLongitude) {
            if (minLatitude < fill.minLatitude) {
              fill.minLatitude = minLatitude;
            }
            if (maxLatitude > fill.maxLatitude) {
              fill.maxLatitude = maxLatitude;
            }
            if (minLongitude < fill.minLongitude) {
              fill.minLongitude = minLongitude;
            }
            if (maxLongitude > fill.maxLongitude) {
              fill.maxLongitude = maxLongitude;
            }
          } else {
            fill.minLatitude = minLatitude;
            fill.maxLatitude = maxLatitude;
            fill.minLongitude = minLongitude;
            fill.maxLongitude = maxLongitude;
          }

          let subAreaLong = minLongitude + (maxLongitude - minLongitude) / 2;
          let subAreaLat = minLatitude + (maxLatitude - minLatitude) / 2;
          let titleLoc = [subAreaLong, maxLatitude];

          area.subAreas[subi].fill = {
            minLongitude: minLongitude,
            maxLongitude: maxLongitude,
            minLatitude: minLatitude,
            maxLatitude: maxLatitude,
            titleLoc: titleLoc
          };

          area.subAreas[subi].location = {
            latitude: subAreaLat,
            longitude: subAreaLong
          };
        } else if (area.subAreas[subi].crags.length > 0) {
          area.subAreas[subi].location = area.subAreas[subi].crags[0].location;

          if (!fill.maxLongitude) {
            fill.minLatitude = area.subAreas[subi].crags[0].location.latitude;
            fill.maxLatitude = area.subAreas[subi].crags[0].location.latitude;
            fill.minLongitude = area.subAreas[subi].crags[0].location.longitude;
            fill.maxLongitude = area.subAreas[subi].crags[0].location.longitude;
          } else {
            if (
              area.subAreas[subi].crags[ckey].location.latitude <
              fill.minLatitude
            ) {
              fill.minLatitude =
                area.subAreas[subi].crags[ckey].location.latitude;
            }
            if (
              area.subAreas[subi].crags[ckey].location.latitude >
              fill.maxLatitude
            ) {
              fill.maxLatitude =
                area.subAreas[subi].crags[ckey].location.latitude;
            }
            if (
              area.subAreas[subi].crags[ckey].location.longitude <
              fill.minLongitude
            ) {
              fill.minLongitude =
                area.subAreas[subi].crags[ckey].location.longitude;
            }
            if (
              area.subAreas[subi].crags[ckey].location.longitude >
              fill.maxLongitude
            ) {
              fill.maxLongitude =
                area.subAreas[subi].crags[ckey].location.longitude;
            }
          }
        }
      }
      if (fill.maxLongitude) {
        let areaLat;
        let areaLong;
        if (fill.maxLatitude !== fill.minLatitude) {
          areaLat =
            fill.minLatitude + (fill.maxLatitude - fill.minLatitude) / 2;
        } else {
          areaLat = fill.minLatitude;
        }
        if (fill.maxLongitude !== fill.minLongitude) {
          areaLong =
            fill.minLongitude + (fill.maxLongitude - fill.minLongitude) / 2;
        } else {
          areaLong = fill.minLongitude;
        }
        if (
          fill.maxLatitude !== fill.minLatitude &&
          fill.maxLongitude !== fill.minLongitude
        ) {
          fill.titleLoc = [areaLong, fill.maxLatitude];
          area.fill = fill;
        }
        area.location = {
          latitude: areaLat,
          longitude: areaLong
        };
      }
      store.commit("filter/updateArea", area);
    }
  },
  created() {
    this.$store.commit("filter/updateFilterText", "");
    this.$store.commit("area/areaView", "info");
  },
  mounted() {
    this.$store.commit("sidebar/updateSidebar", "areaV");
  },
  destroyed() {
    this.$store.commit("sidebar/updateSidebar", "defaultV");
    this.$store.commit("filter/updateMapBounds", undefined);
  },
  head() {
    return {
      title: "Climb Assist - " + this.$store.state.filter.areaState.name,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.$store.state.filter.areaState.description }
      ]
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
.trad-style {
  color: #ff3300;
}
.sport-style {
  color: #0066ff;
}
.boulder-style {
  color: #33cc66;
}
</style>
<style>
.mapboxgl-canvas {
  left: 0;
}
</style>
