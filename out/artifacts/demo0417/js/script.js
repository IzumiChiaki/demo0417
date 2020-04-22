//12.移动端顶部点击弹出下拉菜单
function Menu(menu,main){
    var onOff = true;
    $(menu).bind('click',function (){
        $(main).slideToggle();
    })
    $(main).find('li>a').bind('click',function (){
        if($(this).parent().hasClass('on')){
            $(this).parent().find('dl').slideUp();
            $(this).parent().removeClass('on');
            return false;
        };
        $(this).parent().siblings().removeClass('on');
        $(this).parent().siblings().find('dl').slideUp();
        $(this).parent().addClass('on');
        $(this).parent().find('dl').slideDown();
    })
};


//字号大小
function FontSize2(Size,obj){
    var iNum = 14;

    $(Size).find('.max').bind('click',function (){
        iNum+=2;
        if(iNum>=24){
            iNum = 24;
        }
        $(obj).css('font-size',iNum + 'px');
        return iNum;
    })

    $(Size).find('.mid').bind('click',function (){
        iNum = 14;
        $(obj).css('font-size',iNum + 'px');
        return iNum;
    })

    $(Size).find('.min').bind('click',function (){
        iNum-=2;
        if(iNum<=12){
            iNum = 12;
        }
        $(obj).css('font-size',iNum + 'px');
        return iNum;
    })
};
// 弹出新窗口打印
function doPrint() {
bdhtml=window.document.body.innerHTML;
sprnstr="<!--startprint-->";
eprnstr="<!--endprint-->";
prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);
prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
OpenWindow = window.open("");  
OpenWindow.document.write("<!DOCTYPE html PUBLIC '-\/\/W3C\/\/DTD XHTML 1.0 Transitional\/\/EN' 'http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-transitional.dtd'><html xmlns='http:\/\/www.w3.org\/1999\/xhtml'><HEAD><meta http-equiv=\"Content-Type\" content=\"text\/html; charset=utf-8\" \/><TITLE>打印页面<\/TITLE><link href=\"..\/css\/style.css\" rel=\"stylesheet\" type=\"text\/css\" \/><\/HEAD><BODY><div id=\"printbox\" ><\/div><\/BODY><\/HTML>"); 
OpenWindow.document.getElementById("printbox").innerHTML=prnhtml;  
OpenWindow.document.close(); 
OpenWindow.print();  
}
/*打印区的内容一定要加<!--startprint-->和<!--endprint-->标记*/

//下拉菜单JS
function nav(){
    var oNav = document.getElementById('nav');
    var aLi = oNav.getElementsByTagName('li');

    for(var i=0;i<aLi.length;i++)
    {
        aLi[i].onmouseover = function ()
        {
            this.className = 'on';
        }
        aLi[i].onmouseout = function ()
        {
            this.className = '';
        }
    }
};



function Banner(){
	var t = n = 0, count;
	$(document).ready(function(){
		count=$("#banner_list a").length;
		$("#banner_list a:not(:first-child)").hide();
		$("#banner_info").html($("#banner_list a").eq(0).find("img").attr('alt'));
		$("#bannerPic li").click(function() {
			var i = $(this).text() - 1;
			n = i;
			if (i >= count) return;
			$("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));
			$("#banner_info").unbind().click(function(){window.open($("#banner_list a").eq(i).attr('href'), "_blank")})
			$("#banner_list a").filter(":visible").fadeOut(1000).parent().children().eq(i).fadeIn(1000);
			document.getElementById("bannerPic").style.background="";
			$(this).toggleClass("on");
			$(this).siblings().removeAttr("class");
		});
		t = setInterval(showAuto, 3000);
		$("#bannerPic").hover(function(){clearInterval(t)}, function(){t = setInterval(showAuto, 3000);});
	})
	function showAuto()
	{
		n = n >=(count - 1) ? 0 : ++n;
		$("#bannerPic li").eq(n).trigger('click');
	}
}


/*--------------------图片区--------------------------*/
var shu=0;
	
	$('.pic ol li').mouseover(function(e) {
		shu+=1
        $(this).addClass('active').siblings().removeClass();
		$('#zz li').eq($(this).index()).css('z-index',shu).hide().fadeIn(800)
		
    });

/*--------------------图片区--------------------------*/



function DY_scroll(wraper,prev,next,img,speed,or)
                                             { 
                                              var wraper = $(wraper);
                                              var prev = $(prev);
                                              var next = $(next);
                                              var img = $(img).find('ul');
                                              var w = img.find('li').outerWidth(true);
                                              var s = speed;
                                              wraper.mouseover(function (){
                                                    prev.css('display','block');  
                                                    next.css('display','block');
                                              })
                                              wraper.mouseout(function (){
                                                    prev.css('display','none');  
                                                    next.css('display','none');
                                              })
                                              next.click(function()
                                                   {
                                                    img.animate({'margin-left':-w},function()
                                                              {
                                                               img.find('li').eq(0).appendTo(img);
                                                               img.css({'margin-left':0});
                                                               });
                                                    });
                                              prev.click(function()
                                                   {
                                                    img.find('li:last').prependTo(img);
                                                    img.css({'margin-left':-w});


                                                    img.animate({'margin-left':0});
                                                    });
                                              if (or == true)
                                              {
                                               ad = setInterval(function() { next.click();},s*1000);
                                               wraper.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() { next.click();},s*1000);});
                                              }
                                             }
                                             DY_scroll('.imgs_scroll','.prev','.next','.imgs_news_list',3,false);// true为自动播放，不加此参数或false就默认不自动




function topLink() {
    $("#subColumnpic").click(function(){
        $("#subColumbox").toggle(300);
    });
};

/*--------------------注销、删除提示--------------------------*/
function wc() {
    var result=confirm(" 确 定 注 销 ？ ");
    return result;
}

function del() {
    var result1=confirm(" 确 定 删 除 ？ ");
    return result1;
}
