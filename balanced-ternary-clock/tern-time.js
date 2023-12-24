function findHighestPower(number, base) {

  for (var power = 0; number >= base ** power; power++) {
  }

  return power - 1;
}

function toTernary(number) {

  number = parseInt(number, 10);

  let power = findHighestPower(number, 3);
  let output = "";

  for (let i = power; i >= 0; i--) {

    let digit = Math.floor(number / (3 ** i)).toString(10);
    output += digit;

    number = number % (3 ** i);
  }

  return output;
}

function toBalancedTernary(number) {
  let unbal = [0];
  for (let i = 0; i < number.length; i++) {
    unbal.push(parseInt(number[i], 10));
  }

  let start = unbal.findLastIndex((x) => x > 0);

  //adding 1s
  let carry = false;
  for (let i = start; i >= 0; i--) {

    if (carry) {
      unbal[i]++;
      carry = false;
    }

    if (i > 0) {
      switch(unbal[i]) {
        case 0:
          unbal[i] = 1;
          break;
        case 1:
          unbal[i] = 2;
          break;
        case 2:
          unbal[i] = 0;
          carry = true;
          break;
        case 3:
          unbal[i] = 1;
          carry = true;
          break;
      }
    }
    
  }

  //taking away 1s
  for (let i = start; i >= 1; i--) {

    switch(unbal[i]) {
      case 0:
        unbal[i] = neg;
        break;
      case 1:
        unbal[i] = zero;
        break;
      case 2:
        unbal[i] = pos;
        break;
    }
  }

  if (unbal[0] === 1) {
    unbal[0] = pos;
  }

  let output = "";
  unbal.forEach((x) => output += x);
  
  return output;
}

//let neg = "⥝";
let neg = "T";
//let pos = "⥠";
let pos = "1";
let zero = "0";


let dial = document.getElementById("dial");

let timeInterval = setInterval(function() {

  let time = new Date();
  //console.log("running...");

  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  hours = toTernary(hours);
  minutes = toTernary(minutes);
  seconds = toTernary(seconds);

  hours = toBalancedTernary(hours).padStart(4, 0);
  minutes = toBalancedTernary(minutes).padStart(5, 0);
  seconds = toBalancedTernary(seconds).padStart(5, 0);

  dial.innerHTML = `${hours}:${minutes}:${seconds}`;
  
}, 10);