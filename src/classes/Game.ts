import { Bot } from "./Bot";
import { BotManager } from "./BotManager";

export interface IGameState {
  intervalID: NodeJS.Timeout | any;
  running: boolean;
  loopCount: number;
  botManager: BotManager;
}

export const initialGameState: IGameState = {
  intervalID: null,
  running: false,
  loopCount: 0,
  botManager: new BotManager(),
};

export class Game {
  private _loopCount: number;
  private _running: boolean;
  private _intervalID: NodeJS.Timeout | any;
  private _botManager: BotManager;

  constructor(state: IGameState = initialGameState) {
    this._loopCount = state.loopCount;
    this._running = state.running;
    this._intervalID = state.intervalID;
    this._botManager = state.botManager;
  }

  public getState(): IGameState {
    const state: IGameState = {
      running: this._running,
      loopCount: this._loopCount,
      intervalID: this._intervalID,
      botManager: this._botManager,
    };
    return { ...state };
  }

  public setState(state: IGameState) {
    this._loopCount = state.loopCount;
    this._running = state.running;
    this._intervalID = state.intervalID;
    this._botManager = state.botManager;
  }

  private _updateLoopCount() {
    this._loopCount = this._loopCount + 1;
  }

  public runGame = (
    oldState: IGameState,
    newStateData: IGameState
  ): IGameState => {
    const newState: IGameState = {
      ...oldState,
      ...newStateData,
    };

    this.setState(newState);

    this._updateLoopCount();

    console.log("Game Loop info: ", this.getState());

    return this.getState();
  };

  public stopGame(): IGameState {
    const newState: IGameState = {
      running: false,
      intervalID: null,
      loopCount: this._loopCount,
      botManager: this._botManager,
    };

    this.setState(newState);
    return this.getState();
  }

  public resetGame(): IGameState {
    Bot.resetStatingLocation();
    this.setState(initialGameState);
    return this.getState();
  }

  public getBots(): Bot[] {
    return this._botManager.getBots();
  }

  public moveBots(direction: string, distance: number): IGameState {
    this._botManager.moveBots(direction, distance);
    console.log(this.getState());
    return this.getState();
  }

  public addBot(): IGameState {
    this._botManager.addBot();
    return this.getState();
  }
}
