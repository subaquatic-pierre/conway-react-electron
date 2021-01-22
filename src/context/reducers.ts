import { gameActionTypes, botActionTypes } from "./actionTypes";
import { Bot, IBotLocation } from "./Bot";
import {
  IGameState,
  IBotState,
  initialBotState,
  initialGameState,
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
      console.log("inside reset game", state);

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

      console.log("inside create bot", state);
      const newBot = new Bot("Jeff", newStartingLocation, state.numberOfBots);

      return {
        ...state,
        startingLocation: newStartingLocation,
        numberOfBots: state.numberOfBots + 1,
        bots: [...state.bots, newBot],
      };

    case botActionTypes.RESET_BOTS:
      console.log("inside reset bots", state);

      return initialBotState();

    case botActionTypes.SELECT_BOT:
      const botsSelect = state.bots;

      updateSelectedBots(botsSelect, state, action.data);

      return {
        ...state,
        bots: botsSelect,
      };

    case botActionTypes.MOVE_BOT:
      const direction: string = action.data.direction;
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

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};
