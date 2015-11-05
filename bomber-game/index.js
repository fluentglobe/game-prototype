'use strict';

import {Boot} from './states/Boot';
import {MainMenu} from './states/MainMenu';
import {Game} from './states/Game';

export var phaser = {
};

phaser.options = {
    name: 'bomber',
    boot: 'Boot',
    main: 'Game',

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check Bomber.orientated in internal loops to know if it should pause or not */
    orientated: false
};

phaser.Boot = Boot;
phaser.MainMenu = MainMenu;
phaser.Game = Game;
