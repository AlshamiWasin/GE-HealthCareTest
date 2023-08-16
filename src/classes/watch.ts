export class Watch {
    private _hours: number;
    private _minutes: number;
    private _seconds: number;
    private _mode: string = "none";
    private _light: boolean = false;
    private timeZoneOffset: number;


    constructor(timeZoneOffset: number = 0) {
        const currentDate: Date = new Date();
        this._hours = currentDate.getHours();
        this._minutes = currentDate.getMinutes();
        this._seconds = currentDate.getSeconds();
        this.timeZoneOffset = timeZoneOffset;

        if (this.timeZoneOffset != 0) {
            this.addHours(this.timeZoneOffset);
        }
    }

    updateToCurrentTime(): void {
        this.addSeconds(1);
    }


    private normalizeTime() {
        let totalSeconds = this._seconds + this._minutes * 60 + this._hours * 3600;
        this._hours = Math.floor(totalSeconds / 3600) % 24;
        totalSeconds %= 3600;
        this._minutes = Math.floor(totalSeconds / 60);
        this._seconds = totalSeconds % 60;
    }

    changeMode(){
    if (this._mode == "none") {
        this._mode = "hour";
    }else if(this._mode == "hour"){
        this._mode = "minute";
    }else if(this._mode == "minute"){
        this._mode = "none";
    }
    }

    changeLight(){
        if (this._light == false) {
            this._light = true;
        }else if(this._light == true){
            this._light = false;
        }
    }

    increase(){
        if(this._mode == "hour"){
            this.addHours(1);
        }
        if(this._mode == "minute"){
            this.addMinutes(1);
        }
    }

    addHours(hours: number) {
        this._hours += hours;
        this.normalizeTime();
    }

    addMinutes(minutes: number) {
        this._minutes += minutes;
        this.normalizeTime();
    }

    addSeconds(seconds: number) {
        this._seconds += seconds;
        this.normalizeTime();
    }

    getHours():string {
        return this._hours.toString().padStart(2, '0');;
    }

    setHours(hours: number) {
        this._hours = hours;
        this.normalizeTime();
    }

    getMode():string {
        return this._mode;
    }

    getLight():boolean {
        return this._light;
    }

    getMinutes():string {
        return this._minutes.toString().padStart(2, '0');;
    }

    setMinutes(minutes: number) {
        this._minutes = minutes;
        this.normalizeTime();
    }

    getSeconds():string {
        return this._seconds.toString().padStart(2, '0');
    }

    setSeconds(seconds: number) {
        this._seconds = seconds;
        this.normalizeTime();
    }

    getTime(): string {
        const hoursString = this._hours.toString().padStart(2, '0');
        const minutesString = this._minutes.toString().padStart(2, '0');
        const secondsString = this._seconds.toString().padStart(2, '0');

        return `${hoursString}:${minutesString}:${secondsString}`;
    }

}
