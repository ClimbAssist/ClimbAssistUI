<template>
    <v-container >
      <v-card class="my-4">
        <v-card-title>
        <h1>About</h1>
      </v-card-title>
        <v-card-text class="text-left">
          <p>Climb Assist is a modern solution for outdoor rock climbing information.</p>
          <p>The climbing community has all the collective knowledge for route finding, beta, equipment for protection, etc. but it is scattered across multiple sources.</p>
          <p>Climb Assist provides you with the tools and platform needed to share your information and experience and allow everyone to learn what they need to climb without ever stepping foot at the crag.</P>
        </v-card-text>
        <v-layout wrap justify-space-around>
          <div class="img-holder">
            <v-img class="my-2" :src="require('@/static/map.png')"
            max-width=200
            />
            <v-card-text max-width=200 class="text-center">
              Map with GPS support to get you to the climb
            </v-card-text>
          </div>
          <div class="img-holder">
            <v-img class="my-2" :src="require('@/static/model.gif')"
            max-width=200
            />
            <v-card-text max-width=200 class="text-center">
              3D model to visualize the routes
            </v-card-text>
          </div>
          <div class="img-holder">
            <v-img class="my-2" :src="require('@/static/info.png')"
            max-width=200
            />
            <v-card-text max-width=200 class="text-center">
              Detailed descriptions and photographs
            </v-card-text>
          </div>
        </v-layout>
      </v-card>
      <v-card class="my-4">
        <v-card-title>
        <h1>Starting Out</h1>
        </v-card-title>
        <v-card-text class="text-left">
          <p>After being featured in a <a href="https://rockandice.com/climbing-news/the-climbing-topos-of-the-future-3d-climbing-maps-with-climb-assist/">Rock and Ice Article</a> mid 2018, many climbers realized how superior 3D topos were compared to 2D photos.</p>
          <p>A few climbers with experience in photogrammetry, 3D modeling, and programming got together and decided to team up and create the ultimate guidebook.</p>
          <p>We believe that the current solutions are simply not enough and want to bring a new platform to the climber.</p>
        </v-card-text>
      </v-card>
      <v-card class="my-4">
        <v-card-title>
        <h1>To the Future</h1>
        </v-card-title>
        <v-card-text class="text-left">
          <p>We're excited for the 2020 year and have big plans to expand and improve the project</p>
          <p>Some features you can expect to see include:</p>
          Users
          <ul>
            <li>Add beta directly to the 3D model</li>
            <li>Rate, add photos, and comment on routes</li>
          </ul>
          App
          <ul>
            <li>Download the models for offline use at the crag!</li>
            <li>Additional geolocation references to help you find the crag</li>
          </ul>
          Content
          <ul>
            <li>New areas across the US</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-container>
</template>

<script>
export default {
  name: 'about',
  data: () => ({}),
  props: {},
  methods: {}
}
</script>
<style scoped>
.img-holder {
  width: 200px;
}
</style>
