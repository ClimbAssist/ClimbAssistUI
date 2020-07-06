export const viewer = {
  data: () => ({
    camera: null,
    routeShow: true,
    currentRoute: this.activeRoute,
    camera2: null,
    scene: null,
    renderer: null,
    mesh: null,
    lowMesh: null,
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
      normal: new THREE.Vector3(),
    },
    mouseHelper: undefined,
    timeout: undefined,
    lastTap: 0,
  }),
  methods: {
    init: function () {
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
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.controls = new Orbitcontrols(this.camera, this.renderer.domElement);
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

      this.controls2 = new Orbitcontrols(
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

      this.northAxis = new THREE.Vector3(0, 1, 0);

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
      container.addEventListener(
        "webglcontextlost",
        function (event) {
          event.preventDefault();
        },
        false
      );
      container.addEventListener("webglcontextrestored", this.init, false);
      container.addEventListener("webglcontextrestored", this.animate, false);
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
      this.onWindowResize();
    },
    animate: function () {
      if (this.play) {
        requestAnimationFrame(this.animate);

        this.renderer.setClearColor(0x2222222, 1);
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);

        this.camDistance =
          this.camera.position.distanceTo(this.origin).toFixed(0) + " ft";
        // document.getElementById("camera-distance").innerHTML = this.camDistance;

        this.checkAnnotationDistance();

        // inset scene

        this.renderer.setClearColor(0x0000000, 1);
        this.renderer.clearDepth(); // important!
        this.renderer.setScissorTest(true);
        if (this.fullscreenView) {
          this.renderer.setScissor(20, 20, this.insetWidth, this.insetHeight);
          this.renderer.setViewport(20, 20, this.insetWidth, this.insetHeight);
        } else {
          this.renderer.setScissor(
            20,
            // window.innerHeight - this.insetHeight - this.navHeight - 20,
            20,
            this.insetWidth,
            this.insetHeight
          );
          this.renderer.setViewport(
            20,
            // window.innerHeight - this.insetHeight - this.navHeight - 20,
            20,
            this.insetWidth,
            this.insetHeight
          );
        }
        this.renderer.render(this.scene, this.camera2);
        this.renderer.setScissorTest(false);
      }
    },
    onWindowResize: function () {
      if (this.play) {
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
    loadSprites: function () {
      this.group = new THREE.Group();
      const x = 32;
      const y = 32;
      const radius = 30;
      const startAngle = 0;
      const endAngle = Math.PI * 2;
      for (let wkey in this.crag.walls) {
        let idx = 1;
        for (let rkey in this.crag.walls[wkey].routes) {
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
            sizeAttenuation: true,
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
          idx++;
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
            color: color,
          });
          let line = new THREE.Line(geometry, material);
          let dist = line.computeLineDistances();
          line.layers.set(2);
          this.linesGroup.add(line);
        }
      }
      this.scene.add(this.linesGroup);
    },
    loadAnchors: function () {
      this.scene.remove(this.anchorsGroup);
      if (!this.activeRoute) return;
      this.anchorsGroup = new THREE.Group();
      const x = 32;
      const y = 32;
      const radius = 30;
      const startAngle = 0;
      const endAngle = Math.PI * 2;

      for (let akey in this.crag.walls[this.activeRoute.wall].routes[
        this.activeRoute.route
      ].anchors) {
        if (
          this.crag.walls[this.activeRoute.wall].routes[this.activeRoute.route]
            .anchors
        ) {
          let anchors = this.crag.walls[this.activeRoute.wall].routes[
            this.activeRoute.route
          ].anchors[akey];
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
            sizeAttenuation: true,
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
          sprite.scale.set(1, 1, 1);
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
  },
};
