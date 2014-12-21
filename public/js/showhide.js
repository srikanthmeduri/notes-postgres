$(function() {

    $('.cor-icon').click(function() {   //form
        $('.collapse').collapse('toggle');
    });

    $("#toggled-show").click(function() {   //summary
        $(".summary-form").hide("slow");
    });

    $(".toggled").click(function() {    // menu icon
        $(".summary-form").show("slow");
    });

});
