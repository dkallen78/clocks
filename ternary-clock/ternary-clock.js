
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
	//The angle required to leave an approximate 1% gap 
	//	between the circle chunks
	let angleGap1 = ((box.width * .01) * 180) / (Math.PI * radius1);
	let angleGap2 = ((box.width * .01) * 180) / (Math.PI * radius2);

	//
	//Initial angle in degrees. -90 is the top of the circle
	let angleA1 = -90 + (angleGap1 / 2);
	let angleA2 = -90 + (angleGap2 / 2);

	console.log(angleGap1, angleGap2);
	let angleB1 = angleA1 + angleDelta - angleGap1;
	let angleB2 = angleA2 + angleDelta - angleGap2;
	let path;

	for (let i = 0; i < n; i++) {

		path = makeSVG("path");
		path.setAttribute("id", `${prefix}${i}`);
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
		path.classList.add(className);

		svgBox.appendChild(path);

		angleA1 = angleB1 + angleGap1;
		angleB1 = angleA1 + angleDelta - angleGap1;
		angleA2 = angleB2 + angleGap2;
		angleB2 = angleA2 + angleDelta - angleGap2;
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

let box = getSVGsize();

let center = {
	x: box.width * .5,
	y: box.height * .5
}

let svgBox = document.getElementById("svgBox");

makeArcs(3, 0.01, 0.25, "t", "terns");

makeArcs(9, .26, .375, "h", "hours");

makeArcs(27, .385, .4375, "m", "minutes");

makeArcs(81, .4475, .75, "s", "seconds");




let tern = getTern();
let hour = getHour();
let minute = getMinute();
let second = getSecond();

/*console.log(getMilliseconds());
console.log(tern);
console.log(hour);
console.log(minute);
console.log(second);*/

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

		second = getSecond();
		setSecond(second);
		//console.clear();
		//console.log(`Second: ${second}`);
	}
    
}, 10);