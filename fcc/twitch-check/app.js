var streams = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "brunofin",
    "comster404"
];

var twitchClientId = "p9jxac6m9rt05kh1xg81qj7i0u6yg4";
var twitchClientSecret = "m8qqdyfgw8jnlzyc5ewxgnpbx1ga3f";

$(document).ready(function() {
    "use strict";
    var i = 0;

    streams.forEach(function(currentValue, index, array) {
        var notFound = false,
            unavailabe = false; // true if user does not exist

        $.getJSON(
            `https://wind-bow.gomix.me/twitch-api/streams/${currentValue}?callback=?`,
            function(data) {
                const stream = data.stream;
                debugger;
                if (stream) {
                    $("#onlineStream").append(
                        `<div class="stream">
                        <div class="col-xs-4 col-lg-2">
                            <img class="profile-pic img-responsive" src="${
                                stream.channel.logo
                            }" />
                        </div>
                        <div class=" col-xs-8 col-lg-3">
                            <a class="stream-name" href="${
                                stream.channel.url
                            }" target="_blank">${
                            stream.channel.display_name
                        }</a>
                        </div>
                        <div class=" col-lg-7 visible-lg">
                            <p class="stream-detail truncate">${
                                stream.channel.status
                            }</p>
                        </div>
                    </div>`
                    );
                } else {
                    $("#offlineStream").append(
                        `<div class="stream">
                        <div class="col-xs-4 col-lg-2">
                            <img class="profile-pic img-responsive" src="https://res.cloudinary.com/asamolion/image/upload/v1468071599/freecodecamp/question_mark.jpg" />
                        </div>
                        <div class=" col-xs-8 col-lg-3">
                            <a class="stream-name" href="javascript:void(0);" target="_blank">${currentValue}</a>
                        </div>
                        <div class=" col-lg-7 visible-lg">
                            <p class="stream-detail truncate">Offline</p>
                        </div>
                    </div>`
                    );
                }
            }
        );
    });
});
