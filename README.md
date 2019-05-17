## HYPERBOUNCE

[HYPERBOUNCE LIVE LINK](https://www.raymondmunoz.net/Hyperbounce/)

### Background
This is a game where the player object is constantly bouncing up and down, and can move left and right based on user input. As the player is bouncing, platforms are moving towards the player at a gradually increasing speed. The player must hit these platforms to gain points. If the player misses the platform, it's game over.

---
### Functionality/MVP
 - [ ] 3D visuals and user interface
 - [ ] Player can move left and right based on mouse position
 - [ ] Platforms are automatically generated for player to jump on
 - [ ] Player scores points by colliding with platforms
 - [ ] Player loses when missing a platform
 
---
### Wireframes

https://wireframe.cc/pro/pp/1dfb9dfca240438

---
### Architecture and Technologies
 This project will implement
 * Vanilla Javascript for game logic
 * HTML5 for canvas rendering
 * three.js for 3D rendering
 * Howler.js (or HTML audio player) for game background music.
 * Webpack to bundle various scripts into a single source.
 
 The main scripts will include: <br>
 `main.js`: Responsible for overall game scoring and logic.<br>
 `board.js`: This will be responsible for scene generation and the render loop. <br>
 `player.js`: This will be the player object model that will listen for mouse position and move accordingly. <br>
 `platform.js`: This will handle the creation of a single platform. <br>
 `platform_generator.js`: This will handle how platforms are auto generated. <br>
 
---
### Implementation Timeline
#### Day 1:
 * Get familiar with canvas and three.js
 * Create 3D scene with an object
 * Move object with user input
#### Day 2: 
 * Fine tune player movement with user input
 * Position camera correctly
 * Create a platform object that is moveable
 * Begin implementing platform auto generation
#### Day 3: 
 * Continue Auto Generation of platforms
 * Time user jumps with movement of platforms
 * Begin implementing player collision with platforms
#### Day 4:
 * Continue player collision
 * Implement points upon collision
 * Implement game over
 * Implement site UI
### Bonus Features
 * Saved High Score
 * Advanced Post Processing
 * Actual 3D modeled objects in place of primitive shapes for platforms and player
 * Score multiplier based on hitting specified point on a platform (Usually dead center)
 * Rare auto-generated obstacles (spikes?) on a platform
 * Special FX upon hitting a platform, score multiplier, or obstacle
 * Background map
 * Swappable models/themes
