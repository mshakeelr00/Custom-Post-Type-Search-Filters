jQuery(document).ready(function($) {
    $('#custom-search-filter').submit(function(event) {
        event.preventDefault();

        $('.ajax-loader').css("display","block");


        $('.camp_card_main').css({'opacity':'0.5','pointer-events':'none'});



        // Collect values of all select boxes
        var selectValues = {};
        $('select').each(function() {
            var selectName = $(this).attr('name');
            var selectValue = $(this).val();
            selectValues[selectName] = selectValue;
        });

        // Add other form data if needed
        var formData = $(this).serializeArray();
        formData.push({ name: 'selectValues', value: JSON.stringify(selectValues) });
       console.log(formData);
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'custom_ajax_action', // AJAX action defined in PHP
                formData: formData,
            },
            success: function(response) {
                // Handle successful response
                $('.camp_card_main').css({'opacity':'1','pointer-events':'all'});
                $('.camp_card_main').empty().append(response);

                $('.paginatelinks').empty();

                
                //console.log(response);
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error(error);
            }
        });
    });
});
