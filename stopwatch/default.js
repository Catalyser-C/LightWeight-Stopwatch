$('#start').click(startmsg);
$('#stop').click(stopmsg);
$('#reset').click(reset);

class timer {
    constructor(h, m, s) {

        this.start=false;
        this.h = h;
        this.m = m;
        this.s = s;

     

        chrome.runtime.sendMessage({ method: "status" },function(resp){
            console.log(resp);
            if(resp.start==true)
            {
                timevar.h=resp.h;
                timevar.m=resp.m;
                timevar.s=resp.s;
                timevar.start=resp.start;
                const timer = document.getElementById('timer');
                timer.innerHTML = timevar.h + ':' + timevar.m + ':' + timevar.s;
                start();
            }
            else{
                console.log("closer");
                timevar.h=resp.h;
                timevar.m=resp.m;
                timevar.s=resp.s;
                timevar.start=resp.start;
                const timer = document.getElementById('timer');
                timer.innerHTML = timevar.h + ':' + timevar.m + ':' + timevar.s;
            }
        });


    }
    reset()
    {
        this.h=this.m=this.s=0;
        this.start=false;
    }
 
}
let timevar = new timer(0, 0, 0);
function start() {

    if(timevar.start==false)
    {
        return true;
    }

    timevar.s++;
    if(timevar.s==60)
    {
        timevar.m++;
        if(timevar.m==60)
        {
            timevar.h++;
            timevar.m=0;
        }
        timevar.s=0;
    }

    const timer = document.getElementById('timer');
    timer.innerHTML = timevar.h + ':' + timevar.m + ':' + timevar.s;

    setTimeout(start, 1000);
}

function stop() {

    console.log("stop called");

   
}

function reset() {

    console.log("reset");
    timevar.reset();
    resetmsg();
    const timerhtml = document.getElementById('timer');
    timerhtml.innerHTML = timevar.h + ':' + timevar.m + ':' + timevar.s;

    // timer.innerHTML = '13333';
    chrome.storage.sync.set({ 'timer': { "hr": timevar.h, "m": timevar.m, "s": timevar.s } });
}

chrome.runtime.onMessage.addListener(callback);
function callback(obj, sender, sendResponse) {
    if (obj) {
        if (obj.method == 'start') {
            start();
        }
    }
}

function startmsg()
{
    if( timevar.start)
    {
        return;
    }
    timevar.start=true;
    chrome.runtime.sendMessage({ method: "start",data:timevar });
    start();
}
function stopmsg()
{
    if(!timevar.start)
    {
        return;
    }
    timevar.start=false;
    chrome.runtime.sendMessage({ method: "start",data:timevar });
}
function resetmsg()
{
    timevar.start=false;
    chrome.runtime.sendMessage({ method: "reset",data:timevar });
}