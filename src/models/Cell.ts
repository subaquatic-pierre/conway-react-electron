import { ILocation } from "./MapManager";
import { Bot, IDimensions } from "./Bot";
import { IGameState } from "./GameManager";
import { IActions } from "../context/reducers";

export class Cell {
  private _cleaned: boolean;
  private _location: ILocation;
  private _cellNumber: string;

  public static dimensions: IDimensions = {
    height: Bot.getMapSizeRatio(),
    width: Bot.getMapSizeRatio(),
  };

  public static getCellSize(state: IGameState, action: IActions): IDimensions {
    return {
      width: this.dimensions.width / action.data.size,
      height: this.dimensions.height / action.data.size,
    };
  }

  constructor(cellNumber: string) {
    this._cellNumber = cellNumber;
    this._cleaned = false;
    this._location = this._buildLocation(cellNumber);
  }

  private _buildLocation(cellNumber: string): ILocation {
    const [xString, yString] = cellNumber.split(",");
    return {
      xPos: Number.parseInt(xString),
      yPos: Number.parseInt(yString),
    };
  }

  public getLocation(): ILocation {
    return this._location;
  }

  public printLocation(): string {
    return this._cellNumber;
  }

  public isCleaned(): boolean {
    return this._cleaned;
  }

  public setClean(value: boolean): void {
    this._cleaned = value;
  }
}
