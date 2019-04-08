let scaleSpeed = 1;

let loader, scene, camera, renderer;
let gui, cam, focusGui;
let PlanetAxis;

let SunTexture, SunSphere, SunGeometry;
let MercuryTexture, MercurySphere, MercuryGeometry;
let VenusTexture, VenusSphere, VenusGeometry;
let EarthTexture, EarthSphere, EarthGeometry;
let MarsTexture, MarsSphere, MarsGeometry;
let JupiterTexture, JupiterSphere, JupiterGeometry;
let SaturnTexture, SaturnSphere, SaturnGeometry;
let NeptuneTexture, NeptuneSphere, NeptuneGeometry;
let UranusTexture, UranusSphere, UranusGeometry;
let sunLight, aLight;
let options, focusOptions;

let cameraPos, cameraLookAt;
let thetaMercury, thetaVenus, thetaEarth, thetaMars, thetaJupiter, thetaSaturn, thetaUranus, thetaNeptune;

let controls;

const direction = new THREE.Vector3();
let camOffset = 1700;

let currentObj;
init();
animate();

function init() {

    thetaMercury = 0;
    thetaVenus = 0;
    thetaEarth = 0;
    thetaMars = 0;
    thetaJupiter = 0;
    thetaSaturn = 0;
    thetaUranus = 0;
    thetaNeptune = 0;

    /*
        SCENE
    */
    loader = new THREE.TextureLoader();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 4800);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; //Shadow
    renderer.shadowMapSoft = true; // Shadow
    renderer.shadowMap.type = THREE.PCFShadowMap; //Shadow
    document.body.appendChild(renderer.domElement);

    PlanetAxis = new THREE.Vector3(0, 1, 0).normalize();

    loader.load('img/bg.jpg', function (texture) {
        scene.background = texture;
    });



    window.addEventListener('resize', onWindowResize, false);

    /*
    OPTIONS        
    */
    options = {
        camera: {
            speed: 5
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
    focusOpt.add(focusOptions, 'entireScene').name('Entire Scene').listen().onChange(() => {
        setOptions('entireScene')
    });
    focusOpt.add(focusOptions, 'Mercury').name('Mercury').listen().onChange(() => {
        setOptions('Mercury')
    });
    focusOpt.add(focusOptions, 'Venus').name('Venus').listen().onChange(() => {
        setOptions('Venus')
    });
    focusOpt.add(focusOptions, 'Earth').name('Earth').listen().onChange(() => {
        setOptions('Earth')
    });
    focusOpt.add(focusOptions, 'Mars').name('Mars').listen().onChange(() => {
        setOptions('Mars')
    });
    focusOpt.add(focusOptions, 'Jupiter').name('Jupiter').listen().onChange(() => {
        setOptions('Jupiter')
    });
    focusOpt.add(focusOptions, 'Saturn').name('Saturn').listen().onChange(() => {
        setOptions('Saturn')
    });
    focusOpt.add(focusOptions, 'Neptune').name('Neptune').listen().onChange(() => {
        setOptions('Neptune')
    });
    focusOpt.add(focusOptions, 'Uranus').name('Uranus').listen().onChange(() => {
        setOptions('Uranus')
    });
    focusOpt.open();

    camera.position.z = 500;
    camera.position.x = -1700;
    camera.position.y = 500;

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.rotateSpeed = 0.08;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.08;
    controls.enableKeys = false;
    controls.panSpeed = 0.05;
    /*
    SUN
    */
    SunTexture = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(Sun.texture)
    });
    SunGeometry = new THREE.SphereGeometry(scaleSize(Sun.diameterModel), 32, 32);
    SunSphere = new THREE.Mesh(SunGeometry, SunTexture);
    SunSphere.position.set(0, 0, 0);
    scene.add(SunSphere);

    /*
    LIGHT
    */
    sunLight = new THREE.PointLight(0xffffff, 2.5, 4000, 1);
    sunLight.castShadow = true;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 6000;
    sunLight.shadow.bias = 0.005;
    SunSphere.add(sunLight)


    /*
        MERCURY
    */
    MercuryTexture = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(Mercury.texture)
    });
    MercuryGeometry = new THREE.SphereGeometry(scaleSize(Mercury.diameter), 32, 32);
    MercurySphere = new THREE.Mesh(MercuryGeometry, MercuryTexture);
    MercurySphere.position.set(scaleDistance(Mercury), planetInclination(Mercury), 0);
    MercurySphere.rotation.z = degToRad(Mercury.obliquityToOrbit);
    scene.add(MercurySphere);

    /*
        VENUS
    */
    VenusTexture = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(Venus.texture)
    });
    VenusGeometry = new THREE.SphereGeometry(scaleSize(Venus.diameter), 32, 32);
    VenusSphere = new THREE.Mesh(VenusGeometry, VenusTexture);
    VenusSphere.position.set(scaleDistance(Venus), planetInclination(Venus), 0);
    VenusSphere.rotation.z = degToRad(Venus.obliquityToOrbit);
    scene.add(VenusSphere);

    /*
    EARTH
    */
    EarthTexture = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(Earth.texture)
    });
    EarthGeometry = new THREE.SphereGeometry(scaleSize(Earth.diameter), 32, 32);
    EarthSphere = new THREE.Mesh(EarthGeometry, EarthTexture);
    EarthSphere.position.set(scaleDistance(Earth), planetInclination(Earth), 0);
    EarthSphere.rotation.z = degToRad(Earth.obliquityToOrbit);
    scene.add(EarthSphere);

    /*
        MARS
    */
    MarsTexture = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(Mars.texture)
    });
    MarsGeometry = new THREE.SphereGeometry(scaleSize(Mars.diameter), 32, 32);
    MarsSphere = new THREE.Mesh(MarsGeometry, MarsTexture);
    MarsSphere.position.set(scaleDistance(Mars), planetInclination(Mars), 0);
    MarsSphere.rotation.z = degToRad(Mars.obliquityToOrbit);
    scene.add(MarsSphere);

    /*
    JUPITER
    */
    JupiterTexture = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(Jupiter.texture)
    });
    JupiterGeometry = new THREE.SphereGeometry(scaleSize(Jupiter.diameter), 32, 32);
    JupiterSphere = new THREE.Mesh(JupiterGeometry, JupiterTexture);
    JupiterSphere.position.set(scaleDistance(Jupiter), planetInclination(Jupiter), 0);
    JupiterSphere.rotation.z = degToRad(Jupiter.obliquityToOrbit);
    scene.add(JupiterSphere);

    /*
        SATURN
    */
    SaturnTexture = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(Saturn.texture)
    });
    SaturnGeometry = new THREE.SphereGeometry(scaleSize(Saturn.diameter), 32, 32);
    SaturnSphere = new THREE.Mesh(SaturnGeometry, SaturnTexture);
    SaturnSphere.position.set(scaleDistance(Saturn), planetInclination(Saturn), 0);
    SaturnSphere.rotation.z = degToRad(Saturn.obliquityToOrbit);
    scene.add(SaturnSphere);

    /*
    URANUS
    */
    UranusTexture = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(Uranus.texture)
    });
    UranusGeometry = new THREE.SphereGeometry(scaleSize(Uranus.diameter), 32, 32);
    UranusSphere = new THREE.Mesh(UranusGeometry, UranusTexture);
    UranusSphere.position.set(scaleDistance(Uranus), planetInclination(Uranus), 0);
    UranusSphere.rotation.z = degToRad(Uranus.obliquityToOrbit);
    scene.add(UranusSphere);

    /*
    NEPTUNE
    */
    NeptuneTexture = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(Neptune.texture)
    });
    NeptuneGeometry = new THREE.SphereGeometry(scaleSize(Neptune.diameter), 32, 32);
    NeptuneSphere = new THREE.Mesh(NeptuneGeometry, NeptuneTexture);
    NeptuneSphere.position.set(scaleDistance(Neptune), planetInclination(Neptune), 0);
    NeptuneSphere.rotation.z = degToRad(Neptune.obliquityToOrbit);
    scene.add(NeptuneSphere);

    currentObj = SunSphere;
}


