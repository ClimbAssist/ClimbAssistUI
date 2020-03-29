<template>
  <v-container fluid>
    <AreaMap />
    <v-card>
      <v-layout wrap  >
        <v-flex xs12 sm2 offset-sm1>
          <v-card-text>
            <h3 class="text-sm-right text-xs-center">Description:</h3>
          </v-card-text>
        </v-flex>
        <v-flex xs12 sm8 fill-height>
          <v-card-text>
            <p class="text-sm-left text-xs-center" style="white-space: pre-line;">{{ area.area.description }}</p>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout wrap fill-height align-center>
        <v-flex xs12 sm2 offset-sm1>
          <v-card-text>
            <h3 class="text-xs-center text-sm-right">Routes:</h3>
          </v-card-text>
        </v-flex>
        <v-flex xs4 sm2 offset-sm1>
          <v-card-text v-if="area.trad" class="text-sm-left text-xs-center">
            {{ area.trad }} <span class="trad-style">Trad</span>
          </v-card-text>
        </v-flex>
        <v-flex xs4 sm2 fill-height align-self-center>
          <v-card-text class="text-sm-left text-xs-center" v-if="area.sport">
            {{ area.sport }} <span class="sport-style">Sport</span>
          </v-card-text>
        </v-flex>
        <v-flex xs4 sm2>
          <v-card-text v-if="area.boulder" class="text-sm-left text-xs-center">
            {{ area.boulder }} <span class="boulder-style">Boulder</span>
          </v-card-text>
        </v-flex>
      </v-layout>
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
      <v-container>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ area.name }}</v-toolbar-title>
          </v-toolbar>
          <v-layout >
            <v-expansion-panels v-if="area.area.subAreas.length > 1 || area.area.subAreas[0].name!==area.name">
              <v-expansion-panel
                v-for="(subArea, subi) in area.filteredSubAreas"
                :key="subi"
              >
                <v-expansion-panel-header>
                  <v-flex class="text-left" justify-center>
                    {{ subArea.name }} - <span v-if="subArea.trad">{{ subArea.trad }} <span class="trad-style"> trad </span></span>
                    <span v-if="subArea.sport">{{ subArea.sport }} <span class="sport-style"> sport  </span></span> <span v-if="subArea.boulder">{{ subArea.boulder }} <span class="boulder-style"> boulder  </span></span>
                  </v-flex>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                <v-layout wrap >
                  <v-flex xs12 sm2 offset-sm1>
                    <v-card-text>
                      <h3 class="text-sm-right text-xs-center">Description:</h3>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs12 sm8 fill-height>
                    <v-card-text class="text-sm-left text-xs-center" style="white-space: pre-line;">{{ subArea.subArea.description }}</v-card-text>
                  </v-flex>
                </v-layout>
                <v-layout
                v-for="(crag, ci) in subArea.filteredCrags"
                :key="ci"
                >
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
                  >&nbsp; - &nbsp;<span v-if="crag.trad">{{ crag.trad }} <span class="trad-style"> trad </span> </span>
                    <span v-if="crag.sport">{{ crag.sport }}<span class="sport-style"> sport </span></span> <span v-if="crag.boulder"> {{ crag.boulder }} <span class="boulder-style"> boulder </span> </span>
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
                >&nbsp; - &nbsp;<span v-if="crag.trad">{{ crag.trad }} <span class="trad-style"> trad </span> </span>
                  <span v-if="crag.sport">{{ crag.sport }}<span class="sport-style"> sport </span></span> <span v-if="crag.boulder"> {{ crag.boulder }} <span class="boulder-style"> boulder </span> </span>
                </v-flex>
            </v-layout>
          </v-layout>
        </v-card>
      </v-container>
    </v-card>
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
      boulderShow: 0
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
          for (let wkey in this.area.filteredSubAreas[subkey].filteredCrags[ckey].walls) {
            for (let rkey in this.area.filteredSubAreas[subkey].filteredCrags[ckey].walls[wkey].routes) {
              let route = this.area.filteredSubAreas[subkey].filteredCrags[ckey].walls[wkey].routes[rkey];
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
    }
  },
  methods: {
    setChartShow() {
      for (let subkey in this.area.area.subAreas) {
        for (let ckey in this.area.area.subAreas[subkey].crags) {
          for (let wkey in  this.area.area.subAreas[subkey].crags[ckey].walls) {
            for (let rkey in  this.area.area.subAreas[subkey].crags[ckey].walls[wkey].routes) {
              let route = this.area.area.subAreas[subkey].crags[ckey].walls[wkey].routes[rkey];
              if (this.ropeShow === 100 && this.boulderShow === 100) {
                return;
              }
              if (route.style === "trad" || route.style === "sport") {
                this.ropeShow = 100;
              } else if (route.style === "boulder") {
                this.boulderShow = 100;
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
              borderWidth: 1
            },
            {
              label: "Sport Routes",
              data: filteredSport,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
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
    }
  },
  components: {
    AreaMap: AreaMap
  },
  created() {
    this.setChartShow();
  },
  mounted() {
    this.setCharts();
  },
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
  color: #EFD369;
}
</style>
