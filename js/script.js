let sizeScale = 0;
let velocityOrbitScale = 0;
let velocityRotationScale = 0;


function scaleSize(size) {
    return (size / 2) * (window.innerHeight / window.innerWidth);
}

function scaleDistance(planet) {
    //return Sun.diameterModel / 2 + planet.distance + planet.diameter / 2;
    return (SunSphere.position.x + Sun.diameterModel / 2 + planet.distance * 5) * (window.innerHeight/ window.innerWidth);
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function rotationSpeed(speed) {
    return Math.PI * (2 / speed);
}

function planetInclination(planet) {
    return Math.tan(degToRad(planet.orbitalInclination)) * scaleDistance(planet);
}
var SunTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_sun.jpg')});
var MercuryTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_mercury.jpg')});
var VenusTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_venus_surface.jpg')});
var EarthTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_earth_daymap.jpg')});
var MarsTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_mars.jpg')});
var JupiterTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_jupiter.jpg')});
var SaturnTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_saturn.jpg')});
var UranusTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_uranus.jpg')});
var NeptuneTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_neptune.jpg')});


let loader = new THREE.TextureLoader();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var SunGeometry = new THREE.SphereGeometry(scaleSize(Sun.diameterModel),32,32);
var SunMaterial = new THREE.MeshFaceMaterial(SunTexture)
var SunSphere = new THREE.Mesh( SunGeometry, SunMaterial );
SunSphere.position.set(0,0,0);

var MercuryGeometry = new THREE.SphereGeometry(scaleSize(Mercury.diameter),32,32);
var MercuryMaterial = new THREE.MeshFaceMaterial(MercuryTexture)
var MercurySphere = new THREE.Mesh( MercuryGeometry, MercuryMaterial );
var MercuryAxis = new THREE.Vector3(0,1,0).normalize();
MercurySphere.position.set(scaleDistance(Mercury),planetInclination(Mercury),0);
MercurySphere.rotation.z = degToRad(Mercury.obliquityToOrbit);

var VenusGeometry = new THREE.SphereGeometry(scaleSize(Venus.diameter),32,32);
var VenusMaterial = new THREE.MeshFaceMaterial(VenusTexture)
var VenusSphere = new THREE.Mesh( VenusGeometry, VenusMaterial );
var VenusAxis = new THREE.Vector3(0,1,0).normalize();
VenusSphere.position.set(scaleDistance(Venus),planetInclination(Venus),0);
VenusSphere.rotation.z = degToRad(Venus.obliquityToOrbit);

var EarthGeometry = new THREE.SphereGeometry(scaleSize(Earth.diameter),32,32);
var EarthMaterial = new THREE.MeshFaceMaterial(EarthTexture)
var EarthSphere = new THREE.Mesh( EarthGeometry, EarthMaterial );
var EarthAxis = new THREE.Vector3(0,1,0).normalize();
EarthSphere.position.set(scaleDistance(Earth),planetInclination(Earth),0);
EarthSphere.rotation.z = degToRad(Earth.obliquityToOrbit);

var MarsGeometry = new THREE.SphereGeometry(scaleSize(Mars.diameter),32,32);
var MarsMaterial = new THREE.MeshFaceMaterial(MarsTexture)
var MarsSphere = new THREE.Mesh( MarsGeometry, MarsMaterial );
var MarsAxis = new THREE.Vector3(0,1,0).normalize();
MarsSphere.position.set(scaleDistance(Mars),planetInclination(Mars),0);
MarsSphere.rotation.z = degToRad(Mars.obliquityToOrbit);

var JupiterGeometry = new THREE.SphereGeometry(scaleSize(Jupiter.diameter),32,32);
var JupiterMaterial = new THREE.MeshFaceMaterial(JupiterTexture)
var JupiterSphere = new THREE.Mesh( JupiterGeometry, JupiterMaterial );
var JupiterAxis = new THREE.Vector3(0,1,0).normalize();
JupiterSphere.position.set(scaleDistance(Jupiter),planetInclination(Jupiter),0);
JupiterSphere.rotation.z = degToRad(Jupiter.obliquityToOrbit);

var SaturnGeometry = new THREE.SphereGeometry(scaleSize(Saturn.diameter),32,32);
var SaturnMaterial = new THREE.MeshFaceMaterial(SaturnTexture)
var SaturnSphere = new THREE.Mesh( SaturnGeometry, SaturnMaterial );
var SaturnAxis = new THREE.Vector3(0,1,0).normalize();
SaturnSphere.position.set(scaleDistance(Saturn),planetInclination(Saturn),0);
SaturnSphere.rotation.z = degToRad(Saturn.obliquityToOrbit);

var UranusGeometry = new THREE.SphereGeometry(scaleSize(Uranus.diameter),32,32);
var UranusMaterial = new THREE.MeshFaceMaterial(UranusTexture)
var UranusSphere = new THREE.Mesh( UranusGeometry, UranusMaterial );
var UranusAxis = new THREE.Vector3(0,1,0).normalize();
UranusSphere.position.set(scaleDistance(Uranus),planetInclination(Uranus),0);
UranusSphere.rotation.z = degToRad(Uranus.obliquityToOrbit);

var NeptuneGeometry = new THREE.SphereGeometry(scaleSize(Neptune.diameter),32,32);
var NeptuneMaterial = new THREE.MeshFaceMaterial(NeptuneTexture)
var NeptuneSphere = new THREE.Mesh( NeptuneGeometry, NeptuneMaterial );
var NeptuneAxis = new THREE.Vector3(0,1,0).normalize();
NeptuneSphere.position.set(scaleDistance(Neptune),planetInclination(Neptune),0);
NeptuneSphere.rotation.z = degToRad(Neptune.obliquityToOrbit);

loader.load('img/2k_stars_milky_way.jpg' , function(texture)
            {
             scene.background = texture;  
            });
scene.add( SunSphere );
scene.add( MercurySphere );
scene.add( VenusSphere );
scene.add( EarthSphere );
scene.add( MarsSphere );
scene.add( JupiterSphere );
scene.add( SaturnSphere );
scene.add( UranusSphere );
scene.add( NeptuneSphere ); 

camera.position.z = 1010;

function animate() {
    requestAnimationFrame( animate );
    SunSphere.rotation.x += 0.01;
    SunSphere.rotation.y += 0.01;
    SunSphere.rotation.z += 0.01;
   MercurySphere.rotateOnAxis(MercuryAxis, rotationSpeed(Mercury.rotationPeriod));
   VenusSphere.rotateOnAxis(VenusAxis, -rotationSpeed(Venus.rotationPeriod));
   EarthSphere.rotateOnAxis(EarthAxis, rotationSpeed(Earth.rotationPeriod));
   MarsSphere.rotateOnAxis(MarsAxis, rotationSpeed(Mars.rotationPeriod));
   JupiterSphere.rotateOnAxis(JupiterAxis, rotationSpeed(Jupiter.rotationPeriod));
   SaturnSphere.rotateOnAxis(SaturnAxis, rotationSpeed(Saturn.rotationPeriod));
   UranusSphere.rotateOnAxis(UranusAxis, rotationSpeed(Uranus.rotationPeriod));
   NeptuneSphere.rotateOnAxis(NeptuneAxis, rotationSpeed(Neptune.rotationPeriod));
	renderer.render( scene, camera );
}
animate();