// ==UserScript==
// @name         AdGuard Home Hide Malware&Adult Charts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide the "Malware/Phishing" and "Adult" charts from the homepage of AdGuardHome
// @author       TomR.me
// @match        http://pi0.i.tomr.me/
// @icon         https://www.google.com/s2/favicons?domain=adguard.com
// @grant        none
// ==/UserScript==

console.log('[AGHHMAC] Running and waiting for the dash to load');

window.AGHHMAC__things = function() {
    console.log('[AGHHMAC] Called');

    if(window.location.hash !== '') return;

    let AGHHMAC__loop = window.setInterval(function() {
        if(document.querySelector('.dashboard')) {
            console.log('[AGHHMAC] Changing things');

            document.querySelector('.dashboard .card-value-stats.text-green').parentElement.parentElement.parentElement.parentElement.remove();
            document.querySelector('.dashboard .card-value-stats.text-yellow').parentElement.parentElement.parentElement.parentElement.remove();

            document.querySelector('.dashboard .col-sm-6.col-lg-3:first-of-type').className = 'col-sm-6 col-lg-6';
            document.querySelector('.dashboard .col-sm-6.col-lg-3:last-of-type').className = 'col-sm-6 col-lg-6';

            clearInterval(AGHHMAC__loop);
        }
    }, 50);


}

window.onhashchange = window.AGHHMAC__things;

window.AGHHMAC__things();
