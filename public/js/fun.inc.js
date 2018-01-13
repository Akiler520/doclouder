//将表单TEXTAREA控件点入时，光标在空间开头的地方
function trimTextArea(id)
{
	$("#"+id).val($.trim($("#content").val()));
}

//键盘按下时，表单控件值只能为数字 onKeyUp="this.value=format_int(this.value);"
function format_int(str)
{
	var num = str.toString().replace(/[^\d]/igm,'');
	return num;
}

//页面加载后，确定焦点所在的位置
function onFocus(id)
{
	document.getElementById(id).focus();
}

//检测时间先后顺序
function checkStartEndTime(start_time,end_time)
{
	if($("#"+start_time).val() && $("#"+end_time).val())
	{
		if($("#"+start_time).val() >= $("#"+end_time).val())
		{
			alert("温馨提示：会议开始时间晚于会议结束日期，请检查。");
			$("#"+start_time).val("");
			$("#"+end_time).val("");
		}
	}
}

//列表鼠标划过每行变色
function changeRowColor(obj, objColor)
{
	obj.style.backgroundColor=objColor;
}

//成员复选框层级列表
function showSubList(id,name,obj)
{
	if('none' == $("#"+id).next().css("display") && name != $("#"+id).next().attr("name"))
	{
		obj.style.background = "url('/images/admin/close.gif')";
		$("#"+id).next().show();
	}
	else if('none' != $("#"+id).next().css("display") && name != $("#"+id).next().attr("name"))
	{
		obj.style.background = "url('/images/admin/open.gif')";
		$("#"+id).next().hide();
	}
}

//页面左侧菜单显示切换
function switchSysBarBeta()
{
	if("no" == $("#left_list_show_or_hidden").html())
	{
		$("#left_list_switch").html($("#click_hidden").html());
		$("#left_list_show_or_hidden").html("yes");
		$("#left_list").slideDown("normal");
	}
	else
	{
		$("#left_list_switch").html($("#click_show").html());
		$("#left_list_show_or_hidden").html("no");
		$("#left_list").slideUp("normal");
	}
}

//顶部导航按钮切换
function setTab(name,cursel,n)
{
	for(i=1;i<=n;i++)
	{
		var menu=document.getElementById(name+i);
		var con=document.getElementById("con_"+name+"_"+i);
		menu.className=i==cursel?"current":"";
	}
}

//菜单权限控制函数
function clearUserGroupPurview(menu_id,parent_menu_ids,level)
{
	if($("#menu_"+menu_id).attr("checked"))
	{
		var arr_parent_menu = parent_menu_ids.split("@");
		for(var i=0; i<arr_parent_menu.length; i++)
		{
			if(arr_parent_menu[i] > 0)
			{
				$("#menu_"+arr_parent_menu[i]).attr("checked","checked");
			}
		}
	}
	else
	{
		var break_point = 0;
		$("input[name='group_purview[]']").each(function(){
			if("menu_"+menu_id == this.id)
			{
				break_point = 1;
			}
			if(1 == break_point)
			{
				if(level < this.level)
				{
					this.checked = '';
				}
			}
			if(level >= this.level && 1 == break_point && "menu_"+menu_id != this.id)
			{
				return false;
			}
		});
	}
}

//多选：全选
function selectCheckBox(name,option)
{
	$("input[name='"+name+"']").each(function(){
		if("choose_all" == option)								  
			$(this).attr("checked","checked");
		else
			$(this).attr("checked","");
	});
}

function changeShowBox(obj,id)
{
	$(".single_menu_bar").removeClass('selected');
	$(".cont_p").hide();
	$(obj).addClass('selected');
	$("#content_"+id).show();
}

function changeIndexBox(obj,id)
{
	$(".index_box_button").removeClass('selected');
	$(".list_news").hide();
	$(obj).addClass('selected');
	$("#index_box_"+id).show();
}

