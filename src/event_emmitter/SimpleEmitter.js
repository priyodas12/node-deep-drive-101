import {EventEmitter} from "events";

//It’s a broadcast — every subscribed listener gets the event.
//EventEmitter = Pub/Sub → all listeners on an event get notified.
//It’s like a radio broadcast: one message, many listeners tuned to the same frequency.
//It’s not a message queue where only one consumer gets the message.


const emitter = new EventEmitter();

emitter.on("channel a", () => {
    console.log("consuming...", "genric-a", Date.now());
});

emitter.on("channel a", () => {
    console.log("consuming...", "generic-b", Date.now());
});

emitter.on("channel a", (msg) => {
    console.log("consuming...", msg);
});

emitter.emit("channel a");
emitter.emit("channel a", "something");