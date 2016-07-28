$(function(){
	;(function(){
		var oSchool=document.getElementById("school");
			oSchool.innerHTML+=oSchool.innerHTML;
		var timer=null;
		var iNow=0;
			timer=setInterval(function(){
				iNow++;
				if(iNow>=(oSchool.offsetWidth/2)){iNow=0;}
				oSchool.style.left=-iNow+'px';
			},30);
			
			oSchool.onmouseover=function(){
				clearInterval(timer);
			};
			oSchool.onmouseout=function(){
				timer=setInterval(function(){
					iNow++;
					if(iNow>=(oSchool.offsetWidth/2)){iNow=0;}
					oSchool.style.left=-iNow+'px';
				},30);
			};
	})();

	;(function(){
		var oCoop=document.getElementById("coop");
		var aA=oCoop.getElementsByTagName("a");

		var oCoopImg=document.getElementById("coopimg");

		var aSrc=['ci','xueli','caomei','lanmei','caomeijiu','putao','shanzha','xing','suanzao','shaji'];
		var aAlt=['刺葡萄酒','雪梨起泡酒','草莓起泡酒','蓝莓酒','草莓酒','葡萄酒','山楂酒','杏酒','酸枣酒','沙棘酒'];

		for(var i=0; i<aA.length; i++){
			(function(index){
				aA[i].onclick=function(){
					for(var i=0; i<aA.length; i++){
						aA[i].className='';
					}
					this.className='show';

					oCoopImg.src='img/'+aSrc[index]+'.jpg';
					oCoopImg.alt=aAlt[index];
					oCoopImg.title=aAlt[index];
				};
			})(i);
		}
	})();

	;(function(){
		var aC6=getByClass(document,'c6');

		for (var i=0; i<aC6.length; i++){
			_tab(aC6[i]);
		}

		function _tab(oParent)
		{
			var aC6Li=oParent.getElementsByTagName("li");
			
			if(aC6Li[5]){
				addClass(aC6Li[5],'hide');
			}
		}
	})();
});	