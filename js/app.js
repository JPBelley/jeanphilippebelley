import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from 'dat.gui';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';

export default class Sketch {
    constructor(options) {
        this.time = 0;
        this.container = options.dom;

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10);
        this.camera.position.z = 1;
        // this.camera.position.x = -2;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.initGui();
        this.resize();
        this.setupResize();
        this.addObjects();
        this.render();
    }

    initGui() {
        this.guiControls = new function () {
            this.rotationX = 0;
            this.rotationY = 0;
            this.rotationZ = 0;
            this.earthQuake = 0.01;
        }
        
        const gui = new dat.GUI();
        gui.add(this.guiControls, 'rotationX', -0.001, 0.001);
        gui.add(this.guiControls, 'rotationY', -0.001, 0.001);
        gui.add(this.guiControls, 'rotationZ', -0.001, 0.001);
        gui.add(this.guiControls, 'earthQuake', 0, .1);
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    addObjects() {
        this.geometry = new THREE.PlaneBufferGeometry(10, 10, 200, 200);
        this.material = new THREE.MeshNormalMaterial();

        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            fragmentShader: fragment,
            vertexShader: vertex,
            uniforms: {
                horzMod: { value: 400 },
                time: { value: 0 }
            },
            wireframe: true
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotateX(-Math.PI * 0.4)
        this.scene.add(this.mesh);
    }

    render() {
        this.time += 0.05;

        this.mesh.rotation.x += this.guiControls.rotationX;
        this.mesh.rotation.y += this.guiControls.rotationY;
        this.mesh.rotation.z += this.guiControls.rotationZ;

        this.material.uniforms.time.value = this.time * this.guiControls.earthQuake;

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Sketch({
    dom: document.getElementById('container')
});