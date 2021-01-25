import React, { Dispatch } from "react";

import "./App.scss";
import { Matrix } from "./components/Matrix";
import { ControlBox } from "./components/ControlBox";
import { reducer, IActions } from "./context/reducers";
import { actionTypes } from "./context/actionTypes";

import { IState, getInitialState } from "./context/initialState";

interface IStateContextProps {
  state: IState;
  dispatch: Dispatch<IActions>;
}

export const Context = React.createContext({} as IStateContextProps);

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());

  React.useEffect(() => {
    const map = document.getElementById("map");

    dispatch({
      type: actionTypes.MAP_SETUP,
      data: { leftOffset: map?.offsetLeft, topOffset: map?.offsetTop },
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="container">
        <h1>Bot Simulation</h1>
        <div className="app">
          <Matrix />
          <ControlBox />
        </div>
      </div>
    </Context.Provider>
  );
};

export default App;
