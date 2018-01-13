var AdminMenu = {};

AdminMenu.setting = function(dataKey){
    var OrgDataKey = dataKey;
    var url = dataKey.replace(/-/g, "/");
    var gridObj = $("#"+dataKey);

    var menuTreeGrid = $(gridObj).treegrid({
        method      : "get",
        url         : "/"+url,
        idField     : 'id',
        treeField   : 'text',
        fitColumns  : true,
        fit         : true,
        remoteSort  : false,
        width       : TableHeaderMenu.getWidth(0.6),
        autoEditing     : true, //该属性启用双击行时自定开启该行的编辑状态
        extEditing      : true, //该属性启用行编辑状态的 ExtEditing 风格效果，该属性默认为 true。
        singleEditing   : true, //该属性启用datagrid的只允许单行编辑效果，该属性默认为 true。
        enableRowContextMenu    : true,
        autoBindDblClickRow     : false,
        enableHeaderClickMenu   : false,
        enableHeaderContextMenu : false,
        dndRow                  : true, //此属性开启此表格的行拖动排序功能
        moveMenu                : { submenu: false, upLevel: true, up: true, down: true, downLevel: true },    //开始行右键菜单的移动列功能，此属性可丰富配置，详情见 API 文档
        selectOnRowContextMenu  : true,       //此属性开启当右键点击行时自动选择该行的功能

        frozenColumns: [[
            { field: 'ck', checkbox: true },
            { field: 'id', title: 'ID(id)', width: 80, sortable: true }
        ]],
        columns:[[
            { field: 'text', title: Config.getLang("Name"), width: TableHeaderMenu.getWidth(0.2), sortable: true, editor:"text" },
            { field: 'iconCls', title: Config.getLang("Icon"), width: TableHeaderMenu.getWidth(0.2), sortable: true, editor:"text" },
            { field: 'href', title: Config.getLang("Href"), width: TableHeaderMenu.getWidth(0.2), sortable: true, editor:"text" },
            { field: 'is_valid', title: Config.getLang("Valid"), width: TableHeaderMenu.getWidth(0.2), sortable: true,
                editor:{type:'checkbox',options:{on:1,off:0}}
            }
        ]],
        rowContextMenu: [
            {
                text: "Delete",
                iconCls: "icon-standard-delete",
                handler: function (e, node) {
                    if(node.id <= 0){
                        menuTreeGrid.treegrid("remove", node.id);
                        return ;
                    }

                    $.messager.confirm("Delete", "Please be sure!", function(){
                        var dataPost = {id: node.id};

                        $.ProcessManager.run({
                            url: "/Menu/delete",
                            key: "Menu-delete",
                            data: dataPost,
                            success: function (data, textStatus, XMLHttpRequest) {
                                if(data.status_code == RESPONSE_SUCCESS){
                                    menuTreeGrid.treegrid("remove", node.id);
                                    AdminMessager.show(data.status_code,data.status_message);
                                }else{
                                    AdminMessager.show(data.status_code,data.status_message);
                                }
                            }
                        });
                    });
                }
            },
            {
                text    : "New",
                iconCls: "icon-standard-new",
                handler : function (e, node, row) {
                    $(gridObj).treegrid('append',{
                        parent: node.id,  // the node has a 'id' value that defined through 'idField' property
                        data: [{
                            'id'        : 0,
                            'text'      : "New node",
                            'iconCls'   : "icon-hamburg-folder",
                            'href'      : "#",
                            'is_valid'  : 1
                        }]
                    });
                }
            }
        ],
        onBeforeDrag: function (node) {
            // deny drag on new node
            if(node.id <=0){
                return false;
            }
        },
        onBeforeDrop: function (target, source, point) {
            // deny drop
            if(target.id <=0){
                return false;
            }
        },
        //通过拖动数据行以及右键菜单移动行数据时，都会触发 onDrop 事件。
        onDrop: function (target, source, point) {
            if(source.id <= 0 || target.id <=0){
                return;
            }

            $.messager.show($.string.format("您刚才将节点 {0} 移向了节点 {1} 的 {2} 位置", source.text, target.text, point));

            var dataPost = {data: {pid: 0}, id: 0};

            switch (point){
                case "append":
                    dataPost.data.pid = target.id;
                    dataPost.id = source.id;

                    break;
                case "top":
                case "bottom":
                    if(source.pid != target.pid){
                        dataPost.data.pid = target.pid;
                        dataPost.id = source.id;
                    }
                    break;
                default:
                    break;
            }

            if(dataPost.id > 0){
                $.ProcessManager.run({
                    url: "/Menu/edit",
                    key: "Menu-edit",
                    data: dataPost,
                    success: function (data, textStatus, XMLHttpRequest) {
                        if(data.status_code == RESPONSE_SUCCESS){
                            AdminMessager.show(data.status_code,data.status_message);
                        }else{
                            AdminMessager.show(data.status_code,data.status_message);
                        }
                    }
                });
            }
        },
        onEndEdit: function(index,row,changes){
            if(typeof changes.text == 'undefined' && typeof changes.iconCls == 'undefined'
                && typeof changes.href == 'undefined' && typeof changes.is_valid == 'undefined'
            ){
                return false;
            }

            // add new one
            if(row.id <= 0){
                var pNode = $(gridObj).treegrid('getParent', index);
                changes.pid = pNode.id;
                changes.is_valid = row.is_valid;
            }

            // save changes in row;
            var dataPost = {data: changes, id: row.id};

            $.ProcessManager.run({
                url: "/Menu/edit",
                key: "Menu-edit",
                data: dataPost,
                success: function (data, textStatus, XMLHttpRequest) {
                    if(data.status_code == RESPONSE_SUCCESS){
                        var gridObj = $("#"+dataKey);

                        if(typeof data.data.id != 'undefined'){
                            $(gridObj).treegrid('reload');
                        }

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