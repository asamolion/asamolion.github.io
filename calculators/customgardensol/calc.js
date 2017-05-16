(function () {

    $('#measurement-btn-group').change(function () {
        if ($('input[name="measurement"]:checked').val() === 'rectangle') {
            $('#circle-parameters').fadeOut(function () {
                $('#rectangle-parameters').fadeIn();
            });

        } else {
            $('#rectangle-parameters').fadeOut(function () {
                $('#circle-parameters').fadeIn();
            });
        }
    });

    $('#calc').change(function () {
        if ($('input[name="measurement"]:checked').val() === 'rectangle') {
            var length = $('#length').val(),
                width = $('#width').val(),
                depth = $('#depth').val(),
                cubicYards = length * width * depth * 0.0031;
            $('#compost').val(cubicYards.toFixed(6));
        } else {
            var diameter = $('#diameter').val(),
                depth = $('#depth').val(),
                area = 3.14159 * Math.pow(diameter / 2, 2);
            cubicYards = area * depth * 0.0031;
            $('#compost').val(cubicYards.toFixed(6));
        }
    });
}());