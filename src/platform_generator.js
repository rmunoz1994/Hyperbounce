import Platform from './platform.js';

export default class PlatformGenerator {

    constructor() {
        this.platformArr = [];
        this.update = this.update.bind(this);
        this.getRandomArbitrary = this.getRandomArbitrary.bind(this);
        this.speed = 0.3;
        this.reset = this.reset.bind(this);
    }

    reset() {
        for (let i = 0; i < this.platformArr.length; i++) {
            this.platformArr[i].removePlatform();
        }
        this.platformArr = [];
        this.speed = 0.3;
        this.generateFirstPlatforms();
        this.generatePlatform();
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    generateFirstPlatforms() {
        const platform = new Platform(false);
        const platform2 = new Platform();
        this.platformArr.push(platform);
        platform2.platformGroup.position.z = -10;
        this.platformArr.push(platform2);
    }

    generatePlatform() {
        const platform = new Platform();
        platform.platformGroup.translateX(this.getRandomArbitrary(-6, 6));
        // console.log(platform.platformGroup.position.x);
        platform.platformGroup.translateZ(-20);
        this.platformArr.push(platform);
    }

    update() {
        requestAnimationFrame(this.update);
        for (let i = 0; i < this.platformArr.length; i++) {
            const element = this.platformArr[i].platformGroup;
            element.position.z += this.speed;
        }

        if (this.platformArr.length >= 1 && this.platformArr[0].platformGroup.position.z > 10) {
            let removedPlat = this.platformArr.shift();
            removedPlat.removePlatform();
            removedPlat = undefined;
        }
    }
}