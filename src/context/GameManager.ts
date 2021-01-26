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
    const matrix = state.matrix;

    const running: boolean = state.cleanedCellCount === 196 ? false : true;
    const loopCount: number = running ? state.loopCount++ : state.loopCount;

    if (!running) {
      clearInterval(state.intervalID);
      clearInterval(state.timerID);
    }

    return {
      ...state,
      running: running,
      intervalID: action.data.intervalID,
      timerID: action.data.timerID,
      loopCount: loopCount,
      cleanedCellCount: this.getCleanedCellCount(matrix),
    };
  };

  public getCleanedCellCount(matrix: Cell[][]): number {
    let count = 0;
    matrix.map((row: Cell[], iRow: number) => {
      return row.map((cell: Cell, iCell) => {
        if (cell.isCleaned()) count++;
        return count;
      });
    });
    return count;
  }

  public stopGame = (state: IGameState) => {
    clearInterval(state.intervalID);
    clearInterval(state.timerID);
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
    const newMatrix = buildMatrix(
      initialState.gameState.mapDimension,
      initialState.gameState.matrixSize
    );

    return {
      gameState: {
        ...initialState.gameState,
        loopCount: 0,
        matrix: newMatrix,
      },
      botState: {
        ...initialState.botState,
        bots: [bot],
      },
    };
  }
}
