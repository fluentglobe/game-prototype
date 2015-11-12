'use strict';

export function Boot() {
  this.ready = false;

  this.assetsUri = {
      images: 'images/',
      sounds: 'sounds/'
  };
}

Boot.prototype = {

    preload: function () {
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

      this.preloadImages();
      this.preloadSounds();
    },

    create: function () {
        this.game.input.maxPointers = 1;

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setMinMax(120, 80, 1200, 800);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically   = true;
    },
    // update: function () {
    //     if (!!this.ready) {
    //         this.game.state.start('Pause');
    //     }
    // },


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
