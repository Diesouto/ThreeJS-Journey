import * as THREE from 'three';
import sources from './sources.js';
import Camera from "./Camera.js";
import Renderer from './Renderer.js';
import Resources from './Utils/Resources.js';
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import World from './World/World.js';
import Debug from './Utils/Debug.js';

let instance = null;

export default class Application {
    constructor(canvas) {
        // Singleton
        if(instance) {
            return instance;
        }
        instance = this;

        // Global access
        window.application = this; 

        // Options
        this.canvas = canvas;

        // Setup
        this.debug = new Debug();
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();

        // Resize event
        this.sizes.on('resize', () => {
            this.resize();
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update();
        })
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update(){
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    destroy() { // Might want to propagate this method in children as well
        this.sizes.off('resize');
        this.time.off('tick');

        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh) {
                child.geometry.dispose();

                // Loop through the material properties
                for(const key in child.material) {
                    const value = child.material[key];

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function') {
                        value.dispose();
                    }
                }
            }
        });
        
        this.camera.controls.dispose();
        this.renderer.instance.dispose();
        if(this.debug.active) {
            this.debug.ui.destroy();
        }
    }
}