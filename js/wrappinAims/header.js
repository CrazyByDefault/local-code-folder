var menuBuildInd = false;
var isCacheSupports = true;
$(function() {
    if (!hasGroupWebsite) {
        $("#plianto_logo").css("cursor", "auto");
    }
    if (typeof(Storage) !== "undefined") {
        isCacheSupports = true;
    } else {
        isCacheSupports = false;
    }
    $(".mnHdrDiv").click(function() {
        if ($(this).children("span#menuImg").hasClass("hideMenu")) {
            $("span#menuImg").removeClass("hideMenu");
            $("span#menuImg").addClass("showMenu");
            if (!menuBuildInd) {
                $("#menuId").data("orderCount", 1);
                $("#menuId").show();
                if (!isCacheSupports || (typeof localStorage[basePath + "_menu_menuId_main"] == "undefined")) {
                    callAjaxByObj({
                        "url": "/base/buildMenu",
                        "resp": afterBuildMenu()
                    });
                } else {
                    setMenuFromCache("menuId", "main");
                }
                menuBuildInd = true;
            } else {
                $("#menuId").show();
            }
        } else {
            $("span#menuImg").removeClass("showMenu");
            $("span#menuImg").addClass("hideMenu");
            $("#menuId").hide();
        }
    });
    $("#role_tab").click(function() {
        $(".role_tab_div").toggleClass("open");
        if ($(".role_tab_div").hasClass("open")) {
            $(".role_tab_div .bottomFtrArr").removeClass("hideMenu");
            $(".role_tab_div .bottomFtrArr").addClass("showMenu");
        } else {
            $(".role_tab_div .bottomFtrArr").removeClass("showMenu");
            $(".role_tab_div .bottomFtrArr").addClass("hideMenu");
        }
    });
    $("#location_tab").click(function() {
        $(".loc_tab_div").toggleClass("open");
        if ($(".loc_tab_div").hasClass("open")) {
            $(".loc_tab_div .bottomFtrArr").removeClass("hideMenu");
            $(".loc_tab_div .bottomFtrArr").addClass("showMenu");
        } else {
            $(".loc_tab_div .bottomFtrArr").removeClass("showMenu");
            $(".loc_tab_div .bottomFtrArr").addClass("hideMenu");
        }
    });
    $("#plianto_logo").click(function() {
        if (hasGroupWebsite) {
            window.open(groupWebsite, "_blank");
        }
    });
});

