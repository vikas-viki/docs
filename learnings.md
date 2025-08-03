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

{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::edgenest-output/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::979188187252:distribution/E2FJ3WVV5KX73N"
                }
            }
        },
        {
            "Sid": "AllowServerAccess",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::979188187252:user/edgenest-user"
            },
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::edgenest-output/*"
        }
    ]
}