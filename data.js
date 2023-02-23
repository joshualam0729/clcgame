//define character
var players = []
function CreatePlayer(name, index, money, state, stop, control, node) { //create character
	this.name = name //name
	this.index = index //sequence
	this.money = money //asset
	this.state = state //status: in game or bankrupt
	this.stop = stop //days remaining in jail
	this.control = control //player control: on or off
	this.node = node //corresponding chess
	this.position = 0 //current position on map
	players.push(this)
}
 //chess box info
var places = []
function CreateBox(name, value, state, owner, index) { //create box
	this.name = name //name
	this.value = value //price
	this.state = state //state: special events or upgraded levels
	this.owner = owner //owner: players or events
	this.node = document.querySelectorAll('.map>div')[index] //random index to line up chess boxes in clockwise order
	this.node.firstElementChild.append(name) //insert name into chess box
	places.push(this)
}

new CreateBox("Starting Point", 2000, "goodEvent", "Joshua", 18)
new CreateBox("China", 5000, 0, "", 19)
new CreateBox("Vietnam", 1000, 0, "", 20)
new CreateBox("Korea", 1300, 0, "", 21)
new CreateBox("Chance", 1000, "surprise", "Joshua", 22)
new CreateBox("Japan", 3000, 0, "", 23)
new CreateBox("Russia", 4000, 0, "", 24)
new CreateBox("Airport", 1000, "airport", "Joshua", 25)
new CreateBox("Property Tax", 1000, "badEvent", "Joshua", 26)
new CreateBox("Fate", 1000, "surprise", "Joshua", 27)
new CreateBox("Egypt", 1600, 0, "", 28)
new CreateBox("Jail", 0, "jail", "Joshua", 29)
new CreateBox("Australia", 2400, 0, "", 17)
new CreateBox("New Zealand", 1800, 0, "", 15)
new CreateBox("South Pole", 20000, 0, "", 13)
new CreateBox("Casino", 1000, "casino", "Joshua", 11)
new CreateBox("Chance", 1000, "surprise", "Joshua", 10)
new CreateBox("Free Money", 1000, "goodEvent", "Joshua", 9)
new CreateBox("Brazil", 2000, 0, "", 8)
new CreateBox("Argentina", 2200, 0, "", 7)
new CreateBox("Mexico", 2400, 0, "", 6)
new CreateBox("America", 4500, 0, "", 5)
new CreateBox("Italy", 3000, 0, "", 4)
new CreateBox("Airport", 1000, "airport", "Joshua", 3)
new CreateBox("England", 3600, 0, "", 2)
new CreateBox("Fate", 1000, "surprise", "Joshua", 1)
new CreateBox("The Alps", 1000, "trip", "Joshua", 0)
new CreateBox("Germany", 3400, 0, "", 12)
new CreateBox("France", 3200, 0, "", 14)
new CreateBox("Spain", 2800, 0, "", 16)

//chances and fates
var fates = []
function CreateFate(text, value, stop) { //create chances and fates
	this.text = text //description text
	this.value = value //value flucuation
	this.stop = stop //day(s) in jail
	fates.push(this)
}

new CreateFate("Helped someone, got $1000 in return", 1000, 0)
new CreateFate("Won the jackpot of $5000", 5000, 0)
new CreateFate("Got robbed $3000", -3000, 0)
new CreateFate("Spent $30 on a mango smoothie", -30, 0)
new CreateFate("Found $500 on the floor", 500, 0)
new CreateFate("Got hurt, spent $800 at the hospital", -800, 0)
new CreateFate("Lost $1000 on the taxi", -1000, 0)
new CreateFate("Got a job, earned $2000", 2000, 0)
new CreateFate("Fell off the stairs, spent $100 on bandages", -100, 0)
new CreateFate("Bought a new phone for $1300", -1300, 0)
new CreateFate("Spent $500 on hotpot", -500, 0)
new CreateFate("Spent $2000 in Japan", -2000, 0)
new CreateFate("Mysteriously lost $800", -800, 0)
new CreateFate("Mysteriously gained $1000", 1000, 0)
new CreateFate("Got $1000 from grandma", 1000, 0)
new CreateFate("Got $1000 from dad", 100, 0)
new CreateFate("Got a $3000 scholarship", 3000, 0)
new CreateFate("Found $1 in the washing machine", 1, 0)
new CreateFate("Donated $50 to charity", -50, 0)
new CreateFate("Earned $2500 at work", 2500, 0)
new CreateFate("Earned $100 through selling old clothes", 100, 0)
new CreateFate("Nothing happened", 0, 0)
new CreateFate("Spent $100 at the movies", -100, 0)
new CreateFate("Paid off debt of $999", -999, 0)
new CreateFate("Spent $2000 during Christmas", -2000, 0)
new CreateFate("Dropped $5 on the streets", -5, 0)
new CreateFate("Got $500 from mom", 500, 0)
new CreateFate("Caught stealing. Fined $1000 and put in jail for 1 day", -1000, 1)
new CreateFate("Caught speeding. Fined $2000 and put in jail for 2 days", -2000, 2)
new CreateFate("Caught cheating on girlfriend. Fined $1000 and put in jail for 3 days", -1000, 3)
new CreateFate("Caught not paying back debt on time. Put in jail for 5 days", 0, 5)
