 // 导入threejs
//import * as THREE from "three";
import * as THREE from './node_modules/three/build/three.module.js';
//const THREE = require('three');
// 1. 创建场景
const scene = new THREE.Scene();
// 2. 创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000,
);

camera.position.z = 100;

// 5. 创建立方体(几何+材质)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 添加到场景
scene.add(cube);

// 6. 显示坐标轴(x轴: 红色; y轴: 绿色; z轴: 蓝色 rgb)
// x轴水平方向(右正); y轴垂直方向(上正); z轴垂直xy平面即屏幕(外正)
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 渲染
renderer.render(scene, camera);
 
