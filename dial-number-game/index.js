'use strict';

import {Boot} from './states/Boot';
import {Game} from './states/Game';

export var phaser = {};

phaser.options = {
    name: 'dial-number',
    boot: 'Boot',
    main: 'Game'
};

phaser.Boot = Boot;
phaser.Game = Game;
