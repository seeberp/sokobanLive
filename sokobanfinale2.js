"use strict"
var body // link for table
var reviewL1 = 0 // score level 1
var reviewL2 = 0
var reviewL3 = 0
var scoreCard = 2
var playerPosition = [1, 1]; //map 1 starting position
var lastMove // for undo button
var counter = 1 // counts players moves
var gamesWon = 0 // used to load ext level
var goodSpace = 0 // increases whenever black space goes yellow and decreases when vice versa
var boo // booelon so you can redo one level or start the game over 
    //pink = wall
    //purple = moveable space
    //green = bricks
    //orange = player
    //black = goal
    //yellow = goal in place
var globalMap = [
    ['pink', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink'],
    ['pink', 'purple', 'purple', 'purple', 'purple', 'purple', 'pink'],
    ['pink', 'purple', 'box1', 'purple', 'box1', 'purple', 'pink'],
    ['pink', 'purple', 'purple', 'purple', 'purple', 'purple', 'pink'],
    ['pink', 'purple', 'black', 'purple', 'black', 'purple', 'pink'],
    ['pink', 'purple', 'purple', 'purple', 'purple', 'purple', 'pink'],
    ['pink', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink']
];

allowMovement();

// Start board
function initialise() {

    if (gamesWon < 3) {
        refresh();
        trackMovement();

        body = document.getElementsByTagName('body')[0];
        var board = document.createElement('table');
        $(board).attr("cellpadding", 10);
        for (var i = 0; i < globalMap.length; i++) {
            var rows = document.createElement('tr');
            for (var j = 0; j < globalMap[i].length; j++) {
                var cells = document.createElement('td');
                $(cells).attr("id", `${i}:${j}`);
                var image = document.createElement("img");
                if (globalMap[i][j] == 'purple') {
                    $(image).attr('src', 'purple.jpg')
                } else if (globalMap[i][j] == 'pink') {
                    $(image).attr('src', 'pink.jpg', )
                } else if (globalMap[i][j] == 'box1') {
                    $(image).attr('src', 'green.jpg', )
                } else if (globalMap[i][j] == 'box2') {
                    $(image).attr('src', 'green.jpg', )
                } else if (globalMap[i][j] == 'black') {
                    $(image).attr('src', 'black.jpg', )
                } else if (globalMap[i][j] == 'yellow') {
                    $(image).attr('src', 'yellow.jpg', )
                }

                if (i == playerPosition[0] && j == playerPosition[1]) {
                    $(image).attr('src', 'orange.jpg', )
                }

                cells.appendChild(image);
                rows.appendChild(cells);
            }

            board.appendChild(rows);
            body.appendChild(board);
        }
        stars();
    }
	$("img").on("error", function() {
  $(this).hide();
});
}

//loads start to review each level
function stars() {

    var star1 = document.createElement("SPAN");
    star1.setAttribute("id", "star1");
    star1.setAttribute("class", "fa fa-star checked");
    document.body.appendChild(star1);

    var star2 = document.createElement("SPAN");
    star2.setAttribute("id", "star2");
    document.body.appendChild(star2);

    var star3 = document.createElement("SPAN");
    star3.setAttribute("id", "star3");
    document.body.appendChild(star3);

    if ((gamesWon == 0) && (counter <= 10)) {
        reviewL1 = 3;
        star2.setAttribute("class", "fa fa-star checked");
        star3.setAttribute("class", "fa fa-star checked");
    } else if ((gamesWon == 0) && (counter <= 13)) {
        reviewL1 = 2;
        star2.setAttribute("class", "fa fa-star checked");
    } else if ((gamesWon == 0) && (counter <= 14)) {
        reviewL1 = 1;
    }

    if ((gamesWon == 1) && (counter <= 4)) {
        reviewL2 = 3;
        star2.setAttribute("class", "fa fa-star checked");
        star3.setAttribute("class", "fa fa-star checked");
    } else if ((gamesWon == 1) && (counter <= 6)) {
        reviewL2 = 2;
        star2.setAttribute("class", "fa fa-star checked");
    } else if ((gamesWon == 1) && (counter <= 7)) {
        reviewL2 = 1;
    }

    if ((gamesWon == 2) && (counter <= 4)) {
        reviewL3 = 3;
        star2.setAttribute("class", "fa fa-star checked");
        star3.setAttribute("class", "fa fa-star checked");
    } else if ((gamesWon == 2) && (counter <= 6)) {
        reviewL3 = 2;
        star2.setAttribute("class", "fa fa-star");
    } else if ((gamesWon == 2) && (counter <= 7)) {
        reviewL3 = 1;
    }

}

//makes move and redraws map for each level

function allowMovement() {

    $(document).ready(function() {
        $(window).on("keydown", function() {
            makeMove();
            initialise();
        });
    });

}

// moves taken text appears

function trackMovement() {
    var moves = document.createElement("SPAN");
    moves.setAttribute("id", "moves");
    var counting = document.createTextNode("Moves Taken = " + counter); // Create a text node
    moves.appendChild(counting);
    document.body.appendChild(moves);

}

//restart a level

function refresh() {

    var reload = document.createElement("BUTTON");
    reload.setAttribute("id", "reloader");
    var buttonName = document.createTextNode("Restart Level"); // Create a text node
    reload.appendChild(buttonName);
    document.body.appendChild(reload);
	

    $("#reloader").click(function() {
		goodSpace = 0;
        nextLevel();
		
    });

}

//used to clear the first page and load the map as well as clear map between levels

function clearFirst() {
    $(document.body).empty();
}

//changes global map

function nextLevel() {
    $(document.body).empty();
    counter = 1
	
	
scoreCard = 0;
    if (gamesWon == 0) {
        globalMap = [
            ['pink', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink'],
            ['pink', 'purple', 'purple', 'purple', 'purple', 'purple', 'pink'],
            ['pink', 'purple', 'box1', 'purple', 'box1', 'purple', 'pink'],
            ['pink', 'purple', 'purple', 'purple', 'purple', 'purple', 'pink'],
            ['pink', 'purple', 'black', 'purple', 'black', 'purple', 'pink'],
            ['pink', 'purple', 'purple', 'purple', 'purple', 'purple', 'pink'],
            ['pink', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink']
        ];
        playerPosition = [1, 1];
        initialise();
    }

    if (gamesWon == 1) {
        globalMap = [
            ['', '', '', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink', '', '', ''],
            ['pink', 'pink', 'pink', 'pink', 'purple', 'purple', 'purple', 'purple', 'purple', 'pink', '','',''],
            ['pink', 'purple', 'purple', 'purple', 'black', 'pink', 'pink', 'pink', 'purple', 'pink', '','',''],
            ['pink', 'purple', 'pink', 'purple', 'pink', 'purple', 'purple', 'purple', 'purple', 'pink', 'pink','',''],
            ['pink', 'purple', 'pink', 'purple', 'box1', 'purple', 'box1', 'pink', 'black', 'purple', 'pink','',''],
             ['pink', 'purple', 'pink', 'purple', 'purple', 'box1', 'purple', 'purple', 'pink', 'purple', 'pink','',''],
             ['pink', 'purple', 'black', 'pink', 'box1', 'purple', 'box1', 'purple', 'pink', 'purple', 'pink','',''],
			 ['pink', 'pink', 'purple', 'purple', 'purple', 'purple', 'pink', 'purple', 'pink', 'purple','pink','pink','pink'],
			 ['', 'pink', 'purple', 'pink', 'pink', 'pink', 'black', 'purple', 'purple', 'purple','purple','purple','pink'],	
			['', 'pink', 'purple', 'purple', 'purple', 'purple', 'purple', 'pink', 'pink', 'purple','purple','purple','pink'],
			['', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink', 'pink','pink','pink','pink'],
        ];
        playerPosition = [8, 11];
        initialise();
    } else if (gamesWon == 2) {
        globalMap = [
            ['', '', 'pink', 'pink', 'pink', '', '', ''],
            ['', '', 'pink', 'black', 'pink', 'pink', '', '', ''],
            ['pink', 'pink', 'pink', 'box1', 'purple', 'box1', 'black', 'pink'],
            ['pink', 'black', 'purple', 'box1', 'purple', 'pink', 'pink', 'pink'],
            ['pink', 'pink', 'pink', 'pink', 'box1', 'pink', '', ''],
            ['', '', '', 'pink', 'black', 'pink', '', '', ''],
         	['', '', '', 'pink', 'pink', 'pink', '', '', ''],
        ];
        playerPosition = [3, 4];
        initialise();
    }
    if (gamesWon == 3) {
        winner();
		goodSpace = 0;
    }
			for (var i = 0; i < globalMap.length; i++) {
            var rows = document.createElement('tr');
            for (var j = 0; j < globalMap[i].length; j++) {
				if (globalMap[i][j] == 'black') {
                    scoreCard++;
				}
			}
		}
}

//loads player score and they can reload any one level or restart the game

function winner() {

    $(window).off("keydown");

    var finalScore = reviewL1 + reviewL2 + reviewL3

    var total = document.createElement("H1");
    total.setAttribute("id", "Total Scpre");
    var totalScore = document.createTextNode("Total Score " + finalScore + "/9");
    total.appendChild(totalScore);
    document.body.appendChild(total);

    var first = document.createElement("BUTTON");
    first.setAttribute("id", "first");
    var firstScore = document.createTextNode("Level 1 Stars" + reviewL1 + "/3");
    first.appendChild(firstScore);
    document.body.appendChild(first);

    var second = document.createElement("BUTTON");
    second.setAttribute("id", "second");
    var secondScore = document.createTextNode("Level 2 Stars" + reviewL2 + "/3");
    second.appendChild(secondScore);
    document.body.appendChild(second);

    var third = document.createElement("BUTTON");
    third.setAttribute("id", "third");
    var thirdScore = document.createTextNode("Level 3 Stars" + reviewL3 + "/3");
    third.appendChild(thirdScore);
    document.body.appendChild(third);

    var beginAgain = document.createElement("BUTTON");
    beginAgain.setAttribute("id", "startOver");
    var buttonName = document.createTextNode("Restart the Game"); // Create a text node
    beginAgain.appendChild(buttonName);
    document.body.appendChild(beginAgain);



    $("#startOver").click(function() {
        boo = false
        allowMovement();
        gamesWon = 0
        nextLevel();
		goodSpace = 0;
    });


    $("#first").click(function() {
        allowMovement();
        gamesWon = 0
        nextLevel();
		goodSpace = 0;
    });

    $("#second").click(function() {
        allowMovement();
        gamesWon = 1
        nextLevel();
		goodSpace = 0;
    });

    $("#third").click(function() {
        allowMovement();
        gamesWon = 2
        nextLevel();
		goodSpace = 0;
    });
}

// function to account for EVERY SINGLE possible movement

function makeMove(event) {
playerPosition = [playerPosition[0], playerPosition[1]];
	
	
    lastMove = window.event.which //tracks last movement
    var image = document.createElement("img");
    clearFirst();
	
			console.log (playerPosition);
	console.log (scoreCard);
	
	//makes player move
    if (37 === window.event.which) {
        playerPosition = [playerPosition[0], playerPosition[1]];
        playerPosition[1] = playerPosition[1] - 1;
        counter++;
    } else if (38 === window.event.which) {
        playerPosition = [playerPosition[0], playerPosition[1]];
        playerPosition[0] = playerPosition[0] - 1;
        counter++;
    } else if (39 === window.event.which) {
        playerPosition = [playerPosition[0], playerPosition[1]];
        playerPosition[1] = playerPosition[1] + 1;
        counter++;
    } else if (40 === window.event.which) {
        playerPosition = [playerPosition[0], playerPosition[1]];
        playerPosition[0] = playerPosition[0] + 1;
        counter++;
    }
    //if the player moves into a wall they'll be forced back out 
    if (globalMap[playerPosition[0]][playerPosition[1]] === "pink" && 37 === window.event.which) {
        playerPosition[1] = playerPosition[1] + 1;
    }
    if (globalMap[playerPosition[0]][playerPosition[1]] === "pink" && 38 === window.event.which) {
        playerPosition[0] = playerPosition[0] + 1;
    }
    if (globalMap[playerPosition[0]][playerPosition[1]] === "pink" && 39 === window.event.which) {
        playerPosition[1] = playerPosition[1] - 1;
    }
    if (globalMap[playerPosition[0]][playerPosition[1]] === "pink" && 40 === window.event.which) {
        playerPosition[0] = playerPosition[0] - 1;
    }
	
	if (globalMap[playerPosition[0]][playerPosition[1]-1] === "pink" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 37 === window.event.which) {
		globalMap[playerPosition[0]][playerPosition[1]]= "box1"
        playerPosition[1] = playerPosition[1] + 1;
    }
	if (globalMap[playerPosition[0]-1][playerPosition[1]] === "pink" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 38 === window.event.which) {
		globalMap[playerPosition[0]][playerPosition[1]]= "box1"
        playerPosition[0] = playerPosition[0]+1;
    }
	if (globalMap[playerPosition[0]][playerPosition[1]+1] === "pink" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 39 === window.event.which) {
		globalMap[playerPosition[0]][playerPosition[1]]= "box1"
        playerPosition[1] = playerPosition[1]-1;
    }
	if (globalMap[playerPosition[0]+1][playerPosition[1]] === "pink" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 40 === window.event.which) {
		globalMap[playerPosition[0]][playerPosition[1]]= "box1"
        playerPosition[0] = playerPosition[0]-1;
    }	
	if (globalMap[playerPosition[0]][playerPosition[1]-1] === "black" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 37 === window.event.which) {
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
		globalMap[playerPosition[0]][playerPosition[1]-1]= "yellow"
		goodSpace++;
    }	
	if (globalMap[playerPosition[0]-1][playerPosition[1]] === "black" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 38 === window.event.which) {
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
		globalMap[playerPosition[0]-1][playerPosition[1]]= "yellow"
		goodSpace++;
    }	
	if (globalMap[playerPosition[0]][playerPosition[1]+1] === "black" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 39 === window.event.which) {
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
		globalMap[playerPosition[0]][playerPosition[1]+1]= "yellow"
		goodSpace++;
    }	
	if (globalMap[playerPosition[0]+1][playerPosition[1]] === "black" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 40 === window.event.which) {
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
		globalMap[playerPosition[0]+1][playerPosition[1]]= "yellow"
		goodSpace++;
    }	
	if (globalMap[playerPosition[0]][playerPosition[1]-1] === "box1" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 37 === window.event.which) {
		playerPosition[1] = playerPosition[1] + 1;
		globalMap[playerPosition[0]][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]-1]= "box1"
    }	
	if (globalMap[playerPosition[0]-1][playerPosition[1]] === "box1" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 38 === window.event.which) {
		playerPosition[0] = playerPosition[0] + 1;
		globalMap[playerPosition[0]][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]-1][playerPosition[1]]= "box1"
    }	
	if (globalMap[playerPosition[0]][playerPosition[1]+1] === "box1" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 39 === window.event.which) {
		playerPosition[1] = playerPosition[1] - 1;
		globalMap[playerPosition[0]][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]+1]= "box1"
    }	
	if (globalMap[playerPosition[0]+1][playerPosition[1]] === "box1" && globalMap[playerPosition[0]][playerPosition[1]] === "box1" && 40 === window.event.which) {
		playerPosition[0] = playerPosition[0] - 1;
		globalMap[playerPosition[0]][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]+1][playerPosition[1]]= "box1"
    }	
	
	if (globalMap[playerPosition[0]][playerPosition[1]-1] === "pink" && globalMap[playerPosition[0]][playerPosition[1]] === "yellow" && 37 === window.event.which) {
		playerPosition[1] = playerPosition[1] + 1;
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
		globalMap[playerPosition[0]][playerPosition[1]-1]= "yellow"
    }	
	if (globalMap[playerPosition[0]-1][playerPosition[1]] === "pink" && globalMap[playerPosition[0]][playerPosition[1]] === "yellow" && 38 === window.event.which) {
		playerPosition[0] = playerPosition[0] + 1;
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
		globalMap[playerPosition[0]-1][playerPosition[1]]= "yellow"
    }	
	if (globalMap[playerPosition[0]][playerPosition[1]+1] === "pink" && globalMap[playerPosition[0]][playerPosition[1]] === "yellow" && 39 === window.event.which) {
		playerPosition[1] = playerPosition[1] - 1;
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
		globalMap[playerPosition[0]][playerPosition[1]+1]= "yellow"
    }	
	if (globalMap[playerPosition[0]+1][playerPosition[1]] === "pink" && globalMap[playerPosition[0]][playerPosition[1]] === "yellow" && 40 === window.event.which) {
		playerPosition[0] = playerPosition[0] - 1;
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
		globalMap[playerPosition[0]+1][playerPosition[1]]= "yellow"
    }		
	
    //----------------------------------------//
	// if the player moves into a spot where a box is and the place the box would move isn't equal to another box and they're on the right map and they press the correct button, redraw the new space to a box and redraw old place as whatever it should be
    //BOX 1
    //begin left hand movements
    if (globalMap[playerPosition[0]][playerPosition[1]] === "box1" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/ && 37 === window.event.which) {
        globalMap[playerPosition[0]][playerPosition[1]-1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
    }
	
	if (globalMap[playerPosition[0]][playerPosition[1]] === "box1" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/ && 38 === window.event.which) {
        globalMap[playerPosition[0]-1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
    }
	if (globalMap[playerPosition[0]][playerPosition[1]] === "box1" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/ && 39 === window.event.which) {
        globalMap[playerPosition[0]][playerPosition[1]+1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
    }
	
	if (globalMap[playerPosition[0]][playerPosition[1]] === "box1" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/ && 40 === window.event.which) {
        globalMap[playerPosition[0]+1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]]= "purple"
    }
	
	if (globalMap[playerPosition[0]][playerPosition[1]] === "yellow" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/ && 37 === window.event.which) {
        globalMap[playerPosition[0]][playerPosition[1]-1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]]= "black"
		goodSpace--;
    }
	
	if (globalMap[playerPosition[0]][playerPosition[1]] === "yellow" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/ && 38 === window.event.which) {
        globalMap[playerPosition[0]-1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]]= "black"
		goodSpace--;
    }
	if (globalMap[playerPosition[0]][playerPosition[1]] === "yellow" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/ && 39 === window.event.which) {
        globalMap[playerPosition[0]][playerPosition[1]+1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]]= "black"
		goodSpace--;
    }
	
	if (globalMap[playerPosition[0]][playerPosition[1]] === "yellow" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/ && 40 === window.event.which) {
        globalMap[playerPosition[0]+1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]]= "black"
		goodSpace--;
    }
	
	
	console.log (goodSpace);
	

    //WIN CONDITION If Boo != true play normal other wise it will just load the one level

    if (goodSpace == scoreCard && boo != true && gamesWon == 0) {
        gamesWon++,
        nextLevel();
        clearFirst();
		goodSpace = 0;
    }
    if (goodSpace == scoreCard && boo == true && gamesWon == 0) {
        gamesWon = 3;
        winner();
		goodSpace = 0;
    }
    if (goodSpace == scoreCard && boo != true && gamesWon == 1) {
        gamesWon++;
        nextLevel();
        clearFirst();
		goodSpace = 0;
    }

    if (goodSpace ==scoreCard && boo == true && gamesWon == 1) {
        gamesWon = 3;
        winner();
		goodSpace = 0;
    }
    if (goodSpace ==scoreCard && boo != true && gamesWon == 2) {
        gamesWon = 3;
        boo = true;
        winner();
		goodSpace = 1;

    }
    if (goodSpace == scoreCard && boo == true && gamesWon == 2) {
        gamesWon = 3;
        winner();
		goodSpace = 0;
    }

    if (gamesWon < 3) {
        undo();
    }
}

