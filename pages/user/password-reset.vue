<template>
  <section id="confirmation">
    <v-container>
      <h2>
        Please check your email and enter the code and a new password below.
      </h2>
      <v-form @keyup.enter="submit()" ref="form" v-model="form">
        <v-text-field
          v-model="verificationCode"
          autofocus
          :rules="[rules.required('Enter your pass code')]"
          label="Verification Code"
          name="code"
        />
        <v-text-field
          v-model="password"
          :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
          :type="show ? 'text' : 'password'"
          :rules="[
            rules.required('Enter a password'),
            rules.pass('invalid password'),
          ]"
          class="mb-3"
          label="New Password"
          name="password"
          hint="Use 8 or more characters with a mix of letters, numbers and symbols"
          persistent-hint
          @click:append="show = !show"
        />
      </v-form>
      <v-btn
        color="primary"
        @click="submit()"
        :disabled="!form"
        :loading="isLoading"
        >submit</v-btn
      >
    </v-container>
  </section>
</template>

<script>
export default {
  data: () => ({
    password: "",
    verificationCode: "",
    form: false,
    isLoading: false,
    rules: {
      required: (msg) => (v) => !!v || msg,
      pass: (msg) => (v) =>
        /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/.test(v) || msg,
    },
  }),
  middleware: "loggedin",
  computed: {
    username() {
      return this.$route.params.user;
    },
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      this.isLoading = true;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.username)) {
        this.$axios
          .post("/v1/user/reset-password", {
            email: this.username,
            newPassword: this.password,
            verificationCode: this.verificationCode,
          })
          .then((res) => {
            this.$store.commit("snackbar/updateType", "success");
            this.$store.commit("snackbar/updateTimeout", 10000);
            this.$store.commit(
              "snackbar/updateMessage",
              "Password Reset Successful"
            );
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/updateLink", undefined);
            this.$store.commit("snackbar/updateLinkMessage", undefined);
            this.$router.push("/user/login");
          })

          .catch((error) => {
            this.$store.commit("snackbar/updateType", "error");
            this.$store.commit("snackbar/updateTimeout", 10000);
            if (error.response.status === 401) {
              this.$store.commit(
                "snackbar/updateMessage",
                "Incorrect Verification Code"
              );
            } else {
              this.$store.commit("snackbar/updateMessage", error.message);
            }
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/link", undefined);
            this.$store.commit("snackbar/linkMessage", undefined);
          })
          .finally(() => (this.isLoading = false));
      } else {
        this.$axios
          .post("/v1/user/reset-password", {
            username: this.username,
            newPassword: this.password,
            verificationCode: this.verificationCode,
          })
          .then((res) => {
            this.$store.commit("snackbar/updateType", "success");
            this.$store.commit("snackbar/updateTimeout", 10000);
            this.$store.commit(
              "snackbar/updateMessage",
              "Password Reset Successful"
            );
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/updateLink", undefined);
            this.$store.commit("snackbar/updateLinkMessage", undefined);
            this.$router.push("/user/login");
          })

          .catch((error) => {
            this.$store.commit("snackbar/updateType", "error");
            this.$store.commit("snackbar/updateTimeout", 10000);
            if (error.response.status === 401) {
              this.$store.commit(
                "snackbar/updateMessage",
                "Incorrect Verification Code"
              );
            } else {
              this.$store.commit("snackbar/updateMessage", error.message);
            }
            this.$store.commit("snackbar/updateSnackbar", true);
            this.$store.commit("snackbar/link", undefined);
            this.$store.commit("snackbar/linkMessage", undefined);
          })
          .finally(() => (this.isLoading = false));
      }
    },
  },
};
</script>
