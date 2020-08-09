let swatchTime = document.getElementById("swatchTime");

let refreshInterval = setInterval(function() {


  let time = new Date();

  let msSeconds = (time.getUTCSeconds() * 1000) + time.getUTCMilliseconds();
  let msMinutes = (time.getUTCMinutes() * 60000) + msSeconds;
  let msTotal = ((time.getUTCHours() + 1) * 3600000) + msMinutes;

  let rawBeats = msTotal / 86400;
  let beats = (Math.floor(rawBeats) % 1000).toString(10).padStart(3, 0);
  //let subBeats = ((rawBeats % 1) * 100).toPrecision(2).toString(10);
  //let subBeats = ((rawBeats % 1).toPrecision(2) * 100).toString(10).padStart(2, 0);

  //let subBeats = ((rawBeats * 100) % 100).toPrecision(2).toString(10).padStart(2, 0);
  let subBeats = Math.floor((rawBeats * 100) % 100).toString(10).padStart(2, 0);
  //console.clear();
  //console.log(testBeats);


  let timeString = beats + "." + subBeats;

  swatchTime.innerHTML = "@" + timeString;

}, 10);
