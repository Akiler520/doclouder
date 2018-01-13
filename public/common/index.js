(function ($) {
    $.util.namespace("mainpage.nav");
    $.util.namespace("mainpage.favo");
    $.util.namespace("mainpage.mainTabs");
    $.util.namespace("mainElement");
/*
    var homePageTitle = Config.getLang("home_page"),
        homePageHref = null,
        navMenuList = "#navMenu_list",
        navMenuTree = "#navMenu_Tree",
        mainTabs = "#mainTabs",
        navTabs = "#navTabs",
        favoMenuTree = "#favoMenu_Tree",
        mainLayout = "#mainLayout",
        northPanel = "#northPanel",
        themeSelector = "#themeSelector",
        westLayout = "#westLayout",
        westCenterLayout = "#westCenterLayout",
        westFavoLayout = "#westFavoLayout",
        westSouthPanel = "#westSouthPanel",
        homePanel = "#homePanel",
        btnContact = "#btnContact",
        btnFullScreen = "#btnFullScreen",
        btnExit = "#btnExit",
        uploadBtn = "#uploadBtn";*/

    window.mainElement.navMenuList = "#navMenu_list";
    window.mainElement.homePageTitle = Config.getLang("home_page");
    window.mainElement.currentFolder = 0;
    window.mainElement.homePageHref = null;
    window.mainElement.navMenuTree = "#navMenu_Tree";
    window.mainElement.mainTabs = "#mainTabs";
    window.mainElement.navTabs = "#navTabs";
    window.mainElement.favoMenuTree = "#favoMenu_Tree";
    window.mainElement.mainLayout = "#mainLayout";
    window.mainElement.northPanel = "#northPanel";
    window.mainElement.themeSelector = "#themeSelector";
    window.mainElement.westLayout = "#westLayout";
    window.mainElement.westCenterLayout = "#westCenterLayout";
    window.mainElement.westFavoLayout = "#westFavoLayout";
    window.mainElement.westSouthPanel = "#westSouthPanel";
    window.mainElement.homePanel = "#homePanel";
    window.mainElement.btnContact = "#btnContact";
    window.mainElement.btnFullScreen = "#btnFullScreen";
    window.mainElement.btnExit = "#btnExit";
    window.mainElement.uploadBtn = "#uploadBtn";


    // 按照指定的根节点菜单 id，加载其相应的子菜单树面板数据；该方法定义如下参数：
    // id: 表示根节点菜单的 id；
    window.mainpage.loadMenu = function (item) {
        $(window.mainElement.navMenuList).find("a").attr("disabled", true);
        $.easyui.loading({ locale: window.mainElement.westCenterLayout });
        var t = $(window.mainElement.navMenuTree);
        var root = $.extend({}, $.array.first(window.mainpage.navMenusData, function (val) { return val.id == item.id; }));

        if (typeof item.href != 'undefined' && item.href.length > 0) {
            $.ProcessManager.run({
                url         : item.href,
                type        : "get",
                dataType    : "json",
                key         : "menu-item",
                success: function (menus) {
                    /*root.children = $.array.likeArrayNotString(menus) ? menus : [];
                     t.tree("loadData", [root]);*/

                    // akiler 2016.2.22
                    root = $.array.likeArrayNotString(menus) ? menus : [];
                    t.tree("loadData", root);
                }
            });
        } else {
            root.children = [];
            t.tree("loadData", [root]);
        }
    };

    //  将指定的根节点数据集合数据加载至左侧面板中“导航菜单”的 ul 控件中；该方法定义如下参数：
    window.mainpage.loadNavMenus = function () {
        $.ProcessManager.run({
            url         : "/Menu/main/",
            type        : "get",
            dataType    : "json",
            key         : "menu-main",
            success: function (menus) {
                for(var i = 0; i < menus.length; i++){
                    $(window.mainElement.navMenuList).accordion('add', {
                        title   : menus[i].text,
                        //href    : menus[i].href,
                        id      : "mainNavTree-"+i,
                        content : '<ul id="navMenu_Tree_' + i + '" style="padding-top: 4px; padding-bottom: 18px;"></ul>',
                        selected: false,
                        //fit     : true,
                        tools:[{
                            iconCls:'icon-reload',
                            handler:function(){
                                var selectedP = $(window.mainElement.navMenuList).accordion('getSelected');
                                var options = selectedP.panel('options');

                                if(options.id == null){
                                    return true;
                                }

                                var id = options.id;
                                var idTmp = id.split("-");
                                var idKey = idTmp[1];

                                var t = $("#navMenu_Tree_"+idKey);

                                t.tree("reload");
                            }
                        }],
                        onExpand    : function () {
                            var selectedP = $(window.mainElement.navMenuList).accordion('getSelected');
                            var options = selectedP.panel('options');

                            if(options.id == null){
                                return true;
                            }

                            var id = options.id;
                            var idTmp = id.split("-");
                            var idKey = idTmp[1];

                            setTimeout(function(){
                                var t = $("#navMenu_Tree_"+idKey);

                                if (t.isEasyUI("tree")) {
                                    return;
                                }

                                t.tree({
                                    url         : menus[idKey].href,
                                    dnd         : true,
                                    animate     : true,
                                    lines       : true,
                                    showOption  : true,
                                    toggleOnClick: true,
                                    selectOnContextMenu: true,

                                    loadFilter: function(data,parent){
                                        if(typeof data.status_code != 'undefined' && data.status_code == -1){
                                            User.loginWindow();
                                        }

                                        return data;
                                    },
                                    filter: function(q, node){
                                        var is_show = false;
                                        if(node.text.toLowerCase().indexOf(q.toLowerCase()) >= 0){
                                            is_show = true;
                                        }

                                        return is_show;
                                    },
                                    onClick: function (node) {
                                        if(typeof node.url != 'undefined' && node.url != '#'){
                                            var dataKey = node.url.substring(1);
                                            dataKey = dataKey.replace(/\//g, "-");

                                            node.content = '<table id="'+dataKey+'"></table>';

                                            window.mainElement.currentFolder = node.id;
                                            console.log("currentFolder:" + window.mainElement.currentFolder);

                                            // create tab
                                            node.tools = [{
                                                iconCls:'icon-mini-refresh',
                                                handler:function(){
                                                    AdminDataGrid.refresh(dataKey);
                                                }
                                            }];

                                            var isExists = window.mainpage.mainTabs.isExists(node.text, node.href);

                                            delete node.href;

                                            window.mainpage.addModuleTab(node);

                                            if(isExists <= 0){
                                                // load data for tab
                                                AdminDataGrid.init(dataKey);
                                            }
                                        }

                                        if(typeof node.attributes != 'undefined' && typeof node.attributes.href != 'undefined'){
                                            window.mainpage.addModuleTab(node);
                                        }
                                    },
                                    onBeforeLoad: function(){
                                        $.easyui.loading({ locale: t });
                                    },
                                    onLoadSuccess: function (node, data) {
                                        $.easyui.loaded(t);
                                    },
                                    onLoadError: function(){
                                        $.easyui.loaded(t);
                                    },
                                    contextMenu: [
                                        {
                                            text: "打开/转到", iconCls: "icon-standard-application-add",
                                            disabled: function (e, node) { return node.attributes && node.attributes.href ? false : true; },
                                            handler: function (e, node) {
                                                window.mainpage.addModuleTab(node);
                                            }
                                        },
                                        "-",
                                        { text: "新建",
                                            iconCls: "icon-standard-application-add",
                                            handler: function (e, node) {
                                                console.log(node);
                                            }
                                        }, "-",
                                        { text: "新建子目录",
                                            iconCls: "icon-standard-application-add",
                                            handler: function (e, node) {

                                            }
                                        }, "-",
                                        /*{ text: "添加至个人收藏", iconCls: "icon-standard-feed-add",
                                            disabled: function (e, node) { return !t.tree("isLeaf", node.target); },
                                            handler: function (e, node) { window.mainpage.nav.addFavo(node.id); }
                                        },*/
                                        { text: "重命名", iconCls: "icon-hamburg-pencil",
                                            handler: function (e, node) {
                                                t.tree("beginEdit", node.target);
                                            }
                                        }
                                    ],
                                    onAfterEdit: function (node) {
                                        window.mainpage.nav.rename(node);
                                    }
                                });
                            }, 300);
                        }
                    });
                }

                var layout = $(window.mainElement.westLayout);
                layout.layout("resize");
            }
        });
    };

    //  初始化应用程序主界面左侧面板中“导航菜单”的数据，并加载特定的子菜单树数据。
    window.mainpage.instMainMenus = function () {
        window.mainpage.loadNavMenus();
    };

    /**
     * show current time on the right top
     */
    window.mainpage.instTimerSpan = function () {
        var timerSpan = $("#timerSpan");

        var interval = function () {
            var timeText = "";
            if(window.langKey == 'ch'){
                timeText = $.date.toLongDateTimeString(new Date());
            }else{
                var time = new Date().getTime();
                timeText = Common.dateFormat(time/1000, "toString");
            }
            timerSpan.text(timeText);
        };

        interval();
        window.setInterval(interval, 1000);
    };

    /**
     * bind the tool bar events
     */
    window.mainpage.bindToolbarButtonEvent = function () {
        var searchOpts = $("#topSearchbox").searchbox("options"), searcher = searchOpts.searcher;
        searchOpts.searcher = function (value, name) {
            if ($.isFunction(searcher)) { searcher.apply(this, arguments); }
            window.mainpage.search(name, value);
        };

        // hide/show the north layout of main page
        $("#btnHideNorth").click(function () { window.mainpage.hideNorth(); });

        var btnShow = $("#btnShowNorth").click(function () { window.mainpage.showNorth(); });

        var l = $(window.mainElement.mainLayout), north = l.layout("panel", "north"), panel = north.panel("panel"),
            toolbar = $("#toolbar"), topbar = $("#topbar");
        opts = north.panel("options"), onCollapse = opts.onCollapse, onExpand = opts.onExpand;
        opts.onCollapse = function () {
            if ($.isFunction(onCollapse)) { onCollapse.apply(this, arguments); }
            btnShow.show();
            toolbar.insertBefore(panel).addClass("top-toolbar-topmost");
        };
        opts.onExpand = function () {
            if ($.isFunction(onExpand)) { onExpand.apply(this, arguments); }
            btnShow.hide();
            toolbar.insertAfter(topbar).removeClass("top-toolbar-topmost");
        };

        var themeName = $.cookie("themeName"),
            themeCombo = $(window.mainElement.themeSelector).combobox({
                width: 140, editable: false,
                data: window.mainpage.themeData,
                valueField: "path", textField: "name",
                value: themeName || window.mainpage.themeData[0].path,
                onSelect: function (record) {
                    var opts = themeCombo.combobox("options");
                    window.mainpage.setTheme(record[opts.valueField], true);
                }
            });

        $(window.mainElement.uploadBtn).click(function () {
            if(window.mainElement.currentFolder <= 0){
                AdminMessager.show(0, "You should select the folder first!");
                return;
            }

            $("#win-upload").window("open");

            var folderId = window.mainElement.currentFolder; // current selected folder;

            var formData = {
                folderId    : folderId
            };

            var pick = {
                id: '#filePicker',
                label: Config.getLang("click_choose")
            };

            $("#uploader").AkUploader({
                pick        : pick,
                formData    : formData,
                server      : "/Document/upload",
                swf         : '../webuploader/dist/Uploader.swf',
                dnd         : '#uploader',
                paste       : '#uploader',
                compress    : false, // 不压缩图片，如果压缩，md5校验则不正确，因为图片在md5后，被修改才上传；
                prepareNextFile : true,
                /*accept      : {
                     title: 'Images',
                     extensions: 'gif,jpg,jpeg,bmp,png',
                     mimeTypes: 'image/!*'
                 },*/
                chunked     : true
            });
        });

        $(window.mainElement.btnFullScreen).click(function () {
            if ($.util.supportsFullScreen) {
                if ($.util.isFullScreen()) {
                    $.util.cancelFullScreen();
                } else {
                    $.util.requestFullScreen();
                }
            } else {
                $.easyui.messager.show("当前浏览器不支持全屏 API，请更换至最新的 Chrome/Firefox/Safari 浏览器或通过 F11 快捷键进行操作。");
            }
        });

        $(window.mainElement.btnExit).click(function () {
            $.easyui.messager.confirm("操作提醒", "您确定要退出当前程序并关闭该网页？", function (c) {
                if (c) {
                    window.onbeforeunload = null;
                    $.util.closeWindowNoConfirm();
                    $.ProcessManager.run({
                        url: "/User/end",
                        key: "User-end",
                        beforeSend: function (XMLHttpRequest) {},
                        success: function (data, textStatus, XMLHttpRequest) {
                            $.messager.alert(data.status_message);

                            if(data.status_code == 1){
                                setTimeout(function(){
                                    window.location.href =  "/User/start";
                                }, 1000);
                            }
                        }
                    });
                }
            });
        });
    };

    window.mainpage.search = function (value, name) { $.easyui.messager.show($.string.format("您设置的主题为：value: {0}, name: {1}", value, name)); };

    window.mainpage.themeData = $.array.filter($.easyui.theme.dataSource, function (val) {
        return val.disabled ? false : true;
    });

    //  设置当前系统主界面的界面皮肤风格；该方法提供如下参数：
    //      theme:      界面皮肤风格名称
    //      setCookie:  可选参数，boolean 类型，表示是否将 theme 保存至 cookie 名为 themeName
    window.mainpage.setTheme = function (theme, setCookie) {
        if (setCookie == null || setCookie == undefined) { setCookie = true; }
        $.easyui.theme(true, theme, function (item) {
            if (setCookie) {
                $.cookie("themeName", theme, { expires: 30 });
                var msg = $.string.format("您设置了新的系统主题皮肤为：{0}，{1}。", item.name, item.path);
                $.easyui.messager.show(msg);
            }
        });
    };

    /**
     * bind the tabs button events of main page
     */
    window.mainpage.bindMainTabsButtonEvent = function () {
        $("#mainTabs_jumpHome").click(function () { window.mainpage.mainTabs.jumpHome(); });
        $("#mainTabs_toggleAll").click(function () { window.mainpage.togglePanels(); });
        $("#mainTabs_jumpTab").click(function () { window.mainpage.mainTabs.jumpTab(); });
    };

    /**
     * bind the tabs button events of nav
     */
    window.mainpage.bindNavTabsButtonEvent = function () {
        $("#navMenu_refresh").click(function () { window.mainpage.refreshNavTab(); });
        $("#navMenu_expand").click(function () { window.mainpage.nav.expand(); });
        $("#navMenu_collapse").click(function () { window.mainpage.nav.collapse(); });
        $("#navMenu_collapseCurrentAll").click(function () { window.mainpage.nav.expandCurrentAll(); });
        $("#navMenu_expandCurrentAll").click(function () { window.mainpage.nav.collapseCurrentAll(); });
        $("#navMenu_collapseAll").click(function () { window.mainpage.nav.expandAll(); });
        $("#navMenu_expandAll").click(function () { window.mainpage.nav.collapseAll(); });
    };

    window.mainpage.hideNorth = function () { $(window.mainElement.mainLayout).layout("collapse", "north"); };

    window.mainpage.showNorth = function () { $(window.mainElement.mainLayout).layout("expand", "north"); };

    window.mainpage.togglePanels = function () { $(window.mainElement.mainLayout).layout("toggleAll", "collapse"); };

    window.mainpage.addModuleTab = function (node) {
        var n = node || {}, attrs = node.attributes || {}, opts = $.extend({}, n, { title: n.text }, attrs);
//        if (!opts.href) { return; }
        window.mainpage.mainTabs.addModule(opts);
    };

    //  判断指定的选项卡是否存在于当前主页面的选项卡组中；
    //  返回值：返回的值可能是以下几种：
    //      0:  表示不存在于当前选项卡组中；
    //      1:  表示仅 title 值存在于当前选项卡组中；
    //      2:  表示 title 和 href 都存在于当前选项卡组中；
    window.mainpage.mainTabs.isExists = function (title, href) {
        var t = $(window.mainElement.mainTabs), tabs = t.tabs("tabs"), array = $.array.map(tabs, function (val) { return val.panel("options"); }),
            list = $.array.filter(array, function (val) { return val.title == title; }), ret = list.length ? 1 : 0;
        if (ret && $.array.some(list, function (val) { return val.href == href; })) { ret = 2; }
        return ret;
    };

    // 设置tab打开参数
    window.mainpage.mainTabs.tabDefaultOption = {
        title: "新建选项卡", href: "", iniframe: false, closable: true, refreshable: false, iconCls: "icon-standard-application-form", repeatable: true, selected: true
    };

    // 配置tab的创建参数
    window.mainpage.mainTabs.parseCreateTabArgs = function (args) {
        var ret = {};
        if (!args || !args.length) {
            $.extend(ret, window.mainpage.mainTabs.tabDefaultOption);
        } else if (args.length == 1) {
            $.extend(ret, window.mainpage.mainTabs.tabDefaultOption, typeof args[0] == "object" ? args[0] : { href: args[0] });
        } else if (args.length == 2) {
            $.extend(ret, window.mainpage.mainTabs.tabDefaultOption, { title: args[0], href: args[1] });
        } else if (args.length == 3) {
            $.extend(ret, window.mainpage.mainTabs.tabDefaultOption, { title: args[0], href: args[1], iconCls: args[2] });
        } else if (args.length == 4) {
            $.extend(ret, window.mainpage.mainTabs.tabDefaultOption, { title: args[0], href: args[1], iconCls: args[2], iniframe: args[3] });
        } else if (args.length == 5) {
            $.extend(ret, window.mainpage.mainTabs.tabDefaultOption, { title: args[0], href: args[1], iconCls: args[2], iniframe: args[3], closable: args[4] });
        } else if (args.length == 6) {
            $.extend(ret, window.mainpage.mainTabs.tabDefaultOption, { title: args[0], href: args[1], iconCls: args[2], iniframe: args[3], closable: args[4], refreshable: args[5] });
        } else if (args.length >= 7) {
            $.extend(ret, window.mainpage.mainTabs.tabDefaultOption, { title: args[0], href: args[1], iconCls: args[2], iniframe: args[3], closable: args[4], refreshable: args[5], selected: args[6] });
        }
        return ret;
    };

    // 创建tab
    window.mainpage.mainTabs.createTab = function (title, href, iconCls, iniframe, closable, refreshable, selected) {
        var t = $(window.mainElement.mainTabs), i = 0, opts = window.mainpage.mainTabs.parseCreateTabArgs(arguments);
        while (t.tabs("getTab", opts.title + (i ? String(i) : ""))) { i++; }
        t.tabs("add", opts);
    };

    //  添加一个新的模块选项卡；该方法重载方式如下：
    //      function (tabOption)
    //      function (href)
    //      function (title, href)
    //      function (title, href, iconCls)
    //      function (title, href, iconCls, iniframe)
    //      function (title, href, iconCls, iniframe, closable)
    //      function (title, href, iconCls, iniframe, closable, refreshable)
    //      function (title, href, iconCls, iniframe, closable, refreshable, selected)
    window.mainpage.mainTabs.addModule = function (title, href, iconCls, iniframe, closable, refreshable, selected) {
        var opts = window.mainpage.mainTabs.parseCreateTabArgs(arguments), isExists = window.mainpage.mainTabs.isExists(opts.title, opts.href);

        switch (isExists) {
            case 0: window.mainpage.mainTabs.createTab(opts); break;
            case 1: window.mainpage.mainTabs.createTab(opts); break;
            case 2: window.mainpage.mainTabs.jumeTab(opts.title); break;
            default: break;
        }
    };

    window.mainpage.mainTabs.jumeTab = function (which) { $(window.mainElement.mainTabs).tabs("select", which); };

    window.mainpage.mainTabs.jumpHome = function () {
        var t = $(window.mainElement.mainTabs), tabs = t.tabs("tabs"), panel = $.array.first(tabs, function (val) {
            var opts = val.panel("options");
            return opts.title == window.mainElement.homePageTitle && opts.href == window.mainElement.homePageHref;
        });
        if (panel && panel.length) {
            var index = t.tabs("getTabIndex", panel);
            t.tabs("select", index);
        }
    };

    // create new browser tab to view the current panel tab
    window.mainpage.mainTabs.jumpTab = function (which) { $(window.mainElement.mainTabs).tabs("jumpTab", which); };

    window.mainpage.mainTabs.closeTab = function (which) { $(window.mainElement.mainTabs).tabs("close", which); };

    window.mainpage.mainTabs.closeCurrentTab = function () {
        var t = $(window.mainElement.mainTabs), index = t.tabs("getSelectedIndex");
        return t.tabs("closeClosable", index);
    };

    window.mainpage.mainTabs.closeOtherTabs = function (index) {
        var t = $(window.mainElement.mainTabs);
        if (index == null || index == undefined) { index = t.tabs("getSelectedIndex"); }
        return t.tabs("closeOtherClosable", index);
    };

    window.mainpage.mainTabs.closeLeftTabs = function (index) {
        var t = $(window.mainElement.mainTabs);
        if (index == null || index == undefined) { index = t.tabs("getSelectedIndex"); }
        return t.tabs("closeLeftClosable", index);
    };

    window.mainpage.mainTabs.closeRightTabs = function (index) {
        var t = $(window.mainElement.mainTabs);
        if (index == null || index == undefined) { index = t.tabs("getSelectedIndex"); }
        return t.tabs("closeRightClosable", index);
    };

    window.mainpage.mainTabs.closeAllTabs = function () {
        return $(window.mainElement.mainTabs).tabs("closeAllClosable");
    };

    window.mainpage.mainTabs.updateHash = function (index) {
        var opts = $(window.mainElement.mainTabs).tabs("getTab", index).panel("options");
        window.location.hash = opts.href ? opts.href : "";
    };

    window.mainpage.mainTabs.loadHash = function (hash) {
        while (hash.left(1) == "#") { hash = hash.substr(1); }
        if (String.isNullOrWhiteSpace(hash)) { return; }

        $.ProcessManager.run({
            url         : "/Public/common/nav-api-menu-data.json",
            type        : "get",
            dataType    : "json",
            key         : "menu-api",
            success: function (menus) {
                var array = $.fn.tree.extensions.cascadeToArray(menus),
                    node = $.array.first(array, function (val) { return val.attributes && val.attributes.href == hash; });
                if (node) {
                    window.mainpage.addModuleTab(node);
                } else {
                    $.easyui.messager.show("hash is not exists");
                }
            }
        });
    };

    window.mainpage.refreshNavTab = function (index) {
        var t = $(window.mainElement.navTabs);
        if (index == null || index == undefined) { index = t.tabs("getSelectedIndex"); }
        if (index == 0) {
            window.mainpage.nav.refreshNav();
        } else {
            window.mainpage.favo.refreshTree();
        }
    };

    window.mainpage.nav.refreshNav = function () { window.mainpage.instMainMenus(); };

    window.mainpage.nav.refreshTree = function () {
        var menu = $(window.mainElement.navMenuList).find("a.tree-node-selected.selected"), item = $.data(menu[0], "menu-item");
        if (item && item.href.length > 0) { window.mainpage.loadMenu(item); }
    };

    window.mainpage.nav.addFavo = function (id) {
        var t = $(window.mainElement.navMenuTree), node = arguments.length ? t.tree("find", id) : t.tree("getSelected");
        if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
    };

    window.mainpage.nav.rename = function (node) {
        var t = $(window.mainElement.navMenuTree);

        if (arguments.length) {
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
            t.tree("beginEdit", node.target);

            var text = node.text;
            var name = node.name;
            var id = node.id;

            var strFind = "\\["+id+"\\]";
            var textRep = new RegExp(strFind, "g");

            text = text.replace(textRep, "");

            if(name == text){
                return false;
            }

            // update data to server
            ProcessManager.run({
                url     : "/Folder/edit",
                data    : "id="+id+"&name="+text,
                key     : "Folder-edit",
                success: function (data, textStatus, XMLHttpRequest) {
                    if(data.status_code == 1){
                    }

                    AdminMessager.show(data.status_code, data.status_message);
                }
            });
        }
    };

    window.mainpage.nav.expand = function (id) {
        var t = $(window.mainElement.navMenuTree), node;
        if (id == null || id == undefined) {
            node = t.tree("getSelected");
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
        } else {
            node = t.tree("find", id);
            if (!node) { return $.easyui.messager.show("请传入有效的参数 id(菜单标识号)"); }
        }
        t.tree("expand", node.target);
    };

    window.mainpage.nav.collapse = function (id) {
        var t = $(window.mainElement.navMenuTree), node;
        if (id == null || id == undefined) {
            node = t.tree("getSelected");
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
        } else {
            node = t.tree("find", id);
            if (!node) { return $.easyui.messager.show("请传入有效的参数 id(菜单标识号)"); }
        }
        t.tree("collapse", node.target);
    };

    window.mainpage.nav.expandCurrentAll = function (id) {
        var t = $(window.mainElement.navMenuTree), node;
        if (id == null || id == undefined) {
            node = t.tree("getSelected");
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
        } else {
            node = t.tree("find", id);
            if (!node) { return $.easyui.messager.show("请传入有效的参数 id(菜单标识号)"); }
        }
        t.tree("expandAll", node.target);
    };

    window.mainpage.nav.collapseCurrentAll = function (id) {
        var t = $(window.mainElement.navMenuTree), node;
        if (id == null || id == undefined) {
            node = t.tree("getSelected");
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
        } else {
            node = t.tree("find", id);
            if (!node) { return $.easyui.messager.show("请传入有效的参数 id(菜单标识号)"); }
        }
        t.tree("collapseAll", node.target);
    };

    window.mainpage.nav.expandAll = function () { $(window.mainElement.navMenuTree).tree("expandAll"); };

    window.mainpage.nav.collapseAll = function () { $(window.mainElement.navMenuTree).tree("collapseAll"); };

    window.mainpage.favo.refreshTree = function () { window.mainpage.loadFavoMenus() };

    window.mainpage.favo.removeFavo = function (id) {
        var t = $(window.mainElement.favoMenuTree), node = arguments.length ? t.tree("find", id) : t.tree("getSelected");
        if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
    };

    window.mainpage.favo.rename = function (id, text) {
        var t = $(window.mainElement.favoMenuTree), node;
        if (!arguments.length) {
            node = t.tree("getSelected");
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
            t.tree("beginEdit", node.target);
        } else { }
    };

    var folderId = 20;
    window.mainpage.favo.addFolder = function (node) {
        var t = $(window.mainElement.favoMenuTree);
        node = node || t.tree("getSelected");
        $.easyui.messager.prompt("请输入添加的目录名称：", function (name) {
            if (name == null || name == undefined) { return; }
            if (String(name).trim() == "") { return $.easyui.messager.show("请输入目录名称！"); }
            if (node) {
                t.tree("insert", { after: node.target, data: { id: folderId++, text: name, iconCls: "icon-hamburg-folder", attributes: { folder: true } } });
            } else {

            }
        });
    }

    window.mainpage.favo.expand = function (id) {
        var t = $(window.mainElement.favoMenuTree), node;
        if (id == null || id == undefined) {
            node = t.tree("getSelected");
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
        } else {
            node = t.tree("find", id);
            if (!node) { return $.easyui.messager.show("请传入有效的参数 id(菜单标识号)"); }
        }
        t.tree("expand", node.target);
    };

    window.mainpage.favo.collapse = function (id) {
        var t = $(window.mainElement.favoMenuTree), node;
        if (id == null || id == undefined) {
            node = t.tree("getSelected");
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
        } else {
            node = t.tree("find", id);
            if (!node) { return $.easyui.messager.show("请传入有效的参数 id(菜单标识号)"); }
        }
        t.tree("collapse", node.target);
    };

    window.mainpage.favo.expandCurrentAll = function (id) {
        var t = $(window.mainElement.favoMenuTree), node;
        if (id == null || id == undefined) {
            node = t.tree("getSelected");
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
        } else {
            node = t.tree("find", id);
            if (!node) { return $.easyui.messager.show("请传入有效的参数 id(菜单标识号)"); }
        }
        t.tree("expandAll", node.target);
    };

    window.mainpage.favo.collapseCurrentAll = function (id) {
        var t = $(window.mainElement.favoMenuTree), node;
        if (id == null || id == undefined) {
            node = t.tree("getSelected");
            if (!node) { return $.easyui.messager.show("请先选择一行数据"); }
        } else {
            node = t.tree("find", id);
            if (!node) { return $.easyui.messager.show("请传入有效的参数 id(菜单标识号)"); }
        }
        t.tree("collapseAll", node.target);
    };

    window.mainpage.favo.expandAll = function () { $(window.mainElement.favoMenuTree).tree("expandAll"); };

    window.mainpage.favo.collapseAll = function () { $(window.mainElement.favoMenuTree).tree("collapseAll"); };

    //初始化友情链接列表
    $.util.namespace("link");
    window.link.reload = function () {
        var linkPanel = $("#linkPanel"), link = $("#linkList").empty();
        $.ProcessManager.run({
            url: "/Public/common/link-data.json",
            key: "link-data",
            beforeSend: function (XMLHttpRequest) { $.easyui.loading({ locale: linkPanel }); },
            success: function (data, textStatus, XMLHttpRequest) {
                $.each(window.link.data = data, function (i, item) {
                    var li = $("<li></li>").appendTo(link);
                    $("<span " + (item.bold ? "style=\"font-weight: bold;\"" : "") + "></span>").text(item.title).appendTo(li);
                    $("<br />").appendTo(li);
                    $("<a target='_blank'></a>").attr("href", item.href).text(item.href).appendTo(li);
                });
            },
            complete: function (XMLHttpRequest, textStatus) { $.easyui.loaded(linkPanel); }
        });
    };

    // 初始化更新日志
    $.util.namespace("changeLog");
    window.changeLog.reload = function(){
        var changeLog = $("#changelog-list");
        $.ProcessManager.run({
            url: "/Public/changelog.txt",
            type: "get",
            dataType: "text",
            key: "changelog",
            beforeSend: function (XMLHttpRequest) { $.easyui.loading({ locale: changeLog }); },
            success: function (data, textStatus, XMLHttpRequest) {
                $(changeLog).html("<pre>"+data+"</pre>");
            },
            complete: function (XMLHttpRequest, textStatus) { $.easyui.loaded(changeLog); }
        });
    };

})(jQuery);