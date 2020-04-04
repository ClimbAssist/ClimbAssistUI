<template>
  <section id="signup">
    <VContainer>
      <VLayout>
        <VFlex xs12>
          <VImg
            :src="require('@/static/logo.png')"
            class="mb-3"
            height="200"
            max-height="200"
            style="width: 100%;"
            contain
          />
          <h2>Create your Climb Assist Account!</h2>
          <VForm ref="form" v-model="form" class="mb-5">
            <VContainer>
              <VLayout wrap>
                <VFlex xs12>
                  <VTextField
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
                </VFlex>
                <VFlex xs12>
                  <VTextField
                    v-model="email"
                    :rules="[
                      rules.required('Enter your email address'),
                      rules.email('invalid email address')
                    ]"
                    validate-on-blur
                    label="Email"
                    name="email"
                  />
                </VFlex>
                <VFlex md6 xs12>
                  <VTextField
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
                </VFlex>
                <VFlex md6 xs12>
                  <VTextField
                    v-model="confirmPassword"
                    :append-icon="showConfirm ? 'fa-eye' : 'fa-eye-slash'"
                    :rules="[
                      rules.required('Confirm you password'),
                      rules.confirm
                    ]"
                    :type="showConfirm ? 'text' : 'password'"
                    label="Confirm password"
                    validate-on-blur
                    @click:append="showConfirm = !showConfirm"
                  />
                </VFlex>
                <VFlex xs12>
                  <VMessages
                    :value="[
                      'Use 8 or more characters with a mix of letters, numbers & symbols'
                    ]"
                  />
                </VFlex>
              </VLayout>
              <VLayout align-center justify-space-between pt-3>
                <VFlex grow>
                  <BaseText to="/user/signin">
                    Already have an account?
                  </BaseText>
                  <v-btn color="primary" flat to="/user/login">
                    Login
                  </v-btn>
                </VFlex>
                <vue-recaptcha sitekey="6Ld-Nl0UAAAAAN2imm8GeEIPU_Ve63A1DJFY33pT" :loadRecaptchaScript="true">
                </vue-recaptcha>
                <VFlex shrink>
                  <v-btn
                    :disabled="!form"
                    :loading="isLoading"
                    color="primary"
                    prominent
                    @click="submit"
                  >
                    Submit
                  </v-btn>
                </VFlex>
              </VLayout>
            </VContainer>
          </VForm>
        </VFlex>
      </VLayout>
    </VContainer>
  </section>
</template>

<script>
// Utilities
import axios from "axios";
import VueRecaptcha from 'vue-recaptcha';
export default {
  data() {
    const data = {
      isLoading: false,
      form: false,
      username: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      rules: {
        required: msg => v => !!v || msg,
        username: msg => v => /^[_A-z0-9'-]{5,}$/.test(v) || msg,
        confirm: v => (v ? v === this.password : "Passwords do not match"),
        email: msg => v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || msg,
        pass: msg => v => /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/.test(v) || msg
      },
      show: false,
      showConfirm: false
    };
    return data;
  },
  // middleware: 'nocreation',
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      this.isLoading = true;
      this.$axios.post('/v1/user/register',{
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then((res) => {
          this.$store.commit("snackbar/updateType", "success")
          this.$store.commit("snackbar/updateTimeout", 10000)
          this.$store.commit("snackbar/updateMessage",  "Account created. Check your email for verification")
          this.$store.commit("snackbar/updateSnackbar", true)
          this.$store.commit("snackbar/link", undefined)
          this.$store.commit("snackbar/linkMessage", undefined)

          this.$router.push("/user/confirmation");
        })
        .catch(err => {
          this.$store.commit("snackbar/updateType", "error")
          this.$store.commit("snackbar/updateTimeout", 10000)
          this.$store.commit("snackbar/updateMessage",  err.message)
          this.$store.commit("snackbar/updateSnackbar", true)
          this.$store.commit("snackbar/link", undefined)
          this.$store.commit("snackbar/linkMessage", undefined)
        })
        .finally(() => (this.isLoading = false));
    }
  },
  components: { VueRecaptcha }
};
</script>
