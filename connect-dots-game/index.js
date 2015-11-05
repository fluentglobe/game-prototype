'use strict';

import {Boot} from './states/Boot';
import {Ready} from './states/Ready';

export var phaser = {};

phaser.name = 'connect-dots';
phaser.start = 'Boot';
phaser.main = 'Game';

phaser.Boot = Boot;
phaser.Ready = Ready;
