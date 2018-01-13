//弹窗变量
var boxy = null;

//切换搜索类型选项框
function chooseSearchType(type_id)
{
    $('.search_type_tab').removeClass('current');
    $('.search_type_tab_'+type_id).addClass('current');
    
    $('.search_type_box').hide();
    $('.search_type_box_'+type_id).show();
}

//切换选中菜单的选项
function menuToggle(menu_id)
{
    $('.menu_items').each(function(){
        if (menu_id != $(this).attr('id')) {
            $(this).hide();
        }
    });
    if ('none' != $("#"+menu_id).css('display'))
    {
        $("#"+menu_id).hide();
    }
    else
    {
        $("#"+menu_id).show();
    }
}

//选择菜单
function chooseMenu(obj)
{
    var menu_id = $(obj).attr('menu');
    var menu_value = $(obj).attr('menu_value');
    $('.'+menu_id).html(menu_value);
    menuToggle(menu_id);
	
	if ('menu_4' == menu_id) {
		$('#target_area_3').val($(obj).attr('country_id'));
	}
}

//选择菜单
function chooseContinent(obj)
{
    var menu_id = $(obj).attr('menu');
    var menu_value = $(obj).attr('menu_value');
    $('.'+menu_id).html(menu_value);
    menuToggle(menu_id);
	
	//获取洲的国家，动态调整数组
	$.ajax({
		type:'post',
		dataType:'json',
		url:'/Common-getCountryByContinent',
		data:{
			target_area_1_name:$('.menu_3').html()
		},
		success:function(data){
			var country_str = '';
			for(var i in data)
			{
				$('.menu_4').html('任意城市');
				country_str += '<div class="menu_item" menu="menu_4" menu_value="'+data[i]+'" onclick="chooseMenu(this)">'+data[i]+'</div>';
			}
			$('#menu_4').html(country_str);
		}
	});
}

//显示地区选择
function showAreaSelectBox()
{
	$('.area_select_box').show();
}

//隐藏地区选择
function hideAreaSelectBox()
{
	$('.area_select_box').hide();
}

//切换产品搜索页面：出发时间框
function toggleStartTimeItems(obj)
{
	if ('icon_down' == $(obj).find('em').attr('class'))
	{
		$(obj).find('em').removeClass('icon_down');
		$(obj).find('em').addClass('icon_up');
		$('.start_time_items').css('height', '');
	}
	else
	{
		$(obj).find('em').removeClass('icon_up');
		$(obj).find('em').addClass('icon_down');
		$('.start_time_items').css('height', '47px');
	}
}

//切换产品搜索页面：地区
function toggleAreaItems(obj)
{
	if ('icon_down' == $(obj).find('em').attr('class'))
	{
		$(obj).find('em').removeClass('icon_down');
		$(obj).find('em').addClass('icon_up');
		$('.area_items').css('height', '');
	}
	else
	{
		$(obj).find('em').removeClass('icon_up');
		$(obj).find('em').addClass('icon_down');
		$('.area_items').css('height', '47px');
	}
}

//切换产品搜索页面：产品类型
function toggleProductTypeItems(toggle_id)
{
	if ('none' == $('.multi_product_type').css('display'))
	{
		$('#'+toggle_id).html('-&nbsp; 多选');
		$('.product_type_items').hide();
		$('.multi_product_type').show();
	}
	else
	{
		$('#'+toggle_id).html('+&nbsp; 多选');
		$('.multi_product_type').hide();
		$('.product_type_items').show();
	}
}

//切换产品搜索页面：产品地区
function toggleProductAreaItems(toggle_id)
{
	if ('none' == $('.multi_product_area').css('display'))
	{
		$('#'+toggle_id).html('-&nbsp; 多选');
		$('.product_area_items').hide();
		$('.multi_product_area').show();
	}
	else
	{
		$('#'+toggle_id).html('+&nbsp; 多选');
		$('.multi_product_area').hide();
		$('.product_area_items').show();
	}
}

//选择时间
function chooseStartTime(start_time)
{
	$('#start_time').val(start_time);
	document.product_search_form.submit();
}

//选择地区
function chooseProductArea(target_area)
{
	$('#target_area_2').val(target_area);
	document.product_search_form.submit();
}

