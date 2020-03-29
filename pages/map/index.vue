<template>
  <div id="map"></div>
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
      subAreaThreshold: 9,
      areaThreshold: 7,
      stateThreshold: 5,
      zoom: null,
      cragZoom: false,
      currentRoutes: null,
      areaInfo: null,
      subAreaNames: [],
      pin: require("@/static/map_icon.png"),
      climbPin: require("@/static/climbing.png")
    };
  },
  watch: {
    filter: {
      handler() {
        if (this.map.getLayer("crags")) {
          this.map.removeLayer("crags");
          this.map.removeSource("crags");
        }
        if (this.map.getLayer("cragsText")) {
          this.map.removeLayer("cragsText");
          this.map.removeSource("cragsText");
        }
        if (this.map.getLayer("areas")) {
          this.map.removeLayer("areas");
          this.map.removeSource("areas");
        }
        if (this.map.getLayer("areasText")) {
          this.map.removeLayer("areasText");
          this.map.removeSource("areasText");
        }
        if (this.map.getLayer("subAreasText")) {
          this.map.removeLayer("subAreasText");
          this.map.removeSource("subAreasText");
        }
        setTimeout(() => {
          this.addLayers();
        }, 100);
      },
      deep: true
    },
    dataSet: {
      handler() {
        if (this.map.getLayer("crags")) {
          this.map.removeLayer("crags");
          this.map.removeSource("crags");
        }
        if (this.map.getLayer("cragsText")) {
          this.map.removeLayer("cragsText");
          this.map.removeSource("cragsText");
        }
        if (this.map.getLayer("areas")) {
          this.map.removeLayer("areas");
          this.map.removeSource("areas");
        }
        if (this.map.getLayer("areasText")) {
          this.map.removeLayer("areasText");
          this.map.removeSource("areasText");
        }
        if (this.map.getLayer("subAreasText")) {
          this.map.removeLayer("subAreasText");
          this.map.removeSource("subAreasText");
        }
        if (this.map.getLayer("subAreas")) {
          this.map.removeLayer("subAreas");
          this.map.removeSource("subAreas");
        }
        if (this.map.getLayer("subAreaNames")) {
          this.map.removeLayer("subAreaNames");
          this.map.removeSource("subAreaNames");
        }
        setTimeout(() => {
          this.addLayers();
          this.addSubAreaLayers();
        }, 100);
      }
    }
  },
  computed: {
    ...mapGetters({
      filteredRoutes: "filter/filteredRoutes"
    }),
    boundsDisable() {
      return this.$store.state.filter.boundsDisable;
    },
    dataSet() {
      return this.$store.state.filter.dataSet;
    },
    filter() {
      return this.$store.state.filter.filter;
    },
    cragPins() {
      var pins = [];
      for (let akey in this.filteredRoutes.areas) {
        for (let subkey in this.filteredRoutes.areas[akey].filteredSubAreas) {
          for (let ckey in this.filteredRoutes.areas[akey].filteredSubAreas[
            subkey
          ].filteredCrags) {
            let pin = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [
                  this.filteredRoutes.areas[akey].filteredSubAreas[subkey]
                    .filteredCrags[ckey].location.longitude,
                  this.filteredRoutes.areas[akey].filteredSubAreas[subkey]
                    .filteredCrags[ckey].location.latitude
                ]
              },
              properties: {
                title: this.filteredRoutes.areas[akey].filteredSubAreas[subkey]
                  .filteredCrags[ckey].name,
                area: this.filteredRoutes.areas[akey].slug,
                frame: this.filteredRoutes.areas[akey].filteredSubAreas[subkey]
                  .filteredCrags[ckey].slug,
                trad: this.filteredRoutes.areas[akey].filteredSubAreas[subkey]
                  .filteredCrags[ckey].trad,
                sport: this.filteredRoutes.areas[akey].filteredSubAreas[subkey]
                  .filteredCrags[ckey].sport,
                boulder: this.filteredRoutes.areas[akey].filteredSubAreas[
                  subkey
                ].filteredCrags[ckey].boulder,
                countryKey: this.filteredRoutes.areas[akey].filteredSubAreas[
                  subkey
                ].filteredCrags[ckey].countryKey,
                stateKey: this.filteredRoutes.areas[akey].filteredSubAreas[
                  subkey
                ].filteredCrags[ckey].stateKey,
                areaKey: this.filteredRoutes.areas[akey].filteredSubAreas[
                  subkey
                ].filteredCrags[ckey].areaKey,
                subAreaKey: this.filteredRoutes.areas[akey].filteredSubAreas[
                  subkey
                ].filteredCrags[ckey].subAreaKey,
                cragKey: this.filteredRoutes.areas[akey].filteredSubAreas[
                  subkey
                ].filteredCrags[ckey].cragKey
              }
            };
            pins.push(pin);
          }
        }
      }
      return pins;
    },
    areaPins() {
      var pins = [];
      for (let key in this.filteredRoutes.areas) {
        let mapnum = 0;
        for (let subkey in this.filteredRoutes.areas[key].filteredSubAreas) {
          mapnum += this.filteredRoutes.areas[key].filteredSubAreas[subkey]
            .filteredCrags.length;
        }
        let pin = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              this.filteredRoutes.areas[key].location.longitude,
              this.filteredRoutes.areas[key].location.latitude
            ]
          },
          properties: {
            title: this.filteredRoutes.areas[key].name,
            area: this.filteredRoutes.areas[key].slug,
            trad: this.filteredRoutes.areas[key].trad,
            sport: this.filteredRoutes.areas[key].sport,
            boulder: this.filteredRoutes.areas[key].boulder,
            countryKey: this.filteredRoutes.areas[key].countryKey,
            stateKey: this.filteredRoutes.areas[key].stateKey,
            areaKey: this.filteredRoutes.areas[key].areaKey,
            maps: mapnum
          }
        };
        pins.push(pin);
      }
      return pins;
    },
    subAreaPins() {
      var pins = [];
      for (let key in this.filteredRoutes.areas) {
        for (let subkey in this.filteredRoutes.areas[key].filteredSubAreas) {
          let mapnum = this.filteredRoutes.areas[key].filteredSubAreas[subkey]
            .filteredCrags.length;
          let pin = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                this.filteredRoutes.areas[key].filteredSubAreas[subkey].location.longitude,
                this.filteredRoutes.areas[key].filteredSubAreas[subkey].location.latitude
              ]
            },
            properties: {
              title: this.filteredRoutes.areas[key].filteredSubAreas[subkey].name,
              area: this.filteredRoutes.areas[key].slug,
              trad: this.filteredRoutes.areas[key].filteredSubAreas[subkey].trad,
              sport: this.filteredRoutes.areas[key].filteredSubAreas[subkey].sport,
              boulder: this.filteredRoutes.areas[key].filteredSubAreas[subkey].boulder,
              countryKey: this.filteredRoutes.areas[key].countryKey,
              stateKey: this.filteredRoutes.areas[key].stateKey,
              areaKey: this.filteredRoutes.areas[key].areaKey,
              maps: mapnum
            }
          };
          pins.push(pin);
        }
      }
      return pins;
    },
    subAreaFills() {
      let fills = [];
      let offset = 0.003;
      for (let key in this.$store.state.filter.countries) {
        for (let skey in this.$store.state.filter.countries[key].regions) {
          for (let akey in this.$store.state.filter.countries[key].regions[skey]
            .areas) {
            for (let subkey in this.$store.state.filter.countries[key].regions[
              skey
            ].areas[akey].subAreas) {
              if (
                this.$store.state.filter.countries[key].regions[skey].areas[akey]
                  .subAreas[subkey].fill
              ) {
                let title = {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates:[ this.$store.state.filter.countries[key].regions[skey]
                      .areas[akey].subAreas[subkey].fill.titleLoc[0],
                      this.$store.state.filter.countries[key].regions[skey]
                        .areas[akey].subAreas[subkey].fill.titleLoc[1] + offset
                    ]
                  },
                  properties: {
                    title: this.$store.state.filter.countries[key].regions[skey]
                      .areas[akey].subAreas[subkey].name
                  }
                };
                let fill = {
                  type: "Feature",
                  geometry: {
                    type: "Polygon",
                    coordinates: [
                      [
                        [
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.minLongitude - offset,
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.minLatitude - offset
                        ],
                        [
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.minLongitude - offset,
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.maxLatitude + offset
                        ],
                        [
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.maxLongitude + offset,
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.maxLatitude + offset
                        ],
                        [
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.maxLongitude + offset,
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.minLatitude - offset
                        ],
                        [
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.minLongitude - offset,
                          this.$store.state.filter.countries[key].regions[skey]
                            .areas[akey].subAreas[subkey].fill.minLatitude - offset
                        ]
                      ]
                    ]
                  }
                };
                this.subAreaNames.push(title);
                fills.push(fill);
              }
            }
          }
        }
      }
      return fills;
    }
  },
  methods: {
    createMap() {
      const mapboxgl = require("mapbox-gl");
      mapboxgl.accessToken =
        "pk.eyJ1IjoiY2xpbWJhc3Npc3QiLCJhIjoiY2pmMDZ1ejBvMGpxZDJ3cWpiZ2w3c2w4NiJ9.Xwqm5bhXRQU-LrC2keGw3g";
      // init the map
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v9",
        center: [-96, 37.8],
        zoom: 4
      });
      this.mapLoaded(this.map, mapboxgl);
    },
    mapLoaded(map, mapboxgl) {
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
      map.addControl(new mapboxgl.GeolocateControl({}));
      map.on("style.load", () => {
        let popup = new mapboxgl.Popup({
          closeButton: false
        });
       map.loadImage(this.pin, (error, image) => {
          if (error) throw error;
          map.addImage("pin", image);
        });
       map.loadImage(this.climbPin, (error, image) => {
          if (error) throw error;
          map.addImage("climbPin", image);
          this.addLayers();
          this.addSubAreaLayers();
        });

        //set zoom and move watchers
        map.on("zoomend", () => {
          let zoom = map.getZoom();
          this.zoom = map.getZoom();
          if (zoom < this.cragThreshold) {
            this.$store.commit("sidebar/updateSidebar", "mapareaV");
          } else {
            this.$store.commit("sidebar/updateSidebar", "mapcragV");
          }
        });
        map.on("moveend", () => {
          var bounds = map.getBounds();
          if (!this.$store.state.filter.boundsDisable) {
            this.$store.commit("filter/updateMapBounds", bounds);
          }
        });

        map.on("click", "crags", e => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["crags"]
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];
          this.$router.push({
            name: "crags-frame",
            params: {
              countryKey: feature.properties.countryKey,
              stateKey: feature.properties.stateKey,
              areaKey: feature.properties.areaKey,
              subAreaKey: feature.properties.subAreaKey,
              cragKey: feature.properties.cragKey,
              area: feature.properties.area,
              frame: feature.properties.frame
            }
          });
        });

        // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
        map.on("mousemove", "crags", e => {
          map.getCanvas().style.cursor = "pointer";
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["crags"]
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
        map.on("mouseleave", "crags", e => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        map.on("click", "cragsText", e => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["cragsText"]
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];
          this.$router.push({
            name: "crags-frame",
            params: {
              countryKey: feature.properties.countryKey,
              stateKey: feature.properties.stateKey,
              areaKey: feature.properties.areaKey,
              subAreaKey: feature.properties.subAreaKey,
              cragKey: feature.properties.cragKey,
              area: feature.properties.area,
              frame: feature.properties.frame
            }
          });
        });

        // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
        map.on("mousemove", "cragsText", e => {
          map.getCanvas().style.cursor = "pointer";
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["cragsText"]
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
        map.on("mouseleave", "cragsText", e => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        map.on("mousemove", "subAreasText", e => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          const features = map.queryRenderedFeatures(e.point, {
            layers: ["subAreasText"]
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
              " maps (" +
                feature.properties.maps +
                ")" +
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

        map.on("mouseleave", "subAreasText", () => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
        map.on("click", "subAreasText", e => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["subAreasText"]
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];
          this.$router.push({
            name: "areas-area",
            params: {
              countryKey: feature.properties.countryKey,
              stateKey: feature.properties.stateKey,
              areaKey: feature.properties.areaKey,
              area: feature.properties.area
            }
          });
        });

        map.on("mousemove", "areasText", e => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          const features = map.queryRenderedFeatures(e.point, {
            layers: ["areasText"]
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
              " maps (" +
                feature.properties.maps +
                ")" +
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

        map.on("mouseleave", "areasText", () => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
        map.on("click", "areasText", e => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["areasText"]
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];
          this.$router.push({
            name: "areas-area",
            params: {
              countryKey: feature.properties.countryKey,
              stateKey: feature.properties.stateKey,
              areaKey: feature.properties.areaKey,
              area: feature.properties.area
            }
          });
        });

        map.on("mousemove", "areas", e => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          const features = map.queryRenderedFeatures(e.point, {
            layers: ["areas"]
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

          // new popupContent(areaInfo).$mount("#vue-popup-content");
        });

        map.on("mouseleave", "areas", () => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
        map.on("click", "areas", e => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["areas"]
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];
          this.$router.push({
            name: "areas-area",
            params: {
              countryKey: feature.properties.countryKey,
              stateKey: feature.properties.stateKey,
              areaKey: feature.properties.areaKey,
              area: feature.properties.area
            }
          });
        });
      });
    },
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
            features: this.cragPins
          }
        },
        layout: {
          "icon-image": "climbPin",
          "icon-size": 0.7
        }
      });
      this.map.addLayer({
        id: "cragsText",
        type: "symbol",
        minzoom: this.cragTextThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.cragPins
          }
        },
        layout: {
          "icon-image": "climbPin",
          "icon-allow-overlap": true,
          "text-allow-overlap": true,
          "icon-size": 0.7,
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
      });
      this.map.addLayer({
        id: "areasText",
        type: "symbol",
        maxzoom: this.subAreaThreshold,
        minzoom: this.areaThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.areaPins
          }
        },
        layout: {
          "icon-image": "pin",
          "icon-size": 0.7,
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
      });

      this.map.addLayer({
        id: "subAreasText",
        type: "symbol",
        maxzoom: this.cragThreshold,
        minzoom: this.subAreaThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.subAreaPins
          }
        },
        layout: {
          "icon-image": "pin",
          "icon-size": 0.7,
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
      });

      this.map.addLayer({
        id: "areas",
        type: "symbol",
        maxzoom: this.areaThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.areaPins
          }
        },
        layout: {
          "icon-image": "pin",
          "icon-size": 0.7
        }
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
            features: this.subAreaFills
          }
        },
        paint: {
          "fill-color": "#449947",
          "fill-opacity": 0.4
        }
      });
      this.map.addLayer({
        id: "subAreaNames",
        type: "symbol",
        minzoom: this.cragThreshold,
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.subAreaNames
          }
        },
        layout: {
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, -0.6],
          "text-anchor": "bottom"
        }
      });
    }
  },
  created() {
    // this.$store.commit("filter/updateArea", this.areaState);
    this.$store.commit("filter/updateFilterText", "");
    this.$store.commit("filter/updateBoundsDisable", false)
  },
  mounted() {
    this.createMap();
    this.$store.commit("sidebar/updateSidebar", "mapareaV");
  },
  destroyed() {
    this.$store.commit("sidebar/updateSidebar", "defaultV");
    this.$store.commit("filter/updateBoundsDisable", true)
    this.$store.commit("filter/updateMapBounds", undefined);
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
<style>
.mapboxgl-canvas {
  left: 0;
}
</style>
