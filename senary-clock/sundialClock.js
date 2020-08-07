function makeSVG(type) {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", type);
  if (arguments.length > 1) {svg.id = arguments[1]};
  return svg;
}

function makeCircle(parent) {
  //----------------------------------------------------//
  //Makes the circle SVG element for the outer face     //
  //  of the clock                                      //
  //element-> parent: the <svg> element into which      //
  //  the circle is inserted                            //
  //----------------------------------------------------//

  let circle = makeSVG("circle", "rim");
  circle.classList.add("circle");

  circle.style.stroke = "aqua";
  circle.style.strokeWidth = 3;
  circle.style.fill = "none";

  parent.appendChild(circle);

  return circle;
}

function makeEllipses(parent, number) {
  //----------------------------------------------------//
  //Makes the ellipses that point to the hours          //
  //element-> parent: the <svg> element into which      //
  //  the ellipses will be inserted                     //
  //integer-> number: the number of ellipses to make    //
  //----------------------------------------------------//

  let angle = 0;
  let change = 360 / number;

  for (let i = 0; i < number; i++) {
    let ellipse = makeSVG("ellipse");
    ellipse.classList.add("ellipse");
    ellipse.style.transform = "rotate(" + angle + "deg)";
    parent.appendChild(ellipse);

    angle += change;
  }
}

function makeNumbers(parent, number) {
  //----------------------------------------------------//
  //Makes the numbers that surround the clock face      //
  //element-> parent: the <svg> element into which      //
  //  the numbers will be inserted                      //
  //integer-> number: the number of numbers to make     //
  //----------------------------------------------------//

  let angle = 0;
  let change = 360 / (number/2);

  for (let i = 0; i < number; i+=2) {
    angle += change;

    let digit = i + 2;
    let numero = makeSVG("text");
    numero.textContent = digit.toString(6).padStart(2, 0);
    numero.classList.add("numbers");

    numero.style.transform = "rotate(" + angle + "deg) translate(230px, 100px)";

    parent.appendChild(numero);
  }

  /*setTimeout(function() {
    let time = new Date();
    illuminateHour(time.getHours());
  }, 100);*/

}

function addStop(parent, offset, color) {
  //----------------------------------------------------//
  //adds gradient <stop> elements into gradient elements//
  //element-> parent: the gradient element into which   //
  //  the <stop> will be inserted                       //
  //string-> offset: the offset of the stop             //
  //string-> color: the color of the gradient stop      //
  //----------------------------------------------------//

  let stop = makeSVG("stop");
  stop.setAttribute("offset", offset);
  stop.setAttribute("stop-color", color);
  parent.appendChild(stop);
}

function makePolygon(parent, x, y) {
  let polygon = makeSVG("polygon");
  polygon.classList.add("polygon");

  polygon.setAttribute("points", "250,250 250,120 " + x + "," + y);

  polygon.style.fill = "url('#handGradient')";
  polygon.style.filter = "url('#blur')";

  parent.appendChild(polygon);

  return polygon;
}

//
//The clock element in the HTML document
let clock = document.getElementById("clock");

//
//Makes the big SVG element to put in
//the HTML document
let svg = makeSVG("svg", "svgClock");
let svgNS = svg.namespaceURI;

//
//Sets up the face of the clock
let circle = makeCircle(svg);

let polygon = makePolygon(svg, 250, 250);

//
//This is the radial gradient for the ellipses
let ellipseDef = makeSVG("defs");
  let ellipseGrad = makeSVG("radialGradient", "ellipseGradient");
    addStop(ellipseGrad, "0%", "violet");
    addStop(ellipseGrad, "50%", "orchid");
    addStop(ellipseGrad, "100%", "fuchsia");
ellipseDef.appendChild(ellipseGrad);
svg.appendChild(ellipseDef);

//
//This is the linear gradient for the hands
let hands = makeSVG("defs");
  let handGrad = makeSVG("linearGradient", "handGradient");
  handGrad.setAttribute("gradientTransform", "rotate(90)");
    //addStop(handGrad, "0%", "orangered");
    //addStop(handGrad, "100%", "gold");
    addStop(handGrad, "0%", "rgba(255,69,0,.75)");
    addStop(handGrad, "100%", "rgba(255,215,0,.75)");
hands.appendChild(handGrad);
svg.appendChild(hands);

//
//This is the shadow filter for the hands
let handShadows = makeSVG("defs");
  let filter = makeSVG("filter", "blur");
    let blur = makeSVG("feGaussianBlur");
    blur.setAttribute("in", "SourceGraphic");
    blur.setAttribute("stdDeviation", "2");
  filter.appendChild(blur);
handShadows.appendChild(filter);
svg.appendChild(handShadows);

makeEllipses(svg, 24);
makeNumbers(svg, 24);


clock.appendChild(svg);

let refreshInterval = setInterval(function() {
  /*if (getRandomNumber(0, 200) === 1) {
    flicker();
  }*/

  let time = new Date();
  //
  //These equations calculate the number
  //of milliseconds in a second, minute, and hour
  let msSeconds = (time.getSeconds() * 1000) + time.getMilliseconds();
  let msMinutes = (time.getMinutes() * 60000) + msSeconds;
  let msHours = (time.getHours() * 3600000) + msMinutes;

  let sAngle = ((msSeconds * 0.0000333) + 1.5);

  let hAngle = ((msHours * 0.000000023148148) + 1.5) % 2;

  let x = (250 + (230 * Math.cos(hAngle * Math.PI)));
  let y = (250 + (230 * Math.sin(hAngle * Math.PI)));

  svg.removeChild(polygon);

  polygon = makePolygon(svg, x, y);

}, 10);
