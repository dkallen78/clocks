const getRandomNumber = function(floor, ceiling) {
  //----------------------------------------------------//
  //Gets random number within a range of numbers        //
  //integer-> floor: the lowest possible number         //
  //integer-> ceiling: the highest possible number      //
  //----------------------------------------------------//

  let range = (ceiling - floor) + 1;
  return Math.floor((Math.random() * range) + floor);
}

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

function makeCenter(parent) {
  //----------------------------------------------------//
  //Makes the center hub of the clock face              //
  //element-> parent: the <svg> element into which      //
  //  the center is inserted                            //
  //----------------------------------------------------//

  let circle = makeSVG("circle", "center");
  circle.classList.add("circle");
  circle.style.fill = "aqua";
  parent.appendChild(circle);
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
  let change = 360 / number;

  for (let i = 0; i < number; i++) {
    angle += change;

    let digit = i + 1;
    let numero = makeSVG("text");
    numero.textContent = digit.toString(6).padStart(2, 0);
    numero.classList.add("numbers");

    numero.style.transform = "rotate(" + angle + "deg) translate(41vh, 8vh)";

    parent.appendChild(numero);
  }

  setTimeout(function() {
    let time = new Date();
    illuminateHour(time.getHours());
  }, 100);

}

function makeHand(parent, id) {
  //----------------------------------------------------//
  //Makes the hands of the clock                        //
  //element-> parent: the <svg> element into which      //
  //  the hand will be inserted                         //
  //string-> id: the id of the hand                     //
  //----------------------------------------------------//

  let hand = makeSVG("rect", id);
  hand.classList.add("hands");
  parent.appendChild(hand);

  return hand;
}

function makeHandShadow(parent, id) {
  //----------------------------------------------------//
  //Makes the shadows of the hands of the clock         //
  //element-> parent: the <svg> element into which      //
  //  the hand will be inserted                         //
  //string-> id: the id of the hand                     //
  //----------------------------------------------------//

  let hand = makeSVG("rect", id);
  hand.classList.add("handShadows");
  parent.appendChild(hand);

  return hand;
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

function flicker() {
  //----------------------------------------------------//
  //Causes a flicker effect in the clock numbers        //
  //----------------------------------------------------//

  //
  //Selects all the number elements and removes them
  let numbers = document.getElementsByClassName("numbers");
  for (let i = numbers.length - 1; i >= 0; i--) {
    numbers[i].parentNode.removeChild(numbers[i]);
  }

  //
  //Puts the numbers back after a random delay
  setTimeout(function() {
    makeNumbers(svg, 24);
    working = false;
  }, getRandomNumber(0, 100));
}

function illuminateHour(hour) {
  //----------------------------------------------------//
  //Adds an illumination effect to the current hour     //
  //integer-> hour: the current hour from 0-23          //
  //----------------------------------------------------//

  //
  //Determines which hour to dim and which hour to illuminate
  let newHour = ((hour + 24) - 1) % 24;
  let oldHour = ((hour + 24) - 2) % 24;
  let numbers = document.getElementsByClassName("numbers");
  numbers[oldHour].style.filter = "";
  numbers[newHour].style.filter = "drop-shadow(0 0 .5vh aqua)";
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
makeCircle(svg);
makeEllipses(svg, 24);
makeNumbers(svg, 24);

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
    addStop(handGrad, "0%", "orangered");
    addStop(handGrad, "100%", "gold");
hands.appendChild(handGrad);
svg.appendChild(hands);

/*addStop(gradient, "0%", "dodgerBlue");
addStop(gradient, "100%", "aqua");*/

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

//
//Puts the three hands and their shadows on the SVG
let sHandShadow = makeHandShadow(svg, "sHandShadow");
let sHand = makeHand(svg, "sHand");

let mHandShadow = makeHandShadow(svg, "mHandShadow");
let mHand = makeHand(svg, "mHand");

let hHandShadow = makeHandShadow(svg, "hHandShadow");
let hHand = makeHand(svg, "hHand");

//
//Puts the center onto the face and puts
//everything onto the page
makeCenter(svg);
clock.appendChild(svg);

let numbers = document.getElementsByClassName("numbers");
let digitalTime = makeSVG("text", "digitalTime");
digitalTime.setAttribute("textLength", "50%");
svg.appendChild(digitalTime);

//
//Will update the clock face at 100Hz
let hourCheck = null;
let working = false;
let refreshInterval = setInterval(function() {
  //
  //Determines if the numbers will "flicker"
  //this cycle
  if ((getRandomNumber(0, 200) === 1) && !working) {
    working = true;
    flicker();
  }

  let time = new Date();

  //
  //Does the work of moving the second hand
  let msSeconds = (time.getSeconds() * 1000) + time.getMilliseconds();
  let sAngle = msSeconds * 0.006;
  sHand.style.transform = "rotate(" + sAngle + "deg)";
  sHandShadow.style.transform = "rotate(" + sAngle + "deg)";

  //
  //Does the work of moving the minute hand
  let msMinutes = (time.getMinutes() * 60000) + msSeconds;
  let mAngle = msMinutes * 0.0001;
  mHand.style.transform = "rotate(" + mAngle + "deg)";
  mHandShadow.style.transform = "rotate(" + mAngle + "deg)";

  //
  //Does the work of moving the hour hand
  let msHours = (time.getHours() * 3600000) + msMinutes;
  let hAngle = msHours * 0.000004166;
  hHand.style.transform = "rotate(" + hAngle + "deg)";
  hHandShadow.style.transform = "rotate(" + hAngle + "deg)";

  //
  //Gets and formats the numbers for the "digital" display
  let hour = time.getHours().toString(6).padStart(2, 0);
  let minute = time.getMinutes().toString(6).padStart(3, 0);
  let second = time.getSeconds().toString(6).padStart(3, 0);
  let timeString = hour + ":" + minute + ":" + second;

  digitalTime.textContent = timeString;

  //
  //Checks to see if the current hour is "illuminated"
  if (hour !== hourCheck) {
    hourCheck = hour;
    illuminateHour(time.getHours());
  }
}, 10);
