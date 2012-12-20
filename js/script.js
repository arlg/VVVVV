function DisplayGraphics(a){this.init(a)}
DisplayGraphics.prototype={init:function(a){this.ctx=a;this.i=0;this.buildGame()},startGame:function(){this.score.start()},buildGame:function(){this.clouds=new Clouds(this.ctx);this.santa=new Santa(this.ctx);this.maluses=new Maluses(this.ctx);this.bonuses=new Bonuses(this.ctx);this.score=new Score(this.ctx)},checkCollisions:function(){!0===DEBUG_COLLISIONS&&(this.ctx.beginPath(),this.ctx.moveTo(this.santa.LEFT,this.santa.TOP),this.ctx.lineTo(this.santa.LEFT+this.santa.RIGHT,this.santa.TOP),this.ctx.lineTo(this.santa.LEFT+
this.santa.RIGHT,this.santa.TOP+this.santa.BOTTOM),this.ctx.lineTo(this.santa.LEFT,this.santa.TOP+this.santa.BOTTOM),this.ctx.closePath(),this.ctx.stroke());for(var a=this.maluses.malusesEntities.length-1;0<=a;a--)if(!0===DEBUG_COLLISIONS&&(this.ctx.beginPath(),this.ctx.moveTo(this.maluses.malusesEntities[a].LEFT,this.maluses.malusesEntities[a].TOP),this.ctx.lineTo(this.maluses.malusesEntities[a].LEFT+this.maluses.malusesEntities[a].RIGHT,this.maluses.malusesEntities[a].TOP),this.ctx.lineTo(this.maluses.malusesEntities[a].LEFT+
this.maluses.malusesEntities[a].RIGHT,this.maluses.malusesEntities[a].TOP+this.maluses.malusesEntities[a].BOTTOM),this.ctx.lineTo(this.maluses.malusesEntities[a].LEFT,this.maluses.malusesEntities[a].TOP+this.maluses.malusesEntities[a].BOTTOM),this.ctx.closePath(),this.ctx.stroke()),!1===this.maluses.malusesEntities[a].hasCollided&&this.santa.LEFT<this.maluses.malusesEntities[a].LEFT+this.maluses.malusesEntities[a].RIGHT&&this.santa.LEFT+this.santa.RIGHT>this.maluses.malusesEntities[a].LEFT&&this.santa.TOP<
this.maluses.malusesEntities[a].TOP+this.maluses.malusesEntities[a].BOTTOM&&this.santa.TOP+this.santa.BOTTOM>this.maluses.malusesEntities[a].TOP){this.maluses.malusesEntities[a].hasCollided=!0;this.score.malus(this.maluses.malusesEntities[a].effect);this.santa.malus();!1===CONSTS.IS_MOBILE&&(a=0.5+random(1,3)<<0,VVVVV.SoundManager.play("malus"+a));break}for(a=this.bonuses.bonusesEntities.length-1;0<=a;a--)if(!0===DEBUG_COLLISIONS&&(this.ctx.beginPath(),this.ctx.moveTo(this.bonuses.bonusesEntities[a].LEFT,
this.bonuses.bonusesEntities[a].TOP),this.ctx.lineTo(this.bonuses.bonusesEntities[a].LEFT+this.bonuses.bonusesEntities[a].RIGHT,this.bonuses.bonusesEntities[a].TOP),this.ctx.lineTo(this.bonuses.bonusesEntities[a].LEFT+this.bonuses.bonusesEntities[a].RIGHT,this.bonuses.bonusesEntities[a].TOP+this.bonuses.bonusesEntities[a].BOTTOM),this.ctx.lineTo(this.bonuses.bonusesEntities[a].LEFT,this.bonuses.bonusesEntities[a].TOP+this.bonuses.bonusesEntities[a].BOTTOM),this.ctx.closePath(),this.ctx.stroke()),
!1===this.bonuses.bonusesEntities[a].hasCollided&&this.santa.LEFT<this.bonuses.bonusesEntities[a].LEFT+this.bonuses.bonusesEntities[a].RIGHT&&this.santa.LEFT+this.santa.RIGHT>this.bonuses.bonusesEntities[a].LEFT&&this.santa.TOP<this.bonuses.bonusesEntities[a].TOP+this.bonuses.bonusesEntities[a].BOTTOM&&this.santa.TOP+this.santa.BOTTOM>this.bonuses.bonusesEntities[a].TOP){this.bonuses.bonusesEntities[a].hasCollided=!0;this.score.bonus(this.bonuses.bonusesEntities[a].effect);this.santa.bonus();!1===
CONSTS.IS_MOBILE&&(a=0.5+random(1,3)<<0,VVVVV.SoundManager.play("bonus"+a));break}},step:function(a){this.clouds.step(a);!0===GLOBAL_VARS.GAME_STARTED&&(this.santa.step(a),this.score.step(a),!1===GLOBAL_VARS.GAME_ENDED&&(this.maluses.step(a),this.bonuses.step(a),this.checkCollisions()))}};
