/**
* 2015-01-29 去兜风 - 馒头
* 表单组件 1.0 版本
*/

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };
  
  //console.log("===",this)
  
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 

//给制定的日期添加天数/月/年
function DateAdd(interval,number,date){
/*
  *   功能:实现VBScript的DateAdd功能.
  *   参数:interval,字符串表达式，表示要添加的时间间隔.
  *   参数:number,数值表达式，表示要添加的时间间隔的个数.
  *   参数:date,时间对象.
  *   返回:新的时间对象.
  *   var   now   =   new   Date();
  *   var   newDate   =   DateAdd( "d",5,now);
  *---------------   DateAdd(interval,number,date)   -----------------
  */
        switch(interval)
        {
                case   "y"   :   {
                        date.setFullYear(date.getFullYear()+number);
                        return   date;
                        break;
                }
                case   "q"   :   {
                        date.setMonth(date.getMonth()+number*3);
                        return   date;
                        break;
                }
                case   "m"   :   {
                        date.setMonth(date.getMonth()+number);
                        return   date;
                        break;
                }
                case   "w"   :   {
                        date.setDate(date.getDate()+number*7);
                        return   date;
                        break;
                }
                case   "d"   :   {
                        date.setDate(date.getDate()+number);
                        return   date;
                        break;
                }
                case   "h"   :   {
                        date.setHours(date.getHours()+number);
                        return   date;
                        break;
                }
                case   "m"   :   {
                        date.setMinutes(date.getMinutes()+number);
                        return   date;
                        break;
                }
                case   "s"   :   {
                        date.setSeconds(date.getSeconds()+number);
                        return   date;
                        break;
                }
                default :   {
                        date.setDate(date.getDate()+number);
                        return  date;
                        break;
                }
        }
}

//表单验证
var validateRegExp = {
    decmal: "^([+-]?)\\d*\\.\\d+$",// 浮点数
    decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",// 正浮点数
    decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",// 负浮点数
    decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",// 浮点数
    decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",// 非负浮点数（正浮点数 + 0）
    decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",// 非正浮点数（负浮点数 +0
    intege: "^-?[1-9]\\d*$",// 整数
    intege1: "^[1-9]\\d*$", // 正整数
    intege2: "^-[1-9]\\d*$",// 负整数
    num: "^([+-]?)\\d*\\.?\\d+$",// 数字
    num1: "^[1-9]\\d*|0$",// 正数（正整数 + 0）
    num2: "^-[1-9]\\d*|0$",// 负数（负整数 + 0）
    ascii: "^[\\x00-\\xFF]+$",// 仅ACSII字符
    chinese: "^[\\u4e00-\\u9fa5]+$",// 仅中文
    color: "^[a-fA-F0-9]{6}$",// 颜色
    date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",// 日期
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",// 邮件
    idcard: "^[1-9]([0-9]{14}|[0-9]{17})$",// 身份证
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",// ip地址
    letter: "^[A-Za-z]+$",// 字母
    letter_l: "^[a-z]+$",// 小写字母
    letter_u: "^[A-Z]+$",// 大写字母
    mobile: "^0?(13|15|18|14|17)[0-9]{9}$",// 手机
    notempty: "^\\S+$",// 非空
    password: "^.*[A-Za-z0-9\\w_-]+.*$",// 密码
    fullNumber: "^[0-9]+$",// 数字
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",// 图片
    qq: "^[1-9]*[1-9][0-9]*$",// QQ号码
    rar: "(.*)\\.(rar|zip|7zip|tgz)$",// 压缩文件
    tel: "^[0-9\-()（）]{7,18}$",// 电话号码的函数(包括验证国内区号,国际区号,分机号)
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",// url
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$",// 户名
    deptname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",// 单位名
    zipcode: "^\\d{6}$",// 邮编
    realname: "^[A-Za-z\\u4e00-\\u9fa5]+$",// 真实姓名
    companyname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
    companyaddr: "^[A-Za-z0-9_()（）\\#\\-\\u4e00-\\u9fa5]+$",
    companysite: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&#=]*)?$"
};

