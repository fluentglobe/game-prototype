## Dial a Number game

A phone numberpad is displayed with space for a phone number above.

A phone number is spoken one number or digit at a time, the user must enter the number using
the keypad. With the showNumber flag the word for the digit is shown while spoken and hidden when tapped.

If the user doesn't touch the dialpad for some time(timeout) a cartoon appears(cow) and speaks "Hello, are you there, I will repeat'. Then the number speaking of the current number is started over.

In the top right corner a pause button is shown that will trigger the pause screen state.

In free mode no number is spoken initially, but when a digit is pressed it is spoken.

### Technically

The game is initialised in an element. Pixi is used to draw and manipulate the game area.
The game element is left hidden until it starts. The start function supplies the parameters
for the game run.

A single sound file is passed to the game when creating the game. The pronunciation of numbers is in a single file loaded by the game. Each number speak is on a 2 second boundary. So the number Zero is at 0 seconds, number One is at 2 seconds, number 100 is at 202 seconds. Hundred
as a quantity is at 204 seconds.

Numbers between 0 and 999 must be handled. Hundreds are played by combining 1 to 9 and the
hundred quantity .

The API must include an EventEmitter2 object to listen for user game completion and progress.

* progress (index=0 .. count-1)
* complete

### Settings

When a game is started it is run with parameters.

| name       | description              |
|------------|--------------------------|
| from       | Minimum digits spoken at a time    |
| to         | Maximum digits spoken at a time    |
| prefix       | Start with specific numbers      |
| specific   | If supplied this is the phone number to enter                         |
| count      | If supplied this is the number of digits in the generated number      |
| delay      | Number of seconds between each number (0.5 - 10)                      |
| timeout    | Number of seconds after which the number is repeated |
| showNumber | Boolean, If true the number spoken is also shown in top right corner. |
| mode       | demo/free/normal (demo will run without waiting for user)             |
