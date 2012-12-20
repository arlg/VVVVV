/*
 * Yeti Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// Yeti
// ----------------------------------------

function Yeti(ctx) {
	this.init(ctx);
}

Yeti.prototype = {

	init: function(ctx){
		this.ctx = ctx;
		this.X = 0;
		this.origX = 0;
		this. Y = 0;
		this.width = 52;
		this.height = 68;
		this.spriteUrl = "assets/graphics/malus/yeti.png";

		this.totalFrames = 2; //real number -1
		this.actualFrame = 0;
		this.actualInterval = 0;
		this.maxInterval = (0.5 + Math.random()*30) <<0;   //Changing speed

		//We wait before spawning this again
		this.spawnInterval = 0;
		this.spawnMaxInterval = random(2, 10);
		this.hasToDraw = true; //We don't draw if it's offscreen

		this.linearSpeed = random(-100, -120);

		//Flags
		this.hasCollided = false;



		//EFFECTS
		this.effect = 0.25;

		//Special stuffs - Oscillation
		this.amplitude = random(15, 20);
		this.period = random(1000, 2000);
		

		/*
			Bounding box
		*/
		this.LEFT = this.TOP = 0;
		this.RIGHT = this.width - 25;
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
		if(this.hasCollided === false)
			this.hasCollided = true;
	},

	updateBoundingBox: function(){
		this.LEFT = this.X + 12;
		this.TOP = this.Y + 10;
	},

	step : function(delta){
			//If he is offscreen on top, replace at the bottom
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

				this.Y += this.linearSpeed * delta;
			}

			this.X = this.amplitude * Math.sin( (GLOBAL_VARS.CURRENT_TIME * 1000)* 2 * Math.PI / this.period) + this.origX;

			this.updateBoundingBox();

	},

	draw : function() {
		if(this.hasCollided === true) this.ctx.globalAlpha = 0.1;
			

			this.ctx.drawImage(this.sprite, 0, this.height * this.actualFrame, this.width, this.height, this.X, this.Y, this.width, this.height);
		
		if(this.hasCollided === true) this.ctx.globalAlpha = 1;
	}
};
