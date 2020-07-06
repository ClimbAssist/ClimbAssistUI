<template>
  <v-container fluid>
    <v-form autocomplete="off">
      <v-container>
        <v-layout row>
          <v-text-field label="Country" :value="country.name" disabled />
        </v-layout>
        <v-container>
          <v-layout row>
            <v-text-field label="name" v-model="name"></v-text-field>
          </v-layout>
          <v-layout align-center justify-end row>
            <v-btn
              class="mx-2"
              color="primary"
              :disabled="formCheck"
              @click="updateRegion()"
            >
              Update
            </v-btn>
            <v-btn
              color="red"
              :disabled="region.areas.length > 0"
              @click="deleteRegion()"
            >
              Delete
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
    };
  },
  computed: {
    formCheck() {
      if (this.name !== this.region.name) {
        return false;
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
  },
  methods: {
    getRegion() {
      if (!this.name) {
        this.name = this.region.name;
      }
    },
    async updateRegion() {
      try {
        let obj = {
          countryId: this.country.countryId,
          regionId: this.region.regionId,
          name: this.name,
        };
        await this.$axios.post("/v1/regions", obj);
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Region Updated");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to update region" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async deleteRegion() {
      try {
        await this.$axios.delete("/v1/regions/" + this.region.regionId);
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Region Deleted");
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
          "failed to delete region" + error.response.data.error.message
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
        "editor/updateRegion",
        store.state.filter.countries[0].regions[0]
      );
      return;
    }
    console.log("from fresh");
    const api = (await axios.get("/v1/regions/" + params.edit + "?depth=1"))
      .data;

    let region = api.data;
    if (!region.areas) {
      region.areas = [];
    }

    store.commit("editor/updateRegion", region);

    const country = (await axios.get("/v1/countries/" + region.countryId)).data;
    store.commit("editor/updateCountry", country.data);
  },
  mixins: [fetch],
  created() {
    this.getRegion();
  },
};
</script>
