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
        <v-container>
          <v-layout row>
            <v-text-field label="name" v-model="name"></v-text-field>
          </v-layout>
          <v-layout row>
            <v-textarea
              name="input-7-4"
              label="Area Description"
              v-model="description"
            ></v-textarea>
          </v-layout>
          <v-layout align-center justify-end row>
            <v-btn
              class="ma-2"
              color="primary"
              :disabled="areaCheck"
              @click="updateArea()"
            >
              Update
            </v-btn>
            <v-btn
              class="ma-2"
              color="red"
              :disabled="currentSubAreas.length > 0"
              @click="deleteArea()"
            >
              Delete
            </v-btn>
          </v-layout>
          <v-card>
            <v-card-title class="primary headline white--text"
              >Sub-Areas</v-card-title
            >
          </v-card>
          <v-layout
            v-for="(currentSubArea, ci) in currentSubAreas"
            :key="ci"
            row
            wrap
            class="mx-2"
          >
            <v-flex xs12>
              <v-text-field
                label="name"
                v-model="currentSubAreas[ci].name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                name="input-7-4"
                label="Sub Area Description"
                v-model="currentSubAreas[ci].description"
              ></v-textarea>
            </v-flex>
            <v-layout align-center justify-end row>
              <v-btn
                class="ma-2"
                color="primary"
                :disabled="subAreaCheck[ci]"
                @click="updateSubArea(ci)"
              >
                Update
              </v-btn>
              <v-btn
                class="ma-2"
                color="red"
                :disabled="area.subAreas[ci].crags.length > 0"
                @click="deleteSubArea(ci)"
              >
                Delete
              </v-btn>
            </v-layout>
          </v-layout>
          <v-layout
            v-for="(subArea, i) in subAreas"
            :key="i"
            row
            wrap
            class="mx-2"
          >
            <v-flex xs12>
              <v-text-field
                label="name"
                v-model="subAreas[i].name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                name="input-7-4"
                label="Sub Area Description"
                v-model="subAreas[i].description"
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-btn
              class="ma-2"
              color="primary"
              v-if="subAreas.length > 0"
              @click="addSubArea()"
            >
              Submit sub-area
            </v-btn>
            <v-btn
              class="ma-2"
              color="primary"
              v-if="subAreas.length < 1"
              @click="subAreas.push({ name: '', description: '' })"
            >
              Add sub-area
            </v-btn>
            <v-btn
              class="ma-2"
              v-if="subAreas.length > 0"
              color="red"
              @click="subAreas.pop()"
            >
              remove sub-area
            </v-btn>
          </v-layout>
        </v-container>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import { fetch } from "../../../mixins/fetchData.js";
