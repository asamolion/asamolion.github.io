$('#div-other-material').hide(250);

$(document).ready(function () {
    var form = document.getElementById('lazer-cutter-form'),
        $form = $(form),
        elements = form.elements,
        buttons = $('.btn.btn-primary');

    var fieldsets = $('fieldset');

    fieldsets.hide();
    $(fieldsets[0]).show();

    $('button#nextStep1').on('click', function () {
        let validity = validator.element(elements.name) &&
            validator.element(elements.business) &&
            validator.element(elements.email) &&
            validator.element(elements.description &&
                validator.element(elements.disclaimer));
        if (validity) {
            $(fieldsets[0]).fadeOut(250, function () {
                $(fieldsets[1]).fadeIn(250);
            });
        }
    });

    // Set transitions for objects
    var transitionObject = {
        "prevStep2": [1, 0],
        "nextStep2": [1, 2],
        "prevStep3": [2, 1],
        "nextStep3": [2, 3],
        "prevStep4": [3, 2],
        "nextStep4": [3, 4],
        "prevStep5": [4, 3]
    };
    $.each(transitionObject, function (property, value) {
        $('button#' + property).on('click', function () {
            $(fieldsets[value[0]]).fadeOut(250, function () {
                $(fieldsets[value[1]]).fadeIn(250);
            });
        });
    })
    
    $(elements.material).on('change', function () {
        $('#div-other-material').hide(250); // hide other material
        var colour = $(elements.colour),
            thickness = $(elements.thickness),
            cost = $(elements.cost);

        if (elements.material.value == 'perspex') {
            colour.html('<option value="clear">Clear</option><option value="clear-frosted">Clear Frosted</option>');
            thickness.val(3);
            cost.value = 10;
        } else if (elements.material.value == 'perspex-coloured') {
            colour.html('') // clear colours
            // set the colours
            let colours = ['Red', 'Yellow', 'Lime', 'Green', 'Sky Blue', 'Royal Blue', 'White', 'Black', 'Purple', 'Turquoise', 'Orange', 'Grey'];
            colours.forEach(function (current) {
                colour.append('<option value="' + current.toLowerCase() + '">' + current + '</option>');
            });
            thickness.val(3); // set the thickness
            cost.val(10);
        } else if (elements.material.value == 'wood-mdf') {
            colour.html(''); // clear ccolour
            cost.val(5); // set the cost
            thickness.val(3);
        } else if (elements.material.value == 'wood-plywood') {
            colour.html(''); // clear colour
            cost.val(6);
            thickness.val(3);
        } else if (elements.material.value == 'custom-board') {
            colour.html('<option value="various">Various</option>');
            cost.val(5);
            thickness.val(1.4);
        } else if (elements.material.value == 'other') {
            $('#div-other-material').show(250);
            cost.val(0);
            colour.html('');
            thickness.val('');
        } else {
            colour.html('');
            thickness.val('');
        }
        // Set the final cost
        $(elements['material-cost']).val($(elements.cost).val());
    });

    $('#engraving, #engraving-artwork-size').on('change', function () {
        $(elements['engraving-time']).val(timetable[$('#engraving-artwork-size').val()][$('#engraving').val()]);
        $(elements['laser-engraving-cost']).val($(elements['engraving-time']).val() * 1);
    });
    $('#cutting, #cutting-artwork-size').on('change', function () {
        $(elements['cutting-time']).val(timetable[$('#cutting-artwork-size').val()][$('#cutting').val()]);
        $(elements['laser-cutting-cost']).val($(elements['cutting-time']).val() * 0.5);
    });

    // Colour change event handler 
    $(elements.colour).on('change', function () {
        $(elements.colour).css('background-color', $(elements.colour).val().split(' ').join(''));
        current = $(elements.colour).val();
        if (current == 'red' || current == 'green' || current == 'royal blue' || current == 'black' || current == 'purple' || current == 'grey') {
            $(elements.colour).css('color', 'white');
        } else {
            $(elements.colour).css('color', 'black');
        }
    });

    
    var validator = $form.validate({
        rules: {
            name: "required",
            business: "required",
            email: {
                required: true,
                email: true
            },
            description: "required",
            disclaimer: "required"
        },
        messages: {
            description: "Please enter a detailed description of what you require",
            disclaimer: "Please agree to our terms & conditions"
        }
    }); 
    // var validator = $form.validate();
});