(function($) {
    
function repaymentCalc() {
    var mortgageValue = parseFloat($('#mortgage').val(), 10); //principle / initial amount borrowed
    var term = parseFloat($('#term').val(), 10) * 12; //number of payments months
    var interestRate = parseFloat($('#rate').val(), 10) / 100 / 12; //monthly interest rate
    //monthly mortgage payment
    monthlyPayment = (repayment(mortgageValue, term, interestRate)).toFixed(2);
    totalPayment = (monthlyPayment * term).toFixed(2);
    totalInterest = (totalPayment - mortgageValue).toFixed(2);

    $('#monthly').val(monthlyPayment);
    $('#total').val(totalPayment);
    $('#interest').val(totalInterest);
}

function interestOnlyCalc() {
    var mortgageValue = parseFloat($('#mortgage').val(), 10); //principle / initial amount borrowed
    var term = parseFloat($('#term').val(), 10) * 12; //number of payments months
    var interestRate = parseFloat($('#rate').val(), 10) / 100 / 12; //monthly interest rate

    monthlyPayment = (interestOnly(mortgageValue, term, interestRate)).toFixed(2);
    totalPayment = (monthlyPayment * term + mortgageValue).toFixed(2);
    totalInterest = (totalPayment - mortgageValue).toFixed(2);

    $('#monthly').val(monthlyPayment);
    $('#total').val(totalPayment);
    $('#interest').val(totalInterest);
}

function repayment(p, n, i) {
    return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

function interestOnly(p, n, i) {
    return p * i;
}

$('#calc').change(function() {
    if ($('#calculationType').val() == 1) {
        repaymentCalc();
    } else {
        interestOnlyCalc();
    }
});

}(jQuery));