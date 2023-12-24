# [Digital Ternary Clock v0.1](https://dkallen78.github.io/clocks/balanced-ternary-clock/tern-time.html)

A clock that displays the current time in a balanced base-3 numeral system.

To start, I take the normal hours, minutes, and seconds, and convert them to their base-3 counterpart (0, 1, 2). This involves division and modulus with powers of 3 and isn't too hard. Then I take that output and run it through a basic ternary-to-balanced-ternary conversion algorithm to get the final numbers I plug into my clock. 

I opted to use the digits T, 0, and 1 because they enjoy the widest use as far as I can tell, (I also think they're the 1 and T are easier to distinguish from one another than other proposed symbols) but the code is pretty easy to tweak to use other symbols in their place.

I want to make it look nicer but I haven't settled on a nice way to style it that takes advantage of its unique number base.