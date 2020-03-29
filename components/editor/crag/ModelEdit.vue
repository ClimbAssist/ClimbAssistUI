<template>
  <div>
    <div id="container"></div>
    <v-sheet row v-if="!mesh" class="loading-info">
      <p>Loading Model</p>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-sheet>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { mapGetters } from "vuex";
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
      lastModelAngle: null
    };
  },
  watch: {
    meshScale: {
      handler() {
        if (this.mesh) {
          this.mesh.scale.set(
            this.meshScale,
            this.meshScale,
            this.meshScale
          );
        }
      }
    }
  },
  computed: {
    crag() {
      return this.$store.state.editor.cragStateEditor;
    },
    meshScale() {
      return this.$store.state.editor.modelSettings.scale;
    },
    lightIntensity() {
      return this.$store.state.editor.modelSettings.light;
    },
    azimuth() {
      return this.$store.state.editor.modelSettings.azimuth;
    },
    modelAngle() {
      return this.$store.state.editor.modelSettings.modelAngle;
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
      this.controls.enableZoom = false;
      this.controls.enablePan = false;

      // set based on model
      if (this.azimuth) {
        this.controls.minAzimuthAngle = this.azimuth[0];
        this.controls.maxAzimuthAngle = this.azimuth[1];
      }

      this.controls.maxPolarAngle = Math.PI / 2;

      this.controls2 = new OrbitControls(
        this.camera2,
        this.renderer.domElement
      );

      if (this.azimuth) {
        this.controls2.minAzimuthAngle = this.controls.minAzimuthAngle;
        this.controls2.maxAzimuthAngle = this.controls.maxAzimuthAngle;
      }

      this.controls2.maxPolarAngle = this.controls.maxPolarAngle;
      this.controls2.enablePan = false;
      this.controls2.enableZoom = false;

      this.light = new THREE.AmbientLight(0xffffff, this.lightIntensity);

      this.scene.add(this.light);

      // for raycasting
      // let geometry = new THREE.BufferGeometry()
      // geometry.setFromPoints([ new THREE.Vector3(), new THREE.Vector3() ])
      this.loadModel();
      this.loadNorth();
      // this.raycaster = new THREE.Raycaster();
      // this.mouseVector = new THREE.Vector2();

      window.addEventListener("resize", this.onWindowResize, false);
      // container.addEventListener("mousemove", this.onDocumentMouseMove, false);
      // container.addEventListener("mouseup", this.onDocumentMouseclick, false);
      // window.addEventListener("mousedown", () => {
      //   this.moved = false;
      // });
      // window.addEventListener("touchstart", () => {
      //   this.moved = false;
      // });
      // container.addEventListener("touchend", this.onDocumentTouchEnd, false);
      // controls.addEventListener("change", () => {
      //   this.moved = true;
      // });
      this.onWindowResize();
    },
    animate: function() {
      if (this.play) {
        requestAnimationFrame(this.animate);
        if (this.light) {
          this.light.intensity = this.lightIntensity;
        }
        if (
          this.controls &&
          this.controls2 &&
          this.azimuth[0] &&
          this.azimuth[1]
        ) {
          this.controls.minAzimuthAngle = this.azimuth[0];
          this.controls.maxAzimuthAngle = this.azimuth[1];
          this.controls2.minAzimuthAngle = this.azimuth[0];
          this.controls2.maxAzimuthAngle = this.azimuth[1];
          this.controls.update();
          this.controls2.update();
        } else if (this.controls && this.controls2) {
          this.controls.minAzimuthAngle = -Infinity;
          this.controls.maxAzimuthAngle = Infinity;
          this.controls2.minAzimuthAngle = -Infinity;
          this.controls2.maxAzimuthAngle = Infinity;
          this.controls.update();
          this.controls2.update();
        }
        if (this.mesh && this.modelAngle != this.lastModelAngle) {
          this.mesh.rotateY(this.modelAngle - this.lastModelAngle);
          this.north.rotateY(this.modelAngle - this.lastModelAngle);
          this.lastModelAngle = this.modelAngle;
        }

        this.renderer.setClearColor(0x2222222, 1);
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);

        this.camDistance =
          this.camera.position.distanceTo(this.camera.target).toFixed(0) +
          " ft";
        // document.getElementById("camera-distance").innerHTML = this.camDistance;

        this.checkScaleDistance();

        // inset scene

        this.renderer.setClearColor(0x0000000, 1);
        this.renderer.clearDepth(); // important!
        this.renderer.setScissorTest(true);

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
        this.mesh.rotateY(this.modelAngle);
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
          let northAngle = this.modelAngle + Math.PI;
          this.north.rotateY(northAngle);
          this.north.layers.set(10);
          this.scene.add(this.north);
        },
        error => {
          console.log(error);
        }
      );
    },
    checkScaleDistance: function() {
      if (
        this.camera.position.distanceTo(this.camera.target).toFixed(0) >= 80 &&
        this.camera.position.distanceTo(this.camera.target).toFixed(0) <= 120
      ) {
        this.scaleFactor = 2;
      } else if (
        this.camera.position.distanceTo(this.camera.target).toFixed(0) > 120
      ) {
        this.scaleFactor = 3;
      } else {
        this.scaleFactor = 1;
      }
    }
  },
  created() {
    if (this.$store.state.editor.cragStateEditor.model.scale) {
      this.$store.commit(
        "editor/updateScale",
        this.$store.state.editor.cragStateEditor.model.scale
      );
    } else {
      this.$store.commit(
        "editor/updateScale",
        1.0
      );
    }
    if (this.$store.state.editor.cragStateEditor.model.light) {
      this.$store.commit(
        "editor/updateLight",
        this.$store.state.editor.cragStateEditor.model.light
      );
    } else {
      this.$store.commit(
        "editor/updateLight",
        1.0
      );
    }
    if (this.$store.state.editor.cragStateEditor.model.modelAngle) {
      this.$store.commit(
        "editor/updateModelAngle",
        this.$store.state.editor.cragStateEditor.model.modelAngle
      );
    } else {
      this.$store.commit(
        "editor/updateModelAngle",
        0.0
      );
    }
    if (this.$store.state.editor.cragStateEditor.model.azimuth) {
      let azimuth = [
        this.$store.state.editor.cragStateEditor.model.azimuth.minimum,
        this.$store.state.editor.cragStateEditor.model.azimuth.maximum
      ];
      this.$store.commit("editor/updateAzimuth", azimuth);
    } else {
      this.$store.commit("editor/updateAzimuth", []);
    }
  },
  mounted() {
    this.init();
    this.animate();
  },
  deactivated() {
    this.play = false;
  },
  activated() {
    // this.scene.remove(this.group);
    // this.loadSprites();
    // this.loadDecals()
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
</style>
