var AdminTabs = {
    tabsID: '#mainTabs'
};

AdminTabs.add = function(title, dataKey){
    var tabsObj = $(AdminTabs.tabsID);

    if(tabsObj.tabs('exists', title)){
        tabsObj.tabs('select', title);
    }else{
        tabsObj.tabs('add', {
            title: title,
            selected: true,
            content: '<table id="'+dataKey+'"></table>',
            closable: true
        });

        AdminTabs.load(dataKey);
    }
};

AdminTabs.load = function(dataKey){
    switch (dataKey){
        case 'yovim-admin-data-source-list':
            AdminSource.init();
            break;
        case 'yovim-admin-data-source-type-list':
            AdminSourceType.init();
            break;
        case 'yovim-admin-data-friendlink-list':
            AdminFriendLink.init();
            break;
        default :
            break;
    }
};

var AdminConfig = {};

AdminConfig.init = function(){

};

AdminConfig.resize = function(){
    var tabsObj = $(AdminTabs.tabsID);

    tabsObj.tabs({
        width:tabsObj.parent().width(),
        height:tabsObj.parent().height()
    });
};

AdminConfig.windowInit = function()
{
    var resizeTimer = null;
    $(window).bind('resize', function(){
        resizeTimer = setTimeout(function(){AdminConfig.resize()},300);
    });
};

var AdminForm = {};

AdminForm.submit = function(fromID){
//    $('#upload_contact_list').attr('disabled',true);
    $(obj).ajaxSubmit({
        type:'post',
        url:'contactlist.php?contact_action=upload',
        dataType:'json',
        success:function(rs){
            if(rs.status == RESPONSE_SUCCESS) {
                $('#contact_list').val('');
                DmsAction.checkContactListFile('#contact_list');
            } else if(rs.status == RESPONSE_e) {
                $('#upload_contact_list').attr('disabled',false);
            }
            MsgBox.show(rs.status, rs.msg);
        },
        error:function(XmlHttpRequest,textStatus,errorThrown){
            console.log(XmlHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
            $('#upload_contact_list').attr('disabled',false);
            MsgBox.show(0, 'Error: Connection Error.');
        }
    });
};

var AdminWindow = {};

/**
 * 弹出窗口初始化以及调用
 *
 * @param params
 */
AdminWindow.init = function(params){
    var winObj = $(params.winID);

    if(winObj.length <= 0){
        var winHtml = '<div id="'+params.winID.substring(1)+'"></div>';
        $('body').append(winHtml);

        var settingDefault = {
            width       : 800,
            height      : 600,
            modal       : true,
            onLoad:function(){
                /**
                 * 定义窗口中表单的提交事件处理方法
                 */
                if(params.onFormSubmit){
                    (params.onFormSubmit)();
                }

                /**
                 * 创建窗口时执行，初始化窗口页面信息；
                 */
                if(params.onDataInit){
                    (params.onDataInit)();
                }
            }
        };

        settingDefault = $.extend({}, settingDefault, params);

        $(params.winID).window(settingDefault);
    }else{
        $(params.winID).window('open');

        /**
         * 打开窗口时执行(第二次打开)，初始化页面数据
         */
        if(params.onDataRefresh){
            (params.onDataRefresh)();
        }
    }
};

var AdminMessager = {};

/**
 * messager
 * type: 0=error, 1=info, 2=warning
 *
 * @param type
 * @param info
 */
AdminMessager.show = function(type, info){
    switch (type){
        case RESPONSE_ERROR: // error info, don't close automatically
            $.messager.alert("Error", info, 'error');
            break;
        case RESPONSE_NOT_LOGIN:
        case RESPONSE_SUCCESS: // info, close it in 2 seconds automatically
            $.messager.show({
                title   : "Message",
                msg     : info,
                showType:'slide',
                style   :{
                    right   :'',
                    top     :document.body.scrollTop+document.documentElement.scrollTop,
                    bottom  :''
                }
            });
            break;
        case RESPONSE_WARNING: // warning, don't close automatically
            $.messager.alert('Warning', info,'warning');
            break;
        default :
            $.messager.alert('Warning', info,'warning');
            break;
    }

    $.messager.progress('close');
};