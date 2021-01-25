import React from "react";
import { Cell as CellModel } from "../../models/Cell";
import { Cell } from "./Cell";
import "./style.scss";

interface IRowProps {
  row: CellModel[];
}

export const Row: React.FC<IRowProps> = ({ row }: IRowProps) => {
  return (
    <div className="row">
      {row.map((cell, index) => {
        return (
          <Cell
            key={index}
            cleaned={cell.isCleaned()}
            text={cell.printLocation()}
          />
        );
      })}
    </div>
  );
};
