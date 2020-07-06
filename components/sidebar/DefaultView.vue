<template>
  <v-list three-line v-if="filterText">
    <div v-for="(area, ai) in filteredRoutes.areas" :key="ai">
      <div v-for="(subArea, subi) in area.filteredSubAreas" :key="subi">
        <div v-for="(crag, index) in subArea.filteredCrags" :key="index">
          <v-list-item
            :to="'/areas/' + area.slug"
            v-if="index === 0"
            class="primary"
            color="white"
          >
            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                filteredRoutes.areas[ai].name
              }}</v-list-item-title>
              <v-list-item-subtitle class="grey--text text--lighten-2"
                ><span v-if="area.trad">trad {{ area.trad }}</span>
                <span v-if="area.sport"> sport {{ area.sport }}</span>
                <span v-if="area.boulder">
                  boulder {{ area.boulder }}</span
                ></v-list-item-subtitle
              >
              <v-list-item-subtitle class="grey--text text--lighten-2">
                <v-chip
                  x-small
                  outlined
                  color="white"
                  v-for="(subArea, subi) in area.filteredSubAreas"
                  :key="subi"
                  v-if="subArea.name !== area.name"
                  >{{ subArea.name }}</v-chip
                >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="'/crags/' + crag.slug">
            <v-list-item-content>
              <v-list-item-title>{{ crag.name }}</v-list-item-title>
              <v-list-item-subtitle
                ><span v-if="crag.trad">trad {{ crag.trad }}</span>
                <span v-if="crag.sport"> sport {{ crag.sport }}</span>
                <span v-if="crag.boulder">
                  boulder {{ crag.boulder }}</span
                ></v-list-item-subtitle
              >
              <v-list-item-subtitle class="grey--text text--lighten-2">
                <v-chip
                  x-small
                  outlined
                  color="primary"
                  v-for="(wall, walli) in crag.walls"
                  :key="walli"
                  v-if="wall.name !== crag.name"
                  >{{ wall.name }}</v-chip
                >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
    </div>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "defaultV",
  computed: {
    filterText() {
      return this.$store.state.filter.filter.filterText;
    },
    ...mapGetters({
      filteredRoutes: "filter/filteredRoutes",
    }),
    dataSet() {
      return this.$store.state.filter.dataSet;
    },
  },
  watch: {
    dataSet: {
      handler() {
        this.$forceUpdate();
      },
    },
  },
};
</script>
