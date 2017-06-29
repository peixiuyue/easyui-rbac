$(function() {
	var dg = $("#member_dg");
	var searcherTpl = $("#member_searcher_tpl");

	// 使用edatagrid，需要而外导入edatagrid扩展
	dg.edatagrid({
		url : '/system/member/list',
		saveUrl : '/system/member/save',
		updateUrl : '/system/member/update',
		destroyUrl : '/system/member/delete',
		emptyMsg : "还未创建用户",
		idField : "id",
		fit : true,
		rownumbers : true,
		fitColumns : true,
		border : false,
		pagination : true,
		pageSize : 30,
		columns : [ [ {
			field : 'userName',
			title : '用户名',
			width : 50,
			editor : {
				type : 'validatebox',
				options : {
					required : true,
					validType : 'userName'
				}
			}
		}, {
			field : 'password',
			title : '密码',
			width : 50,
			editor : {
				type : 'validatebox',
				options : {
					required : true,
					length : [ 6, 10 ],
				}
			},
			formatter : function(val, row) {
				return "********";
			}
		}, {
			field : 'status',
			title : '状态',
			width : 50,
			editor : {
				type : 'checkbox',
				options : {
					on : true,
					off : false
				}
			},
			formatter : function(val, row) {
				return val ? "可用" : "禁用";
			}
		} ] ],
		toolbar : authToolBar({
			"member-create" : {
				iconCls : 'fa fa-plus-square',
				text : "创建用户",
				handler : function() {
					dg.edatagrid('addRow');
				}
			},
			"member-delete" : {
				iconCls : 'fa fa-trash',
				text : "删除用户",
				handler : function() {
					dg.edatagrid('destroyRow');
				}
			},
			"member-save" : {
				iconCls : 'fa fa-save',
				text : "保存编辑",
				handler : function() {
					dg.edatagrid('saveRow');
				}
			},
			"member-cancel" : {
				iconCls : 'fa fa-mail-reply',
				text : "取消编辑",
				handler : function() {
					dg.edatagrid('cancelRow');
				}
			},
			"member-reolad" : {
				iconCls : 'fa fa-refresh',
				text : "刷新",
				handler : function() {
					dg.edatagrid('reload');
				}
			}
		}),
		onError : function(index, data) {
			// 操作请求发送错误
			console.error(data);
		}
	});

	var toolbar = dg.datagrid("getPanel").find('.datagrid-toolbar');

	toolbar.prepend(searcherTpl.html());

	$("#member_searcher").searchbox({
		searcher : function(value, name) {
			if (value) {
				dg.datagrid("load", {
					userName : value
				})
			} else {
				dg.datagrid("load", {})
			}
		},
		prompt : '请输入用户名'
	});
});