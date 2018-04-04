// ==UserScript==
// @name         Shotgun Slot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  zboub
// @author       JeanMax
// @match        https://projects.intra.42.fr/projects/*/slots
// @grant        none
// ==/UserScript==

var DRY_RUN = true,
    /*
      in dry-run mode, the script won't confirm the slot
    */

    HOUR_MIN = 14,
    /*
      minimum hour (24h format) to take a slot

      exemple: don't take any slot before 2pm -> HOUR_MIN = 14
      note: a slot at 14:00 would be accepted
    */

    HOUR_MAX = 21,
    /*
      maximum hour (24h format) to take a slot

      exemple: don't take any slot after 9pm -> HOUR_MAX = 21
      note: a slot at 21:45 would be accepted
     */

    DAYS_ID_LIKE_TO_DO_STUFFS = [0, 4];
    /*
      which day(s) should we be watching?
       days from 0 to 6:
        0 -> Monday
        1 -> Tuesday
        2 -> Wednesday
        3 -> Thursday
        4 -> Friday
        5 -> Saturday
        6 -> Sunday

       exemple: Monday and Friday -> DAYS_ID_LIKE_TO_DO_STUFFS = [0, 4]
    */


(function() {
    'use strict';
    window.onload = checkSlot();
})();

function sleep(ms) {
    console.log("sleeping for " + parseInt(ms / 1000) + "s");
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkSlot() {
    var day, hour, hour_array,
        slot = false,
        button = false,
        events = [];

    await sleep((1 + Math.random()) * 3 * 1e4); // random delay between 30 and 60 seconds
    events = document.getElementsByClassName("fc-time-grid-event");

    for (day = 0; day < events.length; day++) {
        if (day in DAYS_ID_LIKE_TO_DO_STUFFS) {
            hour_array = events[day].getElementsByClassName("fc-time")[0]
                                    .getAttribute("data-full")
                                    .split(" ");
            hour = parseInt(hour_array[0]);
            if (hour_array[1] === "PM") {
                hour += 12;
            }
            if (hour >= HOUR_MIN && hour <= HOUR_MAX) {
                slot = events[day];
                break;
            }
        }
    }

    if (slot) {
        slot.click();
        console.log("shot...");
        await sleep(1000);
        if (DRY_RUN) {
            button = document.getElementsByClassName("btn btn-default")[0];
        } else {
            button = document.getElementsByClassName("btn btn-primary")[0];
        }
        if (button) {
            button.click();
            console.log("...gun!");
        }
    }

    await sleep((1 + Math.random()) * 3 * 1e4); // random delay between 30 and 60 seconds
    console.log("reloading");
    location.reload();
}
