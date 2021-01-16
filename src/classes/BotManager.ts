import { Bot } from "./Bot";

export class BotManager {
  public _bots: Bot[];

  constructor(bots: Bot[]) {
    this._bots = bots;
  }

  public getBots(): Bot[] {
    return this._bots;
  }

  public moveBots(bots: Bot[], direction: string, distance: number): Bot[] {
    for (let i = 0; i < bots.length; i++) {
      bots[i].move(direction, distance);
    }
    return bots;
  }

  public createBot(name: string = "New Bot"): Bot {
    const newBot = new Bot(name);
    return newBot;
  }
}
