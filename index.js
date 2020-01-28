"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VanillaQueues = /** @class */ (function () {
    function VanillaQueues(queueCountInit) {
        if (queueCountInit && parseInt(queueCountInit.toString()) >= 1)
            this._queueCount = queueCountInit;
        else
            this._queueCount = 5;
        this.stackJobs = [];
    }
    VanillaQueues.prototype.addJob = function (callback, transferData) {
        this._stackJobs.push({ callback: callback, data: transferData });
    };
    /**
     * name
     */
    VanillaQueues.prototype.runJobs = function () {
        this._stackJobs = this._stackJobs.reverse();
        for (var index = 0; index < this._queueCount; index++) {
            var runInstance = this._stackJobs.pop();
            runInstance.callback(runInstance.data, index);
        }
    };
    VanillaQueues.prototype.jobDone = function () {
        if (this._stackJobs.length !== 0) {
            var runInstance = this._stackJobs.pop();
            runInstance.callback(runInstance.data, ++this._queueCount);
        }
    };
    Object.defineProperty(VanillaQueues.prototype, "stackJobs", {
        get: function () {
            return this._stackJobs;
        },
        set: function (value) {
            this._stackJobs = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VanillaQueues.prototype, "queueCount", {
        get: function () {
            return this._queueCount;
        },
        set: function (value) {
            this._queueCount = value;
        },
        enumerable: true,
        configurable: true
    });
    return VanillaQueues;
}());
exports.VanillaQueues = VanillaQueues;
var vanilaQue = new VanillaQueues(10);
for (var index = 0; index < 100; index++) {
    vanilaQue.addJob(function (data, counter) {
        setTimeout(function () {
            console.log(data, "------> executed");
            vanilaQue.jobDone();
        }, Math.floor(Math.random() * 2000) + 1000);
    }, index);
}
vanilaQue.runJobs();
//# sourceMappingURL=index.js.map