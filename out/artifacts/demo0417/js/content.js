function content(timeSpeed, picSpeed) {
   
    var k = 0;
    var c = 0; 
    $(".lunbo ul li:first").clone().appendTo($(".lunbo ul"));
    $(".right1").click(function(event) {
        autoplay();
    });
    $(".left1").click(function(event) {
        k--;
        console.log(k);
        if (k < 0) {
            k = $(".lunbo ul li").length - 2;
            $(".lunbo ul").css("left", -($(".lunbo ul li").length - 1) * $(".lunbo ul li").width());
        }
        $(".lunbo ul").stop().animate({
            "left": -k * $(".lunbo ul li").width()
        }, picSpeed);
        c--;
        if (c < 0) {
            c = $(".lunbo ol li").length - 1;
        }
        $(".lunbo ol li").eq(c).show().siblings().hide();

    });

    var timer = setInterval(autoplay, timeSpeed);

    function autoplay() {
        k++;
        if (k > $(".lunbo ul li").length - 1) {
            k = 1;
            $(".lunbo ul").css("left", 0);
        }
        $(".lunbo ul").stop().animate({
            "left": -k * $(".lunbo ul li").width()
        }, picSpeed);
        c++;
        if (c > $(".lunbo ol li").length - 1) {
            c = 0;
        }
        $(".lunbo ol li").eq(c).show().siblings().hide();
    }
    $(".content_left_top").hover(function() {
        clearInterval(timer);
        timer = null
    }, function() {
        clearInterval(timer);
        timer = setInterval(autoplay, timeSpeed)
    });

/*    右轮播开始*/
    $(".lunbo1 ul li:first").clone().appendTo($(".lunbo1 ul"));
    var k1 = 0;
    var c1 = 0;
    $(".right2").click(function(event) {
        autoplay1()
    });
    $(".left2").click(function(event) {
        k1--;
        if (k1 < 0) {
            k1 = $(".lunbo1 ul li").length - 1;
            $(".lunbo1 ul").css("left", -($(".lunbo1 ul li").length - 1) * $(".lunbo1 ul li").width());
        }
        $(".lunbo1 ul").stop().animate({
            "left": -k1 * $(".lunbo1 ul li").width()
        }, picSpeed);
        c1--;
        if (c1 < 0) {
            c1 = $(".lunbo1 ol li").length - 1;
        }
        $(".lunbo1 ol li").eq(c1).show().siblings().hide();

    });

    var timer1 = setInterval(autoplay1, timeSpeed);

    function autoplay1() {
        k1++;
        if (k1 > $(".lunbo1 ul li").length - 1) {
            k1 = 1;
            $(".lunbo1 ul").css("left", 0);
        }
        $(".lunbo1 ul").stop().animate({
            "left": -k1 * $(".lunbo1 ul li").width()
        }, picSpeed);
        c1++;
        if (c1 > $(".lunbo1 ol li").length - 1) {
            c1 = 0
        }
        $(".lunbo1 ol li").eq(c1).show().siblings().hide();
    }
    $(".content_right_top").hover(function() {
        clearInterval(timer1);
        timer1 = null
    }, function() {
        clearInterval(timer1);
        timer1 = setInterval(autoplay1, timeSpeed)
    });

   /* ---------------TAB栏切换--------------------*/

       
}
