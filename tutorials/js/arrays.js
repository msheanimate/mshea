//Arrays

console.log("---------------------------Arrays------------------------");
var parkRides = [["Birch Bumpers", 40],["Pines Plunge", 55],["Cedar Coaster", 20],["Ferris Wheels of Firs", 90]];
 
var fastPassQueue = ["Cedar Coster", "Pines Plunge", "Birch Bumpers", "Pines Plunge"];

fastPassQueue.push("Pines Plunge");  //adds at the end of the array.
//fastPassQueue = ["Cedar Coster", "Pines Plunge", "Birch Bumpers", "Pines Plunge", "Pines Plunge"];
console.log(fastPassQueue);
var firstFastPass = fastPassQueue.shift();		//chops off the first element and returns it.  We can also save this into a var.
console.log(firstFastPass) //"Cedar Coaster"
console.log(fastPassQueue.length); 	//length of fastPassQueue is now 3
console.log("---------------------------Arrays End--------------------");