//提交地区多选
function chooseMultiProductArea()
{
	var product_area_ids = '';
	$('.product_area_ids').each(function(){
		if (true == $(this).prop('checked')) {
			product_area_ids += ','+$(this).val();
		}
	});
	if (!product_area_ids) {
		alert('请选择国家！');
		return false;
	}
	else
	{
		$('#target_area_ids').val(product_area_ids);
		document.product_search_form.submit();
	}
}

//清空地区多选
function clearMultiProductArea()
{
	$('#target_area_ids').val('');
	document.product_search_form.submit();
}

//选择天数
function chooseTravelDay(travel_day)
{
	$('#travel_day').val(travel_day);
	document.product_search_form.submit();
}

//选择类型
function chooseProductType(product_type)
{
	$('#product_type').val(product_type);
	document.product_search_form.submit();
}

//提交类型多选
function chooseMultiProductType()
{
	var product_type_ids = '';
	$('.product_type_ids').each(function(){
		if (true == $(this).prop('checked')) {
			product_type_ids += ','+$(this).val();
		}
	});
	if (!product_type_ids) {
		alert('请选择类型！');
		return false;
	}
	else
	{
		$('#product_type_ids').val(product_type_ids);
		document.product_search_form.submit();
	}
}

//清空类型多选
function clearMultiProductType()
{
	$('#product_type_ids').val('');
	document.product_search_form.submit();
}

//选择价格
function chooseProductPrice(product_price)
{
	$('#product_price').val(product_price);
	document.product_search_form.submit();
}

//产品排序
function orderProductBy(order)
{
	$('#order').val(order);
	document.product_search_form.submit();
}

//行程内容切换
function toggleSectionContent(obj)
{
	if ('none' == $(obj).find('.travel_content').css('display'))
	{
		$(obj).find('.toggle_icon').removeClass('down');
		$(obj).find('.toggle_icon').addClass('up');
		$(obj).find('.travel_content').slideDown();
	}
	else
	{
		$(obj).find('.toggle_icon').removeClass('up');
		$(obj).find('.toggle_icon').addClass('down');
		$(obj).find('.travel_content').slideUp();
	}
}

//选择产品列表模式
function chooseProductListModel(model)
{
	$('#product_list_model').val(model);
	document.product_search_form.submit();
}

