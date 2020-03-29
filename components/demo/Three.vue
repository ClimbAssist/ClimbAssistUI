<template>
  <v-card>
    <v-card-text>
      The <v-icon>fa-sliders-h</v-icon> filter button allows you to dynamically filter routes based on type or difficulty. This applies to all pages in the application and updates on the fly!
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "three",
  mounted() {
    this.$store.commit('demo/updateSheet', true)
  }
};
</script>
