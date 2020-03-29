<template>
  <v-container>
    <v-card>
      <v-container>
        <v-icon large>fa-user-circle</v-icon>
        <h2>{{ username }}</h2>

        <v-layout row justify-center>
          {{ email }}
          <!-- <v-flex xs12 sm4 class="text-sm-left text-xs-center"
            ><v-btn @click="changeEmail">
              Change Email
            </v-btn></v-flex
          > -->
        </v-layout>
        <v-layout row justify-center>
          <v-btn @click="logout">logout</v-btn>
        </v-layout>
        <v-layout row justify-center>
          <v-dialog v-model="passwordDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">
                Change Password
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline" primary-title>
                Change Password
              </v-card-title>

              <v-card-text>
                set current password and new password
              </v-card-text>
              <v-card-text>
                <v-form ref="form" v-model="form">
                  <v-text-field
                    v-model="currentPassword"
                    :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                    :type="show ? 'text' : 'password'"
                    class="mb-3"
                    label="Current Password"
                    name="password"
                    @click:append="show = !show"
                  />
                  <v-text-field
                    v-model="newPassword"
                    :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                    :type="show ? 'text' : 'password'"
                    :rules="[
                      rules.required('Enter a password'),
                      rules.pass('invalid password')
                    ]"
                    hint="Use 8 or more characters with a mix of letters, numbers and symbols"
                    persistent-hint
                    class="mb-3"
                    label="New Password"
                    name="newPassword"
                    validate-on-blur
                    @click:append="show = !show"
                  />
                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn flat @click="passwordDialog = false">
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="!form"
                  :loading="isLoading"
                  flat
                  @click="(passwordDialog = false), changePassword()"
                >
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
        <v-layout row justify-end>
          <v-dialog v-model="deleteDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn color="red lighten-2" dark v-on="on">
                Delete Account
              </v-btn>
            </template>

            <v-card>
              <v-card-title
                class="headline red lighten-2 white--text"
                primary-title
              >
                Delete Account
              </v-card-title>

              <v-card-text>
                Are you sure you wish to delete this account? This cannot be
                undone
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn flat @click="deleteDialog = false">
                  No
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  flat
                  @click="(deleteDialog = false), deleteUser()"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    deleteDialog: false,
    passwordDialog: false,
    currentPassword: "",
    newPassword: "",
    form: false,
    isLoading: false,
    rules: {
      required: msg => v => !!v || msg,
      pass: msg => v => /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/.test(v) || msg
    }
  }),
  middleware: 'loggedin',
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    email() {
      return this.$store.state.user.email;
    }
  },
  methods: {
    async logout() {
      this.$axios
        .$post("/v1/user/sign-out")
        .then(res => {
          this.$store.commit("snackbar/updateType", "success");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit("snackbar/updateMessage", "Logged Out");
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/link", undefined);
          this.$store.commit("snackbar/linkMessage", undefined);

          //user
          this.$store.commit("user/updateUsername", undefined);
          this.$store.commit("user/updateEmail", undefined);
          this.$store.commit("user/updateIsAdministrator", false);

          this.$router.push("/");
        })
        .catch(err => {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit("snackbar/updateMessage", err.message);
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/link", undefined);
          this.$store.commit("snackbar/linkMessage", undefined);
        });
    },
    deleteUser() {
      this.$axios
        .$delete("/v1/user")
        .then(res => {
          this.$store.commit("snackbar/updateType", "success");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit("snackbar/updateMessage", "Account Deleted");
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/link", undefined);
          this.$store.commit("snackbar/linkMessage", undefined);

          //user
          this.$store.commit("user/updateUsername", undefined);
          this.$store.commit("user/updateEmail", undefined);
          this.$store.commit("user/updateIsAdministrator", false);

          this.$router.push("/");
        })
        .catch(err => {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit("snackbar/updateMessage", err.message);
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/link", undefined);
          this.$store.commit("snackbar/linkMessage", undefined);
        });
    },
    changePassword() {
      if (!this.$refs.form.validate()) return;
      this.isLoading = true;
      this.$axios
        .$post("/v1/user/change-password", {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        })
        .then(res => {
          this.$store.commit("snackbar/updateType", "success");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit(
            "snackbar/updateMessage",
            "Password has been updated"
          );
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/link", undefined);
          this.$store.commit("snackbar/linkMessage", undefined);
        })
        .catch(err => {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit("snackbar/updateMessage", err.message);
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/link", undefined);
          this.$store.commit("snackbar/linkMessage", undefined);
        });
      this.isLoading = false;
    },
    changeEmail() {}
  }
};
</script>
