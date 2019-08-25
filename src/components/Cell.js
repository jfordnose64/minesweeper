import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return (
      <>
        <td
          className="cell"
          onContextMenu={e => {
            e.preventDefault()
            this.props.rightClickEvent()
          }}
          onClick={this.props.onClick}
        >
          {this.props.display}
        </td>
      </>
    )
  }
}

export default Cell
