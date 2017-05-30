console.log(window.innerHeight);
function resize(){
    var scale=853/450;//w/h=1.89
    var scaleReal=window.innerWidth/window.innerHeight;
    
    var header=document.querySelector(".header");
    var headerBg=document.querySelector(".header-bg");

    var headerVideo=document.getElementById("bg-video");
    var h,w;
    var wh=window.innerHeight;
    var ww=window.innerWidth;

   // header.style.width=window.innerWidth+"px";
   //header.style.height=window.innerHeight+"px";
    console.log(headerBg.clientWidth);
    if(scale>scaleReal){//太宽  
        w=scale*wh;
        headerBg.style.width=String(w)+"px";
        headerBg.style.height=wh;
        headerVideo.style.width=String(w)+"px";
        //headerVideo.style.height=wh;
        offt=-(h-wh)/2;
        headerBg.style.top=String(offt)+"px";
        headerBg.style.left="0px";
       
        console.log("w"+headerBg.style.left);  
        
    }else{//太高
        h=ww/scale;
        headerBg.style.height=String(h)+"px";
        headerBg.style.width=ww;
        headerVideo.style.height=String(h)+"px";
        headerVideo.style.width=ww;
         offw=-(w-ww)/2;
        headerBg.style.left=String(offw)+"px";
        headerBg.style.top="0px";
        
        console.log("h"+headerBg.style.top);
        
    }
}
resize();
//window.onresize=resize;