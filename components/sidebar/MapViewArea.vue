<template>
  <v-list two-line>
    <v-list-item
      :to="{
        name: 'areas-area',
        params: {
          countryKey: area.countryKey,
          stateKey: area.stateKey,
          areaKey: area.areaKey,
          area: area.slug,
        },
      }"
      v-for="(area, index) in filteredRoutes.areas"
      :key="index"
    >
      <v-list-item-content>
        <v-list-item-title>{{ area.name }}</v-list-item-title>
        <v-list-item-subtitle
          ><span v-if="area.trad">trad {{ area.trad }}</span>
          <span v-if="area.sport"> sport {{ area.sport }}</span>
          <span v-if="area.boulder">
            boulder {{ area.boulder }}</span
          ></v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "mapareaV",
  computed: {
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
