![Game Prototype](https://github.com/fluentglobe/game-prototype/raw/master/_demo/public/images/logo.png)

Game Prototype
==============

[![Circle CI](https://circleci.com/gh/fluentglobe/game-prototype.svg?style=svg)](https://circleci.com/gh/fluentglobe/game-prototype)

[![Issues Ready](https://badge.waffle.io/fluentglobe/game-prototype.png?label=ready&title=Ready)](https://waffle.io/fluentglobe/game-prototype)

[ ![Codeship Status for fluentglobe/game-prototype](https://codeship.io/projects/2ba59740-b7c8-0132-5de7-46fe72d3122e/status)](https://codeship.io/projects/71322)
[![Issue Stats](http://issuestats.com/github/fluentglobe/game-prototype/badge/pr)](http://issuestats.com/github/fluentglobe/game-prototype)
[![Issue Stats](http://issuestats.com/github/fluentglobe/game-prototype/badge/issue)](http://issuestats.com/github/fluentglobe/game-prototype)

Collection of game prototypes for the language courses

We make prototypes of possible future games in our courses. You are free to play with the source code, but please be aware you may not host them or attempt to otherwise commercialise them. Open Source gives so much, and we have contributed for decades to Open Source. So we keep our prototypes Open Source for others to learn from and comment on.

If you would like to work with us to create learning games you should fork the prototypes and make your own implementation of one of them.
When you are ready make a pull request and make sure we know how to get
in touch with you.

### Making a Prototype

We aim to make quality software that is a delight to use. To try to achieve that we use an agile approach where we gradually get closer to the ideal. The first step is to prototype the fundamental nature of a game.

As a coding challenge, I'd like you to make a prototype for a simple game. The aim is to prove and discover principles early. You must implement it as a pull request for fluentglobe/game-prototype on GitHub. It must,

- [ ] be based on Phaser or Pixi.
- [ ] Be touch based and working on iPhone 5/6
- [ ] Use a responsive layout
- [ ] Load fast and use minimal cpu
- [ ] Have the core touch navigation flow working
- [ ] Be driven by configuration object passed at start or init
- [ ] Have the basic game logic working

I leave it up to you to decide which facets to prototype and which to leave undefined. There are entries in [Issues for Challenges](https://github.com/fluentglobe/game-prototype/issues?utf8=✓&q=is%3Aissue+is%3Aopen+challenge) to be completed. You can discuss them directly with us or ask for clarification on the issue.

We currently have three prototypes for you to pick from:

- [Tell the time](tree/master/tell-time-game)
- [Connect the dots](tree/master/connect-dots-game)
- [Dial phone number](tree/master/dial-number-game)

There is a straight copy of Phaser demos for reference.

- [Bomber](tree/master/bomber-game)

### Execution Environment

Games are never run directly, but rather as a step in a process according to a plan.
The games of the current plan is loaded up front, but may be loaded in a more lazy way.

Game states are entered with a config object describing the properties to apply. The
README for the game describes these properties.

Games must be able to run in isolation so they cannot depend on arbitrary global objects. Pixi, Phaser and Fluent APIs are safe to depend on and will be present.

ES2015 / ES6 is intended as a prerequisite and the default style for game code.
Babel JS is used to convert into ES5. Be aware that error reporting for compile
errors is lacking make incremental changes and locally commit often.


Each game must be self contained with all needed assets. You cannot depend on dedicated
styling only images and JavaScript.

Phaser suggests using bitmapped fonts, this doesn't match with our needs. Use the default font for the overall Phaser.Game instance. Balance font size with space
available and readability.
