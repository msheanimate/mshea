//FORMS
console.log("----------FORMS---------------")
//THERE IS REFERENCE IN EVENTLISTENERS:
//see prepare preparePage() and document.getElementById("frmContact").onsubmit = function(){... in prepareEventHandler in the eventListners page.


//retrievin forms elements
var test = document.forms.frmContact.name; //retrives the form data
var test = document.forms.frmContact.attributes;
//var test = document.forms.frmContact.attributes.name;
//var test = document.forms.frmContact.attributes.id;
console.log(test);

//FORM EVENTS (same thing is in Event Handlers)
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

//example of getting "name" value
var myElem = document.getElementById("name");
console.log("----------FORMS END  ---------------")
