import { gameActionTypes, botActionTypes } from "./actionTypes";
import { GameManager, IGameState } from "../models/GameManager";
import { BotManager, IBotState } from "../models/BotManager";
import { MapManager } from "../models/MapManager";

export interface IActions {
  type: gameActionTypes | botActionTypes;
  data?: any;
}

export const gameReducer = (
  state: IGameState,
  action: IActions
): IGameState => {
  const game = new GameManager(state);

  switch (action.type) {
    case gameActionTypes.RUN_GAME:
      return game.gameLoop(state, action);

    case gameActionTypes.STOP_GAME:
      clearInterval(state.intervalID);
      return game.stopGame(state);

    case gameActionTypes.RESET_GAME:
      clearInterval(state.intervalID);

      return game.resetGame();

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};

export const botReducer = (state: IBotState, action: IActions): IBotState => {
  const botManager = new BotManager(state);
  const mapManager = new MapManager();

  switch (action.type) {
    case botActionTypes.ADD_BOT:
      return botManager.addBot(state, action);

    case botActionTypes.RESET_BOTS:
      return botManager.resetBots();

    case botActionTypes.SELECT_BOT:
      return botManager.selectBot(state, action);

    case botActionTypes.MOVE_BOT:
      return botManager.moveBot(state, action);

    case botActionTypes.MAP_SETUP:
      const dimensions = mapManager.setupMap(action);
      return {
        ...state,
        mapDimension: dimensions,
      };

    case botActionTypes.UPDATE_BOT_LOCATION:
      return botManager.updateLocation(state, action);

    case botActionTypes.SET_RANDOM_WALK:
      return {
        ...state,
        randomWalk: action.data.randomWalk,
      };

    case botActionTypes.REMOVE_BOT:
      return botManager.removeBot(state, action.data?.lastBot);

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};
