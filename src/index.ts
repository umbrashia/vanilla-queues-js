
/**
 * @param data get data when  pass before execution r
 * @param counter job count execution by queue machine runJobs
 */
interface queueCallback<returnType> {
    (data: returnType, counter: number): void
}

interface IVanillaQueues<returnType> {
    // myCallback;
    /**
     * total count index start from 0
     */
    queueCount: number;

    /**
     * calculate pause count...
     */
    pauseCount: number;
    /**
     * grobal array to mark as complete all jobs
     * @param callback an evert is on succes
     */
    isDone(callback: () => void): void;
    /**
     * 
     * @param callback as call back basses of transfer
     * @param transferData callback data ewcive
     */
    addJob(callback: queueCallback<returnType>, transferData: returnType): void;
    achiveLapsNotification(callback: () => void, countJobsInLap: number): void;
    pause(): void;
    resume(): void;
    stop(): void;
    runJobs(): void;
    jobDone(): void;
}



class VanillaQueues<returnType> implements IVanillaQueues<returnType> {

    private declare doneCallback: () => void;
    private declare pauseCallback: () => void;
    private queueActual: number = 0;
    private isPause: boolean = false;
    private achivedLaps: number = 0;
    private laps: number = 0;
    private declare achiveLapsCallback: () => void;
    // private 
    private _stackJobs: {
        callback: queueCallback<returnType>;
        data: returnType;
    }[];

    constructor(queueCountInit?: number) {

        if (queueCountInit && parseInt(queueCountInit.toString()) >= 1)
            this._queueCount = queueCountInit;
        else
            this._queueCount = 5;
        this._stackJobs = [];
    }

    achiveLapsNotification(callback: () => void, countJobsInLap: number): void {
        if (callback)
            this.achiveLapsCallback = callback;
        this.laps = countJobsInLap;
    }

    stop(): void {
        this._stackJobs = [];
        this.queueActual = 0;
    }

    pauseCount: number = 0;

    public pause(callback?: () => void): void {
        if (callback)
            this.pauseCallback = callback;
        this.isPause = true;
    }
    public resume(): void {
        this.isPause = false;
        for (let index = this.pauseCount; index > 0; index--)
            this.jobDone();
        this.pauseCount = 0;
    }

    public addJob(callback: queueCallback<returnType>, transferData: returnType): void {
        this._stackJobs.push({ callback, data: transferData });
    }


    /**
     * name
     */
    public runJobs(): void {
        if (this._stackJobs.length <= this._queueCount)
            this._queueCount = this._stackJobs.length;
        this._stackJobs = this._stackJobs.reverse();
        this.queueActual = this._queueCount;
        for (let index = 0; index < this._queueCount; index++) {
            let runInstance = this._stackJobs.pop();
            runInstance?.callback(runInstance.data, index);
        }
    }

    public jobDone(): void {
        if (!this.isPause) {
            if (this._stackJobs.length !== 0) {
                let runInstance = this._stackJobs.pop();
                runInstance?.callback(runInstance.data, this._queueCount++);
                if (this.laps && (this._queueCount % this.laps) == 0 && this.achiveLapsCallback)
                    this.achiveLapsCallback();

            } else if (--this.queueActual === 0)
                this.doneCallback();
        } else if (this.queueActual == ++this.pauseCount)
            this.pauseCallback();
    }

    public isDone(callback: () => void): void {
        this.doneCallback = callback;
    }

    private _queueCount: number;

    public get queueCount(): number {
        return this._queueCount;
    }
    public set queueCount(value: number) {
        this._queueCount = value;
    }


}

export { VanillaQueues, queueCallback, IVanillaQueues };
