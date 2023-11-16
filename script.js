let headline = document.getElementById("headline")
let restartBtn = document.getElementById("btn")
let squares = Array.from(document.getElementsByClassName("square"))

const O_TEXT = "O"
const X_TEXT = "X"

let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let playerOneWon = false
let playerTwoWon = false

const startGame = () => {
	squares.forEach(square => {
		square.addEventListener("click", squareClicked)
	})
}

function squareClicked(e) {
	const id = e.target.id
	if (!spaces[id]) {
		spaces[id] = currentPlayer
		e.target.innerText = currentPlayer
		currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT

		if (playerHasWon()) {
			if (playerOneWon) {
				headline.innerText = "Player one won"
			} else if (playerTwoWon) {
				headline.innerText = "Player two won"
			}
			let winning_blocks = playerHasWon()
			currentPlayer = ""

			winning_blocks.map(square => {
				squares[square].style.backgroundColor = "var(--winner)"
			})
		} else if (isDraw()) {
			headline.textContent = "It's a draw!"
		}
	}
}

const drawPattern = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function isDraw() {
	const [a, b, c, d, e, f, g, h, i] = drawPattern

	if (
		spaces[a] === null ||
		spaces[b] === null ||
		spaces[c] === null ||
		spaces[d] === null ||
		spaces[e] === null ||
		spaces[f] === null ||
		spaces[g] === null ||
		spaces[h] === null ||
		spaces[i] === null
	) {
		return false
	} else {
		return true
	}
}

const winningPatterns = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

function playerHasWon() {
	for (const condition of winningPatterns) {
		let [a, b, c] = condition

		if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
			if (spaces[a] === "X") {
				playerOneWon = true
			} else if (spaces[a] === "O") {
				playerTwoWon = true
			}
			return [a, b, c]
		}
	}

	return false
}

const restartGame = () => {
	for (let i = 0; i < spaces.length; i++) {
		spaces[i] = null
		squares[i].innerText = ""
		squares[i].style.backgroundColor = ""
	}
	headline.textContent = "Tic Tac Toe"
	currentPlayer = X_TEXT
}

restartBtn.addEventListener("click", restartGame)
startGame()

// Good enough to deploy
// of course you can change the way of appering cross and circle, maybe css?
