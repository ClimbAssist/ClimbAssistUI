<template>
  <v-container fluid>
    <v-form autocomplete="off">
      <v-container>
        <v-layout row>
          <v-text-field label="Country" :value="country.name" disabled />
        </v-layout>
        <v-layout row>
          <v-text-field label="Region" :value="region.name" disabled />
        </v-layout>
        <v-layout row>
          <v-text-field label="Area" :value="area.name" disabled />
        </v-layout>
        <v-layout row>
          <v-text-field label="Sub-Area" :value="subArea.name" disabled />
        </v-layout>
        <v-container>
          <v-layout row>
            <v-select
              :items="stateList"
              class="ma-2"
              v-model="state"
              label="Status"
            ></v-select>
          </v-layout>
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
          <v-layout row v-if="loading">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-layout>
          <v-container>
            <v-container v-if="crag.model">
              <v-layout align-center justify-center row>
                <v-btn
                  color="primary"
                  :disabled="loading"
                  @click="setModelView()"
                >
                  Edit Model Settings
                </v-btn>
              </v-layout>
            </v-container>
            <v-layout align-center justify-left row wrap>
              <v-flex xs6
                >3D Model
                <input
                  type="file"
                  accept=".glb"
                  ref="highResFile"
                  @change="newHighRes()"
              /></v-flex>
              <v-flex xs6
                >Low Res Model
                <input
                  type="file"
                  accept=".glb"
                  ref="lowResFile"
                  @change="newLowRes()"
              /></v-flex>
              <v-flex xs12>
                <v-btn
                  class="ma-2"
                  @click="submitFiles()"
                  :disabled="fileCheck"
                  color="primary"
                >
                  Submit Model Files
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-left row wrap>
              <v-container xs12>
                <v-img
                  v-if="crag.imageLocation"
                  :src="crag.imageLocation"
                  aspect-ratio="2"
                  contain
                  lazy
                >
                  <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-layout>
                </v-img>
              </v-container>
              <v-flex xs12
                >Image
                <input
                  type="file"
                  accept=".webp"
                  ref="imageFile"
                  @change="newImage()"
              /></v-flex>
            </v-layout>
          </v-container>

          <v-layout row align-center justify-center>
            <mapedit />
          </v-layout>
          <v-layout v-if="mapEdit" row align-center justify-center>
            <v-btn @click="toggleTile()">
              {{ tileButton }}
            </v-btn>
          </v-layout>
          <v-layout row align-center justify-center>
            <v-btn @click="toggleMap()">
              {{ mapButton }}
            </v-btn>
          </v-layout>
          <v-container v-if="mapEdit">
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
              <v-btn v-if="parkingCheck" color="green" @click="addParking()">
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
            <v-container
              align-center
              justify-center
              v-if="mapSelector === 'path'"
            >
              <v-layout align-center justify-center>
                <v-btn
                  color="green"
                  @click="addPath()"
                  v-if="path.length < 1"
                  class="ma-2"
                >
                  Add Path
                </v-btn>
                <v-btn
                  color="grey"
                  @click="removePath()"
                  v-if="path.length > 0"
                  class="ma-2"
                >
                  Cancel Path
                </v-btn>
                <v-btn
                  color="red"
                  @click="removePathPoint()"
                  v-if="path.length > 0 && path[path.length - 1].length > 0"
                  class="ma-2"
                >
                  Remove Point
                </v-btn>
                <v-btn
                  color="green"
                  @click="submitPath()"
                  v-if="path.length > 0 && path[path.length - 1].length > 1"
                  class="ma-2"
                >
                  submit Path
                </v-btn>
              </v-layout>
              <v-layout
                align-center
                justify-center
                v-for="(currentPath, ci) in currentPath"
                :key="ci"
              >
                path {{ ci }}
                <v-btn class="ma-2" color="red" @click="deletePath(ci)">
                  Delete Path
                </v-btn>
              </v-layout>
            </v-container>
          </v-container>
          <v-layout row align-center justify-center>
            location: {{ location }}
            <br />
            zoom: {{ zoom }}
            <br />
            parking: {{ parking }}
            <br />
            currentPath: {{ currentPath }}
            <br />
            path: {{ path }}
          </v-layout>
          <v-layout align-center justify-end row>
            <v-btn
              color="red"
              class="ma-2"
              @click="deleteCrag()"
              :disabled="cragDeleteCheck"
            >
              Delete
            </v-btn>
            <v-btn
              class="ma-2"
              color="primary"
              :disabled="formCheck"
              @click="updateCrag()"
            >
              Submit
            </v-btn>
          </v-layout>
          <v-card>
            <v-card-title class="primary headline white--text"
              >Walls</v-card-title
            >
          </v-card>
          <v-layout v-for="(currentWall, ci) in currentWalls" :key="ci">
            <v-text-field
              label="name"
              v-model="currentWall.name"
            ></v-text-field>
            <v-autocomplete
              label="After"
              :items="currentWall.orderList.listNames"
              v-model="afterList[ci]"
            />
            <v-btn
              class="ma-2"
              color="green"
              @click="updateWall(ci)"
              :disabled="wallCheck[ci]"
            >
              Update Wall
            </v-btn>
            <v-btn
              class="ma-2"
              color="red"
              @click="deleteWall(ci)"
              :disabled="deleteWallCheck[ci]"
            >
              Delete Wall
            </v-btn>
          </v-layout>
          <v-layout v-if="walls.length > 0">
            <v-text-field label="name" v-model="walls[0]"></v-text-field>
            <v-btn color="green" @click="addWall()" :disabled="newWallCheck">
              Submit
            </v-btn>
          </v-layout>
          <v-layout>
            <v-btn
              v-if="walls.length < 1"
              color="primary"
              @click="walls.push('')"
            >
              Add wall
            </v-btn>
            <v-btn v-if="walls.length > 0" color="red" @click="walls.pop()">
              remove wall
            </v-btn>
          </v-layout>
        </v-container>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import MapEdit from "./MapEdit.vue";
