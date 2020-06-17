<template>
  <v-container fluid>
    <v-form autocomplete="off">
      <v-container>
        <v-layout row>
          <v-select
            label="Country"
            :items="countriesList"
            item-value=""
            v-model="country"
          />
        </v-layout>
        <v-layout v-if="country" row>
          <v-autocomplete label="Region" :items="regionList" v-model="region" />
        </v-layout>
        <v-layout v-if="country && region" row>
          <v-autocomplete label="Area" :items="areaList" v-model="area" />
        </v-layout>
        <v-layout v-if="country && region && area" row>
          <v-autocomplete
            label="Sub-Area"
            :items="subAreaList"
            v-model="subArea"
          />
        </v-layout>
        <v-container v-if="country && region && area && subArea">
          <v-layout row>
            <v-text-field label="name" v-model="name"></v-text-field>
          </v-layout>
          <v-layout row>
            <v-textarea
              name="input-7-4"
              label="Crag Description"
              v-model="description"
            ></v-textarea>
          </v-layout>
          <v-layout row lign-center justify-center>
            <v-subheader>
              Click the map to set the location and zoom to the desired level.
            </v-subheader>
          </v-layout>
          <v-layout row align-center justify-center>
            <mapcreate />
          </v-layout>
          <v-layout row align-center justify-center>
            <v-btn @click="toggleTile()">
              {{ tileButton }}
            </v-btn>
          </v-layout>
          <v-layout row align-center justify-center>
            <v-radio-group v-model="mapSelector">
              <v-radio label="Location" value="location"></v-radio>
              <v-radio label="Parking" value="parking"></v-radio>
              <v-radio label="Path" value="path"></v-radio>
            </v-radio-group>
          </v-layout>
          <v-layout
            row
            align-center
            justify-center
            v-if="mapSelector === 'parking'"
          >
            <v-btn color="green" @click="addParking()">
              Add Parking
            </v-btn>
            <v-btn
              color="red"
              @click="removeParking()"
              v-if="parking.length > 0"
            >
              Remove Parking
            </v-btn>
          </v-layout>
          <v-layout
            row
            align-center
            justify-center
            v-if="mapSelector === 'path'"
          >
            <v-btn color="green" @click="addPath()">
              Add Path
            </v-btn>
            <v-btn color="red" @click="removePath()" v-if="path.length > 0">
              Remove Path
            </v-btn>
            <v-btn
              color="red"
              @click="removePathPoint()"
              v-if="path.length > 0 && path[path.length - 1].length > 0"
            >
              Remove Point
            </v-btn>
          </v-layout>
          <v-layout row align-center justify-center>
            location: {{ location }}
            <br />
            zoom: {{ zoom }}
            <br />
            parking: {{ parking }}
            <br />
            path: {{ path }}
          </v-layout>
          <v-container>
            <v-card>
              <v-card-title class="primary headline  white--text"
                >Walls (optional)</v-card-title
              >
            </v-card>
            <v-layout v-for="(wall, i) in walls" :key="i">
              <v-text-field label="name" v-model="walls[i]"></v-text-field>
            </v-layout>
            <v-layout>
              <v-btn class="my-2" color="primary" @click="walls.push('')">
                Add Wall
              </v-btn>
              <v-btn
                v-if="walls.length > 0"
                class="ma-2"
                color="red"
                @click="walls.pop()"
              >
                remove Wall
              </v-btn>
            </v-layout>
          </v-container>
          <v-layout align-center justify-end row>
            <v-btn color="primary" :disabled="formCheck" @click="submit()">
              Submit
            </v-btn>
          </v-layout>
        </v-container>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import MapCreate from "../../../components/editor/crag/MapCreate.vue";
