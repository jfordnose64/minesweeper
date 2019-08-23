import React, { Component } from 'react'
import axios from 'axios'
import Cell from './Cell'

export class Board extends Component {
  state = {
    board: [],
    currState: '',
    mines: '',
    gameId: ''
  }

  newGame = async () => {
    await axios
      .post('http://minesweeper-api.herokuapp.com/games', {
        // difficulty: 0
      })
      .then(res => {
        this.setState({
          board: res.data.board,
          currState: res.data.state,
          mines: res.data.mines,
          gameId: res.data.id
        })
        console.table(this.state.board)
      })
  }
  cellClicked = (x, y) => {
    console.log('clicked', x, y)
    axios
      .post(
        `http://minesweeper-api.herokuapp.com/games/${this.state.gameId}/check`,
        { row: x, col: y }
      )
      .then(resp => {
        this.setState({
          board: resp.data.board,
          currState: resp.data.state,
          mines: resp.data.mines
        })
      })
  }

  rightClick = (x, y) => {
    console.log('rightClick', x, y)
    axios
      .post(
        `http://minesweeper-api.herokuapp.com/games/${this.state.gameId}/flag`,
        { row: x, col: y }
      )
      .then(resp => {
        this.setState({
          board: resp.data.board,
          currState: resp.data.state,
          mines: resp.data.mines
        })
      })
  }

  startGame = () => {
    this.newGame()
  }

  // async componentDidMount() {
  //   this.newGame()
  // }
  render() {
    return (
      <div>
        <button onClick={this.startGame}>Start Game</button>
        <nav>
          <button className="button-easy" onClick={this.easyMode}>
            Easy
          </button>
          <button className="button-medium" onClick={this.medMode}>
            Medium
          </button>
          <button className="button-hard" onClick={this.hardMode}>
            Hard
          </button>
        </nav>
        <table>
          <tbody>
            {this.state.board.map((col, i) => {
              return (
                <tr key={i}>
                  {col.map((row, j) => {
                    return (
                      <Cell
                        key={j}
                        display={this.state.board[i][j]}
                        onClick={() => this.cellClicked(i, j)}
                        rightClickEvent={() => this.rightClick(i, j)}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board
