# vanilla-queues-js
create and manage async jobs queues/threads  in core javascript or Vanilla JS it can be use any javascript framework like ReactJs, Angular React-Native and VueJs 


Please see in the [EXAMPLE / DEMO](https://umbrashia.github.io/vanilla-queues-js/example/example.html) 

### In TypeScript/React/Angular/VueJs/NodeJs

```
import * as vanillaQueuesJs from "vanilla-queues-js";

// creating object
let vanilaQue = new vanillaQueuesJs.VanillaQueues<number>(5);

//set your jobs
for (let index = 0; index < 100; index++) {
    //Add into stack
    vanilaQue.addJob((data, counter) => {
        //AJAX CAMOUFLAGE (WAIT FOR RANDOM 1 to 3 SEC)
        setTimeout(() => {
            console.log(data, "------> executed ---->", counter);
            //------
            vanilaQue.jobDone();//MARK AS SINGLE JOB IS DONE AFTER CALL "jobDone()" next job is start
            //-----
        }, Math.floor(Math.random() * 3000) + 1000);
        
    }, index);
}

//When all jobs are done this method notify you...
vanilaQue.isDone(() => {
    console.log("All Jobs are done...");
});
// Execute threads ....
vanilaQue.runJobs();

```

### In Pure-Javascript/Browser based 

```
<script src="../dist/vanilla-queues.js"></script>


<script>
    // creating object
    var vanilaQue = new VanillaQueues<number>(5);

    //set your jobs
    for (var index = 0; index < 100; index++) {
        //Add into stack
        vanilaQue.addJob(function(data, counter){
            //AJAX CAMOUFLAGE (WAIT FOR RANDOM 1 to 3 SEC)
            setTimeout(function(){
                console.log(data, "------> executed ---->", counter);
                vanilaQue.jobDone();
            }, Math.floor(Math.random() * 3000) + 1000);//Math.floor(Math.random() * 2000) +
        }, index);
    }

    vanilaQue.isDone(function() {
        console.log("oeeeeee done...");

    });
    // Execute threads ....
    vanilaQue.runJobs();

</script>
```

### Other Useful Methods

```
var vanilaQue = new VanillaQueues<number>(5);
```

- `PAUSE` - pause all task and return callback function. ``` vanilaQue.pause(()=>console.log("pause successfully...")
),```
- `STOP` - Stop all task.``` vanilaQue.stop() ```
- `RESUME` - Resume pause task, note: only pause tast are only to be resume. ``` vanilaQue.resume() ```
