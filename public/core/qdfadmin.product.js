var AdminProduct = {
    listID  : '#Product-productList',
    product_id:0   //产品ID
};

AdminProduct.edit = function(dataKey,dataurl){
    $("#"+dataKey).AkTable({
        url                 : dataurl,
        idField             : 'product_id',
        autoFocusField      : "status",
        singleSelect        : true,//为TRUE则只允许选择一行
        autoEditing         : true,//该属性启用双击行时自定开启该行的编辑状态
        extEditing          : true,//该属性启用行编辑状态的 ExtEditing 风格效果，该属性默认为 true。
        singleEditing       : true,//该属性启用datagrid的只允许单行编辑效果，该属性默认为 true。
        autoBindDblClickRow : false,
        groupFormatter:function(value,rows){
            if(!value){
                value = rows[0].type;
            }
            return value;
        },
        frozenColumns: [[
            { field: 'product_id', title: 'ID', width: 50, sortable: true },
            { field: 'target_area_2_name',title:'国家',width:80,sortable:false },
            { field: 'target_area_3_name',title:'城市',width:80,sortable:false}
        ]],
        columns:[[
            {field:'product_name',title:'产品名称',width:120, editor:"text",sortable:false},
            {field:'price',title:'产品价格',width:50,sortable:true},
            {field:'supplier_product_code',title:'产品编码',width:100, editor:"text",sortable:false},
            {field:'supplier_product_subcode',title:'子编码',width:80, editor:"text",sortable:false},
            {field:'product_type_2',title:'产品类型',width:60,sortable:true,
                formatter:function(value,row){
                    return row.product_type_2_text;
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'id',
                        textField:'text',
                        method:'get',
                        url:'/Product-getProductConfirmType',
                        required:true
                    }
                }
            },
            {field:'sort',title:'排序',width:80, editor:"numberbox",sortable:true}
        ]]
    });
}


/**
 * 产品列表
 */
