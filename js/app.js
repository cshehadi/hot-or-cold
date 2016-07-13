'use strict';

var max = 100;
var guessCount = 0;
var target;

function setTarget() {
    return (Math.floor(Math.random() * 100)) + 1;
}

function setCounter() {
    $('#count').html(guessCount);
}

function newGame() {
    target = setTarget();

    // clear out any previous guesses
    $('#guessList').html('');
    $('#userGuess').val('');
    $('#feedback').html('Make your Guess!');
    setCounter();
}

function guessMessage(guess) {

    if (guess == target) {
        return "That's it!  Nice Job";
    } else {
        var distance = Math.abs(target - guess);

        var messages = [
            { diff: 0, msg: "that's it!  Nice Job!" }, 
            { diff: 3, msg: 'blazing' }, 
            { diff: 8, msg: 'hot' }, 
            { diff: 16, msg: 'warm' }, 
            { diff: 24, msg: 'lukewarm' }, 
            { diff: 40, msg: 'a tad chilly' }, 
            { diff: 60, msg: 'cold' }, 
            { diff: 80, msg: 'frigid' } 
            ];

        for (var i = 0; i < messages.length; i++) {
            if (distance <= messages[i].diff) {
                return messages[i].msg;
            }
        }
    }
}

function handleGuess(guess) {
    // update the counter
    guessCount++;
    setCounter();

    // update the list of guesses
    $('#guessList').append('<li>'+guess+'</li>');

    // let the user know how they did
    $('#feedback').html(guessMessage(guess));
}

function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        return 'Please enter a number between 1 and 100';
    }
}

function displayError(error) {
    alert(error);
}


$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

    /*--- Handle new game request ---*/
    $("a.new").click(function(){
        newGame();
    });

    /*--- Handle guess ---*/
    $("#guessButton").click(function(){
        var guess = parseInt($('#userGuess').val());
        var error = validateGuess(guess);
        if (!error) {
            handleGuess(guess);
        } else {
            displayError(error);
        }
        return false;
    });

    newGame();
});


