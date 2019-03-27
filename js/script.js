let sizeScale = 0;
let velocityOrbitScale = 0;
let velocityRotationScale = 0;
var rotWorldMatrix;


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
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var SunGeometry = new THREE.SphereGeometry(scaleSize(Sun.diameterModel),32,32);
var SunMaterial = new THREE.MeshFaceMaterial(SunTexture)
var SunSphere = new THREE.Mesh( SunGeometry, SunMaterial );
SunSphere.position.set(0,0,0);


var PlanetAxis = new THREE.Vector3(0,1,0).normalize();
var OrbitalAxis = new THREE.Vector3(0,1,0).normalize();

var MercuryGeometry = new THREE.SphereGeometry(scaleSize(Mercury.diameter),32,32);
var MercuryMaterial = new THREE.MeshFaceMaterial(MercuryTexture)
var MercurySphere = new THREE.Mesh( MercuryGeometry, MercuryMaterial );
var MercuryGroup = new THREE.Group();
MercuryGroup.add(MercurySphere);
MercuryGroup.rotation.x = degToRad(Mercury.obliquityToOrbit);
MercuryGroup.position.set(0,0,0);
MercurySphere.position.set(scaleDistance(Mercury),0,0);
MercurySphere.rotation.z = degToRad(Mercury.obliquityToOrbit);

var VenusGeometry = new THREE.SphereGeometry(scaleSize(Venus.diameter),32,32);
var VenusMaterial = new THREE.MeshFaceMaterial(VenusTexture)
var VenusSphere = new THREE.Mesh( VenusGeometry, VenusMaterial );
var VenusGroup = new THREE.Group();
VenusGroup.add(VenusSphere);
VenusGroup.rotation.x = degToRad(Venus.orbitalInclination);
VenusGroup.position.set(0,0,0);
VenusSphere.position.set(scaleDistance(Venus),0,0);
VenusSphere.rotation.z = degToRad(Venus.obliquityToOrbit);

var EarthGeometry = new THREE.SphereGeometry(scaleSize(Earth.diameter),32,32);
var EarthMaterial = new THREE.MeshFaceMaterial(EarthTexture)
var EarthSphere = new THREE.Mesh( EarthGeometry, EarthMaterial );
var EarthGroup = new THREE.Group();
EarthGroup.add(EarthSphere);
EarthGroup.rotation.x = degToRad(Earth.orbitalInclination);
EarthGroup.position.set(0,0,0);
EarthSphere.position.set(scaleDistance(Earth),0,0);
EarthSphere.rotation.z = degToRad(Earth.obliquityToOrbit);

var MarsGeometry = new THREE.SphereGeometry(scaleSize(Mars.diameter),32,32);
var MarsMaterial = new THREE.MeshFaceMaterial(MarsTexture)
var MarsSphere = new THREE.Mesh( MarsGeometry, MarsMaterial );
var MarsGroup = new THREE.Group();
MarsGroup.add(MarsSphere);
MarsGroup.rotation.x = degToRad(Mars.orbitalInclination);
MarsGroup.position.set(0,0,0);
MarsSphere.position.set(scaleDistance(Mars),0,0);
MarsSphere.rotation.z = degToRad(Mars.obliquityToOrbit);

var JupiterGeometry = new THREE.SphereGeometry(scaleSize(Jupiter.diameter),32,32);
var JupiterMaterial = new THREE.MeshFaceMaterial(JupiterTexture)
var JupiterSphere = new THREE.Mesh( JupiterGeometry, JupiterMaterial );
var JupiterGroup = new THREE.Group();
JupiterGroup.add(JupiterSphere);
JupiterGroup.rotation.x = degToRad(Jupiter.orbitalInclination);
JupiterGroup.position.set(0,0,0);
JupiterSphere.position.set(scaleDistance(Jupiter),0,0);
JupiterSphere.rotation.z = degToRad(Jupiter.obliquityToOrbit);

