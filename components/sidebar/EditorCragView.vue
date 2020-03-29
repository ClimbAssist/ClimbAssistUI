<template>
  <div>
    <v-btn v-if="editTabs === 'info'" @click="editModel()" :disabled="modelSet"
      >Edit Model</v-btn
    >
    <v-container v-if="editTabs === 'model'">
      <v-layout row wrap>
        <v-flex xs12>
        <v-slider
          v-model="light"
          label="Light"
          :max="6"
          :min="0.5"
          :step="0.1"
        />
      </v-flex>
        <v-flex xs12>
        <v-slider
          v-model="scale"
          label="Scale"
          :min="0.1"
          :step="0.1"
          :max="5"
        />
      </v-flex>
        <v-flex xs12>
        <v-slider
          v-model="modelAngle"
          label="Model Rotation"
          :max="2 * Math.PI"
          :min="0"
          :step="0.1"
        />
      </v-flex>
      <v-flex xs12>
        <v-switch v-model="limitRotate" label="limit Rotation"></v-switch>
      </v-flex>
        <v-flex xs12 v-if="azimuth">
          <v-range-slider
            v-model="azimuth"
            label="Rotation"
            :max="Math.PI"
            :min="-Math.PI"
            :step="0.1"
          />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-btn @click="modelSubmit()" color="primary" :disabled="modelSubmitCheck">Submit</v-btn>
        <v-btn @click="editInfo()">cancel</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "editorcragV",
  data() {
    return {
      limitRotate: false
    };
  },
  watch: {
    limitRotate: {
      handler() {
        if (this.limitRotate) {
          if (this.azimuth.length == 0) {
            this.$store.commit("editor/updateAzimuth", [
              -Math.PI.toFixed(1),
              Math.PI.toFixed(1)
            ]);
          }
        } else {
          this.$store.commit("editor/updateAzimuth", []);
        }
      }
    }
  },
  computed: {
    modelSet() {
      if (this.modelInfo) {
        return false;
      } else {
        return true;
      }
    },
    crag() {
      return this.$store.state.editor.cragStateEditor;
    },
    modelInfo() {
      return this.$store.state.editor.cragStateEditor.model;
    },
    modelSubmitCheck() {
      if (
        this.crag.model.scale &&
        this.crag.model.light &&
        this.crag.model.modelAngle != undefined
      ) {
        if (
          this.scale !== this.crag.model.scale ||
          this.light !== this.crag.model.light ||
          this.modelAngle !== this.crag.model.modelAngle
        ) {
          return false;
        } else if (
          (!this.crag.model.azimuth && this.azimuth.length > 0) ||
          (this.crag.model.azimuth && this.azimuth.length === 0)
        ) {
          return false;
        } else if (
          this.crag.model.azimuth &&
          this.azimuth.length > 0
        ) {
          if (
            this.crag.model.azimuth.minimum !==
              this.azimuth[0] ||
            this.crag.model.azimuth.maximum !==
              this.azimuth[1]
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    modelAngle: {
      get() {
        return this.$store.state.editor.modelSettings.modelAngle;
      },
      set(value) {
        this.$store.commit("editor/updateModelAngle", value);
      }
    },
    scale: {
      get() {
        return this.$store.state.editor.modelSettings.scale;
      },
      set(value) {
        this.$store.commit("editor/updateScale", value);
      }
    },
    light: {
      get() {
        return this.$store.state.editor.modelSettings.light;
      },
      set(value) {
        this.$store.commit("editor/updateLight", value);
      }
    },
    azimuth: {
      get() {
        return this.$store.state.editor.modelSettings.azimuth;
      },
      set(value) {
        this.$store.commit("editor/updateAzimuth", value);
      }
    },
    editTabs() {
      return this.$store.state.editor.editTabs;
    }
  },
  methods: {
    editModel() {
      if (this.modelInfo) {
        this.$store.commit("editor/editView", "model");
      }
    },
    editInfo() {
      this.$store.commit("editor/editView", "info");
    },
    checkazimuth() {
      if (this.crag.model.azimuth) {
        this.limitRotate = true;
      } else {
        this.limitRotate = false;
      }
    },
    async modelSubmit() {
      let obj = {
        subAreaId: this.crag.subAreaId,
        cragId: this.crag.cragId,
        name: this.crag.name,
        description: this.crag.description,
        location: {
          latitude: this.crag.location.latitude,
          longitude: this.crag.location.longitude,
          zoom: this.crag.location.zoom
        },
        model: {
          modelLocation: this.crag.model.modelLocation,
          lowResModelLocation: this.crag.model.lowResModelLocation,
          light: this.light,
          scale: this.scale,
          modelAngle: this.modelAngle
        }
      };
      if (this.crag.imageLocation) {
        obj.imageLocation = this.crag.imageLocation;
      }
      if (this.azimuth.length > 1) {
        obj.model.azimuth = {
          minimum: this.azimuth[0],
          maximum: this.azimuth[1]
        };
      }
      console.log("POST")
      console.log(obj)
        try {
        await this.$axios.$post("/v1/crags", obj);
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Crag Updated");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);


        let api = await this.$axios.$get("/v1/crags/" + this.crag.cragId)
        let crag = api.data;
        let walls = this.$axios.$get("/v1/crags/" + this.crag.cragId + "/walls?ordered=true");
        crag.walls = walls.data;

        this.$store.commit("editor/updateCrag", crag);
        this.editInfo()

      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "failed to update crag" + error.response.data.error.message);
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    }
  },
  mounted() {
    this.checkazimuth();
  }
};
</script>
