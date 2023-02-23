//game sequence
function gameSequence(index){
	if (index === (playerNumber + npcNumber) - 1) { //from the last player to the first player
		index = 0
		updateRound()
	} else { //next player
		index ++
	}

	setTimeout(() => {
		if (!checkPlayerState(index)) { //check player status for jail breaks
			gameSequence(index)
		}
	}, v)

}

function playerMove(index) { //move 1 step
	if (person.position === 29) {
		person.position = -1
		places[0].node.append(players[index].node)
		updateInfo()
		players[index].money += 1000
	}
	person.position ++
	places[person.position].node.append(players[index].node)
}

function game(){ //dice mechanism
	//show dice number
	let num = generateNum(1, 6)
	rollDice(num)
	//relate result to character
	person = players[s]
	let move = setInterval(() => { //moving speed
		playerMove(s)
	}, v)

	setTimeout(() => { //events after reaching destination
		clearInterval(move) //stop moving
		let place = places[person.position]
		//purchse real estatate or other actions
		if (!place.owner) { //no owner
			if(person.control){ //purchase dialog
				showDialog("purchase", person.money > place.value)
			} else { //for AIs and autoplay, if the character has $3000 after purchasing, the character will purchase the real estate
				setTimeout(() => dialogClicked("purchase", (person.money - place.value) > 3000), v / 3)
			}
		} else if (place.owner && place.owner !== person.name && place.owner != "Joshua") { //if there is an owner
			let owner = players.find(player => player.name === place.owner) //find the owner
			if(owner.stop){ //if the owner is not there
				showMsgbox("The owner is not here, so you can stay for free!")
			} else{ //rent
				let state = 5 / (place.state * 3 + 1) // 5 / (1 4 7 10)
				let cost = place.value / (state > .5 ? Math.ceil(state) : state) //calculate rent according to level
				person.money -= cost
				owner.money += cost
				showMsgbox(`Thank you ${person.name} for paying rent of ${cost} at ${place.name}!`)
				checkBankrupt()
			}
			gameSequence(s)
		} else if (place.owner === person.name) { //upgrade real estate
			if (place.state === 3) {
				gameSequence(s)
			} else {
				if(person.control){ //player control
					showDialog("upgrade", person.money > place.value * .5)
				} else { //AI actions
					dialogClicked("upgrade", (person.money - place.value / 2) > 2000) //if the character has $3000 after upgrading, the character will upgrade the real estate
				}
			}
		} else if (place.state === "goodEvent") { // Free Money
			let randomMoney = 500 * generateNum(0, 7)
			person.money += randomMoney
			showMsgbox(`Congratulations, you got $${randomMoney} for free!`)
			gameSequence(s)
		} else if (place.state === "badEvent") { //tax
			let randomMoney = 300 * generateNum(0, 7)
			person.money -= randomMoney
			showMsgbox(`You need to pay a tax of $${randomMoney}.`)
			checkBankrupt()
			gameSequence(s)
		} else if (place.state === "jail") {
			person.stop = generateNum(1, 3)
			showMsgbox(`You are arrested and have to stay in jail for ${person.stop} days.`)
			gameSequence(s)
		} else if (place.state === "casino") {
			let num = generateNum(1, 6)
			rollDice(num)
			setTimeout(() => {
				let casinoMoney = num * 500
				person.money += casinoMoney
				showMsgbox(`Congratulations, you got $${casinoMoney}!`)
				updateInfo()
				gameSequence(s)
			}, v * 2)
			// toggleDice(true)
		} else if (place.state === "surprise") { //chances and fates
			var event = generateNum(0, 31)
			person.money += fates[event].value
			//jail events
			if (fates[event].stop){
				setTimeout(function(){
					person.position = 11
					person.stop = fates[event].stop
					places[11].node.append(person.node)
					checkBankrupt()
					gameSequence(s)
				},v * 1.5)
			} else {
				checkBankrupt()
				gameSequence(s)
			}
			showMsgbox(fates[event].text)
		} else if (place.state === "airport") { //airport events
			let des = place.name === "Airport" ? "England" : "China"
			showMsgbox(`You spent $800 to go to ${des}.`)
			setTimeout(() => {
				person.position = 30 - person.position
				places[person.position].node.append(person.node)
				checkBankrupt()
				gameSequence(s)
			},v * 1.5)
			person.money -= 800
		} else if (place.state === "trip") { //holidays
			person.stop = generateNum(1, 3)
			person.money -= person.stop * 1000
			showMsgbox(`${person.name} spent ${person.stop * 1000} on a holiday for ${person.stop} days.`)
			checkBankrupt()
			gameSequence(s)
		}
		updateInfo()
	},v * (num + 0.9))
}

function dialogClicked(type, action) { //purchase or cancel
	let place = places[person.position]
	if (!action) {
		closeDialog()
		gameSequence(s)
		return
	}
	if (type === "purchase") { //purchase
		place.owner = person.name //owner
		person.money -= place.value //pay
		let color = colorScheme[person.name]
		buyPlace(place.node, color) //show owner
		showMsgbox(`Congratulations ${person.name}, you purchased ${place.name}.`)
		gameSequence(s)
	} else { //upgrade
		let upgradeMap = ["a small house", "a huge mansion", "a tall hotel"]
		person.money -= place.value / 2
		place.state ++
		showMsgbox(`Congratulations ${person.name}, you built ${upgradeMap[place.state - 1]} at ${place.name}.`)
		//animation
		upgradeHouse(place.node, place.state - 1)
	}
	closeDialog()
	updateInfo()
}

function generateNum(min, max) { //generate random number
	return Math.floor(Math.random() * (max - min)) + min
}

//logics
//determine jail status
function checkPlayerState(index) {
    let player = players[index]
	if (player.stop) { //jail status
		if (player.position === 11) {
			showMsgbox(`${player.name} still has ${player.stop} day(s) until freedom.`)
		} else {
			showMsgbox(`${player.name} still has ${player.stop} day(s) of holiday.`)
        }
        player.stop --
		return false
	} else if (player.state === "bankrupt") {
		return false
	} else {
		if (!player.control) { //AI actions
			setTimeout(() => {
				game()
			},v*2)
		} else { //unlock dice for player to control
			toggleDice(true)
        }
        //next player
		s = index
		updatePlayer(player.name)
		return true
	}
}
//winning factors
function checkFinish(){
    let count = 0
    let winner
    players.forEach(player => { //how many players are still in the game
        if (player.state === "active") {
            count ++
            winner = player
        }
    })
    if (count === 1) { //if there is only 1 player left
        setTimeout(() => {
            alert(`${winner.name} won! Congratulations!`)
            location.reload()
        }, v * 2)
    }
}
//bankruptcy
function checkBankrupt() {
    if (person.money < 0) { //current player owns less than $0
        setTimeout(() => {
            person.stop = 0
            person.state = "bankrupt"
            alert(`Sadly, ${person.name} has gone bankrupt. All ${person.name}'s real estates will be confisticated.`)
            updateBankrupt(person.node, players.indexOf(person))
            places.forEach(place => { //confistication
                if (place.owner === person.name) {
					place.owner = ""
					place.node.style.boxShadow = "1px 1px 1px inset #454545, 1px -1px 1px inset #454545, -1px 1px 1px inset #454545, -1px -1px 1px inset #454545"
                }
            })
            checkFinish() //check if the game still runs every time someone becomes bankrupt
        }, v / 2)
    }
}
