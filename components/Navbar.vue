<template>
  <div>
    <!--googleon: index-->
    <v-flex hidden-md-and-up data-testid="small">
      <v-toolbar-title
        v-if="sidebar === 'frameV'"
        data-testid="small-crag-name"
        >{{ crag.name }}</v-toolbar-title
      >
      <v-toolbar-title
        v-else-if="sidebar === 'areaV'"
        data-testid="small-area-name"
        >{{ area.name }}</v-toolbar-title
      >
      <v-toolbar-title v-else data-testid="small-company-name"
        >Climb Assist (beta)</v-toolbar-title
      >
    </v-flex>
    <v-spacer />
    <v-flex v-if="sidebar === 'areaV'" hidden-sm-and-down data-testid="area">
      <v-toolbar-title data-testid="area-name">{{ area.name }}</v-toolbar-title>
    </v-flex>
    <v-flex v-if="sidebar === 'frameV'" hidden-sm-and-down data-testid="crag">
      <v-toolbar-title data-testid="crag-name">{{ crag.name }}</v-toolbar-title>
      <!--googleoff: index-->
      <v-btn-toggle
        light
        dense
        mandatory
        v-model="frameTabs"
        color="primary"
        data-testid="nav-buttons"
      >
        <v-btn
          :color="iconColor[0]"
          outlined
          value="info"
          data-testid="nav-info-button"
        >
          <span :class="bottomBorder[0]">
            <v-icon :color="iconColor[0]">fa-info</v-icon>
            <span>Info</span>
          </span>
        </v-btn>

        <v-btn
          :color="iconColor[1]"
          outlined
          value="model"
          data-testid="nav-model-button"
        >
          <span :class="bottomBorder[1]">
            <v-icon :color="iconColor[1]">fa-cube</v-icon>
            <span>Model</span>
          </span>
        </v-btn>

        <v-btn
          :color="iconColor[2]"
          outlined
          value="mapcrag"
          data-testid="nav-map-button"
        >
          <span :class="bottomBorder[2]">
            <v-icon :color="iconColor[2]">fa-map</v-icon>
            <span>Map</span>
          </span>
        </v-btn>
      </v-btn-toggle>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    frameTabs: {
      get() {
        return this.$store.state.frame.frameTabs;
      },
      set(value) {
        this.$store.commit("frame/cragView", value);
      }
    },
    iconColor() {
      let iconColor = ["grey", "grey", "grey"];
      if (this.frameTabs === "info") {
        iconColor[0] = "primary";
      } else if (this.frameTabs === "model") {
        iconColor[1] = "primary";
      } else {
        iconColor[2] = "primary";
      }
      return iconColor;
    },
    bottomBorder() {
      let bottomBorder = ["bottom-border", "bottom-border", "bottom-border"];
      if (this.frameTabs === "info") {
        bottomBorder[0] = "bottom-border-active";
      } else if (this.frameTabs === "model") {
        bottomBorder[1] = "bottom-border-active";
      } else {
        bottomBorder[2] = "bottom-border-active";
      }
      return bottomBorder;
    },
    crag() {
      return this.$store.state.filter.cragState;
    },
    area() {
      return this.$store.state.filter.areaState;
    },
    sidebar() {
      return this.$store.state.sidebar.sidebar;
    }
  }
};
</script>
<style>
.bottom-border {
  border-bottom: 5px solid white;
}
.bottom-border-active {
  border-bottom: 5px solid #449947;
}
</style>
