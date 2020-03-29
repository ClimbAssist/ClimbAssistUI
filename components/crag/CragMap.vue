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
    ...mapGetters({
      crag: "filter/crag"
    })
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
        center: [
          this.crag.crag.location.longitude,
          this.crag.crag.location.latitude
        ],
        zoom: this.crag.crag.location.zoom
      });
      this.mapLoaded(this.map, mapboxgl);
    },
    mapLoaded(map, mapboxgl) {
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );
      map.on("style.load", () => {
        let popup = new mapboxgl.Popup({
          closeButton: false
        });
        map.addSource("paths", {
          type: "geojson",
          data: "https://s3-us-west-2.amazonaws.com/map-data-172776452117-us-west-2/Trails.json"
        });
        map.addSource("parking", {
          type: "geojson",
          data: "https://s3-us-west-2.amazonaws.com/map-data-172776452117-us-west-2/ParkingPoint.json"
        });
        map.addLayer({
          id: "trails",
          source: "paths",
          type: "line",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#888",
            "line-width": 8
          },
          filter: ["==", "Area", this.crag.crag.subAreaId]
        });
        map.loadImage(this.parking_pin, (error, image) => {
          if (error) throw error;
          map.addImage("pin", image);
          map.addLayer({
            id: "parking",
            source: "parking",
            type: "symbol",
            layout: {
              "icon-image": "pin",
              "icon-size": 1
            },
            filter: ["==", "Area", this.crag.crag.subAreaId]
          });
        });
        map.loadImage(this.crag_pin, (error, image) => {
          if (error) throw error;
          map.addImage("cragPin", image);
          map.addLayer({
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
                        this.crag.crag.location.longitude,
                        this.crag.crag.location.latitude
                      ]
                    },
                    properties: {
                      title: this.crag.name
                    }
                  }
                ]
              }
            },
            type: "symbol",
            layout: {
              "icon-image": "cragPin",
              "icon-size": 0.7,
              "text-field": "{title}",
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.6],
              "text-anchor": "top"
            }
          });
        });
        map.on("mousemove", "parking", e => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          const features = map.queryRenderedFeatures(e.point, {
            layers: ["parking"]
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup
            .setLngLat(feature.geometry.coordinates)
            .setText("Open in Google Maps")
            .addTo(map);

          // new popupContent(areaInfo).$mount("#vue-popup-content");
        });

        map.on("mouseleave", "parking", () => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
        map.on("click", "parking", e => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["parking"]
          });
          if (!features.length) {
            return;
          }

          const feature = features[0];

          let Lat = feature.geometry.coordinates[1].toFixed(6);
          let Long = feature.geometry.coordinates[0].toFixed(6);
          let ns;
          let ew;
          if (Lat > 0) {
            ns = "N";
          } else {
            ns = "S";
          }
          if (Long > 0) {
            ew = "E";
          } else {
            ew = "W";
          }

          let LatD = Math.floor(Math.abs(Lat));
          let LatM = Math.floor(Math.abs(Math.abs(Lat) - LatD) * 60);
          let LatS = ((Math.abs(Math.abs(Lat) - LatD) - LatM / 60) * 3600).toFixed(1);
          //
          let LongD = Math.floor(Math.abs(Long));
          let LongM = Math.floor(Math.abs(Math.abs(Long) - LongD) * 60);
          let LongS = ((Math.abs(Math.abs(Long) - LongD) - LongM / 60) * 3600).toFixed(1);
          window.open(
            "https://www.google.com/maps/place/" +
              LatD +
              "°" +
              LatM +
              "'" +
              LatS +
              '"' +
              ns +
              "+" +
              LongD +
              "°" +
              LongM +
              "'" +
              LongS +
              '"' +
              ew +
              "/@" +
              Lat +
              "," +
              Long +
              "," +
              this.crag.crag.location.zoom +
              "z"
          );
        });
      });
    }
  },
  mounted() {
    this.createMap();
  },
  activated() {
    setTimeout(() =>{this.map.resize()}, 200)
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
