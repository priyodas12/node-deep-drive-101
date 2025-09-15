console.log("Node version:", process.version);

process.nextTick(() => console.log("nextTick runs"));
Promise.resolve().then(() => console.log("promise runs"));