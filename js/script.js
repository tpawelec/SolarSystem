let scaleSpeed = 1;

let loader, scene, camera, renderer;
let gui, cam, focusGui;
let PlanetAxis, OrbitalAxis;

let SunTexture, SunSphere, SunGeometry;
let MercuryTexture, MercurySphere, MercuryGroup, MercuryGeometry;
let VenusTexture, VenusSphere, VenusGroup, VenusGeometry;
let EarthTexture, EarthSphere, EarthGroup, EarthGeometry;
let MarsTexture, MarsSphere, MarsGroup, MarsGeometry;
let JupiterTexture, JupiterSphere, JupiterGroup, JupiterGeometry;
let SaturnTexture, SaturnSphere, SaturnGroup, SaturnGeometry;
let NeptuneTexture, NeptuneSphere, NeptuneGroup, NeptuneGeometry;
let UranusTexture, UranusSphere, UranusGroup, UranusGeometry;

let options, focusOptions;

let cameraPos, cameraLookAt;
let asd;
init();
animate();

function init() {
    
    cameraPos = {
        x: -1700,
        y: 500,
        z: 500
    }
    asd = "1";
    /*
        SCENE
    */
    loader = new THREE.TextureLoader();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3100 );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    PlanetAxis = new THREE.Vector3(0,1,0).normalize();
    OrbitalAxis = new THREE.Vector3(0,1,0).normalize();
    
    loader.load('img/bg.jpg' , function(texture)
                {
                 scene.background = texture;  
                });
    
    camera.position.z = cameraPos.z;
    camera.position.x = cameraPos.x;
    camera.position.y = cameraPos.y;
    camera.lookAt(0,0,0);
    

    window.addEventListener('resize', onWindowResize, false);

    /*
        OPTIONS        
    */
    options = {
       camera: {
           speed: 1
        }
    }

    focusOptions = {
        entireScene: true,
        Mercury: false,
        Venus: false,
        Earth: false,
        Mars: false,
        Jupiter: false,
        Saturn: false,
        Neptune: false,
        Uranus: false
    }
    gui = new dat.GUI();
    cam = gui.addFolder('Camera');
    cam.add(options.camera, 'speed', 1, 100).listen();
    cam.open();
    focusOpt = gui.addFolder('Focus');
    focusOpt.add(focusOptions, 'entireScene').name('Entire Scene').listen().onChange(() => {setOptions('entireScene')});
    focusOpt.add(focusOptions, 'Mercury').name('Mercury').listen().onChange(() => {setOptions('Mercury')});
    focusOpt.add(focusOptions, 'Venus').name('Venus').listen().onChange(() => {setOptions('Venus')});
    focusOpt.add(focusOptions, 'Earth').name('Earth').listen().onChange(() => {setOptions('Earth')});
    focusOpt.add(focusOptions, 'Mars').name('Mars').listen().onChange(() => {setOptions('Mars')});
    focusOpt.add(focusOptions, 'Jupiter').name('Jupiter').listen().onChange(() => {setOptions('Jupiter')});
    focusOpt.add(focusOptions, 'Saturn').name('Saturn').listen().onChange(() => {setOptions('Saturn')});
    focusOpt.add(focusOptions, 'Neptune').name('Neptune').listen().onChange(() => {setOptions('Neptune')});
    focusOpt.add(focusOptions, 'Uranus').name('Uranus').listen().onChange(() => {setOptions('Uranus')});
    focusOpt.open();
    

    /*
        SUN
    */
    SunTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(Sun.texture)});
    SunGeometry = new THREE.SphereGeometry(scaleSize(Sun.diameterModel),32,32);
    SunSphere = new THREE.Mesh( SunGeometry, SunTexture );
    SunSphere.position.set(0,0,0);
    scene.add( SunSphere );

    /*
        MERCURY
    */
    MercuryTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(Mercury.texture)});
    MercuryGeometry = new THREE.SphereGeometry(scaleSize(Mercury.diameter),32,32);
    MercurySphere = new THREE.Mesh( MercuryGeometry, MercuryTexture );
    MercuryGroup = new THREE.Group();
    MercuryGroup.add(MercurySphere);
    MercuryGroup.rotation.x = degToRad(Mercury.obliquityToOrbit);
    MercuryGroup.position.set(0,0,0);
    MercurySphere.position.set(scaleDistance(Mercury),0,0);
    MercurySphere.rotation.z = degToRad(Mercury.obliquityToOrbit);
    scene.add( MercuryGroup );
    
    /*
        VENUS
    */
    VenusTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(Venus.texture)});
    VenusGeometry = new THREE.SphereGeometry(scaleSize(Venus.diameter),32,32);
    VenusSphere = new THREE.Mesh( VenusGeometry, VenusTexture );
    VenusGroup = new THREE.Group();
    VenusGroup.add(VenusSphere);
    VenusGroup.rotation.x = degToRad(Venus.orbitalInclination);
    VenusGroup.position.set(0,0,0);
    VenusSphere.position.set(scaleDistance(Venus),0,0);
    VenusSphere.rotation.z = degToRad(Venus.obliquityToOrbit);
    scene.add( VenusGroup );
    
    /*
    EARTH
    */
    EarthTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(Earth.texture)});
    EarthGeometry = new THREE.SphereGeometry(scaleSize(Earth.diameter),32,32);
    EarthSphere = new THREE.Mesh( EarthGeometry, EarthTexture );
    EarthGroup = new THREE.Group();
    EarthGroup.add(EarthSphere);
    EarthGroup.rotation.x = degToRad(Earth.orbitalInclination);
    EarthGroup.position.set(0,0,0);
    EarthSphere.position.set(scaleDistance(Earth),0,0);
    EarthSphere.rotation.z = degToRad(Earth.obliquityToOrbit);
    scene.add( EarthGroup );
    
    /*
        MARS
    */
    MarsTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(Mars.texture)});
    MarsGeometry = new THREE.SphereGeometry(scaleSize(Mars.diameter),32,32);
    MarsSphere = new THREE.Mesh( MarsGeometry, MarsTexture );
    MarsGroup = new THREE.Group();
    MarsGroup.add(MarsSphere);
    MarsGroup.rotation.x = degToRad(Mars.orbitalInclination);
    MarsGroup.position.set(0,0,0);
    MarsSphere.position.set(scaleDistance(Mars),0,0);
    MarsSphere.rotation.z = degToRad(Mars.obliquityToOrbit);
    scene.add( MarsGroup );
    
    /*
    JUPITER
    */
    JupiterTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(Jupiter.texture)});
    JupiterGeometry = new THREE.SphereGeometry(scaleSize(Jupiter.diameter),32,32);
    JupiterSphere = new THREE.Mesh( JupiterGeometry, JupiterTexture );
    JupiterGroup = new THREE.Group();
    JupiterGroup.add(JupiterSphere);
    JupiterGroup.rotation.x = degToRad(Jupiter.orbitalInclination);
    JupiterGroup.position.set(0,0,0);
    JupiterSphere.position.set(scaleDistance(Jupiter),0,0);
    JupiterSphere.rotation.z = degToRad(Jupiter.obliquityToOrbit);
    scene.add( JupiterGroup );
    
    /*
        SATURN
    */
    SaturnTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(Saturn.texture)});
    SaturnGeometry = new THREE.SphereGeometry(scaleSize(Saturn.diameter),32,32);
    SaturnSphere = new THREE.Mesh( SaturnGeometry, SaturnTexture );
    SaturnGroup = new THREE.Group();
    SaturnGroup.add(SaturnSphere);
    SaturnGroup.rotation.x = degToRad(Saturn.orbitalInclination);
    SaturnGroup.position.set(0,0,0);
    SaturnSphere.position.set(scaleDistance(Saturn),0,0);
    SaturnSphere.rotation.z = degToRad(Saturn.obliquityToOrbit);
    scene.add( SaturnGroup );
    
    /*
    URANUS
    */
    UranusTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(Uranus.texture)});
    UranusGeometry = new THREE.SphereGeometry(scaleSize(Uranus.diameter),32,32);
    UranusSphere = new THREE.Mesh( UranusGeometry, UranusTexture );
    UranusGroup = new THREE.Group();
    UranusGroup.add(UranusSphere);
    UranusGroup.rotation.x = degToRad(Uranus.orbitalInclination);
    UranusGroup.position.set(0,0,0);
    UranusSphere.position.set(scaleDistance(Uranus),0,0);
    UranusSphere.rotation.z = degToRad(Uranus.obliquityToOrbit);
    scene.add( UranusGroup );
    
    /*
    NEPTUNE
    */
    NeptuneTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(Neptune.texture)});
    NeptuneGeometry = new THREE.SphereGeometry(scaleSize(Neptune.diameter),32,32);
    NeptuneSphere = new THREE.Mesh( NeptuneGeometry, NeptuneTexture );
    NeptuneGroup = new THREE.Group();
    NeptuneGroup.add(NeptuneSphere);
    NeptuneGroup.rotation.x = degToRad(Neptune.orbitalInclination);
    NeptuneGroup.position.set(0,0,0);
    NeptuneSphere.position.set(scaleDistance(Neptune),0,0);
    NeptuneSphere.rotation.z = degToRad(Neptune.obliquityToOrbit);
    scene.add( NeptuneGroup );
}
    




