<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" fixed app clipped>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <hr />
      <div>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="fa-search"
          label="Search"
          v-model="filterText"
        ></v-text-field>
        <component :is="sidebar" />
      </div>
    </v-navigation-drawer>
    <v-toolbar
      color="primary"
      dark
      fixed
      app
      extended
      clipped-left
      extension-height="12"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <img style="max-width:50px" src="../static/ClimbAssist_Logo_img.png" />
      <v-flex hidden-sm-and-down shrink>
        <v-toolbar-title>Climb Assist</v-toolbar-title>
      </v-flex>
      <v-spacer />
      <navbar />
      <v-spacer />
      <v-bottom-sheet inset>
        <v-btn slot="activator" light>
          <v-icon color="primary">fa-sliders-h</v-icon>
        </v-btn>
        <v-container class="sheet-front">
          <v-layout row>
            <v-flex>
              <v-card-text>
                <h3>Type:</h3>
              </v-card-text>
            </v-flex>
            <v-flex>
              <v-checkbox :label="`Bouldering`" v-model="filterTemp.boulder" />
            </v-flex>
            <v-flex>
              <v-checkbox :label="`Sport`" v-model="filterTemp.sport" />
            </v-flex>
            <v-flex>
              <v-checkbox :label="`Trad`" v-model="filterTemp.trad" />
            </v-flex>
          </v-layout>
          <v-layout v-if="filterTemp.boulder" row>
            <v-flex xs2>
              <v-card-text>
                <h3>UIAA Grade:</h3>
              </v-card-text>
            </v-flex>
            <v-flex xs2>
              <v-card-text>
                <p class="text-xs-left">
                  V{{ filterTemp.uiaa_grade[0] }} to V{{
                    filterTemp.uiaa_grade[1]
                  }}
                </p>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-range-slider
                v-model="filterTemp.uiaa_grade"
                :max="16"
                :min="0"
                :step="1"
              />
            </v-flex>
          </v-layout>
          <v-layout v-if="filterTemp.sport || filterTemp.trad" row>
            <v-flex xs2>
              <v-card-text>
                <h3>YDS Grade:</h3>
              </v-card-text>
            </v-flex>
            <v-flex xs2>
              <v-card-text>
                <p class="text-xs-left">
                  5.{{ filterTemp.yds_grade[0] }} to 5.{{
                    filterTemp.yds_grade[1]
                  }}
                </p>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-range-slider
                v-model="filterTemp.yds_grade"
                :max="16"
                :min="1"
                :step="1"
              />
            </v-flex>
          </v-layout>
          <v-layout v-show="submitButton">
            <v-btn @click="setFilter()">submit</v-btn>
          </v-layout>
        </v-container>
      </v-bottom-sheet>
    </v-toolbar>
    <v-content d-inline>
      <v-snackbar v-model="snackbar" top :timeout="timeout">
        By using this site you agree to the &nbsp;<nuxt-link to="/terms"
          >terms and conditions</nuxt-link
        >
        <v-btn color="primary" flat @click="snackbar = false">
          OK
        </v-btn>
      </v-snackbar>
      <nuxt />
    </v-content>
    <bottomNav />
  </v-app>
