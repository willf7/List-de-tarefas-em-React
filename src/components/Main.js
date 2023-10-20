import React, { Component } from "react";
import "./Main.css";

import { FaPlus, FaEdit, FaWindowClose } from "react-icons/fa";

export default class Main extends Component {
  state = {
    newTask: "",
    tasks: [],
    i: -1,
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) return;

    this.setState({ tasks });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks, i } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (tasks.indexOf(newTask) != -1) return;

    const newTasks = [...tasks];

    if (i === -1) {
      this.setState({
        tasks: [...newTasks, newTask],
        newTask: "",
      });
    } else {
      newTasks[i] = newTask;

      this.setState({
        tasks: [...newTasks],
        i: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleDelete = (e, i) => {
    const { tasks } = this.state;
    const newTasks = [...tasks];
    newTasks.splice(i, 1);

    this.setState({
      tasks: [...newTasks],
    });
  };

  handleEdit = (e, i) => {
    const { tasks } = this.state;

    this.setState({
      i,
      newTask: tasks[i],
    });
  };

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input onChange={this.handleChange} type="text" value={newTask} />
          <button type="submit">
            <>
              <FaPlus />
            </>
          </button>
        </form>

        <ul className="tasks">
          {tasks.map((task, i) => (
            <li key={task}>
              {task}
              <span>
                <FaEdit
                  onClick={(e) => this.handleEdit(e, i)}
                  className="edit"
                />
                <FaWindowClose
                  onClick={(e) => this.handleDelete(e, i)}
                  className="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
