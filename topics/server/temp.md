it all started with curiosity.

first i wanted to go deep in nodejs

then i got to know about top level node event loop where 6 queues are maintained.
then i wanted to visualise to see how things would work.

then i went deep on demultiplexing architecture & libuv
how event loop works, how the phases work, how node v11 came out and made major changes.
then i reasiled you dont need a visualiser to tell the output of a code, if you know how truly nodejs does the job.

then got introduced to bluebird and q, which used to provide promise style execution before promises came into play (2015, v4) but even still, its weekly downloads is 31min, even with heavy lts support of promises (i believe its because of legacy projects built on top of it)

then you'll truly understand non blocking nature of nodejs(well libuv to be precise)

along the way you'll get to know some internals of libuv and some system level threading mechanisms, interrupts workings, dns workings & diffs and optimisations.

how nodejs will handle 1000s requests at the same time.

how you can improve the nodes performance by increasing the thread count libuv uses.
how can you optimise your nodejs applications (in what all ways)

in the end you learn, event loop is continuous execution of your asynchronous code in certain phases (in terms of nodejs) that communicates with nodejs backnforth after completion of each async operation.

Libuv is a cross-platform C library that provides Node.js (and other apps) with a consistent, asynchronous I/O interface across different operating systems.

then you can go into bridging and all, but now I stopped for another day.