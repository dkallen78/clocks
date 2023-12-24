const seconds = document.getElementById("seconds");
let currentSeconds = 0;
const minutes = document.getElementById("minutes");
let currentMinutes = 0;
const hours = document.getElementById("hours");
let currentHours = 0;

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

function changeTime(old, time, target, unit) {
  //----------------------------------------------------//
  //Changes the displayed time                          //
  //----------------------------------------------------//
  //old(string): the previous unit of time that is      //
  //  to be changed                                     //
  //time(integer): the new unit of time to display      //
  //target(HTML element): where to display the updated  //
  //  time                                              //
  //unit(string): the unit of time, used so the previous//
  //  element can be found and removed                  //
  //----------------------------------------------------//
  //return(string): the currently displayed time        //
  //----------------------------------------------------//

  //
  //Converts the time integer into a string and pads it
  //  with 0s if neccessary
  time = time.toString(10).padStart(2, 0);

  //
  //Gets the elements that are displaying the current time
  let oldTop = document.getElementById(`${old}T${unit}`);
  let oldBottom = document.getElementById(`${old}B${unit}`);

  //
  //If the old elements aren't null (they exist) then they
  //  are removed after a timeout
  if (oldTop) {
    oldTop.style.transform = "rotateX(-180deg)";

    setTimeout(function() {
      oldTop.parentNode.removeChild(oldTop);
    }, 200);
    setTimeout(function() {
      oldBottom.parentNode.removeChild(oldBottom);
    }, 400);
  }

  //
  //Creates a new element to display the updated time, pre-rotated
  //  so it can be flipped into place
  let spanBottom = makeElement("span", `${time}B${unit}`, "bottom");
  spanBottom.style.transform = "rotateX(180deg)";
  spanBottom.innerHTML = time;
  //
  //Inserts the element "under" the topmost element
  target.insertBefore(spanBottom, target.childNodes[0]);
  setTimeout(function() {
    spanBottom.style.transform = "rotateX(0deg)";
  }, 10);
  //
  //Places the flipped time above the old time so it's visible
  setTimeout(function() {
    spanBottom.style.zIndex = "2";
    if (oldBottom) {oldBottom.style.zIndex = "-1";}
    //oldBottom.style.zIndex = "-1";
  }, 150);
  //
  //Creates a new element to display the top portion of the
  //  updated time and places it "under" the topmost element
  let spanTop = makeElement("span", `${time}T${unit}`, "top");
  spanTop.innerHTML = time;
  target.insertBefore(spanTop, target.childNodes[0]);

  return time;
}

let refreshInterval = setInterval(function() {
  //
  //Checks the time every 10 milliseconds
  let time = new Date();
  //
  //Updates the seconds
  if (currentSeconds !== time.getSeconds().toString(10).padStart(2, 0)) {
    currentSeconds = changeTime(currentSeconds, time.getSeconds(), seconds, "sec");
  }
  //
  //Updates the minutes
  if (currentMinutes !== time.getMinutes().toString(10).padStart(2, 0)) {
    currentMinutes = changeTime(currentMinutes, time.getMinutes(), minutes, "min");
  }
  //
  //Updates the hours
  if (currentHours !== time.getHours().toString(10).padStart(2, 0)) {
    currentHours = changeTime(currentHours, time.getHours(), hours, "hr");
  }

}, 10);
