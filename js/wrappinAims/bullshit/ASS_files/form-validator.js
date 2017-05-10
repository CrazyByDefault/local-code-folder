var apFormValidateTypes 					= {};
var appFormValidateAddrContInd				= true;
apFormValidateTypes.ALPHABET 				= /^[A-Za-z .]+$/;
apFormValidateTypes.ALPHANUMERIC 			= /^[A-Za-z0-9]+$/;
apFormValidateTypes.ALPHABETWITHSPECIAL		= /^[A-Za-z ._^%$#!~*:@&?\[\]\{\}'";|><,-\\+()\n]+$/;
apFormValidateTypes.ALPHANUMERICWITHSPECIAL	= /^[A-Za-z0-9 ._^%$#!~*:@&?\[\]\{\}'";|><,-\\+()\n]+$/;
apFormValidateTypes.NUMERICWITHSPECIAL		= /^[0-9 ._^%$#!~*:@&?\[\]\{\}'";|><,-\\+()\n]+$/;
apFormValidateTypes.POSITIVEINTEGER 		= /^[0-9]*[1-9][0-9]*$/;
apFormValidateTypes.WHOLENUMBER 			= /^[0-9]*[0-9][0-9]*$/;
apFormValidateTypes.INTEGER 				= /^[-]?[0-9()]+$/;
apFormValidateTypes.FLOAT 					= /^[-]?\d*\.?\d*$/;
apFormValidateTypes.EMAIL 					= /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
apFormValidateTypes.MOBILE 					= /^[0-9]{10,14}$/;
apFormValidateTypes.TELEPHONE				= /^[0-9-]{10,14}$/;

var appFormValidatorObj = {};
$(function() {
	$(".invalid").click(function() {
		$(this).removeClass("invalid");
	});
	if(Object.keys(appFormValidatorObj).length === 0) {
		callAjaxByObj({
			"url" 	: "/valueSet/getErrorMessages", 
			"resp" 	: afterLoadAppFormValidatorData()
		});
	}
});

function bindFormToButton(validationParams) {
	var fVChanged = $(".valueset").change();
	for(var i in validationParams) {
		var actItem 	= validationParams[i];
		var item 		= JSON.parse(JSON.stringify(actItem));
		if(typeof item.format != "undefined" && item.format == "") {
			delete item.format;
		}
		var value 		= $.trim($("#"+item.id).val());
		var operatorStr = item.operator;
		var valMapObj	= {"caption" : item.caption};
		var valueSetId	= $("#"+item.id).data("gvaluesetId");
		var valueSetData;
		var actValue 	= value;

		var hasValueset	= ($("#"+item.id).hasClass("gvalueset") && (typeof gValueSetMapObj != "undefined") && (valueSetId != undefined));
		if(typeof item.value != "undefined") {
			value = item.value;
		} else {
			item.value = value;
		}
		if(typeof item.type == "undefined" || item.type == "DATE") {
			item.type = "NOVALIDATION";
		}
		if(typeof item.encryptInd == "undefined") {
			item.encryptInd = false;
		}
		
		if (hasValueset) {
			item 			= gPrepareValidationObjByValueSetId(item, valueSetId);
			value 			= item.value;
			actValue		= item.actValue;
			valueSetData 	= gValueSetMapObj[valueSetId];
		}
		var regx 		= apFormValidateTypes[item.type];
		var valueLenth 	= $.trim(value).length;
		if(item.type == "FLOAT" && value != "") {
			valueLenth = value.split(".")[0].length;
		}
		var isNot 		= item.isNot;
		value 		= String(value);
		if(typeof isNot != "undefined" && (isNot == value+"")) {
			if(item.required) {
				return showError(item, appFormValidatorObj.emptySelect, valMapObj, actItem);
			}
		} else {
			if(typeof item.minLen != "undefined" && valueLenth != 0 && item.minLen > valueLenth) {
				valMapObj.size 		= item.minLen;
				valMapObj.actSize 	= valueLenth;
				return showError(item, appFormValidatorObj.minLength, valMapObj, actItem);
			}
			if(typeof item.maxLen != "undefined" && item.maxLen != 0 && item.maxLen < valueLenth) {
				valMapObj.size 		= item.maxLen;
				valMapObj.actSize 	= valueLenth;
				return showError(item, appFormValidatorObj.maxLength, valMapObj, actItem);
			}
		}
		if(item.component == "checkbox") {
			if($("input."+item.className+"[checked='checked']").length < item.minItems) {
				valMapObj.min = item.minItems;
				return showError(item, appFormValidatorObj.multiMin, valMapObj, actItem);
			}
			continue;
		}
		if(item.component == "radio" && item.required) {
			if(!$("#"+item.id).is(":checked")) {
				return showError(item, appFormValidatorObj.emptySelect, valMapObj, actItem);
			}
			continue;
		}
		if(item.component == "date") {
			if(item.required && value == "") {
				return showError(item, appFormValidatorObj.empty, valMapObj, actItem);
			}
			var itemCompareCaption 	= item.compareCaption;
			var itemCompareVal 		= item.compareVal;
			var egDate 				= item.egDate;
			if(typeof itemCompareVal == 'undefined') {
				itemCompareVal = $(item.compareComponent).val();
			}
			itemCompareVal = $.trim(String(itemCompareVal));
			if(typeof itemCompareCaption == 'undefined') {
				itemCompareCaption = itemCompareVal;
			}
			if(typeof item.format == "undefined") {
				item.format = defaultDate;
			}
			if(typeof egDate == "undefined") {
				egDate = currentDate;
			}
			var dateValueObj;
			try {
				dateValueObj = $.datepicker.parseDate(item.format, value);
				if((dateValueObj == null && value != "") || 
						value != $.datepicker.formatDate(item.format, dateValueObj)) {
					valMapObj.example = egDate;
					return showError(item, appFormValidatorObj.format, valMapObj, actItem);
				}
			} catch(e) {
				valMapObj.example = egDate;
				return showError(item, appFormValidatorObj.format, valMapObj, actItem);
			}
			if(	typeof operatorStr != "undefined" && valueLenth != 0 && 
				itemCompareVal != "" && itemCompareVal != null && itemCompareVal != "undefined") {
				
				var compareObj = $.datepicker.parseDate(item.format, itemCompareVal);
				if(operatorStr == "eq") {
					if(dateValueObj.getTime() != compareObj.getTime()) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.eq, valMapObj, actItem);
					}
				}
				if(operatorStr == "lt") {
					if(dateValueObj.getTime() >= compareObj.getTime()) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.lt, valMapObj, actItem);
					}
				}
				if(operatorStr == "le") {
					if(dateValueObj.getTime() > compareObj.getTime()) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.le, valMapObj, actItem);
					}
				}
				if(operatorStr == "gt") {
					if(dateValueObj.getTime() <= compareObj.getTime()) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.gt, valMapObj, actItem);
					}
				}
				if(operatorStr == "ge") {
					if(dateValueObj.getTime() < compareObj.getTime()) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.ge, valMapObj, actItem);
					}
				}
				if(operatorStr == "in") {
					var j;
					for(j = 0 ; j < item.compareVals.length; j++) {
						var inCompareObj = $.datepicker.parseDate(item.format, item.compareVals[j]);
						if(dateValueObj.getTime() == inCompareObj.getTime()) {
							break;
						}
					}
					if(j == item.compareVals.length) {
						valMapObj.value = item.compareVals;
						return showError(item, appFormValidatorObj.inn, valMapObj, actItem);
					}
				}
				/*if(operatorStr == "diff") {
					var compareObj = $.datepicker.parseDate(item.format, itemCompareVal);
					if(item.diffTypes == "days" ) {
						var diff = Math.floor((compareObj.getTime() - dateValueObj.getTime())/86400000);// ms per day
						
						if(item.operatorDiff == "le") {
							if(diff > (parseInt(item.dtDiffVal)+1)) {
								return showError(item, "Please maintain the difference between "+caption+" and " +
										"'"+itemCompareCaption+"' not more than '"+item.dtDiffVal+"' days");
							}
						}
					}
				}*/
			}
			continue;
		}
		if(item.component == "time") {
			if(item.required && value == "") {
				return showError(item, appFormValidatorObj.empty, valMapObj, actItem);
			}
			var itemCompareCaption = item.compareCaption;
			var itemCompareVal = item.compareVal;
			var egTime = item.egTime;
			if(typeof itemCompareVal == 'undefined') {
				itemCompareVal = $(item.compareComponent).val();
			}
			itemCompareVal = $.trim(String(itemCompareVal));
			if(typeof itemCompareCaption == 'undefined') {
				itemCompareCaption = itemCompareVal;
			}
			if(typeof item.format == "undefined") {
				item.format = defaultTime;
			}
			if(typeof egTime == "undefined") {
				egTime = currentTime;
			}
			var timeArr = value.split(":");
			var timeHr 	= 0;
			var timeMin = 0;
			if(timeArr.length == 2) {
				timeHr 	= parseInt(timeArr[0], 10);
				timeMin = parseInt(timeArr[1], 10);
				if((timeHr > 23 || timeMin > 59) && value != "") {
					valMapObj.example = egTime;
					return showError(item, appFormValidatorObj.format, valMapObj, actItem);
				}
			} else if(value != ""){
				valMapObj.example = egTime;
				return showError(item, appFormValidatorObj.format, valMapObj, actItem);
			}
			if(	typeof operatorStr != "undefined" && valueLenth != 0 && 
				itemCompareVal != "" && itemCompareVal != null && itemCompareVal != "undefined") {

				var cmpTimeArr 	= itemCompareVal.split(":");
				var cmpTmeHr 	= 0;
				var cmpTimeMin 	= 0;
				
				cmpTmeHr 	= parseInt(cmpTimeArr[0], 10);
				cmpTimeMin 	= parseInt(cmpTimeArr[1], 10);
				
				if(operatorStr == "eq") {
					if((timeHr != cmpTmeHr) || (timeMin != cmpTimeMin)) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.eq, valMapObj, actItem);
					}
				}
				if(operatorStr == "lt") {
					if(timeHr > cmpTmeHr) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.lt, valMapObj, actItem);
					} else {
						if(timeHr == cmpTmeHr) {
							if(timeMin >= cmpTimeMin) {
								valMapObj.value = itemCompareCaption;
								return showError(item, appFormValidatorObj.lt, valMapObj, actItem);
							}
						}
					}
				}
				if(operatorStr == "le") {
					if(timeHr > cmpTmeHr) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.le, valMapObj, actItem);
					} else {
						if(timeHr == cmpTmeHr) {
							if(timeMin > cmpTimeMin) {
								valMapObj.value = itemCompareCaption;
								return showError(item, appFormValidatorObj.le, valMapObj, actItem);
							}
						}
					}
				}
				if(operatorStr == "gt") {
					if(timeHr < cmpTmeHr) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.gt, valMapObj, actItem);
					} else {
						if(timeHr == cmpTmeHr) {
							if(timeMin <= cmpTimeMin) {
								valMapObj.value = itemCompareCaption;
								return showError(item, appFormValidatorObj.gt, valMapObj, actItem);
							}
						}
					}
				}
				if(operatorStr == "ge") {
					if(timeHr < cmpTmeHr) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.ge, valMapObj, actItem);
					} else {
						if(timeHr == cmpTmeHr) {
							if(timeMin < cmpTimeMin) {
								valMapObj.value = itemCompareCaption;
								return showError(item, appFormValidatorObj.ge, valMapObj, actItem);
							}
						}
					}
				}
				if(operatorStr == "in") {
					var j;
					for(j = 0 ; j < item.compareVals.length; j++) {
						var inCmpTimeArr 	= item.compareVals[j].split(":");
						var inCmpTmeHr 		= 0;
						var inCmpTimeMin 	= 0;
						
						inCmpTmeHr 		= parseInt(inCmpTimeArr[0], 10);
						inCmpTimeMin 	= parseInt(inCmpTimeArr[1], 10);
						if((timeHr == inCmpTmeHr) && (timeMin == inCmpTimeMin)) {
							break;
						}
					}
					if(j == item.compareVals.length) {
						valMapObj.value = item.compareVals;
						return showError(item, appFormValidatorObj.inn, valMapObj, actItem);
					}
				}
			}
			continue;
		}
		if(item.component == "datetime") {
			if(item.required && value == "") {
				return showError(item, appFormValidatorObj.empty, valMapObj, actItem);
			}
			var itemCompareCaption 	= item.compareCaption;
			var itemCompareVal 		= item.compareVal;
			var egDateTime 			= item.egDateTime;
			if(typeof itemCompareVal == 'undefined') {
				itemCompareVal = $(item.compareComponent).val();
			}
			itemCompareVal = $.trim(String(itemCompareVal));
			if(typeof itemCompareCaption == 'undefined') {
				itemCompareCaption = itemCompareVal;
			}
			if(typeof item.format == "undefined") {
				item.format = defaultDate;
			}
			if(typeof egDateTime == "undefined") {
				egDateTime = currentDateTime;
			}
			var valArr = value.split(" ");
			var dateValueObj;
			if(value != "") {
				var timeVal = valArr[valArr.length - 1];
				var dateVal = value.substr(0, value.lastIndexOf(timeVal) - 1);
				try {
					dateValueObj = $.datepicker.parseDate(item.format, dateVal);
					if((dateValueObj == null && value != "") || 
							dateVal != $.datepicker.formatDate(item.format, dateValueObj)) {
						valMapObj.example = egDateTime;
						return showError(item, appFormValidatorObj.format, valMapObj, actItem);
					}
				} catch(e) {
					valMapObj.example = egDateTime;
					return showError(item, appFormValidatorObj.format, valMapObj, actItem);
				}
				var timeArr = timeVal.split(":");
				var timeHr 	= 0;
				var timeMin = 0;
				if(timeArr.length == 2) {
					timeHr 	= parseInt(timeArr[0], 10);
					timeMin = parseInt(timeArr[1], 10);
					if((timeHr > 23 || timeMin > 59) && value != "") {
						valMapObj.example = egDateTime;
						return showError(item, appFormValidatorObj.format, valMapObj, actItem);
					}
				} else if(value != ""){
					valMapObj.example = egDateTime;
					return showError(item, appFormValidatorObj.format, valMapObj, actItem);
				}
			}
			if(	typeof operatorStr != "undefined" && valueLenth != 0 && 
				itemCompareVal != "" && itemCompareVal != null && itemCompareVal != "undefined") {
				
				var cmpValArr = itemCompareVal.split(" ");
				var cmpTimeVal = cmpValArr[cmpValArr.length - 1];
				var cmpDateVal = itemCompareVal.substr(0, itemCompareVal.lastIndexOf(cmpTimeVal) - 1);
				
				var compareObj = $.datepicker.parseDate(item.format, cmpDateVal);
				
				var cmpTimeArr 	= cmpTimeVal.split(":");
				var cmpTmeHr 	= 0;
				var cmpTimeMin 	= 0;
				
				cmpTmeHr 	= parseInt(cmpTimeArr[0], 10);
				cmpTimeMin 	= parseInt(cmpTimeArr[1], 10);
				
				if(operatorStr == "eq") {
					if((dateValueObj.getTime() != compareObj.getTime()) || (timeHr != cmpTmeHr) || (timeMin != cmpTimeMin)) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.eq, valMapObj, actItem);
					}
				}
				if(operatorStr == "lt") {
					if(dateValueObj.getTime() > compareObj.getTime()) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.lt, valMapObj, actItem);
					} else {
						if(dateValueObj.getTime() == compareObj.getTime()) {
							if(timeHr > cmpTmeHr) {
								valMapObj.value = itemCompareCaption;
								return showError(item, appFormValidatorObj.lt, valMapObj, actItem);
							} else {
								if(timeHr == cmpTmeHr) {
									if(timeMin >= cmpTimeMin) {
										valMapObj.value = itemCompareCaption;
										return showError(item, appFormValidatorObj.lt, valMapObj, actItem);
									}
								}
							}
						}
					}
				}
				if(operatorStr == "le") {
					if(dateValueObj.getTime() > compareObj.getTime()) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.le, valMapObj, actItem);
					} else {
						if(dateValueObj.getTime() == compareObj.getTime()) {
							if(timeHr > cmpTmeHr) {
								valMapObj.value = itemCompareCaption;
								return showError(item, appFormValidatorObj.le, valMapObj, actItem);
							} else {
								if(timeHr == cmpTmeHr) {
									if(timeMin > cmpTimeMin) {
										valMapObj.value = itemCompareCaption;
										return showError(item, appFormValidatorObj.le, valMapObj, actItem);
									}
								}
							}
						}
					}
				}
				if(operatorStr == "gt") {
					if(dateValueObj.getTime() < compareObj.getTime()) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.gt, valMapObj, actItem);
					} else {
						if(dateValueObj.getTime() == compareObj.getTime()) {
							if(timeHr < cmpTmeHr) {
								valMapObj.value = itemCompareCaption;
								return showError(item, appFormValidatorObj.gt, valMapObj, actItem);
							} else {
								if(timeHr == cmpTmeHr) {
									if(timeMin <= cmpTimeMin) {
										valMapObj.value = itemCompareCaption;
										return showError(item, appFormValidatorObj.gt, valMapObj, actItem);
									}
								}
							}
						}
					}
				}
				if(operatorStr == "ge") {
					if(dateValueObj.getTime() < compareObj.getTime()) {
						valMapObj.value = itemCompareCaption;
						return showError(item, appFormValidatorObj.ge, valMapObj, actItem);
					} else {
						if(dateValueObj.getTime() == compareObj.getTime()) {
							if(timeHr < cmpTmeHr) {
								valMapObj.value = itemCompareCaption;
								return showError(item, appFormValidatorObj.ge, valMapObj, actItem);
							} else {
								if(timeHr == cmpTmeHr) {
									if(timeMin < cmpTimeMin) {
										valMapObj.value = itemCompareCaption;
										return showError(item, appFormValidatorObj.ge, valMapObj, actItem);
									}
								}
							}
						}
					}
				}
				if(operatorStr == "in") {
					var j;
					for(j = 0 ; j < item.compareVals.length; j++) {
						
						var inCmpValArr = item.compareVals[j].split(" ");
						var inCmpTimeVal = inCmpValArr[inCmpValArr.length - 1];
						var inCmpDateVal = item.compareVals[j].substr(0, item.compareVals[j].lastIndexOf(inCmpTimeVal) - 1);
						
						var inCmpTimeArr 	= item.inCmpTimeVal.split(":");
						var inCmpTmeHr 		= 0;
						var inCmpTimeMin 	= 0;
						
						inCmpTmeHr 		= parseInt(inCmpTimeArr[0], 10);
						inCmpTimeMin 	= parseInt(inCmpTimeArr[1], 10);
						
						var inCompareObj = $.datepicker.parseDate(item.format, inCmpDateVal);
						if((dateValueObj.getTime() == inCompareObj.getTime()) && (timeHr == inCmpTmeHr) && (timeMin == inCmpTimeMin)) {
							break;
						}
					}
					if(j == item.compareVals.length) {
						valMapObj.value = item.compareVals;
						return showError(item, appFormValidatorObj.inn, valMapObj, actItem);
					}
				}
				/*if(operatorStr == "diff") {
					var compareObj = $.datepicker.parseDate(item.format, itemCompareVal);
					if(item.diffTypes == "days" ) {
						var diff = Math.floor((compareObj.getTime() - dateValueObj.getTime())/86400000);// ms per day
						
						if(item.operatorDiff == "le") {
							if(diff > (parseInt(item.dtDiffVal)+1)) {
								return showError(item, "Please maintain the difference between "+caption+" and " +
										"'"+itemCompareCaption+"' not more than '"+item.dtDiffVal+"' days");
							}
						}
					}
				}*/
			}
			continue;
		}
		if(item.component == "address") {
			appFormValidateAddrContInd = true;
			var addrDataCount = $("#"+item.id).data("reqAddrCount");
			if(addrDataCount != null && addrDataCount != "") {
				checkGetReqAddrContCount(item.addrLength, addrDataCount);
			} else {
				if(typeof item.partyId == "undefined") {
					callAjaxByObj({	
						"url" 	: "/party/getReqAddrCount/"+item.partyTypeId+"?encryptInd=" + item.encryptInd,
						"async" : false,
						"resp" 	: afterGetReqAddrContCount(item.id, item.addrLength, "addr")});
				} else {
					callAjaxByObj({	
						"url" 	: "/party/getReqAddrCount/"+item.partyId+"/"+item.partyTypeId+"?encryptInd=" + item.encryptInd,
						"async" : false,
						"resp" 	: afterGetReqAddrContCount(item.id, 1, "addr")});
				}
			}
			if(!appFormValidateAddrContInd) {
				$("#"+item.id).addClass("invalid");
				return showError(item, appFormValidatorObj.empty, valMapObj, actItem);
			}
		}
		if(item.component == "contact") {
			appFormValidateAddrContInd = true;
			var contDataCount = $("#"+item.id).data("reqContCount");
			if(contDataCount != null && contDataCount != "") {
				checkGetReqAddrContCount(item.contLength, contDataCount);
			} else {
				if(typeof item.partyId == "undefined") {
					callAjaxByObj({	
						"url" 	: "/party/getReqContactCount/"+item.partyTypeId+"?encryptInd=" + item.encryptInd,
						"async" : false,
						"resp" 	: afterGetReqAddrContCount(item.id, item.contLength, "cont")});
				} else {
					callAjaxByObj({	
						"url" 	: "/party/getReqContactCount/"+item.partyId+"/"+item.partyTypeId+"?encryptInd=" + item.encryptInd,
						"async" : false,
						"resp" 	: afterGetReqAddrContCount(item.id, 1, "cont")});
				}
			}
			if(!appFormValidateAddrContInd) {
				$("#"+item.id).addClass("invalid");
				return showError(item, appFormValidatorObj.empty, valMapObj, actItem);
			}
		}
		if(item.component == "contactPerson") {
			appFormValidateAddrContInd = true;
			var contPersonDataCount = $("#"+item.id).data("reqContPersonCount");
			if(contPersonDataCount != null && contPersonDataCount != "") {
				checkGetReqAddrContCount(item.contPersonLength, contPersonDataCount);
			} else {
				if(typeof item.partyId == "undefined") {
					callAjaxByObj({	
						"url" 	: "/party/getReqContactPersonCount/"+item.partyTypeId+"?encryptInd=" + item.encryptInd,
						"async" : false,
						"resp" 	: afterGetReqAddrContCount(item.id, item.contPersonLength, "contPerson")});
				} else {
					callAjaxByObj({	
						"url" 	: "/party/getReqContactPersonCount/"+item.partyId+"/"+item.partyTypeId+"?encryptInd=" + item.encryptInd,
						"async" : false,
						"resp" 	: afterGetReqAddrContCount(item.id, 1, "contPerson")});
				}
			}
			if(!appFormValidateAddrContInd) {
				$("#"+item.id).addClass("invalid");
				return showError(item, appFormValidatorObj.empty, valMapObj, actItem);
			}
		}
		if(valueLenth != 0) {
			if(item.type == "NOVALIDATION" && typeof operatorStr == "undefined") {
				continue;
			}
			if(typeof regx != "undefined" && !regx.test(value)) {
				if(item.type == "ALPHABET") {
					return showError(item, appFormValidatorObj.alphabet, valMapObj, actItem);
				} else if(item.type == "ALPHANUMERIC") {
					return showError(item, appFormValidatorObj.alphanumeric, valMapObj, actItem);
				} else if(item.type == "ALPHABETWITHSPECIAL") {
					return showError(item, appFormValidatorObj.alphabetWithSpl, valMapObj, actItem);
				} else if(item.type == "ALPHANUMERICWITHSPECIAL") {
					return showError(item, appFormValidatorObj.alphanumericWithSpl, valMapObj, actItem);
				} else if(item.type == "NUMERICWITHSPECIAL") {
					return showError(item, appFormValidatorObj.numericWithSpl, valMapObj, actItem);
				} else if(item.type == "POSITIVEINTEGER") {
					return showError(item, appFormValidatorObj.positiveInt, valMapObj, actItem);
				}  else if(item.type == "WHOLENUMBER") {
					return showError(item, appFormValidatorObj.wholeNum, valMapObj, actItem);
				} else if(item.type == "INTEGER") {
					return showError(item, appFormValidatorObj.int, valMapObj, actItem);
				} else if(item.type == "FLOAT") {
					return showError(item, appFormValidatorObj.float, valMapObj, actItem);
				} else if(item.type == "EMAIL") {
					return showError(item, appFormValidatorObj.email, valMapObj, actItem);
				} else if(item.type == "MOBILE") {
					return showError(item, appFormValidatorObj.mobile, valMapObj, actItem);
				} else if(item.type == "TELEPHONE") {
					return showError(item, appFormValidatorObj.telephone, valMapObj, actItem);
				}
			} else if(item.type == "FLOAT") {
				var formatStr = item.format;
				if(value == "." || value == "-" || value == "-.") {
					return showError(item, appFormValidatorObj.float, valMapObj, actItem);
				}
				if(typeof formatStr != "undefined") {
					var valueFloatArr = value.split(".");
					var formatFloatArr = formatStr.split(",");
					if(valueFloatArr.length > 2) {
						valMapObj.example = formatStr;
						return showError(item, appFormValidatorObj.format, valMapObj, actItem);
					} else if(valueFloatArr.length == 2) {
						if(parseInt(formatFloatArr[0], 10) < valueFloatArr[0].length) {
							valMapObj.example = formatStr;
							return showError(item, appFormValidatorObj.format, valMapObj, actItem);
						} else if(parseInt(formatFloatArr[1], 10) < valueFloatArr[1].length) {
							valMapObj.example = formatStr;
							return showError(item, appFormValidatorObj.format, valMapObj, actItem);
						}
					} else if(valueFloatArr.length == 1) {
						if(parseInt(formatFloatArr[0], 10) < valueFloatArr[0].length) {
							valMapObj.example = formatStr;
							return showError(item, appFormValidatorObj.format, valMapObj, actItem);
						}
					}
				}
			}
		} else if(item.required) {
			return showError(item, appFormValidatorObj.empty, valMapObj, actItem);
		}
		if(typeof operatorStr != "undefined") {
			var itemVal = value;
			var itemCompareCaption = item.compareCaption;
			var itemCompareVal = item.compareVal;
			if(typeof itemCompareVal == 'undefined') {
				itemCompareVal = $(item.compareComponent).val();
			}
			itemCompareVal = String(itemCompareVal);
			if(typeof itemCompareCaption == 'undefined') {
				itemCompareCaption = itemCompareVal;
			}
			if(itemCompareVal == "" || itemCompareVal == null) {
				continue;
			}
			if(item.type == "POSITIVEINTEGER" || item.type == "WHOLENUMBER" || item.type == "INTEGER") {
				itemVal = parseInt(actValue, 10);
				itemCompareVal = parseInt(itemCompareVal, 10);
			} else if(item.type == "FLOAT"){
				itemVal = parseFloat(actValue);
				itemCompareVal = parseFloat(itemCompareVal);
			}
			
			if(operatorStr == "eq") {
				if((itemVal != itemCompareVal) && itemCompareVal != "" && itemCompareVal != null && itemCompareVal != "undefined") {
					valMapObj.value = itemCompareCaption;
					return showError(item, appFormValidatorObj.eq, valMapObj, actItem);
				}
			}
			if(operatorStr == "ne") {
				if((itemVal == itemCompareVal) && itemCompareVal != "" && itemCompareVal != null && itemCompareVal != "undefined") {
					valMapObj.value = itemCompareCaption;
					return showError(item, appFormValidatorObj.ne, valMapObj, actItem);
				}
			}
			if(operatorStr == "in") {
				var j;
				for(j = 0; j < item.compareVals.length; j++) {
					if(itemVal == item.compareVals[j]) {
						break;
					}
				}
				if((j == item.compareVals.length) && itemCompareVal != "" && itemCompareVal != null && itemCompareVal != "undefined") {
					valMapObj.value = item.compareVals;
					return showError(item, appFormValidatorObj.inn, valMapObj, actItem);
				}
			}
			if(operatorStr == "lt") {
				if(itemVal >= itemCompareVal) {
					valMapObj.value = itemCompareCaption;
					return showError(item, appFormValidatorObj.lt, valMapObj, actItem);
				}
			}
			if(operatorStr == "le") {
				if(itemVal > itemCompareVal) {
					valMapObj.value = itemCompareCaption;
					return showError(item, appFormValidatorObj.le, valMapObj, actItem);
				}
			}
			if(operatorStr == "gt") {
				if(itemVal <= itemCompareVal) {
					valMapObj.value = itemCompareCaption;
					return showError(item, appFormValidatorObj.gt, valMapObj, actItem);
				}
			}
			if(operatorStr == "ge") {
				if(itemVal < itemCompareVal) {
					valMapObj.value = itemCompareCaption;
					return showError(item, appFormValidatorObj.ge, valMapObj, actItem);
				}
			}
		}
	}
	gCloseBanner();
	return true;
}
function showError(item, msgObj, valMapObj, actItem) {
	var tempMsgObj = JSON.parse(JSON.stringify(msgObj));
	if((typeof item.showMsg == "undefined") || item.showMsg) {
		if(typeof item.msg != "undefined") {
			showErrorById(item.id, item.msg);
		} else {
			tempMsgObj.message = resolveMsgPlaceHolders(tempMsgObj.message, valMapObj);
			showMsg(tempMsgObj, item.id);
		}
	}
	if(typeof item.tabClass !="undefined") {
		changeTab(item.tabClass, item.tabContent);
	}
	$(".successDiv").hide(1, function() {
		setTimeout(function() {
			if(typeof item.focus != "undefined") {
				$(item.focus).focus();
			} else {
				$("#"+item.id).focus();
			}
		}, 10);
	});
	if(typeof actItem.errorMethod !="undefined") {
		actItem.msg = tempMsgObj.message;
		actItem.errorMethod(item);
	}
	return false;
}

