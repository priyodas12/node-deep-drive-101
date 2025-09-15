import {EventEmitter} from "events";
import {v4 as uuidv4} from "uuid";

//It’s a broadcast — every subscribed listener gets the event.
//EventEmitter = Pub/Sub → all listeners on an event get notified.
//It’s like a radio broadcast: one message, many listeners tuned to the same frequency.
//It’s not a message queue where only one consumer gets the message.
// visit: https://nodejs.org/docs/latest/api/events.html


const emitter = new EventEmitter();

emitter.on("event-a", () => {
    console.log("listener-1: consuming...", Date.now());
});

emitter.on("event-b", () => {
    console.log("listener-2: consuming...", Date.now());

});

emitter.on("event-c", (a, b) => {
    console.log("listener-3: consuming...", a, b);
    console.log(a, b, this, this === emitter);
});

// async way
emitter.on("event-cb", (x, y) => {
    console.log(x, y);
    setTimeout((a, b) => {
        console.log("listener-4: consuming...", Date.now(), a, b);
    }, 2000, x, y);
});
emitter.emit("event-a");
emitter.emit("event-b");
emitter.emit("event-c", uuidv4(), uuidv4());
emitter.emit("event-cb", uuidv4(), uuidv4());

//consumes only once
let m = 0;
emitter.once("event-d", () => {
    console.log(++m);
});

emitter.emit("event-d",); // valid
emitter.emit("event-d",); // ignored


//error events
const emitter2 = new EventEmitter();
emitter2.on("error", (err) => {
    console.error("whoops! there was an error");
});
emitter2.emit("error", new Error("whoops!"));
