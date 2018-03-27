// ==UserScript==
// @name         Take another Slot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  zboub
// @author       JeanMax
// @match        https://projects.intra.42.fr/*/mine
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload = takeAnotherSlot();
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeAnotherSlot() {
    var button;

    await sleep((1 + Math.random()) * 3 * 1e4); // random delay between 30 and 60 seconds
    button = document.getElementsByClassName("btn btn-primary btn-block")[0];
    if (button) {
        button.click();
    }

    //... wut?
    await sleep((1 + Math.random()) * 3 * 1e4); // random delay between 30 and 60 seconds
    console.log("something went wrong, reloading");
    location.reload();
}
