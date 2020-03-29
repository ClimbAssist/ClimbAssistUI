<template>
  <v-footer inset app absolute v-if="visible">
    <v-layout row>
      <v-btn text to="/terms">terms of use</v-btn>
      <v-btn text to="/contact">Contact Us</v-btn>
      <v-btn @click.stop="dialog = true" text>
        <v-icon left>fas fa-envelope</v-icon>
        subscribe</v-btn
      >
      <a href="https://facebook.com/climbassist" target="_blank" rel="noopener" class="px-2" alt="Facebook">
        <v-icon large>fab fa-facebook</v-icon>
      </a>
      <a href="https://instagram.com/climbassist" target="_blank" rel="noopener" class="px-2" alt="instagram">
        <v-icon large>fab fa-instagram</v-icon>
      </a>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline text-align-center"
            >Subscribe to Newsletter</v-card-title
          >
          <v-card-text>
            <!-- Begin Mailchimp Signup Form -->
            <link
              href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css"
              rel="stylesheet"
              type="text/css"
            />
            <style type="text/css">
              #mc_embed_signup {
                background: #fff;
                clear: left;
                font: 14px Helvetica, Arial, sans-serif;
                width: 100%;
              }
              /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
          	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
            </style>
            <div id="mc_embed_signup">
              <form
                action="https://climbassist.us18.list-manage.com/subscribe/post?u=0974084833e773056cf9ad1f8&amp;id=ac305881b8"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                class="validate"
                target="_blank"
                novalidate
              >
                <div id="mc_embed_signup_scroll">
                  <input
                    type="email"
                    value=""
                    name="EMAIL"
                    class="email"
                    id="mce-EMAIL"
                    placeholder="email address"
                    required
                  />
                  <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                  <div
                    style="position: absolute; left: -5000px;"
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      name="b_0974084833e773056cf9ad1f8_ac305881b8"
                      tabindex="-1"
                      value=""
                    />
                  </div>
                  <div class="clear">
                    <input
                      type="submit"
                      value="Subscribe"
                      name="subscribe"
                      color="green"
                      id="mc-embedded-subscribe"
                      class="button"
                      @click="dialog = false"
                    />
                  </div>
                </div>
              </form>
            </div>
            <!--End mc_embed_signup-->
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-footer>
</template>

<script>
import axios from "axios";
export default {
  name: "footerbar",
  data() {
    return {
      dialog: false,
      width: undefined
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar.sidebar;
    },
    frameTabs() {
      return this.$store.state.frame.frameTabs;
    },
    editTabs() {
      return this.$store.state.editor.editTabs;
    },
    visible() {
      if (
        this.editTabs === "model" ||
        ((this.width < 960 && this.frameTabs === "model") ||
          this.frameTabs === "mapcrag")
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    onWindowResize() {
      this.width = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener("resize", this.onWindowResize, false);
    this.onWindowResize();
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
#mc-embedded-subscribe.button {
  background-color: #449947;
}
#mc-embedded-subscribe.button:hover {
  background-color: #449947;
}
</style>
