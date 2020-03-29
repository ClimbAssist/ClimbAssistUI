<template>
  <v-container fluid>
    <v-form autocomplete="off">
      <v-container>
        <v-layout row>
          <v-text-field label="name" v-model="name"></v-text-field>
        </v-layout>
        <v-layout align-center justify-end row>
          <v-btn
            class="mx-2"
            color="primary"
            :disabled="formCheck"
            @click="updateCountry()"
          >
            Update
          </v-btn>
          <v-btn
            class="mx-2"
            color="red"
            :disabled="country.regions.length > 0"
            @click="deleteCountry()"
          >
            Delete
          </v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import { fetch } from "../../../mixins/fetchData.js";
export default {
  middleware: 'authentication',
  data() {
    return {
      name: undefined
    };
  },
  computed: {
    formCheck() {
      if (this.name !== this.country.name) {
        return false;
      } else {
        return true;
      }
    },
    country() {
      return this.$store.state.editor.country;
    }
  },
  methods: {
    getCountry() {
      if (!this.name) {
        this.name = this.country.name;
      }
    },
    async updateCountry() {
      try {
        let obj = {
          countryId: this.country.countryId,
          name: this.name
        };
        await this.$axios.post("/v1/countries", obj);
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
          "failed to update country" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
    async deleteCountry() {
      try {
        await this.$axios.$delete("/v1/countries/" + this.country.countryId);
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Country Deleted");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);

        this.$store.commit("filter/removeRoutes");
        this.$store.commit("filter/dataSet", false);
        this.fetchData();

        this.$router.push({
          name: "editor"
        });
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to delete country" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    }
  },
  async fetch({ store, params }) {
    if (store.state.editor.sampleData) {
      console.log("setting country");
      store.commit("editor/updateCountry", store.state.filter.countries[0]);
      return;
    }

    console.log("from fresh");
    const api = (await axios.get("/v1/countries/" + params.edit + "?depth=1")).data;

    let country = api.data;
    if (!country.regions) {
      country.regions = [];
    }

    store.commit("editor/updateCountry", country);
  },
  mixins: [fetch],
  created() {
    this.getCountry();
  }
};
</script>
