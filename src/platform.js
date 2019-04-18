import Game from "./game.js";
import { createContext } from "vm";

export default class Platform {

    constructor(generateScoreMult = true) {
        const platGeo = new THREE.CylinderBufferGeometry(2, 2, 0.5, 32);
        // const platMat = new THREE.MeshStandardMaterial({ color: 0x890000 }); //RED
        const platMat = new THREE.MeshStandardMaterial({ color: 0x002144 }); //BLUE
        
        this.platform = new THREE.Mesh(platGeo, platMat);
        this.platform.layers.enable(1);
        this.platform.position.y = -3.5;
        // game.scene.add(this.platform);


        ////CIRCLE THAT RAISES YOUR SCORE MULTIPLIER////
        if (generateScoreMult) this.scoreMultExists = Math.random() <= 0.25;
        if (this.scoreMultExists) {
            const scoreMultGeo = new THREE.CircleBufferGeometry(0.5, 32);
            const scoreMultMat = new THREE.MeshBasicMaterial({ color: 0x404040, side: THREE.DoubleSide });
            this.scoreMult = new THREE.Mesh(scoreMultGeo, scoreMultMat);
            this.scoreMult.position.y = -3.249;
            this.scoreMult.rotation.x = Math.PI / 2;
            this.scoreMult.position.x = this.getRandomArbitrary(-1.2, 1.2);
        }

        ////SHOCKWAVE EFFECT////
        const hitTexture = new THREE.TextureLoader().load("src/images/circleGradient.png");
        const hitGeo = new THREE.PlaneBufferGeometry(3,3,1);
        const hitMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: hitTexture, transparent: true });
        this.hit = new THREE.Mesh(hitGeo, hitMat);
        this.hit.position.y = -3.5;
        this.hit.rotation.x = Math.PI / 2;
        this.hit.visible = false;

        // console.log(this.hit.scale);
        this.xScale = this.hit.scale.x;
        this.yScale = this.hit.scale.y;
        this.zScale = this.hit.scale.z; 
        
        // game.scene.add(this.hit);
        this.platformGroup = new THREE.Group();
        this.platformGroup.add(this.platform);
        if (this.scoreMultExists) this.platformGroup.add(this.scoreMult);
        this.platformGroup.add(this.hit);
        game.scene.add(this.platformGroup);

        this.removePlatform = this.removePlatform.bind(this);
        this.collision = this.collision.bind(this);
        this.update = this.update.bind(this);
        this.getRandomArbitrary = this.getRandomArbitrary.bind(this);
        // this.push = this.push.bind(this);
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    removePlatform() {
        game.scene.remove(this.platform);
        this.platform.geometry.dispose();
        this.platform.material.dispose();
        this.platform = undefined;
        // this.hit.geometry.dispose();
        // this.hit.material.dispose();
        // this.hit = undefined;
    }

    collision() {
        this.hit.visible = true;
        // this.platform.material.emissive = new THREE.Color(0xff0000); //RED
        this.platform.material.emissive = new THREE.Color(0x007CFF); //BLUE
        // this.createText();
        // this.platform.material.emissiveIntensity = 0.75;
        this.update();
        // this.push();
    }

    createText() {
        let text = document.createElement('div');
    }

    // push() {
    //     let id = requestAnimationFrame(this.push);
    //     if (this.platformGroup.position.y > -1) {
    //         this.platformGroup.position.y -= 0.1;
    //     } else {
    //         this.platformGroup.position.y += 0.1;
    //     }
    //     if (this.platformGroup.position.y === 0) {
    //         cancelAnimationFrame(id);
    //     }
    // }

    update() {
        ////SHOCKWAVE EFFECT////
        let id = requestAnimationFrame(this.update);
        this.xScale += 0.15;
        this.yScale += 0.15;
        this.zScale += 0.15;
        const vec = new THREE.Vector3(this.xScale, this.yScale, this.zScale);
        if (this.xScale >= 3) {
            //lower opacity
            this.hit.material.opacity -= 0.15;
        }
        if (this.xScale >= 4) {
            cancelAnimationFrame(this.update);
            this.hit.visible = false;
            this.hit.geometry.dispose();
            this.hit.material.dispose();
        }
        this.hit.scale.lerp(vec, 1);
    }

}