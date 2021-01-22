export interface IBotLocation {
  xPos: number;
  yPos: number;
}

export const initialStartingLocation: IBotLocation = {
  xPos: 10,
  yPos: 10,
};

export class Bot {
  private _name: string;
  private _location: IBotLocation;
  private _id: number;
  private _selected: boolean;

  constructor(name: string, startingLocation: IBotLocation, id: number) {
    this._name = name;
    this._location = startingLocation;
    this._id = id;
    this._selected = false;
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

  public move(direction: string, distance: number): void {
    const currXPos = this._location.xPos;
    const currYPos = this._location.yPos;

    let newLocation: IBotLocation;
    let newXPos: number;
    let newYPos: number;
    switch (direction) {
      case "up":
        newYPos = currYPos - distance;
        newLocation = {
          xPos: currXPos,
          yPos: newYPos,
        };
        break;

      case "right":
        newXPos = currXPos + distance;
        newLocation = {
          xPos: newXPos,
          yPos: currYPos,
        };
        break;

      case "down":
        newYPos = currYPos + distance;
        newLocation = {
          xPos: currXPos,
          yPos: newYPos,
        };
        break;

      case "left":
        newXPos = currXPos - distance;
        newLocation = {
          xPos: newXPos,
          yPos: currYPos,
        };
        break;

      default:
        throw new Error(
          `Incorrect direction chosen to move the bot to, choices are: "up", "down", "left","right"`
        );
    }

    this.setLocation(newLocation);
  }
}
