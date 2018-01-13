
(function ($) {

    var hash = window.location.hash, start = new Date();

    $(function () {
        window.onbeforeunload = function () { return "您确定要退出本程序？"; };

        window.mainpage.instMainMenus();    // init menu
        //window.mainpage.instFavoMenus();  // init favourite menu
        window.mainpage.instTimerSpan();    // init time bar at the top right place
        window.mainpage.bindNavTabsButtonEvent();   // bind the tabs button events of nav
        window.mainpage.bindToolbarButtonEvent();   // bind the tool bar events
        window.mainpage.bindMainTabsButtonEvent();  // bind the tabs button events of main page

//        window.changeLog.reload();
        window.link.reload();

        var portal = $("#portal"), layout = $("#mainLayout"), navTabs = $("#navTabs"), themeCombo = $("#themeSelector");

        $.util.exec(function () {
            var theme = $.easyui.theme(), themeName = $.cookie("themeName");
            if (themeName && themeName != theme) { window.mainpage.setTheme(themeName, false); }

            layout.removeClass("hidden").layout("resize");

            $("#maskContainer").remove();

            var size = $.util.windowSize();

            //  判断当浏览器窗口宽度小于像素 1280 时，右侧 region-panel 自动收缩
            if (size.width < 1280) {
                layout.layout("collapse", "east");
            }

            setTimeout(function(){
                // 更新layout，解决切换皮肤出现的问题；
                layout.layout("expand", "south");
                setTimeout(function(){layout.layout("collapse", "south");}, 500); // 必须加延迟，不然会出错
            }, 300);

            window.mainpage.mainTabs.loadHash(hash);

            var stop = new Date();
            $.easyui.messager.show({ msg: "当前页面加载耗时(毫秒)：" + $.date.diff(start, "ms", stop), position: "bottomRight" });
        });
    });
})(jQuery);