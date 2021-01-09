// For troublehooting locally
export const sampleData = {
  data: () => ({
    countries: [
      {
        name: "US",
        countryId: "us",
        regions: [
          {
            name: "Colorado",
            regionId: "colorado",
            areas: [
              {
                name: "Boulder Canyon",
                areaId: "boulder-canyon",
                description:
                  "This is a description of the area. Statistical information and whatnot will go here... This is a description of the area. Statistical information and whatnot will go here... This is a description of the area. Statistical information and whatnot will go here... \n\n new line",
                location: {
                  longitude: -105.417763,
                  latitude: 39.996589
                },
                subAreas: [
                  {
                    name: "Boulder Canyon",
                    subAreaId: "boulder-canyon",
                    description: "this is a description of the sub area",
                    crags: [
                      {
                        name: "Fairfield East",
                        state: "IN_REVIEW",
                        cragId: "fairfield-east",
                        description: "some desc",
                        model: {
                          modelLocation:
                            "https://s3-us-west-2.amazonaws.com/models-172776452117-us-west-2/united-states/wyoming/sinks-canyon/sinks-canyon/fairfield-east/fairfield-east.glb",
                          lowResModelLocation:
                            "https://s3-us-west-2.amazonaws.com/models-172776452117-us-west-2/united-states/wyoming/sinks-canyon/sinks-canyon/fairfield-east/fairfield-east-low-res.glb",
                          northAngle: 4.7,
                          scale: 1,
                          light: 1,
                          modelAngle: 0,
                          azimuth: {
                            minimum: -1.6,
                            maximum: 1.6
                          }
                        },
                        walls: [
                          {
                            name: "Main Wall",
                            wallId: "main-wall"
                          }
                        ]
                      },
                      {
                        name: "Bell Buttress",
                        state: "PUBLIC",
                        area: {
                          name: "Boulder Canyon",
                          areaId: "boulder-canyon"
                        },
                        subAreaId: "boulder-canyon",
                        cragId: "bell-buttress",
                        imageLocation:  require("@/static/photos/bell-buttress-primary.webp"),
                        jpgImageLocation: require("@/static/splash.jpg"),
                        description:
                          "This is a description of the crag. There are many interesting things about this crag which include...",
                        model: {
                          modelLocation: require("@/static/model/Bell_Buttress.glb"),
                          lowResModelLocation:
                            "https://s3-us-west-2.amazonaws.com/models-172776452117-us-west-2/united-states/colorado/boulder-canyon/boulder-canyon/bell-buttress/Bell_Buttress_Low_Res.glb",
                          northAngle: 4.7,
                          scale: 1,
                          light: 1.7,
                          modelAngle: 0,
                          azimuth: {
                            minimum: -1.6,
                            maximum: 1.6
                          }
                        },
                        location: {
                          longitude: -105.412898,
                          latitude: 40.00119048,
                          zoom: 17
                        },
                        parking: [
                          {
                            longitude: -105.4133515,
                            latitude: 40.0017595
                          },
                          {
                            latitude: 40.001086,
                            longitude: -105.41351
                          }
                        ],
                        paths: [
                          {
                            pathId: "path-1",
                            cragId: "bell-buttress",
                            pathPoints: [
                              {
                                pathPointId: "someId",
                                longitude: -105.41329852798945,
                                latitude: 40.00166216568354
                              },
                              {
                                longitude: -105.4132822201003,
                                latitude: 40.00162468887967
                              },
                              {
                                longitude: -105.41339093936328,
                                latitude: 40.00139982763383
                              },
                              {
                                longitude: -105.41323601441186,
                                latitude: 40.00132487372218
                              },
                              {
                                longitude: -105.41315175698412,
                                latitude: 40.00119995034862
                              },
                              {
                                longitude: -105.41310283331364,
                                latitude: 40.00118537594031
                              },
                              {
                                longitude: -105.41304847368214,
                                latitude: 40.00132903783131
                              },
                              {
                                longitude: -105.41293703643714,
                                latitude: 40.0013581865835
                              }
                            ]
                          },
                          {
                            pathId: "path-2",
                            cragId: "bell-buttress",
                            pathPoints: [
                              {
                                longitude: -105.41350975292636,
                                latitude: 40.001089929482816
                              },
                              {
                                longitude: -105.41348915769497,
                                latitude: 40.00125242838993
                              },
                              {
                                longitude: -105.41343972913315,
                                latitude: 40.00117827845145
                              },
                              {
                                longitude: -105.41319876491559,
                                latitude: 40.00106468689887
                              },
                              {
                                longitude: -105.41309990779656,
                                latitude: 40.00117827845145
                              }
                            ]
                          }
                        ],
                        walls: [
                          {
                            name: "Main Area",
                            wallId: "main-area",
                            routes: [
                              {
                                name: "Bell Air",
                                routeId: "bell-air",
                                mainImageLocation: "http://stackoverflow.com/does-not-exist.png",
                                jpgMainImageLocation: require("@/static/photos/bell-air-route.webp"),
                                style: "trad",
                                description:
                                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec feugiat in fermentum posuere. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Varius sit amet mattis vulputate enim nulla aliquet. Cras semper auctor neque vitae tempus quam pellentesque nec nam.",
                                protection: "bolts,  medium gear",
                                grade: 11,
                                gradeModifier: "b/c",
                                photos: [
                                  // {
                                  //   src: require("@/static/ClimbAssist_Logo_img.png"),
                                  //   user: "user name"
                                  // },
                                  // {
                                  //   src: require("@/static/ClimbAssist_Logo_img.png"),
                                  //   user: "user name"
                                  // },
                                  // {
                                  //   src: require("@/static/ClimbAssist_Logo_img.png"),
                                  //   user: "user name"
                                  // }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    pitchId: "bell-air-1",
                                    description:
                                      "Bolted slab to a corner to set pro followed by bolted slab to anchors.",
                                    grade: 11,
                                    gradeModifier: "b/c",
                                    anchors: {
                                      fixed: true,
                                      x: -32.40141707783918,
                                      y: 19.15972101071626,
                                      z: 7.43187654333407
                                    },
                                    points: [
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-46",
                                        x: -32.6902174,
                                        y: 19.148623,
                                        z: 6.916651
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-45",
                                        next: "bell-air-1-46",
                                        x: -33.3640484,
                                        y: 18.9177089,
                                        z: 8.1631357
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-44",
                                        next: "bell-air-1-45",
                                        x: -33.9846009,
                                        y: 18.39607507,
                                        z: 8.659603269
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-43",
                                        next: "bell-air-1-44",
                                        x: -34.358689,
                                        y: 17.8013146,
                                        z: 9.23085167
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-42",
                                        next: "bell-air-1-43",
                                        x: -34.31873273,
                                        y: 17.666764963,
                                        z: 9.18132849
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-41",
                                        next: "bell-air-1-42",
                                        x: -34.37312664,
                                        y: 16.792602062,
                                        z: 9.634621217
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-40",
                                        next: "bell-air-1-41",
                                        x: -34.391017651,
                                        y: 15.86114367,
                                        z: 10.024910565
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-39",
                                        next: "bell-air-1-40",
                                        x: -34.335642,
                                        y: 14.957476812,
                                        z: 10.503870964
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-38",
                                        next: "bell-air-1-39",
                                        x: -34.11462467,
                                        y: 13.994678628,
                                        z: 10.814796384
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-37",
                                        next: "bell-air-1-38",
                                        x: -34.062508,
                                        y: 13.060364169,
                                        z: 11.1023182
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-36",
                                        next: "bell-air-1-37",
                                        x: -34.190917,
                                        y: 12.742586,
                                        z: 11.17077909
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-35",
                                        next: "bell-air-1-36",
                                        x: -34.0774766,
                                        y: 11.832717444,
                                        z: 11.57211485
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-34",
                                        next: "bell-air-1-35",
                                        x: -34.194376,
                                        y: 10.8810798,
                                        z: 11.84433492
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-33",
                                        next: "bell-air-1-34",
                                        x: -34.0562956,
                                        y: 9.88598437,
                                        z: 11.9629738
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-32",
                                        next: "bell-air-1-33",
                                        x: -34.1915166,
                                        y: 9.0310727,
                                        z: 12.184993
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-31",
                                        next: "bell-air-1-32",
                                        x: -34.1824302,
                                        y: 8.07347256,
                                        z: 12.4171787
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-30",
                                        next: "bell-air-1-31",
                                        x: -34.184778,
                                        y: 7.13127109,
                                        z: 12.6712837
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-29",
                                        next: "bell-air-1-30",
                                        x: -34.1786398,
                                        y: 6.1192376,
                                        z: 12.992923
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-28",
                                        next: "bell-air-1-29",
                                        x: -34.1310797,
                                        y: 5.18648213,
                                        z: 13.10650489
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-27",
                                        next: "bell-air-1-28",
                                        x: -34.2775619,
                                        y: 4.07913157,
                                        z: 13.9754766
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-26",
                                        next: "bell-air-1-27",
                                        x: -34.329329,
                                        y: 2.98328114,
                                        z: 14.4351081
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-25",
                                        next: "bell-air-1-26",
                                        x: -34.258972,
                                        y: 2.15453959,
                                        z: 14.3602365
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-24",
                                        next: "bell-air-1-25",
                                        x: -34.2409668,
                                        y: 1.25915985,
                                        z: 14.2965463
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-23",
                                        next: "bell-air-1-24",
                                        x: -34.1637418,
                                        y: 0.3557855,
                                        z: 14.45424
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-22",
                                        next: "bell-air-1-23",
                                        x: -34.12839,
                                        y: -0.62150257,
                                        z: 14.66561968
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-21",
                                        next: "bell-air-1-22",
                                        x: -34.0714083,
                                        y: -1.57586704,
                                        z: 14.80842
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-20",
                                        next: "bell-air-1-21",
                                        x: -34.0122958,
                                        y: -2.52843074,
                                        z: 14.931046
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-19",
                                        next: "bell-air-1-20",
                                        x: -33.96973,
                                        y: -3.4779255,
                                        z: 15.10953
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-18",
                                        next: "bell-air-1-19",
                                        x: -33.917443,
                                        y: -4.4804379,
                                        z: 15.288508
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-17",
                                        next: "bell-air-1-18",
                                        x: -33.826457,
                                        y: -5.370604,
                                        z: 15.20423
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-16",
                                        next: "bell-air-1-17",
                                        x: -33.8781,
                                        y: -6.3584747,
                                        z: 15.665661
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-15",
                                        next: "bell-air-1-16",
                                        x: -34.08533,
                                        y: -7.4470998,
                                        z: 16.4261
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-14",
                                        next: "bell-air-1-15",
                                        x: -33.9668,
                                        y: -8.4105753,
                                        z: 16.679971
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-13",
                                        next: "bell-air-1-14",
                                        x: -33.915698,
                                        y: -9.40317,
                                        z: 16.70881
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-12",
                                        next: "bell-air-1-13",
                                        x: -33.81547,
                                        y: -10.4151159,
                                        z: 16.583206
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-11",
                                        next: "bell-air-1-12",
                                        x: -33.80603,
                                        y: -11.2895493,
                                        z: 17.099405
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-10",
                                        next: "bell-air-1-11",
                                        x: -33.98702,
                                        y: -12.1994663,
                                        z: 17.632698
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-9",
                                        next: "bell-air-1-10",
                                        x: -33.957135,
                                        y: -13.276718,
                                        z: 17.94088
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-8",
                                        next: "bell-air-1-9",
                                        x: -33.832764,
                                        y: -14.3152374,
                                        z: 18.084906
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-7",
                                        next: "bell-air-1-8",
                                        x: -33.79705,
                                        y: -15.3215116,
                                        z: 18.157061
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-6",
                                        next: "bell-air-1-7",
                                        x: -33.865066,
                                        y: -16.1475553,
                                        z: 18.4469
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-5",
                                        next: "bell-air-1-6",
                                        x: -34.062662,
                                        y: -17.067273,
                                        z: 19.437617
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-4",
                                        next: "bell-air-1-5",
                                        x: -34.04706,
                                        y: -17.9162064,
                                        z: 19.87376
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-3",
                                        next: "bell-air-1-4",
                                        x: -34.43624,
                                        y: -18.8880992,
                                        z: 20.640888
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-2",
                                        next: "bell-air-1-3",
                                        x: -34.157856,
                                        y: -19.9301506,
                                        z: 20.715033
                                      },
                                      {
                                        pitchId: "bell-air-1",
                                        pointId: "bell-air-1-1",
                                        next: "bell-air-1-2",
                                        first: true,
                                        x: -34.1066,
                                        y: -20.7215572,
                                        z: 20.685
                                      }
                                    ]
                                  },
                                  {
                                    pitchId: "bell-air-2",
                                    description: "Follow the Arete to anchors.",
                                    grade: 11,
                                    gradeModifier: "b/c",
                                    anchors: {
                                      fixed: true,
                                      x: -31.550031888006643,
                                      y: 32.80180485374386,
                                      z: 5.321522770708883
                                    },
                                    points: [
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-15",
                                        x: -31.74738809322481,
                                        y: 32.622547895375945,
                                        z: 5.321203287646023
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-14",
                                        next: "bell-air-2-15",
                                        x: -32.36924639373589,
                                        y: 31.816295713880432,
                                        z: 5.402733639637293
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-13",
                                        next: "bell-air-2-14",
                                        x: -32.595131879057014,
                                        y: 30.882860689888055,
                                        z: 5.34463964093395
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-12",
                                        next: "bell-air-2-13",
                                        x: -33.22050508101302,
                                        y: 29.906017331945474,
                                        z: 5.456394954248984
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-11",
                                        next: "bell-air-2-12",
                                        x: -33.43319460291287,
                                        y: 28.9633002859887,
                                        z: 5.438270317525817
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-10",
                                        next: "bell-air-2-11",
                                        x: -33.64821265283746,
                                        y: 28.039005893566184,
                                        z: 5.441927826656134
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-9",
                                        next: "bell-air-2-10",
                                        x: -34.015989984175505,
                                        y: 27.134426479612102,
                                        z: 5.4896563439341755
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-8",
                                        next: "bell-air-2-9",
                                        x: -34.218857820047,
                                        y: 26.554192917072626,
                                        z: 5.587506795261153
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-7",
                                        next: "bell-air-2-8",
                                        x: -34.188565973818726,
                                        y: 25.520287938034723,
                                        z: 5.710814733615667
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-6",
                                        next: "bell-air-2-7",
                                        x: -34.033188567345334,
                                        y: 24.594611851644878,
                                        z: 5.877110962806058
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-5",
                                        next: "bell-air-2-6",
                                        x: -33.72490933119328,
                                        y: 23.58254232724108,
                                        z: 6.159510923055591
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-4",
                                        next: "bell-air-2-5",
                                        x: -33.64612660896223,
                                        y: 22.712084188210568,
                                        z: 6.276242357676302
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-3",
                                        next: "bell-air-2-4",
                                        x: -33.468047608557065,
                                        y: 21.715614498160072,
                                        z: 6.619442691489412
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-2",
                                        next: "bell-air-2-3",
                                        x: -33.20176331508046,
                                        y: 20.770017232812908,
                                        z: 6.755499976138254
                                      },
                                      {
                                        pitchId: "bell-air-2",
                                        pointId: "bell-air-2-1",
                                        next: "bell-air-2-2",
                                        first: true,
                                        x: -32.75576509377286,
                                        y: 19.740426386753,
                                        z: 6.927223861796338
                                      }
                                    ]
                                  }
                                ],
                                center: {
                                  x: -34.291804689264524,
                                  y: 5.1252091833622355,
                                  z: 12.772592164960535
                                },
                                points: [
                                  {
                                    x: -31.74738809322481,
                                    y: 32.622547895375945,
                                    z: 5.321203287646023
                                  },
                                  {
                                    x: -32.36924639373589,
                                    y: 31.816295713880432,
                                    z: 5.402733639637293
                                  },
                                  {
                                    x: -32.595131879057014,
                                    y: 30.882860689888055,
                                    z: 5.34463964093395
                                  },
                                  {
                                    x: -33.22050508101302,
                                    y: 29.906017331945474,
                                    z: 5.456394954248984
                                  },
                                  {
                                    x: -33.43319460291287,
                                    y: 28.9633002859887,
                                    z: 5.438270317525817
                                  },
                                  {
                                    x: -33.64821265283746,
                                    y: 28.039005893566184,
                                    z: 5.441927826656134
                                  },
                                  {
                                    x: -34.015989984175505,
                                    y: 27.134426479612102,
                                    z: 5.4896563439341755
                                  },
                                  {
                                    x: -34.218857820047,
                                    y: 26.554192917072626,
                                    z: 5.587506795261153
                                  },
                                  {
                                    x: -34.188565973818726,
                                    y: 25.520287938034723,
                                    z: 5.710814733615667
                                  },
                                  {
                                    x: -34.033188567345334,
                                    y: 24.594611851644878,
                                    z: 5.877110962806058
                                  },
                                  {
                                    x: -33.72490933119328,
                                    y: 23.58254232724108,
                                    z: 6.159510923055591
                                  },
                                  {
                                    x: -33.64612660896223,
                                    y: 22.712084188210568,
                                    z: 6.276242357676302
                                  },
                                  {
                                    x: -33.468047608557065,
                                    y: 21.715614498160072,
                                    z: 6.619442691489412
                                  },
                                  {
                                    x: -33.20176331508046,
                                    y: 20.770017232812908,
                                    z: 6.755499976138254
                                  },
                                  {
                                    x: -32.75576509377286,
                                    y: 19.740426386753,
                                    z: 6.927223861796338
                                  },
                                  {
                                    x: -32.69021741735902,
                                    y: 19.148623639701466,
                                    z: 6.916651336695246
                                  },
                                  {
                                    x: -33.364048408249516,
                                    y: 18.91770890564447,
                                    z: 8.163135761156678
                                  },
                                  {
                                    x: -33.98460099049649,
                                    y: 18.396075074645168,
                                    z: 8.659603269420954
                                  },
                                  {
                                    x: -34.358689830029,
                                    y: 17.80131469239098,
                                    z: 9.230851678003642
                                  },
                                  {
                                    x: -34.31873273385232,
                                    y: 17.666764963267532,
                                    z: 9.181328490594028
                                  },
                                  {
                                    x: -34.37312664373471,
                                    y: 16.792602062995456,
                                    z: 9.634621217796257
                                  },
                                  {
                                    x: -34.391017651077576,
                                    y: 15.86114367751684,
                                    z: 10.024910565497418
                                  },
                                  {
                                    x: -34.33564200996645,
                                    y: 14.957476812923426,
                                    z: 10.503870964916448
                                  },
                                  {
                                    x: -34.11462467694788,
                                    y: 13.994678628594365,
                                    z: 10.814796384645717
                                  },
                                  {
                                    x: -34.06250803544189,
                                    y: 13.060364169212404,
                                    z: 11.10231820859737
                                  },
                                  {
                                    x: -34.19091724596323,
                                    y: 12.742586356133572,
                                    z: 11.170779090932937
                                  },
                                  {
                                    x: -34.07747660811751,
                                    y: 11.832717444088495,
                                    z: 11.572114855640647
                                  },
                                  {
                                    x: -34.19437648887949,
                                    y: 10.881079808347156,
                                    z: 11.844334920596554
                                  },
                                  {
                                    x: -34.056295682333904,
                                    y: 9.885984377907912,
                                    z: 11.962973816599904
                                  },
                                  {
                                    x: -34.19151667500716,
                                    y: 9.031072745966298,
                                    z: 12.184993743920845
                                  },
                                  {
                                    x: -34.18243027646291,
                                    y: 8.073472560946596,
                                    z: 12.417178719133247
                                  },
                                  {
                                    x: -34.18477886918034,
                                    y: 7.131271097535519,
                                    z: 12.671283757855901
                                  },
                                  {
                                    x: -34.17863981756541,
                                    y: 6.119237607634377,
                                    z: 12.992923639773739
                                  },
                                  {
                                    x: -34.131079723388176,
                                    y: 5.1864821342890215,
                                    z: 13.106504895133948
                                  },
                                  {
                                    x: -34.27756195377187,
                                    y: 4.079131578820828,
                                    z: 13.975476615637476
                                  },
                                  {
                                    x: -34.32932935865164,
                                    y: 2.9832811470836265,
                                    z: 14.435108128877252
                                  },
                                  {
                                    x: -34.258972661602236,
                                    y: 2.1545395990150635,
                                    z: 14.360236596390806
                                  },
                                  {
                                    x: -34.24096680773117,
                                    y: 1.259159859231828,
                                    z: 14.296546360153979
                                  },
                                  {
                                    x: -34.163741871667845,
                                    y: 0.3557855144453743,
                                    z: 14.45424342612084
                                  },
                                  {
                                    x: -34.128396921830934,
                                    y: -0.621502573379954,
                                    z: 14.665619682631513
                                  },
                                  {
                                    x: -34.071408368201865,
                                    y: -1.5758670440143407,
                                    z: 14.808424073440401
                                  },
                                  {
                                    x: -34.012295832437204,
                                    y: -2.5284307426321013,
                                    z: 14.93104648833834
                                  },
                                  {
                                    x: -33.96973746307018,
                                    y: -3.477925355437255,
                                    z: 15.10953806082575
                                  },
                                  {
                                    x: -33.917443989712005,
                                    y: -4.480437906501631,
                                    z: 15.288508622239712
                                  },
                                  {
                                    x: -33.826457429956754,
                                    y: -5.370604013990998,
                                    z: 15.20423567556367
                                  },
                                  {
                                    x: -33.87810207294358,
                                    y: -6.358474732020082,
                                    z: 15.665661970997013
                                  },
                                  {
                                    x: -34.08533689586074,
                                    y: -7.447099851372376,
                                    z: 16.4261132264376
                                  },
                                  {
                                    x: -33.9668360317652,
                                    y: -8.410575313869101,
                                    z: 16.679971686489107
                                  },
                                  {
                                    x: -33.915698606278625,
                                    y: -9.4031786157813,
                                    z: 16.70881487298432
                                  },
                                  {
                                    x: -33.81547221901706,
                                    y: -10.415115977677935,
                                    z: 16.583206500401836
                                  },
                                  {
                                    x: -33.80603119042415,
                                    y: -11.289549305669158,
                                    z: 17.099405056033504
                                  },
                                  {
                                    x: -33.98702900769859,
                                    y: -12.199466373364084,
                                    z: 17.632698770499523
                                  },
                                  {
                                    x: -33.957135853483955,
                                    y: -13.276718042895284,
                                    z: 17.940880777765514
                                  },
                                  {
                                    x: -33.832764100926546,
                                    y: -14.315237491793718,
                                    z: 18.084906066169236
                                  },
                                  {
                                    x: -33.79705737569692,
                                    y: -15.321511615519386,
                                    z: 18.157061289286624
                                  },
                                  {
                                    x: -33.865066391668215,
                                    y: -16.147555350106792,
                                    z: 18.4469078212061
                                  },
                                  {
                                    x: -34.062662279293754,
                                    y: -17.06727336329423,
                                    z: 19.437617745197894
                                  },
                                  {
                                    x: -34.04706025959864,
                                    y: -17.916206466906587,
                                    z: 19.87376135570389
                                  },
                                  {
                                    x: -34.43624992849227,
                                    y: -18.888099229413665,
                                    z: 20.640888652579815
                                  },
                                  {
                                    x: -34.157856915619206,
                                    y: -19.930150622189238,
                                    z: 20.715033312418566
                                  },
                                  {
                                    x: -34.10660097737669,
                                    y: -20.721557220804158,
                                    z: 20.685862943671
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -32.40141707783918,
                                    y: 19.15972101071626,
                                    z: 7.43187654333407
                                  },
                                  {
                                    fixed: true,
                                    x: -31.550031888006643,
                                    y: 32.80180485374386,
                                    z: 5.321522770708883
                                  }
                                ],

                                decals: [
                                  {
                                    name: "tick name",
                                    descpription: "desc",
                                    user: "user name",
                                    type: "type",
                                    position: {
                                      x: -34.51264075758657,
                                      y: -3.7173118471933932,
                                      z: 14.384959218460395
                                    },
                                    orientation: {
                                      x: -0.17663852454226386,
                                      y: -0.7283504327666126,
                                      z: -0.11826146320292473
                                    },
                                    size: {
                                      x: 5,
                                      y: 5,
                                      z: 5
                                    },
                                    map: "diffuse location"
                                  }
                                ]
                              },
                              {
                                name: "The Pitts",
                                routeId: "the-pitts",
                                mainImageLocation: require("@/static/photos/the-pitts-route.webp"),
                                style: "trad",
                                description: "route desc",
                                protection: "Gear to 3.5 in.",
                                grade: 11,
                                gradeModifier: "b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    pitchId: "the-pitts-1",
                                    description:
                                      "Traditionally start in the gully to the right of Bell Air, most opt to do P1 of Bell Air due to the poor quality of the chimney.",
                                    grade: 7,
                                    gradeModifier: "",
                                    pitchId: "the-pitts-1",
                                    anchors: {
                                      fixed: true,
                                      x: -32.40141707783918,
                                      y: 19.15972101071626,
                                      z: 7.43187654333407
                                    }
                                  },
                                  {
                                    pitchId: "the-pitts-2",
                                    description:
                                      "Climb a short corner then up the main hand crack to the top.",
                                    grade: 11,
                                    gradeModifier: "b",
                                    pitchId: "the-pitts-2",
                                    anchors: {
                                      fixed: false,
                                      x: -27.26042879801428,
                                      y: 37.01759579439104,
                                      z: 6.637519595645671
                                    }
                                  }
                                ],
                                center: {
                                  x: -30.89251757281371,
                                  y: 6.2459773821355515,
                                  z: 12.606131413596962
                                },
                                points: [
                                  {
                                    x: -32.99343825868008,
                                    y: -16.58353032289578,
                                    z: 19.443308571979934
                                  },
                                  {
                                    x: -32.68984730336663,
                                    y: -15.613200947512277,
                                    z: 18.827867240490665
                                  },
                                  {
                                    x: -32.88987579864102,
                                    y: -14.505275863527043,
                                    z: 19.21152086564725
                                  },
                                  {
                                    x: -32.730719693036285,
                                    y: -13.712626814044427,
                                    z: 18.988025033965698
                                  },
                                  {
                                    x: -32.682810252580225,
                                    y: -12.630535133847655,
                                    z: 18.970543394493454
                                  },
                                  {
                                    x: -32.47874378268235,
                                    y: -11.67054949994242,
                                    z: 18.702308662382528
                                  },
                                  {
                                    x: -32.13407938736336,
                                    y: -10.727424890555868,
                                    z: 18.149402727292053
                                  },
                                  {
                                    x: -31.85505503257517,
                                    y: -10.231623991504474,
                                    z: 17.887721737898072
                                  },
                                  {
                                    x: -32.09451761913643,
                                    y: -9.27941759514369,
                                    z: 17.833490872746115
                                  },
                                  {
                                    x: -32.32028216727623,
                                    y: -8.330481951605183,
                                    z: 17.648363589107078
                                  },
                                  {
                                    x: -32.57214362412012,
                                    y: -7.346953699083594,
                                    z: 17.529502100152015
                                  },
                                  {
                                    x: -32.53110552566104,
                                    y: -6.336149177495632,
                                    z: 17.067265190634703
                                  },
                                  {
                                    x: -32.509428520639595,
                                    y: -5.4079275856806595,
                                    z: 16.49039900957605
                                  },
                                  {
                                    x: -32.4313539862922,
                                    y: -4.5463203470663105,
                                    z: 16.069778821383345
                                  },
                                  {
                                    x: -32.52249155614542,
                                    y: -4.268459156431964,
                                    z: 15.913067972584766
                                  },
                                  {
                                    x: -32.29590105434993,
                                    y: -3.297189862240923,
                                    z: 16.068711515570712
                                  },
                                  {
                                    x: -32.001509507207174,
                                    y: -2.230419501175167,
                                    z: 15.762683189820669
                                  },
                                  {
                                    x: -31.598307038643696,
                                    y: -1.286547943225015,
                                    z: 15.76702794567393
                                  },
                                  {
                                    x: -31.317099848537293,
                                    y: -0.31955938471932016,
                                    z: 15.548252426501294
                                  },
                                  {
                                    x: -31.292770617616878,
                                    y: 0.6712830428642009,
                                    z: 15.660434062776512
                                  },
                                  {
                                    x: -31.29884055323981,
                                    y: 1.6434392226539725,
                                    z: 15.821046740186924
                                  },
                                  {
                                    x: -31.37181542755098,
                                    y: 2.620623460976344,
                                    z: 16.009451564311085
                                  },
                                  {
                                    x: -31.27928655834407,
                                    y: 2.958573808306856,
                                    z: 16.108685291092044
                                  },
                                  {
                                    x: -31.345954900791103,
                                    y: 3.9783063526493065,
                                    z: 15.48292520333437
                                  },
                                  {
                                    x: -31.343189125061386,
                                    y: 4.846417365996084,
                                    z: 14.34316725018407
                                  },
                                  {
                                    x: -31.36542671536488,
                                    y: 5.639898948556326,
                                    z: 13.912162382843574
                                  },
                                  {
                                    x: -31.19486586983198,
                                    y: 6.565222852505775,
                                    z: 12.426838686675593
                                  },
                                  {
                                    x: -31.3461645393854,
                                    y: 7.472875785391128,
                                    z: 12.661576032252437
                                  },
                                  {
                                    x: -31.461152736756933,
                                    y: 8.38440878568564,
                                    z: 12.366537739586636
                                  },
                                  {
                                    x: -31.652454279527895,
                                    y: 9.341452610241005,
                                    z: 12.100284717277535
                                  },
                                  {
                                    x: -31.574978798570356,
                                    y: 10.220877995447955,
                                    z: 11.373755390412878
                                  },
                                  {
                                    x: -31.635345396696266,
                                    y: 11.142103912908366,
                                    z: 10.94764626921995
                                  },
                                  {
                                    x: -31.760844518981624,
                                    y: 11.946296393190307,
                                    z: 10.558025057445828
                                  },
                                  {
                                    x: -31.747696260682243,
                                    y: 12.956322112651096,
                                    z: 10.278305899408474
                                  },
                                  {
                                    x: -31.805712049577775,
                                    y: 13.804932636211825,
                                    z: 9.802220985393909
                                  },
                                  {
                                    x: -31.93801319757241,
                                    y: 14.653179548159574,
                                    z: 9.69070908205856
                                  },
                                  {
                                    x: -31.967260437655565,
                                    y: 15.56791876071273,
                                    z: 9.363779930749661
                                  },
                                  {
                                    x: -32.04564905331937,
                                    y: 16.439311054659317,
                                    z: 9.094399321453619
                                  },
                                  {
                                    x: -32.116229174181335,
                                    y: 17.325343142405348,
                                    z: 8.777209546966864
                                  },
                                  {
                                    x: -32.185312752249445,
                                    y: 18.202179462217146,
                                    z: 8.423740937982258
                                  },
                                  {
                                    x: -32.315394762392685,
                                    y: 18.545009962213232,
                                    z: 8.210979674354808
                                  },
                                  {
                                    x: -32.13233857231329,
                                    y: 19.62249503978789,
                                    z: 7.305341196569205
                                  },
                                  {
                                    x: -32.1244862038141,
                                    y: 20.464835405622242,
                                    z: 7.318780368662713
                                  },
                                  {
                                    x: -32.13618886441263,
                                    y: 21.47909272100539,
                                    z: 7.336234853013408
                                  },
                                  {
                                    x: -32.00915280275555,
                                    y: 21.526370920004492,
                                    z: 7.290964858301042
                                  },
                                  {
                                    x: -32.28407874902755,
                                    y: 22.381442272938454,
                                    z: 6.980670543834734
                                  },
                                  {
                                    x: -32.48041526128954,
                                    y: 23.017975117185344,
                                    z: 6.408549877505959
                                  },
                                  {
                                    x: -32.01071801399975,
                                    y: 23.898687131378672,
                                    z: 6.454147385450444
                                  },
                                  {
                                    x: -31.930041574995073,
                                    y: 24.70910394011635,
                                    z: 7.208442924938672
                                  },
                                  {
                                    x: -31.748773350513556,
                                    y: 25.713143058633293,
                                    z: 7.746180216057138
                                  },
                                  {
                                    x: -31.62753551371504,
                                    y: 26.63131735368194,
                                    z: 8.10167512873087
                                  },
                                  {
                                    x: -31.298524219364843,
                                    y: 27.580276010503106,
                                    z: 8.284184800072707
                                  },
                                  {
                                    x: -31.057982956640103,
                                    y: 28.424118407043217,
                                    z: 8.650901025007125
                                  },
                                  {
                                    x: -30.794848321663935,
                                    y: 29.37598503380476,
                                    z: 8.889600088956556
                                  },
                                  {
                                    x: -30.52613589042329,
                                    y: 30.264256062191244,
                                    z: 9.173904215332387
                                  },
                                  {
                                    x: -30.060548653647295,
                                    y: 31.314114559233392,
                                    z: 9.196453236397627
                                  },
                                  {
                                    x: -29.602884286595536,
                                    y: 32.32166171823968,
                                    z: 8.993676600514402
                                  },
                                  {
                                    x: -29.655503213140744,
                                    y: 32.28506768250884,
                                    z: 8.896751070926651
                                  },
                                  {
                                    x: -29.08738717920402,
                                    y: 33.00582161915984,
                                    z: 8.926309029460729
                                  },
                                  {
                                    x: -28.442398031763013,
                                    y: 33.677019527163715,
                                    z: 8.735582488640787
                                  },
                                  {
                                    x: -27.705317714797356,
                                    y: 34.43709313599627,
                                    z: 8.329236620657431
                                  },
                                  {
                                    x: -27.224296786657536,
                                    y: 35.08057242293585,
                                    z: 7.802812713064352
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: true,
                                    x: -32.40141707783918,
                                    y: 19.15972101071626,
                                    z: 7.43187654333407
                                  },
                                  {
                                    fixed: false,
                                    x: -27.26042879801428,
                                    y: 37.01759579439104,
                                    z: 6.637519595645671
                                  }
                                ]
                              },
                              {
                                name: "North Face",
                                routeId: "north-face",
                                mainImageLocation: require("@/static/photos/north-face-route.webp"),
                                style: "trad",
                                description: "route desc",
                                protection: "Standard Rack",
                                grade: 10,
                                gradeModifier: "b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Follow a ramp left to a crack leading to a belay in an alcove.",
                                    grade: 10,
                                    gradeModifier: "b",
                                    pitchId: "north-face-1",
                                    anchors: {
                                      fixed: false,
                                      x: -27.086335,
                                      y: 12.880239,
                                      z: 19.369687
                                    },
                                    points: []
                                  },
                                  {
                                    description:
                                      "Climb a crack leading to the top of Cosmosis.",
                                    grade: 9,
                                    gradeModifier: "",
                                    pitchId: "north-face-2",
                                    anchors: {
                                      fixed: false,
                                      x: -22.718453,
                                      y: 30.923983,
                                      z: 19.556793
                                    },
                                    points: []
                                  }
                                ],
                                center: {
                                  x: -27.666004728232153,
                                  y: 9.521462215388226,
                                  z: 20.070766225144204
                                },
                                points: [
                                  {
                                    x: -26.164858564865067,
                                    y: -15.000535359208655,
                                    z: 24.625424313316955
                                  },
                                  {
                                    x: -26.372936524069367,
                                    y: -14.044793145654607,
                                    z: 24.51982439089508
                                  },
                                  {
                                    x: -26.464273188947512,
                                    y: -13.063513467250079,
                                    z: 24.31789881008214
                                  },
                                  {
                                    x: -26.550932429442017,
                                    y: -12.11627032143835,
                                    z: 24.126024973903853
                                  },
                                  {
                                    x: -26.785407764794243,
                                    y: -11.137921190015337,
                                    z: 23.956202688840623
                                  },
                                  {
                                    x: -27.00803118286222,
                                    y: -10.140116174807709,
                                    z: 23.73811735749152
                                  },
                                  {
                                    x: -26.96072718858789,
                                    y: -9.71522153457777,
                                    z: 23.569882522025374
                                  },
                                  {
                                    x: -27.061210085863063,
                                    y: -8.696020682755279,
                                    z: 23.408001051477076
                                  },
                                  {
                                    x: -26.920743731923167,
                                    y: -7.711945155836714,
                                    z: 23.185821716676763
                                  },
                                  {
                                    x: -27.13182576796895,
                                    y: -6.817541050484571,
                                    z: 23.005561375491755
                                  },
                                  {
                                    x: -27.142490033450702,
                                    y: -6.743258013387196,
                                    z: 22.881492180742924
                                  },
                                  {
                                    x: -27.31569437688824,
                                    y: -5.721651451628895,
                                    z: 22.79321573219763
                                  },
                                  {
                                    x: -27.094390056792566,
                                    y: -4.779061699435574,
                                    z: 22.58669548348281
                                  },
                                  {
                                    x: -27.286673768596447,
                                    y: -3.813287331064993,
                                    z: 22.593592647016248
                                  },
                                  {
                                    x: -27.07621814514509,
                                    y: -2.75015508887586,
                                    z: 22.10087017998847
                                  },
                                  {
                                    x: -27.240291572748124,
                                    y: -2.6364044301282963,
                                    z: 22.011643039941312
                                  },
                                  {
                                    x: -27.70814318457353,
                                    y: -1.7223690592014793,
                                    z: 22.274582467492856
                                  },
                                  {
                                    x: -27.517589054472907,
                                    y: -0.6981088437119425,
                                    z: 21.745037073368422
                                  },
                                  {
                                    x: -27.588480221016766,
                                    y: 0.34930840889517156,
                                    z: 21.53195375195899
                                  },
                                  {
                                    x: -27.5081581562031,
                                    y: 0.9239451329200031,
                                    z: 21.349059110202262
                                  },
                                  {
                                    x: -27.712297626120854,
                                    y: 1.9246566293327037,
                                    z: 21.316563503664398
                                  },
                                  {
                                    x: -27.933466933770653,
                                    y: 2.8974162906816052,
                                    z: 21.188028891833998
                                  },
                                  {
                                    x: -28.141937912253006,
                                    y: 3.535693795734458,
                                    z: 20.967896323862476
                                  },
                                  {
                                    x: -28.457393952324566,
                                    y: 4.343622776666386,
                                    z: 20.526967083159473
                                  },
                                  {
                                    x: -28.49813084669423,
                                    y: 5.055825378034424,
                                    z: 20.314398114107796
                                  },
                                  {
                                    x: -28.46026314226932,
                                    y: 6.031759964399237,
                                    z: 20.289619267487662
                                  },
                                  {
                                    x: -28.36351713374116,
                                    y: 7.048169847162228,
                                    z: 20.382500200470393
                                  },
                                  {
                                    x: -28.231407092516964,
                                    y: 8.01830947293136,
                                    z: 20.39742526738153
                                  },
                                  {
                                    x: -28.115474985272034,
                                    y: 9.069553670193356,
                                    z: 20.440203178448463
                                  },
                                  {
                                    x: -27.548365123194767,
                                    y: 9.85567040090879,
                                    z: 20.32415621995069
                                  },
                                  {
                                    x: -27.629912724628035,
                                    y: 10.857624628834309,
                                    z: 20.573409279591072
                                  },
                                  {
                                    x: -27.916161837753158,
                                    y: 11.75728728142129,
                                    z: 20.49862891502657
                                  },
                                  {
                                    x: -28.00725924155959,
                                    y: 12.501290371021117,
                                    z: 20.581747466910237
                                  },
                                  {
                                    x: -27.148784014363304,
                                    y: 13.136699196201477,
                                    z: 19.572551050767686
                                  },
                                  {
                                    x: -26.984365478233173,
                                    y: 13.56479767213197,
                                    z: 19.40470792241374
                                  },
                                  {
                                    x: -27.0647356860848,
                                    y: 14.546751603106879,
                                    z: 19.542208565558848
                                  },
                                  {
                                    x: -26.998494521925313,
                                    y: 15.581052688538138,
                                    z: 19.645456870569664
                                  },
                                  {
                                    x: -26.710622314867244,
                                    y: 16.51505755709728,
                                    z: 19.703212899234618
                                  },
                                  {
                                    x: -25.967744821956533,
                                    y: 17.130421715861143,
                                    z: 20.06397665921395
                                  },
                                  {
                                    x: -25.3535840271161,
                                    y: 17.640803674976418,
                                    z: 20.329401481484513
                                  },
                                  {
                                    x: -24.17736722158078,
                                    y: 18.066097908613113,
                                    z: 20.57107436407382
                                  },
                                  {
                                    x: -23.973470401768594,
                                    y: 18.105962991654064,
                                    z: 20.52395597535881
                                  },
                                  {
                                    x: -24.243776610444215,
                                    y: 18.989078047202188,
                                    z: 20.604940937257894
                                  },
                                  {
                                    x: -24.647425704892843,
                                    y: 20.008950187255856,
                                    z: 20.664453799969095
                                  },
                                  {
                                    x: -25.01201799151407,
                                    y: 21.07939649945324,
                                    z: 20.630938311987755
                                  },
                                  {
                                    x: -24.987732501125528,
                                    y: 21.811378954376007,
                                    z: 20.38487895547235
                                  },
                                  {
                                    x: -24.849128110274215,
                                    y: 22.80810296392627,
                                    z: 20.179511717202615
                                  },
                                  {
                                    x: -24.398417531933,
                                    y: 23.759409919666954,
                                    z: 20.23880931787804
                                  },
                                  {
                                    x: -24.2433023684564,
                                    y: 24.696320184192366,
                                    z: 20.074742547674056
                                  },
                                  {
                                    x: -24.09273396000316,
                                    y: 25.657390493197354,
                                    z: 20.029291633726913
                                  },
                                  {
                                    x: -23.89218426183238,
                                    y: 26.67295282298573,
                                    z: 20.075291519547832
                                  },
                                  {
                                    x: -23.699893677320286,
                                    y: 27.581687420352374,
                                    z: 19.938375469294535
                                  },
                                  {
                                    x: -23.735972459404447,
                                    y: 28.715212078933064,
                                    z: 20.25635835597565
                                  },
                                  {
                                    x: -23.28615084500469,
                                    y: 29.525649297547865,
                                    z: 19.951700962608516
                                  },
                                  {
                                    x: -22.980754637675687,
                                    y: 30.532593683206418,
                                    z: 19.86163854911667
                                  },
                                  {
                                    x: -22.859965719735392,
                                    y: 30.829582923149186,
                                    z: 19.698192504419538
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: false,
                                    x: -27.086335,
                                    y: 12.880239,
                                    z: 19.369687
                                  },
                                  {
                                    fixed: false,
                                    x: -22.718453,
                                    y: 30.923983,
                                    z: 19.556793
                                  }
                                ]
                              },
                              {
                                name: "Hound Dog",
                                routeId: "hound-dog",
                                mainImageLocation: require("@/static/photos/hound-dog-route.webp"),
                                style: "sport",
                                description:
                                  "Head up from behind a tree close to the wall. Follow the boltline up for a crimpy well protected route. Stay right when the boltline splits after the 8th bolt.",
                                protection: "10 bolts",
                                grade: 11,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Head up from behind a tree close to the wall. Follow the boltline up for a crimpy well protected route. Stay right when the boltline splits after the 8th bolt.",
                                    grade: 11,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: -27.193399957111204,
                                  y: 3.722917390102767,
                                  z: 22.451980657607116
                                },
                                points: [
                                  {
                                    x: -26.333757873357875,
                                    y: -11.844608103606802,
                                    z: 24.899322947846247
                                  },
                                  {
                                    x: -26.42285278532724,
                                    y: -10.854553388496807,
                                    z: 24.888893477124164
                                  },
                                  {
                                    x: -26.59495946141921,
                                    y: -9.909390297664444,
                                    z: 24.98507147499491
                                  },
                                  {
                                    x: -26.528949071627558,
                                    y: -8.833553513225791,
                                    z: 25.058663361999976
                                  },
                                  {
                                    x: -26.537729717412308,
                                    y: -7.864231104744972,
                                    z: 25.096304311191595
                                  },
                                  {
                                    x: -26.518210653605845,
                                    y: -7.081386504993886,
                                    z: 25.155130666615033
                                  },
                                  {
                                    x: -26.632928771555033,
                                    y: -6.071629813496612,
                                    z: 25.106287220365928
                                  },
                                  {
                                    x: -26.581701554323192,
                                    y: -5.07653680151218,
                                    z: 25.04475954311553
                                  },
                                  {
                                    x: -26.485805409228334,
                                    y: -4.061788015148,
                                    z: 25.001863715221386
                                  },
                                  {
                                    x: -26.37367409719454,
                                    y: -3.053622734588629,
                                    z: 24.93199609671781
                                  },
                                  {
                                    x: -26.248129897611115,
                                    y: -2.793525575908295,
                                    z: 24.88383751127149
                                  },
                                  {
                                    x: -26.406851152742455,
                                    y: -1.8654064458528226,
                                    z: 24.557522599663383
                                  },
                                  {
                                    x: -26.51172627305268,
                                    y: -0.9258780882535134,
                                    z: 24.22067464929698
                                  },
                                  {
                                    x: -26.68027374534415,
                                    y: -0.008490111075096674,
                                    z: 23.88897781012353
                                  },
                                  {
                                    x: -26.889095571767342,
                                    y: 0.9195309448366192,
                                    z: 23.55229683177872
                                  },
                                  {
                                    x: -27.028478349654623,
                                    y: 1.8811476468289452,
                                    z: 23.197116630418257
                                  },
                                  {
                                    x: -27.148760598094807,
                                    y: 2.819570853279011,
                                    z: 22.85487598204249
                                  },
                                  {
                                    x: -27.355035510821605,
                                    y: 3.7152940578188534,
                                    z: 22.57103898780732
                                  },
                                  {
                                    x: -27.502197222612775,
                                    y: 4.250711150019382,
                                    z: 22.294724284735153
                                  },
                                  {
                                    x: -27.642082854714587,
                                    y: 5.206726446434018,
                                    z: 22.541184779848017
                                  },
                                  {
                                    x: -27.795690445996893,
                                    y: 6.166935776354675,
                                    z: 22.75924207910518
                                  },
                                  {
                                    x: -27.855491489648305,
                                    y: 7.167287773250966,
                                    z: 22.94402387893801
                                  },
                                  {
                                    x: -27.8887215456038,
                                    y: 8.203188243030137,
                                    z: 23.06433556118701
                                  },
                                  {
                                    x: -27.725529275989253,
                                    y: 8.502552497456346,
                                    z: 22.997058388122287
                                  },
                                  {
                                    x: -27.291885047269275,
                                    y: 9.024746287048758,
                                    z: 23.791080786743038
                                  },
                                  {
                                    x: -26.672637926812815,
                                    y: 9.46144345936675,
                                    z: 24.379460920407354
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -26.206448,
                                    y: 9.692272,
                                    z: 24.439837
                                  }
                                ]
                              },
                              {
                                name: "Freak on a Leash",
                                routeId: "freak-on-a-leash",
                                mainImageLocation: require("@/static/photos/freak-on-a-leash-route.webp"),
                                style: "sport",
                                description:
                                  "Start as Hound Dog then head left at bolt 8 to a difficult face finish.",
                                protection: "13 bolts",
                                grade: 13,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Start as Hound Dog then head left at bolt 8 to a difficult face finish.",
                                    grade: 13,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: -26.353565000645403,
                                  y: 4.366464003864957,
                                  z: 24.36608994473032
                                },
                                points: [
                                  {
                                    x: -26.341812363902154,
                                    y: -11.916019376470262,
                                    z: 25.040280731049883
                                  },
                                  {
                                    x: -26.44895949899432,
                                    y: -10.919599384183218,
                                    z: 25.002817485051878
                                  },
                                  {
                                    x: -26.586086898773733,
                                    y: -9.975193669825954,
                                    z: 25.095637979890434
                                  },
                                  {
                                    x: -26.528309715053,
                                    y: -8.901963039195866,
                                    z: 25.14325750333642
                                  },
                                  {
                                    x: -26.531447625025095,
                                    y: -7.940874161105673,
                                    z: 25.149167219358258
                                  },
                                  {
                                    x: -26.634921448777064,
                                    y: -6.951899945990366,
                                    z: 25.20727805687585
                                  },
                                  {
                                    x: -26.611595982348085,
                                    y: -5.926462121253181,
                                    z: 25.259525681794518
                                  },
                                  {
                                    x: -26.553625354304778,
                                    y: -4.927804802206818,
                                    z: 25.27455578411954
                                  },
                                  {
                                    x: -26.41212236562188,
                                    y: -3.8836497339099125,
                                    z: 25.273602161977408
                                  },
                                  {
                                    x: -26.276873253847505,
                                    y: -2.881004665245179,
                                    z: 25.287780040203515
                                  },
                                  {
                                    x: -26.15526857376524,
                                    y: -2.511073819692136,
                                    z: 25.27839295818278
                                  },
                                  {
                                    x: -26.307529155738905,
                                    y: -1.5265488758699923,
                                    z: 25.130406878502356
                                  },
                                  {
                                    x: -26.3512625055417,
                                    y: -0.5163576766589977,
                                    z: 24.977657158751814
                                  },
                                  {
                                    x: -26.386847581012418,
                                    y: 0.4446225822530904,
                                    z: 24.845801092631916
                                  },
                                  {
                                    x: -26.548115809662363,
                                    y: 1.4256350059173961,
                                    z: 24.722572811884127
                                  },
                                  {
                                    x: -26.499503753475537,
                                    y: 1.6886729023675282,
                                    z: 24.648280856110713
                                  },
                                  {
                                    x: -26.632158141483423,
                                    y: 2.67748375947159,
                                    z: 24.40917866925251
                                  },
                                  {
                                    x: -26.56862186214166,
                                    y: 3.039125340193427,
                                    z: 24.234409321775242
                                  },
                                  {
                                    x: -26.576018045894354,
                                    y: 4.0317828592398985,
                                    z: 24.343054235004914
                                  },
                                  {
                                    x: -26.634739376045548,
                                    y: 5.015660747737336,
                                    z: 24.43396338939517
                                  },
                                  {
                                    x: -26.552696046441177,
                                    y: 5.9706206732385025,
                                    z: 24.534599822057913
                                  },
                                  {
                                    x: -26.748330708399568,
                                    y: 6.986884124884998,
                                    z: 24.653994499140016
                                  },
                                  {
                                    x: -26.741170453010557,
                                    y: 7.920152838005104,
                                    z: 24.716368083912286
                                  },
                                  {
                                    x: -26.78466782153107,
                                    y: 9.017865183291228,
                                    z: 24.816867979186647
                                  },
                                  {
                                    x: -26.266439914210423,
                                    y: 9.712340028880076,
                                    z: 24.51897080566754
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -26.206448,
                                    y: 9.692272,
                                    z: 24.439837
                                  }
                                ]
                              },
                              {
                                name: "Grand Inquisitor",
                                routeId: "grand-inquisitor",
                                mainImageLocation: require("@/static/photos/grand-inquisitor-route.webp"),
                                style: "trad",
                                description:
                                  "Begin below an overhang. Gain the roof and continue up a crack following the corner to the anchors.",
                                protection: "2 bolts, gear to 3.5 in.",
                                grade: 12,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Begin below an overhang. Gain the roof and continue up a crack following the corner to the anchors.",
                                    grade: 12,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: -25.5763576856447,
                                  y: 4.01666549572145,
                                  z: 26.221236976701615
                                },
                                points: [
                                  {
                                    x: -25.115582746784742,
                                    y: -14.709025826255573,
                                    z: 25.418794566492284
                                  },
                                  {
                                    x: -25.171087270084314,
                                    y: -14.735213201061418,
                                    z: 25.37880818245149
                                  },
                                  {
                                    x: -25.234269246243763,
                                    y: -13.900522422820051,
                                    z: 25.627206629986713
                                  },
                                  {
                                    x: -25.294216488517538,
                                    y: -13.099727775681469,
                                    z: 26.378502061785024
                                  },
                                  {
                                    x: -25.453965978478287,
                                    y: -12.163725598277237,
                                    z: 26.880277903490768
                                  },
                                  {
                                    x: -25.525269999795192,
                                    y: -11.279189487512681,
                                    z: 27.272675905857273
                                  },
                                  {
                                    x: -25.5526651674366,
                                    y: -10.422709498721536,
                                    z: 27.638312698159474
                                  },
                                  {
                                    x: -25.663674071129872,
                                    y: -9.983222480709042,
                                    z: 27.83516500359699
                                  },
                                  {
                                    x: -25.865323826402168,
                                    y: -9.056045241814429,
                                    z: 28.365465890583653
                                  },
                                  {
                                    x: -25.75422123485422,
                                    y: -8.020285405298612,
                                    z: 28.604225086797857
                                  },
                                  {
                                    x: -25.676271719351917,
                                    y: -6.9960673608217965,
                                    z: 28.57515515999765
                                  },
                                  {
                                    x: -25.61572034485436,
                                    y: -6.053707278012169,
                                    z: 28.488754069482088
                                  },
                                  {
                                    x: -25.61919539921769,
                                    y: -5.022036279270781,
                                    z: 28.57951411186493
                                  },
                                  {
                                    x: -25.548501323331553,
                                    y: -4.008692433567305,
                                    z: 28.55676967312987
                                  },
                                  {
                                    x: -25.426608419529707,
                                    y: -3.0444699619314926,
                                    z: 28.339866880146722
                                  },
                                  {
                                    x: -25.11570601430743,
                                    y: -2.0071946163310246,
                                    z: 28.2710976876328
                                  },
                                  {
                                    x: -24.91623550266369,
                                    y: -1.0763165033905056,
                                    z: 28.224327165211108
                                  },
                                  {
                                    x: -24.786285896752336,
                                    y: -0.7290929770451924,
                                    z: 28.132441475069232
                                  },
                                  {
                                    x: -25.40282767801814,
                                    y: -0.2260018837173612,
                                    z: 27.981091674768887
                                  },
                                  {
                                    x: -25.889801454294524,
                                    y: 0.408143607757885,
                                    z: 27.01983088232385
                                  },
                                  {
                                    x: -25.884664312703606,
                                    y: 0.8503735272228528,
                                    z: 26.28085993112883
                                  },
                                  {
                                    x: -25.865448191985386,
                                    y: 1.8562983071730108,
                                    z: 26.21626700527789
                                  },
                                  {
                                    x: -25.785135133232334,
                                    y: 2.857043702346449,
                                    z: 26.186036715286672
                                  },
                                  {
                                    x: -25.77293723274727,
                                    y: 3.818765300437715,
                                    z: 26.218920453461944
                                  },
                                  {
                                    x: -25.442846271232387,
                                    y: 4.991379452675709,
                                    z: 26.161420542982285
                                  },
                                  {
                                    x: -25.524866216404828,
                                    y: 5.680657831223009,
                                    z: 26.161791023118255
                                  },
                                  {
                                    x: -25.713809103192258,
                                    y: 6.665933847782857,
                                    z: 25.676432080816678
                                  },
                                  {
                                    x: -25.586557403255526,
                                    y: 7.623374751866747,
                                    z: 25.303922497969545
                                  },
                                  {
                                    x: -25.95672113137702,
                                    y: 8.432203438161997,
                                    z: 25.178737135516315
                                  },
                                  {
                                    x: -26.246562260925757,
                                    y: 9.454298179836897,
                                    z: 24.82933366346419
                                  },
                                  {
                                    x: -26.22653148080759,
                                    y: 9.651350181096072,
                                    z: 24.57740805944899
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -26.206448,
                                    y: 9.692272,
                                    z: 24.439837
                                  }
                                ]
                              },
                              {
                                name: "The Purpose",
                                routeId: "the-purpose",
                                mainImageLocation: require("@/static/photos/the-purpose-route.webp"),
                                style: "sport",
                                description:
                                  "Start below the overhang and follow the bolted seam to the anchors.",
                                protection: "6 bolts",
                                grade: 12,
                                gradeModifier: "c",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Start below the overhang and follow the bolted seam to the anchors.",
                                    grade: 12,
                                    gradeModifier: "c"
                                  }
                                ],
                                center: {
                                  x: -23.775770542492648,
                                  y: 3.852023200566011,
                                  z: 27.938688061252773
                                },
                                points: [
                                  {
                                    x: -23.94062219566993,
                                    y: -13.65151116646097,
                                    z: 26.076441379558148
                                  },
                                  {
                                    x: -23.879660579159303,
                                    y: -12.817705856835273,
                                    z: 26.365762354037777
                                  },
                                  {
                                    x: -23.920117522865276,
                                    y: -11.848990805263657,
                                    z: 27.097263278469793
                                  },
                                  {
                                    x: -24.091233201916737,
                                    y: -10.838377399014142,
                                    z: 27.885216492277877
                                  },
                                  {
                                    x: -24.09556523093749,
                                    y: -9.877889483484235,
                                    z: 28.306035586091195
                                  },
                                  {
                                    x: -24.029961169433555,
                                    y: -8.910127991503268,
                                    z: 28.722138312831664
                                  },
                                  {
                                    x: -24.063470450771483,
                                    y: -7.984087709265386,
                                    z: 28.959008723046693
                                  },
                                  {
                                    x: -24.04844108548722,
                                    y: -6.988036447238506,
                                    z: 29.12218857691178
                                  },
                                  {
                                    x: -24.026808782072887,
                                    y: -6.0252854918533005,
                                    z: 29.107760636006663
                                  },
                                  {
                                    x: -23.98279091131728,
                                    y: -5.042257085008459,
                                    z: 29.047895156222523
                                  },
                                  {
                                    x: -23.917261708483448,
                                    y: -4.504890266090132,
                                    z: 28.90693958509326
                                  },
                                  {
                                    x: -23.898961096678356,
                                    y: -3.471394158485115,
                                    z: 28.893817088014977
                                  },
                                  {
                                    x: -23.845052507792396,
                                    y: -2.46818864381003,
                                    z: 28.792917407365568
                                  },
                                  {
                                    x: -23.78206303768496,
                                    y: -1.462955500416707,
                                    z: 28.693397484441785
                                  },
                                  {
                                    x: -23.743655951126023,
                                    y: -0.491604917656406,
                                    z: 28.65992356658874
                                  },
                                  {
                                    x: -23.69463174101586,
                                    y: 0.4947738881613094,
                                    z: 28.68722996512475
                                  },
                                  {
                                    x: -23.622584545096025,
                                    y: 0.48565379765039435,
                                    z: 28.609977972816452
                                  },
                                  {
                                    x: -23.699518955535225,
                                    y: 1.4725315864985706,
                                    z: 28.670082877386573
                                  },
                                  {
                                    x: -23.703022325441594,
                                    y: 2.475290572349195,
                                    z: 28.471662743574843
                                  },
                                  {
                                    x: -23.70925317639938,
                                    y: 3.460884957737388,
                                    z: 28.247015920990304
                                  },
                                  {
                                    x: -23.716859821424983,
                                    y: 4.4280722545192726,
                                    z: 28.06542565786782
                                  },
                                  {
                                    x: -23.684903496208076,
                                    y: 5.466507821866137,
                                    z: 27.778232308577433
                                  },
                                  {
                                    x: -23.677227667970392,
                                    y: 6.1928107307146805,
                                    z: 27.466389803179606
                                  },
                                  {
                                    x: -24.28357358946558,
                                    y: 6.9173419377442675,
                                    z: 27.081468214140767
                                  },
                                  {
                                    x: -24.82312770933932,
                                    y: 7.578243595806906,
                                    z: 26.42097722277708
                                  },
                                  {
                                    x: -24.88927431413598,
                                    y: 8.057880293868154,
                                    z: 25.34818653010302
                                  },
                                  {
                                    x: -25.636574024598605,
                                    y: 8.729553882096253,
                                    z: 25.240311751696254
                                  },
                                  {
                                    x: -26.28746036915401,
                                    y: 9.53349746578968,
                                    z: 24.747297519066002
                                  },
                                  {
                                    x: -26.35815811463421,
                                    y: 9.604281371744904,
                                    z: 24.51569127470161
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -26.206448,
                                    y: 9.692272,
                                    z: 24.439837
                                  }
                                ]
                              },
                              {
                                name: "Gates of Eden",
                                routeId: "gates-of-eden",
                                mainImageLocation: require("@/static/photos/gates-of-eden-route.webp"),
                                style: "trad",
                                description:
                                  "Climb the wide crack out of the overhang. Head right to join the second pitch of Cosmosis or left to the anchors of Hound Dog.",
                                protection: "Gear to 4.5 in.",
                                grade: 10,
                                gradeModifier: "b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the wide crack out of the overhang. Head right to join the second pitch of Cosmosis or left to the anchors of Hound Dog.",
                                    grade: 10,
                                    gradeModifier: "b"
                                  }
                                ],
                                center: {
                                  x: -21.41331349649115,
                                  y: -0.1299052595742456,
                                  z: 29.657438361400207
                                },
                                points: [
                                  {
                                    x: -21.818045384672843,
                                    y: -11.53775695100135,
                                    z: 27.331682622530938
                                  },
                                  {
                                    x: -21.856647148710845,
                                    y: -10.662663129865061,
                                    z: 27.452880975208178
                                  },
                                  {
                                    x: -21.824171080277328,
                                    y: -9.833783414123912,
                                    z: 28.16440977329031
                                  },
                                  {
                                    x: -21.930457049592967,
                                    y: -8.847933124375603,
                                    z: 28.624825779724155
                                  },
                                  {
                                    x: -22.038513494185317,
                                    y: -8.035743372208696,
                                    z: 28.9016747557087
                                  },
                                  {
                                    x: -22.119911743766796,
                                    y: -7.623691052826712,
                                    z: 29.136688399436846
                                  },
                                  {
                                    x: -22.045784725731632,
                                    y: -6.6429254677171645,
                                    z: 29.43457080369681
                                  },
                                  {
                                    x: -21.975652993152476,
                                    y: -5.706428724000661,
                                    z: 29.400752933014537
                                  },
                                  {
                                    x: -21.916753971648653,
                                    y: -4.751046008790197,
                                    z: 29.646017970041292
                                  },
                                  {
                                    x: -21.819915323076152,
                                    y: -3.75763470796055,
                                    z: 29.897467015543715
                                  },
                                  {
                                    x: -21.717708951504353,
                                    y: -3.065458374339153,
                                    z: 30.037692456042404
                                  },
                                  {
                                    x: -21.736319022489663,
                                    y: -2.052387705914761,
                                    z: 29.969061513560238
                                  },
                                  {
                                    x: -21.64994568420978,
                                    y: -1.1102057334806004,
                                    z: 29.98665562997128
                                  },
                                  {
                                    x: -21.50318023409365,
                                    y: -0.04442404883895827,
                                    z: 29.796643402910878
                                  },
                                  {
                                    x: -21.3863246106173,
                                    y: 0.8584502765723124,
                                    z: 29.51005621716527
                                  },
                                  {
                                    x: -21.211319422813553,
                                    y: 1.885358613803476,
                                    z: 29.333906306160284
                                  },
                                  {
                                    x: -21.05550505858431,
                                    y: 2.847823144376377,
                                    z: 28.927216432138163
                                  },
                                  {
                                    x: -20.94161945241996,
                                    y: 3.7734432330614416,
                                    z: 28.751401235866826
                                  },
                                  {
                                    x: -20.726174116697024,
                                    y: 4.322700858280809,
                                    z: 28.43128962960562
                                  },
                                  {
                                    x: -20.293979258639798,
                                    y: 5.173336307490809,
                                    z: 28.25490388508112
                                  },
                                  {
                                    x: -19.845524216615566,
                                    y: 6.07165439735369,
                                    z: 27.752068256800435
                                  },
                                  {
                                    x: -19.673795913210025,
                                    y: 6.216674823721179,
                                    z: 27.5130953139603
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -19.199301,
                                    y: 6.260379,
                                    z: 27.472683
                                  }
                                ]
                              },
                              {
                                name: "Tiempos de Ceguera",
                                routeId: "tiempos-de-ceguera",
                                mainImageLocation: require("@/static/photos/tiempos-de-ceguera-route.webp"),
                                style: "sport",
                                description:
                                  "Climb the arete right of Gates of Eden.",
                                protection: "6 bolts",
                                grade: 13,
                                gradeModifier: "b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the arete right of Gates of Eden.",
                                    grade: 13,
                                    gradeModifier: "b"
                                  }
                                ],
                                center: {
                                  x: -20.819345782399765,
                                  y: -1.7787086911949546,
                                  z: 30.463009762765083
                                },
                                points: [
                                  {
                                    x: -21.396303093589612,
                                    y: -11.781943534408926,
                                    z: 27.06210901516047
                                  },
                                  {
                                    x: -21.40290041803962,
                                    y: -10.99157502625826,
                                    z: 27.12581580356991
                                  },
                                  {
                                    x: -21.36953007753123,
                                    y: -10.172219367558325,
                                    z: 27.503970068021616
                                  },
                                  {
                                    x: -21.22846672215717,
                                    y: -9.191303068946782,
                                    z: 28.107736347239143
                                  },
                                  {
                                    x: -21.30257478575978,
                                    y: -8.236998955991282,
                                    z: 28.28961865094633
                                  },
                                  {
                                    x: -21.195982350812073,
                                    y: -7.399575378879774,
                                    z: 29.112606444183264
                                  },
                                  {
                                    x: -21.13789337388186,
                                    y: -6.886830542970322,
                                    z: 29.33957838460702
                                  },
                                  {
                                    x: -20.916680106144828,
                                    y: -5.9612432555148445,
                                    z: 29.61959912139615
                                  },
                                  {
                                    x: -20.94510310711071,
                                    y: -5.000553045021118,
                                    z: 29.801623528077528
                                  },
                                  {
                                    x: -20.806108992387976,
                                    y: -4.0251292315110305,
                                    z: 30.15205261747708
                                  },
                                  {
                                    x: -20.674857156504956,
                                    y: -3.019246419039592,
                                    z: 30.412387751908593
                                  },
                                  {
                                    x: -20.581266612086477,
                                    y: -2.0015537840790985,
                                    z: 30.42024080779781
                                  },
                                  {
                                    x: -20.429215093721496,
                                    y: -1.108805786909451,
                                    z: 30.751300585683726
                                  },
                                  {
                                    x: -20.439288291190707,
                                    y: 0.006935108903494219,
                                    z: 30.71930689407591
                                  },
                                  {
                                    x: -20.50278367788859,
                                    y: -0.008702787108266288,
                                    z: 30.641142359011926
                                  },
                                  {
                                    x: -20.276504518193118,
                                    y: 0.9518173674682777,
                                    z: 30.502927606841283
                                  },
                                  {
                                    x: -20.102445880725906,
                                    y: 1.8445940435473798,
                                    z: 30.13529316555148
                                  },
                                  {
                                    x: -20.030088790214396,
                                    y: 2.7863074512907025,
                                    z: 29.65656579866868
                                  },
                                  {
                                    x: -19.70883822698878,
                                    y: 3.7224548521517695,
                                    z: 29.067945108477655
                                  },
                                  {
                                    x: -19.606699658047916,
                                    y: 4.519683028548133,
                                    z: 28.75874574087526
                                  },
                                  {
                                    x: -19.537787180721132,
                                    y: 5.0093538917775495,
                                    z: 28.45683189980528
                                  },
                                  {
                                    x: -19.3115377259079,
                                    y: 5.9636494318561875,
                                    z: 27.853342647582778
                                  },
                                  {
                                    x: -19.25887945473597,
                                    y: 5.799000306058884,
                                    z: 27.862893364735008
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -19.199301,
                                    y: 6.260379,
                                    z: 27.472683
                                  }
                                ]
                              },
                              {
                                name: "Double Jeopardy",
                                routeId: "double-jeapardy",
                                mainImageLocation: require("@/static/photos/double-jeapardy-route.webp"),
                                style: "trad",
                                description:
                                  "Climb the chimney. Stemming and crack climbing.",
                                protection: "Standard Rack",
                                grade: 9,
                                gradeModifier: "",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the chimney. Stemming and crack climbing.",
                                    grade: 9,
                                    gradeModifier: ""
                                  }
                                ],
                                center: {
                                  x: -19.385388931584096,
                                  y: 0.39593495979628157,
                                  z: 28.69278375511307
                                },
                                points: [
                                  {
                                    x: -20.439119621990223,
                                    y: -10.529628372289336,
                                    z: 26.154020519427736
                                  },
                                  {
                                    x: -20.26490814922261,
                                    y: -9.606086086440678,
                                    z: 26.24938944836917
                                  },
                                  {
                                    x: -20.146887845950467,
                                    y: -8.597772279207032,
                                    z: 26.330826001053925
                                  },
                                  {
                                    x: -19.92849530714604,
                                    y: -7.660629403037088,
                                    z: 26.23369201454611
                                  },
                                  {
                                    x: -19.74904049970669,
                                    y: -6.739422068400186,
                                    z: 26.37010800190924
                                  },
                                  {
                                    x: -19.61043838934307,
                                    y: -5.780120729176411,
                                    z: 26.720940652974978
                                  },
                                  {
                                    x: -19.47600201971739,
                                    y: -5.276126967557424,
                                    z: 27.002077945420226
                                  },
                                  {
                                    x: -19.650104745034767,
                                    y: -4.39050303599855,
                                    z: 27.721922315003287
                                  },
                                  {
                                    x: -19.4463739093578,
                                    y: -3.419393166551919,
                                    z: 28.129010891245713
                                  },
                                  {
                                    x: -19.22647332870039,
                                    y: -2.5911955943563894,
                                    z: 28.305966968893063
                                  },
                                  {
                                    x: -19.19206449642038,
                                    y: -2.4729573853370743,
                                    z: 28.233654412051997
                                  },
                                  {
                                    x: -19.217229343928636,
                                    y: -1.4981010832838015,
                                    z: 28.516440920458432
                                  },
                                  {
                                    x: -19.245614043969148,
                                    y: -0.49750038206698477,
                                    z: 28.737065985868178
                                  },
                                  {
                                    x: -19.22629799489136,
                                    y: 0.5761141550660229,
                                    z: 28.92855985336789
                                  },
                                  {
                                    x: -18.986835735005887,
                                    y: 1.584976225662507,
                                    z: 28.655729203226045
                                  },
                                  {
                                    x: -18.877982733614957,
                                    y: 2.318707294835903,
                                    z: 28.351501545945084
                                  },
                                  {
                                    x: -18.466829661819347,
                                    y: 3.3579036364196275,
                                    z: 28.011816362555926
                                  },
                                  {
                                    x: -18.4159679934566,
                                    y: 4.268443326824463,
                                    z: 27.975745851505152
                                  },
                                  {
                                    x: -18.6453076308872,
                                    y: 5.2577707489862515,
                                    z: 28.42207846140868
                                  },
                                  {
                                    x: -18.586624498264868,
                                    y: 5.643413251997188,
                                    z: 28.359559211488154
                                  },
                                  {
                                    x: -18.790497303456327,
                                    y: 6.3605548284934645,
                                    z: 27.636041389103152
                                  },
                                  {
                                    x: -18.783951312554546,
                                    y: 6.945871446815353,
                                    z: 27.259488085975754
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -19.199301,
                                    y: 6.260379,
                                    z: 27.472683
                                  }
                                ]
                              },
                              {
                                name: "Bell Buster",
                                routeId: "bell-buster",
                                mainImageLocation: require("@/static/photos/bell-buster-route.webp"),
                                style: "sport",
                                description:
                                  "Face climb to an arete located right of the chimney.",
                                protection: "7 bolts",
                                grade: 11,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Face climb to an arete located right of the chimney.",
                                    grade: 11,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: -18.24527489950414,
                                  y: -2.888562517271743,
                                  z: 30.09373506222233
                                },
                                points: [
                                  {
                                    x: -19.93349463497282,
                                    y: -11.281716440605042,
                                    z: 26.88729953162885
                                  },
                                  {
                                    x: -19.710045669892512,
                                    y: -10.48506515416402,
                                    z: 27.01062872530743
                                  },
                                  {
                                    x: -19.520153485925476,
                                    y: -9.58829033000736,
                                    z: 27.22589188828333
                                  },
                                  {
                                    x: -19.421931338742837,
                                    y: -8.625230986376433,
                                    z: 27.77965637162655
                                  },
                                  {
                                    x: -19.32338652255436,
                                    y: -7.671335184049069,
                                    z: 28.326750667716137
                                  },
                                  {
                                    x: -19.223077860577924,
                                    y: -6.72820095734201,
                                    z: 28.862748577256507
                                  },
                                  {
                                    x: -19.07009149064617,
                                    y: -5.795492341750639,
                                    z: 29.32550097141212
                                  },
                                  {
                                    x: -18.874023329916557,
                                    y: -4.8968786248952725,
                                    z: 29.716830791330796
                                  },
                                  {
                                    x: -18.474444256587685,
                                    y: -4.069353861518839,
                                    z: 30.01175095798468
                                  },
                                  {
                                    x: -18.294630182630023,
                                    y: -3.4077413331514563,
                                    z: 30.134491208577792
                                  },
                                  {
                                    x: -18.22810914504445,
                                    y: -2.3573904414619236,
                                    z: 30.19510049027239
                                  },
                                  {
                                    x: -18.038564443296956,
                                    y: -1.42094562687062,
                                    z: 30.044207288177255
                                  },
                                  {
                                    x: -17.861230104681898,
                                    y: -0.4177968884672656,
                                    z: 29.94682122044727
                                  },
                                  {
                                    x: -17.637812667645377,
                                    y: 0.5640575324544553,
                                    z: 29.72445882091563
                                  },
                                  {
                                    x: -17.46882876370145,
                                    y: 0.9816543908849338,
                                    z: 29.640311070606405
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -17.378479,
                                    y: 0.914227,
                                    z: 29.568759
                                  }
                                ]
                              },
                              {
                                name: "The Spoils",
                                routeId: "the-spoils",
                                mainImageLocation: require("@/static/photos/the-spoils-route.webp"),
                                style: "trad",
                                description:
                                  "Head up a flake leading to an overhanging corner. Head to Bell Buster anchors. Often toproped.",
                                protection: "Gear to 2 in.",
                                grade: 12,
                                gradeModifier: "b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Head up a flake leading to an overhanging corner. Head to Bell Buster anchors. Often toproped.",
                                    grade: 12,
                                    gradeModifier: "b"
                                  }
                                ],
                                center: {
                                  x: -13.337026844784525,
                                  y: 1.0789794369070904,
                                  z: 31.16949057983168
                                },
                                points: [
                                  {
                                    x: -13.605751478721468,
                                    y: -9.6072992342163,
                                    z: 29.35659380598732
                                  },
                                  {
                                    x: -13.55495582669035,
                                    y: -8.767193602302134,
                                    z: 29.377298313004804
                                  },
                                  {
                                    x: -13.534312632580173,
                                    y: -7.814525166109035,
                                    z: 29.689379290859307
                                  },
                                  {
                                    x: -13.447168868121036,
                                    y: -6.840064985662393,
                                    z: 30.12962054438579
                                  },
                                  {
                                    x: -13.45305626380076,
                                    y: -5.861999656832855,
                                    z: 30.54682294452907
                                  },
                                  {
                                    x: -13.462199951599793,
                                    y: -4.8578405200294705,
                                    z: 30.823241369808336
                                  },
                                  {
                                    x: -13.502771294959553,
                                    y: -3.9234156612551034,
                                    z: 31.07227807763896
                                  },
                                  {
                                    x: -13.399067192830634,
                                    y: -2.883969982236768,
                                    z: 31.153817988823953
                                  },
                                  {
                                    x: -13.22947617296841,
                                    y: -1.9395540051500768,
                                    z: 31.37635161890329
                                  },
                                  {
                                    x: -13.173860196045505,
                                    y: -0.9527265086220953,
                                    z: 31.579691625823223
                                  },
                                  {
                                    x: -13.076682832118037,
                                    y: -0.12812890332290403,
                                    z: 31.56478537479153
                                  },
                                  {
                                    x: -13.286078179599775,
                                    y: 0.8687483515762415,
                                    z: 31.50507451467914
                                  },
                                  {
                                    x: -13.369576158081301,
                                    y: 1.8372529892722342,
                                    z: 31.278487618812083
                                  },
                                  {
                                    x: -13.454399329825359,
                                    y: 2.8074252668360113,
                                    z: 31.064548483283517
                                  },
                                  {
                                    x: -13.574223398530613,
                                    y: 3.7929998245238035,
                                    z: 30.737397314486866
                                  },
                                  {
                                    x: -13.480521993955005,
                                    y: 4.510234876423319,
                                    z: 30.498123838564773
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: false,
                                    x: -13.492272,
                                    y: 4.674516,
                                    z: 30.262509
                                  }
                                ]
                              },
                              {
                                name: "The Spoiled Moose",
                                routeId: "the-spoiled-moose",
                                mainImageLocation: require("@/static/photos/the-spoiled-moose-route.webp"),
                                style: "trad",
                                description:
                                  "Head up The Spoiles then veer right when the crack splits leading to the anchors for P1 of Cosmosis.",
                                protection: "Gear to 2 in.",
                                grade: 13,
                                gradeModifier: "a R",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Head up The Spoiles then veer right when the crack splits leading to the anchors for P1 of Cosmosis.",
                                    grade: 13,
                                    gradeModifier: "a R"
                                  }
                                ],
                                center: {
                                  x: -12.650724718832478,
                                  y: 2.551029067644925,
                                  z: 32.09512575501667
                                },
                                points: [
                                  {
                                    x: -13.422698028058925,
                                    y: -9.516140265542886,
                                    z: 29.354540616045945
                                  },
                                  {
                                    x: -13.26568051089267,
                                    y: -8.76507635958547,
                                    z: 29.385424747862064
                                  },
                                  {
                                    x: -13.228722942561378,
                                    y: -7.774587145040282,
                                    z: 29.725446239874433
                                  },
                                  {
                                    x: -13.215274765095293,
                                    y: -6.733047429751357,
                                    z: 30.18324535037701
                                  },
                                  {
                                    x: -13.2513017417684,
                                    y: -5.687449483985504,
                                    z: 30.638672883971672
                                  },
                                  {
                                    x: -13.2177713225574,
                                    y: -4.733438331473612,
                                    z: 30.987382441756083
                                  },
                                  {
                                    x: -13.279667041318211,
                                    y: -3.63631256563025,
                                    z: 31.345073467529396
                                  },
                                  {
                                    x: -13.098541792163262,
                                    y: -2.6965386801572095,
                                    z: 31.425860889092075
                                  },
                                  {
                                    x: -12.911422536889924,
                                    y: -1.8481152312709133,
                                    z: 31.466246785933006
                                  },
                                  {
                                    x: -12.888530487606273,
                                    y: -1.4950641466342096,
                                    z: 31.444561716478304
                                  },
                                  {
                                    x: -12.927474709162093,
                                    y: -0.5373914433679167,
                                    z: 31.725718435592402
                                  },
                                  {
                                    x: -13.073724626975778,
                                    y: 0.3821622996760023,
                                    z: 31.922195802642715
                                  },
                                  {
                                    x: -12.970988773959043,
                                    y: 0.6178443627370258,
                                    z: 32.00696067250015
                                  },
                                  {
                                    x: -13.021043863617155,
                                    y: 1.610324933014478,
                                    z: 31.94006214001661
                                  },
                                  {
                                    x: -12.906556392539516,
                                    y: 2.614872859792758,
                                    z: 31.93588024638078
                                  },
                                  {
                                    x: -12.768543068410562,
                                    y: 3.587909379811919,
                                    z: 32.04480348767023
                                  },
                                  {
                                    x: -12.497993153923705,
                                    y: 4.6244716894874065,
                                    z: 31.80582986685512
                                  },
                                  {
                                    x: -12.280763368675618,
                                    y: 5.147089287191152,
                                    z: 31.59032273289799
                                  },
                                  {
                                    x: -11.666887384506134,
                                    y: 5.9595179678800845,
                                    z: 31.499684402796888
                                  },
                                  {
                                    x: -10.921530441885169,
                                    y: 6.605978773512983,
                                    z: 31.080802014914067
                                  },
                                  {
                                    x: -10.647249344871716,
                                    y: 6.854543229226202,
                                    z: 30.836811037733604
                                  },
                                  {
                                    x: -10.64859528988608,
                                    y: 7.815454772089223,
                                    z: 30.48524541251627
                                  },
                                  {
                                    x: -10.664682480347764,
                                    y: 8.719187725848506,
                                    z: 29.941364414231334
                                  },
                                  {
                                    x: -10.631568292993734,
                                    y: 9.581296346770541,
                                    z: 29.40863865888752
                                  },
                                  {
                                    x: -10.698702316625466,
                                    y: 10.457162950208872,
                                    z: 29.039321693369075
                                  },
                                  {
                                    x: -10.7754236694854,
                                    y: 11.022930298583868,
                                    z: 28.58530625877502
                                  },
                                  {
                                    x: -10.321129196696603,
                                    y: 11.932651891682903,
                                    z: 28.150927006373056
                                  },
                                  {
                                    x: -10.04422435058396,
                                    y: 12.401641786623113,
                                    z: 27.857117053246334
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -9.777052,
                                    y: 12.35117,
                                    z: 27.804592
                                  }
                                ]
                              },
                              {
                                name: "Verve",
                                routeId: "verve",
                                mainImageLocation: require("@/static/photos/verve-route.webp"),
                                style: "sport",
                                description: "Climb the bolted arete.",
                                protection: "4 bolts",
                                grade: 13,
                                gradeModifier: "c",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description: "Climb the bolted arete.",
                                    grade: 13,
                                    gradeModifier: "c"
                                  }
                                ],
                                center: {
                                  x: -10.501676439525376,
                                  y: 1.5803805031712346,
                                  z: 31.933465523063518
                                },
                                points: [
                                  {
                                    x: -11.654798965267638,
                                    y: -8.775268417961625,
                                    z: 29.432104245590406
                                  },
                                  {
                                    x: -11.665339111273557,
                                    y: -7.999635150801329,
                                    z: 29.695218249976524
                                  },
                                  {
                                    x: -11.442612567045646,
                                    y: -7.005156759375901,
                                    z: 30.138795865870815
                                  },
                                  {
                                    x: -11.415242259787487,
                                    y: -6.099422344483454,
                                    z: 30.19537237039165
                                  },
                                  {
                                    x: -11.33257654875481,
                                    y: -5.194308285109594,
                                    z: 30.424910633984293
                                  },
                                  {
                                    x: -11.16617942755494,
                                    y: -4.263112304859322,
                                    z: 30.804646292605508
                                  },
                                  {
                                    x: -10.890086065467916,
                                    y: -3.2406140537984967,
                                    z: 31.33052239237293
                                  },
                                  {
                                    x: -10.76229185916994,
                                    y: -2.5306373557862,
                                    z: 31.47340497866904
                                  },
                                  {
                                    x: -10.608468670354998,
                                    y: -1.564303712615299,
                                    z: 31.74799891670505
                                  },
                                  {
                                    x: -10.527315949174511,
                                    y: -0.5685543312005404,
                                    z: 31.89907039350511
                                  },
                                  {
                                    x: -10.327627059979628,
                                    y: 0.4782140306411835,
                                    z: 31.973452167099765
                                  },
                                  {
                                    x: -10.264559988680494,
                                    y: 1.469187901067974,
                                    z: 32.0132030986497
                                  },
                                  {
                                    x: -10.20889110194872,
                                    y: 2.4631140097696975,
                                    z: 32.04243558687669
                                  },
                                  {
                                    x: -10.159237211257816,
                                    y: 3.462236033960944,
                                    z: 32.03037271604272
                                  },
                                  {
                                    x: -10.208828740382701,
                                    y: 4.479860763950579,
                                    z: 31.909647664589016
                                  },
                                  {
                                    x: -10.302735565335244,
                                    y: 5.170119995222977,
                                    z: 31.73562650610649
                                  },
                                  {
                                    x: -10.35432123535715,
                                    y: 6.096615833028098,
                                    z: 31.364306931597657
                                  },
                                  {
                                    x: -10.369676054942596,
                                    y: 6.95640572563286,
                                    z: 30.886221607361666
                                  },
                                  {
                                    x: -10.359561252383237,
                                    y: 7.867059334882592,
                                    z: 30.45995549114763
                                  },
                                  {
                                    x: -10.40373759807062,
                                    y: 8.748249228903012,
                                    z: 29.939992846228854
                                  },
                                  {
                                    x: -10.435308932864906,
                                    y: 9.569327047757856,
                                    z: 29.39307492245224
                                  },
                                  {
                                    x: -10.399349383144006,
                                    y: 10.481190709461945,
                                    z: 28.987018497261143
                                  },
                                  {
                                    x: -10.364116849877396,
                                    y: 10.815160875339288,
                                    z: 28.728277866210348
                                  },
                                  {
                                    x: -10.109126252711665,
                                    y: 11.654103620589773,
                                    z: 28.342203965991075
                                  },
                                  {
                                    x: -9.685856562849406,
                                    y: 12.508545612101972,
                                    z: 27.961257231125558
                                  },
                                  {
                                    x: -9.602841259732715,
                                    y: 12.479990649313258,
                                    z: 27.873356166577185
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -9.777052,
                                    y: 12.35117,
                                    z: 27.804592
                                  }
                                ]
                              },
                              {
                                name: "Cosmosis",
                                routeId: "cosmosis",
                                mainImageLocation: require("@/static/photos/cosmosis-route.webp"),
                                style: "trad",
                                description: "Climb the bolted arete.",
                                protection: "Standard Rack",
                                grade: 10,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the right-facing corner to a small roof with the anchors above.",
                                    grade: 10,
                                    gradeModifier: "a"
                                  },
                                  {
                                    description:
                                      "Climb the face above to a corner leading to the top.",
                                    grade: 9,
                                    gradeModifier: ""
                                  }
                                ],
                                center: {
                                  x: -10.41648723035362,
                                  y: -0.8420367813028315,
                                  z: 28.625393505605523
                                },
                                points: [
                                  {
                                    x: -11.284631459016198,
                                    y: -8.733317413643867,
                                    z: 29.414419908530167
                                  },
                                  {
                                    x: -10.958975507447237,
                                    y: -7.722365131716522,
                                    z: 29.86712684587775
                                  },
                                  {
                                    x: -10.590886879825348,
                                    y: -6.651670434019269,
                                    z: 30.067029057370974
                                  },
                                  {
                                    x: -10.411242753078445,
                                    y: -5.658916954683496,
                                    z: 29.90302933533287
                                  },
                                  {
                                    x: -10.301160327428796,
                                    y: -4.720337461090648,
                                    z: 29.719896742480778
                                  },
                                  {
                                    x: -10.274975044651768,
                                    y: -3.776393126544775,
                                    z: 29.21588223289282
                                  },
                                  {
                                    x: -10.468084664155846,
                                    y: -2.7512630712545194,
                                    z: 28.84026782960502
                                  },
                                  {
                                    x: -10.39535204402691,
                                    y: -1.820209883748974,
                                    z: 28.638408835783483
                                  },
                                  {
                                    x: -10.14538497819591,
                                    y: -0.9034092778836135,
                                    z: 28.47749206044197
                                  },
                                  {
                                    x: -9.919910500263594,
                                    y: 0.07551812318111162,
                                    z: 28.53021259211985
                                  },
                                  {
                                    x: -9.888207386288967,
                                    y: 1.1381192368088844,
                                    z: 28.117925332872062
                                  },
                                  {
                                    x: -9.957060021572866,
                                    y: 1.747210684876785,
                                    z: 28.066207335064053
                                  },
                                  {
                                    x: -9.693466243944853,
                                    y: 2.710564788135402,
                                    z: 28.11448042675443
                                  },
                                  {
                                    x: -9.875084799404119,
                                    y: 3.857250936161153,
                                    z: 27.622154005715444
                                  },
                                  {
                                    x: -9.656023367348917,
                                    y: 4.7237734375732945,
                                    z: 27.84579272335333
                                  },
                                  {
                                    x: -9.515057543545845,
                                    y: 5.766497806799011,
                                    z: 27.98566944342822
                                  },
                                  {
                                    x: -9.433459265146881,
                                    y: 6.7534180177868235,
                                    z: 28.032684398702283
                                  },
                                  {
                                    x: -9.240845839877295,
                                    y: 7.71509195969556,
                                    z: 28.44789299400594
                                  },
                                  {
                                    x: -9.327624190170157,
                                    y: 7.89728582987945,
                                    z: 28.410360650337022
                                  },
                                  {
                                    x: -9.162090927376767,
                                    y: 8.9101571510051,
                                    z: 28.45691373085257
                                  },
                                  {
                                    x: -8.98820433254979,
                                    y: 9.989888236406152,
                                    z: 28.69766438896149
                                  },
                                  {
                                    x: -9.16210228613764,
                                    y: 11.093138969179757,
                                    z: 28.582669775003087
                                  },
                                  {
                                    x: -9.261761558113756,
                                    y: 12.00699345211643,
                                    z: 28.24502613558937
                                  },
                                  {
                                    x: -9.444254623224461,
                                    y: 12.917015399604187,
                                    z: 27.797337842899907
                                  },
                                  {
                                    x: -9.553337113121174,
                                    y: 13.853241136202076,
                                    z: 27.402741714225414
                                  },
                                  {
                                    x: -9.669519831645873,
                                    y: 14.677843565149361,
                                    z: 26.824525785779148
                                  },
                                  {
                                    x: -9.970901441978588,
                                    y: 15.550664349228708,
                                    z: 26.49948494432232
                                  },
                                  {
                                    x: -10.305634721461743,
                                    y: 16.45358357907169,
                                    z: 26.149294548034234
                                  },
                                  {
                                    x: -10.65401067202339,
                                    y: 17.278884127681064,
                                    z: 25.697141403874088
                                  },
                                  {
                                    x: -10.754576650202145,
                                    y: 17.66960985323174,
                                    z: 25.43771551021685
                                  },
                                  {
                                    x: -10.945789829783864,
                                    y: 18.667269333138023,
                                    z: 25.355570966682407
                                  },
                                  {
                                    x: -10.992528786569714,
                                    y: 19.71330358953746,
                                    z: 25.149713410882782
                                  },
                                  {
                                    x: -11.01845638362962,
                                    y: 20.719257675081835,
                                    z: 24.825901612963115
                                  },
                                  {
                                    x: -11.068484995786951,
                                    y: 21.500532760079267,
                                    z: 24.296279727124748
                                  },
                                  {
                                    x: -11.131074640481144,
                                    y: 22.267358492706784,
                                    z: 23.767986178044076
                                  },
                                  {
                                    x: -11.18390953944318,
                                    y: 23.08981241683397,
                                    z: 23.272723085386147
                                  },
                                  {
                                    x: -11.272464287853685,
                                    y: 24.041300011880118,
                                    z: 23.16205188868494
                                  },
                                  {
                                    x: -11.334607114614371,
                                    y: 25.269165554494876,
                                    z: 23.22706977624137
                                  },
                                  {
                                    x: -11.461589714982857,
                                    y: 26.461525306410856,
                                    z: 23.117338545720088
                                  },
                                  {
                                    x: -11.469917834861064,
                                    y: 27.263290171402947,
                                    z: 22.60268251314418
                                  },
                                  {
                                    x: -11.449587413068008,
                                    y: 27.34081917794733,
                                    z: 22.44602637422528
                                  },
                                  {
                                    x: -11.568128610094625,
                                    y: 28.091782386259393,
                                    z: 21.976583907469664
                                  },
                                  {
                                    x: -11.924114110077785,
                                    y: 29.384238076199804,
                                    z: 22.197711206312697
                                  },
                                  {
                                    x: -12.010879713640774,
                                    y: 30.19346185595078,
                                    z: 21.41304995549294
                                  },
                                  {
                                    x: -12.199529922057403,
                                    y: 30.990137238719928,
                                    z: 20.779421298677793
                                  },
                                  {
                                    x: -12.600472996641173,
                                    y: 31.711031099602444,
                                    z: 19.913098281386976
                                  },
                                  {
                                    x: -12.747562489055547,
                                    y: 32.54833124362888,
                                    z: 19.473757013146187
                                  },
                                  {
                                    x: -12.873538739116679,
                                    y: 33.666777130728086,
                                    z: 19.626015198816606
                                  },
                                  {
                                    x: -13.124940396959321,
                                    y: 34.551929926276024,
                                    z: 19.378421827018453
                                  },
                                  {
                                    x: -13.13241114889725,
                                    y: 35.52672001274369,
                                    z: 19.206992379894896
                                  },
                                  {
                                    x: -13.27993099927482,
                                    y: 35.584722095920654,
                                    z: 19.13272978396722
                                  },
                                  {
                                    x: -13.349977914865892,
                                    y: 36.58244497071209,
                                    z: 18.978780575383905
                                  },
                                  {
                                    x: -13.536695048715309,
                                    y: 37.5444443974604,
                                    z: 18.705090401200533
                                  },
                                  {
                                    x: -13.813709154247041,
                                    y: 38.49906567979937,
                                    z: 18.63462876191931
                                  },
                                  {
                                    x: -13.99014222410364,
                                    y: 39.47397440429966,
                                    z: 18.46416415570521
                                  },
                                  {
                                    x: -14.189870491636407,
                                    y: 40.44033718108417,
                                    z: 18.4249977618317
                                  },
                                  {
                                    x: -14.551970151953887,
                                    y: 41.381442520825175,
                                    z: 18.451378073475215
                                  },
                                  {
                                    x: -14.755356517782051,
                                    y: 42.38271586162692,
                                    z: 18.636667899342896
                                  },
                                  {
                                    x: -14.653366843594823,
                                    y: 42.63623500912549,
                                    z: 18.732976623308947
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -9.777052,
                                    y: 12.35117,
                                    z: 27.804592
                                  },
                                  {
                                    fixed: false,
                                    x: -14.954608,
                                    y: 43.131599,
                                    z: 17.997593
                                  }
                                ]
                              },
                              {
                                name: "Beethoven's Fifth",
                                routeId: "beethovens-fifth",
                                mainImageLocation: require("@/static/photos/beethovens-fifth-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Standard Rack",
                                grade: 10,
                                gradeModifier: "d",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the crack to the right of Cosmosis corner.",
                                    grade: 10,
                                    gradeModifier: "d"
                                  }
                                ],
                                center: {
                                  x: -7.771061,
                                  y: 1.766296,
                                  z: 27.195941
                                },
                                points: [
                                  {
                                    x: -8.50443334285812,
                                    y: -7.862576937302236,
                                    z: 29.498009411739805
                                  },
                                  {
                                    x: -8.467331120466637,
                                    y: -6.9556900664658325,
                                    z: 29.297792495186055
                                  },
                                  {
                                    x: -8.417337777110127,
                                    y: -5.957648293325687,
                                    z: 29.049801150014805
                                  },
                                  {
                                    x: -8.394615793224776,
                                    y: -5.025192958344194,
                                    z: 28.771014194647847
                                  },
                                  {
                                    x: -8.330939114811759,
                                    y: -4.038076052592799,
                                    z: 28.546248728920148
                                  },
                                  {
                                    x: -8.305451334677894,
                                    y: -3.03962969935048,
                                    z: 28.40336157387006
                                  },
                                  {
                                    x: -8.239865715999901,
                                    y: -2.032313298872556,
                                    z: 28.230047960740112
                                  },
                                  {
                                    x: -8.176694737408166,
                                    y: -1.0442384606651403,
                                    z: 28.024337439842675
                                  },
                                  {
                                    x: -8.167446169203393,
                                    y: -1.0091930696317475,
                                    z: 27.91267035670452
                                  },
                                  {
                                    x: -7.88202993633052,
                                    y: -0.09614496008327385,
                                    z: 27.679954700141028
                                  },
                                  {
                                    x: -7.788713979922092,
                                    y: 0.7655682426774364,
                                    z: 27.58890854566342
                                  },
                                  {
                                    x: -7.678973619367613,
                                    y: 1.682680958021293,
                                    z: 27.408108376755226
                                  },
                                  {
                                    x: -7.5672581303803845,
                                    y: 2.6137564250190004,
                                    z: 27.225568594770948
                                  },
                                  {
                                    x: -7.450520306443228,
                                    y: 3.5704932946427785,
                                    z: 27.080257735698225
                                  },
                                  {
                                    x: -7.337845848247088,
                                    y: 4.545404686546149,
                                    z: 26.93059402665401
                                  },
                                  {
                                    x: -7.203631969439289,
                                    y: 5.485715833413721,
                                    z: 26.806000877305024
                                  },
                                  {
                                    x: -7.009119218648155,
                                    y: 6.56645456037928,
                                    z: 26.781097261182634
                                  },
                                  {
                                    x: -6.848350006939746,
                                    y: 7.539771957761225,
                                    z: 26.766156693326575
                                  },
                                  {
                                    x: -6.634089329973894,
                                    y: 8.640882872342507,
                                    z: 27.030684279599182
                                  },
                                  {
                                    x: -6.4459883659716,
                                    y: 9.72318091797258,
                                    z: 27.185051655089765
                                  },
                                  {
                                    x: -6.182331106157262,
                                    y: 10.769232804800229,
                                    z: 27.28999644501107
                                  },
                                  {
                                    x: -6.233398708873335,
                                    y: 11.185184356652693,
                                    z: 27.199703573149034
                                  },
                                  {
                                    x: -6.310585149358472,
                                    y: 12.19294625470156,
                                    z: 27.222695330577956
                                  },
                                  {
                                    x: -6.39628107442203,
                                    y: 13.18742313622452,
                                    z: 27.128640418182115
                                  },
                                  {
                                    x: -6.4440820909877266,
                                    y: 13.575568598689877,
                                    z: 26.949484794212058
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -6.387364,
                                    y: 13.890901,
                                    z: 26.722855
                                  }
                                ]
                              },
                              {
                                name: "West Crack",
                                routeId: "west-crack",
                                mainImageLocation: require("@/static/photos/west-crack-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Gear to 3.5 in.",
                                grade: 9,
                                gradeModifier: "",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "The crack to the right of Beethoven's fifth.",
                                    grade: 9,
                                    gradeModifier: ""
                                  }
                                ],
                                center: {
                                  x: -4.622345,
                                  y: 2.228973,
                                  z: 26.521718
                                },
                                points: [
                                  {
                                    x: -4.547902677746513,
                                    y: -6.6235175300965485,
                                    z: 27.74582456607576
                                  },
                                  {
                                    x: -4.590526307297603,
                                    y: -5.870259373049478,
                                    z: 27.494637746683406
                                  },
                                  {
                                    x: -4.671997154551443,
                                    y: -5.0072346011792765,
                                    z: 27.201253064181866
                                  },
                                  {
                                    x: -4.58682096353985,
                                    y: -4.013041385919507,
                                    z: 27.111001520484894
                                  },
                                  {
                                    x: -4.572007638012196,
                                    y: -3.0722604189731,
                                    z: 26.98366926673036
                                  },
                                  {
                                    x: -4.442403209755891,
                                    y: -1.93152871503231,
                                    z: 26.912814507161833
                                  },
                                  {
                                    x: -4.448863030449262,
                                    y: -0.9191672015026778,
                                    z: 26.909281029766714
                                  },
                                  {
                                    x: -4.43786955278619,
                                    y: 0.07702274600066249,
                                    z: 26.77186897917445
                                  },
                                  {
                                    x: -4.483437170412365,
                                    y: 1.0333792905676087,
                                    z: 26.66390044523351
                                  },
                                  {
                                    x: -4.42303998399062,
                                    y: 2.1101131228045342,
                                    z: 26.648791272556487
                                  },
                                  {
                                    x: -4.399982859311954,
                                    y: 3.1318771476527556,
                                    z: 26.563440542772717
                                  },
                                  {
                                    x: -4.38669651906357,
                                    y: 4.139311552472384,
                                    z: 26.42082070267456
                                  },
                                  {
                                    x: -4.397718590893307,
                                    y: 5.122136964725619,
                                    z: 26.273931394340572
                                  },
                                  {
                                    x: -4.375192474683191,
                                    y: 6.138378196196986,
                                    z: 26.171486302127068
                                  },
                                  {
                                    x: -4.302935943476807,
                                    y: 7.162748621684776,
                                    z: 26.153752449338118
                                  },
                                  {
                                    x: -4.213545658085758,
                                    y: 8.202547063243024,
                                    z: 26.24156747667334
                                  },
                                  {
                                    x: -4.111075371437956,
                                    y: 9.284962897392903,
                                    z: 26.33114505642127
                                  },
                                  {
                                    x: -4.075573050101249,
                                    y: 10.289988728114976,
                                    z: 26.261675731968197
                                  },
                                  {
                                    x: -4.038885484388364,
                                    y: 11.293686236640198,
                                    z: 26.188963323613685
                                  },
                                  {
                                    x: -4.073471292610308,
                                    y: 11.687169432406733,
                                    z: 26.06504235966336
                                  },
                                  {
                                    x: -3.2499774291518215,
                                    y: 12.174782155038864,
                                    z: 25.73368655548241
                                  },
                                  {
                                    x: -2.4813052378725877,
                                    y: 12.65981365796841,
                                    z: 25.488369333777236
                                  },
                                  {
                                    x: -2.0355526924170304,
                                    y: 12.909559438047395,
                                    z: 25.34481377447994
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -2.030304,
                                    y: 12.913291,
                                    z: 25.243873
                                  }
                                ]
                              },
                              {
                                name: "West face",
                                routeId: "west-face",
                                mainImageLocation: require("@/static/photos/west-face-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Standard Rack",
                                grade: 9,
                                gradeModifier: "",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the crack rigt of West Crack.",
                                    grade: 9,
                                    gradeModifier: ""
                                  }
                                ],
                                center: {
                                  x: -3.48046,
                                  y: 2.966783,
                                  z: 25.633656
                                },
                                points: [
                                  {
                                    x: -3.668273801069158,
                                    y: -6.4167728015035,
                                    z: 27.160171996028936
                                  },
                                  {
                                    x: -3.7353112762353966,
                                    y: -5.584192907018134,
                                    z: 26.855407234883334
                                  },
                                  {
                                    x: -3.787790135978419,
                                    y: -4.660640048052577,
                                    z: 26.745083664564937
                                  },
                                  {
                                    x: -3.8245670971747003,
                                    y: -3.7295321158448376,
                                    z: 26.52352892958617
                                  },
                                  {
                                    x: -3.8787186517136996,
                                    y: -2.7677576339596426,
                                    z: 26.326087413531866
                                  },
                                  {
                                    x: -3.941703575256424,
                                    y: -1.8324503954826554,
                                    z: 26.06615320217172
                                  },
                                  {
                                    x: -3.7829360243892958,
                                    y: -0.8841528457268976,
                                    z: 25.941140783686695
                                  },
                                  {
                                    x: -3.5909398414225078,
                                    y: 0.23318450481961595,
                                    z: 26.027704771237154
                                  },
                                  {
                                    x: -3.410692219314005,
                                    y: 1.3034525045747085,
                                    z: 25.949831961037102
                                  },
                                  {
                                    x: -3.356570118317058,
                                    y: 2.315500622705799,
                                    z: 25.832697295524316
                                  },
                                  {
                                    x: -3.300730448324191,
                                    y: 3.3312481184461804,
                                    z: 25.72505414912035
                                  },
                                  {
                                    x: -3.3582870521104224,
                                    y: 4.3308758069611635,
                                    z: 25.37461499825942
                                  },
                                  {
                                    x: -3.3555924624967584,
                                    y: 5.272040708628297,
                                    z: 25.194971416371416
                                  },
                                  {
                                    x: -3.164457158121244,
                                    y: 6.37201893558146,
                                    z: 25.35837571244647
                                  },
                                  {
                                    x: -3.090441848045897,
                                    y: 7.3479328555776435,
                                    z: 25.3723884501071
                                  },
                                  {
                                    x: -2.778244873694752,
                                    y: 8.447549419101504,
                                    z: 25.824172260128904
                                  },
                                  {
                                    x: -2.621357119262254,
                                    y: 9.495036137271748,
                                    z: 25.84818856959185
                                  },
                                  {
                                    x: -2.576369331440547,
                                    y: 9.87271281020792,
                                    z: 25.708276233145988
                                  },
                                  {
                                    x: -2.4405310556263347,
                                    y: 10.854169787653955,
                                    z: 25.615595966315013
                                  },
                                  {
                                    x: -2.2451466714544366,
                                    y: 11.823534326036512,
                                    z: 25.5659931650464
                                  },
                                  {
                                    x: -1.9334910088690564,
                                    y: 12.658699692388389,
                                    z: 25.389804775161252
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -2.030304,
                                    y: 12.913291,
                                    z: 25.243873
                                  }
                                ]
                              },
                              {
                                name: "Left Wall",
                                routeId: "left-wall",
                                mainImageLocation: require("@/static/photos/left-wall-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "10 Bolts",
                                grade: 9,
                                gradeModifier: "",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the arete on left side of the chimney.",
                                    grade: 9,
                                    gradeModifier: ""
                                  }
                                ],
                                center: {
                                  x: -1.207253,
                                  y: 3.35359,
                                  z: 24.159948
                                },
                                points: [
                                  {
                                    x: -2.170309449858658,
                                    y: -7.364566465964267,
                                    z: 25.111698821141367
                                  },
                                  {
                                    x: -2.021902362427446,
                                    y: -6.461587739136194,
                                    z: 24.974049983765013
                                  },
                                  {
                                    x: -2.005350874181461,
                                    y: -5.505236580616147,
                                    z: 24.841160254532948
                                  },
                                  {
                                    x: -1.903528553649496,
                                    y: -4.501270059587659,
                                    z: 24.91053518933193
                                  },
                                  {
                                    x: -1.80670835577109,
                                    y: -3.4832652542695537,
                                    z: 24.860115462826588
                                  },
                                  {
                                    x: -1.7607759642784417,
                                    y: -2.5020692627142127,
                                    z: 24.765102471504953
                                  },
                                  {
                                    x: -1.657080078406335,
                                    y: -1.5233750178596153,
                                    z: 24.750121097959703
                                  },
                                  {
                                    x: -1.4842845977686552,
                                    y: -0.5073788400131765,
                                    z: 24.82889724355412
                                  },
                                  {
                                    x: -1.3766818407477148,
                                    y: 0.6022268355436083,
                                    z: 25.03616443316991
                                  },
                                  {
                                    x: -1.3867596319366753,
                                    y: 0.9610283169473752,
                                    z: 24.897244894973262
                                  },
                                  {
                                    x: -1.2025126316725172,
                                    y: 1.8786041774262077,
                                    z: 24.715150023385803
                                  },
                                  {
                                    x: -1.1622910038540821,
                                    y: 2.8677396094306418,
                                    z: 24.55402916316521
                                  },
                                  {
                                    x: -1.1834887241636478,
                                    y: 3.713369305007557,
                                    z: 24.258659105590265
                                  },
                                  {
                                    x: -0.9834086614826314,
                                    y: 4.748438503092804,
                                    z: 24.141076010628158
                                  },
                                  {
                                    x: -0.8320867528683683,
                                    y: 5.735538555577606,
                                    z: 24.061748178840528
                                  },
                                  {
                                    x: -0.6121964931996308,
                                    y: 6.766239774733502,
                                    z: 24.056744969008648
                                  },
                                  {
                                    x: -0.49760714386440863,
                                    y: 7.691608993502058,
                                    z: 23.812345411366017
                                  },
                                  {
                                    x: -0.3770387218311917,
                                    y: 8.115736342725498,
                                    z: 23.97485583544745
                                  },
                                  {
                                    x: -0.169641835719978,
                                    y: 9.087715752769194,
                                    z: 24.024471688965843
                                  },
                                  {
                                    x: -0.19108040570104287,
                                    y: 10.053696327326493,
                                    z: 24.063872051075993
                                  },
                                  {
                                    x: -0.0335816952438078,
                                    y: 11.018031173823386,
                                    z: 24.21193703625273
                                  },
                                  {
                                    x: 0.12796525772612713,
                                    y: 12.059501833176585,
                                    z: 24.361520642540647
                                  },
                                  {
                                    x: 0.050268572725121044,
                                    y: 12.745824220002685,
                                    z: 24.443774349345112
                                  },
                                  {
                                    x: 0.1430920501429601,
                                    y: 13.726628097987682,
                                    z: 24.325133016278976
                                  },
                                  {
                                    x: 0.16180319260517603,
                                    y: 14.734562316904608,
                                    z: 24.21424605772936
                                  },
                                  {
                                    x: 0.1686828285432104,
                                    y: 15.732340106337045,
                                    z: 24.040564781215558
                                  },
                                  {
                                    x: 0.11369317035815596,
                                    y: 16.733503174127534,
                                    z: 23.876544855739056
                                  },
                                  {
                                    x: -0.0023301369021573315,
                                    y: 17.700456663969337,
                                    z: 23.685667553309333
                                  },
                                  {
                                    x: -0.156563180897287,
                                    y: 18.685060113581038,
                                    z: 23.519683906092045
                                  },
                                  {
                                    x: -0.12361861256601361,
                                    y: 19.629294479344136,
                                    z: 23.42678738763758
                                  },
                                  {
                                    x: -0.09803369692828534,
                                    y: 20.606025323477827,
                                    z: 23.2721752857156
                                  },
                                  {
                                    x: -0.46029200815310617,
                                    y: 21.676184113771985,
                                    z: 23.160795361294333
                                  },
                                  {
                                    x: -0.7733097394255835,
                                    y: 22.371317059182164,
                                    z: 22.77201200918281
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -0.53588,
                                    y: 22.670194,
                                    z: 22.306501
                                  }
                                ]
                              },
                              {
                                name: "Little Man in a Boat",
                                routeId: "little-man-in-a-boat",
                                mainImageLocation: require("@/static/photos/little-man-in-a-boat-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Standard Rack",
                                grade: 12,
                                gradeModifier: "b R",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the series of downward-facing slabs to a crack leading to the anchors of Left Area.",
                                    grade: 12,
                                    gradeModifier: "b"
                                  }
                                ],
                                center: {
                                  x: 1.21084,
                                  y: 5.839826,
                                  z: 21.668057
                                },
                                points: [
                                  {
                                    x: 0.49212886770896075,
                                    y: -5.966573278902891,
                                    z: 21.515894624027386
                                  },
                                  {
                                    x: 0.5820008434574963,
                                    y: -5.094603086920243,
                                    z: 20.767737859071822
                                  },
                                  {
                                    x: 0.4985641809273411,
                                    y: -4.095402028226712,
                                    z: 20.489866208470534
                                  },
                                  {
                                    x: 0.5139193162873353,
                                    y: -3.102850936055051,
                                    z: 20.413995623406958
                                  },
                                  {
                                    x: 0.6048867817513235,
                                    y: -2.0851709946466634,
                                    z: 20.26178523068569
                                  },
                                  {
                                    x: 0.8352332629542937,
                                    y: -1.1362823164600833,
                                    z: 20.864705932981472
                                  },
                                  {
                                    x: 0.8652722316092375,
                                    y: 0.00012687774947012752,
                                    z: 21.29738915438095
                                  },
                                  {
                                    x: 0.9508162939104423,
                                    y: 1.02735211999185,
                                    z: 21.18143076252161
                                  },
                                  {
                                    x: 0.9984162030269877,
                                    y: 2.0224679344101766,
                                    z: 21.106580430008268
                                  },
                                  {
                                    x: 0.9815081030059829,
                                    y: 3.008948452739609,
                                    z: 21.26219859807803
                                  },
                                  {
                                    x: 0.9649412319938387,
                                    y: 3.1423032871102374,
                                    z: 21.16920731578441
                                  },
                                  {
                                    x: 1.1638826760299599,
                                    y: 4.070480260617389,
                                    z: 21.348106222290117
                                  },
                                  {
                                    x: 1.3213096039681174,
                                    y: 5.0447277679054405,
                                    z: 21.609999049119406
                                  },
                                  {
                                    x: 1.422455607404668,
                                    y: 5.92186660084618,
                                    z: 21.95743346108693
                                  },
                                  {
                                    x: 1.6971011230845672,
                                    y: 6.945066252725191,
                                    z: 22.56447345059451
                                  },
                                  {
                                    x: 1.8386199686997553,
                                    y: 7.909934268553972,
                                    z: 22.691919655967073
                                  },
                                  {
                                    x: 1.9269956741269059,
                                    y: 9.073628085539776,
                                    z: 22.33587855576872
                                  },
                                  {
                                    x: 1.896197546906324,
                                    y: 9.475826398670707,
                                    z: 22.026933624267407
                                  },
                                  {
                                    x: 1.930862408608672,
                                    y: 10.43613601617597,
                                    z: 22.44055806764517
                                  },
                                  {
                                    x: 1.8502566009940264,
                                    y: 11.433136198917754,
                                    z: 22.56631908650496
                                  },
                                  {
                                    x: 1.7309897893168515,
                                    y: 12.42545104043351,
                                    z: 22.691719344679402
                                  },
                                  {
                                    x: 1.4834767064677326,
                                    y: 13.535238765207685,
                                    z: 22.29690219439268
                                  },
                                  {
                                    x: 1.3007979954595752,
                                    y: 14.464024808360177,
                                    z: 22.086892359069832
                                  },
                                  {
                                    x: 1.2548954423877334,
                                    y: 15.49443880734378,
                                    z: 21.736464160468575
                                  },
                                  {
                                    x: 1.0201908409622185,
                                    y: 16.430536782148803,
                                    z: 21.586197661474984
                                  },
                                  {
                                    x: 0.9118384824177888,
                                    y: 17.42735635134417,
                                    z: 21.654396499866106
                                  },
                                  {
                                    x: 0.9662484316606825,
                                    y: 17.539980754038307,
                                    z: 21.568446592857224
                                  },
                                  {
                                    x: 0.7837794294638072,
                                    y: 18.465721983497094,
                                    z: 21.709363451270978
                                  },
                                  {
                                    x: 0.6326488577928868,
                                    y: 19.54413956030709,
                                    z: 21.91182352707526
                                  },
                                  {
                                    x: 0.5545607767279643,
                                    y: 20.423828492791113,
                                    z: 21.73521171785377
                                  },
                                  {
                                    x: 0.5561269959432324,
                                    y: 20.922970120151344,
                                    z: 21.80067152805365
                                  },
                                  {
                                    x: -0.1583739853925858,
                                    y: 21.74232523244484,
                                    z: 21.886468759162327
                                  },
                                  {
                                    x: -0.07000321822251919,
                                    y: 22.33011958363353,
                                    z: 22.19361727414928
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: -0.53588,
                                    y: 22.670194,
                                    z: 22.306501
                                  }
                                ]
                              },
                              {
                                name: "Saved by the Bell",
                                routeId: "saved-by-the-bell",
                                mainImageLocation: require("@/static/photos/saved-by-the-bell-route.webp"),
                                style: "trad",
                                description:
                                  "A well protected route features steep moves and a nice crack.",
                                protection: "Standard Rack",
                                grade: 11,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb to the right of the chimney looking for a single bolt. Get to the bolt then head up a groove to optional anchors.",
                                    grade: 11,
                                    gradeModifier: "a"
                                  },
                                  {
                                    description: "Continue up a crack system.",
                                    grade: 11,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: 7.32044,
                                  y: 14.564683,
                                  z: 20.55921
                                },
                                points: [
                                  {
                                    x: 6.054977879727808,
                                    y: -2.345626090652623,
                                    z: 21.820413813003594
                                  },
                                  {
                                    x: 6.2323166592566865,
                                    y: -1.4294541613386287,
                                    z: 21.795366403069647
                                  },
                                  {
                                    x: 6.348437197018002,
                                    y: -0.41017647443329897,
                                    z: 21.893415091936756
                                  },
                                  {
                                    x: 6.463973025237462,
                                    y: 0.6039687750856675,
                                    z: 21.99097006965636
                                  },
                                  {
                                    x: 6.543205280260814,
                                    y: 1.6011384175260814,
                                    z: 22.092646517580242
                                  },
                                  {
                                    x: 6.699193597717793,
                                    y: 2.6266826031765387,
                                    z: 22.109137061411484
                                  },
                                  {
                                    x: 6.852726657280547,
                                    y: 3.6131731458169734,
                                    z: 22.12451729779733
                                  },
                                  {
                                    x: 6.907211187546122,
                                    y: 4.579844537793038,
                                    z: 22.320723556464614
                                  },
                                  {
                                    x: 7.17107944336603,
                                    y: 5.69200829769516,
                                    z: 22.089062235201137
                                  },
                                  {
                                    x: 7.433629990116937,
                                    y: 6.061230604796292,
                                    z: 21.81573996922862
                                  },
                                  {
                                    x: 7.098438456097883,
                                    y: 6.929084217330976,
                                    z: 21.372198544527354
                                  },
                                  {
                                    x: 6.806747316304092,
                                    y: 7.765527558205341,
                                    z: 20.91438954190689
                                  },
                                  {
                                    x: 6.743407759131246,
                                    y: 8.108623255414875,
                                    z: 20.640485725629727
                                  },
                                  {
                                    x: 6.870656476086138,
                                    y: 9.162756310932267,
                                    z: 20.330218616594422
                                  },
                                  {
                                    x: 7.010826170655085,
                                    y: 10.108360483938016,
                                    z: 20.262365179111857
                                  },
                                  {
                                    x: 7.175594565774106,
                                    y: 11.103077853334595,
                                    z: 20.26299888487555
                                  },
                                  {
                                    x: 7.275661192740625,
                                    y: 12.083519414331564,
                                    z: 20.417743773385627
                                  },
                                  {
                                    x: 7.235379688460521,
                                    y: 13.066395319150605,
                                    z: 20.65274566425863
                                  },
                                  {
                                    x: 7.257533242349595,
                                    y: 14.111109674363584,
                                    z: 20.740039720448298
                                  },
                                  {
                                    x: 7.331826988397606,
                                    y: 15.119159255897126,
                                    z: 20.78318027420329
                                  },
                                  {
                                    x: 7.3969215573981515,
                                    y: 16.121055717655626,
                                    z: 20.82413461832178
                                  },
                                  {
                                    x: 7.588881218119861,
                                    y: 17.162759307872214,
                                    z: 20.746096904797415
                                  },
                                  {
                                    x: 7.600200875087843,
                                    y: 18.11782675526522,
                                    z: 20.822399873143183
                                  },
                                  {
                                    x: 7.617845812789293,
                                    y: 19.171995534771334,
                                    z: 20.684177522654483
                                  },
                                  {
                                    x: 7.6773135114409525,
                                    y: 20.123208430410195,
                                    z: 20.884084265021556
                                  },
                                  {
                                    x: 7.68254310479438,
                                    y: 21.09903131677685,
                                    z: 21.083417156852494
                                  },
                                  {
                                    x: 7.703394779821462,
                                    y: 22.0698869618026,
                                    z: 21.22527750478579
                                  },
                                  {
                                    x: 7.770430069636399,
                                    y: 22.188405819224084,
                                    z: 21.16451622674183
                                  },
                                  {
                                    x: 7.3939261762205994,
                                    y: 23.115817945583753,
                                    z: 21.056621475777515
                                  },
                                  {
                                    x: 7.20145422933162,
                                    y: 24.031928332860993,
                                    z: 20.733946605384862
                                  },
                                  {
                                    x: 6.91206229570585,
                                    y: 24.87713051315169,
                                    z: 20.466274017172754
                                  },
                                  {
                                    x: 6.7024798561089005,
                                    y: 25.78091135966019,
                                    z: 20.073491671742023
                                  },
                                  {
                                    x: 6.55946814320866,
                                    y: 26.79593185178397,
                                    z: 19.752042611392444
                                  },
                                  {
                                    x: 6.508063267298272,
                                    y: 27.743974328429356,
                                    z: 19.193032836949428
                                  },
                                  {
                                    x: 6.550150016148189,
                                    y: 28.316864431874023,
                                    z: 18.88004582737636
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 7.19856,
                                    y: 10.390012,
                                    z: 20.152382
                                  },
                                  {
                                    fixed: false,
                                    x: 6.683961,
                                    y: 28.514123,
                                    z: 18.767884
                                  }
                                ]
                              },
                              {
                                name: "Epiphany",
                                routeId: "epiphany",
                                mainImageLocation: require("@/static/photos/epiphany-route.webp"),
                                style: "trad",
                                description:
                                  "Face climb following a crack system.",
                                protection: "Standard Rack",
                                grade: 11,
                                gradeModifier: "d",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb to the right of the chimney looking for a single bolt. Get to the bolt then head up a groove to optional anchors.",
                                    grade: 11,
                                    gradeModifier: "a"
                                  },
                                  {
                                    description:
                                      "Move right onto the face following cracks leading to the anchors of Arms Bazaar.",
                                    grade: 11,
                                    gradeModifier: "d"
                                  }
                                ],
                                center: {
                                  x: 8.433873,
                                  y: 14.805748,
                                  z: 22.949365
                                },
                                points: [
                                  {
                                    x: 6.138684442808707,
                                    y: -2.4703937270224725,
                                    z: 21.885588533771777
                                  },
                                  {
                                    x: 6.331833527167553,
                                    y: -1.5294496208147976,
                                    z: 21.827694765201223
                                  },
                                  {
                                    x: 6.434270237248282,
                                    y: -0.5226838588972271,
                                    z: 21.926593708217187
                                  },
                                  {
                                    x: 6.550839564113098,
                                    y: 0.4783382701246379,
                                    z: 22.024014126179548
                                  },
                                  {
                                    x: 6.630896378041573,
                                    y: 1.4601371106024539,
                                    z: 22.128201292642807
                                  },
                                  {
                                    x: 6.77434046652615,
                                    y: 2.4868511868022756,
                                    z: 22.167469999835635
                                  },
                                  {
                                    x: 6.925925097569573,
                                    y: 3.4728784592705653,
                                    z: 22.181671383135328
                                  },
                                  {
                                    x: 6.9989021449480235,
                                    y: 4.412062256617847,
                                    z: 22.34972982669771
                                  },
                                  {
                                    x: 7.190946623539873,
                                    y: 5.552026441830906,
                                    z: 22.251845508726237
                                  },
                                  {
                                    x: 7.473066416892309,
                                    y: 6.010076438700315,
                                    z: 21.939547818353482
                                  },
                                  {
                                    x: 7.177197357688664,
                                    y: 6.897624734903717,
                                    z: 21.438697818924812
                                  },
                                  {
                                    x: 6.900133868463902,
                                    y: 7.729251492344961,
                                    z: 20.992937989510015
                                  },
                                  {
                                    x: 6.860308842092598,
                                    y: 8.010922006987226,
                                    z: 20.754155340088698
                                  },
                                  {
                                    x: 6.998838183633671,
                                    y: 8.999190298481611,
                                    z: 20.641603965052518
                                  },
                                  {
                                    x: 7.224535084646571,
                                    y: 9.905303689118476,
                                    z: 20.530405155321198
                                  },
                                  {
                                    x: 7.383562103246416,
                                    y: 10.436546944216579,
                                    z: 20.43897837884642
                                  },
                                  {
                                    x: 7.524851293524293,
                                    y: 11.20002714857441,
                                    z: 20.853674989314474
                                  },
                                  {
                                    x: 7.743179819197966,
                                    y: 12.024618742502874,
                                    z: 21.372814489125904
                                  },
                                  {
                                    x: 7.871324463005874,
                                    y: 12.87670279710192,
                                    z: 21.933261968569003
                                  },
                                  {
                                    x: 8.043478966508212,
                                    y: 13.71200812731517,
                                    z: 22.477111557341026
                                  },
                                  {
                                    x: 8.2155183676947,
                                    y: 14.546754973283239,
                                    z: 23.02059752886305
                                  },
                                  {
                                    x: 8.432774680137262,
                                    y: 15.316121652645247,
                                    z: 23.58940341230319
                                  },
                                  {
                                    x: 8.2864917414738,
                                    y: 16.28290285343857,
                                    z: 23.881703367179753
                                  },
                                  {
                                    x: 8.421473051139436,
                                    y: 17.305220625560885,
                                    z: 24.13334305428853
                                  },
                                  {
                                    x: 8.639823697852767,
                                    y: 18.23717841044523,
                                    z: 24.209437443783752
                                  },
                                  {
                                    x: 8.615531953636705,
                                    y: 19.173378041995413,
                                    z: 24.504103362476723
                                  },
                                  {
                                    x: 8.564338773069114,
                                    y: 20.170873720850462,
                                    z: 24.81101851067957
                                  },
                                  {
                                    x: 8.890711227628813,
                                    y: 21.19735600653308,
                                    z: 24.97060890604613
                                  },
                                  {
                                    x: 9.190081830495036,
                                    y: 21.81544635755823,
                                    z: 24.956824003695214
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 7.205663,
                                    y: 10.394152,
                                    z: 20.160448
                                  },
                                  {
                                    fixed: true,
                                    x: 9.66757,
                                    y: 22.090826,
                                    z: 24.631501
                                  }
                                ]
                              },
                              {
                                name: "Arms Bazaar",
                                routeId: "arms-bazaar",
                                mainImageLocation: require("@/static/photos/arms-bazaar-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Standard Rack",
                                grade: 12,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Begin below the overhang. Climb to a finger crack that will take you to the anchors.",
                                    grade: 12,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: 9.262076,
                                  y: 10.070878,
                                  z: 24.876691
                                },
                                points: [
                                  {
                                    x: 8.126039192105106,
                                    y: -1.9225376081174153,
                                    z: 22.973404729646436
                                  },
                                  {
                                    x: 8.684002513007906,
                                    y: -1.3729256953998092,
                                    z: 22.336276410812317
                                  },
                                  {
                                    x: 8.687311801885972,
                                    y: -0.7732387468283792,
                                    z: 22.485724962499646
                                  },
                                  {
                                    x: 8.44595174401257,
                                    y: 0.16379457990298302,
                                    z: 22.774440861935886
                                  },
                                  {
                                    x: 8.36638236920277,
                                    y: 1.0665469538504226,
                                    z: 22.77409563905174
                                  },
                                  {
                                    x: 8.146693731748345,
                                    y: 1.8943906370777783,
                                    z: 22.88184128531725
                                  },
                                  {
                                    x: 8.850510881227656,
                                    y: 2.4974925045336476,
                                    z: 23.18168919034533
                                  },
                                  {
                                    x: 9.482523410160015,
                                    y: 3.2661023986527624,
                                    z: 23.41890497441971
                                  },
                                  {
                                    x: 10.02903759889226,
                                    y: 3.9133243854755695,
                                    z: 23.509440839255653
                                  },
                                  {
                                    x: 9.527869460807484,
                                    y: 4.985758303705122,
                                    z: 24.03904498291805
                                  },
                                  {
                                    x: 9.256050163248922,
                                    y: 6.140714121616854,
                                    z: 24.46926056018705
                                  },
                                  {
                                    x: 9.148209787962005,
                                    y: 7.129992814897818,
                                    z: 24.726155012500914
                                  },
                                  {
                                    x: 9.153171029972107,
                                    y: 8.100619913320061,
                                    z: 24.902031238261415
                                  },
                                  {
                                    x: 9.254684579443673,
                                    y: 8.969286198664316,
                                    z: 25.008601109702344
                                  },
                                  {
                                    x: 9.362862793711527,
                                    y: 9.871040866907933,
                                    z: 25.13011565186077
                                  },
                                  {
                                    x: 9.432786420935505,
                                    y: 10.75978062247589,
                                    z: 25.33419228039176
                                  },
                                  {
                                    x: 9.37672217895713,
                                    y: 11.731278525851543,
                                    z: 25.56104922756777
                                  },
                                  {
                                    x: 9.379103712892677,
                                    y: 12.707763102964641,
                                    z: 25.715685696280925
                                  },
                                  {
                                    x: 9.435096738839338,
                                    y: 13.66814522338029,
                                    z: 25.950541914656043
                                  },
                                  {
                                    x: 9.54072825310983,
                                    y: 14.49848208142736,
                                    z: 25.91580837283894
                                  },
                                  {
                                    x: 9.264568904628913,
                                    y: 15.436244121005778,
                                    z: 25.75424957591081
                                  },
                                  {
                                    x: 8.954989056602404,
                                    y: 16.405514200427234,
                                    z: 25.48837276462482
                                  },
                                  {
                                    x: 8.953708563721714,
                                    y: 17.144522672464444,
                                    z: 25.040212045837567
                                  },
                                  {
                                    x: 8.909332434050889,
                                    y: 18.124693745056227,
                                    z: 25.14650763996816
                                  },
                                  {
                                    x: 8.852390390334179,
                                    y: 19.16879267921586,
                                    z: 25.372270404530823
                                  },
                                  {
                                    x: 8.873064237126785,
                                    y: 20.279863999041932,
                                    z: 25.428028675678185
                                  },
                                  {
                                    x: 9.136937864802306,
                                    y: 21.201375819071725,
                                    z: 25.332890180985604
                                  },
                                  {
                                    x: 9.47770034526082,
                                    y: 21.7205357066854,
                                    z: 25.150064766341877
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: true,
                                    x: 9.66757,
                                    y: 22.090826,
                                    z: 24.631501
                                  }
                                ]
                              },
                              {
                                name: "Three Minute Hero",
                                routeId: "three-minute-hero",
                                mainImageLocation: require("@/static/photos/three-minute-hero-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Gear to 2 in.",
                                grade: 11,
                                gradeModifier: "b/c",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "To the right of Arms Bazaar is another crack that leads to the anchors.",
                                    grade: 11,
                                    gradeModifier: "b/c"
                                  }
                                ],
                                center: {
                                  x: 11.65357,
                                  y: 10.805831,
                                  z: 26.471935
                                },
                                points: [
                                  {
                                    x: 11.54728583245453,
                                    y: 1.9603193162237402,
                                    z: 24.912428284136645
                                  },
                                  {
                                    x: 11.338027654056454,
                                    y: 2.8436157850133017,
                                    z: 25.245295956637804
                                  },
                                  {
                                    x: 11.25449988698371,
                                    y: 3.881591873399906,
                                    z: 25.627853770949493
                                  },
                                  {
                                    x: 11.169390543489284,
                                    y: 4.791630376666251,
                                    z: 25.811970546341712
                                  },
                                  {
                                    x: 11.216422149461652,
                                    y: 5.777014414887629,
                                    z: 25.983620152375938
                                  },
                                  {
                                    x: 11.20828422865472,
                                    y: 6.696223223741728,
                                    z: 26.39510389627662
                                  },
                                  {
                                    x: 11.281122701854173,
                                    y: 7.67870763892882,
                                    z: 26.825419937982627
                                  },
                                  {
                                    x: 11.485328961658766,
                                    y: 8.713205067699423,
                                    z: 26.978258860619576
                                  },
                                  {
                                    x: 11.828697323169118,
                                    y: 9.396471242160736,
                                    z: 26.92965838434872
                                  },
                                  {
                                    x: 11.59972608356344,
                                    y: 10.280916533724344,
                                    z: 26.610026387954544
                                  },
                                  {
                                    x: 11.425334646598333,
                                    y: 11.141699164749246,
                                    z: 26.476981773554773
                                  },
                                  {
                                    x: 11.310524338989733,
                                    y: 12.122675583604634,
                                    z: 26.644135626673513
                                  },
                                  {
                                    x: 11.307108580008553,
                                    y: 13.119950190353864,
                                    z: 26.70088418841956
                                  },
                                  {
                                    x: 11.393557951688619,
                                    y: 13.406297468734374,
                                    z: 26.66017601071101
                                  },
                                  {
                                    x: 11.627565293886047,
                                    y: 14.361979428761513,
                                    z: 26.926015630767477
                                  },
                                  {
                                    x: 12.126292697968912,
                                    y: 15.31382062167195,
                                    z: 27.013397750877388
                                  },
                                  {
                                    x: 12.304871733051026,
                                    y: 15.60009422433378,
                                    z: 26.827451276315553
                                  },
                                  {
                                    x: 12.057874862691857,
                                    y: 16.538320466399817,
                                    z: 26.997555548226405
                                  },
                                  {
                                    x: 11.798134884711631,
                                    y: 17.52044245010743,
                                    z: 27.077668562711306
                                  },
                                  {
                                    x: 11.767667862069922,
                                    y: 18.620745637195785,
                                    z: 26.745088065144433
                                  },
                                  {
                                    x: 11.776499600542467,
                                    y: 18.82865956021373,
                                    z: 26.675683219275324
                                  },
                                  {
                                    x: 11.544421807621035,
                                    y: 19.804369958040976,
                                    z: 26.521143178728988
                                  },
                                  {
                                    x: 11.271354342935068,
                                    y: 20.728670860686677,
                                    z: 26.222236272195037
                                  },
                                  {
                                    x: 11.080035839594492,
                                    y: 21.123656608541264,
                                    z: 25.984617828917845
                                  },
                                  {
                                    x: 10.32799080998301,
                                    y: 21.63678612988317,
                                    z: 25.474915094188894
                                  },
                                  {
                                    x: 9.638940911152819,
                                    y: 21.79533244562776,
                                    z: 25.082267301091736
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: true,
                                    x: 9.66757,
                                    y: 22.090826,
                                    z: 24.631501
                                  }
                                ]
                              },
                              {
                                name: "Joe Pontiac",
                                routeId: "joe-pontiac",
                                mainImageLocation: require("@/static/photos/joe-pontiac-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Standard Rack",
                                grade: 7,
                                gradeModifier: "",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the boulders to the right of the arete then follow the arete to the anchors of Arms Bazaar.",
                                    grade: 7,
                                    gradeModifier: ""
                                  }
                                ],
                                center: {
                                  x: 14.499585,
                                  y: 12.248332,
                                  z: 27.769638
                                },
                                points: [
                                  {
                                    x: 12.620641035976725,
                                    y: 3.7944221417711494,
                                    z: 26.772829960828837
                                  },
                                  {
                                    x: 12.443771646020952,
                                    y: 4.646620776620386,
                                    z: 27.112956512209475
                                  },
                                  {
                                    x: 12.348742726578248,
                                    y: 5.710183037174878,
                                    z: 27.347658848748374
                                  },
                                  {
                                    x: 12.385738581823043,
                                    y: 6.514833274423376,
                                    z: 27.79321799929763
                                  },
                                  {
                                    x: 12.342650190599818,
                                    y: 7.393479683102811,
                                    z: 27.887313200475162
                                  },
                                  {
                                    x: 12.775433015659008,
                                    y: 8.30832143646214,
                                    z: 27.98926645368432
                                  },
                                  {
                                    x: 13.213580264991714,
                                    y: 9.201721040997956,
                                    z: 27.915600225209968
                                  },
                                  {
                                    x: 13.612772932919913,
                                    y: 10.069162351491777,
                                    z: 27.894366435172003
                                  },
                                  {
                                    x: 13.899906526272586,
                                    y: 11.028939590943159,
                                    z: 28.073049153778026
                                  },
                                  {
                                    x: 14.432197586203094,
                                    y: 11.999060197066068,
                                    z: 27.997065958994188
                                  },
                                  {
                                    x: 14.64239479579429,
                                    y: 12.460899846591413,
                                    z: 27.818345312812585
                                  },
                                  {
                                    x: 14.971247304851747,
                                    y: 13.271790498883995,
                                    z: 27.500333471022685
                                  },
                                  {
                                    x: 14.907726612246485,
                                    y: 14.300985786954492,
                                    z: 27.48150227252667
                                  },
                                  {
                                    x: 14.68589181371853,
                                    y: 15.238696004931914,
                                    z: 27.015830119398537
                                  },
                                  {
                                    x: 14.472529788500418,
                                    y: 16.047433317579568,
                                    z: 26.707066215745876
                                  },
                                  {
                                    x: 14.616118652821244,
                                    y: 17.199922984233556,
                                    z: 26.80322018856604
                                  },
                                  {
                                    x: 14.452657676118868,
                                    y: 18.176751941881474,
                                    z: 26.605706509293256
                                  },
                                  {
                                    x: 14.28690253447751,
                                    y: 19.132135019114468,
                                    z: 26.23075825052163
                                  },
                                  {
                                    x: 14.193551555820317,
                                    y: 19.084939547208823,
                                    z: 26.199177450433204
                                  },
                                  {
                                    x: 13.253315917855412,
                                    y: 19.65225366984214,
                                    z: 25.891503719418328
                                  },
                                  {
                                    x: 12.64220895384326,
                                    y: 20.189884867302535,
                                    z: 25.6870332643835
                                  },
                                  {
                                    x: 11.954427082507415,
                                    y: 20.83077587100174,
                                    z: 25.908362945548998
                                  },
                                  {
                                    x: 11.250914373020912,
                                    y: 21.374279906503943,
                                    z: 25.885120174985396
                                  },
                                  {
                                    x: 10.134062204712398,
                                    y: 21.887914586401656,
                                    z: 25.16155645484023
                                  },
                                  {
                                    x: 9.748425468414839,
                                    y: 21.990279449247133,
                                    z: 24.885975922042338
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: true,
                                    x: 9.66757,
                                    y: 22.090826,
                                    z: 24.631501
                                  }
                                ]
                              },
                              {
                                name: "Malaise",
                                routeId: "malaise",
                                mainImageLocation: require("@/static/photos/malaise-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Standard Rack",
                                grade: 10,
                                gradeModifier: "c",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the boulders to the right of the arete then follow the arete to the anchors of Arms Bazaar.",
                                    grade: 10,
                                    gradeModifier: "c"
                                  }
                                ],
                                center: {
                                  x: 17.191619,
                                  y: 14.023336,
                                  z: 26.775248
                                },
                                points: [
                                  {
                                    x: 17.13296256182035,
                                    y: 5.872478862030685,
                                    z: 26.459950696857632
                                  },
                                  {
                                    x: 17.209292998980988,
                                    y: 6.726157210992246,
                                    z: 26.57862107613718
                                  },
                                  {
                                    x: 17.341965915583554,
                                    y: 7.837644387075877,
                                    z: 26.691382075358145
                                  },
                                  {
                                    x: 17.42688466712027,
                                    y: 8.904381784119916,
                                    z: 27.04683190926328
                                  },
                                  {
                                    x: 17.492095818582285,
                                    y: 9.92788797858774,
                                    z: 27.155397915773005
                                  },
                                  {
                                    x: 17.560828867754655,
                                    y: 10.927589656758126,
                                    z: 27.319105395205415
                                  },
                                  {
                                    x: 17.608186055485632,
                                    y: 11.988470674219258,
                                    z: 27.45991344694486
                                  },
                                  {
                                    x: 17.599300868094097,
                                    y: 12.929902924405527,
                                    z: 27.41610599617256
                                  },
                                  {
                                    x: 17.5377611363779,
                                    y: 13.58459599743543,
                                    z: 27.09770417339707
                                  },
                                  {
                                    x: 17.17784520607542,
                                    y: 14.503214748490516,
                                    z: 26.764101354496933
                                  },
                                  {
                                    x: 16.88080580843706,
                                    y: 15.322492734622456,
                                    z: 26.49636410737879
                                  },
                                  {
                                    x: 16.670635486496966,
                                    y: 16.408828841978764,
                                    z: 26.56476533558004
                                  },
                                  {
                                    x: 16.4647891849298,
                                    y: 17.308701159987223,
                                    z: 26.225031660074574
                                  },
                                  {
                                    x: 16.616503409001094,
                                    y: 18.2031346503337,
                                    z: 25.674269910221568
                                  },
                                  {
                                    x: 16.779640471693742,
                                    y: 19.087949976562694,
                                    z: 24.99733052291791
                                  },
                                  {
                                    x: 16.681904127844025,
                                    y: 19.90955615800142,
                                    z: 24.6407577261561
                                  },
                                  {
                                    x: 16.95115080787578,
                                    y: 20.879318035659143,
                                    z: 24.632207235761644
                                  },
                                  {
                                    x: 17.183369806146718,
                                    y: 21.84893616064438,
                                    z: 24.044470486966432
                                  },
                                  {
                                    x: 17.26746941096648,
                                    y: 22.70039384510517,
                                    z: 23.532937257052463
                                  },
                                  {
                                    x: 17.547125569515785,
                                    y: 23.582247130212878,
                                    z: 23.214422729884937
                                  },
                                  {
                                    x: 17.444553416937126,
                                    y: 23.551505978849736,
                                    z: 23.181418359404514
                                  },
                                  {
                                    x: 17.096029361168316,
                                    y: 24.466435653043572,
                                    z: 23.040143280923754
                                  },
                                  {
                                    x: 16.63901987618107,
                                    y: 25.187077811539734,
                                    z: 22.77009086030776
                                  },
                                  {
                                    x: 16.318357072091835,
                                    y: 26.008109377889664,
                                    z: 22.59581190242305
                                  },
                                  {
                                    x: 15.6484808997317,
                                    y: 26.77494600745493,
                                    z: 22.05624612320578
                                  },
                                  {
                                    x: 15.052839104645086,
                                    y: 27.472781727865115,
                                    z: 21.667180037762034
                                  },
                                  {
                                    x: 14.188614442799087,
                                    y: 28.176654612349704,
                                    z: 21.155442527504977
                                  },
                                  {
                                    x: 13.478747790671857,
                                    y: 28.828671324831106,
                                    z: 20.661419311205897
                                  },
                                  {
                                    x: 13.349284494975347,
                                    y: 28.866271460408942,
                                    z: 20.526188955884436
                                  },
                                  {
                                    x: 13.608897584221687,
                                    y: 29.86831663778034,
                                    z: 20.80147798237107
                                  },
                                  {
                                    x: 13.785919464516608,
                                    y: 31.012688629689094,
                                    z: 21.370092665267638
                                  },
                                  {
                                    x: 13.408233712518806,
                                    y: 31.930563381356222,
                                    z: 21.31325741398043
                                  },
                                  {
                                    x: 12.98023565846773,
                                    y: 32.88562600671091,
                                    z: 21.210767944535178
                                  },
                                  {
                                    x: 12.725303762141944,
                                    y: 33.80870089779974,
                                    z: 21.16730585951824
                                  },
                                  {
                                    x: 12.468033521893021,
                                    y: 34.38242452462723,
                                    z: 21.213646427159496
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 12.322763,
                                    y: 34.438926,
                                    z: 21.164374
                                  }
                                ]
                              },
                              {
                                name: "Daedalus Direct",
                                routeId: "daedalus-direct",
                                mainImageLocation: require("@/static/photos/daedalus-direct-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Standard Rack, 2 bolts",
                                grade: 11,
                                gradeModifier: "d",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Stay left after the roof and follow 2 bolts to the finish.",
                                    grade: 11,
                                    gradeModifier: "d"
                                  }
                                ],
                                center: {
                                  x: 21.507874,
                                  y: 21.699059,
                                  z: 22.501553
                                },
                                points: [
                                  {
                                    x: 21.819751676844678,
                                    y: 7.221743272931043,
                                    z: 23.127890941679247
                                  },
                                  {
                                    x: 21.853319737760913,
                                    y: 8.21274972749209,
                                    z: 23.14664452640598
                                  },
                                  {
                                    x: 21.758701189347267,
                                    y: 9.097831696452015,
                                    z: 23.056263097639338
                                  },
                                  {
                                    x: 21.655836484992008,
                                    y: 10.137667646550787,
                                    z: 23.008757020443596
                                  },
                                  {
                                    x: 21.694536933707642,
                                    y: 11.096010915058567,
                                    z: 22.851491466180697
                                  },
                                  {
                                    x: 21.624263562005115,
                                    y: 12.113377916202662,
                                    z: 23.05006275649191
                                  },
                                  {
                                    x: 21.533956127534086,
                                    y: 13.207398163041233,
                                    z: 23.14060976273515
                                  },
                                  {
                                    x: 21.45388212544085,
                                    y: 14.16003488516559,
                                    z: 23.119096589931857
                                  },
                                  {
                                    x: 21.33982079730507,
                                    y: 15.207180681254517,
                                    z: 23.481885265404078
                                  },
                                  {
                                    x: 21.241568787609367,
                                    y: 16.17647727942288,
                                    z: 23.079401661727516
                                  },
                                  {
                                    x: 21.17241725371423,
                                    y: 17.180462094251066,
                                    z: 23.098430896440203
                                  },
                                  {
                                    x: 21.146751321624176,
                                    y: 18.24400027678922,
                                    z: 23.125691743762918
                                  },
                                  {
                                    x: 21.127126082178705,
                                    y: 18.51588998023313,
                                    z: 22.954131073914347
                                  },
                                  {
                                    x: 21.279296832341835,
                                    y: 19.499479772645593,
                                    z: 22.994877110711506
                                  },
                                  {
                                    x: 21.37299544701645,
                                    y: 20.486970269103495,
                                    z: 22.95962808396248
                                  },
                                  {
                                    x: 21.57272185072995,
                                    y: 21.493777475627407,
                                    z: 22.740052614742442
                                  },
                                  {
                                    x: 21.74080262450536,
                                    y: 22.467272114772854,
                                    z: 22.455979844754513
                                  },
                                  {
                                    x: 21.74695530074487,
                                    y: 23.147963752959072,
                                    z: 22.19499533522213
                                  },
                                  {
                                    x: 21.714434149187312,
                                    y: 24.10743001148317,
                                    z: 21.941898531152873
                                  },
                                  {
                                    x: 21.61609068134135,
                                    y: 24.993389051744877,
                                    z: 21.56670202706718
                                  },
                                  {
                                    x: 21.502924923132582,
                                    y: 25.9066995683421,
                                    z: 21.192898503345436
                                  },
                                  {
                                    x: 21.28967343763731,
                                    y: 26.76665036698338,
                                    z: 20.58179375515909
                                  },
                                  {
                                    x: 21.127979506751846,
                                    y: 27.577522102079904,
                                    z: 19.843124583592587
                                  },
                                  {
                                    x: 21.03517804991515,
                                    y: 27.69031231648713,
                                    z: 19.672076331083908
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 21.118407,
                                    y: 27.553317,
                                    z: 19.583634
                                  }
                                ]
                              },
                              {
                                name: "Daedalus",
                                routeId: "daedalus",
                                mainImageLocation: require("@/static/photos/daedalus-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Standard Rack, 2 bolts",
                                grade: 10,
                                gradeModifier: "c",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Stay left after the roof and follow 2 bolts to the finish.",
                                    grade: 10,
                                    gradeModifier: "c"
                                  }
                                ],
                                center: {
                                  x: 23.101358,
                                  y: 20.110896,
                                  z: 22.066751
                                },
                                points: [
                                  {
                                    x: 22.156984062509206,
                                    y: 7.164163146618904,
                                    z: 23.065868452673218
                                  },
                                  {
                                    x: 22.201965618979703,
                                    y: 8.057969074637526,
                                    z: 23.03958139491394
                                  },
                                  {
                                    x: 22.181658172475483,
                                    y: 9.02453047439671,
                                    z: 23.031064852669715
                                  },
                                  {
                                    x: 22.07493175319488,
                                    y: 10.082453366473295,
                                    z: 23.036153495271645
                                  },
                                  {
                                    x: 22.069935637623345,
                                    y: 10.98942379523723,
                                    z: 22.8774136749131
                                  },
                                  {
                                    x: 22.05273302171342,
                                    y: 11.956393480874125,
                                    z: 22.905512890668735
                                  },
                                  {
                                    x: 21.75453306285898,
                                    y: 13.061712401712727,
                                    z: 23.06161268712132
                                  },
                                  {
                                    x: 21.666532157762415,
                                    y: 14.11950386045132,
                                    z: 23.1331064475795
                                  },
                                  {
                                    x: 21.762171748109267,
                                    y: 15.106060060612736,
                                    z: 23.175455805569086
                                  },
                                  {
                                    x: 21.607146437706973,
                                    y: 16.129787026943635,
                                    z: 23.187759925627105
                                  },
                                  {
                                    x: 21.545808717642675,
                                    y: 17.13309985584015,
                                    z: 23.203774459393554
                                  },
                                  {
                                    x: 21.553436501384105,
                                    y: 18.175717533617398,
                                    z: 23.158938998448367
                                  },
                                  {
                                    x: 21.53001233782143,
                                    y: 18.298833328231613,
                                    z: 23.024243352412114
                                  },
                                  {
                                    x: 22.17610614666948,
                                    y: 19.016655818911723,
                                    z: 22.944128727090387
                                  },
                                  {
                                    x: 22.815409259105813,
                                    y: 19.651890110362842,
                                    z: 22.52892580275508
                                  },
                                  {
                                    x: 23.52323843374121,
                                    y: 20.256371166072594,
                                    z: 22.007339922908685
                                  },
                                  {
                                    x: 24.267508770911075,
                                    y: 20.823459262347672,
                                    z: 21.341662065034463
                                  },
                                  {
                                    x: 24.28791160160829,
                                    y: 20.953329138317486,
                                    z: 21.162859570523867
                                  },
                                  {
                                    x: 24.204753289977724,
                                    y: 21.946370753219256,
                                    z: 21.092888400637644
                                  },
                                  {
                                    x: 24.01640530654856,
                                    y: 22.92484384843966,
                                    z: 20.970484389419003
                                  },
                                  {
                                    x: 23.853795019496772,
                                    y: 23.915341133398915,
                                    z: 20.731155879993562
                                  },
                                  {
                                    x: 23.619235000928644,
                                    y: 24.870133465832236,
                                    z: 20.458463259993753
                                  },
                                  {
                                    x: 23.36270425063624,
                                    y: 25.470403656431493,
                                    z: 20.160569302745184
                                  },
                                  {
                                    x: 23.241859310035565,
                                    y: 26.34014856026377,
                                    z: 19.842579166511168
                                  },
                                  {
                                    x: 22.72676020818253,
                                    y: 26.898036149788663,
                                    z: 18.902147223959222
                                  },
                                  {
                                    x: 22.62051182516085,
                                    y: 26.87157657597708,
                                    z: 18.896998782164584
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 22.584836,
                                    y: 26.75434,
                                    z: 18.835679
                                  }
                                ]
                              },
                              {
                                name: "Wrinkles",
                                routeId: "wrinkles",
                                mainImageLocation: require("@/static/photos/wrinkles-route.webp"),
                                style: "trad",
                                description:
                                  "This three pitch route covers the entirety of Bell Buttress. Beginning at the creek and continuing to the top of the buttress.",
                                protection: "Standard Rack",
                                grade: 9,
                                gradeModifier: "",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Begin at the creek right of The Patio area. Climb the right of two cracks leading to a ramp to the second tier.",
                                    grade: 8,
                                    gradeModifier: ""
                                  },
                                  {
                                    description:
                                      "Climb a right-arching flake to cracks right of Daedelus.",
                                    grade: 9,
                                    gradeModifier: ""
                                  },
                                  {
                                    description:
                                      "Climb a crack system to the top.",
                                    grade: 6,
                                    gradeModifier: ""
                                  }
                                ],
                                center: {
                                  x: 25.408927,
                                  y: 16.355405,
                                  z: 21.316367
                                },
                                points: [
                                  {
                                    x: 30.927384853576886,
                                    y: -26.044250599474733,
                                    z: 38.97571245340642
                                  },
                                  {
                                    x: 31.0671965405821,
                                    y: -25.037564470937706,
                                    z: 38.7357556681838
                                  },
                                  {
                                    x: 31.106348220200154,
                                    y: -24.086517534552733,
                                    z: 38.756231426190844
                                  },
                                  {
                                    x: 31.168140410529944,
                                    y: -23.045381941195032,
                                    z: 38.65256800448524
                                  },
                                  {
                                    x: 31.204798464371567,
                                    y: -22.0008042333226,
                                    z: 38.305905712845146
                                  },
                                  {
                                    x: 31.2734779157783,
                                    y: -21.085321134020006,
                                    z: 38.0273640893057
                                  },
                                  {
                                    x: 31.313491261324405,
                                    y: -20.15884755026642,
                                    z: 38.08905508534736
                                  },
                                  {
                                    x: 31.32689711060692,
                                    y: -19.162913435929365,
                                    z: 38.35491339709954
                                  },
                                  {
                                    x: 31.44817220097272,
                                    y: -18.071535286279893,
                                    z: 38.14298866152721
                                  },
                                  {
                                    x: 31.36845298942204,
                                    y: -17.562621971976064,
                                    z: 37.85447253464417
                                  },
                                  {
                                    x: 31.082578859173548,
                                    y: -16.55703674916463,
                                    z: 37.61564549003444
                                  },
                                  {
                                    x: 30.692151005544083,
                                    y: -15.603217718743634,
                                    z: 37.131389345437846
                                  },
                                  {
                                    x: 30.39103810789114,
                                    y: -14.70648574321719,
                                    z: 36.83998589785515
                                  },
                                  {
                                    x: 30.080771704729102,
                                    y: -13.775043099313953,
                                    z: 36.67462276911482
                                  },
                                  {
                                    x: 29.820045954580504,
                                    y: -12.82526615320975,
                                    z: 36.52308891377015
                                  },
                                  {
                                    x: 29.610745770171874,
                                    y: -11.908379784691462,
                                    z: 36.39288236287639
                                  },
                                  {
                                    x: 29.426414905079678,
                                    y: -10.971158460109034,
                                    z: 36.40582344082318
                                  },
                                  {
                                    x: 29.24305804164442,
                                    y: -10.47006189784965,
                                    z: 36.31070116477115
                                  },
                                  {
                                    x: 29.17818069372632,
                                    y: -9.578197334545871,
                                    z: 36.061576856321025
                                  },
                                  {
                                    x: 28.92089621315382,
                                    y: -8.763279999177852,
                                    z: 35.65811793472594
                                  },
                                  {
                                    x: 28.808130475292185,
                                    y: -8.015802272123567,
                                    z: 35.37841594588979
                                  },
                                  {
                                    x: 28.734652851523354,
                                    y: -7.180564885553748,
                                    z: 35.13345130577759
                                  },
                                  {
                                    x: 28.374769455038983,
                                    y: -6.2705716322094744,
                                    z: 33.96113557193476
                                  },
                                  {
                                    x: 28.178590802975798,
                                    y: -5.485106357943293,
                                    z: 33.05250798398269
                                  },
                                  {
                                    x: 27.964649286531614,
                                    y: -4.692784255104272,
                                    z: 32.20393743540411
                                  },
                                  {
                                    x: 27.735536717042027,
                                    y: -3.9624107094480054,
                                    z: 31.884309286086893
                                  },
                                  {
                                    x: 27.539840842750994,
                                    y: -3.090842473969234,
                                    z: 31.30604125620634
                                  },
                                  {
                                    x: 27.545407484652692,
                                    y: -3.157503959273046,
                                    z: 31.22986307093231
                                  },
                                  {
                                    x: 27.78818600462101,
                                    y: -2.279521703964055,
                                    z: 30.93713722351505
                                  },
                                  {
                                    x: 27.91596618885612,
                                    y: -1.5150304346894687,
                                    z: 30.766064831584846
                                  },
                                  {
                                    x: 28.0299180767582,
                                    y: -0.6241700455788995,
                                    z: 30.37492017175027
                                  },
                                  {
                                    x: 28.04852113662511,
                                    y: 0.32702622559994343,
                                    z: 29.422905590213603
                                  },
                                  {
                                    x: 28.05731666300078,
                                    y: 1.1471928916164948,
                                    z: 28.74839035724477
                                  },
                                  {
                                    x: 28.170851003709597,
                                    y: 2.0030636778900135,
                                    z: 28.03309894736361
                                  },
                                  {
                                    x: 28.23283819242891,
                                    y: 2.264930309349397,
                                    z: 27.788310126175777
                                  },
                                  {
                                    x: 28.070065084600955,
                                    y: 3.1222280661649853,
                                    z: 27.177427857986807
                                  },
                                  {
                                    x: 27.928295322580908,
                                    y: 3.8362135472837613,
                                    z: 26.506432981184595
                                  },
                                  {
                                    x: 27.88914111393317,
                                    y: 4.619198580778709,
                                    z: 26.103851858674574
                                  },
                                  {
                                    x: 27.79048135262738,
                                    y: 5.443146530230828,
                                    z: 25.531454777614652
                                  },
                                  {
                                    x: 27.538286467115462,
                                    y: 6.162061958887778,
                                    z: 24.607456040607847
                                  },
                                  {
                                    x: 27.488214291552126,
                                    y: 6.201086603208557,
                                    z: 24.36428874581353
                                  },
                                  {
                                    x: 26.950751533467848,
                                    y: 6.432773166859805,
                                    z: 23.118636722600165
                                  },
                                  {
                                    x: 26.566506232351205,
                                    y: 6.843127330393829,
                                    z: 22.332577067744065
                                  },
                                  {
                                    x: 26.582605556674714,
                                    y: 7.556929223312284,
                                    z: 21.971124930488138
                                  },
                                  {
                                    x: 26.57223827681338,
                                    y: 7.7643608429918345,
                                    z: 21.890587998700386
                                  },
                                  {
                                    x: 26.499684176554176,
                                    y: 8.801566774277351,
                                    z: 22.019222912153197
                                  },
                                  {
                                    x: 26.159869834910392,
                                    y: 9.732048737055543,
                                    z: 21.80943092531194
                                  },
                                  {
                                    x: 26.21792381442541,
                                    y: 10.643856658702958,
                                    z: 21.81871004171275
                                  },
                                  {
                                    x: 26.25205459590673,
                                    y: 10.828648453992992,
                                    z: 21.75328757643742
                                  },
                                  {
                                    x: 26.187577515697782,
                                    y: 11.899659044158973,
                                    z: 21.79232319624226
                                  },
                                  {
                                    x: 25.961499010072654,
                                    y: 12.74870906237033,
                                    z: 21.486464666406647
                                  },
                                  {
                                    x: 25.957717106657565,
                                    y: 13.781305113743832,
                                    z: 21.602853451118875
                                  },
                                  {
                                    x: 25.814891487322555,
                                    y: 14.813362242900606,
                                    z: 21.57119871697161
                                  },
                                  {
                                    x: 25.59508556930207,
                                    y: 15.784911626051866,
                                    z: 21.575065134943774
                                  },
                                  {
                                    x: 25.43249434600797,
                                    y: 16.768742029839014,
                                    z: 21.518746719117193
                                  },
                                  {
                                    x: 25.261419895821554,
                                    y: 17.75518719367627,
                                    z: 21.451879649976757
                                  },
                                  {
                                    x: 25.056789672788263,
                                    y: 18.70655756973203,
                                    z: 21.449038876508713
                                  },
                                  {
                                    x: 24.786225003906413,
                                    y: 19.729809788238896,
                                    z: 21.370840257670366
                                  },
                                  {
                                    x: 24.596621601263895,
                                    y: 20.433333359150488,
                                    z: 21.131823672873434
                                  },
                                  {
                                    x: 24.491634855740944,
                                    y: 21.409506790239767,
                                    z: 21.01252405101561
                                  },
                                  {
                                    x: 24.305992628900245,
                                    y: 22.39874210573886,
                                    z: 20.928160919667665
                                  },
                                  {
                                    x: 24.148480588272157,
                                    y: 23.41729917115718,
                                    z: 20.738121211655315
                                  },
                                  {
                                    x: 23.95148139316841,
                                    y: 24.322121145309733,
                                    z: 20.48206161993522
                                  },
                                  {
                                    x: 23.707565528071267,
                                    y: 25.241594686745284,
                                    z: 20.162096999570537
                                  },
                                  {
                                    x: 23.45485447901808,
                                    y: 26.15844468402795,
                                    z: 19.814242356115894
                                  },
                                  {
                                    x: 22.834830465512333,
                                    y: 26.51670750295921,
                                    z: 18.801744191693164
                                  },
                                  {
                                    x: 22.87785162082037,
                                    y: 27.253873398766373,
                                    z: 17.895921791711388
                                  },
                                  {
                                    x: 22.965526248283304,
                                    y: 27.760962647670276,
                                    z: 17.19226451498676
                                  },
                                  {
                                    x: 22.75284226514269,
                                    y: 28.33876457022569,
                                    z: 15.844258708479735
                                  },
                                  {
                                    x: 22.887529547284476,
                                    y: 29.020426712927,
                                    z: 15.389248557477094
                                  },
                                  {
                                    x: 23.03430850700586,
                                    y: 29.7416252097504,
                                    z: 15.031230243551061
                                  },
                                  {
                                    x: 23.078906260216318,
                                    y: 29.740611792161896,
                                    z: 14.924107557242747
                                  },
                                  {
                                    x: 23.086794726257263,
                                    y: 30.689505214101636,
                                    z: 14.714712554277474
                                  },
                                  {
                                    x: 23.023199294631937,
                                    y: 31.546513849295128,
                                    z: 14.34943603813769
                                  },
                                  {
                                    x: 23.39989319114673,
                                    y: 32.779978748594615,
                                    z: 14.229917817257354
                                  },
                                  {
                                    x: 23.403157743412017,
                                    y: 33.790213394466264,
                                    z: 14.003662354747815
                                  },
                                  {
                                    x: 23.460483622361714,
                                    y: 34.77176463787638,
                                    z: 13.700801171000315
                                  },
                                  {
                                    x: 23.482003292616575,
                                    y: 35.69671916696921,
                                    z: 13.373935890524258
                                  },
                                  {
                                    x: 23.528512999457895,
                                    y: 36.64133254589221,
                                    z: 13.054783004471519
                                  },
                                  {
                                    x: 23.57434295398286,
                                    y: 37.58343104011585,
                                    z: 12.734924640022351
                                  },
                                  {
                                    x: 23.653455367889173,
                                    y: 38.47786958272288,
                                    z: 12.303058425375092
                                  },
                                  {
                                    x: 23.650926996898118,
                                    y: 39.32500138663471,
                                    z: 11.889848752075157
                                  },
                                  {
                                    x: 23.642101360215445,
                                    y: 40.38526057910276,
                                    z: 11.633758330648005
                                  },
                                  {
                                    x: 23.548090437909845,
                                    y: 41.149582235158604,
                                    z: 11.044399148192037
                                  },
                                  {
                                    x: 23.562002462521423,
                                    y: 41.268665585573714,
                                    z: 10.814763315774572
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 26.35002,
                                    y: 6.69474,
                                    z: 22.132728
                                  },
                                  {
                                    fixed: false,
                                    x: 22.642132,
                                    y: 27.295797,
                                    z: 17.311197
                                  },
                                  {
                                    fixed: false,
                                    x: 23.484536,
                                    y: 41.062213,
                                    z: 10.859963
                                  }
                                ]
                              },
                              {
                                name: "Wayward Puritan",
                                routeId: "wayward-puritan",
                                mainImageLocation: require("@/static/photos/wayward-puritan-route.webp"),
                                style: "trad",
                                description:
                                  "Climb a corner to the right of wrinkles then up to the top of the buttress.",
                                protection: "Standard Rack",
                                grade: 6,
                                gradeModifier: "",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Follow a corner up to a shelf that joins with Wrinkles.",
                                    grade: 6,
                                    gradeModifier: ""
                                  },
                                  {
                                    description:
                                      "Follow a crack system to the top of the buttress.",
                                    grade: 6,
                                    gradeModifier: ""
                                  }
                                ],
                                center: {
                                  x: 28.17458,
                                  y: 18.290791,
                                  z: 18.169228
                                },
                                points: [
                                  {
                                    x: 29.31882905476527,
                                    y: 9.802673829612605,
                                    z: 19.856885851343357
                                  },
                                  {
                                    x: 29.08596834889692,
                                    y: 10.405526615307394,
                                    z: 19.378896245611315
                                  },
                                  {
                                    x: 29.12627624710605,
                                    y: 11.684465444428408,
                                    z: 19.61994426142868
                                  },
                                  {
                                    x: 29.08721924739649,
                                    y: 12.757988977551966,
                                    z: 19.31012511653591
                                  },
                                  {
                                    x: 28.774670760363822,
                                    y: 13.693591370930879,
                                    z: 19.1285543841587
                                  },
                                  {
                                    x: 28.777611047719528,
                                    y: 14.624011265072664,
                                    z: 19.123143740346013
                                  },
                                  {
                                    x: 28.66909057642555,
                                    y: 15.729052825569266,
                                    z: 18.835426118878843
                                  },
                                  {
                                    x: 28.526289426865496,
                                    y: 16.614268609060804,
                                    z: 18.58836781060636
                                  },
                                  {
                                    x: 28.417530907983885,
                                    y: 17.592241675973263,
                                    z: 18.403091438258013
                                  },
                                  {
                                    x: 28.315436310220377,
                                    y: 18.58502152608417,
                                    z: 18.252318583300607
                                  },
                                  {
                                    x: 28.262916169582233,
                                    y: 19.582965421979207,
                                    z: 18.209307763855474
                                  },
                                  {
                                    x: 28.0744342922915,
                                    y: 20.56957741271173,
                                    z: 18.13276828594374
                                  },
                                  {
                                    x: 28.068890591796954,
                                    y: 21.581726377161253,
                                    z: 17.981675649860914
                                  },
                                  {
                                    x: 27.97061078576315,
                                    y: 22.633580015034312,
                                    z: 17.78748972834998
                                  },
                                  {
                                    x: 27.729327040596726,
                                    y: 23.512151210476468,
                                    z: 17.328391350835208
                                  },
                                  {
                                    x: 27.65027573587173,
                                    y: 23.525421316958663,
                                    z: 17.249201989175443
                                  },
                                  {
                                    x: 27.27732983923633,
                                    y: 24.417149073730766,
                                    z: 17.1632948539637
                                  },
                                  {
                                    x: 26.729828289858307,
                                    y: 25.35850758778958,
                                    z: 16.95841332954687
                                  },
                                  {
                                    x: 25.803532307098628,
                                    y: 25.798339969407294,
                                    z: 16.061358203888354
                                  },
                                  {
                                    x: 25.824364337543408,
                                    y: 25.787958724721022,
                                    z: 16.294952145749132
                                  },
                                  {
                                    x: 25.179482771267647,
                                    y: 26.270382297594175,
                                    z: 15.363752597762161
                                  },
                                  {
                                    x: 24.73237461548316,
                                    y: 26.84735787036391,
                                    z: 15.072927903208434
                                  },
                                  {
                                    x: 24.54604601772726,
                                    y: 27.029107654272707,
                                    z: 15.090354216222634
                                  },
                                  {
                                    x: 24.29525024502407,
                                    y: 27.986221626916834,
                                    z: 15.087365563904841
                                  },
                                  {
                                    x: 23.90079778078105,
                                    y: 28.894767752382137,
                                    z: 14.98426787675384
                                  },
                                  {
                                    x: 23.704752710656855,
                                    y: 29.85602280512993,
                                    z: 14.869109751672596
                                  },
                                  {
                                    x: 23.60692003901879,
                                    y: 30.07298558500508,
                                    z: 14.756432916111825
                                  },
                                  {
                                    x: 23.7516503751154,
                                    y: 31.068595935632363,
                                    z: 14.584073308530213
                                  },
                                  {
                                    x: 23.78143748975687,
                                    y: 31.993417888052065,
                                    z: 14.23653120613721
                                  },
                                  {
                                    x: 23.80344303128707,
                                    y: 32.96273468277523,
                                    z: 14.003394700776473
                                  },
                                  {
                                    x: 23.84822685948928,
                                    y: 33.99539301070891,
                                    z: 13.775905318329736
                                  },
                                  {
                                    x: 23.76239328789201,
                                    y: 35.07192662892098,
                                    z: 13.576375730792881
                                  },
                                  {
                                    x: 23.87256588999129,
                                    y: 35.9664630124489,
                                    z: 13.258452972217555
                                  },
                                  {
                                    x: 23.90720377097416,
                                    y: 36.90168169565945,
                                    z: 12.94222957860291
                                  },
                                  {
                                    x: 23.963040548228783,
                                    y: 37.81903028859066,
                                    z: 12.569457442105627
                                  },
                                  {
                                    x: 23.950987594966833,
                                    y: 38.72413243503993,
                                    z: 12.117920609312232
                                  },
                                  {
                                    x: 23.964394970852887,
                                    y: 39.59368144803336,
                                    z: 11.748981845690752
                                  },
                                  {
                                    x: 24.00305173953176,
                                    y: 40.626134003587886,
                                    z: 11.443011705517952
                                  },
                                  {
                                    x: 24.006646359118502,
                                    y: 41.0019210017911,
                                    z: 11.017289786764383
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 26.598582,
                                    y: 25.058264,
                                    z: 17.174627
                                  },
                                  {
                                    fixed: false,
                                    x: 23.665301,
                                    y: 41.196703,
                                    z: 10.74253
                                  }
                                ]
                              },
                              {
                                name: "Five Ten Route",
                                routeId: "five-ten-route",
                                mainImageLocation: require("@/static/photos/five-ten-route-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Gear to 2 in.",
                                grade: 10,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb a thin crack to the left of Front Line, continue up another crack across the ramp.",
                                    grade: 10,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: 35.123162,
                                  y: 23.686373,
                                  z: 13.066545
                                },
                                points: [
                                  {
                                    x: 36.09354270925999,
                                    y: 16.02269877364259,
                                    z: 12.583012200986353
                                  },
                                  {
                                    x: 35.98298754661439,
                                    y: 16.845742029355716,
                                    z: 12.80301486710855
                                  },
                                  {
                                    x: 35.875044421505564,
                                    y: 17.871798074287426,
                                    z: 13.00084942822556
                                  },
                                  {
                                    x: 35.6226783824319,
                                    y: 18.68297551147165,
                                    z: 12.998551320208726
                                  },
                                  {
                                    x: 35.72707403313592,
                                    y: 19.8171538595786,
                                    z: 13.2178593177275
                                  },
                                  {
                                    x: 35.69696884896983,
                                    y: 20.855145942228468,
                                    z: 13.447860660164269
                                  },
                                  {
                                    x: 35.587163238562034,
                                    y: 21.440527835303456,
                                    z: 13.425263279123984
                                  },
                                  {
                                    x: 35.38986000257445,
                                    y: 22.39964472537996,
                                    z: 13.354314064431964
                                  },
                                  {
                                    x: 35.22970347002505,
                                    y: 23.34768477887145,
                                    z: 13.248499191183837
                                  },
                                  {
                                    x: 35.18840064664873,
                                    y: 23.93199269640555,
                                    z: 13.114652161690525
                                  },
                                  {
                                    x: 34.8586993544298,
                                    y: 24.874673498858364,
                                    z: 13.09672977967844
                                  },
                                  {
                                    x: 34.57696772413651,
                                    y: 25.822089837836884,
                                    z: 12.978420391807553
                                  },
                                  {
                                    x: 34.1907412240191,
                                    y: 26.767666493285507,
                                    z: 12.73114040128787
                                  },
                                  {
                                    x: 33.734319203790406,
                                    y: 27.596413491871083,
                                    z: 12.509804192709323
                                  },
                                  {
                                    x: 33.4035600201371,
                                    y: 28.551309603675588,
                                    z: 12.35325515318284
                                  },
                                  {
                                    x: 33.04594216961156,
                                    y: 29.45196396642197,
                                    z: 12.157860478020888
                                  },
                                  {
                                    x: 32.5920807847198,
                                    y: 30.45409995247328,
                                    z: 11.996408611023153
                                  },
                                  {
                                    x: 32.61931966999912,
                                    y: 30.40243271850766,
                                    z: 11.902688074385459
                                  },
                                  {
                                    x: 31.505456657091088,
                                    y: 30.84907875793026,
                                    z: 11.783556360865541
                                  },
                                  {
                                    x: 30.753063799759648,
                                    y: 31.361344499812596,
                                    z: 11.800003816636984
                                  },
                                  {
                                    x: 30.369343585124152,
                                    y: 31.573049866502377,
                                    z: 11.762998322944597
                                  },
                                  {
                                    x: 30.3677418466291,
                                    y: 32.63706546887114,
                                    z: 11.792379166552815
                                  },
                                  {
                                    x: 29.979146203591444,
                                    y: 33.58514494198671,
                                    z: 11.535824181708744
                                  },
                                  {
                                    x: 29.85895790329735,
                                    y: 34.4882818371498,
                                    z: 11.320300648629658
                                  },
                                  {
                                    x: 29.601194552500022,
                                    y: 35.492823162766456,
                                    z: 11.093615812635178
                                  },
                                  {
                                    x: 29.38674348159527,
                                    y: 36.391056947863575,
                                    z: 10.874731180224106
                                  },
                                  {
                                    x: 29.221966011473487,
                                    y: 37.45522857359337,
                                    z: 10.720075908037014
                                  },
                                  {
                                    x: 28.83541285407588,
                                    y: 38.31687921940333,
                                    z: 10.394948532900065
                                  },
                                  {
                                    x: 28.406633697402448,
                                    y: 38.87083928436201,
                                    z: 10.028749356755604
                                  },
                                  {
                                    x: 28.157302698622903,
                                    y: 39.76132868614524,
                                    z: 9.610947779376389
                                  },
                                  {
                                    x: 27.986299073841355,
                                    y: 40.35799791933388,
                                    z: 9.079506850830747
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 27.945408,
                                    y: 40.253212,
                                    z: 9.028314
                                  }
                                ]
                              },
                              {
                                name: "Front Line Lefthand",
                                routeId: "front-line-lefthand",
                                mainImageLocation: require("@/static/photos/front-line-lefthand-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "1 bolt, gear to 2 in.",
                                grade: 11,
                                gradeModifier: "b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb to the first bolt of Front line, then climb left and take the arete.",
                                    grade: 11,
                                    gradeModifier: "b"
                                  }
                                ],
                                center: {
                                  x: 38.76662,
                                  y: 29.991395,
                                  z: 9.076046
                                },
                                points: [
                                  {
                                    x: 37.65528433071238,
                                    y: 23.106250419622974,
                                    z: 6.491546342883042
                                  },
                                  {
                                    x: 37.6544152184548,
                                    y: 23.362601329863615,
                                    z: 6.666165956583778
                                  },
                                  {
                                    x: 37.88480679547934,
                                    y: 24.29823580639995,
                                    z: 6.6213586806803635
                                  },
                                  {
                                    x: 38.03893347266872,
                                    y: 25.31222662261477,
                                    z: 6.601271861586005
                                  },
                                  {
                                    x: 38.03764739908273,
                                    y: 26.291667878857993,
                                    z: 6.532845837881055
                                  },
                                  {
                                    x: 38.23057463564668,
                                    y: 27.28774244911621,
                                    z: 6.5795382213383755
                                  },
                                  {
                                    x: 38.218074294986906,
                                    y: 28.116118540952485,
                                    z: 6.639399742965536
                                  },
                                  {
                                    x: 38.58127995462377,
                                    y: 28.614348311911005,
                                    z: 7.392524240615062
                                  },
                                  {
                                    x: 38.95273191316858,
                                    y: 29.22198607529107,
                                    z: 8.316856945714827
                                  },
                                  {
                                    x: 38.916995802707085,
                                    y: 29.677540597200352,
                                    z: 9.174355286283687
                                  },
                                  {
                                    x: 38.82029280987812,
                                    y: 29.786765530686278,
                                    z: 9.188076958980567
                                  },
                                  {
                                    x: 38.97267785093447,
                                    y: 30.72183282606079,
                                    z: 8.863901441186094
                                  },
                                  {
                                    x: 38.9736403956193,
                                    y: 31.66758764983693,
                                    z: 8.539988873132755
                                  },
                                  {
                                    x: 38.86190678715961,
                                    y: 31.9869834442447,
                                    z: 8.445101484243748
                                  },
                                  {
                                    x: 38.47094583304013,
                                    y: 32.93345139719969,
                                    z: 8.433156267982934
                                  },
                                  {
                                    x: 38.00309539223889,
                                    y: 33.76942697038353,
                                    z: 8.365302974771772
                                  },
                                  {
                                    x: 37.383896749189,
                                    y: 34.65996207446598,
                                    z: 8.460457468040167
                                  },
                                  {
                                    x: 37.234999317161844,
                                    y: 34.71717917695719,
                                    z: 8.393568399788993
                                  },
                                  {
                                    x: 36.51179125166474,
                                    y: 35.48644841436924,
                                    z: 8.038510100155454
                                  },
                                  {
                                    x: 36.315096368079715,
                                    y: 35.62707050638721,
                                    z: 7.835987390674879
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 36.27595,
                                    y: 35.59611,
                                    z: 7.697199
                                  }
                                ]
                              },
                              {
                                name: "Front Line",
                                routeId: "front-line",
                                mainImageLocation: require("@/static/photos/front-line-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "2 bolts, gear to 2in.",
                                grade: 11,
                                gradeModifier: "b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the first two bolts on the face then follow a crack to the finish.",
                                    grade: 11,
                                    gradeModifier: "b"
                                  }
                                ],
                                center: {
                                  x: 38.082833,
                                  y: 30.401341,
                                  z: 5.331262
                                },
                                points: [
                                  {
                                    x: 37.58157384228331,
                                    y: 23.106561962720516,
                                    z: 6.332791496327688
                                  },
                                  {
                                    x: 37.64394796743075,
                                    y: 23.96396185183772,
                                    z: 6.139683772469872
                                  },
                                  {
                                    x: 37.88957423472169,
                                    y: 24.9863617502719,
                                    z: 6.159866828014524
                                  },
                                  {
                                    x: 37.91733727166978,
                                    y: 26.011781866418286,
                                    z: 6.142826713567104
                                  },
                                  {
                                    x: 38.03744566637665,
                                    y: 26.952512486226478,
                                    z: 6.0884443302849816
                                  },
                                  {
                                    x: 38.25059270273429,
                                    y: 27.996106118418968,
                                    z: 6.055949298290042
                                  },
                                  {
                                    x: 38.199921180645184,
                                    y: 28.283526461257555,
                                    z: 6.088717910567092
                                  },
                                  {
                                    x: 38.406988621102066,
                                    y: 29.18163905123109,
                                    z: 5.689980589958776
                                  },
                                  {
                                    x: 38.349498595730815,
                                    y: 30.16876588970644,
                                    z: 5.319867103607175
                                  },
                                  {
                                    x: 38.188951412164585,
                                    y: 30.897755952874192,
                                    z: 4.982860455736101
                                  },
                                  {
                                    x: 38.502734414960635,
                                    y: 31.866856065574318,
                                    z: 5.118200948640809
                                  },
                                  {
                                    x: 38.292136280337076,
                                    y: 32.9853139085584,
                                    z: 5.103436843383229
                                  },
                                  {
                                    x: 37.575252407237976,
                                    y: 33.859575219667384,
                                    z: 5.050849434285026
                                  },
                                  {
                                    x: 36.80879426520165,
                                    y: 34.723276673445675,
                                    z: 4.898546596490218
                                  },
                                  {
                                    x: 36.49545153958869,
                                    y: 34.95946087366844,
                                    z: 4.857170902312476
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 36.29264,
                                    y: 35.074307,
                                    z: 4.770947
                                  }
                                ]
                              },
                              {
                                name: "Frontier",
                                routeId: "frontier",
                                mainImageLocation: require("@/static/photos/frontier-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "2 bolts, gear to 2in.",
                                grade: 11,
                                gradeModifier: "b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the two bolts on the arete right of Front Line.",
                                    grade: 11,
                                    gradeModifier: "b"
                                  }
                                ],
                                center: {
                                  x: 37.582544,
                                  y: 30.184181,
                                  z: 2.597941
                                },
                                points: [
                                  {
                                    x: 36.51127631056708,
                                    y: 23.7995681034726,
                                    z: 1.941209970353063
                                  },
                                  {
                                    x: 36.38779009899558,
                                    y: 24.58227850752525,
                                    z: 1.9725246409791768
                                  },
                                  {
                                    x: 36.72308742819666,
                                    y: 25.597998757675683,
                                    z: 2.0471791433168316
                                  },
                                  {
                                    x: 36.98645539643618,
                                    y: 26.64795730553882,
                                    z: 2.125123277684791
                                  },
                                  {
                                    x: 37.129051382801784,
                                    y: 27.62087126605416,
                                    z: 2.2246745809599275
                                  },
                                  {
                                    x: 37.351769651064664,
                                    y: 28.61163606237587,
                                    z: 2.3059510777212378
                                  },
                                  {
                                    x: 37.464050567962374,
                                    y: 29.179787100045573,
                                    z: 2.469047973521921
                                  },
                                  {
                                    x: 37.71438559230829,
                                    y: 30.171861971914886,
                                    z: 2.436951270519201
                                  },
                                  {
                                    x: 37.758632265579806,
                                    y: 31.149189739961287,
                                    z: 2.5233541897403264
                                  },
                                  {
                                    x: 37.80298960089182,
                                    y: 32.12896182928795,
                                    z: 2.6099732048312663
                                  },
                                  {
                                    x: 37.755323874138874,
                                    y: 32.22801734876066,
                                    z: 2.718863549272961
                                  },
                                  {
                                    x: 37.65118258222747,
                                    y: 33.22470954346517,
                                    z: 2.543674428431309
                                  },
                                  {
                                    x: 37.075945114044714,
                                    y: 34.08586460991656,
                                    z: 2.4619335205540933
                                  },
                                  {
                                    x: 36.44140598165195,
                                    y: 34.91123103704397,
                                    z: 2.381501787864158
                                  },
                                  {
                                    x: 35.86176915776735,
                                    y: 35.56254770634776,
                                    z: 2.5032746353959565
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 35.496078,
                                    y: 35.726208,
                                    z: 2.659203
                                  }
                                ]
                              },
                              {
                                name: "Tiers",
                                routeId: "tiers",
                                mainImageLocation: require("@/static/photos/tiers-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "Standard Rack",
                                grade: 7,
                                gradeModifier: "",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the corner on the far right.",
                                    grade: 7,
                                    gradeModifier: ""
                                  }
                                ],
                                center: {
                                  x: 35.54366,
                                  y: 29.966512,
                                  z: 1.323899
                                },
                                points: [
                                  {
                                    x: 36.041644331032614,
                                    y: 24.113132127859835,
                                    z: 1.092868973167516
                                  },
                                  {
                                    x: 35.85129001406539,
                                    y: 24.92675029827809,
                                    z: 1.09869799515308
                                  },
                                  {
                                    x: 36.030737117297114,
                                    y: 26.137724181860275,
                                    z: 1.0542190477629454
                                  },
                                  {
                                    x: 35.87384879577372,
                                    y: 27.087044355937405,
                                    z: 1.2859547058178458
                                  },
                                  {
                                    x: 35.828937100874136,
                                    y: 28.08244605631243,
                                    z: 1.322626363311992
                                  },
                                  {
                                    x: 35.79616332569503,
                                    y: 29.100100770145488,
                                    z: 1.3573615581462737
                                  },
                                  {
                                    x: 35.742326951870076,
                                    y: 30.10485973580429,
                                    z: 1.3848955611261693
                                  },
                                  {
                                    x: 35.61152459734326,
                                    y: 31.121710394011256,
                                    z: 1.3903863079154226
                                  },
                                  {
                                    x: 35.34843136308265,
                                    y: 32.071455086479155,
                                    z: 1.4313995347429616
                                  },
                                  {
                                    x: 35.12803564437621,
                                    y: 33.019981160981395,
                                    z: 1.3353159588906527
                                  },
                                  {
                                    x: 35.00829332186163,
                                    y: 33.978944284677766,
                                    z: 1.379693559432161
                                  },
                                  {
                                    x: 35.12798214509987,
                                    y: 35.004716892960964,
                                    z: 1.3749212470258616
                                  },
                                  {
                                    x: 35.09233296354818,
                                    y: 35.70430125098958,
                                    z: 1.4336903953604618
                                  }
                                ],
                                anchors: [
                                  {
                                    fixed: false,
                                    x: 34.864515,
                                    y: 35.743654,
                                    z: 1.507848
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            name: "Bean Liqour Wall",
                            wallId: "bean-liqour-wall",
                            routeId: "bean-liquor-wall",
                            routes: [
                              {
                                name: "Bean Bagger",
                                routeId: "bean-bagger",
                                mainImageLocation: require("@/static/photos/bean-bagger-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "6 bolts",
                                grade: 11,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "The left-line on Bean Liquor Area climbs a bulge then an arete.",
                                    grade: 11,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: 39.4957,
                                  y: 29.538109,
                                  z: -16.989072
                                },
                                points: [
                                  {
                                    x: 43.18847092525666,
                                    y: 16.70060614577576,
                                    z: -15.92265157634657
                                  },
                                  {
                                    x: 43.311433848654914,
                                    y: 17.72651297649916,
                                    z: -15.782093744980541
                                  },
                                  {
                                    x: 43.64869169471156,
                                    y: 19.32255309494445,
                                    z: -15.40481867472293
                                  },
                                  {
                                    x: 43.45548189812565,
                                    y: 20.282049950607245,
                                    z: -15.23957037888413
                                  },
                                  {
                                    x: 43.20067577076018,
                                    y: 21.0916822291901,
                                    z: -15.104112573385203
                                  },
                                  {
                                    x: 42.92131139660634,
                                    y: 21.924974727511056,
                                    z: -14.939163362935455
                                  },
                                  {
                                    x: 42.50131740392764,
                                    y: 22.644216007942166,
                                    z: -14.848551050741095
                                  },
                                  {
                                    x: 42.36360295838479,
                                    y: 22.655965612225884,
                                    z: -14.798820740219227
                                  },
                                  {
                                    x: 41.96388826619883,
                                    y: 23.385124788309174,
                                    z: -15.092190377688924
                                  },
                                  {
                                    x: 41.62730502210047,
                                    y: 24.21062364964059,
                                    z: -15.302374225160447
                                  },
                                  {
                                    x: 41.511721733420764,
                                    y: 25.25994158462103,
                                    z: -15.457912959742615
                                  },
                                  {
                                    x: 41.3221901537913,
                                    y: 26.387071182652285,
                                    z: -15.639110459395066
                                  },
                                  {
                                    x: 40.89665841357383,
                                    y: 27.20025758356564,
                                    z: -15.901883728760764
                                  },
                                  {
                                    x: 40.39713918922585,
                                    y: 27.98046324832701,
                                    z: -16.21581932364851
                                  },
                                  {
                                    x: 39.940069619018495,
                                    y: 28.77775005814384,
                                    z: -16.51749128387305
                                  },
                                  {
                                    x: 39.71023445512317,
                                    y: 29.72262760859418,
                                    z: -16.73820134427366
                                  },
                                  {
                                    x: 39.611495592551556,
                                    y: 30.744476851526002,
                                    z: -16.88558812730675
                                  },
                                  {
                                    x: 39.6786479322642,
                                    y: 31.920254394521024,
                                    z: -16.986634497955045
                                  },
                                  {
                                    x: 39.497386253422945,
                                    y: 32.96991674295472,
                                    z: -17.15904700394383
                                  },
                                  {
                                    x: 39.21079761198436,
                                    y: 33.91601899622629,
                                    z: -17.223342608040497
                                  },
                                  {
                                    x: 39.192451778917736,
                                    y: 34.84576614512954,
                                    z: -17.32471272167331
                                  },
                                  {
                                    x: 39.13475576858146,
                                    y: 35.845996926856635,
                                    z: -17.296609766249716
                                  },
                                  {
                                    x: 39.19180975307086,
                                    y: 36.86057009727038,
                                    z: -17.19972259346665
                                  },
                                  {
                                    x: 39.34211369306433,
                                    y: 37.94565115288223,
                                    z: -17.091724938407378
                                  },
                                  {
                                    x: 38.98287584947806,
                                    y: 38.41344085904115,
                                    z: -17.0855117776512
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 38.833858,
                                    y: 38.466757,
                                    z: -17.137033
                                  }
                                ]
                              },
                              {
                                name: "Hambanger",
                                routeId: "hambanger",
                                mainImageLocation: require("@/static/photos/hambanger-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "9 bolts",
                                grade: 10,
                                gradeModifier: "d",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Begin on the face then move to a corner leading to an arete to finish.",
                                    grade: 10,
                                    gradeModifier: "d"
                                  }
                                ],
                                center: {
                                  x: 40.031327,
                                  y: 30.414277,
                                  z: -21.096065
                                },
                                points: [
                                  {
                                    x: 42.33943441399673,
                                    y: 19.224649721086013,
                                    z: -18.314412351538213
                                  },
                                  {
                                    x: 41.54720237511734,
                                    y: 19.50989848537746,
                                    z: -18.954722390592423
                                  },
                                  {
                                    x: 41.56108384575757,
                                    y: 20.76469584200758,
                                    z: -18.74586903814029
                                  },
                                  {
                                    x: 41.44958747790614,
                                    y: 22.04039370198095,
                                    z: -18.577177115509766
                                  },
                                  {
                                    x: 41.020343361894916,
                                    y: 22.88354581398316,
                                    z: -18.694330894041162
                                  },
                                  {
                                    x: 40.73718291237936,
                                    y: 23.87882146477153,
                                    z: -18.48781799354862
                                  },
                                  {
                                    x: 40.804222673041274,
                                    y: 24.746277200582142,
                                    z: -18.964795965696634
                                  },
                                  {
                                    x: 40.81288381158966,
                                    y: 25.758225344692462,
                                    z: -19.27386549029802
                                  },
                                  {
                                    x: 40.74306956030961,
                                    y: 26.696330803179244,
                                    z: -19.64183083324174
                                  },
                                  {
                                    x: 40.62485104335443,
                                    y: 27.589005447686596,
                                    z: -20.048491633796278
                                  },
                                  {
                                    x: 40.19445558182507,
                                    y: 28.33875878076978,
                                    z: -20.74890170700145
                                  },
                                  {
                                    x: 40.23733556432033,
                                    y: 29.283600514631058,
                                    z: -20.906584650728107
                                  },
                                  {
                                    x: 40.147005253643265,
                                    y: 29.415220135889474,
                                    z: -20.8558406177952
                                  },
                                  {
                                    x: 40.26239882193953,
                                    y: 30.330214719758477,
                                    z: -21.241250523801302
                                  },
                                  {
                                    x: 40.25340268514663,
                                    y: 31.263040017617914,
                                    z: -21.557233718448103
                                  },
                                  {
                                    x: 40.25629315021753,
                                    y: 32.230135997463144,
                                    z: -21.90140209007151
                                  },
                                  {
                                    x: 40.19865583278792,
                                    y: 33.14800263404659,
                                    z: -22.288747506431857
                                  },
                                  {
                                    x: 40.069350854266375,
                                    y: 33.44551533789457,
                                    z: -22.337507179497827
                                  },
                                  {
                                    x: 40.19729284749682,
                                    y: 34.349444056318305,
                                    z: -22.86645127983986
                                  },
                                  {
                                    x: 40.30905846268231,
                                    y: 35.410745341622665,
                                    z: -23.435399113653002
                                  },
                                  {
                                    x: 40.04389204465898,
                                    y: 36.11415200495732,
                                    z: -23.76747336761788
                                  },
                                  {
                                    x: 39.75708721559912,
                                    y: 36.85117141912003,
                                    z: -24.05737057546181
                                  },
                                  {
                                    x: 39.83858834301166,
                                    y: 37.7854242120945,
                                    z: -24.40980072690252
                                  },
                                  {
                                    x: 39.80873820556574,
                                    y: 38.85178461401357,
                                    z: -24.889591571718185
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 39.698628,
                                    y: 39.063372,
                                    z: -24.843087
                                  }
                                ]
                              },
                              {
                                name: "Nice Doggie",
                                routeId: "nice-doggie",
                                mainImageLocation: require("@/static/photos/nice-doggie-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "7 bolts",
                                grade: 12,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Boltline above block just right of the large tree.",
                                    grade: 12,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: 38.959697,
                                  y: 29.79435,
                                  z: -25.205876
                                },
                                points: [
                                  {
                                    x: 38.99298860461996,
                                    y: 25.666866317345775,
                                    z: -25.256878104713188
                                  },
                                  {
                                    x: 39.02372013624758,
                                    y: 26.44968532448959,
                                    z: -25.339287277836007
                                  },
                                  {
                                    x: 39.06276482855688,
                                    y: 27.52214741446048,
                                    z: -25.34816462953218
                                  },
                                  {
                                    x: 39.09088388529386,
                                    y: 28.57471879842586,
                                    z: -25.341920787168565
                                  },
                                  {
                                    x: 39.10819532380749,
                                    y: 29.603534789138948,
                                    z: -25.33776995727793
                                  },
                                  {
                                    x: 39.07798301486186,
                                    y: 30.696813751736993,
                                    z: -25.387445758133936
                                  },
                                  {
                                    x: 39.04394201018409,
                                    y: 31.545211558324677,
                                    z: -25.31093946607977
                                  },
                                  {
                                    x: 39.02627608671051,
                                    y: 32.505837234496056,
                                    z: -25.2917908988873
                                  },
                                  {
                                    x: 38.990237534799526,
                                    y: 33.58806881393672,
                                    z: -25.196964393039345
                                  },
                                  {
                                    x: 39.04854397383475,
                                    y: 34.297613051244454,
                                    z: -25.175748793145978
                                  },
                                  {
                                    x: 39.09947493510351,
                                    y: 35.164490658293445,
                                    z: -25.10371917201639
                                  },
                                  {
                                    x: 39.24798280605814,
                                    y: 36.164640559037046,
                                    z: -25.046379752427946
                                  },
                                  {
                                    x: 39.47268898507351,
                                    y: 37.21940670833812,
                                    z: -25.012990720047615
                                  },
                                  {
                                    x: 39.82604970288032,
                                    y: 38.39553132911952,
                                    z: -25.0083916422137
                                  },
                                  {
                                    x: 39.812516120441195,
                                    y: 39.001756981995314,
                                    z: -24.93035061412644
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 39.698628,
                                    y: 39.063372,
                                    z: -24.843087
                                  }
                                ]
                              },
                              {
                                name: "Wee Bean Jammin",
                                routeId: "wee-bean-jammin",
                                mainImageLocation: require("@/static/photos/wee-bean-jammin-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "6 bolts",
                                grade: 11,
                                gradeModifier: "c/d",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Boltline just right of Nice Doggie following a corner.",
                                    grade: 11,
                                    gradeModifier: "a/d"
                                  }
                                ],
                                center: {
                                  x: 38.080619,
                                  y: 34.012904,
                                  z: -26.447716
                                },
                                points: [
                                  {
                                    x: 38.439927126474636,
                                    y: 26.650809376404943,
                                    z: -26.454467334283894
                                  },
                                  {
                                    x: 38.34014342055876,
                                    y: 27.364571882749274,
                                    z: -26.600664475075604
                                  },
                                  {
                                    x: 38.407291835046415,
                                    y: 28.562738372559135,
                                    z: -26.62098745497566
                                  },
                                  {
                                    x: 38.38472700391534,
                                    y: 29.767895464456615,
                                    z: -26.69696177770304
                                  },
                                  {
                                    x: 38.18278038693134,
                                    y: 30.605869190256364,
                                    z: -26.749902886842595
                                  },
                                  {
                                    x: 37.994466324632725,
                                    y: 31.001425147591124,
                                    z: -26.726569670924224
                                  },
                                  {
                                    x: 37.999108867138155,
                                    y: 31.556063603225446,
                                    z: -26.738502139687107
                                  },
                                  {
                                    x: 38.096564064292295,
                                    y: 32.508758561867324,
                                    z: -26.66687822745839
                                  },
                                  {
                                    x: 38.1946155935281,
                                    y: 33.467283097427334,
                                    z: -26.59481604576921
                                  },
                                  {
                                    x: 38.31407330594245,
                                    y: 34.444836755863776,
                                    z: -26.518034935996972
                                  },
                                  {
                                    x: 38.48920518134744,
                                    y: 35.49754587360594,
                                    z: -26.454139152307686
                                  },
                                  {
                                    x: 38.666801737304,
                                    y: 36.55080936571225,
                                    z: -26.381232985968005
                                  },
                                  {
                                    x: 38.8583063720821,
                                    y: 37.60320097132845,
                                    z: -26.329516517976536
                                  },
                                  {
                                    x: 39.0471942236606,
                                    y: 38.69070317229292,
                                    z: -26.28263817234826
                                  },
                                  {
                                    x: 39.1571641840163,
                                    y: 39.38970197181948,
                                    z: -26.16621976467848
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 39.147244,
                                    y: 39.676313,
                                    z: -26.093542
                                  }
                                ]
                              },
                              {
                                name: "Beano Hangover",
                                routeId: "beano-hangover",
                                mainImageLocation: require("@/static/photos/beano-hangover-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "5 bolts",
                                grade: 12,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Furthest to the right is a bolt line leading to a corner followed by a crack to the anchors.",
                                    grade: 12,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: 37.563354,
                                  y: 35.305269,
                                  z: -27.604055
                                },
                                points: [
                                  {
                                    x: 38.411836366754954,
                                    y: 26.74430852645082,
                                    z: -26.539893292792712
                                  },
                                  {
                                    x: 38.28499571849567,
                                    y: 27.375429855330445,
                                    z: -26.679625652504647
                                  },
                                  {
                                    x: 38.42699904846736,
                                    y: 28.86584748985697,
                                    z: -26.81261697327975
                                  },
                                  {
                                    x: 38.28745184763009,
                                    y: 29.908764378412137,
                                    z: -26.942601449866647
                                  },
                                  {
                                    x: 38.132446265199455,
                                    y: 30.787230083755336,
                                    z: -27.00165518626646
                                  },
                                  {
                                    x: 37.93756458009496,
                                    y: 31.67627975851111,
                                    z: -27.176269898618504
                                  },
                                  {
                                    x: 37.75141633558193,
                                    y: 32.56381663711893,
                                    z: -27.31278943002702
                                  },
                                  {
                                    x: 37.600572890286564,
                                    y: 32.81949276865154,
                                    z: -27.300850005474572
                                  },
                                  {
                                    x: 37.643851751602874,
                                    y: 33.64358200935438,
                                    z: -27.535371547702987
                                  },
                                  {
                                    x: 37.66959957742751,
                                    y: 34.59429713072888,
                                    z: -27.663246313808447
                                  },
                                  {
                                    x: 37.746762421460794,
                                    y: 35.54777689565918,
                                    z: -27.754253910659404
                                  },
                                  {
                                    x: 37.95424942738661,
                                    y: 36.59725916572393,
                                    z: -27.86977100314619
                                  },
                                  {
                                    x: 38.11672320936759,
                                    y: 37.47263395421018,
                                    z: -27.870847762958878
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 37.951905,
                                    y: 37.632697,
                                    z: -28.231411
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            name: "The Patio Area",
                            wallId: "the-patio-area",
                            routes: [
                              {
                                name: "Carrying Futons",
                                routeId: "carrying-futons",
                                mainImageLocation: require("@/static/photos/carrying-futons-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "6 bolts",
                                grade: 11,
                                gradeModifier: "c",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Farthest left of the patio area. Climb a bulge to a steep face.",
                                    grade: 11,
                                    gradeModifier: "c"
                                  }
                                ],
                                center: {
                                  x: 7.063655,
                                  y: -17.565285,
                                  z: 36.477192
                                },
                                points: [
                                  {
                                    x: 8.255862172739521,
                                    y: -25.630099940176528,
                                    z: 35.51861144653513
                                  },
                                  {
                                    x: 8.398599759662277,
                                    y: -24.88720943379731,
                                    z: 35.46257517683423
                                  },
                                  {
                                    x: 8.179046505598189,
                                    y: -24.013042017236177,
                                    z: 35.678931964373135
                                  },
                                  {
                                    x: 7.597619247959616,
                                    y: -22.875921686433333,
                                    z: 36.282574221232046
                                  },
                                  {
                                    x: 7.265430430168067,
                                    y: -21.801765503764166,
                                    z: 36.641814857164555
                                  },
                                  {
                                    x: 7.084892468764738,
                                    y: -20.814773290798627,
                                    z: 36.840195443437686
                                  },
                                  {
                                    x: 7.032900270935113,
                                    y: -19.91255211716175,
                                    z: 36.87338678600205
                                  },
                                  {
                                    x: 6.855519178362963,
                                    y: -19.253868218772382,
                                    z: 36.85820344221734
                                  },
                                  {
                                    x: 6.866808074096016,
                                    y: -18.24778061259112,
                                    z: 36.72528498439545
                                  },
                                  {
                                    x: 6.866193903220444,
                                    y: -17.299845109967098,
                                    z: 36.34654416740465
                                  },
                                  {
                                    x: 7.013518074346703,
                                    y: -16.350842723370206,
                                    z: 35.96533267128496
                                  },
                                  {
                                    x: 7.213450496355528,
                                    y: -15.626816266092911,
                                    z: 35.7687339307876
                                  },
                                  {
                                    x: 7.279648110624458,
                                    y: -14.648883548474306,
                                    z: 35.90248646014894
                                  },
                                  {
                                    x: 7.5213530677199225,
                                    y: -13.66559854363584,
                                    z: 36.04717946884507
                                  },
                                  {
                                    x: 7.8675873326266546,
                                    y: -12.715218328738413,
                                    z: 36.06307126345342
                                  },
                                  {
                                    x: 8.151726220585191,
                                    y: -11.782197705808521,
                                    z: 36.14689746421806
                                  },
                                  {
                                    x: 8.574725139485881,
                                    y: -10.805714650744477,
                                    z: 36.29538186511474
                                  },
                                  {
                                    x: 8.902162643025113,
                                    y: -10.302883878632716,
                                    z: 36.152905016023304
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 9.002553,
                                    y: -10.277549,
                                    z: 36.08082
                                  }
                                ]
                              },
                              {
                                name: "Clyde's Big Adventure",
                                routeId: "clydes-big-adventure",
                                mainImageLocation: require("@/static/photos/clydes-big-adventure-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "6 bolts",
                                grade: 12,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Start below the roof and stay right of the arete. Shares anchors with Carrying Futons.",
                                    grade: 12,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: 9.070093,
                                  y: -17.765836,
                                  z: 37.51493
                                },
                                points: [
                                  {
                                    x: 9.483185340122679,
                                    y: -25.427137273834123,
                                    z: 35.95922688925193
                                  },
                                  {
                                    x: 9.536702091606857,
                                    y: -24.582871049803952,
                                    z: 35.95102719529014
                                  },
                                  {
                                    x: 9.366867708248709,
                                    y: -23.781925194273235,
                                    z: 35.96624080708641
                                  },
                                  {
                                    x: 9.236028021653983,
                                    y: -22.94952955482806,
                                    z: 36.47979789765742
                                  },
                                  {
                                    x: 9.111892479249637,
                                    y: -21.98859373676393,
                                    z: 37.075354245022176
                                  },
                                  {
                                    x: 9.066569145084385,
                                    y: -21.04241736128583,
                                    z: 37.33422740411535
                                  },
                                  {
                                    x: 9.052152543753177,
                                    y: -20.06223363730273,
                                    z: 37.52799673825639
                                  },
                                  {
                                    x: 9.047110002611806,
                                    y: -19.08054321041902,
                                    z: 37.75401339099686
                                  },
                                  {
                                    x: 9.052247977759182,
                                    y: -18.660521273393798,
                                    z: 37.69894242867039
                                  },
                                  {
                                    x: 9.371667579500448,
                                    y: -17.645196257726777,
                                    z: 37.66496773531814
                                  },
                                  {
                                    x: 9.469458645411644,
                                    y: -16.727499420602623,
                                    z: 37.710823564325885
                                  },
                                  {
                                    x: 9.694547644044126,
                                    y: -15.792602217054887,
                                    z: 38.03007143134106
                                  },
                                  {
                                    x: 9.827347959760395,
                                    y: -15.101877499417862,
                                    z: 38.0018953967908
                                  },
                                  {
                                    x: 9.632489634294616,
                                    y: -14.189540690023078,
                                    z: 38.062716416084534
                                  },
                                  {
                                    x: 9.375335423310107,
                                    y: -13.32700321998776,
                                    z: 38.049664895902445
                                  },
                                  {
                                    x: 9.071099041905116,
                                    y: -12.429845935284003,
                                    z: 37.85709790903851
                                  },
                                  {
                                    x: 8.867029653589954,
                                    y: -11.497229283160912,
                                    z: 37.542109026506786
                                  },
                                  {
                                    x: 8.981932334521922,
                                    y: -10.477659820174924,
                                    z: 36.37464729499565
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 9.002553,
                                    y: -10.277549,
                                    z: 36.08082
                                  }
                                ]
                              },
                              {
                                name: "War on Peace",
                                routeId: "war-on-peace",
                                mainImageLocation: require("@/static/photos/war-on-peace-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "8 bolts",
                                grade: 12,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb out of the roof to the right and continue up to the anchors.",
                                    grade: 12,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: 10.751403,
                                  y: -20.110054,
                                  z: 38.113681
                                },
                                points: [
                                  {
                                    x: 11.174288364466653,
                                    y: -25.752693288501696,
                                    z: 36.37539543042088
                                  },
                                  {
                                    x: 11.263278631996188,
                                    y: -25.06948768284216,
                                    z: 36.274999100673526
                                  },
                                  {
                                    x: 11.070949606236884,
                                    y: -24.13707056030251,
                                    z: 36.72754380083126
                                  },
                                  {
                                    x: 10.88765868136812,
                                    y: -23.110929234963272,
                                    z: 37.34053054545517
                                  },
                                  {
                                    x: 10.72527070347224,
                                    y: -22.16895693281624,
                                    z: 37.836439252865105
                                  },
                                  {
                                    x: 10.741653432295273,
                                    y: -21.49471840682199,
                                    z: 38.026975364862444
                                  },
                                  {
                                    x: 10.585186911150794,
                                    y: -20.540721071216304,
                                    z: 38.166923158201
                                  },
                                  {
                                    x: 10.539606462157616,
                                    y: -19.477032508557766,
                                    z: 38.119616586542385
                                  },
                                  {
                                    x: 10.550099027009601,
                                    y: -18.504117392440378,
                                    z: 38.0193812909269
                                  },
                                  {
                                    x: 10.514927090284148,
                                    y: -17.53555242107792,
                                    z: 38.03132746478335
                                  },
                                  {
                                    x: 10.747669696604564,
                                    y: -16.553206481731667,
                                    z: 38.21119355921184
                                  },
                                  {
                                    x: 10.921748558800621,
                                    y: -15.522957295512796,
                                    z: 38.002332458331026
                                  },
                                  {
                                    x: 11.073298809572112,
                                    y: -14.602397658978745,
                                    z: 37.96979536522257
                                  },
                                  {
                                    x: 11.239405948293886,
                                    y: -13.608438402357486,
                                    z: 37.9583854704477
                                  },
                                  {
                                    x: 11.603389578017259,
                                    y: -12.58330142295974,
                                    z: 37.589330929543785
                                  },
                                  {
                                    x: 11.824090993601803,
                                    y: -11.647818010392546,
                                    z: 37.54203436482145
                                  },
                                  {
                                    x: 11.694704592154919,
                                    y: -11.438903136576416,
                                    z: 37.54313586792066
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 11.577196,
                                    y: -11.112691,
                                    z: 37.502459
                                  }
                                ]
                              },
                              {
                                name: "Poolside",
                                routeId: "poolside",
                                mainImageLocation: require("@/static/photos/poolside-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "3 bolts",
                                grade: 12,
                                gradeModifier: "b/c",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Short route through a series of roofs.",
                                    grade: 12,
                                    gradeModifier: "b/c"
                                  }
                                ],
                                center: {
                                  x: 13.41598,
                                  y: -23.449311,
                                  z: 37.863101
                                },
                                points: [
                                  {
                                    x: 13.767337587299803,
                                    y: -25.619220646363285,
                                    z: 36.88215612737953
                                  },
                                  {
                                    x: 13.737535634465958,
                                    y: -24.81056717455783,
                                    z: 37.13979113675744
                                  },
                                  {
                                    x: 13.58242716174555,
                                    y: -23.929958209783024,
                                    z: 37.784663456324594
                                  },
                                  {
                                    x: 13.398326164887209,
                                    y: -23.038074232733678,
                                    z: 38.44385057324049
                                  },
                                  {
                                    x: 13.226754249540136,
                                    y: -22.142936584436928,
                                    z: 39.172191258426814
                                  },
                                  {
                                    x: 13.235231546663377,
                                    y: -21.18802956337625,
                                    z: 39.49534410373615
                                  },
                                  {
                                    x: 13.245353425042106,
                                    y: -20.422927445385575,
                                    z: 39.27478310671887
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 13.328392,
                                    y: -20.062805,
                                    z: 39.079372
                                  }
                                ]
                              },
                              {
                                name: "Underbelly",
                                routeId: "underbelly",
                                mainImageLocation: require("@/static/photos/underbelly-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "3 bolts, gear to 2 in.",
                                grade: 11,
                                gradeModifier: "c/d",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Climb the corner to the right of the large roof system. Keep right to the anchors.",
                                    grade: 11,
                                    gradeModifier: "c/d"
                                  }
                                ],
                                center: {
                                  x: 16.348897,
                                  y: -20.075088,
                                  z: 39.260065
                                },
                                points: [
                                  {
                                    x: 16.710763177825104,
                                    y: -25.217775524363883,
                                    z: 38.01118355527141
                                  },
                                  {
                                    x: 16.675548113582536,
                                    y: -24.41026116506032,
                                    z: 38.35948397036035
                                  },
                                  {
                                    x: 16.433447615182153,
                                    y: -23.410777452044684,
                                    z: 39.00767235404403
                                  },
                                  {
                                    x: 16.361497212251454,
                                    y: -22.415693598963266,
                                    z: 39.40873729033501
                                  },
                                  {
                                    x: 16.436145603962373,
                                    y: -21.458277686014483,
                                    z: 39.52176790623123
                                  },
                                  {
                                    x: 16.47559528311665,
                                    y: -20.881615844441487,
                                    z: 39.485265902639775
                                  },
                                  {
                                    x: 16.27293585219621,
                                    y: -19.850791763191484,
                                    z: 39.38275040971821
                                  },
                                  {
                                    x: 16.037473468042794,
                                    y: -18.911505993714133,
                                    z: 39.10727538754131
                                  },
                                  {
                                    x: 16.114914732603737,
                                    y: -18.774025170695904,
                                    z: 39.0128468254484
                                  },
                                  {
                                    x: 16.597647577310656,
                                    y: -18.09308352866776,
                                    z: 39.562880454145144
                                  },
                                  {
                                    x: 17.15310851812692,
                                    y: -17.701795478860483,
                                    z: 39.69276454316529
                                  },
                                  {
                                    x: 17.12619481989924,
                                    y: -16.73025075377486,
                                    z: 39.83033763111115
                                  },
                                  {
                                    x: 17.20129747812576,
                                    y: -15.954630103675301,
                                    z: 39.605534106213284
                                  },
                                  {
                                    x: 17.999909066263314,
                                    y: -15.184154904052571,
                                    z: 39.47812028283165
                                  },
                                  {
                                    x: 18.657669026643827,
                                    y: -14.639510607303446,
                                    z: 39.32444528174219
                                  },
                                  {
                                    x: 19.44422216955159,
                                    y: -14.0501660035062,
                                    z: 39.224422285456974
                                  },
                                  {
                                    x: 20.334719590009527,
                                    y: -13.462905617283795,
                                    z: 38.864133383011904
                                  },
                                  {
                                    x: 20.313512069938465,
                                    y: -13.473228171426221,
                                    z: 38.763871879271065
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 20.181915,
                                    y: -13.434749,
                                    z: 38.657774
                                  }
                                ]
                              },
                              {
                                name: "Antebellum",
                                routeId: "antebellum",
                                mainImageLocation: require("@/static/photos/antebellum-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "3 bolts, medium gear",
                                grade: 12,
                                gradeModifier: "a",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Flaring crack leading to a roof. Gain the roof and finish on the face.",
                                    grade: 12,
                                    gradeModifier: "a"
                                  }
                                ],
                                center: {
                                  x: 19.267226,
                                  y: -19.883973,
                                  z: 39.961803
                                },
                                points: [
                                  {
                                    x: 19.587710219133772,
                                    y: -24.85268188541626,
                                    z: 39.263665645593115
                                  },
                                  {
                                    x: 19.41492442134397,
                                    y: -23.899667231716805,
                                    z: 39.44319151212067
                                  },
                                  {
                                    x: 19.413284886293134,
                                    y: -22.91400047923907,
                                    z: 39.69819975985525
                                  },
                                  {
                                    x: 19.281583440783013,
                                    y: -21.883950033320897,
                                    z: 39.67620842877557
                                  },
                                  {
                                    x: 19.16212817104665,
                                    y: -20.971544223223635,
                                    z: 39.908339636992416
                                  },
                                  {
                                    x: 19.107619282014966,
                                    y: -20.114592683932038,
                                    z: 40.04329400846159
                                  },
                                  {
                                    x: 19.962480608274706,
                                    y: -19.510969454032697,
                                    z: 39.87361492979681
                                  },
                                  {
                                    x: 20.04658257028871,
                                    y: -19.40685641546742,
                                    z: 39.70331455971261
                                  },
                                  {
                                    x: 20.1651128854364,
                                    y: -18.44033434037065,
                                    z: 39.74097045475078
                                  },
                                  {
                                    x: 20.192422529397867,
                                    y: -17.50773949999776,
                                    z: 39.85231922832214
                                  },
                                  {
                                    x: 20.25042846997569,
                                    y: -16.55629678977207,
                                    z: 39.95646944107692
                                  },
                                  {
                                    x: 20.231771102589565,
                                    y: -15.54544444206679,
                                    z: 39.84068659079449
                                  },
                                  {
                                    x: 20.2495833490998,
                                    y: -14.441063411626384,
                                    z: 39.44080330816845
                                  },
                                  {
                                    x: 20.21222369830331,
                                    y: -13.605340021759394,
                                    z: 38.85961686627357
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 20.181915,
                                    y: -13.434749,
                                    z: 38.657774
                                  }
                                ]
                              },
                              {
                                name: "Bottom Feeder",
                                routeId: "bottom-feeder",
                                mainImageLocation: require("@/static/photos/bottom-feeder-route.webp"),
                                style: "trad",
                                description: null,
                                protection: "4 bolts, small gear",
                                grade: 11,
                                gradeModifier: "a/b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Start at the slot, then follow seams up to anchors.",
                                    grade: 12,
                                    gradeModifier: "a/b"
                                  }
                                ],
                                center: {
                                  x: 22.001754,
                                  y: -17.583884,
                                  z: 39.181278
                                },
                                points: [
                                  {
                                    x: 20.68465262801535,
                                    y: -24.511427359449186,
                                    z: 39.46736810374466
                                  },
                                  {
                                    x: 21.17831569982249,
                                    y: -23.682318384478478,
                                    z: 39.372431915551815
                                  },
                                  {
                                    x: 21.22942261934512,
                                    y: -23.575317402080557,
                                    z: 39.281687426124584
                                  },
                                  {
                                    x: 21.003594472919502,
                                    y: -22.7361536272228,
                                    z: 39.77315740455029
                                  },
                                  {
                                    x: 20.834168589413398,
                                    y: -21.710227097470288,
                                    z: 40.00425113899841
                                  },
                                  {
                                    x: 20.846538747999478,
                                    y: -21.705773759685194,
                                    z: 39.90462348320001
                                  },
                                  {
                                    x: 21.118776056668363,
                                    y: -20.741842102261998,
                                    z: 39.980028269714765
                                  },
                                  {
                                    x: 21.40694821399115,
                                    y: -19.818079539214775,
                                    z: 39.91600846213623
                                  },
                                  {
                                    x: 21.7665317401605,
                                    y: -18.85427540699744,
                                    z: 39.68004730227956
                                  },
                                  {
                                    x: 22.046678726902865,
                                    y: -17.89223364125041,
                                    z: 39.39729849911603
                                  },
                                  {
                                    x: 22.279437422376642,
                                    y: -16.945383763791458,
                                    z: 39.28811015649937
                                  },
                                  {
                                    x: 22.61159098752981,
                                    y: -15.969776533882039,
                                    z: 39.005388719405
                                  },
                                  {
                                    x: 22.83973400012151,
                                    y: -15.108265692670958,
                                    z: 38.97163566238034
                                  },
                                  {
                                    x: 23.157068796315084,
                                    y: -14.13102781646569,
                                    z: 38.821661196766115
                                  },
                                  {
                                    x: 23.38282490543102,
                                    y: -13.322465248931232,
                                    z: 38.39292867672766
                                  },
                                  {
                                    x: 23.54792374736203,
                                    y: -12.31938341112462,
                                    z: 38.34909726314059
                                  },
                                  {
                                    x: 23.64395114254713,
                                    y: -11.381701779079664,
                                    z: 38.3075497181873
                                  },
                                  {
                                    x: 23.72585356262285,
                                    y: -10.306991025116623,
                                    z: 38.038288767632565
                                  },
                                  {
                                    x: 23.71558725030452,
                                    y: -9.942393270921698,
                                    z: 37.8127502202292
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 23.64825,
                                    y: -9.98798,
                                    z: 37.738029
                                  }
                                ]
                              },
                              {
                                name: "For Whom the Bell Tolls",
                                routeId: "for-whom-the-bell-tolls",
                                mainImageLocation: require("@/static/photos/for-whom-the-bell-tolls-route.webp"),
                                style: "sport",
                                description: null,
                                protection: "7 bolts",
                                grade: 11,
                                gradeModifier: "a/b",
                                photos: [
                                  {
                                    src: require("@/static/ClimbAssist_Logo_img.png"),
                                    user: "user name"
                                  }
                                ],
                                comments: [
                                  {
                                    comment: "comment",
                                    user: "user name"
                                  }
                                ],

                                pitches: [
                                  {
                                    description:
                                      "Follow the corner on the right side of the roof system.",
                                    grade: 12,
                                    gradeModifier: "a/b"
                                  }
                                ],
                                center: {
                                  x: 24.036713,
                                  y: -18.230402,
                                  z: 38.286365
                                },
                                points: [
                                  {
                                    x: 22.941986041888658,
                                    y: -24.4622460514834,
                                    z: 39.575346616708984
                                  },
                                  {
                                    x: 22.967673877563964,
                                    y: -23.46357962428444,
                                    z: 39.31391112079385
                                  },
                                  {
                                    x: 23.04193447454564,
                                    y: -22.439048717476716,
                                    z: 39.261066921173786
                                  },
                                  {
                                    x: 23.142137488032606,
                                    y: -21.483970232200644,
                                    z: 39.19147740687318
                                  },
                                  {
                                    x: 23.09679283324825,
                                    y: -20.698005640542664,
                                    z: 39.16980271552438
                                  },
                                  {
                                    x: 23.504448828586938,
                                    y: -19.755395799107273,
                                    z: 38.999524362749035
                                  },
                                  {
                                    x: 23.822309020075448,
                                    y: -18.807779753138394,
                                    z: 38.65864998261972
                                  },
                                  {
                                    x: 24.060201440935753,
                                    y: -17.885464853011673,
                                    z: 38.42176274521307
                                  },
                                  {
                                    x: 24.452984637883556,
                                    y: -17.007405706422592,
                                    z: 38.10239827946337
                                  },
                                  {
                                    x: 24.78150121203355,
                                    y: -16.03861541468049,
                                    z: 37.85520586479422
                                  },
                                  {
                                    x: 25.0029392176545,
                                    y: -15.091677382818668,
                                    z: 37.669583226091376
                                  },
                                  {
                                    x: 25.406156363449966,
                                    y: -14.245394199154003,
                                    z: 37.28267757151652
                                  },
                                  {
                                    x: 25.511133972278326,
                                    y: -13.57006067399755,
                                    z: 37.195369587267436
                                  }
                                ],

                                anchors: [
                                  {
                                    fixed: true,
                                    x: 25.733806,
                                    y: -13.825662,
                                    z: 37.145947
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
          }
        ]
      }
    ]
  }),
  methods: {
    aCommonMethod() {}
  }
};
