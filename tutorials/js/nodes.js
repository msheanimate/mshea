//NODE SELECT
var element_id = document.getElementById("site");	//reference to an element or object	
var element_class = document.getElementsByClassName("site"); 	//returns and HTML collection
var tag = document.getElementsByTagName("li");
var nav = document.getElementById("navigation");

console.log(element_id.firstElementChild);
console.log(element_class);
console.log(tag);
console.log(nav);

//create and inject a Doc Frag
var ul = document.getElementsByTagName("ul")[0]; // assuming it exists
var docfrag = document.createDocumentFragment();

//create a navigation list
var navList = ["Internet Explorer", "Mozilla Firefox", "Safari", "Chrome", "Opera"];

navList.forEach(function(e) {
  var li = document.createElement("li");
  li.textContent = e;
  docfrag.appendChild(li);
});

ul.appendChild(docfrag);

var ul = document.getElementsByTagName('ul')[0];
var list = ['one', 'two', 'three'];
var docFrag = document.createDocumentFragment();

list.forEach(function(e){
	var li = document.createElement('li');
	li.textContent = e;
	docFrag.appendChild(li);
})
console.log(docFrag);
//ul.appendChild(docFrag);