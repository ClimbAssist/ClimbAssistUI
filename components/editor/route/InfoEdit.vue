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
        <v-layout row>
          <v-text-field label="Crag" :value="crag.name" disabled />
        </v-layout>
        <v-layout row>
          <v-select
            label="Wall"
            :items="wallList"
            v-model="selectedWall"
            @input="(addRoute = false), (panel = null), updateRouteList()"
        /></v-layout>
        <v-container v-if="selectedWall">
          <v-expansion-panels v-model="panel">
            <v-expansion-panel
              v-for="(route, ri) in routeList"
              :key="ri + '-routes'"
              @input="(addRoute = false), (newPitch = [])"
            >
              <v-expansion-panel-header :id="route.slug">
                <p class="text-left">
                  {{ routeState[ri].name }}
                  <span v-if="routeState[ri].style === 'boulder'">V</span
                  ><span
                    v-if="
                      routeState[ri].style === 'sport' ||
                        routeState[ri].style === 'trad'
                    "
                    >5.</span
                  >{{ routeState[ri].grade }}{{ routeState[ri].gradeModifier
                  }}{{ routeState[ri].danger }}
                  <span>{{ routeState[ri].style }}</span>
                  <span v-if="route.pitches.length > 1">
                    &nbsp;{{ route.pitches.length }} pitches</span
                  >
                </p>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-layout v-if="crag.model" row>
                  <v-btn @click="editModel(ri)">Edit 3d</v-btn>
                </v-layout>
                <v-layout align-center justify-left row wrap>
                  <v-flex xs12>
                    <v-img
                      v-if="route.mainImageLocation"
                      :src="route.mainImageLocation"
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
                  </v-flex>
                  <v-flex xs12
                    >Image
                    <input
                      type="file"
                      accept=".webp"
                      :id="route.routeId"
                      @change="newImage(ri)"
                  /></v-flex>
                </v-layout>

                <v-layout row>
                  <v-text-field
                    label="name"
                    v-model="route.name"
                  ></v-text-field>
                </v-layout>
                <v-layout row>
                  <v-select
                    label="style"
                    :items="styleList"
                    v-model="route.style"
                  />
                  <v-autocomplete
                    label="After"
                    :items="route.orderList.listNames"
                    v-model="afterList[ri]"
                  />
                </v-layout>
                <v-layout v-if="route.style !== 'boulder'" row>
                  <v-text-field
                    label="protection"
                    v-model="route.protection"
                  ></v-text-field>
                </v-layout>
                <v-layout row v-if="route.pitches.length > 1">
                  <v-textarea
                    name="input-7-4"
                    label="Description"
                    v-model="route.description"
                  ></v-textarea>
                </v-layout>
                <v-layout row justify-end>
                  <v-btn
                    class="mx-2"
                    color="red"
                    @click="deleteRoute(ri)"
                    :disabled="route.pitches.length > 0 || loading"
                  >
                    Delete Route
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    color="primary"
                    @click="updateRoute(ri)"
                    :disabled="routeCheck || loading"
                  >
                    Update Route
                  </v-btn>
                </v-layout>
                <v-container
                  v-for="(pitch, pi) in route.pitches"
                  :key="pi + '-pitches'"
                >
                  <v-layout v-if="route.style !== 'boulder'" row>
                    <h3>pitch {{ pi + 1 }}:</h3>
                  </v-layout>
                  <v-layout row>
                    <v-textarea
                      name="input-7-4"
                      label="Pitch Description"
                      v-model="pitch.description"
                    ></v-textarea>
                  </v-layout>
                  <v-layout row>
                    <v-autocomplete
                      label="grade"
                      :items="gradeList"
                      v-model="pitch.grade"
                      auto-select-first
                    />
                    <v-autocomplete
                      v-if="route.style === 'boulder'"
                      label="grade modifier"
                      v-model="pitch.gradeModifier"
                      :items="boulderModList"
                      clearable
                      auto-select-first
                    />
                    <v-autocomplete
                      v-if="route.style !== 'boulder'"
                      label="grade modifier"
                      v-model="pitch.gradeModifier"
                      :items="modList"
                      clearable
                      auto-select-first
                    />
                    <v-autocomplete
                      label="danger"
                      v-model="pitch.danger"
                      :items="dangerList"
                      clearable
                      auto-select-first
                    />
                    <v-btn
                      color="primary"
                      class="mx-2"
                      @click="updatePitch(ri, pi)"
                      :disabled="pitchCheck[pi] || loading"
                    >
                      Update Pitch
                    </v-btn>
                    <v-btn
                      color="red"
                      class="mx-2"
                      @click="deletePitch(ri, pi)"
                      :disabled="route.pitches.length - 1 > pi || loading"
                    >
                      Delete Pitch
                    </v-btn>
                  </v-layout>
                </v-container>
                <v-container v-if="newPitch.length > 0">
                  <v-layout row>
                    <h3>pitch {{ route.pitches.length + 1 }}:</h3>
                  </v-layout>
                  <v-layout row>
                    <v-textarea
                      name="input-7-4"
                      label="Pitch Description"
                      v-model="newPitch[0].description"
                    ></v-textarea>
                  </v-layout>
                  <v-layout row>
                    <v-autocomplete
                      label="grade"
                      :items="gradeList"
                      v-model="newPitch[0].grade"
                      auto-select-first
                    />
                    <v-autocomplete
                      v-if="style === 'boulder'"
                      label="grade modifier"
                      v-model="newPitch[0].gradeModifier"
                      :items="boulderModList"
                      clearable
                      auto-select-first
                    />
                    <v-autocomplete
                      v-if="style !== 'boulder'"
                      label="grade modifier"
                      v-model="newPitch[0].gradeModifier"
                      :items="modList"
                      clearable
                      auto-select-first
                    />
                    <v-autocomplete
                      label="danger"
                      v-model="newPitch[0].danger"
                      :items="dangerList"
                      clearable
                      auto-select-first
                    />
                    <v-btn
                      color="primary"
                      @click="createNewPitch(ri)"
                      :disabled="newPitchCheck || loading"
                    >
                      Submit Pitch
                    </v-btn>
                  </v-layout>
                </v-container>
                <v-layout row v-if="route.style !== 'boulder'">
                  <v-btn
                    v-if="newPitch.length === 0"
                    color="primary"
                    @click="
                      newPitch.push({
                        grade: '',
                        gradeModifier: '',
                        danger: '',
                        description: '',
                        routeId: route.routeId
                      })
                    "
                    >Add Pitch</v-btn
                  >
                  <v-btn
                    v-if="newPitch.length > 0"
                    color="red"
                    @click="newPitch.pop()"
                    >Remove</v-btn
                  >
                </v-layout>
                <v-layout row>
                  <div>Photos</div>
                </v-layout>
                <v-layout
                  row
                  v-for="(photo, phi) in route.photos"
                  :key="phi + '-photos'"
                >
                  <v-img :src="photo.src" aspect-ratio="4" contain />
                  <v-btn>Remove Photo</v-btn>
                </v-layout>

                <v-layout>
                  <v-expansion-panel>
                    <v-expansion-panel-content
                      v-for="(comment, ci) in route.comments"
                      :key="ci + '-comments'"
                    >
                      <div slot="header">Comments</div>
                      <v-card>
                        <v-layout row>
                          <v-card-text>
                            <h3>{{ comment.user }}</h3>
                          </v-card-text>
                        </v-layout>
                        <v-layout row>
                          <v-card-text>
                            <p>{{ comment.comment }}</p>
                          </v-card-text>
                        </v-layout>
                        <v-layout row>
                          <v-btn>Remove Comment</v-btn>
                        </v-layout>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-layout>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-btn v-if="!addRoute" @click="clearRouteInfo()">Add Route</v-btn>
        </v-container>
        <v-container v-if="addRoute">
          <v-layout row>
            <v-text-field label="name" v-model="name"></v-text-field>
          </v-layout>
          <v-layout row>
            <v-select label="style" :items="styleList" v-model="style" />
          </v-layout>
          <v-container v-if="style">
            <v-layout v-if="style !== 'boulder'" row>
              <v-text-field
                label="protection"
                v-model="protection"
              ></v-text-field>
            </v-layout>
            <v-container
              v-for="(pitch, npi) in pitches"
              :key="npi + '-pitches'"
            >
              <v-layout row v-if="style !== 'boulder'">
                <h3>pitch {{ npi + 1 }}:</h3>
              </v-layout>
              <v-layout row>
                <v-textarea
                  name="input-7-4"
                  label="Description"
                  v-model="pitch.description"
                ></v-textarea>
              </v-layout>
              <v-layout row>
                <v-autocomplete
                  label="grade"
                  :items="gradeList"
                  v-model="pitch.grade"
                  auto-select-first
                />
                <v-autocomplete
                  v-if="style === 'boulder'"
                  label="grade modifier"
                  v-model="pitch.gradeModifier"
                  :items="boulderModList"
                  clearable
                  auto-select-first
                />
                <v-autocomplete
                  v-if="style !== 'boulder'"
                  label="grade modifier"
                  v-model="pitch.gradeModifier"
                  :items="modList"
                  clearable
                  auto-select-first
                />
                <v-autocomplete
                  label="danger"
                  v-model="pitch.danger"
                  :items="dangerList"
                  clearable
                  auto-select-first
                />
              </v-layout>
            </v-container>
            <v-layout row v-if="style !== 'boulder'">
              <v-btn
                color="primary"
                @click="
                  pitches.push({
                    grade: '',
                    gradeModifier: '',
                    description: ''
                  })
                "
                >Add Pitch</v-btn
              >
              <v-btn
                v-if="pitches.length > 1"
                color="red"
                @click="pitches.pop()"
                >Remove Pitch</v-btn
              >
            </v-layout>
          </v-container>
          <v-container v-if="pitches.length > 1">
            <v-layout row>
              <v-textarea
                name="input-7-4"
                label="Route Description (For Multi-Pitch Routes - This is displayed when selected in the 3D viewer)"
                v-model="description"
              ></v-textarea>
            </v-layout>
          </v-container>
          <v-layout v-if="formCheck" row>
            {{ formMessage }}
          </v-layout>
          <v-layout row align-center justify-end>
            <v-btn @click="addRoute = false">cancel</v-btn>
            <v-btn
              color="primary"
              @click="(addRoute = false), pushRoute()"
              :disabled="formCheck"
              >submit</v-btn
            >
          </v-layout>
        </v-container>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import _ from "lodash";
