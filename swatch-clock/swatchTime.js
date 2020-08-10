let faces = document.getElementsByClassName("face");

//
//Refresh the time at 100Hz
let refreshInterval = setInterval(function() {

  let time = new Date();

  //
  //Calculates the total milliseconds that have elapsed since
  //midnight in Switzerland
  let msSeconds = (time.getUTCSeconds() * 1000) + time.getUTCMilliseconds();
  let msMinutes = (time.getUTCMinutes() * 60000) + msSeconds;
  let msTotal = ((time.getUTCHours() + 1) * 3600000) + msMinutes;

  let rawBeats = msTotal / 86400;
  let beats = (Math.floor(rawBeats) % 1000).toString(10).padStart(3, 0);
  let subBeats = Math.floor((rawBeats * 100) % 100).toString(10).padStart(2, 0);
  let timeString = "@" + beats + "." + subBeats;

  //
  //"Writes" the individual letters of the time into
  //separate spans
  for (let i = 0; i < faces.length; i++) {
    faces[i].innerHTML = timeString[i];
  }

}, 10);
