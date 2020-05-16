import React from "react";
import { shallow } from "enzyme";
import TicTacToeBoard from "../TicTacToeBoard";

describe("TicTacToeBoard() tests", () => {
  let onClickSpy;
  let squares;

  beforeEach(() => {
    onClickSpy = jest.fn();
    squares = [];
    for (let i = 0; i < 9; i++) {
      squares.push(i + 1);
    }
  });

  afterEach(() => {
    onClickSpy.mockReset();
    onClickSpy = null;
    squares = null;
  });

  it("should render correctly in mode", () => {
    const component = shallow(<TicTacToeBoard onClick squares />);

    expect(component).toMatchSnapshot();
  });
});
