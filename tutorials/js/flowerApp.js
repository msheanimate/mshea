var xmlhttp = new XMLHttpRequest();
var url = "info.json";
var info = {}
//Get JSON
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        init(myArr);
    }
}

xmlhttp.open("GET", url, true);
xmlhttp.send();

function init(arr) {

    info.data = arr;

	var redRoses = new app.singleFlower({
		name: info.data.flowers.red_roses.name,
		price: info.data.flowers.red_roses.price,
		color: info.data.flowers.red_roses.color,
		img: info.data.flowers.red_roses.img,
		link: info.data.flowers.red_roses.link
	});

	var rainbowRoses = new app.singleFlower({
		name: info.data.flowers.rainbow_roses.name,
		price: info.data.flowers.rainbow_roses.price,
		color: info.data.flowers.rainbow_roses.color,
		link: info.data.flowers.rainbow_roses.link
	});

	var heirloomRoses = new app.singleFlower({
		name: info.data.flowers.hierloom_roses.name,
		price: info.data.flowers.hierloom_roses.price,
		img: info.data.flowers.hierloom_roses.img,
		link: info.data.flowers.hierloom_roses.link
	});

	rainbowRoses.set('price', 20);

	var flowerGroup = new app.FlowersCollection([
	  redRoses, rainbowRoses
	]);


	flowerGroup.add(heirloomRoses);
	flowerGroup.remove(redRoses);
	
	console.log(flowerGroup.toJSON());


function person(firstName, lastName, age, eyeColor) {
    this.firstName = firstName;  
    this.lastName = lastName;
    this.age = age;
    this.eyeColor = eyeColor;
    this.changeName = function (name) {
        this.lastName = name;
    }
}

	//console.log(heirloomRoses.toJSON());
	//console.log(rainbowRoses.toJSON());
	//console.log(redRoses.toJSON());
}