//非模态提示框
function showMessage(showMessage, showType, showTime)
{
	showMessage = (undefined == showMessage ? "" : showMessage);
	if(showMessage)
	{
		showTime = (undefined == showTime ? 1 : showTime);
		showType = (undefined == showType ? 0 : showType);
		var showImg = showType == 1 ? "promptRight32.png" : "promptWarn32.png";
		var smaHTML = '<div id="tigBox" class="popTipLayer clearfix"><img class="pngIcon" src="/Public/images/common/' + showImg + '"><span>' + showMessage + '</span></div>';
		if($("#show_message_area").size())
		{
			$("#show_message_area").html(smaHTML);
		}
		else
		{
			var showMessageArea = $('<div id="show_message_area"></div>');
			showMessageArea.html(smaHTML);
			$("body").append(showMessageArea);
		}
		//获取当前屏幕的宽高
		divId = "tigBox";
		var tigBoxObj = $("#tigBox");
		var divTop = $(window).scrollTop() + ($(window).height() - tigBoxObj.height()) / 2;
		var divLeft = $('body').scrollLeft() + ($('body').width() - tigBoxObj.width()) / 2;
		$("#tigBox").css("position","absolute");
		$("#tigBox").css("top",divTop);
		$("#tigBox").css("left",divLeft);
		tigBoxObj.css("visibility", "visible");
		setTimeout(function(){tigBoxObj.fadeOut("normal");},(showTime * 1000));
	}
	return showType == 1;
}


//邮箱格式验证
function checkEmail(email)
{
	var result = false;
	//对电子邮件的验证
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(myreg.test(email))
	{
		result = true;
	}
	return result;
}

//手机号码格式验证
function checkMobile(mobile)
{
	var result = false;
	//对电子邮件的验证
	var myreg = /\d{11}/;
	if(myreg.test(mobile))
	{
		result = true;
	}
	return result;
}


//验证短评字数
var shortUrl = "Array";
var maxWordsLen = 140;
var doc_length_over = 0;
function positionWordsCheck(event)
{
	var check_obj = $(event.target);
	var contentVal = $.trim(check_obj.val());
	var contentLenght = getContentLength(contentVal);
	if(contentLenght > maxWordsLen * 2)
	{
		$("#position_can_input_words_count").html("已超出<em>" + Math.ceil((contentLenght - maxWordsLen * 2) / 2) + "</em>个字");
		doc_length_over = 1;
	}
	else
	{
		$("#position_can_input_words_count").html("你还能输入<em>" + Math.floor((maxWordsLen * 2 - contentLenght) / 2) + "</em>个字");
		doc_length_over = 0;
	}
}

//自动验证短评字数
function inputWordsAutoCheck(target_id)
{
	var contentVal = $.trim($("#"+target_id).val());
	var contentLenght = getContentLength(contentVal);
	if(contentLenght > maxWordsLen * 2)
	{
		$("#position_can_input_words_count").html("已超出<em>" + Math.ceil((contentLenght - maxWordsLen * 2) / 2) + "</em>个字");
	}
	else
	{
		$("#position_can_input_words_count").html("你还能输入<em>" + Math.floor((maxWordsLen * 2 - contentLenght) / 2) + "</em>个字");
	}
}

//显示模态窗口灰色背景
function dialogBgShow()
{
	var current_height = $("body").height();
	if(current_height < $(window).height())
	{
		current_height = $(window).height();
	}
	$(".fullbg").css({
		height:current_height,
		width:$("body").width(),
		display:"block"
	});
}

//显示弹层
function dialogShow(dialog_id)
{
	$('#dialog_'+dialog_id).show()
}

//关闭模态窗口
function closeBg()
{
	$(".fullbg,.dialog,.login_dialog").hide();
}

//延时跳转到某个地址
function delayGoToPage(url,time)
{
	setTimeout('goToPage("'+url+'")',time);
}

//延时跳转到某个地址
function goToPage(url)
{
	location.href = url;
}

//表单：验证用户名
function formCheckUsername()
{
	result = false;
	var username = $.trim($("#username").val());
	if(username)
	{
		result = true;
		$("#username_error_info").hide();
	}
	else
	{
		$("#username_error_info").html('<em></em>请输入用户名');
		$("#username_error_info").show();
	}
	return result;
}

//表单：验证密码
function formCheckPassword()
{
	result = false;
	var password = $.trim($("#password").val());
	if(password)
	{
		result = true;
		$("#password_error_info").hide();
	}
	else
	{
		$("#password_error_info").html('<em></em>请输入密码');
		$("#password_error_info").show();
	}
	return result;
}

//表单：验证重复密码
function formCheckRePassword()
{
	result = false;
	var re_password = $.trim($("#re_password").val());
	if(re_password)
	{
		result = true;
		$("#re_password_error_info").hide();
	}
	else
	{
		$("#re_password_error_info").html('<em></em>请输入重复密码');
		$("#re_password_error_info").show();
	}
	return result;
}

