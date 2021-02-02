# Roomba Bots

## URL:

- http://roomba-bots.s3-website-us-east-1.amazonaws.com

The application is written completely in Typescript using the React framework. The app simulates Roomba cleaning bots exploring and cleaning tiles with a map. The bots travel based on a random model which randomizes the direction of the bot either on hitting the edge of the map or a random direction change every 100 loops cycles.

The speed and number of bots can be changed by the user as well as weather the bots use random walk or random bounce travel directions.

Game stats display the elapsed time, number of active bots, if random walk is activated and the number of cleaned tiles. The simulation will not start if there are no bots in the map, it will end once all the tiles have been cleaned.

A user can move any of the bots with the arrow keys. The user can click on a bot to highlight it, they can then use the arrow keys to direct the bot to where they wish it to start.

## Features

- Set the number of bots
- Set the speed of the bots
- Start, stop and reset the game
- Toggle random walk
- Display number of loop cycles
- Add or remove bots
- Track number of cleaned tiles
- Select and move the bots
