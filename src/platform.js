import Game from "./game.js";

export default class Platform {

    constructor() {
        const platGeo = new THREE.CylinderBufferGeometry(2, 2, 0.5, 32);
        const platMat = new THREE.MeshStandardMaterial({ color: 0x890000 });
        this.platform = new THREE.Mesh(platGeo, platMat);
        this.platform.layers.enable(1);
        this.platform.position.y = -3.5;
        game.scene.add(this.platform);

        const hitGeo = new THREE.PlaneBufferGeometry(3,3,1);
        const hitMat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
        this.hit = new THREE.Mesh(hitGeo, hitMat);
        this.hit.position.y = -3.5;
        this.hit.rotation.x = Math.PI / 2;
        this.hit.visible = true;
        console.log(this.hit.scale);
        this.xScale = this.hit.scale.x;
        this.yScale = this.hit.scale.y;
        this.zScale = this.hit.scale.z; 
        
        game.scene.add(this.hit);

        this.removePlatform = this.removePlatform.bind(this);
        this.collision = this.collision.bind(this);
    }

    removePlatform() {
        game.scene.remove(this.platform);
        this.platform.geometry.dispose();
        this.platform.material.dispose();
        this.platform = undefined;
    }

    collision() {
        const vec = new THREE.Vector3(this.xScale, this.yScale, this.zScale);
        // this.camera.position.lerp(vec, 0.05);
        let id = requestAnimationFrame(this.collision);
        this.hit.visible = true;
        this.xScale += 0.05;
        this.yScale += 0.05;
        this.zScale += 0.05;
        // this.hit.scale.x = this.xScale;
        // this.hit.scale.y = this.yScale;
        // this.hit.scale.z =  this.zScale;
        this.hit.scale.lerp(vec, 1);
    }

}