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

  time = time.toString(10).padStart(2, 0);

  let oldTop = document.getElementById(`${old}T${unit}`);
  let oldBottom = document.getElementById(`${old}B${unit}`);

  if (oldTop) {
    oldTop.style.transform = "rotateX(-180deg)";

    setTimeout(function() {
      oldTop.parentNode.removeChild(oldTop);
    }, 200);
    setTimeout(function() {
      oldBottom.parentNode.removeChild(oldBottom);
    }, 400);

  }

  let spanBottom = makeElement("span", `${time}B${unit}`, "bottom");
  spanBottom.style.transform = "rotateX(180deg)";
  spanBottom.innerHTML = time;
  target.insertBefore(spanBottom, target.childNodes[0]);
  setTimeout(function() {
    spanBottom.style.transform = "rotateX(0deg)";
  }, 10);
  setTimeout(function() {
    spanBottom.style.zIndex = "2";
    oldBottom.style.zIndex = "-1";
  }, 150);

  let spanTop = makeElement("span", `${time}T${unit}`, "top");
  spanTop.innerHTML = time;
  target.insertBefore(spanTop, target.childNodes[0]);

  return time;
}

let refreshInterval = setInterval(function() {

  let time = new Date();

  if (currentSeconds !== time.getSeconds().toString(10).padStart(2, 0)) {
    currentSeconds = changeTime(currentSeconds, time.getSeconds(), seconds, "sec");
  }

  if (currentMinutes !== time.getMinutes().toString(10).padStart(2, 0)) {
    currentMinutes = changeTime(currentMinutes, time.getMinutes(), minutes, "min");
  }

  if (currentHours !== time.getHours().toString(10).padStart(2, 0)) {
    currentHours = changeTime(currentHours, time.getHours(), hours, "hr");
  }

}, 10);
