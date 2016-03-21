//Closures	//a closure is the local variables for a function — kept alive after the function has returned, or
	//a closure is a stack-frame which is not deallocated when the function returns (as if a 'stack-frame' 
	//were malloc'ed instead of being on the stack!).

	//inner fuctions inherit the variables that the function are nested in.  Instead of initializing myObject 
	//with an objet literal (like above) lets intialize myObject by calling a function that returns an object 
	//literal (see below).  That function defines the variable value, and the all the other functions 
	//(initialzie, increment, decrement, getValue ) get access to it.  It is private to the everywhere else.

	//Below we are not assigning a function to myObject, we are assigning the result of invoking that function.
	//See the () in the last line?  That function returns all the methods that have access to the variable value.
						    var myObject = (function () {
						        var value = 0;
						        return {
						        	initialize: function (num){
						        		value += num;
						        	},
						            increment: function (inc) {
						                value += typeof inc === 'number' ? inc : 1;
						            },
						            decrement: function (inc) {
						                value -= typeof inc === 'number' ? inc : 1;
						            },
						            getValue: function () {
						                return value;
						            }
						        }
						    }());
						    myObject.initialize(5);
						    console.log(myObject.getValue()); // 1
        					myObject.increment();
       						console.log(myObject.getValue()); // 1
       						myObject.increment(2);
      						console.log(myObject.getValue()); // 3
      						myObject.decrement(1);
      						console.log(myObject.getValue()); // 2


      //The quo constructor from earlier produces and object with a status property and a function get_status.
      //This seems a bit wierd, why would you call a getter method on a property you can access directly.  It would
      //be more useful if that status property were private.

      						var quo = function(status){
      							var status = status;
      							return{
      								get_status: function( ){
      									return status;
      								},
      								set_status:  function(new_status) {
      									status = new_status;
      								}
      							}
      						};

      						var myQuo = quo("Im OK, I guess");
      						console.log(myQuo.get_status());
      						myQuo.set_status("Im good now");
      						console.log(myQuo.get_status());
      						console.log(myQuo);

      	//now its designed not to use the keyword new and since its not a constructor.  Now it reuturns a new
      	//object containing the get_status and set_status methods.  The reference to that object is stored in myQuo.
      	//the get_status method still has privileged access to quo's status property although it has returned.  
      	//get_status does not have access to a copy of the paramete; it has access to the parameter itself.  This is 
      	//possible because it has access to the context in which it was created.  This is called "closure".

      						//create a closure that sets the bg color to yellow, the fades to white.

      						var fade = function (node){
      							var level = 1;
      							var step  =  function (){
      								var hex = level.toString(16);
      								//console.log('#FFFF' + hex + hex);
      								node.style.backgroundColor = '#FFFF' + hex + hex;
      								if(level < 15) {
      									level += 1;
      									setTimeout(step, 100);
      								}
      							};
      							setTimeout(step, 100);
      						};
							
							fade(document.body);



							// BAD EXAMPLE

							// Make a function that assigns event handler functions to an array
							// of nodes the wrong way.
							// When you click on a node, an alert box is supposed to display the ordinal
							// of the node.
							// But it always displays the number of nodes instead.

							var add_the_handlers = function (nodes) {
							    var i;
							    for (i = 0; i < nodes.length; i += 1) {
							        nodes[i].onclick = function (e) {
							            alert(i);
							        };
							    }
							};

							// END BAD EXAMPLE

							// BETTER EXAMPLE

							// Make a function that assigns event handler functions to an array of nodes.
							// When you click on a node, an alert box will display the ordinal of the node.

							var add_the_handlers = function(nodes) {
								for (var i = 0; i < nodes.length; ++i) {
									nodes[i].onclick = function(i) {
										return function() {
											alert(i);
										};
									}(i);
							    } // end for
							};
							var p = add_the_handlers(document.getElementsByTagName('p'));
							// END BETTER EXAMPLE
							function celebrityIDCreator (theCelebrities) {
							    var i;
							    var uniqueID = 100;
							    for (i = 0; i < theCelebrities.length; i++) {
							        theCelebrities[i]["id"] = function (j)  { // the j parametric variable is the i passed in on invocation of this IIFE​
							            return function () {
							            	console.log(uniqueID + j)
							                return uniqueID + j; // each iteration of the for loop passes the current value of i into this IIFE and it saves the correct value to the array​
							            }() // BY adding () at the end of this function, we are executing it immediately and returning just the value of uniqueID + j, instead of returning a function.​
							        } (i); // immediately invoke the function passing the i variable as a parameter​
							    }
							    return theCelebrities;
							}

							var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
							var createIdForActionCelebs = celebrityIDCreator (actionCelebs);
							var stalloneID = createIdForActionCelebs [0];
							console.log(stalloneID.id); // 100​
							var cruiseID = createIdForActionCelebs [1]; 
							console.log(cruiseID.id); // 101

							//My stab at a closure
							function closure (test) {
								for (i = 0; i < test.length; i++) {
									test[i]["id"] = function (i)  { 
										console.log(test[i]["id"])
							            return function () {
							                return 200 + i; 
							            }() 
							        } (i);
						
								}
								console.log(test);
								return test;
							}
							var h = [{name:"Shea", id:0}, {name:"Horner", id:0}, {name:"Rohrbach", id:0}];
							console.log(h);
							var createIdForActionCelebs = closure (h);
							var sheaId = createIdForActionCelebs[0];
							console.log(sheaId.id);
				console.log("__________________________________________________")
				console.log("EXAMPLES OF CLOSURES.......")
				console.log("													");
				console.log("1. Intro to Closure");
				console.log("__________________________________________________")
				console.log("The following code returns a reference to a function:The following code returns a reference to a function:")

							function sayHello2(name) {
							    var text = 'Hello ' + name; // Local variable
						    	var say = function() { 
						    		for(var i = 0; i<5; i++){
						    			console.log(text + " i: " + i ); 
						    		}
						    	}()
						    	return say; //say is a referce to a function.  Say is considered a pointer to a function.
							}

							var say2 = sayHello2('Bob');
							say2; // logs "Hello Bob"  also you can add the () here and remove from the closure above, or you can put the () and 
								 //take it away from above

							console.log(">The above code has a closure because the anonymous function function() { console.log(text); } is declared inside another function, sayHello2() in this example. In JavaScript, if you use the function keyword function, you are creating a closure.  The '()' means it is returning the function.  You can add it after the function closure and call it by just 'say' or you can remove the '()' and call say() instead.  the () just means its returning all the local variables from the closure function that say is referencing.");
							console.log(">In JavaScript, if you declare a function within another function, then the local variables can remain accessible after returning from the function you called. This is demonstrated above, because we call the function say2() after we have returned from sayHello2(). Notice that the code that we call references the variable text, which was a local variable of the function sayHello2().")

				console.log("__________________________________________________")   
							    
				console.log("2.)  Number incrementor (also shows order of operations")
				console.log("__________________________________________________")   
				
								function say667() {
								    // Local variable that ends up within closure
								    var num = 666;
								    console.log("order 1");
								    var say = function() { console.log("order 2"); console.log(num); }
								    console.log("order 3");
								    num++;
								    console.log("order 4");
								    return say;
								}
								var sayNumber = say667();
								sayNumber(); // logs 667
							console.log("This example shows that the local variables are not copied — they are kept by reference. It is kind of like keeping a stack-frame in memory when the outer function exits!");

				console.log("__________________________________________________")   
							    
				console.log("3.)  SET UP Globals")			
				console.log("__________________________________________________")  
				

							console.log("All three global functions have a common reference to the same closure because they are all declared within a single call to setupSomeGlobals().")

								var gLogNumber, gIncreaseNumber, gSetNumber;
								function setupSomeGlobals() {
								    // Local variable that ends up within closure
								    var num = 666;
								    // Store some references to functions as global variables
								    gLogNumber = function() { console.log(num); }
								    gIncreaseNumber = function() { num++; }
								    gSetNumber = function(x) { num = x; }
								}

								setupSomeGlobals();
								gIncreaseNumber();
								var inc = gLogNumber(); // 667
								gSetNumber(5);
								gLogNumber(); // 5

								var oldLog = gLogNumber;
								console.log("SAME CLOSURE IS CALLED - notice when the closure is called the old stack-trace is wiped out.")
								setupSomeGlobals();
								gLogNumber(); // 666

								oldLog() // 5

								console.log("The three functions have shared access to the same closure — the local variables of setupSomeGlobals() when the three functions were defined.  Note in the above example, if you call setupSomeGlobals() again, then a new closure (stack-frame!) is created. The old gAlertNumber, gIncreaseNumber, gSetNumber variables are overwritten with new functions that have the new closure. (In JavaScript, whenever you declare a function inside another function, the inside function(s) is/are recreated again each time the outside function is called.")
							console.log("__________________________________________________")   
							    
							console.log("4. Defining a functin within a loop)")
							console.log("__________________________________________________")  


							function buildList(list) {
							    var result = [];
							    for (var i = 0; i < list.length; i++) {
							        var item = 'item' + i;
							        result.push(    
							        	function(){ 
								        	return {name: i, id: item, bla: list};
							        	}()
							        );
							    }
							    console.log(result)
							    return result;
							}

							function testList() {
							    var fnlist = buildList([1,2,3]);
							    // Using j only to help prevent confusion -- could use i.
							    for (var j = 0; j < fnlist.length; j++) {
							        fnlist[j];
							    }
							}

							testList();

