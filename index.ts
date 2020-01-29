
/**
 * @param data get data when  pass before execution r
 * @param counter job count execution by queue machine runJobs
 */
interface queueCallback<returnType> {
    (data: returnType, counter: number): void;
}

interface IVanillaQueues<returnType> {
    /**
     * total count index start from 0
     */
    queueCount: number;
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
    runJobs(): void;
    jobDone(): void;
}



class VanillaQueues<returnType> implements IVanillaQueues<returnType> {

    private doneCallback: () => void;
    private queueActual: number;

    constructor(queueCountInit?: number) {

        if (queueCountInit && parseInt(queueCountInit.toString()) >= 1)
            this._queueCount = queueCountInit;
        else
            this._queueCount = 5;
        this._stackJobs = [];
    }

    public addJob(callback: queueCallback<returnType>, transferData: returnType): void {
        this._stackJobs.push({ callback: callback, data: transferData });
    }


    /**
     * name
     */
    public runJobs(): void {
        this._stackJobs = this._stackJobs.reverse();
        this.queueActual = this._queueCount;
        for (let index = 0; index < this._queueCount; index++) {
            let runInstance = this._stackJobs.pop();
            runInstance.callback(runInstance.data, index);
        }
    }

    public jobDone(): void {
        if (this._stackJobs.length !== 0) {
            let runInstance = this._stackJobs.pop();
            runInstance.callback(runInstance.data, this._queueCount++);
        } else if (--this.queueActual === 0)
            this.doneCallback();
    }

    public isDone(callback: () => void): void {
        this.doneCallback = callback;
    }

    private _stackJobs: {
        callback: queueCallback<returnType>;
        data: returnType;
    }[];
   

    private _queueCount: number;

    public get queueCount(): number {
        return this._queueCount;
    }
    public set queueCount(value: number) {
        this._queueCount = value;
    }


}

export { VanillaQueues, queueCallback, IVanillaQueues };

// let vanilaQue = new VanillaQueues<number>(1);
// for (let index = 0; index < 10; index++) {
//     vanilaQue.addJob((data, counter) => {
//         setTimeout(() => {
//             console.log(data, "------> executed ---->", counter);
//             vanilaQue.jobDone();
//         }, Math.floor(Math.random() * 3000) + 1000);//Math.floor(Math.random() * 2000) +
//     }, index);
// }

// vanilaQue.isDone(() => {
//     console.log("oeeeeee done...");

// });

// vanilaQue.runJobs();

