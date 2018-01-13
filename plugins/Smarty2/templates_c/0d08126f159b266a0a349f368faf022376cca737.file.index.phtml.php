<?php /* Smarty version Smarty-3.1.17, created on 2016-01-18 16:16:30
         compiled from "F:\Web\doclouder\app\views\index\index.phtml" */ ?>
<?php /*%%SmartyHeaderCode:9881569cf8f396fa30-91430647%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '0d08126f159b266a0a349f368faf022376cca737' => 
    array (
      0 => 'F:\\Web\\doclouder\\app\\views\\index\\index.phtml',
      1 => 1453130185,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '9881569cf8f396fa30-91430647',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.17',
  'unifunc' => 'content_569cf8f3dc5133_96376293',
  'variables' => 
  array (
    'userInfo' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_569cf8f3dc5133_96376293')) {function content_569cf8f3dc5133_96376293($_smarty_tpl) {?><!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>DOClouder Management</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />

    <link href="/Public/jquery-easyui-theme/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="/Public/jquery-easyui-theme/icon.css" rel="stylesheet" type="text/css" />
    <link href="/Public/icons/icon-all.css" rel="stylesheet" type="text/css" />

    <!--<script src="/Public/jquery/jquery-1.11.1.js" type="text/javascript"></script>-->
    <script src="/Public/js/jquery.min.js" type="text/javascript"></script>

    <script src="/Public/jquery-easyui-1.3.6/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="/Public/jquery-easyui-1.3.6/plugins/jquery-easyui-datagridview/datagrid-groupview.js" type="text/javascript"></script>
    <script src="/Public/jquery-easyui-1.3.6/plugins/jquery-easyui-datagridview/datagrid-detailview.js" type="text/javascript"></script>
    <script src="/Public/jquery-easyui-1.3.6/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>

    <script src="/Public/jquery.jdirk.js" type="text/javascript"></script>
    <!--<script src="release/jquery.jdirk.min.js"></script>-->


    <link href="/Public/jeasyui-extensions/jeasyui.extensions.css" rel="stylesheet" type="text/css" />

    <!--    <script src="/Public/jeasyui-extensions/jeasyui.extensions.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.progressbar.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.slider.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.linkbutton.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.form.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.validatebox.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.combo.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.combobox.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.menu.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.searchbox.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.panel.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.window.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.dialog.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.layout.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.tree.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.datagrid.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.treegrid.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.combogrid.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.combotree.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.tabs.js" type="text/javascript"></script>
        <script src="/Public/jeasyui-extensions/jeasyui.extensions.theme.js" type="text/javascript"></script>-->
    <script src="/Public/release/jeasyui.extensions.all.min.js" type="text/javascript"></script>

    <script src="/Public/icons/jeasyui.icons.all.js" type="text/javascript"></script>
    <!--<script src="/Public/release/jeasyui.icons.all.min.js"></script>-->

    <script src="/Public/jeasyui-extensions/jeasyui.extensions.icons.js" type="text/javascript"></script>
    <script src="/Public/jeasyui-extensions/jeasyui.extensions.gridselector.js" type="text/javascript"></script>
    <script src="/Public/plugins/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <!--<script src="/Public/plugins/uploadify/jquery.uploadify.min.js" type="text/javascript"></script>-->

    <script src="/Public/jeasyui-extensions/jquery.toolbar.js" type="text/javascript"></script>
    <script src="/Public/jeasyui-extensions/jquery.comboicons.js" type="text/javascript"></script>
    <script src="/Public/jeasyui-extensions/jquery.comboselector.js" type="text/javascript"></script>
    <script src="/Public/jeasyui-extensions/jquery.my97.js" type="text/javascript"></script>
    <script src="/Public/jeasyui-extensions/jquery.portal.js" type="text/javascript"></script>

    <!--导入首页启动时需要的相应资源文件(首页相应功能的 js 库、css样式以及渲染首页界面的 js 文件)-->
    <script src="/Public/common/index.js" type="text/javascript"></script>
    <link href="/Public/common/index.css" rel="stylesheet" />
    <script src="/Public/common/index-startup.js" type="text/javascript"></script>
    <script src="/Public/common/admin.common.js" type="text/javascript"></script>
    <script src="/Public/common/admin.datagrid.js" type="text/javascript"></script>
    <script src="/Public/common/common.js" type="text/javascript"></script>
    <script src="/Public/common/AkTable.js" type="text/javascript"></script>
    <script src="/Public/common/admin.process.manager.js" type="text/javascript"></script>
    

    <!--接口文档的样式-->
    <style type="text/css">
        body { padding: 0px; margin: 0px; }
        #docContainer { padding-left: 10px; padding-right: 10px; font-size: 14px; font-family: Arial,Helvetica,"Nimbus Sans L",sans-serif; }
        .syntaxhighlighter a, .syntaxhighlighter div, .syntaxhighlighter code, .syntaxhighlighter table, .syntaxhighlighter table td, .syntaxhighlighter table tr, .syntaxhighlighter table tbody, .syntaxhighlighter table thead, .syntaxhighlighter table caption, .syntaxhighlighter textarea
        {
            font-size: 13px !important; line-height: 16px !important;
        }
        a {color: #eb6100; text-decoration: none;}

        h3 { margin: 12px 0px; font-size: 20px; font-weight: bold; }
        h4 { margin: 10px 0px; color: rgb(204, 0, 0); font-size: 16px; font-weight: bold; }
        h5 { margin: 5px 0px; color: rgb(153, 0, 0); font-size: 14px; font-weight: bold; }
        .doc-table { margin-left: 9px; border-collapse: collapse; border-spacing: 0; }
        .doc-table th { padding: 0.3em 0.7em; border: 1px solid rgb(140, 172, 187); font-weight: bold; min-width: 60px; }
        .doc-table td { padding: 0.3em 0.7em; border: 1px solid rgb(140, 172, 187); }
        .doc-table th { background: rgb(238, 238, 238); }
        .doc-table pre { background: rgb(250, 250, 250); padding: 5px; color: rgb(0, 102, 0); font-family: Verdana; font-size: 12px; }
        .stress { font-weight: bold; color: Red; }
        .example { color: Blue; text-decoration: none; }
    </style>
    
</head>
<body>

<div id="maskContainer">
    <div class="datagrid-mask" style="display: block;"></div>
    <div class="datagrid-mask-msg" style="display: block; left: 50%; margin-left: -52.5px;">
        正在加载...
    </div>
</div>

<div id="mainLayout" class="easyui-layout hidden" data-options="fit: true">

    <div id="northPanel" data-options="region: 'north', border: false" style="height: 80px; overflow: hidden;">
        <div id="topbar" class="top-bar">
            <div class="top-bar-left">
                <h1 style="margin-left: 10px; margin-top: 10px;">DOClouder Management</h1>
            </div>
            <div class="top-bar-right">
                <div id="timerSpan"></div>
                <div id="themeSpan">
                    <span>更换皮肤风格：</span>
                    <select id="themeSelector"></select>
                    <a id="btnHideNorth" class="easyui-linkbutton" data-options="plain: true, iconCls: 'layout-button-up'"></a>
                </div>
            </div>
        </div>
        <div id="toolbar" class="panel-header panel-header-noborder top-toolbar">
            <div id="infobar">
            <span class="icon-hamburg-user" style="padding-left: 25px; background-position: left center;">
                当前用户：<?php echo $_smarty_tpl->tpl_vars['userInfo']->value['username'];?>

            </span>
            </div>
            <div id="searchbar">
                <input id="topSearchbox" name="topSearchbox" class="easyui-searchbox" data-options="width: 350, height: 26, prompt: '请输入您要查找的内容关键词', menu: '#topSearchboxMenu'" />
                <div id="topSearchboxMenu" style="width: 85px;">
                    <div data-options="name:'1', iconCls: 'icon-hamburg-zoom'">产品ID</div>
                    <div data-options="name:'2'">产品类型</div>
                    <div data-options="name:'3'">用户ID</div>
                    <div data-options="name:'4'">用户姓名</div>
                </div>
            </div>
            <div id="buttonbar">
                <a id="btnFullScreen" class="easyui-linkbutton" data-options="plain: true, iconCls: 'icon-standard-arrow-inout'">全屏切换</a>
                <a id="btnExit" class="easyui-linkbutton" data-options="plain: true, iconCls: 'icon-hamburg-sign-out'">退出系统</a>
                <a id="btnShowNorth" class="easyui-linkbutton" data-options="plain: true, iconCls: 'layout-button-down'" style="display: none;"></a>
            </div>
        </div>
    </div>

    <div data-options="region: 'west', title: '菜单导航栏', iconCls: 'icon-standard-map', split: true, minWidth: 250, maxWidth: 500" style="width: 250px; padding: 1px;">
        <div id="navTabs_tools" class="tabs-tool">
            <table>
                <tr>
                    <td><a id="navMenu_refresh" class="easyui-linkbutton easyui-tooltip" title="刷新该选项卡及其导航菜单" data-options="plain: true, iconCls: 'icon-hamburg-refresh'"></a></td>
                </tr>
            </table>
        </div>
        <div id="navTabs" class="easyui-tabs" data-options="fit: true, border: true, tools: '#navTabs_tools'">
            <div data-options="title: '导航菜单', iconCls: 'icon-standard-application-view-tile', refreshable: false, selected: true">
                <div id="westLayout" class="easyui-layout" data-options="fit: true">
                    <div data-options="region: 'center', border: false" style="border-bottom-width: 1px;">
                        <div id="westCenterLayout" class="easyui-layout" data-options="fit: true">
                            <div data-options="region: 'north', split: false, border: false" style="height: 33px;">
                                <div class="easyui-toolbar">
                                    <a id="navMenu_expand" class="easyui-splitbutton" data-options="iconCls: 'icon-metro-expand2', menu: '#navMenu_toggleMenu'">展开</a>
                                    <div id="navMenu_toggleMenu" class="easyui-menu">
                                        <div id="navMenu_collapse" data-options="iconCls: 'icon-metro-contract2'">折叠当前</div>
                                        <div class="menu-sep"></div>
                                        <div id="navMenu_collapseCurrentAll" data-options="iconCls: 'icon-metro-expand'">展开当前所有</div>
                                        <div id="navMenu_expandCurrentAll" data-options="iconCls: 'icon-metro-contract'">折叠当前所有</div>
                                        <div class="menu-sep"></div>
                                        <div id="navMenu_collapseAll" data-options="iconCls: 'icon-standard-arrow-out'">展开所有</div>
                                        <div id="navMenu_expandAll" data-options="iconCls: 'icon-standard-arrow-in'">折叠所有</div>
                                    </div>
                                </div>
                            </div>
                            <div data-options="region: 'center', border: false">
                                <ul id="navMenu_Tree" style="padding-top: 2px; padding-bottom: 2px;"></ul>
                            </div>
                        </div>
                    </div>
                    <div id="westSouthPanel" data-options="region: 'south', border: false, split: true, minHeight: 32, maxHeight: 275" style="height: 275px; border-top-width: 1px;">
                        <ul id="navMenu_list"></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div data-options="region: 'center'" style="padding: 1px;">
        <div id="mainTabs_tools" class="tabs-tool">
            <table>
                <tr>
                    <td><a id="mainTabs_jumpHome" class="easyui-linkbutton easyui-tooltip" title="跳转至主页选项卡" data-options="plain: true, iconCls: 'icon-hamburg-home'"></a></td>
                    <td><div class="datagrid-btn-separator"></div></td>
                    <td><a id="mainTabs_toggleAll" class="easyui-linkbutton easyui-tooltip" title="展开/折叠面板使选项卡最大化" data-options="plain: true, iconCls: 'icon-standard-arrow-inout'"></a></td>
                    <td><div class="datagrid-btn-separator"></div></td>
                </tr>
            </table>
        </div>
        <div id="mainTabs" class="easyui-tabs" data-options="fit: true, border: true, showOption: true, enableNewTabMenu: true, tools: '#mainTabs_tools', enableJumpTabMenu: true, onSelect: function (title, index) { window.mainpage.mainTabs.updateHash(index); }">
            <div id="homePanel" data-options="title: '主页', iconCls: 'icon-hamburg-home'">
                <div class="easyui-layout" data-options="fit: true">
                    <div data-options="region: 'center', border: false" style="overflow: hidden;">
                        <div id="portal" class="easyui-portal" data-options="fit: true, border: false">
                            <div style="width: 33%;">
                                <div data-options="title: '待处理订单（已支付）', height: 500, collapsible: true, tools: [{ iconCls: 'icon-hamburg-refresh', handler: function () { window.orderUnprocessed.reload(); } }]">
                                    <div id="order-list-unprocessed"></div>
                                </div>

                            </div>
                            <div style="width: 34%;">

                                <div data-options="title: '新订单（未支付）', height: 500, collapsible: true, tools: [{ iconCls: 'icon-hamburg-refresh', handler: function () { window.orderUnpaidNew.reload(); } }]">
                                    <div id="order-list-new"></div>
                                </div>
                            </div>
                            <div style="width: 33%;">
                                <div data-options="title: '更新日志', height: 500, collapsible: true, closable: true,  tools: [{ iconCls: 'icon-hamburg-refresh', handler: function () { window.changeLog.reload(); } }]">
                                    <div id="changelog-list"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--<div data-options="region: 'east', title: '日历', iconCls: 'icon-standard-date', split: false, minWidth: 200, maxWidth: 500" style="width: 220px;">-->
    <!--<div id="eastLayout" class="easyui-layout" data-options="fit: true">-->
    <!--<div data-options="region: 'north', split: false, border: false" style="height: 220px;">-->
    <!--<div class="easyui-calendar" data-options="fit: true, border: false"></div>-->
    <!--</div>-->
    <!--&lt;!&ndash;<div id="linkPanel" data-options="region: 'center', border: false, title: '友情链接', iconCls: 'icon-hamburg-link', tools: [{ iconCls: 'icon-hamburg-refresh', handler: function () { window.link.reload(); } }]">&ndash;&gt;-->
    <!--&lt;!&ndash;<ul id="linkList" class="portlet-list link-list"></ul>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->

    <div data-options="region: 'south', title: '关于我们', iconCls: 'icon-standard-information', collapsed: true, border: false" style="height: 70px;">
        <div style="color: #4e5766; padding: 6px 0px 0px 0px; margin: 0px auto; text-align: center; font-size:12px; font-family:微软雅黑;">
            Copyright 2013-2015, doclouder.com.All Rights Reserved . DOClouder Management | Powered by 蜀ICP备1402534336号-1&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="http://www.7doufeng.com/Article-detail-article_id-3" target="_blank" style="text-decoration: none;">关于【DOClouder】</a><br />
            建议使用&nbsp;
            <a href="http://windows.microsoft.com/zh-CN/internet-explorer/products/ie/home" target="_blank" style="text-decoration: none;">IE(Version 9/10/11)</a>/
            <a href="https://www.google.com/intl/zh-CN/chrome/browser/" target="_blank" style="text-decoration: none;">Chrome</a>/
            <a href="http://firefox.com.cn/download/" target="_blank" style="text-decoration: none;">Firefox</a>
            &nbsp;系列浏览器。
        </div>
    </div>


</div>

<script type="text/javascript">
    $(function(){
        AdminConfig.resize();
        AdminConfig.windowInit();
        Config.init();
    });
</script>


</body>
</html>
<?php }} ?>
