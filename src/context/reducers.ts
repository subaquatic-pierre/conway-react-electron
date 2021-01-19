import { gameActionTypes, botActionTypes } from "./actionTypes";
import { BotManager } from "../classes/BotManager";
import { GameManager } from "../classes/GameManager";
import { Bot } from "../classes/Bot";
import { IGameState, IBotState, initialBotState } from "./initialState";

export interface IActions {
  type: gameActionTypes | botActionTypes;
  data?: any;
}

export const gameReducer = (
  state: IGameState,
  action: IActions
): IGameState => {
  const game = new GameManager({ ...state });
  let newGameState: IGameState;

  switch (action.type) {
    case gameActionTypes.RUN_GAME:
      newGameState = game.runGame(state, action.data);
      return { ...state, ...newGameState };

    case gameActionTypes.STOP_GAME:
      clearInterval(state.intervalID);
      newGameState = game.stopGame();
      return { ...state, ...newGameState };

    case gameActionTypes.RESET_GAME:
      clearInterval(state.intervalID);
      newGameState = game.resetGame();
      return { ...state, ...newGameState };

    default:
      throw new Error(
        `Undefined action type: ${action.type} passed to reducer`
      );
  }
};

export const botReducer = (state: IBotState, action: IActions): IBotState => {
  const botManager = new BotManager({ ...state.bots });
  let newBots: Bot[] = [];
  // let newState: IBotState;

  switch (action.type) {
    case botActionTypes.ADD_BOT:
      const newBot = botManager.createBot("Jeff");
      return {
        ...state,
        numberOfBots: state.numberOfBots++,
        bots: [...state.bots, newBot],
      };

    case botActionTypes.RESET_BOTS:
      newBots = botManager.resetBots();
      return initialBotState;

    case botActionTypes.SELECT_BOT:
      newBots = botManager.selectBot(state, action.data.id, state.numberOfBots);

      // newBots.forEach((bot) => {
      //   if (bot.getID() === action.data.id) {
      //     bot.setSelected(true);
      //   } else {
      //     bot.setSelected(false);
      //   }
      // });

      return {
        ...state,
        bots: [...state.bots, ...newBots],
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
