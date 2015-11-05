'use strict';

import {Boot} from './states/Boot';
import {Game} from './states/Game';

export var phaser = {};

phaser.options = {
    name: 'connect-dots',
    boot: 'Boot',
    main: 'Game'
};

phaser.Boot = Boot;
phaser.Game = Game;
