<template>
  <v-card>
    <v-card-text>
      The <v-app-bar-nav-icon /> navigation button allows you to navigation and search within the site.
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "four",
  mounted() {
    this.$store.commit('demo/updateSheet', false)
    this.$store.commit('demo/updateDrawer', true)
  }
};
</script>
