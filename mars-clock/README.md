# [Martian Clock](https://dkallen78.github.io/martian-clock/martianClockSVG.html)

## Wait, What?

It's possible to calculate the time on Mars using the JavaScript Date object, but there's some ugly math involved.

[Time on Mars](https://en.wikipedia.org/wiki/Timekeeping_on_Mars) is reckoned in Coordinated Mars Time (MTC). Time on our computer is reckoned in [Unix Time](https://en.wikipedia.org/wiki/Unix_time) (milliseconds since 00:00 Jan 1, 1970). By converting the Unix Time of the JavaScript Date object a few times, we can get to MTC, and from there, determine the hour (1/24<sup>th</sup>), minute (1/1440<sup>th</sup>), second (1/86,400<sup>th</sup>), and millisecond (1/86,400,000<sup>th</sup>) of the day.

### Unix Time to Julian Date<sub>UTC</sub>

While the world has moved on from the [Julian Calendar](https://en.wikipedia.org/wiki/Julian_calendar) to the [Gregorian Calendar](https://en.wikipedia.org/wiki/Gregorian_calendar), science still keeps a raw reckoning of days in the form of the [Julian Day](https://en.wikipedia.org/wiki/Julian_day) Number (JDN). This count of days is used by astronomers and programmers to easily determine the number of days between things. Day 0 began at noon, January 1<sup>st</sup>, 4713 BC in the Julian Calendar (November 24<sup>th</sup>, 4714 BC in the Gregorian Calendar). It was a Monday. The Julian Date (JD) is the number of days since that fateful Monday.

To convert between Unix Time and JD we need 𝕄𝕒𝕥𝕙® First we need to convert our milliseconds since Jan 1, 1970 to days so we divide it by the number of milliseconds in a day: 86,400,000 

`unixTime / 86400000`

Then we add the difference between 12:00 Jan 1, 4713 BC (0) and 00:00 Jan 1, 1970 (2,440,587.5). So, given Unix Time, the JD can be expressed as

`JDutc = (unixTime / 86400000) + 2440587.5`

### JD<sub>UTC</sub> to JD<sub>TT</sub>

What we just calculated was the Julian Date relative to [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) (UTC) but what we need to determine MTC is the Julian Date relative to [Terrestrial Time](https://en.wikipedia.org/wiki/Terrestrial_Time) (TT). TT is the time standard used by the [International Astronomical Union](https://www.iau.org/) (IAU). It is an idealized time that clocks can only approximate. 

UTC is based on [International Atomic Time](https://en.wikipedia.org/wiki/International_Atomic_Time) (TAI). Currently, TAI is based on the average of over 400 atomic clocks around the world, but it wasn't always so. In the 70s it was discovered that the clocks were running at different rates due to the minute time dilations caused by their varying proximity to the gravitational center of the Earth. When TT was established there was a 32.134 second difference between TT and TAI.

We also have to account for the [Leap Seconds](https://en.wikipedia.org/wiki/Leap_second) which have been added over the years. Currently there are 37. Unfortunately JD is expressed in days and hours, minutes, and seconds are expressed as a decimal fraction of that day, so we need to convert these seconds into fractions of a day which we can do by dividing the total seconds by the total number of seconds in a day

`JDtt = JDutc + ((32.134 + 37) / 86400)`

### JD<sub>TT</sub> to Coordinated Mars Time

We're almost there! Next we need a starting date for the Martian epoch. Michael Allison from [NASA](https://www.nasa.gov/) and Megan McEwen from [Columbia University](https://www.columbia.edu/) [proposed](https://pubs.giss.nasa.gov/docs/2000/2000_Allison_al05000n.pdf) 12:00 December 29<sup>th</sup>, 1873 due to the near coincidence of solar midnight on both Earth and Mars on that date. This is the date NASA uses. 

We need to determine the difference between the current JD<sub>TT</sub> and the JD<sub>TT</sub> time for 12:00 December 29<sup>th</sup>, 1873 (2405522.0028779). Then we need to compensate for the greater length of the Martian day (that means there have been fewer of them), we have to divide by the ratio between the length of Terran days to the length of Martian days (1:1.0274912517).

Using 𝕄𝕒𝕥𝕙® to crunch those numbers we get

`MTC = (JDtt - 2405522.0028779) / 1.0274912517`

### What about Hours, Minutes, and Seconds?

I'm glad you asked. To find the fractional units of a day we need to isolate the decimal portion of our MTC date (which is a modified JD). To do that we just need to find the remainder of our date divided by 1

`fraction = MTC % 1`

With this decimal fraction we can determine the hour, minute, second, and millisecond. To find the current hour on Mars we multiply our fraction by the number of hours in a day, keeping just the whole number part

`hours = Math.floor(fraction * 24)`

To find minutes we multiply the fraction by the number of minutes in a day modulo 60 (to find the minutes in the current hour). Again, keep only the whole number part

`minutes = Math.floor(fraction * 1440) % 60`

We repeat the process for seconds and milliseconds

`seconds = Math.floor(fraction * 86400) % 60`

`milliseconds = Math.floor(fraction * 86400000) % 1000`
