export class Clock {
    private _hours: number;
    private _minutes: number;
    private _seconds: number;
    private _mode: string = "none";//default mode is none
    private _light: boolean = false; //default light mode is off
    private _timeZoneOffset: number;
    private _hourFormat: string = "24h";//default hour format is 24h but can be "AM/PM"


    constructor(timeZoneOffset: number = 0) {

        const currentDate: Date = new Date();
        const utcOffsetMinutes = currentDate.getTimezoneOffset();
        const utcOffsetHours = utcOffsetMinutes / 60;
        //set clock time
        this._hours = currentDate.getHours();
        this._minutes = currentDate.getMinutes();
        this._seconds = currentDate.getSeconds();

        //change time depending on the timezoneoffset

        if (timeZoneOffset != 0) {
            this._timeZoneOffset = timeZoneOffset;
            this.addHours(utcOffsetHours + timeZoneOffset);
        }else{
            this._timeZoneOffset = -utcOffsetHours;
        }
    }

    //updates clock time to the current time by adding 1 second every second
    updateToCurrentTime(): void {
        this.addSeconds(1);
    }

    //this function formats the time correctly ( 60 seconds = 1 minute , 60 minutes = 1 hour)
    private normalizeTime() {
        let totalSeconds = this._seconds + this._minutes * 60 + this._hours * 3600;
        this._hours = Math.floor(totalSeconds / 3600) % 24;
        totalSeconds %= 3600;
        this._minutes = Math.floor(totalSeconds / 60);
        this._seconds = totalSeconds % 60;
    }

    //this function changes the mode
    changeMode(){
    if (this._mode == "none") {
        this._mode = "hour";
    }else if(this._mode == "hour"){
        this._mode = "minute";
    }else if(this._mode == "minute"){
        this._mode = "none";
    }
    }

    //this function resets the clock
    reset(){
        const currentDate: Date = new Date();
        const utcOffsetMinutes = currentDate.getTimezoneOffset();
        const utcOffsetHours = utcOffsetMinutes / 60;
        this._hours = currentDate.getHours();
        this._minutes = currentDate.getMinutes();
        this._seconds = currentDate.getSeconds();
        this._hourFormat = "24h";
        if (this._timeZoneOffset != 0) {
            this.addHours(utcOffsetHours + this._timeZoneOffset);
        }
        this._mode="none";
    }

    changeLight(){
        if (this._light == false) {
            this._light = true;
        }else if(this._light == true){
            this._light = false;
        }
    }

    //this function changes the format of the time
    changeHourFormat(){
        if (this._hourFormat == "24h") {
            this._hourFormat = "AM/PM";
        }else if(this._hourFormat == "AM/PM"){
            this._hourFormat = "24h";
        }
    }

    //this function adds 1 hour or 1 minute depending on the mode
    increase(){
        if(this._mode == "hour"){
            this.addHours(1);
        }
        if(this._mode == "minute"){
            this.addMinutes(1);
        }
    }

    //this function adds to the hours
    addHours(hours: number) {
        this._hours += hours;
        this.normalizeTime();
    }

    //this function adds to the minutes
    addMinutes(minutes: number) {
        this._minutes += minutes;
        this.normalizeTime();
    }

    //this function adds to the seconds
    addSeconds(seconds: number) {
        this._seconds += seconds;
        this.normalizeTime();
    }

    //this function return the hour in the correct current format
    getHours():string {
        if (this._hourFormat == "AM/PM") {
            const hours12h = (this._hours % 12) || 12; // Convert 0 to 12
            return `${hours12h}`;
        }
        return this._hours.toString().padStart(2, '0');;
    }

    //this function returns the mode
    getMode():string {
        return this._mode;
    }

    //this function returns the light status
    getLight():boolean {
        return this._light;
    }

    //this function returns the hour format
    getHourFormat():string {
        return this._hourFormat;
    }

    //this function returns the minutes
    getMinutes():string {
        return this._minutes.toString().padStart(2, '0');;
    }

    //this function returns the seconds
    getSeconds():string {
        return this._seconds.toString().padStart(2, '0');
    }

    //this function returns the GMT offset
    gettimeZoneOffset(): string{
        return `${this._timeZoneOffset}`;
    }

    //this function returns AM or PM depending no the time
    getAmOrPm(): string{
        return this._hours >= 12 ? 'PM' : 'AM';
    }
}
