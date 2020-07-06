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
      cragTextThreshold: 13,
      cragThreshold: 11,
      zoom: null,
      cragZoom: true,
      currentRoutes: null,
      areaInfo: null,
      pin: require("@/static/map_icon.png"),
      climbPin: require("@/static/climbing.png"),
      subAreaNames: [],
    };
  },
  watch: {
    filter: {
      handler() {
        if (this.map.getLayer("cragsText")) {
          this.map.removeLayer("cragsText");
          this.map.removeSource("cragsText");
        }
        if (this.map.getLayer("crags")) {
          this.map.removeLayer("crags");
          this.map.removeSource("crags");
        }
        if (this.map.getLayer("subAreaPins")) {
          this.map.removeLayer("subAreaPins");
          this.map.removeSource("subAreaPins");
        }
        setTimeout(() => {
          this.addLayers();
        }, 100);
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      area: "filter/area",
    }),
    filter() {
      return this.$store.state.filter.filter;
    },
    cragPins() {
      var pins = [];
      for (let subkey in this.area.filteredSubAreas) {
        for (let ckey in this.area.filteredSubAreas[subkey].filteredCrags) {
          let pin = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                this.area.filteredSubAreas[subkey].filteredCrags[ckey].location
                  .longitude,
                this.area.filteredSubAreas[subkey].filteredCrags[ckey].location
                  .latitude,
              ],
            },
            properties: {
              title: this.area.filteredSubAreas[subkey].filteredCrags[ckey]
                .name,
              area: this.area.slug,
              frame: this.area.filteredSubAreas[subkey].filteredCrags[ckey]
                .slug,
              subAreaKey: this.area.filteredSubAreas[subkey].subAreaKey,
              cragKey: this.area.filteredSubAreas[subkey].filteredCrags[ckey]
                .cragKey,
              trad: this.area.filteredSubAreas[subkey].filteredCrags[ckey].trad,
              sport: this.area.filteredSubAreas[subkey].filteredCrags[ckey]
                .sport,
              boulder: this.area.filteredSubAreas[subkey].filteredCrags[ckey]
                .boulder,
            },
          };
          pins.push(pin);
        }
      }
      return pins;
    },
    subAreaPins() {
      let pins = [];
      for (let subkey in this.area.filteredSubAreas) {
        let pin = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              this.area.filteredSubAreas[subkey].location.longitude,
              this.area.filteredSubAreas[subkey].location.latitude,
            ],
          },
          properties: {
            title: this.area.filteredSubAreas[subkey].name,
            trad: this.area.filteredSubAreas[subkey].trad,
            sport: this.area.filteredSubAreas[subkey].sport,
            boulder: this.area.filteredSubAreas[subkey].boulder,
          },
        };
        if (this.area.filteredSubAreas[subkey].fill) {
          let offset = 0.003;
          pin.properties.minLongitude =
            this.area.filteredSubAreas[subkey].fill.minLongitude - offset;
          pin.properties.minLatitude =
            this.area.filteredSubAreas[subkey].fill.minLatitude - offset;
          pin.properties.maxLongitude =
            this.area.filteredSubAreas[subkey].fill.maxLongitude + offset;
          pin.properties.maxLatitude =
            this.area.filteredSubAreas[subkey].fill.maxLatitude + offset;
        }
        pins.push(pin);
      }
      return pins;
    },
    subAreaFills() {
      let fills = [];
      let offset = 0.003;
      for (let subkey in this.area.area.subAreas) {
        if (this.area.area.subAreas[subkey].fill) {
          let title = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                this.area.area.subAreas[subkey].fill.titleLoc[0],
                this.area.area.subAreas[subkey].fill.titleLoc[1] + offset,
              ],
            },
            properties: {
              title: this.area.area.subAreas[subkey].name,
            },
          };
          let fill = {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    this.area.area.subAreas[subkey].fill.minLongitude - offset,
                    this.area.area.subAreas[subkey].fill.minLatitude - offset,
                  ],
                  [
                    this.area.area.subAreas[subkey].fill.minLongitude - offset,
                    this.area.area.subAreas[subkey].fill.maxLatitude + offset,
                  ],
                  [
                    this.area.area.subAreas[subkey].fill.maxLongitude + offset,
                    this.area.area.subAreas[subkey].fill.maxLatitude + offset,
                  ],
                  [
                    this.area.area.subAreas[subkey].fill.maxLongitude + offset,
                    this.area.area.subAreas[subkey].fill.minLatitude - offset,
                  ],
                  [
                    this.area.area.subAreas[subkey].fill.minLongitude - offset,
                    this.area.area.subAreas[subkey].fill.minLatitude - offset,
                  ],
                ],
              ],
            },
          };
          this.subAreaNames.push(title);
          fills.push(fill);
        }
      }
      return fills;
    },
  },
  methods: {
    addLayers() {
      this.map.addLayer({
        id: "crags",
        type: "symbol",
        minzoom: this.cragThreshold,
        maxzoom: this.cragTextThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.cragPins,
          },
        },
        layout: {
          "icon-image": "climbPin",
          "icon-size": 0.7,
        },
      });

      this.map.addLayer({
        id: "cragsText",
        type: "symbol",
        minzoom: this.cragTextThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.cragPins,
          },
        },
        layout: {
          "icon-image": "climbPin",
          "icon-allow-overlap": true,
          "text-allow-overlap": true,
          "icon-size": 0.7,
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top",
        },
      });
      this.map.addLayer({
        id: "subAreaPins",
        type: "symbol",
        maxzoom: this.cragThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.subAreaPins,
          },
        },
        layout: {
          "icon-image": "pin",
          "icon-allow-overlap": true,
          "icon-size": 0.7,
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top",
        },
      });
    },
    addSubAreaLayers() {
      this.map.addLayer({
        id: "subAreas",
        type: "fill",
        minzoom: this.cragThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.subAreaFills,
          },
        },
        paint: {
          "fill-color": "#449947",
          "fill-opacity": 0.4,
        },
      });
      this.map.addLayer({
        id: "subAreaNames",
        type: "symbol",
        minzoom: this.cragThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.subAreaNames,
          },
        },
        layout: {
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, -0.6],
          "text-anchor": "bottom",
        },
      });
    },
    createMap() {
      const mapboxgl = require("mapbox-gl");
      mapboxgl.accessToken =
        "pk.eyJ1IjoiY2xpbWJhc3Npc3QiLCJhIjoiY2pmMDZ1ejBvMGpxZDJ3cWpiZ2w3c2w4NiJ9.Xwqm5bhXRQU-LrC2keGw3g";
      // init the map
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/outdoors-v11",
        center: [
          this.area.area.location.longitude,
          this.area.area.location.latitude,
        ],
        zoom: 11,
        minZoom: 8,
      });
      if (this.area.area.fill) {
        this.map.fitBounds(
          [
            [this.area.area.fill.minLongitude, this.area.area.fill.minLatitude],
            [this.area.area.fill.maxLongitude, this.area.area.fill.maxLatitude],
          ],
          { padding: { top: 30, bottom: 30, left: 30, right: 30 } }
        );
      }
      this.mapLoaded(this.map, mapboxgl);
    },
    mapLoaded(map, mapboxgl) {
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
      map.on("style.load", () => {
        let popup = new mapboxgl.Popup({
          closeButton: false,
        });
        map.loadImage(this.pin, (error, image) => {
          if (error) throw error;
          map.addImage("pin", image);
        });
        map.loadImage(this.climbPin, (error, image) => {
          if (error) throw error;
          map.addImage("climbPin", image);
          // add crags
          this.addLayers();
          this.addSubAreaLayers();
        });

        //go to crag page on pin click
        map.on("click", "cragsText", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["cragsText"],
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];
          this.$router.push({
            name: "crags-frame",
            params: {
              subAreaKey: feature.properties.subAreaKey,
              cragKey: feature.properties.cragKey,
              area: feature.properties.area,
              frame: feature.properties.frame,
            },
          });
        });

        // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
        map.on("mousemove", "cragsText", (e) => {
          map.getCanvas().style.cursor = "pointer";
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["cragsText"],
          });
          if (!features.length) {
            return;
          }
          const feature = features[0];
          // Populate the popup and set its coordinates
          // based on the feature found.
          popup
            .setLngLat(feature.geometry.coordinates)
            .setText(
              " trad (" +
                feature.properties.trad +
                ")" +
                " sport (" +
                feature.properties.sport +
                ")" +
                " boulder (" +
                feature.properties.boulder +
                ")"
            )
            .addTo(map);
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "cragsText", (e) => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        //go to crag page on pin click
        map.on("click", "crags", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["crags"],
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];
          this.$router.push({
            name: "crags-frame",
            params: {
              subAreaKey: feature.properties.subAreaKey,
              cragKey: feature.properties.cragKey,
              area: feature.properties.area,
              frame: feature.properties.frame,
            },
          });
        });

        // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
        map.on("mousemove", "crags", (e) => {
          map.getCanvas().style.cursor = "pointer";
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["crags"],
          });
          if (!features.length) {
            return;
          }
          const feature = features[0];
          // Populate the popup and set its coordinates
          // based on the feature found.
          popup
            .setLngLat(feature.geometry.coordinates)
            .setText(feature.properties.title)
            .addTo(map);
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "crags", (e) => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        //reframe on subArea when click on pin
        map.on("click", "subAreaPins", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["subAreaPins"],
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];
          if (
            feature.properties.maxLatitude &&
            feature.properties.maxLongitude &&
            feature.properties.minLongitude &&
            feature.properties.minLatitude
          ) {
            map.fitBounds(
              [
                [
                  feature.properties.minLongitude,
                  feature.properties.minLatitude,
                ],
                [
                  feature.properties.maxLongitude,
                  feature.properties.maxLatitude,
                ],
              ],
              {
                padding: { top: 30, bottom: 30, left: 30, right: 30 },
              }
            );
          } else {
            map.setCenter(feature.geometry.coordinates);
            map.setZoom(this.cragThreshold);
          }
        });

        // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
        map.on("mousemove", "subAreaPins", (e) => {
          map.getCanvas().style.cursor = "pointer";
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["subAreaPins"],
          });
          if (!features.length) {
            return;
          }
          const feature = features[0];
          // Populate the popup and set its coordinates
          // based on the feature found.
          popup
            .setLngLat(feature.geometry.coordinates)
            .setText(
              " trad (" +
                feature.properties.trad +
                ")" +
                " sport (" +
                feature.properties.sport +
                ")" +
                " boulder (" +
                feature.properties.boulder +
                ")"
            )
            .addTo(map);
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "subAreaPins", (e) => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    },
  },
  mounted() {
    this.createMap();
  },
  destroyed() {
    this.$store.commit("filter/updateMapBounds", undefined);
  },
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
