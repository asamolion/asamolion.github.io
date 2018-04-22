(function() {
    "use strict";
    $("#getWeatherButton").hide();

    $.getJSON("https://ipapi.co/json", function(position) {
        var url =
            "https://api.openweathermap.org/data/2.5/weather?APPID=53ac88144e6ee627ad0ed85277545ff9";
        var apiCall = url + "&q=" + position.city;
        $.getJSON(apiCall, function(json) {
            setSkycon(parseInt(json.weather[0].id, 10));
            $("#location").html(json.name + ", " + json.sys.country);
            var temp = Math.round((json.main.temp - 273.15) * 100) / 100;
            $("#temp").html(
                temp +
                    '<span id="degree">&deg;</span><span id="FC" onclick="convert()">C</span>'
            );
            $("#condition").html(json.weather[0].main);
        });
    });
})();

// converts the temprature
function convert() {
    degree = $("#FC").html();
    value = parseFloat($("#temp").html());
    if (degree == "C") {
        F = value * 9 / 5 + 32;
        F = Math.round(F * 100) / 100;
        $("#temp").html(
            F +
                '<span id="degree">&deg;</span><span id="FC" onclick="convert()">F</span>'
        );
    } else {
        C = (value - 32) * 5 / 9;
        C = Math.round(C * 100) / 100;
        $("#temp").html(
            C +
                '<span id="degree">&deg;</span><span id="FC" onclick="convert()">C</span>'
        );
    }
}

function setSkycon(code) {
    "use strict";
    var skycons = new Skycons({
        color: "lightgrey"
    });

    if (code >= 200 && code <= 232) {
        skycons.add("icon", Skycons.SLEET);
    } else if ((code >= 300 && code <= 321) || (code >= 500 && code <= 531)) {
        skycons.add("icon", Skycons.RAIN);
    } else if (code >= 600 && code <= 622) {
        skycons.add("icon", Skycons.SNOW);
    } else if (code > 700 && code <= 781) {
        skycons.add("icon", Skycons.FOG);
    } else if (code == 800) {
        skycons.add("icon", Skycons.CLEAR_DAY);
    } else if (code >= 801 && code <= 804) {
        skycons.add("icon", Skycons.CLOUDY);
    } else {
        skycons.add("icon", Skycons.WIND);
    }

    skycons.play();
}
