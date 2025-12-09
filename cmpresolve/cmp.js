import * as THREE from '../node_modules/three/build/three.module.js'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
//import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene()
// 加载背景
// const textureLoader = new THREE.TextureLoader()
// const textureEquirec = textureLoader.load('./img/bg1.jpg')
// textureEquirec.mapping = THREE.EquirectangularReflectionMapping
// textureEquirec.colorSpace = THREE.SRGBColorSpace
// scene.background = textureEquirec
const loader = new THREE.CubeTextureLoader()

/*   loader.setPath('../img/')
  const textureCube = loader.load([
	'posx.jpg',
	'negx.jpg',
	'posy.jpg',
	'negy.jpg',
	'posz.jpg',
	'negz.jpg',
])  */   
   loader.setPath('../erp1/') 
  const textureCube = loader.load([
   'output_right.jpg',   // +X
    'output_left.jpg',    // -X
    'output_top.jpg',     // +Y
    'output_bottom.jpg',  // -Y
    'output_back.jpg',    // +Z 前
    'output_front.jpg',   // -Z 后
])    
scene.background = textureCube
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
const renderer = new THREE.WebGLRenderer({ antialias: true })
const controls = new OrbitControls(camera, renderer.domElement)
function init() {
	camera.position.set(0, 0, 5)
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	controls.update()
	function animate() {
		requestAnimationFrame(animate)
		controls.update()
		renderer.render(scene, camera)
	}
	animate()
}
init()

