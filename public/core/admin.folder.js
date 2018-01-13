var AdminFolder ={};

AdminFolder.getList = function(dataKey){
    var OrgDataKey = dataKey;
    var url = dataKey.replace(/-/g, "/");

    $("#"+dataKey).AkTable({
        url                 : "/"+url,
        idField             : 'id',
        //toolbarID           : 'dataGrid-ToolBar-'+OrgDataKey,
        autoFocusField      : "name",
        frozenColumns: [[
            { field: 'ck', checkbox: true },
            { field: 'id', title: 'ID', width: 50, sortable: true }
        ]],
        columns: [[
            { field: 'name', title: Config.getLang("name"), width: 120, sortable: true, editor:"text" },
            { field: 'ext', title: Config.getLang("extension"), width: 50, sortable: true },
            { field: 'user', title: Config.getLang("username"), width: 50, sortable: true },
            { field: 'type', title: Config.getLang("type"), width: 50, sortable: true },
            { field: 'size', title: Config.getLang("Size"), width: 50, sortable: true },
            { field: 'time_update', title: Config.getLang("updateTime"), width: 120, sortable: true,
                formatter: function (value, row, index) {
                    if(value <= 0){
                        return value;
                    }

                    var formatStr = "toString";

                    if(window.langKey == 'ch'){
                        formatStr = "toLocaleString";
                    }

                    return Common.dateFormat(value, formatStr);
                }
            },
            { field: 'time_create', title: Config.getLang("createTime"), width: 120, sortable: true,
                formatter: function (value, row, index) {
                    if(value <= 0){
                        return value;
                    }

                    var formatStr = "toString";

                    if(window.langKey == 'ch'){
                        formatStr = "toLocaleString";
                    }

                    return Common.dateFormat(value, formatStr);
                }
            }
        ]],
        rowContextMenu: [{
            text: "详情", iconCls: "icon-standard-building", handler: function (e, index, row) {
                var val = $("#"+dataKey).datagrid("getRows");
                AdminOrder.detail(row);

            }
        }
        ],

        onEndEdit: function(index,row,changes){
            // save changes in row;
            var dataPost = {};

            if(typeof changes.name != 'undefined'){
                dataPost.name = changes.name;
            }

            if(typeof dataPost.name == 'undefined'){
                return false;
            }

            dataPost.id = row.id;

            $.ProcessManager.run({
                url: "/Document/edit",
                key: "Document-edit",
                data: dataPost,
                success: function (data, textStatus, XMLHttpRequest) {
                    if(data.status_code == RESPONSE_SUCCESS){
                        var gridObj = $("#"+dataKey);
                        /*var ed = gridObj.datagrid('getEditor', {index:index,field:'status'});
                         gridObj.datagrid('getRows')[index]['status_text'] = $(ed.target).combobox('getText');*/

                        gridObj.datagrid("acceptChanges");
                        AdminMessager.show(data.status_code,data.status_message);
                    }else{
                        $("#"+dataKey).datagrid("rejectChanges");
                        AdminMessager.show(data.status_code,data.status_message);
                    }
                }
            });
            return true;
        }
    });
};

AdminFolder.toolBarListCreate = function(toolbarID)
{
    if($("#"+toolbarID).length > 0){
        return ;
    }

    var toolbarHtml = '<div id="'+toolbarID+'" style="padding:8px 5px;"></div>';

    $(toolbarHtml).appendTo("body");

    var toolbarObj = $("#"+toolbarID);
    $(toolbarObj).append('<input id="search-doc-date-from" name="create_time_start" class="easyui-datebox" style="width:110px">');
    $(toolbarObj).append(' <input id="search-doc-date-to" name="create_time_end" class="easyui-datebox" style="width:110px">');
    $(toolbarObj).append(' <input id="search-doc-username" name="username"  style="width:110px">');

    $(toolbarObj).append(' <a href="#"  id="search-doc-submit" onclick="AdminDataGridToolBar.search(\''+toolbarID+'\');">'+Config.getLang("search")+'</a>');

    $('#search-doc-date-from').datebox({prompt: Config.getLang("start_time")});
    $('#search-doc-date-to').datebox({prompt: Config.getLang("end_time")});

    $('#search-doc-submit').linkbutton({
        iconCls: 'icon-search'
    });

    $('#search-doc-username').validatebox({
        prompt:Config.getLang("username"),
        validType:'minLength[2]'
    });
}