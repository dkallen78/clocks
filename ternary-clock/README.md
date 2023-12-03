# [Ternary Clock](https://dkallen78.github.io/clocks/ternary-clock/v0.1/ternary-clock-v0.1.html)

This clock was inspired by a conversation I had with someone on Reddit.

The basic idea is a a clock built around base 3 so the fundamental division of the day is into three parts. In my code I call these parts "terns" but if someone has something better, I'll use that instead. Each tern is divided into 9 hours; each hour into 27 minutes, and each minute into 81 seconds. This makes the hour<sub>3</sub> 89% the length of the hour<sub>60</sub>, the minute<sub>3</sub> 97% longer than the minute<sub>60</sub>, and the  second<sub>3</sub> 46% longer than the  second<sub>60</sub>.

The hardest part was wrapping my head around drawing part of a circle with the `<path>` element of SVG and ironing out those kinks. I've made enough clocks that the trigonometry of distributing points on a circle came back to me pretty quickly. The tricky part was finding a way to ensure that all of the gaps between the cells would be the same. The solution to that was in calculating the angle of the gap between each concentric cell based on the  distance I wanted between them. Basically I needed to double the arcsine of half the gap divided by the radius to the arc. 

`2 * Math.asin((gap / 2) / radius)`

# [Ternary Clock 2](https://dkallen78.github.io/clocks/ternary-clock/ternary-clock-flip.html)

After tweaking the original clock I decided that I wanted to have the cells appear and disappear by flipping over. Rotating stuff is easy and I've done it with other clocks, but these rotations had to be around a unique vector for each cell. I basically find the center of the cell, then calculate its vector towards the center of the SVG and then rotate.

`rotate3d(vectorX, vectorY, 0, 89deg)`

There's some wonky behavior that starts happening if I rotate to 180 or 90 degrees that I don't fully understand but I've got clean animations right now, so I'm not going to stress it much.

That's a lie. I think part of the problem is my method of finding the center is not precise and I need to make it more accurate. I'm basically just finding the center of the box that bounds the `<path>` element which *mostly* works. What I think I need to do, is store precise information on all of the cells that I can use when I need to change them.

## 1AM update

I fixed the wonky center/vector issue. Since I was using the bounding box to find the center, and that center to find the vector to rotate, it was throwing some of the animations off when I was doing 90 and 180 degree rotations. Now I'm directly interrogating the `d` attribute of the `<path>` element to get the coordinates for the cell. From there I can just find the midpoints between opposite corners and find a vector from the outer midpoint to the inner midpoint. And for my new and improved transform-origin I'm using the center of the two midpoints which still isn't perfect, but it's much better.

I'll clean up my code and comments tomorrow.