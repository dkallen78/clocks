const getRandomNumber = function(floor, ceiling) {
  //----------------------------------------------------//
  //Gets random number for the math problems            //
  //where floor is the lowest number possible and       //
  //ceiling is the highest number possible              //
  //----------------------------------------------------//

  let range = (ceiling - floor) + 1;
  return Math.floor((Math.random() * range) + floor);
}

function makeCanvas(id, height = 900, width = 900) {
  //----------------------------------------------------//
  //Returns a canvas                                    //
  //string-> id: the id of the canvas                   //
  //integer-> height: height of the canvas              //
  //integer-> width: width of the makeCanvas            //
  //----------------------------------------------------//

  var canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.classList.add("canvas");
  canvas.height = height;
  canvas.width = width;

  return canvas;
}

function drawNumbers() {
  //----------------------------------------------------//
  //Draws the numbers of the clock face                 //
  //----------------------------------------------------//

  let faceNumber = 5;
  for (let i = 0; i < 1.9999999; i += .083333333) {
    faceNumber = (faceNumber % 24) + 1;

    let xPos3 = (450 + (360 * Math.cos(i * Math.PI)));
    let yPos3 = (450 + (360 * Math.sin(i * Math.PI)));

    numberContext.beginPath();
    numberContext.font = "40px Monospace";
    numberContext.shadowBlur = 10;
    numberContext.shadowColor = "dodgerBlue";
    numberContext.strokeStyle = "aqua";
    numberContext.lineWidth = 1.5;
    numberContext.strokeText(faceNumber.toString(6).padStart(2, 0), xPos3 - 25, yPos3 + 12);
    //numberContext.fill();
    numberContext.closePath();
  }
}

function drawHand(radians, handLength, handWidth) {
  //----------------------------------------------------//
  //Draws the clock hands                               //
  //float-> radians: the radian position of the hand    //
  //integer-> handLength: pixel length of the hand      //
  //integer-> handWidth: pixel width of the hand        //
  //----------------------------------------------------//

  let x1 = (450 + (20 * Math.cos(radians * Math.PI)));
  let y1 = (450 + (20 * Math.sin(radians * Math.PI)));

  let x2 = (450 + (handLength * Math.cos(radians * Math.PI)));
  let y2 = (450 + (handLength * Math.sin(radians * Math.PI)));

  handContext.beginPath();
  handContext.moveTo(x1, y1);
  handContext.lineTo(x2, y2);
  handContext.lineWidth = handWidth;
  handContext.shadowOffsetX = 5;
  handContext.shadowOffsetY = 5;
  handContext.shadowBlur = 5;
  handContext.shadowColor = "black";
  let grad = handContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, "aqua");
  grad.addColorStop(1, "dodgerBlue");
  handContext.strokeStyle = grad;
  handContext.stroke();
  handContext.closePath();
}

function drawHands() {
  //----------------------------------------------------//
  //Manages the drawing of all the hands                //
  //----------------------------------------------------//

  function drawTime(type = "normal") {
    //----------------------------------------------------//
    //Displays the timeString on the clock face           //
    //----------------------------------------------------//

    handContext.beginPath();
    handContext.font = "40px Monospace";
    handContext.fillStyle = baseColor;
    handContext.lineWidth = lineWidth;
    if (type === "glow") {
      handContext.shadowOffsetX = 0;
      handContext.shadowOffsetY = 0;
      handContext.shadowBlur = 15;
      handContext.shadowColor = "aqua";
    }
    handContext.fillText(timeString, 330, 395);
    handContext.closePath();
  }

  let time = new Date();
  //
  //These equations calculate the number
  //of milliseconds in a second, minute, and hour
  let msSeconds = (time.getSeconds() * 1000) + time.getMilliseconds();
  let msMinutes = (time.getMinutes() * 60000) + msSeconds;
  let msHours = (time.getHours() * 3600000) + msMinutes;

  //
  //Draws the second hand
  let sAngle = ((msSeconds * 0.0000333) + 1.5);
  drawHand(sAngle, 310, 10);
  //
  //Draws the minute hand
  let mAngle = ((msMinutes * 0.000000555) + 1.5) % 2;
  drawHand(mAngle, 230, 15);
  //
  //Draws the hour hand
  let hAngle = ((msHours * 0.000000023148148) + 1.5) % 2;
  drawHand(hAngle, 150, 20);

  //
  //Displays the time numerically
  let hour = time.getHours().toString(6).padStart(2, 0);
  let minute = time.getMinutes().toString(6).padStart(3, 0);
  let second = time.getSeconds().toString(6).padStart(3, 0);
  let timeString = hour + ":" + minute + ":" + second;



  handContext.beginPath();
  handContext.rect(320, 350, 260, 60);
  handContext.lineWidth = 5
  handContext.shadowOffsetX = 5;
  handContext.shadowOffsetY = 5;
  handContext.shadowBlur = 5;
  handContext.shadowColor = "black";
  handContext.strokeStyle = "aqua";
  handContext.stroke();
  handContext.closePath();

  drawTime();
  drawTime("glow");

  /*handContext.beginPath();
  handContext.rect(320, 350, 260, 60);
  handContext.shadowOffsetX = 5;
  handContext.shadowOffsetY = 5;
  handContext.shadowBlur = 5;
  handContext.shadowColor = "black";
  handContext.strokeStyle = "aqua";
  handContext.stroke();
  handContext.closePath();*/
}

