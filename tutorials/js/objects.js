/*Objects
https://developer.mozilla.org/en-US/
*/

var playName = "Matt";
var playerScore = "123"; 
var playerRank = "1"; 

var player = new Object();
player.name = "Matt";
player.score = "234";
player.rank = "1";

var player1 = { name: "Matt", score: "345", rank: 1 };
var player2 = { name: "Fred", score: "678", rank: 1 };

console.log(player1.name);

function playerDetails(){
	//this should show details about the player
	console.log(this.name + "has a rank of : " + this.rank + "and a score of " + this.score);
}

player1.logDetails = playerDetails;	//you need refence the playerDetails function with a player1 function, logDetails is now a function of player1 that references player D
player2.logDetails = playerDetails;


player1.logDetails();
player1.logDetails();