// ==UserScript==
// @name         Hattons.co.uk Wishlist Totaler
// @namespace    https://www.hattons.co.uk/users/yourwishlist.aspx
// @version      0.1
// @description  Tot up all the prices for the bits and bobs on your Hattons Model Railway wishlist.
// @author       dnomaid.co.uk
// @url          https://github.com/mrdnomaid/userscripts
// @match        https://www.hattons.co.uk/users/yourwishlist.aspx
// @license      CC-BY-SA-4.0
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // DNOMAID.CO.UK 2018
    // Works on your own wishlist at https://www.hattons.co.uk/users/yourwishlist.aspx

    // https://gist.github.com/mrdnomaid/00c5a0a7451bae3d99c6b3eb1cca3d2e

    const cols = document.querySelectorAll('#ctl00_MainContent_grdItems tr td:nth-child(3):not(.hidden-xs)'); // The price column
    const quants = document.querySelectorAll('#ctl00_MainContent_grdItems tr td:nth-child(4):not(.hidden-xs) input'); // The quanity wanted column
    const quantsBought = document.querySelectorAll('#ctl00_MainContent_grdItems tr td:nth-child(5):not(.hidden-xs) input'); // The quanity bought column
    let total = 0; // Running price total
    let itemCount = 0; // Running total of items

    let i = -1; // Iterator to get quants
    for (let col of cols) {
        i++;
        if(col.innerHTML.indexOf('£') >= 0) { // Only do stuff on ones that have a price
            let matchedPrice = col.innerHTML.match(/£[0-9]+[\.]?[0-9]*/g)[0]; // Regex to match only the prices (not any of the text)
            let quant = parseInt(quants[i].value - quantsBought[i].value); // Quanity of items needed (takes away the # of bought)
            if(quant < 0) { // Make sure we don't multiply a price by a negative number
                quant = 0;
            }
            let wQuant = parseFloat(matchedPrice.replace(/\£/g,'') * quant); // Price for the quanity

            itemCount += quant;
            total += wQuant;
            col.innerHTML += `<span style="font-size: 90%; opacity: 0.8;"><br>Price for ${quant}: <b>£${wQuant}</b><br>Running Total: <b>£${total}</b></span>`; // Add info under the price
            // console.log(`Price: £${matchedPrice} | Quantity: ${quant} | Total for ${quant}: £${wQuant} | Running Total: £${total}`);
        }
    }

    // Add extra rows to table with final information
    document.querySelector('#ctl00_MainContent_grdItems tbody').innerHTML += `<tr valign="top"><td>&bull;</td><td>Total of All Items</td><td><b>£${total}</b></td><td align="center">&bull;</td><td align="center">&bull;</td><td align="center">&bull;</td></tr>`;
    document.querySelector('#ctl00_MainContent_grdItems tbody').innerHTML += `<tr valign="top"><td>&bull;</td><td>Number of Items (inc quantity)</td><td><b>${itemCount}</b></td><td align="center">&bull;</td><td align="center">&bull;</td><td align="center">&bull;</td></tr>`;
})();
