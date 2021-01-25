import { buildMatrix } from "../utils/buildMatrix";
import { IActions } from "../context/reducers";
import { Cell } from "../models/Cell";
import { Bot } from "../models/Bot";
import {
  initialState,
  botStartLocation,
  IGameState,
  IState,
} from "./initialState";

export class GameManager {
  public gameLoop = (state: IGameState, action: IActions): IGameState => {
    return {
      ...state,
      running: true,
      intervalID: action.data.intervalID,
      loopCount: state.loopCount++,
    };
  };

  public stopGame = (state: IGameState) => {
    return {
      ...state,
      running: false,
    };
  };

  public setMatrixSize = (state: IGameState, action: IActions): IGameState => {
    return {
      ...state,
      cellSize: action.data.size,
      cellDimensions: {
        width: Cell.getCellSize(state, action).width,
        height: Cell.getCellSize(state, action).height,
      },
      matrixSize: action.data.size,
      matrix: buildMatrix(state.mapDimension, action.data.size),
    };
  };

  public resetGame(): IState {
    const bot = new Bot("Bob", botStartLocation, 0);

    return {
      gameState: {
        ...initialState.gameState,
        loopCount: 0,
      },
      botState: {
        ...initialState.botState,
        bots: [bot],
      },
    };
  }
}
