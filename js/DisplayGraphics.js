/*
 * Display Graphics Class
 * @author aurelieng http://www.arlg.me
 */

// ----------------------------------------
// DISPLAY GRAPHICS
// ----------------------------------------

function DisplayGraphics(ctx) {
	this.init(ctx);
}

DisplayGraphics.prototype = {

	init: function(ctx){

		this.ctx = ctx;
		this.i = 0;

		this.buildGame();

	},

	startGame: function(){
		this.score.start();
	},

	buildGame : function(){
		this.clouds = new Clouds(this.ctx);
		this.santa = new Santa(this.ctx);
		this.maluses = new Maluses(this.ctx);
		this.bonuses = new Bonuses(this.ctx);

		this.score = new Score(this.ctx);
	},

	checkCollisions: function(){


		/////GRAPHIC DEBUG COLLISIONS

			//Santa
			if(DEBUG_COLLISIONS === true){
				this.ctx.beginPath();
				this.ctx.moveTo(this.santa.LEFT,  this.santa.TOP);
				this.ctx.lineTo(this.santa.LEFT + this.santa.RIGHT, this.santa.TOP);
				this.ctx.lineTo(this.santa.LEFT + this.santa.RIGHT, this.santa.TOP + this.santa.BOTTOM);
				this.ctx.lineTo(this.santa.LEFT , this.santa.TOP + this.santa.BOTTOM);
				this.ctx.closePath();
				this.ctx.stroke();
			}


		//Check Collisions between Santa and all flying objects
		//Bonus array / Malus array <-> Santa
		for (var i = this.maluses.malusesEntities.length - 1; i >= 0; i--) {


			if(DEBUG_COLLISIONS === true){
				this.ctx.beginPath();
				this.ctx.moveTo(this.maluses.malusesEntities[i].LEFT,  this.maluses.malusesEntities[i].TOP);
				this.ctx.lineTo(this.maluses.malusesEntities[i].LEFT + this.maluses.malusesEntities[i].RIGHT, this.maluses.malusesEntities[i].TOP);
				this.ctx.lineTo(this.maluses.malusesEntities[i].LEFT + this.maluses.malusesEntities[i].RIGHT,  this.maluses.malusesEntities[i].TOP +  this.maluses.malusesEntities[i].BOTTOM);
				this.ctx.lineTo(this.maluses.malusesEntities[i].LEFT, this.maluses.malusesEntities[i].TOP +  this.maluses.malusesEntities[i].BOTTOM);
				this.ctx.closePath();
				this.ctx.stroke();
			}


			if(this.maluses.malusesEntities[i].hasCollided === false){
				if((this.santa.LEFT < (this.maluses.malusesEntities[i].LEFT + this.maluses.malusesEntities[i].RIGHT)) 
					&& ((this.santa.LEFT + this.santa.RIGHT) > this.maluses.malusesEntities[i].LEFT) 
					&& (this.santa.TOP < (this.maluses.malusesEntities[i].TOP + this.maluses.malusesEntities[i].BOTTOM)) 
					&& ((this.santa.TOP + this.santa.BOTTOM) > this.maluses.malusesEntities[i].TOP)){



					this.maluses.malusesEntities[i].hasCollided = true;
					this.score.malus(this.maluses.malusesEntities[i].effect);
					this.santa.malus();

						if(CONSTS.IS_MOBILE === false){
						//Sound
						var r = (0.5 + random(1, 3)) <<0;
						VVVVV.SoundManager.play('malus'+r);
					}
					break;


				}
			}
		}

		for (var j = this.bonuses.bonusesEntities.length - 1; j >= 0; j--) {

			if(DEBUG_COLLISIONS === true){
				this.ctx.beginPath();
				this.ctx.moveTo(this.bonuses.bonusesEntities[j].LEFT,  this.bonuses.bonusesEntities[j].TOP);
				this.ctx.lineTo(this.bonuses.bonusesEntities[j].LEFT + this.bonuses.bonusesEntities[j].RIGHT, this.bonuses.bonusesEntities[j].TOP);
				this.ctx.lineTo(this.bonuses.bonusesEntities[j].LEFT + this.bonuses.bonusesEntities[j].RIGHT,  this.bonuses.bonusesEntities[j].TOP +  this.bonuses.bonusesEntities[j].BOTTOM);
				this.ctx.lineTo(this.bonuses.bonusesEntities[j].LEFT, this.bonuses.bonusesEntities[j].TOP +  this.bonuses.bonusesEntities[j].BOTTOM);
				this.ctx.closePath();
				this.ctx.stroke();
			}

			if(this.bonuses.bonusesEntities[j].hasCollided === false){

				if((this.santa.LEFT < (this.bonuses.bonusesEntities[j].LEFT + this.bonuses.bonusesEntities[j].RIGHT)) 
					&& ((this.santa.LEFT + this.santa.RIGHT) > this.bonuses.bonusesEntities[j].LEFT) 
					&& (this.santa.TOP < (this.bonuses.bonusesEntities[j].TOP + this.bonuses.bonusesEntities[j].BOTTOM)) 
					&& ((this.santa.TOP + this.santa.BOTTOM) > this.bonuses.bonusesEntities[j].TOP)){
					
					this.bonuses.bonusesEntities[j].hasCollided = true;
					this.score.bonus(this.bonuses.bonusesEntities[j].effect);
					this.santa.bonus();

					if(CONSTS.IS_MOBILE === false){
						//Sound
						var randomnumber = (0.5 + random(1, 3)) <<0;
						VVVVV.SoundManager.play('bonus'+randomnumber);
					}
					break;
				}
			}
		}
	},

	step : function(delta) {

		this.clouds.step(delta);
		
		if(GLOBAL_VARS.GAME_STARTED === true){

			this.santa.step(delta);

			this.score.step(delta);

			if(GLOBAL_VARS.GAME_ENDED === false){

				//Dispatch draw event to childs
				
				this.maluses.step(delta);
				this.bonuses.step(delta);
				this.checkCollisions();
			}

		}
	}
};