//button so player can undo any one movement  incase they get stuck
function undo(event) {

    var change = document.createElement("BUTTON");
    change.setAttribute("id", "change");
    var buttonName = document.createTextNode("Undo"); // Create an undo button
    change.appendChild(buttonName);
    document.body.appendChild(change);

    $("#change").click(function() {
        if (37 === lastMove) {
            playerPosition = [playerPosition[0], playerPosition[1]];
            playerPosition[1] = playerPosition[1] + 1;
            counter++;
        } else if (38 === lastMove) {
            playerPosition = [playerPosition[0], playerPosition[1]];
            playerPosition[0] = playerPosition[0] + 1;
            counter++;
        } else if (39 === lastMove) {
            playerPosition = [playerPosition[0], playerPosition[1]];
            playerPosition[1] = playerPosition[1] - 1;
            counter++;
        } else if (40 === lastMove) {
            playerPosition = [playerPosition[0], playerPosition[1]];
            playerPosition[0] = playerPosition[0] - 1;
            counter++;
        }
			
	if (37 === lastMove && globalMap[playerPosition[0]][playerPosition[1]-2] === "box1"  /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]][playerPosition[1]-1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]-2]= "purple"
    }
	if (38 === lastMove && globalMap[playerPosition[0]-2][playerPosition[1]] === "box1" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]-1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]-2][playerPosition[1]]= "purple"
    }
	if (39 === lastMove && globalMap[playerPosition[0]][playerPosition[1]+2] === "box1" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]][playerPosition[1]+1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]+2]= "purple"
    }
	
	if (40 === lastMove && globalMap[playerPosition[0]+2][playerPosition[1]] === "box1" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]+1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]+2][playerPosition[1]]= "purple"
    }
		
	if (37 === lastMove && globalMap[playerPosition[0]][playerPosition[1]-2] === "box1" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]][playerPosition[1]-1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]-2]= "purple"
    }
	if (38 === lastMove && globalMap[playerPosition[0]-2][playerPosition[1]] === "box1" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]-1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]-2][playerPosition[1]]= "purple"
    }
	if ( 39 === lastMove && globalMap[playerPosition[0]][playerPosition[1]+2] === "black" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]][playerPosition[1]+1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]+2]= "purple"
    }
	
	if (40 === lastMove && globalMap[playerPosition[0]+2][playerPosition[1]] === "box1"/*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]+1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]+2][playerPosition[1]]= "purple"
    }
		
			
	if (37 === lastMove && globalMap[playerPosition[0]][playerPosition[1]-2] === "yellow" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]][playerPosition[1]-1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]-2]= "black"
		goodSpace--
    }
	if (38 === lastMove && globalMap[playerPosition[0]-2][playerPosition[1]] === "yellow" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/ ) {
        globalMap[playerPosition[0]-1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]-2][playerPosition[1]]= "black"
		goodSpace--
    }
	if (39 === lastMove && globalMap[playerPosition[0]][playerPosition[1]+2] === "yellow" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]][playerPosition[1]+1]= "box1"
		globalMap[playerPosition[0]][playerPosition[1]+2]= "black"
		goodSpace--
    }
	
	if (40 === lastMove && globalMap[playerPosition[0]+2][playerPosition[1]] === "yellow" /*&& globalMap[1][2] === "box1"*/ /*&& gamesWon == 0*/ /*&& globalMap[1][1] !== "box2"*/) {
        globalMap[playerPosition[0]+1][playerPosition[1]]= "box1"
		globalMap[playerPosition[0]+2][playerPosition[1]]= "black"
		goodSpace--
    }		
		
	

        clearFirst();
        initialise();

    });

    lastMove = window.event.which 

}