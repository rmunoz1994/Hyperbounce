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
        this.scene2 = new THREE.Scene();
        // this.scene.background = new THREE.Color(0x494949);
        // this.scene.background = new THREE.Color(0x000000);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 10);
        this.camera.rotation.x = -0.349066;
        this.camera.layers.enable(1);

        let light = new THREE.PointLight(0xffffff, 2.5, 1000);
        light.position.set(30, 100, 100);
        let light2 = new THREE.PointLight(0xffffff, 2.5, 1000);
        light2.position.set(30, 100, 100);
        this.scene.add(light);
        this.scene2.add(light2);

        this.player = new Player();
        this.platformGenerator = new PlatformGenerator();
        this.platformGenerator.generateFirstPlatforms();
        this.platformGenerator.generatePlatform();

        this.cameraLag = this.cameraLag.bind(this);
        this.collided = this.collided.bind(this);
        this.animate = this.animate.bind(this);
        // this.onClick = this.onClick.bind(this);
        this.start = this.start.bind(this);

        document.addEventListener('click', this.onClick);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
        this.renderer.autoClear = false;
        this.renderer.setClearColor(0x242424);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.canvas = this.renderer.domElement;
        this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock || this.canvas.webkitRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
        // this.renderer.render(this.scene, this.camera);


        this.composer = new THREE.EffectComposer(this.renderer);
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);



        // this.composer2 = new THREE.EffectComposer(this.renderer);     
        // const renderPass2 = new THREE.RenderPass(this.scene2, this.camera);
        // renderPass2.renderToScreen = true;
        // this.composer2.addPass(renderPass2);



        // const effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        // effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight);
        // this.composer.addPass(effectFXAA);


        const bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0.3;
        bloomPass.strength = 3;
        bloomPass.radius = 0.1;
        bloomPass.renderToScreen = true;
        this.composer.addPass(bloomPass);

        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.toneMappingExposure = Math.pow(0.9, 4.0); 

        // this.renderer.clear();
        // this.camera.layers.set(1);
        // this.renderer.clearDepth();
        // this.camera.layers.set(0);
        // this.renderer.render(this.scene, this.camera);
        // this.composer.render();
        // this.renderer.render(this.scene, this.camera);
        this.composer.render();
        this.renderer.clearDepth();
        this.renderer.render(this.scene2, this.camera);
        // this.renderer.render(this.scene, this.camera);
        this.startButton = document.getElementById("start-btn");
        this.startButton.addEventListener('click', this.start);
        // this.animate();
    }

    start() {
        this.startButton.disabled = true;
        this.startButton.classList.add("hidden");
        this.canvas.requestPointerLock();
        this.animate();
        this.player.move();
        this.platformGenerator.update();
    }

    cameraLag(spherePos) {
        const vec = new THREE.Vector3(spherePos, 2, 10);
        this.camera.position.lerp(vec, 0.05);
    }   

    // onClick(event) {
    //     this.canvas.requestPointerLock();
    // }

    collided(playerPos, platform) {
        const rightCollision = platform.position.x + 2;
        const leftCollision = platform.position.x - 2;
        // console.log("-------------------");
        // console.log(platform.position.x);
        // console.log(leftCollision);
        // console.log(rightCollision);
        if (playerPos >= leftCollision && playerPos <= rightCollision) {
            return true;
        }
        return false;
    }

    animate() {
        let id = requestAnimationFrame(this.animate);
        this.cameraLag(this.player.sphere.position.x);

        //////TEMPORARY SOLUTION OF CHECKING FOR COLLISION WITH FIRST AND SECOND PLATFORM IN ARR///////////
        if (this.player.sphere.position.y <= -2.5 && 
            !this.collided(this.player.sphere.position.x, this.platformGenerator.platformArr[0].platformGroup) && 
            !this.collided(this.player.sphere.position.x, this.platformGenerator.platformArr[1].platformGroup)) {
                cancelAnimationFrame(id);
                console.log("GAME OVER");
                console.log(`POINTS: ${this.score}`);
                document.exitPointerLock();
        } else if (this.player.sphere.position.y <= -2.5) {
            this.score += 1;
            if (this.score > 1) { 
                this.platformGenerator.generatePlatform();
            }
            this.platformGenerator.platformArr[0].collision();
            this.platformGenerator.speed += 0.001;
            this.player.speed += 0.001;
            document.getElementById("score").innerHTML = "Score: " + this.score;
        }

        // this.renderer.render(this.scene, this.cam
        // this.renderer.clear();
        // this.camera.layers.set(1);
        // this.composer.render();
        // this.renderer.clearDepth();
        // this.camera.layers.set(0);
        // this.renderer.render(this.scene, this.camera);



        this.composer.render();
        this.renderer.clearDepth();
        this.renderer.render(this.scene2, this.camera);

        // this.renderer.render(this.scene, this.camera);
    }
}