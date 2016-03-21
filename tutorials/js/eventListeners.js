"use strict";
console.log("-----------------------Event Listeners (strict mode)-----------------------");
//onload, onclick, onblur, onmouseover, onfocus
var element = document.getElementById("site");
var tag = document.getElementsByTagName("li");
nav = document.getElementById("navigation");
var checkbox = document.getElementById("expandList");
var email = document.getElementById("email");



function prepareEventHandlers(){	
	//enter event handlers here.
	//events: onfocus:(when inside element, onblur:(when you leave element), onchange:(when element changes), onkeypress (press key down and leave it), onkeyup, onkeydown
	document.getElementById("frmContact").onsubmit = function(){
		if(document.getElementById("email").value == ""){
			document.getElementById("errorMessage").innerHTML = "you do not have an email address submitted"
			return false;
		}else{
			document.getElementById("errorMessage").innerHTML = ""
			return true;
		}
		
	}
	nav.onmouseover = function(e){
		console.log(e.type);
	}
	nav.onclick = function(e){
		if(e.target && e.target.nodeName == "LI") {
		// List item found!  Output the ID!
		console.log(e.type);
		console.log("List item", e.target.innerHTML, "was clicked!");
		}
	};
	checkbox.onchange = function(e){
		console.log(e.type);
	};
	email.onfocus = function(e){
		if(email.value == "your email"){
			email.value = "";
		}
	};
	email.onblur = function(e){
		if(email.value == ""){
			email.value = "your email";
		}
	};

	//expand and compress list on checkbox click
	document.getElementById("expandList").onclick = function(){
		if(document.getElementById("expandList").checked){
			document.getElementById("selection").style.display = "block";
		}else{
			document.getElementById("selection").style.display = "none";
		}
	}
	document.getElementById("selection").style.display = "none";
}


//Start Gallery----------------------------------
function imageGallery(){
	var myImage = document.getElementById('mainImage');
	var imgArray = ["images/img.jpg", "images/img2.jpg", "images/img3.jpg"];
	var imgIndex = 0;

	function changeImage(){
		myImage.setAttribute('src', imgArray[imgIndex]);
		imgIndex++;
		//console.log(imgArray);
		if(imgIndex >= imgArray.length){
			imgIndex = 0;
		}
	}
	var intervalHandler = setInterval(changeImage, 1000);
	//stop GALLERY
	myImage.onclick = function(){
		clearInterval(intervalHandler);
	}
}

function simpleMessage(){
	alert("This is just and alert box");
}

function pageTimer(){
	//setTimeout only happens once
	setTimeout(simpleMessage, 1000);
}

//End Gallery--------------------------------
//Start Enhanced Form------------------------

window.onload = function(){
	console.log("page is loaded");
	prepareEventHandlers();
	//pageTimer();
	imageGallery();	
}

//FORM EVENTS
//textfield : 
// 	PROPERTY: value (can set it or get it)
//	EVENT:onfocus:(when inside element, 
//	EVENT:onblur:(when you leave element), 
//	EVENT:onchange:(when element changes), 
//	EVENT:onkeypress (press key down and leave it),
//	EVENT:onkeyup,
//	EVENT:onkeydown

//checkbox field events:
	// PROPERTY: mychekc.checked (T or F)
	// EVENT: onchange() and onclick()

//select drop down field:
	//PROPERTY: myselect.type (select-one or select-multiple),
	//		  : myselect.selectedIndex ( only for select one - returns numb index that is selected in the list)
	//		  : myselect.options[x].selected ( drill down the list and returns true for the items selected.)
	//EVENT: onchange()  event triggered when item is selected
//fomr
	//EVENT: myform.onsubmit(): returs false if not submit




//Examples:

/*
myelement.onblur = function(){
	console.log("Yea");
};
*/	
//nav.addEventListener('click', 'myFunction', false);	//IE8 and before does not have this function, need to use attachEvent.
//document.attachEvent('click', 'myFunction'); 				//only use in IE8 and before.
/*
var myFunction = function(){
	console.log("test");
}


//Cross bfrowser Event listner for IE and everything else
function addCrossBrowserEventListener(elementName, eventName){
	//does the event listener function exist?
	if(elementName.addEventListener){
		//yes, use it
		console.log("yes");
		elementName.addEventListener( eventName, function(e) {
			// e.target is the clicked element
		});
		return true;
	}else{
		//use attachEvent
		return true;
	}
}

if(e.target && e.target.nodeName == "LI") {
// List item found!  Output the ID!
console.log("List item", e.target.innerHTML, "was clicked!");
}
*/

console.log("-----------------------Event Listeners-----------------------")



