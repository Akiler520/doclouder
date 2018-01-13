/**
 * table controller
 *
 * Author: Akiler
 * Date: 2014-10-30
 */
(function($){
    $.fn.AkTable = function(settings) {
        settings = $.extend({}, $.fn.AkTable.sn.defaults, settings);

        if(settings.url == ''){
            return;
        }

        this.each(function() {
            // toolbar, create toolbar by given toolbarID
            if(typeof(settings.toolbarID) != 'undefined'){
                AdminDataGridToolBar.create(settings.toolbarID);
                settings.toolbar = "#"+settings.toolbarID;
            }

            // start to create table;
            $(this).datagrid(settings);
        });
    };

    $.fn.AkTable.sn = {
        defaults: {
            url             : '',
            width           : TableHeaderMenu.getWidth(0.6),
            height          : 'auto',
            fitColumns      : true,
            fit             : true,
            sortOrder       : "desc",
            remoteSort      : false,
            nowrap          : false,
            rownumbers      : true,
            pagination      : true,
            pageList        : [1,20,50,100],
            pageSize        : 50,
            singleSelect    : false,
            striped         : true,
            checkOnSelect   : false,
            selectOnCheck   : true,
            autoEditing     : true, //该属性启用双击行时自定开启该行的编辑状态
            extEditing      : true, //该属性启用行编辑状态的 ExtEditing 风格效果，该属性默认为 true。
            singleEditing   : true, //该属性启用datagrid的只允许单行编辑效果，该属性默认为 true。
            autoBindDblClickRow : false,
            onLoadSuccess: function (data) {
                if(typeof data.status_code != 'undefined' && parseInt(data.status_code) == RESPONSE_NOT_LOGIN){
                    // TODO: show the login window;
                    User.loginWindow();
                }
            }
        }
    };
})(jQuery);
