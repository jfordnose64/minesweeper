import React, { Component } from 'react'
import Board from './Board'

export class Game extends Component {
  state = {}

  render() {
    return (
      <div>
        <h1>Minesweeper</h1>
        <Board />
      </div>
    )
  }
}

export default Game
