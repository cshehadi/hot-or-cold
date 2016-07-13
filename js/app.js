
var count = 0;
var target;

function setTarget() {
    return (Math.floor(Math.random() * 100)) + 1;
}

function setCounter() {
    $('#count').html(count);
}

function newGame() {
    target = setTarget();

    // clear out any previous guesses
    $('#guessList').html('');
    $('#userGuess').val('');
    setCounter();
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

    newGame();
});


