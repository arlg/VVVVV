/*
 * BackClouds Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// BackClouds
// ----------------------------------------

function BackClouds(ctx) {
	this.init(ctx);
}

BackClouds.prototype = {
	init: function(ctx){
		this.ctx = ctx;

		this.clouds = [];

		this.currentStep = 0;
		
		this.linearSpeed = -150;

		if(CONSTS.IS_MOBILE === true){
			this.cloudsNb = 50;
		}else{
			this.cloudsNb = 100;
		}

		for (var i = this.cloudsNb  - 1; i >= 0; i--) {
			//0 : X, 1 : Y, 2 : Diameter, 3 : Opacity, 4 : amplitude, 5 : period, 6 : origin X
			this.clouds.push(
				[random(0, CONSTS.CANVAS_WIDTH),
				random(0, CONSTS.CANVAS_HEIGHT),
				random(0, 2),
				random(0.3, 0.8),
				random(5, 10),
				random(2000, 5000),
				random(0, CONSTS.CANVAS_WIDTH)
				]);
		}
	},

	step : function(delta){

		this.currentStep+= delta;

		if(GLOBAL_VARS.GAME_ENDED === false && GLOBAL_VARS.GAME_STARTED === true ){
			for(var i = 0; i < this.cloudsNb ; i++) {

				this.clouds[i][1] += this.linearSpeed * delta;

				if((this.clouds[i][1] + this.clouds[i][2]) < 0) {
					this.clouds[i][0] = random(0, CONSTS.CANVAS_WIDTH);
					this.clouds[i][2] = random(0, 2);
					this.clouds[i][1] = CONSTS.CANVAS_HEIGHT + this.clouds[i][2];
					this.clouds[i][3] = random(0.2, 0.5);
				}
			}

			for(var w = this.cloudsNb -1; w >= 0; w--) {
				this.clouds[w][0] = this.clouds[w][4] * Math.sin( (this.currentStep * 1000)* 2 * Math.PI / this.clouds[w][5]) + this.clouds[w][6];
			}
		}

		/*
		if(GLOBAL_VARS.GAME_STARTED === false){
			for(var j = this.cloudsNb -1; j >= 0; j--) {

				this.clouds[j][0] -= this.linearSpeed * delta;

				if(this.clouds[j][0] + this.clouds[j][2] > CONSTS.CANVAS_WIDTH) {
	 
					this.clouds[j][0] = 0 - + this.clouds[j][2];
					this.clouds[j][1] = random(0, CONSTS.CANVAS_HEIGHT);
					this.clouds[j][2] = random(0, 2);
					this.clouds[j][3] = random(0.2, 0.5);
				}
			}
		}*/

		if(GLOBAL_VARS.GAME_ENDED === true || GLOBAL_VARS.GAME_STARTED === false){
			for(var v = this.cloudsNb -1; v >= 0; v--) {

				this.clouds[v][1] -= this.linearSpeed/2 * delta;

				if((this.clouds[v][1] + this.clouds[v][2]) > CONSTS.CANVAS_HEIGHT) {
					this.clouds[v][0] = random(0, CONSTS.CANVAS_WIDTH);
					this.clouds[v][2] = random(0, 2);
					this.clouds[v][1] = 0 - this.clouds[v][2];
					this.clouds[v][3] = random(0.2, 0.5);
				}
			}

			for(var p = this.cloudsNb -1; p >= 0; p--) {
				this.clouds[p][0] = this.clouds[p][4] * Math.sin( (this.currentStep * 1000)* 2 * Math.PI / this.clouds[p][5]) + this.clouds[p][6];
			}
		}

		this.draw();

	},

	draw : function() {
		for(var i = 0; i < this.cloudsNb ; i++) {

			//Random flashing
			this.clouds[i][3] = (i > 50 && i < 60) ? random(0.1, 0.9) : this.clouds[i][3];

			this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.clouds[i][3] + ')'; //

			this.ctx.beginPath();
			this.ctx.arc(this.clouds[i][0], this.clouds[i][1], this.clouds[i][2], 0, TWO_PI, true);
			this.ctx.closePath();
			this.ctx.fill();
		}
	}
};