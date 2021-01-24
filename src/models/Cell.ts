import { ILocation } from "./MapManager";
import { Bot, IDimensions } from "./Bot";

export class Cell {
  private _cleaned: boolean;
  private _location: ILocation;
  private _cellNumber: string;

  private _dimensions: IDimensions = {
    height: Bot.getMapSizeRatio(),
    width: Bot.getMapSizeRatio(),
  };

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
    // console.log(this._cellNumber);
    return this._cellNumber;
  }

  public isCleaned(): boolean {
    return this._cleaned;
  }

  public setClean(value: boolean): void {
    this._cleaned = value;
  }

  public getWidth(): number {
    return this._dimensions.width;
  }

  public getHeight(): number {
    return this._dimensions.height;
  }
}
