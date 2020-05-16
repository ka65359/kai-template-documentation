import React from "react";
import { shallow } from "enzyme";
import TicTacToe from "../TicTacToe";

describe("TicTacToe() tests", () => {
  it("should render correctly in mode", () => {
    const component = shallow(<TicTacToe />);

    expect(component).toMatchSnapshot();
  });
});
