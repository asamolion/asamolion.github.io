var tweetText = "https://twitter.com/intent/tweet?text=";

function getQuote() {
    $("#quote").html(
        '<i class="fa fa-spinner faa-spin animated" aria-hidden="true"></i>'
    );
    $.ajax({
        type: "GET",
        url: "http://proverbs-app.antjan.us/random",
        dataType: "json",
        success: function(data) {
            $("#quote").html('"' + data + '"');
            $("#twitter-button").attr("href", encodeURI(tweetText + data));
        }
    });
}

$(document).ready(getQuote());
