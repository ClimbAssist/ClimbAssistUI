<template>
  <div id="map" />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      access:
        "pk.eyJ1IjoiY2xpbWJhc3Npc3QiLCJhIjoiY2pmMDZ1ejBvMGpxZDJ3cWpiZ2w3c2w4NiJ9.Xwqm5bhXRQU-LrC2keGw3g",
      crag_pin: require("@/static/map_icon.png"),
      parking_pin: require("@/static/parking.png")
    };
  },
  computed: {
    subArea() {
      return this.$store.state.editor.subArea;
    },
    location() {
      return this.$store.state.editor.location;
    },
    parking() {
      return this.$store.state.editor.parking;
    },
    path() {
      return this.$store.state.editor.path;
    },
    mapTile() {
      return this.$store.state.editor.mapTile;
    },
    mapSelector() {
      return this.$store.state.editor.mapSelector;
    }
  },
  watch: {
    mapTile: {
      handler() {
        this.map.setStyle("mapbox://styles/mapbox/" + this.mapTile);
        this.map.on("style.load", () => {
          this.setPin();
          this.setParking();
          this.setPath();
        });
      }
    },
    path: {
      handler() {
        this.setPath()
      }
    }
  },
  methods: {
    createMap() {
      const mapboxgl = require("mapbox-gl");
      mapboxgl.accessToken =
        "pk.eyJ1IjoiY2xpbWJhc3Npc3QiLCJhIjoiY2pmMDZ1ejBvMGpxZDJ3cWpiZ2w3c2w4NiJ9.Xwqm5bhXRQU-LrC2keGw3g";
      // init the map
      if (this.subArea.location) {
        this.map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/outdoors-v11",
          center: [
            this.subArea.location.longitude,
            this.subArea.location.latitude
          ],
          zoom: 12
        });
      } else {
        this.map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/outdoors-v11"
        });
      }
      this.mapLoaded(this.map, mapboxgl);
    },
    mapLoaded(map, mapboxgl) {
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
      map.addControl(new mapboxgl.FullscreenControl());
      map.on("style.load", () => {
        map.loadImage(this.crag_pin, (error, image) => {
          if (error) throw error;
          map.addImage("cragPin", image);
        });
        map.loadImage(this.parking_pin, (error, image) => {
          if (error) throw error;
          map.addImage("parkingPin", image);
        });

        map.on("click", e => {
          if (this.mapSelector === "location") {
            this.$store.commit("editor/updateLocation", e.lngLat);
            this.setPin();
          } else if (this.mapSelector === "parking") {
            this.$store.commit("editor/updateParking", e.lngLat);
            this.setParking();
          } else if (this.mapSelector === "path") {
            let point = [e.lngLat.lng, e.lngLat.lat]
            this.$store.commit("editor/addPathPoint", point);

          }
        });

        map.on("zoomend", () => {
          let zoom = map.getZoom();
          this.$store.commit("editor/updateZoom", zoom);
        });
      });
    },
    setPin() {
      if (this.map.getLayer("crag")) {
        this.map.removeLayer("crag");
        this.map.removeSource("crag");
      }
      this.map.addLayer({
        id: "crag",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [this.location.longitude, this.location.latitude]
                }
              }
            ]
          }
        },
        type: "symbol",
        layout: {
          "icon-image": "cragPin",
          "icon-size": 0.7
        }
      });
    },
    setParking() {
      if (this.map.getLayer("parking")) {
        this.map.removeLayer("parking");
        this.map.removeSource("parking");
      }

      this.map.addLayer({
        id: "parking",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [this.parking.longitude, this.parking.latitude]
                }
              }
            ]
          }
        },
        type: "symbol",
        layout: {
          "icon-image": "parkingPin",
          "icon-size": 0.7
        }
      });
    },
    setPath() {
      if (this.map.getLayer("path")) {
        this.map.removeLayer("path");
        this.map.removeSource("path");
      }
      if (this.path.length > 1) {
        this.map.addLayer({
          id: "path",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: this.path
              }
            }
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#888",
            "line-width": 8
          }
        });
      }
    }
  },
  mounted() {
    this.createMap();
  },
  destroyed() {
    this.$store.commit("editor/updateZoom", undefined);
    this.$store.commit("editor/updateLocation", {
      lng: undefined,
      lat: undefined
    });
    this.$store.commit("editor/updateParking", {
      lng: undefined,
      lat: undefined
    });
    this.$store.commit("editor/updateMapSelector", "location")
    this.$store.commit("editor/clearPath")
  }
};
</script>

<style scoped>
#map {
  width: 400px;
  height: 400px;
}
#info {
  position: absolute;
  bottom: 0px;
}
</style>
<style>
.mapboxgl-canvas {
  left: 0;
}
</style>
