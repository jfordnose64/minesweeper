import React, { Component } from 'react'
import axios from 'axios'
import Cell from './Cell'
import Win from './Win'

export class Board extends Component {
  state = {
    board: [],
    currState: '',
    mines: '',
    gameId: ''
  }

  resetGame = async () => {
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
        console.table(resp.data.state)
      })
      .then(() => {
        if (this.state.currState === 'lost') {
          console.log('You Lose')
        }
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

  easyMode = () => {
    axios
      .post(`http://minesweeper-api.herokuapp.com/games`, {
        difficulty: 0
      })
      .then(resp => {
        this.setState({
          board: resp.data.board,
          currState: resp.data.state,
          mines: resp.data.mines,
          gameId: resp.data.id
        })
      })
  }

  medMode = () => {
    axios
      .post(`http://minesweeper-api.herokuapp.com/games`, {
        difficulty: 1
      })
      .then(resp => {
        this.setState({
          board: resp.data.board,
          currState: resp.data.state,
          mines: resp.data.mines,
          gameId: resp.data.id
        })
      })
  }

  hardMode = () => {
    axios
      .post(`http://minesweeper-api.herokuapp.com/games`, {
        difficulty: 2
      })
      .then(resp => {
        this.setState({
          board: resp.data.board,
          currState: resp.data.state,
          mines: resp.data.mines,
          gameId: resp.data.id
        })
      })
  }

  winnerOrLoser = () => {
    if (this.state.currState === 'lost') {
      return 'You Lose!'
    } else if (this.state.currState === 'Win') {
      return 'You Win, Good Job!'
    }
  }

  render() {
    return (
      <div>
        <p className="winOrLose">{this.winnerOrLoser}</p>
        <nav>
          <button className="buttons" onClick={this.easyMode}>
            Easy
          </button>
          <button className="buttons" onClick={this.medMode}>
            Medium
          </button>
          <button className="buttons" onClick={this.hardMode}>
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
        <button className="buttons" onClick={this.resetGame}>
          Reset
        </button>
      </div>
    )
  }
}

export default Board
