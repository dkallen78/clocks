class Point {
	//----------------------------------------------------//
	//A data structure to make managing and representing	//
	//	Cartesian points easier														//
	//----------------------------------------------------//
	//x(float): x coordinate of the point									//
	//y(float): y coordinate of the point									//
	//----------------------------------------------------//

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

	static center(p1, p2) {
		//----------------------------------------------------//
		//Finds the center point between p1 and p2						//
		//----------------------------------------------------//
		//p1, p2(Point): points to find the center of					//
		//----------------------------------------------------//
		//return(Point): the point at the midpoint between the//
		//	original two points																//
		//----------------------------------------------------//

		const midX = (p1.x + p2.x) / 2;
		const midY = (p1.y + p2.y) / 2;
		const newCenter = new Point(midX, midY);
		return newCenter;
	}

	static vector(p1, p2) {
		//----------------------------------------------------//
		//Finds the vector from p1 to p2											//
		//----------------------------------------------------//
		//p1, p2(Point): points on the vector to be found			//
		//----------------------------------------------------//
		//return(Point): the vector from p1 to p2							//
		//----------------------------------------------------//

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

function makeSegments(svg) {


  const svgBox = document.getElementById(svg.id);
  const box = svgBox.getBoundingClientRect();
  const xBias = .05;
  const yBias = .03125;
  const xMod = xBias * box.width;
  const yMod = yBias * box.height;

  let path1 = makeSVG("path", "a");
  path1.setAttribute("d", `
    M ${5 * xMod} ${4 * yMod} 
    L ${7 * xMod} ${2 * yMod}
    L ${13 * xMod} ${2 * yMod}
    L ${15 * xMod} ${4 * yMod}
    L ${13 * xMod} ${6 * yMod}
    L ${7 * xMod} ${6 * yMod}
    Z
  `);
  svg.appendChild(path1);

  let path2 = makeSVG("path", "b");
  path2.setAttribute("d", `
    M ${16 * xMod} ${5 * yMod} 
    L ${18 * xMod} ${7 * yMod}
    L ${18 * xMod} ${13 * yMod}
    L ${16 * xMod} ${15 * yMod}
    L ${14 * xMod} ${13 * yMod}
    L ${14 * xMod} ${7 * yMod}
    Z
  `);
  svg.appendChild(path2);

  let path3 = makeSVG("path", "c");
  path3.setAttribute("d", `
    M ${16 * xMod} ${17 * yMod} 
    L ${18 * xMod} ${19 * yMod}
    L ${18 * xMod} ${25 * yMod}
    L ${16 * xMod} ${27 * yMod}
    L ${14 * xMod} ${25 * yMod}
    L ${14 * xMod} ${19 * yMod}
    Z
  `);
  svg.appendChild(path3);

  let path4 = makeSVG("path", "d");
  path4.setAttribute("d", `
    M ${5 * xMod} ${28 * yMod} 
    L ${7 * xMod} ${26 * yMod}
    L ${13 * xMod} ${26 * yMod}
    L ${15 * xMod} ${28 * yMod}
    L ${13 * xMod} ${30 * yMod}
    L ${7 * xMod} ${30 * yMod}
    Z
  `);
  svg.appendChild(path4);

  let path5 = makeSVG("path", "e");
  path5.setAttribute("d", `
    M ${4 * xMod} ${17 * yMod} 
    L ${6 * xMod} ${19 * yMod}
    L ${6 * xMod} ${25 * yMod}
    L ${4 * xMod} ${27 * yMod}
    L ${2 * xMod} ${25 * yMod}
    L ${2 * xMod} ${19 * yMod}
    Z
  `);
  svg.appendChild(path5);

  let path6 = makeSVG("path", "f");
  path6.setAttribute("d", `
    M ${4 * xMod} ${5 * yMod} 
    L ${6 * xMod} ${7 * yMod}
    L ${6 * xMod} ${13 * yMod}
    L ${4 * xMod} ${15 * yMod}
    L ${2 * xMod} ${13 * yMod}
    L ${2 * xMod} ${7 * yMod}
    Z
  `);
  svg.appendChild(path6);

  let path7 = makeSVG("path", "g");
  path7.setAttribute("d", `
    M ${5 * xMod} ${16 * yMod} 
    L ${7 * xMod} ${14 * yMod}
    L ${13 * xMod} ${14 * yMod}
    L ${15 * xMod} ${16 * yMod}
    L ${13 * xMod} ${18 * yMod}
    L ${7 * xMod} ${18 * yMod}
    Z
  `);
  svg.appendChild(path7);
}

function makeSVGcircle(x, y, r) {
  let circle = makeSVG("circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  return circle;
}

function buildFace() {

  const clockFace = document.getElementById("clock-face");

  for (let i = 0; i < 6; i++) {
    if ((i > 0) && ((i % 2) === 0)) {
      let colon = makeSVG("svg", `sep${i}`, "colon");
      clockFace.appendChild(colon);
      const colBox = document.getElementById(`sep${i}`);
      const box = colBox.getBoundingClientRect();
      const x1 = .5 * box.width;
      const y1 = .3125 * box.height;
      const y2 = .6875 * box.height;
      const r = .5 * box.width;

      let circle1 = makeSVGcircle(x1, y1, r);
      colon.appendChild(circle1);

      let circle2 = makeSVGcircle(x1, y2, r);
      colon.appendChild(circle2);
    }
    let display = makeSVG("svg", i.toString(10), "digits");
    clockFace.appendChild(display);
    makeSegments(display);

  }
}

document.body.onload = buildFace;
