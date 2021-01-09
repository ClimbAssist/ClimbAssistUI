export const state = () => ({
  editTabs: null,
  editor: false,
  activeRoute: undefined,
  activePitch: undefined,
  selectedRoute: undefined,
  editing: "Location",
  anchors: [],
  points: [],
  distances: [],
  modelSettings: {
    scale: undefined,
    light: undefined,
    modelAngle: undefined,
    azimuth: []
  },
  country: undefined,
  region: undefined,
  area: undefined,
  subArea: undefined,
  location: {
    latitude: undefined,
    longitude: undefined
  },
  parking: [],
  parkingIndex: undefined,
  path: [],
  currentPath: undefined,
  pathIndex: undefined,
  zoom: undefined,
  areaStateEditor: {
    areaId: undefined,
    name: undefined,
    description: undefined,
    subAreas: []
  },
  mapEdit: false,
  mapTile: "outdoors-v11",
  mapSelector: "location",
  cragStateEditor: {
    cragId: undefined,
    subAreaId: undefined,
    name: undefined,
    description: undefined,
    imageLocation: undefined,
    jpgImageLocation: undefined,
    location: undefined,
    model: undefined,
    walls: [],
    parking: undefined,
    paths: undefined,
    state: undefined
  },
  centerLoc: {
    x: undefined,
    y: undefined,
    z: undefined
  },
  routeStateEditor: [],
  loading: false,
  sampleData: false
});
export const getters = {};
export const mutations = {
  updateSampleData: (state, payload) => {
    state.sampleData = payload;
  },
  editView: (state, payload) => {
    state.editTabs = payload;
  },
  updateEditor: (state, payload) => {
    state.editor = payload;
  },
  updateNorth: (state, payload) => {
    state.modelSettings.northAngle = payload;
  },
  updateModelAngle: (state, payload) => {
    state.modelSettings.modelAngle = payload;
  },
  updateScale: (state, payload) => {
    state.modelSettings.scale = payload;
  },
  updateLight: (state, payload) => {
    state.modelSettings.light = payload;
  },
  updateAzimuth: (state, payload) => {
    state.modelSettings.azimuth = payload;
  },
  updateActiveRoute: (state, payload) => {
    state.activeRoute = payload;
  },
  updateActivePitch: (state, payload) => {
    state.activePitch = payload;
  },
  updateEditing: (state, payload) => {
    state.editing = payload;
  },
  updateLoading: (state, payload) => {
    state.loading = payload;
  },
  updateCrag: (state, payload) => {
    state.cragStateEditor.cragId = payload.cragId;
    state.cragStateEditor.subAreaId = payload.subAreaId;
    state.cragStateEditor.name = payload.name;
    state.cragStateEditor.description = payload.description;
    state.cragStateEditor.imageLocation = payload.imageLocation;
    state.cragStateEditor.jpgImageLocation = payload.jpgImageLocation;
    state.cragStateEditor.location = payload.location;
    state.cragStateEditor.model = payload.model;
    state.cragStateEditor.walls = payload.walls;
    state.cragStateEditor.parking = payload.parking;
    state.cragStateEditor.paths = payload.paths;
    state.cragStateEditor.state = payload.state;
  },
  updateRoutes: (state, payload) => {
    state.routeStateEditor = [];
    const serializePitch = pitch =>
      _.defaults(pitch, {
        danger: undefined,
        description: undefined,
        grade: undefined,
        gradeModifier: undefined
      });

    const serializeRoute = route =>
      _.defaultsDeep(route, {
        style: undefined,
        description: undefined,
        protection: undefined,
        grade: undefined,
        gradeModifier: undefined,
        pitches: _.map(route.pitches, p => serializePitch(p))
      });

    for (let i in payload) {
      state.routeStateEditor.push(serializeRoute(payload[i]));
    }
  },
  updateSelectedRoute: (state, payload) => {
    state.selectedRoute = payload;
  },
  updateAnchors: (state, payload) => {
    state.anchors = payload;
  },
  addAnchors: (state, payload) => {
    state.anchors.push(payload);
  },
  editAnchors: (state, payload) => {
    for (let key in state.anchors) {
      state.anchors[key].fixed = payload[key];
    }
  },
  removeAnchor: state => {
    state.anchors.pop();
  },
  updateCenterLoc: (state, payload) => {
    state.centerLoc.x = payload.x;
    state.centerLoc.y = payload.y;
    state.centerLoc.z = payload.z;
  },
  addPoints: (state, payload) => {
    state.points.push(payload);
  },
  updatePoints: (state, payload) => {
    state.points = payload;
  },
  removePoints: state => {
    state.points.pop();
  },
  updateDistances: (state, payload) => {
    state.distances = payload;
  },
  addDistance: (state, payload) => {
    state.distances.push(payload);
  },
  removeDistance: state => {
    state.distances.pop();
  },
  updateCountry: (state, payload) => {
    state.country = payload;
  },
  updateRegion: (state, payload) => {
    state.region = payload;
  },
  updateArea: (state, payload) => {
    state.area = payload;
  },
  updateAreaState: (state, payload) => {
    state.areaStateEditor.areaId = payload.areaId;
    state.areaStateEditor.regionId = payload.regionId;
    state.areaStateEditor.name = payload.name;
    state.areaStateEditor.description = payload.description;
    state.areaStateEditor.subAreas = payload.subAreas;
  },
  updateSubArea: (state, payload) => {
    state.subArea = payload;
  },
  updateLocation: (state, payload) => {
    state.location.latitude = payload.lat;
    state.location.longitude = payload.lng;
  },
  setParking: (state, payload) => {
    // let parking = []
    // for(let i in payload) {
    //   let obj = {lng: payload[i].longitude, lat: payload[i].latitude};
    //   parking.push(obj)
    // }
    state.parking = payload;
  },
  updateParking: (state, payload) => {
    state.parking[state.parking.length - 1].latitude = payload.lat;
    state.parking[state.parking.length - 1].longitude = payload.lng;
  },
  addParking: state => {
    state.parking.push({
      latitude: undefined,
      longitude: undefined
    });
  },
  removeParking: state => {
    state.parking.pop();
  },
  clearParking: state => {
    state.parking = [];
  },
  setCurrentPath: (state, payload) => {
    state.currentPath = payload;
  },
  setPath: (state, payload) => {
    let path = [];
    for (let i in payload) {
      path.push([]);
      for (let pi in payload[i]) {
        path[i].push([payload[i][pi].longitude, payload[i][pi].latitude]);
      }
    }
    state.path = path;
  },
  addPath: state => {
    state.path.push([]);
  },
  addPathPoint: (state, payload) => {
    state.path[state.path.length - 1].push(payload);
  },
  removePathPoint: state => {
    state.path[state.path.length - 1].pop();
  },
  removePath: state => {
    state.path.pop();
  },
  clearPath: state => {
    state.path = [];
  },
  updateZoom: (state, payload) => {
    state.zoom = payload;
  },
  updateMapEdit: state => {
    state.mapEdit = !state.mapEdit;
  },
  clearMapEdit: state => {
    state.mapEdit = false;
  },
  updateMapTile: (state, payload) => {
    state.mapTile = payload;
  },
  updateMapSelector: (state, payload) => {
    state.mapSelector = payload;
  }
};
export const actions = {};
