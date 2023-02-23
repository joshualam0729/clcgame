var s = 0 //sequence
var playerNumber = 0 //number of players
var npcNumber = 0 //number of AIs
var startMoney = 0 //initial assets
var v = 500 //initial speed
var person //initialize current player
var colorScheme = { //colour scheme for each character
	"Pink": "#FF93C5",
	"Red": "#FF2200",
	"Orange": "#F8830F",
	"Blue": "#0F05F6",
	"Purple": "#E719FE",
	"Green": "#14C401",
	"Yellow": "#FDEE34"

function chooseNumber(num) { //settings
	if (!startMoney) { //choose initial assets
		writeSetting("Number of Players", 1)
		startMoney = num * 5000 + 10000
	} else if (!playerNumber) { //choose number of players
		writeSetting("Number of AIs", 0, num)
		playerNumber = +num + 1
	} else { //choose number of AIs
		npcNumber = +num
		finishChooseNumber()
	}
}
function binding(node, name){ //choose character
	let control = players.length < playerNumber ? 1 : 0 //players: autoplay or not
	new CreatePlayer(name, players.length, startMoney, "active", 0, control, node) //create character
	if (players.length == (playerNumber + npcNumber)) { //start game
		gameStart()
	}
}
