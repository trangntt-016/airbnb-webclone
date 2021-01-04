// Check In Check Out Field
// Declare global variables 
const today = new Date().getDate(),
    thisMonth = new Date().getMonth(),
    thisYear = new Date().getFullYear();
const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ],
    weekDays = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];
var date = new Date(),
    flagPopUpCalendar = 0; // checkIn Popup = 0, checkOut Popup = 1

var checkInObj = {
    indexdate: -1,
    indexPage: -1,
    date: 100,
    weekday: "",
    month: "",
    year: 100
};

var checkOutObj = {
    indexdate: -1,
    indexPage: -1,
    date: 100,
    weekday: "",
    month: "",
    year: 100
};

var flagCheckIn = 0,
    flagCheckOut = 0;

// Events
document.querySelector("#checkIn>input").addEventListener('click', () => {
    closeCheckOut();
    openCheckInCalendar();
    displayCheckOutDates();
})

document.querySelector("#checkOut >input").addEventListener('click', () => {
    closeCheckIn();
    openCheckOutCalendar();
    displayCheckInDates();
})

window.addEventListener('click', closeIfOutSide);

document.querySelector("#checkInCalendar .pre").addEventListener('click', () => {
    flagCheckIn--;
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector("#checkInCalendar .next").addEventListener('click', () => {
    flagCheckIn++;
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

document.querySelector("#checkOutCalendar .pre").addEventListener('click', () => {
    flagCheckOut--;
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector("#checkOutCalendar .next").addEventListener('click', () => {
    flagCheckOut++;
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

// Functions
closeCheckIn = () => {
    document.querySelector('#checkInCalendar').setAttribute('style', 'display:none');
}

closeCheckOut = () => {
    document.querySelector('#checkOutCalendar').setAttribute('style', 'display:none');
}

openCheckInCalendar = () => {
    flagPopUpCalendar = 0;
    document.querySelector('#checkInCalendar').setAttribute('style', 'display:flex');
    renderCalendar();
}

openCheckOutCalendar = () => {
    flagPopUpCalendar = 1;
    document.querySelector('#checkOutCalendar').setAttribute('style', 'display:flex');
    renderCalendar();
}

displayCheckInDates = () => {
    if (checkInObj.date != 100) {
        var inputCheckIn = document.querySelector("#checkIn >input");
        var checkInDates = checkInObj.weekday + ' ' + checkInObj.date + ', ' + checkInObj.month + ', ' + checkInObj.year;
        inputCheckIn.placeholder = checkInDates;
    }
}

displayCheckOutDates = () => {
    if (checkOutObj.date != 100) {
        var inputCheckOut = document.querySelector("#checkOut >input");
        var checkOutDates = checkOutObj.weekday + ' ' + checkOutObj.date + ', ' + checkOutObj.month + ', ' + checkOutObj.year;
        inputCheckOut.placeholder = checkOutDates;
    }
}

const divClickOutside = document.querySelectorAll("div");

function closeIfOutSide(e) {
    for (var i = 0; i < divClickOutside.length; i++) {
        if (e.target === divClickOutside[i]) {
            closeCheckIn();
            closeCheckOut();
        }
    }
    displayCheckInDates();
    displayCheckOutDates();
}

renderCalendar = () => {
    displayMonthYear();
    displayDaysOfMonth();
    updateDatesPicked();
}

displayMonthYear = () => {
    let checkInHTML = document.querySelector("#checkInCalendar .container-calendar p");
    let checkOutHTML = document.querySelector("#checkOutCalendar .container-calendar p");
    // Get the index of the month and then month[index] will return the name of the month
    let monthName = month[date.getMonth()];
    // Get index of the week and week[index] will return the weekday
    if (flagPopUpCalendar == 1) {
        checkOutHTML.innerHTML = monthName + ' ' + date.getFullYear();
    } else {
        checkInHTML.innerHTML = monthName + ' ' + date.getFullYear();
    }
}

displayDaysOfMonth = () => {
    let days = "";

    // Variables to display dates of last month
    let lastDayOfLastMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();
    let noOfLastDaysLastMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDay();

    // Variables to display this month
    let lastDayOfThisMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    // Variables to display next month
    let firstDayOfNextMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay() + 1;

    // Display previous dates and avoid starting when last day of month is Sunday (6th)
    for (let i = lastDayOfLastMonth - noOfLastDaysLastMonth; i <= lastDayOfLastMonth && noOfLastDaysLastMonth != 6; i++) {
        // If it is not in current month, don't display previous dates
        if (date.getMonth() != thisMonth) {
            days += `<div class="pre-date-lastMonths">${i}</div>`
        }
        // If it is in current month, display it as blurred
        else {
            days += `<div class="pre-date">${i}</div>`
        }
    }

    // Display dates of month (1 - 29/30/31)
    for (let i = 1; i <= lastDayOfThisMonth; i++) {
        // If it is in the previous month or the past dates of current month, display it as blurred
        if (date.getMonth() < thisMonth && date.getFullYear() <= thisYear || date.getMonth() === thisMonth && i < today && date.getFullYear() <= thisYear) {
            days += `<div class="pre-date">${i}</div>`
        }
        // If it is in the future dates, display it as normal
        else {
            if (flagPopUpCalendar == 0) {
                days += displayCheckInDatePicked(noOfLastDaysLastMonth, i, checkInObj.indexdate, checkInObj.indexPage, flagCheckIn);
            } else if (flagPopUpCalendar == 1) {
                days += displayCheckOutDatePicked(noOfLastDaysLastMonth, i, checkInObj.indexdate, checkOutObj.indexdate, checkInObj.indexPage, checkOutObj.indexPage, flagCheckIn, flagCheckOut);
            }
        }
    }
    // Display dates of next month
    for (let i = 1; i <= 7 - firstDayOfNextMonth; i++) {
        // if it is not in the current month (next months), don't display next dates 
        if (date.getMonth() != thisMonth) {
            days += `<div class="next-date-nextMonths">${i}</div>`
        }
        // otherwise, display it as blurred
        else {
            days += `<div class="next-date">${i}</div>`
        }
    }
    // Push the DOM Elements to HTML page
    pushDomtoHTML(flagPopUpCalendar, days);
}

displayCheckInDatePicked = (noOfLastDaysLastMonth, i, indexdate, indexPage, flag) => {
    var days = ""
    // Because i starts at calendar[ 1 - 31] while indexdate starts at calendar[ lastmon + thismonth + nextmonth]
    var temp_indexDate = indexdate - noOfLastDaysLastMonth;
    if (noOfLastDaysLastMonth === 6) {
        temp_indexDate = indexdate + 1;
    }
    // Everytime a user click a date, index of the i and the indexPage will be stored in checkInObj. Every time page is rendered (load, next,prev), flagPage will be updated. T
    // When flagCheckIn == indexPage, means, that calendar has a date that is picked by user. Loop through an array and check if the index  = i is where the date picked
    if (i === temp_indexDate && indexPage === flag) {
        if (flag === 0) {
            days += `<div class="checkInPicked">${i}</div>`
        } else {
            days += `<div class="checkOutPicked">${i}</div>`
        }
    } else {
        days += `<div>${i}</div>`
    }
    return days;
}

displayCheckOutDatePicked = (noOfLastDaysLastMonth, i, indexCheckInDate, indexCheckOutDate, indexCheckInPage, indexCheckOutPage, flagIn, flagOut) => {
    var days = "";
    var temp_indexCheckInDate = indexCheckInDate - noOfLastDaysLastMonth;
    var temp_indexCheckOutDate = indexCheckOutDate - noOfLastDaysLastMonth;
    if (noOfLastDaysLastMonth === 6) {
        temp_indexCheckInDate = indexCheckInDate + 1;
        temp_indexCheckOutDate = indexCheckOutDate + 1;
    }
    if (i === temp_indexCheckInDate && indexCheckInPage === flagIn) {
        days += `<div class="checkInPicked">${i}</div>`;

    } else if (i === temp_indexCheckOutDate && indexCheckOutPage === flagOut) {
        days += `<div class="checkOutPicked">${i}</div>`;
    } else {
        days += `<div>${i}</div>`
    }
    return days;
}

pushDomtoHTML = (flag, days) => {
    let checkInHTML = document.querySelector("#checkInCalendar .container-days"),
        checkOutHTML = document.querySelector("#checkOutCalendar .container-days");
    if (flag === 1) {
        checkOutHTML.innerHTML = days;
    } else {
        checkInHTML.innerHTML = days;
    }
}

updateDatesPicked = () => {
    var divsCheckIn = document.querySelectorAll("#checkInCalendar .container-days div"),
        divsCheckOut = document.querySelectorAll("#checkOutCalendar .container-days div"),
        divs = divsCheckIn;

    if (flagPopUpCalendar == 1) {
        divs = divsCheckOut
    }

    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener("click", () => {
            // If it is in CheckIn Calendar, store the dates picked in checkInObjs
            if (!divs[i].classList.contains("pre-date") && !divs[i].classList.contains("next-date")) {
                if (flagPopUpCalendar === 0) {
                    storeDates(checkInObj, divs[i], weekDays[i % 7]);
                    // Check if currents divs are already added, if it is, remove it
                    removeCurrentPickedDiv(divs, flagPopUpCalendar);
                    // Display the picked date to the CheckIn calendar 
                    divs[i].classList.add("checkInPicked");
                    storeIndexPickedDate(checkInObj, i, flagCheckIn);
                } else {
                    // If it is in CheckOut Calendar, store the dates picked in checkOutObjs
                    storeDates(checkOutObj, divs[i], weekDays[i % 7]);
                    // Check if currents divs are added
                    removeCurrentPickedDiv(divs, flagPopUpCalendar);
                    divs[i].classList.add("checkOutPicked");
                    // when loading between pages, it still keep the picked Date
                    storeIndexPickedDate(checkOutObj, i, flagCheckOut);
                }
            }
        })
    }
}

storeDates = (Obj, divs, weekDays) => {
    Obj.date = divs.innerHTML;
    Obj.weekday = weekDays; // i%7 returns a range from 0 - 6 equivalent to the weekDays[]
    Obj.month = month[date.getMonth()]; // date.getMonth() returns a range from 0 - 11 equivalent to month[]
    Obj.year = date.getFullYear();

};

removeCurrentPickedDiv = (divs, flag) => {
    if (flag === 0) {
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].classList.contains("checkInPicked")) {
                divs[i].classList.remove("checkInPicked");
            }
        }
    } else {
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].classList.contains("checkOutPicked")) {
                divs[i].classList.remove("checkOutPicked");
            }
        }
    }
}

storeIndexPickedDate = (Obj, i, flag) => {
    Obj.indexdate = i;
    Obj.indexPage = flag;
};

displayCheckInDates = () => {
    if (checkInObj.date != 100) {
        var inputCheckIn = document.querySelector("#checkIn >input");
        var checkInDates = checkInObj.weekday + ' ' + checkInObj.date + ', ' + checkInObj.month + ', ' + checkInObj.year;
        inputCheckIn.value = checkInDates;
    }
}

displayCheckOutDates = () => {
    if (checkOutObj.date != 100) {
        var inputCheckOut = document.querySelector("#checkOut >input");
        var checkOutDates = checkOutObj.weekday + ' ' + checkOutObj.date + ', ' + checkOutObj.month + ', ' + checkOutObj.year;
        inputCheckOut.value = checkOutDates;
    }
}

// Number of Guests Field
document.querySelector("#adult input").addEventListener("click", () => {
    var value = document.querySelector("#adult input").value;
    if (value < 0||value==undefined) {
        document.querySelector("#adult input").value = 1;
    }
})

document.querySelector("#children input").addEventListener("click", () => {
    var value = document.querySelector("#children input").value;
    if (value < 0 || value==undefined) {
        document.querySelector("#children input").value = 0;
    }
})