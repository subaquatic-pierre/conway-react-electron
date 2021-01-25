import React from "react";
import { actionTypes } from "../../context/actionTypes";
import { Context } from "../../App";
import { Bot } from "../../models/Bot";
export let intervalID: NodeJS.Timeout;

export const BotControls: React.FC = () => {
  const { state, dispatch } = React.useContext(Context);

  const handleAddBot = (): void => {
    dispatch({
      type: actionTypes.ADD_BOT,
    });
  };

  const handleRemoveBot = (): void => {
    // Check number of bots is greater than 0 otherwise reset game
    if (state.botState.numberOfBots <= 1) {
      dispatch({
        type: actionTypes.STOP_GAME,
        data: { running: false },
      });
      dispatch({
        type: actionTypes.REMOVE_BOT,
        data: { lastBot: true },
      });
    } else {
      dispatch({
        type: actionTypes.REMOVE_BOT,
      });
    }
  };

  const handleToggleRandomWalk = () => {
    const el: any = document.getElementById("randomWalk");
    const checked: boolean = el.checked ? true : false;

    dispatch({
      type: actionTypes.SET_RANDOM_WALK,
      data: { randomWalk: checked },
    });
  };

  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number.parseInt(e.target.value);
    dispatch({
      type: actionTypes.SET_MATRIX_SIZE,
      data: { size: newSize },
    });
  };

  const handleBotSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number.parseInt(e.target.value);
    clearInterval(state.gameState.intervalID);

    let speedUpdated: boolean = false;
    const newIntervalTime =
      newSpeed === 1 ? Bot.speed : Bot.speed - 10 * newSpeed;

    const newIntervalID: NodeJS.Timeout = setInterval(() => {
      dispatch({
        type: actionTypes.RUN_GAME,
        data: { running: true, intervalID: newIntervalID },
      });
      dispatch({
        type: actionTypes.UPDATE_BOT_LOCATION,
        data: { distance: 1 },
      });
      if (!speedUpdated) {
        dispatch({
          type: actionTypes.SET_BOT_SPEED,
          data: { speed: newSpeed },
        });
      }
      speedUpdated = true;
    }, newIntervalTime);
  };

  return (
    <div>
      <h2>Bot Controls</h2>
      <hr />
      <div className="control-panel">
        <label htmlFor="randomWalk">Toggle random walk: </label>
        <input
          onChange={handleToggleRandomWalk}
          checked={state.botState.randomWalk}
          type="checkbox"
          name="randomWalk"
          id="randomWalk"
          placeholder="Toggle random Walk"
        />
        <div className="radio-section">
          <p>Set Matrix size: </p>
          <div>
            <input
              onChange={(e) => {
                handleMatrixSizeChange(e);
              }}
              type="radio"
              id="size1"
              name="matrixSize"
              value="1"
              checked={state.gameState.matrixSize === 1}
            />
            <label htmlFor="1">1</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleMatrixSizeChange(e);
              }}
              type="radio"
              id="size2"
              name="matrixSize"
              value="2"
              checked={state.gameState.matrixSize === 2}
            />
            <label htmlFor="2">2</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleMatrixSizeChange(e);
              }}
              type="radio"
              id="size3"
              name="matrixSize"
              value="3"
              checked={state.gameState.matrixSize === 3}
            />
            <label htmlFor="3">3</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleMatrixSizeChange(e);
              }}
              type="radio"
              id="size4"
              name="matrixSize"
              value="4"
              checked={state.gameState.matrixSize === 4}
            />
            <label htmlFor="4">4</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleMatrixSizeChange(e);
              }}
              type="radio"
              id="size5"
              name="matrixSize"
              value="5"
              checked={state.gameState.matrixSize === 5}
            />
            <label htmlFor="5">5</label>
          </div>
        </div>
        <hr />
        <div className="radio-section">
          <p>Set Bot Speed: </p>
          <div>
            <input
              onChange={(e) => {
                handleBotSpeedChange(e);
              }}
              type="radio"
              id="size1"
              name="botSpeed"
              value="1"
              checked={state.botState.botSpeed === Bot.speed}
            />
            <label htmlFor="1">1</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleBotSpeedChange(e);
              }}
              type="radio"
              id="size2"
              name="botSpeed"
              value="2"
              checked={state.botState.botSpeed === 2}
            />
            <label htmlFor="2">2</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleBotSpeedChange(e);
              }}
              type="radio"
              id="size3"
              name="botSpeed"
              value="3"
              checked={state.botState.botSpeed === 3}
            />
            <label htmlFor="3">3</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleBotSpeedChange(e);
              }}
              type="radio"
              id="size4"
              name="botSpeed"
              value="4"
              checked={state.botState.botSpeed === 4}
            />
            <label htmlFor="4">4</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleBotSpeedChange(e);
              }}
              type="radio"
              id="size5"
              name="botSpeed"
              value="5"
              checked={state.botState.botSpeed === 5}
            />
            <label htmlFor="5">5</label>
          </div>
        </div>
      </div>
      <div className="panel">
        <button onClick={handleAddBot}>Add Bot</button>
        <button onClick={handleRemoveBot}>Remove Bot</button>
      </div>
    </div>
  );
};
