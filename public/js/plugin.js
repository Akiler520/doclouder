// JavaScript Document
/**

页面居中

简单使用：

$('#cbox1').center();
不是所有人都喜欢让某元素垂直居中，同时想要它跟随屏幕滚动的话，可以这样配置(所有在此合理配置的CSS样式都将被应用)：

$('#cbox2').center();
要让#cobx1脱离父容器(假定它是静态定位)的话：

$('#cbox1').center();

*/
jQuery.fn.center = function(f) {  
    return this.each(function(){  
        var p = f===false?document.body:this.parentNode;  
        if ( p.nodeName.toLowerCase()!= "body" && jQuery.css(p,"position") == 'static' )  
            p.style.position = 'relative';  
        var s = this.style;  
        s.position = 'absolute';  
        if(p.nodeName.toLowerCase() == "body")  
            var w=$(window);  
        if(!f || f == "horizontal") {  
            s.left = "0px";  
            if(p.nodeName.toLowerCase() == "body") {  
                var clientLeft = w.scrollLeft() - 10 + (w.width() - parseInt(jQuery.css(this,"width")))/2;  
                s.left = Math.max(clientLeft,0) + "px";  
            }else if(((parseInt(jQuery.css(p,"width")) - parseInt(jQuery.css(this,"width")))/2) > 0)  
                s.left = ((parseInt(jQuery.css(p,"width")) - parseInt(jQuery.css(this,"width")))/2) + "px";  
        }  
        if(!f || f == "vertical") {  
            s.top = "0px";  
            if(p.nodeName.toLowerCase() == "body") {  
                var clientHeight = w.scrollTop() - 10 + (w.height() - parseInt(jQuery.css(this,"height")))/2;  
                s.top = Math.max(clientHeight,0) + "px";  
            }else if(((parseInt(jQuery.css(p,"height")) - parseInt(jQuery.css(this,"height")))/2) > 0)  
                s.top = ((parseInt(jQuery.css(p,"height")) - parseInt(jQuery.css(this,"height")))/2) + "px";  
        }  
    });  
};  



/**

页面居中

简单使用：

$('#cbox1').center();
不是所有人都喜欢让某元素垂直居中，同时想要它跟随屏幕滚动的话，可以这样配置(所有在此合理配置的CSS样式都将被应用)：

$('#cbox2').center({position:'fixed',top:'30%'});
要让#cobx1脱离父容器(假定它是静态定位)的话：

$('#cbox1').center2({relative:false});

*/
(function ($) {
  $.fn.center2 = function (settings) {
    var style = $.extend({
      position: 'absolute', //absolute or fixed
      top     : '50%', //50%即居中，将应用负边距计算，溢出不予考虑了。
      left    : '50%',
      zIndex  : 3000,
      relative: true //相对于包含它的容器居中还是整个页面
    }, settings || {});

    return this.each(function () {
      var $this = $(this);

      if (style.top == '50%') style.marginTop = -$this.outerHeight() / 2;
      if (style.left == '50%') style.marginLeft = -$this.outerWidth() / 2;
      if (style.relative && !$this.parent().is('body') && $this.parent().css('position') == 'static') $this.parent().css('position', 'relative');
      delete style.relative;
      //ie6
      if (style.position == 'fixed' && $.browser.version == '6.0') {
        style.marginTop += $(window).scrollTop();
        style.position = 'absolute';
        $(window).scroll(function () {
          $this.stop().animate({
            marginTop: $(window).scrollTop() - $this.outerHeight() / 2
          });
        });
      }

      $this.css(style);
    });
  };
})(jQuery);


