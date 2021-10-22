import Time from './time.js';
class Stopwatch {
    constructor(textId) {
        // make object of stopwatch
        // Time         : object of time (this class declared in ./time.js)
        // timerOn      : boolean
        // TimeEnd      : object of time (this class declared in ./time.js) , to save time when stopwatch stopped
        // timeCycle    : timeout
        // textId       : string
        this.Time =  new Time (0,0,0);
        this.timerOn = false;
        this.isEnd = false;
        this.timeEnd =  new Time (0,0,0);
        this.timeCycle = null;
        this.textId = textId;
    }

// ---------------- Time calculation ---------------- //
    timeMinusTime = (upperTime, lowerTime) => {
        // time plus time operation, return new time object
        let result = {
            hh:0,
            mm:0,
            ss:0
        }
        if (upperTime.ss - lowerTime.ss <0){
            if (upperTime.mm - lowerTime.mm <0){
                upperTime.hh -= 1;
                upperTime.mm += 60;
    
                upperTime.mm -= 1;
                upperTime.ss += 60;
    
                result.hh = upperTime.hh - lowerTime.hh
                result.mm = upperTime.mm - lowerTime.mm
                result.ss = upperTime.ss - lowerTime.ss
            }else{
                upperTime.mm -= 1;
                upperTime.ss += 60;
                
                result.hh = upperTime.hh - lowerTime.hh
                result.mm = upperTime.mm - lowerTime.mm
                result.ss = upperTime.ss - lowerTime.ss
            }
        }else{
            if (upperTime.mm - lowerTime.mm <0){
                upperTime.hh -= 1;
                upperTime.mm += 60;
    
                result.hh = upperTime.hh - lowerTime.hh
                result.mm = upperTime.mm - lowerTime.mm
                result.ss = upperTime.ss - lowerTime.ss
            }else{
                result.hh = upperTime.hh - lowerTime.hh
                result.mm = upperTime.mm - lowerTime.mm
                result.ss = upperTime.ss - lowerTime.ss
            }
        }
        return result;
    }

    timePlusTime = (upperTime, lowerTime) => {
        // time minus time operation, return new time object
        let result = {
            hh:0,
            mm:0,
            ss:0
        }
        if (upperTime.ss + lowerTime.ss >60){
            if (upperTime.mm + lowerTime.mm >60){
                upperTime.hh += 1;
                upperTime.mm -= 60;
    
                upperTime.mm += 1;
                upperTime.ss -= 60;
    
                result.hh = upperTime.hh + lowerTime.hh
                result.mm = upperTime.mm + lowerTime.mm
                result.ss = upperTime.ss + lowerTime.ss
            }else{
                upperTime.mm += 1;
                upperTime.ss -= 60;
                
                result.hh = upperTime.hh + lowerTime.hh
                result.mm = upperTime.mm + lowerTime.mm
                result.ss = upperTime.ss + lowerTime.ss
            }
        }else{
            if (upperTime.mm + lowerTime.mm >60){
                upperTime.hh += 1;
                upperTime.mm -= 60;
    
                result.hh = upperTime.hh + lowerTime.hh
                result.mm = upperTime.mm + lowerTime.mm
                result.ss = upperTime.ss + lowerTime.ss
            }else{
                result.hh = upperTime.hh + lowerTime.hh
                result.mm = upperTime.mm + lowerTime.mm
                result.ss = upperTime.ss + lowerTime.ss
            }
        }
        return result;
    }

// ---------------- Stopwatch local storage handler ---------------- //
    autorecovery = (stopwtchTimeTextElement) => {
        // check is stopwatch running or not
        // if yes, the stopwatch will automatically play when the page opened
        // either, if the stopwatch paused, it will show the stopwatach time.(not from default 00 : 00 : 00)
        const currentTime = this.getCurrentTime();
        const timeStart = JSON.parse(localStorage.getItem('timeStart'));
        const oldStopwatchTime = JSON.parse(localStorage.getItem('timeOn'));
        // newStopwatchTIme get by: (current time - time start) + old stopwatch time
        // current time     = current time (get new time from server)   ex: current time:"{10:15:00}"
        // time start       = time when stopwatch clicked / started     ex: time start  :"{10:10:00}"
        // oldStopwatchtime = last time saved of stopwatch              ex: time on     :"{00:00:30}"
        // newStopwatchTime should be 
        // current time         10:15:00
        // time start           10:10:00
        // _________________________________ - 
        //                      00:05:00
        // ildstopwatchtime     00:00:30
        // _________________________________ +
        // newStopwatchTime     00:05:30            (this will be time of stopwatch when the browser opened)
        const newStopwatchTime =  this.timePlusTime(this.timeMinusTime (currentTime,timeStart),oldStopwatchTime) ;
        this.Time.setTimeHHMMSS(
            newStopwatchTime.hh,
            newStopwatchTime.mm,
            newStopwatchTime.ss,
            );
        this.start(stopwtchTimeTextElement);
    }

