import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { playSeFade, playSeOpen } from "./audio";
import Ribbit from "./rabbit";
import bus from "./bus"
import gsap, { Bounce } from "gsap"

export default class Chest {
    constructor(game) {
        this.game = game;
        this.scene = game.scene;
        this.camera = game.camera;
        this.target = null;
        this.isOpen = false;
        this.state = "wait"
        this.init();
    }
    init() {
        let loader = new GLTFLoader();
        loader.load("./assets/mod/chest/scene.gltf", gltf => {     
            this.target = gltf.scene;
            this.animations = gltf.animations;
            this.target.scale.set(.005, .005, .005);
            this.target.position.set(0, 5, 0)
            this.target.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
                if (c.material && c.material.map) {
                    c.material.map.encoding = THREE.sRGBEncoding;
                }
            });
            this.mixer = new THREE.AnimationMixer(this.target);
            this.mixer.addEventListener('finished', this.finishedAnimation.bind(this));
            this.scene.add(this.target);
            bus.$emit("loaded","chest")
            // this.bindEvent();
        });
        this.rabbit = new Ribbit(this.game, this);
    }
    playGame(){
        this.runTimeLine();
    }
    runTimeLine() {
        this.timer = new gsap.timeline({
            defaults: { duration: 0 },
        });
        playSeFade()
        this.timer.to(
            this.target.position,
            {
                duration: 1,
                y: 0,
                ease: Bounce.easeOut,
                onComplete: () => {
                    this.rabbit.setVisible(true)
                },
            }
        );
        this.timer.to(
            this.camera.position,
            {
                duration: 1.2,
                z: 2.4,
                onComplete: () => {
                    this.bindEvent();
                },
            },
            1.5
        );
    }
    bindEvent() {
        window.addEventListener("mouseup", this.handleClick.bind(this));
        window.addEventListener("touchend", this.handleClick.bind(this))
    }
    handleClick(e) {
        let vector = new THREE.Vector3();
        vector.set(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1,
            0.5);
        vector.unproject(this.camera);
        let raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
        let intersects = raycaster.intersectObjects(this.scene.children);
        let isActive = false;
        for (const item of intersects) {
            this.target.traverse(c => {
                if (c == item.object) isActive = true;
            })
        }
        if (isActive && this.state == "wait" && !this.isOpen) {
            this.open();
        }
    }
    finishedAnimation() {
        if (this.isOpen) {
            console.log(`open finish`)
            this.state = "play"
            this.rabbit.play()
        }
        else {
            console.log(`close finish`)
            this.state = "wait"
        }
    }
    open() {
        console.log("open begin")
        this.isOpen = true;
        bus.$emit("open")
        playSeOpen()
        this.mixer.stopAllAction();
        let anim = this.animations[0]
        let curAction = this.mixer.clipAction(anim);
        curAction.enabled = true;
        curAction.time = 0.0;
        curAction.clampWhenFinished = true;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
        curAction.setLoop(THREE.LoopOnce, 1);
        curAction.play();
    }
    close() {
        console.log("close begin")
        this.isOpen = false;
        bus.$emit("close")
        this.mixer.stopAllAction();
        let anim = this.animations[2]
        let curAction = this.mixer.clipAction(anim);
        curAction.enabled = true;
        curAction.time = 0.0;
        curAction.clampWhenFinished = true;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
        curAction.setLoop(THREE.LoopOnce, 1);
        curAction.play();
    }
    update(delta) {
        this.mixer && this.mixer.update(delta);
        this.rabbit && this.rabbit.update(delta);
    }
}