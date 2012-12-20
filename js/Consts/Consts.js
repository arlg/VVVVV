/*
 * Game Constants
 * @author aurelieng http://www.arlg.me
 */

var CONSTS = {
	CANVAS_WIDTH: 320,
	CANVAS_HEIGHT: 480,
	IS_MOBILE : false
};

//2 Canvas layers
var CANVAS = {
	EL : document.getElementById("canvas"),
	SCORE : document.getElementById("canvas-score")
};

var GAME_IMAGES = [
	"assets/graphics/bonus/hood.png",
	"assets/graphics/bonus/presents.png",
	"assets/graphics/bonus/rangifertarandus.png",
	"assets/graphics/clouds/front-cloud.png",
	"assets/graphics/clouds/mid-cloud-1.png",
	"assets/graphics/clouds/mid-cloud-2.png",
	"assets/graphics/clouds/mid-cloud-3.png",
	"assets/graphics/maison.gif",
	"assets/graphics/malus/john-snow.png",
	"assets/graphics/malus/thunder.png",
	"assets/graphics/malus/yeti.png",
	"assets/graphics/santa/santafly.png",
	"img/home/santaintro.gif",
	"img/game/score.png"
];

//Game vars
var GLOBAL_VARS = {
	CURRENT_TIME : 0,
	ACCELERATION : 1,	// starting acceleration
	MAX_ACCELERATION : 5,
	MAX_GAME_TIME : 450, // game time if no acceleration
	GAME_STARTED : false,
	GAME_ENDED : false
};

var DEBUG_COLLISIONS = false;

var STATS = true;