// ==UserScript==
// @name         Shotgun Slot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  zboub
// @author       JeanMax
// @match        https://projects.intra.42.fr/projects/*/slots
// @grant        none
// ==/UserScript==

var DRY_RUN = false,
    HOUR_MIN = 0,
    HOUR_MAX = 6,
    DAYS_ID_LIKE_TO_DO_STUFFS = [2];
  //  DAYS = ["Lundi-0", "Mardi-1", "Mercredi-2", "Jeudi-3", "Vendredi-4", "Samedi-5", "Dimanche-6"];


(function() {
    'use strict';
    window.onload = checkSlot();
})();

function sleep(ms) {
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
