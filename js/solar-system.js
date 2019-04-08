/*
Diameter (km) - The diameter of the planet at the equator
Rotation Period (hours) - This is the time it takes for the planet to complete one rotation relative to the fixed background stars (not relative to the Sun) in hours. 
                        Negative numbers indicate retrograde (backwards relative to the Earth) rotation.
Distance from Sun - This is the average distance from the planet to the Sun in millions of kilometers 
Orbital Period (days) - This is the time in Earth days for a planet to orbit the Sun from one vernal equinox to the next. 
                        Also known as the tropical orbit period, this is equal to a year on Earth.

Orbital Velocity (km/s or miles/s) - The average velocity or speed of the planet as it orbits the Sun, in kilometers per second or miles per second.

Orbital Inclination (degrees) - The angle in degrees at which a planets orbit around the Sun is tilted relative to the ecliptic plane. 
                                The ecliptic plane is defined as the plane containing the Earth's orbit, so the Earth's inclination is 0.
Obliquity to Orbit (degrees) - The angle in degrees the axis of a planet (the imaginary line running through the center of the planet from the north to south poles) 
                               is tilted relative to a line perpendicular to the planet's orbit around the Sun, north pole defined by right hand rule.
*/
const Sun = {
    diameterReal: 928,
    diameterModel: 200,
    distance: 0,
    texture: 'img/sun.jpg'
}
const Planets = {

Mercury : {
    diameter: 40,
    rotationPeriod: 1407.6,
    rotationSpeedRad: 1.24e-3,
    distance: 57.9,
    orbitalPeriod: 88,
    orbitalInclination: 3.4,
    obliquityToOrbit: 0.034,
    texture: 'img/mercury.jpg'
},

Venus : {
    diameter: 90,
    rotationPeriod: -58.5,
    rotationSpeedRad: 2.99e-4,
    distance: 108.2,
    orbitalPeriod: 224.7,
    orbitalInclination: 3.9,
    obliquityToOrbit: 177.4,
    texture: 'img/venus.jpg'
},

Earth : {
    diameter: 100,
    rotationPeriod: 23.9,
    rotationSpeedRad: 7.29e-3,
    distance: 149.6,
    orbitalPeriod: 365.2,
    orbitalInclination: 0,
    obliquityToOrbit: 23.4,
    texture: 'img/earth.jpg'
},

Mars : {
    diameter: 50,
    rotationPeriod: 24.6,
    rotationSpeedRad: 7.09e-2,
    distance: 190.9,
    orbitalPeriod: 687,
    orbitalInclination: 0.09,
    obliquityToOrbit: 25.2,
    texture: 'img/mars.jpg'
},

Jupiter : {
    diameter: 150,
    rotationPeriod: 9.9,
    rotationSpeedRad: 1.77e-2,
    distance: 290.6,
    orbitalPeriod: 4331,
    orbitalInclination: 6.1,
    obliquityToOrbit: 3.1,
    texture: 'img/jupiter.jpg'
},

Saturn : {
    diameter: 110,
    rotationPeriod: 10.7,
    rotationSpeedRad: 1.64e-2,
    distance: 350.5,
    orbitalPeriod: 10747,
    orbitalInclination: 2.5,
    obliquityToOrbit: 26.7,
    texture: 'img/saturn.jpg'
},

Uranus : {
    diameter: 100,
    rotationPeriod: -17.2,
    rotationSpeedRad: -1.04e-2,
    distance: 400.5,
    orbitalPeriod: 30589,
    orbitalInclination: 0.8,
    obliquityToOrbit: 97.8,
    texture: 'img/uranus.jpg'
},

Neptune : {
    diameter: 65,
    rotationPeriod: 16.1,
    rotationSpeedRad: 1.08e-2,
    distance: 440.1,
    orbitalPeriod: 59800,
    orbitalInclination: 1.8,
    obliquityToOrbit: 28.3,
    texture: 'img/neptune.jpg'
}
}