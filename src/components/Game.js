import React, { Component } from 'react'
import Board from './Board'

export class Game extends Component {
  state = {}

  render() {
    return (
      <div>
        <h1>Minesweeper</h1>
        <section className="buttons">
          {/* <button className="button-easy">Easy</button>
          <button className="button-medium">Medium</button>
          <button className="button-hard">Hard</button> */}
        </section>
        <Board />
      </div>
    )
  }
}

export default Game
