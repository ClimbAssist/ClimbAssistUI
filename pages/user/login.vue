<template>
  <section id="login">
    <v-container>
      <v-card>
        <v-card-text class="pa-5">
          <v-img
            :src="require('@/static/logo.png')"
            class="mb-3 mx-auto"
            width="150"
          />
          <h3 class="text-xs-center">Sign in to Climb Assist</h3>
          <v-layout justify-center>
            <v-flex md8 sm12>
              <v-form @keyup.enter="submit()">
                <v-text-field
                  v-model="email"
                  autofocus
                  label="Username or Email"
                  name="email"
                />
                <v-text-field
                  v-model="password"
                  :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                  :type="show ? 'text' : 'password'"
                  class="mb-3"
                  label="Password"
                  name="password"
                  @click:append="show = !show"
                />
              </v-form>
              <v-layout wrap justify-center>
                <v-flex md6 lg4>
                  <v-btn
                    block
                    text
                    dark
                    small
                    color="primary"
                    to="/user/signup"
                  >
                    Create account
                  </v-btn>
                </v-flex>
                <v-flex md6 lg4>
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on }">
                      <v-btn block small color="primary" text dark v-on="on">
                        Forgot Password?
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title
                        class="headline primary white--text"
                        primary-title
                      >
                        Send Password Reset Email
                      </v-card-title>
                      <v-card-text>
                        <v-form @keyup.enter="submit">
                          <v-text-field
                            v-model="email"
                            autofocus
                            label="Username or Email"
                            name="email"
                          />
                        </v-form>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-btn flat @click="dialog = false">
                          Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          flat
                          @click="(dialog = false), sendPassReset()"
                        >
                          Send
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-flex>
                <v-flex md12 lg4>
                  <v-btn
                    :disabled="!email || !password"
                    :loading="isLoading"
                    class="text-capitalize"
                    color="primary"
                    depressed
                    block
                    @click="submit"
                  >
                    Submit
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  data: () => ({
    show: false,
    email: "",
    password: "",
    isLoading: false,
    dialog: false
  }),
  computed: {},
  methods: {
    async sendPassReset() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        try {
          await this.$axios.post("/v1/user/send-password-reset-email", {
            email: this.email
          });
          this.$router.push({
            name: "user-password-reset",
            params: {
              user: this.email
            }
          });
        } catch (error) {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          if (error.response.status == 404) {
            this.$store.commit("snackbar/updateMessage", "User does not exist");
          } else {
            this.$store.commit("snackbar/updateMessage", error.message);
          }
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
        }
      } else {
        try {
          await this.$axios.post("/v1/user/send-password-reset-email", {
            username: this.email
          });
          this.$router.push({
            name: "user-password-reset",
            params: {
              user: this.email
            }
          });
        } catch (error) {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          if (error.response.status === "404") {
            this.$store.commit("snackbar/updateMessage", "User does not exist");
          } else {
            this.$store.commit(
              "snackbar/updateMessage",
              error.response.data.error.message
            );
          }
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
        }
      }
    },
    async submit() {
      this.isLoading = true;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        try {
          await this.$axios.post("/v1/user/sign-in", {
            email: this.email,
            password: this.password
          });

          const user = await this.$axios.$get("/v1/user");
          this.$store.commit("user/updateUsername", user.data.username);
          this.$store.commit("user/updateEmail", user.data.email);
          this.$store.commit(
            "user/updateIsAdministrator",
            user.data.isAdministrator
          );

          this.$store.commit("snackbar/updateType", "success");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit("snackbar/updateMessage", "Login successful");
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
          this.$store.commit("user/updateLogin", true);

          this.$router.push("/");
        } catch (error) {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          if (error.response.status === 404) {
            this.$store.commit("snackbar/updateMessage", "User does not exist");
          } else if (error.response.status === 401) {
            this.$store.commit(
              "snackbar/updateMessage",
              "Username and Password do not match"
            );
          } else {
            this.$store.commit(
              "snackbar/updateMessage",
              "Invalid Username or Password"
            );
          }
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
        }
        this.isLoading = false;
      } else {
        try {
          await this.$axios.post("/v1/user/sign-in", {
            username: this.email,
            password: this.password
          });
          const user = await this.$axios.$get("/v1/user");

          this.$store.commit("user/updateUsername", user.data.username);
          this.$store.commit("user/updateEmail", user.data.email);
          this.$store.commit(
            "user/updateIsAdministrator",
            user.data.isAdministrator
          );

          this.$store.commit("snackbar/updateType", "success");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit("snackbar/updateMessage", "Login Successful");
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);

          this.$router.push("/");
        } catch (error) {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          if (error.response.status === 404) {
            this.$store.commit("snackbar/updateMessage", "User does not exist");
          } else if (error.response.status === 401) {
            this.$store.commit(
              "snackbar/updateMessage",
              "Username and Password do not match"
            );
          } else {
            this.$store.commit(
              "snackbar/updateMessage",
              "Invalid Username or Password"
            );
          }
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
        }
        this.isLoading = false;
      }
    }
  }
};
</script>
