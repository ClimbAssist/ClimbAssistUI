<template>
  <v-container>
    <v-layout row justify-center>
      <v-btn :disabled="debugging" @click="debug">
        Run Debugger
      </v-btn>
    </v-layout>
    <v-layout v-if="currentTask">
      {{ currentTask }}
    </v-layout>
    <v-layout v-if="logs.length > 0">
      {{ logs[logs.length - 1].error.message }}
    </v-layout>
    <v-btn v-if="errorPathId" @click="deletePath(errorPathId)" color="red">
      Delete Path
    </v-btn>
    <v-btn
      v-if="errorPointsId"
      @click="deletePoints(errorPointsId)"
      color="red"
    >
      Delete Line
    </v-btn>
    <v-container>
      <v-layout row>
        <v-icon v-if="status.paths">
          {{ status.paths }}
        </v-icon>
        paths
      </v-layout>
      <v-layout row>
        <v-icon v-if="status.walls">
          {{ status.walls }}
        </v-icon>
        walls
      </v-layout>
      <v-layout row>
        <v-icon v-if="status.routes">
          {{ status.routes }}
        </v-icon>
        routes
      </v-layout>
      <v-layout row>
        <v-icon v-if="status.pitches">
          {{ status.pitches }}
        </v-icon>
        pitches
      </v-layout>
      <v-layout row>
        <v-icon v-if="status.points">
          {{ status.points }}
        </v-icon>
        points
      </v-layout>
    </v-container>
    <v-container v-if="resources">
      <v-layout v-for="(resource, i) in resources" :key="i">
        <v-text-field
          label="Id"
          disabled
          :value="resource[resourceId]"
          :background-color="backgrounds[i].id"
        >
        </v-text-field>
        <v-text-field label="name" disabled :value="resource.name">
        </v-text-field>
        <v-select
          label="Next"
          :items="ids"
          :background-color="backgrounds[i].next"
          v-model="resource.next"
        />
        <v-select
          label="first"
          :items="binary"
          :background-color="backgrounds[i].first"
          v-model="resource.first"
        />
        <v-btn
          class="ma-2"
          color="green"
          @click="updateResource(resource, i)"
          :disabled="resourceCheck[i]"
        >
          Update
        </v-btn>
      </v-layout>
    </v-container>
    <v-container>
      Logs
      <v-layout row v-for="log in logs" :key="log">
        {{ log }}
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import axios from "axios";
import _ from "lodash";
export default {
  middleware: "authentication",
  name: "debug",
  data: () => ({
    debugging: false,
    currentTask: undefined,
    icon: {
      success: "fa-check-square",
      error: "fa-exclamation-triangle",
      updating: "fa-circle-notch fa-spin",
    },
    status: {
      paths: undefined,
      walls: undefined,
      routes: undefined,
      pitches: undefined,
      points: undefined,
    },
    resources: undefined,
    dbResources: undefined,
    resourceType: undefined,
    resourceId: undefined,
    errorPointsId: undefined,
    errorPathId: undefined,
    logs: [],
    ids: [""],
    backgrounds: [],
    binary: [true, false],
  }),
  computed: {
    resourceCheck() {
      if (this.resources && this.dbResources) {
        let resourceCheck = [];
        for (let key in this.resources) {
          if (
            !this.debugging &&
            (this.resources[key].first !== this.dbResources[key].first ||
              this.resources[key].next !== this.dbResources[key].next)
          ) {
            resourceCheck[key] = false;
          } else {
            resourceCheck[key] = true;
          }
        }
        return resourceCheck;
      }
    },
  },
  methods: {
    async debug() {
      this.debugging = true;
      this.status = {
        paths: undefined,
        walls: undefined,
        routes: undefined,
        pitches: undefined,
        points: undefined,
      };
      this.resources = undefined;
      this.dbResources = undefined;
      this.resourceType = undefined;
      this.resourceId = undefined;
      this.errorPointsId = undefined;
      this.errorPathId = undefined;
      this.logs = [];
      this.ids = [""];
      this.backgrounds = [];

      this.currentTask = "Checking Crag get request...";
      try {
        await this.$axios.$get(
          "/v1/crags/" + this.$route.params.edit + "?depth=4"
        );
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "data fetch verified");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        this.$router.push("/editor");
      } catch (error) {
        this.logs.push(error.response.data);
        if (error.response.data.error.type === "InvalidOrderingException") {
          this.checkPaths();
        } else {
          this.currentTask =
            "error not associated with ordering, please contact administrator";
        }
      }
    },
    async checkPaths() {
      this.currentTask = "Checking Path Order...";
      this.status.paths = this.icon.updating;
      try {
        let paths = (
          await this.$axios.$get(
            "/v1/crags/" + this.$route.params.edit + "/paths"
          )
        ).data;
        if (paths.length > 0) {
          for (let i in paths) {
            try {
              await this.$axios.$get(
                "/v1/paths/" + paths[i].pathId + "/path-points?ordered=true"
              );
              if (i == paths.length - 1) {
                this.status.paths = this.icon.success;
                this.checkWalls();
              }
            } catch (error) {
              this.logs.push(error.response.data);
              this.status.paths = this.icon.error;
              if (
                error.response.data.error.type == "InvalidOrderingException"
              ) {
                this.currentTask =
                  "ordering error found in " +
                  paths[i].pathId +
                  "delete this path?";
                this.errorPathId = paths[i].pathId;
              } else {
                this.currentTask =
                  "error not associated with order, please contact admin.";
                this.debugging = false;
              }
              return;
            }
          }
        } else {
          this.status.paths = this.icon.success;
          this.checkWalls();
        }
      } catch (error) {
        this.logs.push(error.response.data);
        this.status.paths = this.icon.error;
        this.currentTask =
          "error not associated with order, please contact admin.";
        this.debugging = false;
      }
    },
    async checkWalls() {
      this.currentTask = "Checking Wall Order...";
      this.status.walls = this.icon.updating;
      try {
        let newCrag = (
          await this.$axios.$get(
            "/v1/crags/" + this.$route.params.edit + "?depth=1"
          )
        ).data;
        this.status.walls = this.icon.success;
        this.checkRoutes(newCrag);
      } catch (error) {
        this.status.walls = this.icon.error;
        if (error.response.data.error.type === "InvalidOrderingException") {
          this.fixResources(
            this.$route.params.edit,
            error.response.data.error.message,
            "walls",
            "crags"
          );
        } else {
          this.currentTask =
            "error not associated with order, please contact admin.";
          this.debugging = false;
        }
      }
    },
    async checkRoutes(crag) {
      this.currentTask = "Checking Routes Order...";
      this.status.routes = this.icon.updating;
      try {
        let newCrag = (
          await this.$axios.$get(
            "/v1/crags/" + this.$route.params.edit + "?depth=2"
          )
        ).data;
        this.status.routes = this.icon.success;
        this.checkPitches(newCrag);
      } catch (error) {
        this.logs.push(error.response.data);
        if (error.response.data.error.type === "InvalidOrderingException") {
          this.currentTask =
            "Error in Routes Order getting unordered routes...";
          this.status.routes = this.icon.error;
          for (let i in crag.walls) {
            try {
              await this.$axios.$get(
                "/v1/walls/" + crag.walls[i].wallId + "/routes?ordered=true"
              );
            } catch (error) {
              this.logs.push(error.response.data);
              if (
                error.response.data.error.type === "InvalidOrderingException"
              ) {
                this.fixResources(
                  crag.walls[i].wallId,
                  error.response.data.error.message,
                  "routes",
                  "walls"
                );
              } else {
                this.currentTask =
                  "error not associated with order, please contact admin.";
                this.debugging = false;
              }
              return;
            }
          }
        } else {
          this.currentTask =
            "error not associated with order, please contact admin.";
          this.debugging = false;
        }
      }
    },
    async checkPitches(crag) {
      this.currentTask = "Checking Pitches Order...";
      this.status.pitches = this.icon.updating;
      try {
        let newCrag = (
          await this.$axios.$get(
            "/v1/crags/" + this.$route.params.edit + "?depth=3"
          )
        ).data;
        this.status.pitches = this.icon.success;
        this.checkPoints(newCrag);
      } catch (error) {
        this.logs.push(error.response.data);
        if (error.response.data.error.type === "InvalidOrderingException") {
          this.currentTask =
            "Error in Pitches Order getting unordered pitches...";
          this.status.pitches = this.icon.error;
          for (let i in crag.walls) {
            for (let ri in crag.walls[i].routes) {
              try {
                await this.$axios.$get(
                  "/v1/routes/" +
                    crag.walls[i].routes[ri].routeId +
                    "/pitches?ordered=true"
                );
              } catch (error) {
                this.logs.push(error.response.data);
                if (
                  error.response.data.error.type === "InvalidOrderingException"
                ) {
                  this.fixResources(
                    crag.walls[i].routes[ri].routeId,
                    error.response.data.error.message,
                    "pitches",
                    "routes"
                  );
                } else {
                  this.currentTask =
                    "error not associated with order, please contact admin.";
                  this.debugging = false;
                }
                return;
              }
            }
          }
        } else {
          this.currentTask =
            "error not associated with order, please contact admin.";
          this.debugging = false;
        }
      }
    },
    async checkPoints(crag) {
      this.currentTask = "checking Points Order...";
      this.status.points = this.icon.updating;
      try {
        let newCrag = (
          await this.$axios.$get(
            "/v1/crags/" + this.$route.params.edit + "?depth=4"
          )
        ).data;
        this.status.points = this.icon.success;
        this.debugging = false;
      } catch (error) {
        for (let i in crag.walls) {
          for (let ri in crag.walls[i].routes) {
            for (let pi in crag.walls[i].routes[ri].pitches) {
              try {
                await this.$axios.$get(
                  "/v1/pitches/" +
                    crag.walls[i].routes[ri].pitches[pi].pitchId +
                    "/points?ordered=true"
                );
              } catch (error) {
                this.logs.push(error.response.data);
                this.status.points = this.icon.error;
                if (
                  error.response.data.error.type == "InvalidOrderingException"
                ) {
                  this.currentTask =
                    "ordering error found in points for" +
                    crag.walls[i].routes[ri].pitches[pi].pitchId +
                    "delete this route line (points)?";
                  this.errorPointsId =
                    crag.walls[i].routes[ri].pitches[pi].pitchId;
                  this.debugging = false;
                } else {
                  this.currentTask =
                    "error not associated with order, please contact admin.";
                  this.debugging = false;
                }
                return;
              }
            }
          }
        }
      }
    },
    async fixResources(errorId, error, type, parent) {
      this.currentTask =
        "error in " + type + " order, retrieving walls unordered";
      let resources = (
        await this.$axios.$get("/v1/" + parent + "/" + errorId + "/" + type)
      ).data;
      let resourceId;
      if (type === "walls") {
        resourceId = "wallId";
      } else if (type === "routes") {
        resourceId = "routeId";
      } else if (type === "pitches") {
        resourceId = "pitchId";
      }
      let next = false;
      let first = false;
      if (error.includes("next")) {
        next = true;
      }
      if (error.includes("first")) {
        first = true;
      }

      for (let i in resources) {
        let background = {
          next: undefined,
          first: undefined,
          id: undefined,
        };
        if (error.includes(resources[i][resourceId])) {
          background.id = "red";
          if (next) {
            background.next = "red";
          }
          if (first) {
            background.first = "red";
          }
        }
        this.backgrounds.push(background);
        this.ids.push(resources[i][resourceId]);
        if (!resources[i].first) {
          resources[i].first = false;
        }
        if (!resources[i].next) {
          resources[i].next = "";
        }
      }
      this.currentTask =
        "fix the following ordering error in the " +
        type +
        ",then run the debugger again";
      this.resources = resources;
      this.dbResources = _.cloneDeep(resources);
      this.resourceType = type;
      this.resourceId = resourceId;
      this.debugging = false;
    },
    async updateResource(resource, i) {
      this.debugging = true;
      if (resource.next === "") {
        delete resource.next;
      }
      try {
        await this.$axios.$post("/v1/" + this.resourceType, resource);
        this.debugging = false;
        if (!resource.next) {
          resource.next = "";
        }
        this.dbResources[i] = this.resources[i];
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", type + "Updated");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.debugging = false;
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to update" + type + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      }
    },
    async deletePath(pathId) {
      this.debugging = true;
      this.currentTask = "error in Path Order, fixing path";
      try {
        await this.$axios.$delete("/v1/paths/" + pathId + "/path-points");
        try {
          await this.$axios.$delete("/v1/paths/" + pathId);
          this.currentTask =
            "deleted" +
            pathId +
            "you will need to recreate this path in the editor. Select run debug again to check the crag.";
          this.debugging = false;
          this.errorPathId = undefined;
          return;
        } catch (error) {
          this.debugging = false;
          this.currentTask = "unable to delete path error message below.";
          this.logs.push(error.response.data);
        }
      } catch (error) {
        this.debugging = false;
        this.currentTask = "unable to delete path error message below.";
        this.logs.push(error.response.data);
      }
    },
    async deletePoints(pitchId) {
      this.debugging = true;
      this.currentTask = "error in Points Order, deleting Points";
      try {
        await this.$axios.$delete("/v1/pitches/" + pitchId + "/points");
        this.currentTask =
          "deleted route line (points) you will need to recreate this line in the editor. Select run debug again to check the crag.";
        this.debugging = false;
        this.errorPointsId = undefined;
      } catch (error) {
        this.currentTask = "unable to delete points, error message below";
        this.logs.push(error.response.data);
        this.debugging = false;
      }
    },
  },
};
</script>