AdminProduct.getProductList = function(dataKey){
    $("#"+dataKey).AkTable({
        url                 : "/"+dataKey,
        idField             : 'product_id',
        toolbarID           : 'dataGrid-ToolBar-productList',
        autoFocusField      : "product_id",
        singleSelect        : true,//为TRUE则只允许选择一行
        autoEditing         : true,//该属性启用双击行时自定开启该行的编辑状态
        extEditing          : true,//该属性启用行编辑状态的 ExtEditing 风格效果，该属性默认为 true。
        singleEditing       : true,//该属性启用datagrid的只允许单行编辑效果，该属性默认为 true。
        autoBindDblClickRow : false,
        frozenColumns: [[
            { field: 'ck', checkbox: true },
            { field: 'product_id', title: 'ID', width: 50, sortable: true },
            { field: 'target_area_2_name',title:'国家',width:80,sortable:false },
            { field: 'target_area_3_name',title:'城市',width:80,sortable:false}
        ]],
        columns:[[
            {field:'product_name',title:'产品名称',width:120, editor:"text",sortable:false},
            {field:'price',title:'产品价格',width:50,sortable:true},
            {field:'supplier_product_code',title:'产品编码',width:100, editor:"text",sortable:false},
            {field:'supplier_product_subcode',title:'子编码',width:80, editor:"text",sortable:false},
            {field:'product_type_2',title:'产品类型',width:60,sortable:true,
                formatter:function(value,row){
                    return row.product_type_2_text;
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'id',
                        textField:'text',
                        method:'get',
                        url:'/Product-getProductConfirmType',
                        required:true
                    }
                }
            },
            {field:'sort',title:'排序',width:80, editor:"numberbox",sortable:true},
            {field:'status',title:'产品状态',width:80,sortable:true,
                formatter:function(value,row){
                    return row.status_productList_text;
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'id',
                        textField:'text',
                        method:'get',
                        //multiple:true,
                        url:'/Product-getProductConfirmStatus',
                        required:true
                    }
                }
            }
        ]],
        onLoadSuccess: function () {
            return;
            var t = $("#"+dataKey), col = t.datagrid("getColumnDom", "operator"), rows = t.datagrid("getRows");
            col.find("a.l-btn").each(function (i, ele) {
                // set not to run the url href page, just use js controller
                $(this).click(function (e) {
                    alert(rows[i].product_id);
                    e.stopPropagation();
                });
            });
        },
        onEndEdit: function(index,row,changes){
            var dataPost = {};
            if(typeof changes.product_name != 'undefined'){
                dataPost.product_name = changes.product_name;
            }
            if(typeof changes.product_type_2 != 'undefined'){
                dataPost.product_type_2 = changes.product_type_2;
            }
            if(typeof changes.supplier_product_code != 'undefined'){
                dataPost.supplier_product_code = changes.supplier_product_code;
            }
            if(typeof changes.supplier_product_subcode != 'undefined'){
                dataPost.supplier_product_subcode = changes.supplier_product_subcode;
            }
            if(typeof changes.sort != 'undefined'){
                dataPost.sort = changes.sort;
            }
            if(typeof changes.status != 'undefined'){
                dataPost.status = changes.status;
            }
            if(typeof dataPost.product_name == 'undefined' && typeof dataPost.product_type_2 == 'undefined'
                && typeof dataPost.supplier_product_code == 'undefined' && typeof dataPost.supplier_product_subcode == 'undefined'
                && typeof dataPost.sort == 'undefined' && typeof dataPost.status == 'undefined'
            ){
                return false;
            }
            dataPost.product_id = row.product_id;
            $.ProcessManager.run({
                url: "/Product-editRow",
                key: "Product-editRow",
                data: dataPost,
                success: function (data) {
                    if(data.status_code == RESPONSE_SUCCESS){
                        var gridObj = $("#"+dataKey);
                        gridObj.datagrid("acceptChanges");
                        $.messager.alert(data.status_message);
                    }else{
                        $("#"+dataKey).datagrid("rejectChanges");
                        $.messager.alert(data.status_message);
                    }
                }
            });
            return true;
        },
        rowContextMenu:[{
            text:'编辑基本信息', iconCls: "icon-standard-application-form-edit", handler: function (e, index, row){
                AdminProduct.productBasicInfo(row);
            }
        },{
            text:'关联车辆', iconCls: "icon-standard-car", handler: function (e, index, row){
                AdminProduct.productCarInfo(row);
            }
        },{
            text:'行程信息', iconCls: "icon-standard-date", handler: function (e, index, row){
                AdminProduct.productTripInfo(row);
            }
        },{
            text:'行前准备', iconCls: "icon-standard-book-open", handler: function (e, index, row){
                AdminProduct.productBeforeInfo(row);
            }
        },{
            text:'产品价格', iconCls: "icon-standard-coins", handler: function (e, index, row){
                AdminProduct.productPriceInfo(row);
            }
        },{
            text:'子产品信息', iconCls: "icon-standard-chart-organisation", handler: function (e, index, row){
                AdminProduct.productSonInfo(row);
            }
        },{
            text:'产品图片', iconCls: "icon-standard-application-view-gallery", handler: function (e, index, row){
                AdminProduct.productImgInfo(row);
            }
        },{
            text:'添加产品', iconCls: "icon-standard-application-add", handler: function (e, index, row){
                AdminProduct.productBasicInfoAdd(row);
            }
        }]
    });
};


/**
 * 产品搜索处理 zjl
 * @param toolbarID
 */
