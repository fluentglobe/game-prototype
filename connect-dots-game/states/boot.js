'use strict';

export function Boot() {
  this.preloadSprite = null;
  this.ready = false;

  this.assetsUri = {
      images: 'assets/images/',
      sounds: 'assets/sounds/'
  };
}

Boot.prototype = {

    preload: function () {
      this.preloadSprite = this.add.sprite(
          this.game.width  / 2,
          this.game.height / 2,
          'preloadSprite'
      );
      this.preloadSprite.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.preloadSprite);

      this.preloadImages();
      this.preloadSounds();
    },

    create: function () {
        this.game.input.maxPointers = 1;

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setMinMax(120, 80, 1200, 800);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically   = true;

        this.preloadSprite.cropEnabled = false;

        // this.game.state.start('Ready');
    },
    update: function () {
        if (!!this.ready) {
            this.game.state.start('Pause');
        }
    },


    onLoadComplete: function () {
        this.ready = true;
    },

    // -------------------
    // - Preload Methods -
    // -------------------

    preloadImages: function () {
        // Preload All Images!!!
        this.load.image('example', this.assetsUri.images + 'example.png');
    },

    preloadSounds: function () {
        // Preload All Sounds!!!
    }
};
