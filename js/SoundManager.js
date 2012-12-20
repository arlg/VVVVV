// /*
//  * SoundManager
//  * Handles sounds
//  * @author aurelieng http://www.arlg.me
//  * Code from http://www.storiesinflight.com/html5/audio.html
//  */
// ----------------------------------------
// SoundManager
// ----------------------------------------


VVVVV.SoundManager = {

	maxChannels : 10,
	audioChannels : [],

	init: function() {
		for (a=0;a<this.maxChannels;a++) {					// prepare the channels
			this.audioChannels[a] = new Array();
			this.audioChannels[a]['channel'] = new Audio();	// create a new audio object
			this.audioChannels[a]['finished'] = -1;			// expected end time for this channel
		}
	},

	play: function(soundId) {

		for (a=0; a<this.maxChannels;a++) {
			var thistime = new Date();
			if (this.audioChannels[a]['finished'] < thistime.getTime()) {			// is this channel finished?
				this.audioChannels[a]['finished'] = thistime.getTime() + document.getElementById(soundId).duration*1000;
				this.audioChannels[a]['channel'].src = document.getElementById(soundId).src;
				this.audioChannels[a]['channel'].load();
				this.audioChannels[a]['channel'].play();
				break;
			}
		}
	}
};