function afterGetReqAddrContCount(id, currentLength, type) {
	return function(count) {
		if(type == "addr") {
			$("#"+id).data("reqAddrCount", count);
		} else if(type == "cont") {
			$("#"+id).data("reqContCount", count);
		} else {
			$("#"+id).data("reqContPersonCount", count);
		}
		return checkGetReqAddrContCount(currentLength, count);
	};
}

function checkGetReqAddrContCount(currentLength, count) {
	// It will be used in saving on page submit only
	if(currentLength < count) {
		appFormValidateAddrContInd = false;
	} else {
		appFormValidateAddrContInd = true;
	}
	return appFormValidateAddrContInd;
}

function emtySelRecord(addTo, checkOn, title) {
	if($(checkOn).size() == 0) {
		var htm = '<div class="emptySelRec emptySelRec'+title.replace(/ /g,'')+'">Click On Add '+title+' to add '+title+'</div>';
		$(addTo).append(htm);
	} else {
		$(addTo+" .emptySelRec"+title.replace(/ /g,'')).remove();
	}
}

function isOverLap(start1, end1, start2, end2) {
	end1 	= (end1 == "" ? infiniteDt : end1);
	end2 	= (end2 == "" ? infiniteDt : end2);
	start1 	= Date.parse($.datepicker.formatDate("dd M, yy", $.datepicker.parseDate(defaultDate, start1)));
	end1 	= Date.parse($.datepicker.formatDate("dd M, yy", $.datepicker.parseDate(defaultDate, end1)));
	start2 	= Date.parse($.datepicker.formatDate("dd M, yy", $.datepicker.parseDate(defaultDate, start2)));
	end2 	= Date.parse($.datepicker.formatDate("dd M, yy", $.datepicker.parseDate(defaultDate, end2)));
	return (!(start1 > end2) && !(start2 > end1));
}
function afterLoadAppFormValidatorData() {
	return function(resp) {
		appFormValidatorObj = resp;
	};
}

