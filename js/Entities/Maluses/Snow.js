/*
 * Snow Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// Snow
// ----------------------------------------

function Snow(ctx) {
	this.init(ctx);
}

Snow.prototype = {

	init: function(ctx) {
		this.ctx = ctx;
		this.X = 0;
		this.Y = 0;
		this.width = 114;
		this.height = 74;
		this.spriteUrl = "assets/graphics/malus/john-snow.png";

		this.totalFrames = 2; //real number -1
		this.actualFrame = 0;
		this.actualInterval = 0;
		this.maxInterval = (0.5 + random(30, 40)) << 0; //Changing speed
		this.linearSpeed = random(-100, -120);

		//Flags
		this.hasCollided = false;

		//We wait before spawning this again
		this.spawnInterval = 0;
		this.spawnMaxInterval = random(1, 10);
		this.hasToDraw = true; //We don't draw if it's offscreen
		
		//EFFECTS
		this.effect = 0.1;

		/*
			Bounding box
		*/
		this.LEFT = this.TOP = 0;
		this.RIGHT = this.width - 40;
		this.BOTTOM = this.height - 20;

		this.loadAsset();
		this.setInitialPosition();

	},

	loadAsset: function() {
		this.sprite = new Image();
		this.sprite.src = this.spriteUrl;
	},

	setPosition: function(x, y) {
		this.X = x;
		this.Y = y;
	},

	setInitialPosition: function() {
		this.setPosition((0.5 + Math.random() * CONSTS.CANVAS_WIDTH) << 0, CONSTS.CANVAS_HEIGHT + 32);
	},

	onCollision: function() {
		if(this.hasCollided === false) this.hasCollided = true;
	},

	updateBoundingBox: function() {
		this.LEFT = this.X + 23;
		this.TOP = this.Y + 10;
	},

	step: function(delta) {

		//If math.random :: generate enemy
		//x, y, width, height, frames: 4, actualFrame : 5, currentInterval : 6,maxInterval : 7
		//If he is offscreen on top, replace at the bottom
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
			//move sprite deltaY pixels up
			this.Y += this.linearSpeed * delta;
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

	draw: function() {
		if(this.hasCollided === true) this.ctx.globalAlpha = 0.1;
		this.ctx.drawImage(this.sprite, 0, this.height * this.actualFrame, this.width, this.height, this.X, this.Y, this.width, this.height);
		if(this.hasCollided === true) this.ctx.globalAlpha = 1;
	}

};