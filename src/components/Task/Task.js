/**
 * @module Task
 * @exports Task
 * @description A module that builds a Task widget.
 * @author Kai
 * @version 1.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import { text } from "@storybook/addon-knobs";

/**
 * @typedef {Object} Task
 *
 * @property {Object} task - Task specific details
 * @property {string} task.id - Task ID
 * @property {string} task.title - Task description
 * @property {string} task.state - Task state (checked or unchecked)
 * @property {function} onArchiveTask - Callback of what happens when a task is archived
 * @property {function} onPinTask - Callback of what happens when a task is pinned
 */
const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }) => {
  /**
   * Build the Task HTML (if it isn't archived).
   *
   * @method buildCurrentTasks
   */
  const buildCurrentTasks = () => {
    if (state !== "TASK_ARCHIVED") {
      return (
        <a href onClick={() => onPinTask(id)}>
          <span className={`icon-star`} />
        </a>
      );
    }
  };

  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === "TASK_ARCHIVED"}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <input
          type="text"
          value={text("title", title)}
          readOnly={true}
          placeholder={"Input title"}
        />
      </div>

      <div className="actions" onClick={(event) => event.stopPropagation()}>
        {buildCurrentTasks()}
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }),
  onArchiveTask: PropTypes.func,
  onPinTask: PropTypes.func
};

export default Task;
