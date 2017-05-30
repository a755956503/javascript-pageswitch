function PageSwitch(options){
   // "use strict";

	/*说明:获取浏览器前缀*/
	/*实现：判断某个元素的css样式中是否存在transition属性*/
	/*参数：dom元素*/
	/*返回值：boolean，有则返回浏览器样式前缀，否则返回false*/
	var _prefix = (function(temp){
		var aPrefix = ["webkit", "Moz", "o", "ms"],
			props = "";
		for(var i in aPrefix){
			props = aPrefix[i] + "Transition";
			if(temp.style[ props ] !== undefined){
				return "-"+aPrefix[i].toLowerCase()+"-";
			}
		}
		return false;
	})(document.createElement("div"));

	//初始化参数
	var settings={};
   settings.selectors=options.selectors||{
			sections : ".sections",
			section : ".section",
			page : ".pages",
			active : ".active",
		};
		
		settings.index=options.index||0;	//页面开始的索引
		settings.duration=options.duration||500;	//动画效果
		settings.easing=options.easing||"ease";	//动画执行时间
		settings.loop=options.loop||true;		//是否循环切换
		settings.pagination=options.pagination||true;		//是否进行分页
		settings.keyboard=options.keyboard||true;		//是否触发键盘事件
		settings.direction=options.direction||"vertical";	//滑动方向vertical,horizontal
		settings.callback=options.callback||"";		//回调函数
		var element=document.querySelector("[data-PageSwitch]");

		var selectors=settings.selectors;
		var sections=element.querySelector(selectors.sections);
		var section=element.querySelectorAll(selectors.section);
		var direction=settings.direction=="vertical"?true:false;
		var pagesCount=section.length;
		var index=(settings.index>=0&&settings.index<pagesCount)?settings.index:0;
		var canscroll=true;

		var pagesClass=selectors.page.substring(1);
		var activeClass=selectors.active.substring(1);

		var pages,pageItem;

		function initLayout(){
			if(!direction){
				var width=(pagesCount*100)+"%",
				cellWidth=(100/pagesCount).toFixed(2)+"%";
				sections.style.width=width;
				for(var i=0;i<section.length;i++){
					section[i].style.width=cellWidth;
					section[i].style.float="left";
				}
				
			}
			
		}
		//这个用来判断重置窗口后唯一那一页，这里省掉了，直接定位到当前页，以后可能完善。
		// function switchLength(){
		// 	return direction==1?element.offsetHeight:element.offsetWidth;
		// }
		

		function init(){
			if(!direction||index){
				initLayout();
			}
		
			if(settings.pagination){
				initPaging();
				initEvent();
			}
			//scrollPage();
			if(index||index==0){
		
				scrollPage();
			}
			
			
			
		}
		function prev(){
			if(index>0){
				index--;
			}else if(settings.loop){
				index=pagesCount-1;
			}
			scrollPage();
		}
		function next(){
			if(index<pagesCount-1){
				index++;

			}else if(settings.loop){
				index=0;
			}
			scrollPage();
		}
		function initPaging(){
			var pageHtml="";
			for(var i = 0 ; i < pagesCount; i++){
					pageHtml += "<li></li>";
				}
			var container=document.createElement("ul");
			container.className+=pagesClass;


			container.innerHTML=pageHtml;
			element.appendChild(container);
			pages=element.querySelector(selectors.page);
			pageItem=pages.querySelectorAll("li");

			//pageItem=pageItem.map(function(cv){cv.className+=activeClass;})
			for(var i in pageItem){
				pageItem[i].className+=activeClass;
			}
			if(direction){
				pages.className+=" vertical";
			}else{
				pages.className+=" horizontal";
			}

		}
		function initEvent(){
			
			element.onwheel=function(e){
				e.preventDefault();
				var delta=e.wheelDelta||-e.detail;
				if(canscroll){
		
					if(delta > 0 && (index && !settings.loop || settings.loop)){
			
							prev();
						}else if(delta < 0 && (index < (pagesCount-1) && !settings.loop || settings.loop)){
				
							next();
						}
				}
			}
			for(var i=0;i<pageItem.length;i++){
				pageItem[i].index=i;
				pageItem[i].onclick=function(e){
					
					index=this.index;
				
					scrollPage();
				}
			}
			var resizeId;
			window.onresize=function(){
				clearTimeout(resizeId);
				resizeId=setTimeout(function(){
					//var currentLength=switchLength();
					if(index==0){
						resize();
						index=0;
					}else{
						scrollPage();
					}
						console.log("resize")
						
	
					
					
				},500);
			}
			if(_prefix){
				
				sections.addEventListener("transitionend",function(){
					canscroll=true;
				
					//.if(settings.callback&&settings.callback.)
				})
				sections.addEventListener("webkitTransitionend",function(){
					canscroll=true;
				
					//.if(settings.callback&&settings.callback.)
				})
			}
		}
		function scrollPage(){
			canscroll=false;
	
			var top=section[index].offsetTop;
		
			var left=section[index].offsetLeft;
			var translate=direction?"translateY(-"+top+"px)":"translateX(-"+left+"px)";
			sections.style["transition"]="all "+settings.duration+"ms "+settings.easing;
			sections.style[_prefix+"transform"]=translate;

			for(var i=0;i<pageItem.length;i++){
				if(pageItem[i].index!=index){
					//var name=section[i].className;
	
					pageItem[i].className=pageItem[i].className.replace(activeClass,"");
				}else{
					if(pageItem[i].className.search(activeClass)==-1){
						pageItem[i].className+=activeClass;
					}
					
				}
			}
			console.log("scroll");
		}
		init();
		

}