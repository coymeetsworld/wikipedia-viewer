$(document).ready(function () {

  function clearPreviousResults() {
    $("#search_results a").remove();
  }

  function searchWiki(search_query) {
    var wiki_api_call = "https://en.wikipedia.org/w/api.php?callback=?&action=opensearch&limit=10&namespaces=0&format=json&redirects=resolve&search=" + search_query;
    console.log("wiki_api_call: " + wiki_api_call);

    clearPreviousResults();
    $.getJSON(wiki_api_call, function(data) {

      /* Only showing the first 10 entries. */
      for (var i = 0; i < 10; i++) {
        console.log(data[1][i] + ": " + data[2][i]);
        console.log(data[3][i]);

        var wiki_url = $('<a>');
        wiki_url.attr('href', data[3][i]);
        wiki_url.attr('target', '_blank');

        wiki_url.html("<p class=\"wiki_title\">"+data[1][i] + "</p>: " + data[2][i]);
        wiki_url.appendTo("#search_results");
      }

    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("textStatus: " + textStatus);
    });
  }

  /* Specify action for search button */
  $("#search").click(function() {
    console.log("Search requested");
    searchWiki(document.getElementById("wiki_search_query").value);
  });

  /* Bind Enter key on search bar, should perform same function as clicking search button. */
  $("#wiki_search_query").bind("keypress", function(event) {
    if(event.which == 13) {
      event.preventDefault();
      searchWiki(document.getElementById("wiki_search_query").value);
    }
  });

});
