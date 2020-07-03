<template>
  <v-container fluid>
    <v-form autocomplete="off">
      <v-container>
        <v-container>
          <v-layout row>
            <v-text-field label="name" v-model="name"></v-text-field>
          </v-layout>
          <v-layout align-center justify-end row>
            <v-btn @click="submit()" color="primary" :disabled="formCheck">Submit</v-btn>
          </v-layout>
        </v-container>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { fetch } from "../../../mixins/fetchData.js";
export default {
  middleware: "authentication",
  data() {
    return {
      name: ""
    };
  },
  computed: {
    formCheck() {
      if (this.name !== "") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    async submit() {
      try {
        let country = { name: this.name };

        let countryId = await this.$axios.$put("/v1/countries/", country);

        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Country Created");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);

        this.$store.commit("filter/removeRoutes");
        this.$store.commit("filter/dataSet", false);
        this.fetchData();

        this.$router.push({
          name: "editor-country-edit",
          params: {
            edit: countryId.data.countryId
          }
        });
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to create country" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    }
  }
};
</script>
