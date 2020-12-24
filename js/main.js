$(function(){

    /*헤더 메뉴*/
    var $head = $('header'),
        $menu = $head.find('#lnb >ul >li');

    $menu.mouseenter(function(){
        //header의 높이 변경
        $head.stop().animate({height:'335px'},300);

        //서브메뉴 보여줌
        $menu.find('ul').css('opacity',1);

        //서브메뉴 선택할때까지 고정
        // $head.css('pointer-events','none');
    }).mouseleave(function(){
        //header의 높이 변경
        $head.stop().animate({height:'81px'},300);

        //서브메뉴 사라짐
        $menu.find('ul').css('opacity',0);

    });

    /*슬라이드*/
    var slideContainer = $('.visual_con'),
        slideWrap = slideContainer.find('.slide_w'),
        slides = slideWrap.find('.slide'),
        slideLength = slides.length,
        currentIdx = 0,
        btn_arrow = $('.arrow'),
        Indicator ='',
        IndicatorBox = $('.num_box'),
        control = $('.con'),
        play = control.find('.play'),
        pause = control.find('.pause'),
        timer;

    //버튼을 누르면 이동
    btn_arrow.find('a').click(function(ev){
        ev.preventDefault();
        if($(this).hasClass('prev')){
            goToPrevSlide(currentIdx);
        }else{
            goToNextSlide();
        }
    });

    //goToNextSlide 함수 생성
    function goToNextSlide(){
        var nextIdx = (currentIdx + 1) % slideLength;

        slides.eq(currentIdx).fadeOut();
        slides.eq(nextIdx).fadeIn();
        currentIdx = nextIdx;

        IndicatorBox.find('div').removeClass('active');
        IndicatorBox.find('div').eq(nextIdx).addClass('active');
    }

    //goToPrevSlide 함수 생성
    function goToPrevSlide(p){
        var nextIdx = currentIdx -1;
        if(nextIdx < 0){
            nextIdx = slideLength-1;
        }
        slides.eq(p).fadeOut();
        slides.eq(nextIdx).fadeIn();
        currentIdx = nextIdx;

        IndicatorBox.find('div').removeClass('active');
        IndicatorBox.find('div').eq(nextIdx).addClass('active');
    }

    //Indicator 생성
    slides.each(function(p){
        Indicator += '<div class="box"><a href="#"><span class="ir_su">'+(p+1)+'</span></a></div>';
    })
    IndicatorBox.html(Indicator);

    //Indicator 누르면 활성화
    IndicatorBox.find('div').click(function(ev){
        var idx = $(this).index();

        ev.preventDefault();
        IndicatorBox.find('div').removeClass('active');
        $(this).addClass('active');
        FadeSlide(idx);
    });

    function FadeSlide(p){
        slides.eq(p).fadeIn(1200).siblings().fadeOut();
        currentIdx = p;
    }

    //자동실행
    if(timer == undefined){
        timer = setInterval(goToNextSlide,5000);
    }
    function timerOn(){ //타이머의 값이 undefined이면 setInterval 실행하라고 합니다.
        if(timer == undefined){
            timer = setInterval(goToNextSlide,5000);
        }
    }
    function timerOff(){ //타이머의 값이 있으면 즉 setInterval(showNextSlide, 3500)값이 있으면 클리어하고 값을 다시 undefined로 저장.
        if(timer != undefined){
            clearInterval(timer);
            timer = undefined;
        }
    }
    pause.click(function(ev){
        ev.preventDefault();
        timerOff()
    })
    play.click(function(ev){
        ev.preventDefault();
        timerOn()
    });

    IndicatorBox.find('div').eq(currentIdx).addClass('active');

    /*한솔 매거진 슬라이드*/
    var $slide_box = $('.slide_box'),
        $maga = $('#magazine'),
        $slider = $slide_box.find('.slider'),
        $slider_slide = $slider.find('.slider_slide'),
        $slideLength = $slider_slide.length,
        $current = 0,
        $megaIndicator ='',
        $megaIndicatorBox = $('.mega-num_box'),
        $slider_arrow = $('.mega_arrow'),
        $easing = 'linear',
        $auto = undefined,
        $control = $('.mega-con'),
        $play = $control.find('#mega_play'),
        $pause = $control.find('#mega_pause');

    $slider_slide.each(function(i){
        var left = i*110+'%';
        $(this).css('left',left);

        $megaIndicator += '<div class="box"><a href="#"><span class="ir_su">'+(i+1)+'</span></a></div>';
    });
    $megaIndicatorBox.html($megaIndicator);

    $slider_arrow.find('a').click(function(ev){
        ev.preventDefault();
        if($(this).hasClass('mega_prev')){
            nextSlide($current-1);
        }else{
            nextSlide($current+1);
        }
    });

    function nextSlide(s){
        if(s == $slideLength){
            s = 0;
        }else if(s < 0){
            s = $slideLength-1;
        }
        var next = s*-110+'%';

        $slider.animate({left:next},600,$easing);
        $current = s;

        $megaIndicatorBox.find('div').removeClass('megga_active');
        $megaIndicatorBox.find('div').eq(s).addClass('megga_active');
    }

    $megaIndicatorBox.find('div').click(function(ev){
        var idx = $(this).index();

        ev.preventDefault();
        $megaIndicatorBox.find('div').removeClass('megga_active');
        $(this).addClass('megga_active');
        nextSlide(idx);
    });

    function startTimer(){
        $auto = setInterval(function(){
            var neId = ($current+1)%$slideLength;
            nextSlide(neId);
        },6000);
    }
    function stopTimer(){
        clearInterval($auto);
    }

    $pause.click(function(p){
        p.preventDefault();
        stopTimer();
    })
    $play.click(function(p){
        p.preventDefault();
        startTimer();
    });

    startTimer();
    $megaIndicatorBox.find('div').eq($current).trigger('click');

    /*한솔 홈데코 블로그 슬라이드*/
    var $blog_box = $('.blog_box'),
        $blog_slider = $blog_box.find('.blog_slider'),
        $blog_slide = $blog_slider.find('.blog_slide'),
        $blogLlength = $blog_slide.length,
        $cur = 0,
        $blog_arr = $('.blog_arrow'),
        $blogIndicator ='',
        $blogIndicatorBox = $('.blog-num_box');

    $blog_slide.each(function(i){
        var array = i*100+'%';
        $(this).css('left',array);

        $blogIndicator += '<div class="box"><a href="#"><span class="ir_su">'+(i+1)+'</span></a></div>';
    });
    $blogIndicatorBox.html($blogIndicator);

    $blog_arr.find('a').click(function(ev){
        ev.preventDefault();

        if($(this).hasClass('blog_prev')){
            blog_nextSlide($cur-1);
        }else{
            blog_nextSlide($cur+1);
        }
    });

    function blog_nextSlide(s){
        if(s == $blogLlength){
            s = 0;
        }else if(s < 0){
            s = $blogLlength-1;
        }
        var next = s*-100+'%';

        $blog_slider.animate({left:next},600);
        $cur = s;

        $blogIndicatorBox.find('div').removeClass('blog_active');
        $blogIndicatorBox.find('div').eq(s).addClass('blog_active');
    }

    $blogIndicatorBox.find('div').click(function(ev){
        var idx = $(this).index();

        ev.preventDefault();
        $blogIndicatorBox.find('div').removeClass('blog_active');
        $(this).addClass('blog_active');

        blog_nextSlide(idx);
    });

    $blogIndicatorBox.find('div').eq($cur).trigger('click');

    /*말줄임*/
    $('.not_bottom .not_left ul a div').each(function(){
        var cutLength = 35;

        if($(this).text().length >= cutLength){
            $(this).text($(this).text().substr(0,cutLength)+'...');
        }
    });

    /*푸터 콤보박스 슬라이드 효과*/
    $('.combo .combobox').click(function(ev){
        ev.preventDefault();
        var count =  $('.combo .combobox_cont li').length,
            height = count * 30 + 'px';

        $(this).toggleClass('open');
        if($(this).hasClass('open')){
            $('.combo .combobox_cont').css({
                'height':height,
                zIndex:1
            }).slideDown(300);
        }else{
            $('.combo .combobox_cont').slideUp(300);
        }
    });

    $('button a').click(function(ev){
        ev.preventDefault();

        $(this).toggleClass('ham');

        if(!$(this).hasClass('ham')){
            $(this).css({backgroundPosition:'-516px -196px'});
            $('#hamburger').slideDown(300);
        }else{
            $(this).css({backgroundPosition:'-453px -196px'});
            $('#hamburger').slideUp(300);
        }
    });
    $('#hamburger >ul >li:first-child').click(function(e){ 
        e.preventDefault();

        $(this).toggleClass('hamham_open');
        if($(this).hasClass('hamham_open')){
            $('.hamham').slideDown(300);

            $('#hamburger >ul >li >a span').text('<<');
        }else{
            $('.hamham').slideUp(300);

            $('#hamburger >ul >li >a span').text('>>');
        }
    });
});