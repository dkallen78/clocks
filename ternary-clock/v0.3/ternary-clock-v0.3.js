class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

	static center(p1, p2) {
		const midX = (p1.x + p2.x) / 2;
		const midY = (p1.y + p2.y) / 2;
		const newCenter = new Point(midX, midY);
		return newCenter;
	}

	static vector(p1, p2) {
		const vecX = (p1.x - p2.x);
		const vecY = (p1.y - p2.y);
		const newVector = new Point(vecX, vecY);
		return newVector;
	}
}

function makeSVG(type, id, ...classes) {
	//----------------------------------------------------//
	//Makes an SVG element of the type specified          //
	//----------------------------------------------------//
	//type(string): type of SVG element to create         //
	//id(string): id of the element                       //
	//classes(string): classes to add to the element      //
	//----------------------------------------------------//
	//return(element): SVG element                        //
	//----------------------------------------------------//

	let svg = document.createElementNS("http://www.w3.org/2000/svg", type);
	if (typeof id === "string") {svg.id = id}
	classes.forEach(x => svg.classList.add(x));
	return svg;
}

function toRad(deg) {
	//----------------------------------------------------//
	//Converts an angle in degrees to an angle in radians	//
	//----------------------------------------------------//
	//deg(float): angle to be converted to radians				//
	//----------------------------------------------------//
	//return(float): converted degrees in radians					//
	//----------------------------------------------------//

	return deg * (Math.PI / 180);
}

function toDeg(rad) {
	//----------------------------------------------------//
	//Converts an angle in radians to an angle in degrees	//
	//----------------------------------------------------//
	//deg(float): angle to be converted to degrees				//
	//----------------------------------------------------//
	//return(float): converted radians in degrees					//
	//----------------------------------------------------//

	return rad * (180 / Math.PI);
}

function makeArcs(n, r1, r2, type) {

	//
	//Change in angle for the starting point of each chunk
	let angleDelta = 360 / n;
	//
	//The radii of my arcs converted from percentages to 
	//	absolute units
	let radius1 = r1 * box.width;
	let radius2 = r2 * box.width;
	//
	//The angle required to leave a 1% gap between the circle chunks
	let angleGap1 = toDeg(2 * (Math.asin((box.width * (gap / 2)) / radius1)));
	let angleGap2 = toDeg(2 * (Math.asin((box.width * (gap / 2)) / radius2)));
	//
	//Initial starting angle in degrees. -90 is the top of the circle. 
	//	The extra half of an angle gap is to keep it symmetrical
	let angleA1 = -90 + (angleGap1 / 2);
	let angleA2 = -90 + (angleGap2 / 2);
	//
	//Initial terminal angle in degrees. 
	//	Starting angle + change in angle - constant gap
	let angleB1 = angleA1 + angleDelta - angleGap1;
	let angleB2 = angleA2 + angleDelta - angleGap2;

	let a1 = new Point(0, 0);
	let a2 = new Point(0, 0);
	let b1 = new Point(0, 0);
	let b2 = new Point(0, 0);
	let chordCenter1;
	let chordCenter2;
	let cellCenter;
	let cellVector;

	let path;

	for (let i = 0; i < n; i++) {

		a1.x = center.x + (Math.cos(toRad(angleA1)) * radius1);
		a1.y = center.y + (Math.sin(toRad(angleA1)) * radius1);
		a2.x = center.x + (Math.cos(toRad(angleA2)) * radius2);
		a2.y = center.y + (Math.sin(toRad(angleA2)) * radius2);
		b1.x = center.x + (Math.cos(toRad(angleB1)) * radius1);
		b1.y = center.y + (Math.sin(toRad(angleB1)) * radius1);
		b2.x = center.x + (Math.cos(toRad(angleB2)) * radius2);
		b2.y = center.y + (Math.sin(toRad(angleB2)) * radius2)

		chordCenter1 = Point.center(a1, b1);
		chordCenter2 = Point.center(a2, b2);

		cellCenter = Point.center(chordCenter1, chordCenter2);

		cellVector = Point.vector(chordCenter1, chordCenter2);

		path = makeSVG("path");
		//
		//M -> move to inner counterclockwise corner
		//L -> line to outer ccw corner
		//A -> arc to outer cw corner
		//L -> line to inner cw corner
		//A -> arc to inner ccw corner
		path.setAttribute("d", `
			M ${a1.x} ${a1.y} 
			L ${a2.x} ${a2.y} 
			A ${radius2} ${radius2} 0 0 1 ${b2.x} ${b2.y}
			L ${b1.x} ${b1.y} 
			A ${radius1} ${radius1} 0 0 0 
				${a1.x} ${a1.y} 
		`);
		path.classList.add(type);

		path.style.fillOpacity = 1;
		path.id = `${type[0]}${i}`;
		path.style.transformOrigin = `${cellCenter.x}px ${cellCenter.y}px`;
		path.dataset.vecX = cellVector.x;
		path.dataset.vecY = cellVector.y;

		svgBox.appendChild(path);

		//
		//New ccw angle = old cw angle + gap
		angleA1 = angleB1 + angleGap1;
		angleA2 = angleB2 + angleGap2;
		//
		//New cw angle = new ccw angle + angle change - gap
		angleB1 = angleA1 + angleDelta - angleGap1;
		angleB2 = angleA2 + angleDelta - angleGap2;

	}
}

function makeFace() {
	//----------------------------------------------------//
	//I put all this in a function to keep things tidy		//
	//I use this to make the face of the clock. It's hard	//
	//	to understand what's going on in a for loop,			//
	//	but it lets me play with some of the variables 		//
	//	more easily																				//
	//----------------------------------------------------//

	let classes = ["terns", "hours", "minutes", "seconds"];
	let origin = 0;
	let radSeed = .28;
	let rad = radSeed;
	//let rad = Math.sqrt(.33 / Math.PI);

	for (let i = 3, j = 0; i <= 81; i *= 3, j++) {

		makeArcs (i, origin + gap, rad, classes[j]);
		origin = rad;
		if (j < 2) {
			rad = rad + (radSeed / (3 ** (j + 1)));
		} else {
			rad = (maxRad / box.width);
		}
		
	}
	
}

let svgBox = document.getElementById("svgBox");
let box = svgBox.getBoundingClientRect();

const center = new Point((box.width * .5), (box.height * .5));

let maxRad = Math.sqrt(2 * ((box.width / 2) ** 2));

let gap = .005;

makeFace();