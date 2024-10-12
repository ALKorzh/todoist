import "./NewItemForm.css"
import React from "react"

class NewItemForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      severity: "medium",
      titleError: "",
    }
  }

  handleTitleChange = (e) => {
    const value = e.target.value
    this.setState({ title: value, titleError: "" })
  }

  handleDescriptionChange = (e) => {
    const value = e.target.value
    this.setState({ description: value })
  }

  handleSeverityChange = (e) => {
    const value = e.target.value
    this.setState({ severity: value })
  }

  validateTitle(title) {
    if (!title) {
      return "The task name cannot be empty."
    }
    if (title.trim() !== title) {
      return "The task name cannot begin or end with whitespace characters."
    }
    return ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { title, description, severity } = this.state

    const titleError = this.validateTitle(title)
    if (titleError) {
      this.setState({ titleError })
      return
    }

    this.props.onItemCreate(title, description, new Date(), severity)

    this.setState({
      title: "",
      description: "",
      severity: "medium",
      titleError: "",
    })
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      this.handleSubmit(e)
    }
  }

  render() {
    return (
      <form className="form-wrapper" onSubmit={this.handleSubmit}>
        <div className="inputs-container">
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Enter the task name"
          />
          {this.state.titleError && (
            <div className="error-message" style={{ color: "red" }}>
              {this.state.titleError}
            </div>
          )}

          <textarea
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Enter the task description"
          />

          <select
            className="select-importance"
            value={this.state.severity}
            onChange={this.handleSeverityChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button className="buttonForm" type="submit">
          Create
        </button>
      </form>
    )
  }
}

export default NewItemForm
