import { initialBotState } from "../context/initialState";
import { Bot } from "./Bot";

export class BotManager {
  public _bots: Bot[];

  constructor(bots: Bot[]) {
    this._bots = bots;
  }

  public getBots(): Bot[] {
    return this._bots;
  }

  public resetBots(): Bot[] {
    Bot.resetStatingLocation();
    this._bots = initialBotState.bots;
    return this.getBots();
  }

  public moveBots(direction: string, distance: number): void {
    const bots: Bot[] = this.getBots();
    for (let i = 0; i < this._bots.length; i++) {
      bots[i].move(direction, distance);
    }
  }

  public createBot(name: string = "New Bot"): Bot {
    const newBot = new Bot(name);
    return newBot;
  }
}