function appendMenu(H, C, K, F, I) {
    var G = 0;
    for (var E in H) {
        var B = 0;
        if (H[G] != "undefined") {
            B = H[G].menuItemName.length;
        }
        if (H[E].menuItemName.length > B) {
            G = E;
        }
    }
    if (typeof H[G] != "undefined") {
        G = $("#hiddenTxt").html(H[G].menuItemName).width() + 2;
    } else {
        G = $("#hiddenTxt").html("").width() + 2;
    }
    G += 5;
    var A = "";
    A += '<div class="menuItems" id="item_' + C + '">';
    for (var E in H) {
        var J = H[E];
        var D = J.menuItemTypeId;
        if (D == 3) {
            A += '	<div class="hBar" style="width:' + (G + 45) + 'px;"></div>';
            continue;
        }
        if (C == "menuId") {
            A += '<div class="menuItem root" id="menuItem_' + C + J.menuItemId + '" title="' + J.menuItemDesc + '" style="width:' + (G + 45) + 'px;">';
        } else {
            A += '<div class="menuItem" id="menuItem_' + C + J.menuItemId + '" title="' + J.menuItemDesc + '" style="width:' + (G + 45) + 'px;">';
        }
        if (D == 2) {
            A += '	<div class="menuNmDiv" id="mnDv_' + C + J.menuItemId + '" style="width:' + (G + 40) + 'px;">';
            A += '		<a class="menuName" id="leaf_' + J.menuItemId + '" href="' + basePath + J.url + '" style="width:' + (G + 5) + 'px;">' + J.menuItemName + "</a>";
            A += "	</div>";
        } else {
            if (D == 1) {
                A += '	<div class="menuNmDiv" id="mnDv_' + C + J.menuItemId + '" onclick="onMenuNameClick(' + J.subMenuId + ", '" + C + J.menuItemId + "', '" + C + "', '" + K + '\');" style="width:' + (G + 40) + 'px;">';
                A += '		<a class="menuName" id="' + C + J.menuItemId + J.subMenuId + '" style="width:' + (G + 5) + 'px;">' + J.menuItemName + " </a>";
                A += '		<span class="rightArrow" id="arr_' + J.subMenuId + "_" + C + '" style="margin-left:8px;"></span>';
                A += "	</div>";
                A += '	<div class="childDiv" id="child_' + J.subMenuId + "_" + K + "_" + C + '">';
                A += "	</div>";
            }
        }
        A += "	</div>";
        A += '	<div class="clear"></div>';
    }
    A += "</div>";
    if ("menuId" == C) {
        $("#" + C).html(A);
        buildMenuPosition(C, H.length);
    } else {
        $("#" + C + "_" + I + "_" + K).html(A);
        buildMenuPosition(C + "_" + I + "_" + K, H.length);
    }
    if (isCacheSupports) {
        if ("menuId" == C) {
            localStorage[basePath + "_menu_" + C + "_" + K] = A;
            localStorage[basePath + "_menu_" + C + "_" + K + "_size"] = H.length;
        } else {
            localStorage[basePath + "_menu_" + C + "_" + I + "_" + K] = A;
            localStorage[basePath + "_menu_" + C + "_" + I + "_" + K + "_size"] = H.length;
        }
    }
}

function setMenuFromCache(B, A) {
    if (isCacheSupports) {
        if (A == "main") {
            $("#" + B).html(localStorage[basePath + "_menu_" + B + "_main"]);
            buildMenuPosition(B, parseInt(localStorage[basePath + "_menu_" + B + "main_size"]), 10);
        } else {
            $("#" + B).html(localStorage[basePath + "_menu_" + B]);
            buildMenuPosition(B, parseInt(localStorage[basePath + "_menu_" + B + "_size"]), 10);
        }
    }
}

function buildMenuPosition(B, N) {
    $("#hiddenTxt").html("");
    var I = $("#" + B);
    var C = I.children(".menuItems");
    var L = $(C).offset().top;
    var K = $(I).position().top;
    var A = I.height() + 2 + L;
    var F = $(".footerMain").height();
    var E = N * 25;
    var G = $(window).height() - $(".headMain").height() - F;
    if (A >= G) {
        var M = A - L;
        var H = $(".contentMainDiv").height() - $(C).offset().top + F;
        if (M > 0) {
            if (M > G) {
                C.css({
                    "height": (M - H) + "px",
                    "float": "left",
                    "overflow-y": "auto",
                    "overflow-x": "hidden"
                });
            } else {
                var D = K + E + F;
                if (D > G) {
                    var J = E - (D - G) - (4 * F);
                    if (J > 0) {
                        C.css({
                            "height": J + "px",
                            "float": "left",
                            "overflow-y": "auto",
                            "overflow-x": "hidden"
                        });
                    } else {
                        C.css({
                            "height": "auto",
                            "float": "left",
                            "overflow-y": "auto",
                            "overflow-x": "hidden"
                        });
                    }
                }
            }
        } else {
            if (E > H) {
                C.css({
                    "height": H + "px",
                    "float": "left",
                    "overflow-y": "auto"
                });
            }
        }
    }
}

function onMenuNameClick(A, B, D, C) {
    if (!$("#mnDv_" + B).hasClass("build")) {
        callSubMenuAjax(A, D, C);
        $("#mnDv_" + B).addClass("build");
    }
    $(".childDiv").removeClass("show");
    $(".menuItem").removeClass("selected");
    $("#child_" + A + "_" + C + "_" + D).addClass("show");
    $("#child_" + A + "_" + C + "_" + D).parents(".childDiv").addClass("show");
    $("#menuItem_" + B).addClass("selected");
    $("#menuItem_" + B).parents(".menuItem").addClass("selected");
}

