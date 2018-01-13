var AdminOrder = {
    listID      : '#Order-orderList',
    og_id       : 0,    // 订单对用的产品表的键值
    start_time  : '',   // 长线旅行开始日期
    product_id  : 0,    // 当前订单的产品ID
    order_id    : 0,    // 当前订单ID
    merge       : []
};

AdminOrder.edit = function(){
    var url_page = Config.rootPath+'Order-edit';
    var url_submit = Config.rootPath+'Order-edit';
    var url_data = Config.rootPath+'Order-detail';

    var winID = '#order-window-edit';
    var formID = '#order-form-edit';
    var EditsId = '#order-form-Edits';

    var rowSelected = $(AdminOrder.listID).datagrid('getSelections');
    if(rowSelected.length <= 0){
        AdminMessager.show(2, "Select one source first!");
        return;
    }

    if(rowSelected.length > 1){
        AdminMessager.show(0, "You should only select one to edit!");
        return;
    }

    var sourceID = rowSelected[0].id;

    AdminWindow.init({
        title:      '编辑订单',
        winID:      winID,
        href:   url_page,
        onFormSubmit: function(){
            $(formID).form({
                url: url_submit,
                onSubmit: function(){
//                    var data = $(formID).form("getData"); //获取表示数据
                    return $(formID).form("validate");
                },
                success:function(data){
                    data = Common.str2json(data);

                    AdminMessager.show(data.status_code, data.status_message);

                    if(data.status_code == RESPONSE_SUCCESS){
                        $(AdminOrder.listID).datagrid('reload');
                        Form.reset(formID);
                        $(winID).window('close');
                    }
                }
            });
        },
        onDataRefresh: function(){
            Form.reset(formID);
            $.ProcessManager.run({
                url     : url_data,
                key     : "Order-edit",
                data    : 'order_id='+sourceID,
                success :function(rs)
                {
                    AdminMessager.show(rs.status, rs.msg);

                    if(rs.status == 1){
                        var data = rs.data;
                        var formObj = $(formID);

                        formObj.form("load", data);
                    }
                }
            });
        }
    });
};

