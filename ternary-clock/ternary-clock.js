
function getSVGsize() {
	//----------------------------------------------------//
	//Returns an object with information about the size 	//
	//	and location of the SVG element										//
	//----------------------------------------------------//
	//return(object): object with size and location info	//
	//----------------------------------------------------//

	let svgBox = document.getElementById("svgBox");
	return svgBox.getBoundingClientRect();
}

function getElementSize(elem) {

	return elem.getBoundingClientRect();
}

function getMilliseconds() {
	//----------------------------------------------------//
	//Returns the number of milliseconds that have passed	//
	//	in the current day																//
	//----------------------------------------------------//
	//return(integer): elapsed ms in current day					//
	//----------------------------------------------------//

    let totalms = 0;

    let time = new Date();

    totalms += (time.getHours() * 3600000);
    totalms += (time.getMinutes() * 60000);
    totalms += (time.getSeconds() * 1000);
    totalms += time.getMilliseconds();

    return totalms;
}

function makeSVG(type, id, ...classes) {
	//----------------------------------------------------//
	//Returns an SVG element of the type indicated        //
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

function makeArcs(n, r1, r2, prefix, className) {
	//----------------------------------------------------//
	//Makes the paths that draw the circle chunks in the 	//
	//	SVG element																				//
	//----------------------------------------------------//
	//n(integer): number of circle chunks to draw					//
	//r1(float): lower bound of the circle chunks given as//
	//	a percentage of the SVG element size							//
	//r2(float): upper bound of the circle chunks	given as//
	//	a percentage of the SVG element size							//
	//prefix(string): prefix to put before chunk's number //
	//	to give each chunk a unique ID										//
	//className(string): name of the class for all chunks //
	//----------------------------------------------------//

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
	angleGap1 = toDeg(2 * (Math.asin((box.width * (gap / 2)) / radius1)));
	angleGap2 = toDeg(2 * (Math.asin((box.width * (gap / 2)) / radius2)));

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
	let path;

	for (let i = 0; i < n; i++) {

		path = makeSVG("path");
		
		//
		//M -> move to inner counterclockwise corner
		//L -> line to outer ccw corner
		//A -> arc to outer cw corner
		//L -> line to inner cw corner
		//A -> arc to inner ccw corner
		path.setAttribute("d", `
			M ${center.x + (Math.cos(toRad(angleA1)) * radius1)} 
				${center.y + (Math.sin(toRad(angleA1)) * radius1)} 
			L ${center.x + (Math.cos(toRad(angleA2)) * radius2)} 
				${center.y + (Math.sin(toRad(angleA2)) * radius2)} 
			A ${radius2} ${radius2} 0 0 1 
				${center.x + (Math.cos(toRad(angleB2)) * radius2)} 
				${center.y + (Math.sin(toRad(angleB2)) * radius2)}
			L ${center.x + (Math.cos(toRad(angleB1)) * radius1)} 
				${center.y + (Math.sin(toRad(angleB1)) * radius1)} 
			A ${radius1} ${radius1} 0 0 0 
				${center.x + (Math.cos(toRad(angleA1)) * radius1)} 
				${center.y + (Math.sin(toRad(angleA1)) * radius1)} 
		`);
		path.setAttribute("fill-opacity", "0");
		path.setAttribute("stroke", "black");
		path.setAttribute("id", `${prefix}${i}`);
		path.classList.add(className);

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
	//I use this to make the face of the clock. It's 			//
	//	to understand what's going on in a for loop,			//
	//	but it lets me play with some of the variables 		//
	//	more easily																				//
	//----------------------------------------------------//

	let classes = ["terns", "hours", "minutes", "seconds"];
	let origin = 0;
	let radSeed = .28
	let rad = radSeed;
	//let rad = Math.sqrt(.33 / Math.PI);

	for (let i = 3, j = 0; i <= 81; i *= 3, j++) {

		//console.log(`origin + gap: ${origin + gap}`);
		//console.log(`rad: ${rad}`);
	
		makeArcs (i, origin + gap, rad, classes[j][0], classes[j]);
		origin = rad;
		//rad += .16;
		if (j < 2) {
			rad = rad + (radSeed / (3 ** (j + 1)));
		} else {
			rad = (maxRad / box.width);
		}
		
	}
	
}

function getTern() {
	return Math.floor((getMilliseconds() / 28_800_000));
}

function getHour() {
	let tms = tern * 28_800_000;
	let hms = getMilliseconds() - tms;
	return Math.floor((hms / 3_200_000));
}

function getMinute() {
	let tms = (tern * 28_800_000) + (hour * 3_200_000);
	let mms = getMilliseconds() - tms;
	return Math.floor((mms / 118_518.5185));
}

function getSecond() {
	let tms = (tern * 28_800_000) + (hour * 3_200_000) + (minute * 118_518.5185);
	let sms = getMilliseconds() - tms;
	return Math.floor((sms / 1_463.1916));
}

function setTern(t) {
	let path = document.getElementById(`t${t}`);
	path.setAttribute("fill-opacity", "1");
}

function setHour(h) {
	let path = document.getElementById(`h${h}`);
	path.setAttribute("fill-opacity", "1");
}

function setMinute(m) {
	let path = document.getElementById(`m${m}`);
	path.setAttribute("fill-opacity", "1");
}

function setSecond(s) {
	let path = document.getElementById(`s${s}`);
	path.setAttribute("fill-opacity", "1");
}

function clearBand(band) {
	//----------------------------------------------------//
	//Clears the fill in a given band, one cell at a time //
	//----------------------------------------------------//
	//band(string): the name of the class for the given		//
	//	band																							//
	//----------------------------------------------------//s

	let paths = document.getElementsByClassName(band);
	let count = 1;
	let clearSpeed = 81 / paths.length;

	let pathClear = setInterval(function() {
		paths[count].setAttribute("fill-opacity", "0");
		count++;
		if (count === paths.length) clearInterval(pathClear);
	}, (clearSpeed * 25));
}

function backfillBand(band, time) {
	//----------------------------------------------------//
	//Backfills the given band from the current time			//
	//----------------------------------------------------//
	//band(string): class name of the band to be 					//
	//	backfilled																				//
	//time(integer): the current time from which to 			//
	//	backfill																					//
	//----------------------------------------------------//

	let paths = document.getElementsByClassName(band);

	for (let i = 0; i < time; i++) {
		paths[i].setAttribute("fill-opacity", "1");
	}
}

function pulseCell(type, time) {
	let current = document.getElementById(`${type}${time}`);
	//let deets = getElementSize(current);
	let deets = current.getBoundingClientRect();
	let centerX = (deets.x + (deets.width / 2)) - box.x;
	let centerY = (deets.y + (deets.height / 2)) - box.y;
	//
	//transform-origin applies to the bounding box of the element, 
	//	and getBoundingClientRect gets pixels relative to viewport, 
	//	so to make them work, we have to do some funky looking math:
	//	the origin is px from left edge to box + px to center of box - distance from left edge to SVG
	//	and px from top edge to box + px to center of box - distance from top edge to SVG
	current.style.transformOrigin = `${centerX}px ${centerY}px`;
	setTimeout(function() {
		current.style.transform = "scale(.95)";
	}, 100);
	
	setTimeout(function() {
		current.style.transform = "scale(1)";
	}, 700);
}


let svgBox = document.getElementById("svgBox");
let box = getElementSize(svgBox);
//let box = getSVGsize();
//
//Object to make representing the center point easier
//	to understand in the code
let center = {
	x: box.width * .5,
	y: box.height * .5
}
//
//Calculates the maximum visible radius as the distance 
//	from the center to a corner
let maxRad = Math.sqrt(2 * ((box.width / 2) ** 2));
//
//The space between the cells of the clock face
let gap = .005;



let tern = getTern();
let hour = getHour();
let minute = getMinute();
let second = getSecond();



makeFace();

setTern(tern);
backfillBand("terns", tern);
setHour(hour);
backfillBand("hours", hour);
setMinute(minute);
backfillBand("minutes", minute);
setSecond(second);
backfillBand("seconds", second);

let refreshInterval = setInterval(function() {

	if (getSecond() !== second) {
		

		if (getMinute() !== minute) {

			if (getHour() !== hour) {

				if (getTern() !== tern) {
					clearBand("hours");
					tern = getTern();
					if (tern === 0) {
						clearBand("terns");
					}
					setTern(tern);
				}
				clearBand("minutes");
				hour = getHour();
				setHour(hour);
			}
			clearBand("seconds");
			minute = getMinute();
			setMinute(minute);
		}


		pulseCell("t", tern);
		pulseCell("h", hour);
		pulseCell("m", minute);
		second = getSecond();
		setSecond(second);
	}
    
}, 10);