export default {
  middleware: "authentication",
  data() {
    return {
      name: undefined,
      description: undefined,
      subAreas: [],
      currentSubAreas: [],
    };
  },
  computed: {
    areaCheck() {
      if (
        this.name !== this.area.name ||
        this.description !== this.area.description
      ) {
        return false;
      } else {
        return true;
      }
    },
    subAreaCheck() {
      let subCheck = [];
      for (let key in this.currentSubAreas) {
        if (
          this.area.subAreas[key].name !== this.currentSubAreas[key].name ||
          this.area.subAreas[key].description !==
            this.currentSubAreas[key].description
        ) {
          subCheck.push(false);
        } else {
          subCheck.push(true);
        }
      }
      return subCheck;
    },
    area() {
      return this.$store.state.editor.areaStateEditor;
    },
    country() {
      return this.$store.state.editor.country;
    },
    region() {
      return this.$store.state.editor.region;
    },
  },
  methods: {
    getArea() {
      if (!this.name) {
        this.name = this.area.name;
        this.description = this.area.description;
      }
      this.currentSubAreas = [];
      for (let skey in this.area.subAreas) {
        let currentSubArea = {
          name: this.area.subAreas[skey].name,
          description: this.area.subAreas[skey].description,
          subAreaId: this.area.subAreas[skey].subAreaId,
          areaId: this.area.subAreas[skey].areaId,
        };
        this.currentSubAreas.push(currentSubArea);
      }
    },
    async addSubArea() {
      if (this.subAreas.length > 0) {
        for (let key in this.subAreas) {
          try {
            let obj = {
              areaId: this.area.areaId,
              name: this.subAreas[key].name,
              description: this.subAreas[key].description,
            };
            await this.$axios.put("/v1/sub-areas", obj);
            this.$store.commit("snackbar/updateType", "success");
            this.$store.commit("snackbar/updateTimeout", 10000);
            this.$store.commit("snackbar/updateMessage", "Sub Area created");
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/updateLink", undefined);
            this.$store.commit("snackbar/updateLinkMessage", undefined);

            let area = _.clone(this.area);

            let api = await this.$axios.$get(
              "/v1/areas/" + this.area.areaId + "/sub-areas"
            );
            let subAreas = api.data;
            area.subAreas = subAreas;

            this.$store.commit("editor/updateAreaState", area);
            this.getArea();
            this.subAreas.pop();
          } catch (error) {
            this.$store.commit("snackbar/updateType", "error");
            this.$store.commit("snackbar/updateTimeout", 10000);
            this.$store.commit(
              "snackbar/updateMessage",
              "failed to add sub area" + error.response.data.error.message
            );
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/updateLink", undefined);
            this.$store.commit("snackbar/updateLinkMessage", undefined);
            console.log(error.response.data.error.message);
          }
        }
      }
    },
    async updateSubArea(i) {
      try {
        let obj = {
          areaId: this.currentSubAreas[i].areaId,
          subAreaId: this.currentSubAreas[i].subAreaId,
          name: this.currentSubAreas[i].name,
          description: this.currentSubAreas[i].description,
        };
        await this.$axios.post("/v1/sub-areas", obj);
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Sub Area Updated");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to update sub area" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async updateArea() {
      if (
        this.name !== this.area.name ||
        this.description !== this.area.description
      ) {
        try {
          let obj = {
            areaId: this.area.areaId,
            regionId: this.area.regionId,
            name: this.name,
            description: this.description,
          };
          await this.$axios.post("/v1/areas", obj);
          this.$store.commit("snackbar/updateType", "success");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit("snackbar/updateMessage", "Area Updated");
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
        } catch (error) {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit(
            "snackbar/updateMessage",
            "failed to update area" + error.response.data.error.message
          );
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
          console.log(error.response.data.error.message);
        }
      }
    },
    async deleteArea() {
      try {
        await this.$axios.delete("/v1/areas/" + this.area.areaId);
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Area Deleted");
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
          "failed to delete area" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async deleteSubArea(i) {
      try {
        await this.$axios.delete(
          "/v1/sub-areas/" + this.currentSubAreas[i].subAreaId
        );

        let area = _.clone(this.area);

        let api = await this.$axios.$get(
          "v1/areas/" + this.area.areaId + "/sub-areas"
        );
        let subAreas = api.data;
        area.subAreas = subAreas;

        this.$store.commit("editor/updateAreaState", area);
        this.getArea();

        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Sub Area Deleted");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to delete sub area" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
  },
  async fetch({ store, params }) {
    if (store.state.editor.sampleData) {
      store.commit("editor/updateCountry", store.state.filter.countries[0]);
      store.commit(
        "editor/updateAreaState",
        store.state.filter.countries[0].regions[0].areas[0]
      );
      store.commit(
        "editor/updateRegion",
        store.state.filter.countries[0].regions[0]
      );
      return;
    }
    console.log("from fresh");
    const api = (await axios.get("/v1/areas/" + params.edit + "?depth=2")).data;

    let area = api.data;
    if (!area.subAreas) {
      area.subAreas = [];
    }
    for (let si in area.subAreas) {
      if (!area.subAreas[si].crags) {
        area.subAreas[si].crags = [];
      }
    }

    store.commit("editor/updateAreaState", area);

    const region = (await axios.get("/v1/regions/" + area.regionId)).data;
    console.info("region");
    console.log(region);
    store.commit("editor/updateRegion", region.data);

    const country = (await axios.get("/v1/countries/" + region.data.countryId))
      .data;
    console.info("country");
    console.log(country);
    store.commit("editor/updateCountry", country.data);
  },
  mixins: [fetch],
  created() {
    this.getArea();
  },
};
</script>