var qdf_check=function(type,value){
	var $qdf=value.replace(/(^\s*)|(\s*$)/g, "");
	switch(type){
		case "decmal": return RegExp(validateRegExp.decmal).test($qdf); break;// 浮点数
		case "decmal1": return RegExp(validateRegExp.decmal1).test($qdf); break;// 正浮点数
		case "decmal2": return RegExp(validateRegExp.decmal2).test($qdf); break;// 负浮点数
		case "decmal3": return RegExp(validateRegExp.decmal3).test($qdf); break;// 浮点数
		case "decmal4": return RegExp(validateRegExp.decmal4).test($qdf); break;// 非负浮点数（正浮点数 + 0）
		case "decmal5": return RegExp(validateRegExp.decmal5).test($qdf); break;// 非正浮点数（负浮点数 +0
		case "intege": return RegExp(validateRegExp.intege).test($qdf); break;// 整数
		case "intege1": return RegExp(validateRegExp.intege1).test($qdf); break; // 正整数
		case "intege2": return RegExp(validateRegExp.intege2).test($qdf); break;// 负整数
		case "num": return RegExp(validateRegExp.num).test($qdf); break;// 数字
		case "num1": return RegExp(validateRegExp.num1).test($qdf); break;// 正数（正整数 + 0）
		case "num2": return RegExp(validateRegExp.num2).test($qdf); break;// 负数（负整数 + 0）
		case "ascii": return RegExp(validateRegExp.ascii).test($qdf); break;// 仅ACSII字符
		case "chinese": return RegExp(validateRegExp.chinese).test($qdf); break;// 仅中文
		case "color": return RegExp(validateRegExp.color).test($qdf); break;// 颜色
		case "date": return RegExp(validateRegExp.date).test($qdf); break;// 日期
		case "email": return RegExp(validateRegExp.email).test($qdf); break;// 邮件
		case "idcard": return RegExp(validateRegExp.idcard).test($qdf); break;// 身份证
		case "ip4": return RegExp(validateRegExp.ip4).test($qdf); break;// ip地址
		case "letter": return RegExp(validateRegExp.letter).test($qdf); break;// 字母
		case "letter_l": return RegExp(validateRegExp.letter_l).test($qdf); break;// 小写字母
		case "letter_u": return RegExp(validateRegExp.letter_u).test($qdf); break;// 大写字母
		case "mobile": return RegExp(validateRegExp.mobile).test($qdf); break;// 手机
		case "notempty": return RegExp(validateRegExp.notempty).test($qdf); break;// 非空
		case "password": return RegExp(validateRegExp.password).test($qdf); break;// 密码
		case "fullNumber": return RegExp(validateRegExp.fullNumber).test($qdf); break;// 数字
		case "picture": return RegExp(validateRegExp.picture).test($qdf); break;// 图片
		case "qq": return RegExp(validateRegExp.qq).test($qdf); break;// QQ号码
		case "rar": return RegExp(validateRegExp.rar).test($qdf); break;// 压缩文件
		case "tel": return RegExp(validateRegExp.tel).test($qdf); break;// 电话号码的函数(包括验证国内区号,国际区号,分机号)
		case "url": return RegExp(validateRegExp.url).test($qdf); break;// url
		case "username": return RegExp(validateRegExp.username).test($qdf); break;// 户名
		case "deptname": return RegExp(validateRegExp.deptname).test($qdf); break;// 单位名
		case "zipcode": return RegExp(validateRegExp.zipcode).test($qdf); break;// 邮编
		case "realname": return RegExp(validateRegExp.realname).test($qdf); break;// 真实姓名
		case "companyname": return RegExp(validateRegExp.companyname).test($qdf); break;
		case "companyaddr": return RegExp(validateRegExp.companyaddr).test($qdf); break;
		case "companysite": return RegExp(validateRegExp.companysite).test($qdf); break;
	}
};

