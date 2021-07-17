//displaying the first user interface
$("#exampleModalCenter1").modal('show');

//Alarms tones
var file = new Audio('bensound-creativeminds.mp3');

//Array storing timeout function return
var setTimeOutArray = [];

//logic to get alarms from local storage
function homePage() {
    if (JSON.parse(localStorage.getItem("alarms")) !== null) {
        let settedAlarm = document.getElementById("settedAlarm");
        let arrAlarms = JSON.parse(localStorage.getItem("alarms"));
        arrAlarms.forEach(function (elem) {
            settedAlarm.innerHTML += elem;
        });

        let alarmTime = document.querySelectorAll(".alarmTime");

        let currentMilliSeconds;
        let setTimeMilliseconds;
        let hour;
        let minute;
        let seconds;

        alarmTime.forEach(function (elem, index) {
            let date = new Date();
            hour = date.getHours();
            minute = date.getMinutes();
            seconds = date.getSeconds();
            currentMilliSeconds = hour * 3600000 + minute * 60000 + seconds * 1000;
            setTimeOutArray.push(elem.className.charAt(elem.className.length - 1));

            setTimeMilliseconds = Number(elem.innerHTML);
           
            let setunsetbtn = elem.parentElement.nextElementSibling.children[0].children[0];

            if (currentMilliSeconds < setTimeMilliseconds) {
                if (setunsetbtn.style.left !== "0%") {
                    let temp = String(setTimeout(() => {
                        file.loop = true;
                        file.play();
                        document.querySelector(".alarmTitle").innerHTML = elem.previousElementSibling.innerHTML;

                        $("#exampleModalCenter").modal("show");

                    }, setTimeMilliseconds - currentMilliSeconds));
                    setTimeOutArray.push(temp);

                }


            } else {
                if (setunsetbtn.style.left !== "0%") {
                    let temp = String(setTimeout(() => {
                        file.loop = true;
                        file.play();
                        document.querySelector(".alarmTitle").innerHTML = elem.previousElementSibling.innerHTML;

                        $("#exampleModalCenter").modal("show");

                    }, 86400000 - currentMilliSeconds + setTimeMilliseconds));
                    setTimeOutArray.push(temp);

                }

            }

        });

    };
}
//logic to get alarms from local storage-----End

//Functions to apply on addAlarmBtn, AM, PM, and setAlarmBtn
let addAlarmBtn = document.getElementById('addAlarmBtn');
let setAlarmBtn = document.getElementById('setAlarmBtn');
let setAlarmContent = document.getElementById('setAlarmContent');
let alarmContent = document.getElementById('alarmContent');
let setHour = document.getElementById("setHour");
let setMinute = document.getElementById("setMinute");
let settedAlarm = document.getElementById("settedAlarm");

addAlarmBtn.addEventListener("click", (event) => {
    addAlarmBtn.style.display = "none";
    setAlarmBtn.style.display = "block";
    setAlarmContent.style.display = "block";
    alarmContent.style.display = "none";
    am.style.color = "#240090";
    pm.style.color = "#240090";
    am.style.fontWeight = "bold";
    pm.style.fontWeight = "bold";
    //setting hour and minute value to null
    setHour.value = null;
    setMinute.value = null;
});

let am = document.getElementById("AM");
let pm = document.getElementById("PM");
let check;
let ampmvalue;
am.addEventListener("click", () => {
    check = false;
    ampmvalue = "am";
    am.style.color = "#3500D3";
    pm.style.color = "#240090";
    pm.style.fontWeight = "400";
    am.style.fontWeight = "bold";
});
pm.addEventListener("click", () => {
    check = true;
    ampmvalue = "pm";
    pm.style.color = "#3500D3";
    am.style.color = "#240090";
    am.style.fontWeight = "400";
    pm.style.fontWeight = "bold";
});

