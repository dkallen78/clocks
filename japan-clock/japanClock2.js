let text = document.getElementById("time");

console.log(time)

let timeInterval = setInterval(function() {

  let time = new Date();

  let timeString = "";

  let japanHour = ((time.getUTCHours() + 9) + 24) % 24;
  let hoursNow = japanHour.toString(10).padStart(2, 0);
  timeString += hoursNow + "時";

  let minutesNow = time.getMinutes().toString(10).padStart(2, 0);
  timeString += minutesNow + "分";

  let secondsNow = time.getSeconds().toString(10).padStart(2, 0);
  timeString += secondsNow + "秒";

  text.innerHTML = timeString;
}, 10);
