'use strict';

import {Boot} from './states/Boot';
import {Game} from './states/Game';

export var phaser = {};

phaser.options = {
    name: 'tell-time',
    boot: 'Boot',
    main: 'Game'
};

phaser.Boot = Boot;
phaser.Game = Game;
