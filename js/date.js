/*
Date
https://developer.mozilla.org/en-US/
*/

var today = new Date();
console.log(today);		//Mon Nov 09 2015 13:17:45 GMT-0600 (CST)

/*year, month, day*/
var birthday = new Date(1978, 8, 06);
console.log(birthday);

/*year, month, day, hours, min, sec */
var y2k = new Date(2000, 0, 1, 0, 0, 0);
console.log(y2k);

// Date methods
console.log(today.getMonth());		//0 based with the month so returns :  	   10
console.log(today.getDate());		//returns the number day of the month: 		9
console.log(today.getFullYear());	//returns : 						 	 2015
console.log(today.getYear());		//deprecated, dont use it anymore. 
console.log(today.getDay());		//returns the day of the week (sunday is 0): 1 
console.log(today.getHours());		// 0 - 23
console.log(today.getTime());		// in milliseconds since 1/1/1970
console.log(today.setMonth(5));		//returns  milliseconds
console.log(today.setYear(2012));	
console.log(today.setDay(1));
console.log(today);					//Sat Jun 01 2012 13:38:39 GMT-0500 (CDT)

var date1 = new Date(2000, 0, 1);
var date2 = new Date(2000, 0, 1);

console.log(date1 == date2); 		//false! because they are two different objects
console.log(date1.getTime() == date2.getTime()); 		//true

