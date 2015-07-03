$(window).load(function() {
    $('.flexslider').flexslider({pauseOnHover: true});
    if (window.innerWidth > 920 && window.innerWidth < 1300)
    {
        $('.slides li .sliderTitle').css('font-size', window.innerWidth * 0.030 + 'px');
    };

    $('.articleExpanderButton').click(function (){
    	$('.articleExpander').slideToggle();
        $('#FeaturedExpanderClose').toggle();
        $('#FeaturedExpanderOpen').toggle();
    });

    if ($('.articleExpander .articlePod').length > 3)
    {
        $('.articleExpanderButton').show();
    } else {
        $('.articleExpanderButton').hide();
    };

    $('.articlePod').click(function (){
        var url = $(this).find('.articlePodTitle a').attr('href');
        document.location.href= url;
    });
});

$(window).bind("resize", function (){
    if (window.innerWidth > 920 && window.innerWidth < 1300)
    {
        $('.slides li .sliderTitle').css('font-size', window.innerWidth * 0.030 + 'px');
    }
});

var GCP = {
    cancelAlert: function (){
        //do we need to make a service call to ensure alert is no longer shown?
        $('#homeAlertWrapper').slideUp();
    }
};