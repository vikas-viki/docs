console.log("qwe");
setTimeout(() => {
    console.log("time")
}, 1000);
if(true == 1){
    throw new Error(";asdf");
}
console.log('23')

process.on("uncaughtException", (d) => {
    console.log("sdfsdf",d);
})