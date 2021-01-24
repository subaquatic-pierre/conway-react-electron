import React from "react";
import { botActionTypes, gameActionTypes } from "../../context/actionTypes";
import { BotContext, GameContext } from "../../App";
import { Bot } from "../../models/Bot";
export let intervalID: NodeJS.Timeout;

export const BotControls: React.FC = () => {
  const [matrixSize, setMatrixSize] = React.useState(1);
  const [botSpeed, setBotSpeed] = React.useState(1);
  const { botState, botDispatch } = React.useContext(BotContext);
  const { gameState, gameDispatch } = React.useContext(GameContext);

  const handleAddBot = (): void => {
    botDispatch({
      type: botActionTypes.ADD_BOT,
    });
  };

  const handleRemoveBot = (): void => {
    // Check number of bots is greater than 0 otherwise reset game
    if (botState.numberOfBots <= 1) {
      gameDispatch({
        type: gameActionTypes.STOP_GAME,
        data: { running: false },
      });
      botDispatch({
        type: botActionTypes.REMOVE_BOT,
        data: { lastBot: true },
      });
    } else {
      botDispatch({
        type: botActionTypes.REMOVE_BOT,
      });
    }
  };

  const handleToggleRandomWalk = () => {
    const el: any = document.getElementById("randomWalk");
    const checked: boolean = el.checked ? true : false;

    botDispatch({
      type: botActionTypes.SET_RANDOM_WALK,
      data: { randomWalk: checked },
    });
  };

  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number.parseInt(e.target.value);
    setMatrixSize(newSize);
    gameDispatch({
      type: gameActionTypes.SET_MATRIX_SIZE,
      data: { size: newSize },
    });
  };

  const handleBotSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number.parseInt(e.target.value);
    setBotSpeed(newSpeed);

    clearInterval(gameState.intervalID);

    let speedUpdated: boolean = false;

    const newIntervalID: NodeJS.Timeout = setInterval(() => {
      gameDispatch({
        type: gameActionTypes.RUN_GAME,
        data: { running: true, intervalID: newIntervalID },
      });
      botDispatch({
        type: botActionTypes.UPDATE_BOT_LOCATION,
        data: { distance: 1 },
      });
      if (!speedUpdated) {
        botDispatch({
          type: botActionTypes.SET_BOT_SPEED,
          data: { speed: newSpeed },
        });
      }
      speedUpdated = true;
    }, 0);
  };

  return (
    <div>
      <h2>Bot Controls</h2>
      <hr />
      <div className="control-panel">
        <label htmlFor="randomWalk">Toggle random walk: </label>
        <input
          onChange={handleToggleRandomWalk}
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
              checked={matrixSize === 1}
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
              checked={matrixSize === 2}
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
              checked={matrixSize === 3}
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
              checked={matrixSize === 4}
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
              checked={matrixSize === 5}
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
              checked={botSpeed === 1}
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
              checked={botSpeed === 2}
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
              checked={botSpeed === 3}
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
              checked={botSpeed === 4}
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
              checked={botSpeed === 5}
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
