
let shownSeconds = 0;
let shownMinutes = 0
let shownHours = 0;

let zero = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 1, 1]
];

let one = [
  [1, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
  [1, 1, 1]
];

let two = [
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1]
];

let three = [
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1]
];

let four = [
  [1, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 1]
];

let five = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1]
];

let six = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];

let seven = [
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1]
];

let eight = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];

let nine = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 1]
];

const digit = {
  //----------------------------------------------------//
  //                                                    //
  //----------------------------------------------------//

  "0": zero,
  "1": one,
  "2": two,
  "3": three,
  "4": four,
  "5": five,
  "6": six,
  "7": seven,
  "8": eight,
  "9": nine
}

function makeDigit(target, digit) {

  let pixels = document.querySelectorAll("#" + target.id + " > div");
  if (pixels) {
    for (let i = 0; i < pixels.length; i++) {
      pixels[i].style.width = "0rem";
      pixels[i].style.height = "0rem";
    }
  }

  setTimeout(function() {
    target.innerHTML = "";
    for (let i = 0; i < digit.length; i++) {
      for (let j = 0; j < digit[0].length; j++) {

        if (digit[i][j]) {
          let div = document.createElement("div");
          div.style.gridRow = `${i + 1} / ${i + 2}`;
          div.style.gridColumn = `${j + 1} / ${j + 2}`;
          target.appendChild(div);
        }

      }
    }
  }, 760);

}

let hour1 = document.getElementById("hour1");
let hour2 = document.getElementById("hour2");
let minute1 = document.getElementById("minute1");
let minute2 = document.getElementById("minute2");
let second1 = document.getElementById("second1");
let second2 = document.getElementById("second2");


let hourNow, minuteNow, secondNow, time;

makeDigit(hour1, nine);
let refreshInterval = setInterval(function() {

  time = new Date();
  hourNow = time.getHours().toString(10).padStart(2, 0);
  minuteNow = time.getMinutes().toString(10).padStart(2, 0);
  secondNow = time.getSeconds().toString(10).padStart(2, 0);

  if (shownHours !== hourNow) {

    makeDigit(hour1, digit[hourNow[0]]);
    makeDigit(hour2, digit[hourNow[1]]);

    shownHours = hourNow;
  }

  if (shownMinutes !== minuteNow) {

    makeDigit(minute1, digit[minuteNow[0]]);
    makeDigit(minute2, digit[minuteNow[1]]);

    shownMinutes = minuteNow;
  }

  if (shownSeconds !== secondNow) {

    makeDigit(second1, digit[secondNow[0]]);
    makeDigit(second2, digit[secondNow[1]]);

    shownSeconds = secondNow;
  }

}, 10);
