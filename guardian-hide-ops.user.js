// ==UserScript==
// @name         Guardian Hide Opinions
// @namespace    https://www.theguardian.com
// @version      0.1
// @description  Hide Opinion Pieces from The Guardian
// @author       TomR.me
// @match        https://www.theguardian.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  document.querySelector('.pillar-link.pillar-link--Opinion').parentElement.style.display = 'none';
  document.querySelector('#opinion').style.display = 'none';

  for(let article of document.querySelectorAll('.fc-item--pillar-opinion')) {
      article.parentElement.style.display = 'none';
      //article.parentElement.setAttribute('onhover', 'this.style.filter="blur(0px)"');
  }
})();

