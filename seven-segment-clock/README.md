# [Seven-Segment Display Clock](https://dkallen78.github.io/clocks/seven-segment-clock/seven-segment-clock.html)

It's a clock with a seven-segment display!

Each digit and the colon separators are individual `<svg>` elements. Each of those elements is made up of either `<path>` elements in the case of the SSD, or `<circle>` elements in the case of the colons. 

To ensure the `<svg>` elements take up the full width of the screen, their size is defined in relative units in the CSS file. That means that the `<path>` and `<circle>` elements have to be positioned as percentages of the width and height of the parent `<svg>` element since the actual height and width can never be known for certain ahead of time. 

The clock runs as you'd expect (`setInterval`) and to set the digits I first take the integer time returned by `.getHours/Minutes/Seconds()` and convert it into a two-character string. Each of those characters is used as the index to an array that has a string list of the individual segments to be turned on. I iterate over the `<path>` elements in my target `<svg>` turning on and off segments as needed.