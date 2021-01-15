import { create } from "domain";
import { Bot } from "./Bot";

const createBots = (): Bot[] => {
  return [new Bot("Bob"), new Bot("Jeff")];
};

export class BotManager {
  private _bots: Bot[];
  constructor(bots: Bot[] = createBots()) {
    this._bots = bots;
  }

  public getBots(): Bot[] {
    return this._bots;
  }

  public moveBots(direction: string, distance: number): Bot[] {
    const bots: Bot[] = this.getBots();
    for (let i = 0; i < bots.length; i++) {
      bots[i].move(direction, distance);
    }

    return this._bots;
  }

  public addBot(): void {
    const newBot = new Bot("New bot");
    this._bots.push(newBot);
  }
}