AdminOrder.detail = function(dataObj){
    var url_page = Config.rootPath+'Order-detail';
    var url_data = Config.rootPath+'Order-customDetail';
    var url_edit = Config.rootPath+'Order-edit';

    var winID = '#order-window-detail';
    var formID = '#order-form-detail';
    var EditsId = '#order-form-Edits';

    var sourceID = 0;

    if(typeof dataObj == 'undefined'){
        var rowSelected = $(AdminOrder.listID).datagrid('getSelections');
        if(rowSelected.length <= 0){
            AdminMessager.show(2, "Select one source first!");
            return;
        }

        if(rowSelected.length > 1){
            AdminMessager.show(0, "You should only select one to edit!");
            return;
        }

        sourceID = rowSelected[0].id;
    }else{
        sourceID = dataObj.order_id;
    }

    url_page = url_page+'-order_id-'+sourceID;

    AdminWindow.init({
        //title       : 'Order Detail',
        title       : '订单详情（Order Detail）',
        winID       : winID,
        href        : url_page,

        /**
         * 定义窗口中表单的提交事件处理方法
         */
        onFormSubmit: function(){

        },

        /**
         * 创建窗口时执行
         */
        onDataInit: function(){
            $('#OrderProduct_list').AkTable({
                method    : 'GET',
                url       : '/Order-getOrderProduct_list?order_id='+sourceID,
                idField   : 'og_id',
                autoFocusField:'booking_status',
                singleSelect        : true,
                autoEditing         : true,          //该属性启用双击行时自定开启该行的编辑状态
                extEditing          : true,           //该属性启用行编辑状态的 ExtEditing 风格效果，该属性默认为 true。
                singleEditing       : true,         //该属性启用datagrid的只允许单行编辑效果，该属性默认为 true。
                autoBindDblClickRow : false,
                columns:[[
                    {field:'product_id',title:'产品ID',width:50,sortable:true},
                    {field:'product_name',title:'产品名称',width:100,sortable:false,
                        formatter:function(value,row){
                            if(row.product_type_2 == 3){
                                value = "<span style='color:#F00;'>[小时游]</span> "+value;
                            }
                            if(row.product_type_2 == 4){
                                value = "<span style='color:#F00;'>[长线]</span>  "+value;
                            }
                            return value;
                        }
                    },
                    {field:'supplier',title:'供应商',width:30,sortable:false},
                    {field:'booking_status',title:'预定状态', width:60,sortable:false,
                        formatter:function(value,row){
                            if(row.booking_status == 'success'){
                                return '预定成功！';
                            }else if(row.booking_status == 'error'){
                                return '预定失败！';
                            }else{
                                return '请选择！';
                            }
                        },
                        editor:{
                            type:'combobox',
                            options:{
                                valueField:'id',
                                textField:'text',
                                method:'get',
                                url:'/Order-getOrderBookingStatus',
                                required:true
                            }
                        }
                    }
                ]],
                toolbar:[{
                    text:'添加行程',iconCls:'icon-add',header:function(){
                        if(editRow != undefined){
                            $("#Student_Table").datagrid('endEdit', editRow);
                        }
                        if (editRow == undefined) {
                            $("#Student_Table").datagrid('insertRow', {
                                index: 0,
                                row: {}
                            });
                            $("#Student_Table").datagrid('beginEdit', 0);
                            editRow = 0;
                        }
                    }
                }],
                rowContextMenu: [{
                    text: "编辑/详情", iconCls: "icon-standard-building", handler: function (e, index, row) {
                        var val = $("#OrderProduct_list").datagrid("getRows");
                        var winOrderLongCustomID = "#order-form-LongEdits";
                        if(row.product_type_2 == 4){
                            AdminWindow.init({
                                title       : '订单详情/编辑',
                                winID       : winOrderLongCustomID
                            });

                            var dataKey = "Order-orderDetails";
                            var listElement = '<table id="'+dataKey+'"></table>';
                            var url = '/Order-orderDetails-og_id-'+row.og_id+'-product_id-'+row.product_id+'-order_id-'+row.order_id;

                            AdminOrder.order_id = row.order_id;
                            AdminOrder.og_id = row.og_id;

                            $(winOrderLongCustomID).html(listElement);

                            AdminOrder.longTourCustomList(dataKey, url);
                        }else{
                            $.messager.show("没有更多信息！");
                        }
                    }
                }],
                onLoadSuccess: function () {
                    return;
                    var t = $("#OrderProduct_list"), col = t.datagrid("getColumnDom", "operator"), rows = t.datagrid("getRows");
                    col.find("a.l-btn").each(function (i, ele) {
                        $(this).click(function (e) {
                            alert(rows[i].og_id);
                            e.stopPropagation();
                        });
                    });
                },
                onEndEdit: function(index,row,changes){
                    var dataPost = {};
                    if(typeof changes.booking_status != 'undefined'){
                        dataPost.booking_status = changes.booking_status;
                    }
                    if(typeof dataPost.booking_status == 'undefined'){
                        return false;
                    }

                    dataPost.og_id = row.og_id;
                    var urlKey = "/Order-orderRowProductStatus";
                    var keyCode = "Order-orderRowProductStatus";
                    $.ProcessManager.run({
                        url: urlKey,
                        key: keyCode,
                        data: dataPost,
                        success: function (data, textStatus, XMLHttpRequest) {
                            if(data.status_code == RESPONSE_SUCCESS){
                                var gridObj = $("#OrderProduct_list");
                                gridObj.datagrid("acceptChanges");
                                $.messager.alert(data.status_message);
                            }else{
                                $("#OrderProduct_list").datagrid("rejectChanges");
                                $.messager.alert(data.status_message);
                            }
                        }
                    });
                    return true;
                }
            });
        },

        /**
         * 重新打开窗口时执行
         */
        onDataRefresh: function(){
            //Form.reset(formID);
            $.ProcessManager.run({
                url     : url_page,
                key     : "Order-detail",
                dataType: "html",
                type    : 'GET',
                success :function(rs)
                {
                    $(winID).html(rs);

                    $("#OrderProduct_list").AkTable({
                        method    : 'GET',
                        url       : '/Order-getOrderProduct_list?order_id='+sourceID,
                        idField   : 'og_id',
                        autoFocusField:'booking_status',
                        singleSelect        : true,
                        autoEditing         : true,          //该属性启用双击行时自定开启该行的编辑状态
                        extEditing          : true,           //该属性启用行编辑状态的 ExtEditing 风格效果，该属性默认为 true。
                        singleEditing       : true,         //该属性启用datagrid的只允许单行编辑效果，该属性默认为 true。
                        autoBindDblClickRow : false,

                        columns:[[
                            {field:'product_id',title:'产品ID',width:50,sortable:true},
                            {field:'product_name',title:'产品名称',width:100,sortable:false,
                                formatter:function(value,row){
                                    if(row.product_type_2 == 3){
                                        value = "<span style='color:#F00;'>[小时游]</span> "+value;
                                    }
                                    if(row.product_type_2 == 4){
                                        value = "<span style='color:#F00;'>[长线]</span>  "+value;
                                    }
                                    return value;
                                }
                            },
                            {field:'supplier',title:'供应商',width:30,sortable:false},
                            {field:'booking_status',title:'预定状态', width:60,sortable:false,
                                formatter:function(value,row){
                                    if(row.booking_status == 'success'){
                                        return '预定成功！';
                                    }else if(row.booking_status == 'error'){
                                        return '预定失败！';
                                    }else{
                                        return '请选择！';
                                    }
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'id',
                                        textField:'text',
                                        method:'get',
                                        url:'/Order-getOrderBookingStatus',
                                        required:true
                                    }
                                }
                            }
                        ]],
                        rowContextMenu: [{
                            text: "编辑/详情", iconCls: "icon-standard-building", handler: function (e, index, row) {
                                var val = $("#OrderProduct_list").datagrid("getRows");
                                var winOrderLongCustomID = '#order-form-LongEdits';
                                if(row.product_type_2 == 4){
                                    AdminWindow.init({
                                        title       : '订单详情/编辑',
                                        winID       : winOrderLongCustomID
                                    });

                                    var dataKey = "Order-orderDetails";
                                    var url = '/Order-orderDetails-og_id-'+row.og_id+'-product_id-'+row.product_id+'-order_id-'+row.order_id;

                                    AdminOrder.order_id = row.order_id;
                                    AdminOrder.og_id = row.og_id;

                                    AdminOrder.longTourCustomList(dataKey, url);
                                }else{
                                    $.messager.show("没有更多信息！");
                                }
                            }
                        }],
                        onLoadSuccess: function () {
                            return;
                            var t = $("#OrderProduct_list"), col = t.datagrid("getColumnDom", "operator"), rows = t.datagrid("getRows");
                            col.find("a.l-btn").each(function (i, ele) {
                                $(this).click(function (e) {
                                    alert(rows[i].og_id);
                                    e.stopPropagation();
                                });
                            });
                        },
                        onEndEdit: function(index,row,changes){
                            var dataPost = {};
                            if(typeof changes.booking_status != 'undefined'){
                                dataPost.booking_status = changes.booking_status;
                            }
                            if(typeof dataPost.booking_status == 'undefined'){
                                return false;
                            }

                            dataPost.og_id = row.og_id;
                            var urlKey = "/Order-orderRowProductStatus";
                            var keyCode = "Order-orderRowProductStatus";
                            $.ProcessManager.run({
                                url: urlKey,
                                key: keyCode,
                                data: dataPost,
                                success: function (data, textStatus, XMLHttpRequest) {
                                    if(data.status_code == RESPONSE_SUCCESS){
                                        var gridObj = $("#OrderProduct_list");
                                        gridObj.datagrid("acceptChanges");
                                        $.messager.alert(data.status_message);
                                    }else{
                                        $("#OrderProduct_list").datagrid("rejectChanges");
                                        $.messager.alert(data.status_message);
                                    }
                                }
                            });
                            return true;
                        }
                    });
                }
            });
        }
    });
};


