/*  
	--- WIDGETS CONTAINS --- 
	
	1. Placeholder
	2. equalHeight
	
*/

/*--- 1. Placeholder ---*/
/*Placeholder (modified)*/
(function(c){function f(a){this.input=a;"password"==a.attr("type")&&this.handlePassword();c(a[0].form).submit(function(){a.hasClass("placeholder")&&a[0].value==a.attr("placeholder")&&(a[0].value="")})}var d=window.navigator.userAgent.match(/MSIE *\d+\.\w+/i),e=!0;if("MSIE 6.0"==d||"MSIE 7.0"==d||"MSIE 8.0"==d)e=!1;f.prototype={show:function(a){if(""===this.input[0].value||a&&this.valueIsPlaceholder()){if(this.isPassword)try{this.input[0].setAttribute("type","text")}catch(b){this.input.before(this.fakePassword.show()).hide()}this.input.addClass("placeholder");
this.input[0].value=this.input.attr("placeholder")}},hide:function(){if(this.valueIsPlaceholder()&&this.input.hasClass("placeholder")&&(this.input.removeClass("placeholder"),this.input[0].value="",this.isPassword)){try{this.input[0].setAttribute("type","password")}catch(a){}this.input.show();this.input[0].focus()}},valueIsPlaceholder:function(){return this.input[0].value==this.input.attr("placeholder")},handlePassword:function(){var a=this.input;a.attr("realType","password");this.isPassword=!0;if(!e&&
a[0].outerHTML){var b=c(a[0].outerHTML.replace(/type=(['"])?password\1/gi,"type=$1text$1"));this.fakePassword=b.val(a.attr("placeholder")).addClass("placeholder").focus(function(){a.trigger("focus");c(this).hide()});c(a[0].form).submit(function(){b.remove();a.show()})}}};var g=!!("placeholder"in document.createElement("input"));c.fn.placeholder=function(){return g?this:this.each(function(){var a=c(this),b=new f(a);b.show(!0);a.focus(function(){b.hide()});a.blur(function(){b.show(!1)});e||(c(window).load(function(){a.val()&&
a.removeClass("placeholder");b.show(!0)}),a.focus(function(){if(""==this.value){var a=this.createTextRange();a.collapse(!0);a.moveStart("character",0);a.select()}}))})}})(jQuery);

$(function() {
 $('input, textarea').placeholder();
});
/*! http://mths.be/placeholder v2.0.6 by @mathias */
(function(n,f,c){function p(a){var b={},d=/^jQuery\d+$/;c.each(a.attributes,function(a,c){c.specified&&!d.test(c.name)&&(b[c.name]=c.value)});return b}function h(a,b){var d=c(this),e;if(this.value==d.attr("placeholder")&&d.hasClass("placeholder")){e=this==f.activeElement;if(d.data("placeholder-password")){d=d.hide().next().show().attr("id",d.removeAttr("id").data("placeholder-id"));if(!0===a)return d[0].value=b;d.focus()}else this.value="",d.removeClass("placeholder");e&&this.select()}}function l(){var a, b=c(this),d=this.id;if(""==this.value){if("password"==this.type){if(!b.data("placeholder-textinput")){try{a=b.clone().attr({type:"text"})}catch(e){a=c("<input>").attr(c.extend(p(this),{type:"text"}))}a.removeAttr("name").data({"placeholder-password":!0,"placeholder-id":d}).bind("focus.placeholder",h);b.data({"placeholder-textinput":a,"placeholder-id":d}).before(a)}b=b.removeAttr("id").hide().prev().attr("id",d).show()}b.addClass("placeholder");b[0].value=b.attr("placeholder")}else b.removeClass("placeholder")} var g="placeholder"in f.createElement("input"),k="placeholder"in f.createElement("textarea"),e=c.fn,m=c.valHooks;-1!=navigator.userAgent.indexOf("Opera/")&&(g=k=!1);g&&k?(e=e.placeholder=function(){return this},e.input=e.textarea=!0):(e=e.placeholder=function(){this.filter((g?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":h,"blur.placeholder":l}).data("placeholder-enabled",!0).trigger("blur.placeholder");return this},e.input=g,e.textarea=k,e={get:function(a){var b= c(a);return b.data("placeholder-enabled")&&b.hasClass("placeholder")?"":a.value},set:function(a,b){var d=c(a);if(!d.data("placeholder-enabled"))return a.value=b;""==b?(a.value=b,a!=f.activeElement&&l.call(a)):d.hasClass("placeholder")?h.call(a,!0,b)||(a.value=b):a.value=b;return d}},g||(m.input=e),k||(m.textarea=e),c(function(){c(f).delegate("form","submit.placeholder",function(){var a=c(".placeholder",this).each(h);setTimeout(function(){a.each(l)},10)})}),c(n).bind("beforeunload.placeholder",function(){c(".placeholder").each(function(){this.value= ""})}))})(this,document,jQuery);
/*--- 1. Placeholder end ---*/

/*
	Плагин equalHeight v1.0.0
	Описание: Предназначен для посчета большей высоты рядом стоящих элементов и присвоения этой высоты.
	Компания: DemingPro.com
	Разработчик: Александр Ляшенко
	
	Вызов плагина: $(object).equalHeight();
	Опции: amount - кол-во блоков между которыми будет считаться максимальная высота (default: 2)
	
	Compressed code of equalHeight v1.0.0:
*/
(function(e){e.fn.equalHeight=function(t){var t=e.extend({amount:2,useParent:false,parent:null,resize:false},t);var n=e(this);n.removeAttr("style");if(t.useParent==true){if(t.parent==null){var r=e(this).parent().outerWidth()}else{var r=t.parent.outerWidth()}var i=e(this).outerWidth(true);t.amount=parseInt(r/i);newAmount=t.amount}var s=this;if(t.resize==true&&t.useParent==true){e(window).resize(function(){n.removeAttr("style");if(t.useParent==true){if(t.parent==null){var r=s.parent().outerWidth()}else{var r=t.parent.outerWidth()}var i=s.outerWidth(true);t.amount=parseInt(r/i)}return s.each(function(r){if(r%t.amount===0){var i=r+1;var s=e(this);var o=s.index();var u=[];var a=[s];for(var f=1;f<t.amount;f++){var l=e(n[r+f]);a.push(l)}for(var c=0;c<t.amount;c++){u.push(a[c].height())}var h=Math.max.apply(Math,u);e(a).each(function(t){var n=e(this);n.css("height",h)})}})})}return this.each(function(r){if(r%t.amount===0){var i=r+1;var s=e(this);var o=s.index();var u=[];var a=[s];for(var f=1;f<t.amount;f++){var l=e(n[r+f]);a.push(l)}for(var c=0;c<t.amount;c++){u.push(a[c].height())}var h=Math.max.apply(Math,u);e(a).each(function(t){var n=e(this);n.css("height",h)})}})}})(jQuery)