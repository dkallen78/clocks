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

function makeSVGcircle(x, y, r) {
  //----------------------------------------------------//
  //Makes an SVG <circle> element                       //
  //----------------------------------------------------//
  //x(float): the x coordinate of the circle's center   //
  //y(float): the y coordinate of the circle's center   //
  //r(float): the radius of the circle                  //
  //----------------------------------------------------//
  //return(element): SVG <circle> element               //
  //----------------------------------------------------//

  let circle = makeSVG("circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  return circle;
}

function makeSegments(svg) {
  //----------------------------------------------------//
  //Makes the seven segments for the display            //
  //----------------------------------------------------//
  //svg(DOM element): the <svg> element into which the  //
  //  segments will be appended                         //
  //----------------------------------------------------//

  const svgBox = document.getElementById(svg.id);
  const box = svgBox.getBoundingClientRect();
  const xBias = .05;
  const yBias = .03125;
  const xMod = xBias * box.width;
  const yMod = yBias * box.height;

  let path1 = makeSVG("path", "a", "segment");
  path1.setAttribute("d", `
    M ${4.5 * xMod} ${4 * yMod} 
    L ${6.5 * xMod} ${2 * yMod}
    L ${13.5 * xMod} ${2 * yMod}
    L ${15.5 * xMod} ${4 * yMod}
    L ${13.5 * xMod} ${6 * yMod}
    L ${6.5 * xMod} ${6 * yMod}
    Z
  `);
  svg.appendChild(path1);

  let path2 = makeSVG("path", "b", "segment");
  path2.setAttribute("d", `
    M ${16 * xMod} ${4.5 * yMod} 
    L ${18 * xMod} ${6.5 * yMod}
    L ${18 * xMod} ${13.5 * yMod}
    L ${16 * xMod} ${15.5 * yMod}
    L ${14 * xMod} ${13.5 * yMod}
    L ${14 * xMod} ${6.5 * yMod}
    Z
  `);
  svg.appendChild(path2);

  let path3 = makeSVG("path", "c", "segment");
  path3.setAttribute("d", `
    M ${16 * xMod} ${16.5 * yMod} 
    L ${18 * xMod} ${18.5 * yMod}
    L ${18 * xMod} ${25.5 * yMod}
    L ${16 * xMod} ${27.5 * yMod}
    L ${14 * xMod} ${25.5 * yMod}
    L ${14 * xMod} ${18.5 * yMod}
    Z
  `);
  svg.appendChild(path3);

  let path4 = makeSVG("path", "d", "segment");
  path4.setAttribute("d", `
    M ${4.5 * xMod} ${28 * yMod} 
    L ${6.5 * xMod} ${26 * yMod}
    L ${13.5 * xMod} ${26 * yMod}
    L ${15.5 * xMod} ${28 * yMod}
    L ${13.5 * xMod} ${30 * yMod}
    L ${6.5 * xMod} ${30 * yMod}
    Z
  `);
  svg.appendChild(path4);

  let path5 = makeSVG("path", "e", "segment");
  path5.setAttribute("d", `
    M ${4 * xMod} ${16.5 * yMod} 
    L ${6 * xMod} ${18.5 * yMod}
    L ${6 * xMod} ${25.5 * yMod}
    L ${4 * xMod} ${27.5 * yMod}
    L ${2 * xMod} ${25.5 * yMod}
    L ${2 * xMod} ${18.5 * yMod}
    Z
  `);
  svg.appendChild(path5);

  let path6 = makeSVG("path", "f", "segment");
  path6.setAttribute("d", `
    M ${4 * xMod} ${4.5 * yMod} 
    L ${6 * xMod} ${6.5 * yMod}
    L ${6 * xMod} ${13.5 * yMod}
    L ${4 * xMod} ${15.5 * yMod}
    L ${2 * xMod} ${13.5 * yMod}
    L ${2 * xMod} ${6.5 * yMod}
    Z
  `);
  svg.appendChild(path6);

  let path7 = makeSVG("path", "g", "segment");
  path7.setAttribute("d", `
    M ${4.5 * xMod} ${16 * yMod} 
    L ${6.5 * xMod} ${14 * yMod}
    L ${13.5 * xMod} ${14 * yMod}
    L ${15.5 * xMod} ${16 * yMod}
    L ${13.5 * xMod} ${18 * yMod}
    L ${6.5 * xMod} ${18 * yMod}
    Z
  `);
  svg.appendChild(path7);
}

function buildFace() {
  //----------------------------------------------------//
  //Builds the face of the clock by inserting the <svg> //
  //  elements and adding the segment <path> elements   //
  //----------------------------------------------------//

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
      const r = .25 * box.width;

      let circle1 = makeSVGcircle(x1, y1, r);
      colon.appendChild(circle1);

      let circle2 = makeSVGcircle(x1, y2, r);
      colon.appendChild(circle2);
    }
    let display = makeSVG("svg", `d${i.toString(10)}`, "digits");
    clockFace.appendChild(display);
    makeSegments(display);
  }

  let second = "";
  let minute = "";
  let hour = "";

  let startClock = setInterval(() => {
    const time = new Date();

    const secNow = time.getSeconds().toString(10).padStart(2, "0");

    if (secNow !== second) {

      const minNow = time.getMinutes().toString(10).padStart(2, "0");

      if (minNow !== minute) {

        const hourNow = time.getHours().toString(10).padStart(2, "0");

        if (hourNow !== hour) {
          hour = hourNow;
          setDigit("0", hour[0]);
          setDigit("1", hour[1]);
        }

        minute = minNow;
        setDigit("2", minute[0]);
        setDigit("3", minute[1]);
      }

      second = secNow;
      setDigit("4", second[0]);
      setDigit("5", second[1]);
    }

  }, 100);
}

function setDigit(target, digit) {
  //----------------------------------------------------//
  //Modifies the fill-opacity attributes of the segments//
  //  to display the proper digit                       //
  //----------------------------------------------------//
  //target(string): the ID of the <svg> whose <path>    //
  //  elements are to be changed                        //
  //digit(string): the digit to to be displayed on the  //
  //  seven-segment display                             //
  //----------------------------------------------------//

  let targ = document.getElementById(`d${target}`);

  targ.childNodes.forEach((x) => {
    if (digitSegments[digit].includes(x.id)) {
      x.setAttribute("fill-opacity", "1");
    } else {
      x.setAttribute("fill-opacity", "0");
    }
  })
}

const digitSegments = [
  "abcdef", 
  "bc", 
  "abdeg", 
  "abcdg",
  "bcfg",
  "acdfg",
  "acdefg",
  "abc",
  "abcdefg",
  "abcdfg"
];

document.body.onload = buildFace;

