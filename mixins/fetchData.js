export const fetch = {
  methods: {
    async fetchData() {
      //get country data
      try {
        const api = await this.$axios.$get("/v1/countries/", {
          progress: false,
        });
        let countries = [];
        let countriesList = api.data;
        for (let i in countriesList) {
          let countryRes = await this.$axios.$get(
            "v1/countries/" + api.data[i].countryId + "?depth=6"
          );
          let country = countryRes.data;
          countries.push(country);
        }
        for (let ci in countries) {
          if (!countries[ci].regions) {
            countries[ci].regions = [];
          }
          for (let ri in countries[ci].regions) {
            if (!countries[ci].regions[ri].areas) {
              countries[ci].regions[ri].areas = [];
            }
            for (let ai in countries[ci].regions[ri].areas) {
              let fill = {
                minLatitude: undefined,
                maxLatitude: undefined,
                minLongitude: undefined,
                maxLongitude: undefined,
              };
              if (!countries[ci].regions[ri].areas[ai].subAreas) {
                countries[ci].regions[ri].areas[ai].subAreas = [];
              }
              for (let si in countries[ci].regions[ri].areas[ai].subAreas) {
                if (!countries[ci].regions[ri].areas[ai].subAreas[si].crags) {
                  countries[ci].regions[ri].areas[ai].subAreas[si].crags = [];
                }
                for (let cri in countries[ci].regions[ri].areas[ai].subAreas[si]
                  .crags) {
                  if (
                    !countries[ci].regions[ri].areas[ai].subAreas[si].crags[cri]
                      .walls
                  ) {
                    countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                      cri
                    ].walls = [];
                  }
                  for (let wi in countries[ci].regions[ri].areas[ai].subAreas[
                    si
                  ].crags[cri].walls) {
                    if (
                      !countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                        cri
                      ].walls[wi].routes
                    ) {
                      countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                        cri
                      ].walls[wi].routes = [];
                    }
                  }
                }
                // set subArea locations and Fills
                if (
                  countries[ci].regions[ri].areas[ai].subAreas[si].crags
                    .length > 1
                ) {
                  let minLatitude =
                    countries[ci].regions[ri].areas[ai].subAreas[si].crags[0]
                      .location.latitude;
                  let minLongitude =
                    countries[ci].regions[ri].areas[ai].subAreas[si].crags[0]
                      .location.longitude;
                  let maxLatitude =
                    countries[ci].regions[ri].areas[ai].subAreas[si].crags[0]
                      .location.latitude;
                  let maxLongitude =
                    countries[ci].regions[ri].areas[ai].subAreas[si].crags[0]
                      .location.longitude;
                  for (let ckey in countries[ci].regions[ri].areas[ai].subAreas[
                    si
                  ].crags) {
                    if (
                      countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                        ckey
                      ].location.latitude < minLatitude
                    ) {
                      minLatitude =
                        countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                          ckey
                        ].location.latitude;
                    }
                    if (
                      countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                        ckey
                      ].location.latitude > maxLatitude
                    ) {
                      maxLatitude =
                        countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                          ckey
                        ].location.latitude;
                    }
                    if (
                      countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                        ckey
                      ].location.longitude < minLongitude
                    ) {
                      minLongitude =
                        countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                          ckey
                        ].location.longitude;
                    }
                    if (
                      countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                        ckey
                      ].location.longitude > maxLongitude
                    ) {
                      maxLongitude =
                        countries[ci].regions[ri].areas[ai].subAreas[si].crags[
                          ckey
                        ].location.longitude;
                    }
                  }
                  if (fill.maxLongitude) {
                    if (minLatitude < fill.minLatitude) {
                      fill.minLatitude = minLatitude;
                    }
                    if (maxLatitude > fill.maxLatitude) {
                      fill.maxLatitude = maxLatitude;
                    }
                    if (minLongitude < fill.minLongitude) {
                      fill.minLongitude = minLongitude;
                    }
                    if (maxLongitude > fill.maxLongitude) {
                      fill.maxLongitude = maxLongitude;
                    }
                  } else {
                    fill.minLatitude = minLatitude;
                    fill.maxLatitude = maxLatitude;
                    fill.minLongitude = minLongitude;
                    fill.maxLongitude = maxLongitude;
                  }

                  let subAreaLong =
                    minLongitude + (maxLongitude - minLongitude) / 2;
                  let subAreaLat =
                    minLatitude + (maxLatitude - minLatitude) / 2;
                  let titleLoc = [subAreaLong, maxLatitude];

                  countries[ci].regions[ri].areas[ai].subAreas[si].fill = {
                    minLongitude: minLongitude,
                    maxLongitude: maxLongitude,
                    minLatitude: minLatitude,
                    maxLatitude: maxLatitude,
                    titleLoc: titleLoc,
                  };

                  countries[ci].regions[ri].areas[ai].subAreas[si].location = {
                    latitude: subAreaLat,
                    longitude: subAreaLong,
                  };
                } else if (
                  countries[ci].regions[ri].areas[ai].subAreas[si].crags
                    .length > 0
                ) {
                  countries[ci].regions[ri].areas[ai].subAreas[si].location =
                    countries[ci].regions[ri].areas[ai].subAreas[
                      si
                    ].crags[0].location;

                  if (fill.maxLongitude) {
                    if (
                      countries[ci].regions[ri].areas[ai].subAreas[si].crags[0]
                        .location.latitude < fill.minLatitude
                    ) {
                      fill.minLatitude =
                        countries[ci].regions[ri].areas[ai].subAreas[
                          si
                        ].crags[0].location.latitude;
                    }
                    if (
                      countries[ci].regions[ri].areas[ai].subAreas[si].crags[0]
                        .location.latitude > fill.maxLatitude
                    ) {
                      fill.maxLatitude =
                        countries[ci].regions[ri].areas[ai].subAreas[
                          si
                        ].crags[0].location.latitude;
                    }
                    if (
                      countries[ci].regions[ri].areas[ai].subAreas[si].crags[0]
                        .location.longitude < fill.minLongitude
                    ) {
                      fill.minLongitude =
                        countries[ci].regions[ri].areas[ai].subAreas[
                          si
                        ].crags[0].location.longitude;
                    }
                    if (
                      countries[ci].regions[ri].areas[ai].subAreas[si].crags[0]
                        .location.longitude > fill.maxLongitude
                    ) {
                      fill.maxLongitude =
                        countries[ci].regions[ri].areas[ai].subAreas[
                          si
                        ].crags[0].location.longitude;
                    }
                  } else {
                    fill.minLatitude =
                      countries[ci].regions[ri].areas[ai].subAreas[
                        si
                      ].crags[0].location.latitude;
                    fill.maxLatitude =
                      countries[ci].regions[ri].areas[ai].subAreas[
                        si
                      ].crags[0].location.latitude;
                    fill.minLongitude =
                      countries[ci].regions[ri].areas[ai].subAreas[
                        si
                      ].crags[0].location.longitude;
                    fill.maxLongitude =
                      countries[ci].regions[ri].areas[ai].subAreas[
                        si
                      ].crags[0].location.longitude;
                  }
                }
                countries[ci].regions[ri].areas[ai].subAreas[si].crags.sort(
                  function (a, b) {
                    var nameA = a.name.toLowerCase(),
                      nameB = b.name.toLowerCase();
                    if (nameA < nameB)
                      //sort string ascending
                      return -1;
                    if (nameA > nameB) return 1;
                    return 0; //default return value (no sorting)
                  }
                );
              }
              if (fill.maxLongitude) {
                let areaLat;
                let areaLong;
                if (fill.maxLatitude !== fill.minLatitude) {
                  areaLat =
                    fill.minLatitude +
                    (fill.maxLatitude - fill.minLatitude) / 2;
                } else {
                  areaLat = fill.minLatitude;
                }
                if (fill.maxLongitude !== fill.minLongitude) {
                  areaLong =
                    fill.minLongitude +
                    (fill.maxLongitude - fill.minLongitude) / 2;
                } else {
                  areaLong = fill.minLongitude;
                }
                if (
                  fill.maxLatitude !== fill.minLatitude &&
                  fill.maxLongitude !== fill.minLongitude
                ) {
                  fill.titleLoc = [areaLong, fill.maxLatitude];
                  countries[ci].regions[ri].areas[ai].fill = fill;
                }
                countries[ci].regions[ri].areas[ai].location = {
                  latitude: areaLat,
                  longitude: areaLong,
                };
              }
              countries[ci].regions[ri].areas[ai].subAreas.sort(function (
                a,
                b
              ) {
                var nameA = a.name.toLowerCase(),
                  nameB = b.name.toLowerCase();
                if (nameA < nameB)
                  //sort string ascending
                  return -1;
                if (nameA > nameB) return 1;
                return 0; //default return value (no sorting)
              });
            }
            countries[ci].regions[ri].areas.sort(function (a, b) {
              var nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase();
              if (nameA < nameB)
                //sort string ascending
                return -1;
              if (nameA > nameB) return 1;
              return 0; //default return value (no sorting)
            });
          }
          countries[ci].regions.sort(function (a, b) {
            var nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase();
            if (nameA < nameB)
              //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0; //default return value (no sorting)
          });
        }
        countries.sort(function (a, b) {
          var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        });
        this.$store.commit("filter/dataSet", true);
        for (let i in countries) {
          this.$store.commit("filter/updateRoutes", countries[i]);
        }
      } catch (error) {
        this.$store.commit("filter/dataSet", true);
        this.$store.commit(
          "filter/updateLoadError",
          "There was a problem loading the data, please try again later."
        );
      }
    },
  },
};
