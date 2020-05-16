import React from "react";
import { shallow } from "enzyme";
import Task from "../Task";

describe("Task() tests", () => {
  let onArchiveTask;
  let onPinTask;
  let data;

  beforeEach(function() {
    onArchiveTask = jest.fn();
    onPinTask = jest.fn();
    data = {
      task: {
        id: 0,
        title: "Sample Title",
        state: "TASK_PINNED"
      },
      onArchiveTask,
      onPinTask
    };
  });

  afterEach(function() {
    onPinTask.mockReset();
    onPinTask = null;
    onArchiveTask.mockReset();
    onArchiveTask = null;
    data = null;
  });

  it("should render correctly in mode", () => {
    const component = shallow(<Task {...data} />);

    expect(component).toMatchSnapshot();
  });
});
