import React from "react";
import { shallow } from "enzyme";
import ReactPage from "../ReactPage";

describe("ReactPage() tests", () => {
  it("should render correctly in mode", () => {
    const component = shallow(<ReactPage />);

    expect(component).toMatchSnapshot();
  });
});
