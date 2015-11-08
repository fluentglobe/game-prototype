export function Boot(game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
};

Boot.prototype = {

    preload: function () {
        // No visible preloading
        // this.load.image('preloaderBar', 'images/preload.png');
        // this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');
		// this.load.setPreloadSprite(this.preloadBar);

		this.load.image('plane', 'images/plane.png');
		this.load.image('bomb', 'images/bomb.png');
		this.load.image('land', 'images/land.png');
		this.load.image('sky', 'images/sky.png');
		this.load.image('photonstorm', 'images/photonstorm.png');
		this.load.spritesheet('particles', 'images/particles.png', 2, 2);
		this.load.spritesheet('city', 'images/city.png', 16, 16);
		this.load.bitmapFont('rollingThunder', 'images/rolling-thunder.png', 'images/rolling-thunder.xml');

    },

    create: function () {

        this.input.maxPointers = 1;
        // this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 256;
            this.scale.minHeight = 196;
            this.scale.maxWidth = 512;
            this.scale.maxHeight = 384;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    },

    update: function () {

		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
			// this.ready = true;
			// this.state.start('Ready');
		// }

	},

    gameResized: function (width, height) {
    },

    enterIncorrectOrientation: function () {

        //TODO Bomber.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        //TODO Bomber.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};
