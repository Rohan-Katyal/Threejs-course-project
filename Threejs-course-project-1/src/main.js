import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
// initialising three.js => done
console.log(THREE);

// Initialising the " SCENE "

const scene = new THREE.Scene(); //scene variable defined

scene.background = new THREE.Color('grey');

// coneGeometry
const coneGeometry = new THREE.ConeGeometry(1,3,20,10,false);
const coneMaterial = new THREE.MeshBasicMaterial({
    color : 'skyblue',
    wireframe : true
});

const coneMesh = new THREE.Mesh(
    coneGeometry,
    coneMaterial
)
// Cylinder

const cylinderGeometry = new THREE.CylinderGeometry(1,1,3.5,50,1,false);
const cylinderMaterial = new THREE.MeshBasicMaterial({
    color : 'skyblue',
    wireframe : true
})

const cylinderMesh = new THREE.Mesh(
    cylinderGeometry,
    cylinderMaterial
)

const cubeGeometry = new THREE.BoxGeometry(1.5,1,1,5,5); //shape dimensions => cube
const cubeMaterial = new THREE.MeshBasicMaterial({
    color : 'red',
    wireframe : true,
    wireframeLinecap: true
}); //how the cube looks

const cubeMesh = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial)

// console.log(cubeMesh)
// console.log(scene); // scene doesn't have any children, which will cause no object being displayed in the scene

// small-cylinder Mesh
const smallcylinderGeometry = new THREE.CylinderGeometry(0.2,0.5,0.5,40,1,false);
const smallcylinderMaterial = new THREE.MeshBasicMaterial({
    color : 'skyblue',
    wireframe : true
})

const smallcylinderMesh = new THREE.Mesh(
    smallcylinderGeometry,
    smallcylinderMaterial
)
// circle-Mesh
const circleGeometry = new THREE.CircleGeometry(0.35);
const circleMaterial = new THREE.MeshBasicMaterial({
    color : 'purple',
    wireframe : true
});

const circleMesh = new THREE.Mesh(
    circleGeometry,
    circleMaterial
)

const sceneCamera3D = new THREE.Group();
sceneCamera3D.add(cubeMesh);
sceneCamera3D.add(smallcylinderMesh);
sceneCamera3D.add(circleMesh);

const sceneBullet = new THREE.Group();
sceneBullet.add(coneMesh,cylinderMesh);

cubeMesh.position.x = 3;
coneMesh.position.x = 0;
coneMesh.position.y = 2.001;
cylinderMesh.position.y = -1.25;
smallcylinderMesh.rotation.z = -Math.PI/2
smallcylinderMesh.position.x = 2
circleMesh.rotation.y = Math.PI/2
circleMesh.position.x = 1.75

sceneCamera3D.position.x = 2
sceneCamera3D.position.y = 1
sceneCamera3D.rotation.z = 13*(Math.PI/180)
// So, we do
scene.add(sceneBullet, sceneCamera3D);
console.log(scene); // Now the cubeMesh is the children of scene.

// Scene => Done

// Initialising the Camera

const camera = new THREE.PerspectiveCamera(
    100, // FOV
    window.innerWidth/window.innerHeight, // Aspect Ratio
    0.5,// Nearest distance limit
    200 // Farthest distance limit
)

// FOV => The Feild of view upto which the camera can see inside a scene,
// we actually give the FOV angle as the argument, which eventually decides the FOV of the camera itself,
// that upto how much wider or farther disstance a camera will see and display,

// Aspect Ratio => It's the ratio of the height and width 
// which helps us define that what is the display size we see, 
// such as 16;9, 9:16, 3:4, 4:3 and etc.
// we are using window.innerWidth and window.innerHeight as 
// these are the default screen size of the webpage given in the window object,
// There units can be displayed using 
// console.log(window.innerWidth, window.innerHeight)

// Nearest distance limit(Near) => It's the limit of the nearest object the camera can see,
// if any object ever comes closer than the defined limit we can't ever see it.

// Farthest distance limit(Far) => This refers to the Farthest distance upto which the camera can see,
// if any object evere goes beyond this limit it vanishes and can't be seen by the camera.

// consider Near and Far as the Lower and Upper bound of the camera view limit,
// Creating a Limit Bound
// where => Near => Lower bound 
// Far => Upper bound
// Limit Bound => (Near, Far) 
// anything between them can be seen whereas
// anything outside the limit bound can't be seen by the camera.

// now since we have created the camera it is at the same position as the mesh
// so, we need to move to a little away from the mesh,

camera.position.z = 5;

// and since camera is still a three.js 3D object, just that it can't be seen,
// we have to add it to the scene itself.
scene.add(camera);

// Camera => Done

// Initialising the Renderer

// First we define a canvas using <canvas> to be used to render our scene to the webpage itself.

const canvasThreejs = document.querySelector('canvas.threejs');

console.log(canvasThreejs); //checking if the canvas have been defined properly

const renderer = new THREE.WebGLRenderer({
    canvas : canvasThreejs
})
// canvas is the object attribute
// canvasThreejs is our variable for canvas HTML element
// we can also do the below incase our variable is also canvas, same as the attribute itself.
// const renderer = new THREE.WebGLRenderer({canvas})

// rendering the scene

window.addEventListener('resize', () => {
  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// renderer.render(scene,camera);
// Now our scene is being showed very small in the webpage, 
// so we need to define the Size of our Scene

const controls = new OrbitControls(camera,canvasThreejs);

const renderloop = ()=>{
    // console.log('render');
    controls.update()
    renderer.render(scene,camera);
    window.requestAnimationFrame(renderloop);
}
renderloop();

renderer.setSize(window.innerWidth,innerHeight);

controls.enableDamping = true;
controls.autoRotate = true;