AdminOrder.getList = function(dataKey){
    $("#"+dataKey).AkTable({
        url                 : "/"+dataKey,
        idField             : 'order_id',
        toolbarID           : 'dataGrid-ToolBar-orderList',
        autoFocusField      : "order_amount",
//        singleSelect        : true,
        autoEditing         : true,          //该属性启用双击行时自定开启该行的编辑状态
        extEditing          : true,           //该属性启用行编辑状态的 ExtEditing 风格效果，该属性默认为 true。
        singleEditing       : true,         //该属性启用datagrid的只允许单行编辑效果，该属性默认为 true。
        autoBindDblClickRow : false,
        checkOnSelect: false,
//        selectOnCheck: false,

        frozenColumns: [[
            { field: 'ck', checkbox: true },
            { field: 'order_id', title: 'ID', width: 80, sortable: true },
            { field: 'order_sn', title: '订单编号', width: 80, sortable: true }
        ]],
        columns: [[
            { field: 'nick_name', title: '用户', width: 120, sortable: true },
            { field: 'mobile', title: '联系方式', width: 120, sortable: true },
            { field: 'create_time', title: '创建时间', width: 180, sortable: true ,
                formatter: function (value, row, index) {
                    if(value <= 0){
                        return value;
                    }

                    return Common.format(value);
                }
            },
            { field: 'pay_time', title: '支付时间', width: 180, sortable: true,
                formatter: function (value, row, index) {
                    if(value <= 0){
                        return value;
                    }

                    return Common.format(value, "toLocaleDateString");
                }
            },
            { field: 'order_amount', title: '订单总额', width: 180, editor: "numberbox", sortable: true,
                formatter: function (value, row, index) {
                    value = "￥"+Math.ceil(value);

                    return value;
                }
            },
            { field: 'description', title: '订单信息', width: 180, sortable: true},
            { field: 'status', title: '订单状态', width: 180, sortable: true,
                formatter:function(value,row){
                    return row.status_text;
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'id',
                        textField:'text',
                        method:'get',
                        url:'/Order-getOrderPayStatus',
                        required:true
                    }
                }
            },
            { field: 'status_process', title: '处理状态', width: 180, sortable: true,
                formatter:function(value,row){
                    return row.status_process_text;
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'id',
                        textField:'text',
                        method:'get',
                        url:'/Order-getOrderConfirmStatus',
                        required:true
                    }
                }
            }
        ]],
        rowContextMenu: [{
                text: "订单详情", iconCls: "icon-standard-building", handler: function (e, index, row) {
                    var val = $("#"+dataKey).datagrid("getRows");
                    AdminOrder.detail(row);

                }
            }
//            {
//                text: "编辑订单", iconCls: "icon-standard-building-edit", handler: function (e, index, row) {
//                var val = $("#"+dataKey).datagrid("getRows");
//                AdminOrder.edit(row);
//            }
//            },
//            {
//                text: "产品预定详情", iconCls: "icon-standard-building", handler: function (e, index, row) {
//                var val = $("#"+dataKey).datagrid("getRows");
//            }
//            }
        ],
        onLoadSuccess: function () {
            return;
            var t = $("#"+dataKey), col = t.datagrid("getColumnDom", "operator"), rows = t.datagrid("getRows");
            col.find("a.l-btn").each(function (i, ele) {
                // set not to run the url href page, just use js controller
                $(this).click(function (e) {
                    alert(rows[i].order_sn);
                    e.stopPropagation();
                });
            });
        },
        onEndEdit: function(index,row,changes){
            // save changes in row;
            var dataPost = {};

            if(typeof changes.order_amount != 'undefined'){
                dataPost.order_amount = changes.order_amount;
            }

            if(typeof changes.status != 'undefined'){
                dataPost.status = changes.status;
            }

            if(typeof changes.status_process != 'undefined'){
                dataPost.status_process = changes.status_process;
            }

            if(typeof dataPost.order_amount == 'undefined' && typeof dataPost.status == 'undefined' && typeof dataPost.status_process == 'undefined'){
                return false;
            }

            dataPost.order_id = row.order_id;

            $.ProcessManager.run({
                url: "/Order-editRow",
                key: "Order-editRow",
                data: dataPost,
                success: function (data, textStatus, XMLHttpRequest) {
                    if(data.status_code == RESPONSE_SUCCESS){
                        var gridObj = $("#"+dataKey);
                        /*var ed = gridObj.datagrid('getEditor', {index:index,field:'status'});
                         gridObj.datagrid('getRows')[index]['status_text'] = $(ed.target).combobox('getText');*/

                        gridObj.datagrid("acceptChanges");
                        $.messager.alert(data.status_message);
                    }else{
                        $("#"+dataKey).datagrid("rejectChanges");
                        $.messager.alert(data.status_message);
                    }
                }
            });
            return true;
        }
    });
};

