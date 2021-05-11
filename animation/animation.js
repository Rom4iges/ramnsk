$( document ).ready(function() { 
    function bestAnimation(object, animationName, animationOffset, animationDuration, animationDelay){
        object.addClass('wow');
        object.addClass(animationName);
        object.attr( "data-wow-offset", animationOffset );
        object.attr( "data-wow-duration", animationDuration + "s" );
        object.attr( "data-wow-delay",  animationDelay + "s" );
    }
    flAnim=false;
    $(window).resize(function(){
        animate();
    });
    animate();
    function animate(){
        ww=$(document).innerWidth();
        if (ww>767 && !flAnim){
            flAnim=!flAnim;
            bestAnimation($('h2, h2 + p'),"fadeInDownOP",100,0.8,0);
            bestAnimation($('.foranimfics'),"fadeInRight",200,1,0);
            bestAnimation($('.imgpayal img'),"fadeInRight",300,1,0);
            bestAnimation($('.left-block, .imgdocs img, .left-cont'),"fadeInLeft",0,1,0);
            bestAnimation($('.right-block, .gmap, #main .man img'),"fadeInRight",0,1,0);
            bestAnimation($('.btntempl'),"fadeIn",0,1,0.5);
            bestAnimation($('.imgcard-about, .package img'),"fadeInLeft",200,1,0);
            bestAnimation($('.txtall, .bgstep1, .steps'),"fadeIn",100,1,0);
            bestAnimation($('.doc-df, .card, .material'),"fadeInUp",100,1,0);
            bestAnimation($('.imgmater img, .forimgsec img'),"fadeIn",300,1,0);
            
            
            /*bestAnimation($('.choose i, .press i, .leftbg, .form-block form'),"fadeIn",100,1.5,0);
            bestAnimation($('.imgabout img'),"fadeInUp",100,2,0);
            bestAnimation($('.imgabout i'),"fadeIn",100,1,2);
            bestAnimation($('.arrow-up, .arrow-bigleft'),"fadeIn",100,1.5,0.5);
            bestAnimation($('.play'),"fadeIn",100,1.5,1);
            bestAnimation($('.btntempl, .bggirl, .bgisk, .smoke'),"fadeIn",100,1.5,0);
            bestAnimation($('.arrow-lr'),"zoomIn",100,1,0);*/
            animobjs=$('.card-desc');
            for (i=0; i<animobjs.length; i++)
                bestAnimation(animobjs.eq(i),"zoomIn",100,0.5,i/4);

            animobjs=$('.secur');
            for (i=0; i<animobjs.length; i++)
                bestAnimation(animobjs.eq(i),"zoomIn",100,0.5,i/4);

            animobjs=$('.adv');
            for (i=0; i<animobjs.length; i++)
                bestAnimation(animobjs.eq(i),"zoomIn",100,0.5,i/3);
 
            /*WOW.prototype.addBox = function(element) {
                this.boxes.push(element);
            };*/
            var wow = new WOW();
            wow.init();
            /*$('.wow').on('scrollSpy:exit', function() {
                $(this).css({
                    'visibility': 'hidden',
                    'animation-name': 'none'
                }).removeClass('animated');
                wow.addBox(this);
            }).scrollSpy();*/       
        }
    }
    
});