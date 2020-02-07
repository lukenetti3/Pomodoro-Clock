var minutes = parseInt($("#sessLength").text())-1;
var seconds = 60;
var playMode = false;
var sessionMode = false;
var sessionDone;
var track = true;
var stop = false;
var pauseMode = true;
var completed = 0;

// Sound Effect. May need to update link depending on if the sound is still there
var audio = new Audio('http://www.yogatech.com/apps/livehelp/bin/staff/sound/ringring.wav');

$("#comp").text(completed);

// Alternates between a pause and play of the click on Session
$(".timer").on("click", function() {
  playMode = !playMode;
  if(playMode) {
    pauseMode = false;
    play();
  } else {
    pauseMode = true;
    pause();
  }
});

$(".plusS").on("click", increaseSess);
$(".plusB").on("click", increaseBreak);
$(".minusS").on("click", decreaseSess);
$(".minusB").on("click", decreaseBreak);

function play() {
    stop = false;
    sessionDone = setTimeout(counter,1000);
}

function pause() {
    clearTimeout(sessionDone);
}

function counter() {
    updateTime();
    if(stop === false) {
      displayTime();
      play();
    }
}

function displayTime() {
  $(".min").text(minutes);
  $(".sec").text(":" + seconds);
}

function updateTime() {
  if(seconds === 0) {
    if(minutes === 0) {
        if(track === true) {
          clearTimeout(sessionDone);
          return initializeBreak();
        } else {
          clearTimeout(sessionDone);
          return initializeSession();
        }
      } 
    minutes--;
    seconds=59;
  }
  seconds--;
}

function initializeBreak() {
  audio.play();
  stop = true;
  track = false;
  $("h2").text("Take A Break!");
  minutes = parseInt($("#breakLength").text())-1;
  seconds = 60;
  setTimeout(play,200);
}

function initializeSession() {
  completed++;
  $("#comp").text(completed);
  stop = true;
  track = true;
  $("h2").text("Session");
  minutes = parseInt($("#sessLength").text())-1;
  seconds = 60;
  setTimeout(play,200);
}
 
function increaseSess() {
  if(pauseMode) {
    $("#sessLength").text(parseInt($("#sessLength").text())+1);
    minutes = parseInt($("#sessLength").text());
    seconds = 60;
    $(".min").text(minutes);
    $(".sec").text("");
    minutes--;
  }
}

function increaseBreak() {
  if(pauseMode) {
    $("#breakLength").text(parseInt($("#breakLength").text())+1);
    seconds = 60;
  }
}

function decreaseSess() {
  if(pauseMode) {
    $("#sessLength").text(parseInt($("#sessLength").text())-1);
    minutes = parseInt($("#sessLength").text());
    seconds = 60;
    $(".min").text(minutes);
    $(".sec").text("");
    minutes--;
  }
}

function decreaseBreak() {
  if(pauseMode) {
    $("#breakLength").text(parseInt($("#breakLength").text())-1);
    seconds = 60;
  }
}