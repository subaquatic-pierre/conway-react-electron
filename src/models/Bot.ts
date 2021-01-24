export interface IBotLocation {
  xPos: number;
  yPos: number;
}

export interface IBotDimensions {
  height: number;
  width: number;
}

export class Bot {
  private _name: string;
  private _location: IBotLocation;
  private _id: number;
  private _selected: boolean;
  private _prevDirection: number | null;

  static speed: number = 5;
  static dimensions: IBotDimensions = {
    height: 100,
    width: 100,
  };

  constructor(name: string, startingLocation: IBotLocation, id: number) {
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

  public getLocation(): IBotLocation {
    return this._location;
  }

  public setSelected(value: boolean): void {
    this._selected = value;
  }

  public isSelected(): boolean {
    return this._selected;
  }

  public setLocation(value: IBotLocation) {
    this._location = value;
  }

  private _calcDirectionRad(deg: number) {
    const radian = (deg * Math.PI) / 180;
    return radian;
  }

  public getPrevDirection(): number | null {
    return this._prevDirection;
  }

  public setPrevDirection(direction: number): void {
    this._prevDirection = direction;
  }

  public move(direction: number, distance: number): void {
    this.setPrevDirection(direction);
    const currXPos = this._location.xPos;
    const currYPos = this._location.yPos;

    const directionRad = this._calcDirectionRad(direction);

    const newLocation: IBotLocation = {
      xPos: currXPos + distance * Math.cos(directionRad),
      yPos: currYPos + distance * Math.sin(directionRad),
    };

    this.setLocation(newLocation);
  }
}
