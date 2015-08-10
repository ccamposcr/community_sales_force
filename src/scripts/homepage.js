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
    flexDirectionNavHover();
});

var GCP = {
    cancelAlert: function (){
        //do we need to make a service call to ensure alert is no longer shown?
        $('#homeAlertWrapper').slideUp();
    }
};

var flexDirectionNavHover = function(){
    var _slides = $('.flexslider'),
        slideWidth = _slides.width(),
        slideHeight = _slides.height();

    _slides.on('mouseenter mouseover mousemove', function(e){
        //console.log('e.offsetX ' + e.offsetX + '  e.offsetY ' + e.offsetY );
        
        /*if( $(e.target).hasClass('sliderTitle') || $(e.target).hasClass('sliderSubhead') || $(e.target).hasClass('sliderCategory') ){
            $('.flexslider .flex-direction-nav a').css('opacity', 0);
        }
        else{*/
            console.log(e.clientX);
            if(e.clientX < slideWidth/2 && e.offsetY <= slideHeight ){
                //console.log('PREV ' + e.offsetX+' offsetX < slideWidth/2 ' + slideWidth/2 +'   &&    ' + e.offsetY + ' offsetY <= ' + slideHeight + ' slideHeight');
                $('.flexslider .flex-direction-nav a.flex-next').css('opacity', 0);
                $('.flexslider .flex-direction-nav a.flex-prev').css('opacity', 1);   
            }
            else if( e.clientX > slideWidth/2 && e.offsetY <= slideHeight ) {
                //console.log('NEXT ' + e.offsetX+' offsetX > slideWidth/2 ' + slideWidth/2 +'   &&    ' + e.offsetY + ' offsetY <= ' + slideHeight + ' slideHeight');
                $('.flexslider .flex-direction-nav a.flex-prev').css('opacity', 0);
                $('.flexslider .flex-direction-nav a.flex-next').css('opacity', 1);
            }
        //}
    }).on('mouseleave', function(){
        $('.flexslider .flex-direction-nav a').css('opacity', 0);
    });
}