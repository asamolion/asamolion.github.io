var osi;
(function (osi) {
    var FeeEstimator = (function () {
        function FeeEstimator() {
            var _this = this;
            //Textboxes
            this.CaseFee = $('#txtCaseFee');
            this.CaseFee.on('change', function () { _this.CalculatePrincipal(); _this.SetValues(); });
            this.Discount = $('#txtDiscount');
            this.Discount.on('change', function () { _this.OnDiscount_Changed(); });
            this.MinDownPayment = $('#txtMinDownPymt');
            this.MinDownPayment.on('change', function () { _this.OnMinDownPayment_Changed(); });
            this.Apr = $('#txtApr');
            this.Apr.on('change', function () { _this.OnApr_Changed(); });
            this.AprAfter = $('#txtAprAfter');
            this.AprAfter.on('change', function () { _this.OnApr_Changed(); });
            console.log(this.Principal);
            //Display Fields
            this.DisplayCaseFee = $('#DisplayCaseFee');
            this.DisplayInsDiscount = $('#DisplayInsDiscount');
            this.DisplayPrincipal = $('#DisplayPrincipal');
            this.DisplayTerm = $('#DisplayTerm');
            this.DisplayMthlyPymt = $('#DisplayMthlyPymt');
            this.DisplayDownPymt = $('#DisplayDownPayment');
            this.DisplayApr = $('#DisplayInterestRate');
            this.tooltip = $('<div id="tooltip" />').css({
                position: 'absolute',
                top: 0,
                left: 20
            });
            //sliders
            this.slDownPymt = $('#sDp');
            this.slDownPymt.on('change', function () { _this.OnDownPayment_Changed(); });
            this.slMthlyPymt = $('#sMth');
            this.slMthlyPymt.on('change', function () { _this.OnMonthlyPayment_Changed(); });
            this.slTerm = $('#sTerm');
            this.slTerm.on('change', function () { _this.OnTerm_Changed(); });
            //Set Default values
            this.CaseFee.val(4500);
            this.Discount.val(100);
            this.CalculatePrincipal();
            this.slDownPymt.val(1400);
            this.slTerm.val(24);
            this.SetMaxMonthlyPaymentAmount();
            this.CalculateMontlyPayment();
            //set the MaxMthValue
            //this.Refresh(this.slDownPymt);
            this.Refresh(this.slTerm);
            this.SetValues();
        }
        FeeEstimator.prototype.SetMaxMonthlyPaymentAmount = function () {
            var maxMthValue = 0;
            if (this.slTerm.val() > this.AprAfter.val()) {
                //without the downpayment.   Trying to figure out what the max value would be if the user set the down payment to zero
                var p = this.Principal;
                var r = (this.Apr.val() / 1200);
                var n = this.slTerm.val();
                //console.log(p + ' - ' + r + ' - ' + n + ' - ');
                maxMthValue = p * r / (1 - (Math.pow(1 / (1 + r), n)));
                console.log(maxMthValue);
            }
            else {
                maxMthValue = this.Principal / this.slTerm.val();
            }
            this.slMthlyPymt.prop('max', maxMthValue);
            this.Refresh(this.slMthlyPymt);
        };
        FeeEstimator.prototype.SetValues = function () {
            this.DisplayCaseFee.html(osi.toCurrencyString(this.CaseFee.val()));
            this.DisplayInsDiscount.html(osi.toCurrencyString(this.Discount.val()));
            this.DisplayPrincipal.html(osi.toCurrencyString(this.Principal));
            this.DisplayTerm.html(this.slTerm.val() + ' mths');
            this.DisplayMthlyPymt.html(osi.toCurrencyString(this.slMthlyPymt.val()));
            this.DisplayDownPymt.html(osi.toCurrencyString(this.slDownPymt.val()));
            //console.log(this.slTerm.val() + ' - ' + this.AprAfter.val());
            if (this.slTerm.val() > this.AprAfter.val())
                this.DisplayApr.html(this.Apr.val() + ' %');
            else
                this.DisplayApr.html('0 %');
        };
        //#region _Chanded
        FeeEstimator.prototype.OnMinDownPayment_Changed = function () {
            this.slDownPymt.prop('min', this.MinDownPayment.val());
            this.Refresh(this.slDownPymt);
        };
        //Called when Apr and AprAfter changed
        FeeEstimator.prototype.OnApr_Changed = function () {
            this.SetMaxMonthlyPaymentAmount();
            this.CalculateMontlyPayment();
            this.SetValues();
        };
        FeeEstimator.prototype.OnDiscount_Changed = function () {
            this.CalculatePrincipal();
            this.SetValues();
        };
        FeeEstimator.prototype.OnTerm_Changed = function () {
            this.SetMaxMonthlyPaymentAmount();
            this.CalculateMontlyPayment();
            this.SetValues();
        };
        FeeEstimator.prototype.OnDownPayment_Changed = function () {
            var dollars = osi.toCurrencyString(this.slDownPymt.val());
            $('#divDownPayment .dollarLabel').val(dollars);
            $("#divDownPayment .ui-slider-popup").html(dollars);
            $("#divDownPayment .ui-slider-handle").prop("title", dollars);
            this.slDownPymt.prop('step', 50);
            this.CalculateMontlyPayment();
            this.SetValues();
        };
        FeeEstimator.prototype.OnMonthlyPayment_Changed = function () {
            this.DisplayMthlyPymt.html(osi.toCurrencyString(this.slMthlyPymt.val()));
            this.slMthlyPymt.prop('step', 5);
            this.CalculateDownPayment();
            this.SetValues();
        };
        //#endregion
        FeeEstimator.prototype.CalculatePrincipal = function () {
            console.log(this.CaseFee.val());
            var newPrincipal = this.CaseFee.val() - this.Discount.val();
            this.Principal = newPrincipal;
            this.slDownPymt.prop('max', newPrincipal);
            this.slDownPymt.slider('refresh');
        };
        FeeEstimator.prototype.CalculateDownPayment = function () {
            var _this = this;
            //formula :: dp = p - ( dp * t)
            var newDownPayment = this.Principal - (this.slMthlyPymt.val() * this.slTerm.val());
            //turn the step off when setting teh downPayment value.
            this.slDownPymt.prop('step', .01);
            //console.log(newDownPayment);
            this.UpdateSlider(this.slDownPymt, newDownPayment);
            this.slDownPymt.on('change', function () { _this.OnDownPayment_Changed(); });
            this.SetValues();
        };
        FeeEstimator.prototype.CalculateMontlyPayment = function () {
            var _this = this;
            var newMonthlyPymt = 0;
            console.log(this.slTerm.val());
            if (this.slTerm.val() > this.AprAfter.val()) {
                var p = this.Principal - this.slDownPymt.val();
                var r = (this.Apr.val() / 1200);
                var n = this.slTerm.val();
                console.log(p + ' - ' + r + ' - ' + n + ' - ');
                newMonthlyPymt = p * r / (1 - (Math.pow(1 / (1 + r), n)));
                console.log(newMonthlyPymt);
            }
            else {
                //Formula  :: mp = (p-dp) / t
                newMonthlyPymt = (this.Principal - this.slDownPymt.val()) / this.slTerm.val();
            }
            this.DisplayMthlyPymt.html(osi.toCurrencyString(newMonthlyPymt));
            this.slMthlyPymt.prop('step', .01);
            this.UpdateSlider(this.slMthlyPymt, newMonthlyPymt);
            this.slMthlyPymt.on('change', function () { _this.OnMonthlyPayment_Changed(); });
        };
        ///
        FeeEstimator.prototype.Refresh = function (slider) {
            slider.slider('refresh');
        };
        FeeEstimator.prototype.UpdateSlider = function (slider, newValue) {
            slider.off('change');
            slider.val(newValue);
            this.Refresh(slider);
        };
        return FeeEstimator;
    })();
    osi.FeeEstimator = FeeEstimator;
    function toCurrencyString(num) {
        //console.log(num);
        var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
        if (str.indexOf(".") > 0) {
            parts = str.split(".");
            str = parts[0];
        }
        str = str.split("").reverse();
        for (var j = 0, len = str.length; j < len; j++) {
            if (str[j] != ",") {
                output.push(str[j]);
                if (i % 3 == 0 && j < (len - 1)) {
                    output.push(",");
                }
                i++;
            }
        }
        formatted = output.reverse().join("");
        return ("$" + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
    }
    osi.toCurrencyString = toCurrencyString;
    ;
})(osi || (osi = {}));
//# sourceMappingURL=ContractEstimator.js.map