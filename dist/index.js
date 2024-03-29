"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VanillaQueues = void 0;
var VanillaQueues = /** @class */ (function () {
    function VanillaQueues(queueCountInit) {
        this.queueActual = 0;
        this.isPause = false;
        this.achivedLaps = 0;
        this.laps = 0;
        this.pauseCount = 0;
        if (queueCountInit && parseInt(queueCountInit.toString()) >= 1)
            this._queueCount = queueCountInit;
        else
            this._queueCount = 5;
        this._stackJobs = [];
    }
    VanillaQueues.prototype.achiveLapsNotification = function (callback, countJobsInLap) {
        if (callback)
            this.achiveLapsCallback = callback;
        this.laps = countJobsInLap;
    };
    VanillaQueues.prototype.stop = function () {
        this._stackJobs = [];
        this.queueActual = 0;
    };
    VanillaQueues.prototype.pause = function (callback) {
        if (callback)
            this.pauseCallback = callback;
        this.isPause = true;
    };
    VanillaQueues.prototype.resume = function () {
        this.isPause = false;
        for (var index = this.pauseCount; index > 0; index--)
            this.jobDone();
        this.pauseCount = 0;
    };
    VanillaQueues.prototype.addJob = function (callback, transferData) {
        this._stackJobs.push({ callback: callback, data: transferData });
    };
    /**
     * name
     */
    VanillaQueues.prototype.runJobs = function () {
        if (this._stackJobs.length <= this._queueCount)
            this._queueCount = this._stackJobs.length;
        this._stackJobs = this._stackJobs.reverse();
        this.queueActual = this._queueCount;
        for (var index = 0; index < this._queueCount; index++) {
            var runInstance = this._stackJobs.pop();
            runInstance === null || runInstance === void 0 ? void 0 : runInstance.callback(runInstance.data, index);
        }
    };
    VanillaQueues.prototype.jobDone = function () {
        if (!this.isPause) {
            if (this._stackJobs.length !== 0) {
                var runInstance = this._stackJobs.pop();
                runInstance === null || runInstance === void 0 ? void 0 : runInstance.callback(runInstance.data, this._queueCount++);
                if (this.laps && (this._queueCount % this.laps) == 0 && this.achiveLapsCallback)
                    this.achiveLapsCallback();
            }
            else if (--this.queueActual === 0)
                this.doneCallback();
        }
        else if (this.queueActual == ++this.pauseCount)
            this.pauseCallback();
    };
    VanillaQueues.prototype.isDone = function (callback) {
        this.doneCallback = callback;
    };
    Object.defineProperty(VanillaQueues.prototype, "queueCount", {
        get: function () {
            return this._queueCount;
        },
        set: function (value) {
            this._queueCount = value;
        },
        enumerable: false,
        configurable: true
    });
    return VanillaQueues;
}());
exports.VanillaQueues = VanillaQueues;
//# sourceMappingURL=index.js.map