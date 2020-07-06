<template>
  <v-container justify-start align-content-start v-if="countries">
    <v-container>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>New Places</v-toolbar-title>
        <v-spacer />
        <v-flex>
          <v-btn nuxt to="/editor/country/create">Add Country</v-btn>
        </v-flex>
        <v-flex>
          <v-btn nuxt to="/editor/region/create">Add Region</v-btn>
        </v-flex>
        <v-flex>
          <v-btn nuxt to="/editor/area/create">Add Area</v-btn>
        </v-flex>
        <v-flex>
          <v-btn nuxt to="/editor/crag/create">Add Crag</v-btn>
        </v-flex>
      </v-toolbar>
    </v-container>
    <div class="text-xs-center" v-if="!dataSet">
      <p>loading</p>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-container v-for="(country, i) in countries" :key="i">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>{{ country.name }} </v-toolbar-title>
        <v-btn
          nuxt
          class="ma-2"
          :to="{
            name: 'editor-country-edit',
            params: {
              countryKey: i,
              edit: country.countryId,
            },
          }"
          >edit</v-btn
        >
      </v-toolbar>
      <v-card v-for="(state, si) in country.regions" :key="si">
        <v-card-title
          >{{ state.name }}
          <v-btn
            nuxt
            class="ma-2"
            :to="{
              name: 'editor-region-edit',
              params: {
                countryKey: i,
                stateKey: si,
                edit: state.regionId,
              },
            }"
            >edit</v-btn
          >
        </v-card-title>
        <v-container>
          <v-expansion-panels>
            <v-expansion-panel v-for="(area, ai) in state.areas" :key="ai">
              <v-expansion-panel-header>
                <v-layout align-center justify-start row>
                  {{ area.name }}

                  <v-chip
                    outlined
                    class="mx-1"
                    small
                    color="primary"
                    v-for="(subArea, subChip) in area.subAreas"
                    :key="subChip"
                    >{{ subArea.name }}</v-chip
                  >
                  <v-btn
                    class="mx-2"
                    nuxt
                    :to="{
                      name: 'editor-area-edit',
                      params: {
                        countryKey: i,
                        stateKey: si,
                        areaKey: ai,
                        edit: area.areaId,
                      },
                    }"
                    >edit</v-btn
                  >
                </v-layout>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                v-for="(subArea, subi) in area.subAreas"
                :key="subi"
              >
                <div
                  class="primary white--text pa-2"
                  v-if="area.subAreas.length > 1"
                >
                  {{ subArea.name }}
                </div>
                <v-layout
                  align-center
                  justify-start
                  row
                  v-for="(crag, ci) in subArea.crags"
                  :key="ci"
                >
                  {{ crag.name }}
                  <v-chip
                    class="mx-1"
                    small
                    outlined
                    color="primary"
                    v-for="(wall, walli) in crag.walls"
                    :key="walli"
                    >{{ wall.name }}</v-chip
                  >
                  <v-spacer />
                  <v-btn
                    nuxt
                    class="ma-2"
                    :to="{
                      name: 'editor-crag-edit',
                      params: {
                        countryKey: i,
                        stateKey: si,
                        areaKey: ai,
                        subAreaKey: subi,
                        cragKey: ci,
                        edit: crag.cragId,
                      },
                    }"
                    >edit crag</v-btn
                  >
                  <v-btn
                    nuxt
                    class="ma-2"
                    :to="{
                      name: 'editor-crag-edit-routes',
                      params: {
                        countryKey: i,
                        stateKey: si,
                        areaKey: ai,
                        subAreaKey: subi,
                        cragKey: ci,
                        edit: crag.cragId,
                      },
                    }"
                    >edit routes</v-btn
                  >
                </v-layout>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "list",
  middleware: "authentication",
  data() {
    return {
      countries: this.$store.state.filter.countries,
    };
  },
  computed: {
    ...mapGetters({
      filteredRoutes: "filter/filteredRoutes",
    }),
    dataSet() {
      return this.$store.state.filter.dataSet;
    },
  },
  methods: {
    deleteWarn(input) {
      confirm("Are you sure you want to delete" + input + "?");
    },
  },
  created() {
    this.$store.commit("editor/updateEditor", true);
  },
  destroyed() {
    this.$store.commit("editor/updateEditor", false);
  },
};
</script>
<style>
.v-treeview-node__label {
  text-align: left;
}
</style>
