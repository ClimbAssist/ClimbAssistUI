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
      parking_pin: require("@/static/parking.png"),
    };
  },
  computed: {
    subArea() {
      return this.$store.state.editor.subArea;
    },
    location() {
      return this.$store.state.editor.location;
    },
    crag() {
      return this.$store.state.editor.cragStateEditor;
    },
    mapEdit() {
      return this.$store.state.editor.mapEdit;
    },
    mapTile() {
      return this.$store.state.editor.mapTile;
    },
    mapSelector() {
      return this.$store.state.editor.mapSelector;
    },
    parking() {
      return this.$store.state.editor.parking;
    },
    path() {
      return this.$store.state.editor.path;
    },
    currentPath() {
      return this.$store.state.editor.currentPath;
    },
  },
  watch: {
    mapEdit: {
      handler() {
        if (this.mapEdit) {
          this.map.scrollZoom.enable();
          this.map.boxZoom.enable();
          this.map.dragPan.enable();
        } else {
          this.map.scrollZoom.disable();
          this.map.boxZoom.disable();
          this.map.dragPan.disable();
        }
      },
    },
    mapTile: {
      handler() {
        this.map.setStyle("mapbox://styles/mapbox/" + this.mapTile);
      },
    },
    path: {
      handler() {
        this.setPath();
      },
    },
    parking: {
      handler() {
        this.setParking();
      },
    },
    currentPath: {
      handler() {
        this.setPath();
      },
    },
  },
  methods: {
    createMap() {
      const mapboxgl = require("mapbox-gl");
      mapboxgl.accessToken =
        "pk.eyJ1IjoiY2xpbWJhc3Npc3QiLCJhIjoiY2pmMDZ1ejBvMGpxZDJ3cWpiZ2w3c2w4NiJ9.Xwqm5bhXRQU-LrC2keGw3g";
      // init the map

      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/outdoors-v11",
        center: [this.crag.location.longitude, this.crag.location.latitude],
        zoom: this.crag.location.zoom,
      });

      this.mapLoaded(this.map, mapboxgl);
    },
    mapLoaded(map, mapboxgl) {
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
      map.scrollZoom.disable();
      map.boxZoom.disable();
      map.dragPan.disable();
      map.doubleClickZoom.disable();

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
        this.setPath();
        this.setParking();
        this.setPin();

        map.on("click", (e) => {
          if (!this.mapEdit) {
            return;
          } else {
            if (this.mapSelector === "location") {
              this.$store.commit("editor/updateLocation", e.lngLat);
              this.setPin();
            } else if (this.mapSelector === "parking") {
              this.$store.commit("editor/updateParking", e.lngLat);
              this.setParking();
            } else if (this.mapSelector === "path") {
              let point = [e.lngLat.lng, e.lngLat.lat];
              this.$store.commit("editor/addPathPoint", point);
            }
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
                  coordinates: [
                    this.location.longitude,
                    this.location.latitude,
                  ],
                },
              },
            ],
          },
        },
        type: "symbol",
        layout: {
          "icon-image": "cragPin",
          "icon-size": 0.7,
        },
      });
    },
    setParking() {
      if (this.map.getLayer("parking")) {
        this.map.removeLayer("parking");
        this.map.removeSource("parking");
      }
      let parkingPins = [];
      for (let i in this.parking) {
        let pin = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [this.parking[i].longitude, this.parking[i].latitude],
          },
        };
        parkingPins.push(pin);
      }
      this.map.addLayer({
        id: "parking",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: parkingPins,
          },
        },
        type: "symbol",
        layout: {
          "icon-image": "parkingPin",
          "icon-size": 0.7,
        },
      });
    },
    setPath() {
      if (this.map.getLayer("path")) {
        this.map.removeLayer("path");
        this.map.removeSource("path");
      }
      let pathLines = [];
      //paths from server
      if (this.currentPath) {
        for (let ci in this.currentPath) {
          let coordinates = [];
          for (let pi in this.currentPath[ci].pathPoints) {
            let geo = [
              this.currentPath[ci].pathPoints[pi].longitude,
              this.currentPath[ci].pathPoints[pi].latitude,
            ];
            coordinates.push(geo);
          }
          let currentLine = {
            type: "feature",
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          };
          pathLines.push(currentLine);
        }
      }
      //local paths
      for (let i in this.path) {
        if (this.path[i].length > 1) {
          let line = {
            type: "feature",
            geometry: {
              type: "LineString",
              coordinates: this.path[i],
            },
          };
          pathLines.push(line);
        }
      }

      this.map.addLayer({
        id: "path",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: pathLines,
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });
    },
  },
  mounted() {
    this.createMap();
  },
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
