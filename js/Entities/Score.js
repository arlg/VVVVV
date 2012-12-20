/*
 * Score Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// Score
// ----------------------------------------

//Handles The total time, game time (Time * acceleration), and drawing those informations

function Score() {
	this.init();
	this.timer = 0;
}

Score.prototype = {

	init: function() {

		//Background vars
		this.background = document.getElementById("vvvvv-sky");
		this.prevBgVal = 0;
		this.bgVal = 0;
		this.endBackground = document.getElementById("vvvvv-end");
		this.moon = document.getElementById("vvvvv-moon");

		////
		this.score = 0;
		this.currentBoost = 0;
		this.prevBoost = 0;
		this.currentTime = 0;

		this.startTime = 0;
		this.now = 0;

		this.gameTime = 0;
		this.prevGameTime = 0;

		this.initCanvas();
	},

	initCanvas: function() {
		this.canvas = document.getElementById("canvas-scores");
		this.canvas.width = 320;
		this.canvas.height = 50;
		this.ctx = this.canvas.getContext('2d');
	},

	start: function() {
		this.startTime = new Date();

	},

	bonus: function(effect) {
		//effect is a number depending of the bonus
		if(GLOBAL_VARS.ACCELERATION < GLOBAL_VARS.MAX_ACCELERATION) {
			GLOBAL_VARS.ACCELERATION += effect;
		}
	},

	malus: function(effect) {
		//effect is a number depending of the malus
		if(GLOBAL_VARS.ACCELERATION > 0) {
			GLOBAL_VARS.ACCELERATION -= effect;
		}
	},

	/////////TIMING FUNCTIONS

	//Updates the normal time since the player started playing
	updateCurrentTime: function(){

			this.now = new Date();
			GLOBAL_VARS.CURRENT_TIME = (this.now - this.startTime )/1000; // time in seconds
			if(GLOBAL_VARS.GAME_ENDED === false){
				this.currentTime = (GLOBAL_VARS.CURRENT_TIME).toString().slice(0, -1);
			}
	},

	updateGameTime: function(delta){
		if(GLOBAL_VARS.ACCELERATION < GLOBAL_VARS.MAX_ACCELERATION){
			//Slight gobal acceleration over time -- gravitation force ;)

			if(GLOBAL_VARS.GAME_ENDED === false){
				GLOBAL_VARS.ACCELERATION += GLOBAL_VARS.CURRENT_TIME/25000;
			}

		}

		if(this.gameTime < GLOBAL_VARS.MAX_GAME_TIME){
			//Game TIME --> Accelerated time depending of maluses / bonuses
			this.gameTime = (this.prevGameTime + GLOBAL_VARS.ACCELERATION * delta);
			this.prevGameTime = this.gameTime;
		}else{
			if(!GLOBAL_VARS.GAME_ENDED){

				//The game is Over !!!
				GLOBAL_VARS.ACCELERATION = 1;
				this.stop();
			}
		}
	},

	stop : function(){
		GLOBAL_VARS.GAME_ENDED = true;
		VVVVV.Menus.showEnd(this.currentTime);
	},

	updateBackground: function(delta){
		this.i ++;

		//4000 max
		this.bgVal = (0.5 + ((this.gameTime*465) / GLOBAL_VARS.MAX_GAME_TIME)) << 0;
		this.prevBgVal = this.bgVal;

		this.background.style.top = -this.bgVal+"px";
		this.endBackground.style.top = (945-237) - this.bgVal+"px";

		this.moon.style.top =  (540 -(0.5 + (this.bgVal)) <<0) +"px";

	},

	step: function(delta) {

		if(GLOBAL_VARS.GAME_STARTED === true){

			this.updateCurrentTime();
			this.updateGameTime(delta);
			if(GLOBAL_VARS.GAME_ENDED === false){
				this.updateBackground();
			}

			//BOOST //max 56px
			this.currentBoost += (GLOBAL_VARS.ACCELERATION * (56 / GLOBAL_VARS.MAX_ACCELERATION) - this.prevBoost) * 1 / 10; //5px per 0,5 acceleration
			this.prevBoost = this.currentBoost;
			this.currentTime = this.currentTime.replace(".", ":");
		}

		this.draw();
	},

	draw: function() {

		//TODO :: Step some useless frames
		this.ctx.clearRect(0, 0, 320, 50);

		//SCORE
		this.ctx.font = "12px 'OCRAStd'";
		this.ctx.fillStyle = "#ECF1E5";
		this.ctx.fillText(this.currentTime, CONSTS.CANVAS_WIDTH - 65, 41);

		this.ctx.fillStyle = "#3F5E7C";
		this.ctx.fillRect(170, 30, this.currentBoost, 12);

	}

};