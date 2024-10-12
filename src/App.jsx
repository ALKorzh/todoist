import "./App.css"
import React from "react"
import NewItemForm from "./components/NewItemForm/NewItemForm"
import FilteredList from "./components/FilteredList/FilteredList"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      list: [],
      filter: false,
      searchQuery: "",
      severity: [],
    }
  }

  onItemCreate = (title, description, timestamp, severity) => {
    const newItem = {
      id: this.state.list.length,
      title,
      description,
      timestamp,
      done: false,
      severity,
    }
    this.setState((prevState) => ({
      list: [...prevState.list, newItem],
    }))
  }

  onItemDelete = (id) => {
    this.setState((prevState) => ({
      list: prevState.list.filter((el) => el.id !== id),
    }))
  }

  onItemUpdate = (id, done) => {
    this.setState((prevState) => ({
      list: prevState.list.map((el) => (id === el.id ? { ...el, done } : el)),
    }))
  }

  onFilterUpdate = (filter) => {
    this.setState({ filter })
  }

  onSearchChange = (query) => {
    this.setState({ searchQuery: query })
  }

  onSeverityChange = (event) => {
    const { name, checked } = event.target
    this.setState((prevState) => {
      const newSeverity = checked
        ? [...prevState.severity, name]
        : prevState.severity.filter((severity) => severity !== name)
      return { severity: newSeverity }
    })
  }

  generateTasks = () => {
    const newTasks = []
    for (let i = 0; i < 1000; i++) {
      newTasks.push({
        id: i,
        title: `Task ${i + 1}`,
        description: `Description for task ${i + 1}`,
        timestamp: new Date(),
        done: Math.random() < 0.5,
        severity:
          Math.random() < 0.5 ? "high" : Math.random() < 0.5 ? "medium" : "low",
      })
    }
    this.setState((prevState) => ({
      list: [...prevState.list, ...newTasks],
    }))
  }

  render() {
    return (
      <div className="app-container">
        <h1>TODO LIST</h1>
        <div className="search-container">
          <input
            className="search"
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => this.onSearchChange(e.target.value)}
          />
          <button className="button" onClick={this.generateTasks}>
            Generate 1000 tasks
          </button>
        </div>

        <div className="checkbox-filter">
          <label>
            <input
              type="checkbox"
              name="low"
              checked={this.state.severity.includes("low")}
              onChange={this.onSeverityChange}
            />
            Low
          </label>
          <label>
            <input
              type="checkbox"
              name="medium"
              checked={this.state.severity.includes("medium")}
              onChange={this.onSeverityChange}
            />
            Medium
          </label>
          <label>
            <input
              type="checkbox"
              name="high"
              checked={this.state.severity.includes("high")}
              onChange={this.onSeverityChange}
            />
            High
          </label>
        </div>
        <NewItemForm onItemCreate={this.onItemCreate} />
        <FilteredList
          filter={this.state.filter}
          list={this.state.list}
          searchQuery={this.state.searchQuery}
          severity={this.state.severity}
          onItemUpdate={this.onItemUpdate}
          onItemDelete={this.onItemDelete}
          onFilterUpdate={this.onFilterUpdate}
          onSeverityChange={this.onSeverityChange}
        />
      </div>
    )
  }
}

export default App
