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
        <v-container v-if="country">
          <v-layout row>
            <v-text-field label="name" v-model="name"></v-text-field>
          </v-layout>
          <v-layout align-center justify-end row>
            <v-btn @click="submit()" color="primary" :disabled="formCheck">
              Submit
            </v-btn>
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
      countries: this.$store.state.filter.countries,
      country: null,
      name: null,
    };
  },
  computed: {
    countryId() {
      if (this.country) {
        return this.countries[this.countryIndex].countryId;
      }
    },
    countriesList() {
      var countriesList = [];
      for (let key in this.countries) {
        countriesList.push(this.countries[key].name);
      }
      return countriesList;
    },
    countryIndex() {
      for (let key in this.countriesList) {
        if (this.countriesList[key] === this.country) {
          return key;
        }
      }
    },
    formCheck() {
      if (this.country && this.name) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    async submit() {
      try {
        let obj = {
          name: this.name,
          countryId: this.countryId,
        };

        let regionId = await this.$axios.$put("/v1/regions/", obj);
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Region Created");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);

        this.$store.commit("filter/removeRoutes");
        this.$store.commit("filter/dataSet", false);
        this.fetchData();

        this.$router.push({
          name: "editor-region-edit",
          params: {
            edit: regionId.data.regionId,
          },
        });
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit(
          "snackbar/updateMessage",
          "failed to create region" + error.response.data.error.message
        );
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    },
  },
};
</script>
