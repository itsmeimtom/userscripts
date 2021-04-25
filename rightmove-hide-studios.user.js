// ==UserScript==
// @name         Rightmove Hide Studios
// @namespace    https://www.rightmove.co.uk/
// @version      0.1
// @description  Hide all listings with "studio" in the description from Rightmove search results
// @author       TomR.me
// @match        https://www.rightmove.co.uk/*
// @icon         https://www.google.com/s2/favicons?domain=rightmove.co.uk
// @grant        none
// ==/UserScript==

let TM__RMInterval;
let TM__RMcurrentURL = window.location.search;

(function() {
    'use strict';

    //console.log('the script is running you dummy');

    TM__RMhideStudios();
})();

function TM__RMhideStudios() {
    'use strict';

    if(document.getElementById('propertySearch-results-container')) {
        const allResults = document.querySelectorAll('.l-searchResult');
        //console.info(`${allResults.length} search results on this page`);
        let properties = [];

        for(let result of allResults) {
            properties.push(result);
        }


        let hidden = 0;
        TM__RMInterval = window.setTimeout(function() {
            hidden = 0;
            for(let property of properties) {
                let description = document.querySelector(`#${property.id}`).innerText.toLowerCase();
                if(description.includes('studio') || description.includes('single room') || description.includes('share')) {
                    document.querySelector(`#${property.id} .property-hide-button`).click();
                    property.remove();
                    //result.style.filter = 'blur(8px)';
                    hidden++;
                }
            }
            //console.info(`hidden ${hidden} of them`);
            document.querySelector('.searchHeader-title').innerHTML += `(<b>${allResults.length}</b> on this page, <b>${hidden}</b> unseen studios hidden)`;
        }, 1000);
    } else {
        // console.info('not on search page');
    }
}

//window.addEventListener('popstate', function(e) {
//    clearInterval(TM__RMInterval);
//    TM__RMhideStudios();
//});

window.setInterval(function() {
    if(window.location.search !== TM__RMcurrentURL) {
        //console.log('url change, running again');
        clearInterval(TM__RMInterval);
        window.setTimeout(function(){TM__RMhideStudios()},250);
        TM__RMcurrentURL = window.location.search;
    }
}, 500);
