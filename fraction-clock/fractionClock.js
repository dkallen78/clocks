let shownHours, shownMinutes;

let refreshInterval = setInterval(function() {

  let time = new Date();

  if (shownHours !== time.getHours()) {
    let hours = document.getElementById("hours");
    hours.innerHTML = time.getHours().toString(10).padStart(2, 0);
    shownHours = time.getHours();
  }

  if (shownMinutes !== time.getMinutes()) {
    let minutes = document.getElementById("minutes");
    minutes.innerHTML = time.getMinutes().toString(10).padStart(2, 0);
    shownMinutes = time.getMinutes();
  }

  let seconds = document.getElementById("seconds");
  seconds.innerHTML = time.getSeconds().toString(10).padStart(2, 0);

  let ms = document.getElementById("ms");
  ms.innerHTML = time.getMilliseconds().toString(10).padStart(3, 0);

}, 10);
