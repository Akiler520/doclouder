var AdminDataGrid = {};

AdminDataGrid.init = function(dataKey)
{
    if(dataKey.indexOf("Folder-getList") >= 0){
        AdminFolder.getList(dataKey);
        return;
    }

    if(dataKey.indexOf("Menu-setting") >= 0){
        AdminMenu.setting(dataKey);
        return;
    }

    switch (dataKey){
        case "Order-orderList":
            AdminOrder.listID = "#"+dataKey;
            AdminOrder.getList(dataKey);
            break;
        case "Order-statistic":
//            AdminOrder.listID = "#"+dataKey;
            AdminOrder.getStatisticList(dataKey);
            break;
        case "Product-productList":
            AdminProduct.getProductList(dataKey);
            break;
        default :
            break;
    }
};

AdminDataGrid.refresh = function(dataKey){
    if(dataKey.indexOf("Folder-getList") >= 0){
        $('#'+dataKey).datagrid('reload');
    }

    if(dataKey.indexOf("Menu-setting") >= 0){
        $('#'+dataKey).treegrid('reload');
    }
}

/**
 * 保存行编辑事件
 *
 * @author
 * @param index
 * @param t
 * @param opts
 */
AdminDataGrid.onSaveRowEdit = function(index,t,opts){
    var listID = t[0].id;
    var rowObj = t.datagrid('getRows')[index];
    switch(listID){
        case "Order-orderList": // order list
            var edStatus = t.datagrid('getEditor', {index:index,field:'status'});
            var edStatusProcess = t.datagrid('getEditor', {index:index,field:'status_process'});
            rowObj['status_text'] = $(edStatus.target).combobox('getText');
            rowObj['status_process_text'] = $(edStatusProcess.target).combobox('getText');
            break;

        case "Product-productList": // product list
            //var ProductName = t.datagrid('getEditor', {index:index,field:'product_name'});
            var ProductType = t.datagrid('getEditor', {index:index,field:'product_type_2'});
            var ProductKey = t.datagrid('getEditor',{index:index,field:'status'});
            rowObj['product_type_2_text'] = $(ProductType.target).combobox('getText');
            rowObj['status_productList_text'] = $(ProductKey.target).combobox('getText');
            break;

        case "Order-getOrderProduct_list": // order_product list
            var orderStatus = t.datagrid('getEditor', {index:index,field:'booking_status'});
            rowObj['booking_status_text'] = $(orderStatus.target).combobox('getText');
            break;

//        case "Product-productList": // product list
//            var ProductName = t.datagrid('getEditor', {index:index,field:'product_name'});
//            var ProductType = t.datagrid('getEditor', {index:index,field:'product_type_2'});
//            rowObj['status_Product_text'] = $(ProductType.target).combobox('getText');
//            break;

        default :
            break;
    }
};

AdminDataGrid.emptyView = $.extend({},$.fn.datagrid.defaults.view,{
    onAfterRender:function(target){
        $.fn.datagrid.defaults.view.onAfterRender.call(this,target);

        var opts = $(target).datagrid('options');
        var vc = $(target).datagrid('getPanel').children('div.datagrid-view');

        vc.children('div.datagrid-empty').remove();

        if (!$(target).datagrid('getRows').length){
            var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
            d.css({
                position:'absolute',
                left:0,
                top:50,
                width:'100%',
                textAlign:'center'
            });
        }
    }
});

var AdminDataGridToolBar = {};
AdminDataGridToolBar.create = function(toolbarID)
{
    if(toolbarID.indexOf("Folder-getList") >= 0){
        AdminFolder.toolBarListCreate(toolbarID);
    }

    switch (toolbarID){
        case "dataGrid-ToolBar-orderList":
            AdminOrder.toolBarListCreate(toolbarID);
            break;
        case "dataGrid-ToolBar-orderStatistic":
            AdminOrder.toolBarStatisticCreate(toolbarID);
            break;
        case "dataGrid-ToolBar-productList":
            AdminProduct.toolBarListCreate(toolbarID);
            break;
        case "dataGrid-ToolBar-productOperation"://操作菜单工具栏
            AdminProduct.toolBarListOperation(toolbarID);
            break;
        default :
            break;
    }

    return true;
};

AdminDataGridToolBar.search = function(toolbarID)
{
    switch (toolbarID){
        case "dataGrid-ToolBar-orderList":
            AdminOrder.toolBarListAction(toolbarID);
            break;
        case "dataGrid-ToolBar-orderStatistic":
            AdminOrder.toolBarStatisticAction(toolbarID);
            break;
        case "dataGrid-ToolBar-productList":
            AdminProduct.toolBarListAction(toolbarID);
            break;
        default :
            break;
    }

    return true;
};

