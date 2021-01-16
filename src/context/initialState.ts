import { Bot } from "../classes/Bot";

export interface IGameState {
  intervalID: NodeJS.Timeout | any;
  running: boolean;
  loopCount: number;
}

export interface IBotState {
  numberOfBots: number;
  bots: Bot[];
}

export const initialGameState: IGameState = {
  intervalID: null,
  running: false,
  loopCount: 0,
};

export const initialBotState: IBotState = {
  numberOfBots: 1,
  bots: [new Bot("Bob")],
};
