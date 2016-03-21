//FUNCTIONS
console.log("----------FUNCTIONS---------------")
//Contents________________________________

//1.0 - 1.3 - Function Inovcation patters
//2 - Arguments (Augment Array to get all unique, and Number to return all Integers)
//3 - Return
//4 - Exceptions (Throw and try -  catch)
//5 - Augmenting Types
//6 - Recursion (Tower of Hanoi, walk the dom, factorial (with tail recursion))
//7 - Scope
//8 - Closure
//9 - Callbacks
//10 - Module
//11 - Cascase
//12 - Curry
//13 = Memoization
//14
//__________________________________________



//function literal
var add = function(a, b){
	console.log(this.Backbone);
	return a + b;

};

console.log(add(1,2));

//1.0________________________________
//Method of Invocation Pattern -
//________________________________
	//When a function is stored as a property of an object, we all it a method.  When a method is 
	//invoked this is bound to that object.  If an invocation expression contains a refinement (a "." expression or also called a subscript)
	//it is invoked as a method.

	//A method can use this to access the object so that it can retrive values form the object
	//or modify the object (see below).  the binding of this happens at invocation time, this makes
	//functions using this highly reusable.  

							var myObject = {
								value: 0,
								//increase by inc
								increment: function(inc){
									this.value += typeof inc === 'number' ? inc : 1;
								},
								//decrecrease by one
								decrement: function(inc){
									this.value -= typeof inc === 'number' ? inc : 1;
								}
							};
							console.log(myObject);
							myObject.increment();
							myObject.increment(3);
							console.log(myObject.value);
							myObject.decrement();
							console.log(myObject.value);


//1.1________________________________
//Function Invocation Pattern -
//________________________________
	//When a function is not the property of an object.  "this" is bound to the global
	//object.  this was a mistake.  There for the innverfunciton does not employ changes to the 
	//outerfunction.

	//There is workaround: if a method defines a variable and assigns "this" to it the inner function will have 
	//access to this variable by naming the variable "that".

							//Augment the object with a double method
							myObject.double = function() {
								var that = this;	//workaround.
								console.log(this);
								console.log(that);

								var helper = function() {
									console.log(this);	//you'll see this is a global object, Window
									that.value = add(that.value, that.value);
								}

								helper(); //invoke helper as a function
							};


							myObject.double();	//invoke double as a method.
							console.log(myObject.value);

//1.2________________________________
//Constructor Invocation Pattern
//________________________________
	//Javascript is a prototypcal inheritance language.  that means objects can inherit
	//properties directly from other objects.  the language is class free.
	//Javascript is not confident in its prototypical nauture, so it offers some object
	//syntax that looks similar too OOP languages.  JS uses the keyword "new".

	//make sure use capializaiton on constructor functions.  And also if you dont use the
	//word new compile-time and run-time will not show errors and this can cause headaches.

							//Creata a constructor function named Quo.
							//It makes an object with a status property

							var Quo = function(string) {
								console.log(this)
								this.status = string;
							};

							//Give all the instances of Quo a public method
							//called get status.
							Quo.prototype.get_status = function() {
								return this.status;
							}

							var myQuo = new Quo("consfused");
							console.log(myQuo);
							console.log(myQuo.get_status);
	

//1.3________________________________
//Apply Invocation Pattern
//________________________________

	//Because JS is a function OO language, it is possible to have functions within functions.
	//The apply method lets us construct an array of arguments to use to invoke a function.
	//it also lets us use the value of this.  The Apply method take two parameters, the first is
	//bound to "this" and the second is and array of parameters.

							var array = [3,4];
							var sum = add.apply(null, array);
							console.log(sum)


							//Make an object with a status
							var statusObject = {
								status: 'A-OK'
							};

							//statusObject does not inherit from Quo.prototype,
							//but we can invoke the get_status method on
							//statusObject even though statusObject does not 
							//have a get_status method.

							var status = Quo.prototype.get_status.apply(statusObject);
							console.log(status);
	
//2 ________________________________
//Arguments
//________________________________


	//when a function is invoked the arguements are thrown in an arguments array which
	//gives us access to all arguments that were suppliece on invcatio, includeing excess
	//parameters that were not assigned to parameters.  this allows us to make an unlimitted
	//number of parameters.

							//Make a function that adds a lot of stuff.
							var sum = function(){
								var i, sum = 0;
								for(i = 0; i< arguments.length; i += 1){
									sum += arguments[i];
								}
								return sum;
							};

							console.log(sum(4,8,15,16,23,42));

							//ARGUMENTS is really not an arrray, its an array object,
							//it has length but lacks all the array methods.

//3 ________________________________
//Return
//________________________________

	//Function always a value, if not defined it returns undefined.  If funtion is invoked iwth
	//the "new" keyword, then it returns the value of "this".


