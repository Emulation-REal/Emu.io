var bluevalue = 150
var greenvalue = 150
var redvalue = 150
var score = 0
var clicks = 0
onkeypress = function() {
  myFunctionkey(event)
};

function myFunctionkey(event) {
  document.body.style.backgroundColor = "rgb(" + redvalue + ", " + greenvalue + ", " + bluevalue + ")";
  if (event.key == "r") {
    redvalue = redvalue += 1
    document.getElementById("red").innerHTML = "R:" + redvalue;
  }
  if (event.key == "g") {
    greenvalue = greenvalue += 1
    document.getElementById("green").innerHTML = "G:" + greenvalue;
  }
  if (event.key == "b") {
    bluevalue = bluevalue += 1
    document.getElementById("blue").innerHTML = "B:" + bluevalue;
  }
  if (event.key == "e") {
    redvalue = redvalue -= 1
    document.getElementById("red").innerHTML = "R:" + redvalue;
  }
  if (event.key == "f") {
    greenvalue = greenvalue -= 1
    document.getElementById("green").innerHTML = "G:" + greenvalue;
  }
  if (event.key == "v") {
    bluevalue = bluevalue -= 1
    document.getElementById("blue").innerHTML = "B:" + bluevalue;
  }
}
document.body.style.backgroundColor = "rgb(" + redvalue + ", " + greenvalue + ", " + bluevalue + ")";
var s = document.getElementById("square");
s.style.position = "absolute";
var x = 500 * Math.random(),
  y = 200 * Math.random(),
  w = 100 * Math.random() + 10;
s.style.left = x + "px";
s.style.top = y + "px";
s.style.width = w + "px";
s.style.height = w + "px";
s.style.backgroundColor = "rgb(" + 230 * Math.random() + ", " + 230 * Math.random() + ", " + 230 * Math.random() + ")";
document.getElementById("square").addEventListener("click", myFunction);

function myFunction() {
  x = 500 * Math.random();
  y = 200 * Math.random();
  w = 100 * Math.random() + 10;
  s.style.left = x + "px";
  s.style.top = y + "px";
  s.style.width = w + "px";
  s.style.height = w + "px";
  s.style.backgroundColor = "rgb(" + 230 * Math.random() + ", " + 230 * Math.random() + ", " + 230 * Math.random() + ")";
  score = score + 1
  document.getElementById("h1").innerHTML = "Score: " + score;
}
var c = document.getElementById("circle");
c.style.position = "absolute";
c.style.left = x + "px";
c.style.top = y + "px";
c.style.width = w + "px";
c.style.height = w + "px";
c.style.backgroundColor = "rgb(" + 230 * Math.random() + ", " + 230 * Math.random() + ", " + 230 * Math.random() + ")";
document.getElementById("circle").addEventListener("click", myFunction2);

function myFunction2() {
  x = 500 * Math.random();
  y = 200 * Math.random();
  w = 100 * Math.random() + 10;
  c.style.left = x + "px";
  c.style.top = y + "px";
  c.style.width = w + "px";
  c.style.height = w + "px";
  c.style.backgroundColor = "rgb(" + 230 * Math.random() + ", " + 230 * Math.random() + ", " + 230 * Math.random() + ")";
  score = score + 1
  document.getElementById("h1").innerHTML =  "Score: " + score;
}
document.getElementById("h1").innerHTML = "Score: " + score;
window.addEventListener("click", myFunction3);

function myFunction3() {
  clicks = clicks + 1
  document.getElementById("h2").innerHTML = "Accuracy: " + Math.floor(100 * score / clicks) + "%";
}
document.getElementById("red").innerHTML = "R:" + redvalue;
document.getElementById("green").innerHTML = "G:" + greenvalue;
document.getElementById("blue").innerHTML = "B:" + bluevalue;


var myTimer= setInterval(myTimer, 1000); //starts timer
var time = 0; //time

function myTimer() { 
   time++; 
   document.getElementById("timer").innerHTML = "Time: " + time; //displays time
   document.getElementById("CPS").innerHTML = "CPS: " + Math.round(score / time * 1000) / 1000;
document.getElementById("RAWCPS").innerHTML = "Raw CPS: " + Math.round(clicks / time * 1000) / 1000;

}
