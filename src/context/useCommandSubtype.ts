import { useContext } from "react";
import { CommandSubtypeContext } from "./CommandContext";

export const useCommandSubtype = () => {
  const context = useContext(CommandSubtypeContext);

  if (!context) {
    throw new Error(
      "useCommandSubtype must be used within a CommandSubtypeProvider"
    );
  }

  return context;
};