    updateStatus = (status) => {
        // it will save stopwatch status and stopwatch time to local storage
        localStorage.setItem('isTimePaused' ,status);
        localStorage.setItem('timeOn' ,JSON.stringify(this.Time.getTimeObject()));
    }

    saveTime = () => {
        // it will save current time to local storage
        localStorage.setItem('timeStart', JSON.stringify(this.getCurrentTime()));
    } 

    loadTime = () => {
        // it will load stop watch time from local storage, return string of time
        return JSON.parse(localStorage.getItem('timeStart'));
    }

    // ---- setter and getter ---- //
    
    updateTime = (hh,mm,ss) => {
        // update a new time , change hour, minute , and second with the new one (hh : mm : ss)
        this.Time =  new Time (hh,mm,ss);
    }

    updateTimeEnd = (hh,mm,ss) => {
        // update a new time end (result), change hour, minute , and second with the new one (hh : mm : ss)
        this.timeEnd =  new Time (hh,mm,ss);
    }

    getCurrentTime = () => {
        // return current time as an object
        let date = new Date();
        return new Time (
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
            );
    }

    getTime = () => {
        // return save the current stopwatch time
        return this.Time;
    }

    getID = () => {
        // get stopwatch id
        // return string 
        return this.textId;
    }

    // ---- Stop watch control function and UI ---- //
    playaButtonEvent = (icon) => {
        // exection for stopwatch button
        switch (icon) {
            case 'play':
                this.saveTime();
                this.updateStatus(false);
                break;
            case 'pause':
                this.saveTime();
                this.updateStatus(true);
                this.pause();
                break;
        }
    }

    setTimeText = (stopwtchTimeTextElement) => {
        // to make the stopwatch cycle work for every one second
        // argument stopwtchTimeTextElement is element in page as <p> element , for default format is 00 : 00 : 00 
        this.Time.addOneSecond();
        // update UI stopwatch time text
        stopwtchTimeTextElement.innerText = this.Time.getTimeText();
        // make this a loop for every one second
        this.timeCycle = setTimeout(this.setTimeText.bind(null, stopwtchTimeTextElement), 1000);
    }

    start = (stopwtchTimeTextElement) => {
        // event to initiate stopwatch play
        if (!this.timerOn) {
            this.timerOn = true;
            this.setTimeText(stopwtchTimeTextElement);
        }else{
            this.setTimeText(stopwtchTimeTextElement);
        }
    }

    stop = (resultText) => {
        // stop stopwatch, show result and reset stopwatch
        // argument result_text is element in page as <span> element , default text can be null 

        // stop the stopwatch time looping
        clearTimeout(this.timeCycle); 
        // update UI stopwatch result text
        this.timeEnd.setTimeHHMMSS(
            this.Time.gethh(),
            this.Time.getmm(),
            this.Time.getss()
        );
        this.isEnd=true;
        // reset stopwatch
        resultText.innerHTML = this.timeEnd.getTimeText();
        this.Time.resetTime();
        this.timerOn = false;
        this.updateStatus(true);   
    }

    pause = () => {
        // to pause the stopwatch
        // stop the stopwatch time looping
        clearTimeout(this.timeCycle);
        this.timerOn = false;
    }

}

export default Stopwatch;
