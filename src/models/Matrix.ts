import { Bot } from "./Bot";
import { IMapDimensions } from "./MapManager";
import { Cell } from "./Cell";

export class Matrix {
  private _rows: number;
  private _cols: number;
  private _matrix: Cell[][];

  constructor(mapDimension: IMapDimensions) {
    this._rows = mapDimension.height / Bot.getMapSizeRatio();
    this._cols = mapDimension.width / Bot.getMapSizeRatio();
    this._matrix = this._buildMatrix();
  }

  private _buildMatrix(): Cell[][] {
    const matrix: Cell[][] = [];
    for (let i = 0; i < this._rows; i++) {
      matrix.push([]);
      for (let j = 0; j < this._cols; j++) {
        const cellNumber = `${i},${j}`;
        matrix[i][j] = new Cell(cellNumber);
      }
    }
    return matrix;
  }

  public getMatrix(): Cell[][] {
    return this._matrix;
  }
}
