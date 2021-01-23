import { Bot, IBotLocation, initialStartingLocation } from "./Bot";

export interface IGameState {
  intervalID: NodeJS.Timeout | any;
  running: boolean;
  loopCount: number;
}

export interface IMapDimensions {
  topOffset: number;
  leftOffset: number;
  height: number;
  width: number;
}

export interface IBotState {
  numberOfBots: number;
  bots: Bot[];
  startingLocation: IBotLocation;
  loopCount: number;
  mapDimension: IMapDimensions;
  randomWalk: boolean;
  botSpeed: number;
}

export const initialGameState = (): IGameState => ({
  intervalID: null,
  running: false,
  loopCount: 0,
});

export const mapDimension: IMapDimensions = {
  topOffset: -1,
  leftOffset: -1,
  height: 900,
  width: 2000,
};

export const initialBotState = (): IBotState => ({
  startingLocation: initialStartingLocation,
  numberOfBots: 1,
  bots: [new Bot("Bob", initialStartingLocation, 0)],
  loopCount: 0,
  mapDimension: mapDimension,
  randomWalk: false,
  botSpeed: 50,
});
