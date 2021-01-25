import React from "react";
import { Context } from "../../App";
import { actionTypes } from "../../context/actionTypes";
import { Bot as BotComponent } from "./Bot";
import { Bot } from "../../models/Bot";

export const BotManager: React.FC = () => {
  const { state, dispatch } = React.useContext(Context);

  React.useEffect(() => {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight":
          dispatch({
            type: actionTypes.MOVE_BOT,
            data: { direction: 0, distance: 10 },
          });
          break;

        case "ArrowLeft":
          dispatch({
            type: actionTypes.MOVE_BOT,
            data: { direction: 180, distance: 10 },
          });
          break;

        case "ArrowUp":
          dispatch({
            type: actionTypes.MOVE_BOT,
            data: { direction: 270, distance: 10 },
          });
          break;

        case "ArrowDown":
          dispatch({
            type: actionTypes.MOVE_BOT,
            data: { direction: 90, distance: 10 },
          });
          break;

        default:
          break;
      }
    });
  }, []);

  return (
    <>
      {" "}
      {state.botState.bots.map((bot: any, i: number) => (
        <BotComponent
          key={i}
          location={bot.getLocation()}
          name={bot.getName()}
          selected={bot.isSelected()}
          id={bot.getID()}
          dimensions={Bot.dimensions}
        />
      ))}
    </>
  );
};
