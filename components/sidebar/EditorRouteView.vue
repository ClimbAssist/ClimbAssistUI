<template>
  <div>
    <v-container v-if="editTabs === 'model'">
      <v-container row wrap>
        <v-radio-group v-model="editing" label="Set 3D Position">
          <v-radio
            v-for="n in radioGroup"
            :key="n"
            :label="n"
            :value="n"
          ></v-radio>
        </v-radio-group>
      </v-container>
      <v-container row v-if="editing === 'Line'">
        <v-select
          label="Pitch"
          :items="pitchList"
          v-model="selectedPitch"
          disabled
        />
      </v-container>
      <v-list three-line>
        <v-list-item v-for="(anchor, i) in anchors" :key="i">
          <v-list-item-content class="text-left">
            <v-list-item-title>Anchor {{ i + 1 }}</v-list-item-title>
            <v-list-item-subtitle>
              <v-checkbox v-model="fixed[i]" label="Fixed" />
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Distance: {{ distances[i] }} m
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-container v-if="anchors.length > 0" row>
        <v-btn color="red" :disabled="loading" @click="deletePoints()">
          Delete Pitch Line
        </v-btn>
      </v-container>
      <v-layout row>
        <v-btn
          class="mx-2"
          color="primary"
          :disabled="submitCheck"
          @click="submit()"
          >Submit</v-btn
        >
        <v-btn class="mx-2" @click="editInfo()" :disabled="loading">back</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "editorrouteV",
  data() {
    return {
      radioGroup: ["Line", "Location"],
      fixed: []
    };
  },
  watch: {
    fixed: {
      handler() {
        this.$store.commit("editor/editAnchors", this.fixed);
      }
    }
  },
  computed: {
    crag() {
      return this.$store.state.editor.cragStateEditor;
    },
    loading() {
      return this.$store.state.editor.loading;
    },
    submitCheck() {
      for (let i in this.anchors) {
        if (
          this.selectedRoute.pitches[i].anchors &&
          this.anchors[i].fixed !==
            this.selectedRoute.pitches[i].anchors.fixed &&
          !this.loading
        ) {
          return false;
        }
      }
      if (
        !this.selectedRoute.center &&
        this.center.x &&
        this.center.y &&
        this.center.z &&
        !this.loading
      ) {
        return false;
      } else if (
        this.selectedRoute.center &&
        this.center.x &&
        this.center.y &&
        this.center.z &&
        !this.loading
      ) {
        if (
          this.center.x !== this.selectedRoute.center.x ||
          this.center.y !== this.selectedRoute.center.y ||
          this.center.z !== this.selectedRoute.center.z
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    center() {
      return this.$store.state.editor.centerLoc;
    },
    editTabs() {
      return this.$store.state.editor.editTabs;
    },
    selectedPitch: {
      get() {
        return this.$store.state.editor.activePitch;
      },
      set(value) {
        this.$store.commit("editor/updateActivePitch", value);
      }
    },
    editing: {
      get() {
        return this.$store.state.editor.editing;
      },
      set(value) {
        this.$store.commit("editor/updateEditing", value);
      }
    },
    activeRoute() {
      return this.$store.state.editor.activeRoute;
    },
    selectedRoute() {
      return this.$store.state.editor.selectedRoute;
    },
    pitchList() {
      let pitchList = [];
      for (let key in this.selectedRoute.pitches) {
        pitchList.push(parseInt(key) + 1);
      }
      return pitchList;
    },
    anchors() {
      this.fixed = [];
      for (let key in this.$store.state.editor.anchors) {
        this.fixed.push(this.$store.state.editor.anchors[key].fixed);
      }
      return this.$store.state.editor.anchors;
    },
    distances() {
      return this.$store.state.editor.distances;
    }
  },
  methods: {
    editInfo() {
      this.$store.commit("editor/editView", "info");
    },
    async deletePoints() {
      this.$store.commit("editor/updateLoading", true);
      let len = this.anchors.length;

      let pointIds = [];
      for (let i in this.selectedRoute.pitches[len - 1].points) {
        pointIds.push(this.selectedRoute.pitches[len - 1].points[i].pointId);
      }
      try {
        //delete loop
        // for (let pi in pointIds) {
        //   await this.$axios.$delete("/v1/points/" + pointIds[pi]);
        // }

        //batch point delete
        let obj = {
          pointIds: pointIds
        };
        console.log("obj");
        console.log(obj);
        await this.$axios.$delete("/v1/points",{data: obj});
        let pitch = _.cloneDeep(this.selectedRoute.pitches[len - 1]);
        if (pitch.points) {
          delete pitch.points;
        }
        if (pitch.anchors) {
          delete pitch.anchors;
        }
        if (pitch.distance) {
          delete pitch.distance;
        }
        await this.$axios.$post("/v1/pitches", pitch);
        this.$store.commit("editor/removeAnchor");
        this.$store.commit("editor/removePoints");
        this.$store.commit("editor/removeDistance");
        this.$store.commit("editor/updateLoading", false);

        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Line Deleted");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        console.log("message");
        console.log(error.message);
        console.log("response");
        console.log(error.response);
        console.log(error.response.data.error.message);
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 100000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to delete line " + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);





        this.$store.commit("editor/updateLoading", false);
      }
    },
    async submit() {
      this.$store.commit("editor/updateLoading", true);
      for (let i in this.selectedRoute.pitches) {
        let pitch = _.cloneDeep(this.selectedRoute.pitches[i]);
        delete pitch.points;
        if (this.anchors[i]) {
          pitch.anchors = this.anchors[i];
        }
        console.log("pitch");
        console.log(pitch);
        await this.$axios.$post("/v1/pitches", pitch);
      }
      let route = _.cloneDeep(this.selectedRoute);
      delete route.pitches;
      if (this.center.x && this.center.y && this.center.z) {
        route.center = this.center;
      }
      console.log("route");
      console.log(route);
      await this.$axios.$post("/v1/routes", route);
      this.updateSelectedRoute();
    },
    async updateSelectedRoute() {
      try {
        let api = await this.$axios.$get(
          "/v1/routes/" + this.selectedRoute.routeId
        );
        let pitches = await this.$axios.$get(
          "/v1/routes/" + this.selectedRoute.routeId + "/pitches?ordered=true"
        );
        let route = api.data;
        route.points = [];
        route.pitches = pitches.data;
        for (let i in route.pitches) {
          let points = await this.$axios.$get(
            "/v1/pitches/" + route.pitches[i].pitchId + "/points?ordered=true"
          );
          route.pitches[i].points = points.data;
          route.points = route.points.concat(points.data);
        }
        this.$store.commit("editor/updateSelectedRoute", route);
        let crag = _.clone(this.crag);
        crag.walls[this.activeRoute[0]].routes[this.activeRoute[1]] = route;
        this.$store.commit("editor/updateCrag", crag);
        if (this.selectedRoute.center) {
          this.$store.commit(
            "editor/updateCenterLoc",
            this.selectedRoute.center
          );
        }
        this.$store.commit("editor/updateLoading", false);
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "route updated");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to update route" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.message);
      }
    }
  }
};
</script>
