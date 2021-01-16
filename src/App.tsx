import React from "react";
import { Map } from "./components/Map";
import { GameControls } from "./components/GameControls";
import { BotControls } from "./components/BotControls";
import { Bot } from "./classes/Bot";

export interface IGameState {
  intervalID: NodeJS.Timeout | any;
  running: boolean;
  loopCount: number;
  bots: Bot[];
}

export const initialGameState: IGameState = {
  intervalID: null,
  running: false,
  loopCount: 0,
  bots: [new Bot("Bob")],
};

export const GameContext = React.createContext(initialGameState);

const App: React.FC = () => {
  return (
    <GameContext.Provider value={initialGameState}>
      <div className="App">
        <Map />
        <GameControls />
        <BotControls />
      </div>
    </GameContext.Provider>
  );
};

export default App;
