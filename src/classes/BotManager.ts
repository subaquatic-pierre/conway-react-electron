import { Bot } from "./Bot";

const createInitialBots = (): Bot[] => {
  return [new Bot("Bob"), new Bot("Jeff")];
};

export class BotManager {
  public _bots: Bot[];

  constructor(bots: Bot[] = createInitialBots()) {
    this._bots = bots;
  }

  public getBots(): Bot[] {
    return this._bots;
  }

  public moveBots(direction: string, distance: number): void {
    const bots: Bot[] = this.getBots();
    for (let i = 0; i < this._bots.length; i++) {
      bots[i].move(direction, distance);
    }
  }

  public addBot(name: string = "New Bot"): void {
    const newBot = new Bot(name);
    this._bots.push(newBot);
  }
}
