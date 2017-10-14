// 辅助js
var delay = function(selector, func){  
    if($(selector).length>0){  
        func();  
        return;  
    }  
    else{
		setTimeout(function(){delay(selector, func)}, 100)
	}  
}  
  