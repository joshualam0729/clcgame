//quick variables
var map = document.querySelector('.map')
var dice = document.querySelector(".dice")
var choosebox = document.querySelector(".choosebox")
var choosechr = document.querySelector(".choosechr")
var title = document.querySelector(".title")
var info = document.querySelector('.info')
var dialog = document.querySelector(".dialog")
var infobox = document.querySelector(".infobox")
var msgbox = document.querySelector(".msgbox")

//upgrade animation
function construct() {
    let construct = document.createElement('div')
    construct.className = 'construct'
    for (let i = 0; i < 5; i++) {
        const img = document.createElement('img')
        img.src = `img/c${i + 1}.png`
        construct.append(img)
    }
    return construct
}

//create upgraded estates
function buidings(index) {
	let img = document.createElement('img')
	img.src = `img/l${index + 1}.png`
	img.className = 'house'
	return img
}

//add houses to map
for (let i = 0; i < 30; i++) {
    let box = document.createElement('div')
    let h3 = document.createElement('h3')
    box.className = 'box'
    box.append(h3)
    map.prepend(box)
}

//Yes choices
Array.from(document.querySelectorAll('.choosebox li')).forEach((node, index) => {
    node.addEventListener('click', () => {
        chooseNumber(index)
    })
})

//animation when changing choices
function writeSetting(title, startNum, num) {
    choosebox.firstElementChild.innerHTML = title
    Array.from(choosebox.lastElementChild.children).forEach((node, index) => {
        node.innerHTML = startNum + index
        switch (num) {
            case 3:
                finishChooseNumber()
                break
            case 2:
                if (index > 1) {
                    disableBox(node)
                }
                break
            case 1:
                if (index > 2) {
                    disableBox(node)
                }
                break
            case 0:
                if (index < 1) {
                    disableBox(node)
                }
                break
        }
    })
}

 //mechanism to keep player number within 4
function disableBox(node) {
	node.style.pointerEvents = "none"
	node.style.background = "grey"
}

//end player number choice -> open character choice -> write on map
function finishChooseNumber() {
	choosebox.style.display = "none"
    choosechr.style.display = "block"
}

//arrow
let arrow = document.createElement('div')
arrow.className = 'arrow'
let img = document.createElement('img')
img.src = "img/arrow.png"
arrow.append(img)

//choose characters
Array.from(choosechr.lastElementChild.children).forEach(item => {
	item.firstElementChild.addEventListener('mouseover', function(){ //arrow
		item.appendChild(arrow)
	})
    item.firstElementChild.addEventListener('click', () => { //Yes choice
         //effects
        item.firstElementChild.style.border = "1px solid #666"
        let index = document.createElement('div')
        index.innerHTML = `${players.length + 1}`
        index.className = 'index'
        item.appendChild(index)
        item.removeChild(arrow)
        item.style.pointerEvents = "none"
        //create character chess
        let name = item.children[1].innerHTML
        let node = document.createElement('img')
        node.className = 'chr'
        node.src = `img/${name}.png`
        places[0].node.append(node)
        //character logics
		binding(node, name)
	})
})

//start game
function gameStart() {
	choosechr.parentElement.style.display = "none"
	title.style.visibility = "visible"
	updatePlayer(players[s].name)
    writeInfo()
    placeInfo()
    person = players[0]
}

//dice area
dice.addEventListener("click", () => {
    game()
})

function rollDice(num) { //throw dice
	let bg = generateNum(1, 2)
	dice.style.background = `url(img/s${bg}.jpg)`
	setTimeout(function(){
		dice.style.background = `url(img/${num}.jpg)`
	}, 300)
	toggleDice(false)
}

function toggleDice(state) {
    if (state) {
        dice.style.pointerEvents = "auto"
    } else {
        dice.style.pointerEvents = "none"
    }
}

//current player info
function updatePlayer(name) {
    title.innerHTML = name
    title.style.background = colorScheme[name]
}

//current days
function updateRound() {
    let num = +document.querySelector('.big-box span b').innerHTML + 1
    document.querySelector('.big-box span b').innerHTML = num
}

//player info
function writeInfo() {
	let num = playerNumber + npcNumber
	for (let i = 0; i < num; i++) {
        let node = document.createElement('div')
        let h2 = document.createElement('h2')
        let h3 = document.createElement('h3')
        h3.innerHTML = `$${players[i].money}`
        h2.innerHTML = players[i].name
        h2.style.background = colorScheme[players[i].name]
        node.append(h3)
        node.append(h2)
        info.append(node)
	}
}