/**
* 	selectMt 0.1 
* 	Copyright (c) 2014 MANTOU http://www.mtsee.com/ 
* 	Date: 2014-08-17 
*	封装下拉菜单插件	
*   方法名： selectMt 点击后返回选择项
*	结构如下：

css:

.downNav{display:inline-block; border:1px solid #e1e1e1; border-radius:2px; font-size:14px; height:14px; width:92px; height:30px; float:right; margin-top:13px; line-height:30px; text-indent:10px; position:relative;}
.downNav span{ width:100%; height:100%; display:block; cursor:pointer; background:#f6f6f6;}
.downNav span i{ width:10px; height:10px; display:inline-block; background:url(../images/index.png) no-repeat -3px -115px; margin-left:8px;}
.downNav span:hover{ background:#ff6060; color:#FFF; border-radius:2px;}
.downNav span:hover i{background:url(../images/index.png) no-repeat -3px -129px;}
.downNav ul{ display:none; width:100%; position:absolute; top:32px; border-left:1px solid #CCC; border-right:1px solid #CCC; margin:-1px; max-height:200px; overflow:auto;}
.downNav ul li{ float:left; width:100%; height:30px; border-bottom:1px solid #CCC; line-height:30px; margin-left:0; text-align:center; background:#FFF; cursor:pointer; text-indent:0;}
.downNav ul li:hover{background:#ff6060; color:#FFF;}

html:

<div class="downNav" id="" dataValue="默认内容">
	<span>默认内容<i></i></span>
	<ul>
		<li>列表1</li>
		<li>列表2</li>
		<li>列表3</li>
	</ul>
</div>

使用方法：

$("对象ID").selectMt({callback:回调函数名称}); //回调函数名称不加括号，值返回给回调函数

*/

;(function($){ 
	$.fn.selectMt = function(setting){ 
		var defaults = { 
			callback : null //默认回调函数为空
		} 
		//如果setting为空，就取default的值
		var setting = $.extend(defaults, setting); 
		this.each(function(){ 
		//插件实现代码 
			var $this = $(this);
			var $span = $this.find("span");
			var $ul = $this.find("ul");
			var $li = $ul.find("li");

			$span.click(function(){
			   if($ul.is(":hidden")){
			   	  $ul.css({"display":"block"});
			   }
			   else{
				 $ul.css({"display":"none"});   
			   } 
			});
			
			$li.on("click",function(){
			   $ul.css({"display":"none"});
			   var selectValue = $(this).html();
			   $this.attr("dataValue",selectValue);
			   $span.html(selectValue+"<i></i>");
			   if(setting.callback != null){
			   		setting.callback(selectValue);//运行完后设置回调函数
			   }
			});	
		});
	}
})(jQuery); 


/**
*	弹窗插件
*	弹窗的窗口，对象必须是ID,关闭按钮的class = close
*   页面里面必须有蒙版层 
	<!--蒙版层--> 
	HTML:
	<div class="fixedBox" id="fixedBox"></div>
	CSS:
	.fixedBox{ position:fixed; background:#000; opacity:0.5; filter:alpha(opacity=50); -moz-opacity:0.5; width:100%; height:100%; top:0; z-index:2999; display:none;}
*/
;(function($){ 
	$.fn.showWindow = function(setting){ 
		var defaults = { 
			id : null, //默认回调函数为空
			speed : 300, //显示速度
			before : null ,//弹窗前执行前的函数
		} 
		//如果setting为空，就取default的值
		var setting = $.extend(defaults, setting); 
		this.each(function(){ 
			var $this = $(this);
			//插件实现代码 
			if(setting.id == null ){
				alert("showWindow插件必须填入一个name参数，且必须是ID!");
				return	
			}		
			var $fixedBox = $("#fixedBox");
			var box = "#"+setting.id;
			var speed = setting.speed;
			var $loginBox = $(box);
			$this.click(function(){
				$fixedBox.fadeIn(speed);
				setting.before();
				$loginBox.center().fadeIn(speed).find(".close").on("click",function(){
					var $thisbtn = $(this);
					$thisbtn.parent().fadeOut(speed,function(){
						$thisbtn.off("click");
						$fixedBox.fadeOut(speed);
					});
				});
			});
		});
	}
})(jQuery); 