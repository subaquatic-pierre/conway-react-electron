import React from "react";
import { botActionTypes } from "../context/actionTypes";
import { mainGame } from "../App";
import { botReducer } from "../context/reducers";

export let intervalID: NodeJS.Timeout;

export const BotControls: React.FC = () => {
  const [state, dispatch] = React.useReducer(botReducer, mainGame.getState());

  const handleAddBot = (): void => {
    dispatch({
      type: botActionTypes.ADD_BOT,
    });
  };

  return (
    <div>
      <h2>Bot Controls</h2>
      <hr />
      <button onClick={handleAddBot}>Add Bot</button>
    </div>
  );
};
