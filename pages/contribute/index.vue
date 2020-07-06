<template>
  <v-container>
    <h1>Contribute</h1>
    <h3>Excited for More?</h3>
    <p><em>We are too!</em></p>

    <p class="text-left">
      We are currently focusing our efforts on capturing as many of the US crags
      as possible and developing key app features. In order to improve this
      guide and keep it to a upt do date, we can use all the help we can get.
    </p>

    <p class="text-left">
      We can only accept so much help at once so please do not feel dismayed if
      we take a while to respond. Much thanks in advance!
    </p>
    <v-card class="my-4">
      <v-card-title>
        <h2><v-icon>fa-hand-holding-usd</v-icon> Support</h2>
      </v-card-title>
      <v-card-text class="text-left">
        <p>
          This is currently being funded by a few founders who are pouring in
          time and money to cover the expenses. If you would like to help out it
          would be much apprecieated!
        </p>
        <p>
          You can donate directly with
          <a target="_blank" href="https://www.paypal.me/ClimbAssist">Paypal</a>

          or check out the swag at
          <a target="_blank" href="https://climb-assist.myshopify.com"
            >The Store</a
          >
        </p>
        <p>
          If you can't contribute financially you can still help us out by
          <a @click.stop="dialog = true">Subscribing to our Newsletter</a> and
          following us on
          <a
            href="https://facebook.com/climbassist"
            target="_blank"
            class="px-2"
            >Facebook</a
          >
          and
          <a
            href="https://instagram.com/climbassist"
            target="_blank"
            class="px-2"
            >Instagram</a
          >
          to keep up with the latest updates!
        </p>
      </v-card-text>
    </v-card>

    <v-card class="my-4">
      <v-card-title>
        <h2><v-icon>fa-pencil-alt</v-icon> Content</h2>
      </v-card-title>
      <v-card-text class="text-left">
        <p>
          Climb Assist is the modern day guidebook. Paper, sketches, 2D images,
          and write-ups used to be all that was available to share climbing
          information. We now have the technology to more effectively convey how
          to get to the crag, how to locate a route, and how best to climb it
          (if the beta is welcomed)and how to climb it.
        </p>

        <p>
          First and foremost, quality information is how we can make Climb
          Assist useful. To our dismay, we have not climbed the 150 thousand+
          routes in the US, so we rely heavily on you to use the app and share
          your invaluable knowledge. The tools Climb Assist offers will enable
          us to build the most kicka** guidebook. Please help us make this
          platform useful to others by sharing your experience and knowledge,
          and of course, please show your friends!
        </p>

        <p>
          Please reach out to us on the
          <nuxt-link to="/contact">contact page</nuxt-link> if you feel you are
          a local expert at one of our featured crags. We are seeking local crag
          experts who can help moderate the content on our site to ensure top
          quality.
        </p>
      </v-card-text>
    </v-card>
    <v-card class="my-4">
      <v-card-title>
        <h2><v-icon>fa-laptop-code</v-icon> Software Development</h2>
      </v-card-title>
      <v-card-text class="text-left">
        <p>
          The current app is just the beginning and we're looking to do some fun
          and innovative development. Please reach out to us on the
          <nuxt-link to="/contact">contact page</nuxt-link> if you are a
          developer with willing to volunteer your time. we are currently
          working with or looking for people with experience in one or more of
          the following:
        </p>
        <ul>
          <li>WebGL or OpenGL Graphics</li>
          <li>Vue</li>
          <li>React Native or Native Script</li>
          <li>Native Local File Storage and Management</li>
          <li>Java</li>
          <li>Machine Learning</li>
        </ul>
      </v-card-text>
    </v-card>
    <v-card class="my-4">
      <v-card-title>
        <h2><v-icon>fa-camera-retro</v-icon> Content Capturing</h2>
      </v-card-title>
      <v-card-text class="text-left">
        <p>
          We use photogrammetry to create our 3d topographical maps of climbs.
          Capturing a sufficient amount of quality photos is laborious and time
          intensive. Creating a model requires 75 - 400 raw photos from all
          angles (including above) during a low shadow environment to create a
          high quality model. We use drones to capture most of our models but
          some boulders can be captured using a standard camera and an
          extendable pole.
        </p>

        <h3>Drone</h3>
        <p>
          Due how highly regulated nature of drones and disruptive they can be
          to other climbers, we will only consider professional pilots who are
          FAA certified. Please reach out to us on the
          <nuxt-link to="/contact">contact page</nuxt-link> if you feel you meet
          these criteria.
        </p>
        <strong>General Requirements:</strong>
        <ul>
          <li>FAA-Certified Drone Pilot</li>
          <li>Experienced</li>
          <li>Safety Conscious</li>
          <li>Considerate of the environment</li>
          <li>
            Willing to fly in cold weather conditions and at very early times of
            the day
          </li>
        </ul>
        <br />
        <h3>Terrestrial</h3>
        <p>
          There are much fewer regulations if you are able to capture crags
          using terrestrial (from the ground) photography. Please reach out to
          us on the
          <nuxt-link to="/contact">contact page</nuxt-link> if you feel this can
          be safely accomplished at your crag and have a camera which meets the
          general requirements below.
        </p>
        <ul>
          <li>Minimum 12MP Camera</li>
          <li>Geolocation Equiped Camera</li>
          <li>Camera Extension</li>
        </ul>
      </v-card-text>
    </v-card>

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
  </v-container>
</template>

<script>
export default {
  name: "about",
  data: () => ({
    dialog: false,
  }),
  props: {},
  methods: {},
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