var qdf_self_input = null;

/**
*	获取多选的值,return arr数组
*/
function getSevenCheckboxValue($className){
	var arr = [];
	$className.each(function(){
		arr.push($(this).attr("data"));
	});
	return arr;
};

//默认回调函数为空 - 多选
function returnCheckBoxVal(checkedClass){
	//console.log(checkedClass);
};

//默认回调函数为空 - 下拉选择
function returnSelectVal(spanId){
	//console.log(spanId);
};

//默认回调函数为空 - 单选
function returnRadioVal(spanClass){
	//console.log(spanClass);
};

/**
*	点击多选的时候，获取所有多选的值,回调函数 ， 写法如下， 多选的时候使用 switch 判断 className
*/
//function returnCheckBoxVal(checkedClass){
//	var arr = [];
//	$("."+checkedClass).each(function(index, element) {
//        arr.push($(this).attr("data"));
//    });
//	console.log(arr);
//};

//初始化全局函数
$(function(){
	
	//赋值
	qdf_self_input = {
		
		/**
		*	输入框光标事件初始化
		*/
		iniFocus : function(){
			//输入框 - 组件光标
			$("input.s-input").on("focusin",function(){
				$(this).css({
					"border" : "1px solid #18e698"	
				});	
			}).on("focusout",function(){
				$(this).css({
					"border" : "1px solid #cccccc"	
				});	
			});	
		}, //iniFocus();
		
		/**
		*	自定义下拉选择 , callback 回调
		*/
		sevenSelect : function(callback){
			
			var $allSelect = $(".s-select");
			
			//初始化高度
			var iniHeight = function(){
				$allSelect.each(function(index, element) {
					$(this).data("height",$(this).find("ul").height());
				});	
			};
			
			//select展开
			var openSelect = function(sel){
				$allSelect.find("ul").css({
					"display":"none"
					//"height":0	
				});
				$allSelect.css("z-index",0);
				sel.$this.css("z-index",9999);
				
				sel.$ul.css({
					"display":"block"
					//"height":0
				});
	//			sel.$ul.animate({
	//				"height" : sel.height
	//			},sel.delay);
			};
			
			//select关闭
			var closeSelect = function(sel){
				$(document).off('click.'+sel.spanId);
				if(sel.delay == 0){
					sel.$ul.css({
						"display":"none"
						//"height":0
					});	
					$allSelect.css("z-index",0);
					sel.$this.removeAttr("style");
				}
				else {
					sel.$ul.animate({
						//"height" : 0
					},sel.delay,function(){
						sel.$ul.css({
							"display":"none"
							//"height":0
						});	
						sel.$this.removeAttr("style");
					});	
				}
			};
			
			var bindEvent = function(){
				//自定义select框
				$allSelect.each(function(){
					
					var sel = {
						spanId : null,
						$this : null,
						$ul : null,
						height : null,
						delay : 0 //单位毫秒	
					};
					
					var $this = $(this).find("span");
					
					//如果span里面的内容为空，初始placeholder参数
					if($this.html() == ""){
						$this.html($this.attr("placeholder"));	
					}
					
					//绑定点击事件
					$this.off("click.bindEvent").on("click.bindEvent",function(e){
						//iniHeight();
						e.stopPropagation();
						sel.$this = $this.parent();
						sel.spanId = $this.attr("id");
						sel.$ul = sel.$this.find("ul");
						//sel.height = sel.$this.data("height");
						sel.height = sel.$ul.find("li").length * 29;
						
						//如果隐藏才显示
						if(sel.$ul.css("display") == "none"){
	
							openSelect(sel);	
							
							//动态绑定
							sel.$ul.on("click.bindEventUl","li",function(){
								$this.html($(this).html());
								$this.attr("data",$(this).attr("data"));
								returnSelectVal(sel.spanId);
								//closeSelect(sel);
								sel.$ul.off("click.bindEventUl");
							});
							
						}
						else{
							closeSelect(sel);
						}
						
						//点击span区域外的区域 - 缩回菜单
						$(document).on('click.'+sel.spanId,function(e){
							var e = e || window.event; //浏览器兼容性
							var elem = e.target || e.srcElement;
							//console.log("====",elem.id);
							if(elem.id == sel.spanId){
								return;
							}
							closeSelect(sel);
						});
						
					});	//end click
				});
			};
			iniHeight();
			bindEvent();
			//初始化 - 选择框
		}, //sevenSelect();
		
		/**
		*	自定义radio - 单选
		*/
		sevenRadio : function(){
			$(".s-radio").each(function(){
				var $this = $(this);
				var _obj = {
					$cthis : null,
					$state : $this.find(".s-radio-state"),
					className : null,
					$group : null,
					radioOff : '<i class="s-ico s-ico-radioOff"></i>',
					radioOn : '<i class="s-ico s-ico-radioOn"></i>'
				};
				_obj.className = _obj.$state.attr("class").replace("s-radio-state","").replace(" ","");
				_obj.$group = $("." + _obj.className);
				
				//初始化状态
				var iniRadioState = function(){
					if(_obj.$state.attr("id") != _obj.className + "_checked"){
						_obj.$state.html(_obj.radioOff);
					}
					else{
						_obj.$state.html(_obj.radioOn);	
					}
				};iniRadioState();
				
				//选择
				$this.off("click").on("click",function(){
					_obj.$group.html(_obj.radioOff).removeAttr("id");
					_obj.$state.html(_obj.radioOn).attr("id",_obj.className + "_checked");
					returnRadioVal(_obj.className);
				});
				
			});
		}, //sevenRadio();
		
		/**
		*	自定义checkbox - 多选
		*/
		sevenCheckbox : function(){
			$(".s-checkbox").each(function(){
				var $this = $(this);
				var _obj = {
					$cthis : null,
					$state : $this.find(".s-checkbox-state"),
					className : null,
					$group : null,
					checkboxOff : '<i class="s-ico s-ico-checkboxOff"></i>',
					checkboxOn : '<i class="s-ico s-ico-checkboxOn"></i>',
					checkdiabled : '<i class="s-ico s-ico-checkboxdisabled"></i>'
				};
				_obj.className = _obj.$state.attr("class").replace("s-checkbox-state","").replace("_checked","").replace(" ","").split(" ")[0];
				_obj.$group = $("." + _obj.className);
				
				//初始化状态
				var iniRadioState = function(){
					if(_obj.$state.attr("class").indexOf("_checked") == -1){
						_obj.$state.html(_obj.checkboxOff);
					}
					else{
						_obj.$state.html(_obj.checkboxOn);
					}
					
					if($this.attr("disabled") != undefined){
						_obj.$state.html(_obj.checkdiabled);	
					}
					
				};iniRadioState();
				
				//选择
				$this.off("click").on("click",function(e){
					if($(this).attr("disabled") != undefined){
						return ;
					}
					if(_obj.$state.attr("class").indexOf(_obj.className + "_checked") == -1){
						_obj.$state.html(_obj.checkboxOn);
						_obj.$state.html(_obj.checkboxOn).addClass(_obj.className + "_checked");
						returnCheckBoxVal(_obj.className + "_checked");
					}
					else{
						_obj.$state.html(_obj.checkboxOff).removeClass(_obj.className + "_checked")
						_obj.$state.html(_obj.checkboxOff);	
						returnCheckBoxVal(_obj.className + "_checked");
					}
				});
				
			});
		}, //sevenCheckbox();
		
		/**
		 * 提示的弹窗 ,
		 * str:提示的字符串
		 * color:字体的颜色，有4个值：success，warning，danger，default
		 * t:显示的时间，如果不传值，不自动关闭
		 */
		autoTimeClose : function(str,color,t){ 
			var da = "autowindow_"+new Date().getTime();
			var c = "#666";
			var imgsrc = "/Public/images/default.png";
			switch(color){
				case "success":{c = "#4bad4b"; imgsrc = "/Public/images/success.png"};break;
				case "warning":{c = "#e56c0c"; imgsrc = "/Public/images/warning.png"};break;
				case "danger":{c = "#d83832"; imgsrc = "/Public/images/danger.png"};break;
				case "loading":{c = "#666"; imgsrc = "/Public/images/loading.gif"};break;
			}
			var closeDa = function(){
				var $da = $("#"+da);
				$da.fadeOut(500,function(){
					$da.remove();
				});
			};
			//自动关闭的弹窗
			if(t != undefined){
				$("body").append('<div id="'+da+'" style="position:fixed; color:'+c+'; background:#fff; z-index:100000; width:200px; border-radius:5px; box-shadow:0 0 5px #ccc; text-align:center; left:50%; top:50%; margin:-30px 0 0 -100px;"><div style="margin-top:10px"><img src="'+imgsrc+'"></div><div style="margin:5px; margin-bottom:10px;">'+str+'</div></div>');
				setTimeout(function(){
					closeDa();
				},t);
			}else{
				$("body").append('<div id="'+da+'" style="position:fixed; color:'+c+'; background:#fff; z-index:100000; width:280px; border-radius:5px; box-shadow:0 0 5px #333; text-align:center; left:50%; top:200px; margin:0 0 0 -140px;"><a href="javascript:void(0);" class="'+da+'_del" style="position:absolute; right:5px; top:5px;"><img src="/Public/images/icon-close-small.png"></a><div style="margin-top:10px"><img src="'+imgsrc+'"></div><div style="margin:10px 5px 10px 5px;">'+str+'</div><div><a style="display:inline-block; color:#ccc; padding:2px 12px; border:1px solid #ccc; border-radius:3px; margin:10px;" href="javascript:void(0)" class="'+da+'_del">关闭</a><a style="color:#4bad4b; padding:2px 12px; border:1px solid #4bad4b; border-radius:3px; margin:10px; display: inline-block;" href="javascript:void(0)" class="'+da+'_del doyes">确定</a></div></div>');
				$("."+da+"_del").on("click",function(e){
					closeDa();
					if(e.currentTarget.className.indexOf("doyes") != -1){
						return true;
					}else{
						return false;
					}
				});
			}
			
		},
		
		/**
		*	自定义s-slider 滑块插件
		*/
		sevenSlider : function(){
			$(".s-slider").each(function(index, element) {
	            var $this = $(this);
				var _obj = {
					$tips : $this.find("span.s-slider-tips"),
					$bar : $this.find("em.s-slider-bar"),
					$btn : $this.find("i.s-ico-slider"),
					data : null,//返回是 maxData:xx,minData:xx,iniData:xx
					width : null,//slider的宽
					value : null, //区间的值
					padding : 10 //滑块偏移
				};
				
				_obj.width = parseFloat($this.width());
				_obj.data = eval( "({" + $this.attr("data") + "})" );
				//数值转换
				_obj.data.minData = parseFloat(_obj.data.minData);
				_obj.data.maxData = parseFloat(_obj.data.maxData);
				_obj.data.iniData = parseFloat(_obj.data.iniData);
				_obj.value = _obj.data.maxData - _obj.data.minData;
	
				//初始化参数
				var iniSliderEmPosition = function(){
					var width = (_obj.data.iniData - _obj.data.minData)/_obj.value*_obj.width;
					_obj.$bar.width(width);
					_obj.$btn.css("left" , width - _obj.padding);
					_obj.$tips.html("<i class='minData'>" + _obj.data.minData + "</i> - <i class='endData'>" + _obj.data.iniData + "</i>");
				};iniSliderEmPosition();
				
				//点击事件
				_obj.$btn.on("mousedown",function(e){
					var ev = {
						x_start : null,
						x_move : null,
						x_end : null,
						left_start : null,
						moveWidth :　null
					};
					ev.x_start = e.pageX;
					ev.left_start = _obj.$btn.position().left;
					
					var pData = null;
					var mData = null;
					$(document).on("mousemove.sevenSlider",function(e){
						ev.x_move = e.pageX - ev.x_start;
						ev.moveWidth = ev.x_move + ev.left_start;
						if( ev.moveWidth >= - _obj.padding && ev.moveWidth <= _obj.width - _obj.padding){
							_obj.$btn.css({
								"left" : ev.moveWidth
							});
							_obj.$bar.width( ev.moveWidth + _obj.padding);
						}
						
						//设置值
						pData = ((_obj.$btn.position().left + _obj.padding)/_obj.width).toFixed(2);
						mData = null ;
						if(pData <= 0.02){
							pData = 0;
						}
						if(pData >=0.98){
							pData = 1.0	
						}
						mData = parseFloat(((_obj.data.maxData - _obj.data.minData)*pData).toFixed(0)) + _obj.data.minData;
						_obj.$tips.html( "<i class='minData'>" + _obj.data.minData + "</i> - <i class='endData'>" + mData + "</i>");
						
					}).on("mouseup.sevenSlider",function(e){
						$(document).off("mousemove.sevenSlider mouseup.sevenSlider");
					});
				});
				
	        });	
		} //sevenSlider();	
	};

	qdf_self_input.iniFocus(); //输入框光标变化
	qdf_self_input.sevenCheckbox(); //多选框
	qdf_self_input.sevenRadio(); //单选框
	qdf_self_input.sevenSelect(); //下拉框
	qdf_self_input.sevenSlider(); //滚动插件

});

