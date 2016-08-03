'use strict';

(function renderMarkdown() {
  marked.setOptions({
    gfm: true
  });
  var mdDivs = document.getElementsByClassName('doc-markdown');
  for (var i=0;i<mdDivs.length;i++) {
    mdDivs[i].innerHTML = marked(mdDivs[i].innerText);
  }
}());
