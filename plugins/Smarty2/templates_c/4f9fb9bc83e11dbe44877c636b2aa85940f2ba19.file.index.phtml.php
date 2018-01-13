<?php /* Smarty version Smarty-3.1.17, created on 2014-07-14 16:26:30
         compiled from "F:\Web\aims\app\views\index\index.phtml" */ ?>
<?php /*%%SmartyHeaderCode:23040533090addb1696-94378088%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '4f9fb9bc83e11dbe44877c636b2aa85940f2ba19' => 
    array (
      0 => 'F:\\Web\\aims\\app\\views\\index\\index.phtml',
      1 => 1405347971,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '23040533090addb1696-94378088',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.17',
  'unifunc' => 'content_533090ae092110_85102087',
  'variables' => 
  array (
    'userlist' => 0,
    'userinfo' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_533090ae092110_85102087')) {function content_533090ae092110_85102087($_smarty_tpl) {?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="dms,docuemtn,management system">
<meta name="description" content="Your Management System">
<meta name="author" content="Akiler">
<script language="javascript" type="text/javascript" src="/js/jquery.min.js"></script>
<script language="javascript" type="text/javascript" src="/js/easyloader.js"></script>
<script language="javascript" type="text/javascript" src="/js/config.js"></script>
<script language="javascript" type="text/javascript" src="/js/common.js"></script>
<script language="javascript" type="text/javascript" src="/js/document.js"></script>
<script language="javascript" type="text/javascript" src="/js/folder.js"></script>
<!--<script language="javascript" type="text/javascript" src="/js/test.js"></script>-->
<!--<script language="javascript" type="text/javascript" src="/js/easyui.ak.js"></script>-->
<link type="text/css" rel="stylesheet" href="/css/style.css">
<link type="text/css" rel="stylesheet" href="/js/themes/icon.css">

<script language="javascript" type="text/javascript">

$(document).ready(function(){
	Aims.init();

    /*$("#test").showTree({
        'info': 'test'
    });*/
	$(document).bind('contextmenu',function(e){
		e.preventDefault();

		//alert($(e.currentTarget).text());
		//alert($(e.target).attr("name"));
		//alert($(e.target)[0].tagName);
		var tagName = $(e.target)[0].tagName.toLowerCase();
		//alert('tag name:'+tagName);
		if(tagName == 'input'){
			//alert($(e.target).attr("name"));
		}else if(tagName == 'li'){
			//alert($(e.target).text());
		}else if(tagName == 'div'){
			AimsMenu.show('#aims-start-menu', e);
			//alert("null");
			return false;
		}
		
		AimsMenu.show('#aims-main-menu', e);
	});
});
</script>

<title>test</title>
</head><body style="">
<input name="test" type="button" onclick="Screen.fullScreen();" id="test" value="Full Screen" />
<div id="aims-main">
  <ul>
    <?php  $_smarty_tpl->tpl_vars['userinfo'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['userinfo']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['userlist']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['userinfo']->key => $_smarty_tpl->tpl_vars['userinfo']->value) {
$_smarty_tpl->tpl_vars['userinfo']->_loop = true;
?>
    <li> <?php echo $_smarty_tpl->tpl_vars['userinfo']->value->username;?>
 </li>
    <?php } ?>
  </ul>
</div>
<div id="aims-task-bar" class="panel-header">
  <div id="aims-task-menu">
  	<a href="#" class="easyui-linkbutton" onclick="AimsMenu.show('#aims-start-menu');"> Start..... </a>
  </div>
  <div id="aims-task-tag"> </div>
  <div id="aims-task-info"> </div>
</div>
<div id="aims-start-menu" style="width:200px; height:240px;" class="easyui-menu" data-options="onClick:AimsMenu.handler">
  <div data-options="iconCls:'icon-help',name:'info'">About Aims</div>
  <div data-options="iconCls:'icon-setting',name:'setting'">Setting</div>
  <div data-options="iconCls:'icon-profile',name:'profile'">Profile</div>
  <div class="menu-sep"></div>
  <div> <span>Toolbar</span>
    <div style="width:150px;">
      <div>Address</div>
      <div>Link</div>
      <div>Navigation Toolbar</div>
      <div>Bookmark Toolbar</div>
      <div class="menu-sep"></div>
      <div>New Toolbar...</div>
    </div>
  </div>
  <div data-options="iconCls:'icon-logout',name:'logout'">Logout</div>
</div>
<div id="aims-main-menu" class="easyui-menu" data-options="onClick:AimsMenu.handler" style="width:120px;">
  <div data-options="name:'new'">New</div>
  <div data-options="name:'fullscreen'">Full Screen</div>
  <div data-options="iconCls:'icon-undo',name:'undo'">Undo</div>
  <div data-options="iconCls:'icon-redo',name:'redo'">Redo</div>
  <div class="menu-sep"></div>
  <div>Cut</div>
  <div>Copy</div>
  <div>Paste</div>
  <div data-options="iconCls:'icon-remove'">Delete</div>
  <div data-options="name:'save',iconCls:'icon-save'">Save</div>
  <div data-options="name:'print',iconCls:'icon-print'">Print</div>
  <div class="menu-sep"></div>
  <div data-options="name:'exit'">Exit</div>
</div>
<div id="aims-window-test" class="easyui-window" title="Window Layout" data-options="iconCls:'icon-save',closed:true" style="width:600px;height:200px;padding:5px;">
  <div class="easyui-layout" data-options="fit:true">
    <div data-options="region:'west',split:true,maxWidth:400" style="width:200px"></div>
    <div data-options="region:'center'" style="padding:10px;"> jQuery EasyUI framework help you build your web page easily. </div>
    <div data-options="region:'south'" style="text-align:right;padding:5px;"> information </div>
  </div>
</div>
<div class="easyui-panel" style="padding:5px">
    <ul class="easyui-tree" data-options="url:'tree_data1.json',method:'get',animate:true,dnd:true"></ul>
</div>
</body>
</html>
<?php }} ?>
