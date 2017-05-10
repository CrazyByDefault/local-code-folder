var keys=getKeys();

$(document).ready(function(){$("#login").click(function(){
		return loginFunction();
	});

	$("#uid, #pswrd").keyup(function(A){if(A.keyCode==13){
		return loginFunction();
	}});
});

function onLoginButtonClicked(){
	$.jCryption.encrypt($.trim($("#uid").val()),keys,function(A){
		$("#loginId").val(A);
		$.jCryption.encrypt($("#pswrd").val(),keys,function(B){
			$("#pswrd").val(B);
			$("#loginForm").submit();
		});
	});
}

function loginFunction(){
	addBtnDisabled("loginBtn","loginBton");
	if($.trim($("#uid").val())==""){
		showErrorById("uid","Please enter user name");
		removeBtnDisabled("loginBtn","loginBton");
		return false;
	}if($.trim($("#pswrd").val())==""){
		showErrorById("pswrd","Please enter password");
		removeBtnDisabled("loginBtn","loginBton");
		return false;
	}

	return onLoginButtonClicked();
}

function loadApplicationByApplicationId(A){
	callAjaxByObj({
		"url":"/partyReg/isAdvOpenedByApplicationId?applicationId="+A,
		"type":"POST",
		"data":{},
		"resp":afterLoadAppl(),
		"error":afterLoadApplError()
	});
}

function afterLoadAppl(){
	return function(A){
		if(A.applStatus>0){
			$("#register").show();
		}
		else{
			$("#register").hide();
		}
		if(A.advStatus==0){
			$("#applClosedMsg").show();
		}
		else{
			$("#loginMain").show();
			$("#applClosedMsg").remove();
		}
		$("#looadLoginImg").closest("div").remove();
	};
}

function afterLoadApplError(){
	return function(A){
		$("#looadLoginImg").hide();
	};
}