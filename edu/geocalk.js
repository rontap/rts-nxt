var canvasid;//="euclidean";
var canvas;//=document.getElementById(canvasid);
var context;//=canvas.getContext("2d");
var points=new Array();
var lines=new Array();
var circles=new Array();
var intersections=new Array();
var selectedPoint=-1;
var linePoint=-1;
var mouseDown=false;
var preline={'a':0,'b':0};
var precircle={'x':0,'y':0,'r':0};
var lastcircle={'x':1,'y':1,'r':1};
var prepoint={'x':0,'y':0};
var isPrePoint=false;
var rightclick=false;
function makeid(len)
{
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < len; i++ )
		    text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
}
function initCanvas(div,cid)
{
	if(cid==undefined)
	{
		cid='GeoCalk_'+makeid(8);
	}
	div.innerHTML='<canvas id="'+cid+'" onContextMenu="return false" onMouseDown="downMouse(event)" onMouseUp="upMouse(event)" onMouseMove="moveMouse(event)" onMouseOut="abortAction()" style="cursor:crosshair;background-color:#606060;">';
	div.innerHTML+='</canvas>';
	//div.innerHTML+='<small style="position:relative;z-index:1;bottom:0;top:0;color:#aaa;font-family:'+"'Sans'"+',sans-serif;font-size:6pt;text-align:right;margin:3pt;line-height:1.2;">GeoCalk for <a href="http://edu.elemential.net/tapcalk.html">TapCalk</a> by <a href="http://elemential.net">Elemential</a><br>Licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons BY-NC-SA</a></small>'
	div.setAttribute('onResize','resizeCanvas()');
	div.setAttribute('onSelStart','return false');
	canvasid=cid;
	canvas=document.getElementById(canvasid);
	context=canvas.getContext("2d");
	resizeCanvas();
}
function addScrollListener(who, wth)
{
	if (who.addEventListener) {
	// IE9, Chrome, Safari, Opera
	who.addEventListener("mousewheel", wth, false);
	// Firefox
	who.addEventListener("DOMMouseScroll", wth, false);
	}
	// IE 6/7/8
	else who.attachEvent("onmousewheel", wth);
}
function resizeCanvas()
{
	canvas.width=canvas.parentNode.offsetWidth;
	canvas.height=canvas.parentNode.offsetHeight;
	refreshCanvas();
}
function refreshCanvas()
{
	canvas.width=canvas.width;
	if(mouseDown && selectedPoint>=0)
	{
		if(!rightclick)
		{
			drawLine("pre");
		}
		else
		{
			drawCircle("last");
			drawCircle("pre");
		}
	}
	for(i=0;i<lines.length;i++)
	{
		drawLine(i);
	}
	for(i=0;i<circles.length;i++)
	{
		drawCircle(i);
	}
	if(isPrePoint)
	{
		drawPoint("pre");
	}
	for(i=0;i<points.length;i++)
	{
		if(selectedPoint==i)
		{
			drawPoint(i,'#22B94F','#003300');
		}
		else if(linePoint==i)
		{
			drawPoint(i,'#48f','#001533');
		}
		else
		{
			drawPoint(i);
		}
	}
}
function MouseWheelHandler(e)
{
	var e = window.event || e; // old IE support, copyright by Trashpack Softwares inc.
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
}
function prepend(X,Y,line)
{
	ppline={"a":0,"b":0};
	if(typeof(line)=="number")
	{
		line=lines[line];
	}
	ppline.a=-1/line.a;
	if(1/line.a==0)
	{
		ppline.b=Y;
	}
	else if(line.a==0)
	{
		ppline.a=Infinity;
		ppline.b=X;
	}
	else
	{
		ppline.b=Y-ppline.a*X;
	}
	return ppline;
}
function intersect(line1,line2)
{
	intersection={"x":0,"y":0};
	if(typeof(line1)=="number")
	{
		line1=lines[line1];
	}
	if(typeof(line2)=="number")
	{
		line2=lines[line2];
	}
	if(1/line1.a==0 && 1/line2.a==0)
	{
		intersection==false;
	}
	else if(1/line1.a==0 || 1/line2.a==0)
	{
		if(1/line2.a==0)
		{
			temp=line1;
			line1=line2;
			line2=temp;
		}
		intersection.x=line1.b;
		intersection.y=line2.a*line1.b+line2.b;
	}
	else if(line1.a==line2.a)
	{
		intersection=false;
	}
	else
	{
		intersection.x=(line2.b-line1.b)/(line1.a-line2.a);
		intersection.y=line1.a*intersection.x+line1.b;
	}
	if(intersection)
	{
		intersections[intersections.length]=intersection;
	}
	return intersection;
}
function intersectBetween(line,circle)
{
	if(typeof(circle)=="number")
	{
		circle=circles[circle];
	}
	if(typeof(line)=="number")
	{
		line=lines[line];
	}
	templine=prepend(circle.x,circle.y,line);
	centralpoint=intersect(line,templine);
	dx=circle.x-centralpoint.x;
	dy=circle.y-centralpoint.y;
	d=Math.sqrt(dx*dx+dy*dy);
	r=circle.r;
	if(d>r)
	{
		intersection=false;
	}
	else if(d==r)
	{
		intersection=centralpoint;
		intersections[intersections.length]=intersection;
	}
	else
	{
		intersection={"a":{"x":0,"y":0},"b":{"x":0,"y":0}};
		md=Math.sqrt(r*r-d*d);
		c=Math.sqrt(1+line.a*line.a);
		mx=md/c;
		my=mx*line.a;
		intersection.a.x=centralpoint.x+mx;
		intersection.a.y=centralpoint.y+my;
		intersection.b.x=centralpoint.x-mx;
		intersection.b.y=centralpoint.y-my;
		intersections[intersections.length]=intersection.a;
		intersections[intersections.length]=intersection.b;
	}
	return intersection;
}
function intersectCircles(circle1,circle2)
{
	if(typeof(circle1)=="number")
	{
		circle1=circles[circle1];
	}
	if(typeof(circle2)=="number")
	{
		circle2=circles[circle2];
	}
	r1=circle1.r;
	r2=circle2.r;
	dx=circle1.x-circle2.x;
	dy=circle1.y-circle2.y;
	a=(circle1.y-circle2.y)/(circle1.x-circle2.x);
	b=circle1.y-(circle1.x*a);
	line={"a":a,"b":b};
	d=Math.sqrt(dx*dx+dy*dy);
	x=-(r1*r1-r2*r2+d*d)/(2*d);
	y=Math.sqrt(r1*r1-x*x);
	sign=(circle1.x-circle2.x)/Math.abs(circle1.x-circle2.x);
	if(isNaN(y))
	{
		intersection=false;
	}
	else
	{
		md=x*sign;
		c=Math.sqrt(1+line.a*line.a);
		mx=md/c;
		my=mx*line.a;
		cp={"x":circle1.x+mx,"y":circle1.y+my};
		if(y==0)
		{
			intersection=cp;
			intersections[intersections.length]=intersection;
		}
		else
		{
			intersection={"a":{"x":0,"y":0},"b":{"x":0,"y":0}};
			md=y;
			line=prepend(cp.x,cp.y,line);
			c=Math.sqrt(1+line.a*line.a);
			mx=md/c;
			my=mx*line.a;
			intersection.a.x=cp.x+mx;
			intersection.a.y=cp.y+my;
			intersection.b.x=cp.x-mx;
			intersection.b.y=cp.y-my;
			intersections[intersections.length]=intersection.a;
			intersections[intersections.length]=intersection.b;
		}
	}
	return intersection;
}
function drawPoint(num,fill,stroke)
{
	if(num=="pre")
	{
		point=prepoint;
		fill='#eeeeee';
		stroke='#555555';
	}
	else
	{
		point=points[num];
	}
	context.beginPath();
	context.arc(point.x, point.y, 5, 0, 2*Math.PI,false);
	context.fillStyle=fill || '#f44';
	context.fill();
	context.lineWidth=2;
	context.strokeStyle=stroke || '#330000';
	context.stroke();
}
function addPoint(X,Y)
{
	if(isPrePoint)
	{
		point=prepoint;
	}
	else
	{
		point={"x":X,"y":Y};
	}
	points[points.length]=point;
	refreshCanvas();
}
function addLine(p,q)
{
	line={'a':0,'b':0}
	line.a=(p.y-q.y)/(p.x-q.x);
	if(p.x==q.x)
	{
		line.b=p.x;
	}
	else
	{
		line.b=p.y-(p.x*preline.a);
	}
	lines[lines.length]=line;
	linePoint=-1;
	refreshCanvas();
}
function selectPoint(X,Y)
{
	psp=selectedPoint;
	ppp=isPrePoint;
	selectedPoint=-1;
	isPrePoint=false;
	refresh=false;
	for(i=0;i<points.length;i++)
		{
			dx=(points[i].x-X);
			dy=(points[i].y-Y);
			d=Math.sqrt(dx*dx+dy*dy)
			if(d<=6)
			{
				selectedPoint=i;
			}
		}
	if(selectedPoint<0)
	{
		for(i=0;i<lines.length;i++)
		{
			l=prepend(X,Y,i);
			p=intersect(i,l);
			dx=(p.x-X);
			dy=(p.y-Y);
			d=Math.sqrt(dx*dx+dy*dy);
			if(d<=6)
			{
				prepoint=p;
				isPrePoint=true;
				refresh=true;
			}
		}
		for(i=0;i<circles.length;i++)
		{
			l={'a':0,'b':0};
			p={'x':X,'y':Y};
			q={'x':circles[i].x,'y':circles[i].y};
			l.a=(p.y-q.y)/(p.x-q.x);
			if(p.x==q.x)
			{
				l.b=p.x;
			}
			else
			{
				l.b=p.y-(p.x*l.a);
			}
			refresh=true;
			s=intersectBetween(l,i);
			p=[];
			if(s.x==undefined)
			{
				p[p.length]=s.a;
				p[p.length]=s.b;
			}
			else
			{
				p[p.length]=s;
			}
			for(j=0;j<p.length;j++)
			{
				dx=(p[j].x-X);
				dy=(p[j].y-Y);
				d=Math.sqrt(dx*dx+dy*dy);
				if(d<=6)
				{
					prepoint=p[j];
					isPrePoint=true;
					refresh=true;
				}
			}
		}
		intersections=[];
		for(i=0;i<lines.length;i++)
		{
			for(j=i+1;j<lines.length;j++)
			{
				intersect(i,j);
			}
		}
		for(i=0;i<lines.length;i++)
		{
			for(j=0;j<circles.length;j++)
			{
				x=intersectBetween(i,j);
			}
		}
		for(i=0;i<circles.length;i++)
		{
			for(j=i+1;j<circles.length;j++)
			{
				intersectCircles(i,j);
			}
		}
		for(i=0;i<intersections.length;i++)
		{
			dx=(intersections[i].x-X);
			dy=(intersections[i].y-Y);
			d=Math.sqrt(dx*dx+dy*dy);
			if(d<=6)
			{
				prepoint=intersections[i];
				isPrePoint=true;
			}
		}
	}
	if(precircle.r!=0 || precircle!=lastcircle)
	{
		lastcircle=precircle;
	}
	if(selectedPoint!=psp || linePoint>=0 || isPrePoint!=ppp || refresh)
	{
		refreshCanvas();
	}
	linePoint=-1;
}
function showLine(X,Y)
{
	p={'x':X,'y':Y};
	linePoint=-1; 
	for(i=0;i<points.length;i++)
	{
		dx=(points[i].x-X);
		dy=(points[i].y-Y);
		d=Math.sqrt(dx*dx+dy*dy)
		if(d<=6)
		{
			linePoint=i;
			p={'x':points[i].x,'y':points[i].y};
		}
	}
	q=points[selectedPoint] || {'x':0,'y':0};
	preline.a=(p.y-q.y)/(p.x-q.x);
	preline.b=p.y-(p.x*preline.a);
	refreshCanvas();
}
function drawLine(num)
{
	if(num=="pre")
	{
		line=preline;
		context.strokeStyle='#bbbbbb';
	}
	else
	{
		line=lines[num];
		context.strokeStyle='#999999';
	}
	context.beginPath();
	context.moveTo(0,line.b);
	if(1/line.a==0)
	{
		context.moveTo(line.b,0);
		context.lineTo(line.b,canvas.height);
	}
	else
	{
		context.lineTo(canvas.width,canvas.width*line.a+line.b);
		context.lineWidth=2;
	}
	context.stroke();
}
function addCircle(p,q)
{
	if(precircle.r==lastcircle.r)
	{
		circle=precircle;
	}
	else
	{
		dx=(p.x-q.x);
		dy=(p.y-q.y);
		d=Math.sqrt(dx*dx+dy*dy);
	}
	circle={"x":p.x,"y":p.y,"r":d};
	circles[circles.length]=circle;
	refreshCanvas();
}
function drawCircle(num)
{
	if(num=="pre")
	{
		circle=precircle;
		stroke='#bbbbbb';
	}
	else if(num=="last")
	{
		circle=lastcircle;
		circle.x=precircle.x;
		circle.y=precircle.y;
		stroke='#777777';
	}
	else
	{
		circle=circles[num];
		stroke='#999999';
	}
	context.beginPath();
	context.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI,false);
	context.lineWidth=2;
	context.strokeStyle=stroke;
	context.stroke();
}
function showCircle(X,Y)
{
	p={'x':X,'y':Y};
	linePoint=-1; 
	for(i=0;i<points.length;i++)
	{
		dx=(points[i].x-X);
		dy=(points[i].y-Y);
		d=Math.sqrt(dx*dx+dy*dy)
		if(d<=6)
		{
			linePoint=i;
			p={'x':points[i].x,'y':points[i].y};
		}
	}
	q=points[selectedPoint] || {'x':0,'y':0};
	dx=(q.x-p.x);
	dy=(q.y-p.y);
	d=Math.sqrt(dx*dx+dy*dy);
	precircle={"x":q.x,"y":q.y,"r":d};
	if(linePoint==-1 && Math.abs(precircle.r-lastcircle.r)<6)
	{
		precircle.r=lastcircle.r;
	}
	refreshCanvas();
}
function abortAction()
{
	selectedPoint=-1;
	linePoint=-1;
	refreshCanvas();
}
function getMousePos(event)
{
	return {"x":event.pageX-canvas.offsetLeft,"y":event.pageY-canvas.offsetTop};
}
function downMouse(event)
{
	mouseDown=true;
	rightclick=(event.button==2);
	if(selectedPoint<0)
	{
		addPoint(getMousePos(event).x,getMousePos(event).y);
	}
}
function moveMouse(event)
{
	if(!mouseDown)
	{
		selectPoint(getMousePos(event).x,getMousePos(event).y);
	}
	else if(rightclick)
	{
		showCircle(getMousePos(event).x,getMousePos(event).y);
	}
	else
	{
		showLine(getMousePos(event).x,getMousePos(event).y);
	}
}
function upMouse(event)
{
	mouseDown=false;
	if(linePoint>=0)
	{
		if(!rightclick)
		{
			addLine(points[selectedPoint],points[linePoint]);
		}
		else
		{
			addCircle(points[selectedPoint],points[linePoint]);
		}
	}
	else if(event.shiftKey)
	{
		point={'x':getMousePos(event).x,'y':getMousePos(event).y}
		if(!rightclick)
		{
			addLine(points[selectedPoint],point);
		}
		else
		{
			addCircle(points[selectedPoint],point);
		}
	}
	else if(precircle.r==lastcircle.r && rightclick)
	{
		addCircle(points[selectedPoint]);
	}
	rightclick=false;
	selectPoint(getMousePos(event).x,getMousePos(event).y);
}
var MouseWheelHandler=MouseWheelHandler;
