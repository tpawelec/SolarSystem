let loader = new THREE.TextureLoader();
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3100 );
let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let PlanetAxis = new THREE.Vector3(0,1,0).normalize();
let OrbitalAxis = new THREE.Vector3(0,1,0).normalize();

loader.load('img/2k_stars_milky_way.jpg' , function(texture)
            {
             scene.background = texture;  
            });

camera.position.z = 500;
camera.position.x = -1700;
camera.position.y = 500;
camera.lookAt(0,0,0);

var axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );
function scaleSize(size) {
    return (size / 2) * (window.innerHeight / window.innerWidth);
}

function scaleDistance(planet) {
    return (SunSphere.position.x + Sun.diameterModel / 2 + planet.distance * 5) * (window.innerHeight/ window.innerWidth);
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function rotationSpeed(speed) {
    return Math.PI * (2 / speed);
}

/*
SUN
*/
let SunTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_sun.jpg')});
let SunGeometry = new THREE.SphereGeometry(scaleSize(Sun.diameterModel),32,32);
let SunSphere = new THREE.Mesh( SunGeometry, SunTexture );
SunSphere.position.set(0,0,0);
scene.add( SunSphere );

/*
    MERCURY
*/
let MercuryTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_mercury.jpg')});
let MercuryGeometry = new THREE.SphereGeometry(scaleSize(Mercury.diameter),32,32);
let MercurySphere = new THREE.Mesh( MercuryGeometry, MercuryTexture );
let MercuryGroup = new THREE.Group();
MercuryGroup.add(MercurySphere);
MercuryGroup.rotation.x = degToRad(Mercury.obliquityToOrbit);
MercuryGroup.position.set(0,0,0);
MercurySphere.position.set(scaleDistance(Mercury),0,0);
MercurySphere.rotation.z = degToRad(Mercury.obliquityToOrbit);
scene.add( MercuryGroup );

/*
    VENUS
*/
let VenusTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_venus_surface.jpg')});
let VenusGeometry = new THREE.SphereGeometry(scaleSize(Venus.diameter),32,32);
let VenusSphere = new THREE.Mesh( VenusGeometry, VenusTexture );
let VenusGroup = new THREE.Group();
VenusGroup.add(VenusSphere);
VenusGroup.rotation.x = degToRad(Venus.orbitalInclination);
VenusGroup.position.set(0,0,0);
VenusSphere.position.set(scaleDistance(Venus),0,0);
VenusSphere.rotation.z = degToRad(Venus.obliquityToOrbit);
scene.add( VenusGroup );

/*
EARTH
*/
let EarthTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_earth_daymap.jpg')});
let EarthGeometry = new THREE.SphereGeometry(scaleSize(Earth.diameter),32,32);
let EarthSphere = new THREE.Mesh( EarthGeometry, EarthTexture );
let EarthGroup = new THREE.Group();
EarthGroup.add(EarthSphere);
EarthGroup.rotation.x = degToRad(Earth.orbitalInclination);
EarthGroup.position.set(0,0,0);
EarthSphere.position.set(scaleDistance(Earth),0,0);
EarthSphere.rotation.z = degToRad(Earth.obliquityToOrbit);
scene.add( EarthGroup );

/*
    MARS
*/
let MarsTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_mars.jpg')});
let MarsGeometry = new THREE.SphereGeometry(scaleSize(Mars.diameter),32,32);
let MarsSphere = new THREE.Mesh( MarsGeometry, MarsTexture );
let MarsGroup = new THREE.Group();
MarsGroup.add(MarsSphere);
MarsGroup.rotation.x = degToRad(Mars.orbitalInclination);
MarsGroup.position.set(0,0,0);
MarsSphere.position.set(scaleDistance(Mars),0,0);
MarsSphere.rotation.z = degToRad(Mars.obliquityToOrbit);
scene.add( MarsGroup );

/*
JUPITER
*/
let JupiterTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_jupiter.jpg')});
let JupiterGeometry = new THREE.SphereGeometry(scaleSize(Jupiter.diameter),32,32);
let JupiterSphere = new THREE.Mesh( JupiterGeometry, JupiterTexture );
let JupiterGroup = new THREE.Group();
JupiterGroup.add(JupiterSphere);
JupiterGroup.rotation.x = degToRad(Jupiter.orbitalInclination);
JupiterGroup.position.set(0,0,0);
JupiterSphere.position.set(scaleDistance(Jupiter),0,0);
JupiterSphere.rotation.z = degToRad(Jupiter.obliquityToOrbit);
scene.add( JupiterGroup );

/*
    SATURN
*/
let SaturnTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_saturn.jpg')});
let SaturnGeometry = new THREE.SphereGeometry(scaleSize(Saturn.diameter),32,32);
let SaturnSphere = new THREE.Mesh( SaturnGeometry, SaturnTexture );
let SaturnGroup = new THREE.Group();
SaturnGroup.add(SaturnSphere);
SaturnGroup.rotation.x = degToRad(Saturn.orbitalInclination);
SaturnGroup.position.set(0,0,0);
SaturnSphere.position.set(scaleDistance(Saturn),0,0);
SaturnSphere.rotation.z = degToRad(Saturn.obliquityToOrbit);
scene.add( SaturnGroup );

/*
URANUS
*/
let UranusTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_uranus.jpg')});
let UranusGeometry = new THREE.SphereGeometry(scaleSize(Uranus.diameter),32,32);
let UranusSphere = new THREE.Mesh( UranusGeometry, UranusTexture );
let UranusGroup = new THREE.Group();
UranusGroup.add(UranusSphere);
UranusGroup.rotation.x = degToRad(Uranus.orbitalInclination);
UranusGroup.position.set(0,0,0);
UranusSphere.position.set(scaleDistance(Uranus),0,0);
UranusSphere.rotation.z = degToRad(Uranus.obliquityToOrbit);
scene.add( UranusGroup );

/*
NEPTUNE
*/
let NeptuneTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2k_neptune.jpg')});
let NeptuneGeometry = new THREE.SphereGeometry(scaleSize(Neptune.diameter),32,32);
let NeptuneSphere = new THREE.Mesh( NeptuneGeometry, NeptuneTexture );
let NeptuneGroup = new THREE.Group();
NeptuneGroup.add(NeptuneSphere);
NeptuneGroup.rotation.x = degToRad(Neptune.orbitalInclination);
NeptuneGroup.position.set(0,0,0);
NeptuneSphere.position.set(scaleDistance(Neptune),0,0);
NeptuneSphere.rotation.z = degToRad(Neptune.obliquityToOrbit);
scene.add( NeptuneGroup );



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