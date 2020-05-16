import React from "react";
import { shallow } from "enzyme";
import TicTacToePage from "../TicTacToePage";

describe("TicTacToePage() tests", () => {
  it("should render correctly in mode", () => {
    const component = shallow(<TicTacToePage />);

    expect(component).toMatchSnapshot();
  });
});