AdminOrder.toolBarListCreate = function(toolbarID)
{
    if($("#"+toolbarID).length > 0){
        return ;
    }

    var toolbarHtml = '<div id="'+toolbarID+'" style="padding:8px 5px;"></div>';

    $(toolbarHtml).appendTo("body");

    var toolbarObj = $("#"+toolbarID);
    $(toolbarObj).append('<input id="search-order-date-from" name="create_time_start" class="easyui-datebox" style="width:110px">');
    $(toolbarObj).append(' <input id="search-order-date-to" name="create_time_end" class="easyui-datebox" style="width:110px">');
    $(toolbarObj).append(' <input id="search-order-status-pay" name="status" >');
    $(toolbarObj).append(' <input id="search-order-status-process" name="status_process">');
    $(toolbarObj).append(' <input id="search-order-sn" name="order_sn"  style="width:110px">');
    $(toolbarObj).append(' <input id="search-order-username" name="username"  style="width:110px">');
    $(toolbarObj).append(' <input id="search-order-mobile" name="mobile"  style="width:110px">');

    $(toolbarObj).append(' <a href="#"  id="search-order-submit" onclick="AdminDataGridToolBar.search(\''+toolbarID+'\');">搜索</a>');

    $('#search-order-date-from').datebox({prompt: "开始时间"});
    $('#search-order-date-to').datebox({prompt: "结束时间"});

    $('#search-order-submit').linkbutton({
        iconCls: 'icon-search'
    });

    $('#search-order-status-pay').combobox({
        url         :'/Order-getOrderPayStatus?empty=1',
        valueField  :'id',
        textField   :'text'
    });

    $('#search-order-status-process').combobox({
        url         :'/Order-getOrderConfirmStatus?empty=1',
        valueField  :'id',
        textField   :'text'
    });

    $('#search-order-status-pay').combobox("select", -1);
    $('#search-order-status-process').combobox("select", -1);

    $('#search-order-sn').validatebox({
        prompt:'订单编号',
        iconCls:'icon-search',
        validType:'minLength[2]'
    });

    $('#search-order-username').validatebox({
        prompt:'用户名称',
        validType:'minLength[2]'
    });

    $('#search-order-mobile').validatebox({
        prompt:'联系电话',
        validType:'minLength[2]'
    });

//    var footerInfo = '<div id="'+toolbarID+'-footer" style="padding:2px 5px;"><a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true"></a><a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true"></a><a href="#" class="easyui-linkbutton" iconCls="icon-save" plain="true"></a><a href="#" class="easyui-linkbutton" iconCls="icon-cut" plain="true"></a><a href="#" class="easyui-linkbutton" iconCls="icon-remove" plain="true"></a></div>';
//    $(footerInfo).appendTo("body");
};

