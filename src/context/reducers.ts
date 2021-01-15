import { gameActionTypes, botActionTypes } from "./actionTypes";
import { mainGame } from "../App";
import { IGameState } from "../classes/Game";
import { Bot } from "../classes/Bot";

export interface IActions {
  type: gameActionTypes | botActionTypes;
  data?: any;
}

export const gameReducer = (state: IGameState, action: IActions) => {
  let newGameState;
  switch (action.type) {
    case gameActionTypes.RUN_GAME:
      newGameState = mainGame.runGame(state, action.data);
      return newGameState;

    case gameActionTypes.STOP_GAME:
      clearInterval(state.intervalID);
      newGameState = mainGame.stopGame();
      return newGameState;

    case gameActionTypes.RESET_GAME:
      clearInterval(state.intervalID);
      // console.clear();
      newGameState = mainGame.resetGame();
      return newGameState;

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};

export const botReducer = (state: IGameState, action: IActions) => {
  let newGameState;

  switch (action.type) {
    case botActionTypes.ADD_BOT:
      newGameState = mainGame.addBot();
      return newGameState;

    case botActionTypes.MOVE_BOT:
      newGameState = mainGame.moveBots(
        action.data.direction,
        action.data.distance
      );
      return newGameState;

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to botReducer`
      );
  }
};
