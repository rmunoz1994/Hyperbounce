import * as THREE from 'three';
window.THREE = THREE;
window.highScore = 0;
// import { EffectComposer, RenderPass, ShaderPass, SepiaShader } from "postprocessing";
require("three/examples/js/shaders/CopyShader");
require("three/examples/js/postprocessing/EffectComposer");
require("three/examples/js/postprocessing/RenderPass");
require("three/examples/js/postprocessing/ShaderPass");
require("three/examples/js/shaders/FXAAShader");
require("three/examples/js/shaders/SepiaShader");
require("three/examples/js/shaders/LuminosityHighPassShader");
require("three/examples/js/postprocessing/UnrealBloomPass");
import Game from './game.js';

new Game();


// open /Applications/Google\ Chrome.app --args --allow-file-access-from-files