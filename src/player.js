export default class Player {

    constructor() {
        const sphereGeo = new THREE.SphereBufferGeometry(1, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({ color: 0x999999 });
        this.sphere = new THREE.Mesh(sphereGeo, sphereMat);
        this.sphere.layers.set(0);
        game.scene2.add(this.sphere);
        this.sphere.translateY(-2.5);
        
        this.speed = 0.3;
        this.up = true;
        this.moving = false;

        this.onMouseMove = this.onMouseMove.bind(this);
        this.move = this.move.bind(this);

        document.addEventListener('mousemove', this.onMouseMove, false);

        // this.move();
    }

    onMouseMove(event) {
        event.preventDefault();
        if (this.moving) {
            this.sphere.position.x += event.movementX * 0.03;
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


}