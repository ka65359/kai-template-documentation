import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import { StorybookTicTacToe } from "./TicTacToe";

export default {
  component: StorybookTicTacToe,
  title: "TicTacToe",
  decorators: [withKnobs]
};

const tictactoeData = {
  history: [
    {
      squares: Array(9).fill(null),
      player: "X"
    }
  ],
  turnNumber: 0,
  currentPlayer: "X",
  setGameHistory: action("setGameHistory"),
  setTurnNumber: action("setTurnNumber"),
  setCurrentPlayer: action("setCurrentPlayer"),
  clearGameHistory: action("clearGameHistory"),
  clearTurnNumber: action("clearTurnNumber"),
  clearCurrentPlayer: action("clearCurrentPlayer")
};

export const Default = () => {
  return <StorybookTicTacToe {...tictactoeData} />;
};

export const InPlay = () => {
  let history = [
    {
      squares: ["X", null, "O", "O", "X", null, null, null, null],
      player: "X"
    }
  ];
  return <StorybookTicTacToe {...tictactoeData} history={history} />;
};

export const Winner = () => {
  let history = [
    {
      squares: ["X", null, "O", "O", "X", null, null, null, "X"],
      player: "O"
    }
  ];
  return <StorybookTicTacToe {...tictactoeData} history={history} />;
};

export const PlayerO = () => {
  return <StorybookTicTacToe {...tictactoeData} currentPlayer={"O"} />;
};
