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

  public updateLocation(state: IState, action: IActions): IState {
    const bots = state.botState.bots;
    const travelDistance = action.data.distance;
    const newMatrix: Cell[][] = buildMatrix(
      state.gameState.mapDimension,
      state.gameState.matrixSize
    );

    // Loop through all bots in map
    for (let i = 0; i < bots.length; i++) {
      const bot = bots[i];

      const currLocation: ILocation = bot.getLocation();
      let botInMap = false;

      let randDirection = generateRandomDirection();
      let botDirection: number = bot.getPrevDirection() || randDirection;

      let infiniteLoop = 0;

      while (!botInMap) {
        infiniteLoop++;
        const newLocation = this._mapManager.getNewLocation(
          botDirection,
          travelDistance,
          currLocation
        );

        if (infiniteLoop > 200) {
          bot.setLocation(botStartLocation);
          break;
        }

        if (this._mapManager.isLocationInMap(newLocation)) {
          if (
            state.botState.randomWalk &&
            state.gameState.loopCount % 100 === 0
          ) {
            botDirection = generateRandomDirection();
          }

          // const [xCoOrd, yCoOrd] = bot.getCellCoOrd().split(",");
          // const cell: Cell =
          //   oldMatrix[Number.parseInt(xCoOrd)][Number.parseInt(yCoOrd)];

          // if (!cell.isCleaned()) {
          //   cell.setClean(true);
          // }

          // bot.cleanCell(newMatrix);
          bot.move(botDirection, action.data.distance);
          botInMap = true;
        } else {
          botDirection = generateRandomDirection();
        }
      }
    }

    return {
      ...state,
      gameState: {
        ...state.gameState,
        matrix: [...newMatrix],
      },
      botState: {
        ...state.botState,
        bots: [...bots],
      },
    };
  }

  public removeBot(state: IBotState, lastBot?: boolean): IBotState {
    let startingLocation: ILocation;
    if (lastBot) {
      startingLocation = botStartLocation;
    } else {
      startingLocation = {
        xPos: state.startingLocation.xPos - Bot.dimensions.width - 10,
        yPos: state.startingLocation.yPos,
      };
    }

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
