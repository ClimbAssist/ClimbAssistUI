<template>
  <v-container fluid>
    <v-img
      src="https://picsum.photos/350/165?random"
      height="400"
      width="100%"
      gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)"
      class="white--text text-center"
    >
      <h1 class="mt-10">
        {{ area.name }}
      </h1>
    </v-img>
    <v-container>
      <!-- <v-layout wrap>
        <v-card
          transition="expand-transition"
          :max-height="descLimit"
          style="overflow:hidden; white-space: pre-line;"
        >
          {{ area.area.description }}
        </v-card>
        <v-row align-content="end" class="pb-4">
          <v-flex> </v-flex>
          <v-btn
            class="ma-2"
            small
            :color="descIcon.color"
            @click="expandDesc = !expandDesc"
          >
            <v-icon>{{ descIcon.item }}</v-icon>
          </v-btn>
        </v-row>
      </v-layout> -->
      <v-layout wrap>
        <v-card
          transition="expand-transition"
          :max-height="descLimit"
          style="overflow:hidden; white-space: pre-line;"
          class="text-left pa-4"
        >
          {{ area.area.description }}
        </v-card>
        <v-row align-content="end" class="pb-4">
          <v-flex> </v-flex>
          <v-btn
            class="ma-2"
            small
            :color="descIcon.color"
            @click="expandDesc = !expandDesc"
          >
            <v-icon>{{ descIcon.item }}</v-icon>
          </v-btn>
        </v-row>
      </v-layout>
      <v-expansion-panels class="pb-4">
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ headline }}
          </v-expansion-panel-header>
          <v-expansion-panel-content
            class="text-left"
            style="white-space: pre-line;"
          >
            {{ area.area.description }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels class="pb-4" :value="chartExpand">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-flex xs12 sm2 offset-sm1>
              <v-card-text>
                <h3 class="text-xs-center text-sm-right">Stats:</h3>
              </v-card-text>
            </v-flex>
            <v-flex xs4 sm2 offset-sm1>
              <v-card-text v-if="area.trad" class="text-sm-left text-xs-center">
                <v-avatar size="25" class="white--text" color="trad">
                  {{ area.trad }}</v-avatar
                >
                <span>Trad</span>
              </v-card-text>
            </v-flex>
            <v-flex xs4 sm2 fill-height align-self-center>
              <v-card-text
                class="text-sm-left text-xs-center"
                v-if="area.sport"
              >
                <v-avatar size="25" class="white--text" color="sport">
                  {{ area.sport }} </v-avatar
                ><span> Sport</span>
              </v-card-text>
            </v-flex>
            <v-flex xs4 sm2>
              <v-card-text
                v-if="area.boulder"
                class="text-sm-left text-xs-center"
              >
                <v-avatar size="25" class="white--text" color="boulder">
                  {{ area.boulder }} </v-avatar
                ><span> Boulder</span>
              </v-card-text>
            </v-flex>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-layout row justify-center>
              <v-flex sm10 xs12>
                <canvas id="gradeChartRope" :height="ropeShow" />
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex sm10 xs12>
                <canvas id="gradeChartBoulder" :height="boulderShow" />
              </v-flex>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card class="pb-4 mb-4">
        <v-card-title> Topos </v-card-title>
        <v-card
          v-for="n in 9"
          :key="n"
          class="d-inline-flex pa-4 ma-2"
          max-width="250"
          @click="toTopo()"
          hover
        >
          <v-row>
            <v-img
              :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
              :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
              aspect-ratio="1"
              height="200"
              width="200"
              class=" ma-2"
              gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="white--text align-end">
                Topo Name
              </v-card-title>
            </v-img>
            <v-card-text>
              <span v-if="area.trad" class="text-sm-left text-xs-center">
                <v-avatar size="25" class="white--text" color="trad">
                  {{ area.trad }}</v-avatar
                >
                <span>Trad</span>
              </span>

              <span class="text-sm-left text-xs-center" v-if="area.sport">
                <v-avatar size="25" class="white--text" color="sport">
                  {{ area.sport }} </v-avatar
                ><span> Sport</span>
              </span>

              <span v-if="area.boulder" class="text-sm-left text-xs-center">
                <v-avatar size="25" class="white--text" color="boulder">
                  {{ area.boulder }} </v-avatar
                ><span> Sport</span>
              </span>
            </v-card-text>

            <v-card-text style="white-space: pre-line;">
              {{ headline }}
            </v-card-text>
          </v-row>
        </v-card>
      </v-card>
      <AreaMap />
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold">
            Getting There
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit
            sed ullamcorper morbi tincidunt ornare massa eget. Egestas diam in
            arcu cursus euismod quis viverra nibh. Magna fermentum iaculis eu
            non diam phasellus. Tempor orci dapibus ultrices in iaculis.
            Elementum integer enim neque volutpat ac tincidunt vitae semper. Leo
            in vitae turpis massa sed elementum tempus egestas sed. Elit at
            imperdiet dui accumsan sit.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-slide-group v-model="model" class="pa-4" show-arrows="desktop">
        <v-slide-item v-for="pi in 9" :key="pi">
          <v-hover>
            <template v-slot:default="{ hover, focus }">
              <v-card
                color="grey lighten-1"
                class="ma-4"
                @click="lightbox = !lightbox"
              >
                <v-img
                  :src="`https://picsum.photos/500/300?image=${pi * 5 + 10}`"
                  aspect-ratio="1"
                  height="200"
                  width="200"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="white--text align-end"
                >
                </v-img>
                <v-fade-transition>
                  <v-overlay v-if="hover || focus" absolute> </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
      <v-overlay :value="lightbox">
        <v-carousel>
          <v-carousel-item
            v-for="i in 9"
            :key="i"
            :src="`https://picsum.photos/500/300?image=${i * 5 + 10}`"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
        <v-btn @click="lightbox = !lightbox">
          close
        </v-btn>
      </v-overlay>

      <v-toolbar dark color="primary">
        <v-toolbar-title>TODO: Remove with new APIs</v-toolbar-title>
      </v-toolbar>
      <v-layout v-if="ropeShow || boulderShow">
        <v-expansion-panels
          v-if="
            area.area.subAreas.length > 1 ||
              area.area.subAreas[0].name !== area.name
          "
        >
          <v-expansion-panel
            v-for="(subArea, subi) in area.filteredSubAreas"
            :key="subi"
          >
            <v-expansion-panel-header>
              <v-flex class="text-left" justify-center>
                {{ subArea.name }} -
                <span v-if="subArea.trad"
                  >{{ subArea.trad }}
                  <span class="trad-style"> trad </span></span
                >
                <span v-if="subArea.sport"
                  >{{ subArea.sport }}
                  <span class="sport-style"> sport </span></span
                >
                <span v-if="subArea.boulder"
                  >{{ subArea.boulder }}
                  <span class="boulder-style"> boulder </span></span
                >
              </v-flex>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-layout wrap>
                <v-flex xs12 sm2 offset-sm1>
                  <v-card-text>
                    <h3 class="text-sm-right text-xs-center">
                      Description:
                    </h3>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 sm8 fill-height>
                  <v-card-text
                    class="text-sm-left text-xs-center"
                    style="white-space: pre-line;"
                    >{{ subArea.subArea.description }}</v-card-text
                  >
                </v-flex>
              </v-layout>
              <v-layout v-for="(crag, ci) in subArea.filteredCrags" :key="ci">
                <nuxt-link
                  :to="{
                    name: 'crags-frame',
                    params: {
                      subAreaKey: subArea.subAreaKey,
                      cragKey: crag.cragKey,
                      area: area.slug,
                      frame: crag.slug
                    }
                  }"
                  >{{ crag.name }}</nuxt-link
                >&nbsp; - &nbsp;<span v-if="crag.trad"
                  >{{ crag.trad }} <span class="trad-style"> trad </span>
                </span>
                <span v-if="crag.sport"
                  >{{ crag.sport
                  }}<span class="sport-style"> sport </span></span
                >
                <span v-if="crag.boulder">
                  {{ crag.boulder }}
                  <span class="boulder-style"> boulder </span>
                </span>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-layout class="pa-2" wrap v-else>
          <v-flex
            xs12
            v-for="(crag, ci) in area.filteredSubAreas[0].filteredCrags"
            :key="ci"
          >
            <nuxt-link
              :to="{
                name: 'crags-frame',
                params: {
                  cragKey: crag.cragKey,
                  area: area.slug,
                  frame: crag.slug
                }
              }"
              >{{ crag.name }}</nuxt-link
            >&nbsp; - &nbsp;<span v-if="crag.trad"
              >{{ crag.trad }} <span class="trad-style"> trad </span>
            </span>
            <span v-if="crag.sport"
              >{{ crag.sport }}<span class="sport-style"> sport </span></span
            >
            <span v-if="crag.boulder">
              {{ crag.boulder }}
              <span class="boulder-style"> boulder </span>
            </span>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import AreaMap from "./AreaMap.vue";
