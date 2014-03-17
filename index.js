var Game = require('gameloop');
var gremlins = require('gremlins.js');

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var game = new Game({
  renderer: canvas.getContext('2d')
});

game.width = canvas.width = window.innerWidth;
game.height = canvas.height = window.innerHeight;

var boxes = [];

function Box (x, y){
	this.x = x;
	this.y = y;
	this.width = 10;
	this.height = 10;
	console.log('made a box', this);
}

game.on('draw', function(c){
	c.fillStyle = '#9f8ef7';
	boxes.forEach(function(box){
		c.fillRect(box.x, box.y, box.width, box.height);
	});
});

var clicks = 0;

game.on('start', function(){
	gremlins
	.createHorde()
	.gremlin(
		gremlins.species.clicker()
		.clickTypes(['click'])
		.showAction(function(x, y){
			boxes[clicks] = new Box(x, y);
			clicks += 1;
		})
	)
	.unleash();
});

game.start();