function animate() {
    renderer.render( scene, camera );
    SunSphere.rotation.x += 0.01;
    SunSphere.rotation.y += 0.01;
    SunSphere.rotation.z += 0.01;
    MercurySphere.rotateOnAxis(PlanetAxis, rotationSpeed(Mercury.rotationPeriod));
    VenusSphere.rotateOnAxis(PlanetAxis, -rotationSpeed(Venus.rotationPeriod));
    EarthSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Earth.rotationPeriod));
    MarsSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Mars.rotationPeriod));
    //JupiterSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Jupiter.rotationPeriod));
    SaturnSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Saturn.rotationPeriod));
    UranusSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Uranus.rotationPeriod));
    NeptuneSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Neptune.rotationPeriod));
    MercuryGroup.rotateOnAxis(OrbitalAxis, orbitalSpeed(Mercury));
    VenusGroup.rotateOnAxis(OrbitalAxis, -orbitalSpeed(Venus));
    EarthGroup.rotateOnAxis(OrbitalAxis, orbitalSpeed(Earth));
    MarsGroup.rotateOnAxis(OrbitalAxis, orbitalSpeed(Mars));
    JupiterGroup.rotateOnAxis(OrbitalAxis, orbitalSpeed(Jupiter));
    SaturnGroup.rotateOnAxis(OrbitalAxis, orbitalSpeed(Saturn));
    UranusGroup.rotateOnAxis(OrbitalAxis, -orbitalSpeed(Uranus));
    NeptuneGroup.rotateOnAxis(OrbitalAxis, orbitalSpeed(Neptune));
    
    switch (true) {
        case focusOptions.entireScene:
            camera.lookAt(0,0,0);
            break;
            case focusOptions.Mercury:
            camera.lookAt(MercurySphere.position);
            break;
            case focusOptions.Venus:
            camera.lookAt(VenusSphere.position);
            break;
            case focusOptions.Earth:
            camera.lookAt(EarthSphere.position);
            break;
        case focusOptions.Mars:
        camera.lookAt(MarsSphere.position);
            break;
        case focusOptions.Jupiter:
        camera.fov = 75;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.near = 1;
            camera.far = 300;
            camera.position.x = JupiterSphere.position.x * Math.sin(JupiterGroup.rotation.x); 
            camera.position.y = JupiterSphere.position.x * Math.sin(JupiterGroup.rotation.y); 
            camera.position.z = JupiterSphere.position.x * Math.sin(JupiterGroup.rotation.z); 
            camera.lookAt(JupiterSphere.position);
            break;
        case focusOptions.Saturn:
        camera.lookAt(SaturnSphere.position);
            break;
        case focusOptions.Neptune:
            camera.lookAt(NeptuneSphere.position);
            break;
            case focusOptions.Uranus:
            camera.lookAt(UranusSphere.position);
            break;
            default:
            break;
    }
    requestAnimationFrame( animate );

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

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
    return options.camera.speed * (Math.PI * (2 / speed));
}

function orbitalSpeed(planet) {
    return options.camera.speed * ((rotationSpeed(planet.rotationPeriod) / options.camera.speed) / planet.orbitalPeriod);
}

function setOptions(option) {
    for(let opt in focusOptions) {
        focusOptions[opt] = false;
    }

    focusOptions[option] = true;
    
    
}