//ajax注册框
function ajaxRegist()
{
    var alert_login_box_content = $('#alert_login_box').html();
    alert_login_box_content = alert_login_box_content.replace(/#tpl#/g, '');
    boxy = new Boxy(alert_login_box_content, {
        modal: true,
        closeable:false
    });
    $('#login_box').hide();
    $('#regist_box').fadeIn(200);
    $(".account_form input").focus(function(){
        $(".account_form input").removeClass("current");
        $(this).addClass("current");
    });
}

//前台注册
function frontRegist(referer)
{
    var is_agree_protocol = $("#is_agree_protocol").prop('checked');
	is_agree_protocol = 1;
    if (!is_agree_protocol) {
        showMessage('注册必须同意用户协议哦~', '', 2);
        return false;
    }
    var email = $.trim($("#email").val());
    var check_email = false;
    if(!email)
    {
        showMessage2('请输入电子邮箱', 'email');
    }
    else
    {
        if (checkEmail(email)) {
            check_email = true;
            hideMessage2('email');
        }
        else
        {
            showMessage2('电子邮箱格式错误', 'email');
        }
    }
    
    var nick_name = $.trim($("#nick_name").val());
    var check_nick_name = false;
    if(!nick_name)
    {
        showMessage2('请输入昵称', 'nick_name');
    }
    else
    {
        check_nick_name = true;
        hideMessage2('nick_name');
    }
    
    var password = $.trim($("#regist_password").val());
    var check_password = false;
    if(!password)
    {
        showMessage2('请输入密码', 'regist_password');
    }
    else
    {
        check_password = true;
        hideMessage2('regist_password');
    }
    
    var re_password = $.trim($("#re_password").val());
    var check_re_password = false;
    if(!re_password)
    {
        showMessage2('请输入重复密码', 're_password');
    }
    else
    {
        check_re_password = true;
        hideMessage2('re_password');
    }
    
    if (password && re_password)
    {
        if (password != re_password)
        {
            check_password = false;
            showMessage2('两次密码输入不一致', 'regist_password');
        }
        else
        {
            hideMessage2('regist_password');
        }
    }
	
    if(check_email
       && check_nick_name
       && check_password
       && check_re_password)
    {
        $.ajax({
            type:'post',
            dataType:'json',
            url:'/User-regist',
            data:{
                email:email,
                nick_name:nick_name,
                password:password
            },
            success:function(data){
                if(1 == data.status_code)
                {
                    showMessage('注册成功', 1, 1);
                    delayGoToPage(referer, 2000);
                }
                else
                {
                    showMessage(data.status_message,'',1);
                }
            }
        });
    }
}

//ajax登录框
function ajaxLogin()
{
    var alert_login_box_content = $('#alert_login_box').html();
    alert_login_box_content = alert_login_box_content.replace(/#tpl#/g, '');
    boxy = new Boxy(alert_login_box_content, {
        modal: true,
        closeable:false
    });
    $(".account_form input").focus(function(){
        $(".account_form input").removeClass("current");
        $(this).addClass("current");
    });
}

//前台登录
function frontLogin(referer)
{
    var account = $.trim($("#account").val());
    var check_account = false;
    var password = $.trim($("#password").val());
    var check_password = false;
    if(!account)
    {
        showMessage2('请输入注册邮件或者用户名', 'account');
    }
    else
    {
        check_account = true;
        hideMessage2('account');
    }
    if(!password)
    {
        showMessage2('请输入密码', 'password');
    }
    else
    {
        check_password = true;
        hideMessage2('password');
    }
    if(check_account
       && check_password)
    {
        //是否记住密码
        var remember = 0;
        
        if($("#remember").prop("checked"))
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
                remember:remember
            },
            success:function(data){
                if(1 == data.status_code)
                {
                    location.href = referer;
                }
                else
                {
                    showMessage2(data.status_message, 'account');
                }
            }
        });
    }
}

//弹窗，登录，注册，切换
function loginBoxSwitch()
{
    if ('none' != $('#login_box').css('display')) {
        $('#login_box').hide();
        $('#regist_box').fadeIn(200);
    }
    else
    {
        $('#regist_box').hide();
        $('#login_box').fadeIn(200);
    }
}

