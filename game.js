let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(document).keydown(function (e) {
  if (level === 0)
    setTimeout(nextSequence, 100);
})

$(".btn").click(function (e) {
  let userChosenColour = e.target.id;
  playAudio(userChosenColour);
  let button = $("#" + e.target.id);
  button.addClass("pressed");
  setTimeout(function () {
    button.removeClass("pressed");
  }, 100)
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function playAudio(filename) {
  let audio = new Audio("./sounds/" + filename + ".mp3");
  audio.play();
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColour);
}

function checkAnswer(currentIndex) {
  if (userClickedPattern[currentIndex] !== gamePattern[currentIndex])
    gameOver();
  else if (currentIndex + 1 === level) {
    userClickedPattern = [];
    setTimeout(nextSequence, 1000);
  }
}

function gameOver() {
  playAudio("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}