AdminOrder.toolBarListAction = function(toolbarID)
{
    var toolbarObj = $("#"+toolbarID);
    var orderListObj = $("#Order-orderList");

    var dataPost = {};

    dataPost.create_time_start = toolbarObj.find("input[name='create_time_start']").val();
    dataPost.create_time_end = toolbarObj.find("input[name='create_time_end']").val();
    dataPost.status = toolbarObj.find("input[name='status']").val();
    dataPost.status_process = toolbarObj.find("input[name='status_process']").val();
    dataPost.order_sn = toolbarObj.find("input[name='order_sn']").val();
    dataPost.username = toolbarObj.find("input[name='username']").val();
    dataPost.mobile = toolbarObj.find("input[name='mobile']").val();

    orderListObj.datagrid({
        'queryParams': dataPost
    });
};

AdminOrder.toolBarStatisticAction = function(toolbarID)
{
    var toolbarObj = $("#"+toolbarID);
    var orderObj = $("#Order-statistic");

    var dataPost = {};

    dataPost.status = toolbarObj.find("input[name='status']").val();
    dataPost.month = toolbarObj.find("input[name='month']").val();

    orderObj.datagrid({
        'queryParams': dataPost
    });
};

AdminOrder.longTourCustomList = function(dataKey, dataUrl){
    $("#"+dataKey).AkTable({
        url                 : dataUrl,
        idField             : 'id',
//        toolbarID           : 'dataGrid-ToolBar-productList',
        autoFocusField      : "status",
        singleSelect        : true,//为TRUE则只允许选择一行
        autoEditing         : true,//该属性启用双击行时自定开启该行的编辑状态
        extEditing          : true,//该属性启用行编辑状态的 ExtEditing 风格效果，该属性默认为 true。
        singleEditing       : true,//该属性启用datagrid的只允许单行编辑效果，该属性默认为 true。
        autoBindDblClickRow : false,
        showFooter          : true,
        pagination          : false,
        view                : groupview,
        groupField          : 'title',
        groupFormatter:function(value,rows){
            if(!value){
                value = rows[0].type;
            }
            return value;
        },
        columns:[[
//            {field:'title',     title:'行程', width:120, sortable:false},
            {field:'type',      title:'类型', width:40, sortable:false},
            {field:'name',      title:'名称', width:160, sortable:false},
            {field:'unitPrice', title:'单价', width:120, sortable:false},
            {field:'number',    title:'数量', width:120, sortable:false},
            {field:'unit',      title:'单位', width:30, sortable:false,
                formatter:function(value,row){
                    value = (row.unit != "总计：") ? value : "<span style='font-weight: bold; color: #FF0000;'>"+value+"</span> ";

                    return value;
                }
            },
            {field:'totalPrice',title:'总计', width:60, sortable:false,
                formatter:function(value,row){
                    value = (row.unit != "总计：") ? value : "<span style='font-weight: bold; color: #FF0000;'>"+value+"</span> ";

                    return value;
                }
            },
            {field:'status',    title:'预定状态', width:60, sortable:false,
                formatter:function(value,row){
                    if(typeof value == 'undefined' || value.length <= 0){
                        value = (row.unit == "总计：") ? "" : "还未预订";
                    }else{
                        if(value == 'error'){
                            value = "预订失败";
                        }else{
                            value = "预订成功";
                        }
                    }
                    return value;
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'id',
                        textField:'text',
                        method:'get',
                        url:'/Order-getOrderBookingStatus',
                        required:true
                    }
                }
            }
        ]],
        rowContextMenu: [{
            text: "旅客信息", iconCls: "icon-standard-building", handler: function (e, index, row) {
                var val = $("#"+dataKey).datagrid("getRows");
                AdminOrder.contactDetail(row);
            }
        }
        ],
/*        rowStyler: function(index,row){
            // 不支持footer
            if (row.unit == "总计："){
                return "background-color:#000; color:#ff0000;"; // return inline style
                // the function can return predefined css class and inline style
                // return {class:'r1', style:{'color:#fff'}};
            }
        },*/
        onLoadSuccess: function (data) {
//            AdminOrder.rowsMerge(data, "title", $(this));
        },
        onEndEdit: function(index,row,changes){
            if(typeof changes.status == 'undefined'){
                return false;
            }

            var postData = {
                state_id : changes.status,   //状态值
                og_id    : AdminOrder.og_id,// 订单产品表ID
                Start_time:row.travel_date,//开始时间
                product_id:row.id,    // 产品ID
                type:row.type    // 产品ID
            };

            $.ProcessManager.run({
                url     : "/Order-updateStatusOfLongBands",
                key     : "Order-updateStatusOfLongBands",
                data    : postData,
                success:function(data){
                    if(data.status_code == RESPONSE_SUCCESS){
                        $.messager.show(data.status_message);
                    }else{
                        $.messager.alert(data.status_message);
                    }
                }
            });

            return true;
        }
    });
};

