class Time {
    constructor(hh,mm,ss) {
        // make time object
        // hh: as hour
        // mm: as minute
        // ss: as second
        // format time  hh : mm : ss
        this.hh = hh;
        this.mm = mm;
        this.ss = ss;
    }

    // ---- setter and getter ---- //
    getTimeObject = () => {
        // return time as object. the item is integer
        //  hh as hour
        //  mm as minute
        //  ss as second
        return {
            hh:Number(this.hh),
            mm:Number(this.mm),
            ss:Number(this.ss)
        };
    }

    gethh = () => {
        // return only hour
        return Number(this.hh);
    }

    getmm = () => {
        // return only minute
        return Number(this.mm);
    }
    
    getss = () => {
        // return only second
        return Number(this.ss);
    }

    getTimeText = () => {
        // return time as String. default will be 00 : 00 : 00
        // format = hh : mm : ss 
        let tempS;
        let tempM;
        let tempH;
        if (this.ss < 10) {
            tempS = `0${this.ss}`;
        } else {
            tempS = `${this.ss}`;
        }
        if (this.mm < 10) {
            tempM = `0${this.mm}`;
        } else {
            tempM = `${this.mm}`;
        }
        if (this.hh < 10) {
            tempH = `0${this.hh}`;
        } else {
            tempH = `${this.hh}`;
        }
        return `${tempH} : ${tempM} : ${tempS}`;
    }

    setTimeHHMMSS = (hh,mm,ss) =>{
        // change all element of time.
        this.hh = hh;
        this.mm = mm;
        this.ss = ss;
    }

    resetTime = () => {
        // reset time , make it to be default value, hh = 0, mm = 0 ,ss = 0
        this.hh = 0;
        this.mm = 0;
        this.ss = 0;
    }
    
    addOneSecond = () => {
        // add time for one second 
        // example 
        // 00 : 00 : 00  tobe 00 : 00 : 01
        // 00 : 59 : 00  tobe 00 : 59 : 01
        // 00 : 59 : 59  tobe 01 : 00 : 00
        if (this.ss + 1 >= 60){
            if (this.mm + 1 >= 60){
                this.hh += 1;
                this.mm -= 60;
                this.ss -= 60;
            }else{
                this.mm += 1;
                this.ss -= 59;
            }
        }else{
            this.ss += 1;
        }
    }
}

export default Time;