<template>
  <v-list two-line>
    <div v-for="(subArea, subkey) in area.filteredSubAreas" :key="subkey">
      <v-list-item input-value="true" color="primary">
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
      <div v-for="(crag, ckey) in subArea.filteredCrags" :key="ckey">
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
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "areaV",
  computed: {
    ...mapGetters({
      area: "filter/area"
    })
  }
};
</script>
