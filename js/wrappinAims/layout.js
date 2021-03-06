var glairInd = false;
var innerGlairInd = false;
var popupInd = false;
var innerPopupInd = false;
var cPop = 0;
var d_optArray = new Array();
var popsArray = new Array();
var currGlair = 0;
var glairsObject = new Array();
var isHelpPopupOpen = false;
window.gAppPrevFocus = $();
$(function() {
    focusOnFirstField();
    $(document).click(function(B) {
        var A = $(B.target);
        if (gAppPrevFocus.length != 0) {
            if (!gAppPrevFocus.is(":focus")) {
                gAppPrevFocus = [];
                return true;
            }
            if (A.prop("tagName") != "DIV" && A.prop("tagName") != "LABEL") {
                return true;
            }
        }
        if (!A.parents("div").hasClass("role_tab_div")) {
            $(".role_tab_div").removeClass("open");
            $(".role_tab_div .bottomFtrArr").removeClass("showMenu");
            $(".role_tab_div .bottomFtrArr").addClass("hideMenu");
        }
        if (!A.parents("div").hasClass("loc_tab_div")) {
            $(".loc_tab_div").removeClass("open");
            $(".loc_tab_div .bottomFtrArr").removeClass("showMenu");
            $(".loc_tab_div .bottomFtrArr").addClass("hideMenu");
        }
        if (!((A.parents("div").hasClass("mnHdrDiv") || A.hasClass("mnHdrDiv")) || (A.parents("div").hasClass("menuMainDiv") || A.hasClass("menuMainDiv")))) {
            $(".menuItem.selected > .childDiv.show").removeClass("show").hide();
            $("#menuId").hide();
            $("span#menuImg").addClass("hideMenu");
            $("span#menuImg").removeClass("showMenu");
        }
        if (!A.hasClass("ddPopup") && !A.parents().hasClass("ddPopup") && !A.hasClass("item-smry-link") && !A.parents().hasClass("item-smry-link") && !A.hasClass("txtValue") && !A.parents().hasClass("drop_b_line") && !A.parents().hasClass("nt-cls") && !A.parents().hasClass("tagging-dialog_popup") && !A.parents().hasClass("jSuggestContainer")) {
            setTimeout(function() {
                closePopup2(false, A);
            }, 100);
        }
    });
    $(document).on("focusin", ":input", function() {
        window.gAppPrevFocus = $(this);
    });
    $(document).keyup(function(A) {
        if (isHelpPopupOpen && !$("#popupPageCombo").is(":focus") && !$(".comboSrchBy").is(":focus") && !$(".helpSrchOperator").is(":focus") && !$(".comboOrderBy").is(":focus") && !$(".popComboOrder").is(":focus")) {
            if (A.keyCode + "" == popupCloseKeycode) {
                closeComboHelpPopup();
                $("#" + mainFieldId).focus();
            } else {
                if (A.keyCode == 40) {
                    doHelpDownKeyFunctionality();
                } else {
                    if (A.keyCode == 38) {
                        doHelpUpKeyFunctionality();
                    } else {
                        if (A.keyCode == 13) {
                            if ($("li.comboItem.helpLi.validate.selected").length == 1) {
                                onComboValueSelected($("li.comboItem.helpLi.validate.selected"));
                            }
                        }
                    }
                }
            }
        }
    });
    $(document).on("keydown", ".flexTxt", function(A) {
        if ($(this).is(":focus")) {
            $(this).select();
            $(this).attr("readOnly", "readOnly");
        }
    });
    $(document).on("keyup", ".flexTxt", function(A) {
        if (A.keyCode == 13) {
            $(this).siblings(".flexHlp").click();
            $(this).focusout();
        }
    });
    jQuery.extend(jQuery.fn, {
        years: function(C, A) {
            $(this).append($('<option value="' + appDefaultDropDownVal + '">-- Select--</option>'));
            for (var B = C; B <= A; B++) {
                $(this).append($("<option />").val(B).html(B));
            }
        }
    });
    $(".col").append("&nbsp;");
    $(document).on("click", ".closeIcon.banner", function() {
        gCloseBanner();
    });
    $(document).on("click", ".createNewFlex", function() {
        window.open(basePath + "/fiBase/addFIChartOfAcc");
    });
});

function noBack() {
    window.history.forward();
}

function initializePlaceHolder() {
    $(".row").each(function() {
        if ($(this).children("span.spnlbl").length == 0) {
            var E = $(this).children(".fld").attr("id");
            var D = $(this).children(".fld");
            var F = $(document.createElement("span"));
            F.text(D.attr("text"));
            F.attr("id", "spn_" + E);
            if (D.val() == "") {
                F.attr("class", "spnlbl");
            } else {
                F.attr("class", "spnlbl entr");
            }
            $(this).prepend(F);
        }
    });
    $(".spnlbl").click(function() {
        var B = $(this).attr("id");
        B = B.substr(4);
        $("#" + B).focus();
    });
    $(".fld").focus(function() {
        var B = $(this).attr("id");
        $("#spn_" + B).addClass("focus");
    }).blur(function() {
        var B = $(this).attr("id");
        $("#spn_" + B).removeClass("focus");
    }).keyup(function() {
        var D = $(this).attr("id");
        var C = $.trim($(this).val());
        if (C == "") {
            $("#spn_" + D).removeClass("entr");
        } else {
            $("#spn_" + D).addClass("entr");
        }
    });
}