function callSubMenuAjax(E, D, B) {
    var A = $("#arr_" + E + "_" + D).position();
    if (typeof A != "undefined") {
        $("#child_" + E + "_" + B + "_" + D).html('<span class="processing"></span>').css({
            "top": A.top,
            "left": A.left + 20,
            "position": "absolute",
            "min-height": "21px"
        });
    }
    var C = $("#child_" + E).parent("div").attr("id");
    if (C == undefined) {
        C = "main";
    }
    if (!isCacheSupports || (typeof localStorage[basePath + "_menu_" + "child_" + E + "_" + B + "_" + D] == "undefined")) {
        callAjaxByObj({
            "url": "/base/buildSubMenu/" + E,
            "resp": afterBuildSubMenu(E, D, C, B)
        });
    } else {
        setMenuFromCache("child_" + E + "_" + B + "_" + D, D);
    }
}

function afterBuildMenu() {
    return function(A) {
        appendMenu(A, "menuId", "main", "main");
    };
}

function afterBuildSubMenu(D, C, B, A) {
    return function(E) {
        appendMenu(E, "child_" + D, C, B, A);
    };
}

function openUserDropDown(B) {
    var A = "";
    A += '<div class="profPopDiv">';
    A += '	<div class="profPopDataDiv">';
    A += '		<ul class="profPopUl">';
    A += '			<li class="profPopLi" onclick="gotoProfileChange();" title="Change Your Profile Settings">Settings</li>';
    A += '			<li class="profPopLi" onclick="logOut();" title="Logout">Logout</li>';
    A += "		</ul>";
    A += "	</div>";
    A += "</div>";
    $(".role_tab_div").removeClass("open");
    $(".uploadNotification").hide();
    openDropDownHtml(A, {
        "pos": "right"
    }, $(B));
}

function gotoProfileChange() {
    window.top.location.href = basePath + "/base/myProfile";
}

function logOut() {
    if (isCacheSupports) {
        localStorage.clear();
    }
    callAjaxByObj({
        "url": "/login/logout",
        "type": "POST",
        "resp": afterLogout(),
        "error": afterLogoutErr()
    });
}

function changeRole(B, A) {
    var C = {
        "ok": "okRoleChangeConfirm(" + B + ")",
        "confirmStr": "Are you sure you want to change your role to " + A + "?"
    };
    openConfirmPopup(C);
}

function changeLocation(B, C) {
    var A = {
        "ok": "okLocationChangeConfirm(" + B + ")",
        "confirmStr": "Are you sure you want to change your Location Mode to " + C + "?"
    };
    openConfirmPopup(A);
}

function okRoleChangeConfirm(A) {
    showProgressBar();
    if (isCacheSupports) {
        localStorage.clear();
    }
    callAjaxByObj({
        "url": "/base/changeUserRole/" + A,
        "type": "POST",
        "resp": afterChangeRole(),
        "error": afterChangeRoleErr()
    });
}

function okLocationChangeConfirm(A) {
    showProgressBar();
    callAjaxByObj({
        "url": "/base/changeRoleLocation/" + A,
        "type": "POST",
        "resp": afterChangeLoc()
    });
}

function afterChangeRole() {
    return function(A) {
        setTimeout("goToNewDashBoard('" + A + "');", 1000);
    };
}

function afterChangeRoleErr() {
    return function() {
        hideProgressBar();
        $("#role_tab").click();
    };
}

function afterChangeLoc() {
    return function(A) {
        setTimeout("goToNewDashBoard('" + A + "');", 1000);
    };
}

function goToNewDashBoard(A) {
    hideProgressBar();
    window.location = basePath + A;
}