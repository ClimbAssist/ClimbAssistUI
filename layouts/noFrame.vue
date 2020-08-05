<template>
  <v-app> <snackbar /> <nuxt /> </v-app>
</template>
<script>
import Snackbar from "../components/Snackbar.vue";
export default {
  components: { snackbar: Snackbar }
};
</script>
