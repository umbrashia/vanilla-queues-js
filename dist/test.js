"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var vanilaQue = new _1.VanillaQueues(5);
for (var index = 0; index < 100; index++) {
    vanilaQue.addJob(function (data, counter) {
        console.log(counter, "****");
        setTimeout(function () {
            console.log(data, "------> executed ---->", counter);
            vanilaQue.jobDone();
        }, Math.floor(Math.random() * 3000) + 1000); //Math.floor(Math.random() * 2000) +
    }, index);
}
vanilaQue.isDone(function () {
    console.log("oeeeeee done...");
});
vanilaQue.runJobs();
setTimeout(function () { return vanilaQue.pause(function () { return console.log("pause successfully..."); }); }, 10000);
setTimeout(function () { return vanilaQue.resume(); }, 30000);
//# sourceMappingURL=test.js.map