AdminProduct.toolBarListCreate = function(toolbarID){
    if($("#"+toolbarID).length > 0){
        return ;
    }
    var toolbarHtml = '<div id="'+toolbarID+'" style="padding:8px 5px;"></div>';
    $(toolbarHtml).appendTo("body");
    var toolbarObj = $("#"+toolbarID);
    $(toolbarObj).append(' <input id="search-product-type" name="product_type_2" >');
    $(toolbarObj).append(' <input id="search-product-status" name="status">');
    $(toolbarObj).append(' <input id="search-product-name" name="keywords"  style="width:110px">');
    $(toolbarObj).append(' <input id="search-product-supplier-code" name="product_code"  style="width:110px">');
    $(toolbarObj).append(' <input id="search-product-supplier-subcode" name="product_subcode"  style="width:110px">');

    $(toolbarObj).append(' <a href="#"  id="search-product-submit" onclick="AdminDataGridToolBar.search(\''+toolbarID+'\');">搜索</a>');

    $('#search-product-submit').linkbutton({
        iconCls: 'icon-search'
    });

    $('#search-product-type').combobox({
        url         :'/Product-getProductConfirmType?empty=1',
        valueField  :'id',
        textField   :'text'
    });

    $('#search-product-status').combobox({
        url         :'/Product-getProductConfirmStatus?empty=1',
        valueField  :'id',
        textField   :'text'
    });
    $('#search-product-type').combobox("select", -1);
    $('#search-product-status').combobox("select", -1);

    $('#search-product-name').validatebox({
        prompt:'产品名称',
        iconCls:'icon-search',
        validType:'minLength[2]'
    });

    $('#search-product-supplier-code').validatebox({
        prompt:'商家编码',
        validType:'minLength[1]'
    });

    $('#search-product-supplier-subcode').validatebox({
        prompt:'商家子编码',
        validType:'minLength[1]'
    });
};

AdminProduct.toolBarListAction = function(toolbarID){
    var toolbarObj = $("#"+toolbarID);
    var productListObj = $("#Product-productList");
    var dataPost = {};
    dataPost.product_type_2 = toolbarObj.find("input[name='product_type_2']").val();
    dataPost.status = toolbarObj.find("input[name='status']").val();
    dataPost.keywords = toolbarObj.find("input[name='keywords']").val();
    dataPost.product_code = toolbarObj.find("input[name='product_code']").val();
    dataPost.product_subcode = toolbarObj.find("input[name='product_subcode']").val();
    productListObj.datagrid({
        'queryParams': dataPost
    });
};

/**
 * 产品基本信息 ZJL
 * @param row
 */
AdminProduct.productBasicInfo = function(row){
    var winID = '#data_form_BasicEsayUi';
    var productID = row.product_id;
    var BasicUrl = '/Product-editBasicEsayUi-product_id-'+productID;
    AdminWindow.init({
        title       : '产品基本信息（Basic）',
        winID       : winID,
        width       : 1200,
        height      : 580
    });
    var dataKey = "data_form_BasicEsayUi";
    var listElement = '<table id="'+dataKey+'"></table>';
    $(winID).html(listElement);
    AdminProduct.BasicEsayUiProduct(dataKey,BasicUrl);
};
AdminProduct.BasicEsayUiProduct = function(dataKey,BasicUrl){
    if($("#"+dataKey).html()){
        $.ProcessManager.run({
            url     : BasicUrl,
            key     : 'Product-editBasicEsayUi',
            type    : 'GET',
            dataType:'html',
            success:function(data){
                $("#"+dataKey).html(data);
            }
        })
    }
}

/**
 * 产品车辆信息 ZJL
 * @param row
 */
AdminProduct.productCarInfo = function(row){
    var winID = '#data_form_CarEsayUi';
    var productID = row.product_id;
    var BasicUrl = '/Product-editCarEsayUi-product_id-'+productID;
    AdminWindow.init({
        title       : '产品车辆信息（Car）',
        winID       : winID,
        width       : 1000,
        height      : 500
    });
    var dataKey = "data_form_CarEsayUi";
    var listElement = '<table id="'+dataKey+'"></table>';
    $(winID).html(listElement);
    AdminProduct.CarEsayUiProduct(dataKey,BasicUrl);
};
AdminProduct.CarEsayUiProduct = function(dataKey,BasicUrl){
    if($("#"+dataKey).html()){
        $.ProcessManager.run({
            url     : BasicUrl,
            key     : 'Product-editCarEsayUi',
            type    : 'GET',
            dataType:'html',
            success:function(data){
                $("#"+dataKey).html(data);
            }
        })
    }
}


