<template>
  <v-list two-line>
    <div v-for="(area, ai) in filteredRoutes.areas" :key="ai">
      <div v-for="(subArea, subi) in area.filteredSubAreas" :key="subi">
        <v-list-item v-if="subi === 0" input-value="true" color="primary">
          <v-list-item-content>
            <v-list-item-title>{{
              filteredRoutes.areas[ai].name
            }}</v-list-item-title>
            <v-list-item-subtitle
              ><span v-if="area.trad">trad {{ area.trad }}</span>
              <span v-if="area.sport"> sport {{ area.sport }}</span>
              <span v-if="area.boulder">
                boulder {{ area.boulder }}</span
              ></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="filteredRoutes.subAreas[subi].length > 1"
          input-value="true"
          color="primary"
        >
          <v-list-item-content>
            <v-list-item-title>{{ subArea.name }}</v-list-item-title>
            <v-list-item-subtitle
              ><span v-if="subArea.trad">trad {{ subArea.trad }}</span>
              <span v-if="subArea.sport"> sport {{ subArea.sport }}</span>
              <span v-if="subArea.boulder">
                boulder {{ subArea.boulder }}</span
              ></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <div v-for="(crag, index) in subArea.filteredCrags" :key="index">
          <v-list-item :to="{
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
          }">
            <v-list-item-content>
              <v-list-item-title>{{ crag.name }}</v-list-item-title>
              <v-list-item-subtitle
                ><span v-if="crag.trad">trad {{ crag.trad }}</span>
                <span v-if="crag.sport"> sport {{ crag.sport }}</span>
                <span v-if="crag.boulder">
                  boulder {{ crag.boulder }}</span
                ></v-list-item-subtitle
              >
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
  name: "mapcragV",
  computed: {
    ...mapGetters({
      filteredRoutes: "filter/filteredRoutes"
    }),
    dataSet() {
      return this.$store.state.filter.dataSet;
    }
  },
  watch: {
    dataSet:  {
      handler() {
        this.$forceUpdate();
      }
    }
  }
};
</script>
