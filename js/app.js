'use strict';

var max = 100;
var guessCount;
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
    guessCount = 0;
    setCounter();
}

function getFeedback(guess) {

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
            { diff: 32, msg: 'a tad chilly' }, 
            { diff: 50, msg: 'cold' }, 
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
    $('#feedback').html(getFeedback(guess));
}

function validateGuess(guess) {
    var error = '';
    // check for bad input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        error = 'Please enter a number between 1 and 100';
    }
    // make sure they haven't guessed the same number twice
    $('#guessList').find('li').each(function() {
        if (guess == parseInt($(this).html())) {
            error = "You've already guessed that number - try something else!";
        }
    });
    return error;
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


