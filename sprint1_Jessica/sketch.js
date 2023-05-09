var numClones = 90;;
var minYStrech = 0.5;
var minXStrech = 0.3;
var maxXStrech = 0.7;
var maxWaveWidth = window.innerHeight;
var waveScale = 0.8;
var amplitude = 80;
var frequency = 0.015;
var strokeColor = [75, 118, 187];
var backgroundColor = [219, 218, 198];

window.onload = function () {
  Coloris({
    el: '.coloris',
    theme: 'large',
    themeMode: 'dark',
    alpha: true,
  });

  Coloris.setInstance('#strokeColor', {
    onChange: (color) => {
      strokeColor = color;
      draw();
    }
  });

  Coloris.setInstance('#backgroundColor', {
    onChange: (color) => {
      backgroundColor = color;
      draw();
    }
  });

  document.querySelector("#numClones").addEventListener("change", (e) => {
    numClones = e.target.value;
    draw();
  });

  document.querySelector("#amplitude").addEventListener("change", (e) => {
    amplitude = e.target.value;
    draw();
  });

  document.querySelector("#frequency").addEventListener("change", (e) => {
    frequency = e.target.value;
    draw();
  });

  document.querySelector("#waveScale").addEventListener("change", (e) => {
    waveScale = e.target.value;
    draw();
  });

  document.querySelector("#minYStrech").addEventListener("change", (e) => {
    minYStrech = parseFloat(e.target.value);
    draw();
  });

  document.querySelector("#maxXStrech").addEventListener("change", (e) => {
    maxXStrech = parseFloat(e.target.value);
    draw();
  });

  document.querySelector("#minXStrech").addEventListener("change", (e) => {
    minXStrech = parseFloat(e.target.value);
    draw();
  });

  document.querySelector("#maxWaveWidth").setAttribute("value", maxWaveWidth);
  document.querySelector("#maxWaveWidth").setAttribute("max", maxWaveWidth * 2);

  document.querySelector("#maxWaveWidth").addEventListener("change", (e) => {
    maxWaveWidth = parseFloat(e.target.value);
    draw();
  });
}

let analyzer
let song;

function preload(){
  soundFormats('mp3');
  song = loadSound("techno.mp3")
}

function setup() {
  let canvas = createCanvas(window.innerHeight * 267 / 400, window.innerHeight);
  //canvas.mouseClicked(changeColor)
  strokeWeight(0.9)
  //noLoop();
  song.setVolume(0.1);
  song.play();
  song.loop();
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
}

function changeColor() {
  strokeColor = [Math.floor(random (255)),Math.floor(random (255)),Math.floor(random (255))]
  backgroundColor = [Math.floor(random (255)),Math.floor(random (255)),Math.floor(random (255))]
}

let animateRotation = 0;

function draw() {
  let rms = analyzer.getLevel();
  if (rms >= 0.035){
    changeColor();
  }
  animateRotation = 3 + animateRotation
  //console.log(numClones, amplitude, frequency, waveScale, minYStrech, maxXStrech, minXStrech);
  background(backgroundColor);
  stroke(strokeColor);
  noFill();
  

  for (var i = 0; i < numClones; i++) {
    push();
    var cloneCenterX = width / 2;
    var cloneCenterY = height / 2;
    var startRotation = 90;
    var rotation = 180 / numClones * i + startRotation - animateRotation;
    translate(cloneCenterX, cloneCenterY);
    scale(-waveScale, waveScale);
    rotate(rotation * PI / 180);
    translate(-cloneCenterX, -cloneCenterY);
    drawSinusCurve(cloneCenterX, cloneCenterY, amplitude, frequency, i);
    pop();
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