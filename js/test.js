
        var canvas = document.getElementsByTagName("canvas")[0];
        var w = canvas.width;
        var h = canvas.height;
        var ctx = canvas.getContext("2d");
        var container = {x:0,y:0,width:w,height:h};
        var shapes = [];
        var shape = (function () {
            // constructor
            function shape(id, x, y, r, vx, vy, fill, stroke, strokewidth) {
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
            shape.prototype.redraw = function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
                this.draw(this.fill);
                return (this);
            }
            //
            shape.prototype.highlight = function (x, y) {
                this.fill = 'hsl(' + Math.floor(Math.random() * ((255-0)+1) + 0) + ',100%,50%)';
                this.x = x || this.x;
                this.y = y || this.y;
                this.draw(this.fill);
                return (this);
            }
            //
            shape.prototype.move = function (x, y, vx, vy) {
                this.x = x + vx;
                this.y = y + vy;  
                this.draw(this.fill);
                return (this);
            }
            //
            shape.prototype.draw = function (stroke) {

                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = stroke;
                ctx.strokeStyle = this.stroke;
                ctx.lineWidth = this.strokewidth;
                //add rectangle
                //ctx.rect(this.x, this.y, this.width, this.height);
                //add circle
                ctx.arc(this.x+this.radius, this.y+this.radius, this.radius,0,2*Math.PI,false);
                ctx.stroke();
                ctx.closePath();
                ctx.fill();
                ctx.restore();
                ctx.globalAlpha = 0.75;
            }
            //
            shape.prototype.isPointInside = function (x, y) {

               
                //Here is the pythagorean theorem, doesnt seem like it lining up correctly.  Still looking into it though


                  var distX = Math.abs(x - this.x-this.radius), 
                  distY = Math.abs(y - this.y-this.radius), 
                  dist = Math.sqrt(distX * distX + distY * distY);

                  console.log(this.radius)

                  return dist < this.radius;
              

                //detecting a square target, want to pythagorean theorm to get more accurate, not working out though.
                //return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
			      }
            //
            return shape;
        })();

        function handleMouseDown(e) {
            var offsetX = canvas.offsetLeft;
            var offsetY = canvas.offsetTop;
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < shapes.length; i++) {
                if (shapes[i].isPointInside(mouseX, mouseY)) {
                    shapes[i].highlight();

                } else {
                    shapes[i].redraw();
                }
            }
        }
        //
        function init(num){
            //Random numbers are being selected for the following properties.
            for(var i = 0; i < num; i++){
                var x = Math.floor(Math.random() * ((500-5)+1) + 5);
                var y = Math.floor(Math.random() * ((300    -5)+1) + 5);
                var r = Math.floor(Math.random() * 70) + 25;
                var vx = Math.floor(Math.random() * 4) + 2;
                var vy = Math.floor(Math.random() * 4) + 2;
                var color = Math.floor(Math.random() * ((255-0)+1) + 0)
                //adjust the vx, and vy to slow circles down.  0 just stops them.
                shapes.push(new shape("circle", x, y, r, vx, vy, color, color, 1)); 
            }

            function draw(){
                ctx.clearRect(0, 0, w, h);
                for (var i = 0; i < shapes.length; i++) {
                    if((shapes[i].x + shapes[i].vx + shapes[i].radius > container.x + container.width  - shapes[i].radius) || (shapes[i].x - shapes[i].radius + shapes[i].vx < container.x - shapes[i].radius)){
                        shapes[i].vx = - shapes[i].vx;
                    }
                    if((shapes[i].y + shapes[i].vy + shapes[i].radius > container.y + container.height - shapes[i].radius) || (shapes[i].y - shapes[i].radius + shapes[i].vy < container.y - shapes[i].radius)){
                        shapes[i].vy = - shapes[i].vy;
                    }
                    shapes[i].x +=shapes[i].vx;
                    shapes[i].y +=shapes[i].vy;
                    shapes[i].move(shapes[i].x , shapes[i].y, 0, 0);
                }
                requestAnimationFrame(draw);
            }
            requestAnimationFrame(draw);
        }

        //Event handlers
        canvas.addEventListener('click', handleMouseDown, true);
        //canvas.addEventListener('mousemove', handleMouseMove, true);

        //LOAD DATA
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

        //invoke function init() once document is fully loaded
        window.addEventListener('load',
        loadJSON(function(response) {
            // Parse JSON string into object
            var data=response;
            var jsonResponse = JSON.parse(data);
            init(jsonResponse["numOfCircles"])}),false);



