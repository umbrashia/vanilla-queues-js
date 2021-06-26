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
    breakCall(callback: () => void, everyNumberJobDone: number): void;
    pause(): void;
    resume(): void;
    stop(): void;
    runJobs(): void;
    jobDone(): void;
}
declare class VanillaQueues<returnType> implements IVanillaQueues<returnType> {
    private doneCallback;
    private pauseCallback;
    private queueActual;
    private isPause;
    private _stackJobs;
    constructor(queueCountInit?: number);
    stop(): void;
    breakCall(callback: () => void, everyNumberJobDone: number): void;
    pauseCount: number;
    pause(callback?: () => void): void;
    resume(): void;
    addJob(callback: queueCallback<returnType>, transferData: returnType): void;
    /**
     * name
     */
    runJobs(): void;
    jobDone(): void;
    isDone(callback: () => void): void;
    private _queueCount;
    get queueCount(): number;
    set queueCount(value: number);
}
export { VanillaQueues, queueCallback, IVanillaQueues };
//# sourceMappingURL=index.d.ts.map