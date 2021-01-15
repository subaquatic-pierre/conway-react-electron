import React from "react";
import { Map } from "./components/Map";
import { GameControls } from "./components/GameControls";
import { BotControls } from "./components/BotControls";
import { Game, initialGameState } from "./classes/Game";

export const GameContext = React.createContext(initialGameState);

export const mainGame: Game = new Game(initialGameState);

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
