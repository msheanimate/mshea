/*
DOM
https://developer.mozilla.org/en-US/
*/

// Exmaple of an element node*: ul, li, a, div 
// Example of an attribute node: id="bla" class="bla" 
// Example of text node: This is.... 


//Accessing Elements
var element = document.getElementById("site");
var tag = document.getElementsByTagName("li");
var nav = document.getElementById("navigation");
console.log("This is of \"nodeType\" : " + element.nodeType);		//returns 1 = attribute node, 2= element node, 3= text node
console.log("the \"innerHtml\" is " + element.innerHTML);
console.log("child nodes are " + element.childNodes.length);
console.log("This is tge length of getElementByTagName : " + tag.length);
console.log("tag is of nodeType : " + tag.nodeType);	//undefined, nodeType is a method of getElementBy Id
console.log("element classList : " + element.classList);

//Changin elements
console.log("-----------------------DOM-----------------------");
console.log(element.getAttribute("id"));			//return id of element 				: site
console.log(element.getAttribute("class"));			//return class of element 			: site
element.setAttribute("id", "test");					//sets the id to test
console.log(element.getAttribute("id"));			//return ID of element 				: test
element.setAttribute("data-attribute", "test");		//sets data-attribute to 			: test
console.log(element.getAttribute("data-attribute"));//return data-attribute value  		: test
//Chaning the text in side an element
var nav = document.getElementById("navigation"); 	
var nav_item = nav.getElementsByTagName("li"); //select the tag
console.log(nav_item);  //all li are in an array
//nav_item[0].innerHTML = "ADDED";		//select the precise tag (first li element) and change the value
console.log("the \"innerHtml\" is " + element.innerHTML); // you can see the first element 

//Creating Elements
var newElement = document.createElement("li");		//create a new element
nav.appendChild(newElement);		//append the newElement to the original selector nav
var textElement = document.createTextNode("new element")	//create text element
newElement.appendChild(textElement);	//append the text element
console.log("the \"innerHtml\" is " + element.innerHTML); // you can see the first element 

//Add header (H1) before nav
var newdiv = document.createElement("H1");
newdiv.appendChild(document.createTextNode("logo here"));
var parent = element.parentNode;
parent.insertBefore(newdiv, element);

var eleme = document.getElementById("test");
var newdiv = document.createElement("H2");
newdiv.appendChild(document.createTextNode("This is the header"));
var child = nav.childNodes;	
console.log(newdiv);


var select = document.getElementById("personalInfo");
console.log(select.getElementsByTagName("legend")[0].childNodes[0].nodeType);

console.log("-----------------------DOM END-----------------------");













