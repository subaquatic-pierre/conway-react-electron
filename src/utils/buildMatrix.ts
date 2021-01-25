import { Cell } from "../models/Cell";
import { IMapDimensions } from "../context/initialState";
import { Bot } from "../models/Bot";

export function buildMatrix(mapDims: IMapDimensions, size: number): Cell[][] {
  const rows = (mapDims.height * size) / Bot.getMapSizeRatio();
  const cols = (mapDims.width * size) / Bot.getMapSizeRatio();
  const matrix: Cell[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix.push([]);
    for (let j = 0; j < cols; j++) {
      const cellNumber = `${i},${j}`;
      matrix[i][j] = new Cell(cellNumber);
    }
  }
  return matrix;
}
