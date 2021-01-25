import { IActions } from "./reducers";
import { generateRandomDirection } from "../utils/generateRandomDirection";
import { Bot } from "../models/Bot";
import { Cell } from "../models/Cell";
import { MapManager, ILocation } from "./MapManager";
import {
  getInitialState,
  IState,
  IBotState,
  botStartLocation,
} from "./initialState";
import { buildMatrix } from "../utils/buildMatrix";

export interface IDimensions {
  height: number;
  width: number;
}

export class BotManager {
  public _state: IBotState;
  private _mapManager: MapManager;

  constructor(state: IBotState) {
    this._state = state;
    this._mapManager = new MapManager();
  }

  private _updateSelectedBots(bots: Bot[], state: any, data: any): void {
    for (let i = 0; i < state.numberOfBots; i++) {
      if (bots[i].getID() === data.id) {
        bots[i].setSelected(true);
      } else {
        bots[i].setSelected(false);
      }
    }
  }

  public getInitialBotState(): IBotState {
    return getInitialState().botState;
  }

  public resetBots(): IBotState {
    return this.getInitialBotState();
  }

  public addBot(state: IBotState, action: IActions): IBotState {
    let newStartingLocation: ILocation;

    if (state.numberOfBots === 0) {
      newStartingLocation = botStartLocation;
    } else {
      newStartingLocation = {
        xPos: state.startingLocation.xPos + Bot.dimensions.width + 10,
        yPos: state.startingLocation.yPos,
      };
    }

    const newBot = new Bot("Jeff", newStartingLocation, state.numberOfBots);

    return {
      ...state,
      startingLocation: newStartingLocation,
      numberOfBots: state.numberOfBots + 1,
      bots: [...state.bots, newBot],
    };
  }

  public selectBot(state: IBotState, action: IActions): IBotState {
    const bots = state.bots;

    this._updateSelectedBots(bots, state, action.data);

    return {
      ...state,
      bots: bots,
    };
  }

  public moveBot(state: IBotState, action: IActions): IBotState {
    const direction: number = action.data.direction;
    const distance: number = action.data.distance;
    const botsMove: Bot[] = state.bots;

    const selectedBot: Bot = botsMove.filter((bot: Bot) => bot.isSelected())[0];

    let newLocation: ILocation;

    try {
      newLocation = this._mapManager.getNewLocation(
        direction,
        distance,
        selectedBot.getLocation()
      );

      if (this._mapManager.isLocationInMap(newLocation)) {
        try {
          selectedBot.move(direction, distance);
        } catch (error) {
          console.warn("No bot selected");
        }
      }
    } catch (e) {}

    return {
      ...state,
      bots: botsMove,
    };
  }

  public isInfiniteLoop(bot: Bot, loopCount: number): boolean {
    if (loopCount > 200) {
      bot.setLocation(botStartLocation);
      return true;
    } else {
      return false;
    }
  }

  public isLocationInMap(location: ILocation): boolean {
    return this._mapManager.isLocationInMap(location);
  }

  public getNewLocation(
    direction: number,
    travelDistance: number,
    currLocation: ILocation
  ): ILocation {
    return this._mapManager.getNewLocation(
      direction,
      travelDistance,
      currLocation
    );
  }

  public isRandomWalkDirectionChange(
    randomWalk: boolean,
    gameLoopCount: number
  ): boolean {
    if (randomWalk && gameLoopCount % 100 === 0) {
      return true;
    } else {
      return false;
    }
  }

  public loopThroughBots(
    bots: Bot[],
    travelDistance: number,
    randomWalk: boolean,
    gameLoopCount: number,
    matrix: Cell[][]
  ): void {
    // Loop through all bots in map
    for (let i = 0; i < bots.length; i++) {
      // Set constants vars
      const bot = bots[i];
      const currLocation: ILocation = bot.getLocation();

      // Set vars which might change
      let botInMap = false;
      let botDirection: any = bot.generateNewDirection();
      let loopCount = 0;

      while (!botInMap) {
        loopCount++;
        const newLocation = this.getNewLocation(
          botDirection,
          travelDistance,
          currLocation
        );

        if (this.isInfiniteLoop(bot, loopCount)) break;

        if (this.isLocationInMap(newLocation)) {
          if (this.isRandomWalkDirectionChange(randomWalk, gameLoopCount)) {
            botDirection = generateRandomDirection();
          }

          bot.move(botDirection, travelDistance);
          bot.cleanCell(matrix);

          botInMap = true;
        } else {
          botDirection = generateRandomDirection();
        }
      }
    }
  }

  public updateLocation(state: IState, action: IActions): IState {
    const bots = state.botState.bots;
    const travelDistance = action.data.distance;
    const gameLoopCount = state.gameState.loopCount;
    const randomWalk = state.botState.randomWalk;
    const matrix = state.gameState.matrix;

    this.loopThroughBots(
      bots,
      travelDistance,
      randomWalk,
      gameLoopCount,
      matrix
    );

    return {
      ...state,
      gameState: {
        ...state.gameState,
        matrix: [...state.gameState.matrix],
      },
      botState: {
        ...state.botState,
        bots: [...bots],
      },
    };
  }

  public getNewStartingLocation(
    state: IBotState,
    lastBot?: boolean
  ): ILocation {
    if (lastBot) {
      return botStartLocation;
    } else {
      return {
        xPos: state.startingLocation.xPos - Bot.dimensions.width - 10,
        yPos: state.startingLocation.yPos,
      };
    }
  }

  public removeBot(state: IBotState, lastBot?: boolean): IBotState {
    const startingLocation: ILocation = this.getNewStartingLocation(
      state,
      lastBot
    );

    const bots = [...state.bots];
    if (bots.length > 0) bots.pop();

    return {
      ...state,
      numberOfBots: bots.length,
      startingLocation,
      bots,
    };
  }

  public setBotSpeed(state: IBotState, action: IActions): IBotState {
    return {
      ...state,
      botSpeed: action.data.speed === 1 ? Bot.speed : action.data.speed,
    };
  }
}
