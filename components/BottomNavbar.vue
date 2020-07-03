<template>
  <v-bottom-navigation v-if="sidebar === 'frameV'" app v-model="frameTabs" color="white">
    <v-btn color="green" text value="info" data-testid="bottom-nav-info-button">
      <span>Info</span>
      <v-icon>fa-info</v-icon>
    </v-btn>

    <v-btn color="green" text value="model">
      <span>Model</span>
      <v-icon>fa-cube</v-icon>
    </v-btn>

    <v-btn color="green" text value="mapcrag">
      <span>map</span>
      <v-icon>fa-map</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "bottomNav",
  computed: {
    frameTabs: {
      get() {
        return this.$store.state.frame.frameTabs;
      },
      set(value) {
        this.$store.commit("frame/cragView", value);
      }
    },
    sidebar() {
      return this.$store.state.sidebar.sidebar;
    }
  }
};
</script>
