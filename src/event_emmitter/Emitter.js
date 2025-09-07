import {EventEmitter} from "events";

const footballNewsEmitter = new EventEmitter();

// create a listener
const footballFan = function (message) {
    console.log(`${message} : broadcasting started at: ${new Date()}`);
    setInterval(() => {
        console.log(`${message} : enjoying live streaming at: ${new Date()}`);
    }, 2000);
};

// 📌 .on(event, listener) → subscribes a listener to an event.
// Consumer (listener - football fan) subscribes to a channel(ESPN)
footballNewsEmitter.on("ESPN", footballFan);

//📌 .emit(event, ...args) → triggers the event, runs all listeners in the order they were added.
// Producers emits the message
footballNewsEmitter.emit("ESPN", "Match: India vs Brazil");

//📌 .removeListener(event, listener) or .off() → stops listening.
footballNewsEmitter.removeListener("ESPN", footballFan);
