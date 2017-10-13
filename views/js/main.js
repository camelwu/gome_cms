var nav = document.getElementById('nav');
var navBtns = nav.getElementsByTagName('span');
var contentBox = document.getElementById('contentBox');
var platform = window.location.href.split('#')[1];
if(platform){
	if(platform == "w"){
		for (var j = 0; j < contentBox.children.length; j++) {
			ecui.dom.removeClass(contentBox.children[j],'show');
			ecui.dom.removeClass(contentBox.children[j],'hide');
			ecui.dom.addClass(contentBox.children[j],'hide');
		}
		for (var q = 0; q < navBtns.length; q++) {
			ecui.dom.removeClass(navBtns[q],'active');
		}
		ecui.dom.addClass(contentBox.children[0],'show');
		ecui.dom.addClass(navBtns[0],'active');
	}else if(platform == "m"){
		for (var j = 0; j < contentBox.children.length; j++) {
			ecui.dom.removeClass(contentBox.children[j],'show');
			ecui.dom.removeClass(contentBox.children[j],'hide');
			ecui.dom.addClass(contentBox.children[j],'hide');
		}
		for (var q = 0; q < navBtns.length; q++) {
			ecui.dom.removeClass(navBtns[q],'active');
		}
		ecui.dom.addClass(contentBox.children[1],'show');
		ecui.dom.addClass(navBtns[1],'active');
	}else if(platform == "a"){
		for (var j = 0; j < contentBox.children.length; j++) {
			ecui.dom.removeClass(contentBox.children[j],'show');
			ecui.dom.removeClass(contentBox.children[j],'hide');
			ecui.dom.addClass(contentBox.children[j],'hide');
		}
		for (var q = 0; q < navBtns.length; q++) {
			ecui.dom.removeClass(navBtns[q],'active');
		}
		ecui.dom.addClass(contentBox.children[2],'show');
		ecui.dom.addClass(navBtns[2],'active');
	}else if(platform == "i"){
		for (var j = 0; j < contentBox.children.length; j++) {
			ecui.dom.removeClass(contentBox.children[j],'show');
			ecui.dom.removeClass(contentBox.children[j],'hide');
			ecui.dom.addClass(contentBox.children[j],'hide');
		}
		for (var q = 0; q < navBtns.length; q++) {
			ecui.dom.removeClass(navBtns[q],'active');
		}
		ecui.dom.addClass(contentBox.children[3],'show');
		ecui.dom.addClass(navBtns[3],'active');
	}
}else{
    window.onload=function(){

        for (var i = 0; i < navBtns.length; i++) {
            (function(i){
                navBtns[i].onclick = function(){
                    for (var j = 0; j < contentBox.children.length; j++) {
                        ecui.dom.removeClass(contentBox.children[j],'show');
                        ecui.dom.removeClass(contentBox.children[j],'hide');
                        ecui.dom.addClass(contentBox.children[j],'hide');
                    }
                    for (var q = 0; q < navBtns.length; q++) {
                        ecui.dom.removeClass(navBtns[q],'active');
                    }
                    ecui.dom.addClass(contentBox.children[i],'show');
                    ecui.dom.addClass(this,'active');
                }
            })(i)
        }
    };
}
