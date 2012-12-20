/*
 * MidCloud Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// MidCloud
// ----------------------------------------

//This function can have 3 different assets

function MidCloud(ctx) {
	this.init(ctx);
}

MidCloud.prototype = {

	init: function(ctx){
		this.ctx = ctx;
		this.cNb = 0; //Cloud number
		this.X = 0;
		this. Y = 0;
	
		//this.scale = 0;
		// 0 : width , 1 : height, 2 : url
		this.cloudsData = [
			[
				13, 12, "assets/graphics/clouds/mid-cloud-1.png"
			],
			[
				25, 23, "assets/graphics/clouds/mid-cloud-2.png"
			],
			[
				85, 47, "assets/graphics/clouds/mid-cloud-3.png"
			]
		];

		this.linearSpeedY = random(-40, -120);
		this.linearSpeedX = random(20, 50);

		this.cNb = (0.5 + random(0, 2)) <<0;

		this.loadAsset();
		this.setInitialPosition();

	},

	loadAsset : function() {
		this.sprite = new Image();
		this.sprite.src = this.cloudsData[this.cNb][2];
	},

	changeAsset : function(){
		this.sprite.src = this.cloudsData[this.cNb][2];
	},

	setPosition : function(x, y) {
		this.X = x;
		this.Y = y;
	},

	setInitialPosition: function(){
		if(GLOBAL_VARS.GAME_STARTED === true){
			this.setPosition(random(0, CONSTS.CANVAS_WIDTH), CONSTS.CANVAS_HEIGHT + this.cloudsData[this.cNb][1] + random(0, 300));
		}

		if(GLOBAL_VARS.GAME_STARTED === false){
			this.setPosition(random(-100, 0) - this.cloudsData[this.cNb][0], random(0, CONSTS.CANVAS_HEIGHT));
		}
	},

	step : function(delta){
		if(GLOBAL_VARS.GAME_STARTED === true && GLOBAL_VARS.GAME_ENDED=== false){

			if(this.Y + this.cloudsData[this.cNb][1] < 0) {
				this.setInitialPosition();
			
				this.cNb = (0.5 + random(0, 2)) <<0;

				//TODO :: I dunno if its good to do this
				this.changeAsset();

			} else {
				this.Y += this.linearSpeedY * delta;
			}

		}

		if(GLOBAL_VARS.GAME_STARTED === false){

			if(this.X - this.cloudsData[this.cNb][1] > CONSTS.CANVAS_WIDTH) {
				this.setInitialPosition();
			
				this.cNb = (0.5 + random(0, 2)) <<0;

				//TODO :: I dunno if its good to do this
				this.changeAsset();
			} else {
				this.X -= this.linearSpeedY * delta;
			}
		}

		this.draw();
	},

	draw : function() {

		this.ctx.drawImage(this.sprite, this.X, this.Y, this.cloudsData[this.cNb][0],this.cloudsData[this.cNb][1]);
	}
	
};
