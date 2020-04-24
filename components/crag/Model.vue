<template>
  <div id="viewer">
    <v-icon
      @click="setFullscreen()"
      v-if="!fullscreenView"
      class="fullscreen-btn"
      color="rgba(255,255,255,0.7)"
      >fa-expand-arrows-alt</v-icon
    >
    <v-icon
      v-if="fullscreenView"
      @click="removeFullscreen()"
      class="fullscreen-btn"
      color="rgba(255,255,255,0.7)"
      >fa-compress-arrows-alt</v-icon
    >
    <v-icon
      v-if="routeShow"
      @click="hideRoutes()"
      class="route-btn"
      color="rgba(255,255,255,0.7)"
      >far fa-eye</v-icon
    >
    <v-icon
      v-if="!routeShow"
      @click="showRoutes()"
      class="route-btn"
      color="rgba(255,255,255,0.7)"
      >far fa-eye-slash</v-icon
    >
    <v-icon
      @click.stop="dialog = true"
      class="help-btn"
      color="rgba(255,255,255,0.7)"
      >fas fa-question-circle</v-icon
    >
    <v-icon
      v-if="camMoved"
      @click="resetCam()"
      class="viewer-btn"
      color="rgba(255,255,255,0.7)"
      >fa-undo</v-icon
    >
    <v-icon
      v-if="dev"
      class="lose-ctx-btn"
      @click="loseContext()"
      >fa-sad-tear</v-icon>
      <v-dialog
        v-model="dialog"
        max-width="500"
      >
      <v-card>
        <v-img :src="require('@/static/help.webp')">
        </v-img>
      </v-card>
      </v-dialog>
    <div id="container"></div>
    <div id="north">
      <p>N</p>
    </div>
    <canvas id="number" width="36" height="32"></canvas>
    <div id="scale">
      <p>{{ scaleSize }} m ({{ scaleSizeFt }} ft)</p>
    </div>
    <div
      class="annotation"
      id="annotationElement"
      v-if="selectedObject && routeShow"
    >
      {{
        crag.walls[routePos[selectedPos].wall].routes[
          routePos[selectedPos].route
        ].name
      }}
      <span
        v-if="
          crag.walls[routePos[selectedPos].wall].routes[
            routePos[selectedPos].route
          ].style === 'boulder'
        "
        >V</span
      >
      <span v-else> 5.</span>
      {{
        crag.walls[routePos[selectedPos].wall].routes[
          routePos[selectedPos].route
        ].grade
      }}{{
        crag.walls[routePos[selectedPos].wall].routes[
          routePos[selectedPos].route
        ].gradeModifier
      }}
      {{
        crag.walls[routePos[selectedPos].wall].routes[
          routePos[selectedPos].route
        ].style
      }}
      <span
        v-if="
          crag.walls[routePos[selectedPos].wall].routes[
            routePos[selectedPos].route
          ].pitches.length > 1
        "
      >
        {{
          crag.walls[routePos[selectedPos].wall].routes[
            routePos[selectedPos].route
          ].pitches.length
        }}
        pitches
      </span>
    </div>
    <v-sheet row class="route-info" id="routeInfo" v-if="activeRoute">
      <v-card-text>
        <p>
          {{ crag.walls[activeRoute.wall].routes[activeRoute.route].name }}
          <span
            v-if="
              crag.walls[activeRoute.wall].routes[activeRoute.route].style ===
                'boulder'
            "
            >V</span
          ><span
            v-if="
              crag.walls[activeRoute.wall].routes[activeRoute.route].style ===
                'trad' ||
                crag.walls[activeRoute.wall].routes[activeRoute.route].style ===
                  'sport'
            "
            >5.</span
          >{{ crag.walls[activeRoute.wall].routes[activeRoute.route].grade
          }}{{
            crag.walls[activeRoute.wall].routes[activeRoute.route].gradeModifier
          }}
          {{ crag.walls[activeRoute.wall].routes[activeRoute.route].style }}
          {{
            crag.walls[activeRoute.wall].routes[activeRoute.route].protection
          }}
          <span
            v-if="
              crag.walls[activeRoute.wall].routes[activeRoute.route].pitches
                .length > 1
            "
          >
            {{
              crag.walls[activeRoute.wall].routes[activeRoute.route].pitches
                .length
            }}
            pitches
          </span>
        </p>
        <p
          v-if="
            crag.walls[activeRoute.wall].routes[activeRoute.route].description
          "
        >
          {{
            crag.walls[activeRoute.wall].routes[activeRoute.route].description.substring(0,200)
          }}
          <span v-if="crag.walls[activeRoute.wall].routes[activeRoute.route].description.length > 200">...</span>
        </p>

        <p></p>
        <p
        v-if="
          crag.walls[activeRoute.wall].routes[activeRoute.route].pitches
            .length === 1
        "
        >
          <!-- <span
            v-if="
              crag.walls[activeRoute.wall].routes[activeRoute.route].pitches
                .length > 1
            "
          >
            P{{ pi + 1 }}:
          </span> -->
          {{
            crag.walls[activeRoute.wall].routes[activeRoute.route].pitches[0]
              .description.substring(0,200)
          }}
          <span
            v-if="
              crag.walls[activeRoute.wall].routes[activeRoute.route].pitches[0]
                .description.length > 200
            "
          >
            ...
          </span>
        </p>
      </v-card-text>
    </v-sheet>
    <v-sheet row v-if="!mesh" class="loading-info">
      <V-container>
      <p>Loading Model</p>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-container>
    </v-sheet>

  </div>
