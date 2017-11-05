function sAlert(str){ 
	var msgw,msgh,bordercolor; 
    msgw=50;//Width
    msgh=100;//Height 
    titleheight=25 //title Height
    bordercolor="#666666";//boder color
    titlecolor="#666666";//title color
    var bgObj=document.createElement("div"); 
    bgObj.setAttribute('id','bgDiv'); 
    bgObj.style.position="absolute"; 
    bgObj.style.top="0"; 
    bgObj.style.background="#777"; 
    bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; 
    	bgObj.style.opacity="0.6"; 
    	bgObj.style.left="0"; 
    	bgObj.style.width="100%"; 
    	bgObj.style.height="100%"; 
    	bgObj.style.zIndex = "10000"; 
    	document.body.appendChild(bgObj); 
    	var msgObj=document.createElement("div") 
    	msgObj.setAttribute("id","msgDiv"); 
    	msgObj.setAttribute("align","center"); 
    	msgObj.style.background="white"; 
    	msgObj.style.position = "fixed"; 
    	msgObj.style.left = "25%"; 
    	msgObj.style.top = "50%"; 
    	msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif"; 
    	msgObj.style.marginTop = -75+document.documentElement.scrollTop+"px"; 
    	msgObj.style.width = msgw+'%'; 
    	msgObj.style.height =msgh + "px"; 
    	msgObj.style.textAlign = "center"; 
    	msgObj.style.lineHeight ="25px"; 
    	msgObj.style.zIndex = "10001"; 
    	var title=document.createElement("h4"); 
    	title.setAttribute("id","msgTitle"); 
    	title.setAttribute("align","right"); 
    	title.style.margin="0"; 
    	title.style.padding="3px"; 
    	title.style.background=bordercolor; 
    	title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);"; 
    	title.style.opacity="0.75"; 
    	title.style.border="1px solid " + bordercolor; 
    	title.style.height="18px"; 
    	title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif"; 
    	title.style.color="white"; 
    	title.style.cursor="pointer"; 
    	title.innerHTML="关闭"; 
    	title.onclick=function(){ 
    		document.body.removeChild(bgObj); 
    		document.getElementById("msgDiv").removeChild(title); 
    		document.body.removeChild(msgObj); 
    	} 
    	document.body.appendChild(msgObj); 
    	document.getElementById("msgDiv").appendChild(title); 
    	var txt=document.createElement("p"); 
    	txt.style.margin="1em 15px" 
    	txt.setAttribute("id","msgTxt"); 
    	txt.innerHTML=str; 
    	txt.style.lineHeight='150%';
    	document.getElementById("msgDiv").appendChild(txt); 
    } 
    function showDialog()
    {
    	$('.dialog').show();
    	$('.page_strong').css('display','block');
    	$('.dialog').css({
    		left: ($("body").width() - $('.dialog').width()) / 2  + "px",
    		top:  ($(window).height()-$('.dialog').height())/2 + "px"
    	});
    }
    function hideDialog()
    {
    	$('.dialog').hide();
    	$('.page_strong').css('display','none');
        $('.dialog-sm').hide();
    }
    function redirectHref(url){
    	if(url){
    		location.href=url;
    		return;
    	}
    }
    function tel(phone){
        window.location.href = 'tel://' + phone;
    }
