# vanilla-queues-js
create and manage queues in core javascript or Vanilla JS it can be use any javascript framework like ReactJs, Angular React-Native and VueJs 


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

vanilaQue.isDone(() => {
    console.log("All Jobs are done...");
});

```

### In Pure-Javascript/Browser based 

```
<script src="../dist/vanilla-queues.js"></script>


<script>
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
</script>
```
