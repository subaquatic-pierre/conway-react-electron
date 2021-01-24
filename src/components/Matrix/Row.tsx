import React from "react";
import { Tile as TileModel } from "../../models/Tile";
import { Tile } from "../Tile";
import "./style.scss";

interface IRowProps {
  row: TileModel[];
}

export const Row: React.FC<IRowProps> = ({ row }: IRowProps) => {
  return (
    <div className="row">
      {row.map((tile) => {
        return <Tile width={50} height={50} text={tile.printLocation()} />;
      })}
    </div>
  );
};
