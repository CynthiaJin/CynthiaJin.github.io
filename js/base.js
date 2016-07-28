//用class名字来获取元素，兼容所有，系统的不兼容IE8及以下
	function getByClass(oParent,sClass){
		if(oParent.getElementsByClassName){
			return oParent.getElementsByClassName(sClass);
		}else{
			var arr=[];
			//var reg=/\bsClass\b/;
			var reg=new RegExp('\\b'+sClass+'\\b');
			var aEle=oParent.getElementsByTagName('*');
			for(var i=0; i<aEle.length; i++){
				if(reg.test(aEle[i].className)){
					arr.push(aEle[i]);
				}
			}
			return arr;
		}
	}
//有这个class
	function hasClass(obj,sClass){
		var reg=new RegExp('\\b'+sClass+'\\b');
		return reg.test(obj.className);
	}
//添加class
	function addClass(obj,sClass){
		if(obj.className){
			if(!hasClass(obj,sClass)){
				obj.className+=' '+sClass;
			}
		}else{
			obj.className=sClass;
		}
	}
//删除class
	function removeClass(obj,sClass){
		var reg=new RegExp('\\b'+sClass+'\\b','g');
		if(hasClass(obj,sClass)){
			obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
		}
	}		
//切换class名字
	function toggleClass(obj,sClass){
		if(hasClass(obj,sClass)){
			removeClass(obj,sClass);
		}else{
			addClass(obj,sClass);
		}
	}
//在m-n这个范围内的随机数
	function rnd(n, m){
		return Math.floor(Math.random()*(m-n)+n);
	}
  
//判断一个字符串是否在arr这个数组内
	function findInArr(arr, n){
		for (var i=0; i<arr.length; i++){
			if (arr[i] == n){
				return true;
			}
		}
		
		return false;
	} 

//给数字前补零，来填充位数
	function toDub(n){
		return n<10 ? '0'+n : ''+n;
	}

//事件的绑定
	function addEvent(obj, sEv, fn){
		if (obj.addEventListener)
		{
			obj.addEventListener(sEv, fn, false); // 高级浏览器
		}
		else
		{
			obj.attachEvent('on'+sEv, fn);  // 低级浏览器
		}
	}

//事件的解除
	function removeEvent(obj, sEv, fnName){
		if (obj.removeEventListener)
		{
			obj.removeEventListener(sEv, fnName, false);
		}
		else
		{
			obj.detachEvent('on'+sEv, fnName);
		}
	}

//拖拽封装函数
	function drag(obj){
		addEvent(obj, 'mousedown', function (ev){
			var oEvent=ev || event;
			var disX=oEvent.clientX-obj.offsetLeft;
			var disY=oEvent.clientY-obj.offsetTop;
			
			addEvent(document, 'mousemove', move);
			addEvent(document, 'mouseup', up);
			
			function move(ev)
			{
				var oEvent=ev || event;
				
				obj.style.left=oEvent.clientX-disX+'px';
				obj.style.top=oEvent.clientY-disY+'px';
			}
			
			function up()
			{
				removeEvent(document, 'mousemove', move);
				removeEvent(document, 'mouseup', up);
				
				obj.releaseCapture && obj.releaseCapture();
			}
			
			obj.setCapture && obj.setCapture();
			
			oEvent.preventDefault && oEvent.preventDefault();
			return false;
		});
	}

//相当于window.onload   和jquery  里边的$ 符一样
	function $(fn){
		if(document.addEventListener){
			document.addEventListener('DOMContentLoaded',fn,false);
		}
		else{
			document.onreadystatechange=function(){
				if(document.readyState == 'complete'){
					fn();
				}
			};
		}
	}


//  获取非行间样式，  oDiv   'width'
	function getStyle(obj,sName){
		return (obj.currentStyle ||  getComputedStyle(obj, false))[sName];
	}

//添加滚轮事件
	function addWheel(obj, fn){
		// 加事件
		if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
		{
			// FF
			obj.addEventListener('DOMMouseScroll', function (ev){
				if (ev.detail > 0)
				{
					// 下
					fn(true);
				}
				else
				{
					fn(false);
				}
				
			}, false);
		}
		else
		{
			obj.onmousewheel=function (){
				if (event.wheelDelta > 0)
				{
					// 上
					fn(false);
				}
				else
				{
					fn(true);
				}
			};
		}
	}
//获取非行间样式
	function getStyle(obj, sName){
		return (obj.currentStyle || getComputedStyle(obj, false))[sName];
	}

//move函数
	function move(obj, json, options){
		options=options || {};
		var duration=options.duration || 500;
		var easing=options.easing || Tween.Linear;
		
		var start={};
		var dis={};
		for (var name in json)
		{
			start[name]=parseFloat(getStyle(obj, name));
			
			if(isNaN(start[name])){//css的style 没给样式是时候需要这个判断
				switch(name){
					case 'left':
						start[name]=obj.offsetLeft;
						break;
					case 'top':
						start[name]=obj.offsetTop;
						break;
					case 'width':
						start[name]=obj.offsetWidth;
						break;
					case 'height':
						start[name]=obj.offsetHeight;
						break;
					case 'opacity':
						start[name]=1;
						break;
				}	
			}
			dis[name]=json[name]-start[name];
		}
		var count=Math.floor(duration/30);
		var n=0;
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			n++;
			
			// 更改样式
			for (var name in json)
			{
				var cur=easing(duration*n/count, start[name], dis[name], duration);
				
				if (name == 'opacity')
				{
					obj.style[name]=cur;
				}
				else
				{
					obj.style[name]=cur+'px';
				}
			}
			
			if (n == count)
			{
				clearInterval(obj.timer);
				options.complete && options.complete(); 
			}
		}, 30);
	}