</template>
<script>
import DefaultView from "../components/sidebar/DefaultView.vue";
import AreaView from "../components/sidebar/AreaView.vue";
import FrameView from "../components/sidebar/FrameView.vue";
import MapViewArea from "../components/sidebar/MapViewArea.vue";
import MapViewCrag from "../components/sidebar/MapViewCrag.vue";
import Navbar from "../components/Navbar.vue";
import BottomNavbar from "../components/BottomNavbar.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  data: () => ({
    drawer: null,
    areaView: false,
    items: [
      {
        icon: "fa-edit",
        title: "editor",
        to: "/editor"
      },
      {
        icon: "fa-home",
        title: "home",
        to: "/"
      },
      {
        icon: "fa-list",
        title: "list",
        to: "/list"
      },
      {
        icon: "fa-map",
        title: "map",
        to: "/map"
      }
    ],
    cragRoutes: null,
    frameTabs: "info",
    snackbar: true,
    timeout: 10000,
    filterTemp: {
      uiaa_grade: [0, 16],
      yds_grade: [1, 16],
      boulder: true,
      sport: true,
      trad: true
    },
    countries: [
      {
        name: "US",
        states: [
          {
            name: "Colorado",
            areas: [
              {
                name: "Boulder Canyon",
                description:
                  "This is a canyon in Colorado. It is close to Boulder and has some sweet stuff.",
                slug: "boulder-canyon",
                crags: [
                  {
                    name: "Bell Buttress", // string
                    slug: "bell-buttress",
                    prime_img: require("@/static/ClimbAssist_Logo_img.png"),
                    description:
                      "this is a description of the crag. There are many interesting things about this crag which include...", // string
                    model: {
                      link: "@/static/model/Bell_Buttress.glb", // string
                      north: "@/static/model/north.glb", // string
                      // in radians
                      min_azumuth: -Math.PI / 2, // decimal
                      max_azumuth: Math.PI / 2 // decimal
                    },
                    location: {
                      crag_longitude: -105.353307, // decimal ,
                      crag_latitude: 40.004741, // decimal
                      parking_longitude: "longitude", // decimal
                      parking_latitude: "latitude", // decimal
                      zoom: 17, // int
                      // highlighted area
                      path_points: [
                        {
                          longitude: "longitude", // decimal
                          latitude: "latitude" // decimal
                        }
                      ]
                    },
                    walls: [
                      {
                        name: "Main Area", // string
                        slug: "main-wall",
                        routes: [
                          {
                            name: "Bell Air", // string
                            slug: "bell-air",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "trad", // int
                            description: "route desc", // string
                            protection: "bolts,  medium gear", // string
                            grade: 11, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "b/c", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              },
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              },
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Bolted slab to a corner to set pro followed by bolted slab to anchors.", // string
                                grade: 11, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "b/c" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              },
                              {
                                description: "Follow the Arete to anchors.", // string
                                grade: 11, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "b/c" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -34.291804689264524, // decimal
                              y: 5.1252091833622355, // decimal
                              z: 12.772592164960535 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            decals: [
                              {
                                name: "tick name", // string
                                descpription: "desc", // string
                                user: "user name", // string
                                type: "type", // string or int
                                position: {
                                  x: -34.51264075758657, // decimal
                                  y: -3.7173118471933932, // decimal
                                  z: 14.384959218460395 // decimal
                                },
                                orientation: {
                                  x: -0.17663852454226386, // decimal
                                  y: -0.7283504327666126, // decimal
                                  z: -0.11826146320292473 // decimal
                                },
                                size: {
                                  x: 5, // decimal
                                  y: 5, // decimal
                                  z: 5 // decimal
                                },
                                map: "diffuse location" // string
                              }
                            ]
                          },
                          {
                            name: "The Pitts", // string
                            slug: "the-pitts",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "trad", // int
                            description: "route desc", // string
                            protection: "Gear to 3.5 in.", // string
                            grade: 11, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "b", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Traditionally start in the gully to the right of Bell Air, most opt to do P1 of Bell Air due to the poor quality of the chimney.", // string
                                grade: 7, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              },
                              {
                                description:
                                  "Climb a short corner then up the main hand crack to the top.", // string
                                grade: 11, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "b" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -30.89251757281371, // decimal
                              y: 6.2459773821355515, // decimal
                              z: 12.606131413596962 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "North Face", // string
                            slug: "north-face",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "trad", // int
                            description: "route desc", // string
                            protection: "Standard Rack", // string
                            grade: 10, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "b", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Follow a ramp left to a crack leading to a belay in an alcove.", // string
                                grade: 10, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "b" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              },
                              {
                                description:
                                  "Climb a crack leading to the top of Cosmosis.", // string
                                grade: 9, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -27.666004728232153, // decimal
                              y: 9.521462215388226, // decimal
                              z: 20.070766225144204 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Hound Dog", // string
                            slug: "hound-dog",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description:
                              "Head up from behind a tree close to the wall. Follow the boltline up for a crimpy well protected route. Stay right when the boltline splits after the 8th bolt.", // string
                            protection: "10 bolts", // string
                            grade: 11, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Head up from behind a tree close to the wall. Follow the boltline up for a crimpy well protected route. Stay right when the boltline splits after the 8th bolt.", // string
                                grade: 11, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -27.193399957111204, // decimal
                              y: 3.722917390102767, // decimal
                              z: 22.451980657607116 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Freak on a Leash", // string
                            slug: "freak-on-a-leash",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description:
                              "Start as Hound Dog then head left at bolt 8 to a difficult face finish.", // string
                            protection: "13 bolts", // string
                            grade: 13, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Start as Hound Dog then head left at bolt 8 to a difficult face finish.", // string
                                grade: 13, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -26.353565000645403, // decimal
                              y: 4.366464003864957, // decimal
                              z: 24.36608994473032 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Grand Inquisitor", // string
                            slug: "grand-inquisitor",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "trad", // int
                            description:
                              "Begin below an overhang. Gain the roof and continue up a crack following the corner to the anchors.", // string
                            protection: "2 bolts, gear to 3.5 in.", // string
                            grade: 12, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Begin below an overhang. Gain the roof and continue up a crack following the corner to the anchors.", // string
                                grade: 12, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -25.5763576856447, // decimal
                              y: 4.01666549572145, // decimal
                              z: 26.221236976701615 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "The Purpose", // string
                            slug: "the-purpose",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description:
                              "Start below the overhang and follow the bolted seam to the anchors.", // string
                            protection: "6 bolts", // string
                            grade: 12, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "c", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Start below the overhang and follow the bolted seam to the anchors.", // string
                                grade: 12, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "c" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -23.775770542492648, // decimal
                              y: 3.852023200566011, // decimal
                              z: 27.938688061252773 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Gates of Eden", // string
                            slug: "gates-of-eden",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "trad", // int
                            description:
                              "Climb the wide crack out of the overhang. Head right to join the second pitch of Cosmosis or left to the anchors of Hound Dog.", // string
                            protection: "Gear to 4.5 in.", // string
                            grade: 10, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "b", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Climb the wide crack out of the overhang. Head right to join the second pitch of Cosmosis or left to the anchors of Hound Dog.", // string
                                grade: 10, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "b" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -21.41331349649115, // decimal
                              y: -0.1299052595742456, // decimal
                              z: 29.657438361400207 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Tiempos de Ceguera", // string
                            slug: "tiempos-de-ceguera",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description:
                              "Climb the arete right of Gates of Eden.", // string
                            protection: "6 bolts", // string
                            grade: 13, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "b", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Climb the arete right of Gates of Eden.", // string
                                grade: 13, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "b" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -20.819345782399765, // decimal
                              y: -1.7787086911949546, // decimal
                              z: 30.463009762765083 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Double Jeopardy", // string
                            slug: "double-jeapardy",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "trad", // int
                            description:
                              "Climb the chimney. Stemming and crack climbing.", // string
                            protection: "Standard Rack", // string
                            grade: 9, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Climb the chimney. Stemming and crack climbing.", // string
                                grade: 9, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -19.385388931584096, // decimal
                              y: 0.39593495979628157, // decimal
                              z: 28.69278375511307 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Bell Buster", // string
                            slug: "bell-buster",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description:
                              "Face climb to an arete located right of the chimney.", // string
                            protection: "7 bolts", // string
                            grade: 11, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Face climb to an arete located right of the chimney.", // string
                                grade: 11, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -18.24527489950414, // decimal
                              y: -2.888562517271743, // decimal
                              z: 30.09373506222233 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "The Spoils", // string
                            slug: "the-spoils",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "trad", // int
                            description:
                              "Head up a flake leading to an overhanging corner. Head to Bell Buster anchors. Often toproped.", // string
                            protection: "Gear to 2 in.", // string
                            grade: 12, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "b", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Head up a flake leading to an overhanging corner. Head to Bell Buster anchors. Often toproped.", // string
                                grade: 12, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "b" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -13.337026844784525, // decimal
                              y: 1.0789794369070904, // decimal
                              z: 31.16949057983168 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "The Spoiled Moose", // string
                            slug: "the-spoiled-moose",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "trad", // int
                            description:
                              "Head up The Spoiles then veer right when the crack splits leading to the anchors for P1 of Cosmosis.", // string
                            protection: "Gear to 2 in.", // string
                            grade: 13, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a R", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Head up The Spoiles then veer right when the crack splits leading to the anchors for P1 of Cosmosis.", // string
                                grade: 13, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a R" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -12.650724718832478, // decimal
                              y: 2.551029067644925, // decimal
                              z: 32.09512575501667 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Verve", // string
                            slug: "verve",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description: "Climb the bolted arete.", // string
                            protection: "4 bolts", // string
                            grade: 13, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "c", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description: "Climb the bolted arete.", // string
                                grade: 13, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "c" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -10.501676439525376, // decimal
                              y: 1.5803805031712346, // decimal
                              z: 31.933465523063518 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Cosmosis", // string
                            slug: "cosmosis",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "trad", // int
                            description: "Climb the bolted arete.", // string
                            protection: "Standard Rack", // string
                            grade: 10, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Climb the right-facing corner to a small roof with the anchors above.", // string
                                grade: 10, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              },
                              {
                                description:
                                  "Climb the face above to a corner leading to the top.", // string
                                grade: 9, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: -10.41648723035362, // decimal
                              y: -0.8420367813028315, // decimal
                              z: 28.625393505605523 // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          }
                        ]
                      },
                      {
                        name: "Bean Liqour Area", // string
                        slug: "bean-liqour-wall",
                        routes: [
                          {
                            name: "Bean Bagger", // string
                            slug: "bean-bagger",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description: "route desc", // string
                            protection: "6 bolts", // string
                            grade: 11, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "The left-line on Bean Liquor Area climbs a bulge then an arete.", // string
                                grade: 11, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: "x_coord", // decimal
                              y: "y_coord", // decimal
                              z: "z_coord" // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Hambanger", // string
                            slug: "hambanger",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description: "route desc", // string
                            protection: "9 bolts", // string
                            grade: 10, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "d", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Begin on the face then move to a corner leading to an arete to finish.", // string
                                grade: 10, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "d" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: "x_coord", // decimal
                              y: "y_coord", // decimal
                              z: "z_coord" // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Nice Doggie", // string
                            slug: "nice-doggie",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description: "route desc", // string
                            protection: "7 bolts", // string
                            grade: 12, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Boltline above block just right of the large tree.", // string
                                grade: 12, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: "x_coord", // decimal
                              y: "y_coord", // decimal
                              z: "z_coord" // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Wee Bean Jammin", // string
                            slug: "wee-bean-jammin",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description: "route desc", // string
                            protection: "6 bolts", // string
                            grade: 11, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "c/d", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Boltline just right of Nice Doggie following a corner.", // string
                                grade: 11, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a/d" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: "x_coord", // decimal
                              y: "y_coord", // decimal
                              z: "z_coord" // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Beano Hangover", // string
                            slug: "beano-hangover",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description: "route desc", // string
                            protection: "5 bolts", // string
                            grade: 12, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Furthest to the right is a bolt line leading to a corner followed by a crack to the anchors.", // string
                                grade: 12, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: "x_coord", // decimal
                              y: "y_coord", // decimal
                              z: "z_coord" // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          }
                        ]
                      },
                      {
                        name: "The Patio Area", // string
                        slug: "the-patio-wall",
                        routes: [
                          {
                            name: "Carrying Futons", // string
                            slug: "carrying-futons",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description: "route desc", // string
                            protection: "6 bolts", // string
                            grade: 11, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "c", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Farthest left of the patio area. Climb a bulge to a steep face.", // string
                                grade: 11, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "c" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: "x_coord", // decimal
                              y: "y_coord", // decimal
                              z: "z_coord" // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          },
                          {
                            name: "Clyde's Big Adventure", // string
                            slug: "clydes-big-adventure",
                            prime_img: require("@/static/ClimbAssist_Logo_img.png"), // string
                            style: "sport", // int
                            description: "route desc", // string
                            protection: "6 bolts", // string
                            grade: 12, // string or int VB through V16 for bouldering 5.1 through 5.16 for roped // get from highest value in pitches if applicable
                            gradeModifier: "a", // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                            photos: [
                              {
                                src: require("@/static/ClimbAssist_Logo_img.png"), // string
                                user: "user name" // string
                              }
                            ],
                            comments: [
                              {
                                comment: "comment",
                                user: "user name"
                              }
                            ],
                            // if applicable
                            pitches: [
                              {
                                description:
                                  "Start below the roof and stay right of the arete. Shares anchors with Carrying Futons.", // string
                                grade: 12, // string or int V0 through V13 for bouldering 4 through 15 for roped
                                gradeModifier: "a" // string '-' or '+' for bouldering 'a' 'b' 'c' 'd' for roped
                              }
                            ],
                            center: {
                              x: "x_coord", // decimal
                              y: "y_coord", // decimal
                              z: "z_coord" // decimal
                            },
                            points: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ],
                            // if applicable
                            anchors: [
                              {
                                x: "x_coord", // decimal
                                y: "y_coord", // decimal
                                z: "z_coord" // decimal
                              }
                            ]
                            // if applicable
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }),
  computed: {
    filterText: {
      get() {
        return this.$store.state.filter.filter.filterText;
      },
      set(value) {
        this.$store.commit("filter/updateFilterText", value);
      }
    },
    filter() {
      return this.$store.state.filter.filter;
    },
    sidebar() {
      return this.$store.state.sidebar.sidebar;
    },
    ...mapGetters({
      filteredRoutes: "filter/filteredRoutes"
    }),
    submitButton() {
      if (
        this.filter.uiaa_grade[0] === this.filterTemp.uiaa_grade[0] &&
        this.filter.uiaa_grade[1] === this.filterTemp.uiaa_grade[1] &&
        this.filter.yds_grade[0] === this.filterTemp.yds_grade[0] &&
        this.filter.yds_grade[1] === this.filterTemp.yds_grade[1] &&
        this.filter.boulder === this.filterTemp.boulder &&
        this.filter.sport === this.filterTemp.sport &&
        this.filter.trad === this.filterTemp.trad
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    setFilter() {
      this.$store.commit("filter/updateFilter", this.filterTemp);
    },
    string_to_slug(str) {
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      const to = "aaaaeeeeiiiioooouuuunc------";
      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

      return str;
    }
  },
  components: {
    defaultV: DefaultView,
    areaV: AreaView,
    frameV: FrameView,
    mapareaV: MapViewArea,
    mapcragV: MapViewCrag,
    navbar: Navbar,
    bottomNav: BottomNavbar
  },
  created() {
    this.$store.commit("filter/updateRoutes", this.countries);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#menu-options {
  padding-left: 5px;
}
</style>

<style scoped>
.sheet-front {
  background-color: white;
}
.selected-route {
  color: green;
}
</style>