</template>

<script>
import * as THREE from "three";
import WebGLDebugUtil from "webgl-debug";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';
import { mapGetters } from "vuex";
// import DecalGeometry from 'three-decal-geometry'

export default {
  name: "model",
  data() {
    return {
      dialog: false,
      camera: null,
      routeShow: true,
      currentRoute: this.activeRoute,
      camera2: null,
      scene: null,
      renderer: null,
      mesh: null,
      lowMesh: null,
      simplified: null,
      north: null,
      insetHeight: null,
      insetWidth: null,
      camDistance: null,
      decals: [],
      group: null,
      groupColors: ["#ffffff", "#FFFF33", "#FF9933", "#FF99FF", "#FF9999"],
      moved: false,
      selectedObject: null,
      raycaster: null,
      mouseVector: null,
      routePos: [],
      selectedPos: null,
      play: true,
      scaleFactor: null,
      fullscreenView: false,
      linesGroup: null,
      camMoved: false,
      activeLine: null,
      lastActive: undefined,
      lastActiveObject: undefined,
      controlsTarget: new THREE.Vector3(),
      intersection: {
        intersects: false,
        point: new THREE.Vector3(),
        normal: new THREE.Vector3()
      },
      mouseHelper: undefined,
      timeout: undefined,
      lastTap: 0,
      animateId: undefined
    };
  },
  watch: {
    crag: {
      handler() {
        this.scene.remove(this.group);
        this.routePos = [];
        this.loadSprites();
        this.scene.remove(this.linesGroup);
        this.loadLines();
        // this.removeDecals()
        // this.loadDecals()
      },
      deep: true
    },
    mesh: {
      handler() {
        if (this.mesh && !this.fromStore) {
          this.scene.remove(this.lowMesh);
        }
      }
    },
    activeRoute: {
      handler() {
        if (this.activeRoute) {
          let controlPoint = new THREE.Vector3(
            this.crag.walls[this.activeRoute.wall].routes[
              this.activeRoute.route
            ].center.x,
            this.crag.walls[this.activeRoute.wall].routes[
              this.activeRoute.route
            ].center.y,
            this.crag.walls[this.activeRoute.wall].routes[
              this.activeRoute.route
            ].center.z
          );
          this.setControlPoint(controlPoint);
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      crag: "filter/crag"
    }),
    pointsLoaded() {
      return this.$store.state.filter.pointsLoaded;
    },
    // for setting bounds on camera - too heavy currently
    // cameraBounds() {
    //   if (this.mesh) {
    //     var bbox = new THREE.Box3().setFromObject(this.mesh);
    //     return bbox;
    //   }
    // },
    // inBounds() {
    //   if (this.cameraBounds) {
    //     if (
    //       this.controls.target.x < this.cameraBounds.max.x &&
    //       this.controls.target.y < this.cameraBounds.max.y &&
    //       this.controls.target.z < this.cameraBounds.max.z &&
    //       this.controls.target.x > this.cameraBounds.min.x &&
    //       this.controls.target.y > this.cameraBounds.min.y &&
    //       this.controls.target.z > this.cameraBounds.min.z
    //     ) {
    //       this.lastTarget.copy(this.controls.target)
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // },
    meshScale() {
      return this.$store.state.filter.cragState.model.scale;
    },
    activeRoute() {
      return this.$store.state.frame.activeRoute;
    },
    cragId() {
      return this.$store.state.filter.cragState.cragId;
    },
    loadedModels() {
      return this.$store.state.model.loadedModels;
    },
    activeObject() {
      if (this.group) {
        if (this.activeRoute) {
          for (let key in this.routePos) {
            if (
              this.routePos[key].wall == this.activeRoute.wall &&
              this.routePos[key].route == this.activeRoute.route
            ) {
              if (this.lastActive) {
                this.lastActiveObject.material.color.set(
                  this.groupColors[this.lastActive.wall]
                );
              }
              let activeObject = this.group.children[key];
              this.lastActiveObject = activeObject;
              this.lastActive = this.activeRoute;
              activeObject.scale.set(
                this.scaleFactor * 1.5,
                this.scaleFactor * 1.5,
                1
              );
              activeObject.material.color.set("#40FF70");

              if (
                this.activeLine &&
                this.activeLine !== this.linesGroup.children[key]
              ) {
                if (
                  this.crag.walls[this.activeRoute.wall].routes[
                    this.activeRoute.route
                  ].style === "sport"
                ) {
                  this.activeLine.material.color.set("#0000ff");
                } else if (
                  this.crag.walls[this.activeRoute.wall].routes[
                    this.activeRoute.route
                  ].style === "trad"
                ) {
                  this.activeLine.material.color.set("#ff0000");
                } else {
                  this.activeLine.material.color.set("#ffff00");
                }
              }
              this.activeLine = this.linesGroup.children[key];
              this.activeLine.material.color.set("#40FF70");

              this.loadAnchors();
              return activeObject;
            }
          }
        } else {
          this.scene.remove(this.anchorsGroup);
          if (this.lastActive) {
            this.lastActiveObject.material.color.set(
              this.groupColors[this.lastActive.wall]
            );
            if (
              this.crag.walls[this.lastActive.wall].routes[
                this.lastActive.route
              ].style === "sport"
            ) {
              this.activeLine.material.color.set("#0000ff");
            } else if (
              this.crag.walls[this.lastActive.wall].routes[
                this.lastActive.route
              ].style === "trad"
            ) {
              this.activeLine.material.color.set("#ff0000");
            } else {
              this.activeLine.material.color.set("#ffff00");
            }
            this.lastActive = undefined;
            this.lastActiveObject = undefined;
            this.activeLine = undefined;
          }
          return null;
        }
      }
    },
    scaleSize() {
      if (this.scaleFactor) {
        return (this.scaleFactor / this.meshScale).toFixed(1);
      }
    },
    scaleSizeFt() {
      return (this.scaleSize * 3.28).toFixed(1);
    },
    dev() {
      if (process.env.NODE_ENV === 'development') {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    init: function() {
      let container = document.getElementById("container");

      this.scene = new THREE.Scene();
      this.origin = new THREE.Vector3();

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

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.gammaOutput = true;
      this.renderer.gammaFactor = 2.2;
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 0;
      this.controls.maxDistance = 200;
      this.lastTarget = new THREE.Vector3();

      // set based on model
      if (this.crag.crag.model.azimuth) {
        this.controls.minAzimuthAngle = this.crag.crag.model.azimuth.minimum;
        this.controls.maxAzimuthAngle = this.crag.crag.model.azimuth.maximum;
      }

      this.controls.maxPolarAngle = (Math.PI * 3) / 4;
      this.controls.screenSpacePanning = true;

      this.controls2 = new OrbitControls(
        this.camera2,
        this.renderer.domElement
      );

      if (this.crag.crag.model.azimuth) {
        this.controls2.minAzimuthAngle = this.controls.minAzimuthAngle;
        this.controls2.maxAzimuthAngle = this.controls.maxAzimuthAngle;
      }

      this.controls2.maxPolarAngle = this.controls.maxPolarAngle;
      this.controls2.enablePan = false;
      this.controls2.enableZoom = false;

      this.scene.add(
        new THREE.AmbientLight(0xffffff, this.crag.crag.model.light)
      );

      // for raycasting
      let geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      this.raycaster = new THREE.Raycaster();

      this.mouseHelper = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 10),
        new THREE.MeshNormalMaterial()
      );
      this.mouseHelper.visible = false;
      this.scene.add(this.mouseHelper);

      this.line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ linewidth: 4 })
      );
      this.loadModel();
      this.loadNorth();
      this.raycaster = new THREE.Raycaster();
      this.mouseVector = new THREE.Vector2();

      window.addEventListener("resize", this.onWindowResize, false);
      container.addEventListener("mousemove", this.onDocumentMouseMove, false);
      container.addEventListener("mouseup", this.onDocumentMouseclick, false);
      container.addEventListener("dblclick", this.onDocumentDoubleClick, false);
      document.addEventListener("visibilitychange", this.onDocumentVisibilityChange);
      let ctx = this.renderer.getContext();
      ctx.canvas.addEventListener(
        "webglcontextlost",
        this.onContextLost,
        false
      );

      ctx.canvas.addEventListener(
        "webglcontextrestored",
        this.onContextRestored,
        false
      );
      window.addEventListener("mousedown", () => {
        this.moved = false;
      });
      window.addEventListener("touchstart", () => {
        this.moved = false;
      });
      container.addEventListener("touchend", this.onDocumentTouchEnd, false);
      this.controls.addEventListener("change", () => {
        this.moved = true;
        this.camMoved = true;
        // if (this.inBounds == false){
        //   this.controls.enabled = false;
        //   this.controls.target.copy(this.lastTarget);
        //   this.controls.enabled = true;
        // }
      });
      document.addEventListener("fullscreenchange", () => {
        const element = document.fullscreenElement;
        if (!element) {
          this.fullscreenView = false;
        }
      });
    },
    animate: function() {
      if (this.play) {
        this.animationId = requestAnimationFrame(this.animate);

        this.renderer.setClearColor(0x2222222, 1);
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);

        this.camDistance =
          this.camera.position.distanceTo(this.origin).toFixed(0) + " ft";
        // document.getElementById("camera-distance").innerHTML = this.camDistance;

        this.checkAnnotationDistance();
        if (this.moved) {
          // this.checkAnnotationOpacity();
        }

        // inset scene

        this.renderer.setClearColor(0x0000000, 1);
        this.renderer.clearDepth(); // important!
        this.renderer.setScissorTest(true);
        if (this.fullscreenView) {
          this.renderer.setScissor(
            20,
            window.innerHeight - this.insetHeight - 20,
            this.insetWidth,
            this.insetHeight
          );
          this.renderer.setViewport(
            20,
            window.innerHeight - this.insetHeight - 20,
            this.insetWidth,
            this.insetHeight
          );
        } else {
          this.renderer.setScissor(
            20,
            window.innerHeight - this.insetHeight - this.navHeight - 20,
            // 20,
            this.insetWidth,
            this.insetHeight
          );
          this.renderer.setViewport(
            20,
            window.innerHeight - this.insetHeight - this.navHeight - 20,
            // 20,
            this.insetWidth,
            this.insetHeight
          );
        }
        this.renderer.render(this.scene, this.camera2);
        this.renderer.setScissorTest(false);
      }
    },
    onContextLost(event) {
      event.preventDefault();
      console.log("context lost");
      this.play=false;
      // animationID would have been set by your call to requestAnimationFrame
      cancelRequestAnimationFrame(this.animationId);
      // refresh page
      location.reload(true)
    },
    onContextRestored(event) {
      console.log("context restored")
      //this should restore the renderer and animation
    },
    getNavHeight() {
      var topNav = document.getElementsByClassName("v-app-bar");
      var botNav = document.getElementsByClassName("v-bottom-navigation");
      if (window.innerWidth < 960) {
        var nav = topNav[0].clientHeight + 56;
      } else {
        var nav = topNav[0].clientHeight + 58;
      }
      this.navHeight = nav;
    },
    onWindowResize: function() {
      if (this.play) {
        this.getNavHeight();
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        if (this.fullscreenTrigger) {
          setTimeout(() => {
            this.fullscreenTrigger = false;
          }, 1000);

          this.renderer.setSize(window.innerWidth, window.innerHeight);
        } else {
          this.renderer.setSize(
            window.innerWidth,
            window.innerHeight - this.navHeight
          );
        }
        this.insetWidth = window.innerHeight / 9; // square
        this.insetHeight = window.innerHeight / 9;

        this.camera2.aspect = this.insetWidth / this.insetHeight;
        this.camera2.updateProjectionMatrix();
      }
    },
    checkModel() {
      for (let i in this.loadedModels) {
        if (this.loadedModels[i].name === this.cragId) {
          this.fromStore = true;
          this.modelIndex = i;
          break;
        }
      }
    },

    async loadModel() {
      const loader = new GLTFLoader();

      // await this.checkModel();

      // if (this.fromStore) {
      //   let objectURL = URL.createObjectURL(
      //     this.loadedModels[this.modelIndex].model.data
      //   );
      //   loader.load(objectURL, gltf => {
      //     this.mesh = gltf.scene.children[0];
      //     this.mesh.layers.set(1);
      //     this.mesh.scale.set(this.meshScale, this.meshScale, this.meshScale);
      //     this.mesh.rotateY(this.crag.crag.model.modelAngle);
      //     this.scene.add(this.mesh);
      //   });
      // } else {
        loader.load(this.crag.crag.model.lowResModelLocation, gltf => {
          this.lowMesh = gltf.scene.children[0];
          this.lowMesh.layers.set(1);
          this.lowMesh.scale.set(
            this.meshScale,
            this.meshScale,
            this.meshScale
          );
          this.lowMesh.rotateY(this.crag.crag.model.modelAngle);
          this.scene.add(this.lowMesh);
          let modifier = new SimplifyModifier();
          this.simplified = this.lowMesh.clone();
          let count = Math.floor( this.simplified.geometry.attributes.position.count * 0.4 )
          this.simplified.geometry = modifier.modify( this.simplified.geometry, count );
          this.simplified.material.side = THREE.DoubleSide;
          this.simplified.scale.set(this.meshScale* 0.95, this.meshScale* 0.95, this.meshScale* 0.95)
          this.simplified.layers.set(11)

          this.scene.add(this.simplified);
          // this.loadDecals()
        });

        // let blob = await this.$axios({
        //   method: "get",
        //   url: this.crag.crag.model.modelLocation,
        //   responseType: "blob"
        // });
        // let objectURL = URL.createObjectURL(blob.data);

        loader.load(this.crag.crag.model.modelLocation, gltf => {
          this.mesh = gltf.scene.children[0];
          this.mesh.layers.set(1);
          this.mesh.scale.set(this.meshScale, this.meshScale, this.meshScale);
          this.mesh.rotateY(this.crag.crag.model.modelAngle);
          this.scene.add(this.mesh);
        });
      //   let model = {
      //     model: blob,
      //     name: this.cragId
      //   };
      //   this.$store.commit("model/updateLoadedModels", model);
      // }
    },
    loadNorth() {
      let loader = new GLTFLoader();
      loader.load(
        "https://s3-us-west-2.amazonaws.com/models-172776452117-us-west-2/north.glb",
        gltf => {
          this.north = gltf.scene.children[0];
          this.north.scale.set(5, 5, 5);
          let northAngle = this.crag.crag.model.modelAngle + Math.PI;
          this.north.rotateY(northAngle);
          this.north.layers.set(10);
          this.scene.add(this.north);
        },
        error => {
          console.log(error);
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
        for (let rkey in this.crag.walls[wkey].routes) {
          let pos = { wall: parseInt(wkey), route: parseInt(rkey) };
          this.routePos.push(pos);
          if (this.crag.walls[wkey].routes[rkey].center) {
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
            ctx.fillText(this.crag.walls[wkey].routes[rkey].routeNum, x, y);

            let sprite = new THREE.Sprite(spriteMaterial);
            sprite.material.color.set(this.groupColors[wkey]);
            sprite.scale.set(1, 1, 1);
            sprite.position.set(
              this.crag.walls[wkey].routes[rkey].center.x,
              this.crag.walls[wkey].routes[rkey].center.y,
              this.crag.walls[wkey].routes[rkey].center.z
            );
            sprite.layers.set(2);

            this.group.add(sprite);
          } else {
            let sprite = new THREE.Sprite();
            sprite.visible = false;
            this.group.add(sprite);
          }
        }
      }
      this.scene.add(this.group);
    },
    loadLines() {
      this.linesGroup = new THREE.Group();
      for (let wkey in this.crag.walls) {
        for (let rkey in this.crag.walls[wkey].routes) {
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
          // let dist = line.computeLineDistances();
          // console.log(
          //   dist.geometry.lineDistances[dist.geometry.lineDistances.length - 1]
          // );
          line.layers.set(2);
          this.linesGroup.add(line);
        }
      }
      this.scene.add(this.linesGroup);
    },
    loadAnchors: function() {
      this.scene.remove(this.anchorsGroup);
      if (!this.activeRoute) return;
      this.anchorsGroup = new THREE.Group();
      const x = 32;
      const y = 32;
      const radius = 30;
      const startAngle = 0;
      const endAngle = Math.PI * 2;

      for (let pkey in this.crag.walls[this.activeRoute.wall].routes[
        this.activeRoute.route
      ].pitches) {
        if (
          this.crag.walls[this.activeRoute.wall].routes[this.activeRoute.route]
            .pitches[pkey].anchors
        ) {
          let anchors = this.crag.walls[this.activeRoute.wall].routes[
            this.activeRoute.route
          ].pitches[pkey].anchors;
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
          if (anchors.fixed) {
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
          sprite.position.set(anchors.x, anchors.y, anchors.z);
          // }
          sprite.layers.set(2);

          this.anchorsGroup.add(sprite);
        }
      }
      this.scene.add(this.anchorsGroup);
    },
    // loadDecals: function () {
    //   for (let wkey in this.crag.walls) {
    //     for (let rkey in this.crag.walls[wkey].routes) {
    //       if (this.crag.walls[wkey].routes[rkey].decals &&
    //         ((this.crag.walls[wkey].routes[rkey].style === 'trad' && this.filter.trad && this.crag.walls[wkey].routes[rkey].grade >= this.filter.yds_grade[0] && this.crag.walls[wkey].routes[rkey].grade <= this.filter.yds_grade[1]) ||
    //         (this.crag.walls[wkey].routes[rkey].style === 'sport' && this.filter.sport && this.crag.walls[wkey].routes[rkey].grade >= this.filter.yds_grade[0] && this.crag.walls[wkey].routes[rkey].grade <= this.filter.yds_grade[1]) ||
    //         (this.crag.walls[wkey].routes[rkey].style === 'boulder' && this.filter.boulder && this.crag.walls[wkey].routes[rkey].grade >= this.filter.uiaa_grade[0] && this.crag.walls[wkey].routes[rkey].grade <= this.filter.uiaa_grade[1]))) {
    //         for (let dkey in this.crag.walls[wkey].routes[rkey].decals) {
    //           let textureLoader = new THREE.TextureLoader()
    //           let decalDiffuse = textureLoader.load(require('@/static/decal/decal-diffuse.png'))
    //           let decalMaterial = new THREE.MeshPhongMaterial({
    //             specular: 0x444444,
    //             map: decalDiffuse,
    //             shininess: 30,
    //             transparent: true,
    //             depthTest: true,
    //             depthWrite: false,
    //             polygonOffset: true,
    //             polygonOffsetFactor: -4,
    //             wireframe: false
    //           })
    //           let orientation = new THREE.Euler(this.crag.walls[wkey].routes[rkey].decals[dkey].orientation.x, this.crag.walls[wkey].routes[rkey].decals[dkey].orientation.y, this.crag.walls[wkey].routes[rkey].decals[dkey].orientation.z, 'XYZ')
    //           let position = new THREE.Vector3(this.crag.walls[wkey].routes[rkey].decals[dkey].position.x, this.crag.walls[wkey].routes[rkey].decals[dkey].position.y, this.crag.walls[wkey].routes[rkey].decals[dkey].position.z)
    //           let size = new THREE.Vector3(5, 5, 5)
    //           let material = decalMaterial.clone()
    //           material.color.setHex(Math.random() * 0xffffff) // based on type
    //           // console.log(material)
    //           // console.log(this.mesh)
    //           // console.log(position)
    //           // console.log(orientation)
    //           // console.log(size)
    //           // let geometry = new DecalGeometry(this.mesh, position, orientation, size)
    //           // console.log(geometry)
    //           // let m = new THREE.Mesh(geometry, material)
    //           // m.layers.set(3)
    //           // this.decals.push(m)
    //           // this.scene.add(m)
    //         }
    //       }
    //     }
    //   }
    // },
    // removeSprites: function () {
    //   for (let key in this.group.children) {
    //     this.scene.remove(this.group)
    //   }
    // },
    // removeDecals: function () {
    //   for (let key in this.decals) {
    //     this.scene.remove(this.decals[key])
    //   }
    //   this.decals = []
    // },
    onDocumentMouseMove: function(event) {
      event.preventDefault();
      if (this.selectedObject) {
        if (this.activeObject != this.selectedObject) {
          // this.selectedObject.material.color.set("#ffffff");
          this.selectedObject.scale.set(this.scaleFactor, this.scaleFactor, 1);
        }
        this.selectedObject = null;
      }
      let intersects;
      var topNav = document.getElementsByClassName("v-app-bar");
      var nav = topNav[0].clientHeight;
      if (this.fullscreenView) {
        intersects = this.getIntersects(event.layerX, event.layerY);
      } else {
        intersects = this.getIntersects(event.layerX, event.layerY + this.navHeight);
      }
      if (intersects.length > 0) {
        let res = intersects.filter(function(res) {
          return res && res.object;
        })[0];
        if (res && res.object) {
          this.selectedObject = res.object;
          this.selectedObject.scale.set(
            this.scaleFactor * 1.5,
            this.scaleFactor * 1.5,
            1
          );
          this.selectedPos = this.group.children.findIndex(
            x => x.id === this.selectedObject.id
          );

          let vector = this.selectedObject.position.clone();
          let canvas = this.renderer.domElement;
          vector.project(this.camera);

          vector.x = Math.round((0.5 + vector.x / 2) * canvas.width);
          vector.y = Math.round((0.5 - vector.y / 2) * canvas.height);
          if (document.querySelector(".annotation")) {
            let annotation = document.querySelector(".annotation");
            let annotationElement = document.getElementById(
              "annotationElement"
            );
            if (canvas.width - vector.x > annotationElement.clientWidth) {
              annotation.style.top = vector.y + "px";
              annotation.style.left = vector.x + 35 + "px";
            } else {
              annotation.style.top = vector.y + "px";
              annotation.style.left =
                vector.x - annotationElement.clientWidth - 35 + "px";
            }
          }
        }
      }
    },
    getIntersects: function(x, y) {
      x = (x / window.innerWidth) * 2 - 1;
      y = -(y / window.innerHeight) * 2 + 1;
      this.mouseVector.set(x, y);
      this.raycaster.setFromCamera(this.mouseVector, this.camera);
      return this.raycaster.intersectObject(this.group, true);
    },
    checkMeshIntersection() {
      if (!this.mesh) return;
      this.raycaster.setFromCamera(this.mouseVector, this.camera);
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
    onDocumentTouchEnd: function(event) {
      event.preventDefault();
      //check double-tap
      let currentTime = new Date().getTime();
      var tapLength = currentTime - this.lastTap;
      clearTimeout(this.timeout);
      if (tapLength < 200 && tapLength > 0) {
        if (this.moved) return;
        this.checkMeshIntersection();
        if (!this.moved && this.intersection.intersects) {
          this.setControlPoint(this.intersection.point);
        }
      } else {
        //check sprite intersection
        if (this.selectedObject) {
          if (this.moved) return;
          if (this.activeObject != this.selectedObject) {
            // this.selectedObject.material.color.set("#ffffff");
            this.selectedObject.scale.set(
              this.scaleFactor,
              this.scaleFactor,
              1
            );
          }
          this.selectedObject = null;
        }
        let intersects;
        var topNav = document.getElementsByClassName("v-app-bar");
        var nav = topNav[0].clientHeight;
        if (this.fullscreenView) {
          intersects = this.getIntersects(
            event.changedTouches[0].clientX,
            event.changedTouches[0].clientY
          );
        } else {
          intersects = this.getIntersects(
            event.changedTouches[0].clientX,
            event.changedTouches[0].clientY + nav
          );
        }
        if (intersects.length > 0) {
          let res = intersects.filter(function(res) {
            return res && res.object;
          })[0];
          if (res && res.object) {
            this.selectedObject = res.object;
            this.selectedPos = this.group.children.findIndex(
              x => x.id === this.selectedObject.id
            );

            let newRoute = this.routePos[this.selectedPos];
            this.$store.commit("frame/updateActiveRoute", newRoute);
          }
        } else {
          this.$store.commit("frame/updateActiveRoute", null);
        }
        this.timeout = setTimeout(function() {
          clearTimeout(this.timeout);
        }, 200);
      }
      this.lastTap = currentTime;
    },
    onDocumentVisibilityChange() {
      if (document.visibilityState === 'hidden') {
          this.play = false;
        } else {
          this.play = true;
        }
    },
    onDocumentMouseclick: function() {
      if (this.moved) return;
      if (this.selectedObject) {
        let newRoute = this.routePos[this.selectedPos];
        this.$store.commit("frame/updateActiveRoute", newRoute);
      } else {
        this.$store.commit("frame/updateActiveRoute", null);
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
    checkAnnotationDistance: function() {
      if (this.group) {
        if (
          this.camera.position.distanceTo(this.controls.target).toFixed(0) > 90
        ) {
          this.scaleFactor = 3;
        } else if (
          this.camera.position.distanceTo(this.controls.target).toFixed(0) > 60
        ) {
          this.scaleFactor = 2;
        } else if (
          this.camera.position.distanceTo(this.controls.target).toFixed(0) > 30
        ) {
          this.scaleFactor = 1;
        } else {
          this.scaleFactor = 0.5;
        }
        for (let skey in this.group.children) {
          if (
            this.group.children[skey] != this.selectedObject &&
            this.group.children[skey] != this.activeObject
          ) {
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
        if (this.anchorsGroup) {
          for (let key in this.anchorsGroup.children) {
            this.anchorsGroup.children[key].scale.set(
              this.scaleFactor,
              this.scaleFactor,
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
    checkAnnotationOpacity() {
      if (!this.mesh || !this.group) return;
      let raycastPos = new THREE.Vector3();
      let cameraPos = new THREE.Vector3();
      let raycastDir = new THREE.Vector3();
      let annotationRaycaster = new THREE.Raycaster();
      for (let key in this.group.children) {
        raycastPos.copy(this.group.children[key].position);
        cameraPos.copy(this.camera.position);
        raycastDir.subVectors(raycastPos, cameraPos).normalize();
        annotationRaycaster.set(raycastPos, raycastDir )
        let annotationIntersects = annotationRaycaster.intersectObject(
          this.simplified
        );

        this.group.children[key].material.opacity =
          annotationIntersects.length > 0 ? 1 : .5;
      }
    },
    resetCam() {
      this.controls.reset();
      this.controls2.reset();
      this.camMoved = false;
    },
    setFullscreen() {
      this.fullscreenView = true;
      this.fullscreenTrigger = true;
      const viewer = document.getElementById("viewer");
      viewer.requestFullscreen();
      this.onWindowResize();
    },
    removeFullscreen() {
      document.exitFullscreen();
    },
    showRoutes() {
      this.camera.layers.enable(2);
      this.routeShow = true;
    },
    hideRoutes() {
      this.camera.layers.disable(2);
      this.routeShow = false;
    },
    loseContext() {
      this.renderer.forceContextLoss();
      console.log(this.renderer);
    }
  },
  mounted() {
    this.init();
    this.createScale();
    this.animate();
  },
  deactivated() {
    this.play = false;
  },
  activated() {
    this.scene.remove(this.group);
    this.scene.remove(this.linesGroup);
    this.loadSprites();
    // this.loadDecals()
    this.loadLines();
    this.play = true;
    this.onWindowResize();
    this.animate();
  }
};
</script>

<style scoped>
#container {
  width: 100%;
  box-sizing: border-box;
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
.fullscreen-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.route-btn {
  position: absolute;
  right: 10px;
  top: 40px;
}
.viewer-btn {
  position: absolute;
  right: 10px;
  top: 100px;
}
.help-btn {
  position: absolute;
  right: 10px;
  top: 70px;
}
.lose-ctx-btn {
  position: absolute;
  right: 10px;
  top: 150px;
}
.annotation {
  position: absolute;
  user-select: none;
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
  bottom: 7px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}
.loading-info {
  position: absolute;
  bottom: 0px;
  width: 100%;
  background-color: #ffffff;
}
</style>