//验证是否登录
function checkIsLogin()
{
    var result = false;
    $.ajax({
        'type':'get',
        'url':'/User-checklogin',
        async:false,
        success:function(data){
            if(1 == data.status_code)
            {
                result = true;
            }
        },
        'dataType':'json'
    });
    return result;
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

//指定位置，展示提示信息
function showMessage2(message, id)
{
    $('#message_'+id).html(message);
    $('#message_'+id).show();
}
//指定位置，展示提示信息
function hideMessage2(id)
{
    $('#message_'+id).html('');
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
    //对手机号码长度的验证
    var myreg = /^\d{11}$/;
    if(myreg.test(mobile))
    {
        result = true;
    }
    return result;
}

//选择出发时间
function shoppingChooseStartTime()
{
	var start_time = $('#start_time').val();
	if (current_day != start_time)
	{
		current_day = start_time;
		getTimeProductPrice();
		
	}
}

//选择租车产品出发时间
function shoppingChooseStartTimeCar()
{
	var start_time = $('#start_time').val();
	if (current_day != start_time)
	{
		current_day = start_time;
		getCarProductPrice();
	}
}

//获取时间类产品的价格
function getTimeProductPrice()
{
	var result = false;
	
	var start_time = $('#start_time').val();
	var member_count = $.trim($('#member_count').val());
	var child_count = $.trim($('#child_count').val());
	
	if (!start_time) {
		showMessage('请选择出行时间', '', 2);
		return false;
	}
	$.ajax({
		type:'post',
		dataType:'json',
		url:'/Product-getTravelPrice',
		async:false,
		data:{
			start_time:start_time,
			member_count:member_count,
			child_count:child_count,
			product_type_2:product_type_2,
			product_id:product_id
		},
		success:function(data){
			if(1 == data.status_code)
			{
				result = true;
				$('#pay_price').html(data.price);
			}
			else
			{
				showMessage(data.status_message, '', 2);
			}
		}
	});
	
	return result;
}

//获取租车类产品的价格
function getCarProductPrice()
{
	var result = false;
	
	var start_time = $('#start_time').val();
	var car_type_name = $('#car_type_name').val();
	var member_count = $.trim($('#member_count').val());
	if (!start_time) {
		showMessage('请选择出行时间', '', 2);
		return false;
	}
	if (!car_type_name) {
		showMessage('请选择车型', '', 2);
		return false;
	}
	$.ajax({
		type:'post',
		dataType:'json',
		url:'/Product-getTravelPrice',
		async:false,
		data:{
			start_time:start_time,
			car_type_name:car_type_name,
			member_count:member_count,
			product_type_2:product_type_2,
			product_id:product_id
		},
		success:function(data){
			console.log(data);
			if(1 == data.status_code)
			{
				result = true;
				$('#pay_price').html(data.price);
			}
			else
			{
				showMessage(data.status_message, '', 2);
			}
		}
	});
	
	return result;
}

//添加到购物车
function  addCart()
{
	var start_time = $.trim($("#start_time").val());
	var member_count = $.trim($("#member_count").val());
	var child_count = $.trim($("#child_count").val());
	var car_type_name = $.trim($("#car_type_name").val());
	
	if (1 == product_type_2)
	{
		var check_price = getTimeProductPrice();
		if (!check_price) {
			return false;
		}
		
		//验证时间
		if (!start_time) {
			showMessage("请选择出发时间~", '', 2);
			return false;
		}
		//验证人数
		if (!member_count) {
			showMessage("请选择人数~", '', 2);
			return false;
		}
	}
	if (2 == product_type_2)
	{
		var check_price = getCarProductPrice();
		if (!check_price) {
			return false;
		}
		
		//验证车型
		if (!car_type_name) {
			showMessage("请选择车型~", '', 2);
			return false;
		}
	}
	
	$.ajax({
		type:'post',
		dataType:'json',
		url:'/Cart-add',
		data:{
			start_time:start_time,
			member_count:member_count,
			child_count:child_count,
			product_type_2:product_type_2,
			car_type_name:car_type_name,
			goods_id:product_id
		},
		success:function(data){
			if(1 == data.status_code) {
				showMessage(data.status_message, 1, 2);
				var header_cart_count = parseInt($("#header_cart").html());
				header_cart_count += 1;
				$("#header_cart").html(header_cart_count);
				if (0 < header_cart_count) {
					$("#header_cart").show();
				}
			} else {
				showMessage(data.status_message,'',1);
			}
		}
	});
}

//预定
function booking()
{
    var start_time = $.trim($("#start_time").val());
	var member_count = $.trim($("#member_count").val());
	var child_count = $.trim($("#child_count").val());
	var car_type_name = $.trim($("#car_type_name").val());
	
	if (1 == product_type_2)
	{
		var check_price = getTimeProductPrice();
		if (!check_price) {
			return false;
		}
		
		//验证时间
		if (!start_time) {
			showMessage("请选择出发时间~", '', 2);
			return false;
		}
		//验证人数
		if (!member_count) {
			showMessage("请选择人数~", '', 2);
			return false;
		}
	}
	if (2 == product_type_2)
	{
		var check_price = getCarProductPrice();
		if (!check_price) {
			return false;
		}
		
		//验证车型
		if (!car_type_name) {
			showMessage("请选择车型~", '', 2);
			return false;
		}
	}
    
	$.ajax({
		type:'post',
		dataType:'json',
		url:'/Cart-add',
		data:{
			start_time:start_time,
			member_count:member_count,
			child_count:child_count,
			car_type_name:car_type_name,
			product_type_2:product_type_2,
			goods_id:product_id
		},
		success:function(data){
			if(1 == data.status_code) {
				$("#checked_cart_info_id").val(data.cart_info_id);
				document.booking_form.submit();
			} else {
				showMessage(data.status_message,'',1);
			}
		}
	});
}

//确认订单
function confirmOrder()
{
	if(checkIsLogin())
	{
		$('#data_form').attr('action', '/Order');
		$('#data_form').submit();
	}
	else
	{
		ajaxLogin();
	}
}

function createOrder()
{
	var username = $.trim($("#username").val());
	if(!username)
	{
		showMessage('请输入您的联系姓名，以助于我们跟进您的售后服务', '', 2);
		return false;
	}
	var mobile = $.trim($("#mobile").val());
	if(!mobile)
	{
		showMessage('请输入您的手机号码', '', 2);
		return false;
	}
	var email = $.trim($("#email").val());
	if(!email)
	{
		showMessage('请输入您的电子邮箱', '', 2);
		return false;
	}
	var checked_cart_info_ids = $("#checked_cart_info_ids").val();
	if(!checked_cart_info_ids)
	{
		showMessage('您还没有选择购物商品哦', '', 2);
		return false;
	}
	var cart_id = $('#cart_id').val();
	var pay_way = $('input:radio[name="pay_way"]:checked').val();
	if(username
	   && mobile
	   && cart_id)
	{
		var is_submit = 0;
		
		$.ajax({
			type:'post',
			dataType:'json',
			url:'/Order-create',
			async: false,
			data:{
				username:username,
				mobile:mobile,
				email:email,
				cart_id:cart_id,
				pay_way:pay_way,
				checked_cart_info_ids:checked_cart_info_ids
			},
			success:function(data){
				if(1 == data.status_code)
				{
					is_submit = 1;
					var book_box_content = $('#order_confirm_box').html();
					boxy = new Boxy(book_box_content, {
						modal: true,
						closeable:false
					});
					$('#order_id').val(data.order_id);
					if(2 == pay_way)
					{
						$("#pay_order_form").attr('action', '/Order-yjpay');
					}
					if(3 == pay_way)
					{
						$("#pay_order_form").attr('action', '/Order-kuaiqian99bill');
					}
				}
				else
				{
					showMessage(data.status_message,'',1);
				}
			}
		});
		
		if (1 == is_submit)
		{
			//提交支付表单
			document.pay_order_form.submit();
		}
	}
}

//保存用户信息
function saveUserinfo()
{
	var nick_name = $.trim($("#nick_name").val());
	if(!nick_name)
	{
		showMessage('请输入用户名~', '', 2);
		return false;
	}
	
	var email = $.trim($('#email').val());
	if(!email)
	{
		showMessage('请输入邮箱~', '', 2);
		return false;
	}
	else if(!checkEmail(email))
	{
		showMessage('邮箱格式错误~', '', 2);
		return false;
	}
	
	var mobile = $.trim($("#mobile").val());
	if (mobile) {
		if(!checkMobile(mobile))
		{
			showMessage('请正确输入您的手机号码，谢谢！', '', 2);
			return false;
		}
	}
	
	document.data_form.submit();
}

//保存出行人信息
function saveMemberInfo()
{
	document.data_form.submit();
}

//提交评论
function addComment(app_id, id_in_app, goods_id)
{
	var comment_level = $.trim($("#comment_level_"+id_in_app).val());
	if(!comment_level)
	{
		showMessage('请选择评价等级', '', 2);
		return false;
	}
	
	var comment_content = $.trim($('#comment_content_'+id_in_app).val());
	if(!comment_content)
	{
		showMessage('请输入评论内容', '', 2);
		return false;
	}
	
	$.ajax({
		type:'post',
		dataType:'json',
		url:'/Common-addComment',
		data:{
			goods_id:goods_id,
			comment_level:comment_level,
			content:comment_content,
			app_id:app_id,
			id_in_app:id_in_app
		},
		success:function(data){
			if(1 == data.status_code)
			{
				showMessage('评论成功', 1, 1);
			}
			else
			{
				showMessage(data.status_message,'',1);
			}
		}
	});
}

//指定Div显示，隐藏
function toggleContentDisplay(div_class)
{
	if ('none' == $('.'+div_class).css('display'))
	{
		$('.'+div_class).slideDown();
	}
	else
	{
		$('.'+div_class).slideUp();
	}
}

//切换评论box
function toggleCommentBox(message_box)
{
	if('none' == $('.'+message_box).css('display'))
	{
		$('.'+message_box).slideDown();
	}
	else
	{
		$('.'+message_box).slideUp();
	}
}

//选择评论等级
function selectCommentLevel(cart_info_id, level)
{
	$('.comment_level_'+cart_info_id).removeClass('comment_level_100');
	for(var i=1; i<=level; i++)
	{
		$('.comment_level_'+cart_info_id+'_'+i).addClass('comment_level_100');
	}
	$('#comment_level_'+cart_info_id).val(level);
}

//首页搜索1
function indexSearch1()
{
	var target_area_1_name = $.trim($('.menu_1').html());
	var travel_day_value = $.trim($('.menu_2').html());
	var start_time = $.trim($('#start_time').val());
	var topic_name = $.trim($('.menu_6').html());
	var keywords = $.trim($('.menu_search_keywords').val());
	
	var jump_url = '/Product-index';
	jump_url += '-target_area_1_name-'+target_area_1_name;
	jump_url += '-travel_day_value-'+travel_day_value;
	jump_url += '-start_time-'+start_time;
	jump_url += '-topic_name-'+topic_name;
	jump_url += '-keywords-'+keywords;
	
	window.location.href = jump_url;
}

//首页搜索2
function indexSearch2()
{
	var target_area_2 = $('#target_area_2').val();
	var target_area_3 = $('#target_area_3').val();
	
	if (0 == target_area_2) {
		showMessage('请先选择一个国家~');
		return false;
	}
	
	var jump_url = '/Product-dayTourList';
	jump_url += '-target_area_2-'+target_area_2;
	jump_url += '-target_area_3-'+target_area_3;
	
	window.location.href = jump_url;
}

//提交文章评论
function addArticleComment(app_id, id_in_app)
{
	if (checkIsLogin())
	{
		var comment_content = $.trim($('#comment_content').val());
		if(!comment_content)
		{
			showMessage('请输入评论内容', '', 2);
			return false;
		}
		$('#comment_content').val('');
		$.ajax({
			type:'post',
			dataType:'json',
			url:'/Common-addComment',
			data:{
				content:comment_content,
				app_id:app_id,
				id_in_app:id_in_app
			},
			success:function(data){
				if(1 == data.status_code)
				{
					showMessage('评论成功', 1, 1);
					//location.href = '/Article-detail-article_id-3#comment_list?t='+Date.parse( new Date());
					location.reload();
				}
				else
				{
					showMessage(data.status_message,'',1);
				}
			}
		});
	}
	else
	{
		ajaxLogin();
	}
}

//展示更多的评论
function showMoreComment()
{
	if ('none' == $('.more_comment_list').css('display'))
	{
		$('.more_comment_list').slideDown();
	}
	else
	{
		$('.more_comment_list').slideUp();
	}
}

//联系方式信息开关
function toggleContactInfo()
{
	if ('none' == $('.contact_us_info').css('display'))
	{
		$('.contact_us_info').slideDown();
	}
	else
	{
		$('.contact_us_info').slideUp();
	}
}

//搜索文章
function  searchArtcile()
{
	var input_article_search = $.trim($('.input_article_search').val());
	if (!input_article_search) {
		showMessage('请输入想查找的关键字', 0, 2);
	}
	else
	{
		document.article_form.submit();
	}
}

//关闭弹窗
function closeBoxy()
{
    boxy.hideAndUnload();
}

//删除购物车商品
function deleteCartInfo(cart_info_id)
{
	if (confirm('是否确定删除该商品？')) {
		$.ajax({
			type:'post',
			dataType:'json',
			url:'/Cart-delete',
			data:{
				cart_info_ids:cart_info_id
			},
			success:function(data){
				if(1 == data.status_code)
				{
					showMessage('删除成功', 1, 2);
					location.replace(location.href);
				}
				else
				{
					showMessage(data.status_message,'',1);
				}
			}
		});
	}
}

//支付订单
function updatePayInfo()
{
	var book_box_content = $('#order_confirm_box').html();
	boxy = new Boxy(book_box_content, {
		modal: true,
		closeable:false
	});
	var pay_way = $('input:radio[name="pay_way"]:checked').val();
	if(2 == pay_way)
	{
		$("#pay_order_form").attr('action', '/Order-yjpay');
	}
	if(3 == pay_way)
	{
		$("#pay_order_form").attr('action', '/Order-kuaiqian99bill');
	}
	document.pay_order_form.submit();
}

//顶部搜索
function headerSearch()
{
	document.header_search_form.submit();
}