setAlarmBtn.addEventListener("click", (event) => {
    var d = new Date();
    let hour = Number(setHour.value);
    let minute = Number(setMinute.value);


    let tempValue;
    if (hour > 0 && hour <= 12 && minute >= 0 && minute <= 59 && (check === false || check === true)) {

        if ((minute >= 0 && minute <= 9)) {
            minute = "0" + minute;
        }
        tempValue = hour + " : " + minute + " " + ampmvalue;
        alarmContent.style.display = "block";
        setAlarmContent.style.display = "none";
        addAlarmBtn.style.display = "block";
        setAlarmBtn.style.display = "none";
        let division = document.createElement("div");
        division.id = "AlarmBody";
        division.innerHTML = `
    <div class="row mt-2 mb-2 alarmBody">
        <div class="col-7">
            <h5 class="alarmName">${tempValue}</h5>
            <span class="alarmTime"></span>
        </div>
        <div class="col-5">
            
            <div class="sidetogglebutton">
               <div class="slider" onclick="setUnsetAlarm(this)"></div>
            </div>
            <i class="fa fa-trash" onclick="deleteAlarm(this)"></i>
        </div>
    </div>
    `;
        let division1 = document.getElementById("AlarmBody");
        settedAlarm.insertBefore(division, division1);
    } else {
        throw new Error("please insert time");
    }

    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    let currentTimeMilli = h * 3600000 + m * 60000 + s * 1000;

    let setTimeMilli;
    if (hour == 12 && check == false) {
        hour = 0;
        setTimeMilli = hour * 3600000 + minute * 60000;

    } else if (hour < 12 && check === false) {
        setTimeMilli = hour * 3600000 + minute * 60000;

    } else if (hour == 12 && check === true) {
        setTimeMilli = hour * 3600000 + minute * 60000;

    } else if (hour < 12 && check === true) {
        hour = hour + 12;
        setTimeMilli = hour * 3600000 + minute * 60000;

    }
    let temp;
    if (currentTimeMilli < setTimeMilli) {
        temp = String(setTimeout(() => {
            file.loop;
            file.play();
            document.querySelector(".alarmTitle").innerHTML = tempValue;
            $("#exampleModalCenter").modal('show');
        }, setTimeMilli - currentTimeMilli));
    } else {
        temp = String(setTimeout(() => {
            file.loop;
            file.play();
            document.querySelector(".alarmTitle").innerHTML = tempValue;
            $("#exampleModalCenter").modal('show');
        }, 86400000 - currentTimeMilli + setTimeMilli));
    }

    setTimeOutArray.push(temp);

    //adding alarmtime to alarm
    let alarmTime = document.querySelector(".alarmTime");
    alarmTime.classList.add(`alarm${temp}`);
    alarmTime.innerHTML = setTimeMilli;

    let setUnsetBtn = document.querySelector(".slider");
    setUnsetBtn.classList.add(`setUnsetBtn${temp}`);


    let pauseAlarm = document.querySelector(`.closeModal`);
    pauseAlarm.classList.add(`pausealarm${temp}`);

    let slider = document.querySelector(`.slider`);
    slider.classList.add(`setunset${temp}`);



    //storing alarm locally
    if (JSON.parse(localStorage.getItem("alarms")) === null) {
        let x = document.getElementById("AlarmBody");
        let temporaryArray = [];
        temporaryArray.unshift(x.outerHTML);
        localStorage.setItem("alarms", JSON.stringify(temporaryArray));
    } else {
        let x = document.getElementById("AlarmBody");
        let temp = JSON.parse(localStorage.getItem("alarms"));
        temp.unshift(x.outerHTML);
        localStorage.setItem("alarms", JSON.stringify(temp));
    }



    //sorting alarms with the least time from 12am
    let xalarmTime = document.querySelectorAll(".alarmTime");
    let temporaryArray1 = [];

    xalarmTime.forEach(function (elem) {
        temporaryArray1.push(Number(elem.innerHTML));
    });

    let sortedArray = temporaryArray1.sort(function (a, b) { return a - b });
    let sortedAlarmBodyArray = [];

    let x;
    for (let i = 0; i < sortedArray.length; i++) {
        x = sortedArray[i];
        for (let j = 0; j < xalarmTime.length; j++) {
            if (xalarmTime[j].innerHTML === String(sortedArray[i])) {
                sortedAlarmBodyArray.push(xalarmTime[j].parentElement.parentElement.parentElement.outerHTML);
                break;
            }
        }
    }


    let localStorageSortedArray = [];

    let sortedSettedAlarm = document.getElementById("settedAlarm");
    settedAlarm.innerHTML = "";
    sortedAlarmBodyArray.forEach(function (elem) {
        settedAlarm.innerHTML += elem;
        localStorageSortedArray.push(elem);
    });

    localStorage.setItem("alarms", JSON.stringify(localStorageSortedArray));

});
//Functions logic ends here---

