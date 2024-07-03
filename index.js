var totalMonthly = 0;
var totalAmount = 0;

function calculateMortgage() {
    var amount = parseFloat($("#mortgage-amount").val());
    var years = parseFloat($("#years").val());
    var rate = parseFloat($("#rate").val());
    var isRepayment = $("#repayment-checkbox").is(":checked");

    if (isNaN(amount) || isNaN(years) || isNaN(rate)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    var monthlyRate = rate / 100 / 12;
    var numberOfPayments = years * 12;

    if (isRepayment) {
        totalMonthly = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        totalAmount = totalMonthly * numberOfPayments;
    } else {
        totalMonthly = (amount * (rate / 100)) / 12;
        totalAmount = totalMonthly * numberOfPayments;
    }
}

$(document).ready(function() {
    // Initialize with results hidden
    $('.results-con').hide();

    $(".clearAll").click(function() {
        $("#mortgage-amount").val('');
        $("#years").val('');
        $("#rate").val('');
        $("#repayment-checkbox").prop('checked', false);
        $("#rates-checkbox").prop('checked', false);
        $('.results-con').hide();
        $(".calculator-img").show();
        $(".right-text").show();
    });   

  


    $("#calculate").click(function(event) {
        calculateMortgage();

        if(totalAmount != 0) {
            event.preventDefault();
            $(".calculator-img").hide();
            $(".right-text").hide();
            $('.results-con').show();
    
            $(".monthly-Amount").text('$' + totalMonthly.toFixed(2));
            $(".total-Amount").text('$' + totalAmount.toFixed(2));
        }
    });
});