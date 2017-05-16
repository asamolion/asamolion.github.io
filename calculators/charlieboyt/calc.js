(function() {
    function bytesToSize(bytes) {
        var sizes = ['b', 'MB', 'GB', 'TB'];
        if (bytes == 0) return 0;
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)));
        if (i == 0) return bytes + ' ' + sizes[i];
        return (bytes / Math.pow(1000, i)).toFixed(1) + ' ' + sizes[i];
    };

    for (var i = 1; i <= 60; i++) {
        $('#frequency').append($('<option></option>').val(i).html(i));
    }

    for (var i = 1; i <= 52; i++) {
        $('#weeks-per-year').append($('<option></option>').val(i).html(i));
    }

    $('#calc').change(function() {
        var resolution = $('input[name="resolution"]:checked').val(),
            frequency = $('#frequency').find(':selected').val(),
            imagesPerHour = 60 / frequency;
        dataPerHour = imagesPerHour * resolution;
        dataPerDay = dataPerHour * 10;
        dataPerWeek = dataPerDay * $('#days-per-week').find(':selected').val();
        dataPerYear = dataPerWeek * $('#weeks-per-year').find(':selected').val();

        $('#result').html(bytesToSize(dataPerYear));

    });
}());
