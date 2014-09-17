!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){"use strict";var i=window.Slick||{};i=function(){function i(i,o){var s,n,l=this;if(l.defaults={accessibility:!0,appendArrows:t(i),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(t,i){return'<button type="button" data-role="none">'+(i+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",fade:!1,focusOnSelect:!1,infinite:!0,lazyLoad:"ondemand",onBeforeChange:null,onAfterChange:null,onInit:null,onReInit:null,pauseOnHover:!0,pauseOnDotsHover:!1,responsive:null,rtl:!1,slide:"div",slidesToShow:1,slidesToScroll:1,speed:300,swipe:!0,touchMove:!0,touchThreshold:5,useCSS:!0,vertical:!1},l.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentSlide:0,currentLeft:null,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1},t.extend(l,l.initials),l.activeBreakpoint=null,l.animType=null,l.animProp=null,l.breakpoints=[],l.breakpointSettings=[],l.cssTransitions=!1,l.paused=!1,l.positionProp=null,l.$slider=t(i),l.$slidesCache=null,l.transformType=null,l.transitionType=null,l.windowWidth=0,l.windowTimer=null,l.options=t.extend({},l.defaults,o),l.originalSettings=l.options,s=l.options.responsive||null,s&&s.length>-1){for(n in s)s.hasOwnProperty(n)&&(l.breakpoints.push(s[n].breakpoint),l.breakpointSettings[s[n].breakpoint]=s[n].settings);l.breakpoints.sort(function(t,i){return i-t})}l.autoPlay=t.proxy(l.autoPlay,l),l.autoPlayClear=t.proxy(l.autoPlayClear,l),l.changeSlide=t.proxy(l.changeSlide,l),l.selectHandler=t.proxy(l.selectHandler,l),l.setPosition=t.proxy(l.setPosition,l),l.swipeHandler=t.proxy(l.swipeHandler,l),l.dragHandler=t.proxy(l.dragHandler,l),l.keyHandler=t.proxy(l.keyHandler,l),l.autoPlayIterator=t.proxy(l.autoPlayIterator,l),l.instanceUid=e++,l.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,l.init()}var e=0;return i}(),i.prototype.addSlide=function(i,e,o){var s=this;if("boolean"==typeof e)o=e,e=null;else if(0>e||e>=s.slideCount)return!1;s.unload(),"number"==typeof e?0===e&&0===s.$slides.length?t(i).appendTo(s.$slideTrack):o?t(i).insertBefore(s.$slides.eq(e)):t(i).insertAfter(s.$slides.eq(e)):o===!0?t(i).prependTo(s.$slideTrack):t(i).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(i,e){t(e).attr("index",i)}),s.$slidesCache=s.$slides,s.reinit()},i.prototype.animateSlide=function(i,e){var o={},s=this;s.options.rtl===!0&&s.options.vertical===!1&&(i=-i),s.transformsEnabled===!1?s.options.vertical===!1?s.$slideTrack.animate({left:i},s.options.speed,s.options.easing,e):s.$slideTrack.animate({top:i},s.options.speed,s.options.easing,e):s.cssTransitions===!1?t({animStart:s.currentLeft}).animate({animStart:i},{duration:s.options.speed,easing:s.options.easing,step:function(t){s.options.vertical===!1?(o[s.animType]="translate("+t+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+t+"px)",s.$slideTrack.css(o))},complete:function(){e&&e.call()}}):(s.applyTransition(),o[s.animType]=s.options.vertical===!1?"translate3d("+i+"px, 0px, 0px)":"translate3d(0px,"+i+"px, 0px)",s.$slideTrack.css(o),e&&setTimeout(function(){s.disableTransition(),e.call()},s.options.speed))},i.prototype.applyTransition=function(t){var i=this,e={};e[i.transitionType]=i.options.fade===!1?i.transformType+" "+i.options.speed+"ms "+i.options.cssEase:"opacity "+i.options.speed+"ms "+i.options.cssEase,i.options.fade===!1?i.$slideTrack.css(e):i.$slides.eq(t).css(e)},i.prototype.autoPlay=function(){var t=this;t.autoPlayTimer&&clearInterval(t.autoPlayTimer),t.slideCount>t.options.slidesToShow&&t.paused!==!0&&(t.autoPlayTimer=setInterval(t.autoPlayIterator,t.options.autoplaySpeed))},i.prototype.autoPlayClear=function(){var t=this;t.autoPlayTimer&&clearInterval(t.autoPlayTimer)},i.prototype.autoPlayIterator=function(){var i=this,e=null!=i.options.asNavFor?t(i.options.asNavFor).getSlick():null;i.options.infinite===!1?1===i.direction?(i.currentSlide+1===i.slideCount-1&&(i.direction=0),i.slideHandler(i.currentSlide+i.options.slidesToScroll),null!=e&&e.slideHandler(e.currentSlide+e.options.slidesToScroll)):(0===i.currentSlide-1&&(i.direction=1),i.slideHandler(i.currentSlide-i.options.slidesToScroll),null!=e&&e.slideHandler(e.currentSlide-e.options.slidesToScroll)):(i.slideHandler(i.currentSlide+i.options.slidesToScroll),null!=e&&e.slideHandler(e.currentSlide+e.options.slidesToScroll))},i.prototype.buildArrows=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow=t(i.options.prevArrow),i.$nextArrow=t(i.options.nextArrow),i.htmlExpr.test(i.options.prevArrow)&&i.$prevArrow.appendTo(i.options.appendArrows),i.htmlExpr.test(i.options.nextArrow)&&i.$nextArrow.appendTo(i.options.appendArrows),i.options.infinite!==!0&&i.$prevArrow.addClass("slick-disabled"))},i.prototype.buildDots=function(){var i,e,o=this;if(o.options.dots===!0&&o.slideCount>o.options.slidesToShow){for(e='<ul class="'+o.options.dotsClass+'">',i=0;i<=o.getDotCount();i+=1)e+="<li>"+o.options.customPaging.call(this,o,i)+"</li>";e+="</ul>",o.$dots=t(e).appendTo(o.$slider),o.$dots.find("li").first().addClass("slick-active")}},i.prototype.buildOut=function(){var i=this;i.$slides=i.$slider.children(i.options.slide+":not(.slick-cloned)").addClass("slick-slide"),i.slideCount=i.$slides.length,i.$slides.each(function(i,e){t(e).attr("index",i)}),i.$slidesCache=i.$slides,i.$slider.addClass("slick-slider"),i.$slideTrack=0===i.slideCount?t('<div class="slick-track"/>').appendTo(i.$slider):i.$slides.wrapAll('<div class="slick-track"/>').parent(),i.$list=i.$slideTrack.wrap('<div class="slick-list"/>').parent(),i.$slideTrack.css("opacity",0),i.options.centerMode===!0&&(i.options.slidesToScroll=1,0===i.options.slidesToShow%2&&(i.options.slidesToShow=3)),t("img[data-lazy]",i.$slider).not("[src]").addClass("slick-loading"),i.setupInfinite(),i.buildArrows(),i.buildDots(),i.updateDots(),i.options.accessibility===!0&&i.$list.prop("tabIndex",0),i.setSlideClasses("number"==typeof this.currentSlide?this.currentSlide:0),i.options.draggable===!0&&i.$list.addClass("draggable")},i.prototype.checkResponsive=function(){var i,e,o=this;if(o.originalSettings.responsive&&o.originalSettings.responsive.length>-1&&null!==o.originalSettings.responsive){e=null;for(i in o.breakpoints)o.breakpoints.hasOwnProperty(i)&&t(window).width()<o.breakpoints[i]&&(e=o.breakpoints[i]);null!==e?null!==o.activeBreakpoint?e!==o.activeBreakpoint&&(o.activeBreakpoint=e,o.options=t.extend({},o.options,o.breakpointSettings[e]),o.refresh()):(o.activeBreakpoint=e,o.options=t.extend({},o.options,o.breakpointSettings[e]),o.refresh()):null!==o.activeBreakpoint&&(o.activeBreakpoint=null,o.options=t.extend({},o.options,o.originalSettings),o.refresh())}},i.prototype.changeSlide=function(i){var e=this,o=t(i.target),s=null!=e.options.asNavFor?t(e.options.asNavFor).getSlick():null;switch(o.is("a")&&i.preventDefault(),i.data.message){case"previous":e.slideCount>e.options.slidesToShow&&(e.slideHandler(e.currentSlide-e.options.slidesToScroll),null!=s&&s.slideHandler(s.currentSlide-s.options.slidesToScroll));break;case"next":e.slideCount>e.options.slidesToShow&&(e.slideHandler(e.currentSlide+e.options.slidesToScroll),null!=s&&s.slideHandler(s.currentSlide+s.options.slidesToScroll));break;case"index":var n=t(i.target).parent().index()*e.options.slidesToScroll;e.slideHandler(n),null!=s&&s.slideHandler(n);break;default:return!1}},i.prototype.destroy=function(){var i=this;i.autoPlayClear(),i.touchObject={},t(".slick-cloned",i.$slider).remove(),i.$dots&&i.$dots.remove(),i.$prevArrow&&(i.$prevArrow.remove(),i.$nextArrow.remove()),i.$slides.parent().hasClass("slick-track")&&i.$slides.unwrap().unwrap(),i.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style"),i.$slider.removeClass("slick-slider"),i.$slider.removeClass("slick-initialized"),i.$list.off(".slick"),t(window).off(".slick-"+i.instanceUid),t(document).off(".slick-"+i.instanceUid)},i.prototype.disableTransition=function(t){var i=this,e={};e[i.transitionType]="",i.options.fade===!1?i.$slideTrack.css(e):i.$slides.eq(t).css(e)},i.prototype.fadeSlide=function(t,i){var e=this;e.cssTransitions===!1?(e.$slides.eq(t).css({zIndex:1e3}),e.$slides.eq(t).animate({opacity:1},e.options.speed,e.options.easing,i)):(e.applyTransition(t),e.$slides.eq(t).css({opacity:1,zIndex:1e3}),i&&setTimeout(function(){e.disableTransition(t),i.call()},e.options.speed))},i.prototype.filterSlides=function(t){var i=this;null!==t&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.filter(t).appendTo(i.$slideTrack),i.reinit())},i.prototype.getCurrent=function(){var t=this;return t.currentSlide},i.prototype.getDotCount=function(){var t,i=this,e=0,o=0,s=0;for(t=i.options.infinite===!0?i.slideCount+i.options.slidesToShow-i.options.slidesToScroll:i.slideCount;t>e;)s++,o+=i.options.slidesToScroll,e=o+i.options.slidesToShow;return s},i.prototype.getLeft=function(t){var i,e,o=this,s=0;return o.slideOffset=0,e=o.$slides.first().outerHeight(),o.options.infinite===!0?(o.slideCount>o.options.slidesToShow&&(o.slideOffset=-1*o.slideWidth*o.options.slidesToShow,s=-1*e*o.options.slidesToShow),0!==o.slideCount%o.options.slidesToScroll&&t+o.options.slidesToScroll>o.slideCount&&o.slideCount>o.options.slidesToShow&&(o.slideOffset=-1*o.slideCount%o.options.slidesToShow*o.slideWidth,s=-1*o.slideCount%o.options.slidesToShow*e)):0!==o.slideCount%o.options.slidesToShow&&t+o.options.slidesToScroll>o.slideCount&&o.slideCount>o.options.slidesToShow&&(o.slideOffset=o.options.slidesToShow*o.slideWidth-o.slideCount%o.options.slidesToShow*o.slideWidth,s=o.slideCount%o.options.slidesToShow*e),o.options.centerMode===!0&&o.options.infinite===!0?o.slideOffset+=o.slideWidth*Math.floor(o.options.slidesToShow/2)-o.slideWidth:o.options.centerMode===!0&&(o.slideOffset+=o.slideWidth*Math.floor(o.options.slidesToShow/2)),i=o.options.vertical===!1?-1*t*o.slideWidth+o.slideOffset:-1*t*e+s},i.prototype.init=function(){var i=this;t(i.$slider).hasClass("slick-initialized")||(t(i.$slider).addClass("slick-initialized"),i.buildOut(),i.setProps(),i.startLoad(),i.loadSlider(),i.initializeEvents(),i.checkResponsive()),null!==i.options.onInit&&i.options.onInit.call(this,i)},i.prototype.initArrowEvents=function(){var t=this;t.options.arrows===!0&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.on("click.slick",{message:"previous"},t.changeSlide),t.$nextArrow.on("click.slick",{message:"next"},t.changeSlide))},i.prototype.initDotEvents=function(){var i=this;i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&t("li",i.$dots).on("click.slick",{message:"index"},i.changeSlide),i.options.dots===!0&&i.options.pauseOnDotsHover===!0&&i.options.autoplay===!0&&t("li",i.$dots).on("mouseenter.slick",i.autoPlayClear).on("mouseleave.slick",i.autoPlay)},i.prototype.initializeEvents=function(){var i=this;i.initArrowEvents(),i.initDotEvents(),i.$list.on("touchstart.slick mousedown.slick",{action:"start"},i.swipeHandler),i.$list.on("touchmove.slick mousemove.slick",{action:"move"},i.swipeHandler),i.$list.on("touchend.slick mouseup.slick",{action:"end"},i.swipeHandler),i.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},i.swipeHandler),i.options.pauseOnHover===!0&&i.options.autoplay===!0&&(i.$list.on("mouseenter.slick",i.autoPlayClear),i.$list.on("mouseleave.slick",i.autoPlay)),i.options.accessibility===!0&&i.$list.on("keydown.slick",i.keyHandler),i.options.focusOnSelect===!0&&t(i.options.slide,i.$slideTrack).on("click.slick",i.selectHandler),t(window).on("orientationchange.slick.slick-"+i.instanceUid,function(){i.checkResponsive(),i.setPosition()}),t(window).on("resize.slick.slick-"+i.instanceUid,function(){t(window).width()!==i.windowWidth&&(clearTimeout(i.windowDelay),i.windowDelay=window.setTimeout(function(){i.windowWidth=t(window).width(),i.checkResponsive(),i.setPosition()},50))}),t(window).on("load.slick.slick-"+i.instanceUid,i.setPosition),t(document).on("ready.slick.slick-"+i.instanceUid,i.setPosition)},i.prototype.initUI=function(){var t=this;t.options.arrows===!0&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.show(),t.$nextArrow.show()),t.options.dots===!0&&t.slideCount>t.options.slidesToShow&&t.$dots.show(),t.options.autoplay===!0&&t.autoPlay()},i.prototype.keyHandler=function(t){var i=this;37===t.keyCode?i.changeSlide({data:{message:"previous"}}):39===t.keyCode&&i.changeSlide({data:{message:"next"}})},i.prototype.lazyLoad=function(){function i(i){t("img[data-lazy]",i).each(function(){var i=t(this),e=t(this).attr("data-lazy")+"?"+(new Date).getTime();i.load(function(){i.animate({opacity:1},200)}).css({opacity:0}).attr("src",e).removeAttr("data-lazy").removeClass("slick-loading")})}var e,o,s,n,l=this;l.options.centerMode===!0||l.options.fade===!0?(s=l.options.slidesToShow+l.currentSlide-1,n=s+l.options.slidesToShow+2):(s=l.options.infinite?l.options.slidesToShow+l.currentSlide:l.currentSlide,n=s+l.options.slidesToShow),e=l.$slider.find(".slick-slide").slice(s,n),i(e),1==l.slideCount?(o=l.$slider.find(".slick-slide"),i(o)):l.currentSlide>=l.slideCount-l.options.slidesToShow?(o=l.$slider.find(".slick-cloned").slice(0,l.options.slidesToShow),i(o)):0===l.currentSlide&&(o=l.$slider.find(".slick-cloned").slice(-1*l.options.slidesToShow),i(o))},i.prototype.loadSlider=function(){var t=this;t.setPosition(),t.$slideTrack.css({opacity:1}),t.$slider.removeClass("slick-loading"),t.initUI(),"progressive"===t.options.lazyLoad&&t.progressiveLazyLoad()},i.prototype.postSlide=function(t){var i=this;null!==i.options.onAfterChange&&i.options.onAfterChange.call(this,i,t),i.animating=!1,i.setPosition(),i.swipeLeft=null,i.options.autoplay===!0&&i.paused===!1&&i.autoPlay()},i.prototype.progressiveLazyLoad=function(){var i,e,o=this;i=t("img[data-lazy]").length,i>0&&(e=t("img[data-lazy]",o.$slider).first(),e.attr("src",e.attr("data-lazy")).removeClass("slick-loading").load(function(){e.removeAttr("data-lazy"),o.progressiveLazyLoad()}))},i.prototype.refresh=function(){var i=this,e=i.currentSlide;i.destroy(),t.extend(i,i.initials),i.currentSlide=e,i.init()},i.prototype.reinit=function(){var i=this;i.$slides=i.$slideTrack.children(i.options.slide).addClass("slick-slide"),i.slideCount=i.$slides.length,i.currentSlide>=i.slideCount&&0!==i.currentSlide&&(i.currentSlide=i.currentSlide-i.options.slidesToScroll),i.setProps(),i.setupInfinite(),i.buildArrows(),i.updateArrows(),i.initArrowEvents(),i.buildDots(),i.updateDots(),i.initDotEvents(),i.options.focusOnSelect===!0&&t(i.options.slide,i.$slideTrack).on("click.slick",i.selectHandler),i.setSlideClasses(0),i.setPosition(),null!==i.options.onReInit&&i.options.onReInit.call(this,i)},i.prototype.removeSlide=function(t,i){var e=this;return"boolean"==typeof t?(i=t,t=i===!0?0:e.slideCount-1):t=i===!0?--t:t,e.slideCount<1||0>t||t>e.slideCount-1?!1:(e.unload(),e.$slideTrack.children(this.options.slide).eq(t).remove(),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slidesCache=e.$slides,void e.reinit())},i.prototype.setCSS=function(t){var i,e,o=this,s={};o.options.rtl===!0&&(t=-t),i="left"==o.positionProp?t+"px":"0px",e="top"==o.positionProp?t+"px":"0px",s[o.positionProp]=t,o.transformsEnabled===!1?o.$slideTrack.css(s):(s={},o.cssTransitions===!1?(s[o.animType]="translate("+i+", "+e+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+i+", "+e+", 0px)",o.$slideTrack.css(s)))},i.prototype.setDimensions=function(){var t=this;t.options.vertical===!1?t.options.centerMode===!0&&t.$list.css({padding:"0px "+t.options.centerPadding}):(t.$list.height(t.$slides.first().outerHeight(!0)*t.options.slidesToShow),t.options.centerMode===!0&&t.$list.css({padding:t.options.centerPadding+" 0px"})),t.listWidth=t.$list.width(),t.listHeight=t.$list.height(),t.options.vertical===!1?(t.slideWidth=Math.ceil(t.listWidth/t.options.slidesToShow),t.$slideTrack.width(Math.ceil(t.slideWidth*t.$slideTrack.children(".slick-slide").length))):(t.slideWidth=Math.ceil(t.listWidth),t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0)*t.$slideTrack.children(".slick-slide").length)));var i=t.$slides.first().outerWidth(!0)-t.$slides.first().width();t.$slideTrack.children(".slick-slide").width(t.slideWidth-i)},i.prototype.setFade=function(){var i,e=this;e.$slides.each(function(o,s){i=-1*e.slideWidth*o,t(s).css({position:"relative",left:i,top:0,zIndex:800,opacity:0})}),e.$slides.eq(e.currentSlide).css({zIndex:900,opacity:1})},i.prototype.setPosition=function(){var t=this;t.setDimensions(),t.options.fade===!1?t.setCSS(t.getLeft(t.currentSlide)):t.setFade()},i.prototype.setProps=function(){var t=this;t.positionProp=t.options.vertical===!0?"top":"left","top"===t.positionProp?t.$slider.addClass("slick-vertical"):t.$slider.removeClass("slick-vertical"),(void 0!==document.body.style.WebkitTransition||void 0!==document.body.style.MozTransition||void 0!==document.body.style.msTransition)&&t.options.useCSS===!0&&(t.cssTransitions=!0),void 0!==document.body.style.MozTransform&&(t.animType="MozTransform",t.transformType="-moz-transform",t.transitionType="MozTransition"),void 0!==document.body.style.webkitTransform&&(t.animType="webkitTransform",t.transformType="-webkit-transform",t.transitionType="webkitTransition"),void 0!==document.body.style.msTransform&&(t.animType="msTransform",t.transformType="-ms-transform",t.transitionType="msTransition"),void 0!==document.body.style.transform&&(t.animType="transform",t.transformType="transform",t.transitionType="transition"),t.transformsEnabled=null!==t.animType},i.prototype.setSlideClasses=function(t){var i,e,o,s,n=this;n.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"),e=n.$slider.find(".slick-slide"),n.options.centerMode===!0?(i=Math.floor(n.options.slidesToShow/2),n.options.infinite===!0&&(t>=i&&t<=n.slideCount-1-i?n.$slides.slice(t-i,t+i+1).addClass("slick-active"):(o=n.options.slidesToShow+t,e.slice(o-i+1,o+i+2).addClass("slick-active")),0===t?e.eq(e.length-1-n.options.slidesToShow).addClass("slick-center"):t===n.slideCount-1&&e.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(t).addClass("slick-center")):t>=0&&t<=n.slideCount-n.options.slidesToShow?n.$slides.slice(t,t+n.options.slidesToShow).addClass("slick-active"):e.length<=n.options.slidesToShow?e.addClass("slick-active"):(s=n.slideCount%n.options.slidesToShow,o=n.options.infinite===!0?n.options.slidesToShow+t:t,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-t<n.options.slidesToShow?e.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active"):e.slice(o,o+n.options.slidesToShow).addClass("slick-active")),"ondemand"===n.options.lazyLoad&&n.lazyLoad()},i.prototype.setupInfinite=function(){var i,e,o,s=this;if((s.options.fade===!0||s.options.vertical===!0)&&(s.options.centerMode=!1),s.options.infinite===!0&&s.options.fade===!1&&(e=null,s.slideCount>s.options.slidesToShow)){for(o=s.options.centerMode===!0?s.options.slidesToShow+1:s.options.slidesToShow,i=s.slideCount;i>s.slideCount-o;i-=1)e=i-1,t(s.$slides[e]).clone(!0).attr("id","").prependTo(s.$slideTrack).addClass("slick-cloned");for(i=0;o>i;i+=1)e=i,t(s.$slides[e]).clone(!0).attr("id","").appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){t(this).attr("id","")})}},i.prototype.selectHandler=function(i){var e=this,o=null!=e.options.asNavFor?t(e.options.asNavFor).getSlick():null,s=parseInt(t(i.target).parent().attr("index"));if(s||(s=0),!(e.slideCount<=e.options.slidesToShow)&&(e.slideHandler(s),null!=o)){if(o.slideCount<=o.options.slidesToShow)return;o.slideHandler(s)}},i.prototype.slideHandler=function(t){var i,e,o,s,n=null,l=this;return l.animating===!0?!1:(i=t,n=l.getLeft(i),o=l.getLeft(l.currentSlide),s=0!==l.slideCount%l.options.slidesToScroll?l.options.slidesToScroll:0,l.currentLeft=null===l.swipeLeft?o:l.swipeLeft,l.options.infinite===!1&&l.options.centerMode===!1&&(0>t||t>l.slideCount-l.options.slidesToShow+s)?(l.options.fade===!1&&(i=l.currentSlide,l.animateSlide(o,function(){l.postSlide(i)})),!1):l.options.infinite===!1&&l.options.centerMode===!0&&(0>t||t>l.slideCount-l.options.slidesToScroll)?(l.options.fade===!1&&(i=l.currentSlide,l.animateSlide(o,function(){l.postSlide(i)})),!1):(l.options.autoplay===!0&&clearInterval(l.autoPlayTimer),e=0>i?0!==l.slideCount%l.options.slidesToScroll?l.slideCount-l.slideCount%l.options.slidesToScroll:l.slideCount-l.options.slidesToScroll:i>l.slideCount-1?0:i,l.animating=!0,null!==l.options.onBeforeChange&&t!==l.currentSlide&&l.options.onBeforeChange.call(this,l,l.currentSlide,e),l.currentSlide=e,l.setSlideClasses(l.currentSlide),l.updateDots(),l.updateArrows(),l.options.fade===!0?(l.fadeSlide(e,function(){l.postSlide(e)}),!1):void l.animateSlide(n,function(){l.postSlide(e)})))},i.prototype.startLoad=function(){var t=this;t.options.arrows===!0&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.hide(),t.$nextArrow.hide()),t.options.dots===!0&&t.slideCount>t.options.slidesToShow&&t.$dots.hide(),t.$slider.addClass("slick-loading")},i.prototype.swipeDirection=function(){var t,i,e,o,s=this;return t=s.touchObject.startX-s.touchObject.curX,i=s.touchObject.startY-s.touchObject.curY,e=Math.atan2(i,t),o=Math.round(180*e/Math.PI),0>o&&(o=360-Math.abs(o)),45>=o&&o>=0?"left":360>=o&&o>=315?"left":o>=135&&225>=o?"right":"vertical"},i.prototype.swipeEnd=function(i){var e=this,o=null!=e.options.asNavFor?t(e.options.asNavFor).getSlick():null;if(e.dragging=!1,void 0===e.touchObject.curX)return!1;if(e.touchObject.swipeLength>=e.touchObject.minSwipe)switch(t(i.target).on("click.slick",function(i){i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault(),t(i.target).off("click.slick")}),e.swipeDirection()){case"left":e.slideHandler(e.currentSlide+e.options.slidesToScroll),null!=o&&o.slideHandler(o.currentSlide+o.options.slidesToScroll),e.touchObject={};break;case"right":e.slideHandler(e.currentSlide-e.options.slidesToScroll),null!=o&&o.slideHandler(o.currentSlide-o.options.slidesToScroll),e.touchObject={}}else e.touchObject.startX!==e.touchObject.curX&&(e.slideHandler(e.currentSlide),null!=o&&o.slideHandler(o.currentSlide),e.touchObject={})},i.prototype.swipeHandler=function(t){var i=this;if(!(i.options.swipe===!1||"ontouchend"in document&&i.options.swipe===!1||i.options.draggable===!1||i.options.draggable===!1&&!t.originalEvent.touches))switch(i.touchObject.fingerCount=t.originalEvent&&void 0!==t.originalEvent.touches?t.originalEvent.touches.length:1,i.touchObject.minSwipe=i.listWidth/i.options.touchThreshold,t.data.action){case"start":i.swipeStart(t);break;case"move":i.swipeMove(t);break;case"end":i.swipeEnd(t)}},i.prototype.swipeMove=function(t){var i,e,o,s,n=this;return s=void 0!==t.originalEvent?t.originalEvent.touches:null,i=n.getLeft(n.currentSlide),!n.dragging||s&&1!==s.length?!1:(n.touchObject.curX=void 0!==s?s[0].pageX:t.clientX,n.touchObject.curY=void 0!==s?s[0].pageY:t.clientY,n.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(n.touchObject.curX-n.touchObject.startX,2))),e=n.swipeDirection(),"vertical"!==e?(void 0!==t.originalEvent&&n.touchObject.swipeLength>4&&t.preventDefault(),o=n.touchObject.curX>n.touchObject.startX?1:-1,n.swipeLeft=n.options.vertical===!1?i+n.touchObject.swipeLength*o:i+n.touchObject.swipeLength*(n.$list.height()/n.listWidth)*o,n.options.fade===!0||n.options.touchMove===!1?!1:n.animating===!0?(n.swipeLeft=null,!1):void n.setCSS(n.swipeLeft)):void 0)},i.prototype.swipeStart=function(t){var i,e=this;return 1!==e.touchObject.fingerCount||e.slideCount<=e.options.slidesToShow?(e.touchObject={},!1):(void 0!==t.originalEvent&&void 0!==t.originalEvent.touches&&(i=t.originalEvent.touches[0]),e.touchObject.startX=e.touchObject.curX=void 0!==i?i.pageX:t.clientX,e.touchObject.startY=e.touchObject.curY=void 0!==i?i.pageY:t.clientY,void(e.dragging=!0))},i.prototype.unfilterSlides=function(){var t=this;null!==t.$slidesCache&&(t.unload(),t.$slideTrack.children(this.options.slide).detach(),t.$slidesCache.appendTo(t.$slideTrack),t.reinit())},i.prototype.unload=function(){var i=this;t(".slick-cloned",i.$slider).remove(),i.$dots&&i.$dots.remove(),i.$prevArrow&&(i.$prevArrow.remove(),i.$nextArrow.remove()),i.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style")},i.prototype.updateArrows=function(){var t=this;t.options.arrows===!0&&t.options.infinite!==!0&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.removeClass("slick-disabled"),t.$nextArrow.removeClass("slick-disabled"),0===t.currentSlide?(t.$prevArrow.addClass("slick-disabled"),t.$nextArrow.removeClass("slick-disabled")):t.currentSlide>=t.slideCount-t.options.slidesToShow&&(t.$nextArrow.addClass("slick-disabled"),t.$prevArrow.removeClass("slick-disabled")))},i.prototype.updateDots=function(){var t=this;null!==t.$dots&&(t.$dots.find("li").removeClass("slick-active"),t.$dots.find("li").eq(Math.floor(t.currentSlide/t.options.slidesToScroll)).addClass("slick-active"))},t.fn.slick=function(t){var e=this;return e.each(function(e,o){o.slick=new i(o,t)})},t.fn.slickAdd=function(t,i,e){var o=this;return o.each(function(o,s){s.slick.addSlide(t,i,e)})},t.fn.slickCurrentSlide=function(){var t=this;return t.get(0).slick.getCurrent()},t.fn.slickFilter=function(t){var i=this;return i.each(function(i,e){e.slick.filterSlides(t)})},t.fn.slickGoTo=function(i){var e=this;return e.each(function(e,o){var s=null!=o.slick.options.asNavFor?t(o.slick.options.asNavFor):null;null!=s&&s.slickGoTo(i),o.slick.slideHandler(i)})},t.fn.slickNext=function(){var t=this;return t.each(function(t,i){i.slick.changeSlide({data:{message:"next"}})})},t.fn.slickPause=function(){var t=this;return t.each(function(t,i){i.slick.autoPlayClear(),i.slick.paused=!0})},t.fn.slickPlay=function(){var t=this;return t.each(function(t,i){i.slick.paused=!1,i.slick.autoPlay()})},t.fn.slickPrev=function(){var t=this;return t.each(function(t,i){i.slick.changeSlide({data:{message:"previous"}})})},t.fn.slickRemove=function(t,i){var e=this;return e.each(function(e,o){o.slick.removeSlide(t,i)})},t.fn.slickGetOption=function(t){var i=this;return i.get(0).slick.options[t]},t.fn.slickSetOption=function(t,i,e){var o=this;return o.each(function(o,s){s.slick.options[t]=i,e===!0&&(s.slick.unload(),s.slick.reinit())})},t.fn.slickUnfilter=function(){var t=this;return t.each(function(t,i){i.slick.unfilterSlides()})},t.fn.unslick=function(){var t=this;return t.each(function(t,i){i.slick&&i.slick.destroy()})},t.fn.getSlick=function(){var t=null,i=this;return i.each(function(i,e){t=e.slick}),t}}),function(){var t,i,e,o=function(t,i){return function(){return t.apply(i,arguments)}},s=[].indexOf||function(t){for(var i=0,e=this.length;e>i;i++)if(i in this&&this[i]===t)return i;return-1};i=function(){function t(){}return t.prototype.extend=function(t,i){var e,o;for(e in i)o=i[e],null==t[e]&&(t[e]=o);return t},t.prototype.isMobile=function(t){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)},t}(),e=this.WeakMap||this.MozWeakMap||(e=function(){function t(){this.keys=[],this.values=[]}return t.prototype.get=function(t){var i,e,o,s,n;for(n=this.keys,i=o=0,s=n.length;s>o;i=++o)if(e=n[i],e===t)return this.values[i]},t.prototype.set=function(t,i){var e,o,s,n,l;for(l=this.keys,e=s=0,n=l.length;n>s;e=++s)if(o=l[e],o===t)return void(this.values[e]=i);return this.keys.push(t),this.values.push(i)},t}()),t=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(t=function(){function t(){console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return t.notSupported=!0,t.prototype.observe=function(){},t}()),this.WOW=function(){function n(t){null==t&&(t={}),this.scrollCallback=o(this.scrollCallback,this),this.scrollHandler=o(this.scrollHandler,this),this.start=o(this.start,this),this.scrolled=!0,this.config=this.util().extend(t,this.defaults),this.animationNameCache=new e}return n.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0},n.prototype.init=function(){var t;return this.element=window.document.documentElement,"interactive"===(t=document.readyState)||"complete"===t?this.start():document.addEventListener("DOMContentLoaded",this.start),this.finished=[]},n.prototype.start=function(){var i,e,o,s;if(this.stopped=!1,this.boxes=function(){var t,e,o,s;for(o=this.element.querySelectorAll("."+this.config.boxClass),s=[],t=0,e=o.length;e>t;t++)i=o[t],s.push(i);return s}.call(this),this.all=function(){var t,e,o,s;for(o=this.boxes,s=[],t=0,e=o.length;e>t;t++)i=o[t],s.push(i);return s}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else{for(s=this.boxes,e=0,o=s.length;o>e;e++)i=s[e],this.applyStyle(i,!0);window.addEventListener("scroll",this.scrollHandler,!1),window.addEventListener("resize",this.scrollHandler,!1),this.interval=setInterval(this.scrollCallback,50)}return this.config.live?new t(function(t){return function(i){var e,o,s,n,l;for(l=[],s=0,n=i.length;n>s;s++)o=i[s],l.push(function(){var t,i,s,n;for(s=o.addedNodes||[],n=[],t=0,i=s.length;i>t;t++)e=s[t],n.push(this.doSync(e));return n}.call(t));return l}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},n.prototype.stop=function(){return this.stopped=!0,window.removeEventListener("scroll",this.scrollHandler,!1),window.removeEventListener("resize",this.scrollHandler,!1),null!=this.interval?clearInterval(this.interval):void 0},n.prototype.sync=function(){return t.notSupported?this.doSync(this.element):void 0},n.prototype.doSync=function(t){var i,e,o,n,l;if(!this.stopped){if(null==t&&(t=this.element),1!==t.nodeType)return;for(t=t.parentNode||t,n=t.querySelectorAll("."+this.config.boxClass),l=[],e=0,o=n.length;o>e;e++)i=n[e],s.call(this.all,i)<0?(this.applyStyle(i,!0),this.boxes.push(i),this.all.push(i),l.push(this.scrolled=!0)):l.push(void 0);return l}},n.prototype.show=function(t){return this.applyStyle(t),t.className=""+t.className+" "+this.config.animateClass},n.prototype.applyStyle=function(t,i){var e,o,s;return o=t.getAttribute("data-wow-duration"),e=t.getAttribute("data-wow-delay"),s=t.getAttribute("data-wow-iteration"),this.animate(function(n){return function(){return n.customStyle(t,i,o,e,s)}}(this))},n.prototype.animate=function(){return"requestAnimationFrame"in window?function(t){return window.requestAnimationFrame(t)}:function(t){return t()}}(),n.prototype.resetStyle=function(){var t,i,e,o,s;for(o=this.boxes,s=[],i=0,e=o.length;e>i;i++)t=o[i],s.push(t.setAttribute("style","visibility: visible;"));return s},n.prototype.customStyle=function(t,i,e,o,s){return i&&this.cacheAnimationName(t),t.style.visibility=i?"hidden":"visible",e&&this.vendorSet(t.style,{animationDuration:e}),o&&this.vendorSet(t.style,{animationDelay:o}),s&&this.vendorSet(t.style,{animationIterationCount:s}),this.vendorSet(t.style,{animationName:i?"none":this.cachedAnimationName(t)}),t},n.prototype.vendors=["moz","webkit"],n.prototype.vendorSet=function(t,i){var e,o,s,n;n=[];for(e in i)o=i[e],t[""+e]=o,n.push(function(){var i,n,l,r;for(l=this.vendors,r=[],i=0,n=l.length;n>i;i++)s=l[i],r.push(t[""+s+e.charAt(0).toUpperCase()+e.substr(1)]=o);return r}.call(this));return n},n.prototype.vendorCSS=function(t,i){var e,o,s,n,l,r;for(o=window.getComputedStyle(t),e=o.getPropertyCSSValue(i),r=this.vendors,n=0,l=r.length;l>n;n++)s=r[n],e=e||o.getPropertyCSSValue("-"+s+"-"+i);
return e},n.prototype.animationName=function(t){var i;try{i=this.vendorCSS(t,"animation-name").cssText}catch(e){i=window.getComputedStyle(t).getPropertyValue("animation-name")}return"none"===i?"":i},n.prototype.cacheAnimationName=function(t){return this.animationNameCache.set(t,this.animationName(t))},n.prototype.cachedAnimationName=function(t){return this.animationNameCache.get(t)},n.prototype.scrollHandler=function(){return this.scrolled=!0},n.prototype.scrollCallback=function(){var t;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var i,e,o,s;for(o=this.boxes,s=[],i=0,e=o.length;e>i;i++)t=o[i],t&&(this.isVisible(t)?this.show(t):s.push(t));return s}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},n.prototype.offsetTop=function(t){for(var i;void 0===t.offsetTop;)t=t.parentNode;for(i=t.offsetTop;t=t.offsetParent;)i+=t.offsetTop;return i},n.prototype.isVisible=function(t){var i,e,o,s,n;return e=t.getAttribute("data-wow-offset")||this.config.offset,n=window.pageYOffset,s=n+Math.min(this.element.clientHeight,innerHeight)-e,o=this.offsetTop(t),i=o+t.clientHeight,s>=o&&i>=n},n.prototype.util=function(){return null!=this._util?this._util:this._util=new i},n.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},n}()}.call(this);