import { gameActionTypes, botActionTypes } from "./actionTypes";
import { BotManager } from "../classes/BotManager";
import { Bot } from "../classes/Bot";
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

const gameLoop = (state: IGameState, action: IActions): IGameState => {
  return {
    ...state,
    running: true,
    intervalID: action.data.intervalID,
    loopCount: state.loopCount++,
  };
};

const resetGameState = () => {
  return {
    intervalID: null,
    running: false,
    loopCount: 0,
  };
};

const stopGame = (state: IGameState) => {
  return {
    ...state,
    running: false,
  };
};

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
      return resetGameState();

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};

export const botReducer = (state: IBotState, action: IActions): IBotState => {
  switch (action.type) {
    case botActionTypes.ADD_BOT:
      const newBot = new Bot("Jeff");
      return {
        ...state,
        numberOfBots: state.numberOfBots++,
        bots: [...state.bots, newBot],
      };

    case botActionTypes.RESET_BOTS:
      return initialBotState;

    case botActionTypes.SELECT_BOT:
      const bots = state.bots;
      for (let i = 0; i < state.numberOfBots; i++) {
        if (bots[i].getID() === action.data.id) {
          bots[i].setSelected(true);
        } else {
          bots[i].setSelected(false);
        }
      }

      return {
        ...state,
        bots: bots,
      };

    // case botActionTypes.MOVE_BOT:
    //   const direction: string = action.data.direction;
    //   const distance: number = action.data.distance;
    //   newBots = game.moveBots(direction, distance);
    //   return {
    //     ...state,
    //     bots: newBots,
    //   };

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};
