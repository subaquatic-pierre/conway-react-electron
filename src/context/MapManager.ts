import { IActions } from "../context/reducers";
import { Bot } from "../models/Bot";
import { initialState, IMapDimensions } from "./initialState";

export interface ILocation {
  xPos: number;
  yPos: number;
}

export class MapManager {
  private _mapDimensions: IMapDimensions;

  constructor() {
    this._mapDimensions = initialState.gameState.mapDimension;
  }

  public static getMapDimensions(): IMapDimensions {
    return initialState.gameState.mapDimension;
  }

  public setupMap(action: IActions): IMapDimensions {
    return {
      ...this._mapDimensions,
      leftOffset: action.data.leftOffset,
      topOffset: action.data.topOffset,
    };
  }

  public isLocationInMap(location: ILocation): boolean {
    // Get bot boundary
    const botRight = location.xPos + Bot.dimensions.width;
    const botLeft = location.xPos;
    const botTop = location.yPos;
    const botBottom = location.yPos + Bot.dimensions.height;

    // Get map boundary
    const mapTop = this._mapDimensions.topOffset;
    const mapRight = this._mapDimensions.leftOffset + this._mapDimensions.width;
    const mapBottom =
      this._mapDimensions.topOffset + this._mapDimensions.height;
    const mapLeft = this._mapDimensions.leftOffset;

    // Check new location is within the map
    if (
      botRight <= mapRight &&
      botLeft >= mapLeft &&
      botBottom <= mapBottom &&
      botTop >= mapTop
    ) {
      return true;
    } else {
      return false;
    }
  }

  public getNewLocation(
    deg: number,
    distance: number,
    currLocation: ILocation
  ): ILocation {
    const currYPos: number = currLocation.yPos;
    const currXPos: number = currLocation.xPos;
    const radian = (deg * Math.PI) / 180;

    const newLocation: ILocation = {
      xPos: currXPos + distance * Math.cos(radian),
      yPos: currYPos + distance * Math.sin(radian),
    };

    return newLocation;
  }
}