function htmlenCode(F) {
    var E = F;
    var D = [
        [/&/g, "&amp;"],
        [/</g, "&lt;"],
        [/>/g, "&gt;"],
        [/"/g, "&quot;"]
    ];
    for (var G in D) {
        E = E.replace(D[G][0], D[G][1]);
    }
    return E;
}

function showGlair() {
    if (!glairInd) {
        $("#glair").height($(document).height());
        $("#glair").addClass("glair");
    }
}

function hideGlair() {
    if (!glairInd) {
        $("#glair").removeClass("glair");
    }
}

function showInnerGlair() {
    if (!innerGlairInd) {
        $("#innerGlair").height($(document).height());
        $("#innerGlair").addClass("innerGlair");
    }
}

function hideInnerGlair() {
    if (!innerGlairInd) {
        $("#innerGlair").removeClass("innerGlair");
    }
}

function openPopup(F) {
    var G = F.html;
    var E = (typeof F.width == "undefined") ? 400 : F.width;
    E = parseInt(E, 10);
    var H = (typeof F.closeInd == "undefined") ? true : F.closeInd;
    var B = "";
    if (typeof popUpMaxHgt != "undefined") {
        B = "max-height:" + popUpMaxHgt + "px; overflow-y:scroll; overflow-x:hidden;";
    }
    var D = "";
    D += '<div class="errPopupDiv gAppBannerDiv" style="width:' + (E + 10) + 'px;">';
    D += '	<span class="closeIcon banner"></span>';
    D += '	<span class="errPopupImg"></span><span id="errPopupTxt"></span>';
    D += "</div>";
    D += '<div class="warnPopupDiv gAppBannerDiv" style="width:' + (E + 10) + 'px;">';
    D += '	<span class="closeIcon banner"></span>';
    D += '	<span class="warnPopupImg"></span><span id="warnPopupTxt"></span>';
    D += "</div>";
    D += '<div class="successPopupDiv gAppBannerDiv" style="width:' + (E + 10) + 'px;">';
    D += '	<span class="closeIcon banner"></span>';
    D += '	<span class="successPopupImg"></span><span id="successPopupTxt"></span>';
    D += "</div>";
    if (H) {
        $("#popUp").html("<span class='popupCloseIcon'></span>");
        $("#popUp").append(D);
    } else {
        $("#popUp").html(D);
    }
    $("#popUp").append('<div style="padding-top:2px;float:left;width:' + E + "px;" + B + '">' + G + "</div>");
    var A = $(document).width();
    var C = $("#popUp").width();
    $("#popUp").css({
        "left": (A / 2 - C / 2) + "px"
    }).fadeIn();
    popupInd = true;
    showGlair();
    $(".popupCloseIcon").click(function() {
        if (typeof F.closeMethod != "undefined") {
            F.closeMethod();
        } else {
            closePopup();
        }
    });
    if (typeof F.onReadyMethod != "undefined") {
        F.onReadyMethod();
    }
}

function openPopupForm(E) {
    var G = E.ok;
    var F = (typeof E.width == "undefined") ? 400 : E.width;
    F = parseInt(F, 10);
    var J = E.cancel || "closePopup()";
    var A = E.formStr;
    var D = "";
    var H = (typeof E.closeInd == "undefined") ? true : E.closeInd;
    if (typeof popUpMaxHgt != "undefined") {
        D = "max-height:" + popUpMaxHgt + "px; overflow-y:scroll; overflow-x:hidden;";
    }
    var C = '<div style="float:left;width:' + F + "px;padding-top:4px;" + D + '">';
    C += '<form style="border:none;"id="popupForm" name="popupForm">' + A + "</form>";
    C += '</div><div style="margin-top: 10px;text-align: center;">';
    C += '<input type="button" style="width:60px;" id="confirmOk" value="OK" class="btn"/>';
    C += '<input type="button" id="confirmCancel" style="margin-top:15px;margin-left:25px;width:70px;" value="Cancel" class="red btn"/></div>';
    if (H) {
        $("#popUp").html("<span class='popupCloseIcon'></span>");
        $("#popUp").append(C);
    } else {
        $("#popUp").html(C);
    }
    var I = $(document).width();
    var B = $("#popUp").width();
    $("#popUp").css({
        "left": (I / 2 - B / 2) + "px"
    }).fadeIn();
    popupInd = true;
    showGlair();
    $("#confirmOk").click(function() {
        popupInd = false;
        G($("#popupForm").serializeArray());
    });
    $("#confirmCancel").click(function() {
        popupInd = false;
        J($("#popupForm").serializeArray());
    });
    $(".popupCloseIcon").click(function() {
        popupInd = false;
        $("#confirmCancel").click();
    });
}

function openPopupGetPage(obj) {
    var url = obj.url;
    var popUpWidth = (typeof obj.width == "undefined") ? 800 : obj.width;
    popUpWidth = parseInt(popUpWidth, 10);
    var popUpMaxHgt = obj.maxHeight;
    var maxHgtStr = "";
    var closeInd = (typeof obj.closeInd == "undefined") ? true : obj.closeInd;
    var popupId = "#popUp";
    var popupDivId = "popUpDiv";
    var popupCloseIcon = "popupCloseIcon";
    var innerPopupInd1 = popupInd;
    if (innerPopupInd1) {
        popupId = "#innerPopUp";
        popupDivId = "innerPopUpDiv";
        popupCloseIcon = "innerPopupCloseIcon";
        $("#popUp").append('<div id="innerPopUp" class="innerPopUp"></div><div id="innerGlair"></div>');
    }
    if (typeof popUpMaxHgt != "undefined") {
        maxHgtStr = "max-height:" + popUpMaxHgt + "px; overflow-y:auto; overflow-x:hidden;";
    }
    var htmlStr = "";
    htmlStr += '<div class="errPopupDiv gAppBannerDiv" style="width:' + (popUpWidth + 10) + 'px;">';
    htmlStr += '	<span class="closeIcon banner"></span>';
    htmlStr += '	<span class="errPopupImg"></span><span id="errPopupTxt"></span>';
    htmlStr += "</div>";
    htmlStr += '<div class="warnPopupDiv gAppBannerDiv" style="width:' + (popUpWidth + 10) + 'px;">';
    htmlStr += '	<span class="closeIcon banner"></span>';
    htmlStr += '	<span class="warnPopupImg"></span><span id="warnPopupTxt"></span>';
    htmlStr += "</div>";
    htmlStr += '<div class="successPopupDiv gAppBannerDiv" style="width:' + (popUpWidth + 10) + 'px;">';
    htmlStr += '	<span class="closeIcon banner"></span>';
    htmlStr += '	<span class="successPopupImg"></span><span id="successPopupTxt"></span>';
    htmlStr += "</div>";
    htmlStr += '<div style="padding-top:2px;float:left;width:' + popUpWidth + "px;" + maxHgtStr + '" id="' + popupDivId + '" >';
    htmlStr += '	<div style="text-align: center;">';
    htmlStr += '		<img src="' + versionPath + '/images/loading_image_big.gif"></img>';
    htmlStr += "	</div>";
    htmlStr += "</div>";
    if (closeInd) {
        $(popupId).html("<span class='" + popupCloseIcon + "'></span>");
        $(popupId).append(htmlStr);
    } else {
        $(popupId).html(htmlStr);
    }
    var documentWidth = $(document).width();
    var popUpWidth = $(popupId).width();
    if (innerPopupInd1) {
        popUpWidth = $("#innerPopUp").width();
    }
    $(popupId).css({
        "left": (documentWidth / 2 - popUpWidth / 2 - 8) + "px"
    }).fadeIn();
    if (innerPopupInd1) {
        innerPopupInd = true;
        showInnerGlair();
    } else {
        showGlair();
    }
    popupInd = true;
    $("." + popupCloseIcon).click(function() {
        if (typeof obj.closeMethod != "undefined") {
            if (typeof obj.closeMethod == "string") {
                eval(obj.closeMethod + "();");
            } else {
                obj.closeMethod();
            }
        } else {
            closePopup();
        }
    });
    loadViewInDiv({
        "selector": "#" + popupDivId,
        "url": url,
        "resp": afterOpenPopupGetPage(innerPopupInd1, popupId, popupCloseIcon, obj),
        "error": afterOpenPopupGetPageErr(obj)
    });
}

function afterOpenPopupGetPage(C, B, A, D) {
    return function(F) {
        var E = $(document).width();
        var G = $(B).width();
        if (C) {
            G = $("#innerPopUp").width();
        }
        $(B).css({
            "left": (E / 2 - G / 2 - 8) + "px"
        });
    };
}

function afterOpenPopupGetPageErr(object) {
    return function(response) {
        if (typeof object == "string") {
            object = JSON.parse(object);
        }
        if (typeof object.errorMethod != "undefined") {
            closePopup();
            if (typeof object.errorMethod == "string") {
                eval(object.errorMethod + "();");
            } else {
                object.errorMethod();
            }
        } else {
            closePopup();
        }
    };
}

function openPopupPage(obj) {
    var url = obj.url;
    var popUpWidth = (typeof obj.width == "undefined") ? 800 : obj.width;
    popUpWidth = parseInt(popUpWidth, 10);
    var object = obj.object || {};
    var popUpMaxHgt = obj.maxHeight;
    var closeInd = (typeof obj.closeInd == "undefined") ? true : obj.closeInd;
    var maxHgtStr = "";
    var popupId = "#popUp";
    var popupDivId = "popUpDiv";
    var popupCloseIcon = "popupCloseIcon";
    var innerPopupInd1 = popupInd;
    if (innerPopupInd1) {
        popupId = "#innerPopUp";
        popupDivId = "innerPopUpDiv";
        popupCloseIcon = "innerPopupCloseIcon";
        $("#popUp").append('<div id="innerPopUp" class="innerPopUp"></div><div id="innerGlair"></div>');
    }
    if (typeof popUpMaxHgt != "undefined") {
        maxHgtStr = "max-height:" + popUpMaxHgt + "px; overflow-y:auto; overflow-x:hidden;";
    }
    var htmlStr = "";
    if (closeInd) {
        htmlStr += '<span class="' + popupCloseIcon + '"></span>';
    }
    htmlStr += '<div class="errPopupDiv gAppBannerDiv" style="width:' + (popUpWidth + 10) + 'px;">';
    htmlStr += '	<span class="closeIcon banner"></span>';
    htmlStr += '	<span class="errPopupImg"></span><span id="errPopupTxt"></span>';
    htmlStr += "</div>";
    htmlStr += '<div class="warnPopupDiv gAppBannerDiv" style="width:' + (popUpWidth + 10) + 'px;">';
    htmlStr += '	<span class="closeIcon banner"></span>';
    htmlStr += '	<span class="warnPopupImg"></span><span id="warnPopupTxt"></span>';
    htmlStr += "</div>";
    htmlStr += '<div class="successPopupDiv gAppBannerDiv" style="width:' + (popUpWidth + 10) + 'px;">';
    htmlStr += '	<span class="closeIcon banner"></span>';
    htmlStr += '	<span class="successPopupImg"></span><span id="successPopupTxt"></span>';
    htmlStr += "</div>";
    htmlStr += '<div style="padding-top:2px;float:left;width:' + popUpWidth + "px;" + maxHgtStr + '" id="' + popupDivId + '" >';
    htmlStr += '	<div style="text-align: center;">';
    htmlStr += '		<img src="' + versionPath + '/images/loading_image_big.gif"></img>';
    htmlStr += "	</div>";
    htmlStr += "</div>";
    $(popupId).html(htmlStr);
    var documentWidth = $(document).width();
    var popUpWidth = $(popupId).width();
    $(popupId).css({
        "left": (documentWidth / 2 - popUpWidth / 2 - 8) + "px"
    }).fadeIn();
    if (innerPopupInd1) {
        innerPopupInd = true;
        showInnerGlair();
    } else {
        showGlair();
    }
    popupInd = true;
    $("." + popupCloseIcon).click(function() {
        if (typeof object.closeMethod != "undefined") {
            if (typeof object.closeMethod == "string") {
                eval(object.closeMethod + "();");
            } else {
                object.closeMethod();
            }
        } else {
            closePopup();
        }
    });
    loadViewInDiv({
        "selector": "#" + popupDivId,
        "url": url,
        "data": object,
        "resp": afterOpenPopupPage(popupDivId, innerPopupInd1, popupId, popupCloseIcon, object, obj),
        "error": afterOpenPopupPageErr(object.object)
    });
}

function afterOpenPopupPage(E, D, C, B, A, F) {
    return function() {
        var G = $(document).width();
        var H = $(C).width();
        if (D) {
            H = $("#innerPopUp").width();
        }
        $(C).css({
            "left": (G / 2 - H / 2 - 8) + "px"
        });
        if (typeof F.afterLoad != "undefined") {
            F.afterLoad(A);
        }
    };
}

function afterOpenPopupPageErr(object) {
    return function(response) {
        response = formatToJSONOBject(response);
        if (typeof object != "undefined") {
            object = JSON.parse(object);
        } else {
            if (typeof response.ajaxErrorObj != "undefined") {
                closePopup();
                showErrorResponse(response.ajaxErrorObj);
            }
        }
        if (typeof object.errorMethod != "undefined") {
            closePopup();
            if (typeof object.errorMethod == "string") {
                eval(object.errorMethod + "();");
            } else {
                object.errorMethod();
            }
        } else {
            closePopup();
        }
    };
}

function openConfirmPopup(obj) {
    var ok = obj.ok;
    var popUpWidth = (typeof obj.width == "undefined") ? 400 : obj.width;
    popUpWidth = parseInt(popUpWidth, 10);
    var okInd = obj.okInd;
    var okBtnName = obj.okBtnName;
    var cancelInd = obj.cancelInd;
    var cancelBtnName = obj.cancelBtnName;
    var cancel = obj.cancel;
    var closeInd = (typeof obj.closeInd == "undefined") ? true : obj.closeInd;
    var confirmStr = obj.confirmStr;
    var maxHgtStr = "";
    var okStr = "";
    var cancelStr = "";
    var popupId = "#popUp";
    var popupDivId = "popUpDiv";
    var popupCloseIcon = "popupCloseIcon";
    var innerPopupInd1 = popupInd;
    if (innerPopupInd1) {
        popupId = "#innerPopUp";
        popupDivId = "innerPopUpDiv";
        popupCloseIcon = "innerPopupCloseIcon";
        $("#popUp").append('<div id="innerPopUp" class="innerPopUp"></div><div id="innerGlair"></div>');
    }
    if (typeof okBtnName == "undefined") {
        okBtnName = "OK";
    }
    if (typeof cancelBtnName == "undefined") {
        cancelBtnName = "Cancel";
    }
    var htmlStr = "";
    htmlStr += '<div class="errPopupDiv gAppBannerDiv" style="width:' + (popUpWidth + 10) + 'px;">';
    htmlStr += '	<span class="closeIcon banner"></span>';
    htmlStr += '	<span class="errPopupImg"></span><span id="errPopupTxt"></span>';
    htmlStr += "</div>";
    htmlStr += '<div class="warnPopupDiv gAppBannerDiv" style="width:' + (popUpWidth + 10) + 'px;">';
    htmlStr += '	<span class="closeIcon banner"></span>';
    htmlStr += '	<span class="warnPopupImg"></span><span id="warnPopupTxt"></span>';
    htmlStr += "</div>";
    htmlStr += '<div class="successPopupDiv gAppBannerDiv" style="width:' + (popUpWidth + 10) + 'px;">';
    htmlStr += '	<span class="closeIcon banner"></span>';
    htmlStr += '	<span class="successPopupImg"></span><span id="successPopupTxt"></span>';
    htmlStr += "</div>";
    htmlStr += '<div style="padding-top:2px;float:left;width:' + popUpWidth + "px;" + maxHgtStr + '" id="' + popupDivId + '" >';
    htmlStr += '	<div style="text-align: center;">';
    htmlStr += '		<img src="' + versionPath + '/images/loading_image_big.gif"></img>';
    htmlStr += "	</div>";
    htmlStr += "</div>";
    if (closeInd) {
        $(popupId).html("<span class='" + popupCloseIcon + "'></span>");
        $(popupId).append(htmlStr);
    } else {
        $(popupId).html(htmlStr);
    }
    if (typeof okInd == "undefined" || okInd) {
        okStr = '<input type="button" style="width:60px;" id="confirmOk" value="' + okBtnName + '" class="btn"/>';
    }
    if (typeof cancelInd == "undefined" || cancelInd) {
        cancelStr = '<input type="button" id="confirmCancel" style="margin-top:15px;margin-left:25px;width:70px;" value="' + cancelBtnName + '" class="red btn"/>';
    }
    var confirmHtml = '<div style="float:left;width:' + popUpWidth + 'px;padding-top:4px;"><span id="confirmTxt" class="ww">' + confirmStr + '</span></div><div class="clear"></div><div style="margin-top: 10px;text-align: center;">' + okStr + cancelStr + "</div>";
    $("#" + popupDivId).html(confirmHtml);
    var documentWidth = $(document).width();
    var popUpWidth = $(popupId).width();
    $(popupId).css({
        "left": (documentWidth / 2 - popUpWidth / 2) + "px"
    }).fadeIn();
    if (innerPopupInd1) {
        innerPopupInd = true;
        showInnerGlair();
    } else {
        showGlair();
    }
    $("#confirmOk").click(function() {
        if (innerPopupInd1) {
            closeInnerPopup();
        } else {
            popupInd = false;
            closePopup();
        }
        eval(ok + ";");
    });
    if (typeof cancelInd == "undefined" || cancelInd) {
        $("#confirmCancel").click(function() {
            if (innerPopupInd1) {
                closeInnerPopup();
            } else {
                popupInd = false;
                closePopup();
            }
            if (typeof cancel != "undefined") {
                eval(cancel + ";");
            }
        });
    }
    $("." + popupCloseIcon).click(function() {
        if (typeof obj.closeMethod != "undefined") {
            obj.closeMethod();
        } else {
            if (innerPopupInd1) {
                closeInnerPopup();
            } else {
                closePopup();
            }
        }
    });
    popupInd = true;
}

function openMsgPopup(K) {
    var E = (typeof K.btn1Ind == "undefined") ? true : K.btn1Ind;
    var I = (typeof K.btn2Ind == "undefined") ? false : K.btn2Ind;
    var L = (typeof K.btn3Ind == "undefined") ? false : K.btn3Ind;
    var N = (typeof K.btn1Lbl == "undefined") ? "Ok" : K.btn1Lbl;
    var Q = (typeof K.btn2Lbl == "undefined") ? "No" : K.btn2Lbl;
    var T = (typeof K.btn3Lbl == "undefined") ? "Cancel" : K.btn3Lbl;
    var O = (typeof K.btn1Act == "undefined") ? closePopup : K.btn1Act;
    var S = (typeof K.btn2Act == "undefined") ? closePopup : K.btn2Act;
    var A = (typeof K.btn3Act == "undefined") ? closePopup : K.btn3Act;
    var R = (typeof K.width == "undefined") ? 400 : K.width;
    var P = (typeof K.closeInd == "undefined") ? true : K.closeInd;
    var D = (typeof K.closeMethod == "undefined") ? closePopup : K.closeMethod;
    R = parseInt(R, 10);
    var M = "#popUp";
    var H = "popUpDiv";
    var G = "popupCloseIcon";
    var B = popupInd;
    if (B) {
        M = "#innerPopUp";
        H = "innerPopUpDiv";
        G = "innerPopupCloseIcon";
        $("#popUp").append('<div id="innerPopUp" class="innerPopUp"></div><div id="innerGlair"></div>');
    }
    var F = "";
    F += '<div class="errPopupDiv gAppBannerDiv" style="width:' + (R + 10) + 'px;">';
    F += '	<span class="closeIcon banner"></span>';
    F += '	<span class="errPopupImg"></span><span id="errPopupTxt"></span>';
    F += "</div>";
    F += '<div class="warnPopupDiv gAppBannerDiv" style="width:' + (R + 10) + 'px;">';
    F += '	<span class="closeIcon banner"></span>';
    F += '	<span class="warnPopupImg"></span><span id="warnPopupTxt"></span>';
    F += "</div>";
    F += '<div class="successPopupDiv gAppBannerDiv" style="width:' + (R + 10) + 'px;">';
    F += '	<span class="closeIcon banner"></span>';
    F += '	<span class="successPopupImg"></span><span id="successPopupTxt"></span>';
    F += "</div>";
    F += '<div style="padding-top:2px;float:left;width:' + R + 'px;" id="' + H + '" >';
    F += '	<div style="text-align: center;">';
    F += '		<img src="' + versionPath + '/images/loading_image_big.gif"></img>';
    F += "	</div>";
    F += "</div>";
    if (P) {
        $(M).html("<span class='" + G + "'></span>");
        $(M).append(F);
    } else {
        $(M).html(F);
    }
    F = "";
    if (E) {
        F += '<input type="button" style="width:60px;" id="confPopBtn1" value="' + N + '" class="btn"/>';
    }
    if (I) {
        F += '<input type="button" id="confPopBtn2" style="margin-top:15px;margin-left:25px;width:70px;" value="' + Q + '" class="red btn"/>';
    }
    if (L) {
        F += '<input type="button" id="confPopBtn3" style="margin-top:15px;margin-left:25px;width:70px;" value="' + T + '" class="red btn"/>';
    }
    var J = "";
    J += '<div style="float:left;width:' + R + 'px;padding-top:4px;">';
    if (K.info) {
        J += '<span class="successImg"></span>';
    } else {
        if (K.warn) {
            J += '<span class="warnImg"></span>';
        } else {
            if (K.err) {
                J += '<span class="errImg"></span>';
            }
        }
    }
    J += '	<span id="confirmTxt" class="ww">' + K.message + "</span>";
    J += "</div>";
    J += '<div class="clear"></div>';
    J += '<div style="margin-top: 10px;text-align: center;">' + F + "</div>";
    $("#" + H).html(J);
    var C = $(document).width();
    var R = $(M).width();
    $(M).css({
        "left": (C / 2 - R / 2) + "px"
    }).fadeIn();
    if (B) {
        innerPopupInd = true;
        showInnerGlair();
    } else {
        showGlair();
    }
    if (E) {
        $("#confPopBtn1").click(function() {
            O();
        });
    }
    if (I) {
        $("#confPopBtn2").click(function() {
            S();
        });
    }
    if (L) {
        $("#confPopBtn3").click(function() {
            A();
        });
    }
    $("." + G).click(function() {
        D();
    });
    popupInd = true;
}

function closePopup() {
    if (innerPopupInd) {
        closeInnerPopup();
    } else {
        closeInnerPopup();
        popupInd = false;
        $("#popUp").hide();
        hideGlair();
    }
}

function closeInnerPopup() {
    innerPopupInd = false;
    $("#innerPopUp").hide();
    hideInnerGlair();
}

function showProgressBar() {
    $("#loading_bar").show();
    $("#glair").height($(document).height());
    $("#glair").addClass("glair");
    glairInd = true;
}

function hideProgressBar() {
    $("#loading_bar").hide();
    $("#glair").removeClass("glair");
    glairInd = false;
}

function addUrlParam(B, A, D) {
    var E = A + "=" + encodeURIComponent(D);
    var C = "?" + E;
    if (B) {
        C = B.replace(new RegExp("[?]" + A + "[^&]*"), "?" + E);
        if (C === B) {
            C = B.replace(new RegExp("[&]" + A + "[^&]*"), "&" + E);
            if ((C === B) && (B.indexOf(D) == -1)) {
                C += "&" + E;
            }
        }
    }
    return C;
}

function getQuery(A) {
    A = A.replace(/#.*/, "");
    var B = /\?[a-zA-Z0-9\=\&\%\$\-\_\.\+\!\*\'\(\)\,]+/.exec(A);
    return (B) ? decodeURIComponent(B[0]) : "";
}

function setMaxLimit(E, B) {
    var A = $("#" + E).attr("maxlen");
    var C = $.trim($("#" + E).val()).length;
    var D = A - C;
    if (D != A) {
        $("#" + B).html("Remaining characters :" + D);
    }
    $("#" + E).keyup(function() {
        var F = $.trim($(this).val()).length;
        var G = A - F;
        if (A - F < 0) {
            $(this).val($(this).val().slice(0, A));
            return false;
        }
        if (G != A) {
            $("#" + B).html("Remaining characters :" + G);
        } else {
            $("#" + B).html("Maximum characters " + G);
        }
    });
}

function setCharMaxLimit(D) {
    var A, B, C, E;
    $("." + D).each(function() {
        A = $(this).attr("maxlength");
        B = $(this).data("limitId");
        C = $.trim($(this).val()).length;
        E = A - C;
        if (E != A) {
            $("#" + B).html("Remaining characters :" + E);
        }
        $(this).keyup(function() {
            var F = $(this).attr("maxlength");
            var G = $.trim($(this).val()).length;
            var H = F - G;
            if (F - G < 0) {
                $(this).val($(this).val().slice(0, F));
                return false;
            }
            if (H != F) {
                $("#" + $(this).data("limitId")).html("Remaining characters :" + H);
            } else {
                $("#" + $(this).data("limitId")).html("Maximum characters " + H);
            }
        });
    });
}

function getUrlParam(E) {
    E = E.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var B = "[\\?&]" + E + "=([^&#]*)";
    var F = new RegExp(B);
    var G = F.exec(window.location.href);
    if (G == null) {
        return "";
    } else {
        return G[1];
    }
}
var isOpera = !!(window.opera && window.opera.version);
var isFirefox = testCSS("MozBoxSizing");
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0;
var isChrome = !isSafari && testCSS("WebkitTransform");
var isIE =
    /*@cc_on!@*/
    false || testCSS("msTransform");

function testCSS(A) {
    return A in document.documentElement.style;
}

function showException(A) {
    showMsg({
        "message": A,
        "info": false,
        "warn": false,
        "err": true
    });
    return false;
}

function showErrorById(B, A) {
    showMsg({
        "message": A,
        "info": false,
        "warn": false,
        "err": true
    }, B);
    return false;
}

function showWarning(A, B) {
    showMsg({
        "message": A,
        "info": false,
        "warn": true,
        "err": false
    }, B);
    return false;
}

function showSuccessMsg(A) {
    showMsg({
        "message": A,
        "info": true,
        "warn": false,
        "err": false
    });
    return true;
}

function showMsg(B, E, A) {
    var C = {};
    $.each(B, function(G, F) {
        C[G] = F;
    });
    var D = C.showType;
    if (typeof D == "undefined") {
        D = "BANNER";
    }
    if (typeof C.message == "object") {
        C.message = JSON.stringify(C.message);
    }
    if (typeof A != "undefined") {
        C.message = resolveMsgPlaceHolders(C.message, A);
    }
    if (D == "POPUP") {
        openMsgPopup(C);
    } else {
        if (D == "BANNER") {
            showBannerMsg(C, E);
        }
    }
}

function showBannerMsg(A, B) {
    gCloseBanner();
    if (A.info) {
        $(".errDiv, .warnDiv").hide();
        if (popupInd) {
            if (innerPopupInd) {
                $("#innerPopUp .successPopupDiv #successPopupTxt").html(A.message);
                $("#innerPopUp .successPopupDiv").show();
            } else {
                $("#popUp .successPopupDiv #successPopupTxt").html(A.message);
                $("#popUp .successPopupDiv").show();
            }
        } else {
            $(".successDiv #successTxt").html(A.message);
            $(".successDiv").show();
        }
    } else {
        if (A.warn) {
            $(".successDiv, .errDiv").hide();
            if (popupInd) {
                if (innerPopupInd) {
                    $("#innerPopUp .warnPopupDiv #warnPopupTxt").html(A.message);
                    $("#innerPopUp .warnPopupDiv").hide().show();
                } else {
                    $("#popUp .warnPopupDiv #warnPopupTxt").html(A.message);
                    $("#popUp .warnPopupDiv").hide().show();
                }
            } else {
                $(".warnDiv #warnTxt").html(A.message);
                $(".warnDiv").hide().show();
            }
            if (typeof B != "undefined") {
                $("#" + B).focus();
            }
        } else {
            if (A.err) {
                $(".successDiv, .warnDiv").hide();
                if (popupInd) {
                    if (innerPopupInd) {
                        $("#innerPopUp .errPopupDiv #errPopupTxt").html(A.message);
                        $("#innerPopUp .errPopupDiv").hide().show();
                    } else {
                        $("#popUp .errPopupDiv #errPopupTxt").html(A.message);
                        $("#popUp .errPopupDiv").hide().show();
                    }
                } else {
                    $(".errDiv #errTxt").html(A.message);
                    $(".errDiv").hide().show();
                }
            }
        }
    }
    if (typeof B != "undefined") {
        $("#" + B).focus();
    }
}

function activeDatePicker(D) {
    var A = defaultDate;
    var E = defaultTime;
    var B = defaultDateTime;
    if (typeof D != "undefined") {
        if (typeof D.dateFormat != "undefined") {
            A = D.dateFormat;
        }
        if (typeof D.timeFormat != "undefined") {
            E = D.timeFormat;
        }
        if (typeof D.dateTimeFormat != "undefined") {
            B = D.dateTimeFormat;
        }
    }
    $(".hasDatePicker").not(".hasDatepicker").datepicker({
        dateFormat: A,
        yearRange: "-100:+100",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1
    });
    try {
        $(".hasTimePicker").not(".hasDatepicker").timepicker({
            timeFormat: E,
            fixFocusIE: false,
            onSelect: function(G, F) {
                $(this).focus();
            },
            onClose: function(G, F) {
                this.focus();
            }
        });
        $(".hasDateTimePicker").not(".hasDatepicker").datetimepicker({
            dateFormat: B,
            yearRange: "-100:+100",
            changeMonth: true,
            changeYear: true,
            fixFocusIE: false,
            onSelect: function(G, F) {
                $(this).focus();
            },
            onClose: function(G, F) {
                this.focus();
            },
            numberOfMonths: 1
        });
        $(".hasDateTimeSecPicker").not(".hasDatepicker").datetimepicker({
            dateFormat: B,
            timeFormat: "hh:mm:ss",
            yearRange: "-100:+100",
            changeMonth: true,
            changeYear: true,
            showSecond: true,
            fixFocusIE: false,
            onSelect: function(G, F) {
                $(this).focus();
            },
            onClose: function(G, F) {
                this.focus();
            },
            numberOfMonths: 1
        });
    } catch (C) {}
}

function slideListMenu(C, B, A) {
    $("." + C).unbind("click");
    $(document).on("click", "." + C, function() {
        $(".listMenuMainDiv").hide();
        if ($(this).data("gridListMngId") == undefined) {
            listMenuMainDiv = "listMenuMainDiv";
        } else {
            listMenuMainDiv = "listMenuMainDiv_" + $(this).data("gridListMngId");
        }
        if ($(this).hasClass(A) || $(this).children().hasClass(A)) {
            if ($(this).children().size() == 0) {
                $(this).removeClass(A);
                $(this).addClass(B);
            } else {
                $(this).children(".listImg").removeClass(A);
                $(this).children(".listImg").addClass(B);
            }
            $("." + listMenuMainDiv).hide();
            return;
        }
        var D = $(this).position();
        if (($(document).width() - D.left) - $("." + listMenuMainDiv).width() < 0) {
            $("." + listMenuMainDiv).css({
                "left": D.left - $("." + listMenuMainDiv).width()
            });
        } else {
            $("." + listMenuMainDiv).css({
                "left": D.left + 15
            });
        }
        if (($(".contentMainDiv").height() - D.top) - $("." + listMenuMainDiv).height() < 0) {
            $("." + listMenuMainDiv).css({
                "top": D.top - $("." + listMenuMainDiv).height() - 4
            });
        } else {
            $("." + listMenuMainDiv).css({
                "top": D.top + $(this).height()
            });
        }
        $("." + listMenuMainDiv).show();
        if ($(this).children().size() == 0) {
            $("." + C).removeClass(A);
            $("." + C).addClass(B);
            $(this).addClass(A);
            $(this).removeClass(B);
        } else {
            $("." + C).children(".listImg").removeClass(A);
            $("." + C).children(".listImg").addClass(B);
            $("." + C).children(".listImg").addClass(A);
            $("." + C).children(".listImg").removeClass(B);
        }
    });
    $(document).click(function(D) {
        if (!($(D.target).hasClass(C) || $(D.target).parents().hasClass(C))) {
            $(".listMenuMainDiv").hide();
            if ($("." + C).children().size() == 0) {
                $("." + C).addClass(B);
                $("." + C).removeClass(A);
            } else {
                $("." + C).children(".listImg").addClass(B);
                $("." + C).children(".listImg").removeClass(A);
            }
        }
    });
}

function getManageMenu(E, B, A, D, F) {
    $(".listMenuMainDiv").hide();
    if (D.data("gridListMngId") == undefined) {
        listMenuMainDiv = "listMenuMainDiv";
    } else {
        listMenuMainDiv = "listMenuMainDiv_" + D.data("gridListMngId");
    }
    if ($(D).hasClass(A) || $(D).children().hasClass(A)) {
        if ($(D).children().size() == 0) {
            $(D).removeClass(A);
            $(D).addClass(B);
        } else {
            $(D).children(".listImg").removeClass(A);
            $(D).children(".listImg").addClass(B);
        }
        $("." + listMenuMainDiv).hide();
        return false;
    }
    if (F) {
        $("." + listMenuMainDiv).html("<span class='loadngImgSml dmcSlideLdImg'>&nbsp;</span>");
        $(".dmcSlideLdImg").show();
    }
    var C = $(D).position();
    if (($(document).width() - C.left) - $("." + listMenuMainDiv).width() < 0) {
        $("." + listMenuMainDiv).css({
            "left": C.left - $("." + listMenuMainDiv).width()
        });
    } else {
        $("." + listMenuMainDiv).css({
            "left": C.left + 15
        });
    }
    if (($(".contentMainDiv").height() - C.top) - $("." + listMenuMainDiv).height() < 0) {
        $("." + listMenuMainDiv).css({
            "top": C.top - $("." + listMenuMainDiv).height() - 4
        });
    } else {
        $("." + listMenuMainDiv).css({
            "top": C.top + $(D).height()
        });
    }
    $("." + listMenuMainDiv).show();
    if ($(D).children().size() == 0) {
        $("." + E).removeClass(A);
        $("." + E).addClass(B);
        $(D).addClass(A);
        $(D).removeClass(B);
    } else {
        $("." + E).children(".listImg").removeClass(A);
        $("." + E).children(".listImg").addClass(B);
        $("." + E).children(".listImg").addClass(A);
        $("." + E).children(".listImg").removeClass(B);
    }
    $(document).click(function(G) {
        if (!($(G.target).hasClass(E) || $(G.target).parents().hasClass(E))) {
            $(".listMenuMainDiv").hide();
            if ($("." + E).children().size() == 0) {
                $("." + E).addClass(B);
                $("." + E).removeClass(A);
            } else {
                $("." + E).children(".listImg").addClass(B);
                $("." + E).children(".listImg").removeClass(A);
            }
        }
    });
    return true;
}
var currentfocusEle;

function openDropDown(B, G, C) {
    currentfocusEle = C;
    if (currentfocusEle.hasClass("opend")) {
        closePopup2();
        return false;
    }
    currentfocusEle.addClass("opend");
    $(".ddPopup").remove();
    if (G && G != null) {
        d_options = G;
        minHeight = G.minHeight || 100;
    }
    var F = "";
    if (typeof(G.side) != "undefined") {
        if (G.side == "left") {
            F += "<div id='ddcont_" + cPop + "' class='ddContent'></div>";
            F += "<div class='lfttiparwbksno' ></div><div class='lfttiparwsno'></div>";
        } else {
            if (G.side == "right") {
                F += "<div class='rttiparwbksno'></div><div class='rttiparwsno'></div>";
                F += "<div id='ddcont_" + cPop + "' class='ddContent'><span style='color:#888;font-size:12px;font-weight:normal;'>Loading...</span></div>";
            } else {
                if (G.side == "top") {
                    F += "<div id='ddcont_" + cPop + "' class='ddContent'></div>";
                    F += "<div class='toptiparwbksno'></div><div class='toptiparwsno'></div>";
                }
            }
        }
    } else {
        F += "<div class='tiparwbksno' style='margin-left:20px;'></div><div class='tiparwsno' style='margin-left:20px;'></div>";
        F += "<div id='ddcont_" + cPop + "' class='ddContent'><span style='color:#888;font-size:12px;font-weight:normal;'>Loading...</span></div>";
    }
    var A = currentfocusEle.get(0).offsetTop;
    var E = currentfocusEle.get(0).offsetLeft;
    if (G.left && G.top) {
        E = G.left;
        A = G.top;
    }
    A = currentfocusEle.outerHeight() + A + 10;
    E = E - 15;
    popupDiv = document.createElement("div");
    $(popupDiv).attr("id", "popupdd_" + cPop);
    d_optArray["popupdd_" + cPop] = G;
    popsArray[cPop] = "popupdd_" + cPop;
    popupDiv.className = "ddPopup";
    currentfocusEle.parent().append(popupDiv);
    var D = "left";
    if (typeof(G.pos) != "undefined") {
        D = G.pos;
    }
    eleWdth = E + currentfocusEle.outerWidth();
    if ((eleWdth > 1024 || D == "right") && typeof(G.side) == "undefined") {
        D = "right";
        eleWdth = $(document.body).width() - eleWdth - 40;
        $(popupDiv).css({
            "right": eleWdth + "px",
            "z-index": 41 + 2 * (currGlair - 1),
            "top": (A) + "px"
        });
    } else {
        if (typeof(G.side) != "undefined") {
            if (G.side == "left") {
                A -= 60;
            } else {
                if (G.side == "right") {
                    A -= 60;
                    E += currentfocusEle.width() + 30;
                } else {
                    if (G.side == "top") {
                        E += currentfocusEle.width() + 30;
                    }
                }
            }
        }
        $(popupDiv).css({
            "left": E + "px",
            "z-index": 41 + 2 * (currGlair - 1),
            "top": (A) + "px"
        });
    }
    $(popupDiv).addClass(D);
    $(popupDiv).html(F);
    if (typeof(G.side) != "undefined") {
        if (G.side == "left" || G.side == "top" || G.side == "right") {
            $("#ddcont_" + cPop + ",#popupdd_" + cPop + ",.lfttiparwbksno,.lfttiparwsno").css("visibility", "hidden");
            $(".lfttiparwbksno,.lfttiparwsno").css("visibility", "hidden");
            loadViewInDiv({
                "selector": "#ddcont_" + cPop,
                "url": B,
                "data": (typeof G.data == "undefined") ? null : G.data,
                "resp": afterOpenDropDown()
            });
        } else {
            loadViewInDiv({
                "selector": "#ddcont_" + cPop,
                "url": B,
                "data": (typeof G.data == "undefined") ? null : G.data,
            });
            cPop++;
        }
    } else {
        loadViewInDiv({
            "selector": "#ddcont_" + cPop,
            "url": B,
            "data": (typeof G.data == "undefined") ? null : G.data,
        });
        cPop++;
    }
}

function afterOpenDropDown(D, B, C, A) {
    return function(E) {
        $(".lfttiparwbksno,.lfttiparwsno").css("margin-left", (20 + $("#ddcont_" + cPop).width()) + "px");
        if (D.side == "left") {
            C -= $("#ddcont_" + cPop).width() + 20;
            $(B).css("left", C + "px");
        } else {
            if (D.side == "top") {
                A -= $("#ddcont_" + cPop).height() + 80;
                $(B).css("top", A + "px");
            }
        }
        setTimeout("showDropDown('" + cPop + "');", 200);
        cPop++;
    };
}

function openDropDownHtml(F, G, B) {
    currentfocusEle = B;
    if (currentfocusEle.hasClass("opend")) {
        closePopup2();
        return false;
    }
    currentfocusEle.addClass("opend");
    $(".ddPopup").remove();
    if (G && G != null) {
        d_options = G;
        minHeight = G.minHeight || 100;
    }
    var E = "";
    if (typeof(G.side) != "undefined") {
        if (G.side == "left") {
            E += "<div id='ddcont_" + cPop + "' class='ddContent'></div>";
            E += "<div class='lfttiparwbksno' ></div><div class='lfttiparwsno'></div>";
        } else {
            if (G.side == "right") {
                E += "<div class='rttiparwbksno'></div><div class='rttiparwsno'></div>";
                E += "<div id='ddcont_" + cPop + "' class='ddContent'><span style='color:#888;font-size:12px;font-weight:normal;'>Loading...</span></div>";
            } else {
                if (G.side == "top") {
                    E += "<div id='ddcont_" + cPop + "' class='ddContent'></div>";
                    E += "<div class='toptiparwbksno'></div><div class='toptiparwsno'></div>";
                }
            }
        }
    } else {
        E += "<div class='tiparwbksno' style='margin-left:20px;'></div><div class='tiparwsno' style='margin-left:20px;'></div>";
        E += "<div id='ddcont_" + cPop + "' class='ddContent'><span style='color:#888;font-size:12px;font-weight:normal;'>Loading...</span></div>";
    }
    var A = currentfocusEle.get(0).offsetTop;
    var D = currentfocusEle.get(0).offsetLeft;
    if (G.left && G.top) {
        D = G.left;
        A = G.top;
    }
    A = currentfocusEle.outerHeight() + A + 10;
    D = D - 15;
    popupDiv = document.createElement("div");
    $(popupDiv).attr("id", "popupdd_" + cPop);
    d_optArray["popupdd_" + cPop] = G;
    popsArray[cPop] = "popupdd_" + cPop;
    popupDiv.className = "ddPopup";
    currentfocusEle.parent().append(popupDiv);
    var C = "left";
    if (typeof(G.pos) != "undefined") {
        C = G.pos;
    }
    eleWdth = D + currentfocusEle.outerWidth();
    if ((eleWdth > 1024 || C == "right") && typeof(G.side) == "undefined") {
        C = "right";
        eleWdth = $(document.body).width() - eleWdth - 45;
        $(popupDiv).css({
            "right": eleWdth + "px",
            "z-index": 41 + 2 * (currGlair - 1),
            "top": (A) + "px"
        });
    } else {
        if (typeof(G.side) != "undefined") {
            if (G.side == "left") {
                A -= 60;
            } else {
                if (G.side == "right") {
                    A -= 60;
                    D += currentfocusEle.width() + 30;
                } else {
                    if (G.side == "top") {
                        D += currentfocusEle.width() + 30;
                    }
                }
            }
        }
        $(popupDiv).css({
            "left": D + "px",
            "z-index": 41 + 2 * (currGlair - 1),
            "top": (A) + "px"
        });
    }
    $(popupDiv).addClass(C);
    $(popupDiv).html(E);
    if (typeof(G.side) != "undefined") {
        if (G.side == "left" || G.side == "top" || G.side == "right") {
            $("#ddcont_" + cPop + ",#popupdd_" + cPop + ",.lfttiparwbksno,.lfttiparwsno");
            $("#ddcont_" + cPop).html(F);
            $(".lfttiparwbksno,.lfttiparwsno").css("margin-left", (20 + $("#ddcont_" + cPop).width()) + "px");
            if (G.side == "left") {
                D -= $("#ddcont_" + cPop).width() + 20;
                $(popupDiv).css("left", D + "px");
            } else {
                if (G.side == "top") {
                    A -= $("#ddcont_" + cPop).height() + 80;
                    $(popupDiv).css("top", A + "px");
                }
            }
            cPop++;
        } else {
            $("#ddcont_" + cPop).html(F);
            cPop++;
        }
    } else {
        $("#ddcont_" + cPop).html(F);
        cPop++;
    }
}

function showDropDown(A) {
    $("#ddcont_" + A + ",#popupdd_" + A + ",.lfttiparwbksno,.lfttiparwsno").css("visibility", "visible");
}

function closePopup2(cbkind, trgtObj) {
    cbkind = (typeof(cbkind) != "undefined") ? cbkind : true;
    if (typeof(trgtObj) != "undefined" && typeof(currentfocusEle) != "undefined" && typeof trgtObj.attr("id") != "undefined" && (currentfocusEle.attr("id") == trgtObj.attr("id") || trgtObj.attr("id").indexOf("child_") != -1)) {
        return false;
    } else {
        if (typeof(currentfocusEle) != "undefined" && currentfocusEle.hasClass("noBlur") && !cbkind) {
            return false;
        }
    }
    $(".ddPopup").each(function() {
        var dvId = $(this).attr("id");
        cPop -= 1;
        $("#" + dvId).remove();
        d_options = d_optArray[dvId];
        $("#tagsPopupId").hide();
        currentfocusEle.removeClass("opend");
        $(".opend").removeClass("opend");
        currentfocusEle.parent().removeClass("clked");
        if (d_options && d_options.CallBack && d_options.CallBack != "" && cbkind) {
            eval(d_options.CallBack + "('" + currentfocusEle.attr("id") + "')");
        }
    });
    $(".uploadNotification").show();
}

function encodeData(A) {
    if (typeof A == "undefined" || A == null) {
        return A;
    }
    return encodeURIComponent($.trim(A.replace(/\n/g, "<br />").replace(/"/g, '\\"')));
}

function decodeData(A) {
    if (typeof A == "undefined" || A == null) {
        return A;
    }
    return $.trim(decodeURIComponent(A).replace(/<br \/>/gi, "\n").replace(/\\"/g, '"'));
}
var XML_CHAR_MAP = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;"
};

function escapeXml(A) {
    return A.replace(/[<>&"']/g, function(B) {
        return XML_CHAR_MAP[B];
    });
}
var HTML_CHAR_MAP = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&#39;"
};

function escapeHtml(A) {
    return A.replace(/[<>&"']/g, function(B) {
        return HTML_CHAR_MAP[B];
    });
}

function genYearDropDown(B, H, A) {
    if ($.trim(H) != "") {
        var G = document.getElementsByClassName(B);
        for (var D = 0, F = G.length; D < F; D++) {
            var E = document.createElement("option");
            E.text = "-- Select--";
            E.value = -1;
            G[D].appendChild(E);
            for (var C = H; C <= A; C++) {
                E = document.createElement("option");
                E.text = C;
                E.value = C;
                G[D].appendChild(E);
            }
        }
    }
}

function genInvYearDropDown(B, H, A) {
    if ($.trim(H) != "") {
        var G = document.getElementsByClassName(B);
        for (var D = 0, F = G.length; D < F; D++) {
            var E = document.createElement("option");
            E.text = "-- Select--";
            E.value = -1;
            G[D].appendChild(E);
            for (var C = A; C >= H; C--) {
                E = document.createElement("option");
                E.text = C;
                E.value = C;
                G[D].appendChild(E);
            }
        }
    }
}

function showProcessList(A, B, D) {
    if (A == undefined || A == "") {
        A = "gridContent";
    }
    if (B == undefined || B == "") {
        B = false;
    }
    $("." + A).css("opacity", "0.5");
    var C = "loadngImgSml";
    if (typeof D != "undefined" && D) {
        C = "loadngImgBig";
    }
    if (B) {
        $(".popUp input[type='submit'],.popUp input[type='button'], .popUp button").attr("disabled", "disabled").css("opacity", "0.5");
        $("." + A).append('<span class="loadngImgPrc ' + C + '">&nbsp;</span>');
        $(".loadngImgPrc").css({
            "left": $("." + A).width() / 2,
            "position": "absolute",
            "top": ($("." + A).position().top) + (($("." + A).height() + 4) / 2)
        });
    } else {
        $("input[type='submit'],input[type='button'],button").attr("disabled", "disabled").css("opacity", "0.5");
        $(".contentMain").append('<span class="loadngImgPrc ' + C + '">&nbsp;</span>');
        $(".loadngImgPrc").css({
            "left": $(".contentMain").width() / 2,
            "position": "absolute",
            "top": ($("." + A).position().top) + (($("." + A).height() + 4) / 2)
        });
    }
    $(".loadngImgPrc").show();
}

function hideProcessList(A, B, C) {
    if (A == undefined || A == "") {
        A = "gridContent";
    }
    if (B == undefined || B == "") {
        B = false;
    }
    if (typeof C != "undefined" && C) {
        imgCls = "loadngImgBig";
    }
    if (B) {
        $(".popUp input[type='submit'],.popUp input[type='button'], .popUp button").removeAttr("disabled").css("opacity", "1");
    } else {
        $("input[type='submit'],input[type='button'], button").removeAttr("disabled").css("opacity", "1");
    }
    $("." + A).css("opacity", "1");
    $(".loadngImgPrc").remove();
}

function showProcess(A) {
    $("" + A.disable).attr("disabled", "disabled");
    $("" + A.show).show();
}

function hideProcess(A) {
    $("" + A.enable).removeAttr("disabled");
    $("" + A.hide).hide();
}

function changeTab(B, C, A) {
    $(".content").hide();
    $("." + C).show();
    $(".cmn").removeClass("curntTab");
    $(".cmn").parent("li").removeClass("curntLi");
    $("." + B).addClass("curntTab");
    $("." + B).parent("li").addClass("curntLi");
    if (typeof A != "undefined" && A) {
        callAjax("/base/event");
    }
}

function addBtnDisabled(B, A) {
    $("." + B).show();
    $("." + A).attr("disabled", "disabled");
    $("." + A).css("opacity", "0.5");
}

function removeBtnDisabled(B, A) {
    $("." + B).hide();
    $("." + A).removeAttr("disabled");
    $("." + A).css("opacity", "1");
}

function loadViewInDiv(F) {
    var A = F.selector;
    var D = F.url;
    var C = F.data;
    var E = F.resp;
    var B = F.error;
    if (typeof C == "undefined") {
        C = null;
    }
    $(A).load(basePath + D, C, function(H, G, J) {
        if (G != "success") {
            if (J.status == 404) {
                showException("Please check the URL that you have provided " + basePath + D);
            } else {
                if (J.status == 405) {
                    showException("Request type was not matched for the URL : " + basePath + D);
                } else {
                    callAjaxByObj({
                        "url": "/base/showError",
                        "resp": afterErrorResponse()
                    });
                }
            }
            if (typeof B != "undefined") {
                B(H);
            }
        } else {
            try {
                if (typeof H == "string" && (H.toLowerCase().indexOf("<!doctype html public") != -1)) {
                    B(H);
                } else {
                    H = $.parseJSON(H);
                    if (typeof H.ajaxErrorObj != "undefined") {
                        if (typeof B != "undefined") {
                            B(H);
                        } else {
                            $(this).html(H.ajaxErrorObj.exceptionData);
                        }
                        showErrorResponse(H.ajaxErrorObj);
                    } else {
                        if (typeof E != "undefined") {
                            E(H);
                        }
                    }
                }
            } catch (I) {
                if (typeof E != "undefined") {
                    E(H);
                }
            }
        }
    });
}

function resolveMsgPlaceHolders(B, A) {
    $.each(A, function(D, C) {
        B = B.split("$$" + D + "$$").join(C);
    });
    return B;
}

function gCloseBanner() {
    $(".gAppBannerDiv").hide();
}

function customerScrollBar(B, A) {
    $(B).mCustomScrollbar({
        theme: "3d",
        axis: A,
        mouseWheel: {
            enable: false
        }
    });
}

function activateYrMnthDatePicker() {
    $(".yrMnth").datepicker({
        dateFormat: "mm/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "-150:+0",
        maxDate: new Date(),
        showButtonPanel: true,
        numberOfMonths: 1,
        onClose: function(D, B) {
            var C = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var A = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker("setDate", new Date(A, C, 1));
        }
    });
    $(".yrMnth").focus(function() {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-current").hide();
    });
}

function absoluteCoordinates(I) {
    var G = $(window).scrollTop();
    var E = $(window).scrollLeft();
    var H = I.width();
    var C = I.height();
    var B = I.offset();
    var D = I;
    while (typeof D == "object") {
        var A = D.parent().offset();
        if (typeof A == "undefined") {
            break;
        }
        B.left = B.left + (A.left);
        B.top = B.top + (A.top);
        D = D.parent();
    }
    var F = {
        left: B.left + E,
        right: B.left + H + E,
        top: B.top + G,
        bottom: B.top + C + G,
    };
    F.tl = {
        x: F.left,
        y: F.top
    };
    F.tr = {
        x: F.right,
        y: F.top
    };
    F.bl = {
        x: F.left,
        y: F.bottom
    };
    F.br = {
        x: F.right,
        y: F.bottom
    };
    return F;
}

function getPlainUrl(B) {
    var D = B.split("/");
    var A = "";
    for (var C = 1; C < 3; C++) {
        A += "/";
        A += D[C];
    }
    return A;
}

function focusOnFirstField() {
    $(".formDiv:first select").focus();
    if (!$(".formDiv:first select").is(":focus")) {
        $(".formDiv input[type != hidden]:first").focus();
        $(".formDiv input[readonly != readonly]:first").focus();
        $(".formDiv input[disabled != disabled]:first").focus();
    }
}

function parseDate(L, Q) {
    Q = Q.toUpperCase();
    var A = Q.trim().split(/ +/);
    var P = L.trim().split(/ +/);
    var M = null,
        J = null,
        I = null;
    M = A[0];
    J = A[1];
    I = A[2];
    var D = null,
        N = null,
        R = null,
        O = null,
        S = null,
        G = null,
        K = null,
        F = null;
    var T = false;
    if (!!M && !!P[0]) {
        var E = P[0].split(/\/|-|:/);
        var C = M.split(/\/|-|:/);
        if (C[0] == "DD") {
            R = E[0];
            N = E[1];
            D = E[2];
        } else {
            if (C[0] == "HH" || C[0] == "HH24") {
                if (C[0] == "HH24") {
                    T = true;
                }
                O = E[0];
                S = E[1];
                G = E[2];
                K = E[3];
            }
        }
    }
    if (!!J && !!P[1]) {
        if (J == "AM" || J == "PM") {
            F = J;
        } else {
            var E = P[1].split(/:| /);
            var B = J.split(":");
            if (B[0] == "HH" || B[0] == "HH24") {
                if (B[0] == "HH24") {
                    T = true;
                }
                O = E[0];
                S = E[1];
                G = E[2];
                K = E[3];
            }
        }
    }
    if (!!I && !!P[2]) {
        F = P[2];
    }
    var H = new Date();
    if (!!D && !!N && !!R) {
        H.setFullYear(D, parseInt(N, 10) - 1, R);
    }
    if (!!O && !!S) {
        H.setHours(T ? (O - 1) : (F == "AM" ? (O - 1) : (F == "PM" ? (O + 11) : 0)), N);
    }
    if (!!G) {
        H.setSeconds(G);
    }
    if (!!K) {
        H.setMilliseconds(K);
    }
    return H;
}

function getDuration(C, B) {
    var I = C.getTime();
    var H = B.getTime();
    var D = H >= I;
    if (D) {
        var F = D ? (H - I) : (I - H);
        var K = 24 * 3600 * 1000;
        F = Math.floor(F / K);
        var L = Math.floor(F / 365);
        var A = F % 365;
        var E = Math.floor(A / 30);
        var J = A % 30;
        var G = (D ? 1 : -1);
        if (E == 12) {
            L++;
            E = 0;
        }
        if (J == 30) {
            E++;
            J = 0;
        }
        return {
            y: L * G,
            m: E * G,
            d: J * G + 1
        };
    } else {
        return {
            y: -1,
            m: -1,
            d: -1
        };
    }
}

function getDurationofTwoDates(A) {
    $(document).on("change", A.getDurationClass, function() {
        var J = $.trim($(A.fromDate).val());
        var H = $.trim($(A.toDate).val());
        var F = $.datepicker.formatDate("dd-mm-yy", $.datepicker.parseDate(defaultDate, $.trim($(A.fromDate).val())));
        var E = $.datepicker.formatDate("dd-mm-yy", $.datepicker.parseDate(defaultDate, $.trim($(A.toDate).val())));
        var B = parseDate(F, defaultDate);
        var D = parseDate(E, defaultDate);
        var I = B.getTime();
        var G = D.getTime();
        var C = G >= I;
        if (C) {
            if (J != "" && H != "") {
                callAjaxByObj({
                    "url": "/base/getDuration",
                    "type": "POST",
                    "data": {
                        "fromDate": J,
                        "toDate": H
                    },
                    "resp": afterGetDuration(A.durationFieldId),
                    "error": afterSaveDurationErr()
                });
            }
            if (H == "") {
                $(A.durationFieldId).val("");
            }
        } else {
            $(A.durationFieldId).val("");
        }
    });
}

function afterGetDuration(A) {
    return function(B) {
        $(A).val(B.durationValue);
    };
}

function afterSaveDurationErr() {
    hideProcessList();
    return function() {};
}