console.log("a");
setTimeout(()=>{
    console.log("1.event triggered...",Date.now());
},16000)
console.log("b");
setTimeout(()=>{
    for (let i=0; i < 10000000000; i++) {
        // here setInterval tick will not execute, event loop will not allow anything until this callback finishes
        // question: will there any thread be assigned here to perform this task?
        // Unless you explicitly offload work to a worker, the callback runs on the single JS thread and blocks the event loop while it runs.
    }
    console.log("2.event triggered...",Date.now());
},10000)
console.log("c");
console.log("d");
setTimeout(()=>{
    console.log("3.event triggered...",Date.now());
},25000)
console.log("e");
const timeInterval=setInterval(()=>{
    console.log("time now:",Date.now());
    },1000)

setTimeout(()=>{
    clearInterval(timeInterval);
},30000)