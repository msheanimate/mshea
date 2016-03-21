function createShape(shape ){
	var animation;
	var centerX = 125;
	var centerY = 125;
	var radius = 20;
	var boardX = 500;
	var boardY = 250;
	var ballDx = 2;
	var ballDy = 2;
	var theta = 0;
	var thetaInc = 0.08;

	var animate = function(){
		clearInterval(animation);
		setInterval(drawBall, 10 );
	}





    var rect = (function () {
		var canvas = document.getElementById("canvas");
	    var w = canvas.width;
	    var h = canvas.height;
	    var ctx = canvas.getContext("2d");
	    var offsetX = canvas.offsetLeft;
	    var offsetY = canvas.offsetTop;
	    var container = {x:0,y:0,width:800,height:600};
        // constructor
        function rect(id, x, y, width, height, vx, vy, fill, stroke, strokewidth) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.id = id;
            this.width = width;
            this.height = height;
            this.radius = width/2;
            this.fill =  'hsl(' + stroke + ',100%,50%)';
            this.stroke = stroke || "skyblue";
            this.strokewidth = strokewidth || 2;
            this.redraw(this.x, this.y);
            return (this);
        }
        rect.prototype.redraw = function (x, y) {
            this.x = x || this.x;
            this.y = y || this.y;
            this.draw(this.fill);
            return (this);
        }
        rect.prototype.move = function () {
            this.x += this.vx;
            this.y += this.vy;
        };
        //
        rect.prototype.highlight = function (x, y) {
            this.x = x || this.x;
            this.y = y || this.y;
            this.draw("orange");
            return (this);
        }
        //
        rect.prototype.draw = function (stroke) {

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = stroke;
            ctx.strokeStyle = this.stroke;
            ctx.lineWidth = this.strokewidth;
            //ctx.rect(this.x, this.y, this.width, this.height);
            ctx.arc(this.x+this.radius, this.y+this.radius, this.radius,0,2*Math.PI,false);
            ctx.stroke();
            ctx.fill();
            ctx.restore();
            this.move();


        }

        //
        rect.prototype.isPointInside = function (x, y) {
            console.log(x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
            return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
        }
        return rect;
    })();

	var drawBall = function(){
		var content = document.getElementById("panel");
		var me = content.getContext("2d");
		me.clearRect(0,0,content.width, content.height);

		//var shap = new rect("circle", x, y, w, h, vx, vy, color, color, 10)

		centerX = centerX + ballDx;
		centerY = centerY + ballDy; 
		me.beginPath();
		me.rect("circle", 200, 300,50, 50, 6, 10, 123, 123, 10)
		me.stroke();
		me.fillStyle = "orange";
		me.fill();
		//rotate the line
		theta = theta + thetaInc;
		me.moveTo(centerX - radius * Math.cos(theta),
			centerY - radius * Math.sin(theta));
		me.lineTo(centerX + radius*Math.cos(theta),
			centerY + radius*Math.sin(theta));
		///////////////////
		me.lineWidth = "2";
		me.lineCap = "round";
		me.strokeStyle = "black";
		me.stroke();

		//Check to see if the ball is at the very top or very bottom
		//then change the direction of the ball
		if(centerY > boardY - radius || centerY - radius < 0){
			ballDy = -1*ballDy;
			//change rotation of the line when it hits wall
			if((ballDx<0 && ballDy > 0)&& thetaInc < 0 ){
				thetaInc = -1*thetaInc;
			}else if((ballDx < 0 && ballDy > 0 )&& thetaInc > 0){
				thetaInc = -1*thetaInc;
			}else if((ballDx > 0 && ballDy > 0) &&  thetaInc > 0){
				thetaInc = -1*thetaInc;
			}else if(ballDx > 0 && ballDy<0 &&thetaInc < 0){
				thetaInc = -1*thetaInc;
			}	
		}

		//Check to see if the ball is at the very left or right 
		//then changes direction.

		if(centerX > boardX - radius || centerX < radius){
			ballDx = -1*ballDx;
			//change rotation of the line when it hits wall
		}
		
	}


	
	if(shape == "circle"){
		drawBall();
		animate();
	}else if(shape == "square"){
		square();
	}else{
		return false;
	}

}	

createShape("circle");
/*
	var animation;
	var centerX = 125;
	var centerY = 125;
	var radius = 20;
	var boardX = 500;
	var boardY = 250;
	var ballDx = 2;
	var ballDy = 2

	function drawBall(){
		var content = document.getElementById("bouncyBall");
		var me = content.getContext("2d");
		me.clearRect(0,0, content.width, content.height);

		//Incrementing the center 25ms to redraw the ball and give the
		//appearence of movement.
		centerX = centerX + ballDx;
		centerY = centerY + ballDy;
		me.beginPath();
		me.arc(centerX, centerY, radius,0,Math.PI*2, false);
		me.stroke();
		me.fillStyle = "orange";
		me.fill();

	}
	
	function animate(){
		clearInterval(animation);
		setInterval(drawBall, 25);
	}
	*/


