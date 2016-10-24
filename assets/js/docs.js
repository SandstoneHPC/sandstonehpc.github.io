'use strict';

(function buildAnchorLinks() {
  var headings = $('h2,h3,h4');
  headings.each(function() {
    var link = this.id;
    var linkHTML = '<a href="#' + link + '">' + this.innerText + '</a>';
    this.innerHTML = linkHTML;
  });
}());
