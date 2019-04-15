import Game from "./game.js";

export default class Platform {

    constructor() {
        const platGeo = new THREE.CylinderGeometry(2, 2, 0.5, 32);
        const platMat = new THREE.MeshStandardMaterial({ color: 0x890000 });
        this.platform = new THREE.Mesh(platGeo, platMat);
        this.platform.position.y = -3.5;
        game.scene.add(this.platform);

        this.removePlatform = this.removePlatform.bind(this);
    }

    removePlatform() {
        this.platform.geometry.dispose();
        this.platform.material.dispose();
        game.scene.remove(this.platform);
    }

}