//表单：验证验证码
function formCheckVerify()
{
	result = false;
	var verify = $.trim($("#verify").val());
	if(verify)
	{
		result = true;
		$("#verify_error_info").hide();
	}
	else
	{
		$("#verify_error_info").html('<em></em>请输入验证码');
		$("#verify_error_info").show();
	}
	return result;
}

//表单：验证邮箱
function formCheckEmail()
{
	result = false;
	var email = $.trim($("#email").val());
	if(email)
	{
		if(checkEmail(email))
		{
			result = true;
			$("#email_error_info").hide();
		}
		else
		{
			$("#email_error_info").html('<em></em>电子邮箱格式错误');
			$("#email_error_info").show();
		}
	}
	else
	{
		$("#email_error_info").html('<em></em>请输入电子邮箱地址');
		$("#email_error_info").show();
	}
	return result;
}

//后台表单验证start**************************************

//保存图片信息
function saveImage()
{
	var image_name = $("#image_name").val();
	var check_image_name = false;
	var img_file = $("#img_file").val();
	var check_img_file = false;
	var sub_type_id = $("#sub_type_id").val();
	var check_sub_type_id = false;
	
	if(image_name)
	{
		check_image_name = true;
	}
	if(img_file)
	{
		check_img_file = true;
	}
	else
	{
		is_have_img = $("#is_have_img").val();
		if(is_have_img)
		{
			check_img_file = true;
		}
	}
	if(0 < sub_type_id)
	{
		check_sub_type_id = true;
	}
	if(check_image_name
	   && check_img_file
	   && check_sub_type_id)
	{
		document.data_form.submit();
	}
	else
	{
		alert('红星字段必填，请验证。');
	}
}

function formCheckUserSubmit()
{
	var username = $.trim($("#username").val());
	var check_username = false;
	if(username)
	{
		check_username = true;
		$("#form_error_username").hide();
	}
	else
	{
		$("#form_error_username").html("用户名不能为空");
		$("#form_error_username").show();
	}
	if(check_username)
	{
		document.data_form.submit();
	}
}

//推荐位信息提交验证
function formRecommendSubmit()
{
	var title = $.trim($("#title").val());
	var check_title = false;
	if(title)
	{
		check_title = true;
	}
	else
	{
		alert('红星内容必填');
	}
	if(check_title)
	{
		document.data_form.submit();
	}
}

//后台表单验证end****************************************

//前台登录
function frontLogin(referer)
{
	var account = $.trim($("#account").val());
	var check_account = false;
	var password = $.trim($("#password").val());
	var check_password = false;
	var verify = $.trim($("#verify").val());
	var check_verify = false;
	if(!account)
	{
		showMessageError('请输入邮箱');
		return false;
	}
	else
	{
		if (!checkEmail(account)) {
			showMessageError('邮箱地址错误');
			return false;
		}
		check_account = true;
	}
	if(!password)
	{
		showMessageError('请输入密码');
		return false;
	}
	else
	{
		check_password = true;
	}
	
	if(check_account
	   && check_password)
	{
		//是否记住密码
		var remember = 0;
		
		if(!!$("#remember").attr("checked"))
		{
			remember = 1;
		}
		$.ajax({
			type:'post',
			dataType:'json',
			url:'/User-login',
			data:{
				account:account,
				password:password,
				remember:remember,
				referer:referer
			},
			success:function(data){
				if(1 == data.status_code)
				{
					showMessage('登录成功',1,1);
					delayGoToPage(referer, 1500);
				}
				else
				{
					showMessage(data.status_message,'',1);
				}
			}
		});
	}
}

function showMessageError(msg)
{
	$('#error_msg').html(msg);
	$('#error_msg_box').show();
}

function hideMessageError(msg)
{
	$('#error_msg_box').hide();
	$('#error_msg').html('');
}

//获取当前时间
function getCurentTime()
{ 
	var now = new Date();
   
	var year = now.getFullYear();       //年
	var month = now.getMonth() + 1;     //月
	var day = now.getDate();            //日
	var hh = now.getHours();            //时
	var mm = now.getMinutes();          //分
	var ss = now.getSeconds();          //分
	var clock = year + " 年 ";
	if(month < 10)
		clock += "0";
	clock += month + " 月 ";
	if(day < 10)
		clock += "0";
	clock += day + " 日 ";
	if(hh < 10)
		clock += "0";
	clock += hh + " 时 ";
	if (mm < 10) clock += '0'; 
	clock += mm + " 分 ";
	if (ss < 10) clock += '0'; 
		clock += ss + " 秒";
	
	return(clock); 
}

