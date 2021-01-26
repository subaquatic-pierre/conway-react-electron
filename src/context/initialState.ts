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
  timerID: NodeJS.Timeout | any;
  timer: number;
  running: boolean;
  loopCount: number;
  matrixSize: number;
  cellDimensions: IDimensions;
  cellSize: number;
  mapDimension: IMapDimensions;
  matrix: Cell[][];
  cleanedCellCount: number;
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
    timerID: null,
    timer: 0,
    running: false,
    loopCount: 0,
    matrixSize: 1,
    cellDimensions: Bot.dimensions,
    cellSize: 1,
    mapDimension: mapDims,
    matrix: buildMatrix(mapDims, 1),
    cleanedCellCount: 0,
  },
  botState: {
    startingLocation: botStartLocation,
    numberOfBots: 1,
    bots: [new Bot("Bob", botStartLocation, 0)],
    randomWalk: false,
    botSpeed: Bot.speed,
  },
};

export function getInitialState(): IState {
  return initialState;
}
