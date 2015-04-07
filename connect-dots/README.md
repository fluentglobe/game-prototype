## Connect the Dots numbers game

Numbers are visually spread across the space within the HTML game element. A typical game (from=0, to=10, count=11, order='increasing') works like the well known paper variant. All numbers are rendered initially so a line can be drawn from one to the next without colliding 
with another number.

The order of numbers is increasing by default, but can also be decreasing or random.

Once rendered the game presents the first number by playing the sound/speak for it. The user must tap or hold the finger on the number. When hitting a number a bubble is shown above the finger to confirm the hit or possibly a circular wave around the finger touch.

After the delay the user must tap or move to the next number.


### Technically

The game is initialised in an element. Pixi is used to draw and manipulate the game area.
The game element is left hidden until it starts. The start function supplies the parameters 
for the game run.

A single sound file is passed to the game when creating the game. The pronunciation of numbers is in a single file loaded by the game. Each number speak is on a 2 second boundary. So the number Zero is at 0 seconds, number One is at 2 seconds, number 100 is at 202 seconds.

Numbers between 0 and 100 must be handled. No number may visually overlap, and decent spacing must be shown between them.

Numbers must be randomly spread over the screen and the algorithm must be documented with references.

The API must include an EventEmitter2 object to listen for user game completion and progress.

* progress (index=0 .. count-1)
* complete

### Settings

When a game is started it is run with parameters.

| name       | description              |
|------------|--------------------------|
| from       | Minimum number picked    |
| to         | Maximum number picked    |
| count      | The amount of number displayed                                        |
| delay      | Number of seconds between each number (1 - 10)                        |
| showNumber | Boolean, If true the number spoken is also shown in top right corner. |
| order      | 'increasing' / 'decreasing' / 'random'                                |
| demo       | Boolean, If true the game is run without waiting for the user.        |

