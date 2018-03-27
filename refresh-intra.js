// ==UserScript==
// @name         Auto-Refresh Intra
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       JeanMax
// @match        https://profile.intra.42.fr/
// @grant        none
// ==/UserScript==

var SECONDE = 1e3,
    MINUTE = SECONDE * 60;

(function() {
    'use strict';
    setInterval(refresh, 1 * MINUTE);
})();

function refresh() {
    console.log("reloading...");
    location.reload();
}
