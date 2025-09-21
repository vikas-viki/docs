import { setTimeout } from "node:timers/promises";

console.log("before");

await setTimeout(2000);

console.log("after");