///气泡提示
$(function(){
	$(document).on("mouseenter",".ico-min",function(){
		////console.log(232);
		var $this = $(this);
		var info = "";
		switch($this.attr("class")){
			case "ico-min ico-bicycle-min" : info="自行车" ;break;
			case "ico-min ico-selfdriv-min" : info="自驾" ;break;
			case "ico-min ico-car-min" : info="越野车" ;break;
			case "ico-min ico-camper-min" : info="房车" ;break;
			case "ico-min ico-motor-min" : info="摩托车" ;break;
			case "ico-min ico-foot-min" : info="徒步" ;break;
			case "ico-min ico-diving-min" : info="潜水diving" ;break;
			case "ico-min ico-water-min" : info="潜水" ;break;
			case "ico-min ico-drift-min" : info="漂流" ;break;
			case "ico-min ico-kayak-min" : info="皮划艇" ;break;
			case "ico-min ico-ship-min" : info="游船" ;break;
			case "ico-min ico-ski-min" : info="滑雪" ;break;
			case "ico-min ico-whale-min" : info="观鲸" ;break;
			case "ico-min ico-horse-min" : info="骑马" ;break;
			case "ico-min ico-ice-min" : info="攀冰" ;break;
			case "ico-min ico-cavers-min" : info="探洞" ;break;
			case "ico-min ico-camp-min" : info="露营" ;break;
		};
		
		if(info == ""){
			return false;	
		}
		
		$('<span id="ico_min_info" style=" background:#fff; font-size:12px; padding:2px 5px; border-radius:2px; box-shadow:0 0 5px #777777; position: absolute; z-index:20000;">'+info+'</span>').appendTo("body");
		var $ico_min_info = $("#ico_min_info");
		$(document).off("mousemove.ico_min_info").on("mousemove.ico_min_info",function(e){
			$ico_min_info.css({
				"left" :　e.pageX+15,
				"top" : e.pageY+15
			});
		});
	}).on("mouseout",function(e){
		$("#ico_min_info").remove();
		$(document).off("mousemove.ico_min_info");
	});	
});

