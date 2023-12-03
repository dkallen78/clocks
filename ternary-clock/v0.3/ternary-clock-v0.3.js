class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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