/**
 * 产品行程信息 ZJL
 * @param row
 */
AdminProduct.productTripInfo = function(row){
    var winID = '#TripEsayUiList';
    var productID = row.product_id;
    var BasicUrl = '/Product-getProductTripList?trip_id='+productID;
    AdminWindow.init({
        title: '产品行程信息（Trip）',
        winID: winID,
        width: 1200,
        height:580
    });
    var dataKey = 'TripEsayUiList';
    AdminProduct.TripEsayUiProduct(dataKey,BasicUrl);
};
AdminProduct.TripEsayUiProduct = function(dataKey,BasicUrl){
    $("#"+dataKey).datagrid({
        url       : BasicUrl,
        idField   : 'travel_id',
        autoFocusField:'address',
        singleSelect        : true,
        autoEditing         : true,
        extEditing          : true,
        singleEditing       : true,
        autoBindDblClickRow : false,
        pagination:true,
        toolbar:'dataGrid-ToolBar-productOperation',
        frozenColumns: [[
            {field:'ck',checkbox:true},
            {field:'travel_id',title:'行程ID',width:50,sortable:true},
            {field:'day',title:'日期',width:220,sortable:true}
        ]],
        columns:[[
            {field:'address',title:'地址',width:100,sortable:true,editor:'text'},
            {field:'start_address',title:'出发地', width:100,sortable:true,editor:'text'},
            {field:'sort',title:'排序',width:40,sortable:true,editor:'text'},
            {field:'start_time',title:'开始时间',width:80,sortable:true,editor:'text'},
            {field:'day_number',title:'第几天',width:50,sortable:false,editor:'text'},
            {field:'start_addr_ch',title:'出发地（中文）',width:100,sortable:false,editor:'text'},
            {field:'start_addr_en',title:'出发地（英文）',width:120,sortable:false,editor:'text'},
            {field:'distance',title:'路程',width:158,sortable:false,editor:'text'},
//            {field:'house',title:'住宿',width:158,sortable:false,
//                editor:{
//                    type:'combobox',
//                    options:{
//                        valueField:'hotel_id',
//                        textField:'name',
//                        method:'get',
//                        url:'/Product-tripHotelList',
//                        required:true,
//                        multiple:true,
//                        formatter:function(value,row,index){
//                            var winID = '#TripEsayUiList';
//                            var productID = row.product_id;
//                            var BasicUrl = '/Product-getProductTripList?trip_id='+productID;
//                            AdminWindow.init({
//                                title: '产品行程信息（Trip）',
//                                winID: winID,
//                                width: 1200,
//                                height:580
//                            });
//                            var dataKey = 'TripEsayUiList';
//                            return valueField;
//                        }
//                    }
//                }
//            }
            {field:'walk_time',title:'步行时间',width:60,sortable:true,editor:'text'},
            {field:'action',title:'操作',width:40,sortable:true,
                formatter:function(value,row,index){
                    var s = '<a href="#" onclick="saverow('+index+')">酒店</a> ';
                    return s;
                }
//                formatter:function(value,row,index){
//                    if (row.editing){
//                        var s = '<a href="#" onclick="saverow('+index+')">保存</a> ';
//                        var c = '<a href="#" onclick="cancelrow('+index+')">取消</a>';
//                        return s+c;
//                    } else {
//                        var e = '<a href="#" onclick="editrow('+index+')">编辑</a> ';
//                        var d = '<a href="#" onclick="deleterow('+index+')">删除</a>';
//                        return e+d;
//                    }
//                }
            }
        ]],
        rowContextMenu: [{
            text: "编辑行程", iconCls: "icon-standard-building", handler: function (e, index, row) {
                var winID = "#data_form_TripEsayUi";
                AdminWindow.init({
                    title: '行程编辑（Edit）',
                    winID: winID,
                    width:1200,
                    height:580
                });
                var dataKey = 'data_form_TripEsayUi';
                var listElement = '<table id="'+dataKey+'"></table>';
                $(winID).html(listElement);
                //if($("#"+dataKey).html()){
                    $.ProcessManager.run({
                        url     : '/Product-tripEditInfo-trip_id-'+row.travel_id,
                        key     : 'Product-tripEditInfo',
                        dataType: "html",
                        type    : 'GET',
                        success :function(rs){
                            //$(winID).datagrid("loadData", rs);
                            $(winID).html(rs);
                        }
                    });
                //}
            }
        }],
        onEndEdit: function(index,row,changes){
            var dataPost = {};
            if(typeof changes.address != 'undefined'){
                dataPost.address = changes.address;
            }
            if(typeof changes.start_address != 'undefined'){
                dataPost.start_address = changes.start_address;
            }
            if(typeof changes.sort != 'undefined'){
                dataPost.sort = changes.sort;
            }
            if(typeof changes.start_time != 'undefined'){
                dataPost.start_time = changes.start_time;
            }
            if(typeof changes.day_number != 'undefined'){
                dataPost.day_number = changes.day_number;
            }
            if(typeof changes.start_addr_ch != 'undefined'){
                dataPost.start_addr_ch = changes.start_addr_ch;
            }
            if(typeof changes.start_addr_en != 'undefined'){
                dataPost.start_addr_en = changes.start_addr_en;
            }
            if(typeof changes.distance != 'undefined'){
                dataPost.distance = changes.distance;
            }
            if(typeof changes.walk_time != 'undefined'){
                dataPost.walk_time = changes.walk_time;
            }
            if(typeof dataPost.address == 'undefined' && typeof dataPost.start_address == 'undefined'
                && typeof dataPost.sort == 'undefined' && typeof dataPost.start_time == 'undefined'
                && typeof dataPost.day_number == 'undefined' && typeof dataPost.start_addr_ch == 'undefined'
                && typeof dataPost.walk_time == 'undefined' && typeof dataPost.distance == 'undefined'
                && typeof dataPost.start_addr_en == 'undefined'
                ){
                return false;
            }
            dataPost.travel_id = row.travel_id;
            $.ProcessManager.run({
                url: "/Product-tripRow",
                key: "Product-tripRow",
                data: dataPost,
                success: function(data) {
                    if(data.status_code == RESPONSE_SUCCESS){
                        $.messager.alert(data.status_message);
                    }else{
                        $.messager.alert(data.status_message);
                    }
                }
            });
            return true;
        }
    });
}

