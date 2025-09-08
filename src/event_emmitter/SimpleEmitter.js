import {EventEmitter} from "events";
import {v4 as uuidv4} from "uuid";

//It’s a broadcast — every subscribed listener gets the event.
//EventEmitter = Pub/Sub → all listeners on an event get notified.
//It’s like a radio broadcast: one message, many listeners tuned to the same frequency.
//It’s not a message queue where only one consumer gets the message.


const emitter = new EventEmitter();

emitter.on("event-a", () => {
    console.log("listener-1: consuming...", Date.now());
});

emitter.on("event-b", () => {
    console.log("listener-2: consuming...", Date.now());
});

emitter.on("event-c", (msg) => {
    console.log("listener-3: consuming...", msg);
});

emitter.emit("event-a");
emitter.emit("event-b");
emitter.emit("event-c", uuidv4());