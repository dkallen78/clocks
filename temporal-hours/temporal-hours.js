function rnd(floor, ceiling) {
  //----------------------------------------------------//
  //Generates a random number within a range of numbers //
  //----------------------------------------------------//
  //floor(integer): lower bound of the random number    //
  //ceiling(integer): upper bound of the random number  //
  //----------------------------------------------------//
  //return(integer): random number w/in the range       //
  //----------------------------------------------------//

  let range = (ceiling - floor) + 1;
  return Math.floor((Math.random() * range) + floor);
}

function makeElement(type, id, ...classes) {
  //----------------------------------------------------//
  //Returns an HTML element                             //
  //----------------------------------------------------//
  //type(string): type of HTML element to create        //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element      //
  //----------------------------------------------------//
  //return(element): HTML element                       //
  //----------------------------------------------------//

  let element = document.createElement(type);
  if (typeof id === "string") {element.id = id}
  classes.forEach(x => element.classList.add(x));
  return element;
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

function makeSVGcircle(x, y, r, id) {
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
  if (typeof id === "string") {circle.id = id}

  return circle;
}

function insertLineBreak(element, repeat = 1) {
  //----------------------------------------------------//
  //Inserts a <br /> element into another element one   //
  //or multiple times                                   //
  //----------------------------------------------------//
  //element(element): the element into witch the <br>   //
  //  will be inserted                                  //
  //repeat(integer): the number of <br> elements to     //
  //  insert                                            //
  //----------------------------------------------------//

  for (let i = 0; i < repeat; i++) {
    const lineBreak = document.createElement("br");
    element.appendChild(lineBreak);
  }
}

function clearElement(...elements) {
  //----------------------------------------------------//
  //Clears the innerHTML of any number of elements      //
  //----------------------------------------------------//
  //DOM element-> elements: elements to be cleared      //
  //----------------------------------------------------//

  elements.forEach(x => x.innerHTML = "");
}

function makeInputScreen() {
  //----------------------------------------------------//
  //Builds and places all the elements for the          //
  //  coordinate input screen                           //
  //----------------------------------------------------//

  const latitudeLabel = makeElement("label");
    latitudeLabel.htmlFor = "latitude-input";
    latitudeLabel.innerHTML = "Latitude:";
  document.body.appendChild(latitudeLabel);

  insertLineBreak(document.body);

  const latitudeInput = makeElement("input", "latitude-input");
    latitudeInput.type = "number";
    latitudeInput.name = "latitude-input";
    latitudeInput.value = "0";
  document.body.appendChild(latitudeInput);

  insertLineBreak(document.body, 2);

  const longitudeLabel = makeElement("label");
    longitudeLabel.htmlFor = "latitude-input";
    longitudeLabel.innerHTML = "Latitude:";
  document.body.appendChild(longitudeLabel);

  insertLineBreak(document.body);

  const longitudeInput = makeElement("input", "longitude-input");
    longitudeInput.type = "number";
    longitudeInput.name = "longitude-input";
    longitudeInput.value = "0";
  document.body.appendChild(longitudeInput);

  insertLineBreak(document.body, 2);

  const getCoordinatesButton = makeElement("input", "get-coordinates-button");
    getCoordinatesButton.type = "button";
    getCoordinatesButton.value = "Get Coordinates";
    getCoordinatesButton.addEventListener("click", getCoordinates);
  document.body.appendChild(getCoordinatesButton);

  insertLineBreak(document.body, 2);

  const launchClockButton = makeElement("input", "launch-clock-button");
    launchClockButton.type = "button";
    launchClockButton.value = "Launch Clock";
    launchClockButton.addEventListener("click", launchClock);
  document.body.appendChild(launchClockButton);
}

function getCoordinates() {
  //----------------------------------------------------//
  //Gets the latitude and longitude of the user,        //
  //  displays a loading animation while they are       //
  //  retreived, and places them in the input fields    //
  //----------------------------------------------------//

  const latitudeInput = document.getElementById("latitude-input");
  const longitudeInput = document.getElementById("longitude-input");

  //
  //Displays random numbers in the coordinate input fields
  //  while the true coordinates are being found
  let loadingCoordinates = setInterval(() => {
    latitudeInput.value = `${rnd(10, 99)}.${rnd(100000, 999999)}`;
    longitudeInput.value = `${rnd(10, 99)}.${rnd(100000, 999999)}`;
  }, 100);

  navigator.geolocation.getCurrentPosition((position) => {

    clearInterval(loadingCoordinates);

    latitudeInput.value = position.coords.latitude;
    lat = position.coords.latitude.toString(10);

    longitudeInput.value = position.coords.longitude;
    long = position.coords.longitude.toString(10);

  });
}

function launchClock() {
  //----------------------------------------------------//
  //Determines if we need to call the sunrisesunset API,//
  //  and if we do, saves the returned info to local    //
  //  storate so we can run the program multiple times  //
  //  without overloading the API                       //
  //----------------------------------------------------//

  function fetchDeets() {
    //----------------------------------------------------//
    //Fetches the sunrise/sunset times from the API,      //
    //  saves the data to local storage, then sends it on //
    //  its way to the next function                      //
    //----------------------------------------------------//

    const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}&date_start=${date1}&date_end=${date2}`;

    fetch(url)
    .then(response => response.json())
    .then( data => {
      localStorage.setItem("yesterdayDeets", JSON.stringify(data.results[0]));
      localStorage.setItem("todayDeets", JSON.stringify(data.results[1]));
      localStorage.setItem("tomorrowDeets", JSON.stringify(data.results[2]));

      buildDial();
    })
  }

  //
  //If there's no saved deets, fetch them
  if (localStorage.getItem("todayDeets") === null) {
    fetchDeets();
  } else {
    
    let todayDeets = JSON.parse(localStorage.getItem("todayDeets"));

    //
    //If the deets are out of date, fetch new ones
    if (todayDeets.date !== makeDate(today)) {
      fetchDeets();
    } else {
      buildDial();
    } 
  }
}

function buildDial() {
  //----------------------------------------------------//
  //
  //----------------------------------------------------//


  function cleanTime(time) {
    //----------------------------------------------------//
    //Takes the sunrise/sunset time from the API and      //  
    //  converts it into a string that can be read by the //
    //  Date constructor                                  //
    //----------------------------------------------------//
    //time(string): the time output of the API            //
    //----------------------------------------------------//
    //return(string): the time output expected by the     //
    //  Date constructor                                  //
    //----------------------------------------------------//

    //
    //RegEx that isolates colons and spaces
    const reg = /:|\s/;

    let timeParts = time.split(reg);

    //
    //If the time is PM, add 12 to the hours
    if (timeParts.pop() === "PM") {
      timeParts[0] = (parseInt(timeParts[0], 10) + 12).toString(10);
    } else {
      timeParts[0] = timeParts[0].padStart(2, "0");
    }

    return timeParts.join(":");
  }

  const yesterdayDeets = JSON.parse(localStorage.getItem("yesterdayDeets"));
  const todayDeets = JSON.parse(localStorage.getItem("todayDeets"));
  const tomorrowDeets = JSON.parse(localStorage.getItem("tomorrowDeets"));

  const sunriseUTC = new Date(`${todayDeets.date}T${cleanTime(todayDeets.sunrise)}`);
  const sunrise = new Date(sunriseUTC.getTime() - (sunriseUTC.getTimezoneOffset() * 60_000));

  const sunsetUTC = new Date(`${todayDeets.date}T${cleanTime(todayDeets.sunset)}`);
  const sunset = new Date(sunsetUTC.getTime() - (sunsetUTC.getTimezoneOffset() * 60_000));


  console.log(cleanTime(todayDeets.sunrise));
  console.log(cleanTime(todayDeets.sunset));

  let daylight = sunset.getTime() - sunrise.getTime();
  let tempHour = daylight / 12;

  console.log(`${daylight} ms, ${daylight / 1000} s, ${daylight / 60_000} min, ${daylight / 3_600_000} h`);
  console.log(`${tempHour} ms, ${tempHour / 1000} s, ${tempHour / 60_000} min, ${tempHour / 3_600_000} h`);

  const sundialSVG = makeSVG("svg", "sundialSVG");
  clearElement(document.body);
  document.body.appendChild(sundialSVG);
  const box = sundialSVG.getBoundingClientRect();

  const sundialBase = makeSVGcircle((box.width * .5), (box.height * .5), (box.width * .4), "sundial-base");
  sundialSVG.appendChild(sundialBase);

  const sundialGnomon = makeSVGcircle((box.width * .5), (box.height * .5), (box.width * .01), "sundial-gnomon");
  sundialSVG.appendChild(sundialGnomon) 

}

const glyphs = {
  1: "𓏺",
  2: "𓏻",
  3: "𓏼",
  4: "𓏽",
  5: "𓏾", 
  6: "𓏿", 
  7: "𓐀",
  8: "𓐁",
  9: "𓐂",
  10: "𓎆",
  11: "𓎆𓏺",
  12: "𓎆𓏻"
}

document.body.onload = makeInputScreen;

function makeDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString(10).padStart(2, "0");
  const day = date.getDate().toString(10).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

let today = new Date();
let yesterday = new Date(today.getTime() - 86_400_000);
let tomorrow = new Date(today.getTime() + 86_400_000);

let date1 = makeDate(yesterday);
let date2 = makeDate(tomorrow);

let lat = "";
let long = "";


const startTime = performance.now();

const endTime = performance.now();
const totalTime = parseFloat((endTime - startTime).toFixed(3), 10);


let msTotal = (today.getTime() % 86_400_000) - (today.getTimezoneOffset() * 60_000);

