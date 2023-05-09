var numClones = 0;
var minYStrech = 0.5;
var minXStrech = 0.3;
var maxXStrech = 0.7;
var maxWaveWidth = window.innerHeight;
var waveScale = 0.8;
var amplitude = 80;
var frequency = 0.015;
var strokeColor = [75, 118, 187];
var backgroundColor = [219, 218, 198];
var strokeWeightValue = 0.9;

window.onload = function () {
  document.querySelector("#pause").addEventListener("click", () => {
    if(paused){
      unpause();
    }else{
      pause();
    }
  });

  document.querySelector("#save").addEventListener("click", (e) => {
    saveScreenshot();
  });
}

function saveScreenshot(){
  saveCanvas('Sinus Spirale Screenshot', 'png');
}

function setup() {
  let c = createCanvas(window.innerHeight * 267 / 400, window.innerHeight);
  c.parent("canvas");
}

function pause(){
  document.querySelector("#pause").classList.remove("paused");
  document.querySelector("#pause").innerHTML = "Play";
  paused = true;
}

function unpause(){
  document.querySelector("#pause").classList.add("paused");
  document.querySelector("#pause").innerHTML = "Pause";
  paused = false;
}

let counter = 0;
let numClonesFactor = 90;
let doOnce = false;
let animationRotation = 0;
let paused = false;
let finishedOriginal = false;

function draw() {
  if(!paused){
    numClones = Math.floor(sin(counter * PI / 180) * numClonesFactor);
    counter += 0.5;
    counter %= 180;
    if(counter == 90 && !doOnce){
      pause();
    }
    if(doOnce){
      backgroundColor = [0,0,0, random(15, 50)];
      animationRotation -= 0.1;
    }
    if (counter == 0) {
      doOnce = true;
      minYStrech = random(0.2, 1);
      minXStrech = random(0.1, 0.8);
      maxXStrech = random(0.1, 1.4);
      maxWaveWidth = random(window.innerHeight * 0.7, window.innerHeight * 1.4);
      waveScale = random(0.5, 1);
      amplitude = random(0, 300);
      frequency = random(0, 0.04);
      strokeColor = [random(255), random(255), random(255)];
      strokeWeightValue = random(0.2, 1);
      numClonesFactor = random(20, 100);
      //console.log("numClonesFactor: "+numClonesFactor, "amplitude: "+ amplitude, "frequency: "+frequency, "waveScale: "+waveScale, "minYStrech: "+minYStrech, "maxXStrech: "+maxXStrech, "minXStrech: "+minXStrech, "strokeWeightValue: "+strokeWeightValue);
    }
    document.querySelector("#minYStrech span").innerHTML = minYStrech.toFixed(3);
    document.querySelector("#minXStrech span").innerHTML = minXStrech.toFixed(3);
    document.querySelector("#maxXStrech span").innerHTML = maxXStrech.toFixed(3);
    document.querySelector("#maxWaveWidth span").innerHTML = maxWaveWidth.toFixed(3);
    document.querySelector("#waveScale span").innerHTML = waveScale.toFixed(3);
    document.querySelector("#amplitude span").innerHTML = amplitude.toFixed(3);
    document.querySelector("#frequency span").innerHTML = frequency.toFixed(3);
    document.querySelector("#strokeColor span").innerHTML = "rgb ( "+strokeColor[0].toFixed(0)+", "+strokeColor[1].toFixed(0)+", "+strokeColor[2].toFixed(0)+" )";
    document.querySelector("#strokeWeight span").innerHTML = strokeWeightValue.toFixed(3);
    document.querySelector("#numClones span").innerHTML = numClonesFactor.toFixed(3);
    
    background(backgroundColor);
    strokeWeight(strokeWeightValue);
    stroke(strokeColor);
    noFill();

    for (var i = 0; i < numClones; i++) {
      push();
      var cloneCenterX = width / 2;
      var cloneCenterY = height / 2;
      var startRotation = 90;
      var rotation = 180 / numClones * i + startRotation + animationRotation;
      translate(cloneCenterX, cloneCenterY);
      scale(-waveScale, waveScale);
      rotate(rotation * PI / 180);
      translate(-cloneCenterX, -cloneCenterY);
      drawSinusCurve(cloneCenterX, cloneCenterY, amplitude, frequency, i);
      pop();
    }
  }
}

function drawSinusCurve(xOffset, yOffset, amplitude, frequency, waveIndex) {
  beginShape();
  for (var x = -maxWaveWidth / 2; x < maxWaveWidth / 2; x++) {
    var waveYStrech = 1 / numClones * waveIndex + minYStrech;
    var y = yOffset + amplitude * waveYStrech * sin(frequency * x);
    var x2 = x * (maxXStrech / numClones * waveIndex + minXStrech);
    vertex(x2 + xOffset, y);
  }
  endShape();
}