import { IBotState } from "./initialState";
import { Bot } from "./Bot";

export class BotManager {
  public _bots: Bot[];

  constructor(bots: Bot[]) {
    this._bots = bots;
  }

  public getBots(): Bot[] {
    return this._bots;
  }

  public selectBot(state: IBotState, id: number, numberOfBots: number): Bot[] {
    const bots = state.bots;
    for (let i = 0; i < numberOfBots; i++) {
      if (bots[i].getID() === id) {
        bots[i].setSelected(true);
      } else {
        bots[i].setSelected(false);
      }
    }

    return bots;
  }
}
