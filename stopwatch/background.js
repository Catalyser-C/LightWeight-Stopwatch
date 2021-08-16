
class timer {
    constructor(h, m, s) {

        this.start=false;
        this.h = h;
        this.m = m;
        this.s = s;
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

     setTimeout(start, 1000);
}



chrome.runtime.onMessage.addListener(callback);
function callback(obj, sender, sendResponse) {
    if (obj) {
        if (obj.method == 'start') {
            timevar=obj.data;
            if(timevar.start==true)
            {start();}
        }
        else if(obj.method=='status')
        {
            console.log(timevar);
            sendResponse(timevar);
        }
        else if(obj.method=='reset')
        {
            timevar=obj.data;
        }
    }
}
