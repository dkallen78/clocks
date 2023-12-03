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

function flipDown(elem, fast = true) {
	//----------------------------------------------------//
	//Uses a CSS transform to rotate the clock cells and  //
  //  make them invisible                               //
	//----------------------------------------------------//
	//elem(DOM element): element to be "flipped"          //
	//----------------------------------------------------//

  //
  //Gets details about the element in the viewport
  let deets = cellDeets(elem);
  //
  //Puts the center points of the elements in a 
  let center1 = findCenter(deets.r1ccw, deets.r1cw);
  let center2 = findCenter(deets.r2ccw, deets.r2cw);
  let centerCell = findCenter(center1, center2);
  //
  //Ensures the elements transform about their own center
  elem.style.transformOrigin = `${centerCell[0]}px ${centerCell[1]}px`;
  //
  //Puts the vector from the center of the element to the 
  //  center of the SVG into variables
  let vecX = (center1[0] - center2[0]);
  let vecY = (center1[1] - center2[1]);
  //
  //The transformation
  elem.style.transform = `rotate3d(${vecX}, ${vecY}, 0, -180deg)`;

  if (fast) {
    elem.setAttribute("fill-opacity", "0");
  } else {
    setTimeout(function() {
      elem.setAttribute("fill-opacity", "0");
    }, 125);
  }
}

function cellDeets(cell) {
  let pathArray = cell.getAttribute("d").split(/\s+/);

  let deets = {
    r1ccw: [Number.parseFloat(pathArray[2]), Number.parseFloat(pathArray[3])],
    r2ccw: [Number.parseFloat(pathArray[5]), Number.parseFloat(pathArray[6])],
    r2cw: [Number.parseFloat(pathArray[13]), Number.parseFloat(pathArray[14])],
    r1cw: [Number.parseFloat(pathArray[16]), Number.parseFloat(pathArray[17])],
    r1: Number.parseFloat(pathArray[19]),
    r2: Number.parseFloat(pathArray[8])
  }
  return deets;
}

function findCenter(point1, point2) {
  let midX = (point1[0] + point2[0]) / 2;
  let midY = (point1[1] + point2[1]) / 2;
  return [midX, midY];
}

function flipUp(elem) {
  //----------------------------------------------------//
	//Uses a CSS transform to rotate the clock cells and  //
  //  make them visible                                 //
	//----------------------------------------------------//
	//elem(DOM element): element to be "flipped"          //
	//----------------------------------------------------//

  //
  //Gets details about the element in the viewport
  let deets = cellDeets(elem);
  //
  //Puts the center points of the elements in a 
  let center1 = findCenter(deets.r1ccw, deets.r1cw);
  let center2 = findCenter(deets.r2ccw, deets.r2cw);
  let centerCell = findCenter(center1, center2);
  //
  //Ensures the elements transform about their own center
  elem.style.transformOrigin = `${centerCell[0]}px ${centerCell[1]}px`;
  elem.setAttribute("transform-origin", `${centerCell[0]}px ${centerCell[1]}px`);
  //
  //Puts the vector from the center of the element to the 
  //  center of the SVG into variables
  let vecX = (center1[0] - center2[0]);
  let vecY = (center1[1] - center2[1]);
  //
  //The transformation
  elem.style.transform = `rotate3d(${vecX}, ${vecY}, 0, 0deg)`;
  elem.setAttribute("fill-opacity", "1");
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
		path.setAttribute("id", `${prefix}${i}`);
		path.classList.add(className);
    
		svgBox.appendChild(path);

    flipDown(path);
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

		makeArcs (i, origin + gap, rad, classes[j][0], classes[j]);
		origin = rad;
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

function setTime(id, t) {
  let path = document.getElementById(`${id}${t}`);
  flipUp(path);
  //console.log(path.getAttribute("d").split(/\s+/));
}

/*function setTern(t) {
	let path = document.getElementById(`t${t}`);
  flipUp(path);
	path.setAttribute("fill-opacity", "1");
}

function setHour(h) {
	let path = document.getElementById(`h${h}`);
  flipUp(path);
	path.setAttribute("fill-opacity", "1");
}

function setMinute(m) {
	let path = document.getElementById(`m${m}`);
  flipUp(path);
	path.setAttribute("fill-opacity", "1");
}

function setSecond(s) {
	let path = document.getElementById(`s${s}`);
  flipUp(path);
	path.setAttribute("fill-opacity", "1");
}*/

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
    flipDown(paths[count], false);
		count++;
		if (count === paths.length) clearInterval(pathClear);
	}, (clearSpeed * 33));
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
    flipUp(paths[i]);
    //paths[i].setAttribute("fill-opacity", "1");
	}
}

function pulseCell(type, time) {
	let current = document.getElementById(`${type}${time}`);
	let deets = current.getBoundingClientRect();
	//
	//transform-origin applies to the bounding box of the element, 
	//	and getBoundingClientRect gets pixels relative to viewport, 
	//	so to make them work, we have to do some funky looking math:
	//	the origin is px from left edge to box + px to center of box - distance from left edge to SVG
	//	and px from top edge to box + px to center of box - distance from top edge to SVG
	let centerX = (deets.x + (deets.width / 2)) - box.x;
	let centerY = (deets.y + (deets.height / 2)) - box.y;
	current.style.transformOrigin = `${centerX}px ${centerY}px`;

	const timing = {
		duration: 250,
		iterations: 1,
	};

	/*current.animate([
		{transform: "scale(1)", fillOpacity: "1"},
		{transform: "scale(.95)", fillOpacity: ".75"},
		{transform: "scale(1)", fillOpacity: "1"},
		{transform: "scale(.95)", fillOpacity: ".75"},
		{transform: "scale(1)", fillOpacity: "1"}
	], timing);*/

	current.animate([
		{fillOpacity: "1"},
		{fillOpacity: ".85"},
		{fillOpacity: "1"},
		/*{fillOpacity: ".75"},
		{fillOpacity: "1"}*/
	], timing);
}

let svgBox = document.getElementById("svgBox");
let box = svgBox.getBoundingClientRect();
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
setTime("t", tern);
backfillBand("terns", tern);
setTime("h", hour);
backfillBand("hours", hour);
setTime("m", minute);
backfillBand("minutes", minute);
setTime("s", second);
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
          setTime("t", tern);
				}
				clearBand("minutes");
				hour = getHour();
        setTime("h", hour);
			}
			clearBand("seconds");
			minute = getMinute();
      setTime("m", minute);
		}
		second = getSecond();
    setTime("s", second);
	}
}, 10);