AdminOrder.rowsMerge = function(data, mergeField, gridObj)
{
    var tmpRow = {};
    var rows = data.rows;
    var tmpMerge = [];

    var exist = 0;

    for(var i_data = 0; i_data < data.total; i_data++){
        if(typeof tmpRow.title != 'undefined' && rows[i_data].title == tmpRow.title){
            var tmpMergeJson = {};
            tmpMergeJson.index = i_data - 1;
            tmpMergeJson.rowspan = 2;
            tmpMergeJson.title = rows[i_data-1].title;
            exist = 0;

            for(var j_merge = 0; j_merge < tmpMerge.length; j_merge++){
                if(tmpMerge[j_merge].title == tmpMergeJson.title){
                    exist = 1;
                    break;
                }
            }

            if(exist == 0){
                tmpMerge.push(tmpMergeJson);
            }else{
                tmpMerge[j_merge].rowspan++;
            }
        }

        tmpRow = rows[i_data];
    }

/*    var merges = [{
        index: 2,
        rowspan: 2
    },{
        index: 5,
        rowspan: 2
    },{
        index: 7,
        rowspan: 2
    }];*/

    AdminOrder.merge = tmpMerge;

    for(var i = 0; i < tmpMerge.length; i++){
        $(gridObj).datagrid('mergeCells',{
            index: tmpMerge[i].index,
            field: mergeField,
            rowspan: tmpMerge[i].rowspan
        });
    }
};

