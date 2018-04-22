$(document).ready(function() {
    $("#search-input").keydown(function(event) {
        // search when user presses enter
        if (event.keyCode == 13) {
            searchWiki();
        }
    });

    $("#search-button").click(searchWiki);
});

function searchWiki() {
    var searchInput = $("#search-input").val();
    var url =
        "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&callback=?&srlimit=50&srprop=titlesnippet|snippet|redirecttitle&srsearch=" +
        searchInput;

    $.getJSON(url, function(data) {
        var results = $("#results");
        results.html("");
        if (data.query.searchinfo.totalhits > 0) {
            for (var i = 0; i < 10; i++) {
                var a = $(
                    '<a href="' +
                        createWikiLink(data.query.search[i].title) +
                        '" target="_blank"></a>'
                );
                var div = $('<div class="result"></div>');
                a.append(div);
                div.append(
                    '<h2 class="title">' + data.query.search[i].title + "</h2>"
                );
                div.append(
                    '<p class="snippet">' +
                        data.query.search[i].snippet +
                        "</p>"
                );
                results
                    .hide()
                    .append(a)
                    .fadeIn().on;
            }
        }

        $("#page-selection")
            .hide()
            .bootpag({
                total: 5,
                maxVisible: 5,
                page: 1
            })
            .on("page", function(event, num) {
                results.html("");
                if (data.query.searchinfo.totalhits > 0) {
                    for (var i = num * 10 - 10; i < num * 10; i++) {
                        var a = $(
                            '<a class="animated bounceInUp" href="' +
                                createWikiLink(data.query.search[i].title) +
                                '" target="_blank"></a>'
                        );
                        var div = $('<div class="result"></div>');
                        a.append(div);
                        div.append(
                            '<h2 class="title">' +
                                data.query.search[i].title +
                                "</h2>"
                        );
                        div.append(
                            '<p class="snippet">' +
                                data.query.search[i].snippet +
                                "</p>"
                        );
                        results.append(a);
                    }
                }
            })
            .fadeIn(2000);
    });
}

function createWikiLink(title) {
    // returns a wikipedia url to redirect to given title
    title = title.replace(/ /g, "_");
    title = encodeURI(title);
    var link = "https://en.wikipedia.org/wiki/" + title;
    return link;
}
