/*
 * Bonuses Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// BONUSES
// ----------------------------------------

function Bonuses(ctx) {
	this.init(ctx);
}

Bonuses.prototype = {

	init: function(ctx){
		this.ctx = ctx;
		this.bonusesEntities = [];

		this.initialiseBonuses();
	},

	initialiseBonuses : function(){

		for (var i = 2 - 1; i >= 0; i--) {
			var rangifer = new RangiferTarandus(this.ctx);
			//Ugly first positioning so all elements doesn't come in the same time
			rangifer.Y = CONSTS.CANVAS_HEIGHT + rangifer.height + random(0, 500);
			this.bonusesEntities.push(rangifer);
		}
		
		for (var j = 3 - 1; j >= 0; j--) {
			var hood = new Hood(this.ctx);
			hood.Y = CONSTS.CANVAS_HEIGHT + hood.height + random(0, 400);
			this.bonusesEntities.push(hood);
		}

		for (var z = 4 - 1; z >= 0; z--) {
			var presents = new Presents(this.ctx);
			presents.Y = CONSTS.CANVAS_HEIGHT + presents.height + random(100, 300);
			this.bonusesEntities.push(presents);
		}

	},

	step : function(delta){
		for (var i = this.bonusesEntities.length - 1; i >= 0; i--) {
			//Update bonuses
			this.bonusesEntities[i].step(delta);
			if(this.bonusesEntities[i].hasToDraw === true){
				this.bonusesEntities[i].draw();
			}
		}
	},

	draw : function() {
		
	}

};