//Example trace
console.log("Example Trace......")
							console.log("first call --------------------------");
							result 	= mystery(2);
							//console.log(result); //result is a pointer to the function mystery
							//console.log("second call-------------------------- ");
							result =  mystery3(result)(7);
							//console.log("third call ---------------------------");
							result = ( mystery(3) )(2);

							function mystery ( input ){
							  console.log("1_____: input : " ,  input);
							  var secret = 4;
							  input+=2;		//5
							  console.log("1.1_____: input : " ,  input);
							  
							  function mystery2 ( multiplier ) { 
							  	console.log("2____ : multiplier : " , multiplier);
							    multiplier *= input;  //
							    console.log("2.1____ : multiplier : " , multiplier);
							    console.log("mystery2 return : " , multiplier * secret);
							    return secret * multiplier;
							  };
							  console.log("3");
							  return mystery2;
							}
							function mystery3 ( param ){ 		//result (from above was passed in, so this is a reference to the mystery function.)
								console.log("4");
								console.log(param);
							  function mystery4 ( bonus ){
							  	console.log("5");
							  	console.log("5.1______: bonus : " , bonus);
							  	console.log("return mystery3 : " , param(bonus)+ bonus);
							    return param(bonus) + bonus;
							  }
							  console.log("6");
							  return mystery4;
							}
