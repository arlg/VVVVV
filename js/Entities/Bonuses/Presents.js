/*
 * Hood Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// Hood
// ----------------------------------------

function Presents(ctx) {
	this.init(ctx);
}

Presents.prototype = {

	init: function(ctx){
		this.ctx = ctx;
		this.X = 0;
		this. Y = 0;
		this.width = 47;
		this.height = 61;
		this.spriteUrl = "assets/graphics/bonus/presents.png";


		this.actualFrame = 0;

		//We wait before spawning this again
		this.spawnInterval = 0;
		this.spawnMaxInterval = random(1, 2);
		this.hasToDraw = true;

		//Flags
		this.hasCollided = false;

		//EFFECTS
		this.effect = 0.1;

		this.linearSpeed = random(-30, -70);

		/*
			Bounding box
		*/
		this.LEFT = this.TOP = 0;
		this.RIGHT = this.width - 5;
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
		this.LEFT = this.X + 5;
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

			this.updateBoundingBox();
	},

	draw : function() {
		if(this.hasCollided === true) this.ctx.globalAlpha = 0.1;
		this.ctx.drawImage(this.sprite, 0, this.height * this.actualFrame, this.width, this.height, this.X, this.Y, this.width, this.height);
		if(this.hasCollided === true) this.ctx.globalAlpha = 1;
	}
};
