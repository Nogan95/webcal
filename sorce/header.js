var constOperation = [
	/* 0 */ "null", /* No Operation */
	/* 1 */ "=",
	/* 2 */ "sqrt(x)",
	/* 3 */ "sin(x)",
	/* 4 */ "[",
	/* 5 */ "<=",
	/* 6 */ "==",
	/* 7 */ "(",
	/* 8 */ "+",
	/* 9 */ "i",
	/* 10 */ "x",
	/* 11 */ "cos(x)",
	/* 12 */ "]",
	/* 13 */ ">=",
	/* 14 */ "!=",
	/* 15 */ ")",
	/* 16 */ "-",
	/* 17 */ "a",
	/* 18 */ "y",
	/* 19 */ "tan(x)",
	/* 20 */ ",",
	/* 21 */ "<",
	/* 22 */ ">",
	/* 23 */ "^",
	/* 24 */ "*",
	/* 25 */ ";",
	/* 26 */ "z",
	/* 27 */ "exp(x)",
	/* 28 */ "cross",
	/* 29 */ "and",
	/* 30 */ "or",
	/* 31 */ "pi",
	/* 32 */ "/",
	/* 33 */ "f(x)",
	/* 34 */ "g(x)",
	/* 35 */ "log(x)",
	/* 36 */ "det",
	/* 37 */ "not",
	/* 38 */ "xor",
	/* 39 */ "e",
	/* 40 */ "%",
];

var graphBuf=[]

function fun1(x,y) 
{
	var parser = math.parser();
	parser.eval(y);
	values = y.split('=');
	return parser.eval(values[0].replace('x',x));
}

function draw(_y,scale) {
	var canvas = document.getElementById("canvas");	
	
	if (null==canvas || !canvas.getContext) return;		
	
	var axes={}, ctx =canvas.getContext("2d");
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	axes.x0 = .5 + .5* canvas.width;
	axes.y0 = .5 + .5* canvas.height;

	axes.doNegativeX = true;
	showAxes (ctx , axes);
	funGraph (ctx , axes, fun1,"rgb(11,153,11)", 1, _y,scale);
}

function funGraph(ctx , axes, func, color, thick, _y,_scale){
	var xx, yy , dx=4, x0=axes.x0, y0=axes.y0, scale=_scale;
	var iMax = Math.round((ctx.canvas.width-x0)/dx);
	var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
	
	var jMax = Math.floor((ctx.canvas.height-y0)/scale);
	var jMin = axes.doNegativeX ? Math.floor(-y0/scale) : 0;	
	
	ctx.beginPath();
	ctx.lineWidth = thick;
	ctx.strokeStyle = color;

	for (var i=iMin ; i<= iMax ; i++) {
		xx = dx*i;
		yy = scale*func(xx/scale,_y);
		
		if(i == iMin)
			ctx.moveTo(x0+xx, y0-yy);
		else
		{
			ctx.lineTo(x0+xx, y0-yy);
		}
		if(i%10 == 0)
		{
			ctx.fillText((xx/scale).toFixed(1),x0 + xx+2,ctx.canvas.height/2 + 10);			
		}
	}
	console.log(scale, jMin, jMax);
	for (var i=jMin ; i<= jMax ; i++) {
		if(i != 0)
			ctx.fillText(-i,ctx.canvas.width/2 - 10, y0 + i*scale);	
	}
	
	ctx.stroke();
}

function showAxes(ctx , axes){
	var x0=axes.x0, w= ctx.canvas.width;
	var y0=axes.y0, h= ctx.canvas.height;
	var xmin = axes.doNegativeX ? 0 : x0;
	
	ctx.beginPath();
	ctx.strokeStyle = "rgb(128,128,128)";
	
	ctx.moveTo(xmin,y0);
	ctx.lineTo(w, y0);
	
	ctx.moveTo(x0,0);
	ctx.lineTo(x0,h);

	ctx.stroke();
}



