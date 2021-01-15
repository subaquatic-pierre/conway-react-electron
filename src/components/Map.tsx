import React from "react";
import { BotManager } from "./BotManager";

export const Map: React.FC = () => {
  return (
    <div
      style={{
        height: "500px",
        width: "500px",
        position: "relative",
      }}
    >
      <h1>Map</h1>
      <hr />
      <BotManager />
    </div>
  );
};
