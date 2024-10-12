import "./FilteredList.css"
import React from "react"
import ListItem from "../ListItem/ListItem"

class FilteredList extends React.Component {
  handleFilterChange = (e) => {
    const value = e.target.checked
    this.props.onFilterUpdate(value)
  }

  handleSeverityChange = (e) => {
    const severityValue = e.target.value
    this.props.onSeverityChange(severityValue)
  }

  render() {
    const { list, filter, searchQuery, severity } = this.props

    let filteredList = list

    if (filter) {
      filteredList = filteredList.filter((el) => !el.done)
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase()
      filteredList = filteredList.filter(
        (el) =>
          el.title.toLowerCase().includes(lowerCaseQuery) ||
          el.description.toLowerCase().includes(lowerCaseQuery)
      )
    }

    if (severity.length > 0) {
      filteredList = filteredList.filter((el) => severity.includes(el.severity))
    }

    const doneTasks = filteredList.filter((el) => el.done)
    const undoneTasks = filteredList.filter((el) => !el.done)

    const sortedList = [...undoneTasks, ...doneTasks]

    const listItems = sortedList.map((li) => (
      <ListItem
        key={li.id}
        id={li.id}
        title={li.title}
        description={li.description}
        timestamp={li.timestamp}
        onItemDelete={this.props.onItemDelete}
        onItemUpdate={this.props.onItemUpdate}
        done={li.done}
        severity={li.severity}
      />
    ))

    return (
      <div>
        <input
          type="checkbox"
          name="filter"
          id="filter"
          checked={this.props.filter}
          onChange={this.handleFilterChange}
        />
        <label htmlFor="filter">Only UnDo</label>

        <ul className="list">
          {listItems.length > 0
            ? listItems
            : "Nothing was found according to your criteria"}
        </ul>
      </div>
    )
  }
}

export default FilteredList
