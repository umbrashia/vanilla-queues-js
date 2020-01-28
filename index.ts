
interface queueCallback<returnType> {
    (data: returnType, counter: number): void;
}

interface IVanillaQueues<returnType> {
    queueCount:number;
    stackJobs: {
        callback: queueCallback<returnType>;
        data: returnType;
    }[];
    addJob(callback: queueCallback<returnType>, transferData: returnType):void;
    runJobs(): void;
    jobDone():void;
}



class VanillaQueues<returnType> implements IVanillaQueues<returnType> {



    constructor(queueCountInit?: number) {
        
        if (queueCountInit && parseInt(queueCountInit.toString()) >= 1)
            this._queueCount = queueCountInit;
        else
            this._queueCount = 5;
        this.stackJobs=[];
    }

    public addJob(callback: queueCallback<returnType>, transferData: returnType):void {
        this._stackJobs.push({ callback: callback, data: transferData });
    }

    /**
     * name
     */
    public runJobs(): void {
        this._stackJobs = this._stackJobs.reverse();
        for (let index = 0; index < this._queueCount; index++) {
            let runInstance = this._stackJobs.pop();
            runInstance.callback(runInstance.data, index);
        }
    }

    public jobDone():void {
        if (this._stackJobs.length !== 0) {
            let runInstance = this._stackJobs.pop();
            runInstance.callback(runInstance.data,++this._queueCount);
        }
    }

    private _stackJobs: {
        callback: queueCallback<returnType>;
        data: returnType;
    }[];
    public get stackJobs(): {
        callback: queueCallback<returnType>;
        data: returnType;
    }[] {
        return this._stackJobs;
    }
    public set stackJobs(value: {
        callback: queueCallback<returnType>;
        data: returnType;
    }[]) {
        this._stackJobs = value;
    }

    private _queueCount: number;

    public get queueCount(): number {
        return this._queueCount;
    }
    public set queueCount(value: number) {
        this._queueCount = value;
    }


}

export {VanillaQueues,queueCallback};

let vanilaQue=new VanillaQueues<number>(10);
for (let index = 0; index < 100; index++) {
    vanilaQue.addJob((data,counter)=>{
        setTimeout(()=>{
            console.log(data,"------> executed");
            vanilaQue.jobDone();
        },Math.floor(Math.random() * 2000) + 1000);
    },index);
}

vanilaQue.runJobs();