//Example trace
							function fun1(arg1){
								var mult = arg1;
								function fun2(arg2){
									return arg2 * mult;
								}

								return fun2;
							}

							function fun3(func){
								function fun4(bonus){
									console.log("here");
									return func(bonus);
								}
								return fun4;
							}
							var test = fun1(2);
							var test = fun3(test)(1);
							console.log(test);


//Greeting example (exmaple on code school)
console.log("Greeting......")

							var greeting
							var newCustomer = true;

							if(newCustomer) {
								var greeting = function(){
									console.log("Hello new Customer");
								}
								
							}else{
								var greeting = function(){
									console.log("Hello again, glad you came back");
								}
							}

							closeTerminal(greeting);

							function closeTerminal(greeting){
								greeting();
								//console.log(message)
								
							}

							console.log("__________________________________________________")   
							    
							console.log("5.)")
							console.log("__________________________________________________")  

							console.log("6.)")
//Using function Expression with the map method
console.log("Function expression with the map method......")
					var numbers = [12, 4 ,3 , 9, 8, 6, 10, 1]
					//.map works like a loop
					var results = numbers.map( function(arrayCell){
							return arrayCell * 2;
						}
					);

					console.log(results);

					var passengers = [ ["Thomas", "Meeks"],["Gregg", "Pollack"],["Christine", "Wong"],["Dan", "McGaw"] ];
					var modifiedName;
						modifiedName = passengers.map(
						  function(arrayCells){return arrayCells[0] + " " + arrayCells[1]; });

					modifiedName.map(function(arrayCells){
						alert("yo " + arrayCells);
					});


