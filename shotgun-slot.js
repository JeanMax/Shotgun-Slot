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
    HOUR_MIN = 16,
    HOUR_MAX = 19,
    DAYS_ID_LIKE_TO_DO_STUFFS = [0, 1, 2, 3, 4];
  //  DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];


(function() {
    'use strict';
    checkSlot();
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkSlot() {
    var day, hour, hour_array,
        slot = false,
        button = false,
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
            button = document.getElementsByClassName("send btn")[0];
        }
        if (button) {
            button.click();
            console.log("...gun!");
        }
    }

    await sleep((1 + Math.random()) * 1e4); // random delay between 10 and 20 seconds
    console.log("reloading");
    location.reload();
}
