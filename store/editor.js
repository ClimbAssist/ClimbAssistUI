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
  parking: {
    latitude: undefined,
    longitude: undefined
  },
  path: [],
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
    location: undefined,
    model: undefined,
    walls: []
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
    state.cragStateEditor.location = payload.location;
    state.cragStateEditor.model = payload.model;
    state.cragStateEditor.walls = payload.walls;
  },
  updateRoutes: (state, payload) => {
    state.routeStateEditor = []
    for (let i in payload) {
      state.routeStateEditor.push(payload[i])
    }
  },
  updateSelectedRoute: (state, payload) => {
    state.selectedRoute = payload
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
    state.points.push(payload)
  },
  updatePoints: (state, payload) => {
    state.points = payload;
  },
  removePoints: (state) => {
    state.points.pop();
  },
  updateDistances: (state, payload) => {
    state.distances = payload;
  },
  addDistance: (state, payload) => {
    state.distances.push(payload);
  },
  removeDistance: (state) => {
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
  updateParking: (state, payload) => {
    state.parking.latitude = payload.lat;
    state.parking.longitude = payload.lng;
  },
  addPathPoint: (state, payload) => {
    state.path.push(payload);
  },
  removePathPoint: (state) => {
    state.path.pop();
  },
  clearPath: (state) => {
    state.path = [];
  },
  updateZoom: (state, payload) => {
    state.zoom = payload;
  },
  updateMapEdit: (state) => {
    state.mapEdit = !state.mapEdit;
  },
  clearMapEdit: (state) => {
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
