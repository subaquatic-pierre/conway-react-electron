import { Bot, IBotLocation, initialStartingLocation } from "./Bot";

export interface IGameState {
  intervalID: NodeJS.Timeout | any;
  running: boolean;
  loopCount: number;
}

export interface IBotState {
  numberOfBots: number;
  bots: Bot[];
  startingLocation: IBotLocation;
}

export const initialGameState = (): IGameState => ({
  intervalID: null,
  running: false,
  loopCount: 0,
});

export const initialBotState = (): IBotState => ({
  startingLocation: initialStartingLocation,
  numberOfBots: 1,
  bots: [new Bot("Bob", initialStartingLocation, 0)],
});
