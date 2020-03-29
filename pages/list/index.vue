<template>
  <v-container justify-start align-content-start  >
    <div class="text-xs-center" v-if="!dataSet">
      <p>loading</p>
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div class="text-xs-center" v-if="loadError">
      <p>{{loadError}}</p>
    </div>
    <v-container v-for="(country, i) in filteredRoutes.countries" :key="i">
      <v-toolbar color="primary" dark>
        <v-toolbar-title
          >{{ country.name }}</v-toolbar-title
        >
      </v-toolbar>
      <v-card v-for="(state, si) in country.filteredRegions" :key="si">
        <v-card-title
          >{{ state.name }} </v-card-title
        >
        <v-container class="text-left">
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(area, ai) in state.filteredAreas"
              :key="ai"
            >
              <v-expansion-panel-header>
                <v-flex class="text-left" justify-start align-content-center>
                <nuxt-link
                  :to="{
                    name: 'areas-area',
                    params: {
                      countryKey: area.countryKey,
                      stateKey: area.stateKey,
                      areaKey: area.areaKey,
                      area: area.slug
                    }
                  }"
                  >{{ area.name }}
                </nuxt-link>
                <span>-</span>
                <span style="color: red; white-space: nowrap;" v-if="area.trad !== 0">{{ area.trad }} trad</span>
                <span style="color: blue; white-space: nowrap;" v-if="area.sport !== 0">{{ area.sport }} sport</span>
                <span style="color: #EFD369; white-space: nowrap;" v-if="area.boulder !== 0">{{ area.boulder }} boulder</span>
                <v-chip outlined small class="mx-1" color="primary" v-for="(subArea, subChip) in area.filteredSubAreas" v-if="subArea.name !== area.name" :key="subChip">{{subArea.name}}</v-chip>
              </v-flex>

              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div
                  v-for="(subArea, subi) in area.filteredSubAreas"
                  :key="subi"
                >
                  <div
                    class="primary white--text pa-2"
                    v-if="subArea.name !== area.name"
                  >
                    {{ subArea.name }}
                    <span>-</span>
                    <span  v-if="subArea.trad !== 0">{{ subArea.trad }} trad</span>
                    <span  v-if="subArea.sport !== 0">{{ subArea.sport }} sport</span>
                    <span  v-if="subArea.boulder !== 0">{{ subArea.boulder }} boulder</span>
                  </div>
                  <div
                    class="pa-2"
                    v-for="(crag, ci) in subArea.filteredCrags"
                    :key="ci"
                  >
                    <nuxt-link
                      :to="{
                        name: 'crags-frame',
                        params: {
                          countryKey: crag.countryKey,
                          stateKey: crag.stateKey,
                          areaKey: crag.areaKey,
                          subAreaKey: crag.subAreaKey,
                          cragKey: crag.cragKey,
                          area: area.slug,
                          frame: crag.slug
                        }
                      }"
                      >
                      {{ crag.name }}
                    </nuxt-link>
                    <span>-</span>
                    <span style="color: red; white-space: nowrap;" v-if="crag.trad !== 0">{{ crag.trad }} trad</span>
                    <span style="color: blue; white-space: nowrap;" v-if="crag.sport !== 0">{{ crag.sport }} sport</span>
                    <span style="color: #EFD369; white-space: nowrap;" v-if="crag.boulder !== 0">{{ crag.boulder }} boulder</span>
                    <v-chip outlined class="mx-1" small color="primary" v-for="(wall, walli) in crag.walls" :key="walli" v-if="wall.name !==crag.name">{{wall.name}}</v-chip>
                  </div>
                </div>
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
  data() {
    return {
      dataCommitted: 0
    };
  },
  computed: {
    ...mapGetters({
      filteredRoutes: "filter/filteredRoutes"
    }),
    dataSet() {
      return this.$store.state.filter.dataSet;
    },
    loadError() {
      return this.$store.state.filter.loadError;
    }
  }
};
</script>
<style>
.v-treeview-node__label {
  text-align: left;
}
</style>