function animate() {


    requestAnimationFrame(animate);
    currentObj.getWorldPosition(controls.target);
    controls.update();

    SunSphere.rotation.x += 0.01;
    SunSphere.rotation.y += 0.01;
    SunSphere.rotation.z += 0.01;
    MercurySphere.rotateOnAxis(PlanetAxis, rotationSpeed(Mercury.rotationSpeedRad));
    VenusSphere.rotateOnAxis(PlanetAxis, -rotationSpeed(Venus.rotationSpeedRad));
    EarthSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Earth.rotationSpeedRad));
    MarsSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Mars.rotationSpeedRad));
    JupiterSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Jupiter.rotationSpeedRad));
    SaturnSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Saturn.rotationSpeedRad));
    UranusSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Uranus.rotationSpeedRad));
    NeptuneSphere.rotateOnAxis(PlanetAxis, rotationSpeed(Neptune.rotationSpeedRad));

    thetaVenus += calculateTheta(Venus);
    thetaMercury += calculateTheta(Mercury);
    thetaEarth += calculateTheta(Earth);
    thetaMars += calculateTheta(Mars);
    thetaJupiter += calculateTheta(Jupiter);
    thetaSaturn += calculateTheta(Saturn);
    thetaUranus += calculateTheta(Uranus);
    thetaNeptune += calculateTheta(Neptune);

    MercurySphere.position.x = scaleDistance(Mercury) * Math.cos(thetaMercury);
    MercurySphere.position.z = scaleDistance(Mercury) * Math.sin(thetaMercury);
    MercurySphere.position.y = planetInclination(Mercury) * Math.cos(thetaMercury);

    VenusSphere.position.x = scaleDistance(Venus) * Math.cos(thetaVenus);
    VenusSphere.position.z = scaleDistance(Venus) * Math.sin(thetaVenus);
    VenusSphere.position.y = planetInclination(Venus) * Math.cos(thetaVenus);

    EarthSphere.position.x = scaleDistance(Earth) * Math.cos(thetaEarth);
    EarthSphere.position.z = scaleDistance(Earth) * Math.sin(thetaEarth);
    EarthSphere.position.y = planetInclination(Earth) * Math.cos(thetaEarth);

    MarsSphere.position.x = scaleDistance(Mars) * Math.cos(thetaMars);
    MarsSphere.position.z = scaleDistance(Mars) * Math.sin(thetaMars);
    MarsSphere.position.y = planetInclination(Mars) * Math.cos(thetaMars);

    JupiterSphere.position.x = scaleDistance(Jupiter) * Math.cos(thetaJupiter);
    JupiterSphere.position.z = scaleDistance(Jupiter) * Math.sin(thetaJupiter);
    JupiterSphere.position.y = planetInclination(Jupiter) * Math.cos(thetaJupiter);

    SaturnSphere.position.x = scaleDistance(Saturn) * Math.cos(thetaSaturn);
    SaturnSphere.position.z = scaleDistance(Saturn) * Math.sin(thetaSaturn);
    SaturnSphere.position.y = planetInclination(Saturn) * Math.cos(thetaSaturn);

    UranusSphere.position.x = scaleDistance(Uranus) * Math.cos(thetaUranus);
    UranusSphere.position.z = scaleDistance(Uranus) * Math.sin(thetaUranus);
    UranusSphere.position.y = planetInclination(Uranus) * Math.cos(thetaUranus);

    NeptuneSphere.position.x = scaleDistance(Neptune) * Math.cos(thetaNeptune);
    NeptuneSphere.position.z = scaleDistance(Neptune) * Math.sin(thetaNeptune);
    NeptuneSphere.position.y = planetInclination(Neptune) * Math.cos(thetaNeptune);

    switch (true) {
        case focusOptions.entireScene:
            camera.far = 3100;
            currentObj = SunSphere;
            break;
        case focusOptions.Mercury:
            camera.far = 300;
            currentObj = MercurySphere;
            break;
        case focusOptions.Venus:
            camera.far = 300;
            currentObj = VenusSphere;
            break;
        case focusOptions.Earth:
            camera.far = 300;
            currentObj = EarthSphere;
            break;
        case focusOptions.Mars:
            camera.far = 300;
            currentObj = MarsSphere;
            break;
        case focusOptions.Jupiter:
            camera.far = 300;
            currentObj = JupiterSphere
            break;
        case focusOptions.Saturn:
            camera.far = 300;
            currentObj = SaturnSphere;
            break;
        case focusOptions.Neptune:
            camera.far = 300;
            currentObj = NeptuneSphere;
            break;
        case focusOptions.Uranus:
            camera.far = 300;
            currentObj = UranusSphere;
            break;
        default:
            break;
    }

    if (focusOptions.entireScene == true) {
        camOffset = 1700;
    } else {
        camOffset = 200;
    }
    renderer.render(scene, camera);
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
    return (Sun.diameterModel + planet.distance * 10) * (window.innerHeight / window.innerWidth);
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function rotationSpeed(speed) {
    return options.camera.speed * (speed);
}

function setOptions(option) {
    for (let opt in focusOptions) {
        focusOptions[opt] = false;
    }

    focusOptions[option] = true;
    console.table(focusOptions);
}

function calculateTheta(planet) {
    return options.camera.speed * (((((2 * Math.PI * planet.distance) / (planet.orbitalPeriod * 86400))) * scaleDistance(planet)) / planet.distance);
}

function planetInclination(planet) {
    return Math.tan(degToRad(planet.orbitalInclination)) * scaleDistance(planet);
}