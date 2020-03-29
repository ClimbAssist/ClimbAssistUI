<template>
  <v-card>
    <v-card-text>
      The <v-icon>fa-map</v-icon> Map button will display a map of the area. Parking icons will give driving directions.
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "six",
  mounted() {
    this.$store.commit('demo/updateDrawer', false)
  }
};
</script>
