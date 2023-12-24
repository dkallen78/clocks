# Senary Clocks

## [Canvas Senary Clock!](https://dkallen78.github.io/clocks/senary-clock/senary-clock-canvas/senaryClock.html)

## [SVG Senary Clock!](https://dkallen78.github.io/clocks/senary-clock/senary-clock-svg/senaryClockSVG.html)

## [SVG Senary Clock but with a sundial instead of hands](https://dkallen78.github.io/clocks/senary-clock/senary-clock-svg-sundial/sundialClock.html)

These are the clocks no one asked for!

### What is Senary?

Senary is a base-6 number system, also known as heximal or seximal. 

### Why Senary?

Because clocks run on the numbers 60, 24, and 12, and 6 is a factor of all of those. I thought I'd make a 24-hour clock that used the base-6 number system. It was also a really good excuse to make a clock program!

### How to Read Senary Numbers?

The numbers we're used to are in base-10, that is, every digit of our number has nine possible numbers: 0 - 9. The position of the digits determines its value. In a base-10 (decimal) system the furthest right digit is multiplied by 10⁰ to determine its value. The digit to the left of that is multiplied by 10¹, the next by 10² and so on. So the number (**234**)₁₀ is equal to (**2** × 10²) + (**3** × 10¹) + (**4** × 10⁰) → (**2** × 100) + (**3** × 10) + (**4** × 1) → 200 + 30 + 4 → (234)₁₀. 

In a senary system there are only 6 possible digits for our place values: 0 - 5. In this system the far right digit is multiplied by 6⁰ to determine its value. The next digits are determined by multiplying them by 6¹, 6², and so on. So to determine the value of the senary number 234 we apply the same process as we did with the decimal numbers, only now multiplying by powers of 6. (**234**)₆ is equal to (**2** × 6²) + (**3** × 6¹) + (**4** × 6⁰) → (**2** × 36) + (**3** × 6) + (**4** × 1) → 72 + 18 + 4 → (94)₁₀.  

### Why is it smoother than butter?

I'm glad you asked. It's thanks to the magic of refreshing the position of the hands 100 times a second. I calculate the position of the hands down to the 10 millionth of a pixel just for funsies! 

### Canvas vs SVG, two different approaches to movement

The first verson I made was with Canvas. With the canvas clock I redrew the hands every 10 milliseconds, calculating their angle using radians and sine/cosine. It was a pain in the ass to figure out the math but I lifted most of it out of a previous project I had done. The tricky part was dealing with the fact that canvas draws its circles clockwise from the far right point - the 3 o'clock position, not the 12 o'clock position so all my radian values had to be offset 1.5 radians. 

With the SVG version I only "drew" the hands one time and would rotate them via the CSS transform property. So instead of dealing with radians, with SVG I manipulate the hands via degrees. The big bennefit to doing things with SVG was it allowed me to be more responsive with the clock. Maybe I could have done that with Canvas, but I'm not sure... SVG also lets me do rounded corners. What I didn't like from SVG was how incompatible the text elements were with vh and vw units.

### Math!

Calculating the movement based on sine and cosine the first time was a bit of a pain for me. In school I didn't learn radians so it was very new and confusing but basically the cosine of an angle will tell you where on the coordinate plane the x value for that point on the circle is. Sine will tell you where the y value is.

`origin + distanceFromOrigin · cos(θ · π) = x`

or in JavaScript:

`x = (origin + (distance * Math.cos(radians * Math.PI)))`

To determine the proper angle in radians for the hands I needed to know the number of milliseconds it took for that hand to make a complete rotation around the face of the clock. In the case of the second hand I knew that it took 60 seconds to go around so that was 60 seconds · 1,000 ms → 60,000 ms per minute. From there we divide the 2 radians in a circle into 60,000 parts to get 0.000033 radians per ms.

To rotate the element a set number of degrees is a bit easier. To begin with, no complex x and y coordinates need to be calculated, only the initial values. To determine the number of degrees to rotate the second hand, I had to break up the 360° into 60,000 parts to determine how much to rotate it each millisecond: 0.006°

### Animation!

I didn't actually refresh my clock every millisecond, that's silly. I did it every 10 milliseconds. The JavaScript date object is pretty good at giving you time information. To make sure the second hand was in the right place after every refresh I had to determine exactly which of the 60 seconds it was and which of the 1,000 milliseconds it was. Combining these two pieces of information I could calculate which of the 60,000 milliseconds of the current minute it was and draw or rotate the second hand accordingly.

## Updates

### 2020.07.26 (SVG)

I have fixed the shadows and put gradients on stuff! I've also played with the colors and centered the clock in the browser. I still feel like it needs some features but I don't want to sully the clean design of it. We'll see... I can't think of anything else to do with it right now but I like looking at it.

#### more...

I'm done for the morning (it's 03:36, or 03:100) and I think I can sleep. I put some comments in the code so I can figure out what I did tomorrow.

### 2020.07.25 (SVG)

I taught myself SVG! At least a bit of it. Canvas was fun and it was something I knew but SVG felt like it had more room to grow. 

The thing that bothers me the most right now are the shadows on the hands. The problem is they rotate along with the hands and they should always fall in the same direction relative to the clock, not relative to the rotation of the hand. The issue is that instead of drawing the hands like I did in Canvas with sine and cosine derived coordinates, I'm now rotating the SVG element. The solution is going to be drawing the hands twice and offsetting the second set down and to the right, then applying a blur. 

But first I'm going to try to get gradients...

### 2020.07.23 (Canvas)

I made the thing! Then I made it a bit better by making it glow and giving it some flicker. I don't know what's next. Someone said an alarm...

So I think I'm going to try and do it in SVG, it's more interactive and I don't know how to use it.



.
.
.
.
.
.
.
.


**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```
