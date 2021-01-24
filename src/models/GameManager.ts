import { IActions } from "../context/reducers";
import { Bot, IDimensions } from "./Bot";
import { Cell } from "./Cell";

export interface IGameState {
  intervalID: NodeJS.Timeout | any;
  running: boolean;
  loopCount: number;
  matrixSize: number;
  cellDimensions: IDimensions;
  cellSize: number;
}

export class GameManager {
  private _state: IGameState;

  constructor(state: IGameState) {
    this._state = state;
  }

  public getInitialGameState = (): IGameState => ({
    intervalID: null,
    running: false,
    loopCount: 0,
    matrixSize: 1,
    cellDimensions: Bot.dimensions,
    cellSize: 1,
  });

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

  public resetGame = (): IGameState => {
    return this.getInitialGameState();
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
    };
  };
}
