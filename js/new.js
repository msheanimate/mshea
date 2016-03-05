(function(){

function init(){
    var canvas = document.getElementById("canvas");
    var w = canvas.width;
    var h = canvas.height;
    var ctx = canvas.getContext("2d");
    var offsetX = canvas.offsetLeft;
    var offsetY = canvas.offsetTop;
    var container = {x:0,y:0,width:800,height:600};
    console.log(offsetX);
    console.log(offsetY);
    var stoke = 100
    var rects = [];

    var rect = (function () {
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


     function draw(){
         c.fillStyle = 'black';
         c.strokeStyle = 'black';
         c.fillRect(container.x,container.y,container.width,container.height);

         //c.clearRect(container.x,container.y,container.width,container.height);
         //c.strokeRect(container.x,container.y,container.width,container.height);

         for(var i=0; i <circles.length; i++){
             c.fillStyle = 'hsl(' + circles[i].color + ',100%,50%)';
             c.beginPath();
             c.arc(rects[i].x,rects[i].y,rectsi].r,0,2*Math.PI,false);
             c.rect(rects[i].x, rects[i].y, rects[i].width, rects[i].height)
             c.fill();

             if((rects[i].x + rects[i].vx + rects[i].r > container.x + container.width) || (rects[i].x - rects[i].r + rects[i].vx < container.x)){
                rects[i].vx = - rects[i].vx;
             }
             if((rects[i].y + rects[i].vy + rects[i].r > container.y + container.height) || (rects[i].y - circles[i].r + rects[i].vy < container.y)){
                 circles[i].vy = - circles[i].vy;
             }
             rects[i].x +=rects[i].vx;
             rects[i].y +=rects[i].vy;
             //console.log(circles[i].x , circles[i].y)
         }



         requestAnimationFrame(draw);

     }


    requestAnimationFrame(draw);


}
function isPointInside(x, y){
console.log(circles[i].x , circles[i].y)
     console.log(x >= circles[i].x && x <= circles[i].x + circles[i].radius*2 && y >= circles[i].y && y <= circles[i].y + circles[i].radius*2);
}

function handleMouseDown(e) {
    console.log(e.clientX, e.clientY);
    var xPosition = e.clientX;
    var yPosition = e.clientY;

    isPointInside(e.clientX, e.clientY);

}
canvas.addEventListener('click', handleMouseDown, true);
//invoke function init once document is fully loaded
window.addEventListener('load',init,false);

}());  //self invoking function