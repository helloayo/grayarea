// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk

// Edited by SacrificeProductions

var cols, rows;
var scl = 20;
var w = 3500;
var h = 1000;

var flying = 0;

var terrain = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = w / scl;
  rows = h/ scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {

  flying -= 0.05;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -90, 90);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  var from = color(225, 255, 128);
  var to = color(0, 138, 207);
  var interA = lerpColor(from, to, 0.33)
  var interB = lerpColor(from, to, 0.66);

  background(55);

  translate(width/5, height/5+50);
  rotateX(PI/2);
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
  stroke(interB);
  fill(interB, 0);
  var dirY = (mouseY / height ) * 4;
	var dirX = (mouseX / width - 0.4) * 5;
  ambientLight(20);
	directionalLight(interA, dirX, dirY, .3);
    endShape();
  }
}
