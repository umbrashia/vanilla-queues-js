import { VanillaQueues } from ".";

let vanilaQue = new VanillaQueues<number>(5);
for (let index = 0; index < 100; index++) {
    vanilaQue.addJob((data, counter) => {
        console.log(counter,"****");
        setTimeout(() => {
            console.log(data, "------> executed ---->", counter);
            vanilaQue.jobDone();
        }, Math.floor(Math.random() * 3000) + 1000);//Math.floor(Math.random() * 2000) +
    }, index);
}

vanilaQue.isDone(() => {
    console.log("oeeeeee done...");

});

vanilaQue.achiveLapsNotification(()=>{
    console.log("lap achived...");
},10)

vanilaQue.runJobs();

setTimeout(()=>vanilaQue.pause(()=>console.log("pause successfully...")
),10000);

setTimeout(()=>vanilaQue.resume(),30000);