import { fetch } from "../../../mixins/fetchData.js";
export default {
  middleware: "authentication",
  data() {
    return {
      countries: this.$store.state.filter.countries,
      country: null,
      region: null,
      area: null,
      subArea: null,
      name: null,
      description: null,
      slug: null,
      loading: false,
      walls: []
    };
  },
  computed: {
    location() {
      return this.$store.state.editor.location;
    },
    parking() {
      return this.$store.state.editor.parking;
    },
    path() {
      return this.$store.state.editor.path;
    },
    zoom() {
      return this.$store.state.editor.zoom;
    },
    tileButton() {
      if (this.$store.state.editor.mapTile === "outdoors-v11") {
        return "Satelite";
      } else {
        return "Topo";
      }
    },
    countriesList() {
      var countriesList = [];
      for (let key in this.countries) {
        countriesList.push(this.countries[key].name);
      }
      return countriesList;
    },
    regionList() {
      var regionList = [];
      for (let key in this.countries[this.countryIndex].regions) {
        regionList.push(this.countries[this.countryIndex].regions[key].name);
      }
      return regionList;
    },
    areaList() {
      var areaList = [];
      for (let key in this.countries[this.countryIndex].regions[
        this.regionIndex
      ].areas) {
        areaList.push(
          this.countries[this.countryIndex].regions[this.regionIndex].areas[key]
            .name
        );
      }
      return areaList;
    },
    subAreaList() {
      var subAreaList = [];
      for (let key in this.countries[this.countryIndex].regions[
        this.regionIndex
      ].areas[this.areaIndex].subAreas) {
        subAreaList.push(
          this.countries[this.countryIndex].regions[this.regionIndex].areas[
            this.areaIndex
          ].subAreas[key].name
        );
      }
      return subAreaList;
    },
    countryIndex() {
      for (let key in this.countriesList) {
        if (this.countriesList[key] === this.country) {
          return key;
        }
      }
    },
    regionIndex() {
      for (let key in this.regionList) {
        if (this.regionList[key] === this.region) {
          return key;
        }
      }
    },
    areaIndex() {
      for (let key in this.areaList) {
        if (this.areaList[key] === this.area) {
          return key;
        }
      }
    },
    subAreaIndex() {
      for (let key in this.subAreaList) {
        if (this.subAreaList[key] === this.subArea) {
          return key;
        }
      }
    },
    formCheck() {
      if (
        this.country &&
        this.region &&
        this.area &&
        this.name &&
        this.description &&
        this.location.latitude &&
        this.location.longitude &&
        this.zoom &&
        !this.loading
      ) {
        return false;
      } else {
        return true;
      }
    },
    subAreaId() {
      if (this.subArea) {
        return this.countries[this.countryIndex].regions[this.regionIndex]
          .areas[this.areaIndex].subAreas[this.subAreaIndex].subAreaId;
      }
    },
    areaId() {
      if (this.subArea) {
        return this.countries[this.countryIndex].regions[this.regionIndex]
          .areas[this.areaIndex].areaId;
      }
    },
    regionId() {
      if (this.subArea) {
        return this.countries[this.countryIndex].regions[this.regionIndex]
          .regionId;
      }
    },
    countryId() {
      if (this.subArea) {
        return this.countries[this.countryIndex].countryId;
      }
    },
    mapSelector: {
      get() {
        return this.$store.state.editor.mapSelector;
      },
      set(value) {
        this.$store.commit("editor/updateMapSelector", value);
      }
    }
  },
  watch: {
    name: {
      handler() {
        this.slug = this.string_to_slug(this.name);
      }
    },
    subAreaId: {
      handler() {
        this.$store.commit(
          "editor/updateSubArea",
          this.countries[this.countryIndex].regions[this.regionIndex].areas[
            this.areaIndex
          ].subAreas[this.subAreaIndex]
        );
      }
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      let crag = {
        subAreaId: this.subAreaId,
        name: this.name,
        description: this.description,
        location: {
          longitude: this.location.longitude,
          latitude: this.location.latitude,
          zoom: this.zoom
        },
        parking: []
      };
      for (let i in this.parking) {
        if (this.parking[i].latitude) {
          crag.parking.push(this.parking[i]);
        }
      }
      if (crag.parking.length < 1) {
        delete crag.parking;
      }
      try {
        let cragId = await this.$axios.$put("/v1/crags", crag);
        console.log("returned id");
        console.log(cragId);
        if (this.path.length > 0) {
          for (let i in this.path) {
            try {
              let obj = {
                cragId: cragId.data.cragId
              };
              let pathId = await this.$axios.$put("/v1/paths", obj);
              let points = {
                newPathPoints: []
              };
              for (let pi in this.path[i]) {
                let point = {
                  longitude: this.path[i][pi][0],
                  latitude: this.path[i][pi][1]
                };
                points.newPathPoints.push(point);
              }

              let pointIds = await this.$axios.$put(
                "/v1/paths/" + pathId.data.pathId + "/path-points",
                points
              );
            } catch (error) {
              this.$store.commit("snackbar/updateType", "error");
              this.$store.commit("snackbar/updateTimeout", 10000);
              this.$store.commit(
                "snackbar/updateMessage",
                "failed to create path" + error.response.data.error.message
              );
              this.$store.commit("snackbar/updateSnackbar", true);
              this.$store.commit("snackbar/updateLink", undefined);
              this.$store.commit("snackbar/updateLinkMessage", undefined);
              console.log(error.response.data.error.message);
            }
          }
        }

        if (this.walls.length > 0) {
          let revWalls = this.walls.reverse();
          let wallIds = [];
          for (let i in revWalls) {
            try {
              let wall;
              if (i == 0 && revWalls.length - 1 > i) {
                wall = {
                  cragId: cragId.data.cragId,
                  name: revWalls[i]
                };
              } else if (i == 0) {
                wall = {
                  cragId: cragId.data.cragId,
                  name: revWalls[i],
                  first: true
                };
              } else if (revWalls.length - 1 > i) {
                wall = {
                  cragId: cragId.data.cragId,
                  name: revWalls[i],
                  next: wallIds[parseInt(i) - 1].wallId
                };
              } else {
                wall = {
                  cragId: cragId.data.cragId,
                  name: revWalls[i],
                  next: wallIds[parseInt(i) - 1].wallId,
                  first: true
                };
              }

              let wallId = await this.$axios.$put("/v1/walls", wall);
              console.log(wallId.data);

              wallIds.push(wallId.data);

              this.$store.commit("snackbar/updateType", "success");
              this.$store.commit("snackbar/updateTimeout", 10000);
              this.$store.commit("snackbar/updateMessage", "Wall Created");
              this.$store.commit("snackbar/updateSnackbar", true);
              this.$store.commit("snackbar/updateLink", undefined);
              this.$store.commit("snackbar/updateLinkMessage", undefined);
            } catch (error) {
              this.$store.commit("snackbar/updateType", "error");
              this.$store.commit("snackbar/updateTimeout", 10000);
              this.$store.commit(
                "snackbar/updateMessage",
                "failed to create wall" + error.response.data.error.message
              );
              this.$store.commit("snackbar/updateSnackbar", true);
              this.$store.commit("snackbar/updateLink", undefined);
              this.$store.commit("snackbar/updateLinkMessage", undefined);
              console.log(error.response.data.error.message);
            }
          }
        } else {
          try {
            let wall = {
              cragId: cragId.data.cragId,
              name: this.name,
              first: true
            };
            await this.$axios.$put("/v1/walls", wall);
            this.$store.commit("snackbar/updateType", "success");
            this.$store.commit("snackbar/updateTimeout", 10000);
            this.$store.commit("snackbar/updateMessage", "Wall Created");
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/updateLink", undefined);
            this.$store.commit("snackbar/updateLinkMessage", undefined);
          } catch (error) {
            this.$store.commit("snackbar/updateType", "error");
            this.$store.commit("snackbar/updateTimeout", 10000);
            this.$store.commit(
              "snackbar/updateMessage",
              "failed to create wall" + error.response.data.error.message
            );
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/updateLink", undefined);
            this.$store.commit("snackbar/updateLinkMessage", undefined);
            console.log(error.response.data.error.message);
          }
        }
        this.loading = false;
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Crag Created");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);

        this.$store.commit("filter/removeRoutes");
        this.$store.commit("filter/dataSet", false);
        this.fetchData();

        this.$router.push({
          name: "editor-crag-edit",
          params: {
            edit: cragId.data.cragId
          }
        });
      } catch (error) {
        console.log(error.response.data.error.message);
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to create crag" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      }
    },
    toggleTile() {
      if (this.$store.state.editor.mapTile === "outdoors-v11") {
        this.$store.commit("editor/updateMapTile", "satellite-streets-v11");
      } else {
        this.$store.commit("editor/updateMapTile", "outdoors-v11");
      }
    },
    addParking() {
      this.$store.commit("editor/addParking");
    },
    removeParking() {
      this.$store.commit("editor/removeParking");
    },
    addPath() {
      this.$store.commit("editor/addPath");
    },
    removePath() {
      this.$store.commit("editor/removePath");
    },
    removePathPoint() {
      this.$store.commit("editor/removePathPoint");
    },
    string_to_slug(str) {
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      const to = "aaaaeeeeiiiioooouuuunc------";
      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

      return str;
    }
  },
  created() {
    this.$store.commit("editor/updateMapTile", "outdoors-v11");
  },
  destroyed() {
    //clear map
    this.$store.commit("editor/updateZoom", undefined);
    this.$store.commit("editor/updateLocation", {
      lng: undefined,
      lat: undefined
    });
    this.$store.commit("editor/updateMapSelector", "location");
    this.$store.commit("editor/clearParking");
    this.$store.commit("editor/clearPath");
  },
  components: {
    mapcreate: MapCreate
  },
  mixins: [fetch]
};
</script>
