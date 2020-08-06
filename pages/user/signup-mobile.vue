<template>
  <section id="signup" v-if="!signedUp">
    <v-container>
      <v-card>
        <v-card-text class="pa-5">
          <v-img
            :src="require('@/static/logo.png')"
            class="mb-3 mx-auto"
            width="150"
          />
          <h3>Create your Climb Assist Account!</h3>
          <v-layout justify-center>
            <v-flex md8 sm12>
              <v-form ref="form" v-model="form">
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    :rules="[
                      rules.required('Enter user name'),
                      rules.username('invalid user name')
                    ]"
                    label="User Name"
                    hint="Must be at least 5 characters using letters, numbers, underscores, or hyphens"
                    persistent-hint
                    validate-on-blur
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="email"
                    :rules="[
                      rules.required('Enter your email address'),
                      rules.email('invalid email address')
                    ]"
                    validate-on-blur
                    label="Email"
                    name="email"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                    :rules="[
                      rules.required('Enter a password'),
                      rules.pass('invalid password')
                    ]"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    @click:append="show = !show"
                  />
                </v-flex>
                <v-flex xs12>
                  <VMessages
                    :value="[
                      'Use 8 or more characters with a mix of letters, numbers & symbols'
                    ]"
                  />
                </v-flex>
              </v-form>
              <v-layout row class="pt-2 pb-2 justify-center">
                <v-flex md6 lg4 class="pt-2 pb-2">
                  <vue-recaptcha
                    :sitekey="siteKey"
                    @verify="onVerify"
                    :loadRecaptchaScript="true"
                  >
                  </vue-recaptcha>
                </v-flex>
                <v-flex md12 lg4 class="pt-2 pb-2">
                  <v-btn
                    :disabled="!form || !recaptchaRes"
                    :loading="isLoading"
                    color="primary"
                    prominent
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
  <section id="verification" v-else>
    <v-container>
      <h2>
        Thanks for creating an account! Check your email to verify your address
        before logging in.
      </h2>
    </v-container>
  </section>
</template>

<script>
// Utilities
import axios from "axios";
import VueRecaptcha from "vue-recaptcha";
export default {
  layout: "noFrame",
  data() {
    const data = {
      isLoading: false,
      form: false,
      username: undefined,
      email: undefined,
      password: undefined,
      signedUp: false,
      rules: {
        required: msg => v => !!v || msg,
        username: msg => v => /^[_A-z0-9'-]{5,}$/.test(v) || msg,
        email: msg => v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || msg,
        pass: msg => v => /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/.test(v) || msg
      },
      show: false,
      recaptchaRes: undefined
    };
    return data;
  },
  // middleware: "nocreation",
  computed: {
    siteKey() {
      return this.$store.state.contact.recaptchaKey;
    }
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      this.isLoading = true;
      this.$axios
        .post("/v1/user/register", {
          username: this.username,
          email: this.email,
          password: this.password,
          recaptchaRes: this.recaptchaRes
        })
        .then(res => {
          this.signedUp = true;
        })
        .catch(error => {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit(
            "snackbar/updateMessage",
            error.response.data.error.message
          );
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/link", undefined);
          this.$store.commit("snackbar/linkMessage", undefined);
        })
        .finally(() => (this.isLoading = false));
    },
    onVerify(response) {
      this.recaptchaRes = response;
    }
  },
  async fetch({ store }) {
    if (process.env.NODE_ENV === "development") {
      let devKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
      store.commit("contact/updateRecaptchaKey", devKey);
    } else {
      try {
        let api = (await axios.get("/v1/recaptcha-site-key")).data;
        let siteKey = api.data.siteKey;
        store.commit("contact/updateRecaptchaKey", siteKey);
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: { VueRecaptcha }
};
</script>
