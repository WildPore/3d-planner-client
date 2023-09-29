import React from "react";
import "./App.css";

import Chat from "./Chat";
import ChatProvider from "./ChatContext";
import CubeMover from "./CubeMover";

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <header className="header">
          <CubeMover />
        </header>
      </div>
      <Chat />
    </ChatProvider>
  );
}

export default App;
