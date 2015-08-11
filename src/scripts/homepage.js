$(window).load(function() {
    $('.flexslider').flexslider({
                                pauseOnHover: true,
                                animationLoop: true
                            });
    
    $('.sliderTitle').on('hover', function(){
       $('.flex-prev, .flex-next').attr('opacity',0);
    });

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
    flexDirectionNavHover();
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

var flexDirectionNavHover = function(){
    var _slides = $('.flexslider'),
        _noHoverableArea = $('.sliderTitle, .flex-control-nav'),
        slideWidth = _slides.width(),
        slideHeight = _slides.height(),
        isHoverText = false;

    _slides.on('mouseenter mouseover mousemove', function(e){
        if( !isHoverText){
          if(e.clientX < slideWidth/2 && e.offsetY <= slideHeight ){
                $('a.flex-next').css('opacity', 0);
                $('a.flex-prev').css('opacity', 1);   
            }
            else if( e.clientX > slideWidth/2 && e.offsetY <= slideHeight ) {
                $('a.flex-prev').css('opacity', 0);
                $('a.flex-next').css('opacity', 1);
            }  
        }
        else{
            $('.flex-direction-nav a').css('opacity', 0);
        }
    }).on('mouseleave', function(){
        $('.flex-direction-nav a').css('opacity', 0);
    }).on('click', function(e){
        if( (!isHoverText) && (!$(e.target).hasClass('flex-prev')) && (!$(e.target).hasClass('flex-next')) ){
            if(e.clientX < slideWidth/2 && e.offsetY <= slideHeight ){
                _slides.flexslider("prev");
            }
            else if( e.clientX > slideWidth/2 && e.offsetY <= slideHeight ) {
                _slides.flexslider("next");
            }  
        }
    });

    _noHoverableArea.on('mouseenter mouseover mousemove', function(){
        isHoverText = true;
    }).on('mouseleave', function(){
        isHoverText = false;
    });
}