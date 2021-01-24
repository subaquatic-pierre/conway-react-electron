import { IActions } from "../context/reducers";
import { IBotState } from "./BotManager";

export interface IGameState {
  intervalID: NodeJS.Timeout | any;
  running: boolean;
  loopCount: number;
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
}
