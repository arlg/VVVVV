/*
 * RangiferTarandus Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// RangiferTarandus
// ----------------------------------------

function RangiferTarandus(ctx) {
	this.init(ctx);
}

RangiferTarandus.prototype = {

	init: function(ctx){
		this.ctx = ctx;
		this.X = 0;
		this. Y = 0;
		this.width = 64;
		this.height = 35;
		this.spriteUrl = "assets/graphics/bonus/rangifertarandus.png";

		this.actualFrame = 0;

		//We wait before spawning this again
		this.spawnInterval = 0;
		this.spawnMaxInterval = random(2, 12);
		this.hasToDraw = true;

		//Flags
		this.hasCollided = false;

		//EFFECTS
		this.effect = 0.4;

		//Special stuffs - Oscillation
		this.origX = 0;
		this.amplitude = random(50, 70);
		this.period = random(800, 1000);

		this.linearSpeed = random(-120, -170);

		/*
			Bounding box
		*/
		this.LEFT = this.TOP = 0;
		this.RIGHT = this.width - 35;
		this.BOTTOM = this.height - 20;

		this.loadAsset();
		this.setInitialPosition();

	},

	loadAsset : function() {
		this.sprite = new Image();
		this.sprite.src = this.spriteUrl;
	},

	setPosition : function(x, y) {
		this.X = x;
		this.origX = x;
		this.Y = y;
	},

	setInitialPosition: function(){
		this.setPosition((0.5+Math.random() * CONSTS.CANVAS_WIDTH)<<0, CONSTS.CANVAS_HEIGHT + 32);
	},

	onCollision : function(){
		if(this.hasCollided === false){
			this.hasCollided = true;
			GLOBAL_VARS.ACCELERATION = 3;
		}

	},

	updateBoundingBox: function(){
		this.LEFT = this.X + 18;
		this.TOP = this.Y + 10;
	},

	step : function(delta){

		if(this.Y + this.height < 0) {

			this.spawnInterval += delta;
			this.hasToDraw = false;
			if(this.spawnInterval > this.spawnMaxInterval ){
				this.setInitialPosition();
				this.hasCollided = false;
				this.hasToDraw = true;
				this.spawnInterval = 0;
			}
		} else {
			this.X = this.amplitude * Math.sin( (GLOBAL_VARS.CURRENT_TIME * 1000)* 2 * Math.PI / this.period) + this.origX;
			this.Y += this.linearSpeed * delta;
		}

		this.updateBoundingBox();
			
	},

	draw : function() {
		if(this.hasCollided === true) this.ctx.globalAlpha = 0.1;
		this.ctx.drawImage(this.sprite, 0, this.height * this.actualFrame, this.width, this.height, this.X, this.Y, this.width, this.height);
		if(this.hasCollided === true) this.ctx.globalAlpha = 1;
	}
};
