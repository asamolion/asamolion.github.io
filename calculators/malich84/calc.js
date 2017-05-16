(function () {

    $('#calc').change(function () {
        var loanAmount = ($('#loanAmount').val() + 880) / 1000, // add 880 for the processing fee
            loanTerm = $('#loanTerm').val() * 12, // multiply by 12 to get total no of months/periods
            interestRate = $('#interestRate').val() / 100 / 12, // get value in terms of monthly interest rate
            balloonPaymentPercent = $('#balloonPaymentPercent').val(),
            balloonPaymentValue = loanAmount * balloonPaymentPercent / 100;

        var term1 = (loanAmount - (balloonPaymentValue / Math.pow(1 + interestRate, loanTerm)));
        var term2 = interestRate / (1 - Math.pow(1 + interestRate, -loanTerm));

        var monthlyPayment = (term1 * term2).toFixed(2),
            weeklyPayment = (monthlyPayment / 4).toFixed(2),
            fortnightlyPayment = (monthlyPayment / 2).toFixed(2);


        if ($.isNumeric(monthlyPayment)) {
            $('#weeklyRepaymentDisplay').html('$ ' + weeklyPayment);
            $('#balloonPaymentValue').html('$ ' + balloonPaymentValue.toFixed(2));
            $('#balloonPaymentDisplay').html('$ ' + balloonPaymentValue.toFixed(2));

            $('#weeklyPaymentTable').html('$' + weeklyPayment);
            $('#fortnightlyPaymentTable').html('$' + fortnightlyPayment);
            $('#monthlyPaymentTable').html('$' + monthlyPayment);
        }
    });

}());