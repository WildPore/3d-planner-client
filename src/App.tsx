/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./App.css";

import CubeMover from "./CubeMover";
import { Tools } from "./components/Tools";

import { CommandSubtypeProvider } from "./context/CommandContext";

function App() {
  return (
    <CommandSubtypeProvider>
      <div className="App">
        <div className="fixed top-4">
          <Tools />
        </div>
        <div className="fixed w-full h-full">
          <CubeMover />
        </div>
      </div>
    </CommandSubtypeProvider>
  );
}

export default App;
