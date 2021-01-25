import { Bot } from "../models/Bot";
import { IMapDimensions } from "../context/initialState";
import { ILocation } from "../context/MapManager";

export function calculateBotStartLocation(
  mapDimensions: IMapDimensions
): ILocation {
  const mapHeight = mapDimensions.height;
  const mapWidth = mapDimensions.width;
  const mapLeft = mapDimensions.leftOffset;
  const mapTop = mapDimensions.topOffset;

  const xPos = mapLeft + mapWidth / 2 - Bot.dimensions.width / 2;
  const yPos = mapTop + mapHeight / 2 - Bot.dimensions.height / 2;

  return {
    xPos,
    yPos,
  };
}
