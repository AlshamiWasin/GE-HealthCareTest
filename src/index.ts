import './index.css';
import { MyClass } from './example-unit';
import { Watch } from './classes';

const a = new MyClass(2);
console.log('number is', a.get());


const watch = new Watch(0);

console.log('watch hour is', watch.getHours());
console.log('number minute is', watch.getMinutes());

const timeDisplay = document.getElementById("timeDisplay")!;

const timeDisplayHour = document.getElementById("timeHour")!;
const timeDisplayMinute = document.getElementById("timeMinute")!;
const timeDisplaySecond = document.getElementById("timeSecond")!;

const modeButton = document.getElementById("modeButton")!;
const increaseButton = document.getElementById("increaseButton")!;
const lightButton = document.getElementById("lightButton")!;

const test = document.getElementById("test")!;

modeButton.addEventListener("click", function() {

    watch.changeMode();

    console.log(watch.getMode());


    if (watch.getMode() == "hour") {

        timeDisplayHour.classList.add('fadeInOut');
        //modeButton.classList.add("activeButton")

    }else if (watch.getMode() == "minute") {
        timeDisplayHour.classList.remove('fadeInOut');
        timeDisplayMinute.classList.add('fadeInOut');
    }else{
        timeDisplayHour.classList.remove('fadeInOut');
        timeDisplayMinute.classList.remove('fadeInOut');
    }


});

lightButton.addEventListener("click", function() {

    watch.changeLight();

    if ( watch.getLight() == true) {

        lightButton.classList.add("activeButton")
        timeDisplay.classList.add("lightUp");

    }else{

        lightButton.classList.remove("activeButton")
        timeDisplay.classList.remove("lightUp");
    }




});

increaseButton.addEventListener("click", function() {
    if ( watch.getMode() != "none") {
        watch.increase();

        timeDisplayHour.innerText= watch.getHours();
        timeDisplayMinute.innerText = watch.getMinutes();
        timeDisplaySecond.innerText = watch.getSeconds();
    }
});

function updateDisplay() {
    if (watch.getMode() == "none") {
        timeDisplayHour.innerText= watch.getHours();
        timeDisplayMinute.innerText = watch.getMinutes();
        timeDisplaySecond.innerText = watch.getSeconds();
        watch.updateToCurrentTime();
    }
}

setInterval(updateDisplay, 1000);