//4 ________________________________
//Exceptions (Throw and try -  catch)
//________________________________
	//Exceptions are unusual mishapps that interfere with normal flow of the program.
	// the throw should always have a name and message property.  The exception will be delivered
	//to the catch clause of a try statement.

							var add = function(a, b){
								if(typeof a !== 'number' || typeof b !== 'number'){
									throw{
										name: 'TypeError',
										message: 'add needs numbers'
									}
								}
								return a+b;
							};

							

							var try_it = function(){
								try{
									console.log(add(3,4));
									console.log(add('r',4));
								}catch(e){
									console.log(e.name + ": " + e.message)
								}
							}

							try_it();
//5 ________________________________
//Augmenting Types
//________________________________
	//JS allows for basic types of the language to be augmented.
	//For example by augmenting Function.prototype we can make a function available to all functions.
	//
							Function.prototype.method = function(name, func){
								//if function doesnt exist, then add it.
								if(!this.prototype[name]){
									this.prototype[name] = func;
									return this;
								}
							};

							//Sometimes its necessary to extract just the integer part of a number and JS does 
							//not have a separate integer type.  We can fix it by adding an integer method to 
							//Number.prototype.
							//Extract only the integer
							Number.method('integer', function(){
								return Math[this < 0 ? 'ceil' : 'floor'](this);
							});

							console.log((22/3).integer ( ));

							Array.prototype.getUnique = function(){
							   var u = {}, a = [];
							   for(var i = 0, l = this.length; i < l; ++i){
							      if(u.hasOwnProperty(this[i])) {
							         continue;
							      }
							      //below turns it into a string.
							     // this[i] = this[i].toString();
							      a.push(this[i]);
							      u[this[i]] = 1;
							   }
							   return;
							}


							//JS does not have a function to remove spaces at the end of 
							//strings
							//Remove spaces at end of string

							String.method('trim', function(){
								return this.replace(/^\s+|\s+$/g, '');
							});

							console.log('"' + "  neaty   ".trim() +'"')

console.log("----------FUNCTIONS END---------------")
console.log("----------RECURSION---------------");
//6 ________________________________
//Recursion
//________________________________
	// A function called over and over is called a recursive function.  Recursion is used to solve
	//sub-problems.
					//Tower of Hanoi
							var hanoi = function(disc, src, aux, dst){
								if( disc > 0 ) {
									hanoi(disc - 1, src, dst, aux);
									console.log('Move disd ' + disc + ' from ' + src + ' to ' + dst );
									hanoi(disc -1, aux, src, dst); 
								}
							}

							hanoi(3, 'Src', 'Aux', 'Dst');

							//Recursion can be very effective in manipulating the DOM.
						
					//Walk the DOM
							var walkTheDOM = function walk(node, func) {
							    func(node);
							    node = node.firstChild;
							    while (node) {
							        walk(node, func);
							        node = node.nextSibling;
							    }
							}

							// Example usage: Process all Text nodes on the page
						var getElementsByAttribute = function (att, value){
							var results = [];
							walkTheDOM(document.body, function (node) {
								console.log();
								var actual = node.nodeName.toString()
		
								if((typeof actual === 'string')&&(node.nodeType === 1)) {
									results.push(node);
								}	
							
							});
							//get all unique results.
							results = results.getUnique();
							
							console.log(results);
							return results;
						}

						getElementsByAttribute('body', 'body');
		//Tail recursion -  if a function returns the result of invoking itself recursively, then the invocation is
		//replaced by a loop, which can speed things up tremendously. 
 					
 					//Factorial
							var factorial = function factorial(i,a){
								a = a || 1;
								if(i<2){
									return a;
								}
								return factorial( i - 1, a * i);
							}


							console.log(factorial(4));

console.log("----------RECURSION ENDS---------------");

console.log("----------SCOPE ---------------");
//7 ____________________________________________
//SCOPE
//______________________________________________
	//Controls the visibility and lifetime of variables
	//in most languages anyting defined with in a block (inside curly braces) are not
	//visible from the outside of the block. the variables inside the block are released
	//when the execution of the block is finished.  
	//Unfortunately JS does not have block scope.  JS has function scope, that means variables and pareameters
	//defined within a function are not visible outside the function and a variable defined anywhere within a
	//function is visible everywhere within the function.

							var foo = function(num){
								var a = 3, b = 5;
								console.log(this);
								this.bar = function(){
									console.log("===========")
									console.log(this);

									b = 7, c = 11;
									//at this point a =3 , b =7 , c =11
									a += b + c;
									console.log(a);
									console.log(b);
									console.log(c);
									//now a = 21 , b = 7, c = 11
								};
									
									console.log(a);
									console.log(b);
									//console.log(c);
								//a = 3, b = 5, c = undefined
							};

							var init = function(){
								var fCall = new foo(5);
								fCall.bar();
							};

							init();

console.log("----------SCOPE ENDS---------------");
console.log("----------CLOSURE---------------");
//
//
console.log("CLOSURES GOT PRETTY BIG SO I PUT IT IN ANOTHER FILE CALLED closures.js")






