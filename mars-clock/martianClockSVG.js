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
    //numero.textContent = digit.toString(6).padStart(2, 0);
    numero.textContent = digit.toString().padStart(2, 0);
    numero.classList.add("numbers");

    numero.style.transform = "rotate(" + angle + "deg) translate(41vh, 8vh)";

    parent.appendChild(numero);
  }

  setTimeout(function() {
    let time = martianTime(Date.now())
    illuminateHour(parseInt(time[3]));
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

function martianTime(now) {
  //----------------------------------------------------//
  //Calculates the Coordinated Martian Time based on    //
  //the Mars Sol Date (MSD)                             //
  //integer-> now: ms since Jan 1, 1970                 //
  //----------------------------------------------------//

  function julianDateUTC(now) {
    //----------------------------------------------------//
    //Calculates the Julian Day (JD) based on            //
    //milliseconds elapsed since the start of the         //
    //Unix epoch (00:00 Jan 1, 1970)                      //
    //integer-> now: ms since Jan 1, 1970                 //
    //----------------------------------------------------//

    //
    //Days between start of Julian epoch and start of Unix epoch
    const j2u = 2440587.5;

    return (now / mspd) + j2u;
  }

  function julianDateTT(now) {
    //----------------------------------------------------//
    //Calculates the Terrestrial Time (TT) based on       //
    //the JD                                              //
    //integer-> now: ms since Jan 1, 1970                 //
    //----------------------------------------------------//

    //
    //Leap Seconds
    const ls = 37;

    //
    //Difference in seconds between Terrestrial Time (TT)
    //and International Atomic Time (TIA)
    const dif = 32.184;

    return (julianDateUTC(now) + ((ls + dif) / spd));
  }

  function marsSolDate(now) {
    //----------------------------------------------------//
    //Calculates the Mars Sol Date (MSD) based on         //
    //the TT                                              //
    //integer-> now: ms since Jan 1, 1970                 //
    //----------------------------------------------------//

    //
    //Dahys between start of Julian epoch
    //and start of Martian epoch
    const j2m = 2405522.0028779;

    //
    //Ration of length of Earth day to Martian Sol
    const solRatio = 1.0274912517;

    return ((julianDateTT(now) - j2m) / solRatio);
  }

  //
  //Milliseconds in a day
  const mspd = 86400000;

  //
  //Seconds per day
  const spd = 86400;

  let sols = marsSolDate(now);

  let exactHours = ((sols % 1) * 24);
  let hours = Math.floor(exactHours).toString().padStart(2, 0);

  let exactMinutes = ((sols % 1) * 1440);
  let minutes = (Math.floor(exactMinutes) % 60).toString().padStart(2, 0);

  let exactSeconds = ((sols % 1) * spd);
  let seconds = (Math.floor(exactSeconds) % 60).toString().padStart(2, 0);

  let milliseconds = ((sols % 1) * mspd);
  let ms = (Math.floor(milliseconds) % 1000).toString().padStart(2, 0);

  return [ms, seconds, minutes, hours];
}

//
//The clock element in the HTML document
let clock = document.getElementById("clock");

//
//Makes the big SVG element to put in
//the HTML document
let svg = makeSVG("svg", "svgClock");
clock.appendChild(svg);

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
//Shadow hands first so they appear beneath the hands
let sHandShadow = makeHandShadow(svg, "sHandShadow");
let sHand = makeHand(svg, "sHand");

let mHandShadow = makeHandShadow(svg, "mHandShadow");
let mHand = makeHand(svg, "mHand");

let hHandShadow = makeHandShadow(svg, "hHandShadow");
let hHand = makeHand(svg, "hHand");

//
//Puts the center onto the face, above the
//hands so no shadow falls on it
makeCenter(svg);

//let numbers = document.getElementsByClassName("numbers");
let digitalTime = makeSVG("text", "digitalTime");
digitalTime.setAttribute("textLength", "50%");
svg.appendChild(digitalTime);

let hourCheck = null;
let working = false;
//
//Will update the clock face at 100Hz
let refreshInterval = setInterval(function() {
  //
  //Determines if the numbers will "flicker"
  //this cycle
  if ((getRandomNumber(0, 200) === 1) && !working) {
    working = true;
    flicker();
  }

  let times = martianTime(Date.now());

  //
  //Does the work of moving the second hand
  let msSeconds = (parseInt(times[1]) * 1000) + parseInt(times[0]);
  let sAngle = msSeconds * 0.006;
  sHand.style.transform = "rotate(" + sAngle + "deg)";
  sHandShadow.style.transform = "rotate(" + sAngle + "deg)";

  //
  //Does the work of moving the minute hand
  let msMinutes = (parseInt(times[2]) * 60000) + msSeconds;
  let mAngle = msMinutes * 0.0001;
  mHand.style.transform = "rotate(" + mAngle + "deg)";
  mHandShadow.style.transform = "rotate(" + mAngle + "deg)";

  //
  //Does the work of moving the hour hand
  let msHours = (parseInt(times[3]) * 3600000) + msMinutes;
  let hAngle = msHours * 0.000004166;
  hHand.style.transform = "rotate(" + hAngle + "deg)";
  hHandShadow.style.transform = "rotate(" + hAngle + "deg)";

  //
  //Gets and formats the numbers for the "digital" display
  let timeString = times[3] + ":" + times[2] + ":" + times[1];

  digitalTime.textContent = timeString;

  //
  //Checks to see if the current hour is "illuminated"
  if (parseInt(times[3]) !== hourCheck) {
    hourCheck = parseInt(times[3]);
    illuminateHour(parseInt(times[3]));
  }
}, 10);
