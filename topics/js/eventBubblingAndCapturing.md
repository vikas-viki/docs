# Event bubbling, capturing, trickling.

assume we have

div#grandparent
    div#parent
        div#child

Event Bubbling:
    when there's a click event on #child, it bubbles to all its parents, till the end of dom, meaning, #parent and #grandparent are also notified.

Event capturing (trickling): 
    when there's a click event on the #grandparent, #parent and #child will also get notified

in addEventListener, we can pass a 3rd argument to specify, to bubble or trickle

ex: 
btn.addEventListener("click", () => {...}, useCapture)

value of useCapture can be true/false, if true, it capture, else bubble.
by default only bubbling(false) happens.

inline handlers are always "bubbling", unless controlled via addEventListener