import { gameActionTypes, botActionTypes } from "./actionTypes";
import { Bot, IBotLocation } from "./Bot";
import {
  IGameState,
  IBotState,
  initialBotState,
  initialGameState,
  mapDimension,
  IMapDimensions,
} from "./initialState";

export interface IActions {
  type: gameActionTypes | botActionTypes;
  data?: any;
}

// GAME METHODS
// ================

const gameLoop = (state: IGameState, action: IActions): IGameState => {
  return {
    ...state,
    running: true,
    intervalID: action.data.intervalID,
    loopCount: state.loopCount++,
  };
};

const stopGame = (state: IGameState) => {
  return {
    ...state,
    running: false,
  };
};

// ==================

// BOT METHODS
// ==================

const updateSelectedBots = (bots: Bot[], state: any, data: any): void => {
  for (let i = 0; i < state.numberOfBots; i++) {
    if (bots[i].getID() === data.id) {
      bots[i].setSelected(true);
    } else {
      bots[i].setSelected(false);
    }
  }
};

// ==================

export const gameReducer = (
  state: IGameState,
  action: IActions
): IGameState => {
  switch (action.type) {
    case gameActionTypes.RUN_GAME:
      return gameLoop(state, action);

    case gameActionTypes.STOP_GAME:
      clearInterval(state.intervalID);
      return stopGame(state);

    case gameActionTypes.RESET_GAME:
      clearInterval(state.intervalID);

      return initialGameState();

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};

export const botReducer = (state: IBotState, action: IActions): IBotState => {
  switch (action.type) {
    case botActionTypes.ADD_BOT:
      const newStartingLocation: IBotLocation = {
        xPos: state.startingLocation.xPos + 60,
        yPos: state.startingLocation.yPos,
      };

      const newBot = new Bot("Jeff", newStartingLocation, state.numberOfBots);

      return {
        ...state,
        startingLocation: newStartingLocation,
        numberOfBots: state.numberOfBots + 1,
        bots: [...state.bots, newBot],
      };

    case botActionTypes.RESET_BOTS:
      return initialBotState();

    case botActionTypes.SELECT_BOT:
      const botsSelect = state.bots;

      updateSelectedBots(botsSelect, state, action.data);

      return {
        ...state,
        bots: botsSelect,
      };

    case botActionTypes.MOVE_BOT:
      const direction: number = action.data.direction;
      const distance: number = action.data.distance;
      const botsMove: Bot[] = state.bots;

      const selectedBot: Bot = botsMove.filter((bot: Bot) =>
        bot.isSelected()
      )[0];

      try {
        selectedBot.move(direction, distance);
      } catch (error) {
        console.warn("No bot selected");
      }

      return {
        ...state,
        bots: botsMove,
      };

    case botActionTypes.MAP_SETUP:
      return {
        ...state,
        mapDimension: {
          ...mapDimension,
          leftOffset: action.data.leftOffset,
          topOffset: action.data.topOffset,
        },
      };

    case botActionTypes.UPDATE_BOT_LOCATION:
      const bots = state.bots;

      // Get the bot any initialize new direction
      const bot = bots[0];
      let botDirection: number | null;

      // Set initial bot location and map status
      const currLocation: IBotLocation = bot.getLocation();
      let botInMap = false;

      // while (botInMap === false) {
      const randDirection = Math.floor(Math.random() * Math.floor(360));

      if (state.loopCount % 5 === 0 || bot.getPrevDirection() === null) {
        botDirection = randDirection;
      } else {
        botDirection = bot.getPrevDirection() as number;
      }

      const newLocation = getNewLocation(
        botDirection,
        action.data.distance,
        currLocation
      );

      if (isLocationInMap(newLocation, state.mapDimension)) {
        botInMap = true;
        bot.move(botDirection, action.data.distance);
      }
      bot.move(botDirection, action.data.distance);

      // }

      return {
        ...state,
        loopCount: state.loopCount + 1,
        bots: bots,
      };

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};

const getNewLocation = (
  deg: number,
  distance: number,
  currLocation: IBotLocation
): IBotLocation => {
  const currYPos: number = currLocation.yPos;
  const currXPos: number = currLocation.xPos;
  const radian = (deg * Math.PI) / 180;

  const newLocation: IBotLocation = {
    xPos: currXPos + distance * Math.cos(radian),
    yPos: currYPos + distance * Math.sin(radian),
  };

  return newLocation;
};

const isLocationInMap = (
  location: IBotLocation,
  mapDimension: IMapDimensions
): boolean => {
  // Get bot boundary
  const botRight = location.xPos + 50;
  const botLeft = location.xPos;
  const botTop = location.yPos;
  const botBottom = location.yPos + 50;

  // Get map boundary
  const mapTop = mapDimension.topOffset;
  const mapRight = mapDimension.leftOffset + mapDimension.width;
  const mapBottom = mapDimension.topOffset + mapDimension.height;
  const mapLeft = mapDimension.leftOffset;

  // Check new location is within the map
  if (
    botRight <= mapRight &&
    botLeft >= mapLeft &&
    botBottom <= mapBottom &&
    botTop >= mapTop
  ) {
    return true;
  } else {
    return false;
  }
};
