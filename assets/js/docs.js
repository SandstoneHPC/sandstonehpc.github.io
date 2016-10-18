'use strict';

(function buildAnchorLinks() {
  var headings = $('h2,h3');
  headings.each(function() {
    var link = encodeURIComponent(this.innerText.toLowerCase());
    var linkHTML = '<a name="' + link + '" href="#' + link + '">' + this.innerText + '</a>';
    this.innerHTML = linkHTML;
  });
}());
