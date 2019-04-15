import * as THREE from 'three';
window.THREE = THREE;
// import { EffectComposer, RenderPass, ShaderPass, SepiaShader } from "postprocessing";
require("three/examples/js/shaders/CopyShader");
require("three/examples/js/postprocessing/EffectComposer");
require("three/examples/js/postprocessing/RenderPass");
require("three/examples/js/postprocessing/ShaderPass");
require("three/examples/js/shaders/SepiaShader");
import Game from './game.js';

new Game();

