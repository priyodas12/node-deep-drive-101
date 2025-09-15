// event-loop-interval.js
import fs from "fs";

console.log("1. [START] Synchronous code begins");

/**
 * ======================
 * TIMERS PHASE : macrotask queue
 * ======================
 * - Executes callbacks scheduled by setTimeout() and setInterval().
 * - setTimeout(fn, 0) means "run fn after at least 1ms",
 *   but realistically it runs in the *next* timers phase.
 * - setInterval repeats in every timers phase until cleared.
 */

setTimeout(() => {
    console.log("2. [ TIMERS PHASE ] setTimeout callback");

    process.nextTick(() => {
        console.log("2. [ MICROTASK inside TIMERS ] process.nextTick");
    });

    Promise.resolve().then(() => {
        console.log("2. [ MICROTASK inside TIMERS ] Promise.then");
    });
}, 0);

// Repeating timer
let counter = 0;
const intervalId = setInterval(() => {
    console.log(`3. [TIMERS PHASE] setInterval callback #${++counter}`);

    if (counter === 3) {
        console.log("3. [CLEAR] Clearing interval after 3 runs");
        clearInterval(intervalId);
    }
}, 500);

/**
 * ======================
 * CHECK PHASE
 * ======================
 * - Executes callbacks scheduled by setImmediate().
 * - The Check phase always comes immediately after the Poll phase.
 * - Useful for running code right after I/O without waiting for timers.
 */

setImmediate(() => {
    console.log("4. [CHECK PHASE] setImmediate callback");

    process.nextTick(() => {
        console.log("4. [MICROTASK inside CHECK] process.nextTick");
    });

    Promise.resolve().then(() => {
        console.log("4. [MICROTASK inside CHECK] Promise.then");
    });
});

/**
 * ======================
 * POLL PHASE
 * ======================
 * - The heart of the event loop.
 * - Handles I/O callbacks (fs, net, http, etc.).
 * - If there are no timers due, the Poll phase can block waiting for I/O.
 * - When I/O completes, its callbacks are queued here.
 */

fs.readFile("event-loop-interval.js", () => {
    console.log("5. [POLL PHASE] fs.readFile callback");

    setTimeout(() => {
        console.log("5. [TIMERS PHASE inside POLL] setTimeout callback");
    }, 0);

    setImmediate(() => {
        console.log("5. [CHECK PHASE inside POLL] setImmediate callback");
    });

    process.nextTick(() => {
        console.log("5. [MICROTASK inside POLL] process.nextTick");
    });

    Promise.resolve().then(() => {
        console.log("5. [MICROTASK inside POLL] Promise.then");
    });
});

/**
 * ======================
 * MICROTASK QUEUE
 * ======================
 * - Runs *after* each synchronous block of code,
 *   before entering the next event loop phase.
 * - Includes Promise callbacks and process.nextTick.
 * - Since Node.js v21+, Promise microtasks are prioritized
 *   over process.nextTick to match browser behavior.
 */

Promise.resolve().then(() => {
    console.log("7. [MICROTASK - PROMISE] Runs after sync code, before NEXTTICK");
});

process.nextTick(() => {
    console.log("6. [MICROTASK - NEXTTICK] Runs after promises, before event loop");
});


/**
 * ======================
 * EXIT HOOK
 * ======================
 * - The 'exit' event fires when the event loop has no more work to do.
 * - All timers, intervals, I/O, and immediates are cleared.
 */
process.on("exit", () => {
    console.log("8. [EXIT] Event loop is empty, process exiting.");
});

console.log("9. [END] Synchronous code ends");
