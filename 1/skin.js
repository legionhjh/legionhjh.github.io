// Garden Gnome Software - Skin
// Pano2VR 6.1.8/17956
// Filename: mono--pano2vr-skin.ggsk
// Generated 2021-05-31T00:00:12

function pano2vrSkin(player,base) {
	var me=this;
	var skin=this;
	var flag=false;
	var nodeMarker=[];
	var activeNodeMarker=[];
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._instructionbox=document.createElement('div');
		els=me._instructionbox__img=document.createElement('img');
		els.className='ggskin ggskin_instructionbox';
		hs=basePath + 'images/instructionbox.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="instruction-box";
		el.ggDx=-5080;
		el.ggDy=-27;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 346px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 480px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._instructionbox.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._instructionbox.onclick=function (e) {
			me._instructionbox.ggVisible = !me._instructionbox.ggVisible;
			var flag=me._instructionbox.ggVisible;
			me._instructionbox.style[domTransition]='none';
			me._instructionbox.style.visibility=((flag)&&(Number(me._instructionbox.style.opacity)>0||!me._instructionbox.style.opacity))?'inherit':'hidden';
		}
		me._instructionbox.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._okinstrbutton=document.createElement('div');
		els=me._okinstrbutton__img=document.createElement('img');
		els.className='ggskin ggskin_okinstrbutton';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAmCAYAAACYsfiPAAAD10lEQVRoge2Zy28bRRjAv9nd2V27wuvYaVoEeTmxnUdxHhxapIJ64HlJ0kh2GtSeQEghHFAvPSDxB3BA4hAECM40jmqcVOY/KGloKkJImzhu08R26sYVTu34ta8ZLrUxJ9SKJVrHv9t+s4fvN/PN6ptZRCmFowRz2An83xw5Ya72wdXtxts7Oz6OZU+CuScDaZqmdXd1bW1GNzb+MVDZw20dnWLq4cPPMc85PV3dwPM8mHV/I4RAlmVYXbtDe7yezfX19S8rY9UVtlrEcUHA0uzVWXTK5zOn6VMQQqAoCkTm55lPL19ubevo9MW3H6wC1JRtNpvtnwxM4E6XizKMmasZgFIKoijC2XPnoK+3V7BaxNOVsaqZqun4pZdbEYexaUu5FkopYMxRV2cHIo'+
			'RYK3FzL+Vz0BCudxrC9U5DuN45csLcv7/yfFgsFu3W8u2W2R+vDiXjcSeLOb2v/9Su3+9fG351cO/br785s/Tr8otTH08tDg8PpiORnz3hULhndGx0/a2333xQKBSwEXkZssKCIOjRaEyaCwYH3G734+9++D44MzMTAkLYuWDQl957LHIYEwAAq9Wq3rjxS+u1a6He1984G3/3vXfuGyULYJAwxljf3Iy2EELp4NDgI5vtBc3hdCinXzsTz+w/4aPRaAvP87ogCNofa3eaFxaue4eHhvbOj5+/m88f8EbkVMEQYYQQLRVLvCTZSzabrUwIQYToqMnhKFitVlWWZczzvPYolZIi1xd8dskmj4yOrFFKESEUGZFThUP7aFFKEeaxjjlM4vGEPZFI2vDTMjcSQ4QppchitSjZ7BNLLpcTGYahDMPS/UzmWLFYxIIgqKqq'+
			'sg6HszAyNrYiSfZyOBTyJZO7x3jeWGlDhFVVZT0eb5phEFr5beVkLnfAZf7M8EuLN9scTXbF6/WmFUVhFUVhu7pd2QuTE6u5fB7PBYO+YrHEsCxr2PnUEGFZllmv1531BwK/x2Kx4x998GFgenp6HBhG9wcCqy0njpc1VWUAAMqlMjcw8Ep6cvLC6tbWtv2nULgfIUQYBhkiXb3Tam458cUnU1NN71+6SERRNP0lAMMwsL+fgc+uXCHRe/c3NqPRrwCOYKfVEK53GsL1TkO43qkKI4Qgl80C0fXDzOc/Rdd02EunAaG/zyNV4WanIxaeD6v5fB6Z/VcLAAAhBJKJBLq1fLtcKss3K/HqjUehWIokEomeyYkJmyRJtHZWzIiu67CbShFBtGQAYKkSR7UtpKvb3b69s9PHsSwGAHP3lgBI0/VyR3v74ta92EE1aPae+V'+
			'kx/2Z9Rv4CRjiT4WEcvewAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAmCAYAAACYsfiPAAADnklEQVRoge2az0/bZhjHn9evnTeJMQkENEUkIZAEdSpqmVJtXYFJUzvoeTv0WKSpaNUQAnbetYdq6wJSK7RdqkndL/U6iVU7DdKxlkhoGxNt0pWwhkCTrCPGSRz79bvLEuUPiBfV5HOyHx/8/ej9odfva8QYg+ME1+oA/zd8481gOEJ20mkfjzFuVaBmoes6CodC1cePtp821lGtSweCA/ZMJvMxxrgXACzRzymlxkCw/7dUMnmrVqu3MIfQuxxC7uGTr4LD7mhNwibCAKBYLOKtrT8igeDAqd2dp78CNIxhSulJn98nEBuxROtyCIHodEJXl5twCN6o12sXjDHBJggIIdSahE2GMQaI45hDFBFjzFmrH7tZui1sddrCVqctbHXaws2iVCppp4eHX/'+
			'ny9u334vH4dDwen75+7dpEoK/Ptbe3J384M3P226+/uhQM+N3PczllcmIi8s2dO5feOX8+JMuyalYuU4QrqqqfiEQ88wsL5zY3N7PjY2OfvzU+/gVPCJ6bm3uz1+NxappGAQAURalOXrgQfn9qKrpy717yu7t3f5ckiZiRC8Ak4aqq0uiZMz5dVdlaPL4rK4r2z+Fh5YeVlaRLkhzRaLRPVVW9Uqlor5067Z26fHlk/eHD3eXl5Qcut9tuRqYapggbzGCS1Ely+bxSKBRKGGOEeZ7LZrNyUT5SRbHDVimX9cFQ2DM7P3/u7xcvyrdu3nzACwLHmbyYb9mkhTgE5XJZr6gqHRoa6g2HQt3VapWa/V5ThDnEIVkuqr09PaLH43FSShnVdcPr9UqdUgdRlKMqIXZ+P7tXXPz0k7V8IV+amZ092+f1StX/xrZZmCJsIwQn'+
			'Njae8YSgsdHRgCSKgtvlsk9evBg5lOVyIpHIEEJ4Qgj/+MmTQiy2eF/q6LB9tLAwSjDGlFLTvslNEbYTwm8nk4XPbty4PzIy4l1dW5v+aXX1iq6qNBaL/ZwrFEqCIGAAAIfDIWwkEpmlpaX1cCjU88HVq69TXaeGSdup9T0tnz9wXRSdXZ7ubsMqmwDUMOCvTMbgOW47vbOzCNBeaVmftrDVaQtbnWMsjBBQw2hhlObDGANNVaFxXVEX5jGXfL5/oOk6tczpg6ZVUS6XrxgM1mu1+mGaweD7o1LpRCqV6nR1uRnHvdy9nVIKB/sHwGGsAMAvtTpqXLIOhiP+3XT6bUHg/fByj28EAHpV07b6+4M//plKKvUH7V8eLM6xE/4XQFN5Z+ngzzAAAAAASUVORK5CYII=';
		me._okinstrbutton__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAmCAYAAACYsfiPAAADsklEQVRoge2ay28bRRjAv9mZfdiOE8duaJx14qa2a0ihJUQ4IYVDLwgkqCqiUuiNFnzkwAHRiHIBicKtlx5S+g8gIYSqHpAqxAG5SUWomjYlJk1bGz9at40cO7v2PmaGA9jkwDGLZce/234j7X4/zUOz3wzinMNOQmh1Av83ZOvD3mhMvp/JhAjGuFUJbRe2baNoJGL+kV65tzWOGkN6ZM+oUigUzgiCMAAAHTHOKWMsGo3eTN9ePt+INXtYdClveVySr/+jC2AF4+1tjBBgakHPzSt45fxsbGTP6IHs/XtLAFvmsFGp7FcPz4g0MMw5Qq1LdjvgHCiRoBpJQDg+JksuZbLR9O+ixahI+4MIMPnPd7QdHABhkcuDYQSMuRvhHbdKd4U7na5wp9MV7n'+
			'S6wttF2aTWkSHv7t+Ojc0UkuPJQnI8+ePr0VcTPldfsWJUZyeHptLvPHv8Zb/bV9w0tXf3BWJ3Tzx3/GQsEFk3bMOpvBwRrtrMfvOpnsCZ6dD09QdaceybG3MTF29coAjhL6bVl57pkd064xQAYMOk5ol4IPrli+rEXPrx6tmlh7f8MpGdyAvAIWHDZnQ85A25kcC/y5SzmbplLetm/du19dWQR3ZNhLyqYTO7alPrDdUb/OyF4PM/ZMrZrxby1/wKUZzIqYEjwhyA98hYfqSZ2rpm6VhACAtIeFgxqxXDNlwilgyL2UN+JXBySp0u6Vbt3ELhmi4ggSBw9M+lZYsWQgBAuW3YjMYDroF4QPGblFGnv+uIMAJAmwY1BjySx+8R3ZRxThlnu3slb69M5JpFTYkI5EHFrFxM5X8p6ZZ+ekqdeqXP5dUclnZEWCYCvp6r'+
			'5nTO0EzYNxJWRHG/W1LejvhjOc2oLeaqeZkIxIMF8tNj7cns1XxqlyJKpw+FDoUJxgZzrrLoiLCXCORSafPJ56lcanzQE7z9/sHk4qmDH2DO6aep/NXfNw3dLSAMAOAVsXgpu5H/OPXnfGLAs+uTSTXh5pza3JmiS7OmFQoOfu157b1+PXGUUSIDtHv5FgmA9Q1wf3+W0eLayp10+hxAd6fV+XSFO52ucKezc4U5QkBqVUCMtTKfbYUzClb50T8b979pCrv6+lc35i9btK4haPejFgBAwACXiyi39GvdrBvzjXjzXMWs1S7ns9mn1bkPe33RAxyJUvvuthACWq9BcfFnoFjUAGCh2bT1BsBoJDpcLJUOS7I8DO09vxFwbtd1bTk0pF65u3ZHazZ0rzx0ODtO+C9mtIJRgYOM7gAAAABJRU5ErkJggg==';
		me._okinstrbutton__img.ggDownSrc=hs;
		el.ggId="ok-instr-button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 38px;';
		hs+='left : 414px;';
		hs+='position : absolute;';
		hs+='top : 302px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._okinstrbutton.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._okinstrbutton.onmouseover=function (e) {
			me._okinstrbutton__img.src=me._okinstrbutton__img.ggOverSrc;
		}
		me._okinstrbutton.onmouseout=function (e) {
			me._okinstrbutton__img.src=me._okinstrbutton__img.ggNormalSrc;
		}
		me._okinstrbutton.onmousedown=function (e) {
			me._okinstrbutton__img.src=me._okinstrbutton__img.ggDownSrc;
		}
		me._okinstrbutton.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._okinstrbutton__img.src = me._okinstrbutton__img.ggNormalSrc;
			} else {
				me._okinstrbutton__img.src = me._okinstrbutton__img.ggOverSrc;
			}
		}
		me._okinstrbutton.ggUpdatePosition=function (useTransition) {
		}
		me._instructionbox.appendChild(me._okinstrbutton);
		me.divSkin.appendChild(me._instructionbox);
		el=me._toolbar=document.createElement('div');
		el.ggId="toolbar";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 47px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 4640px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._toolbar.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._toolbar.onmouseover=function (e) {
			me.elementMouseOver['toolbar']=true;
		}
		me._toolbar.onmouseout=function (e) {
			if (player.transitionsDisabled) {
				me._controlspanel.style[domTransition]='none';
			} else {
				me._controlspanel.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._controlspanel.style.opacity='0.5';
			me._controlspanel.style.visibility=me._controlspanel.ggVisible?'inherit':'hidden';
			me.elementMouseOver['toolbar']=false;
		}
		me._toolbar.ontouchend=function (e) {
			me.elementMouseOver['toolbar']=false;
		}
		me._toolbar.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._controlspanel=document.createElement('div');
		el.ggId="controls-panel";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #e0e0e0;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : -2px;';
		hs+='cursor : default;';
		hs+='height : 48px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 4640px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._controlspanel.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._controlspanel.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._buttondown=document.createElement('div');
		els=me._buttondown__img=document.createElement('img');
		els.className='ggskin ggskin_buttondown';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAD/klEQVRYhdXZv2sbZxjA8W9kCakBy4MlPMgashheQ4MKwaAOms40g+2AaAsuBTt1i6d4SClyutgelFqQdEihydCl/4Agjje/UxdDl8py0QteShGHF7tVT+CeKtl0yJ1zluXT6Yft5Bnfe189H7333ul9H92gxwgEQ2NAHLjZdOkIKNdr5l4vn3+jC9AwkACSQFwIQSwWY3xcnOlXKil0XUcpBVAGtoFCvWYeXgrQgk0DSU3TmJzU0DSNcDjsOs4wDKSUbG1JpJRY0FdeoZ6AgWBoGphKp9MsLT0gFot5GXYudF3n2bMfyOfzAJv1mvmqJ2AgGIoDc0KIeC63jhDCrbvnUEqRySyjlCoDP9drZvmivgNtcA/n5+ciz5//SDQa7QsOIBqNMjs7S7VqDB'+
			'UKO3cG/P7SyXHD8Ay0cbnc+s3FxcW+wZojlUoxOhoLSCkvRJ4DOnHpdPrScHYIIVyR54ADfv/S/Pxc5DJnrhWyWjUChcLOrZPjxi/Oa2cekkAwNC2EmNrYeHllOGfMzNxDKXXm6fY5cMPAVC63fi04ACv3lGUBHEBgOp1O9+1V0k0IIbDW/bTd5oPT2UsuLT24JtqbsAxJexbtGUxomtb1L0Q/IxaLoWkavP69PwUmJye1toN3i8XBzz+bTe0Wi4OdJt4tFge/Wvjiw0ql4m/X17IkncC4pXZNsLa6MlGpVN5bW12Z6ARpj93f3x/85uuHE+2QliUO4AsEQ2NCCNddiZ3ANE0/gGmafq/I5rFekOFwGCEEgWBozAcMt1t7ufXvPrAT2OEF2Yyzw0a65bRMwz4g0rzZbI7M8qPfQqFQo7ndDXkRzo6P7t790y2nZYr4'+
			'3DrZ8f7t29WV1bVfvSLb4ebv3//9408+1b3k9gTsBNlPXEdAr8h+4mzgQamk+obsF84yHfiAQ13v6Eu5IvuBg9fnF+DQV6+Ze0opDKPljrtnZDc4wzBQSlGvmXv2GixbR8K+IrvBAfbxtAxvHpLtra3OgW7IbnEAlmXbCSxIKel0LV6E7AWn67o9gwWwziQnx41/B/z+iGFU4152Na1iZGTkPyHGD+Lx+D/d4gCy2ccopbbrNXMbHGcSa4P4eGPj5bXtqpVSzMzcA/jWLo2cvqiths1MZvlacABW7k1n3ebMsfPkuLH319+VRLVqDKVSqSvFZbNZpJTles38ydne6lz8R6Gwc2d0NBa4qludz+d58uTpEfCi7cH95LhhDPj9JSnllSDz+TyZzPIR8H2rIlLL2owTWa0agcu63dls1p65lrgLgU5kobBzS0o5lEgk+l'+
			'bhUkqxsPAlUsoy8MKt/PZuFzCbkG9vCbgF9O0roruAx4BhINJ06QA47PVviP8BOytyRAI05okAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEJElEQVRYhd3Zv28bZRzH8Xf8Q46RIkfYIpGCdSISgckXpDpRGJDKkA7NeclsI6q4LHao2iRIkE78kOjAUGUAnAV7q5jO+Qu6RLkb4CxUQRnQYZAIjZGvlWIb/xBD7hrH8Y+z4yTAZzw/j5+Xvs/9eO65Ec4Yt2d0BvADgZafDoF8tVJ+fJb/HxkA5AdmgQUgKIohBEFADIkn2mk5DV3X0bQcQB7YBb6vVsqFcwGaMAlYiEQkIpJEJBJh3Ofr2q9oGMiyjJzNIstZTGjWLtQW0O0ZlYClWDTK3c2PEATBTrdT0XWdjz/5lHQmA7BTrZSzZwK6PaNB4B1RDAW3UynEUGggWGu0XI6VeBxNy+WBb6qVcr5TW2cP3O1kMhH49sEDJicmhoIDmJyY4GY8Tt'+
			'EwfIqiXHG6XI8a9dpT20ALt536+oWNtbWhwVpzbXERQRDccjbbEXkK2IyLRaPnhrMiimJX5Cmg0+VaTSYTgfOsXDtk0TDciqK80qjXHjb/duIicXtGJVEMLal7exeGa054fh5Ny524uh1NOD+wtJ1KXQoOwBx7ybQATUBAikWjQ7uVDBIxFMI87yXr2Ag8r95nP//048A34WFF13Vefe11gA+rlXLBquBsJCJdOg5AEAQiEQmOnvfPp3ghIkkdO1lRVXXs7atX31JVdazfgVVVHVu6fv3NvwoFV6+2pmUBjqf4qz/3/+j64FdVdWw1kZgrlUour9dbu7+1pYTD4Wd2cVbfl4PBZ+l0WnnR7691al80DF6amKRaKb/ncHtGZ0QxZBsHUCqVXKuJxJydSrb2/S2fH4vFYnPdKjnu8yGKIdye0RkH4O917n2wsfGGNYAV'+
			'O8hWnBUL2W1M0+R3AIHWxWZrPr937zuv13tqSrohO+GsLC8v693GNE0BR7dGVsLh8LP7W1uKXWQv3Pu3bv3w7o0bv9sZ2xawH+QwcX0B7SKHibOAB1pOGxpyWDjTdOAACrre9XztCzkMHBw98oCC7Rt1u/Q63wbFnbhRm8fysiz3hYPelRwEB2Ba8nB8kezK2Z5vgH0hB8UBmJZdGOJyq3m6z4JrXW45ARr1WsnpcgUMwwiaS52+MzU19bc4O3swPT1tDIoDWFvfQMvldquV8nEF4biKqrJ3aatqLZcjPDcPZvWg6UZtHthZiccvBQdgjr3TvG9z4rWzUa89fnJQmC0ahu/a4uKF4u6sryPL2Xy1Ut5uPt7uvfgXRVGuCILgFsXuq5xhJZ3JsLl59xD4sueLe6Nee+p0uR7J2eyFINOZDCvxm4fAF+02kdruzTQji4'+
			'bhPq/pvrO+blWuLQ7+y9tvcFTJRr328MlBYSSV2p7R9V8RxRDj4+MDwXRdZ219g0Qyyf7+/k61Ut7utO1m5f+xBdwG+u/bRO8C7vQZ4gAonPUzxD/sGYrNe/jvhwAAAABJRU5ErkJggg==';
		me._buttondown__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEF0lEQVRYhdXZTWjbdhjH8W9kCdvNGySmYQMl6yUXxyOlXcCjDAo5JMSBsh3CfOhgrIysbN2WSzpGu8HodulYT+lhMHYJ5Fyb+tDTKARG3qjjHnIZi+ig4LiVxmI5kpUdIiWOY8uyozTb7yhLfj78E0nP/3Ebx4wUDA0CvUCk6qNtQDFK+sZxvl9sAdQLDANxQI5FJfplkTeHpEPnPVk32FRMsjkAFGARWDNK+lYz9dqahE0C8YmxMImxMBPjIbq7BNfrVM0i/VAnlSmSzhSxoQ+8Qj0BpWBoEkgkp9q5OdNFvxzwctmRbCplvr+rMb/wD0DKKOkPjgWUgiEZ+CAWleS5ez3EopLb6Z6TzRlM3yiQzRkK8KtR0pV659ZdChv35fS1jsj8LxH6zra2ar'+
			'XSdzbAh1c7UDWre2ll52JAFJ9aZVPzDHRwcz/1nPni007fYNUZvRxiQBaldKZYF3kEWIlLTp05MZyT2JDkijwCDIjiZ9PXOiInuXK1kKpmSUsrO+essvlb5WeHbhIpGJqMRaXE40d9rwxXmUujz8nmjEN39/5DzH7OJebu9ZwKDsCunbAtQAUQmExOtfv2KGklsahEcqod9l4IgA20xfGbM12nRDuIbYg7q+is4PDEWLjlN4Sf6ZcDTIyFYe99vw+MJ/YOumZ5dbdz/IrxzvLqbtO3+PLqbue775tvF140blBsS7wSKE+MhxoWmJk1RwovCM/MmiPNIJ1rn/212/nRJ+ZII6RtkQEEKRgajEUl167EKVDU9764qCN6RVZf6wXZ3SUQi0pIwdCgAPT2y+6r/vW35nmngBMvyGqcEwfpVtM29QpApLrZrM53t8XVcAiz'+
			'+rgbsh7OyZVJ4U+3mrYp4t5t2rlwvu3vuz+Iv3tFNsJd/ziwfjUpPPNS2xOwGaSfuKaAXpF+4hxg/sm64RvSL5xtygvA1qZypFbLSD9wALZpSzBK+kY2Z6Bq1okgW8GpmkU2Z2CU9A3nf1BJP9SbAnpBtoIDsC0KHNwki6m9PatvyFZxAKmD/fM+cC2dKbKplH1BHge3qZSdDf4a2HsSq2wWA6IYUbVd2UtXUyuvv9a2ExsS8m8MtKmt4gBmb6tkc8aiUdIXoWJPYjeIdx4/6ju1rjqbM7g0+hzgK2c0sv+gtg+kpm8UTgUHYNdOVc5tDrXQVtncyBeEYVWzukcvu/eHfmf21kvSGV0xSvrPlcdr7Yv/WFrZuTggi1KsQZfjV+YXtvnmjroN3G+4cbfKphYQxafpTPGVIOcXtpn+vLAN/FhriFRzl1SJVDVLOqk/9+'+
			'ytl87K1cTVBVYil1Z2zqUzxe63LgR9m3BlcwbvJfOkM7oC3Hcbv/2/B5hVyP/uCLgGtIkhugGvYojuAq73M0Qe2DruzxD/AktxXLNYEnoAAAAAAElFTkSuQmCC';
		me._buttondown__img.ggDownSrc=hs;
		el.ggId="button-down";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 2111px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttondown.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttondown.onmouseover=function (e) {
			me._buttondown__img.src=me._buttondown__img.ggOverSrc;
		}
		me._buttondown.onmouseout=function (e) {
			me._buttondown__img.src=me._buttondown__img.ggNormalSrc;
			me.elementMouseDown['buttondown']=false;
		}
		me._buttondown.onmousedown=function (e) {
			me._buttondown__img.src=me._buttondown__img.ggDownSrc;
			me.elementMouseDown['buttondown']=true;
		}
		me._buttondown.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttondown__img.src = me._buttondown__img.ggNormalSrc;
			} else {
				me._buttondown__img.src = me._buttondown__img.ggOverSrc;
			}
			me.elementMouseDown['buttondown']=false;
		}
		me._buttondown.ontouchend=function (e) {
			me.elementMouseDown['buttondown']=false;
		}
		me._buttondown.ggUpdatePosition=function (useTransition) {
		}
		me._controlspanel.appendChild(me._buttondown);
		el=me._buttonup=document.createElement('div');
		els=me._buttonup__img=document.createElement('img');
		els.className='ggskin ggskin_buttonup';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEGUlEQVRYhdXZT2jbVhwH8G9sKTaF2AHbg6D4kBQCL714kBTCiumYcos7MFshpzh0EDpYDu2Kw/6wduASs7aHZGt62KXXHdStSU59Y6WXwHZR0uIHvYxhRC5xaiTIZPyHHSIV2bFl2bKT7neUfs/v4ye95/d+HoDL4H3+CQBRAOcabh0ByJdL+ms3nz/QBSgEIAZgBkCUEAJBEDA5SerycjkGRVHAGAOAPIAdAHK5pBf6AjRgCQAzoihidlaEKIoIBAK27VRVBaUUz55RUEphQDedQh0BeZ8/AWAumUxiefkLCILgpNmJUBQFa2vrkCQJALbKJX3TFZD3+aMAFggh0Wx2FYQQu3THwRhDOr0CxlgewONySc+3yvW2wd1IpRbCGxsPEYlEeoIDgEgkgv'+
			'n5eWiaGpTl3Skvx+Vq1YrqGGjistnVc0tLSz2DNUY8HsfoqMBTSlsiTwCtuGQy2TecGYQQW+QJoJfjllOphXA/R64ZUtNUXpZ3x2rVygvrvbpJwvv8CULI3NOnv50azhpXrnwMxljd7PZYcCEAc9ns6pngAMDoe86wALAAASSSyWTXS8nLvb2h9K0v3y8Wi1y3QEIIjPc+YV4bAN6O3t3nz//oahF+ubc3dOf2dxd1XedGRka0H+4/+HN4eLjSDVJRFFy+/CEAfFUu6QVzBGOiKLrGAcD+/v7QrZs3LnY7koIgQBRF4Pj3/u0jnpmdFV3jzHCLNCwzVmDUULvG9QJpWKIA4OF9/glCSNtdSSc4t8hAIABCCHiff8IDINTJu+cU5xZpmEIeAOHGzWa3uLHx8cNeIQ1T2NMu0SluanpaWf/xp79Si4uveoUE6hdqV7jb'+
			'd75/BQCffHpV6SWyLbATnBm9RHoAHORyrGWCqqp8JzinyF+fPLGdmYbpwAOgoChKy8QPLl06bNaRHa4dcmp6WkktLv5j19YwFby1aqVw+KaYSKUW4PP5miZPXrigDQ4O6rIsv+cU56atqqrIZO6iXNIfewHAy3Gx8+fHg3Y7GbOjQDD479fffJtzgmtsy/F82ckX297eBqU0X6tWXpi7mY9EUby6sfGwk377Ftevfw5K6S/lkv67OYtlSins3sXTCkVRzAO+DBjLjHHK31lbWz9D2nEYhh2z8mBdBzclSTJrKWcSjDGz6nDyTGKIt9LplTOgHYfR95a1blN37KxVK68P3xRjmqYG4/H4qeIymQwopflySf/Zer3ZufhvWd6dGh0V+F7VYtqFJEm4d+/+EYBHbQ/utWpF9XJcjlJ6KkhJkpBOrxwBeNCsiNS0NmNFap'+
			'rK9+txZzIZc+Sa4loCrUhZ3h2jlAZjsVjPKlyMMVy79hkopXkAj+zKb//vAmYD8t0tATeBvntFdBvwBIAQgHDDrQMABbd/Q/wHiKd62jh4ly4AAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEMUlEQVRYhd3ZP0wbVxzA8S+2T7YiIUONAlKLTh2KO/lASkBIYWpDFu6mis00iXC64AQlOENLpiQdk6WR2tpL8FST6Y61CwvBXmorQm06VFcXqRQb+RIJbPmPOnCmxvgftgltf+Pde34f/975vXs/99BhCHbHCDAMXKi6tQ8k87ns604+v6cNkAsYBSaBYUnyIIoikkc61i6eiKPrOvF4AiAJbAA/5XPZ9JkATZgMTCqKjCLLKIpCn9PZsF/GMFBVFVXTUFUNE6q1Cm0JKNgdMjAz5/XyYPkrRFFspduJ0HWdh48esxIOA6zlc1mtI6BgdwwDn0uSZzgUDCJ5PG3BqiOeSDDv8xGPJ5LA83wum6zX1toEd9fvXxh4EYkwNDjYFRzA0OAgt3w+MobhjE'+
			'ajl6w221apWHjTMrCMCwW/v3B/aalrsOq4Nj2NKIqCqml1kSeAlbg5r/fMcOWQJKkh8gTQarPd9vsXBs4yc7WQGcMQotHoh6ViYb3y3rEfiWB3yJLkmYltbr4zXGVcnpggHk8c+3VbKnAuYCYUDJ4LDsAce8a0ABVAQJ7zetteSmKxWO+N69fH9tJpW7tAyePBfO7l8rUeOMre17/+8nNbi3AsFuu9vbAwfnBwYPtgePjtyspK9D2Xq9AOUtd1PnJ/DPBlPpdNlzM4qihyxziAP5LJ3rm5ufF2MymKIooiw+F+fzTFk4os1+3UKq4cnSJNyyT8M8Xf/bXzZ9ONvxVcZbQ73RnD4OLgEPlc9guLYHeMSJKn6zhoP5N9TieS5EGwO0YsgOs0z16ruE6RpsllAQaqXzbbxbnd7r1uIU3TgKVZw1ZxV6amtn9YXY3dWVx8'+
			'1S0kHF+oO8J98+zZK4AbN29udxPZFHgaXDm6ibQAqXgiXreBkckIp8G1igyHw+83gpmmlAVI67pet+GnV6/u1RqoEa4Z8srU1PadxcX6g3K45QFpa6lYSO+m0rLf78fhcNRsPDY29tZut2c3X7682Cquk74Zw2BpKUA+l31uBbDabKNu94hTkuovN+WB+vv7D548fbrVCq66ryAI+Va+WGR1FVXTkqViYb281X2iKPLsi0jkNOOeWXw2O4uqapF8LvtjV163uhk1X7fMU/7Gw0ePzxUHYBo2ypWHozNJOYux6GbXDuinjXgiweXxCTCzBxULtXlhbd7nOxccgDn2WmXd5tixs1QsvN5NpUczhuG8Nj39TnH3AgFUVUvmc9lQ5fVa5+LfotHoJVEUhUbLTjdjJRxmefnBPvBt04N7qVh4Y7XZtlRNeyfIlXCYed+tfe'+
			'BJrSJSzdpMJTJjGMJZTfe9QKCcuZo4+C+X3+Awk6ViYX03le4JBkMjuv47kuShr6+vLZiu6ywF7rPg97Ozs7OWz2VD9cpu5fh/lIBrQP99RfQG4BHABQxU3UoB6U7/hvgbkOiMHoC8QxAAAAAASUVORK5CYII=';
		me._buttonup__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEPklEQVRYhdXZT2jbVhwH8K8lPWw3f7zGJmErSil0vrjaMtaFpgxGtxxc7JwGC/jQ0bEuuKXrtl7SHcIOo6WHbutl6aGjFIZHehiDREyH7VIGgTZJQx3n0MuYRTYGtler1JKjP94hUrEd2ZYtx91+R+s9v4/fQ7/33s8euAzi9YUBsAD21T0qARDVsvLIzfczHYCCAMYATABguQjBKMvglSOkpt3DDRVZUUM6AwAQASwDWFfLSr6d8TxtwqYATMSifsSjfsRO+hAYpJr2K0oG+J8VLAkyeEGGCV10CnUEJF7fFIB4YroPly4OYpSlnXTbFVlRx5VrElILTwFgSS0ri66AxOtjAbzPRQg7f30IXIQ0a+440hkVyQsFpDOqCOC2WlbERm0bToWJ+yx5pj'+
			'+UuhXCyHBns2YXI8M0PjjVj6JkBFbWto/SDLNp6JrkGGjh5r8Z2vfp+YGuwepj8oQPB1mG8ILcELkLWI1LTNdnju4Hd4Q0Re4C0gzzcfJMf2gvZ84OWZQMsrK2fcjQtbvVz2peEuL1TXEREv/tl5Ge4arjzcm/kc6oNW/3syRm5rn4/PWh54IDAHPsuGkBUAUEMJWY7us4law+qAzMnNdeK/zT/u5kBRchSEz3ATsbAgBziU3x5fS9FztKwqsPKgMXZ7VxWQFz4CXPk5vfMveG9kPrBJkVdXDjfwHA52pZyVszOBaL+l3jAGDrz8rAh2e18U5ncpSlEYv6gZ39/tkST8R3PnSFs8It0rRMVAPZ2ElfV3DdQJoWFgAo4vWFuQhpeSppB+cWGRikwEUIiNcXpgAER1nn/Z3i3CJNU5ACEKo/bHaKe/mwp9AtpGkKOV7X'+
			'Vrjjxzxb33/H3D83Q290CwnUJmpXuK+vMhsAcCpBbXUT2RLYDs6KbiIpALmHG2rDBkWpQtrBOUX+cEc/0AxmmnIUgHxWbLwrvf0WVbAbqBmuFfL4Mc/WuRn6j2Z9TVOeNnQtnytQU2c/6ofPa39FeZXzPPF6Pcr91cqwU5ybvkXJwKW5ItSycpsGAJphxsKHSYBrkm6sgfa/4JGvfslsOsHV9yUEqpMf9uNPMnhBFg1du2udZt6JRf3vpW4FW/XtSSRO58EL8h21rPxqvcXrvCAjK+rPFQbsHLfMC/46YKYZ85a/fOWa7c2vp2Ealq3KQ3UeXEwtPEU60zjl7HWkM6pVddh9JzHFS8kLtttpT8Ice6m6blNzhDZ07VGuQI0VJSMweaK986HbmJ17DF5QRLWs3Kz+3O5e/PvK2vbRgyxDmqWdbkZqoYQvLhdLAG60vL'+
			'gbuibRDLPJC3JPkKmFEpKfFEoAvrIrItnekqqRRckge7Xcs3OPrZmzxTUEViNX1rYP8YIceON1b9cqXOmMincTOfCCIgK40az89v8uYNYh/7slYBtoG0V0FehFEb0JOAwgCCBU9ygHIO/2b4h/AYKUZas+xR7UAAAAAElFTkSuQmCC';
		me._buttonup__img.ggDownSrc=hs;
		el.ggId="button-up";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 2153px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttonup.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttonup.onmouseover=function (e) {
			me._buttonup__img.src=me._buttonup__img.ggOverSrc;
		}
		me._buttonup.onmouseout=function (e) {
			me._buttonup__img.src=me._buttonup__img.ggNormalSrc;
			me.elementMouseDown['buttonup']=false;
		}
		me._buttonup.onmousedown=function (e) {
			me._buttonup__img.src=me._buttonup__img.ggDownSrc;
			me.elementMouseDown['buttonup']=true;
		}
		me._buttonup.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttonup__img.src = me._buttonup__img.ggNormalSrc;
			} else {
				me._buttonup__img.src = me._buttonup__img.ggOverSrc;
			}
			me.elementMouseDown['buttonup']=false;
		}
		me._buttonup.ontouchend=function (e) {
			me.elementMouseDown['buttonup']=false;
		}
		me._buttonup.ggUpdatePosition=function (useTransition) {
		}
		me._controlspanel.appendChild(me._buttonup);
		el=me._buttonleft0=document.createElement('div');
		els=me._buttonleft0__img=document.createElement('img');
		els.className='ggskin ggskin_buttonleft0';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAE5ElEQVRYhc3ZT0wjVRwH8O+208xsEwZiV5PNKwdbUyyyC4ddJnIQVrqnxcO+qBf/QDQeTITDElNczMImolTjugkHLrrp+Oc6HpTTUg+S7KazJiIEJjZSD3QgMaJkjLWTThsPvNYChc7QLvK7NG3n/frpe33vzfv1FOoMDy/4APgAeAG0spfXAWQBbOXN3FY9+U8dEfU0gDYAnQC8kiQBACSpGwCQTKrsMQkG/QnAz3kzd/+hAT284AXQD+DZcDjspZRCkroRDocPbadpGpJJFYqiQNO0LIDvACTyZi7bMKCHF/oBDEiS5B0eHi73lNNIJlXMzMwgmUxmAXybN3OJuoCs194khIRisdiRYdWg0WgUuq6nAMwe1pvuQ3CtAEYjkUjrnTufIRgMNAQHAH'+
			'4/AaUU6XTal06nL7o5LlUsWIZtIMNdo5Q23779CXiebxiuFDzPY2DgCnRd92qadsHNcavVkPuAbFhHKaXNsdh0w2F74/LlCHRd92ia9pSb4+4XC1b+UKCb40Yopa3HgduD9GqaFigWrF1LkavyiYcX+gkhofHx63V94PLSUtOHseknnbQZH78OQkiIrRjlKPdgacbOzs566pkQy0tLTTcnJ7rX1tYeSaVSp/suXfrNTjue5xEOt0NRlMfdHLdQGuoy0M1xL1FKA0NDg3XjcrkcBwAbGxuiE6TfT0q/x+ZiwVoE2BCz3uscGRluGK4UPzx4QCYnbnTYzcMMncxU/g12SpLkJYQ0FFeKjo6OP+3mIoRAkiQvdvb5MrCH0qsNxwmCYL01PPLj8y+8qDvJySw9AFBKGopEIg3HTUzeVM+dP/+X07zMEgIAl4cXQoQQiKJ4'+
			'InAAIIoiCCHw8ELIBcBX65bpOHGlYCafC8CZ9nb7wOPAAQAznXHVuvD/wFWGI+CXX3z+xEFLSTAY/KPROMAh8J3xd5fPnj1bFbGysvLYG6+/1rO9vV31Cxw1XACymYy9ZaqlpcX66ONb6kHIzc3NprdHr3U3AslMWReAdV23v44eF5KZ1l0AMux4eKKQzJRxsQPL+vz8/IlBMst63sxlS5MkdfeuM+DDRDJLCvhvFicURYFhVD1Y1Y38YOq9c3bzGYYBRVEAIFEGsvrJoizLjoG1kIIgWC+/8uovdnMxw2KpplO5DibicRlOZnQtpNPdRdd1xOMywHoPqLjlLxasLatQ8GYyemBg4MqRkIIgFJ/p7d28f+/eo5ZluZ1ufdHoGDRNS+TN3Pf7gADg5rhf0+n0RVEUvV1dXXUhe/v6NkJtbX/bbRePy5BleQvAp5Vn41'+
			'3AYsHKuzkutbCwcMHvJx6nt2GVyJaWFsvu9Yqi4MaNiSyAmb31xH0H92LBMtwcZ6iq2hUMBhAINK4mcxBuaup9mKb5Vd7Mrex9v2ptpliwMlahsDU3N9fl95OaNcB6cNHoGEzTjB9U3KxVfmsFcC0SiXhjsWnHx4KDwjAMRKNjmJ+fzwK4lTdz6wddW7OAyc6ng6Iodg0NDWJwcPDIUMMwIMsy4nEZhmEsApBrVVqdlIBDAJ4TRTFE6VVQSm0PvaZpUBQFivI1DMNIAfgmb+ZSdto6LqKzYe8HEBJF0RcOh8uV1+7unWK6qu7cHa2ualBVFYZhbGFnb00cNpwNAVbB+gGcAXAau/+G+AfA7wAyTlGV8S+SK5G32LgzsgAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFJ0lEQVRYhc2Zb2wTZRzHv7RXe71ktlkReUHzJERbiLJDYCMSuSXuDbI/78YbvUtENoMbJIIEI8IbxTdsmrhOIx2RtPpG3m0mGM1IOF4QaAK7cxpXTcytwz/EYguxu/OujS/2dHSja3tth/zeXHr3PL9++vvd8/s9z7drUKe53KwfgB8AByBAbycBZAGkTENP1eN/TY1QzwMIAeABcO2CAAAQ6FWWZQDA5YVrFoACYMY09KurBuhysxyADgAv8nwLJ4kiBEEA39JSdp6iqpBlGdFYDIqiZgFcAjBpGnq2YYAuN9sBoKtdELiT755YjJRdk2UZ771/GpdlOQvga9PQJ+sCpFE7SAgJnoucrRmsFOhrff3QNC0B4NNy0VwR0OVmAwAO9vR0+8ciEfi83o'+
			'bAFSydyeBAXx/GxydSFDJZapyzDNwRSRS9X8SiYFm2oXAAwLIs9vX2QtNmOUVVdzgZ5sd8zrpbEZCm9agkit6xyNmGgy23np5uaNqsS1HVZ5wMczWfs8yygE6GOSyJYuBhwC2D5BRV3ZjPWUtKkaP4g8vNdhBCgkNDZ+r6wng83vT28eOb7MwZGjoDQkiQVowHAWlqu85Fzta1IOLxeNPhwcG2by5eJIMDA89WO8/n9eLcQta6KAuAohQ7GeZlSRQ3Hjo0WDfc/Pw8AwCzs7OPT09Pe/Z2dt6uZj4hpPA+evM5awqgZYYSn/555ieOENIQuGJ7YffuW+HR0elq/GiahqdDm7IATpiGni2kmG8XhFWBA4Dt27f/Xa0vQgjaBYHDQp9ffAd3ieIrDYfzeDzWyVOnbr66f/8tOz4pyy7gfoo/u/3nH7YXRyW4j8Ph662t'+
			'rfdsOcVCl1n35HqYhv66w+Vmg4SQRwYOWFjRhBC43GzQAcDP8+W3TA8TrmCUye8AsJZv4R8pOACgTGsdlQb+H3DFZgvwk9HRp1YqJZs2b77TaDjAJuDw8PD3GwKBkhA3b9xY19XZuetOKlXyB9RqDgBZTdOqGtzs91vRaPT6SpBzyWSTJEltjYCkTFkHgGS1gA8TkjIl19A+/NG/+rwtB3dSKUaSpLa5ZLKp1PMNgcC9aDR6vdnvt2oBfIz1AMCbDnpgSY5PTNhysJqRpCzJ4s1CYnzcHuBqQlKWBHC/F/sBfFBLPwYqp/u5bdtuf37+/M1qfBX6MIB3TENPOQCA6idTIyNh23BA+Uh6PB7rjYGBX6r1RRmmCprO4rnY5WaDPp/3aPzaNdS6L1weSbvdRdM0tO7ciXQ6M2waegIo2vLnc1bKtHKcNqtt3NfbWxOgh+'+
			'Pye/bs+X3y0qUnTNN02m19B/r7oSjqpGnocuHekmOnk2F+nZlJtPp8Pm5nW1tdkC/t3fvbli1b/ql23kg4jJGRcArAWPHZeAlgPmeZToZJfPvtdzsIIS6er36Xsxyyubm56voXjcUweOhwFsDIcj3xgYN7PmfddTLMXfmKvDUUCiEUCtUEaQfurWPHoOvGl6ah/7D8eUltJp+z5kwrl/rqwoWthBDUGslq4A709UPXjfMriZuV5LcAgCM9Pd1cIxWuImUrC+DDlZQtYIUIFoym+8rMTGJ9ZCyyXtcN8Dxfs9qVzmRwZmgYoiRCUdQpCldWw7YjAQcBdPt83qAoipBEsaL8WzBFVRGNxRCLxZBOZxIAJgp1rpLZFtFp2jsABH0+r59v4ReV13ZhNwDgsnyFgimQZRnpdCaFhd46WS6dDQEsAbsBwFoAHiz9G2IewF8A'+
			'5uxCFdt/gaimUJOiPC0AAAAASUVORK5CYII=';
		me._buttonleft0__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAE9ElEQVRYhc3ZX2hbVRwH8G/uPfEmNy6xf5ThvCmUeae0sRtbBwv1xTqptIPCYIFWfJh/sHvQbhW2PriHvqwvk4rSSDumCK3kQUHcoIhR2UorA1ldzNA0ICbZBDGNyZo01/snPuSkpm2S3pukZb+XS9uc009+v5xz7/nFhBrDzFmaADQB4AEI9NdRABkAcVnKxmuZ31Ql6hiAAwA6APBdbg4A8Dy93lyQAADz+WsGwM8AfpOl7OKOAc2chQfQDeAFV5uZH/TY0OXm4GozVxwXCMqYX5Aw40sjEJQzAL4D4JelbKZuQDNn6QbQ1+Xm+NEROwoZMxrzCxIuXU5hfkHKALgmS1l/TUCatSGnQETvREPVsFLQoeEEIlElBMBbKZtsBZwAYKS3xyp8+XkzxP'+
			'2VS2kknALBoIdHKKw0LYeVTpaQkKYqKd1Aijs34LE5Pvm4ERauqrVUMSycCSf7eURiKh8IykdYQu6WQm4B0rKODHhsDu9EQ91hm6Ovx4pITDUHgnIbS8iipipyRSBLyNsDHpuwG7hNSD4QlFs1VdmwFTHFP5g5S7dTIOL4mKOmf/jT7dye98bUZ4yMGR9zwCkQke4YW4G0tH3eiQY47MyWCYzgRi4oR7/xay1nzyvtesc57Axo1fqoBUBRiVlCBgc8ttYzbzxaM24tCwIA0Rjsd3/NWXuOM3/pGe8USOHz6NBUZQmgGaTijtERe91whVj4MbfPSCapoaOQxUItO7rcHO8Uym6LVeEKcaiDSeidyymw6HJzPPL3+XWge/CUre44qwXK6Lvs7VcHmHtG5qQWdzFQ7H3ZUnfc5XFyq/+Evs9fcVCLCACMmbOIToEYXrl6'+
			'cIcPmR4YxQH5Fe0UCMycRWQANG33yLSbuEJQUxMDoPm5dv3A3cABADU1G6rrbuGKwxBw6qq6v9xWckA0rdQbBxgEXhojgX1PlkYs3ck98cprSudKovQbqDYYAJk/oqquFzc2QLkySW6VQy6Hc42vn1GO1gNJTRkGQDQSVXQP3A55735uTz2Q1BRlAMTo8fChQlJTjKEHluj1ubWHBkktUVnKZgqLJHRtLmt0nh1DUksI+H8V+2d9aSRT2o4gRy8qLr3zJVMaZn1pAPCvA2n/ZMk7vWoYuB3SaoHy5mk2rHcualgq9HSK90H/5NQqIjq3HD1Io3eXSFTF5NQqQLMHFD3ya6oSl1WWj0TV1pP9fKnx24bVCu14N/PnDzdyjysyWKO3vqHhBAJB2S9L2RtbgADAEvL7cljpfMzB8J2HH6kJ+dKLzP22Z01pveO806vwTq'+
			'/GAVwpPhtvAGqqIrOEhL79PnukRSBml4GnnM3IxgaT7t1/1pfB2fOJDIAPN/cTtxxCNFVJsYSk5hekg+LTpK49mXK4Cxf/gSTlZmQpG9z895KnJE1VYrLKxr/4au1gi0BQbSb14IaGVyBJuU/LNTe3a78JAM719lh57we1HeiLI5nSMPROAtfn1jIA3pelbLTcayueM2m5by6Hlb1XP0vvlf7NwdVurrrblUxpmPjoAU6/tYJAUF6iuIo9bCMtYBHACYedEQc8PAY9tm3bv4UIBGXM+NKY9WWQTGkhAF/LUjakZ6zhVNCydwMQHXamydVuXm+edx3LX+cX809Hd37J96eTKS2O/L3VX6mcdQGWwD4FoBmAFRu/hlgD8DeAmFFUcfwHYbl9/pyoIm8AAAAASUVORK5CYII=';
		me._buttonleft0__img.ggDownSrc=hs;
		el.ggId="button-left";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 2195px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttonleft0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttonleft0.onmouseover=function (e) {
			me._buttonleft0__img.src=me._buttonleft0__img.ggOverSrc;
		}
		me._buttonleft0.onmouseout=function (e) {
			me._buttonleft0__img.src=me._buttonleft0__img.ggNormalSrc;
			me.elementMouseDown['buttonleft0']=false;
		}
		me._buttonleft0.onmousedown=function (e) {
			me._buttonleft0__img.src=me._buttonleft0__img.ggDownSrc;
			me.elementMouseDown['buttonleft0']=true;
		}
		me._buttonleft0.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttonleft0__img.src = me._buttonleft0__img.ggNormalSrc;
			} else {
				me._buttonleft0__img.src = me._buttonleft0__img.ggOverSrc;
			}
			me.elementMouseDown['buttonleft0']=false;
		}
		me._buttonleft0.ontouchend=function (e) {
			me.elementMouseDown['buttonleft0']=false;
		}
		me._buttonleft0.ggUpdatePosition=function (useTransition) {
		}
		me._controlspanel.appendChild(me._buttonleft0);
		el=me._buttonleft=document.createElement('div');
		els=me._buttonleft__img=document.createElement('img');
		els.className='ggskin ggskin_buttonleft';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEMklEQVRYhdXZP0wbVxwH8C/2GVtIxQM4qDoMzYL6HA8ecKR08NJjK4vVP7Iq1Y6IanUoQ4fCBKSSJajSDkTCGdqETKkAeUnUDLwlKJWHdDinlV/lpaqs2wxGZymc8Z3VgTtqzNnccbZCf+Pdu/NHv3t37/d+HoDD8Hh9UwBGAIy2naoA2G/UlZKT+w9cAjQCIALgFoAgIQQ8zyMUImfGFYsMkiSBMQYAZQB5AGKjruz3BajDZgHcEgQBMzMCBEHA8PBw1+tkWQalFLu7FJRS6NCnVqGWgB6vbxbAR/F4HPPzX4PneSuXnQtJkrC+fh+5XA4AnjXqylNHQI/XFwSQJIQE19ZWQQjpNtxyMMawsLAIxlgZwONGXSl3Guu+APdNKpUczWY3EAgEeoIDgE'+
			'AggEQigVpN9otiYdrNccWmpsqWgQZubW11KJ1O9wzWHrFYDOPjvIdS2hF5DtiKi8fjfcMZQQjpijwHdHPcfCqVHO1n5syQtZrsEcXC9aam7nUEery+WUJINJvdsPUDO9tbvKZpGBsbO74sMhaLgVLqP6geDjQ19fTjfgrUv3NfPXz4s60XYmd7i9989Cj828uX7xISqjhBRiIRPHnyy5Sb4/JNTT06A3Rz3GfxeDyYSCRs4wBAVVWXU2QgEDBWn6GmpoqnQD17qWx248KVwQxnRC+QoRDB5ubjoJFFl348IgjCpVeI1lAUhbu7snzzj9ev37nM9TzPQxAE4GS9P8mgm+M+T6e/9NtZKUI3btQGBwcVURSvtZ9zmsnj4zoopcNNTd0zMhjU1bbi408+lVK3b/9pds5JJnVLEADcHq9vihDyQSqVsg0E+pNJr9cLSikO'+
			'qoclF4Cg07nXj0zqphEXgKH2YvMqIHXTqOuigXaiH5nsKRA4QU5Ho5LZOUVRuOfPf7U1n3oO3Nne4n9/9coUMR2NSt8uLP5l534cgEqxyHqC+35t9f29Fy8mO+FW7n5n+vjNQjdVOAD7kmT6RGzFyvJSuFvm7OCAk/0LgH1Xo66UGGOQZdOK+63gZFkGYwyNulIy5mBZ3xK+dRwAY3taBv57SfK7u/aB/cABgG7JtwJFSinszMV+4SRJMjIongL1XX5+ff2+5RuFw+Fqr3EAoBvyRuehtaIuM8Y+nJkRLJX8ZkWCUxxjDEtLywCQPVfyNzX1yM1xA6JYmLJa9rcineIAYG7uDiqVyrNGXRGNY2d2dU1NLR1UDyO1muyPxWKWkZOT71W/SCb/cYLLZDKglJYbdeWn1uNm++K/RbEwPT7Oe6xW2BMTE0dOcLlcDvfu/f'+
			'AGwIMLN+5NTZXdHFeklNpCOsEtLCy+AfCjWRPJtDfTiqzVZI/Vx203MpmMkTlTXEdgK1IUC9cppf5IJNKzDhdjDHNzd0ApLQN40K399v9uYLYhr24L2AR69ZroXcB9/RviXxfegoNVeILMAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAETklEQVRYhd3ZTWjbZhgH8L9tGTuBzYGEOsMYsTXzeih+E9IMCvFp4FxiXXcYzliJs0OtrqxxW7b01Hasl9GNlH3YpKy5hewiFTroTunAnXKJxChddyiqCSyLTa0WarmWxQ6RNyVRElmyR7bnqFd69eN5rPfLHrgMfyAYA9APYGBHUxlApVFXH7np3+MA1A9gGMBJAFFC4qBpGiROtt0nSiJkWYYoSgBQAlAEsNaoq5WuAA1YCsBJhkmBSaXAMAz6QqF9n6sqCjiOA8fz4DgeBpS3C7UF9AeCKQCTU+k0Ls19Cpqm7Ty2K2RZxuUrV3FrcREAbjfqKu8K6A8EowDeJyQeLeTzIPG4I9jOECUJ05kMRFEqAfi+UVdLe93rOwD3MctmB5aXljAYDncEBw'+
			'CD4TBmMhlUFSUkCMIJH0U90JvaM9vAFq6Q/673/Oxsx2A7YyKZBE3Tfo7n90TuAppxU+l013CtIITsi9wF9FHUGZbNDnQzc1bIqqL4BUF4XW9qK3sC/YFgipD42PLSUlsvuLmwENE0DZFI5KVT5EQyCY7nQ5vlikdvan8P7l4Trh/AZCGfbxv35fXrx89ks2+vrq6+4hQIAMa7Jw0LAFMGfRT17lQ6HZ3JTLeNAwBN07w/3b37GhkeLjvN5GA4DFl+AlGSevWmtgYY46Ah/uz33x7aHoTNOHP09PRoX83PC2NjY8+dIGVZxptvHQOATxp1tdIq8TDDpBzPEOao1WqUm3LTNA2GSQFb8/1WiX0U9V5udjZECNnv2W0xMjLyPBAIqL/cv39kZ5vbcquqCo7nX9Wb2kqrxN/+ufHHgRO/VexVasB5uauKgiPhQTTq6ode'+
			'fyAYIyTuCAcAH5w6tf7R2bO/WrU5LXdfKARC4vAHgjEvgKjb3143kIap3wugd+di8zAgDdOA96Ab24luZLKjQGALOZ5IrFu11Wo16ofl5Ug7/XUceHNhIfLzvXuWiPFEYv3za9cettMfBaAsSmJHcBcvXDj24507ll/ceCKxPn/jhmX5rcIwlSkAFVmWXeOyp08f3y9z7eCArSkPQMX1QN0N3LaB2rhW4jjuUOAAwLCUgH8+kiLHH7gD/FdwAGBYioCL5Va3cJbLLWOXX7x85artjkZHR592GgcAhqHYOnkwr6hLoiS9wzCMrT2w1XLLLU6UJGRZFgC+1ptabRtQb2o1H0V5BEGIzWQytjo0I93iACDFMNjY2LjdqKtrrWvbdnV6U3u0Wa4MVxUlNJFM2kYODQ09zbKsq8H0XC4HjuNLjbpaMF+32hc/FgThBE3Tfr'+
			'sr7DeOHq25wd1aXMTc3KUXAL45cOOuN7VnPop6wPF8W0g3uOnMzAsAX1gdIlmezZiRVUXx2y13u3Eul2tlzhIH/JeP34CtTOpNbWWzXPHk84WYLD8BIXH09fU5gsmyjNnceWRZtvW1FvY6dmvF/+MI2AJ6+A7R9wF39W+IvwBDLHsPwm04QAAAAABJRU5ErkJggg==';
		me._buttonleft__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEQ0lEQVRYhdXZTWjbZhgH8L+kV1j5WAyJSeiCkmUboeB4zVg7mrBLWA4Jdk49BDzIIKwMM/aR5dCUsbAPWNmh23oY6WBQ1oOht0EsagYbo4dl0CQLdVxGLmPWcumcpPZYJFvSmx0iJY4ju5Jlt9lz1MerH89rvXqfxww8Bu8T+gF0AAiUncoC2NIK6oaX8UkNoA4AgwCGAIihII8ekeCFAf7IdffWNWRkHak0AEAGsARgTSuoW26ex7iETQAYCo81ITLWhPC4AH8bW/W+XJ5Cuq0ikVQgJRWY0EWnUEdA3idMAIhEJ1twebYNPSLn5LZjkZENXLmaR/zWvwCQ0Arqoicg7xNEAK+Hgry4cK0doSBf7XLHkUpriL27jVRakwF8pxVUudK1FVNh4t6PXW'+
			'wNxG8E0NVZW9bsoquTw/RUK3J56l9eLZ7lCLlPDT3vGGjhFr5qb555+6m6wcpjdERAr0h4KalURB4DluKik80Nw1kRGuCrIo8BOULeiV1sDTQyc3bIXJ7yy6vFPmrodyoCeZ8wEQry5+I3ytfc6nEzTrt1HXj6FFOsFTk6IkBKKv7sNstQQz9Y3A8WMXOdiyxca3eN+/obY2B2Tn955bc9T2k3nx0xLQBKMsgRMhmdbBGnp1pc4wBA18H+9DM9FRpgs7VmsquTQ+YvA6m01kwNfQ0wM2iKhy7PttWEs0JRQbxm0jQMWVm0pngwPNZU8xeinsgekUN4rAnY/97vTzFHyGsff+D39z/v/EtxJsT84/Mx6t2Vvc7yc16nu1AApKTSRg39jpVB8ZVhn9txMBVlN996k1u3O+clk+FxAQBEAGB5n9AfCvKP3JU8TqS/jUUo'+
			'yIP3Cf0sALFHdL0tbDjSNHWwAJrLN5snAWmaArXNa4VoRCbrCgT2kcPnmU27c4oK8v0i7XYzXt2BN+O0+5df92wRw+eZzU/nud/djEcAZO+ta3XBffiJcfqHH2lvJdyXnxPb6bcL05QlALYysu4ZN3NJH6iWOTc4ADBNW6xWUDdSaQ25PD0xuFyeIpXWoBXUDes3KEu31ROBAwDTIgOHL8lSYr9mfeI4AEgc1s8HwDUpqSAjG08cl5ENq8A/3A+aVf7Slau2lZ9tvHiG3ak3DgBMw5LVeSjdUcuptPZqZLzJUQ1st93yikulNcxc2gGABWroyhEgNXSFI4S5u1Lsn55qdTRgKdIrDgAuRLN48DdNaAV1zTp2JFXU0Dey2+xgLk/9oyOCY+RzzzI7sTe4P73g5uYfQkqqslZQvy09blcX/7G8WjzbKxI+5HCX0/cM43'+
			'4JKIn4rV189FluF8D1Rxbu1NDzHCH3paTiCukFF3tvexfAF3ZNJNu3oRSZy1Pe6XS7jbn5h1bmbHEVgaXI5dVin5RU/Ode8tWtw5VKa7gQzUJKqjKA69Xab//vBmYZ8uS2gG2gLproGvA4muhVwA39G+I/dMFd1IlH4T0AAAAASUVORK5CYII=';
		me._buttonleft__img.ggDownSrc=hs;
		el.ggId="button-left";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 2237px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttonleft.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttonleft.onmouseover=function (e) {
			me._buttonleft__img.src=me._buttonleft__img.ggOverSrc;
		}
		me._buttonleft.onmouseout=function (e) {
			me._buttonleft__img.src=me._buttonleft__img.ggNormalSrc;
			me.elementMouseDown['buttonleft']=false;
		}
		me._buttonleft.onmousedown=function (e) {
			me._buttonleft__img.src=me._buttonleft__img.ggDownSrc;
			me.elementMouseDown['buttonleft']=true;
		}
		me._buttonleft.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttonleft__img.src = me._buttonleft__img.ggNormalSrc;
			} else {
				me._buttonleft__img.src = me._buttonleft__img.ggOverSrc;
			}
			me.elementMouseDown['buttonleft']=false;
		}
		me._buttonleft.ontouchend=function (e) {
			me.elementMouseDown['buttonleft']=false;
		}
		me._buttonleft.ggUpdatePosition=function (useTransition) {
		}
		me._controlspanel.appendChild(me._buttonleft);
		el=me._buttonplus=document.createElement('div');
		els=me._buttonplus__img=document.createElement('img');
		els.className='ggskin ggskin_buttonplus';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADo0lEQVRYhe3Zv08bZxzH8XeMT7YiYaSAp7OVkgHlYfKQDl48HUOjmEi3MWEplRhaPHQh6u40SGkHSJsEdWj/gZMCUauKZ6qIPHQ5iORHgjYZrNsgrc5SYsuAOnAGYw7/wDa4Uj/jc/fcvXS+57nn+foaXUYLhSeAUWCs4dAusFetlLe7uf61C4BGgQSQBOJCCHRdZ3JSnDqvUFA4joNSCqAI5AG7Winv9QXowdJA0jAMpqYMDMMgEok07ee6LlJK1tclUko86Fq70LaAWiicBu6Zpkk2O4+u6+10OxPHcVhaWsayLIBX1Up5rSugFgrHgVkhRHxx8TFCiGantx2lFAsLD1FKFYGfq5Vy8bxzh1rgvspkZseePfuBaDTaExxANBplZmaGUskdse3NO0'+
			'PBYOHwYN9tG1jDLS4+vj43N9czWGNSqRSxmK5JKc9FngHW40zT7BuuFiFEU+QZ4FAwmM1kZsf6+eT8kKWSq9n25vjhwf7v9cdODRItFE4LIe6trr68NFx9pqfvo5Q6NbqPgd4892h19WXHo/XN1tbwysqL243ty0+//6OT6yilmJ6+D/B1bZ4M1h1Pm6Z5oanEdV3t3du3Nzru2BAhBKZpYllWGvgJIADHTy+Zzc53e4+u4xmSnukICCQMw7jwF6KX0XUdwzDg6Ht/DExOTRlXhmqMZ0nCCTDuqQciniUOENBC4QkhRMtVyWUmEokghEALhSeCQLydd+/N1taw67qa37GdnZ1hv/bXGxu+IzsWj328efOTj83up+s6SqnRIHC9cbHpl5WVF7c7nUq+eZT71K/9s7t3//riy/k/m/WdnBRIKccCzU4ahPwP7DYBYLdQ'+
			'UFftOBPPtBsE9hzHadmh2Yf/9cbGDb8B8eqXX3+7KNAz7QWqlfK2UgrX9V1xX0lc10UpRbVS3q69g0VvSzgQ8SxFOBkk+fX1wQF6ljycAG0pJe28i/2O4zi1J2iDB/RWr/mlpeUrpB3FM+T9VtRrlmUlM5nZjlfVkUikOn7r1vtucUqpWtXh7J4EBnPTdGrbeXiwv/3+738SpZI7kkqlLhWXy+WQUharlfKP9e1+++J3tr15JxbTtV7VYlrFsiyePPn2A/C85cb98GDfHQoGC1LKS0FalsXCwsMPwHd+RSTf2kw9slRytX793LlcrvbkfHHnAuuRtr05LqUcSSQSPatwKaV48OBzpJRF4Hmz8tt/u4DZgBzcErAPdPCK6E3Aff0b4l+QAL+2Jv2t2QAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADpUlEQVRYhe2ZMUwbZxTHf9hngZCQrQQpHWJdIyGIVInLEIq8HEOkdKk9NZ1y7oKRKrUdSrM05wnTAUVZKwFD5etSZbvrUpwltyDhDtxJRIW2Sr+6Q4dQ2RnAlgF18JnYxhgbY3Cl/jd/7313P73z++69dwN0ocDg0DBwEwgDww3m18BuuVTc6eYeA+eAug7cASJAWFEmkWUZZVKp83NcByEEjuMC5IB1YL1cKu71BNADiwKRWCxKXNNQVZVQMNhyX75QwDRNTMvCNC08UKtcKu5eCKD3GD8E7sU1jaT+GFmW27n2CQkhWEgtkjYMgB/LpaLVFWBgcCgMfDKjquHVleVzgzXKcV1mEwkcx80B37aKpv8MuC+Tuj66urJMKBS6EDiAd27cYC6RIF8oBD'+
			'c2NiJ+SXp5dHjwpm3AKtzqyvLwF59/dmFgjfrg/n1kWQ6YlnX3NMgTgLVwcU3rGVxViqLUQv58dHiwfyqglxCfJnV9tJeRawYpxJ8Bx3XHjw4P7FpbXZIEBoc+nlHVe5m1ny4NrlZT09M4jluX3ceA3jn3za/bv3ScrdlsduTJ0tLtxvUfnj3LdnIdx3WZen8a4OtqZks19mhS1891lBTy+cD29va1jjc2SJmcJK5ppA0jCnwH4IPj6EXi2sNu79G1kvpjgIiXDxVA4E5c0y7sIO5GsiwTi0Wh8q4/Box4i32hWDQKlYIEnxfKsLfYF4rFYgDjUIngzRlVvVKgRoWCQWRZJjA4NC4B4Xb+e9lsdqSQzwea2ba2tkaarT/PZJpm9ru3bu2PjY3tN7Md+8gyQojrEjDcDuCTpaXbnR4lX83PTzVb/+jBg9/1ZPK3VntV'+
			'VeWFbY/6Wjn1g/4H7FY+YE8IcdUcJ2TbNsBrCci1A9jqxf88k7nWLCE2XffcZdEfFaZdH/DXC9s+w/1ylS8UEEJQLhV3fF6fmjOtMxusS5NpmgA78DZJ1r2etS/kBWsT3gJupg2DfkgWIURtg18B9KrX9bTx/RWiVbSQWoSaEUltRW0tpFKRuPaw47owGAqVJyYm/ukWznHd6tThZE8C/dk01bWdfkl6JYR4DwaCl12CzSbmWFvL5Mql4modU+2Po8ODsl+SXtm2fVeW5YCi1I/UeqW0YbCQWtwDnrZs3D3IN35Jemla1qVApg2D2cTcHvC0XCr+3WhvOpuphYSBQK8e9/yjR+h6sgqXa+bT9+O3//YAswG0P0fAp4D23xD9FNief4b4F6lYse3XYzx2AAAAAElFTkSuQmCC';
		me._buttonplus__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADzklEQVRYhe2ZT2gTWRzHv0nmkem/BNpgT5NSdi1COlJQDwEvQg+VNHvYPRRy2AWhhy74twftHoonPbnugqAHl1WQQM7t4AgidBHKsrUWx1HpKkLmJKTFGWhn0peZ7MGZNk0m0/xr2gU/xzfzZj68ye+93+8XH5qEBNkhAH0AImWXcgDWaN5Ybeb5TANCfQBGAMQBcHyMIMoxOD5Mdt336jVFVilAkgEACoBFACs0b6zV8z5fnWJJAPHEWAfGxzqQOMsiHPJ7zlM1C8JjA/OiDkHUYYvO1SpakyAJskkA46mJLsxMhxDlArVMqyCrmLh5S0M6swEA8zRvzDUlSIIsB+AnPka4u7/3go8Rr9trRpIppi6uQ5KpAuAhzRtKtXurLoUtd2VqsjuS/jOC/i'+
			'ONrZob/UcCOPdjN1TNCi8tb50MMMwbyyxoNQs6cnd/6+28fL6nZWLljJ5hMcAxRBD1qpIVgqVyqYnOfZNz4IeJp2SFYIBhLkxNdkf2c+XcJFXNIkvLW4OWWfir9NquICFBNsnHyPjzp/1tkyvl9OgnSDLdFd3bgvY+d+P50/66o/XFy2LP7TvmsfLxR38w/9TzHEmmOD36CQB+cfbJ0pMkmZroamgrUbUi+fd9sbfuiWXwMYLURBfSmY0kgAcA4Ae2Vy8+Mx1q9h1NYzvEbSc459RIYqyj4ROilUS5ABJjHcCX835bMD7+ZfBQYLvEgR1BLnGWPTChcmwXDgD8JMgO8TGyZ1bSTsIhP/gYAQmyQwwALsrtnRa+eFnsUbWia4i/fVd03dWfLViukT0Q9enfDPp0r/dFOQaSTPsYAJ3lyaYbt++Yx+rdSmZmzVNu499/'+
			'5/9wdTrw3mvu8WECQdQjh+e7VuGrYLP4AeRevaYH7VGB7ZRjAKxllcKeE7wO/mcLVq9bQPy9QJ40Kmg7rflp3liVZApVsxp9VstRNQuSTEHzxqrzG1SEx8aBSpViuyjATpAszoue+2Zbmd+pn7cFVwRRR1YxD0zKIauYToG/AtiCdva6ePOWa+XXVmyHRbeMei6d2Yj/PNldd1YdDvno0W99683KSTJ1ug6VNQlwOIumXSm0ZRZWc+v+EVWzwqNn2psfXpv9DEE0FJo37peOu9XFH5eWt04OcAzha8hyWkE6s4nrN9RNAPf2LNwts6AFGOaNIOptkUxnNjF1aX0TwK9uTSTXKqlUUtUssl+f+9rsZ2flXOWqCpZKLi1vDQqiHj51ItiyDpckU/yQykEQDQXAPa/22/+7gVkmeXhbwC6idTTRKdCOJrqH8L7+DfEf6P'+
			'u+RwrhQu8AAAAASUVORK5CYII=';
		me._buttonplus__img.ggDownSrc=hs;
		el.ggId="button-plus";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 2279px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttonplus.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttonplus.onmouseover=function (e) {
			me._buttonplus__img.src=me._buttonplus__img.ggOverSrc;
		}
		me._buttonplus.onmouseout=function (e) {
			me._buttonplus__img.src=me._buttonplus__img.ggNormalSrc;
			me.elementMouseDown['buttonplus']=false;
		}
		me._buttonplus.onmousedown=function (e) {
			me._buttonplus__img.src=me._buttonplus__img.ggDownSrc;
			me.elementMouseDown['buttonplus']=true;
		}
		me._buttonplus.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttonplus__img.src = me._buttonplus__img.ggNormalSrc;
			} else {
				me._buttonplus__img.src = me._buttonplus__img.ggOverSrc;
			}
			me.elementMouseDown['buttonplus']=false;
		}
		me._buttonplus.ontouchend=function (e) {
			me.elementMouseDown['buttonplus']=false;
		}
		me._buttonplus.ggUpdatePosition=function (useTransition) {
		}
		me._controlspanel.appendChild(me._buttonplus);
		el=me._buttonminus=document.createElement('div');
		els=me._buttonminus__img=document.createElement('img');
		els.className='ggskin ggskin_buttonminus';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADaklEQVRYhe3Zv2sbZxzH8XfkOyQCkaG2prOGLMaPJxWCQYu0nDcrhUtb8GRDCp6ioYv8DwisknZwoMnQpf/AQWNvfqYuWs+LHvCQDMdlipNyAiMh23TwnX2SJfmw9avQz3jPc9KLR89z9zxfPeKB0ZOpZWABWOxp+gycdtqtk4d8/qN7gBaAHJAHskIIDMNgdVV09Ws0FJ7noZQCcIE64HTardOxAANYCcibpsn6uolpmqTT6aH3+b6PlJKjI4mUkgB6EBcaC6gnUyVgw7IsyuVXGIYR57Zb8TyP/f032LYNcNhptw4eBNSTqSywJYTI1mp7CCGGdY8dpRSVyi5KKRf4s9NuuYP6zt2B+3l7e2vx7dvfyWQyI8EBZDIZNjc3aTb9ecc5fjanaY3Li3'+
			'M/NjDE1Wp7j3d2dkYG602hUGBpydCllAORt4BRnGVZY8OFEUIMRd4CzmlaeXt7a3GcI9cP2Wz6uuMcP728OP872ta1SPRkqiSE2Hj//q+J4aJ5/vw7lFJdqzsRwS0AG7Xa3lRwAMF3bwQWIAIESpZljexRcp8IIQjmfSm8loDr0cuXy6+mRLtJYMiHoxiOYM40zXu/IUYZwzAwTROu3vfXwPyLF+N/pMTN+roJV5uRa2B2bW1taqDeBCOYBUjoydSyEOLOXckkk06nEUKgJ1PLGpCNO/d+qe2tuK77ZBSIYrH46fsffvQGtRuGgVJqQQMe9242B8V13ScfP3z4ZhTAlZWVr8PaV1cFUsrFxLBOs5D/gQ+NBpw1GipW52Kx+OmuuRM3udy3X4a1B6bPGuB63sDF1JVhq27UCUyniU67daKUwvf77rinEt/3UUrRabdO'+
			'wjnoBkfCmUhgceFmkdSPjmYHGFjqcAN0pJTEnYvjjOd54Qg6EACDU359f//NFGlXCQz1sPIQfQ4e2LYd1lKmEqVUWHW4fSYJxIeVyu4UaFcJvvswWrfpOnZeXpyffPn6T67Z9OcLhcJEcdVqFSml22m3/ohe73cu/ug4x8+Wlgx9Ugco27Z5/frXM+DdnQf3y4tzf07TGlLKiSBt26ZS2T0DfutXROpbm4kim01fH9fPXa1Ww5HrixsIjCId5/iplHI+l8uNrMKllOLly5+QUrrAu2Hlt/92AbMHObsl4D7Q2SuiDwGP9W+IfwHzhJ0uKWNfBgAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADY0lEQVRYhe2Zz2vbZhjHP45lEgLFZglLDzXvLusKY1YPbZNclEOgbaD2cTdnrFgZg22wldKxyackPXbHQuxT3L9A6mUpO0yXQNhh0qEsHSTTzMoOzRb34MpTEnaw7Mlu7JjEvwr73vQ+r6QPz/s+j97nUYgzKDI6Ng5cAOLAeJP5BbDnVdxnZ3lH6BRQE8BlYBaIy3ICIQRyQm6YZ9kWjuNgWTZAEdgENr2KW+4JoA+WBGZTqSSL6TSKohCLRtvet18qoes6umGg6wY+qOFV3L2uAPrLeAuYX0ynyWrfIoTo5NmvyXEclldWWS8UAB57Fdc4E2BkdCwOfDSnKPF8bu3UYM2ybJuMqmJZdhF42M6b4RPgvspq2mQ+t0YsFusKHMD5qSmWVJX9Uim6tb'+
			'U1G5akp0eHBy87BqzB5XNr4198/lnXwJp14/p1hBAR3TCutIJ8DTAIt5hO9wyuJlmWg5A/HR0evGoJ6AfEp1lNm+yl546DdJzfI5ZtXzw6PDCDtoYgiYyOfTinKPNPNr7vG1xQV6ensSy7IbpHAnATwHw+tzYQOIB8Lgdwy2cBAoBAMqtpXUslp5GcSODv+2RtLAR1793/dfuXgQJCNZm/+94lgC+9iluuefDyYjo9cDgAIQSpVBKq3/r6Es/6g0OhVDIJ1QMJIT+1fPeP+6rtTf3UfqnE21Pn8SruJyPAhTlFGTRTg2LRKEIIIqNjFyUg3une+/revUu7OzvnugFxc2Hh+ce3b//Ryv6OEDiOMyEB450C7u7snNve3n6rG4AfJBJ/t7MrisKPpjk50m7SMOh/wLNKAsqO43Q0+ebCwvOT9k6nmpmZ+aud3TRNgBcS'+
			'UOwUsF3UdVu/VZn2hj9R+3VqUTdOLLD6Jl3XAZ7Bf0Gy6desQyHfWT/Dm3Lc8uvSzfXCo4HCASyvrEKgRVKvSYbBi5Ztc/XaNMA3tWK+nqj9gR8y6tJA4AAyqgrVlki909BQdoYladdxnPchFO33ESyjLrGx8aToVdx8A1Pw4ujwwAtL0q5pmleEEBFZbmyp9UrrhQLLK6tl4EHbwt2HfBmWpKe6YfQFcr1QIKMulYEHXsX9s9l+bG8mCAmhSK+W+87du2hatgZXPG7O0Lff3uwGZhPocLaAW4AOXxO9BWzPf0P8C4JxnoqtS62hAAAAAElFTkSuQmCC';
		me._buttonminus__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADp0lEQVRYhe2ZMWgbVxiAP0l3SJETCRS3XXIyXUypo+LBHSSUoSgEFztTIQIVUih00BTTeKiGltKh7lAHd9LSWeBCJ1tESyi0wlpCCVWVwS0Y69LQgu3UAkt3OZ3c4U726Wypsn2yXOi3ifd09/G/+9+9/z8XZ0D0+vzANUAC/LbhLWBbU5X1s9xDOIXUVWASiAJSZEIkLAm8dV3smPfLrxpVuUm5AoAMlICSpir1k9zPdUKx20B0ZvoS7yf9xGNeggF3z//t1lrkHyqsFhrkCw1M0RVNVbYdETSXcRZIpJIjZO4HCEuefq59hKqss7BYI7e8B7CqqcrKmQRFr08CPojHvFJ2KXRqMTvlikb63g7liiYD2V7R7HpHU+7jzHxgNLsUIhjsvZQn4bVXPX'+
			'x49zK7tVbw8c8vox5BeNrSm7W+Bdty2aWQP/3RZcfE7Nx8x8eYJIj5QmOqm+QRQatcKmnfOZwncl20Sj5u6c1GV0EzIdKZ+cDoICN3nGT1mS6WK9p4S2/+aB3rSBLR67sTj3kT+e9fOTc5K/Gbf1GuaB3ZffDkm/tcIrsUGoocQPabEMCs6QJYBIHbmfnT73FOEJkQSSVHwHghAKagaRxN3RkZktohmfsBgKiZDwcRnEwlR4YavTZhycPM9CUw3vUHgtHZad/QpOzMGoKTAG4zlJJpfSGYedcHMA5GBK/FY96hCtkJBtyEJQHR6xsXACks9Xcs/PQL/Y2Nzf0rTkjcSrif3025/+g2HpY8VOXmVQHwj/WZHBub+1d++33fkY0y8ub+i17jN2JeimvqqHNHlAHxv+BZEYD6pqz3NflWwv38356dfnl7yrXTa/ynNRVg'+
			'SwDkqtzs66K9ss5pqkbQtt3As6Jhe2HYrbWoyk00VVl3m3WqbJaEF4L8QwVgHQ6TpLRaUIYmZGfVCNYTOBR8klvea6/7UKnKurXANwTNurSU+25viGoGC4s1sLRIrPvgysLXtaFGsVzR2l2HozWJGcVH6bme29NASd/bAaMlctBp6DgleARhoyrrEy4XwfM+gqXnXvDoB0XWVOXbDifrj5be1DyCsFFcU6fGJEGM2FpqgyK3XOerxVodeNCzcDclax5BeJovNM5FMrdcJz23UwceaKryp3382IOgVdLlQhzUcn/y2d98/uVuW04+bk7Xk2pbsrimvl4sqcEbMZ9jHa5yReO91Bb5giLTJXJt/tsNTJvoxWwBdxE9QRNdg/NooneRHfhniH8AD5mXef/sYq4AAAAASUVORK5CYII=';
		me._buttonminus__img.ggDownSrc=hs;
		el.ggId="button-minus";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 2321px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttonminus.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttonminus.onmouseover=function (e) {
			me._buttonminus__img.src=me._buttonminus__img.ggOverSrc;
		}
		me._buttonminus.onmouseout=function (e) {
			me._buttonminus__img.src=me._buttonminus__img.ggNormalSrc;
			me.elementMouseDown['buttonminus']=false;
		}
		me._buttonminus.onmousedown=function (e) {
			me._buttonminus__img.src=me._buttonminus__img.ggDownSrc;
			me.elementMouseDown['buttonminus']=true;
		}
		me._buttonminus.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttonminus__img.src = me._buttonminus__img.ggNormalSrc;
			} else {
				me._buttonminus__img.src = me._buttonminus__img.ggOverSrc;
			}
			me.elementMouseDown['buttonminus']=false;
		}
		me._buttonminus.ontouchend=function (e) {
			me.elementMouseDown['buttonminus']=false;
		}
		me._buttonminus.ggUpdatePosition=function (useTransition) {
		}
		me._controlspanel.appendChild(me._buttonminus);
		el=me._buttonhome=document.createElement('div');
		els=me._buttonhome__img=document.createElement('img');
		els.className='ggskin ggskin_buttonhome';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFV0lEQVRYhdWZXWhTZxjH/01yckIvEpknDJZEsdDQt44RsPZjYNxFdDhshVwMyi6sc1KktYMxqeyiMiHTglNM0SrdRCfT3SytdVOhhzlqIXXEkg7WVwIq0p4qJnX2nNEk5yTZLpbUtEnz0aaz+1++H8/7y5v3efI8T8qwQjGszgpgPQBu0VQIwIwSjQRWYr9sGUDrAdgANACwEEJgMplQXU0WrJuYoBAEAZRSAJgE4AXgV6KRmVUBTII1AmhwOBzYscMBh8MBvV6fc58oiuB5HkNDPHieRxL0RqGgBQEyrK4RwG6n04mOjkMwmUyFbMuQIAhwu3vg8XgA4CclGrmxIkCG1VkA7CWEWLq7T4AQkmt5waKUorPzCCilkwAuK9HI5FJr1XngPmtp2cv19p'+
			'6D0WgsCRwAGI1GNDc3Q5JEg98/XqPWaCYS8ZhYMGAKrrv7RHlra2vJwBbLbrfDbDYxPM8vCZkBmA7ndDpXDS4lQkhOyAxAtUbT0dKyl1vOzbnPuLfcu3fvrbr6uqfFQkqSyPj945sS8dhw+twCJ2FYXSMhZPfg4PWiwKampsp7z/Y2hEIhAwBwHDd7sO2gFwDu/HJnI8dxc7s+2PUkn52mpj2glC7w7vkbTMa5gxcvfluUQ/h8PuPZnrN2SZLKtVqtolarE5IklY96RzcqipIYuTtCpL8k7fb3tucFtNlsuHbtB6tao/Em4rEwAKjS5hudTmdRoeTKd1dI34W+bbIsMxzHzba1tw23tbcNcxw3K8syM3J3pKi4RAhB8t03psbUwPzttfT2nsv7ywAAoigyZ06fqR33j1cAwOa3Nz9pP9T+m8lsmuOMXHRr7dap6elp'+
			'XfB5cB0A4G+gvqH+CcuyiXy2q6sJLl26bEndohoA1BrNuw6HY3Nzc3NeuAf0geH0qdP2Z8+evQEAO9/f+fu+j/f9kX44y7KJuvq6p7IsKw8fPnxTlmVm1Dtq2bBhQ5AzctFc9vV6PSilePTo0UwiHnucAvzo8OHPDRUVFTnhbt28tfHq91drw+GwTqvVKh2fdvxq325f0mOrq6tfVFZWTo/dH7OEw2Hd2P0xS1lZWbSysnI21zmyHAXP8/pEPDaceoOW2tranHA+n8840D+wRZZlxmQ2hVzHXberSFXOgwCgilTNuo67bpvMppAsy8xA/8AWn8+X0wsdDgcAWABAxbA6KyGkoLcH/BtCuo52Dev1eqWgDQD0er3SdbRrmOO4vB8ouR6EEDCszqoCYCkmO2F1bMFgK9mbZFqvAlC+ONlcC0oycap8C1+3NKUwIooiEw'+
			'gE1qWPWa3Wl8W806VUEsBAILCu70LftvSxA60H7tbU1ARXalsFIDQxQVdqp+RKMoVUAGYEQXjNOJlKMs2olGgkQCmFKGbNuF+LRFEEpRRKNBJIefFksiRcE0qyTAKv0i3v0NDaAUyyeIFXXuznef5DQRDy1rzB50HDsS+P2dPHopEos3hd/4/979z8+eaCMBN8HjTkgxMEIXWD/nlAJRqZYVid1+3uaejuPpHTgCzLjDAlLO7DZCiV/hcrt7sHALypzsN8TZJMWr8aHLyeNavOFoyXq6WCOKUUTU17AOCLDMAk5LKKplIpZ9EEAIl4LPDiz5c2SRINdrs908IqyuVygef5SSUa+SZ9PFtd/NjvH68xm01MqXox+eTxeHDy5NdzAM7nLdwT8Zio1mgmeJ7/TyA9Hg86O4/MATiVrYmUtTeTDilJIrNaX7fL5UrdXFa4'+
			'JQHTIf3+8U08zxtsNlvJOlyUUuzf/wl4np8EcD5X++3/3cBcBLl2W8BZQNdeEz0H8Kr+DfEPruCJ0YHrbDcAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFSUlEQVRYhd2Zb0wTZxzHv5ReevhiLRPTi0lzXeJgBu0x65+xRKK8wMzYvpiJe7Hg3lhfGFgWEGcUWCJg8I0hjjSLlETgjZq9uvMFvnCaI4RYY8IdDiZbAjfMqKEdPRPIc7m22Yv1tNTSFijo9n3VPH9+97mnz/N7fr/fFWGDoix0OYDtAMrSusIAIrpGpjdiv2gdQNsBVAGoBuDgOBdYlgXn4laMk2QJiqJAkmQAmAMwBmBc10hkUwCTYB4A1V6vB16PB16vFzarNeu8qKqC53nwggCeF5AEFfIFzQuQstAeACdO19ejrfUyWJbNZ9pbUhQFHZ1dGBwaAoB7ukaEDQFSFtoB4BuOczkCfX3gXK51gaVLkmWc8fkgSfIcgAFdI3OrjS3OAdfU2NhQ9v'+
			'Pdu2Ds9oLAAQBjt+Osz4eoqlqDweD+YrN5MhGPvcob0IAL9N3cduH8+YKBpetYXR1YlqV4QVgV8i3AVLjT9fWbBmeI47iskG8BFpvN3zY2NpStZ+Xa2n5wP3z4aGdt7dH5tUJGVZUKBoMfJeIxMbVvxSGhLLSH41wnnjx+vCawmZnZbR0dndWhUMgKAAzDqG1trWMAIAgCa7fbl7/66pSSy86BQ4cgSfKK0/0aMOnnrj4JPl7TaRXFkR09PT2fEaJRNG3RAcD4feTIkT+Gh+/vdjqdYb+/V8xlS5JlHDh4CAAuGX7SlNLvOV1fvya4Gzd+3N3dfe0wIRrFMIza3t4utre3iwzDqIRo1PDw/d15GwPAuVxI7nuP0VYEvFm935//lpcTXlxcpLq6rronJ6d2AoDb7Vaamr6TS0tLdaP/+vUe19OnT1kAsFqty35/7wOj'+
			'P5sURcHHFZ8AyVUsBoBis/lzr9dTedbnywk3Pi5ZL126XPPixYsPAeDkyS/l5uamX0tKShLGmJKSkkRt7dF5Qog+NTVl1zSNevDgF8euXbsWGIbRstm32WyQZBnPn09HEvHYjAH4dVdnp7WioiIr3J07d1m/339waWmJpmmLfuXKlUfHj3+x6ondt+/TvysrK/8aHR11LC0t0aOjow6gSNuzp1LN9hxCCHhB+CARj4nGHnTU1NRkhRPFkR0DA4NuQjTK6XSG+/sDw1VVXNYHAUBVFaf29weGnU5nmBCNGhgYdIviyI5sc7xeLwA4AMBEWehyjnPljEoMMQyj+v29Yj77yVBpaanu9/eKDMPkfCEAsFmt4DgXKAtdbgLgWEt0QtN03mAbmZtk2m4CsC092HwflGQqM+Ua+K5lLoSRxcVFamLimS21be/ePdG17NPVVB'+
			'DAiYlntu7ua4dT2y5e/H6kpubwwkZtmwCEJVnaqJ2CK8kUNgGIKErOQGPLlWSKmHSNTEuSjKial4vaEkVVFZIkQ9fItHGK53ief6dQqUqyzAFvwq0xXsiZAW6ZkixjwJtTPM7zwilFUXKGW6HQvPXcuYYVFzchhEofd+vWgOv27Tsr3EwoNJ/zPlUUxUjwx18D6hqJUBZ6rKOzqzrQdzOrAUI0anZ2Nr0Ok+FFQvld7mnq6OwCgDEjos475M/kjNer1Zx4ppC/IElToZQpaVqRdibisemFcKQqqqrWY3V1WwrX3NICnhfmdI0EUtsz5cUzwWBwP8uyFMdtTZQzODSE1ta2ZQA/5UzcE/HYq2KzeZIXhC2BHBwawhnf2WUA1zMVkTLWZlIho6pKbdbf3dzSYqxcRjjgv1x+A/5dyUQ8Ji6EI0V9fYFyRfkTHOeCzbY+'+
			'b6MoCs63XEBDYyNevnx5T9dIYLWym6H/Rwk4A+j7V0TPArypnyH+AZlEkfejZh+NAAAAAElFTkSuQmCC';
		me._buttonhome__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFbklEQVRYhdWZf2gTZxjHv0nu3V0T7dU2P8bgGpRR7GI6R1VWV3Wywipt2UBYoQM3BP/oH3Pzx6A6Jm5j2sGqnf9E5phszG7KNgSbmaGgREukdEUao6wbSBNn25mU3mmTu9zluj9Matoml6St1X3/fO99n/dzz5vnved5osM8RWimAkAZAPOMR2EAEVkSB+djn5oDUBmA1QBqAHBOB0E5R6FqFZk2b+CGjGBIgT8AAAgB8AG4LktipJD9dAWCNQGoaagvQmN9ERq2MGCL9ZrreEGF+7yIbk8Mbk8MSdBz+YLmBUhopglAY0uzCfv2FKOcM+SzbJaCoQQOdwjoOj0BAN2yJJ6bFyChGQ7AO04H4VxflcLpIFrT85Y/IKP1/TH4A3IIwHeyJIayzc3qii'+
			'Tc7tYdS8xdJ82wWefmtUyyWQ3Yvm0JeEFl+/rjawwUdVNNKELegCk4V2epcdd7SxcMbKbqNjOwcxRxe2JZIWcBpsO1NBsfG1xKzlVEE3IWoIGidrbuWGKei+c++8JS7e0xPbepNjpcKCQvqKSvP75cTSje9GfTgoTQTJPTQRqvXrQVBDYUJMb2I+aa0X8pFgBsVoVv2x32AcBvvy+1Wy1KdOubwlAuO7V1o/AH5GnRPeXB5D3X+uuPloICouea0XLoS8tGXjAYaXpSpiiovGAwXr5issfjevXCJVOlcN/wTH3dg5yAa6tpfPv9RIWBonxqQokBQPot29TSbCroKnGdKK3sOFa2QZJ0xGZV+H17w959e8Nem1XhJUlHLlwyVeZtDIDTQdDSbAIefhAAJD2Y9N67XSfNYFntLwMAjPMG8mm7ZV3vH0UrAOClF8Wh/R+G'+
			'e+2cHLVZFam2JnYneIcwI6NUCQBgUodXN0SHGGZSzWW7yvEMXCcecCkvGgDAQFHrG+qLHNu3mXLCDQQY9uDn1o3/3CWlAPBG4/2Bna1jgfTNGWZS3VQbHRYlvfznIG2TJB25fMXErVgu37NZFUnLPsvq4Q/I+OtvJaImlNspwLc/+YhlK57XPt5fzhbbvz65bN1EVM/Q9KT8cVv48uuvPcgasaud4ljlyvhdX6+Rm4jqGV+vkdMB0gsrJV5rH0kC3J5YsZpQvKnz5GrX05pwPdeMllNn2GpJ0hF7uRx2dQ57qhyi5kYAUOUQeVfnsMdeLoclSUdOnWGre64ZLVprGrYwAMABgJ7QTIXTQXJmJSnZrAp/tH3EW8Im5LwWAChhE/LR9hGvzarkfCEAYIv1cDoICM1U6AFw5Vz+aSHDTOYNNp+1SaYyPQDjzGTzaVCSyZ'+
			'zfuT5BFZzyZ9I4byCBW3RJ+pijUhov5HeaTQsCGLhFl3QcK9uQPrZnZ+TKKy9H783Xth5AeODGvF90wZVkCusBRIIh5QnjzFaSKaKXJXHQH5DBCzk/k4smXlDhD8iQJXEwFcUh93nxiUKlK8kSAh6lW77uhzXrU6HuR/XzVBRfd3tibwVDiZw178goxe5qe3Zj+pgo6mbd9D/8xFb9fLZ4WvSNjD7MuLUUDCVSBf71KUBZEiOEZnyHO4QaV+cyTQOSpCNDQTKzDzNLqfS/UB3uEADAl+o8TNUkyaT10NWLtoxZdabLeK7Kdon7AzJq60YBYP8swCTknIqmhZJm0QQAakIZDI/pV/OCytZtZhYVru3AONweMSRL4jfp45nq4tt9/fE1do4izkXKcrpOR3HwEB8FcDxn4a4mFMFAUTfdntiiQHadjqL1g7EogCOZmkgZ'+
			'75R0SF5QyeM67rYD4ynPZYTLCpgO2dcfX+72xNi11fSCdbj8ARlbW8Jwe8QQgONa7bf/dwNzBuTT2wLOAFpAE10GFqOJrgH8WP+G+A9LM4A7/JYp6wAAAABJRU5ErkJggg==';
		me._buttonhome__img.ggDownSrc=hs;
		el.ggId="button-home";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 2363px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttonhome.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttonhome.onclick=function (e) {
			player.moveToDefaultViewEx(1.4,0);
		}
		me._buttonhome.onmouseover=function (e) {
			me._buttonhome__img.src=me._buttonhome__img.ggOverSrc;
		}
		me._buttonhome.onmouseout=function (e) {
			me._buttonhome__img.src=me._buttonhome__img.ggNormalSrc;
		}
		me._buttonhome.onmousedown=function (e) {
			me._buttonhome__img.src=me._buttonhome__img.ggDownSrc;
		}
		me._buttonhome.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttonhome__img.src = me._buttonhome__img.ggNormalSrc;
			} else {
				me._buttonhome__img.src = me._buttonhome__img.ggOverSrc;
			}
		}
		me._buttonhome.ggUpdatePosition=function (useTransition) {
		}
		me._controlspanel.appendChild(me._buttonhome);
		el=me._buttonrotate=document.createElement('div');
		els=me._buttonrotate__img=document.createElement('img');
		els.className='ggskin ggskin_buttonrotate';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._buttonrotate__img.ggOverSrc=hs;
		hs='data:image/png;base64,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';
		me._buttonrotate__img.ggDownSrc=hs;
		el.ggId="button-rotate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 2405px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttonrotate.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttonrotate.onclick=function (e) {
			player.toggleAutorotate();
		}
		me._buttonrotate.onmouseover=function (e) {
			me._buttonrotate__img.src=me._buttonrotate__img.ggOverSrc;
		}
		me._buttonrotate.onmouseout=function (e) {
			me._buttonrotate__img.src=me._buttonrotate__img.ggNormalSrc;
		}
		me._buttonrotate.onmousedown=function (e) {
			me._buttonrotate__img.src=me._buttonrotate__img.ggDownSrc;
		}
		me._buttonrotate.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttonrotate__img.src = me._buttonrotate__img.ggNormalSrc;
			} else {
				me._buttonrotate__img.src = me._buttonrotate__img.ggOverSrc;
			}
		}
		me._buttonrotate.ggUpdatePosition=function (useTransition) {
		}
		me._controlspanel.appendChild(me._buttonrotate);
		el=me._buttonfullscreen=document.createElement('div');
		els=me._buttonfullscreen__img=document.createElement('img');
		els.className='ggskin ggskin_buttonfullscreen';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAERElEQVRYhdXZwUsjVxwH8O/GDAkWoqAB6SQUL2Gf20NggxDYzWm8rS7MQsGDa2Dr5uQs9BLpPcXAtodtt7uSHrb/wMBqb3ntQhU86MLYQ56EgpQ4IGxsthNWEqPSw87YyTiZTGIi9gsefPPe48PTefm9lxu4ZDifPwJgBMCo5VEZwGGjXiteZv4bXYBGAEQBxAGECSHgeR4TE6SpX6HAoKoqGGMAUAKwCUBp1GuHfQHqsGkAcUEQMDUlQBAEBAIBx3GapoFSinyeglIKHbrmFuoKyPn80wDuiaIISVoEz/Nuhl2Iqqp49ux7yLIMAL806rW1SwE5nz8MYJ4QEs5ml0EIceruOowxpNNLYIyVAPzcqNdKrfoOtMF9lUzOj7548SOCwWBPcAAQDAYxOz'+
			'uLalUbUpSd2IDXWzg7PdFcAw1cNrs8mEqlegazJpFIIBTiOUppS+QFoBknimLfcEYIIY7IC8ABr1dKJudH+7lydshqVeMUZWf87PTkd/OzppeE8/mnCSH3VldfXxnOnJmZ+2CMNb3d50B9n/tmdfX1hbd1f39/8ODg4JNeYsbGxj6EQqEjcxtjDDMz9wHga2Of9JqeT4uiaLuVvPntzWcb6xu92WP03Ll7h809nGPmNkIIRFGELMvTAF6dA/XVi0vSouOkC6mF9V7gciu5u62eSdIiZFmOcz7/WqNeOzRWMCoIQttPiFgs9s4tYpftDm1tbX1qbZ97OMdyK7mW43iehyAIoJRGAfzq0dvjDx70dku5SW7+U6lUBjfWN4j5x83YqSkB+FiMwACGJycnewoEAOmJ9PbW57f+6nScIAgAEAYAD+fzRwghbauSbtMNMhAI'+
			'gBACzuePeACEu61O3KYbpG4a8QAYtBabTtllu0Od8T5GeiK9vR27/afb/rpp1NOuozXPf3ie6Bb5OPX4j07HdAw8Pj7mLoPsNB0DgatFegCUCwXWtqM1/UbqprIHwKGqql1N0k+kbjr0Nuq1ImMMmqa52gtXcityrzHWaJoGxhga9VrR+CwuUUrD7Sro1EKq/yU2YBxPS8B/5dZmPt8aSCZIGYDjP+re3l5Q3VdHAYAP8eXx8XHHwkKf0zb5/Pn5+RyoUEq/UFXVtqKJxWLvrJWMpmlcsVgcNn6vVCqDBnB4ePiDGRCJRN4HAoGGE9iIqqrGCipAc0WdFEUxns0uu5kH29vbQae6zpyF1MK621ItnV6CLMubjXrtlRXYsuS3i3UFneJ2Be1K/mt/aGo6dp6dnhT/rryPVqvaUCKRuFJcJpMBpbTUqNd+MrfbnYv3FG'+
			'UnFgrxXK/uYtpFlmU8ffrtEYCXbQ/uZ6cn2oDXW6CUXglSlmWk00tHAL6zu0SyvZsxI6tVjevXnzuTyRgrZ4trCTQjFWVnnFI6FI1Ge3bDxRjDo0dfglJaAvDS6frt/32BaUFe3ytgG+j1u0R3APf1a4h/AYVYK/7TfFMOAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEZUlEQVRYhd2ZP0wbVxzHvxifbNHBIIiIKrkHQwmRmnuWnBR5wFMDUcTd0N20A2bCDA0EUmAItBVZOlexh9S3RVWHOxQRpV3MgHCExF2qQGilcPGEsIUvUtCdDlAH7tBh/OdsbJT2K3nwe+/39NHPer/3/T034YKiPN4eAO0AOgqmsgByhq5tX2T/phqA2gEEAIQA+AlhQNM0CEPOrJNkCYqiQJJkAMgAWAWwYehariGAJhgLIMRxLDiWBcdxaPX5ysblVRWCIEAQRQiCCBNUdArqCJDyeFkAQ8ORCOZmZ0DTtJOwc1IUBQs//IgkzwPAkqFr4oUAKY/XD+AbQhh/Ih4HYZiawAolyTJGolFIkpwB8Kuha5lSa5srwH0Xi411/Pb0Ka52dtYFDgCudn'+
			'ZiNBpFXlV96XT6ZrPb/fr46PC9Y0ALLhF/3HJ/YqJuYIUaHBgATdOUIIolIc8B2uGGI5GGwVkihJSFPAfY7HaPx2JjHY3MXDHIvKpS6XS6+/joMGWfO3NIKI+XJYQZerm2dmlwdt3q64MkyWdO9ymgWed+epleO3da377daclkMp/UE8bv93/o7u46sI9JsoxbX/YBwPdWnXTb5tnhSKRoKRFFkV5efn69noB37gxujo/HNu1jhGEwHIkgyfMsgCengGb2QnOzM2U3nZ6eWqkH3OLio/5Sc3OzM0jyfIjyeEVD13JWBgMcx1a8IcLh/j2nEBsbki+VSn1aOD4+HttcXHxUMo6maXAcC0EQAwD+dJnjoXqXlECAqHt72Zbl5efX7R8nsRzLAidmBBagPxwO1xUQABYWHq4Hg0Gl2jiO4wDADwAuyuPtIYSp6EpqVS2Q'+
			'rT4fCGFAebw9LgD+Wt2JU9UCaTK1uwC0FJrNctrYkGpK9cLCw/X+/v5/nK43mTpclRYWan5+Plwr5IMHU3K1MVUDappOXQSyWlUNCFwupAtAVpKlqgMbDWkyZV0AcopSdakC0FhIkynnNnRtW5Jk5FXVUS189mzp93rDFCqvqpAkGYaubVt3cUYQBH+l6+7u3aGvGw0HAIIgACe99KndWhVEsSRgIBDIAtgsOmlqa+vNlZ2dnQ4A6Orqyvb2XitrLMw9iwOKp/3ziWG1zOrfb7Yc97z7+/vUq1d/tVrfX7z447P19XUaAILBoHL79lfvrLkbN77It7W1GU72VRQFn1/rBUzTanfU3w5HIqFE/LEjwFRq5Uo5X2fX9PTUilOrNhIdRZLnVw1dewI4tPzFVJjBcnKawWKW/6Nvms60ncdHh9t72Vwgr6q+wYGBS4W7Nz'+
			'kJQRAzhq4l7OPF+uK36XT6Jk3TFCHOXc5FlOR5zM7OHQD4pWLjfnx0+L7Z7X4tiOKlQCZ5HiPR0QMAPxd7RCr6NmOHzKsq1aif+97kpJW5onDAf/n5DTjJ5PHRYWovm2uKxxM9ivIOhDBobXVUXc5JURRMTN7HWCyG3d3dJUPXEqWe3Sz9P56Ai4B+fI/oZYAb+jfEv/zFM6U8u62AAAAAAElFTkSuQmCC';
		me._buttonfullscreen__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEbUlEQVRYhdWZUWhaVxjH/9F75o2msY22gbJrKINAsGYZ6yC22SCQQUriSwcLWNjKIA8+LOvmoM2gZU/tyzK6vqQPg3Uvgi99Se7iaEdhbZc9pCHE3gZko8Q7BiXqoqDe61HZQ7zZ1VzNvUZD9wcfPOd8xx+fnnP/32cHDihiYfsBOAA4a6YSAJJUlmIH2Z9pAsgBYAiAFwDncRO4OAaDp0nVuvVnFHGxiKgAABABLANYo7KUNPJ5HQbBfAC8E+OdmBzvxMR5FvZuU8O4dKYMfknCYiQPPpJHBXRBL6guQGJhfQAm/VM2zAa74eLMesL2KC6WcHMug1A4CwCLVJYWDgRILCwH4GOPm3Dz3/XA4yaNlutWVKAIfJZCVKAigB+pLIn11tZNRQXui8B0lz'+
			'P0gxO9J5rLmpZ6T5jxyUddSGfK9pXVwhkzwzwvl4oZ3YAK3PytHuvnnx5pGVitxkZZ9HEM4SP5upB7ANVw/ilr2+AUeU6ThpB7AM0MMxOY7nK2M3NakOlMmaysFk6VS8Vf1XNVh4RYWJ/HTSYfP+g9NDi1RsZeIirQqtO9C1i55248ftC757Ruxon1r7+JrZUwr5+k2T4XzanHogLFyNhLAPhKuSfVTxKff8qmeZX89PORvvsPbQOtBHx/NLsRmE5tqMc8bgL/lA2hcNYH4O4uYCV73tlgd8NNgzPJR62Am7vteLfe3GywG6Fw1kss7AKVpaSSwaGJ8c59nxDnhnNbeiHWBdb+5DfrydrxwHRqY+62o26cizNjYrwTfCQ/BOAX5UHqvdjiK2XQLaUTKbP1/kPbgPqlJ3ZyvBPYMSNQALmRs5aWAgLAtStbT996U9o0'+
			'GjdxngUADgBMxML2e9xkX1fSrJqBtHeb4HETEAvbbwLAuTjDttCQmoGsMDlMAKy1ZrOR1gXWbgxvR9eubD09O5z7Q+/6CpPT8Pd68xvne81CfjmTXDcaYxhQljvIQSCNqqmTcZiQJgCJ9WfUcGC7IStMCROAZFwsNrVJOyErTEmGylIsKuxUX3ruwnsh8V6rYWqVzpQRFSioLMWUC1DklyRuPwd9wc9daDccAPBLErBTS+/areXFSL4u4KBHSgDY0JysKPbna8c348QJAH0umuh/o9DQWFT21NTif/XzLuAaH8l/GBdLmo7m3HBuq9bJbKfNRNiwHFXeJ1JmqwLYc6yUVQO4B+Tto/aSrpMYF0tKgb8GVDvqS/4pm3f+1jE9++DJ79bjjXydWsGZ5CO9Vi1w+R+EwtllKkt3awHrWn4t1WawkfRmUMvyv/JFU9UPrl'+
			'wqxhIp01A6U7aPjbKHCnf1+jb4iCRSWfpePa5VF79YWS2c6eMY4jHgcg6iUDiHr2+kcwDu7Fu4l0vFjJlhnvOR/KFAhsI5BC6ncgC+1WoiaVZJash0pkza9XVfvb6tZE4Tri6gGnJltXCKj+Tt77xtaVmHKypQfOBPgI9IIoA7jdpv/+8GZg3kq9sC1gA10ESnwGE00RsAt/VviH8BF9EhpOU+N7wAAAAASUVORK5CYII=';
		me._buttonfullscreen__img.ggDownSrc=hs;
		el.ggId="button-fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 2447px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttonfullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttonfullscreen.onclick=function (e) {
			player.toggleFullscreen();
		}
		me._buttonfullscreen.onmouseover=function (e) {
			me._buttonfullscreen__img.src=me._buttonfullscreen__img.ggOverSrc;
		}
		me._buttonfullscreen.onmouseout=function (e) {
			me._buttonfullscreen__img.src=me._buttonfullscreen__img.ggNormalSrc;
		}
		me._buttonfullscreen.onmousedown=function (e) {
			me._buttonfullscreen__img.src=me._buttonfullscreen__img.ggDownSrc;
		}
		me._buttonfullscreen.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttonfullscreen__img.src = me._buttonfullscreen__img.ggNormalSrc;
			} else {
				me._buttonfullscreen__img.src = me._buttonfullscreen__img.ggOverSrc;
			}
		}
		me._buttonfullscreen.ggUpdatePosition=function (useTransition) {
		}
		me._controlspanel.appendChild(me._buttonfullscreen);
		me._toolbar.appendChild(me._controlspanel);
		me.divSkin.appendChild(me._toolbar);
		el=me._buttonaddit=document.createElement('div');
		els=me._buttonaddit__img=document.createElement('img');
		els.className='ggskin ggskin_buttonaddit';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABACAYAAABoWTVaAAADo0lEQVRoge2aT2jTcBTHvzMJKWVbBd2pG7iK07pLLy7zYC/bUS857DRZb4PJwCoyT3oqKP6DFRwOD/MgTtF60NwiCDvMBA/rQX46oR62gIcVXCq1P9IWD0tHWlMXlzYWzeeW5LW/D7+89wLJAzqcLruTHB8IAhgCMOCRxwaAdYOWio0XfhHk+MBpABMAgoIgeOAGKIoCAEUAzwxaWm0qyPGBcwDOJhJTmJ2dRW9vryeCuq4jnU5jaekRALw2aOlV7RpjkRsCkLh58wamp6fB87wncgDA8zzi8Tj6+8OQZXmIYdn1aqWcB4ADlrgxQRAgiqJnYo2IoggzrcZq56yCsURiynOpRkyHWO3YKoieHm9y7nc0OtQJCsKIpzJ2NDocaBLXMfiCbvEF3eILus'+
			'UXdIsv6BZf0C2+oFt8Qbd0vCDrNHB7e5v99JF0t2LR4yei30OhUNlJrGPBTx9J951bt2J7R+7N5StX1kaE0W9OYjv+FvuCbnGcg909PeUjg4OO8sbJfzmN3X27xfGBB58/r7difdccOzYEg5amAb/N2OO3GS/peEG/zewHa5v5d26xqrw76LcZG3xBt3S8YF2REEIQjUZtA0eE0W9Pn794224hRVHrjq07mJ+fT7d7/T1JpVIAsNuQdz8mMiybz+Vyp/r7w013sd3MzV3FyspKEcDDaqWs1wlWK+WvDMsGZVmO/A3JubmryGQyAPDYoKUPtfOMNahaKX+oSRYKOuLxeNvFdF3HxYtJSJJUNOXqPmgzjT8wJfNra9mYqqoYHx9v27djQggmJ88jm80WAdy17lxTQVNyk2HZrKZpw8vLy8GjRyOIRCItlctkMkgmL2Fr'+
			'a2sDQMqgpbxdnK2gKakzLLtKKQ1JkjSgaRoEYaQlu5lKpXD79h1QSt8YtLRQrZSNZrG2Ux+NcHwgBmAqHA4HFxbu77uAdF3H5OR5EEJsByjsaLqDVswKf18oFAaePFk+1NUF/OlEiKKomJiYgKZpeQBpu3zbt6Ap+aNaKa8yLPtDUdRhVVUhCIKjyZClpUdIJpOglK6Zcrb55krQIvrFLKDBTOZlqK/vcNNbrus6rl27jsXFRWBn3OTx7/KtJYKmpM6w7HtKKSfLcoQQgnj8TF0BEUIwM3Oh9mSYd5JvLRM0JQ2zZ27mcrlhSZK4aPRkbfYFMzMXoGnaBnb62+Z+13FUxXthznpNAYiJolh7ZK1ip1J/mcf6a3B8YIzjA/fM+a//g58zwIrCBBOeLQAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABACAYAAABoWTVaAAADp0lEQVRoge2aMYzTVhjH/xAbv0aoyQlVmU5WK5obkC5ZOjDUPulEWICpZSKB4Y4uF5bjKlrCRNRWKirDnYTS3ETKknRp0gmEdDGq0qEDtsRAFuS7hSW6GFU5Gzu5DmeffMYhLia+VPVv8/MXv1/e+95nJe8BE84Rt0aaIVEASQDTAXlsAWjrmtpz3nhDkGbIaQAXAUR5jgvADWgKAgD0AFR1TW0NFaQZch7AuXx+CbcKBcRjsUAEu4qC28UiVlfXAOB3XVMb1r2ITS4J4Mp6+Wd8ff06CCGByAEAIQRnMxmwLIt6o5GMUFR70Dc6AHDUFjfPcxxy2WxgYk5y2SzMtJq32uyC6Xx+KXApJ6ZD2rq2CwaWc2/D6bC/SGiGlF6rO4ELuXGMfABdU78CHC'+
			'M4iYSCfgkF/RIK+iUU9Eso6JdQ0C+hoF9CQb9MvCDlNXB7e5uSRPH4++h0NpX6e2pqyvAS61lQEsXj335zIz06cjTfff/DU35uruslduKnOBT0i+cc/DAWMz5NJj3ljZdneY2d+B/uYZlxIywzQTLxgmGZeRf+U/8Pep7i5sZGPCwzLoSCfpl4wQOLRJQkpGZnXQP5ubnuH60/N8YtJOxtLO5jH8HO7WJx3P2PZHllBQDa1vX+ZmKEojrPn7c/Y1kWqVTqMNywsHgVDx8+6gFYH/SNVwcEB33jZYSiovVG45PDkFxYvIr7lQoAPNA19ZnVHrEHDfrGM0uyqyg4m8mMXayrKLiUy6Faq/VMueEb2hbmrvsVnuNQq1XHtskoShK++PIiZFnuAfhJ19QtZ4xrmTG/RbEpCJ3kzAzqjYZbmC/uVyo4k8lAluUtADfd5ADH'+
			'FNsZ9I1XEYpqqaoWq9Zq07K8CY7n3stO/PLKCgqFW1BV7bGuqfcGfUMfFus6xU5ohqQBXGZZNvprrTq0Vo6iqyg4k8lAFCXXAxRuDB1BO+YK/0tRlOlyef0EcAT/9kSIIAj4nOchy5sdAKv2lepb0JTcGfSNVoSidgRBOCUIT8BzHOLx+MjPrq6t4VI2B1XVnppyHa/9eha0ib6IUJQoy/LHlV8qsUQiMbRmdhUFS/lr+PHOHWDvuMmDt+WbG55y0A3zdNI5APMXLpzHerl8oByJkoSFxUUr3+7pmtoe9qyxQjMkTTPk7snkTKnZbJZ2d3dLv9XrpY8SiRLNkALNkBN+nv/OI+iQjAK4DCCdy2atV1YLeyv1jfNYhwbNkHmaIXfNN9H/g38AEYJwAUxp4NIAAAAASUVORK5CYII=';
		me._buttonaddit__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABACAYAAABoWTVaAAADkElEQVRoge2aT0gUURzHvzZvmGFTVxLqtEpme2izvHRo0UPpzbp0SPCiCYIGgUKQQYiHyotkZCBhKAguGBhIGV6kIHEvHoxlPagQuHuIZHV30t19zB877IztrrM6ObvrUvO5zcxv93147/f7DcN7QIFTpHeT5XgbACcAR548AgBWRRqPpj84IMhy/HUAdwHY6txcHtyAhUUKAFEA70Qa92YUZDn+NoBbXR3FePywFPbSU3kRjAgKBgYFjIzuAMBHkcY/aM+YJDkngLaRl2fQ86AEPKe7+jmB54rQeINHpYNgdi7mZAhZVWQpBADJU9RQ5+bQ0mzLm1g6Lc02qGnVoN1LFqy931Gcd6l0VIda7TolyfKVc4eR7pByla+qPYx0h5OfsiOwBM1iCZrFEj'+
			'SLJWgWS9AslqBZLEGzWIJmKXhBYjQwHAbxrSArX1U1l7BTVgbJSKxhQd8Kivuf/vnaMkP/EyzXuxE2ElvwS2wJmsVwDpaWQKq+YCxvjPyX0VjDgldrsPNmGMvHUzo+VpvRw2oz+aTgBa02Y5Z/Z4m/LqLMajM6WIJmKXjBlCLx+UXUuFjdwHo3wvOf8CXXQurG4j7JMxgaGBRyPf6R9PaFAWBVu97fTGQICa2tS9cqHQQ1l/VnMdd0dW9j/nM8CuCtIktCiqAiSz8YQmyzc7Gqk5Ds6t6GZ2oXACZFGvdr95nkIEWW/JpkRFDQeIPPuVhEUNDeuYX3M9GoKpd5Q1tD3XVvq3Nz8IyX52yT0ecX0XIvhI2AFAXwQqTxQHoMo/M7KLIUZAj5thGQXWMTuzbnRQJndXaX3DMVRXvnFn5uygEAz0QaD+nF6QqqkgJDiJfS'+
			'Pfv0TMyxEZRR7+ayshPf2xdG//MIKN2bF2l8RJElMVOsodFYjq8F0FrhIDbPeHnGXnkUEUFB051N+Pyi7gEKPTLOYDJqhS9FBMUxNrFbXlT093vLC4sUjU2b2AjKIQDDyZVqWlCVjCmy5GUIiS0sUteCl6LezcNuP7qARkZ30N61BUr3llU53XwzJZgk+l0toPOeqaj93FkmY8+MCAp6HoUx9PoXkDhuMnlYvmVFUJUUGEKWKN1jZ+diVT6/iMabfEoBaS1EfTO8MpJvWRNUJUW1sQfX1iXX9EyMveJiUZE4+5Lob0E5gER/Cx53nKyc3lHPerUCqG1pPq29srxIVOqB81gnBsvxDSzHD6lvov+D38VAdwG/89z6AAAAAElFTkSuQmCC';
		me._buttonaddit__img.ggDownSrc=hs;
		el.ggId="button-addit";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 64px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.4;';
		hs+='position : absolute;';
		hs+='top : -21px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._buttonaddit.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._buttonaddit.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._panolist.style[domTransition]='none';
			} else {
				me._panolist.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._panolist.style.opacity='0.9';
			me._panolist.style.visibility=me._panolist.ggVisible?'inherit':'hidden';
		}
		me._buttonaddit.onmouseover=function (e) {
			me._buttonaddit__img.src=me._buttonaddit__img.ggOverSrc;
		}
		me._buttonaddit.onmouseout=function (e) {
			me._buttonaddit__img.src=me._buttonaddit__img.ggNormalSrc;
		}
		me._buttonaddit.onmousedown=function (e) {
			me._buttonaddit__img.src=me._buttonaddit__img.ggDownSrc;
		}
		me._buttonaddit.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._buttonaddit__img.src = me._buttonaddit__img.ggNormalSrc;
			} else {
				me._buttonaddit__img.src = me._buttonaddit__img.ggOverSrc;
			}
		}
		me._buttonaddit.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._buttonaddit);
		el=me._radarback=document.createElement('div');
		els=me._radarback__img=document.createElement('img');
		els.className='ggskin ggskin_radarback';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="radar-back";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 72px;';
		hs+='position : absolute;';
		hs+='right : 2px;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 72px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._radarback.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._radarback.ggUpdatePosition=function (useTransition) {
		}
		el=me._radarbeam=document.createElement('div');
		els=me._radarbeam__img=document.createElement('img');
		els.className='ggskin ggskin_radarbeam';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="radar-beam";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 72px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 72px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._radarbeam.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._radarbeam.ggUpdatePosition=function (useTransition) {
		}
		me._radarback.appendChild(me._radarbeam);
		me.divSkin.appendChild(me._radarback);
		el=me._panolist=document.createElement('div');
		el.ggId="pano-list";
		el.ggDx=-0.5;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #e0e0e0;';
		hs+='border : 1px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 319px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 478px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._panolist.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._panolist.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._closebutton=document.createElement('div');
		els=me._closebutton__img=document.createElement('img');
		els.className='ggskin ggskin_closebutton';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._closebutton__img.ggOverSrc=hs;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAGcklEQVRIiXWWe2yddRnHv8/v8r7n0stOu3bt2nW9b10v0rVWmESWMabDv1ATMeof/m9iJDFe4oVkCsM40DglCBsIycaQCAhGxVGXycBdWLArGRvWtWMtbdee9vScnve8l9/v8Y/Tdh2rT/L+8ebN+/s83+f6I+3GsJYRAZFh2JA1QEmAO4Xgrs2N7vWZmag28DHh+2YKoIsAZZRDlmjNo0BrQZiBKGAQcXNDg+7dulV3NGyStXd+2qWkKxAYdiYnTWF8wvhvn/Znht8LLy5kzHkIuqr1raRbINYCJuTKVIXY+/WvJO+47wuJio52HVXVSF9IWPgs4JJBCAGwyOVYnThZoD++lJ8/+kL+eKHAx5VLeVoTQkAUMthw647bY/d/7/vlXXt2x3w3QQX2mI'+
			'OAyRqARFEpUfHRmiA0yDL00aOLet/DC6cuXQpf0C7NLkOkVGpFgTVoundv4mtP/KZiyx13uln2Efo5pigCLTvy8bAaA0QBAMD09rtRX7dufOfdsHpi3FyWirybIFHAqZ4e5xtPPV65pb1T5wvzFtYUj/1/CV3NtRawIaOxRZmubU7D62948fmMfVdKKkJMBFSkxL2/PVi58/YdrudlLK+EMwbrJmDIgqy9oYUIcB1Y7cJaAwKDmAETAs0d2iRdan3tz96skDQmAMAa3vjF+xK79u6JeUHO2uVQKAc270G8/IqtnU1DuS7ssvexOMzlEU4M/oOr3BisEOCVysyx/er9iXBgwP1cFHBSgiSkoM8/+KPy3rYW5QXF+EJrcCTAhw/Z5od+broyWehPbhczJSWw2oW5MorEz/abrkPP2pbqKvK2baXsslJrgWSpsKGPir/+'+
			'3ftQspXln+hxdv/kx6lyCdiiDsCNw/zuSdP8yAHb5brAhWFOZXOQ/b1iNp2G3rffdA2e4DpmyOODXN3dLebb2ygXhRAAQEyo2SD1c8/nPQVg/acGnHWlKTLenF1JqAkgdn5GzBw5Zr2PJhFLJmCO/cE2Bz7k7By7xwe5rjSJcCbN7j27xExPN2XC8EbOopBRXy9NS5OqFgDVt7boJCwYqywIIDo7af6Zw+pUfR3yngcZi8G+9Cfb+Pa/uLqsFGHBh/zs3WLyoYfV2aoUgmUVAMAApCbT3qpKBIic0hKSMHwTBAR4Wei2Nso+fUi91bgZuTAExeOIlAI8D3Kgn2Yfe1Se3VQD3ytA3lLfAthYo4QAg/J5XrsZCEAEUZ6koLYWeWbQUqczA2hvo7l4nAITQN36cxFS8C0pwKanpo2Bgl5SudIHjgM7eoXj+/bbznPvYL'+
			'3rwuRyUEKAS5IIn3/RNpsI9K1vysvlZTArk2ElsaAP/hsFAuDR9y9HiybPJMSN71rBjl1F7MGfmq43Ttg6KcHpOXa291K6rQ0L2Sy0VrDPHrFtjx007Z4HsdwrACAlMD1h1MX3o0VBQsydPR+MTU4aR6tVjhAQhiwufYAyIYCZWbi77hJTTx9Spw7+Wp2u34R8JsOuVLBRcDMAAByHMDQcuJPT0YjUjub5tFHbOnR/34BjI78IsAa0voqC23pp9txZTvV0i8z+R9T5ijJEFRUU7Nghrp8+w+t37xTXHvi2uFSaIGuWmlFKQMYEPfFULnvypP8iaTeG0OdY723OD08MbmhIuuQFBV6ZfPFSRBeGuSxVSlH9Zsp5WXaYgUQJorFxjjsgrq2D7y0Wq4sZSJQJXBgOSvfsnXpzapofl1IpCEnRxLiZI6Dv7t1xSczWmGLy'+
			'Qx9iYw35yQQiPw+NpT0SBRAV6yiMx2GDAiSoWDbxJCGf59gD35mbPXOmcEQ7Ii2lUiACGDT576FQ1lbLLX19jgBgrCmWrImWJvBN6w4wBmJlMhMQT5D1fY4/+suF/JPPLB5hiCEhVu0TIQBvkUfPnAt0Milbt/c72o2R4agYAjBuXlqr3rVL7CaEnE5zyS8OLGQP/GrhFS/PJ5UmLuZI3egjqSjKzNv/vPmW742NRY2tzaqkplaxjhErVYTJpb5WLrHrEGlXiMBnZ2gocL77g7kPD/9+8Zgf4J/aoZVBuOZtJQoZbHlrU5Nzz5e/lOjYeZebbGlVsqFORlEIkSgT0UeTRs9dN2J83BT+8jdv/uVX8+9dGY1eh6BrH7+xrAlZttBnB+DG1DrZtmGD3NTcJGsqK2UhDLn06jWTK3h8bWQknMks2CsAjWiXwuUCWG3/A2'+
			'gdFRqS0AzcAAAAAElFTkSuQmCC';
		me._closebutton__img.ggDownSrc=hs;
		el.ggId="close-button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 449px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._closebutton.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._closebutton.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._panolist.style[domTransition]='none';
			} else {
				me._panolist.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._panolist.style.opacity='0';
			me._panolist.style.visibility='hidden';
		}
		me._closebutton.onmouseover=function (e) {
			me._closebutton__img.src=me._closebutton__img.ggOverSrc;
		}
		me._closebutton.onmouseout=function (e) {
			me._closebutton__img.src=me._closebutton__img.ggNormalSrc;
		}
		me._closebutton.onmousedown=function (e) {
			me._closebutton__img.src=me._closebutton__img.ggDownSrc;
		}
		me._closebutton.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._closebutton__img.src = me._closebutton__img.ggNormalSrc;
			} else {
				me._closebutton__img.src = me._closebutton__img.ggOverSrc;
			}
		}
		me._closebutton.ggUpdatePosition=function (useTransition) {
		}
		me._panolist.appendChild(me._closebutton);
		me.divSkin.appendChild(me._panolist);
		el=me._logomono=document.createElement('div');
		els=me._logomono__img=document.createElement('img');
		els.className='ggskin ggskin_logomono';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="logo-mono";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 5px;';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._logomono.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._logomono.onmouseover=function (e) {
			me.elementMouseOver['logomono']=true;
		}
		me._logomono.onmouseout=function (e) {
			if (player.transitionsDisabled) {
				me._logomono.style[domTransition]='none';
			} else {
				me._logomono.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._logomono.style.opacity='0.5';
			me._logomono.style.visibility=me._logomono.ggVisible?'inherit':'hidden';
			me.elementMouseOver['logomono']=false;
		}
		me._logomono.ontouchend=function (e) {
			me.elementMouseOver['logomono']=false;
		}
		me._logomono.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._logomono);
		el=me._hide_container=document.createElement('div');
		el.ggId="hide_container";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 19px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 11px;';
		hs+='visibility : hidden;';
		hs+='width : 90px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hide_container.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._hide_container.ggUpdatePosition=function (useTransition) {
		}
		el=me._markertemplate=document.createElement('div');
		el.ggMarkerNodeId='';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="markertemplate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 658px;';
		hs+='position : absolute;';
		hs+='top : 109px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._markertemplate.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._markertemplate.onmouseover=function (e) {
			me._marker_title.style[domTransition]='none';
			me._marker_title.style.visibility=(Number(me._marker_title.style.opacity)>0||!me._marker_title.style.opacity)?'inherit':'hidden';
			me._marker_title.ggVisible=true;
		}
		me._markertemplate.onmouseout=function (e) {
			me._marker_title.style[domTransition]='none';
			me._marker_title.style.visibility='hidden';
			me._marker_title.ggVisible=false;
		}
		me._markertemplate.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title=document.createElement('div');
		els=me._marker_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -27px;';
		hs+='position : absolute;';
		hs+='top : -20px;';
		hs+='visibility : hidden;';
		hs+='width : 78px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #e0e0e0;';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 3px;';
		hs+=cssPrefix + 'border-radius: 3px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 2px 0px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._marker_title.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._marker_title.ggUpdateText();
		player.addListener('changenode', function() {
			me._marker_title.ggUpdateText();
		});
		el.appendChild(els);
		me._marker_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((80-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._markertemplate.appendChild(me._marker_title);
		me._hide_container.appendChild(me._markertemplate);
		me.divSkin.appendChild(me._hide_container);
		el=me._loading_container=document.createElement('div');
		el.ggId="loading_container";
		el.ggDx=0;
		el.ggDy=-9;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 192px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 192px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_container.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading_container.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._loadback=document.createElement('div');
		el.ggId="load-back";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #000000;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 4480px;';
		hs+='left : -2224px;';
		hs+='opacity : 0.4;';
		hs+='position : absolute;';
		hs+='top : -2135px;';
		hs+='visibility : inherit;';
		hs+='width : 4640px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loadback.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadback.ggUpdatePosition=function (useTransition) {
		}
		me._loading_container.appendChild(me._loadback);
		el=me._loading_text=document.createElement('div');
		els=me._loading_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="loading_text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 21px;';
		hs+='left : 66px;';
		hs+='position : absolute;';
		hs+='top : 86px;';
		hs+='visibility : inherit;';
		hs+='width : 69px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #ffffff;';
		hs+='color: rgba(224,224,224,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 2px 0px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._loading_text.ggUpdateText=function() {
			var hs=(player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loading_text.ggUpdateText();
		player.addListener('downloadprogress', function() {
			me._loading_text.ggUpdateText();
		});
		el.appendChild(els);
		me._loading_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_text.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((67-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._loading_container.appendChild(me._loading_text);
		me.divSkin.appendChild(me._loading_container);
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._markertemplate);
		me._markertemplate__normal = clonedNormalElement._marker_normal;
		me._markertemplate__normal.style.visibility='inherit';
		me._markertemplate__normal.style.left='0px';
		me._markertemplate__normal.style.top='0px';
		me._markertemplate.ggMarkerNormal=me._markertemplate__normal;
		me._markertemplate.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._markertemplate);
		me._markertemplate__active= clonedActiveElement._marker_active;
		me._markertemplate__active.style.visibility='hidden';
		me._markertemplate__active.style.left='0px';
		me._markertemplate__active.style.top='0px';
		me._markertemplate.ggMarkerActive=me._markertemplate__active;
		me._markertemplate.ggMarkerInstances.push(clonedActiveElement);
		if (me._markertemplate.firstChild) {
			me._markertemplate.insertBefore(me._markertemplate__active,me._markertemplate.firstChild);
		} else {
			me._markertemplate.appendChild(me._markertemplate__active);
		}
		if (me._markertemplate.firstChild) {
			me._markertemplate.insertBefore(me._markertemplate__normal,me._markertemplate.firstChild);
		} else {
			me._markertemplate.appendChild(me._markertemplate__normal);
		}
		for (var i = 0; i < me._markertemplate.childNodes.length; i++) {
			me._markertemplate.ggMarkerInstances.push(me._markertemplate.childNodes[i]);
		}
		if (player.transitionsDisabled) {
			me._panolist.style[domTransition]='none';
		} else {
			me._panolist.style[domTransition]='all 500ms ease-out 0ms';
		}
		me._panolist.style.opacity='0';
		me._panolist.style.visibility='hidden';
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('imagesready', function() {
			if (player.transitionsDisabled) {
				me._loading_container.style[domTransition]='none';
			} else {
				me._loading_container.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._loading_container.style.opacity='0';
			me._loading_container.style.visibility='hidden';
			me._instructionbox.style[domTransition]='none';
			me._instructionbox.ggParameter.rx=5080;me._instructionbox.ggParameter.ry=0;
			me._instructionbox.style[domTransform]=parameterToTransform(me._instructionbox.ggParameter);
		});
		player.addListener('beforechangenode', function() {
			if (player.transitionsDisabled) {
				me._loading_container.style[domTransition]='none';
			} else {
				me._loading_container.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._loading_container.style.opacity='1';
			me._loading_container.style.visibility=me._loading_container.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._panolist.style[domTransition]='none';
			} else {
				me._panolist.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._panolist.style.opacity='0';
			me._panolist.style.visibility='hidden';
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
		var newMarker=[];
		var id=player.getCurrentNode();
		var i,j;
		var tags=me.ggUserdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if ((nodeMarker[i].ggMarkerNodeId.length > 0) && (nodeMarker[i].ggMarkerNodeId.charAt(0)=='{') && (nodeMarker[i].ggMarkerNodeId.substr(1, nodeMarker[i].ggMarkerNodeId.length - 2)==id) && (id!='')) match=true;  // }
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
				activeNodeMarker[i].ggIsMarkerActive=false;
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
				newMarker[i].ggIsMarkerActive=true;
			}
		}
		activeNodeMarker=newMarker;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		if (me.elementMouseOver['toolbar']) {
			if (player.transitionsDisabled) {
				me._controlspanel.style[domTransition]='none';
			} else {
				me._controlspanel.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._controlspanel.style.opacity='0.9';
			me._controlspanel.style.visibility=me._controlspanel.ggVisible?'inherit':'hidden';
		}
		if (me.elementMouseDown['buttondown']) {
			player.changeTiltLog(-1.4,true);
		}
		if (me.elementMouseDown['buttonup']) {
			player.changeTiltLog(1.4,true);
		}
		if (me.elementMouseDown['buttonleft0']) {
			player.changePanLog(1.4,true);
		}
		if (me.elementMouseDown['buttonleft']) {
			player.changePanLog(-1.4,true);
		}
		if (me.elementMouseDown['buttonplus']) {
			player.changeFovLog(-1.4,true);
		}
		if (me.elementMouseDown['buttonminus']) {
			player.changeFovLog(1.4,true);
		}
		var hs='';
		if (me._radarbeam.ggParameter) {
			hs+=parameterToTransform(me._radarbeam.ggParameter) + ' ';
		}
		hs+='rotate(' + (-1.0*(1 * player.getPanNorth() + 0)) + 'deg) ';
		hs+='scale(' + (Math.tan(player.getFov()/2.0*Math.PI/180.0)*1 + 0) + ',1.0) ';
		hs+='scale(1.0,' + (Math.cos(1*player.getTilt()*Math.PI/180.0 + 0)) + ') ';
		me._radarbeam.style[domTransform]=hs;
		if (me.elementMouseOver['logomono']) {
			if (player.transitionsDisabled) {
				me._logomono.style[domTransition]='none';
			} else {
				me._logomono.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._logomono.style.opacity='1';
			me._logomono.style.visibility=me._logomono.ggVisible?'inherit':'hidden';
		}
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_active_zone(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._active_zone=document.createElement('div');
		el.ggId="active_zone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 19px;';
		hs+='position : absolute;';
		hs+='top : 16px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._active_zone.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._active_zone.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._active_zone.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._active_zone.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._active_zone.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._active_zone.ggUpdatePosition=function (useTransition) {
		}
		el=me._hostspot_marker=document.createElement('div');
		els=me._hostspot_marker__img=document.createElement('img');
		els.className='ggskin ggskin_hostspot_marker';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hostspot_marker";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 61px;';
		hs+='left : 7px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hostspot_marker.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hostspot_marker.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
		}
		me._hostspot_marker.ggUpdatePosition=function (useTransition) {
		}
		me._active_zone.appendChild(me._hostspot_marker);
		me.__div = me._active_zone;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		{
			hotspot.skinid = 'active_zone';
			hsinst = new SkinHotspotClass_active_zone(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['active_zone']) {
			var i;
			for(i = 0; i < hotspotTemplates['active_zone'].length; i++) {
				hotspotTemplates['active_zone'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinElement_marker_active_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._marker_active=document.createElement('div');
		els=me._marker_active__img=document.createElement('img');
		els.className='ggskin ggskin_marker_active';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 37px;';
		hs+='left : -12px;';
		hs+='position : absolute;';
		hs+='top : -11px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._marker_active.ggUpdatePosition=function (useTransition) {
		}
	};
	function SkinElement_marker_normal_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._marker_normal=document.createElement('div');
		els=me._marker_normal__img=document.createElement('img');
		els.className='ggskin ggskin_marker_normal';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._marker_normal__img.ggOverSrc=hs;
		hs='data:image/png;base64,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';
		me._marker_normal__img.ggDownSrc=hs;
		el.ggId="marker_normal";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 37px;';
		hs+='left : -12px;';
		hs+='position : absolute;';
		hs+='top : -11px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_normal.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._marker_normal.onmouseover=function (e) {
			me._marker_normal__img.src=me._marker_normal__img.ggOverSrc;
		}
		me._marker_normal.onmouseout=function (e) {
			me._marker_normal__img.src=me._marker_normal__img.ggNormalSrc;
		}
		me._marker_normal.onmousedown=function (e) {
			me._marker_normal__img.src=me._marker_normal__img.ggDownSrc;
		}
		me._marker_normal.onmouseup=function (e) {
			if (skin.player.getIsMobile()) {
				me._marker_normal__img.src = me._marker_normal__img.ggNormalSrc;
			} else {
				me._marker_normal__img.src = me._marker_normal__img.ggOverSrc;
			}
		}
		me._marker_normal.ggUpdatePosition=function (useTransition) {
		}
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me.skinTimerEvent();
};