/**
 * 产品行前准备信息 ZJL
 * @param row
 */
AdminProduct.productBeforeInfo = function(row){
    var winID = '#data_form_BeforeEsayUi';
    var productID = row.product_id;
    var BasicUrl = '/Product-editBeforeEsayUi-product_id-'+productID;
    AdminWindow.init({
        title       : '产品行前准备信息（Before）',
        winID       : winID,
        width       : 1000,
        height      : 560
    });
    var dataKey = "data_form_BeforeEsayUi";
    var listElement = '<table id="'+dataKey+'"></table>';
    $(winID).html(listElement);
    AdminProduct.BeforeEsayUiProduct(dataKey,BasicUrl);
};
AdminProduct.BeforeEsayUiProduct = function(dataKey,BasicUrl){
    if($("#"+dataKey).html()){
        $.ProcessManager.run({
            url     : BasicUrl,
            key     : 'Product-editBasicEsayUi',
            type    : 'GET',
            dataType:'html',
            success:function(data){
                $("#"+dataKey).html(data);
            }
        })
    }
}


/**
 * 产品价格信息 ZJL
 * @param row
 */
AdminProduct.productPriceInfo = function(row){
    var winID = '#data_form_PriceEsayUi';
    var productID = row.product_id;
    var BasicUrl = '/Product-editProductPrice-product_id-'+productID;
    //var BasicUrl = '/Product-editPriceEsayUi-product_id-'+productID;
    AdminWindow.init({
        title       : '产品价格信息（Price）',
        winID       : winID,
        width       : 1000,
        height      : 580
    });
    var dataKey = "data_form_PriceEsayUi";
    AdminProduct.PriceEsayUiProduct(dataKey,BasicUrl);
};
AdminProduct.PriceEsayUiProduct = function(dataKey,BasicUrl){
    $("#"+dataKey).datagrid({
        url       : BasicUrl,
        idField   : 'travel_id',
        autoFocusField:'address',
        singleSelect        : true,
        autoEditing         : true,
        extEditing          : true,
        singleEditing       : true,
        autoBindDblClickRow : false,
        pagination:true,
        frozenColumns: [[
            {field:'ck',checkbox:true},
            {field:'product_id',title:'产品ID',width:100,sortable:true},
            {field:'sku_name',title:'子产品名称',width:180,sortable:true}
        ]],
        columns:[[
            {field:'sku_descript',title:'描述',width:200,sortable:true,editor:'text'},
            {field:'sku_code',title:'产品子CODE', width:100,sortable:true,editor:'text'},
            {field:'adult_price',title:'成人价格',width:80,sortable:true,editor:'text'},
            {field:'youth_price',title:'小孩价格',width:80,sortable:true,editor:'text'},
            {field:'infant_price',title:'婴儿价格',width:80,sortable:false,editor:'text'},
            {field:'action',title:'操作',width:100,sortable:true,
                formatter:function(value,row,index){
                    var s = '<a href="#" onclick="saverow('+index+')">酒店</a> ';
                    return s;
                }
            }
        ]],
        rowContextMenu: [{
            text: "编辑行程", iconCls: "icon-standard-building", handler: function (e, index, row) {
                var winID = "#data_form_TripEsayUi";
                AdminWindow.init({
                    title: '行程编辑（Edit）',
                    winID: winID,
                    width:1200,
                    height:580
                });
                var dataKey = 'data_form_TripEsayUi';
                var listElement = '<table id="'+dataKey+'"></table>';
                $(winID).html(listElement);
                //if($("#"+dataKey).html()){
                $.ProcessManager.run({
                    url     : '/Product-tripEditInfo-trip_id-'+row.travel_id,
                    key     : 'Product-tripEditInfo',
                    dataType: "html",
                    type    : 'GET',
                    success :function(rs){
                        //$(winID).datagrid("loadData", rs);
                        $(winID).html(rs);
                    }
                });
                //}
            }
        }]
    });
}

