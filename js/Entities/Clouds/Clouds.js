/*
 * Clouds Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// CLOUDS
// ----------------------------------------

function Clouds(ctx) {
	this.init(ctx);
}

Clouds.prototype = {
	init: function(ctx){
		this.ctx = ctx;
		this.frontClouds = [];
		this.backClouds  = 0;
		this.midClouds   = [];

		this.frontCloudsNb = 2;
		this.midCloudsNb = 10;

		this.initClouds();

	},

	initClouds: function(){
		for (var i = this.frontCloudsNb - 1; i >= 0; i--) {
			var frontCloud = new FrontCloud(this.ctx);
			this.frontClouds.push(frontCloud);
		}

		for (var j = this.midCloudsNb - 1; j >= 0; j--) {
			var midCloud = new MidCloud(this.ctx);
			this.midClouds.push(midCloud);
		}

		this.backClouds = new BackClouds(this.ctx);

	},

	

	step : function(delta){

		for (var i = this.frontCloudsNb - 1; i >= 0; i--) {

			this.frontClouds[i].step(delta);

		}

		for (var j = this.midCloudsNb - 1; j >= 0; j--) {

			this.midClouds[j].step(delta);

		}

		this.backClouds.step(delta);

	}
};