import {EventEmitter} from "events";

const footballNewsEmitter = new EventEmitter();

const map = new Map();


// create a listener
const footballFan = function (message) {
    console.log(`${message} : broadcasting started at: ${new Date()}`);
    const intv = setInterval((message) => {
        console.log(`${message} : enjoying live streaming at: ${new Date()}`);
    }, 2000);
    map.set("ESPN", intv);
};

// 📌 .on(event, listener) → subscribes a listener to an event.
// Consumer (listener - football fan) subscribes to a channel(ESPN)
footballNewsEmitter.on("ESPN", footballFan);

//📌 .emit(event, ...args) → triggers the event, runs all listeners in the order they were added.
// Producers emits the message
footballNewsEmitter.emit("ESPN", "Match: India vs Brazil");

//📌 .removeListener(event, listener) or .off() → stops listening.
setTimeout(() => {
    footballNewsEmitter.removeListener("ESPN", footballFan);
    clearInterval(map.get("ESPN"));
    console.log("livestreaming stopped");
}, 10000);