//显示当前时间
function showTime()
{
	var nowtime = "当前时间："+getCurentTime();
	$("#showTime").html(nowtime);
	setTimeout(showTime,1000);
}

$(function(){
	//系统d当前时间
	showTime();
});

//页面刷新
function myrefresh(){
	window.location.reload();
}

function pageRefresh(sec_time)
{
	var refresh_time = 120000;
	if(0 < sec_time)
	{
		refresh_time = sec_time
	}
	setTimeout('myrefresh()',refresh_time);
}

//刷新验证码
function changeVerify()
{
	$('#verify_img').prop("src", "/Common-imageVerify-"+new Date().getTime());
}

//保存文章信息
function saveArticle()
{
	var content = editor_1.getSource();
	
	var article_type_id = $("#article_type_id").val();
	var check_article_type_id = false;
	if(article_type_id)
	{
		check_article_type_id = true;
	}
	
	var title = $("#title").val();
	var check_title = false;
	if(title)
	{
		check_title = true;
	}
	
	if(check_article_type_id
	   && check_title)
	{
		document.data_form.submit();
	}
	else
	{
		alert('红星字段必填，请验证。');
	}
}

//保存评论
function saveComment()
{
	var user_id = $("#user_id").val();
	var check_user_id = false;
	if(user_id)
	{
		check_user_id = true;
	}
	
	var content = editor_comment.getSource();
	var check_content = false;
	if(content)
	{
		check_content = true;
	}
	
	if(check_user_id
	   && check_content)
	{
		document.data_form.submit();
	}
	else
	{
		alert('红星字段必填，请验证。');
	}
}

//前台注册
function frontRegist()
{
	var email = $.trim($("#email").val());
	var check_email = false;
	if(!email)
	{
		showMessage('请输入邮箱', '', 2);
		return false;
	}
	else
	{
		if (!checkEmail(email)) {
			showMessage('邮箱格式错误，请确认后重新输入', '', 2);
			return false;
		}
		check_email = true;
	}
	
	var username = $.trim($("#username").val());
	var check_username = false;
	if(!username)
	{
		showMessage('请输入真实姓名', '', 2);
		return false;
	}
	else
	{
		check_username = true;
	}
	
	var phone = $.trim($("#phone").val());
	var check_phone = false;
	if(!phone)
	{
		showMessage('请填写联系电话', '', 2);
		return false;
	}
	else
	{
		if (!checkMobile(phone)) {
			showMessage('请正确输入您的手机号码，谢谢！', '', 2);
			return false;
		}
		check_phone = true;
	}
	
	var password = $.trim($("#password").val());
	var check_password = false;
	if(!password)
	{
		showMessage('请输入您的密码', '', 2);
		return false;
	}
	else
	{
		check_password = true;
	}
	
	var re_password = $.trim($("#re_password").val());
	var check_re_password = false;
	if(!re_password)
	{
		showMessage('请输入确认密码', '', 2);
		return false;
	}
	else if(password != re_password)
	{
		showMessage('验证密码不一致，请重新输入', '', 2);
		return false;
	}
	else
	{
		check_re_password = true;
	}
	
	if(check_username && check_password && check_re_password)
	{
		var email = $.trim($("#email").val());
		var phone = $.trim($("#phone").val());
		$.ajax({
			type:'post',
			dataType:'json',
			url:'/User-regist',
			data:{
				username:username,
				password:password,
				email:email,
				phone:phone
			},
			success:function(data){
				if(1 == data.status_code)
				{
					showMessage('注册成功',1,1);
					delayGoToPage('/', 2000);
				}
				else
				{
					showMessage(data.status_message,'',1);
				}
			}
		});
	}
}

//删除图片
function deleteImg(obj)
{
	$(obj).parent().parent().remove();
}