// An Array of function
console.log("Puzzler Array of function......")
					var puzzlers = [
					  	function(a) { return 3 * a - 8; },
					  	function(a) { return (a + 2) * (a + 2) * (a + 2); },
					  	function(a) { return a * a - 9; },
					  	function(a) { return a % 4; }
					];

					var modifiedPuzzler
					puzzlers.map(
						function(arrayCells){
							console.log(arrayCells(3));
							return arrayCells(3);
						}
					);

					console.log(puzzlers[1](2));

//Another puzzler, this loops through the array of functions but passes in the result of each function to the next until it reaches the end.
console.log("Puzzler Loop Array......")
					var puzzlers = [
						function(a) { return 8 * a - 10; },
						function(a) { return (a - 3) * (a - 3) * (a - 3); },
						function(a) { return a * a + 4; },
						function(a) { return a % 5; }
					];
					var start = 2;

					// build applyAndEmpty function expression here
					var applyAndEmpty =  function(input, queue){
						var length = queue.length;
						for(var i = 0; i < length; i++){
						  	input = queue.shift()(input);

						}
						return input;
					};

					console.log(applyAndEmpty(start, puzzlers));  //3

//Park Rides Example (Returning Functions and immediate invocation)
console.log("Park Rides......")
					var parkRides = [["Birch Bumpers", 40],["Pines Plunge", 55],["Cedar Coaster", 20],["Ferris Wheels of Firs", 90]];
 
					var fastPassQueue = ["Cedar Coster", "Pines Plunge", "Birch Bumpers", "Pines Plunge"];

					fastPassQueue.push("Pines Plunge");  //adds at the end of the array.
					//fastPassQueue = ["Cedar Coster", "Pines Plunge", "Birch Bumpers", "Pines Plunge", "Pines Plunge"];
					console.log(fastPassQueue);
					var firstFastPass = fastPassQueue.shift();		//chops off the first element and returns it.  We can also save this into a var.
					console.log(firstFastPass) //"Cedar Coaster"
					console.log(fastPassQueue.length); 	//length of fastPassQueue is now 3
					console.log(fastPassQueue);
					var wantsRide = "Cedar Coaster";
					var ticket = buildTicket(parkRides, fastPassQueue, wantsRide)(" passed in a variable");
					//ticket();  // this is to call the function containerd in the ticket variable.

					//buildTicket(parkRides, fastPassQueue, wantsRide);

					function buildTicket(allRides, passRides, pick ){
						if(passRides[0] == pick){
							var pass = passRides.shift();
							return function(){console.log("You have a fast pass to... " + pass + " !"); console.log(passRides);};	
						}else{
							for(var i = 0; i < allRides.length; i++){
								if(allRides[i][0] == pick){
									return function(test) {
										console.log("A ticket is printing for " + pick + "!\n" +"Your wait time is about " + allRides[i][1] + " minutes. " + test)
										
									}
								}
							}
						}
					}
// Modidifying bound values after a closure - The second call to getSubmarineTicket increments passengerNumber by 1 again.  Even though the functions 
//local scope loses disappeared after Mario was created.  It still keep sthe progressof passengerNubmer.
console.log("Build Ticket Maker......")
					function buildCoveTicketMaker(transportation){
						var passengerNumber = 0;	//notice that this starts at 0 everytime we call the function.

						return function lastName(name){
							passengerNumber++;
							alert(	"Here is your transportation ticket vis the " + transportation + ".\n" + 
									"Welcome to the Cold Closure Cove " + name +
									" Your passenger number is " + passengerNumber + ".");
						}

					}
					console.log("test");
					var getSubmarineTicket = buildCoveTicketMaker("Submarine");
						getSubmarineTicket("Mario");
						getSubmarineTicket("Matt");  //although we are calling buildCoveTicketMaster, the passengerNumber is set back to 0, it retains its value
	