/**
 * 产品子产品信息 ZJL
 * @param row
 */
AdminProduct.productSonInfo = function(row){
    var winID = '#data_form_SonEsayUi';
    var productID = row.product_id;
    var BasicUrl = '/Product-getSonInfoList-skuId-'+productID;
    AdminWindow.init({
        title       : '产品子产品信息（Sub Product）',
        winID       : winID,
        width       : 1200,
        height      : 600
    });
    var dataKey = "data_form_SonEsayUi";
    var listElement = '<table id="'+dataKey+'"></table>';
    $(winID).html(listElement);
    AdminProduct.SonEsayUiProduct(dataKey,BasicUrl);
};
AdminProduct.SonEsayUiProduct = function(dataKey,BasicUrl){
    if($("#"+dataKey).html()){
        $.ProcessManager.run({
            url     : BasicUrl,
            key     : 'Product-getSonInfo',
            type    : 'GET',
            dataType:'html',
            success:function(data){
                $("#"+dataKey).html(data);
            }
        })
    }
}

/**
 * 产品图片信息 ZJL
 * @param row
 */
AdminProduct.productImgInfo = function(row){
    var winID = '#data_form_ImgEsayUi';
    var productID = row.product_id;
    var BasicUrl = '/Product-productEsayUiImg-product_id-'+productID;
    AdminWindow.init({
        title       : '产品图片信息（Photo）',
        winID       : winID,
        width       : 950,
        height      : 600
    });
    var dataKey = "data_form_ImgEsayUi";
    var listElement = '<table id="'+dataKey+'"></table>';
    $(winID).html(listElement);
    AdminProduct.ImgEsayUiProduct(dataKey,BasicUrl);
};
AdminProduct.ImgEsayUiProduct = function(dataKey,BasicUrl){
    if($("#"+dataKey).html()){
        $.ProcessManager.run({
            url     : BasicUrl,
            key     : 'Product-productEsayUiImg',
            type    : 'GET',
            dataType:'html',
            pagination:true,
            success:function(data){
                $("#"+dataKey).html(data);
            }
        })
    }
}

