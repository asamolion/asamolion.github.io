function setCategory1Score() {
    var total = 0;

    total += parseInt($('#question1').val());
    total += parseInt($('#question2').val());
    total += parseInt($('#question3').val());
    total += parseInt($('#question4').val());
    total += parseInt($('#question5').val());
    total += parseInt($('#question6').val());
    total += parseInt($('#question7').val());
    total += parseInt($('#question8').val());


    $('#cat1Score').val(total);
}

function setCategory2Score() {
    var total = 0;

    total += parseInt($('#question11').val());
    total += parseInt($('#question12').val());
    total += parseInt($('#question13').val());
    total += parseInt($('#question14').val());
    total += parseInt($('#question15').val());
    total += parseInt($('#question16').val());
    total += parseInt($('#question17').val());
    total += parseInt($('#question18').val());

    $('#cat2Score').val(total);
}
// function to set the input value of relevant hidden input field depending upon the clicked list item
function setInputValue(that) {
    that = $(that);
    var questionId = '#question' + that.attr('data-question');
    // remove and set active class
    that.siblings().removeClass('active');
    that.addClass('active');
    // set input question value
    $(questionId).val(that.html());
    $(questionId).trigger('change');
}

$(document).ready(function () {
    $('.rating-list li').attr('onclick', 'setInputValue(this)');
    $('#category1Form').on('change', 'input[type="hidden"]', setCategory1Score);
    $('#category2Form').on('change', 'input[type="hidden"]', setCategory2Score);
});