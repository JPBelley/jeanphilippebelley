import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap';
// import * as dat from 'dat.gui';
import vertex from './shaders/vertex5.glsl';
import fragment from './shaders/fragment5.glsl';
import imagesLoaded from 'imagesLoaded'
import FontFaceObserver from 'fontfaceobserver'
import Scroll from './scroll'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default class Sketch {
    constructor(options) {
        if (window.matchMedia('(max-width: 1023px)').matches) return;
        this.time = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.container = options.dom;
        this.specialFred = document.getElementById('special-fred');
        this.fredEffect = 1;

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 100, 2000);
        this.camera.position.z = 600;

        this.camera.fov = 2*Math.atan((this.height/2)/600) * (180/Math.PI);

        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.images = [...document.querySelectorAll('img.three-img')];

        
        this.container.addEventListener("mousemove", this.printMousePos);

        const fontOswald = new Promise(resolve => {
            new FontFaceObserver('Oswald').load().then(()=>{
                resolve();
            });
        });

        const preloadImages = new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll("img"), { background: true }, resolve);
        });

        let allDone = [fontOswald,preloadImages];
        this.currentScroll = 0;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        Promise.all(allDone).then(()=>{    
            this.scroll = new Scroll();
            this.addImages();
            this.setPositions();
            // this.initGui();
            this.mouseMovement()
            this.resize();
            this.setupResize();
            // this.addObjects();
            this.composerPass()
            this.render();
        });
    }

    addImages() {
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            fragmentShader: fragment,
            vertexShader: vertex,
            uniforms: {
                time: { value: 0 },
                uImage: { value: 0 },
                fredEffect: { value: 1 },
                hover: { value: new THREE.Vector2(0.5, 0.5) },
                hoverState: { value: 0 },
            },
            // wireframe: true
        });
        
        this.materials = [];

        this.imageStore = this.images.map(img=>{
            let bounds = img.getBoundingClientRect();

            let geometry = new THREE.PlaneBufferGeometry(bounds.width, bounds.height, 1,1);
            let texture = new THREE.Texture(img);
            
            // BG Cover
            // texture.matrixAutoUpdate = false;

            // var aspect = window.innerWidth / window.innerHeight;
            // var imageAspect = texture.image.width / texture.image.height;

            // if (aspect < imageAspect) {
            //     texture.matrix.setUvTransform(0, 0, aspect / imageAspect, 1, 0, 0.5, 0.5);
            // } else {
            //     texture.matrix.setUvTransform(0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5);
            // }

            let material = this.material.clone();
            material.uniforms.uImage.value = texture;
            this.materials.push(material);

            img.addEventListener('mouseenter', () => {
                gsap.to(material.uniforms.hoverState, {
                    duration: 1,
                    value: 1
                })
            })
            img.addEventListener('mouseout', () => {
                gsap.to(material.uniforms.hoverState, {
                    duration: 1,
                    value: 0
                })
            })

            texture.needsUpdate = true;
            let mesh = new THREE.Mesh(geometry, material);

            this.scene.add(mesh);

            return {
                img: img,
                mesh: mesh,
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height
            }
        });
    }

    setPositions() {
        this.imageStore.forEach((o, i)=>{
            if(i === 0) o.mesh.position.z = -10;
            o.mesh.position.y = this.currentScroll -o.top + this.height/2 - o.height/2;
            o.mesh.position.x = o.left - this.width/2 + o.width/2;
        });
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }


    composerPass() {
        this.composer = new EffectComposer(this.renderer);
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);

        //custom shader pass
        var counter = 0.0;
        this.myEffect = {
            uniforms: {
                "tDiffuse": { value: null },
                "scrollSpeed": { value: null },
                "fredEffect": { value: 1 },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix 
            * modelViewMatrix 
            * vec4( position, 1.0 );
        }
        `,
            fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        uniform float scrollSpeed;
        uniform float fredEffect;
        void main(){
          vec2 newUV = vUv;
          float area = smoothstep(0.4,0.,vUv.y);
          area = pow(area,4.);
          newUV.x -= (vUv.x - 0.5)*0.09*area*scrollSpeed*fredEffect;
          gl_FragColor = texture2D( tDiffuse, newUV);
        //   gl_FragColor = vec4(area,0.,0.,1.);
        }
        `
        }

        this.customPass = new ShaderPass(this.myEffect);
        this.customPass.renderToScreen = true;

        this.composer.addPass(this.customPass);
    }


    mouseMovement() {


        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / this.width) * 2 - 1;
            this.mouse.y = - (event.clientY / this.height) * 2 + 1;

            // update the picking ray with the camera and mouse position
            this.raycaster.setFromCamera(this.mouse, this.camera);

            // calculate objects intersecting the picking ray
            const intersects = this.raycaster.intersectObjects(this.scene.children);

            if (intersects.length > 0) {
                let obj = intersects[0].object;
                obj.material.uniforms.hover.value = intersects[0].uv;
            }


        }, false);
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    addObjects() {
        this.geometry = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
        // this.geometry = new THREE.SphereGeometry(1, 40, 40);
        // this.material = new THREE.MeshNormalMaterial();

        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            fragmentShader: fragment,
            vertexShader: vertex,
            uniforms: {
                horzMod: { value: 400 },
                time: { value: 0 },
                fredEffect: { value: 1 },
                mouseY: { value: 0 },
            },
            wireframe: true
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        // this.mesh.rotateX(-Math.PI * 0.4)
        this.scene.add(this.mesh);
    }

    printMousePos = (event) => {
        this.mouseX = Math.abs(Math.abs((((window.innerWidth / 2) - event.clientX))) - (window.innerWidth / 2)) * .0001;
        this.mouseY = Math.abs(Math.abs((((window.innerHeight / 2) - event.clientY))) - (window.innerHeight / 2)) * .01;
    }

    render() {
        this.time += .05 * this.fredEffect;

        // this.mesh.rotation.x += this.time;
        // this.mesh.rotation.y -= this.time;

        // this.material.uniforms.mouseY.value = this.mouseY;
        // this.material.wireframe = this.guiControls.wireframe;
        
        this.materials.forEach(m=>{
            m.uniforms.fredEffect.value = this.fredEffect;
            m.uniforms.time.value = this.time;
        });
        this.scroll.render();
        this.currentScroll = this.scroll.scrollToRender;
        this.customPass.uniforms.scrollSpeed.value = this.scroll.speedTarget;
        this.customPass.uniforms.fredEffect.value = this.fredEffect;
        this.setPositions();

        this.composer.render()
        // this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Sketch({
    dom: document.getElementById('container')
});


var navPosition = '';
var lastScrollTopFooter = 0;

var navScrollTop = function (selector, position) {
    selector.scroll(function (event) {
        var st = $(this).scrollTop();


        // console.log(st);
        if (st > lastScrollTopFooter) {
            document.querySelector('nav').classList.add('scroll');
        } else {
            // $('.cookie').removeClass('onFooter');
            document.querySelector('nav').classList.remove('scroll');
        }
        lastScrollTopFooter = st;
    });
}


navScrollTop($(window), navPosition);