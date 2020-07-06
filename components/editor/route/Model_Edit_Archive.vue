<template>
  <div>
    <div id="container"></div>
    <canvas id="number" width="64" height="64"></canvas>
  </div>
</template>
<script>
// Threejs imports
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import GLTFLoader from "three-gltf-loader";
// import DecalGeometry from "three-decal-geometry";
// import * as dat from "dat.gui";
// import * as Stats from "stats-js";

export default {
  name: "model-editor",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      container: null,
      raycaster: null,
      aLen: null,
      i: null,
      spriteBehindObject: null,
      intersection: {
        intersects: false,
        point: new THREE.Vector3(),
        normal: new THREE.Vector3(),
      },
      decals: [],

      idx: 1,
      // var ctx = canvas.getContext('2d')

      sprite: void 0,
      mesh: void 0,
      // var annotation = document.querySelector('.annotation')

      annotations: [],
      mouseHelper: null,
      mouse: new THREE.Vector2(),
      position: new THREE.Vector3(),
      orientation: new THREE.Euler(),
      size: new THREE.Vector3(10, 10, 10),
      // var up = new THREE.Vector3(0, 1, 0)

      params: {
        Annotate: false,
        Decal: false,
        Hide: false,
        showAnnotations: true,
        showDecals: true,
        clear: function () {
          this.removeAnnotations();
          this.removeDecals();
        },
      },
    };
  },
  methods: {
    init: function () {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);

      // stats to be turned off in production
      let stats = new Stats();
      this.container.appendChild(stats.dom);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.camera.position.z = 120;
      this.camera.layers.enable(0); // enabled by default
      this.camera.layers.enable(1);
      this.camera.layers.enable(2);
      this.camera.target = new THREE.Vector3();

      let controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.minDistance = 50;
      controls.maxDistance = 200;

      controls.minAzimuthAngle = -Math.PI / 2;
      controls.maxAzimuthAngle = Math.PI / 2;

      controls.maxPolarAngle = Math.PI / 2;

      this.scene.add(new THREE.AmbientLight());

      let geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);

      // line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { linewidth: 4 } ) );
      // scene.add( line );

      this.loadLeePerrySmith();

      this.raycaster = new THREE.Raycaster();

      this.mouseHelper = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 10),
        new THREE.MeshNormalMaterial()
      );
      this.mouseHelper.visible = false;
      this.scene.add(this.mouseHelper);

      // window.addEventListener('resize', this.onWindowResize, false)

      let moved = false;

      controls.addEventListener("change", function () {
        moved = true;
      });

      window.addEventListener(
        "mousedown",
        function () {
          moved = false;
        },
        false
      );

      window.addEventListener("mouseup", function () {
        this.checkMeshIntersection();
        if (!moved && this.intersection.intersects) {
          this.annotate();
        }
      });

      window.addEventListener("mousemove", onTouchMove);
      window.addEventListener("touchmove", onTouchMove);

      function onTouchMove(event) {
        let x, y;

        if (event.changedTouches) {
          x = event.changedTouches[0].pageX;
          y = event.changedTouches[0].pageY;
        } else {
          x = event.clientX;
          y = event.clientY;
        }

        this.mouse.x = (x / window.innerWidth) * 2 - 1;
        this.mouse.y = -(y / window.innerHeight) * 2 + 1;

        this.checkMeshIntersection();
      }
      // gui list
      let gui = new dat.GUI();
      gui.add(this.params, "Annotate");
      gui.add(this.params, "Decal");
      gui.add(this.params, "Text");
      gui.add(this.params, "showAnnotations").onChange(function () {
        this.camera.layers.toggle(1);
      });
      gui.add(this.params, "showDecals").onChange(function () {
        this.camera.layers.toggle(2);
      });
      gui.add(this.params, "clear");
      gui.open();

      // this.onWindowResize()
      this.animate();
    },
    // check for mouse/touch intersection with mesh
    checkMeshIntersection: function () {
      if (!this.mesh) return;
      if (!this.params.Annotate && !this.params.Decal) return;
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
        // var positions = line.geometry.attributes.position;
        // positions.setXYZ( 0, p.x, p.y, p.z );
        // positions.setXYZ( 1, n.x, n.y, n.z );
        // positions.needsUpdate = true;
        this.intersection.intersects = true;
      } else {
        this.intersection.intersects = false;
      }
    },
    loadLeePerrySmith: function (callback) {
      let loader = new GLTFLoader();
      // loader.setDRACOLoader( new THREE.DRACOLoader() );

      loader.load("../../asstes/model/Bell_Buttress.glb", function (gltf) {
        this.mesh = gltf.scene.children[0];
        this.scene.add(this.mesh);
        // mesh.scale.set( 1, 1, 1 );
        // scene.add( gltf.scene );
      });
    },

    // add annotation number
    annotate: function () {
      if (!this.params.Annotate) return;

      // Sprite
      let canvas = document.getElementById("number");
      let ctx = canvas.getContext("2d");
      let numberTexture = new THREE.CanvasTexture(
        document.querySelector("#number")
      );

      // Number definition
      let x = 32;
      let y = 32;
      let radius = 30;
      let startAngle = 0;
      let endAngle = Math.PI * 2;

      let spriteMaterial = new THREE.SpriteMaterial({
        map: numberTexture,
        alphaTest: 0.5,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        sizeAttenuation: false,
      });

      let sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.03, 0.03, 1);
      sprite.position.copy(this.intersection.point);
      sprite.layers.set(1);

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
      ctx.fillText(this.idx, x, y);

      this.annotations.push(sprite);
      this.scene.add(sprite);

      this.idx++;
    },

    removeAnnotations: function () {
      this.annotations.forEach(function (d) {
        this.scene.remove(d);
      });

      this.annotations = [];
      this.idx = 1;
    },

    hideAnnotations: function () {
      if (!params.Hide) return;

      annotations.forEach(function () {
        sprite.material.opacity = 0;
      });
    },

    animate: function () {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
      this.stats.update();
    },
  },
  mounted() {
    this.init();
    this.animate();
  },
};
</script>

<style scoped>
body {
  background: #777;
  padding: 0;
  margin: 0;
  font-weight: bold;
  overflow: hidden;
}

#info {
  position: absolute;
  top: 0px;
  width: 100%;
  color: #ffffff;
  padding: 5px;
  font-family: Monospace;
  font-size: 13px;
  text-align: center;
}
#annotation {
  position: absolute;
  top: 40px;
  color: #ffffff;
  padding: 5px;
  font-family: Monospace;
  font-size: 10px;
  text-align: center;
}
#container {
  height: 100px;
  width: 100%;
}
</style>
