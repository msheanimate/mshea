
        var canvas = document.getElementsByTagName("canvas")[0];
        var w = canvas.width;
        var h = canvas.height;
        var ctx = canvas.getContext("2d");
        var container = {x:0,y:0,width:1200,height:800};
        var rects = [];
        var rect = (function () {
            // constructor
            function rect(id, x, y, r, vx, vy, fill, stroke, strokewidth) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.id = id;
                this.width = r*2;
                this.height = r*2;
                this.radius = r;
                this.fill =  'hsl(' + stroke + ',100%,50%)';
                this.stroke = stroke || "skyblue";
                this.strokewidth = strokewidth || 2;
                this.redraw(this.x, this.y);
                return (this);
            }
            //
            rect.prototype.redraw = function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
                this.draw(this.fill);
                return (this);
            }
            //
            rect.prototype.highlight = function (x, y) {
                this.fill = 'hsl(' + Math.floor(Math.random() * ((255-0)+1) + 0) + ',100%,50%)';
                this.x = x || this.x;
                this.y = y || this.y;
                this.draw(this.fill);
                return (this);
            }
            //
            rect.prototype.move = function (x, y, vx, vy) {
                this.x = x + vx;
                this.y = y + vy;  
                this.draw(this.fill);
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
                ctx.closePath();
                ctx.fill();
                ctx.restore();
                ctx.globalAlpha = 0.5;
            }
            //
            rect.prototype.isPointInside = function (x, y) {
                //console.log(x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
                return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
            }
            return rect;
        })();

        function handleMouseDown(e) {
            var offsetX = canvas.offsetLeft;
            var offsetY = canvas.offsetTop;
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            // Put your mousemove stuff here
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < rects.length; i++) {
                if (rects[i].isPointInside(mouseX, mouseY)) {
                    rects[i].highlight();
                } else {
                    rects[i].redraw();
                }
            }
        }
        //

        function init(num){
            for(var i = 0; i < num; i++){
                var x = Math.floor(Math.random() * ((500-5)+1) + 5);
                var y = Math.floor(Math.random() * ((300    -5)+1) + 5);
                var r = Math.floor(Math.random() * 70) + 25;
                var vx = Math.floor(Math.random() * 4) + 2;
                var vy = Math.floor(Math.random() * 4) + 2;
                var color = Math.floor(Math.random() * ((255-0)+1) + 0)
                rects.push(new rect("circle", x, y, r, vx, vy, color, color, 1));  
            }

            function draw(){
                ctx.clearRect(0, 0, 1200, 800);
                for (var i = 0; i < rects.length; i++) {
                    if((rects[i].x + rects[i].vx + rects[i].radius > container.x + container.width  - rects[i].radius) || (rects[i].x - rects[i].radius + rects[i].vx < container.x - rects[i].radius)){
                        rects[i].vx = - rects[i].vx;
                    }
                    if((rects[i].y + rects[i].vy + rects[i].radius > container.y + container.height - rects[i].radius) || (rects[i].y - rects[i].radius + rects[i].vy < container.y - rects[i].radius)){
                        rects[i].vy = - rects[i].vy;
                    }
                    rects[i].x +=rects[i].vx;
                    rects[i].y +=rects[i].vy;
                    rects[i].move(rects[i].x , rects[i].y, 1, 1);
                }
                requestAnimationFrame(draw);
            }
            requestAnimationFrame(draw);
        }

        //Events
        canvas.addEventListener('click', handleMouseDown, true);
        //canvas.addEventListener('mousemove', handleMouseMove, true);

        function loadJSON(callback) {   
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', 'http://usweb.dotomi.com/resources/swfs/circles.json', true); // Replace 'my_data' with the path to your file
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);  
         };

        //invoke function init once document is fully loaded
        window.addEventListener('load',
        loadJSON(function(response) {
            // Parse JSON string into object
            var data=response;
            var jsonResponse = JSON.parse(data);
            init(jsonResponse["numOfCircles"])}),false);



