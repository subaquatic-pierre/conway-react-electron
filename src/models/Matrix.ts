import { Tile } from "./Tile";

export class Matrix {
  private _rows: number;
  private _cols: number;
  private _matrix: Tile[][];

  constructor() {
    this._rows = 10;
    this._cols = 10;
    this._matrix = this._buildMatrix();
  }

  private _buildMatrix(): Tile[][] {
    const matrix: Tile[][] = [];
    for (let i = 0; i < this._rows; i++) {
      matrix.push([]);
      for (let j = 0; j < this._cols; j++) {
        const cellNumber = `${i},${j}`;
        matrix[i][j] = new Tile(cellNumber);
      }
    }
    return matrix;
  }

  public getMatrix(): Tile[][] {
    return this._matrix;
  }
}