import _ from "lodash";
import { fetch } from "../../../mixins/fetchData.js";
export default {
  data() {
    return {
      name: undefined,
      description: undefined,
      state: undefined,
      stateList: ["PUBLIC", "IN_REVIEW"],
      walls: [],
      currentWalls: [],
      highResFile: undefined,
      lowResFile: undefined,
      imageFile: undefined,
      afterList: [],
      deleteWallCheck: [],
      loading: false,
      currentParking: [],
    };
  },
  computed: {
    cragDeleteCheck() {
      if (this.crag.walls.length > 0 || this.loading) {
        return true;
      } else {
        return false;
      }
    },
    mapButton() {
      if (this.$store.state.editor.mapEdit) {
        return "Stop Editing";
      } else {
        return "Edit Map";
      }
    },
    tileButton() {
      if (this.$store.state.editor.mapTile === "outdoors-v11") {
        return "Satelite";
      } else {
        return "Topo";
      }
    },
    crag() {
      return this.$store.state.editor.cragStateEditor;
    },
    modelSettings() {
      return this.$store.state.editor.modelSettings;
    },
    fileCheck() {
      if (this.highResFile && this.lowResFile && !this.loading) {
        return false;
      } else {
        return true;
      }
    },
    wallCheck() {
      let wallCheck = [];
      for (let key in this.crag.walls) {
        if (
          !this.loading &&
          (this.crag.walls[key].name !== this.currentWalls[key].name ||
            this.afterList[key] !==
              this.currentWalls[key].orderList.listNames[key])
        ) {
          wallCheck[key] = false;
        } else {
          wallCheck[key] = true;
        }
      }
      return wallCheck;
    },
    newWallCheck() {
      if (this.walls.length > 0 && this.walls[0].length > 0 && !this.loading) {
        return false;
      } else {
        return true;
      }
    },
    parkingCheck() {
      if (this.parking.length === 0) {
        return true;
      } else if (this.parking[this.parking.length - 1].latitude) {
        return true;
      } else {
        return false;
      }
    },
    formCheck() {
      if (
        !this.loading &&
        (this.name !== this.crag.name ||
          this.description !== this.crag.description ||
          this.location.latitude !== this.crag.location.latitude ||
          this.location.longitude !== this.crag.location.longitude ||
          this.zoom !== this.crag.location.zoom ||
          this.state !== this.crag.state)
      ) {
        return false;
      } else if (this.parking.length > 0 && this.currentParking.length > 0) {
        //compare values
        if (!this.parking[this.parking.length - 1].latitude) {
          //parking not selected
          return true;
        } else if (
          this.parking.length !== this.currentParking.length ||
          this.parking[this.currentParking.length - 1].latitude !==
            this.currentParking[this.currentParking.length - 1].latitude ||
          this.parking[this.currentParking.length - 1].longitude !==
            this.currentParking[this.currentParking.length - 1].longitude
        ) {
          //do not match
          return false;
        } else {
          //no comparison detected
          return true;
        }
      } else if (this.parking.length !== this.currentParking.length) {
        if (this.parkingCheck) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    country() {
      return this.$store.state.editor.country;
    },
    region() {
      return this.$store.state.editor.region;
    },
    area() {
      return this.$store.state.editor.area;
    },
    subArea() {
      return this.$store.state.editor.subArea;
    },
    zoom() {
      return this.$store.state.editor.zoom;
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
    currentPath() {
      return this.$store.state.editor.currentPath;
    },
    mapEdit() {
      return this.$store.state.editor.mapEdit;
    },
    mapSelector: {
      get() {
        return this.$store.state.editor.mapSelector;
      },
      set(value) {
        this.$store.commit("editor/updateMapSelector", value);
      },
    },
  },
  methods: {
    toggleMap() {
      this.$store.commit("editor/updateMapEdit");
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
    newHighRes() {
      this.highResFile = this.$refs.highResFile.files[0];
      console.log(this.highResFile);
    },
    newLowRes() {
      this.lowResFile = this.$refs.lowResFile.files[0];
      console.log(this.lowResFile);
    },
    newImage() {
      this.imageFile = this.$refs.imageFile.files[0];
      console.log(this.imageFile);
      this.submitImage();
    },
    async submitImage() {
      try {
        this.loading = true;
        var formData = new FormData();
        formData.set("photo.webp", this.imageFile);
        await this.$axios.post(
          "/v1/crags/" + this.crag.cragId + "/photo",
          formData
        );
        let crag = _.clone(this.crag);

        let api = await this.$axios.$get("/v1/crags/" + this.crag.cragId);
        crag.imageLocation = api.data.imageLocation;

        console.log(crag);

        this.$store.commit("editor/updateCrag", crag);
        this.loading = false;

        //success message
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "Image Uploaded (replaced images may take several minutes to change)"
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to upload image" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async submitFiles() {
      try {
        this.loading = true;
        var formData = new FormData();
        formData.set("high-resolution-model.glb", this.highResFile);
        formData.set("low-resolution-model.glb", this.lowResFile);
        await this.$axios.post(
          "/v1/crags/" + this.crag.cragId + "/models",
          formData
        );
        let crag = _.clone(this.crag);
        let api = await this.$axios.$get("/v1/crags/" + this.crag.cragId);
        crag.model = api.data.model;

        console.log(crag);

        this.$store.commit("editor/updateCrag", crag);
        this.loading = false;

        //success message
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "Models Uploaded (replaced models may take several minutes to change)"
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to upload models" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async submitPath() {
      try {
        this.loading = true;
        for (let i in this.path) {
          let obj = {
            cragId: this.crag.cragId,
          };
          let pathId = await this.$axios.$put("/v1/paths", obj);
          let points = {
            newPathPoints: [],
          };
          for (let pi in this.path[i]) {
            let point = {
              longitude: this.path[i][pi][0],
              latitude: this.path[i][pi][1],
            };
            points.newPathPoints.push(point);
          }
          console.log(points);

          let pointIds = await this.$axios.$put(
            "/v1/paths/" + pathId.data.pathId + "/path-points",
            points
          );
        }
        this.$store.commit("editor/clearPath");
        await this.fetchCrag();
        this.loading = false;
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Path Created");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.loading = false;
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
    },
    async deletePath(ci) {
      try {
        this.loading = true;
        if (this.currentPath[ci].pathPoints) {
          await this.$axios.delete(
            "/v1/paths/" + this.currentPath[ci].pathId + "/path-points"
          );
        }
        await this.$axios.delete("/v1/paths/" + this.currentPath[ci].pathId);

        await this.fetchCrag();
        this.loading = false;
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Path Deleted");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.loading = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to delete path" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async fetchCrag() {
      try {
        let api = await this.$axios.$get(
          "/v1/crags/" + this.crag.cragId + "?depth=2"
        );
        let crag = api.data;
        if (!crag.walls) {
          crag.walls = [];
        }
        for (let i in crag.walls) {
          if (!crag.walls[i].routes) {
            crag.walls[i].routes = [];
          }
        }
        this.$store.commit("editor/updateCrag", crag);
        if (crag.location.zoom) {
          this.$store.commit("editor/updateZoom", crag.location.zoom);
        }
        if (crag.location.longitude) {
          this.$store.commit("editor/updateLocation", {
            lng: crag.location.longitude,
            lat: crag.location.latitude,
          });
        }
        if (crag.parking) {
          this.currentParking = _.cloneDeep(crag.parking);
          this.$store.commit("editor/setParking", crag.parking);
        } else {
          this.$store.commit("editor/clearParking");
          this.currentParking = [];
        }
        if (crag.paths) {
          this.$store.commit("editor/setCurrentPath", crag.paths);
        } else {
          this.$store.commit("editor/setCurrentPath", undefined);
        }
      } catch (error) {
        this.loading = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to fetch crag" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    getCrag() {
      if (!this.name) {
        this.name = this.crag.name;
        this.description = this.crag.description;
        this.state = this.crag.state;
      }
      this.currentWalls = [];
      this.afterList = [];
      for (let wkey in this.crag.walls) {
        this.currentWalls.push(_.clone(this.crag.walls[wkey]));
        let obj = {
          listNames: ["first"],
          listIds: [null],
        };
        for (let ci in this.crag.walls) {
          if (wkey !== ci) {
            obj.listNames.push(this.crag.walls[ci].name);
            obj.listIds.push(this.crag.walls[ci].wallId);
          }
        }
        this.currentWalls[wkey].orderList = obj;
        if (wkey == 0) {
          this.afterList[wkey] = "first";
        } else {
          this.afterList[wkey] = this.crag.walls[parseInt(wkey) - 1].name;
        }
      }
    },
    getWallDeleteCheck() {
      for (let i in this.crag.walls) {
        if (this.crag.walls[i].routes.length > 0 && !this.loading) {
          this.deleteWallCheck[i] = true;
        } else {
          this.deleteWallCheck[i] = false;
        }
      }
    },
    setModelView() {
      this.$store.commit("editor/editView", "model");
    },
    async addWall() {
      try {
        this.loading = true;
        let wall = {
          name: this.walls[0],
          cragId: this.crag.cragId,
        };
        if (this.currentWalls.length === 0) {
          wall.first = true;
        }

        let wallId = await this.$axios.$put("/v1/walls", wall);

        if (this.currentWalls.length > 0) {
          this.currentWalls[this.currentWalls.length - 1].next =
            wallId.data.wallId;
          try {
            await this.$axios.$post(
              "/v1/walls",
              this.currentWalls[this.currentWalls.length - 1]
            );
          } catch (error) {
            console.log(message.error);
          }
        }

        let crag = _.clone(this.crag);

        let api = await this.$axios.$get(
          "/v1/crags/" + this.crag.cragId + "/walls?ordered=true"
        );
        let walls = api.data;
        crag.walls = walls;

        console.log(crag);

        this.$store.commit("editor/updateCrag", crag);
        this.getCrag();
        this.walls.pop();
        this.loading = false;

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
    },
    async deleteWall(ci) {
      try {
        this.loading = true;
        await this.$axios.delete("/v1/walls/" + this.currentWalls[ci].wallId);

        if (ci == 0 && this.currentWalls.length > 1) {
          this.currentWalls[parseInt(ci) + 1].first = true;
          try {
            await this.$axios.$post(
              "/v1/walls/",
              this.currentWalls[parseInt(ci) + 1]
            );
          } catch (error) {
            console.log(error.response.data.error.message);
          }
        } else if (this.currentWalls.length > 1) {
          if (this.currentWalls.length == parseInt(ci) + 1) {
            delete this.currentWalls[parseInt(ci) - 1].next;
          } else {
            this.currentWalls[parseInt(ci) - 1].next = this.currentWalls[
              parseInt(ci + 1)
            ].wallId;
          }
          try {
            await this.$axios.$post(
              "/v1/walls/",
              this.currentWalls[parseInt(ci) - 1]
            );
          } catch (error) {
            console.log(error.response.data.error.message);
          }
        }

        let crag = _.clone(this.crag);

        let api = await this.$axios.$get(
          "v1/crags/" + this.crag.cragId + "/walls?ordered=true"
        );
        let walls = api.data;
        crag.walls = walls;

        this.deleteWallCheck.splice(ci, 1);

        console.log(crag);

        this.$store.commit("editor/updateCrag", crag);
        this.getCrag();
        this.loading = false;

        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Wall Deleted");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to delete wall" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async deleteCrag() {
      try {
        await this.$axios.delete("/v1/crags/" + this.crag.cragId);
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Crag Deleted");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);

        this.$store.commit("filter/removeRoutes");
        this.$store.commit("filter/dataSet", false);
        this.fetchData();

        this.$router.push({
          name: "editor",
        });
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to delete crag" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async updateCrag() {
      try {
        this.loading = true;
        let obj = {
          subAreaId: this.crag.subAreaId,
          cragId: this.crag.cragId,
          name: this.name,
          description: this.description,
          location: {
            latitude: this.location.latitude,
            longitude: this.location.longitude,
            zoom: this.zoom,
          },
          state: this.state,
          parking: [],
        };
        for (let i in this.parking) {
          if (this.parking[i].latitude) {
            obj.parking.push(this.parking[i]);
          }
        }
        if (obj.parking.length < 1) {
          delete obj.parking;
        }
        if (this.crag.imageLocation) {
          obj.imageLocation = this.crag.imageLocation;
        }
        if (this.crag.model) {
          obj.model = {
            modelLocation: this.crag.model.modelLocation,
            lowResModelLocation: this.crag.model.lowResModelLocation,
          };
          if (this.crag.model.light) {
            obj.model.light = this.crag.model.light;
          }
          if (this.crag.model.scale) {
            obj.model.scale = this.crag.model.scale;
          }
          if (this.crag.model.modelAngle != undefined) {
            obj.model.modelAngle = this.crag.model.modelAngle;
          }
          if (this.crag.model.azimuth) {
            obj.model.azimuth = {
              minimum: this.crag.model.azimuth.minimum,
              maximum: this.crag.model.azimuth.maximum,
            };
          }
        }
        await this.$axios.post("/v1/crags", obj);
        await this.fetchCrag();
        this.loading = false;
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Crag Updated");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.loading = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to update crag" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async updateWall(ci) {
      let wall = {
        cragId: this.crag.cragId,
        wallId: this.currentWalls[ci].wallId,
        name: this.currentWalls[ci].name,
      };

      if (
        this.afterList[ci] !== this.currentWalls[ci].orderList.listNames[ci]
      ) {
        let key = this.currentWalls[ci].orderList.listNames.indexOf(
          this.afterList[ci]
        );
        let afterWall = undefined;
        let previousWall;

        //adjust new position
        if (key == 0) {
          wall.first = true;
          wall.next = this.currentWalls[0].wallId;

          afterWall = {
            wallId: this.currentWalls[0].wallId,
            cragId: this.crag.cragId,
            name: this.currentWalls[0].name,
          };
          if (
            this.currentWalls[0].next === wall.wallId &&
            this.currentWalls.length > 2
          ) {
            afterWall.next = this.currentWalls[2].wallId;
          } else if (this.currentWalls.length > 2) {
            afterWall.next = this.currentWalls[0].next;
          }
        } else {
          if (
            this.currentWalls[ci].orderList.listNames.length !==
            parseInt(key) + 1
          ) {
            wall.next = this.currentWalls[ci].orderList.listIds[
              parseInt(key) + 1
            ];
          }

          for (let i in this.currentWalls) {
            if (
              this.currentWalls[i].wallId ===
              this.currentWalls[ci].orderList.listIds[key]
            ) {
              afterWall = {
                wallId: this.currentWalls[i].wallId,
                cragId: this.crag.cragId,
                name: this.currentWalls[i].name,
                next: wall.wallId,
              };
              if (i == 1 && ci == 0) {
                afterWall.first = true;
              }
              break;
            }
          }
        }

        //adjust previous elements
        if (ci == 0) {
          previousWall = {
            wallId: this.currentWalls[1].wallId,
            cragId: this.crag.cragId,
            name: this.currentWalls[1].name,
            first: true,
          };
          if (this.currentWalls.length > 2) {
            previousWall.next = this.currentWalls[2].wallId;
          } else {
            previousWall.next = wall.wallId;
          }
        } else if (this.currentWalls.length !== parseInt(ci) + 1) {
          previousWall = {
            wallId: this.currentWalls[parseInt(ci) - 1].wallId,
            cragId: this.crag.cragId,
            name: this.currentWalls[parseInt(ci) - 1].name,
            next: this.currentWalls[parseInt(ci) + 1].wallId,
          };
          if (parseInt(ci) - 1 === 0) {
            previousWall.first = true;
          }
        } else {
          previousWall = {
            wallId: this.currentWalls[parseInt(ci) - 1].wallId,
            cragId: this.crag.cragId,
            name: this.currentWalls[parseInt(ci) - 1].name,
          };
          if (parseInt(ci) - 1 === 0) {
            previousWall.first = true;
          }
        }

        try {
          await this.$axios.$post("/v1/walls", previousWall);
          if (afterWall) {
            await this.$axios.$post("/v1/walls", afterWall);
          }
        } catch (error) {
          console.log(error.response.data.error.message);
        }
      } else {
        //no ordering
        if (this.currentWalls[ci].next) {
          wall.next = this.currentWalls[ci].next;
        }
        if (this.currentWalls[ci].first) {
          wall.first = this.currentWalls[ci].first;
        }
      }
      try {
        await this.$axios.$post("/v1/walls", wall);

        let crag = _.clone(this.crag);

        let api = await this.$axios.$get(
          "v1/crags/" + this.crag.cragId + "/walls?ordered=true"
        );
        let walls = api.data;
        crag.walls = walls;

        console.log(crag);

        this.$store.commit("editor/updateCrag", crag);
        this.getCrag();

        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Wall Updated");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to update wall" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
  },
  created() {
    this.getCrag();
    this.currentParking = _.cloneDeep(this.parking);
    this.getWallDeleteCheck();
  },
  mixins: [fetch],
  components: {
    mapedit: MapEdit,
  },
};
</script>