//assets
function updateInfo() {
    let num = playerNumber + npcNumber
    for (let i = 0; i < num; i++) {
        info.children[i].firstElementChild.innerHTML = "$" + players[i].money
    }
}

//remove characters when bankrupt
function updateBankrupt(node, index) {
    info.children[index].firstElementChild.style.display = "none"
    info.children[index].append(node)
}

//estate ownership
function buyPlace(node, color) {
    node.style.boxShadow = `3px 3px 3px inset ${color},3px -3px 3px inset ${color},-3px 3px 3px inset ${color}, -3px -3px 3px inset ${color}`
}

//upgrading animiations
function upgradeHouse(node, state) {
    let upgrade = construct()
    node.prepend(upgrade)
    setTimeout(() => {
        node.removeChild(upgrade)
        node.append(buidings(state))
        gameSequence(s)
    }, 2000)
}

//real estate info
function placeInfo() {
    places.forEach(place => {
        place.node.addEventListener('mouseover', () => {
            if (place.state >= 0) {
                infobox.style.display = "block"
                infobox.firstElementChild.innerHTML = place.name
                infobox.lastElementChild.children[0].innerHTML = `Owner: ${place.owner}`
                infobox.lastElementChild.children[1].innerHTML = `Price: ${place.value}`
                if (place.owner) {
                    let state = 5 / (place.state * 3 + 1)
                    let cost = place.value / (state > .5 ? Math.ceil(state) : state)
                    infobox.lastElementChild.children[2].innerHTML = `Rent: ${cost}`
                } else {
                    infobox.lastElementChild.children[2].innerHTML = ""
                }
            } else {
                return
            }
        })
        place.node.addEventListener('mouseout', () => {
            infobox.style.display = "none"
        })
    })
}

//show message box
function showMsgbox(msg){
	msgbox.style.display = "block"
	msgbox.innerHTML = msg
	setTimeout(() => {
		msgbox.style.display = "none"
	},v * 1.6)
}

//show purchase dialog
function showDialog(type, allowButton) {
	dialog.style.display = 'block'
	let title, msg
	let {name, value, state} = places[person.position]
	if (type === "purchase") {
		title = "Purchase Real Estate"
		msg = `Do you want to spend $${value * (state + 1)} to purchase ${name}?`
	} else {
		title = "Upgrade Real Estate"
		msg = `Do you want to spend $${value / 2} to upgrade ${name}?`
	}
	dialog.children[1].innerHTML = title
	dialog.firstElementChild.innerHTML = msg
	if (allowButton) {
		dialog.children[2].style.pointerEvents = "auto"
		dialog.children[2].style.background = "#f2f2f2"
	} else {
		dialog.children[2].style.pointerEvents = "none"
		dialog.children[2].style.background = "#454545"
    }
    dialog.children[2].onclick = () => { //Yes button
        dialogClicked(type , true)
    }
}
dialog.children[3].addEventListener('click', () => { //cancel button
	dialogClicked("", false)
})

//close dialog
function closeDialog() {
    dialog.style.display = "none"
}

//settings
document.querySelectorAll('.big-box button')[0].addEventListener('click', function() { //open menu
    if (this.innerHTML === "Info") {
        this.innerHTML = "Back"
        document.querySelector('.instruction').style.height = "100%"
    } else {
        this.innerHTML = "Info"
        document.querySelector('.instruction').style.height = "0"
    }
})
document.querySelectorAll('.big-box button')[1].addEventListener('click', function() { //speed
    let text = v > 600 ? 'Normal ' : 'Increased '
    this.innerHTML = `${text}Speed`
	v = 1300 - v
})
document.querySelectorAll('.big-box button')[2].addEventListener('click', function() { //autoplay
    if (this.innerHTML === "Turn On Autoplay") {
        this.innerHTML = "Cancel Autoplay"
        players.forEach(player => {
            if (player.control) {
                player.control = ""
            }
        })
    } else {
        this.innerHTML = "Turn On Autoplay"
        players.forEach(player => {
            if (player.control === "") {
                player.control = 1
            }
        })
    }

})

//load images
window.addEventListener('load', () => {
    let images = []
    let src = [
        "img/arrow.png", "img/Red.png", "img/Orange.png", "img/yellow.png", "img/green.png", "img/blue.png", "img/purple.png", "img/pink.png",
        "img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/s1.jpg", "img/s2.jpg",
        "img/c1.png", "img/c2.png", "img/c3.png", "img/c4.png", "img/c5.png", "img/l1.png", "img/l2.png", "img/l3.png"
    ]
    src.forEach((src, index) => {
        images[index] = new Image()
        images[index].src = src
    })
})
