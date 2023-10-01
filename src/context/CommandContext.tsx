import React, { createContext, useState, KeyboardEvent } from "react";
import { CommandSubtype } from "./CommandSubtype";

interface CommandContextType {
  subtype: CommandSubtype;
  setSubtype: React.Dispatch<React.SetStateAction<CommandSubtype>>;
}

export const CommandSubtypeContext = createContext<CommandContextType | null>(
  null
);

export const CommandSubtypeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [subtype, setSubtype] = useState<CommandSubtype>(
    CommandSubtype.TRANSLATE
  );

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.key) {
      case "q":
        setSubtype(CommandSubtype.TRANSLATE);
        break;
      case "w":
        setSubtype(CommandSubtype.ROTATE);
        break;
      case "e":
        setSubtype(CommandSubtype.SCALE);
        break;
    }
  });

  return (
    <CommandSubtypeContext.Provider value={{ subtype, setSubtype }}>
      {children}
    </CommandSubtypeContext.Provider>
  );
};
