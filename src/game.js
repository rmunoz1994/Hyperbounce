import Player from './player';
import PlatformGenerator from './platform_generator';

export default class Game {

    constructor() {
        window.game = this;
        this.running = true;
        this.speed = 0.35;
        this.points = 0;

        this.clock = new THREE.clock();
        this.running = true;
        this.scene = new THREE.Scene();
        scene.background = new THREE.Color(0x494949);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 10);
        camera.rotation.x = -0.349066;

        var light = new THREE.PointLight(0xffffff, 2.5, 1000);
        light.position.set(30, 100, 100);
        scene.add(light);

        this.player = new Player();
        this.platformGenerator = new PlatformGenerator();
        this.platformGenerator.generateFirstPlatforms();
        this.platformGenerator.generatePlatform();

        let mouse = { x: 0, y: 0 };
        let prevMouse = { x: 0 };
        let prevPos = 0;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.canvas = this.renderer.domElement;
        this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
        this.animate();
    }

    cameraLag(spherePos) {
        const vec = new THREE.Vector3(spherePos, 2, 10);
        camera.position.lerp(vec, 0.05);
    }   

    play() {

    }

    collided(playerPos, platform) {
        const leftCollision = platform.position.x + 2
        const rightCollision = platform.position.x - 2
        if (playerPos <= leftCollision && playerPos >= rightCollision) {
            return true;
        }
        return false;
    }

    animate() {
        cameraLag(sphere.position.x);
        let id = requestAnimationFrame(animate);
        //////TEMPORARY SOLUTION OF CHECKING FOR COLLISION WITH FIRST AND SECOND PLATFORM IN ARR///////////
        if (this.player.sphere.position.y <= -2.5 && !collided(this.player.sphere.position.x, this.platformGenerator.platformArr[0].platform) && !collided(this.player.sphere.position.x, this.platformGenerator.platformArr[1].platform)) {
            cancelAnimationFrame(id);
            console.log("GAME OVER");
            console.log(`POINTS: ${points}`);
            document.exitPointerLock();
        } else if (this.player.sphere.position.y <= -2.5) {
            this.points += 1;
            this.platformGenerator.generatePlatform();
            document.getElementById("score").innerHTML = "Score:" + this.points;
            if (this.points === 10 || this.points === 20 || this.points === 30 || this.points === 40) {
                speed += 0.025;
            }
        }
        this.renderer.render(this.scene, this.camera);
    }
}