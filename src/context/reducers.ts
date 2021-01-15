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
      return { ...state, ...newGameState };

    case gameActionTypes.STOP_GAME:
      clearInterval(state.intervalID);
      newGameState = mainGame.stopGame();
      return { ...state, ...newGameState };

    case gameActionTypes.RESET_GAME:
      clearInterval(state.intervalID);
      // console.clear();
      newGameState = mainGame.resetGame();
      return { ...state, ...newGameState };

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};

interface IBotState {}

export const botReducer = (state: IGameState, action: IActions) => {
  let newBotState;

  switch (action.type) {
    case botActionTypes.ADD_BOT:
      newBotState = mainGame.addBot();
      console.log(newBotState);

      state.botManager = newBotState.botManager;

      const newState: IGameState = {
        ...state,
        ...[(state["botManager"] = newBotState["botManager"])],
      };

      console.log(newState);

      return { ...state, ...newBotState };

    case botActionTypes.MOVE_BOT:
      newBotState = mainGame.moveBots(
        action.data.direction,
        action.data.distance
      );
      return { ...state, ...newBotState };

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to botReducer`
      );
  }
};