AdminOrder.contactDetail = function(row)
{
    var winID = '#window-order-contact-detail';
    var elementID = row.id;

    var listUrl = '/Order-contactDetail?product_id='+elementID+"&og_id="+AdminOrder.og_id;

    AdminWindow.init({
        title       : '旅客信息',
        winID       : winID,
        width       : 800,
        height      : 500
    });

    var dataKey = "data-order-contact-list";
    var listElement = '<table id="'+dataKey+'"></table>';

    $(winID).html(listElement);

    AdminOrder.getContactByProduct(dataKey, listUrl);
};

AdminOrder.getContactByProduct = function(dataKey, dataUrl)
{
    var gridObj = $("#"+dataKey);

    if(gridObj.html()){
        $.ProcessManager.run({
            url     : dataUrl,
            key     : "Order-contact-detail",
            dataType: "json",
            type    : 'GET',
            success :function(rs)
            {
                $(gridObj).datagrid("loadData", rs);
            }
        });

        return;
    }

    $(gridObj).AkTable({
        method              : 'GET',
        url                 : dataUrl,
//        idField           : 'contact_id',
        autoFocusField      :'name_first',
        singleSelect        : true,
        autoEditing         : true,          //该属性启用双击行时自定开启该行的编辑状态
        extEditing          : true,           //该属性启用行编辑状态的 ExtEditing 风格效果，该属性默认为 true。
        singleEditing       : true,         //该属性启用datagrid的只允许单行编辑效果，该属性默认为 true。
        autoBindDblClickRow : false,
        pagination          : false,
        view                : AdminDataGrid.emptyView,
        emptyMsg            : 'no records found',

        columns:[[
            {field:'name_first',title:'姓',width:50,sortable:true, required:true, editor:"text"},
            {field:'name_second',title:'名',width:100,sortable:false, required:true,editor:"text"},
            {field:'identity',title:'身份证',width:100,sortable:false,editor:"text"},
            {field:'passport',title:'护照',width:100,sortable:false, required:true,editor:"text"},
            {field:'phone',title:'电话',width:100,sortable:false, editor:"text"},
            {field:'email',title:'邮箱',width:100,sortable:false,editor:"text"},
            {field:'birthday',title:'生日',width:100,sortable:false, required:true,editor:"datebox"}
        ]],
        rowContextMenu: [
            {text: "添加", iconCls: "icon-standard-add",
                handler: function (e, index, row) {
                    var rows = $(gridObj).datagrid("getRows");
                    var newIndex = rows.length;

                    $(gridObj).datagrid('insertRow',{
                        index: newIndex,
                        row:{
                            'name_first'    : "",
                            'name_second'   : "",
                            'identity'      : "",
                            'passport'      : "",
                            'phone'         : "",
                            'email'         : "",
                            'birthday'      : ""
                        }
                    });
                }
            },
            {text: "删除", iconCls: "icon-standard-delete",
                handler: function (e, index, row) {
                    if(typeof row.contact_id == 'undefined'){
                        $(gridObj).datagrid("rejectChanges");
                        return;
                    }

                    AdminOrder.contactDelete(row.contact_id, index, gridObj);
                }
            }
        ],
        onLoadSuccess: function (data) {
            /*if(data.total > 0) return;

            $(gridObj).datagrid('appendRow',{
                "passport": '没有相关记录'
            });*/
        },
        onEndEdit: function(index,row,changes){
            var urlKey = "/Order-contactUpdate";
            var keyCode = "Order-contact-detail-update";

            var postData = {
                updateData: changes,
                contact_id: row.contact_id
            };

            if((typeof changes.name_first != 'undefined' && changes.name_first.length <= 0) ||
                (typeof changes.name_second != 'undefined' && changes.name_second.length <= 0) ||
                (typeof changes.identity != 'undefined' && changes.identity.length <= 0) ||
                (typeof changes.passport != 'undefined' && changes.passport.length <= 0) ||
                (typeof changes.phone != 'undefined' && changes.phone.length <= 0) ||
                (typeof changes.email != 'undefined' && changes.email.length <= 0) ||
                (typeof changes.birthday != 'undefined' && changes.birthday.length <= 0)
            ){
                $(gridObj).datagrid("rejectChanges");
                $.messager.alert("请填写完整信息");
                return false;
            }

            // 新添加的联系人
            if(typeof row.contact_id == 'undefined'){
                if((typeof changes.name_first == 'undefined' || changes.name_first.length <= 0) ||
                    (typeof changes.name_second == 'undefined' || changes.name_second.length <= 0) ||
                    (typeof changes.passport == 'undefined' || changes.passport.length <= 0) ||
                    (typeof changes.birthday == 'undefined' || changes.birthday.length <= 0)
                ){
                    $.messager.alert("请填写完整信息");
                    return false;
                }

                var rows = $(gridObj).datagrid("getRows");
                var preRow = rows[index-1];

                postData.row = {
                    'order_id'      : preRow.order_id,
                    'product_id'    : preRow.product_id,
                    'og_id'         : preRow.og_id
                };
            }

            $.ProcessManager.run({
                url: urlKey,
                key: keyCode,
                data: postData,
                success: function (data, textStatus, XMLHttpRequest) {
                    if(data.status_code == RESPONSE_SUCCESS){
                        gridObj.datagrid("acceptChanges");
                        $.messager.show(data.status_message);
                    }else{
                        $(gridObj).datagrid("rejectChanges");
                        $.messager.alert(data.status_message);
                    }
                }
            });
            return true;
        }
    });
};

