import Player from './player.js';
import PlatformGenerator from './platform_generator.js';

export default class Game {

    constructor() {
        window.game = this;
        this.running = true;
        this.speed = 0.35;
        this.score = 0;

        this.clock = new THREE.Clock();
        this.running = true;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x494949);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 10);
        this.camera.rotation.x = -0.349066;

        let light = new THREE.PointLight(0xffffff, 2.5, 1000);
        light.position.set(30, 100, 100);
        this.scene.add(light);

        this.player = new Player();
        this.platformGenerator = new PlatformGenerator();
        this.platformGenerator.generateFirstPlatforms();
        this.platformGenerator.generatePlatform();

        this.cameraLag = this.cameraLag.bind(this);
        this.collided = this.collided.bind(this);
        this.animate = this.animate.bind(this);
        this.onClick = this.onClick.bind(this);

        let mouse = { x: 0, y: 0 };
        let prevMouse = { x: 0 };
        let prevPos = 0;
        document.addEventListener('click', this.onClick);

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
        this.camera.position.lerp(vec, 0.05);
    }   

    onClick(event) {
        this.canvas.requestPointerLock();
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
        let id = requestAnimationFrame(this.animate);
        this.cameraLag(this.player.sphere.position.x);

        //////TEMPORARY SOLUTION OF CHECKING FOR COLLISION WITH FIRST AND SECOND PLATFORM IN ARR///////////
        if (this.player.sphere.position.y <= -2.5 && 
            !this.collided(this.player.sphere.position.x, this.platformGenerator.platformArr[0].platform) && 
            !this.collided(this.player.sphere.position.x, this.platformGenerator.platformArr[1].platform)) {
                cancelAnimationFrame(id);
                console.log("GAME OVER");
                console.log(`POINTS: ${this.score}`);
                document.exitPointerLock();
        } else if (this.player.sphere.position.y <= -2.5) {
            this.score += 1;
            this.platformGenerator.generatePlatform();
            document.getElementById("score").innerHTML = "Score:" + this.score;
            if (this.score === 10 || this.score === 20 || this.score === 30 || this.score === 40) {
                this.speed += 0.025;
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}