//deleteAlarm function
function deleteAlarm(x) {

    setTimeOutArray.forEach(function (elem) {
        if (x.className.includes(elem)) {
            clearTimeout(Number(elem));

        }
    });

    //deleting alarm from localStorage
    let tempAlarms = JSON.parse(localStorage.getItem("alarms"));
    tempAlarms.forEach(function (elem, index) {

        if (x.parentElement.parentElement.parentNode.outerHTML === elem) {
            tempAlarms.splice(index, 1);
            localStorage.setItem("alarms", JSON.stringify(tempAlarms));
        }
    });

    //removing AlarmBody from DOM
    x.parentElement.parentElement.parentNode.remove();
};

//pauseAlarm function
function pauseAlarm(y) {
    let d = new Date();
    let sTemp = d.getSeconds();



    file.pause();
    setTimeOutArray.forEach(function (elem) {
        if (y.className.includes(elem)) {
            clearTimeout(Number(elem));


            let temp = setTimeout(() => {
                file.loop;
                file.play();
                $("exampleModalCenter").modal('show');
                y.className = `pauseAlarm alarm${temp}`;
            }, 86400000 - sTemp * 1000);

        }
    });
};

//back button functioning
let backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", function () {
    addAlarmBtn.style.display = "block";
    setAlarmBtn.style.display = "none";
    setAlarmContent.style.display = "none";
    alarmContent.style.display = "block";
});

//defining setUnsetAlarm()
function setUnsetAlarm(z) {
    let d = new Date();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let seconds = d.getSeconds();
    let currentMilliSeconds = hour * 3600000 + minute * 60000 + seconds * 1000;
    let x = Number(z.parentElement.parentElement.previousElementSibling.children[1].innerHTML);
    let y = String(z.parentElement.parentElement.previousElementSibling.children[0].innerHTML);

    if (z.style.left === "0%") {

        z.style.left = "100%";
        z.style.transform = "translateX(-100%)";
        z.style.backgroundColor = "#0000FF";

        let alarmBody = document.querySelectorAll("#AlarmBody");

        let tempalarmBody = [];
        alarmBody.forEach(function (elem) {
            tempalarmBody.push(elem.outerHTML);
        });


        localStorage.setItem("alarms", JSON.stringify(tempalarmBody));

        if (currentMilliSeconds < x) {
            let temp = setTimeout(() => {
                file.loop;
                file.play();
                document.querySelector(".alarmTitle").innerHTML = y;
                $('#exampleModalCenter').modal('show');
            }, x - currentMilliSeconds);
            z.className = `slider setunset${temp}`;
            setTimeOutArray.push(temp);

        } else {
            let temp = setTimeout(() => {
                file.loop;
                file.play();
                document.querySelector(".alarmTitle").innerHTML = y;
                $('#exampleModalCenter').modal('show');
            }, 86400000 - currentMilliSeconds + x);
            z.className = `slider setunset${temp}`;
            setTimeOutArray.push(temp);

        }
    } else {

        z.style.left = "0%";
        z.style.transform = "translateX(0%)";
        z.style.backgroundColor = "#3500D3";

        let alarmBody = document.querySelectorAll("#AlarmBody");

        let tempalarmBody = [];
        alarmBody.forEach(function (elem) {
            tempalarmBody.push(elem.outerHTML);
        });

        localStorage.setItem("alarms", JSON.stringify(tempalarmBody));

        setTimeOutArray.forEach(function (elem) {
            if (z.className.includes(elem)) {
                clearTimeout(Number(elem));
            }
        });

    }
}
