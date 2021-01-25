import { ILocation } from "../context/MapManager";
import { IState } from "../context/initialState";
import { generateRandomDirection } from "../utils/generateRandomDirection";
import { IDimensions } from "../context/BotManager";
import { Cell } from "./Cell";

export class Bot {
  private _name: string;
  private _location: ILocation;
  private _id: number;
  private _selected: boolean;
  private _prevDirection: number | null;

  private static _baseSize: number = 50;

  public static speed: number = 50;

  public static dimensions: IDimensions = {
    height: Bot._baseSize,
    width: Bot._baseSize,
  };

  public static getMapSizeRatio(ratio: number = 1): number {
    return Bot._baseSize / ratio;
  }

  constructor(name: string, startingLocation: ILocation, id: number) {
    this._name = name;
    this._location = startingLocation;
    this._id = id;
    this._selected = false;
    this._prevDirection = null;
  }

  public getName(): string {
    return this._name;
  }

  public getID(): number {
    return this._id;
  }

  public getLocation(): ILocation {
    return this._location;
  }

  public setSelected(value: boolean): void {
    this._selected = value;
  }

  public isSelected(): boolean {
    return this._selected;
  }

  public setLocation(value: ILocation) {
    this._location = value;
  }

  private _calcDirectionRad(deg: number) {
    const radian = (deg * Math.PI) / 180;
    return radian;
  }

  public getPrevDirection(): number | null {
    return this._prevDirection;
  }

  public getCellCoOrd(): string {
    const xCell = Math.ceil((this.getLocation().xPos + Bot._baseSize / 2) / 50);
    const yCell = Math.ceil((this.getLocation().yPos + Bot._baseSize / 2) / 50);
    const xCoOrd: string = xCell.toString();
    const yCoOrd: string = yCell.toString();
    return `${xCoOrd},${yCoOrd}`;
  }

  public setPrevDirection(direction: number): void {
    this._prevDirection = direction;
  }

  public move(direction: number, distance: number): void {
    this.setPrevDirection(direction);
    const currXPos = this._location.xPos;
    const currYPos = this._location.yPos;

    const directionRad = this._calcDirectionRad(direction);

    const newLocation: ILocation = {
      xPos: currXPos + distance * Math.cos(directionRad),
      yPos: currYPos + distance * Math.sin(directionRad),
    };

    this.setLocation(newLocation);
  }

  public generateNewDirection(): number | null {
    if (!this.getPrevDirection()) {
      return generateRandomDirection();
    } else {
      return this.getPrevDirection();
    }
  }

  public cleanCell(matrix: Cell[][]): void {}
}