/**
 * 根据ID删除旅客信息
 * @param contact_id
 * @param index
 * @param gridObj
 */
AdminOrder.contactDelete = function(contact_id, index, gridObj)
{
    $.messager.confirm(function (c) {
        if(!c){
            return;
        }

        $.ProcessManager.run({
            url: "/Order-contactDelete",
            key: "Order-contactDelete",
            data: {"contact_id": contact_id},
            success: function (data, textStatus, XMLHttpRequest) {
                if(data.status_code == RESPONSE_SUCCESS){
                    gridObj.datagrid("acceptChanges");
                    gridObj.datagrid("deleteRow", index);
                    $.messager.alert(data.status_message);
                }else{
                    $(gridObj).datagrid("rejectChanges");
                    $.messager.alert(data.status_message);
                }
            }
        });
    });
};

AdminOrder.getStatisticList = function(dataKey)
{
    $("#"+dataKey).AkTable({
        url                 : "/"+dataKey,
        idField             : 'order_id',
        toolbarID           : 'dataGrid-ToolBar-orderStatistic',
//        singleSelect        : true,
        checkOnSelect: false,
//        selectOnCheck: false,

        columns: [[
            { field: 'month', title: '统计时间', width: 120, sortable: true },
            { field: 'count', title: '订单数量', width: 120, sortable: true },
            { field: 'money', title: '订单总额', width: 120, sortable: true }
        ]]
    });
};

AdminOrder.toolBarStatisticCreate = function(toolbarID)
{
    if($("#"+toolbarID).length > 0){
        return ;
    }

    var toolbarHtml = '<div id="'+toolbarID+'" style="padding:8px 5px;"></div>';

    $(toolbarHtml).appendTo("body");

    var toolbarObj = $("#"+toolbarID);
    $(toolbarObj).append(' <input id="search-statistic-month" name="month" >');
    $(toolbarObj).append(' <input id="search-statistic-order-status-pay" name="status" >');

    $(toolbarObj).append(' <a href="#"  id="search-statistic-submit" onclick="AdminDataGridToolBar.search(\''+toolbarID+'\');">统计</a>');

    $('#search-statistic-submit').linkbutton({
        iconCls: 'icon-search'
    });

    $('#search-statistic-order-status-pay').combobox({
        url         :'/Order-getOrderPayStatus?empty=1',
        valueField  :'id',
        textField   :'text'
    });

    $('#search-statistic-month').combobox({
        url         :'/Order-getStatisticMonth?empty=1',
        valueField  :'id',
        textField   :'text'
    });

    $('#search-statistic-order-status-pay').combobox("select", -1);
};