'use strict';

import {Boot} from './states/Boot';
import {Preloader} from './states/Preloader';
import {MainMenu} from './states/MainMenu';
import {Game} from './states/Game';

export var phaser = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check Bomber.orientated in internal loops to know if it should pause or not */
    orientated: false
};

phaser.start = 'Boot';

phaser.Boot = Boot;
phaser.Preloader = Preloader;
phaser.MainMenu = MainMenu;
phaser.Game = Game;
