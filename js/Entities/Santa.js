/*
 * Santa Graphic Class
 * @author aurelieng http://www.arlg.me
 */


// ----------------------------------------
// SANTA
// ----------------------------------------

function Santa(ctx) {
	this.init(ctx);
}

Santa.prototype = {

	init: function(ctx) {
		this.ctx = ctx;
		this.width = 79;
		this.height = 80;
		this.X = 0;
		this.Y = 0;

		this.direction = 0; //0 : Falling , 1 : LEFT, 2 : RIGHT
		this.totalFrames = 1; //real number -1
		this.actualFrame = 0;
		this.actualInterval = 0;
		this.maxInterval = 10; //Changing speed
		this.finalX = 0;

		/*
			Bounding box
		*/
		this.LEFT = this.TOP = 0;
		this.RIGHT = this.width - 35;
		this.BOTTOM = this.height - 20;


		//game
		this.hasBonus = this.hasMalus = false;
		this.nbFramesAffected = 0;
		this.boxShadow = document.getElementById("vvvvv");


		this.loadAsset();
		this.positionSantaStart();
		this.initListeners();
	},


	loadAsset: function() {
		this.sprite = new Image();
		this.sprite.src = "assets/graphics/santa/santafly.png";
	},

	setPosition: function(x, y) {
		this.X = x;
		this.Y = y;
	},

	positionSantaStart: function() {
		this.setPosition((0.5 + (CONSTS.CANVAS_WIDTH - this.width) / 2) << 0, (0.5 +this.height) << 0);
	},

	updateBoundingBox: function(){
		this.LEFT = this.X + 18;
		this.TOP = this.Y + 10;
	},

	//Moving
	goLeft: function(e) {
		if(this.X > 0) {
			var prevX = this.X;
			this.X += (e - prevX - this.width/2)*1/10;
		}
	},

	goRight: function(e) {
		if(this.X + this.width < CONSTS.CANVAS_WIDTH) {
			var prevX = this.X;
			this.X += (e - prevX + this.width/2)*1/10;
		}
	},

	malus: function(){
		this.hasMalus = true;
		this.boxShadow.className = "malus";
	},

	bonus: function(){
		this.hasBonus = true;
		this.boxShadow.className = "bonus";
	},

	initListeners: function() {
		var that = this;


		if(CONSTS.IS_MOBILE === false){
			document.getElementById("vvvvv").onmousemove = function(e) {

				var mouseX = 0;

				if(e.offsetX) {
					mouseX = e.offsetX;
				} else if(e.layerX) {
					mouseX = e.layerX;
				}

				if(that.X + that.width / 2 > mouseX) {
					that.goLeft(mouseX - that.width/2);
					that.direction = 1;

				} else if((that.X + that.width / 2) < mouseX) {
					that.goRight(mouseX - that.width/2);
					that.direction = 2;
				}
			};
		}else{

			window.ondevicemotion = function(event) {
				var accelerationX = event.accelerationIncludingGravity.x;

				var prevX = that.X;

				if(accelerationX < 0) {
					if(that.X > 0) {
						that.X += (accelerationX*50 - prevX + that.width/2)*1/5;
						that.direction = 1;
					}

				}else if(accelerationX > 0){
					if(that.X + that.width < CONSTS.CANVAS_WIDTH) {
						that.X += (accelerationX*50 - prevX + that.width/2)*1/5;
						that.direction = 2;
					}
				}
			};
		}
	},

	step: function(delta) {

		//Sprites animation
		/////// MALUS / BONUS
		if(this.hasMalus === true || this.hasBonus === true){

			if(this.hasMalus === true){
				this.actualFrame = 5;
				this.nbFramesAffected++;
				if(this.nbFramesAffected > 20 || this.hasBonus === true){
					this.nbFramesAffected = 0;
					this.hasMalus = false;
					this.boxShadow.className = "";
				}
			}else{
				this.actualFrame = 4;
				this.nbFramesAffected++;
				if(this.nbFramesAffected > 20 || this.hasMalus === true){
					this.nbFramesAffected = 0;
					this.hasBonus = false;
					this.boxShadow.className = "";
				}
			}

		}else{
			/////// STRAIGHT AWAY
			if(this.direction === 0) {

				if(this.actualFrame >1) this.actualFrame = 0;

				if(this.actualInterval == this.maxInterval) {
					if(this.actualFrame == this.totalFrames) {
						this.actualFrame = 0;
					} else {
						this.actualFrame++;
					}
					this.actualInterval = 0;
				}
				this.actualInterval++;
			/////// LEFT / RIGHT
			}else {
				if(this.direction === 2) {
					this.actualFrame = 3;
				} else if(this.direction === 1) {
					this.actualFrame = 2;
				}
			}

		}

		this.direction = 0;


		if(GLOBAL_VARS.GAME_ENDED === true){
			//console.log("dd");
			this.Y += 250 * delta;
			//console.log(this.Y);
			window.onmousemove = function(e) {return false;};
		}

		this.updateBoundingBox();

		//Draws the new position
		this.draw();
	},

	draw: function() {
		try {
			this.ctx.drawImage(this.sprite, 0, this.height * this.actualFrame, this.width, this.height, this.X, this.Y, this.width, this.height);
		} catch(e) {}
	}

};