//Warning Maker 
console.log("Warning Maker......")
					function warningMaker(obstacle) {
						var count = 0;
						var zones = [];
						return function(number, location) {
							count++;
							var list = "";
							zones.push([location, number]);
							for(var i = 0; i < zones.length; i++) {
							  list += zones[i][0] + " (" + zones[i][1] + ")" + "\n";
							}
							alert("Beware! There have been " + obstacle +
							      " sightings in the Cove today!\n" +
							      number + " have been spotted at the " +
							      location + "!\n" +
							      "This is alert #" + count +
							      " today for " + obstacle + " danger.\n" +
							      "Current danger zones are:\n" +
							      list);
						};
					}

					var bump = warningMaker("Bump");
					bump(5, "new york");	
					bump(15, "Chicago");	

//Dangers with closures
console.log("Dangers with Closure (assignTorpedo......");	
console.log("    Wrong: returns the wrong i value");	
					function assignTorpedo(name, passengerArray){
						var assignTorpedo;
						//look for passenger
						for(var i = 0; i < passengerArray.length; i++){
							//when we find passenger run this function
							if(passengerArray[i] == name){
								torpedoAssignment = function(){
									alert("This has the wrong i value because it returns when the closure is over and not when we need it to. \nAhoy " + name + "\n" +
									"Man your post at torpedo #" + (i+1) +"!")
								};
							}
						}
						//assign our torpedoAssignement over to global scope.
						return torpedoAssignment;
					}

					var subPassengers = ["Luke", "Leia", "han ", "chewie", "yoda", "R2-D2", "C3-P0", "Boba"];
					var giveAssignment = assignTorpedo("chewie", subPassengers)();  

					//This shows a value of 9 for i, it should be 4, why

					//closures bind values at their very last opportunity when it returns.  So 
					//in this case i is looping through the entire the array ending up with a value
					//of 8, then it adds 1.

					//solution:
			console.log("    Solution 1: Correct");
					function assignTorpedoSolution(name, passengerArray){
						var assignTorpedo;
						//look for passenger
						for(var i = 0; i < passengerArray.length; i++){
							//when we find passenger run this function
							if(passengerArray[i] == name){
								return function(){
									alert("Solution... Correct!!! \nAhoy " + name + "\n" +
									"Man your post at torpedo #" + (i+1) +"!")
								};
							}
						}

					}

					var subPassengers = ["Luke", "Leia", "han ", "chewie", "yoda", "R2-D2", "C3-P0", "Boba"];
					var giveAssignment = assignTorpedoSolution("chewie", subPassengers)(); 

			console.log("    Solution 2: Correct");
					function makeTorpedoAssigner(passengerArray){
						return function(name){
							//notice we are using passengerArray as a parameter and not a varialbe, this is 
							//because parameters can be closed as well.  the only closed variable is passengerArray
							//which never changes.  woot hooo!!
							for(var i = 0; i < passengerArray.length; i++){
								if(passengerArray[i] == name){
									alert("Solution 2... Correct!!! \nAhoy " + name + "\n" +
									"Man your post at torpedo #" + (i+1) +"!")
								}
							}
						};

					}

					var subPassengers = ["Luke", "Leia", "han ", "chewie", "yoda", "R2-D2", "C3-P0", "Boba"];
					var getTorpedoFor = makeTorpedoAssigner(subPassengers)("chewie"); 

//shark example
console.log("Shark Example");
					function makeTargetAssigner(sharks, targets) {
						return function(shark) {
							for (var i = 0; i < sharks.length; i++) {
								if (sharks[i] == shark) {
									alert("Hey, " + shark + "!\n" +
									      "There've been " + targets[i] +
									      " sightings in our area!\n" +
									      "Time to take care of business!");
								}
							}
						};
					}

					var listOfSharks = ["Sea Pain", "Great Wheezy",
					                    "DJ Chewie", "Lil' Bitey",
					                    "Finmaster Flex", "Swim Khalifa",
					                    "Ice Teeth", "The Notorious J.A.W."];

					var listOfTargets = ["icicle bat", "snow yeti",
					                     "killer penguin", "frost tiger",
					                     "polar bear", "iceberg",
					                     "blue witch", "wooly mammoth"];

					var getTargetFor = makeTargetAssigner(listOfSharks, listOfTargets);
					getTargetFor("Ice Teeth");
					

