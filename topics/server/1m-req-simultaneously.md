to day i had the opportunuity to dive deeper into nodejs architecture, 

it all started with just 1 question that i've been hearing, what actually happens when a million requests hit your nodejs process the same time ?

this is what happens ?

first of all, before any request reaches to any framework you use, kernel will have to handle the connection and there's a catch.

a kernel can handle only x number of simultaneous connection. this is from the fact that each process can have at max x number of file descriptors, a file descriptor is just a number that represents the no of i/o operation (which includes network activity too) happening at present.

you can see the limit by `ulimit -n`, my sys at perssent can handle `1048576` connections simultaneously per process. The number can be expanded or shrinked, but at the end of the day it comes to system capability like memory, cause each req consumes atleast some amount of memory and at some point requests might choke your system by filling your memory.

assuming you system has over 1mn fd limit, then as soon as kernel gets full request (header +  body) it notifies your nodejs handle (but again, its not direct, libuv is under the hood handling some stuff, but thats for some other day.) then you nodejs process the requests.

note:

as i mentioned, a process can handle only `ulimit -n` no of connections at the same time, but your normal http server might be able to handle even more than that, cause a http request is short livid connection, meaning once the req is filled by your server, the fildescriptor is released (fileDescptor-- for techy). so since http requests come and go, you can handle much more requests/sec, cause they are almost instanteouns, so technically your server can handle more than 1mn reqs.


but this hits hard when you're talking about web sockets, cause a websocket connection is not instantaneous, its long livid, the connection is kept alive as long as the client is connected, so filedescriptor is always kept consumed.

so what happens when no of connections reach, greater than `ulimit -n` ? its simple, the new connections are refused (ECONNREFUSED) and the request fails.

so how do you handle this, thats where devops comes in, either you horizontal/vertical scale your system. 

horizontal scale, you use load balancers to handle requests on multiple machines each having their own `ulimit -n`
vertical scale, you increase ulimit (if your system permits and you think you have enough amount of memory).


in short 
if your `ulimit -n` is 10000

and you make 10005 requests at the same time (imp: assuming, the requests are not served instantly)
the last 5 calls you made will fail.

where's practical experience you ask ? 
just decrease the ulimit to 100 (by `ulimit -n 100`) and run the nodejs script below (that makes 105 req the same time) 
imp:just be careful running commands, only do any system level changes if you know what it does and how can you undo it later on.

Note: you'll see that only around 71 suceed, why ? cause nodejs & the process itself has consumed some fds, you can check it yourself, just try to lower the ulimit below 20 or 30, it'll fail, cause it needs atleast certain x amount.

if you want to go deeper, you can read about how nodejs is so effecient that it only needs (by default) 4 threads to handle mns of requests on libuv/nodejs docs.

let me know your thoughts in the comments.