console.log("start");

setTimeout(() => {
    process.nextTick(() => {
        console.log("tick");
    })
}, 1000);

setTimeout(() => {
    console.log("other");
}, 1000);
