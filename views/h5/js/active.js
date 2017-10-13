/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-04 11:13:55
 * @version $Id$
 */
function ajax(options)
{
	options=options || {};
	if ( ! options.url)
	{
		return;
	}
	// 可选
	var data=options.data || {};
	var type=options.type || 'get';
	var ContentType;
	if(options.isJson){
		ContentType='application/json';
	}else{
		ContentType ='application/x-www-form-urlencoded';
	}
	if (window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	switch (type.toLowerCase())
	{
		case 'get':
			oAjax.open('get', options.url+'?'+json2url(data), true);
			oAjax.send();
			break;
			
		case 'post':
			oAjax.open('post', options.url, true);
			oAjax.setRequestHeader('Content-Type', ContentType);
			oAjax.setRequestHeader('clientOs','4');
			if(options.isJson){
				oAjax.send(JSON.stringify(options.data));
			}else{
				oAjax.send(json2url(data));
			}
			break;	
	}
	
	oAjax.onreadystatechange=function (){
		if (oAjax.readyState == 4)
		{
			if (oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				options.success && options.success(oAjax.responseText);
			}
			else
			{
				options.fail && options.fail(oAjax.status);
			}
		}
	};
}

function json2url(data)
{
	data['t']=Math.random();
	var arr=[];
	for (var name in data)
	{
		arr.push(name+'='+data[name]);
	}
	
	return arr.join('&');
}
//从url地址获取手机号及激活码
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
//清理空格
function trim(el){
    return el.value.replace(/(^\s*)|(\s*$)/g, ""); 
}

//错误信息提示框
function tipBox(stutas,str){
	if(errorBox.style.display=='none'|| errorBox.style.display==''){
		errorBox.style.display=stutas;
		errorBox.style.animation='4s errorOpacity ease';
		timer=setTimeout(function(){
			errorBox.style.animation='none';
			errorBox.style.display='none';
		},4000)
		errorMsg.innerHTML=str;
	}
}
//60秒后重发
function mesTime(btn){
	if(!btn.disabled){
		var nWait=60;
		btn.value=nWait + "秒";
		btn.className='send-textmsg';
	    btn.disabled=true;
	    var tick=setInterval(function(){
	    	nWait--;
	    	btn.value=nWait + "秒";
	    	if (nWait===0) {
		    	btn.className='get-textmsg';
		        btn.disabled = false;
		        btn.value="再次获取";
		        nWait=60;
		        clearInterval(tick);   
		    }
	    },1000)
    }
}

//点击获取验证码后的操作、右上角下一步的操作
function test(options){
	if(options.getMsg){
		if(!trim(phone) || ! (/^((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9]))\d{8}$/.test(trim(phone)))){
				tipBox('block','请输入正确的手机号');
		}else{
			ajax({
				"url" :'/v1/user/send_msg_captcha',
				"type" : 'post',
				"data" : {
					"mobile" : phone.value,
				},
				"success" :function(data){
					var json=JSON.parse(data);
					if(json.code==0){
						mesTime(options.btn)
					}else{
						tipBox('block',json.msg);
					}	
				},
				"fail" :function(){}

			})
		}
	}else{
		if(invitCode.value.length==6 && textMsg.value.length==6&& phone.value.length==11){
			document.getElementById('next').classList.add('usable');
			document.getElementById('next').addEventListener('touchstart',next_click,false);
		}else{
			document.getElementById('next').classList.remove('usable');
			document.getElementById('next').removeEventListener('touchstart',next_click,false)
		}
	}
}
//所有输入框填写格式正确后，进行下一步的操作
function next_click(){
	ajax({
		"url" :'/v1/user/validate',
		"type" : 'get',
		"data" : {
			"mobile" : phone.value,
			"inviteCode" :invitCode.value,
			"authCode" : textMsg.value
		},
		"success" :function(data){
			var json=JSON.parse(data);
			if(json.code==0){
				document.getElementById('set-password').style.display="block";
				document.getElementById('active').style.display="none";
				sUuid=json.data.validate_uuid;
				mobile=json.data.mobile;
			}else{
				tipBox('block',json.msg)
			}
		},
		"fail" :function(data){
			
		}
	})
}
//激活手机号
	var phone=document.getElementById('phone');
	var invitCode=document.getElementById('invit-code');
	var textMsg=document.getElementById('text-msg');
	var getTextMsg=document.getElementById('get-textmsg');
	var errorBox=document.getElementById('error-box');
	var errorMsg=document.getElementById('error-msg');
	phone.value=getUrlParam('mobile');
	invitCode.value=getUrlParam('inviteCode');
	//检测手机号格式
	getTextMsg.addEventListener('touchend',function(){
		test({"getMsg" : true,"btn" : this}),
	false});
	//监听输入框的改变
	phone.addEventListener('input',function(){ test({"getMsg" : false}) },false);
	invitCode.addEventListener('input',function(){ test({"getMsg" : false}) },false);
	textMsg.addEventListener('input',function(){ test({"getMsg" : false}) },false);

//设置密码
	var password=document.getElementById('password');
	var pwAgain=document.getElementById('pw_again');
	var join=document.getElementById('join');
	var sUuid,mobile;
	function join_company(){
		if(!password.value){
			tipBox('block','请输入密码');
		}else{
			if(/^(?=.*\d)(?=.*[a-zA-Z])[\S]{6,20}$/.test(password.value)){
				if(password.value!=pwAgain.value){
					tipBox('block','两次密码不一致');
				}else{

					ajax({
						"url" :'/v1/user/active',
						"type" : 'post',
						"data" : {
							"mobile":mobile,
							"password":window.btoa(password.value),
							"verifyPassword":window.btoa(pwAgain.value),
							"authCode":textMsg.value,
							"validate_uuid":sUuid
						},
						"isJson": true,
						"success" :function(data){
							var json=JSON.parse(data);
							if(json.code==0){
								document.getElementById('download_box').style.display="block";
								// document.getElementById('close').addEventListener('touchend',function(){
								// 		document.getElementById('download_box').style.display="none";
								// },false)
								document.getElementById('dl_now').addEventListener('touchend',function(){
										window.location='/statics/h5/download.html';
								},false)
							}else{
								tipBox('block',json.msg)
							}
						},
						"fail" :function(data){
							
						}

					});
				}
			}else{
				tipBox('block','密码格式错误');
			}
		}
	}
	//手机键盘输入事件
	function pw_input(){
		if(password.value.length>=6 && pwAgain.value.length>=6){
			//绑定点击加入企业按钮事件
			join.classList.add('usable');
			join.addEventListener('touchend',join_company,false);
		}else{
			//解除绑定点击加入企业按钮事件
			join.classList.remove('usable');
			join.removeEventListener('touchend',join_company,false)
		}
	}
	//监听键盘输入
	password.addEventListener('input',pw_input,false);
	pwAgain.addEventListener('input',pw_input,false);
	//在输入密码界面返回上一级
	document.getElementById('cancel').addEventListener('touchend',function(){
		document.getElementById('set-password').style.display="none";
		document.getElementById('active').style.display="block";
	},false)