var SaturnGeometry = new THREE.SphereGeometry(scaleSize(Saturn.diameter),32,32);
var SaturnMaterial = new THREE.MeshFaceMaterial(SaturnTexture)
var SaturnSphere = new THREE.Mesh( SaturnGeometry, SaturnMaterial );
var SaturnGroup = new THREE.Group();
SaturnGroup.add(SaturnSphere);
SaturnGroup.rotation.x = degToRad(Saturn.orbitalInclination);
SaturnGroup.position.set(0,0,0);
SaturnSphere.position.set(scaleDistance(Saturn),0,0);
SaturnSphere.rotation.z = degToRad(Saturn.obliquityToOrbit);

var UranusGeometry = new THREE.SphereGeometry(scaleSize(Uranus.diameter),32,32);
var UranusMaterial = new THREE.MeshFaceMaterial(UranusTexture)
var UranusSphere = new THREE.Mesh( UranusGeometry, UranusMaterial );
var UranusGroup = new THREE.Group();
UranusGroup.add(UranusSphere);
UranusGroup.rotation.x = degToRad(Uranus.orbitalInclination);
UranusGroup.position.set(0,0,0);
UranusSphere.position.set(scaleDistance(Uranus),0,0);
UranusSphere.rotation.z = degToRad(Uranus.obliquityToOrbit);

var NeptuneGeometry = new THREE.SphereGeometry(scaleSize(Neptune.diameter),32,32);
var NeptuneMaterial = new THREE.MeshFaceMaterial(NeptuneTexture)
var NeptuneSphere = new THREE.Mesh( NeptuneGeometry, NeptuneMaterial );
var NeptuneGroup = new THREE.Group();
NeptuneGroup.add(NeptuneSphere);
NeptuneGroup.rotation.x = degToRad(Neptune.orbitalInclination);
NeptuneGroup.position.set(0,0,0);
NeptuneSphere.position.set(scaleDistance(Neptune),0,0);
NeptuneSphere.rotation.z = degToRad(Neptune.obliquityToOrbit);

/* loader.load('img/2k_stars_milky_way.jpg' , function(texture)
            {
             scene.background = texture;  
            }); */
 scene.add( SunSphere );

scene.add( MercuryGroup );
scene.add( VenusGroup );
scene.add(EarthGroup);
scene.add( MarsGroup );
scene.add( JupiterGroup );
scene.add( SaturnGroup );
scene.add( UranusGroup );
scene.add( NeptuneGroup );

camera.position.z = 500;
camera.position.x = -1100;
camera.position.y = 500;
camera.lookAt(0,0,0);

function animate() {
	renderer.render( scene, camera );
    SunSphere.rotation.x += 0.01;
    SunSphere.rotation.y += 0.01;
    SunSphere.rotation.z += 0.01;
    MercurySphere.rotateOnAxis(PlanetAxis, rotationSpeed(Mercury.rotationPeriod));
    VenusSphere.rotateOnAxis(PlanetAxis, -rotationSpeed(Venus.rotationPeriod));
    EarthSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Earth.rotationPeriod));
    MarsSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Mars.rotationPeriod));
    JupiterSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Jupiter.rotationPeriod));
    SaturnSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Saturn.rotationPeriod));
    UranusSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Uranus.rotationPeriod));
    NeptuneSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Neptune.rotationPeriod));
    MercuryGroup.rotateOnAxis(OrbitalAxis, degToRad(15));
    VenusGroup.rotateOnAxis(OrbitalAxis, degToRad(12));
    EarthGroup.rotateOnAxis(OrbitalAxis, degToRad(5));
    MarsGroup.rotateOnAxis(OrbitalAxis, degToRad(8));
    JupiterGroup.rotateOnAxis(OrbitalAxis, degToRad(8));
    SaturnGroup.rotateOnAxis(OrbitalAxis, degToRad(13));
    UranusGroup.rotateOnAxis(OrbitalAxis, degToRad(11));
    NeptuneGroup.rotateOnAxis(OrbitalAxis, degToRad(7));
    requestAnimationFrame( animate );

}
animate();