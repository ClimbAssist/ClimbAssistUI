<template>
  <div>
    <div id="container"></div>
    <div id="north">
      <p>N</p>
    </div>
    <canvas id="number" width="36" height="32"></canvas>
    <div id="scale">
      <p>{{ scaleSize }} m ({{ scaleSizeFt }} ft)</p>
    </div>
    <v-btn v-if="showUndo" class="undo-btn" @click="removePoint()" :disabled="loading">undo</v-btn>
    <v-btn
      v-if="showSave"
      class="save-btn"
      color="primary"
      :disabled="loading"
      @click="submitPoints()"
      >Set Pitch</v-btn
    >
    <v-sheet row v-if="!mesh" class="loading-info">
      <p>Loading Model</p>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-sheet>
    <v-sheet row v-if="loading" class="loading-info">
      <p>Setting Line</p>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-sheet>
    <!-- <canvas id="number" width="64" height="64"></canvas> -->
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { mapGetters } from "vuex";
import _ from "lodash";
// import DecalGeometry from 'three-decal-geometry'

export default {
  name: "model",
  data() {
    return {
      camera: null,
      camera2: null,
      scene: null,
      renderer: null,
      mesh: null,
      north: null,
      insetHeight: null,
      insetWidth: null,
      camDistance: null,
      play: true,
      scaleFactor: null,
      light: null,
      controls: null,
      controls2: null,
      routePos: [],
      group: null,
      raycaster: null,
      aLen: null,
      i: null,
      centerLoc: {
        x: null,
        y: null,
        z: null
      },
      intersection: {
        intersects: false,
        point: new THREE.Vector3(),
        normal: new THREE.Vector3()
      },
      mouseHelper: null,
      mouse: new THREE.Vector2(),
      position: new THREE.Vector3(),
      inputPoints: [],
      lines: [],
      activeLine: null,
      lineEnd: false
    };
  },
  watch: {
    anchors: {
      handler() {
        this.scene.remove(this.anchorsGroup);
        this.loadAnchors();
      },
      deep: true
    },
    storePoints: {
      handler() {
        if (!this.play) {
          return
        }
        this.addPitchLine();
        this.setActivePitch();
        this.updateSelectedRoute();
      },
      deep: true
    }
  },
  computed: {
    crag() {
      return this.$store.state.editor.cragStateEditor;
    },
    editTabs() {
      return this.$store.state.editor.editTabs;
    },
    storePoints() {
      return this.$store.state.editor.points;
    },
    loading() {
      return this.$store.state.editor.loading;
    },
    activePitch() {
      return this.$store.state.editor.activePitch;
    },
    lineDist() {
      let totalLength = 0;
      for (let i in this.lines) {
        let lineDist = this.lines[i].computeLineDistances();
        totalLength +=
          lineDist.geometry.lineDistances[
            lineDist.geometry.lineDistances.length - 1
          ];
      }
      return parseFloat((totalLength / this.meshScale).toFixed(1));
    },
    showUndo() {
      if (
        this.editing === "Line" &&
        ((this.inputPoints.length > 0 && this.activePitch == 1) ||
          this.inputPoints.length > 1)
      ) {
        return true;
      } else {
        return false;
      }
    },
    showSave() {
      if (this.editing === "Line" && this.savePoints.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    anchors() {
      return this.$store.state.editor.anchors;
    },
    distances() {
      return this.$store.state.editor.distances;
    },
    editing() {
      return this.$store.state.editor.editing;
    },
    meshScale() {
      if (this.mesh) {
        this.mesh.scale.set(
          this.crag.model.scale,
          this.crag.model.scale,
          this.crag.model.scale
        );
      }
      return this.crag.model.scale;
    },
    lightIntensity() {
      return this.crag.model.light;
    },
    azumuth() {
      return this.crag.model.azumuth;
    },
    northAngle() {
      return this.crag.model.northAngle;
    },
    modelAngle() {
      return this.crag.model.modelAngle;
    },
    selectedRoute() {
      return this.$store.state.editor.selectedRoute;
    },
    savePoints() {
      let savePoints = [];

      for (let lkey in this.lines) {
        for (let pkey in this.lines[lkey].geometry.vertices) {
          if (lkey == 0 || pkey != 0) {
            let savePoint = {
              x: parseFloat(
                this.lines[lkey].geometry.vertices[pkey].x.toFixed(4)
              ),
              y: parseFloat(
                this.lines[lkey].geometry.vertices[pkey].y.toFixed(4)
              ),
              z: parseFloat(
                this.lines[lkey].geometry.vertices[pkey].z.toFixed(4)
              )
            };
            if (lkey == 0 && pkey == 0) {
              savePoint.first = true;
            }
            savePoints.push(savePoint);
          }
        }
      }
      return savePoints;
    },
    navHeight() {
      var topNav = document.getElementsByClassName("v-toolbar");
      // var botNav = document.getElementsByClassName("v-bottom-nav");
      // if (botNav) {
      //   var nav = topNav[0].clientHeight + botNav[0].clientHeight;
      // } else {
      //   var nav = topNav[0].clientHeight;
      // }
      var nav = topNav[0].clientHeight;
      return nav;
    },
    scaleSize() {
      if (this.scaleFactor) {
        return (this.scaleFactor / this.meshScale).toFixed(1);
      }
    },
    scaleSizeFt() {
      return (this.scaleSize * 3.28).toFixed(1);
    },
    activeRoute() {
      return this.$store.state.editor.activeRoute;
    },
    activeObject() {
      if (this.group) {
        if (this.activeRoute) {
          for (let key in this.routePos) {
            if (
              this.routePos[key].wall == this.activeRoute[0] &&
              this.routePos[key].route == this.activeRoute[1]
            ) {
              let activeObject = this.group.children[key];
              activeObject.scale.set(
                this.scaleFactor * 1.5,
                this.scaleFactor * 1.5,
                1
              );
              activeObject.material.color.set("#40FF70");
              return activeObject;
            }
          }
        } else {
          return null;
        }
      }
    }
  },
  methods: {
    init: function() {
      let container = document.getElementById("container");

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        1,
        1000
      );
      this.camera.position.z = 120;
      // can add up to 20 layers to toggle hide/show
      this.camera.layers.enable(1); // model
      this.camera.layers.enable(2); // routes
      this.camera.layers.enable(3); // tics
      this.camera.target = new THREE.Vector3();

      // this.camera2 = new THREE.OrthographicCamera(-20, 20, -20, 20);
      this.camera2 = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        1,
        1000
      );
      this.camera2.position.z = 50;
      this.camera2.layers.enable(10); // north

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.gammaOutput = true;
      this.renderer.gammaFactor = 2.2;
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.minDistance = 50;
      this.controls.maxDistance = 200;

      // set based on model
      if (this.azumuth) {
        this.controls.minAzimuthAngle = this.azumuth.minimum;
        this.controls.maxAzimuthAngle = this.azumuth.maximum;
      }

      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.screenSpacePanning = true;

      this.controls2 = new OrbitControls(
        this.camera2,
        this.renderer.domElement
      );

      if (this.azumuth) {
        this.controls2.minAzimuthAngle = this.controls.minAzimuthAngle;
        this.controls2.maxAzimuthAngle = this.controls.maxAzimuthAngle;
      }

      this.controls2.maxPolarAngle = this.controls.maxPolarAngle;
      this.controls2.enablePan = false;
      this.controls2.enableZoom = false;

      this.light = new THREE.AmbientLight(0xffffff, this.lightIntensity);

      this.scene.add(this.light);
      this.loadModel();
      this.loadNorth();

      // for raycasting
      let geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      this.raycaster = new THREE.Raycaster();

      this.mouseHelper = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 10),
        new THREE.MeshNormalMaterial()
      );
      this.mouseHelper.visible = false;
      // this.scene.add(this.mouseHelper);

      this.line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ linewidth: 4 })
      );
      // this.scene.add(this.line);

      window.addEventListener("resize", this.onWindowResize, false);
      container.addEventListener("mousemove", this.onDocumentMouseMove, false);
      container.addEventListener("mouseup", this.onDocumentMouseclick, false);
      container.addEventListener("dblclick", this.onDocumentDoubleClick, false);
      window.addEventListener("mousedown", () => {
        this.moved = false;
      });
      // window.addEventListener("touchstart", () => {
      //   this.moved = false;
      // });
      // container.addEventListener("touchend", this.onDocumentTouchEnd, false);
      this.controls.addEventListener("change", () => {
        this.moved = true;
      });
      this.onWindowResize();
    },
    animate: function() {
      if (this.play) {
        requestAnimationFrame(this.animate);

        this.renderer.setClearColor(0x2222222, 1);
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);

        // this.camDistance =
        //   this.camera.position.distanceTo(this.origin).toFixed(0) + " ft";
        // document.getElementById("camera-distance").innerHTML = this.camDistance;

        this.checkAnnotationDistance();

        // inset scene

        this.renderer.setClearColor(0x0000000, 1);
        this.renderer.clearDepth(); // important!
        this.renderer.setScissorTest(true);

        this.renderer.setScissor(
          20,
          window.innerHeight - this.insetHeight - this.navHeight - 20,
          this.insetWidth,
          this.insetHeight
        );
        this.renderer.setViewport(
          20,
          window.innerHeight - this.insetHeight - this.navHeight - 20,
          this.insetWidth,
          this.insetHeight
        );
        this.renderer.render(this.scene, this.camera2);
        this.renderer.setScissorTest(false);
      }
    },
    onWindowResize: function() {
      if (this.play) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
          window.innerWidth,
          window.innerHeight - this.navHeight
        );

        this.insetWidth = window.innerHeight / 8; // square
        this.insetHeight = window.innerHeight / 8;

        this.camera2.aspect = this.insetWidth / this.insetHeight;
        this.camera2.updateProjectionMatrix();
      }
    },
    loadModel: function() {
      let loader = new GLTFLoader();

      loader.load(this.crag.model.modelLocation, gltf => {
        this.mesh = gltf.scene.children[0];
        this.mesh.layers.set(1);
        this.mesh.scale.set(this.meshScale, this.meshScale, this.meshScale);
        this.mesh.rotateY(this.crag.model.modelAngle);
        this.scene.add(this.mesh);
        // this.loadDecals()
      });
    },
    loadNorth: function() {
      let loader = new GLTFLoader();

      loader.load(
        "https://s3-us-west-2.amazonaws.com/models-172776452117-us-west-2/north.glb",
        gltf => {
          this.north = gltf.scene.children[0];
          this.north.scale.set(5, 5, 5);
          let northAngle = this.crag.model.modelAngle + Math.PI;
          this.north.rotateY(northAngle);
          this.north.layers.set(10);
          this.scene.add(this.north);
        }
      );
    },
    loadSprites: function() {
      this.group = new THREE.Group();
      const x = 32;
      const y = 32;
      const radius = 30;
      const startAngle = 0;
      const endAngle = Math.PI * 2;
      for (let wkey in this.crag.walls) {
        if (this.activeRoute[0] == wkey) {
          for (let rkey in this.crag.walls[wkey].routes) {
            if (this.crag.walls[wkey].routes[rkey].center) {
              let pos = { wall: parseInt(wkey), route: parseInt(rkey) };
              this.routePos.push(pos);
              // Sprite
              // let canvas = document.getElementById("number");
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");
              let numberTexture = new THREE.CanvasTexture(canvas);

              let spriteMaterial = new THREE.SpriteMaterial({
                map: numberTexture,
                alphaTest: 0.5,
                transparent: true,
                depthTest: false,
                depthWrite: false,
                sizeAttenuation: true
              });

              // Number definition
              ctx.canvas.width = 64;
              ctx.canvas.height = 64;

              ctx.clearRect(0, 0, x, y);

              ctx.fillStyle = "rgb(0, 0, 0)";
              ctx.beginPath();
              ctx.arc(x, y, radius, startAngle, endAngle);
              ctx.fill();

              ctx.strokeStyle = "rgb(255, 255, 255)";
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(x, y, radius, startAngle, endAngle);
              ctx.stroke();

              ctx.fillStyle = "rgb(255, 255, 255)";
              ctx.font = "25px sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(parseInt(rkey) + 1, x, y);

              let sprite = new THREE.Sprite(spriteMaterial);
              sprite.scale.set(0.5, 0.5, 0.5);
              if (this.currentPosition && this.activeRoute[1] == rkey) {
                sprite.position.copy(this.currentPosition);
              } else {
                sprite.position.set(
                  this.crag.walls[wkey].routes[rkey].center.x,
                  this.crag.walls[wkey].routes[rkey].center.y,
                  this.crag.walls[wkey].routes[rkey].center.z
                );
              }
              sprite.layers.set(2);

              this.group.add(sprite);
            }
          }
        }
      }
      this.scene.add(this.group);
    },
    setAnchors() {
      let anchors = [];
      for (let i in this.selectedRoute.pitches) {
        if (this.selectedRoute.pitches[i].anchors) {
          anchors.push(this.selectedRoute.pitches[i].anchors);
        }
      }
      this.$store.commit("editor/updateAnchors", anchors);
      this.loadAnchors();
    },
    loadAnchors: function() {
      this.anchorsGroup = new THREE.Group();
      const x = 32;
      const y = 32;
      const radius = 30;
      const startAngle = 0;
      const endAngle = Math.PI * 2;

      for (let akey in this.anchors) {
        // Sprite
        // let canvas = document.getElementById("number");
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let numberTexture = new THREE.CanvasTexture(canvas);

        let spriteMaterial = new THREE.SpriteMaterial({
          map: numberTexture,
          alphaTest: 0.5,
          transparent: true,
          depthTest: false,
          depthWrite: false,
          sizeAttenuation: true
        });

        // Number definition
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;

        ctx.clearRect(0, 0, x, y);
        if (this.anchors[akey].fixed) {
          ctx.fillStyle = "rgb(0, 0, 255)";
          ctx.beginPath();
          ctx.arc(x, y, radius, startAngle, endAngle);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgb(255, 255, 0)";
          ctx.beginPath();
          ctx.arc(x, y, radius, startAngle, endAngle);
          ctx.fill();
        }

        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();

        // ctx.fillStyle = "rgb(255, 255, 255)";
        // ctx.font = "25px sans-serif";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // ctx.fillText(parseInt(rkey) + 1, x, y);

        let sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.5, 0.5, 0.5);
        // if (this.currentPosition && this.activeRoute[1] == rkey) {
        //   sprite.position.copy(this.currentPosition);
        // } else {
        sprite.position.set(
          this.anchors[akey].x,
          this.anchors[akey].y,
          this.anchors[akey].z
        );
        // }
        sprite.layers.set(2);

        this.anchorsGroup.add(sprite);
      }
      this.scene.add(this.anchorsGroup);
    },
    loadLines() {
      this.linesGroup = new THREE.Group();
      for (let wkey in this.crag.walls) {
        for (let rkey in this.crag.walls[wkey].routes) {
          if (this.activeRoute[0] == wkey && this.activeRoute[1] == rkey) {
            continue;
          }
          if (this.crag.walls[wkey].routes[rkey].points) {
            let geometry = new THREE.Geometry();
            for (let pkey in this.crag.walls[wkey].routes[rkey].points) {
              let vertex = new THREE.Vector3(
                this.crag.walls[wkey].routes[rkey].points[pkey].x,
                this.crag.walls[wkey].routes[rkey].points[pkey].y,
                this.crag.walls[wkey].routes[rkey].points[pkey].z
              );
              geometry.vertices.push(vertex);
            }
            var color;
            if (this.crag.walls[wkey].routes[rkey].style === "sport") {
              color = 0x0000ff;
            } else if (this.crag.walls[wkey].routes[rkey].style === "trad") {
              color = 0xff0000;
            } else {
              color = 0xffff00;
            }
            var material = new THREE.LineBasicMaterial({
              color: color
            });
            let line = new THREE.Line(geometry, material);
            line.layers.set(3);
            this.linesGroup.add(line);
          }
        }
      }
      this.scene.add(this.linesGroup);
    },
    annotate() {
      if (this.editing != "Location") return;
      this.currentPosition = this.intersection.point;

      // Number definition
      const x = 32;
      const y = 32;
      const radius = 30;
      const startAngle = 0;
      const endAngle = Math.PI * 2;

      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let numberTexture = new THREE.CanvasTexture(canvas);

      let spriteMaterial = new THREE.SpriteMaterial({
        map: numberTexture,
        alphaTest: 0.5,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        sizeAttenuation: true
      });

      ctx.canvas.width = 64;
      ctx.canvas.height = 64;

      ctx.clearRect(0, 0, 64, 64);

      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.fill();

      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.stroke();

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.font = "32px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(parseInt(this.activeRoute[1]) + 1, x, y);

      let sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(this.scaleFactor * 1.5, this.scaleFactor * 1.5, 1);
      sprite.position.copy(this.intersection.point);

      this.centerLoc.x = this.intersection.point.x.toFixed(6);
      this.centerLoc.y = this.intersection.point.y.toFixed(6);
      this.centerLoc.z = this.intersection.point.z.toFixed(6);

      this.$store.commit("editor/updateCenterLoc", this.centerLoc);

      sprite.layers.set(2);
      if (this.activeObject) {
        this.scene.remove(this.group);
        this.loadSprites();
      } else {
        if (this.activeSprite) {
          this.scene.remove(this.activeSprite);
        }
        this.activeSprite = sprite;
        this.scene.add(this.activeSprite);
      }
    },
    // Add Points for surface line
    addPoint() {
      if (this.editing != "Line" || this.lineEnd) return;

      const pLoc = {
        point: new THREE.Vector3(),
        normal: new THREE.Vector3()
      };
      pLoc.point.copy(this.intersection.point);
      pLoc.normal.copy(this.intersection.normal);
      pLoc.normal.transformDirection(this.mesh.matrixWorld);

      let p = new THREE.Vector3();
      p.addVectors(pLoc.point, pLoc.normal.multiplyScalar(0.1));
      this.inputPoints.push(p);
      if (this.inputPoints.length > 1) {
        let subPointDistance = 1;
        let v1 = this.inputPoints[this.inputPoints.length - 2];
        let v2 = this.inputPoints[this.inputPoints.length - 1];
        let totalDistance = v1.distanceTo(v2);
        let subPointLength = Math.floor(totalDistance / subPointDistance);
        let dir = new THREE.Vector3();
        dir.subVectors(v2, v1).normalize();
        let subPoints = [];
        let startPos = v1;
        for (let i = 0; i < subPointLength; i++) {
          let subPoint = new THREE.Vector3();
          subPoint.addVectors(startPos, dir.multiplyScalar(subPointDistance));
          subPoints.push(subPoint);
          startPos = subPoint;
        }

        let geometry = new THREE.Geometry();
        geometry.vertices.push(v1);

        let pLen = subPoints.length;
        let raycastPos = new THREE.Vector3();
        raycastPos.copy(this.camera.position);

        for (let i = 0; i < pLen; i++) {
          let raycastDir = new THREE.Vector3();
          raycastDir.subVectors(subPoints[i], raycastPos).normalize();

          let lineRaycaster = new THREE.Raycaster(raycastPos, raycastDir);
          let lineIntersects = lineRaycaster.intersectObject(this.mesh);

          if (lineIntersects.length > 0) {
            let surfLoc = {
              point: new THREE.Vector3(),
              normal: new THREE.Vector3()
            };
            surfLoc.point.copy(lineIntersects[0].point);
            surfLoc.normal.copy(lineIntersects[0].face.normal);
            surfLoc.normal.transformDirection(this.mesh.matrixWorld);

            let linePoint = new THREE.Vector3();
            linePoint.addVectors(
              surfLoc.point,
              surfLoc.normal.multiplyScalar(0.2)
            );
            geometry.vertices.push(linePoint);
          }
        }
        geometry.vertices.push(v2);

        var material = new THREE.LineBasicMaterial({
          color: "#40FF70",
          linewidth: 10
        });

        var line = new THREE.Line(geometry, material);

        let dist = line.computeLineDistances();
        console.log(
          dist.geometry.lineDistances[dist.geometry.lineDistances.length - 1]
        );

        line.scale.set(1, 1, 1);
        line.layers.set(3);
        this.lines.push(line);
        this.scene.add(line);
      }
    },
    removePoint() {
      this.inputPoints.pop();
      this.scene.remove(this.lines[this.lines.length - 1]);
      this.lines.pop();
    },
    async submitPoints() {
      //post points
      this.$store.commit("editor/updateLoading", true)

      try {
        let pitchId = this.selectedRoute.pitches[this.activePitch - 1].pitchId;
        let submitPoints = {
          newPoints: this.savePoints
        }
        let pointIds = await this.$axios.$put('/v1/pitches/' + pitchId + '/points', submitPoints);
      } catch (error){
        this.$store.commit("editor/updateLoading", false);
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 100000);
        this.$store.commit("snackbar/updateMessage", "failed to add line" + error.response.data.error.message);
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error);
      }

      //post pitch
      let pitch = _.cloneDeep(this.selectedRoute.pitches[this.activePitch - 1]);
      delete pitch.points;
      pitch.anchors = {
        x: this.savePoints[this.savePoints.length - 1].x,
        y: this.savePoints[this.savePoints.length - 1].y,
        z: this.savePoints[this.savePoints.length - 1].z
      };
      pitch.distance = this.lineDist;
      if (this.selectedRoute.style === "sport") {
        pitch.anchors.fixed = true;
      } else {
        pitch.anchors.fixed = false;
      }

      try {
        await this.$axios.$post("/v1/pitches", pitch);
      } catch (error) {
        this.$store.commit("editor/updateLoading", false)
        this.$store.commit("snackbar/updateType", "error");
        this.$store.commit("snackbar/updateTimeout", 100000);
        this.$store.commit("snackbar/updateMessage", "failed to add anchors" + error.response.data.error.message);
        this.$store.commit("snackbar/updateSnackbar", true);
        this.$store.commit("snackbar/updateLink", undefined);
        this.$store.commit("snackbar/updateLinkMessage", undefined);
        console.log(error.response.data.error);
      }
      this.$store.commit("editor/addPoints", this.savePoints);
      this.commitPoints();
    },
    async updateSelectedRoute() {
      try {
        let api = await this.$axios.$get(
          "/v1/routes/" + this.selectedRoute.routeId
        );
        let pitches = await this.$axios.$get(
          "/v1/routes/" + this.selectedRoute.routeId + "/pitches?ordered=true"
        );
        let route = api.data;
        route.points = [];
        route.pitches = pitches.data;
        for (let i in route.pitches) {
          let points = await this.$axios.$get(
            "/v1/pitches/" + route.pitches[i].pitchId + "/points?ordered=true"
          );
          route.pitches[i].points = points.data;
          route.points = route.points.concat(points.data);
        }
        console.log("route");
        console.log(route);
        this.$store.commit("editor/updateSelectedRoute", route);
        let crag = _.clone(this.crag);
        crag.walls[this.activeRoute[0]].routes[this.activeRoute[1]] = route;
        this.$store.commit("editor/updateCrag", crag);
        console.log("crag")
        console.log(this.crag)
      } catch (error) {
        console.log(error.message);
      }
    },
    onDocumentMouseMove(event) {
      event.preventDefault();
      let x, y;
      var topNav = document.getElementsByClassName("v-toolbar");
      var nav = topNav[0].clientHeight;

      if (event.changedTouches) {
        x = event.changedTouches[0].layerX;
        y = event.changedTouches[0].layerY;
      } else {
        x = event.layerX;
        y = event.layerY + nav;
      }

      this.mouse.x = (x / window.innerWidth) * 2 - 1;
      this.mouse.y = -(y / window.innerHeight) * 2 + 1;
    },
    checkMeshIntersection() {
      if (!this.mesh) return;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      let intersects = this.raycaster.intersectObjects([this.mesh]);
      if (intersects.length > 0) {
        let p = intersects[0].point;
        this.mouseHelper.position.copy(p);
        this.intersection.point.copy(p);
        let n = intersects[0].face.normal.clone();
        n.transformDirection(this.mesh.matrixWorld);
        n.multiplyScalar(10);
        n.add(intersects[0].point);
        this.intersection.normal.copy(intersects[0].face.normal);
        this.mouseHelper.lookAt(n);
        var positions = this.line.geometry.attributes.position;
        positions.setXYZ(0, p.x, p.y, p.z);
        positions.setXYZ(1, n.x, n.y, n.z);
        positions.needsUpdate = true;
        this.intersection.intersects = true;
      } else {
        this.intersection.intersects = false;
      }
    },
    // onDocumentTouchEnd: function(event) {
    //   event.preventDefault();
    //   if (this.selectedObject) {
    //     if (this.moved) return;
    //     if (this.activeObject != this.selectedObject) {
    //       this.selectedObject.material.color.set("#ffffff");
    //       this.selectedObject.scale.set(this.scaleFactor, this.scaleFactor, 1);
    //     }
    //     this.selectedObject = null;
    //   }
    //
    //   let intersects = this.getIntersects(
    //     event.changedTouches[0].clientX,
    //     event.changedTouches[0].clientY
    //   );
    //   if (intersects.length > 0) {
    //     let res = intersects.filter(function(res) {
    //       return res && res.object;
    //     })[0];
    //     if (res && res.object) {
    //       this.selectedObject = res.object;
    //       this.selectedPos = this.group.children.findIndex(
    //         x => x.id === this.selectedObject.id
    //       );
    //
    //       let newRoute = this.routePos[this.selectedPos];
    //       this.$store.commit("frame/updateActiveRoute", newRoute);
    //     } else {
    //       this.$store.commit("frame/updateActiveRoute", null);
    //     }
    //   }
    // },
    onDocumentMouseclick: function() {
      if (this.moved || this.loading) return;
      this.checkMeshIntersection();
      if (!this.moved && this.intersection.intersects) {
        this.annotate();
        this.addPoint();
      }
    },
    onDocumentDoubleClick() {
      if (this.moved) return;
      this.checkMeshIntersection();
      if (!this.moved && this.intersection.intersects) {
        this.setControlPoint(this.intersection.point);
      }
    },
    setControlPoint(input) {
      this.controls.target = input;
      this.controls.update();
    },
    // checkScaleDistance: function() {
    //   if (
    //     this.camera.position.distanceTo(this.camera.target).toFixed(0) >= 80 &&
    //     this.camera.position.distanceTo(this.camera.target).toFixed(0) <= 120
    //   ) {
    //     this.scaleFactor = 2;
    //   } else if (
    //     this.camera.position.distanceTo(this.camera.target).toFixed(0) > 120
    //   ) {
    //     this.scaleFactor = 3;
    //   } else {
    //     this.scaleFactor = 1;
    //   }
    // }
    checkAnnotationDistance: function() {
      if (this.group) {
        // if (
        //   this.camera.position.distanceTo(this.camera.target).toFixed(0) >=
        //     80 &&
        //   this.camera.position.distanceTo(this.camera.target).toFixed(0) <= 120
        // ) {
        //   this.scaleFactor = 2;
        // } else if (
        //   this.camera.position.distanceTo(this.camera.target).toFixed(0) > 120
        // ) {
        //   this.scaleFactor = 3;
        // } else {
        //   this.scaleFactor = 1;
        // }

        this.scaleFactor = 0.5;
        for (let skey in this.group.children) {
          if (
            this.group.children[skey] != this.selectedObject &&
            this.group.children[skey] != this.activeObject
          ) {
            this.group.children[skey].material.color.set("#ffffff");
            this.group.children[skey].scale.set(
              this.scaleFactor,
              this.scaleFactor,
              1
            );
          } else {
            this.group.children[skey].scale.set(
              this.scaleFactor * 1.5,
              this.scaleFactor * 1.5,
              1
            );
          }
        }
      }
    },
    createScale() {
      var canvas = document.getElementById("number");
      var x = 16;
      var y = 16;
      var radius = 15;
      var startAngle = 0;
      var endAngle = Math.PI * 2;

      var ctx = canvas.getContext("2d");

      //circle
      ctx.clearRect(0, 0, 36, 32);

      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.fill();

      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(32, 0);
      ctx.lineTo(36, 0);
      ctx.lineTo(36, 32);
      ctx.lineTo(32, 32);
      ctx.stroke();

      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.font = 16 + "px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("x", x, y);
    },
    commitPoints() {
      let anchor = {
        x: this.savePoints[this.savePoints.length - 1].x,
        y: this.savePoints[this.savePoints.length - 1].y,
        z: this.savePoints[this.savePoints.length - 1].z
      };
      if (this.selectedRoute.style === "sport") {
        anchor.fixed = true;
      } else {
        anchor.fixed = false;
      }
      this.$store.commit("editor/addAnchors", anchor);
      this.$store.commit("editor/addDistance", this.lineDist);

      this.scene.remove(this.anchorsGroup);
      this.loadAnchors();

      for (let i in this.lines) {
        this.scene.remove(this.lines[i]);
      }
      this.lines = [];
      this.$store.commit("editor/updateLoading", false)
    },
    setPoints() {
      let points = [];
      let distances = [];
      for (let i in this.selectedRoute.pitches) {
        if (this.selectedRoute.pitches[i].points) {
          points[i] = this.selectedRoute.pitches[i].points;
        }
        if (this.selectedRoute.pitches[i].distance) {
          distances.push(this.selectedRoute.pitches[i].distance);
        }
      }
      this.$store.commit("editor/updatePoints", points);
      this.$store.commit("editor/updateDistances", distances);
    },
    setActivePitch() {
      let pitch = 1;
      for (let i in this.selectedRoute.pitches) {
        if (!this.storePoints[i]) {
          pitch = parseInt(i) + 1;
          if (i != 0) {
            let lastPoint = this.storePoints[parseInt(i) - 1][
              this.storePoints[parseInt(i) - 1].length - 1
            ];
            let point = new THREE.Vector3(
              lastPoint.x,
              lastPoint.y,
              lastPoint.z
            );
            this.inputPoints = [];
            this.inputPoints.push(point);
          } else {
            this.inputPoints = [];
          }
          this.lineEnd = false;
          break;
        } else if (i == this.selectedRoute.pitches.length - 1) {
          pitch = parseInt(i) + 1;
          this.inputPoints = [];
          this.lineEnd = true;
        }
      }
      this.$store.commit("editor/updateActivePitch", pitch);
    },
    addPitchLine() {
      console.log("adding pitch line");
      if (this.activeLine) {
        this.scene.remove(this.activeLine);
      }
      let geometry = new THREE.Geometry();
      for (let i in this.storePoints) {
        for (let pkey in this.storePoints[i]) {
          let vertex = new THREE.Vector3(
            this.storePoints[i][pkey].x,
            this.storePoints[i][pkey].y,
            this.storePoints[i][pkey].z
          );
          geometry.vertices.push(vertex);
        }
      }

      var color;
      if (this.selectedRoute.style === "sport") {
        color = 0x0000ff;
      } else if (this.selectedRoute.style === "trad") {
        color = 0xff0000;
      } else {
        color = 0xffff00;
      }
      var material = new THREE.LineBasicMaterial({
        color: color
      });
      this.activeLine = new THREE.Line(geometry, material);
      this.activeLine.layers.set(3);
      this.scene.add(this.activeLine);
    }
  },
  mounted() {
    this.$store.commit(
      "editor/updateSelectedRoute",
      this.crag.walls[this.activeRoute[0]].routes[this.activeRoute[1]]
    );
    this.init();
    this.animate();
    this.createScale();
  },
  deactivated() {
    this.scene.remove(this.activeSprite);
    this.scene.remove(this.group);
    this.scene.remove(this.anchorsGroup);
    this.scene.remove(this.activeLine);
    this.scene.remove(this.linesGroup);
    this.routePos = [];
    this.currentPosition = null;
    this.play = false;
    this.lineEnd = false;
    this.savePoints = [];
    this.$store.commit("editor/updateAnchors", []);
    this.$store.commit("editor/updatePoints", []);
    this.$store.commit("editor/updateDistances", []);
    this.$store.commit("editor/updateCenterLoc", {
      x: undefined,
      y: undefined,
      z: undefined
    });
  },
  activated() {
    this.$store.commit(
      "editor/updateSelectedRoute",
      this.crag.walls[this.activeRoute[0]].routes[this.activeRoute[1]]
    );
    this.setPoints();
    this.setAnchors();
    this.loadSprites();
    this.loadLines();
    this.play = true;
    this.animate();
  }
};
</script>

<style scoped>
#container {
  width: 100%;
  box-sizing: border-box;
}
#distance {
  position: absolute;
  bottom: 10px;
  color: #ffffff;
  left: 25px;
}
#north {
  position: absolute;
  top: 25px;
  color: #ffffff;
  left: 25px;
}
#scale {
  position: absolute;
  top: 130px;
  color: #ffffff;
  left: 65px;
}
#number {
  position: absolute;
  top: 125px;
  color: #ffffff;
  left: 25px;
}
/* .annotation {
  position: absolute;
  top: 0px;
  left: -500px;
  color: #ffffff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid white;
  border-radius: 5px;
  padding: 5px;
}
.route-info {
  position: absolute;
  bottom: 0px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
} */
.loading-info {
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: #ffffff;
}
.undo-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.save-btn {
  position: absolute;
  top: 60px;
  right: 10px;
}
</style>