import Chart from "chart.js";
import axios from "axios";
export default {
  data() {
    return {
      ropeShow: 0,
      boulderShow: 0,
      expandDesc: false,
      chartExpand: 0,
      lightbox: false,
      headline:
        "This is the headline of the description, it will be a single line limited to 200 characters that contains key details and will be displayed on the parent page."
    };
  },
  watch: {
    gradeTotals: {
      handler() {
        let filteredTrad = this.gradeTotals.trad.filter(function(el) {
          return el != null;
        });
        let filteredSport = this.gradeTotals.sport.filter(function(el) {
          return el != null;
        });
        let labels = [];
        for (let i in this.gradeTotals.total) {
          labels.push("5." + i);
        }
        this.gradeChartRope.data.datasets[0].data = filteredTrad;
        this.gradeChartRope.data.datasets[1].data = filteredSport;
        this.gradeChartRope.data.labels = labels;
        this.gradeChartRope.update();

        let boulderLabels = [];
        for (let i in this.gradeTotals.boulder) {
          boulderLabels.push("V" + i);
        }

        let filteredBoulder = this.gradeTotals.boulder.filter(function(el) {
          return el != null;
        });
        this.gradeChartBoulder.data.datasets[0].data = filteredBoulder;
        this.gradeChartBoulder.data.labels = boulderLabels;
        this.gradeChartBoulder.update();

        // this.typeChart.data.datasets[0].data = [this.crag.trad, this.crag.sport, this.crag.boulder]
        // this.typeChart.update()
      }
    }
  },
  computed: {
    ...mapGetters({
      area: "filter/area"
    }),
    gradeTotals() {
      let gradeTotals = {
        trad: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sport: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        boulder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
      for (let subkey in this.area.filteredSubAreas) {
        for (let ckey in this.area.filteredSubAreas[subkey].filteredCrags) {
          for (let wkey in this.area.filteredSubAreas[subkey].filteredCrags[
            ckey
          ].walls) {
            for (let rkey in this.area.filteredSubAreas[subkey].filteredCrags[
              ckey
            ].walls[wkey].routes) {
              let route = this.area.filteredSubAreas[subkey].filteredCrags[ckey]
                .walls[wkey].routes[rkey];
              if (route.style === "trad") {
                gradeTotals.trad[route.grade]++;
                gradeTotals.total[route.grade]++;
              } else if (route.style === "sport") {
                gradeTotals.sport[route.grade]++;
                gradeTotals.total[route.grade]++;
              } else {
                gradeTotals.boulder[route.grade]++;
              }
            }
          }
        }
      }
      for (let gkey in gradeTotals.total) {
        if (gradeTotals.total[gkey] === 0) {
          delete gradeTotals.total[gkey];
          delete gradeTotals.trad[gkey];
          delete gradeTotals.sport[gkey];
        }
        if (gradeTotals.boulder[gkey] === 0) {
          delete gradeTotals.boulder[gkey];
        }
      }
      return gradeTotals;
    },
    descIcon() {
      return this.expandDesc
        ? { item: "mdi-minus", color: "red" }
        : { item: "mdi-plus", color: "primary" };
    },
    descLimit() {
      return this.expandDesc ? undefined : 60;
    }
  },
  methods: {
    setChartShow() {
      for (let subkey in this.area.area.subAreas) {
        for (let ckey in this.area.area.subAreas[subkey].crags) {
          for (let wkey in this.area.area.subAreas[subkey].crags[ckey].walls) {
            for (let rkey in this.area.area.subAreas[subkey].crags[ckey].walls[
              wkey
            ].routes) {
              let route = this.area.area.subAreas[subkey].crags[ckey].walls[
                wkey
              ].routes[rkey];
              if (this.ropeShow && this.boulderShow) {
                return;
              }
              if (route.style === "trad" || route.style === "sport") {
                this.ropeShow = "30px";
              } else if (route.style === "boulder") {
                this.boulderShow = "30px";
              }
            }
          }
        }
      }
    },
    setCharts() {
      let ctx = document.getElementById("gradeChartRope");
      let labels = [];
      for (let i in this.gradeTotals.total) {
        labels.push("5." + i);
      }
      let filteredTrad = this.gradeTotals.trad.filter(function(el) {
        return el != null;
      });
      let filteredSport = this.gradeTotals.sport.filter(function(el) {
        return el != null;
      });
      let boulderLabels = [];
      for (let i in this.gradeTotals.boulder) {
        boulderLabels.push("V" + i);
      }
      let filteredBoulder = this.gradeTotals.boulder.filter(function(el) {
        return el != null;
      });
      this.gradeChartRope = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Trad Routes",
              data: filteredTrad,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              barThickness: 20
            },
            {
              label: "Sport Routes",
              data: filteredSport,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              barThickness: 20
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false,
                  beginAtZero: true
                },
                stacked: true
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false,
                  beginAtZero: false
                },
                stacked: true
              }
            ]
          },
          legend: {
            display: false
          }
        }
      });

      ctx = document.getElementById("gradeChartBoulder");

      this.gradeChartBoulder = new Chart(ctx, {
        type: "bar",
        data: {
          labels: boulderLabels,
          datasets: [
            {
              label: "Bouldering Routes",
              data: filteredBoulder,
              backgroundColor: "rgba(255, 204, 51, 0.2)",
              borderColor: "rgba(255, 255, 51, 1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false,
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false,
                  beginAtZero: false
                }
              }
            ]
          },
          legend: {
            display: false
          }
        }
      });
      this.chartExpand = undefined;
      // ctx = document.getElementById("typeChart");
      // let types = [this.crag.trad, this.crag.sport, this.crag.boulder]
      // this.typeChart = new Chart(ctx, {
      //   type: "pie",
      //   data: {
      //     labels: ['Trad', 'Sport', 'Boulder'],
      //     datasets: [
      //       {
      //         label: "Route Type",
      //         data: types,
      //         backgroundColor: [
      //           "rgba(255, 99, 132, 0.2)",
      //           "rgba(54, 162, 235, 0.2)",
      //           "rgba(255, 206, 86, 0.2)",
      //           "rgba(75, 192, 192, 0.2)",
      //           "rgba(153, 102, 255, 0.2)",
      //           "rgba(255, 159, 64, 0.2)"
      //         ],
      //         borderColor: [
      //           "rgba(255, 99, 132, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(255, 206, 86, 1)",
      //           "rgba(75, 192, 192, 1)",
      //           "rgba(153, 102, 255, 1)",
      //           "rgba(255, 159, 64, 1)"
      //         ],
      //         borderWidth: 1
      //       }
      //     ]
      //   },
      //   options: {
      //     scales: {
      //       yAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //             drawBorder: false
      //           },
      //           ticks: {
      //             display: false
      //           }
      //         }
      //       ],
      //       xAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //             drawBorder: false
      //           },
      //           ticks: {
      //             display: false
      //           }
      //         }
      //       ]
      //     }
      //   }
      // });
    },
    toTopo() {
      //TODO send to route
      return;
    }
  },
  components: {
    AreaMap: AreaMap
  },
  created() {
    this.setChartShow();
  },
  mounted() {
    if (this.ropeShow || this.boulderShow) {
      this.setCharts();
    }
  }
};
</script>

<style scoped>
.trad-style {
  color: #ff3300;
}
.sport-style {
  color: #0066ff;
}
.boulder-style {
  color: #efd369;
}
</style>
