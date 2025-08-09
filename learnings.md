Date: 2 Aug 25

1. s3 is just like a flat dictionary, there's nothing like folders, they just have, key -> value mappings, like filepath -> filedata, so if you want to rename the folder (there's nothing like renaming), you have to delete all the key values that prefixed with that foldername and add new ones (or copy old ones, update names, add it and delete old ones)
2. when a button in browser is ussually click(in web projects, ex: react) it triggers a native brosebrower event. browser detects and sends it to js event loop. react doesnt attach the listeners to every button, it attaches a global document listener and whenver there's a click, it identifies the component->button responsible and call the event handler.
3. when an update happens(let's say via setState), react doesnt update dom right away, it queues the update and schedules a re render, it generates new virtual dom tree and compares(reconcilation) it with old one and replaces the changes. the browser paints the screen.
4. Brendan Eich wrote js(1995) in 10 days.
5. event - loop
   1. call-stack is a datastructure which defines, where in the program we are.
   2. it keeps stack of call or anything that happens, like
      1. a function call (add to stack)
      2. function ended, remove it from stack
   3. stack trace allows you to see things in the stack. and there's a limit on how much calls can be stored in call stack
   4. async callbacks are the ones that dont run immediately, we can't really await a function at top level(out side async function) hence there's no stop to the call stack
   5. we can get the current stack using `new Error().stack` or `console.trace()`
   6. so the things setTimeout(& relatives), document selectors, adding & removing listeners, fetch requests, worker threads are all given by browser so they dont run in event loop, so what happens is,
   let's say you do 
    `
        console.log("as");
        setTimeout(() => console.log("hello"), 2000);
        console.log("asdf");
    `
    here, 
        1. first console, comes to call stack, executes
        2. second setTimeout comes, since its a WebApi(browser api), it runs in seperate environment, hence exits from call stack
        3. then second console runs in call stack
        4. now let say setTimeout is completed, it pushes the callback to the `task queue`, which is then picked up by the `event loop` and put into the callstack(if call stack is empty) again and then we get the console log.
           1. note: event loops pushes things from `task queue` to stack only when stack is empty.
           2. so, the only work that event loop does is to get from `task queue`(bunch of other types in them) and put it to `stack`
        5. When V8(the one who primarily pushes the code to call stack) finishes executing what's on the call stack (e.g., a function or some synchronous code), control goes back to the event loop (so that it can push, if any)
        6. there are many variations inside `task queue` that have different behaviour on pushing to call stack (like micro and macro..)
           1. `
                ✅ Check: Is the call stack empty?

                If not, wait (don’t do anything yet).

                ✅ Run all microtasks (e.g. Promise.then)

                These are guaranteed to run before any macrotask.

                ✅ Pick 1 macrotask (e.g. setTimeout, fetch, event handler)

                Pull it off the macrotask queue.

                ✅ Push the callback onto the call stack

                V8 runs this function like any other.

                🔁 When the call stack is empty again, the event loop repeats this process.
            `
    7. event handlers are also handled by web apis, hence, onclick, the web api, pushes the code to be executed to `task queue` and then same process.
    8. setTimeout doesnt run the code after `x` seconds, but `x` defines the minimum time to wait until its execution, but its actual execution depends on `call-stack, task-queue and event loop`
    9. gem `https://www.youtube.com/watch?v=8aGhZQkoFbQ`
6. live your live, move on

Date: 3 Aug 25

1. Serverless function doesnt mean, it doesnt need a server to run, it meanse you dont have to create or manage the servers to run it.
2. lamda functions need basic logging permissions to get the logs of console.log into cloudwatch logs.
3. you need to publish a new version of the lambda function (other than just deploying it), for others to access it.
4. for a viewer-request or origin-request, we can either modify the request and return it, so it reaches the destination its meant to or we can return immediate responses
5. we must return a response object for viewer-response or origin-response.
6. wildcard *.abcd.com and abcd.com can both be managed by different dns providers.
7. dns resolver refers to the client sending the request to a particular domain(ex: google.com by me)
8. when a user make a req to a domain(ex: google.com) with the supported TLS versions and algorithms, the server sitting behiend looks after it and verifies if the request follows the security standards it needs, if yes, connection is establlished, if not, nope. These algorightms are used to encrypt the communication between client and server.

Date 4 Aug 25

1. Vercel doesn't use ECS tasks to deploy user projects from githubURL, they use firecracker(microvm) with ec2s to minimize the costs, so that they can do it in largescale.
   1. `🧠 What is a MicroVM?
      A MicroVM is like a tiny computer (VM) that:

      Boots in 100 milliseconds

      Can run Linux and Node.js

      Is secure and isolated (like a mini-VM)

      Is lightweight, so Vercel can run hundreds on one EC2 instance

      🔥 Firecracker is the microVM tech they use
      Created by AWS

      Powers AWS Lambda, Fargate, and Vercel builds

      Lets you run short-lived, safe environments at low cost`
   2. it has 96% less lines of code than QEMU(what used by virtual box to create vms)
   3. when you call a lambda function in aws, it spins up a microvm with required framework and all, then runs it.
      1. cold start, if you haven't called it in a while, it'll shutdown the microvm and hence the next time you call it, it'll have to spin up first(which takes time, hence cold start)
      2. warm start, if you've called lambda function recently, it'll have the microvm running(for certain time), hence it fullfills the requests right away.
      3. `You → call Lambda
                  ↓
         [Cold]  → Create microVM
                  → Load Node.js
                  → Run function
                  → Return response
                  → Wait... then shut down

         [Warm]  → Reuse microVM + Node.js
                  → Run function
                  → Done
         ` 
         refer `https://www.youtube.com/watch?v=BIRv2FnHJAg` for more
2. blob stands for Binary Large Object
3. if my frontend is on react(that doesn't need a continuos running service, just html, css), I don't need a ec2 instance to run it, just store it in s3, connect a domain and serve it over internet.

Date 5 Aug 25

1. Google cloud provides a speech to text api, that allows you to easily get the text out of an audio file (with confidence).
2. Google offers
   1. the Vision API's OCR method extracted text from an image, then the Translation API translated that text to English and the Natural Language API to found entities in that text. 
   2. gcloud is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

Date 6 Aug 25

1. Java code runs on JVM, which includes JIT compiler, what it does is,
   1. it optimises the code by converting the code to machine code, so people (in leetcode),
   2. make static calls to the function enough times, so that it gets optimised, which run when the class is created.
   3. ex: `
            static
            {
               for(int i=0; i<500; i++)
               {
                     isAnagram("","a");
               }
            }
         `
   4. now isAnagram() is very optimised and converted to machine code.

Date 8 Aug 25

1. System design (high level)
      1. First you create a top level architecture on whats happening on the system.
      2. then you define what protocols to use to achieve it.
      3. then you define the actions that can be performed in that system.
      4. then you create a usecase design.
      5. then you create classes
      6. then you define sequence diagram (to define sequence of actions).
   1. Vertical scaling
      1. using same resources to optimise the thoughput and performance (buying t3.micro instead of t2.micro)
   2. Horizontal scaling 
      1. using more resources to optimise the throughput and performace (you create multiple servers(t2), instead of buying t3.micro)
   3. Load balancer
      1. its the one who maps the user requests to the services based on current conditions (who's free, who have more requests incoming at present and more).
   4. De coupling
      1. seperating concerns (ex: for pizza store, delivery system and pizza store to be seperate).

2. Vertical scaling 
   1. buying bigger machine to optimise
3. Horizontal Scaling
   1. buying more machines(same size) to optimise
4. 