function insertSpan(element, id, time, className = "secondsFace") {
  let span = document.createElement("span");
  span.id = id;
  span.classList.add(className);
  span.innerHTML = time;
  element.appendChild(span);
  return span;
}

function newSpan(element, id, time) {
  let span = document.createElement("span");
  span.id = id;
  span.classList.add("secondsFace");
  span.innerHTML = time;
  span.style.transform = "rotateY(-70deg)";
  span.style.filter = "opacity(0%)";
  element.insertBefore(span, element.childNodes[0]);
  return span;
}

function newMinSpan(element, id, className, time) {
  let span = document.createElement("span");
  span.id = id;
  span.classList.add(className);
  span.innerHTML = time;
  element.insertBefore(span, element.childNodes[1]);
  return span;
}

function newHrSpan(element, id, className, time) {
  let span = document.createElement("span");
  span.id = id;
  span.classList.add(className);
  span.innerHTML = time;
  element.insertBefore(span, element.childNodes[0]);
  return span;
}

let seconds = document.getElementById("seconds");
let time = new Date();
let now = time.getSeconds();
let maxRotation = 45;

let secondsPlus2 = ((now + 2) % 60).toString(10).padStart(2, 0);
let plus2 = insertSpan(seconds, "plus2", secondsPlus2);
plus2.style.transform = `rotateY(-${maxRotation}deg)`;
plus2.style.filter = "opacity(25%)";

let secondsPlus1 = ((now + 1) % 60).toString(10).padStart(2, 0);
let plus1 = insertSpan(seconds, "plus1", secondsPlus1);
plus1.style.transform = `rotateY(-${maxRotation / 2}deg)`;
plus1.style.filter = "opacity(50%)";

let currentSeconds = now.toString(10).padStart(2, 0);
let actual = insertSpan(seconds, "actual", currentSeconds);

let secondsLess1 = (((now + 60) - 1) % 60).toString(10).padStart(2, 0);
let less1 = insertSpan(seconds, "less1", secondsLess1);
less1.style.transform = `rotateY(${maxRotation / 2}deg)`;
less1.style.filter = "opacity(50%)";

let secondsLess2 = (((now + 60) - 2) % 60).toString(10).padStart(2, 0);
let less2 = insertSpan(seconds, "less2", secondsLess2);
less2.style.transform = `rotateY(${maxRotation}deg)`;
less2.style.filter = "opacity(25%)";

let hoursMinutes = document.getElementById("hoursMinutes");

let hours = time.getHours().toString(10).padStart(2, 0);
let hoursNow = insertSpan(hoursMinutes, "hours", hours, "hours");

let minutes = time.getMinutes().toString(10).padStart(2, 0);
let minutesNow = insertSpan(hoursMinutes, "minutes", minutes, "minutes");

let refreshInterval = setInterval(function() {

  time = new Date();

  if (hours !== time.getHours().toString(10).padStart(2, 0)) {

    let actualHour = time.getHours().toString(10).padStart(2, 0);
    let newHour = newHrSpan(hoursMinutes, "", "hours", actualHour);

    setTimeout(function() {
      hoursNow.style.transform = "translate(0, 15rem) rotateY(-35deg)";
      hoursNow.style.filter = "opacity(0%)";
    }, 100);

    setTimeout(function() {
      let oldHour = hoursNow;
      hoursNow = newHour;
      oldHour.parentNode.removeChild(oldHour);
    }, 1010);
    hours = actualHour;
  }

  if (minutes !== time.getMinutes().toString(10).padStart(2, 0)) {

    let actualMinute = time.getMinutes().toString(10).padStart(2, 0);
    let newMinute = newMinSpan(hoursMinutes, "newMinute", "minutes", actualMinute);

    setTimeout(function() {
      minutesNow.style.transform = "translate(0, 15rem) rotateY(35deg)";
      minutesNow.style.filter = "opacity(0%)";
    }, 100);

    setTimeout(function() {
      let oldMinute = minutesNow;
      minutesNow = newMinute;
      oldMinute.parentNode.removeChild(oldMinute);
    }, 1010);
    minutes = actualMinute;
  }

  if (currentSeconds !== time.getSeconds().toString(10).padStart(2, 0)) {

    now = time.getSeconds();
    secondsPlus2 = ((now + 2) % 60).toString(10).padStart(2, 0);

    let newSecond = newSpan(seconds, "plus2", secondsPlus2);

    less2.style.transform = "rotateY(70deg)";
    less2.style.filter = "opacity(0%)";
    let trashSecond = less2;

    less1.style.transform = `rotateY(${maxRotation}deg)`;
    less1.style.filter = "opacity(25%)";
    less1.id = "less2";
    less2 = less1;

    actual.style.transform = `rotateY(${maxRotation / 2}deg)`;
    actual.style.filter = "opacity(50%)";
    actual.id = "less1";
    less1 = actual;

    plus1.style.transform = `rotateY(0deg)`;
    plus1.style.filter = "opacity(100%)";
    plus1.id = "actual";
    actual = plus1;

    plus2.style.transform = `rotateY(-${maxRotation / 2}deg)`;
    plus2.style.filter = "opacity(50%)";
    plus2.id = "plus1";
    plus1 = plus2;

    setTimeout(function() {
      newSecond.style.transform = `rotateY(-${maxRotation}deg)`;
      newSecond.style.filter = "opacity(25%)";
    }, 15);
    plus2 = newSecond;

    setTimeout(function() {
      trashSecond.parentNode.removeChild(trashSecond);
    }, 510);

    currentSeconds = time.getSeconds().toString(10).padStart(2, 0);
    //clearInterval(refreshInterval);
  }

}, 10);
