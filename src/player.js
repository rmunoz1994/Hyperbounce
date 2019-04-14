class Player {

    constructor() {
        const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({ color: 0x272727 });
        this.sphere = new THREE.Mesh(sphereGeo, sphereMat);
        game.scene.add(sphere);
        this.sphere.translateY(-2.5);
        
        this.speed = 0.35;
        this.up = true;

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onClick = this.onClick.bind(this);
        this.move = this.move.bind(this);

        document.addEventListener('click', onClick);
        document.addEventListener('mousemove', this.onMouseMove, false);
    }

    onMouseMove(event) {
        event.preventDefault();
        this.sphere.position.x += event.movementX * 0.03;
    }

    onClick(event) {
        canvas.requestPointerLock();
    }

    move() {
        requestAnimationFrame(this.move);
        if (up) {
            this.sphere.position.y += speed;
        } else {
            this.sphere.position.y -= speed;
        }
        if (this.sphere.position.y >= 2.5) {
            up = false;
        } else if (this.sphere.position.y <= -2.5) {
            up = true;
        }
    }


}