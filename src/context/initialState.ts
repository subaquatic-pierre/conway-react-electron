import { ILocation } from "./MapManager";
import { IDimensions } from "./BotManager";
import { Cell } from "../models/Cell";
import { Bot } from "../models/Bot";
import { calculateBotStartLocation } from "../utils/calculateBotStartLocation";
import { buildMatrix } from "../utils/buildMatrix";

export interface IMapDimensions {
  topOffset: number;
  leftOffset: number;
  height: number;
  width: number;
}

export interface IGameState {
  intervalID: NodeJS.Timeout | any;
  running: boolean;
  loopCount: number;
  matrixSize: number;
  cellDimensions: IDimensions;
  cellSize: number;
  mapDimension: IMapDimensions;
  matrix: Cell[][];
}

export interface IBotState {
  numberOfBots: number;
  bots: Bot[];
  startingLocation: ILocation;
  randomWalk: boolean;
  botSpeed: number;
}

export interface IState {
  gameState: IGameState;
  botState: IBotState;
}

export const mapDims: IMapDimensions = {
  topOffset: -1,
  leftOffset: -1,
  height: 700,
  width: 700,
};

export const botStartLocation = calculateBotStartLocation(mapDims);

export const initialState: IState = {
  gameState: {
    intervalID: null,
    running: false,
    loopCount: 0,
    matrixSize: 1,
    cellDimensions: Bot.dimensions,
    cellSize: 1,
    mapDimension: mapDims,
    matrix: buildMatrix(mapDims, 1),
  },
  botState: {
    startingLocation: botStartLocation,
    numberOfBots: 1,
    bots: [new Bot("Bob", botStartLocation, 0)],
    randomWalk: false,
    botSpeed: Bot.speed,
  },
};

export const getInitialState = (): IState => {
  return { ...initialState };
};
