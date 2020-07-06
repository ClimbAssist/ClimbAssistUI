<template>
  <v-list two-line>
    <div v-for="(wall, wi) in crag.walls" :key="wi">
      <div v-for="(route, index) in wall.routes" :key="index">
        <v-list-item v-if="index == 0">
          <v-list-item-content>
            <v-list-item-title class="green--text text--darken-1">{{
              crag.walls[wi].name
            }}</v-list-item-title>
            <v-list-item-subtitle
              ><span v-if="wall.trad">trad {{ wall.trad }}</span>
              <span v-if="wall.sport"> sport {{ wall.sport }}</span>
              <span v-if="wall.boulder">
                boulder {{ wall.boulder }}</span
              ></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="
            activeRoute &&
            wi === activeRoute.wall &&
            index === activeRoute.route
          "
          ripple
          @click="removeActiveRoute()"
          class="primary"
        >
          <v-list-item-content>
            <v-list-item-title class="white--text"
              >{{ route.routeNum }} {{ route.name }}</v-list-item-title
            >
            <v-list-item-subtitle class="grey--text text--lighten-2"
              >{{ route.style }} <span v-if="route.style === 'boulder'">V</span
              ><span v-if="route.style === 'trad' || route.style === 'sport'"
                >5.</span
              >{{ route.grade }}{{ route.gradeModifier }}
              <span v-if="route.pitches.length > 1">
                {{ route.pitches.length }} pitches</span
              ></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="
            !activeRoute ||
              (activeRoute.route != index || activeRoute.wall != wi)
          "
          ripple
          @click="updateActiveRoute(wi, index)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ route.routeNum }} {{ route.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ route.style }} <span v-if="route.style === 'boulder'">V</span
              ><span v-if="route.style === 'trad' || route.style === 'sport'"
                >5.</span
              >{{ route.grade }}{{ route.gradeModifier }}
              <span v-if="route.pitches.length > 1">
                {{ route.pitches.length }} pitches
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "frameV",
  computed: {
    ...mapGetters({
      crag: "filter/crag",
    }),
    activeRoute() {
      return this.$store.state.frame.activeRoute;
    },
  },
  methods: {
    updateActiveRoute(w, r) {
      const activeRoute = { wall: w, route: r };
      this.$store.commit("frame/updateActiveRoute", activeRoute);
    },
    removeActiveRoute() {
      this.$store.commit("frame/updateActiveRoute", null);
    },
  },
};
</script>
