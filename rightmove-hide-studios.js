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

(function() {
    'use strict';

    console.log('the script is running you dummy');

    // Your code here...
    if(document.getElementById('propertySearch-results-container')) {
        const allResults = document.querySelectorAll('.l-searchResult');
        console.info(`${allResults.length} search results on this page`)
        let hidden = 0;

        for(let result of allResults) {
            let description = document.querySelector(`#${result.id}`).innerText;
            if(description && description.toLowerCase().includes('studio')) {
                result.remove();
                //result.style.filter = 'blur(8px)';
                hidden++;
            }
        }

        console.info(`hidden ${hidden} of them`);
        document.querySelector('.searchHeader-title').innerHTML += `(<b>${allResults.length}</b> on this page, <b>${hidden}</b> studios hidden)`;
    } else {
        console.info('not on search page');
    }
})();
