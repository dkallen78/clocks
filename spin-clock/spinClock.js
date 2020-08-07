function makeSpan(id) {
  //----------------------------------------------------//
  //Makes the span to put the current unit of time in   //
  //string-> id: the ID od the span element             //
  //----------------------------------------------------//

  let span = document.createElement("span");
  span.id = id;
  span.innerHTML = id[0] + id[1];
  span.classList.add("face");
  return span;
}

function removeSpan(oldSpan) {
  //----------------------------------------------------//
  //Does the work of transforming and removing the      //
  //  span element of the previous time unit            //
  //element-> oldSpan: the element of the old span      //
  //----------------------------------------------------//

  oldSpan.style.transform = "rotateX(-180deg)";
  setTimeout(function() {
    oldSpan.style.zIndex = "-1";
  }, 100);
  setTimeout(function() {
    oldSpan.parentNode.removeChild(oldSpan);
  }, 510);
}

function doTime(current, time, element, id) {
  //----------------------------------------------------//
  //All the stuff that needs to happen to add a new     //
  //  span for a new time                               //
  //string-> current: the previous time as either a     //
  //  second, minute, or hour                           //
  //integer-> time: the current second, minute, or      //
  //  hour returned by the Date object                  //
  //element-> element: the element to insert the new    //
  //  time into                                         //
  //string-> id: an affix for the span ID so it can     //
  //  be selected later                                 //
  //----------------------------------------------------//

  let span = makeSpan(time.toString(10).padStart(2, 0) + id);
  element.insertBefore(span, element.childNodes[0]);

  let oldSpan = document.getElementById(current + id);
  if (oldSpan) {
    removeSpan(oldSpan);
  }
  return time.toString(10).padStart(2, 0);
}

let seconds = document.getElementById("seconds");
let currentSeconds = 0;

let minutes = document.getElementById("minutes");
let currentMinutes = 0;

let hours = document.getElementById("hours");
let currentHours = 0;

let refreshInterval = setInterval(function() {

  let time = new Date();
  //
  //Controls the seconds dial
  if (currentSeconds !== time.getSeconds().toString(10).padStart(2, 0)) {
    currentSeconds = doTime(currentSeconds, time.getSeconds(), seconds, "sec");
  }
  //
  //Controls the minutes dial
  if (currentMinutes !== time.getMinutes().toString(10).padStart(2, 0)) {
    currentMinutes = doTime(currentMinutes, time.getMinutes(), minutes, "min");
  }
  //
  //Controls the hours dial
  if (currentHours !== time.getHours().toString(10).padStart(2, 0)) {
    currentHours = doTime(currentHours, time.getHours(), hours, "hr");
  }

}, 10);
