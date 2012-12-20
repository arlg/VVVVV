/*
 * FrontCloud Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// FrontCloud
// ----------------------------------------

function FrontCloud(ctx) {
	this.init(ctx);
}

FrontCloud.prototype = {

	init: function(ctx){
		this.ctx = ctx;
		this.X = 0;
		this. Y = 0;
		this.width = 228;
		this.height = 110;
		this.spriteUrl = "assets/graphics/clouds/front-cloud.png";

		
		this.X = 0;
		this.Y = 0;
		this.scale = 0;
		this.linearSpeedY = random(-10, -20);
		this.linearSpeedX = random(40, 60);

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
		this.scale = random(0.5, 1); // need to know it now
		this.setPosition(0 - this.width * this.scale, random(CONSTS.CANVAS_HEIGHT / 4, CONSTS.CANVAS_HEIGHT));
	},

	step : function(delta){

		if(this.Y + this.height < 0 || this.W + this.width * this.scale < CONSTS.CANVAS_WIDTH) {
			this.setInitialPosition();
		} else {
			this.Y += delta * this.linearSpeedY;
			this.X += delta * this.linearSpeedX;
		}

		this.draw();
	},

	draw : function() {
		// console.log(this.X + " "+this.Y);
		this.ctx.drawImage(this.sprite, this.X, this.Y, this.scale * this.width, this.scale * this.height);
	}

	// destroy ??
	
};