function findDuplicate(array){
	for(var i=0;i<array.length;i++){
		for(var j=i;j<array.length;j++){
			if(i!=j){
				if(array[i]==array[j] ){
					return false;
				}
			}
		}
	}
	return true;
}
function findDuplicate1(array, item, caption) {
	var item1 = {};
	var item2 = {};
	var j = 0;
	for(var i=0;i < array.length;i++) {
		item1 = array[i];
		for(j = i+1;j < array.length;j++){
			item2 = array[j];
			if(item1.val == item2.val) {
				return showMsg(duplicateMsg, item2.id, {"item" : item,
					"caption" : caption});
			}
		}
	}
	return true;
}
function findDuplicate2(array, items) {
	var item1 = {};
	var item2 = {};
	var j = 0;
	for(var i=0;i < array.length;i++) {
		item1 = array[i];
		for(j = i+1;j < array.length;j++){
			item2 = array[j];
			if(item1.val == item2.val) {
				return showMsg(duplicateMsg, item2.id, items);
			}
		}
	}
	return true;
}
function gPrepareValidationObjByValueSetId(validationObj, valueSetId) {
	var valueSetData = gValueSetMapObj[valueSetId];
	if(valueSetData.dataTypeId == gValueSetConstants.dataType.date) {
		if(valueSetData.validationTypeId != gValueSetConstants.validationType.table) {
			if(valueSetData.valueTypeId == gValueSetConstants.valueType.date) {
				validationObj.component = "date";
				validationObj.format 	= valueSetData.jsFormatCd;
			} else if(valueSetData.valueTypeId == gValueSetConstants.valueType.time) {
				validationObj.component = "time";
			} else if(valueSetData.valueTypeId == gValueSetConstants.valueType.timestamp) {
				validationObj.component = "datetime";
				var format 	= valueSetData.jsFormatCd;
				if(format.indexOf("hh") != -1) {
					format = format.substr(0, format.length - 6);
				} else {
					validationObj.component = "date";
				}
				validationObj.format = format;
			}
		}
	} else if(valueSetData.dataTypeId == gValueSetConstants.dataType.string) {
		validationObj.maxLen = valueSetData.maxSize;
		if(valueSetData.valueTypeId == gValueSetConstants.valueType.alphanumeric) {
			validationObj.type 	= "ALPHANUMERIC";
		} else if(valueSetData.valueTypeId == gValueSetConstants.valueType.alphabetwithspecial) {
			validationObj.type 	= "ALPHABETWITHSPECIAL";
		} else if(valueSetData.valueTypeId == gValueSetConstants.valueType.alphabetnumericwithspecial) {
			validationObj.type 	= "ALPHANUMERICWITHSPECIAL";
		} else if(valueSetData.valueTypeId == gValueSetConstants.valueType.alphabet) {
			validationObj.type 	= "ALPHABET";
		} else if(valueSetData.valueTypeId == gValueSetConstants.valueType.numericwithspecial) {
			validationObj.type 	= "NUMERICWITHSPECIAL";
		} else if(valueSetData.valueTypeId == gValueSetConstants.valueType.email) {
			validationObj.type 	= "EMAIL";
		} else if(valueSetData.valueTypeId == gValueSetConstants.valueType.mobile) {
			validationObj.type 	= "MOBILE";
		} else if(valueSetData.valueTypeId == gValueSetConstants.valueType.phone) {
			validationObj.type 	= "TELEPHONE";
		}
	} else if(valueSetData.dataTypeId == gValueSetConstants.dataType.number) {
		validationObj.maxLen = valueSetData.maxSize;
		if(typeof valueSetData.dataFormatId == 'undefined') {
			valueSetData.dataFormatId = gValueSetConstants.dataFormat.f;
		}
		if(valueSetData.dataFormatId == gValueSetConstants.dataFormat.f) {
			var val = $.trim($("#"+validationObj.id).val().replace(/,/g , ""));
			validationObj.actValue 	= val;
			if(typeof validationObj.value != "undefined") {
				val = validationObj.value.replace(/,/g , "");
			}
/*			if(val != "") {
				val = val.split(".")[0];
			}*/
			validationObj.value 	= val;
			validationObj.format 	= valueSetData.maxSize+","+valueSetData.numberPrecision;
			validationObj.type 		= "FLOAT";
		} else if(valueSetData.dataFormatId == gValueSetConstants.dataFormat.n) {
			var val = $.trim($("#"+validationObj.id).val().replace(/,/g , ""));
			if(typeof validationObj.value != "undefined") {
				val = validationObj.value.replace(/,/g , "");
			}
/*			if(val != "") {
				val = val.split(".")[0];
			}*/
			validationObj.value 	= val;
			validationObj.format 	= valueSetData.maxSize+","+valueSetData.numberPrecision;
			validationObj.type 		= "FLOAT";
		} else if(valueSetData.dataFormatId == gValueSetConstants.dataFormat.d) {
			validationObj.type 	= "INTEGER";
		}
	}
	if(	valueSetData.validationTypeId == gValueSetConstants.validationType.table ||
		valueSetData.validationTypeId == gValueSetConstants.validationType.independent) {
		validationObj.isNot = "-1";
	}
	return validationObj;
}
function gFormattedValueByValueSetId(id) {
	var valueSetData 	= gValueSetMapObj[$("#"+id).data("gvaluesetId")];
	var value			= $("#"+id).val();
	if(valueSetData.dataTypeId == gValueSetConstants.dataType.number) {
		value = $.trim(value.replace(/,/g , ""));
	}
	return value;
}
