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




        // Check if all select boxes are set to "All" or empty
        var allEmpty = true;
        $.each(selectValues, function(key, value) {
            if (value !== "" && value !== "All") {
                allEmpty = false;
                return false; // Exit the loop early
            }
        });

         if (allEmpty) 
         {
            $('.camp_card_main').css({'opacity':'1','pointer-events':'all'});
            $('.ajax-loader').css({'display':'none','pointer-events':'all'});
           
            return false;
            
         }


         // Construct the URL with form data appended
    
        // var url = window.location.href + '?';
        // $.each(selectValues, function(key, value) {
        //     url += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        // });
        // // Remove the trailing "&" from the URL
        // url = url.slice(0, -1);

        // // Update the browser's address bar
        // window.history.pushState(null, null, url);

        //console.log(url)



        var url = window.location.href;
        var baseUrl = url.split('?')[0];

        // Construct the new query string
        var newQueryString = $.map(selectValues, function(value, key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }).join('&');

        // Construct the new URL with only the new query string
        var newUrl = baseUrl + '?' + newQueryString;

        // Update the browser's address bar
        window.history.pushState(null, null, newUrl);

        console.log(newUrl);




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
                    $('.ajax-loader').css({'display':'none'});
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
