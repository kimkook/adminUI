//-----------------------------------------------------------------
// IE console.log ����
//-----------------------------------------------------------------
if (window['console'] === undefined || console.log === undefined ) {
	console = { log: function() {} };
}

//-----------------------------------------------------------------
// binding event
//-----------------------------------------------------------------
//��� ���ҽ� �ε� ��
$(window).bind("load",function(){
	//portal.ui.tbConFixedReady();
	portal.ui.gnb();
	portal.ui.gnbSlide();
	portal.ui.ieVerCheck();
});
//DOM ���� ��
$(window).bind("ready",function(){

});

$(window).bind("resize",function(){
	portal.ui.tbConFixed(250);
});

$(window).bind("scroll",function(){
	portal.ui.gnbSlide();
	portal.ui.tbConFixed(250);
});

//-----------------------------------------------------------------
// portal.ui
//-----------------------------------------------------------------
var portal = portal || {};
portal.ui={

	/**
	 * GNB
	 * @param {����} ���ڰ� - ����
	 */
	gnb:function(){
		var gnb = $("nav.gnb");
		//sbg = $("#submenuBG");
		$(".d1", gnb).bind("mouseenter focusin",
			function(){
				if ($(".depth2", this).length >= 1 && $(".depth2", this).css("display") != "block"){
					$(".depth2", gnb).hide(0);
					$(".depth2", this).show(0);
					//sbg.show(0);
					portal.ui.gnbSize(this);
				}
			}
		);
		$(".d1", gnb).bind("mouseleave",
			function(){
				$(".depth2", this).hide(0);
				//sbg.hide(0);
				portal.ui.gnbActive();
			}
		);
		$(gnb).bind("mouseleave",
			function(){
				//sbg.hide(0);
				portal.ui.gnbActive();
			}
		);
	},
	/* SNB �ʱ� Ȱ�� */
	gnbActive:function(d1,d2){
		var gnb = $("nav.gnb");
		if (d1==0){
			$(".depth1 a",gnb).removeClass("on");
			$(".depth2",gnb).hide();
		} else{
			$(".depth1 > li:eq("+(d1-1)+")"+"> a",gnb).addClass("on");
			//$(".depth1 > li:eq("+(d1-1)+")"+" .depth2",gnb).css({left:0,marginLeft:0});
			$(".depth1 > li:eq("+(d1-1)+") > ul > li:eq("+(d2-1)+")"+"> a",gnb).addClass("on");
		}
		var allD1 = $(".depth1>.d1", gnb);
		$.each(allD1,function(){
			var actM = $(">a", this);
			if ( actM.attr("class") == "on" ){
				$("+.depth2",actM).show(0);
				//sbg.show(0);
				portal.ui.gnbSize(this);
			}
		});
	},
	/* SNB ������ ���� */
	gnbSize:function(target){
		var gnb = $("nav.gnb");
		var menu = $(".depth2", target);
		var menus = $(".d2", target);
		var exSize = 10;//ũ�ν�����¡ ���� 1px ����+���� ����Ʈ�� ���� 9px ����
		var totalSize = 0;
		$.each(menus,function(){
			totalSize += parseInt($(this).outerWidth());
		});
		if ( menu.outerWidth() < totalSize+exSize ){ menu.width(totalSize+exSize); }
		if ( menu.outerWidth() > $(target).outerWidth() ){
			if ( (totalSize+menu.position().left) > (gnb.outerWidth()) ){
				menu.css("right","-"+exSize+"px");
			}else if (menu.position().left <= 1){
				//menu.css("left",0);
			}else{
				menu.css("margin-left","-"+parseInt((totalSize/2)-($(target).width()/2-parseInt(menu.css("padding-left"))))+"px");
			}
		}else{
			menu.css("margin-left",parseInt(($(target).width()/2-parseInt(menu.css("padding-left")))-(totalSize/2))+"px");
		}
	},

	/**
	 * gnbSlide
	 * @param {����} ���ڰ� - ����
	 */
	gnbSlide:function(){
		var sc = $(document).scrollTop();
		var hdr = $("header.header");

		if ($("body").attr("class")=="ng-scope home"){
			hdr.addClass("mini");
		}else{
			if (sc>0){
				hdr.addClass("mini");
				hdr.addClass("fixed");
			} else {
				hdr.removeClass("mini");
				hdr.removeClass("fixed");
			}
		}
	},

	saveId:function(){
		//�ۼ�
		//name space -> portal.ui.saveId();
	},

	guideScroll:function(el){
		var top = 0;
		var headerH = $("header.header").height();
		var titPd = 14;
		if (el.offsetParent) {
			do {
				top += el.offsetTop;
			} while (el = el.offsetParent);
			return [top-headerH-titPd];
		}
	},

	scrollTo:function(el){
		var el = document.getElementById(el);
		window.scroll(0, portal.ui.guideScroll(el));
	},

	tbConFixedReady:function(){
		//var tbc = document.getElementById("tbCon");
		//tbcPos = tbc.offsetTop;
		tbcPos = 250;
		portal.ui.tbConFixed(tbcPos);
	},

	tbConFixed:function(tbcPos){
		if (tbcPos<$(document).scrollTop()){
			$("#tbCon").addClass("fixed");
		}else{
			$("#tbCon").removeClass("fixed");
		}
	},

	ieVerCheck:function(){
		var trident = navigator.userAgent.match(/Trident\/(\d)/i);
		if(trident != null){	 trident = 1;	} else{	 trident = 0;	}
		var vs = navigator.appVersion.toLowerCase(), ie;
		if (vs.indexOf("msie 7") != -1 && trident == 0){ie ="IE7"; }
		else if (vs.indexOf("msie 8") != -1 || (vs.indexOf("msie 7") != -1 && trident == 1)){ ie ="IE8";}
		else if (vs.indexOf("msie 9") != -1){	ie ="IE9";}
		else if (vs.indexOf("msie 10") != -1)	{ie ="IE10";}
		else if (vs.indexOf("mac os") != -1)	{ie ="MacOS";}

		//if (ie=="IE7" || ie=="IE8" || ie=="IE9" ){
		if (ie=="IE7" || ie=="IE8"){
			$("body").html("<div class='oldIEArea'>"+
				"<div class='oiaCon'>"+
				"<p>"+
				"GiGA IoTMakers�� ������ Internet Explorer ������ �������� �ʽ��ϴ�.<br>"+
				"<strong>Internet Explorer 9</strong> ���� �̻����� ���׷��̵� �Ͻðų�<br>"+
				"�ֽ��� <strong>Chrome, Safari, FireFox</strong>���� �������� ���� ������ �Ͻñ� �ٶ��ϴ�.<br> "+
				"�̿뿡 ������ ��� �˼��մϴ�."+
				"</p>"+
				"<div class='btnArea'>"+
				"<a href='#' class='back' onclick='history.back(-1);return false;'>�ڷΰ���</a>"+
				"</div>"+
				"</div>"+
				"<div class='oiaBg'></div>"+
				"</div>	");
		}
	}

};