// /*
//  * Game Class
//  * Main engine
//  * @author aurelieng http://www.arlg.me
//  */
// ----------------------------------------
// GAME
// ----------------------------------------

function Game(canvasWidth, canvasHeight) {
	this.init(canvasWidth, canvasHeight);
}

Game.prototype = {

	init: function(canvasWidth, canvasHeight) {

		//VARS
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;

		//Dates and ∆
		this.lastUpdateTime = new Date();
		this.delta = 0;
		this.hasStopped = false;

		//METHODS
		this.initCanvas();
		this.initStats();

		this.displaygraphics = new DisplayGraphics(this.ctx);

		this.initListeners();

	},

	//Stops the requestanimframe if the user quits the window / resumes if he comes back
	initListeners: function() {
		var that = this;
		window.onblur = function() {
			that.stop();
		};
		window.onfocus = function() {
			that.resume();
		};
	},

	initCanvas: function() {
		this.canvas = document.getElementById("canvas");
		this.canvas.width = this.canvasWidth;
		this.canvas.height = this.canvasHeight;
		this.ctx = this.canvas.getContext('2d');
	},

	initStats: function() {
		this.stats = new Stats();

		this.stats.setMode(0); // 0: fps, 1: ms
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.left = '0px';
		this.stats.domElement.style.top = '0px';

		document.body.appendChild(this.stats.domElement);
	},

	startGame: function() {
		this.displaygraphics.startGame();
	},

	//This is the main loop
	frame: function() {
		this.stats.begin();

			this.setDelta();

			this.update();

			//Next frame
			var that = this;
			this.gLoop = requestAnimationFrame(function() {
				return that.frame();
			});

		that.stats.end();
	},

	//Game sprites moves depending on the ∆ time, not the fps
	setDelta: function() {

		this.now = new Date();

		//Sets the new time as now not to loose frames if user left the page
		if(this.hasStopped === true) {
			this.hasStopped = false;
			this.lastUpdateTime = this.now;
		}

		this.delta = (this.now - this.lastUpdateTime) / 1000;

		this.lastUpdateTime = this.now;
	},

	//Update Displayed elements - and then draw
	update: function() {

		//Global clearing
		this.ctx.clearRect(0, 0, CONSTS.CANVAS_WIDTH, CONSTS.CANVAS_HEIGHT);

		//Updates + draw all graphics classes
		this.displaygraphics.step(this.delta * GLOBAL_VARS.ACCELERATION);

	},

	resume: function() {
		this.hasStopped = true;
		this.frame();
	},

	// Stops the update / rendering process
	stop: function() {
		cancelAnimationFrame(this.gLoop);
	}
};