
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

function makeArcs(n, r1, r2, prefix, className) {
	//----------------------------------------------------//
	//Makes the paths that draw the circle chunks in the 	//
	//	SVG element																				//
	//----------------------------------------------------//
	//n(integer): number of circle chunks to draw					//
	//r1(float): lower bound of the circle chunks					//
	//r2(float): upper bound of the circle chunks					//
	//prefix(string): prefix to put before chunk's number //
	//	to give each chunk a unique ID										//
	//className(string): name of the class for all chunks //
	//----------------------------------------------------//

	let angleDelta = 360 / n;
	let angleA = -90;
	let angleB = angleA + angleDelta - 1;
	let path;

	for (let i = 0; i < n; i++) {

		path = makeSVG("path");
		path.setAttribute("id", `${prefix}${i}`);
		path.setAttribute("d", `
			M ${center.x + (Math.cos(angleA * (Math.PI / 180)) * (r1 * box.width))} 
				${center.y + (Math.sin(angleA * (Math.PI / 180)) * (r1 * box.width))} 
			L ${center.x + (Math.cos(angleA * (Math.PI / 180)) * (r2 * box.width))} 
				${center.y + (Math.sin(angleA * (Math.PI / 180)) * (r2 * box.width))} 
			A ${r2 * box.width} ${r2 * box.height} 0 0 1 
				${center.x + (Math.cos(angleB * (Math.PI / 180)) * (r2 * box.width))} 
				${center.y + (Math.sin(angleB * (Math.PI / 180)) * (r2 * box.width))}
			L ${center.x + (Math.cos(angleB * (Math.PI / 180)) * (r1 * box.width))} 
				${center.y + (Math.sin(angleB * (Math.PI / 180)) * (r1 * box.width))} 
			A ${r1 * box.width} ${r1 * box.height} 0 0 0 
				${center.x + (Math.cos(angleA * (Math.PI / 180)) * (r1 * box.width))} 
				${center.y + (Math.sin(angleA * (Math.PI / 180)) * (r1 * box.width))} 
		`);
		path.setAttribute("fill-opacity", "0");
		path.setAttribute("stroke", "black");
		path.classList.add(className);

		svgBox.appendChild(path);

		angleA = angleB + 1;
		angleB = angleA + angleDelta - 1;
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

function resetBand(band) {
	//----------------------------------------------------//
	//Clears the given band of formatting									//
	//----------------------------------------------------//
	//band(string): the name of the class for the given		//
	//	band																							//
	//----------------------------------------------------//s

	let paths = document.getElementsByClassName(band);

	for (let i = 0; i < paths.length; i++) {
		paths[i].setAttribute("fill-opacity", "0");
	}
}

function clearBand(band) {

	let paths = document.getElementsByClassName(band);
	let count = 1;

	let pathClear = setInterval(function() {
		paths[count].setAttribute("fill-opacity", "0");
		count++;
		if (count === paths.length) clearInterval(pathClear);
	}, 10);
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
					resetBand("hours");
					tern = getTern();
					setTern(tern);
				}
				resetBand("minutes");
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