//je ne savais pas dans quelle langue ajouter les commentaires pour expliquer le code, j'ai donc choisi de les ajouter en anglais


import './index.css';
import { Clock } from './classes';

//array to save clocks
const clocks: Clock[] = [];

//creating 2 clocks to add to the clokcs array
const clock = new Clock();
const clock2 = new Clock(6);
clocks.push(clock);
clocks.push(clock2);

//function to update all clocks
function updateAllClocks(){

    //clockcontainer in which i add the clocks elements
    const clocksContainer = document.getElementById('clocksContainer');
    clocksContainer.innerHTML = '';

    //going throw each clock and creating its divs and buttons
    clocks.forEach((clock, index) => {

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

        modeButton.addEventListener("click", function() {
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


        //this button depends on the mode of the clock , if the mode is hour this button adds 1 hour , if the mode is minutes then this button adds 1 minute , if its none then this buttons dosnt do anything.

        const increaseButton = document.createElement('button');
        increaseButton.innerText = "Increase";
        increaseButton.classList.add("button-30");
        increaseButton.addEventListener("click", function() {
            if ( clock.getMode() != "none") {
                clock.increase();
                hourDislpayDiv.innerText= clock.getHours()+":";
                menuteDislpayDiv.innerText = clock.getMinutes()+":";
                secondDislpayDiv.innerText = clock.getSeconds();
            }
        });


        //this button resets the time on the button
        const resetButton = document.createElement('button');
        resetButton.classList.add("button-30");
        resetButton.innerText = "Reset";
        resetButton.addEventListener("click", function() {
            clock.reset()
        });

        //this button switchs between the 24h format and the am/pm format
        const hourFormatButton = document.createElement('button');
        hourFormatButton.classList.add("button-30");
        hourFormatButton.innerText = "24H - Am/Pm";
        hourFormatButton.addEventListener("click", function() {
            clock.changeHourFormat();
            if ( clock.getHourFormat() == "24h") {
                timeformatDislpayDiv.innerText = "24h";
            }else{
                timeformatDislpayDiv.innerText = clock.getAmOrPm();
            }
            updateAllClocks();
        });

        //this button lights up the backgroud of the time , when clicked it stays active
        const lightButton = document.createElement('button');
        lightButton.innerText = "Light";
        lightButton.classList.add("button-30");
        lightButton.addEventListener("click", function() {
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


        //here i append the created divs and buttons into their positions

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

//this button and select helps me create new clocks
const addClockButton = document.getElementById('addClockButton');
const gmtSelect = document.getElementById("gmtSelect")as HTMLSelectElement;

addClockButton.addEventListener("click", function() {
    const newClock = new Clock(parseInt(gmtSelect.value));
    clocks.push(newClock);
    updateAllClocks();
});

//every second i update and display all the clocks
setInterval(updateAllClocks, 1000);
