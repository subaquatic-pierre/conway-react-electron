import { Bot } from "./Bot";
import { BotManager } from "./BotManager";
import { initialGameState, IGameState } from "../App";

export class Game {
  private _state: IGameState;

  private botManager: BotManager;

  constructor(state: IGameState = initialGameState) {
    this._state = state;
    this.botManager = new BotManager(this._state.bots);
  }

  private _updateLoopCount() {
    this._state.loopCount = this._state.loopCount + 1;
  }

  public getState(): IGameState {
    return this._state;
  }
  public setState(value: IGameState) {
    this._state = value;
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

    console.log("Game Loop info: ", this._state);

    return this.getState();
  };

  public stopGame(): IGameState {
    const prevState = this.getState();
    const newState: IGameState = {
      ...prevState,
      running: true,
    };

    this.setState(newState);
    return this.getState();
  }

  public resetGame(): IGameState {
    Bot.resetStatingLocation();
    this.setState(initialGameState);
    return this.getState();
  }
}
