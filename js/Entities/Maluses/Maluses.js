/*
 * Maluses Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// Maluses
// ----------------------------------------
// Manages all Maluses Entities

function Maluses(ctx) {
	this.init(ctx);
}

Maluses.prototype = {

	init: function(ctx){
		this.ctx = ctx;
		this.malusesEntities = [];

		this.initMaluses();

	},

	initMaluses: function(){

		for (var i = 3 - 1; i >= 0; i--) {
			var snow = new Snow(this.ctx);
			//Ugly first positioning so all elements doesn't come in the same time
			snow.Y = CONSTS.CANVAS_HEIGHT + snow.height + random(0, 400);

			this.malusesEntities.push(snow);
		}
		
		for (var j = 3 - 1; j >= 0; j--) {
			var yeti = new Yeti(this.ctx);
			yeti.Y = CONSTS.CANVAS_HEIGHT + random(100, 500);
			this.malusesEntities.push(yeti);
		}

		for (var z = 4 - 1; z >= 0; z--) {
			var thunder = new Thunder(this.ctx);
			thunder.Y = CONSTS.CANVAS_HEIGHT + thunder.height + random(0, 400);
			this.malusesEntities.push(thunder);
		}
		
	},

	step : function(delta){
		for (var i = this.malusesEntities.length - 1; i >= 0; i--) {
			//Update bonuses
			this.malusesEntities[i].step(delta);
			if(this.malusesEntities[i].hasToDraw === true){
				this.malusesEntities[i].draw();
			}
		}
	}
	
};
