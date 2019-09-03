## HYPERBOUNCE

[HYPERBOUNCE LIVE LINK](https://www.raymondmunoz.net/Hyperbounce/)

### Background
This is a game where the player object is constantly bouncing up and down, and can move left and right based on user input. As the player is bouncing, platforms are moving towards the player at a gradually increasing speed. The player must hit these platforms to gain points. If the player misses the platform, it's game over.

In addition the player can hit randomly generated white circles on certain platforms. If successfully hit, the platform will glow red, and the player's score on each platform will increase by a factor of one point. It will return back to the original 1 point per platform if the player misses the white circle.

---
### Functionality/MVP
 - [ ] 3D visuals and user interface
 - [ ] Player can move left and right based on mouse position
 - [ ] Platforms are automatically generated for player to jump on
 - [ ] Player scores points by colliding with platforms
 - [ ] Player loses when missing a platform
 
---
### Wireframes

![wireframe](https://raw.githubusercontent.com/rmunoz1994/Hyperbounce/master/src/images/hyperbounce_wireframe.png)

---
### Architecture and Technologies
 This project implements
 * Vanilla Javascript for game logic
 * HTML5 for canvas rendering
 * three.js for 3D rendering
 * Howler.js for game background music.
 * Webpack to bundle various scripts into a single source.
 
 The main scripts include: <br>
 `game.js`: This is responsible for scene generation, the render loop, and scoring logic. <br>
 `player.js`: This is the player object model that listens for mouse position and moves accordingly. <br>
 `platform.js`: This handles the creation of a single platform. <br>
 `platform_generator.js`: This handles how platforms are auto generated. <br>
 
---
### Highlighted Features
####Camera Movement
 The game originally had a stationary camera and the player moved to the left and right sides of the screen without any movement. I wanted to implement a camera that would follow the player in a way that wasn't jarring so that the player would always be centered. This brought on many challenges about calculating screen position and translating the 2D position to the 3D space in Three.js. However, after much trial and error I figured out an elegant and simple solution.
```javascript
cameraLag(spherePos) {
        const vec = new THREE.Vector3(spherePos, 2, 10);
        this.camera.position.lerp(vec, 0.05);
    }  
```

###Animation Loop
 Using the Three.js animate method. I handle player, camera, star, and platform movement,collision detection, scoring logic, and checking whether or not the game has ended.
```javascript
animate() {
        let id = requestAnimationFrame(this.animate);
        if (this.gameOver) {
            this.end();
            cancelAnimationFrame(id);
        }
        let playerPos = this.player.sphere.position;
        this.cameraLag(playerPos.x);

        if (this.running) {
            const currPlat = this.platformGenerator.platformArr[0];
            if (playerPos.y <= -2.5 && 
                !this.collided(playerPos.x, currPlat.platformGroup)) {
                    this.running = false;
                    document.exitPointerLock();
            } else if (playerPos.y <= -2.5) {
                let multHit;
                if (currPlat.scoreMultExists) {
                    multHit = this.incrementMultiplier(playerPos.x, currPlat);
                } 
                this.score += this.multiplier;
                if (this.score > 1) { 
                    this.platformGenerator.generatePlatform();
                }
                this.platformGenerator.platformArr[0].collision(multHit);
                this.platformGenerator.speed += 0.001;
                this.player.speed += 0.001;
                this.bounceSFX.play();
                document.getElementById("score").innerHTML = "Score: " + this.score;
            }
        } else {
            this.player.dead();
        }
        
        this.animateStars();
        this.speed += 0.001;

        this.composer.render();
        this.renderer.clearDepth();
        this.renderer.render(this.scene2, this.camera);
    }
```

---
### Potential Future Features
 * More highly detailed models for player and platforms
 * Shadow from player
 * Rare auto-generated obstacles on a platform
 * Background map

