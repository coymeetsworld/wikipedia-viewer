
const WIKI_API = "https://en.wikipedia.org/w/api.php?callback=?&action=opensearch&limit=10&namespaces=0&format=json&redirects=resolve&search=";
const MAX_RESULTS_TO_DISPLAY = 10;
const WIKIPEDIA_ARTICLE_NAME_INDEX = 1;
const WIKIPEDIA_ARTICLE_DESC_INDEX = 2;
const WIKIPEDIA_ARTICLE_LINK_INDEX = 3;

const clearPreviousResults = () => {
  $("#search_results a").remove();
}

const searchWiki = (query) => {

  clearPreviousResults();
  $.getJSON(WIKI_API + query, (data) => {

    for (let i = 0; i < MAX_RESULTS_TO_DISPLAY; i++) {
      console.log(data[WIKIPEDIA_ARTICLE_NAME_INDEX][i] + ": " + data[WIKIPEDIA_ARTICLE_DESC_INDEX][i]);
      console.log(data[WIKIPEDIA_ARTICLE_LINK_INDEX][i]);

      let wikiURL = $('<a>');
      wikiURL.attr('href', data[WIKIPEDIA_ARTICLE_LINK_INDEX][i]);
      wikiURL.attr('target', '_blank');

      wikiURL.html(`<p class="wiki_title">${data[WIKIPEDIA_ARTICLE_NAME_INDEX][i]}</p>: ${data[WIKIPEDIA_ARTICLE_DESC_INDEX][i]}`);
      wikiURL.appendTo("#search_results");
    }

  }).fail((jqXHR, textStatus, errorThrown) => {
    console.log("Error: " + errorThrown);
    console.log("textStatus: " + textStatus);
  });
}

/* Specify action for search button */
$("#search").click(() => {
  console.log("Search requested");
  searchWiki(document.getElementById("wiki_search_query").value);
});

/* Bind Enter key on search bar, should perform same function as clicking search button. */
$("#wiki_search_query").bind("keypress", (ev) => {
  if (ev.which === 13) {
    ev.preventDefault();
    searchWiki(document.getElementById("wiki_search_query").value);
  }
});