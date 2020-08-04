var N_SIZE,
	EMPTY = "&nbsp;",
	boxes = [],
	turn = "X",
	score,
	moves;

function selectGrid() {
	var grid = document.getElementById("grid").value;
	if(grid == '' || grid < 3){
		alert('Grid must be equal or greater than 3');
		return;
	}

	N_SIZE = grid;
	init();
	document.querySelector(".gridwrapper").style.display = "none";
	document.getElementById("turn").style.display = "block";
}

function init() {
	var board = document.createElement('table');
	board.setAttribute("border", 1);
	board.setAttribute("cellspacing", 0);

	var identifier = 1;
	for (var i = 0; i < N_SIZE; i++) {
		var row = document.createElement('tr');
		board.appendChild(row);
		for (var j = 0; j < N_SIZE; j++) {
    var cell = document.createElement('td');
    cell.setAttribute('height', 120);
    cell.setAttribute('width', 120);
    cell.setAttribute('align', 'center');
    cell.setAttribute('valign', 'center');
			cell.classList.add('col' + j,'row' + i);
			if (i == j) {
				cell.classList.add('diagonal0');
			}
			if (j == N_SIZE - i - 1) {
				cell.classList.add('diagonal1');
			}
			cell.identifier = identifier;
			cell.addEventListener("click", set);
			row.appendChild(cell);
			boxes.push(cell);
			identifier += identifier;
		}
	}

	document.getElementById("boardgame").appendChild(board);
	startNewGame();
}

	
function startNewGame() {
	score = {
		"X": 0,
		"O": 0
	};
	moves = 0;
	turn = "X";
	boxes.forEach(function (square) {
		square.innerHTML = EMPTY;
	});
}

	
function win(clicked) {
	var memberOf = clicked.className.split(/\s+/);
	for (var i = 0; i < memberOf.length; i++) {
		var testClass = '.' + memberOf[i];
  		var items = contains('#boardgame ' + testClass, turn);

		console.log(items.length)
		if (items.length == N_SIZE) {
			return true;
		}
	}
	return false;
}

function contains(selector, text) {
  	var elements = document.querySelectorAll(selector);
  	return [].filter.call(elements, function(element){
    	return RegExp(text).test(element.textContent);
  	});
}


function set() {
	var board = document.querySelector("#boardgame table")
	if (this.innerHTML !== EMPTY) {
		return;
	}
	this.innerHTML = turn;
	moves += 1;
	score[turn] += this.identifier;
	if (win(this)) {
		alert('Winner: Player ' + turn);
		document.querySelector(".gridwrapper").style.display = "block"
		board.remove()
		document.getElementById("turn").style.display = "none";
	} else if (moves === N_SIZE * N_SIZE) {
		alert("Draw");
		document.querySelector(".gridwrapper").style.display = "block"
		board.remove()
		document.getElementById("turn").style.display = "none";
	} else {
		turn = turn === "X" ? "O" : "X";
		document.getElementById('turn').textContent = 'Player ' + turn;

	}
}

function reset() {
	var board = document.querySelector("#boardgame table")
	board.remove()
	document.getElementById("turn").style.display = "none";
	document.querySelector(".gridwrapper").style.display = "block";
}