export default {
  data() {
    return {
      selectedWall: null,
      selectedRoute: null,
      name: "",
      description: "",
      protection: "",
      style: null,
      styleList: ["trad", "sport", "boulder"],
      gradeList: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16"
      ],
      gradeComparison: ["-", "", "+", "a", "b", "c", "d"],
      modList: ["a", "a/b", "b", "b/c", "c", "c/d", "d"],
      boulderModList: ["-", "+"],
      dangerList: ["PG13", "R", "X"],
      pitches: [],
      addRoute: false,
      panel: null,
      routeList: [],
      afterList: [],
      newPitch: [],
      loading: false
    };
  },
  computed: {
    crag() {
      return this.$store.state.editor.cragStateEditor;
    },
    routeState() {
      return this.$store.state.editor.routeStateEditor;
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
    grade() {
      let grade = 0;
      for (let i in this.pitches) {
        if (this.pitches[i].grade > grade) {
          grade = this.pitches[i].grade;
        }
      }
      return grade;
    },
    gradeModifier() {
      let check = 0;
      let gradeModifier = "";
      for (let i in this.pitches) {
        if (this.pitches[i].grade == this.grade) {
          var res = this.pitches[i].gradeModifier.charAt(0);
          for (let comp in this.gradeComparison) {
            if (res === this.gradeComparison[comp] && check < comp) {
              check = comp;
              gradeModifier = this.pitches[i].gradeModifier;
            }
          }
        }
      }
      return gradeModifier;
    },
    wallList() {
      var wallList = [];
      for (let key in this.crag.walls) {
        wallList.push(this.crag.walls[key].name);
      }
      return wallList;
    },
    wallIndex() {
      for (let key in this.wallList) {
        if (this.wallList[key] === this.selectedWall) {
          return key;
        }
      }
    },
    newPitchCheck() {
      if (
        this.newPitch[0].grade !== "" &&
        this.newPitch[0].description !== ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    pitchCheck() {
      let pitchCheck = [];
      if (this.panel != null) {
        for (let pi in this.routeList[this.panel].pitches) {
          if (
            this.routeList[this.panel].pitches[pi].grade !== "" &&
            this.routeList[this.panel].pitches[pi].description !== ""
          ) {
            let check = true;
            if (
              this.routeList[this.panel].pitches[pi].grade !==
              this.routeState[this.panel].pitches[pi].grade.toString()
            ) {
              //grade doesn't match
              check = false;
            }
            if (
              this.routeList[this.panel].pitches[pi].description !==
              this.routeState[this.panel].pitches[pi].description
            ) {
              //description doesn't match
              check = false;
            }
            if (
              (this.routeState[this.panel].pitches[pi].gradeModifier &&
                this.routeList[this.panel].pitches[pi].gradeModifier !==
                  this.routeState[this.panel].pitches[pi].gradeModifier) ||
              (!this.routeState[this.panel].pitches[pi].gradeModifier &&
                this.routeList[this.panel].pitches[pi].gradeModifier &&
                this.routeList[this.panel].pitches[pi].gradeModifier !== "")
            ) {
              //grade modifier doesn't match
              check = false;
            }

            if (
              (this.routeState[this.panel].pitches[pi].danger &&
                this.routeList[this.panel].pitches[pi].danger !==
                  this.routeState[this.panel].pitches[pi].danger) ||
              (!this.routeState[this.panel].pitches[pi].danger &&
                this.routeList[this.panel].pitches[pi].danger &&
                this.routeList[this.panel].pitches[pi].danger !== "")
            ) {
              // danger doesn't match
              check = false;
            }
            pitchCheck.push(check);
          } else {
            pitchCheck.push(true);
          }
        }
      }

      return pitchCheck;
    },
    routeCheck() {
      if (this.panel != null) {
        if (this.routeList[this.panel].name !== "") {
          if (this.routeState[this.panel].description) {
            if (
              this.routeList[this.panel].description !==
              this.routeState[this.panel].description
            ) {
              //description changed
              return false;
            }
          } else if (this.routeList[this.panel].description !== "") {
            {
              //new description
              return false;
            }
          }
          if (
            this.routeList[this.panel].style !==
            this.routeState[this.panel].style
          ) {
            //style changed
            return false;
          }
          if (this.routeState[this.panel].protection) {
            if (
              this.routeList[this.panel].protection !==
              this.routeState[this.panel].protection
            ) {
              //protection changed
              return false;
            }
          } else if (this.routeList[this.panel].protection !== "") {
            //new protection
            return false;
          }
          if (
            this.routeList[this.panel].name !== this.routeState[this.panel].name
          ) {
            //name changed
            return false;
          }
          if (
            this.afterList[this.panel] !==
            this.routeList[this.panel].orderList.listNames[this.panel]
          ) {
            //order changed
            return false;
          }
          return true;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    routeIndex() {
      for (let key in this.routeList) {
        if (this.routeList[key] === this.selectedRoute) {
          return key;
        }
      }
    },
    formCheck() {
      if (this.name && this.style) {
        for (let i in this.pitches) {
          if (!this.pitches[i].grade || !this.pitches[i].description) {
            this.formMessage = "Set grade and Description for each pitch";
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    editModel(ri) {
      this.$store.commit("editor/editView", "model");
      this.$store.commit("editor/updateActiveRoute", [this.wallIndex, ri]);
    },
    clearRouteInfo() {
      this.panel = null;

      setTimeout(() => {
        this.addRoute = true;
        if (this.routeList) {
          this.selectedRoute = this.routeList[this.routeList.length - 1];
        }
        (this.name = ""), (this.style = "");
        this.description = "";
        this.protection = "";
        this.pitches = [
          {
            grade: "",
            gradeModifier: "",
            description: "",
            danger: ""
          }
        ];
      }, 100);
    },
    async pushRoute() {
      let crag = _.clone(this.crag);
      console.log(crag);
      let route = {
        name: this.name,
        wallId: this.crag.walls[this.wallIndex].wallId,
        style: this.style
      };

      if (this.description != "") {
        route.description = this.description;
      }
      if (this.protection != "") {
        route.protection = this.protection;
      }
      if (this.routeList.length === 0) {
        route.first = true;
      }
      try {
        this.loading = true;
        console.log("route");
        console.log(route);
        let routeId = await this.$axios.$put("/v1/routes", route);
        console.log("routeId");
        console.log(routeId);
        if (this.pitches.length > 1) {
          let revPitches = this.pitches.reverse();
          let pitchIds = [];
          for (let i in revPitches) {
            let pitch = {
              grade: parseInt(revPitches[i].grade),
              routeId: routeId.data.routeId,
              description: revPitches[i].description
            };
            if (revPitches[i].danger != "") {
              pitch.danger = revPitches[i].danger;
            }
            if (revPitches[i].gradeModifier != "") {
              pitch.gradeModifier = revPitches[i].gradeModifier;
            }
            if (i != 0) {
              pitch.next = pitchIds[parseInt(i) - 1];
            }
            if (i == revPitches.length - 1) {
              pitch.first = true;
            }
            try {
              console.log("pitch");
              console.log(pitch);
              let pitchId = await this.$axios.$put("/v1/pitches", pitch);
              pitchIds.push(pitchId.data.pitchId);
            } catch (error) {
              this.$store.commit("snackbar/updateType", "error");
              this.$store.commit("snackbar/updateTimeout", 10000);
              this.$store.commit(
                "snackbar/updateMessage",
                "failed to create pitch" + error.response.data.error.message
              );
              this.$store.commit("snackbar/updateSnackbar", true);
              this.$store.commit("snackbar/updateLink", undefined);
              this.$store.commit("snackbar/updateLinkMessage", undefined);
              console.log(error.response.data.error.message);
            }
          }
        } else {
          let pitch = {
            grade: parseInt(this.pitches[0].grade),
            routeId: routeId.data.routeId,
            description: this.pitches[0].description,
            first: true
          };
          if (this.pitches[0].danger != "") {
            pitch.danger = this.pitches[0].danger;
          }
          if (this.pitches[0].gradeModifier != "") {
            pitch.gradeModifier = this.pitches[0].gradeModifier;
          }
          try {
            console.log("pitch");
            console.log(pitch);
            await this.$axios.$put("/v1/pitches", pitch);
          } catch (error) {
            this.$store.commit("snackbar/updateType", "error");
            this.$store.commit("snackbar/updateTimeout", 10000);
            this.$store.commit(
              "snackbar/updateMessage",
              "failed to create pitch" + error.response.data.error.message
            );
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/updateLink", undefined);
            this.$store.commit("snackbar/updateLinkMessage", undefined);
            console.log(error.response.data.error.message);
          }
        }
        if (this.routeList.length !== 0) {
          let prevRoute = _.cloneDeep(this.routeState[this.routeList.length - 1]);
          prevRoute.next = routeId.data.routeId;
          delete prevRoute.pitches;
          delete prevRoute.points;
          try {
            await this.$axios.$post("/v1/routes/", prevRoute);
          } catch(error) {
            this.$store.commit("snackbar/updateType", "error");
            this.$store.commit("snackbar/updateTimeout", 10000);
            this.$store.commit(
              "snackbar/updateMessage",
              "failed to create route" + error.response.data.error.message
            );
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/updateLink", undefined);
            this.$store.commit("snackbar/updateLinkMessage", undefined);
            console.log(error.response.data.error.message);
          }
        }
        this.fetchRoutes();
        this.loading = false;
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Route Created");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
       
      } catch (error) {
        this.loading = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to create route" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    updateRouteList() {
      //update the route list to account for ordering
      this.$store.commit(
        "editor/updateRoutes",
        this.crag.walls[this.wallIndex].routes
      );
      this.routeList = [];
      this.afterList = [];

      for (let ri in this.routeState) {
        let route = _.cloneDeep(this.routeState[ri]);
        this.routeList.push(route);

        if (!this.routeList[ri].description) {
          this.routeList[ri].description = "";
        }
        if (!this.routeList[ri].protection) {
          this.routeList[ri].protection = "";
        }
        let obj = {
          listNames: ["first"],
          listIds: [null]
        };
        for (let key in this.routeState) {
          if (key !== ri) {
            obj.listNames.push(this.routeState[key].name);
            obj.listIds.push(this.routeState[key].routeId);
          }
        }
        for (let pi in this.routeList[ri].pitches) {
          let pitch = this.routeList[ri].pitches[pi];
          pitch.grade = pitch.grade.toString();
          if (!pitch.gradeModifier) {
            pitch.gradeModifier = "";
          }
          if (!pitch.danger) {
            pitch.danger = "";
          }
        }
        this.routeList[ri].orderList = obj;
        if (ri == 0) {
          this.afterList[ri] = "first";
        } else {
          this.afterList[ri] = this.routeState[parseInt(ri) - 1].name;
        }
      }
    },
    async createNewPitch(ri) {
      //create new pitch from route edit
      try {
        this.loading = true;
        let pitch = {
          grade: parseInt(this.newPitch[0].grade),
          description: this.newPitch[0].description,
          routeId: this.newPitch[0].routeId
        };

        if (this.newPitch[0].gradeModifier !== "") {
          pitch.gradeModifier = this.newPitch[0].gradeModifier;
        }
        if (this.newPitch[0].danger !== "") {
          pitch.danger = this.newPitch[0].danger;
        }
        if (this.routeList[ri].pitches.length === 0) {
          pitch.first = true;
        }
        console.log("new pitch");
        console.log(pitch);
        let pitchId = await this.$axios.$put("/v1/pitches", pitch);
        console.log("pitchId");
        console.log(pitchId);
        if (this.routeList[ri].pitches.length > 0) {
          let prevPitch = _.clone(
            this.crag.walls[this.wallIndex].routes[ri].pitches[
              this.routeList[ri].pitches.length - 1
            ]
          );
          delete prevPitch.points;
          prevPitch.next = pitchId.data.pitchId;
          console.log("prevPitch");
          console.log(prevPitch);
          await this.$axios.$post("/v1/pitches", prevPitch);
        }
        this.newPitch = [];
        this.currentRouteUpdate(ri);
        this.loading = false;
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Pitch Added");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.loading = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to create pitch" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async currentRouteUpdate(ri) {
      //fetches active route and applies updates to crag
      try {
        this.loading = true;
        let api = await this.$axios.$get(
          "/v1/routes/" + this.routeList[ri].routeId + "?depth=2"
        );

        let route = api.data;
        route.points = [];
        if (!route.pitches) {
          route.pitches = [];
        }
        for (let i in route.pitches) {
          if (!route.pitches[i].points) {
            route.pitches[i].points = [];
          }
          route.points = route.points.concat(route.pitches[i].points);
        }
        let crag = _.clone(this.crag);
        crag.walls[this.wallIndex].routes[ri] = route;
        this.$store.commit("editor/updateCrag", crag);
        this.updateRouteList();
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.error.message);
      }
    },
    newImage(ri) {
      this.imageFile = document.getElementById(
        this.crag.walls[this.wallIndex].routes[this.panel].routeId
      ).files[0];
      console.log(
        document.getElementById(
          this.crag.walls[this.wallIndex].routes[this.panel].routeId
        )
      );
      console.log(this.imageFile);
      this.submitImage(ri);
    },
    async submitImage(ri) {
      try {
        this.loading = true;
        var formData = new FormData();
        formData.set("photo.webp", this.imageFile);
        await this.$axios.$post(
          "/v1/routes/" +
            this.crag.walls[this.wallIndex].routes[ri].routeId +
            "/photo",
          formData
        );
        this.currentRouteUpdate(ri);
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
        this.loading = false;
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
    async updateRoute(ri) {
      let updateOrder = false;
      let obj = _.cloneDeep(this.routeState[ri]);
      delete obj.pitches;
      obj.name = this.routeList[ri].name;
      if (this.routeList[ri].description !== "") {
        obj.description = this.routeList[ri].description;
      } else if (obj.description) {
        delete obj.description;
      }
      if (this.routeList[ri].protection !== "") {
        obj.protection = this.routeList[ri].protection;
      } else if (obj.protection) {
        delete obj.protection;
      }
      if (this.afterList[ri] !== this.routeList[ri].orderList.listNames[ri]) {
        updateOrder = true;
        let key = this.routeList[ri].orderList.listNames.indexOf(
          this.afterList[ri]
        );
        delete obj.first;
        delete obj.next;

        //prior element at new position
        let afterRoute = undefined;
        //prior element at old position
        let previousRoute;

        //adjust new position
        if (key == 0) {
          //to first position
          obj.first = true;
          obj.next = this.routeState[0].routeId;

          afterRoute = _.cloneDeep(this.routeState[0]);
          delete afterRoute.pitches;
          delete afterRoute.first;
          delete afterRoute.next;
          if (
            this.routeState[0].next === obj.routeId &&
            this.routeState.length > 2
          ) {
            //route was 2nd object, more than 2 routes
            afterRoute.next = this.routeState[2].routeId;
          } else if (this.routeState.length > 2) {
            //more than 2 routes
            afterRoute.next = this.routeState[0].next;
          }
        } else {
          //set route to not first position
          if (
            this.routeList[ri].orderList.listNames.length !==
            parseInt(key) + 1
          ) {
            //route is not at end
            obj.next = this.routeList[ri].orderList.listIds[parseInt(key) + 1];
          }

          for (let i in this.routeList) {
            if (
              this.routeList[i].routeId ===
              this.routeList[ri].orderList.listIds[key]
            ) {
              afterRoute = _.cloneDeep(this.routeState[i]);
              delete afterRoute.pitches;
              afterRoute.next = obj.routeId;

              if (i == 1 && ri == 0) {
                afterRoute.first = true;
              } else {
                afterRoute.first = false;
              }
              break;
            }
          }
        }

        //adjust previous position
        if (ri == 0) {
          //was at 0 position
          previousRoute = _.cloneDeep(this.routeState[1]);
          delete previousRoute.pitches;
          previousRoute.first = true;
          if (this.routeList.length > 2) {
            previousRoute.next = this.routeList[2].routeId;
          } else {
            previousRoute.next = obj.routeId;
          }
        } else if (this.routeList.length !== parseInt(ri) + 1) {
          //middle position
          previousRoute = _.cloneDeep(this.routeState[parseInt(ri) - 1]);
          delete previousRoute.pitches;
          previousRoute.next = this.routeList[parseInt(ri) + 1].routeId;
          if (parseInt(ri) - 1 === 0) {
            previousRoute.first = true;
          }
        } else {
          //last position
          previousRoute = _.cloneDeep(this.routeState[parseInt(ri) - 1]);
          delete previousRoute.pitches;
          delete previousRoute.next;
          previousRoute.first = false;
          if (parseInt(ri) - 1 === 0) {
            previousRoute.first = true;
          }
        }

        try {
          this.loading = true;
          await this.$axios.$post("/v1/routes", previousRoute);
          if (afterRoute) {
            await this.$axios.$post("/v1/routes", afterRoute);
          }
          this.loading = false;
        } catch (error) {
          this.loading = false;
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit(
            "snackbar/updateMessage",
            "failed to update Route" + error.response.data.error.message
          );
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
          console.log(error.response.data.error.message);
        }
      }
      try {
        this.loading = true;
        await this.$axios.$post("/v1/routes", obj);
        if (updateOrder) {
          this.fetchRoutes();
        } else {
          this.currentRouteUpdate(ri);
        }
        this.loading = false;
        //success message
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Route Updated");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.loading = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to update route" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async updatePitch(ri, pi) {
      let obj = _.cloneDeep(this.routeState[ri].pitches[pi]);
      delete obj.points;
      obj.description = this.routeList[ri].pitches[pi].description;
      obj.grade = parseInt(this.routeList[ri].pitches[pi].grade);
      if (this.routeList[ri].pitches[pi].gradeModifier !== "") {
        obj.gradeModifier = this.routeList[ri].pitches[pi].gradeModifier;
      } else if (obj.gradeModifier) {
        delete obj.gradeModifier;
      }
      if (this.routeList[ri].pitches[pi].danger !== "") {
        obj.danger = this.routeList[ri].pitches[pi].danger;
      } else if (obj.danger) {
        delete obj.danger;
      }
      try {
        this.loading = true;
        console.log("post");
        console.log(obj);
        await this.$axios.$post("/v1/pitches", obj);
        this.currentRouteUpdate(ri);
        this.loading = false;
        //success message
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Pitch Updated");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.loading = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to update pitch" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async fetchRoutes() {
      try {
        let api = await this.$axios.$get(
          "/v1/walls/" + this.crag.walls[this.wallIndex].wallId + "?depth=3"
        );
        console.log(api)
        let wall = api.data;
        if (!wall.routes) {
          wall.routes = [];
        }
        for (let ri in wall.routes) {
          wall.routes[ri].points = [];
          if (!wall.routes[ri].pitches) {
            wall.routes[ri].pitches = [];
          }
          for (let pi in wall.routes[ri].pitches) {
            if (!wall.routes[ri].pitches[pi].points) {
              wall.routes[ri].pitches[pi].points = [];
            }
            wall.routes[ri].points = wall.routes[ri].points.concat(
              wall.routes[ri].pitches[pi].points
            );
          }
        }
        this.panel = null;
        let crag = _.clone(this.crag);
        crag.walls[this.wallIndex] = wall;
        this.$store.commit("editor/updateCrag", crag);
        this.updateRouteList();
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    },
    async deletePitch(ri, pi) {
      try {
        this.loading = true;
        let pointIds = [];
        if (this.routeList[ri].pitches[pi].points.length > 0) {
          for (let i in this.routeList[ri].pitches[pi].points) {
            pointIds.push( this.routeList[ri].pitches[pi].points[i].pointId);
          }
          let obj = {
            pointIds: pointIds
          };
          console.log("obj");
          console.log(obj);
          await this.$axios.$delete("/v1/points",{data: obj});
        }
        
        await this.$axios.$delete(
          "/v1/pitches/" + this.routeList[ri].pitches[pi].pitchId
        );
        if (pi != 0) {
          if (pi == 1 && this.routeState[ri].description) {
            let route = _.cloneDeep(this.routeState[ri]);
            delete route.pitches;
            delete route.description;
            await this.$axios.$post("/v1/routes", route);
          }
          let prevPitch = _.clone(
            this.crag.walls[this.wallIndex].routes[ri].pitches[parseInt(pi) - 1]
          );
          delete prevPitch.next;
          delete prevPitch.points;
          console.log(prevPitch);
          await this.$axios.$post("/v1/pitches", prevPitch);
        }
        this.currentRouteUpdate(ri);
        this.loading = false;
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Pitch Deleted");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.loading = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to delete pitch" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async deleteRoute(ri) {
      try {
        this.loading = true;
        await this.$axios.$delete("/v1/routes/" + this.routeList[ri].routeId);
        if (ri != 0) {
          // adjust next route
          let prevRoute = _.clone(
            this.crag.walls[this.wallIndex].routes[parseInt(ri) - 1]
          );
          delete prevRoute.points;
          delete prevRoute.pitches;
          if (this.crag.walls[this.wallIndex].routes.length - 1 > ri) {
            let nextRouteId = this.crag.walls[this.wallIndex].routes[
              parseInt(ri) + 1
            ].routeId;
            prevRoute.next = nextRouteId;
          } else {
            delete prevRoute.next;
          }
          await this.$axios.$post("/v1/routes", prevRoute);
        } else {
          //set new first route
          let firstRoute = _.clone(this.crag.walls[this.wallIndex].routes[1]);
          firstRoute.first = true;
          await this.$axios.$post("/v1/routes", firstRoute);
        }
        this.fetchRoutes();
        this.loading = false;
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Route Deleted");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.loading = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to delete route" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
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
  activated() {
    if (this.wallIndex) {
      this.updateRouteList();
    }
  }
};
</script>
