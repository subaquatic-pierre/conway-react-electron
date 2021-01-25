import React, { Dispatch } from "react";

import "./App.scss";
import { Matrix } from "./components/Matrix";
import { ControlBox } from "./components/ControlBox";
import { botReducer, gameReducer, IActions } from "./context/reducers";
import { botActionTypes } from "./context/actionTypes";

import { GameManager, IGameState } from "./context/GameManager";
import { BotManager, IBotState } from "./context/BotManager";

interface IGameContextProps {
  gameState: IGameState;
  gameDispatch: Dispatch<IActions>;
}

interface IBotContextProps {
  botState: IBotState;
  botDispatch: Dispatch<IActions>;
}

const game = new GameManager({} as IGameState);
const botManager = new BotManager({} as IBotState);

export const GameContext = React.createContext({} as IGameContextProps);
export const BotContext = React.createContext({} as IBotContextProps);

const App: React.FC = () => {
  const [gameState, gameDispatch] = React.useReducer(
    gameReducer,
    game.getInitialGameState()
  );
  const [botState, botDispatch] = React.useReducer(
    botReducer,
    botManager.getInitialBotState()
  );

  React.useEffect(() => {
    const map = document.getElementById("map");

    botDispatch({
      type: botActionTypes.MAP_SETUP,
      data: { leftOffset: map?.offsetLeft, topOffset: map?.offsetTop },
    });
  }, []);

  return (
    <GameContext.Provider value={{ gameState, gameDispatch }}>
      <BotContext.Provider value={{ botState, botDispatch }}>
        <div className="container">
          <h1>Bot Simulation</h1>
          <div className="app">
            <Matrix />
            <ControlBox />
          </div>
        </div>
      </BotContext.Provider>
    </GameContext.Provider>
  );
};

export default App;
