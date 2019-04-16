THREE.RingGeometry = function ( innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength ) {

	THREE.Geometry.call( this );

	innerRadius = innerRadius || 0;
	outerRadius = outerRadius || 50;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

	thetaSegments = thetaSegments !== undefined ? Math.max( 3, thetaSegments ) : 8;
	phiSegments = phiSegments !== undefined ? Math.max( 3, phiSegments ) : 8;

	var i, o, uvs = [], radius = innerRadius, radiusStep = ( ( outerRadius - innerRadius ) / phiSegments );

	for ( i = 0; i <= phiSegments; i ++ ) { // concentric circles inside ring

		for ( o = 0; o <= thetaSegments; o ++ ) { // number of segments per circle

			var vertex = new THREE.Vector3();
			var segment = thetaStart + o / thetaSegments * thetaLength;

			vertex.x = radius * Math.cos( segment );
			vertex.y = radius * Math.sin( segment );

			this.vertices.push( vertex );
			//uvs.push( new THREE.Vector2( ( vertex.x / outerRadius+1)/2, ( vertex.y / outerRadius + 1 ) / 2 ) );
			uvs.push( new THREE.Vector2( i/thetaSegments, o/ phiSegments ) );


		}

		radius += radiusStep;

	}

	var n = new THREE.Vector3( 0, 0, 1 );

	for ( i = 0; i < phiSegments; i ++ ) { // concentric circles inside ring

		var thetaSegment = i * thetaSegments;

		for ( o = 0; o <= thetaSegments; o ++ ) { // number of segments per circle

			var segment = o + thetaSegment;

			var v1 = segment + i;
			var v2 = segment + thetaSegments + i;
			var v3 = segment + thetaSegments + 1 + i;

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n.clone(), n.clone(), n.clone() ] ) );
			this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ].clone(), uvs[ v2 ].clone(), uvs[ v3 ].clone() ]);

			v1 = segment + i;
			v2 = segment + thetaSegments + 1 + i;
			v3 = segment + 1 + i;

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n.clone(), n.clone(), n.clone() ] ) );
			this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ].clone(), uvs[ v2 ].clone(), uvs[ v3 ].clone() ]);

		}
	}

	this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius );

};

THREE.RingGeometry.prototype = Object.create( THREE.Geometry.prototype );

let loader, scene, camera, renderer;
let gui, cam, focusGui;
let PlanetAxis;

let sunLight;
let options, focusOptions;

let textures = {};
let geometries = {};
let planetSpheres = {};
let thetas = {};
let SaturnRingsGeom, SaturnRings, RingsMaterial;


let controls;
let currentFocus;

const direction = new THREE.Vector3();
let camOffset = 2700;

let currentObj;
init();
animate();

function init() {
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

    camera.position.z = 500;
    camera.position.x = -1700;
    camera.position.y = 500;

    /*
        DAT GUI      
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

    /*
        ORBIT CONTROLS
    */
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.rotateSpeed = 0.08;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.08;
    controls.enableKeys = false;
    controls.panSpeed = 0.5;
    controls.minDistance = 200;

    controls.mouseButtons = {
        LEFT: THREE.MOUSE.LEFT,
        MIDDLE: THREE.MOUSE.MIDDLE,
        RIGHT: THREE.MOUSE.RIGHT
    }
    
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
    sunLight = new THREE.PointLight(0xffffff, 2.5, 3000, 1);
    SunSphere.add(sunLight)

    /*
        PLANETS
    */
    for(let planet in Planets) {
        textures[planet] = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load(Planets[planet].texture)
        });
        textures[planet].flipY = false;
        geometries[planet] = new THREE.SphereGeometry(scaleSize(Planets[planet].diameter), 32, 32);
        planetSpheres[planet] = new THREE.Mesh(geometries[planet], textures[planet]);
        planetSpheres[planet].position.set(scaleDistance(Planets[planet]), planetInclination(Planets[planet]), 0);
        planetSpheres[planet].rotation.z = degToRad(Planets[planet].obliquityToOrbit);
        thetas[planet] = 0;
        scene.add(planetSpheres[planet]);
    }

    SaturnRingsGeom = new THREE.RingGeometry(scaleSize(Planets.Saturn.diameter) + 5, scaleSize(Planets.Saturn.diameter) + 35, 62, 62);
    RingsMaterial = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('img/saturnring.jpg'), side: THREE.DoubleSide } );
    
    SaturnRings = new THREE.Mesh(SaturnRingsGeom, RingsMaterial);
    SaturnRings.position.set(0,0,0);
    SaturnRings.rotation.z = degToRad(Planets.Saturn.obliquityToOrbit);
    SaturnRings.rotation.x = Math.PI / 2;
    planetSpheres.Saturn.add(SaturnRings);
    currentObj = SunSphere;
}

function animate() {


    requestAnimationFrame(animate);
    SunSphere.rotation.x += 0.01;
    SunSphere.rotation.y += 0.01;
    SunSphere.rotation.z += 0.01;
    for(let planet in Planets) {
        thetas[planet] += calculateTheta(Planets[planet]);
        
        planetSpheres[planet].rotateOnAxis(PlanetAxis, rotationSpeed(Planets[planet].rotationSpeedRad));
        planetSpheres[planet].position.x = scaleDistance(Planets[planet]) * Math.cos(thetas[planet]);
        planetSpheres[planet].position.z = scaleDistance(Planets[planet]) * Math.sin(thetas[planet]);
        planetSpheres[planet].position.y = planetInclination(Planets[planet]) * Math.cos(thetas[planet]);
        
    }
    
    
    if (!(focusOptions.entireScene)) {
        currentObj.getWorldPosition(controls.target);
        direction.subVectors( camera.position, controls.target );
        direction.normalize().multiplyScalar( camOffset );
        camera.position.copy( direction.add( controls.target ) );
    }
    
    
    controls.update();
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
    
    if(option == currentFocus && option != 'entireScene') {

        option = 'entireScene';
    }
    
    for (let opt in focusOptions) {
        focusOptions[opt] = false;
    }

    focusOptions[option] = true;
        

    if(option == 'entireScene') {
        camOffset = 1700;
        currentObj = SunSphere;
        camera.far = 3100
        currentObj.getWorldPosition(controls.target);
        camera.position.x = -1700;
        controls.enablePan = true;
    } else {
        camOffset = 200;
        currentObj = planetSpheres[option];
        camera.far = 300;
        controls.enablePan = false;
         
    }

        controls.update();

        currentFocus = option;

}

function calculateTheta(planet) {
    return options.camera.speed * (((((2 * Math.PI * planet.distance) / (planet.orbitalPeriod * 86400))) * scaleDistance(planet)) / planet.distance);
}

function planetInclination(planet) {
    return Math.tan(degToRad(planet.orbitalInclination)) * scaleDistance(planet);
}