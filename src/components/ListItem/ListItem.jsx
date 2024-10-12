import './ListItem.css';
import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.onItemDelete(this.props.id);
  };

  handleDoneChange = (e) => {
    const value = e.target.checked;
    this.props.onItemUpdate(this.props.id, value);
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    return (
      <li
        className={this.props.done ? 'listItemDone' : 'listItem'}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="info-check">
          <input type="checkbox" onChange={this.handleDoneChange} checked={this.props.done} />
          <div className="title-description">
            <p className="title">{this.props.title}</p>
            <p className="description">{this.props.description}</p>
            <p className="severity">Importance: {this.props.severity}</p>
          </div>
        </div>

        <div className="time-btn">
          <p className="time">
            {this.props.timestamp.toLocaleDateString()} {this.props.timestamp.toLocaleTimeString()}
          </p>
          {this.state.isHovered && (
            <button type="submit" onClick={this.handleDelete} className="delete-button">
              Delete
            </button>
          )}
        </div>
      </li>
    );
  }
}

export default ListItem;
