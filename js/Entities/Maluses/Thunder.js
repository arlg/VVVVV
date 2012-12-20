/*
 * Thunder Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// Thunder
// ----------------------------------------

function Thunder(ctx) {
	this.init(ctx);
}

Thunder.prototype = {

	init: function(ctx){
		this.ctx = ctx;
		this.X = 0;
		this. Y = 0;
		this.origX =0;
		this.width = 68;
		this.height = 43;
		this.spriteUrl = "assets/graphics/malus/thunder.png";

		this.totalFrames = 2; //real number -1
		this.actualFrame = 0;
		this.actualInterval = 0;
		this.maxInterval = (0.5 + random(10, 20)) <<0;   //Changing speed

		this.linearSpeedX = random(15, 30);
		this.linearSpeedY = random(-80, -100);

		//Flags
		this.hasCollided = false;

		//Special stuffs - Oscillation
		this.amplitude = random(50, 180);
		this.period = random(5000, 8000);

		//We wait before spawning this again
		this.spawnInterval = 0;
		this.spawnMaxInterval = random(2, 10);
		this.hasToDraw = true;

		//EFFECTS
		this.effect = 0.45;

		this.isOscillated = (0.5 + random(0, 2)) <<0;

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
		this.setPosition((0.5+ random(0, CONSTS.CANVAS_WIDTH))<<0, CONSTS.CANVAS_HEIGHT + this.height);
	},

	onCollision : function(){
		if(this.hasCollided === false)
			this.hasCollided = true;
	},

	updateBoundingBox: function(){
		this.LEFT = this.X + 18;
		this.TOP = this.Y + 10;
	},

	step : function(delta){

			if(this.Y + this.height < 0) {
				//Checks if we can spawn it again, desactivates drawing 
				this.spawnInterval += delta;
				this.hasToDraw = false;
				if(this.spawnInterval > this.spawnMaxInterval) {
					this.setInitialPosition();
					this.hasCollided = false;
					this.hasToDraw = true;
					this.spawnInterval = 0;
				}
			} else {

				this.Y += delta * this.linearSpeedY;
				this.X += delta * this.linearSpeedX;

				if(this.isOscillated == 1){
					this.X = this.amplitude * Math.sin( (GLOBAL_VARS.CURRENT_TIME * 1000)* 2 * Math.PI / this.period) + this.origX;
					//this.X = this.amplitude * Math.sin( (GLOBAL_VARS.CURRENT_TIME * 1000)* 2 * Math.PI / this.period) + this.origX;
					//this.prevX = this.X;
				}
			}

			//Sprite animation
			if(this.actualInterval == this.maxInterval) {
				if(this.actualFrame == this.totalFrames) {
					this.actualFrame = 0;
				} else {
					this.actualFrame++;
				}
				this.actualInterval = 0;
			}
			this.actualInterval++;

			this.updateBoundingBox();
			
	},

	draw : function() {
		if(this.hasCollided === true) this.ctx.globalAlpha = 0.1;
		this.ctx.drawImage(this.sprite, 0, this.height * this.actualFrame, this.width, this.height, this.X, this.Y, this.width, this.height);
		if(this.hasCollided === true) this.ctx.globalAlpha = 1;
	}

	// destroy ??
	
};