//保存产品
function saveProduct()
{
	var content = editor_1.getSource();
	var content_2 = editor_2.getSource();
	var content_3 = editor_3.getSource();
	var content_4 = editor_4.getSource();
	var content_5 = editor_5.getSource();
	var content_6 = editor_6.getSource();
	var content_7 = editor_7.getSource();
	var content_8 = editor_8.getSource();
	var content_9 = editor_9.getSource();
	var content_11 = editor_11.getSource();
	var content_beforeTravel_1 = editor_beforeTravel_1.getSource();
	var content_beforeTravel_2 = editor_beforeTravel_2.getSource();
	var content_beforeTravel_3 = editor_beforeTravel_3.getSource();
	var content_beforeTravel_4 = editor_beforeTravel_4.getSource();
	var content_beforeTravel_5 = editor_beforeTravel_5.getSource();
	var content_beforeTravel_6 = editor_beforeTravel_6.getSource();
	var content_beforeTravel_7 = editor_beforeTravel_7.getSource();
//	var content_trip_lightspot = trip_lightspot.getSource();

    var content_carInfo_1 = editor_carInfo_1.getSource();
    var content_carInfo_2 = editor_carInfo_2.getSource();
    var content_carInfo_3 = editor_carInfo_3.getSource();
    var content_carInfo_4 = editor_carInfo_4.getSource();
    var content_carInfo_5 = editor_carInfo_5.getSource();
    var content_carInfo_6 = editor_carInfo_6.getSource();

    var content_additional = xheditor_additional.getSource();

	
	
	var product_name = $("#product_name").val();
	var check_procut_name = false;
	if(product_name)
	{
		check_procut_name = true;
	}
	if(product_name)
	{
        $('#data_form').submit();
        //使用js触发提交无法触发jquery的submit事件
		//document.data_form.submit();
	}
	else
	{
		alert('红星字段必填，请验证。');
	}
}

//保存产品行程
function saveProductTravel()
{
	var content_1 = editor_1.getSource();
	var content_2 = editor_2.getSource();
	
//	var day = $("#day").val();
	var check_day = true;
/*	if(day)
	{
		check_day = true;
	}*/
	if(check_day)
	{
		//document.data_form.submit();
        $('#data_form').submit();
	}
	else
	{
		alert('红星字段必填，请验证。');
	}
}

//复选框全选
function checkedAll(obj, class_name)
{
	if(true == $(obj).prop('checked'))
	{
		$('.'+class_name).each(function(){
			$(this).prop('checked', 'checked');
		});
	}
	else
	{
		$('.'+class_name).each(function(){
			$(this).removeProp('checked');
		});
	}
}

//保存订单信息
function saveOrder()
{
	var content = editor_1.getSource();
	var content_2 = editor_2.getSource();

	document.data_form.submit();
}

//添加去兜风优势
function addQdfAdvantage()
{
	var add_content = $("#qdf_advantage_tpl").html();
	qdf_advantage_count = qdf_advantage_count + 1;
	add_content = add_content.replace(/#key#/g, qdf_advantage_count);
	$("#qdf_advantage_items").append(add_content);
}
//删除去兜风优势
function removeQdfAdvantage(obj)
{
	$(obj).parent().remove();
}

//添加市面产品优势
function addNormalAdvantage()
{
	var add_content = $("#normal_advantage_tpl").html();
	normal_advantage_count = normal_advantage_count + 1;
	add_content = add_content.replace(/#key#/g, normal_advantage_count);
	$("#normal_advantage_items").append(add_content);
}
//删除市面产品优势
function removeNormalAdvantage(obj)
{
	$(obj).parent().remove();
}

//保存热点
function saveHotPoint()
{
	var title = $.trim($('#title').val());
	var check_title = false;
	if(title)
	{
		check_title = true;
	}
	if(check_title)
	{
		document.data_form.submit();
	}
	else
	{
		alert('红星字段必填，请验证。');
	}
}

//更新库存
function updateStock()
{
	var count = $.trim($("#count").val());
	if(!count)
	{
		showMessage("请输入库存数量！", 0, 1);
		return false;
	}
	if (confirm("是否确定更新库存？")) {
		document.data_form.submit();
	}
}

//删除库存
function deleteStock()
{
	if (confirm("是否确定删除库存？")) {
		$('#option').val('delete');
		document.data_form.submit();
	}
}

//添加:包含信息条目
function addIncludeInfoItem()
{
	var add_content = $("#include_info_tpl").html();
	include_info_count = include_info_count + 1;
	add_content = add_content.replace(/#key#/g, include_info_count);
	$("#include_info_list").append(add_content);
}
//删除:包含信息条目
function removeIncludeInfoItem(obj)
{
	$(obj).parent().remove();
}

//添加:不包含信息条目
function addNotIncludeInfoItem()
{
	var add_content = $("#not_include_info_tpl").html();
	not_include_info_count = not_include_info_count + 1;
	add_content = add_content.replace(/#key#/g, not_include_info_count);
	$("#not_include_info_list").append(add_content);
}
//删除:包含信息条目
function removeNotIncludeInfoItem(obj)
{
	$(obj).parent().remove();
}
