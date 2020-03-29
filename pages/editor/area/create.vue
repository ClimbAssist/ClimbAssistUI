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
        <v-layout v-if="country" row>
          <v-autocomplete label="Region" :items="regionList" v-model="region" />
        </v-layout>
        <v-container v-if="country && region">
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
          <v-card>
            <v-card-title class="primary headline  white--text"
              >Sub-Areas (not required)</v-card-title
            >
          </v-card>
          <v-layout v-for="(subArea, i) in subAreas" :key="i" row wrap class="mx-2">
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
            <v-btn color="primary" class="ma-2" @click="addSubArea()">
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
import { fetch } from "../../../mixins/fetchData.js"
export default {
  middleware: 'authentication',
  data() {
    return {
      countries: this.$store.state.filter.countries,
      country: null,
      region: null,
      name: null,
      description: null,
      loading: false,
      subAreas: []
    };
  },
  computed: {
    regionId() {
      if (this.region) {
        return this.countries[this.countryIndex].regions[this.regionIndex]
          .regionId;
      }
    },
    countriesList() {
      var countriesList = [];
      for (let key in this.countries) {
        countriesList.push(this.countries[key].name);
      }
      return countriesList;
    },
    regionList() {
      var regionList = [];
      for (let key in this.countries[this.countryIndex].regions) {
        regionList.push(this.countries[this.countryIndex].regions[key].name);
      }
      return regionList;
    },
    countryIndex() {
      for (let key in this.countriesList) {
        if (this.countriesList[key] === this.country) {
          return key;
        }
      }
    },
    regionIndex() {
      for (let key in this.regionList) {
        if (this.regionList[key] === this.region) {
          return key;
        }
      }
    },
    formCheck() {
      if (
        this.country &&
        this.region &&
        this.name &&
        this.description &&
        !this.loading
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    addSubArea() {
      let subArea = { name: "", description: "" };
      this.subAreas.push(subArea);
    },
    async submit() {
      try {
        this.loading = true;
        let areaData = {
          name: this.name,
          regionId: this.regionId,
          description: this.description
        };
        console.log(areaData);

        let areaId = await this.$axios.$put("/v1/areas/", areaData);
        console.log(areaId);
        if (this.subAreas.length > 0) {
          for (let i in this.subAreas) {
            try {
              this.subAreas[i].areaId = areaId.data.areaId;
              let subAreaId = await this.$axios.$put(
                "/v1/sub-areas/",
                this.subAreas[i]
              );
            } catch (error) {
              this.$store.commit("snackbar/updateType", "error");
              this.$store.commit("snackbar/updateTimeout", 10000);
              this.$store.commit(
                "snackbar/updateMessage",
                "failed to create subarea" + error.response.data.error.message
              );
              this.$store.commit("snackbar/updateSnackbar", true);
              this.$store.commit("snackbar/updateLink", undefined);
              this.$store.commit("snackbar/updateLinkMessage", undefined);
              console.log(error.response.data.error.message);
            }
          }
        } else {
          try {
            let subArea = {
              name: this.name,
              description: this.description,
              areaId: areaId.data.areaId
            };
            let subAreaId = await this.$axios.$put("/v1/sub-areas/", subArea);
          } catch (error) {
            this.$store.commit("snackbar/updateType", "error");
            this.$store.commit("snackbar/updateTimeout", 10000);
            this.$store.commit(
              "snackbar/updateMessage",
              "failed to create subarea" + error.response.data.error.message
            );
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/updateLink", undefined);
            this.$store.commit("snackbar/updateLinkMessage", undefined);
            console.log(error.response.data.error.message);
          }
        }
        this.loading = false;
        this.$store.commit("snackbar/updateType", "success");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "Area Created");
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);

        this.$store.commit("filter/removeRoutes")
        this.$store.commit("filter/dataSet", false);
        this.fetchData();

        this.$router.push({
          name: "editor-area-edit",
          params: {
            edit: areaId.data.areaId
          }
        });
      } catch (error) {
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 10000);
        this.$store.commit("snackbar/updateMessage", "failed to create area" + error.response.data.error.message);
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error.message);
      }
    }
  },
  mixins: [fetch]
};
</script>
