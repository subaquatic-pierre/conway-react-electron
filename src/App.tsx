import React, { Dispatch } from "react";
import { Map } from "./components/Map";
import { GameControls } from "./components/GameControls";
import { BotControls } from "./components/BotControls";
import { ControlBox } from "./components/ControlBox";
import {
  initialGameState,
  initialBotState,
  IGameState,
  IBotState,
} from "./context/initialState";
import { botReducer, gameReducer, IActions } from "./context/reducers";
import { botActionTypes } from "./context/actionTypes";

interface IGameContextProps {
  gameState: IGameState;
  gameDispatch: Dispatch<IActions>;
}

interface IBotContextProps {
  botState: IBotState;
  botDispatch: Dispatch<IActions>;
}

export const GameContext = React.createContext({} as IGameContextProps);
export const BotContext = React.createContext({} as IBotContextProps);

const App: React.FC = () => {
  const [gameState, gameDispatch] = React.useReducer(
    gameReducer,
    initialGameState()
  );
  const [botState, botDispatch] = React.useReducer(
    botReducer,
    initialBotState()
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
        <div className="App">
          <Map />
          <ControlBox>
            <GameControls />
            <BotControls />
          </ControlBox>
        </div>
      </BotContext.Provider>
    </GameContext.Provider>
  );
};

export default App;
