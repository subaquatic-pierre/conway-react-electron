import React from "react";
import { mainGame } from "../App";
import { botActionTypes } from "../context/actionTypes";
import { botReducer } from "../context/reducers";
import { Bot } from "../classes/Bot";
import { Bot as BotComponent } from "./BotComponent";

export const BotManager: React.FC = () => {
  const [state, dispatch] = React.useReducer(botReducer, mainGame.getState());

  window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "ArrowRight":
        dispatch({
          type: botActionTypes.MOVE_BOT,
          data: { direction: "right", distance: 10 },
        });
        break;

      case "ArrowLeft":
        dispatch({
          type: botActionTypes.MOVE_BOT,
          data: { direction: "left", distance: 10 },
        });
        break;

      case "ArrowUp":
        dispatch({
          type: botActionTypes.MOVE_BOT,
          data: { direction: "up", distance: 10 },
        });
        break;

      case "ArrowDown":
        dispatch({
          type: botActionTypes.MOVE_BOT,
          data: { direction: "down", distance: 10 },
        });
        break;

      default:
        break;
    }
  });

  return (
    <>
      <h2>Bot manager</h2>
      <hr />
      {state &&
        state.botManager
          .getBots()
          .map((bot: any, i: number) => (
            <BotComponent
              key={i}
              location={bot.getLocation()}
              name={bot.getName()}
            />
          ))}
    </>
  );
};
