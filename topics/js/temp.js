var a = 1;
function callb() {
    console.log("nextTick");
    if (a++ >= 10) return;
    process.nextTick(() => {
        callb();
    })

}

abcd();

process.nextTick(callb);

function abcd() {
    console.log("this is an abcd call!");
}



async function cdsa() {
    console.log("this is async func");
    Promise.resolve().then(() => {
        console.log("this is inside promise!");
    })
}

cdsa();