//Hoisting
console.log("HOISTING -  load order");
					
					//When hoisting, the varialbes are hoisted to the top, then the functions.  
					//Functions expressions are NOT hoisted though, they are always treated as assignment.

					//this work ok
					function sumOfSquares(a, b){

						var x = add(a*a, b*b);

						function add(c,d){
							a = c + d;
							return a;
						}
						return x;
					}
					console.log("This works as it looks...")
					console.log("the sum of Squares (2,4) is: " + sumOfSquares(2,4));

					console.log("********This does not work as it looks...");

					function getMysteryNumber(){
						function chooseMysteryNumber(){
							return 12;
						}

						function chooseMysteryNumber(){
							return 7;
						}

						return chooseMysteryNumber();
					}

					console.log(getMysteryNumber()); 		// returns 7 becuase the second chooseMysteryNumber overwrote the first.
					console.log("first hoists the function(){return 12} \n" +
						"then hoists the function(){return 7} \n" +
						"then returns chooseMysteryNumber, the second call overwrites the first call.");



					console.log("********This does not work as it looks as well...");
					function getMysteryNumberTwo(){
						var chooseMysteryNumber = function(){
							return 12;
						}

						return chooseMysteryNumber();
						
						var chooseMysteryNumber = function(){
							return 7;
						}
					}
					console.log(getMysteryNumberTwo()); 		// returns 7 becuase the second chooseMysteryNumber overwrote the first.

					console.log("First hoists var chooseMysteryNumber = undefined \n" + 
						"then hoists the next var chooseMysteryNumber = undefined \n" + 
						"then hoists the function(){return 12} \n" +
						"then executes the return chooseMysteryNumber(), which terminates \n" +
						"then hoists the function(){return 7}, which never exectutes because its been returned");


					console.log("********This does not work as it looks as well...");
					function getMysteryNumberThree(){

						return chooseMysteryNumber();  //this returns error because functions have not yet been defined.

						var chooseMysteryNumber = function(){
							return 12;
						}
						
						var chooseMysteryNumber = function(){
							return 7;
						}
					}
					//console.log(getMysteryNumberThree());  // returns error becuase the its returning before chooseMystery has been declared.

					console.log(
						"first hoists the next var chooseMysteryNumber = undefined \n" + 
						"then hoists the next var chooseMysteryNumber = undefined , the first chooseMystery() is overwritten\n" + 
						"Then returns chooseMysteryNumber() and returns undefined because we havente declared the other functions yet." +
						"never hits function(){return 12} \n" +
						"never hits the function(){return 7");

//Function Capacity Status
					console.log("This does not work, we need to put conditional below the function expresssions")
					function capacityStatus(numPassengers, capacity){

						var noSeats = function(){
							alert("There are no seats available");
							return false;
						}

						var seatsAvail = function(){
							alert("There are some " + (numPassengers - capacity) + " available");
							return true;
						}
					}	

					capacityStatus(60,60);
					console.log(
						"first hoists the next var noSeats = undefined \n" + 
						"then hoists the next var noSeats = undefined \n" + 
						"then we exeute conditional (capacity does == numPassengers\n" + 
						"Then tries to execute noSeats(), but is hasnt been created yet so it returns an error."  +
						"We should move the conditional below the assignements.	");


					console.log("This does work, work with declare functions as well.")
					function capacityStatus(numPassengers, capacity){
						
						noSeats = function(){
							alert("There are no seats available");
							return false;
						}

						seatsAvail = function(){
							alert("There are some " + (numPassengers - capacity) + " available");
							return true;
						}

						if(numPassengers == capacity){
							noSeats();
						}else{
							seatsAvail();
						}
						
					}	

					capacityStatus(20,60);





console.log("----------CLOSURE ENDS---------------");
