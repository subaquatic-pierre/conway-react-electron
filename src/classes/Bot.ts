export interface IBotLocation {
  xPos: number;
  yPos: number;
}

const initialStartingLocation: IBotLocation = {
  xPos: 10,
  yPos: 10,
};

interface IBotState {
  location: IBotLocation;
}

export class Bot {
  static startingLocation: IBotLocation = initialStartingLocation;

  static resetStatingLocation(): void {
    Bot.startingLocation = initialStartingLocation;
  }

  private _name: string;
  private _location: IBotLocation;

  constructor(name: string) {
    this._name = name;
    this._location = Bot.startingLocation;

    // Update new starting location for each bot
    const newStartingLocation: IBotLocation = {
      xPos: Bot.startingLocation.xPos + 60,
      yPos: Bot.startingLocation.yPos,
    };
    Bot.startingLocation = newStartingLocation;
  }

  public getState(): IBotState {
    const state: IBotState = {
      location: this._location,
    };

    return state;
  }

  public getName(): string {
    return this._name;
  }

  public getLocation(): IBotLocation {
    return this._location;
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
