/*
Strings
https://developer.mozilla.org/en-US/

*/
console.log("-----------------STRINGS-------------------");
var test = "He said, \"That's just fine\", at the end of the day.";
console.log(test);

var start = 10;
var end = 16;
var length = 6;
var phrase = "this is a simple phrase."
var phrase_two = "This is a simple Phrase."
var str1 = "aardvark";
var str2 = "beluga";
var str3 = "Beluga";

console.log(phrase.split("ph"));	
//["this is a simple ", "rase."]
console.log(phrase.indexOf("simple"));
//10
console.log(phrase.slice(10, 16));
//simple
console.log(phrase == phrase_two);
//false
console.log(phrase.toLowerCase == phrase_two.toLowerCase);
//true
console.log(phrase.toUpperCase == phrase_two.toUpperCase);
//true
console.log(phrase.substring(start, end));
//simple
console.log(phrase.substr(start, length));
//simple
console.log(str1 < str2);	
//true
console.log(str1 < str3);	
//false!, because of sort order all Caps values are less than lower case


console.log("-----------------STRINGS END-------------------");