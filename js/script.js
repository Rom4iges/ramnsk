var isopen = false;
var isopenthank = false;
 
$( document ).ready(function() {
    hnow=$(window).scrollTop();
    widthWindow=$(window).outerWidth();
    heightWindow=$(window).outerHeight();

    if ($(".stick").length){

		var hBegin=0, hEnd=0;
		var hNow=Math.ceil($(window).scrollTop()), hPrev=hNow, f=0, f2=0, f3=0, topa=0;
		var widthStick=0;
		var forstick=$(".forstick"), pageL=$(".row_new");

	    $(window).scroll(function(){ 
	        scrollStick();
	    });

	    function scrollStick(){
	    	if ($(window).outerWidth()>767.97){
	        	menuHeight=$("header").innerHeight();
	        	stick=$(".stick");
	        	stickPar=stick.parent();
	        	windH=Math.min(
				  document.body.scrollHeight, document.documentElement.scrollHeight,
				  document.body.offsetHeight, document.documentElement.offsetHeight,
				  document.body.clientHeight, document.documentElement.clientHeight
				);
	        	if (stick.innerHeight()>windH){
	        		forstick.removeClass("psk");
	        		pageL.removeClass("align-items-start");
	        		offsetTop=-stick.innerHeight()+windH;
		            hBegin=Math.ceil($(".stick").parent().offset().top+$(".stick").innerHeight()-$(window).innerHeight());
		            hEnd=Math.ceil($(".stick").parent().offset().top+$(".stick").parent().innerHeight()-$(window).innerHeight());
		            topa=Math.ceil($(".stick").parent().innerHeight()-$(".stick").innerHeight()); 
		            hNow=Math.ceil($(window).scrollTop());                 
		            if (f2==1 && hNow<hEnd+offsetTop-menuHeight){
		                $(".stick").css("position", "fixed");
		                $(".stick").css("top", menuHeight);
		                $(".stick").width(widthStick);
		                f2=2;
		                f3=1;
		            }
		            else if (f==0 && hNow>hBegin && hNow<hEnd){        
		                $(".stick").css("position", "fixed");
		                $(".stick").css("top", offsetTop);
		                $(".stick").width(widthStick);                
		                f=1;
		                f3=0;
		            }
		            else if (f==1 && hNow<hEnd && f2==0 && hNow>hBegin){
		            	if (hNow<hPrev){
		            		$(".stick").css("position", "absolute");
		            		stopH=hNow-hBegin;
			                $(".stick").css("top", stopH); 
			                f=2;
		            	}
		            }
		            else if (f==1 && hNow<hEnd && f2==2 && hNow>hBegin){
		            	if (hNow>hPrev){
		            		$(".stick").css("position", "absolute");
		            		stopH=hNow-hBegin-offsetTop+menuHeight;
			                $(".stick").css("top", stopH); 
			                f=2;
		            	}
		            }
		            else if (f==2 && hNow<hEnd && f2==0){
		            	if (hNow-hBegin>=stopH){
		            		$(".stick").css("position", "fixed");
			                $(".stick").css("top", offsetTop);                
			                f=1;
			                f3=0;
		            	} else if(hNow-hBegin<=stopH+offsetTop-menuHeight){
		            		$(".stick").css("position", "fixed");
			                $(".stick").css("top", menuHeight);
			                f=1;
			                f2=1;
			                f3=1;
		            	}
		            }
		            else if (f==2 && hNow<hEnd && f2==2){
		            	if (hNow-hBegin-offsetTop<=stopH-menuHeight){
		            		$(".stick").css("position", "fixed");
			                $(".stick").css("top", menuHeight);                
			                f=1;
			                f3=1;
		            	} else if(hNow-hBegin-offsetTop>=stopH-offsetTop){
		            		$(".stick").css("position", "fixed");
			                $(".stick").css("top", offsetTop);
			                f=1;
			                f2=0;
			                f3=0;
		            	}
		            }
		            else if(hNow>=hEnd && f2==0){
		                $(".stick").css("position", "absolute");
		                $(".stick").css("top", topa+"px");
		                $(".stick").width(widthStick);
		                f2=1;            
		            }
		            else if(hNow<=hBegin && f==1 && f3==0){
		                 f=0;
		                 f2=0;
		                 $(".stick").attr("style", "");
		            }
		            else if(hNow<=hBegin+offsetTop-menuHeight && f==1 && f3==1){
		                 f=0;
		                 f2=0;
		                 $(".stick").attr("style", "");
		            }
		            hPrev=hNow;
		        }
		        else{
		        	forstick.addClass("psk");
		        	pageL.addClass("align-items-start");
		        }
	        }
	    }

	    function resizeSticker(){
	    	widthStick=$(".stick").innerWidth();
		    scrollStick();
		}
		resizeSticker();
		$(window).resize(function(){
		    resizeSticker();
		}); 
	}

    // drag_and_drop begin
    $(".drag_and_drop input[type='file']").on("change", handleInput);
    function handleInput(e){
        //handleFiles($(e.currentTarget).closest(".drag_and_drop"), e.currentTarget.files);
        addFiles($(e.currentTarget).closest(".drag_and_drop"), e.currentTarget.files);
    }
    let dropAreas = $(".drag_and_drop");
    $("body").on('dragenter dragover dragleave drop', preventDefaults);
    function preventDefaults(e){
        e.preventDefault();
        e.stopPropagation();
    }
    let isHighlight=false;
    let dataTransfer;
    //let dataTransfer=new ClipboardEvent('').clipboardData || new DataTransfer();
    dropAreas.on('dragenter dragover', highlight);
    dropAreas.on('dragleave drop', unhighlight);
    function highlight(e){
        isHighlight=true;
        let object=$(e.currentTarget);
        object.addClass('highlight');
    }
    function unhighlight(e){
        isHighlight=false;
        let object=$(e.currentTarget);
        setTimeout((object) => {
            if (!isHighlight)
                object.removeClass('highlight');
        }, 50, object);
    }
    dropAreas.on('drop', handleDrop);
    function handleDrop(e) {
        let dt = e.originalEvent.dataTransfer;
        let files = dt.files;
        $(e.currentTarget).find("input")[0].files=files;
        //handleFiles(e.currentTarget, files);
        addFiles(e.currentTarget, files);
    }
    /*function handleFiles(object, files) {
        console.log("handleFiles");
        addFiles(object, files);
        //([...files]).forEach(uploadFile);
    }*/
    $("body").on('click', '.files_names .btn_delete', deleteFile);
    function addFiles(object, files){
        let files_names=$(object).find(".files_names");
        for (let i=0; i<files.length; i++){
            console.log(files[i]);
            if(dataTransfer){
                dataTransfer.items.add(files[i]);
            }
            files_names.append("<div class='marker d-inline-flex align-items-center blue_theme'><span>"+files[i].name+"</span><div class='btn_delete btn_close_theme cp fsh'><div class='group_line pr trs'><div class='line_close'></div><div class='line_close'></div></div></div></div>");
            
        }
        if (dataTransfer)
            $(object).find("input")[0].files=dataTransfer.files;
        else $(object).find("input")[0].files=files;
        console.log($(object).find("input")[0].files);
    }
    function deleteFile(e){
        let fileElement=$(this).parent();
        let contanerFiles=fileElement.parent();
        let files=contanerFiles.children(".marker");
        let index=files.index(fileElement);
        let input=contanerFiles.closest(".drag_and_drop").find("input")[0];
        //let data = 'Здесь текст для файла или положите в переменную Blob';
        //let file = new File([data], 'primer.txt', {type: 'text/plain'});
        /*let dt = new ClipboardEvent('').clipboardData || new DataTransfer();
        for (let i=0; i<objFiles.length; i++){
            if (i!=index)
                dt.items.add(objFiles[i]);
        }*/
        if (dataTransfer){
        dataTransfer.items.remove(index);
        input.files=dataTransfer.files;
        }
        fileElement.remove();
        console.log(input.files);
        if (input.files.length==0)
            input.value=null;
        console.log(input.value);
    }


    /*function uploadFile(file) {
        let url = 'URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ'
        let formData = new FormData()
        formData.append('file', file)
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(() => {  })
        .catch(() => {  })
    }*/
    // end

    function setHeightHeader(){
        let hM=$(".menu_container").innerHeight();
        $(".height_menu").height(hM);
    }

    $(".lazy").lazy();
    $(".myLazy").each(function(ind, obj){
        thisL=$(obj);
        thisL.attr("style", thisL.attr("data-lazy"));
    });

    class ProgressRing extends HTMLElement {
        constructor() {
          super();
          this._stroke = this.getAttribute('stroke') || 'white';
          this._strokeWidth = this.getAttribute('stroke-width') || 1;
          this._radius = this.getAttribute('radius') ?? 10;
          this._normalizedRadius = this._radius - this._strokeWidth;
          this._progress = Number(this.getAttribute('progress')) ?? 0;
          this._progress=this._progress / 100;
          this._duration=Number(this.getAttribute('duration')) ?? 0;
          this._durationPassed=this._progress * this._duration;
          this._durationInterval = Number(this.getAttribute('duration-interval')) ?? 10;
          this._circumference = this._normalizedRadius * 2 * Math.PI;
          this._offset = this._circumference - (this._progress * this._circumference);
          this._root = this.attachShadow({mode: 'open'});
          this._root.innerHTML = `
            <svg
              height="${this._radius * 2}"
              width="${this._radius * 2}"
             >
               <circle
                 stroke="${this._stroke}"
                 stroke-dasharray="${this._circumference} ${this._circumference}"
                 style="stroke-dashoffset:${this._offset}; transform: rotate(-90deg); transform-origin: 50% 50%;"
                 stroke-width="${this._strokeWidth}"
                 fill="transparent"
                 r="${this._normalizedRadius}"
                 cx="${this._radius}"
                 cy="${this._radius}"
              />
            </svg>
          `;
          this._circle = this._root.querySelector('circle');
          this._progressFinishedEventName="progressFinished";
          this.stop = function(){
            //console.log("-------stop----------");
            this.setProgress(0);
            this._durationPassed=0;
            if (this.interval){
                clearInterval(this.interval);
                this.interval=undefined;
            }
          }
          this.start = function(duration=null){
                //console.log("-------start----------");
                this.stop();
                if (this._progress>=1)
                    this._progress=this.setProgress(0);
                if (duration){
                    this._duration=duration;
                }
                if (this._duration){
                    //console.log("_duration " +this._duration);
                    this.interval = setInterval(() => {
                        //console.log(this._progress);
                        this._durationPassed+=this._durationInterval;
                        this.setProgress(this._durationPassed/this._duration*100);
                        if (this._progress >= 1){
                            clearInterval(this.interval);
                            let event = new CustomEvent(this._progressFinishedEventName, {detail: this});
                            this.dispatchEvent(event);
                        }
                    }, this._durationInterval);
                } else this.setProgress(100);
            }
        }
        
        setProgress(percent) {
            this._progress=percent / 100;
            this._offset = this._circumference - (this._progress * this._circumference);
            this._circle.style.strokeDashoffset = this._offset; 
        }
      
        static get observedAttributes() {
          return ['progress', 'duration'];
        }
      
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name){
                case 'progress': this.setProgress(newValue); break;
                default: this["_"+name]=newValue;
            }
        }
    }
      
    window.customElements.define('progress-ring', ProgressRing);

    if ($(".forslides").length>0){
        //slick1
        $('.forslides.with_dots').each(function() {
            let slider=$(this);

            slider.on('init', function(event, slick){
                //console.log("init");
                //console.log(slick);
                activeVideo($(slick.$slides[slick.currentSlide]));
                let slider=slick.$slider.eq(0);
                progressRings=slider.parent().find(".progressRing");
                progressRings.on("progressFinished", (event) => {
                    let item=$(event.detail);
                    let slider=item.closest(".slider").children(".forslides");
                    if (!slider.hasClass("elements_is_hide"))
                        slider.slick("slickNext");
                    else {
                        //console.log("progressFinished startslide");
                        startSlide(slick.$slides.eq(0));
                    }
                });
                let firstDot=progressRings.eq(0);
                if (firstDot.length){
                    firstDot[0].start();
                }

                let videos=slider.find(".video");
                videos.on("loadedmetadata", function(){
                    //console.log("loadedmetadata");
                    let video=$(this), duration=video[0].duration*1000;
                    let slide=video.closest(".slide");
                    if (!slide.attr("duration"))
                        slide.attr("duration", duration);
                    if (!slide.hasClass("slick-cloned")){
                        let slideIndex=slide.attr("data-slick-index");
                        let progressRing=slide.closest(".forslides").siblings(".fordotsslider").find('.progressRing[slide-index="'+slideIndex+'"]');
                        progressRing.attr("duration", duration);
                    }
                });

                videos.on("loadeddata", function(){
                    //console.log("loadeddata");
                    let video=$(this);
                    let slide=video.closest(".slide");
                    if (slide.hasClass("slick-current")){
                        startSlide(slide, video);
                        /*let slideIndex=slide.attr("data-slick-index");
                        let progressRing=slide.closest(".forslides").siblings(".fordotsslider").find('.progressRing[slide-index="'+slideIndex+'"]');
                        video[0].play();
                        progressRing[0].start();*/
                    }
                });
            });

            let stroke=slider.attr("stroke-dots");
            if (stroke==undefined)
                stroke='';
            else stroke='stroke="'+stroke+'"';

            slider.slick({
                dots: true,
                appendDots: slider.siblings('.fordotsslider'),
                customPaging : function(slider, i) {
                    let slide = $(slider.$slides.get(i));
                    let duration=slide.attr("duration");
                    if (duration==undefined){
                        let video=slide.find(".video");
                        if (video.length>0){
                            video=video[0];
                            console.log(video.duration);
                            if (video.duration)
                                duration=video.duration*1000;
                            else duration=10000;
                        } else duration=5000;
                    }
                    
                    return `<progress-ring class="progressRing" ${stroke} slide-index="${i}" stroke-width="1.2" radius="17" duration="${duration}" duration-interval="40"></progress-ring>`;
                },
                infinite: true,
                speed: 400,
                centerMode: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                variableWidth: false
            });
        });


        $('.forslides.without_dots').each(function() {
            let slider=$(this);

            slider.slick({
                dots: false,
                appendDots: slider.siblings('.fordotsslider'),
                infinite: false,
                speed: 400,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                variableWidth: false
            });
        });

        $('.forslides').on('lazyLoaded', function (e, slick, image, imageSource){ 
            //image.parent().css('background-image', 'url("' + imageSource + '")');
            //image.attr('src', imageSource);
            slick.$slider.find("[data-lazy='"+imageSource+"']").attr("src", imageSource);
        });
        $('.forslides.with_dots').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            let slide = $(slick.$slides.get(currentSlide));
            stopSlide(slide);

            slide = $(slick.$slides.get(nextSlide));
            activeVideo(slide);
            startSlide(slide);
        });

        function activeVideo(slide){
            slide.find(".video").each(function(ind, obj){
                $(obj).find("[data-src]").each(function(ind, obj){
                    let thisSrc=$(obj);
                    thisSrc.attr("src", thisSrc.attr("data-src"));
                });
            });
        }

        function stopSlide(slide, videoEl){
            console.log("stopSlide");
            let video=videoEl ? videoEl : slide.find(".video");
            let slideIndex=slide.attr("data-slick-index");
            let progressRing=slide.closest(".forslides").siblings(".fordotsslider").find('.progressRing[slide-index="'+slideIndex+'"]');
            if (video.length>0){
                video[0].pause();
                setTimeout(() => {
                    video[0].currentTime = 0;
                }, 400); // 400 - slick speed
            }
            progressRing[0].stop();
        }

        function startSlide(slide, videoEl){
            console.log("startSlide");
            let video=videoEl ? videoEl : slide.find(".video");
            let slideIndex=slide.attr("data-slick-index");
            let progressRing=slide.closest(".forslides").siblings(".fordotsslider").find('.progressRing[slide-index="'+slideIndex+'"]');
            if (video.length>0){
                video[0].pause();
                video[0].currentTime = 0;
                video[0].play();
            }
            progressRing[0].start();
        }


        $(".slider .btnprev").click(function(){
            $(this).closest(".slider").children('.forslides').slick("slickPrev");
        });

        $(".slider .btnnext").click(function(){
            $(this).closest(".slider").children('.forslides').slick("slickNext");
        });
        

        function checkSlides() {
            $('.forslides').each(function (ind, el) {
                elemSl = $(el);
                slides = elemSl.children().children().children("*:not(.slick-cloned)");
                wcont = elemSl.innerWidth();
                if (slides.length>1 && slides.eq(0).outerWidth(true) != slides.eq(1).outerWidth(true)){
                    j=1;                
                    sumWidth=slides.eq(0).outerWidth(true);
                    while (j<slides.length && sumWidth<wcont){
                        sumWidth+=slides.eq(j).outerWidth(true);
                        j++;
                    }
                    if (sumWidth>wcont)
                        j--;
                    countscreen=j-1;
                }
                else {
                    wslide = slides.eq(0).outerWidth(true);
                    countscreen = wcont / wslide;
                }
                if (Math.abs(countscreen - slides.length) < 0.05) {
                    countscreen = Math.round(countscreen);
                }
                forbtnslider=elemSl.parent();
                while (forbtnslider.find(".forbtnslider, .fordotsslider").length==0)
                    forbtnslider=forbtnslider.parent();
                forbtnslider=forbtnslider.find(".forbtnslider, .fordotsslider");
                if (slides.length <= countscreen) {
                    elemSl.addClass("elements_is_hide");
                    forbtnslider.attr("style", "display: none !important;");
                } else {
                    elemSl.removeClass("elements_is_hide");
                    forbtnslider.attr("style", "");
                }
            });
        }
        checkSlides();
        $(window).resize(function(){
            checkSlides();
        });
    }

    $("[data-hover]").hover((event) => {
        let hoverObj=$(event.currentTarget);
        let classElHover=hoverObj.attr("data-hover");
        let color=classElHover.split("_")[1]+"_theme";
        let objScroll=$("."+classElHover).addClass(color);
        //hoverObj.closest(".rectagles").addClass("active_rect");
        let objScroll2=$(".rectagles [data-hover='"+classElHover+"']").eq(0).closest(".rectagles").addClass("active_rect");
        if (widthWindow<768){
            let needObj=hoverObj.hasClass("circle_hover") ? objScroll : objScroll2;
            scrollanimate(needObj, true, true, { position: "center"});
        }
        
    }, (event) => {
        let hoverObj=$(event.currentTarget);
        let classElHover=hoverObj.attr("data-hover");
        let color=classElHover.split("_")[1]+"_theme";
        $("."+classElHover).removeClass(color);
        //hoverObj.closest(".rectagles").removeClass("active_rect");
        $(".rectagles [data-hover='"+classElHover+"']").eq(0).closest(".rectagles").removeClass("active_rect");
    });

    $(".tabs").each(function() {
        activeTab($(this).children(".tab").eq(0), false);
    });

    $(".tab").on("click", function(){
        if (!$(this).hasClass("activetab"))
            activeTab($(this));
    });

    function activeTab(tab, withMap=true){
        let index=tab.parent().children(".tab").index(tab);
        tab.siblings(".activetab").removeClass("activetab");
        tab.addClass("activetab");
        console.log(index);
        if (withMap)
            activeMap(index);
    }
    
    function open(){
        if(isopen==false){
            isopen=true;
            $("body").addClass("active_menu");
            $(".menu-block").addClass("openmenu");
            $(".closeblock2").addClass("openblock");
        }
        else{
            isopen=false;
            $("body").removeClass("active_menu");
            $(".menu-block").removeClass("openmenu");
            $(".closeblock2").removeClass("openblock");
        }
    }
    $(".btnmenu, .menu-block .close_menu, .closeblock2").click(function(){
         open();
    });

    $(".menu-block li a").click(function(){
        if (isopen==true)
            open();
        if (scrollanimate(this))
            return false;
    });

    $(".about_col a").click(function(){
        if (scrollanimate(this))
            return false;
    });

    function resizeWindow(){
        setHeightHeader();
        /*if ($(window).outerWidth()>1320){
        }*/
    }
    resizeWindow();   

    $(window).resize(function(){
        widthWindow=$(window).outerWidth();
        heightWindow=$(window).outerHeight();				
        resizeWindow();
    });
    
    $(window).scroll(function(){	
        hnow=$(window).scrollTop();
    });
    
    function scrollanimate(object, scrollToObject=false, withAnim=true, settings={}){
        let position=settings.position ?? "top";
        if (scrollToObject)
            scrollObj=$(object);
        else{
            link=$(object).attr("href").split("#");
            if (link.length==2 && link[1]!="")
                scrollObj=$("#"+link[1]);
            else return false;
        }

        menuH=$("header").outerHeight(true);

        if (scrollObj.length>0){
            let scrollTop=scrollObj.offset().top;
            switch (position){
                case "top":
                    scrollTop+=-menuH;
                    break;
                case "center":
                    scrollTop+=(scrollObj.innerHeight()-heightWindow) / 2;
                    break;
                case "bottom":
                    scrollTop+=scrollObj.innerHeight()-heightWindow;
                    break;    
            }
            scrollTop+=1;
            if (withAnim)
                $("html, body").animate({
                    scrollTop: scrollTop
                }, 
                {
                    duration: 600,
                    easing: "swing"
                });
            else $("html, body").scrollTop(scrollTop);
            return true;
        }
        return false;
    }

    let splitPath=window.location.href.split("#");
    if (splitPath.length>1){
        scrollanimate("#"+splitPath[1], true);
    }



    function toggleForm(obj, duration=null, changeScroll=true, durationAnimation=300){
        console.log("toggleForm");
        console.log(obj);
        if (obj){
            let form;
            if (typeof obj == "string")
                form=$(obj);
            else {
                obj=$(obj);
                if (obj.prop("tagName").toLowerCase()=="a")
                    form=$(obj.attr("href"));
                else if (obj.attr("data-form"))
                    form=$(obj.attr("data-form"));
                else form=obj.closest(".containerform");
            }
            console.log(form);
            if (form.length){
                if (duration!=null)
                    duration=Number(duration);
                console.log("duration");
                console.log(duration);
                if(!form.hasClass("openform") && (!duration || duration>0)){
                    form.addClass("openform openanimation");
                    if (changeScroll){
                        document.body.style.overflow = 'hidden';
                        if (duration>0)
                            setTimeout(toggleForm, duration, obj, -1, changeScroll, durationAnimation);
                    }
                }
                else{
                    form.removeClass("openanimation");
                    setTimeout((form) => {
                        form.removeClass("openform");
                        if (changeScroll)
                            document.body.style.overflow = 'auto';
                    }, durationAnimation, form, changeScroll);
                }
                return true;
            }
        }
        return false;
    }

    $("a.btn, .btnback").click(function(){
        return !toggleForm(this);
    });
    $(".btn_fullscreen, .btnclosealbum, .containerform .closeblock, .close_form").click(function(){
        toggleForm(this);
    });

    $(".btn_send").click(function(){
        if(checkDataForm(this, ".required", "hideinput", true)){
            toggleForm(this);
            // отправляем данные
        }
        return false;
    });

    $(".form_field label").on("click", function(){
        let field=$(this).parent();
        field.addClass("active_field");
        field.children("input").focus();
    });

    $(".form_field input").on("blur", function(event){
        //$(this).parent().removeClass("active_field");
        let input=$(event.currentTarget), field=input.parent();
        if (input.val()==""){
            field.removeClass("active_field");
        } else {
            field.addClass("active_field");
            input.removeClass("error_active");
        }
    });

    $(".form_field textarea").on("blur", function(event){
        let input=$(event.currentTarget);
        if (input.val()!=""){
            input.removeClass("error_active");
        }
    });

    //$(".form_field input[name='phone']").mask("+7 (999) 99-99-999");

    function checkDataForm(buttonSend, objectsRequired, classExceptions, needThank){
        let thisForm=$(buttonSend).closest("form");
        let objReq=thisForm.find(objectsRequired);       
        let flGoodData=true;
        for (i = 0; i < objReq.length; i++){
            if (objReq.eq(i).html()==""){
                if (!objReq.eq(i).hasClass(classExceptions) && objReq.eq(i).val()==""){
                    objReq.eq(i).addClass("error_active");
                    flGoodData=false;
                    //break;
                } else{
                    objReq.eq(i).removeClass("error_active");
                }
            } else if (!objReq.eq(i).hasClass(classExceptions)){
                innerObject = objReq.eq(i).find("input:checked");
                if (innerObject.length == 0){
                    objReq.eq(i).addClass("error_active");
                    flGoodData=false;
                    //break;
                } else{
                    objReq.eq(i).removeClass("error_active");
                }
            } else{
                objReq.eq(i).removeClass("error_active");
            }
        }
        if (flGoodData){
            // Отправляем данные
            thisForm.removeClass("error_form_active");
            if (needThank){
                toggleForm("#thank", 3000);
            }
            return true;    
        }
        else{
            thisForm.addClass("error_form_active");
            return false;
        }            
    }

    // Альбом

    // css детей (visionPhoto, objectAlbum, objectsDataContent) прописывать без классов уровня родителя и выше (потому что идет поиск find от родителя а не по всему DOM)
    visionAlbum = ".visionalbum"; // Контейнер для просмотра альбома
    btnPrevFoto = ".btnprevfoto"; // Кнопка влево
    btnNextFoto = ".btnnextfoto"; // Кнопка вправо
    btnCloseAlbum = ".btnclosealbum, .closeblock"; // Кнопка закрыть
    thisAlbum = ".btn_fullscreen"; // Альбомы, которые будут просматриваться
    objectAlbum = ".photo"; // Объекты, которые содержат data, который будет вставляться в style контейнера для просмотра
    dataPathFile = "data-allbum"; // Атрибут объекта objectAlbum, который хранит путь к файлу
    visionPhoto = "img"; // Объект, в который будет устанавливаться значение dataPathFile
    attrVisionPhoto = "src"; // Атрибут объекта visionPhoto, в который установится значение dataPathFile
    wrapInBI = false; // Оборачивать ли содержимое dataPathFile в background-image
    clickObjectAlbum = false; // Объекты objectAlbum открываются по клику на них (а не только на сам альбом visionAlbum)
    needHtmlObject = false; // Необходимо ли брать html объекта objectAlbum
    objForHtml = ".forcontenthtml" // Контейнер для html объекта objectAlbum
    needDataContentObj = true; // Необходимо ли брать data из объектов (указать ниже из каких именно) контейнера для html и вставлять их в style этого же объекта
    objectsDataContent = "iframe" // Объекты, из которых будет браться data и вставляться в их указанный атрибут
    changeAttr = "src" // Атрибут, в который будем вставлять данные из data для объектов objectsDataContent
    dataContent = "data-src" // Атрибут data указанных объектов objectsDataContent контейнера html
    visibleClass = "" // Класс для отображения visionAlbum
    durationAnimation = 300 // Длительность анимации открытия/закрытия
    containerVisionPhoto = ".container_photo"; // Контейнер объекта visionPhoto

    // Необходимо если visionPhoto меняет размеры в зависимости от изображения и containerVisionPhoto нужно подстраивать под них
    heightEqual = true; // Высота containerVisionPhoto равна высоте visionPhoto.
    widthEqual = false; // Ширина containerVisionPhoto равна ширине visionPhoto.

    objVA=$(visionAlbum);
    var objectsFoto, objectVisionPhoto, objectContainerVisionPhoto, intervalForSize;
    var containerHTML;
    var btnPF;
    var btnNF;
    var btnCA;
    var indexF=0;
    if (objVA.length!=0){
        //allAlbums = $(thisAlbum);
        btnPF=$(btnPrevFoto);
        btnNF=$(btnNextFoto);
        btnCA=$(btnCloseAlbum);

        if (visionPhoto && visionPhoto!=visionAlbum)
            objectVisionPhoto=objVA.find(visionPhoto);
        else objectVisionPhoto=objVA;

        if (clickObjectAlbum){            
            $("body").on("click", objectAlbum, function(){
                let album = $(this).closest(thisAlbum);
                indexF = album.find(objectAlbum).index($(this));
            });
        }

         $("body").on("click", thisAlbum, function(){
            if (!clickObjectAlbum)
                indexF=0;
            objectsFoto=$(this).find(objectAlbum);
            if (objectsFoto.length!=0){
                if (visibleClass)
                    objVA.addClass(visibleClass);
                NewFotoAlbum(indexF);
                if (objectsFoto.length == 1){
                    btnPF.hide();
                    btnNF.hide();
                } else {
                    btnPF.show();
                    btnNF.show();
                }
            }
        });

        function NewFotoAlbum(indexFoto){
            let dataAttr=objectsFoto.eq(indexFoto).attr(dataPathFile); 
            if (wrapInBI)
                objectVisionPhoto.attr(attrVisionPhoto, 'background-image: url("'+dataAttr+'");');
            else objectVisionPhoto.attr(attrVisionPhoto, dataAttr);
            if (needHtmlObject){
                containerHTML=objVA.find(objForHtml);
                containerHTML.html(objectsFoto.eq(indexFoto).html());
                if (containerHTML.html()!=undefined && needDataContentObj){
                    containerHTML.find(objectsDataContent).each(function(){
                        $(this).attr(changeAttr, $(this).attr(dataContent));
                    });
                }
            }
            if (heightEqual || widthEqual){
                if (!intervalForSize){
                    let oldHeight, oldWidth;
                    if (heightEqual)
                        oldHeight=objectContainerVisionPhoto.height();
                    if (widthEqual)
                        oldWidth=objectContainerVisionPhoto.width();
                    intervalForSize=setInterval((oldHeight, oldWidth) => {
                        if (heightEqual){
                            let heightPhoto=objectVisionPhoto.outerHeight();
                            if (oldHeight != heightPhoto){
                                objectContainerVisionPhoto.height(heightPhoto);
                                clearIntervalSize();
                            }
                        }
                        if (widthEqual){
                            let widthPhoto=objectVisionPhoto.outerWidth();
                            if (oldWidth != widthPhoto){
                                objectContainerVisionPhoto.width(widthPhoto);
                                clearIntervalSize();
                            }
                        }
                    }, 50, oldHeight, oldWidth);
                }
            }
        }

        btnPF.click(function(){
            prevFA();
        });

        function prevFA(){
            indexF--;
            if (indexF==-1)
                indexF=objectsFoto.length-1;
            NewFotoAlbum(indexF);
        }

        btnNF.click(function(){
            nextFA();
        });

        function nextFA(){
            indexF++;
            if (indexF==objectsFoto.length)
                indexF=0;
            NewFotoAlbum(indexF);
        }

        btnCA.click(function(){
            if (visibleClass)
                objVA.removeClass(visibleClass);
            setTimeout( () => {
                objVA.find(objForHtml).html("");
                objectVisionPhoto.attr(attrVisionPhoto, "");
                clearIntervalSize();
            }, durationAnimation);
        });

        function clearIntervalSize(){
            if (intervalForSize){
                clearInterval(intervalForSize);
                intervalForSize=null;
            }
        }

        if (heightEqual || widthEqual){
            objectContainerVisionPhoto=objVA.find(containerVisionPhoto);
            $(window).resize(() => {
                console.log("resize");
                console.log(objectContainerVisionPhoto.height());
                if (heightEqual)
                    objectContainerVisionPhoto.height(objectVisionPhoto.outerHeight());
                if (widthEqual)
                    objectContainerVisionPhoto.width(objectVisionPhoto.outerWidth());
            });
        }

        /*$(".visionalbum").swipe({
            swipeLeft: leftFotoA,
            swipeRight: rightFotoA,
            threshold: 1
        });*/


        function leftFotoA() {
            nextFA();
        }

        function rightFotoA() {
            prevFA();
        }
    }

    // Конец альбома
     
});
