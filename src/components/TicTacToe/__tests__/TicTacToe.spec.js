import React from "react";
import { shallow } from "enzyme";
import TicTacToe from "../TicTacToe";
import * as constants from "../../../constants/tictactoe";

describe("TicTacToe() tests", () => {
  let data;

  beforeEach(function() {
    data = {
      history: [
        {
          squares: Array(constants.WIDTH * constants.WIDTH).fill(null),
          player: "bar"
        }
      ],
      turnNumber: 0,
      currentPlayer: "foo",
      setGameHistory: jest.fn(),
      setTurnNumber: jest.fn(),
      setCurrentPlayer: jest.fn(),
      clearGameHistory: jest.fn(),
      clearTurnNumber: jest.fn(),
      clearCurrentPlayer: jest.fn()
    };
  });

  afterEach(function() {
    data = null;
  });

  it("should render correctly in mode", () => {
    const component = shallow(<TicTacToe {...data} />);

    expect(component).toMatchSnapshot();
  });
});
