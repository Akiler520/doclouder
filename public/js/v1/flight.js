$(function() {

	//动态获取input对象
	var $thisKeyword = null;
	var reKeyword = function(){
		$(".keyword").focusin(function(){
			$(this).off("keyup").on("keyup",function(){
				$thisKeyword = $(this);
			});
		});
	};reKeyword();
	
   //此处为动态查询数据例子  （返回Json）
	 $(".keyword").autocomplete("http://local.7doufeng.com/Flight-locationAutosuggest", {
				minChars: 1,    //自动完成激活之前填入的最小字符
				max:20, 
				width: 400,
				matchCase:true,//不区分大小写
				matchContains :true,//比较时是否要在字符串内部查看匹配
				cacheLength : 1000, //缓存条数
				autoComplete : true,//服务器缓存
				autoFill: false,
				dataType: 'json',    
				scrollHeight: 500,
			   //此处为传递参数
				extraParams:{q:function() {
						return $thisKeyword.val();
				}},
			  //需要把data转换成json数据格式                      
				parse: function(data) {
					
				   if(data == null){
						//返回结果为空时
						//console.log("没查到");
				   }
				   for(var x = 0 in data) {
					   return $.map(data[x], function(row) {
								
						   return {
							data: row,
							value: row,
							result: row
						  }
						});
				   }
				   
		 },
		/**
		*	为每个要显示的项目使用高级标签.即对结果中的每一行都会调用这个函数,返回值将用LI元素包含显示在
		*	下拉列表中. Autocompleter会提供三个参数(row, i, max): 返回的结果数组, 当前处理的行数(即第几个
		*	项目,是从1开始的自然数), 当前结果数组元素的个数即项目的个数. Default: none, 表示不指定自定义的
		*	处理函数,这样下拉列表中的每一行只包含一个值.
		*/
		formatItem: function(data, i, total) { 
			var placeId = data.PlaceId.split('-');

			return  placeId[0]+" "+data.PlaceName; 
		   
		},
		/**
		*	对每一行数据使用此函数格式化需要查询的数据格式. 返回值是给内部搜索算法使用的. 参数值row
		*/
		formatMatch: function(data, i, total) {
			return data;
		},
		/**
		*	和formatItem类似,但可以将将要输入到input文本框内的值进行格式化.同样有三个参数,和formatItem一样.Default: none,表示要么是只有数据,要么是使用formatItem提供的值.
		*/
		formatResult: function(data, value) { 
			return data;
		}
		}).result(function(event, data, formatted) { //回调
			var placeId = data.PlaceId.split('-');
			$thisKeyword.val(data.PlaceName);
	});
});  