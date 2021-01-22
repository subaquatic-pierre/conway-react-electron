import { Bot } from "./Bot";
import { initialGameState, IGameState } from "./initialState";

export class GameManager {
  private _state: IGameState;

  constructor(state: IGameState = initialGameState()) {
    this._state = state;
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
    this.setState(initialGameState());
    return this.getState();
  }
}
