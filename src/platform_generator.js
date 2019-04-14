import Platform from './platform';

class PlatformGenerator {

    constructor() {
        this.platformArr = [];
        this.update = this.update.bind(this);
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    generateFirstPlatforms() {
        const platform = new Platform();
        const platform2 = new Platform();
        platform.platform.translateY(-3.5);
        game.scene.add(platform);
        game.scene.add(platform2);
        this.platformArr.push(platform);
        platform2.platform.position.set(0, -3.5, -10);
        this.platformArr.push(platform2);
    }

    generatePlatform() {
        const platform = new Platform();
        platform.platform.translateX(getRandomArbitrary(-5.5, 5.5));
        platform.platform.translateZ(-20);
        this.platformArr.push(platform);
    }

    update() {
        requestAnimationFrame(this.update);
        for (let i = 0; i < this.platformArr.length; i++) {
            const element = this.platformArr[i].platform;
            element.position.z += speed;
        }
        // this.player.move();
        if (this.platformArr.length >= 1 && this.platformArr[0].platform.position.z > 10) {
            let removedPlat = platformArr.shift();
            removedPlat.platform.geometry.dispose();
            removedPlat.platform.material.dispose();
            game.scene.remove(removedPlat);
        }
    }

}