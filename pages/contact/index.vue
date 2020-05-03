<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex>
        <v-img
          :src="require('@/static/logo.png')"
          class="mb-3 mx-auto"
          width="150"
        />
      </v-flex>
    </v-layout>
    <v-card>
      <v-card-title>
        Contact Us
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="form">
          <v-text-field
            v-model="email"
            autofocus
            label="Email Address"
            validate-on-blur
            name="email"
            :rules="[
              rules.required('Enter an Email'),
              rules.email('Not a valid email address')
            ]"
          />
          <v-select
          label="Topic"
          v-model="subject"
          :items="subjectList"
          :rules="[
            rules.required('Select a Topic')
          ]"
          />
          <v-textarea
            name="input-7-4"
            label="Message"
            v-model="body"
            :rules="[
              rules.required('Enter a message')
            ]"
            auto-grow
          ></v-textarea>
          <v-layout wrap justify-end class="my-2">
            <vue-recaptcha
              :sitekey="siteKey"
              @verify="onVerify"
              :loadRecaptchaScript="true"
            >
            </vue-recaptcha>
            <v-btn color="primary" :disabled="!form || !recaptchaRes" class="ml-2" @click="sendEmail()">
              Send
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import axios from "axios";
export default {
  name: "contact",
  data: () => ({
    email: undefined,
    subject: undefined,
    subjectList: ["General Inquery", "Feedback", "Volunteer Dev", "Volunteer Content", "Volunteer Photos"],
    body: undefined,
    form: false,
    recaptchaRes: false,
    rules: {
      required: msg => v => !!v || msg,
      email: msg => v =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || msg
    },
  }),
  computed: {
    siteKey() {
      return this.$store.state.contact.recaptchaKey;
    }
  },
  methods: {
    async sendEmail() {
      let mail = {
        replyToEmail: this.email,
        subject: "contact form - [" + this.subject + "]",
        body: this.body,
        recaptchaRes: this.recaptchaRes
      };
        try {
          await this.$axios.$post("/v1/contact", mail);

          this.$store.commit("snackbar/updateType", "success");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit(
            "snackbar/updateMessage",
            "Message Sent"
          );
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
          if(document.referrer.indexOf('climbassist.com') >= 0) {
              history.go(-1);
          }
          else {
              this.$router.push('/') // this might just be '/' of your site
          }
        } catch (error) {
          this.$store.commit("snackbar/updateType", "error");
          this.$store.commit("snackbar/updateTimeout", 10000);
          this.$store.commit(
            "snackbar/updateMessage",
            "Unable to send message" + error.response.data.error.message
          );
          this.$store.commit("snackbar/updateSnackbar", true);
          this.$store.commit("snackbar/updateLink", undefined);
          this.$store.commit("snackbar/updateLinkMessage", undefined);
      }
    },
    onVerify(response) {
      this.recaptchaRes = response;
    }
  },
  async fetch({store}) {
    if (process.env.NODE_ENV === 'development') {
      let devKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
      store.commit("contact/updateRecaptchaKey", devKey);
    } else {
      try {
        let api = (await axios.get('/v1/recaptcha-site-key')).data;
        let siteKey = api.data.siteKey
        store.commit("contact/updateRecaptchaKey", siteKey);
      } catch(error) {
        console.log(error)
      }
    }
  },
  components: { VueRecaptcha }
};
</script>
