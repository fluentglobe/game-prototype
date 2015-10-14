## Tell the Time game


### Technically

The game is initialised in an element. Pixi is used to draw and manipulate the game area.
The game element is left hidden until it starts. The start function supplies the parameters
for the game run.



The game can be run in demo, free and normal mode.

In demo mode a time is spoken and the clock is started at 12:00. Then the clock hands and digital time moves to the correct time. The time is spoken and a tick-mark is drawn to the right of the digital time.

In normal mode a time is spoken and the clock is started at 12:00.
The user must move the hands with a finger to the correct time. Circular movements and swipes should be supported. Until the correct time is picked the time will be spoken every 30 seconds (setting in seconds). When it is picked correctly, the time is spoken and a tick-mark is drawn to the right of the digital time.

In free mode the clock starts at 12:00, but nothing is spoken. A finish/close button is presented.
The user must move the hands with a finger to a time, and leave them for 2 seconds (setting in milliseconds). Then the time picked will be spoken. This continues until the finish button is tapped.

### Task Sequence

The game is started with a list of times to test.

`sprite` = “0to1000"
`key` = “it is 24” / “it is 12"
`hour` = hours from midnight
`minute` = minutes over the hour
`locale` = en / de

### Telling the time audio

To play the audio for a time task look up information in `details.json` bundled with the sprite specified by `sprite` and `locale`. The details.json will contain a map from speak key to word sequences.

Keys take the form of "`task key`@`hour`:`minute`”. To look up in this map try these in order based on the time being tested:

- "`task key`@`hour`:`minute`”
- "`task key`@`hour`:any”
- "`task key`@any:`minute`”
- "`task key`@any:any”

If no entry is found it is an error and the task should be skipped with a progress status of “error”.

The entry found is an array of keys in the audio sprite (audio file names without the extension). If a key in the array starts with a dot it is rather a value in the task object (hour or minute).

The game relies on audio sprites

- The standard number counting with 0-99,100-900,1000-9000
- Es ist, Uhr, vor, half, quarter
- (TODO time of hour)

Viertel vor 17
Halb nach 16

It is 10 o’clock in the evening
Es ist 10 Uhr am Abend

Mapping “{{type}} {{hour|any}} {{min|any}}”; 0/12/any 0/15/30/45/any

It is %{hour} o’clock %{minutes} in the %{time-of-day}
[ “it is”,”.hour”,”o’clock”,”.minutes”,”in the”,”.timeofday"]
[ “it is”,”.hourminutes”]
[ “it is time in”,”.hour”,”hours”,”and”,”.minutes”,”minutes”]

The game is started with a list of times to tests.

The digital clock and the analog always moves together.

There are different forms of telling the time.

- .. to/ .. past / half past / quarter past
- digital form
- morning/afternoon/evening addition

### Progress Tracking

When the user completes a task it must be amended with the following information.

- status: “complete” / “skipped” / “error”.
- millis to complete (from the time speaking finishes)

Screen sizing:

Make a scaler that will manage this.

Settings:

- ‘mode’ demo/free/normal
- ‘handsAnimationMs' animation time moving hands to target time from 12:00
- ‘repeatSpeakSec’ time after which the time speak is replayed
- ‘freeMoveMs’ time to move the hands in free play before time is spoken
- ’times’ list of time objects { style: String, time: Date }
- ‘delegate’ delegation object that receives events