function flicker() {
  //----------------------------------------------------//
  //Causes a flicker effect in the clock numbers        //
  //----------------------------------------------------//

  numberContext.clearRect(0, 0, 900, 900);
  setTimeout(function() {
    drawNumbers();
  }, getRandomNumber(0, 100));
}

let senaryClock = document.getElementById("clock");

//
//Makes the canvas for the clock face
let clockCanvas = makeCanvas("clockCanvas");
senaryClock.appendChild(clockCanvas);
let clockContext = clockCanvas.getContext("2d");

//
//Sets the color and style of the clock elements
let lineWidth = 5;
let baseColor = "fuchsia";
let baseShadow = "rgba(255, 0, 0, 1)";

//
//Draws the outer circle of the clock face
clockContext.beginPath();
clockContext.arc(450, 450, 400, 0, (2 * Math.PI));

clockContext.shadowOffsetX = 5;
clockContext.shadowOffsetY = 5;
clockContext.shadowBlur = 5;
clockContext.shadowColor = "black";
clockContext.lineWidth = lineWidth;
/*let faceGrad = clockContext.createLinearGradient(450, 900, 450, 0);
faceGrad.addColorStop(0, "gold");
faceGrad.addColorStop(1, "orangered");
clockContext.fillStyle = faceGrad;
clockContext.fill();*/
clockContext.strokeStyle = "aqua";
clockContext.stroke();

//
//Lifts the "pen" off of the canvas
clockContext.closePath();

/*
function drawDials() {
  for (let i = 0; i < 1.9999999; i += .083333333) {
    clockContext.beginPath();

    let xPos = (450 + (300 * Math.cos(i * Math.PI)));
    let yPos = (450 + (300 * Math.sin(i * Math.PI)));
  }
}*/
//
//Puts the numbers on the face
let numberCanvas = makeCanvas("numberCanvas");
senaryClock.appendChild(numberCanvas);
let numberContext = numberCanvas.getContext("2d");

drawNumbers();

//
//Draws the 24 hour markers on the face
let faceNumber = 5;
for (let i = 0; i < 1.9999999; i += .083333333) {
  clockContext.beginPath();

  let xPos = (450 + (300 * Math.cos(i * Math.PI)));
  let yPos = (450 + (300 * Math.sin(i * Math.PI)));

  faceNumber = (faceNumber % 24) + 1;
  let ellipseRot = faceNumber * (2/24);

  clockContext.ellipse(xPos, yPos, 20, 5, ((ellipseRot + 1.5) * Math.PI), 0, (2 * Math.PI));
  clockContext.shadowOffsetX = 0;
  clockContext.shadowOffsetY = 0;
  clockContext.shadowBlur = 10;
  clockContext.shadowColor = "fuchsia";
  clockContext.lineWidth = 10;
  let grd = clockContext.createRadialGradient(xPos, yPos, 1, xPos, yPos, 20);
  grd.addColorStop(0, "violet");
  grd.addColorStop(.5, "orchid");
  grd.addColorStop(1, "fuchsia");
  clockContext.fillStyle = grd;
  clockContext.fill();
  clockContext.closePath();
}

//
//Draws the center dot
clockContext.beginPath();
clockContext.arc(450, 450, 10, 0, (2 * Math.PI));
/*clockContext.shadowOffsetX = 5;
clockContext.shadowOffsetY = 5;
clockContext.shadowBlur = 5;
clockContext.shadowColor = "black";*/
clockContext.fillStyle = baseColor;
clockContext.fill();
clockContext.closePath();

//
//The hands of the clock
let handCanvas = makeCanvas("handCanvas");
senaryClock.appendChild(handCanvas);
let handContext = handCanvas.getContext("2d");

//
//Will update the clock face at 100Hz
let refreshInterval = setInterval(function() {
  if (getRandomNumber(0, 200) === 1) {
    flicker();
  }
  handContext.clearRect(0, 0, 900, 900);
  drawHands();
}, 10);
