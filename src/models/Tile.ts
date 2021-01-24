import { ILocation } from "./MapManager";

export class Tile {
  private _cleaned: boolean;
  private _location: ILocation;
  private _cellNumber: string;

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
    console.log(this._cellNumber);
    return this._cellNumber;
  }

  public isCleaned(): boolean {
    return this._cleaned;
  }

  public setClean(value: boolean): void {
    this._cleaned = value;
  }
}
