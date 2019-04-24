export default class Player {

    constructor() {
        const sphereGeo = new THREE.SphereBufferGeometry(1, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.725 });
        this.sphere = new THREE.Mesh(sphereGeo, sphereMat);
        this.sphere.layers.set(0);
        game.scene2.add(this.sphere);
        this.sphere.translateY(-2.5);
        
        this.speed = 0.3;
        this.up = true;
        this.moving = false;
        this.movement = 0;
        this.sensitivity = 0.0225;

        this.onMouseMove = this.onMouseMove.bind(this);
        this.move = this.move.bind(this);
        this.dead = this.dead.bind(this);
        this.deathAnimation = this.deathAnimation.bind(this);
        this.reset = this.reset.bind(this);

        document.addEventListener('mousemove', this.onMouseMove, false);

        // this.move();
    }

    reset() {
        this.sphere.position.x = 0;
        this.sphere.position.y = -2.5;
        this.speed = 0.3;
        this.up = true;
        this.movement = 0;
        document.addEventListener('mousemove', this.onMouseMove, false);
    }

    onMouseMove(event) {
        event.preventDefault();
        if (this.moving) {
            // this.movement = event.movementX * this.sensitivity;
            this.sphere.position.x += event.movementX * this.sensitivity;
        }
    }

    move() {
        this.moving = true;
        requestAnimationFrame(this.move);
        if (this.up) {
            this.sphere.position.y += this.speed;
        } else {
            this.sphere.position.y -= this.speed;
        }
        if (this.sphere.position.y >= 2.5) {
            this.up = false;
        } else if (this.sphere.position.y <= -2.5) {
            this.up = true;
        }
    }

    dead() {
        document.removeEventListener('mousemove', this.onMouseMove);
        this.deathAnimation();
    }

    deathAnimation() {
        const id = requestAnimationFrame(this.deathAnimation);
        this.sphere.position.y -= this.speed;
        if (this.sphere.position.y <= -20 ) {
            cancelAnimationFrame(id);
            game.gameOver = true;
        }
    }


}