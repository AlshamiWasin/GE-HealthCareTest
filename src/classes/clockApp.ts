import { Clock } from './clock';


export class ClockApp {

    private clocks: Clock[] = [];

    constructor() {

        const addClockButton = document.getElementById('addClockButton');
        const gmtSelect = document.getElementById("gmtSelect") as HTMLSelectElement;

        addClockButton.addEventListener("click", () => {
            if (gmtSelect) {
                const gmtValue = parseInt(gmtSelect.value);
                if (gmtValue> -12 && gmtValue < 14) {
                    this.addClock(parseInt(gmtSelect.value));
                }else{
                    alert("Invalide GMT Input!");
                    throw new Error("Invalide GMT Input!");
                }
            }
        });

        setInterval(this.updateAllClocks.bind(this), 1000);

    }

//function to update all clocks
    private updateAllClocks() : void{

    //clockcontainer in which i add the clocks elements
    const clocksContainer = document.getElementById('clocksContainer');
    clocksContainer.innerHTML = '';

    //going throw each clock and creating its divs and buttons
    this.clocks.forEach((clock, index) => {

        //here i create the divs and and add the css classes to some of them

        const timeZoneDiv = document.createElement('div');
        timeZoneDiv.innerText = "GMT " +clock.gettimeZoneOffset();
        timeZoneDiv.classList.add("timeZone");


        const clockDiv = document.createElement('div');
        clockDiv.classList.add('clock');

        const timeDislpayDiv = document.createElement('div');
        timeDislpayDiv.classList.add('time');

        const hourDislpayDiv = document.createElement('div');
        const menuteDislpayDiv = document.createElement('div');
        const secondDislpayDiv = document.createElement('div');

        const moreInformationDislpayDiv = document.createElement('div');
        moreInformationDislpayDiv.classList.add("moreInfo");

        const timeformatDislpayDiv = document.createElement('div');
        timeformatDislpayDiv.classList.add('timeformat');

        //here i display the time

        hourDislpayDiv.innerText= clock.getHours()+":";
        menuteDislpayDiv.innerText = clock.getMinutes()+":";
        secondDislpayDiv.innerText = clock.getSeconds();
        clock.updateToCurrentTime();

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add("buttons");

        //here i created the buttons that are going to be used on the clock

        //this button changes the mode when click on it , there is 3 modes (hour, minute, none).
        const modeButton = document.createElement('button');
        modeButton.innerText = "Mode";
        modeButton.classList.add("button-30");

        modeButton.addEventListener("click", () => {
            clock.changeMode();
            if (clock.getMode() == "hour") {
                hourDislpayDiv.classList.add('fadeInOut');
            }else if (clock.getMode() == "minute") {
                hourDislpayDiv.classList.remove('fadeInOut');
                menuteDislpayDiv.classList.add('fadeInOut');
            }else{
                hourDislpayDiv.classList.remove('fadeInOut');
                menuteDislpayDiv.classList.remove('fadeInOut');
            }

            console.log(clock.getMode());

        });

        const increaseButton = document.createElement('button');
        increaseButton.innerText = "Increase";
        increaseButton.classList.add("button-30");
        //event listener for the increase button
        increaseButton.addEventListener("click", () => {
            if ( clock.getMode() != "none") {
                clock.increase();
                hourDislpayDiv.innerText= clock.getHours()+":";
                menuteDislpayDiv.innerText = clock.getMinutes()+":";
                secondDislpayDiv.innerText = clock.getSeconds();
            }
        });


        const resetButton = document.createElement('button');
        resetButton.classList.add("button-30");
        resetButton.innerText = "Reset";
        //event listener for the reset button
        resetButton.addEventListener("click", () => {
            clock.reset()
        });


        const hourFormatButton = document.createElement('button');
        hourFormatButton.classList.add("button-30");
        hourFormatButton.innerText = "24H - Am/Pm";
        //event listener for the Hour format button
        hourFormatButton.addEventListener("click", () => {
            clock.changeHourFormat();
            if ( clock.getHourFormat() == "24h") {
                timeformatDislpayDiv.innerText = "24h";
            }else{
                timeformatDislpayDiv.innerText = clock.getAmOrPm();
            }
            this.updateAllClocks();
        });

        const lightButton = document.createElement('button');
        lightButton.innerText = "Light";
        lightButton.classList.add("button-30");
        //event listener for the Light button
        lightButton.addEventListener("click", () => {
            clock.changeLight();
            if ( clock.getLight() == true) {
                lightButton.classList.add("activeButton")
                timeDislpayDiv.classList.add("lightUp");
            }else{
                lightButton.classList.remove("activeButton")
                timeDislpayDiv.classList.remove("lightUp");
            }
        });


        if (clock.getMode() == "hour") {
            hourDislpayDiv.classList.add('fadeInOut');
        }else if (clock.getMode() == "minute") {
            hourDislpayDiv.classList.remove('fadeInOut');
            menuteDislpayDiv.classList.add('fadeInOut');
        }else{
            hourDislpayDiv.classList.remove('fadeInOut');
            menuteDislpayDiv.classList.remove('fadeInOut');
        }

        if ( clock.getLight() == true) {
            lightButton.classList.add("activeButton")
            timeDislpayDiv.classList.add("lightUp");
        }else{
            lightButton.classList.remove("activeButton")
            timeDislpayDiv.classList.remove("lightUp");
        }


        if ( clock.getHourFormat() == "24h") {
            timeformatDislpayDiv.innerText = "24h"
        }else{
            timeformatDislpayDiv.innerText = clock.getAmOrPm();
        }

        //appending elements to parent divs

        clockDiv.appendChild(timeDislpayDiv);
        timeDislpayDiv.appendChild(hourDislpayDiv);
        timeDislpayDiv.appendChild(menuteDislpayDiv);
        timeDislpayDiv.appendChild(secondDislpayDiv);
        timeDislpayDiv.appendChild(timeformatDislpayDiv);

        moreInformationDislpayDiv.appendChild(timeformatDislpayDiv);
        moreInformationDislpayDiv.appendChild(timeZoneDiv);

        timeDislpayDiv.appendChild(moreInformationDislpayDiv);

        clockDiv.appendChild(buttonsDiv);
        buttonsDiv.appendChild(modeButton);
        buttonsDiv.appendChild(increaseButton);
        buttonsDiv.appendChild(resetButton);
        buttonsDiv.appendChild(hourFormatButton);
        buttonsDiv.appendChild(lightButton);

        clocksContainer.appendChild(clockDiv);
    })
}

    public addClock(gmtOffSet:number) : void{
        const newClock = new Clock(gmtOffSet);
        this.clocks.push(newClock);
        this.updateAllClocks();
    }

    public getClocks():Clock[]{
        return this.clocks;
    }

}

