let swatchTime = document.getElementById("swatchTime");

let refreshInterval = setInterval(function() {


  let time = new Date();

  let msSeconds = (time.getUTCSeconds() * 1000) + time.getUTCMilliseconds();
  let msMinutes = (time.getUTCMinutes() * 60000) + msSeconds;
  let msTotal = ((time.getUTCHours() + 1) * 3600000) + msMinutes;

  let timeString = (msTotal / 86400).toPrecision(5);

  swatchTime.innerHTML = "@" + timeString;

}, 10);