/**
 * 添加产品信息 ZJL
 * @param row
 */
AdminProduct.productAddInfo = function(row){
    var winID = '#data_form_AddEsayUi';
    var productID = row.product_id;
    var BasicUrl = '/Product-editBasicEsayUi-product_id-'+productID;
    AdminWindow.init({
        title       : '添加产品基本信息（Basic）',
        winID       : winID,
        width       : 1200,
        height      : 600
    });
    var dataKey = "data_form_AddEsayUi";
    var listElement = '<table id="'+dataKey+'"></table>';
    $(winID).html(listElement);
    AdminProduct.AddEsayUiProduct(dataKey,BasicUrl);
};
AdminProduct.AddEsayUiProduct = function(dataKey,BasicUrl){
    if($("#"+dataKey).html()){
        $.ProcessManager.run({
            url     : BasicUrl,
            key     : 'Product-editBasicEsayUi',
            type    : 'GET',
            dataType:'html',
            success:function(data){
                $("#"+dataKey).html(data);
            }
        })
    }
}


/**
 * 添加产品基本信息 ZJL
 * @param row
 */
AdminProduct.productBasicInfoAdd = function(row){
    var winID = '#data_form_BasicEsayUi';
    var BasicUrl = '/Product-editBasicEsayUi';
    AdminWindow.init({
        title       : '添加产品基本信息（Basic）',
        winID       : winID,
        width       : 1200,
        height      : 600
    });
    var dataKey = "data_form_BasicEsayUi";
    var listElement = '<table id="'+dataKey+'"></table>';
    $(winID).html(listElement);
    AdminProduct.BasicEsayUiProduct(dataKey,BasicUrl);
};
AdminProduct.BasicEsayUiProduct = function(dataKey,BasicUrl){
    if($("#"+dataKey).html()){
        $.ProcessManager.run({
            url     : BasicUrl,
            key     : 'Product-editBasicEsayUi',
            type    : 'GET',
            dataType:'html',
            success:function(data){
                $("#"+dataKey).html(data);
            }
        })
    }
}

/**
 * 行程列表工具栏
 * @param toolbarID
 */
AdminProduct.toolBarListOperation = function(toolbarID){
    var toolbarObj = $("#"+toolbarID);
    var productListObj = $("#Product-productList");
    var dataPost = {};
    dataPost.product_type_2 = toolbarObj.find("input[name='product_type_2']").val();
    dataPost.status = toolbarObj.find("input[name='status']").val();
    dataPost.keywords = toolbarObj.find("input[name='keywords']").val();
    dataPost.product_code = toolbarObj.find("input[name='product_code']").val();
    dataPost.product_subcode = toolbarObj.find("input[name='product_subcode']").val();
    productListObj.datagrid({
        'queryParams': dataPost
    });
};
