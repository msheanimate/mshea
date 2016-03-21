
(function(w, h){
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

    function init(num){

        console.log(num)
        var circles = [];
        var obj = {}
        var canvas = document.getElementsByTagName('canvas')[0];
        var id = document.getElementById("panel");
        var c = canvas.getContext('2d');
        var elemLeft = canvas.offsetLeft; 
        var elemTop = canvas.offsetTop;
        var container = {x:0,y:0,width:w,height:h};
        var elemLeft = canvas.offsetLeft;
        var elemTop = canvas.offsetTop;

        


        //{x:400,y:400,r:50,color:25,vx:6,vy:10}
        var ball = {}
        ball.x = 400;
        ball.y = 400;
        ball.r = 50;
        ball.color = 25;
        ball.vx = 6;
        ball.vy = 10;

        function Ball(){
            var xVal;
            var yVal;
            var rVal;
            var colorVal;
            var vxVal;
            var vyVal;

            Object.defineProperty(this, "x", {
                get: function(){
                    console.log("called get -> x" + xVal);
                    return xVal;
                },
                set: function(value){
                    xVal = value;
                    console.log("called set -> x" + xVal);
                }
            });
            Object.defineProperty(this, "y", {
                get: function(){
                    console.log("called get -> y" + yVal);
                    return yVal;
                },
                set: function(value){
                    yVal = value;
                    console.log("called set -> y" + yVal);
                }
            });
            Object.defineProperty(this, "r", {
                get: function(){
                    console.log("called get -> r" + rVal);
                    return rVal;
                },
                set: function(value){
                    rVal = value;
                    console.log("called set -> r" + rVal);
                }
            });
            Object.defineProperty(this, "color", {
                get: function(){
                    console.log("called get -> color" + colorVal);
                    return colorVal;
                },
                set: function(value){
                    colorVal = value;
                    console.log("called set -> color" + colorVal);
                }
            });
            Object.defineProperty(this, "vx", {
                get: function(){
                    console.log("called get -> color" + vxVal);
                    return vxVal;
                },
                set: function(value){
                    vxVal = value;
                    console.log("called set -> color" + vxVal);
                }
            });
            Object.defineProperty(this, "vy", {
                get: function(){
                    console.log("called get -> vy" + vyVal);
                    return vyVal;
                },
                set: function(value){
                    vyVal = value*(Math.floor(Math.random() * (((.5-1)-0)+1) + 1));
                    console.log("called set -> vy" + vyVal);
                }
            });
        }
        ///c
        for(var a = 0; a < num; a++){
            var ball = new Ball();
            ball.x = Math.floor(Math.random() * w) + 0 //0 - w
            ball.y = Math.floor(Math.random() * h) + 0 //0 - h
            ball.r = Math.floor(Math.random()*49+1); //0 - 50
            ball.color = Math.floor(Math.random() * ((360-0)+1) + 0); //0 - 50
            ball.vx = Math.floor(Math.random() * 4) + 0   //0 - 15
            ball.vy = Math.floor(Math.random() * 4) + 0   //0 - 15

     
            circles.push({x: ball.x, y: ball.y, r: ball.r, color: ball.color, vx: ball.vx, vy: ball.vy});
        }
        console.log("X : " + circles[0].x + " , Y : " + circles[0].y + " R " + circles[0].r );
        circles[0].color = 0;
        
    function draw(){
                c.fillStyle = 'black';
                c.strokeStyle = 'black';
                c.fillRect(container.x,container.y,container.width,container.height);
                //c.clearRect(container.x,container.y,container.width,container.height);
                //c.strokeRect(container.x,container.y,container.width,container.height);
    /*
                canvas.addEventListener('click', function(event) {
                    var x = event.pageX - elemLeft,
                        y = event.pageY - elemTop;

                    console.log(x, y);
                    circles.forEach(function(element) {
                        console.log(y, element.top)
                        if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                            alert('clicked an element');
                        }
                    });

                }, false);
    */


                for(var i=0; i <circles.length; i++){
                    if(i == 0){
                        c.fillStyle = 'hsl(' + circles[0].color + ',100%,100%)';
                    }else{
                        c.fillStyle = 'hsl(' + circles[i].color + ',100%,50%)';
                    }
                    
                    c.beginPath();
                    c.arc(circles[i].x,circles[i].y,circles[i].r,0,2*Math.PI,false);
                    c.fill();

                   
                    circles[i].x +=circles[i].vx;
                    circles[i].y +=circles[i].vy;
                }

                requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);




}

//invoke function init once document is fully loaded
window.addEventListener('load',
    loadJSON(function(response) {
            // Parse JSON string into object
            var data=response;
            var jsonResponse = JSON.parse(data);
            init(jsonResponse["numOfCircles"])}),false);

}(1024, 768));  //self invoking function


