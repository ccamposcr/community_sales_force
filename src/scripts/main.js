
(function ($) {

	var AEAPP = {
        
		init: function(){
			//AEAPP.reformatDate( $('div.date') ); 

            //AEAPP.filterDate(); //this is the default filter. If no default is needed, remove.
            
            AEAPP.slickInit( $(".sort-list") ); //style select box
            AEAPP.slickInit( $(".category-list") );
            AEAPP.slickInit( $(".subcat-list") );
            AEAPP.slickInit( $(".region-list") );
            AEAPP.slickInit( $(".team-list") );
            AEAPP.evt_handlers(); //append event handlers 

            //remove duplicates from menus
            var value = $('select.sort-list').val();
            $('.sort-list .slickselect-option[data-value]').show();
            $('.sort-list .slickselect-option[data-value="' + value + '"]').hide();

            value = $('select.category-list').val();
            $('.category-list .slickselect-option[data-value]').show();
            $('.category-list .slickselect-option[data-value="' + value + '"]').hide();

            value = $('select.subcat-list').val();
            $('.subcat-list .slickselect-option[data-value]').show();
            $('.subcat-list .slickselect-option[data-value="' + value + '"]').hide();

            value = $('select.region-list').val();
            $('.region-list .slickselect-option[data-value]').show();
            $('.region-list .slickselect-option[data-value="' + value + '"]').hide();

            alue = $('select.team-list').val();
            $('.team-list .slickselect-option[data-value]').show();
            $('.team-list .slickselect-option[data-value="' + value + '"]').hide();

            //SalesForce is focusing on the search box at page load. Unfocus it.
            $('#searchInput').blur();
		},

        slickInit: function (arr){
            if (arr.length == 0) return;
            arr[0].SlickInstance = arr.SlickSelect();
        },
        
        evt_handlers: function(){
            
            //remove duplicates from menus
            $(".sort-list").on("change", function(){
                var value = $(this).val();
                $('.sort-list .slickselect-option[data-value]').show();
                $('.sort-list .slickselect-option[data-value="' + value + '"]').hide();                 
            });

            $(".category-list").on("change", function(){

                var value = $(this).val();
                $('.category-list .slickselect-option[data-value]').show();
                $('.category-list .slickselect-option[data-value="' + value + '"]').hide();    

                // SalesForce will rebuild the subcat select options on category seklect,
                // so we need to reset the SlickSelect menu div
                $('div.subcat-list').remove();
                $('select.subcat-list')[0].SlickInstance.SlickSelect.init();
            });

            $(".subcat-list").on("change", function(){
                var value = $(this).val();
                $('.subcat-list .slickselect-option[data-value]').show();
                $('.subcat-list .slickselect-option[data-value="' + value + '"]').hide();                 
            });

            $(".region-list").on("change", function(){
                var value = $(this).val();
                $('.region-list .slickselect-option[data-value]').show();
                $('.region-list .slickselect-option[data-value="' + value + '"]').hide();                 
            });

            $(".team-list").on("change", function(){
                var value = $(this).val();
                $('.team-list .slickselect-option[data-value]').show();
                $('.team-list .slickselect-option[data-value="' + value + '"]').hide();                 
            });
        },

		reformatDate: function(element){//this will reformat the date in the category column & prepare the date for sorting upon request
			 element.each(function() { 
                //changes the output to the format from comps
		        var dateFormat = $(this).text();
		        var domFormat = $.datepicker.formatDate('mm.dd.y', new Date(dateFormat)); 
                 
		        //changes the date to a numeric format used for comparison
                var returnAsNumber = $.datepicker.formatDate('yymmdd', new Date(dateFormat));
                var dateSort = Number(returnAsNumber);
                    
		        $(this).html(domFormat);
                $(this).attr("data-date", dateSort); //adds the numeric format as an attribute that can be used to sort/filter the results
	   		});
		}
    }
    
	$(document).on("ready", AEAPP.init);

}(jQuery));
