import React, { Component } from 'react';

interface Iprops {
  itemsPerPage: any, 
  totalItems: any, 
  paginate: any 
}

interface Istate {
  startIdx: number, 
  lastIdx: number, 
}

class Pagination extends Component<Iprops, Istate> {
  constructor(props:any){
    super(props) 
    this.state = {
      startIdx: 1, 
      lastIdx: 6, 
    }
  }
  
  private range(start:number, end:number) {
    return Array(end - start + 1).fill(0, 0).map((_, idx) => start + idx)
  }

  private cycle = (event:any) => {
    return this.state.startIdx === 1 && event.target.name ==="prev" ? null :
    this.state.lastIdx === 21 && event.target.name === "next" ? null : 
    event.target.name === "prev" ? 
    this.setState({
      startIdx: this.state.startIdx - 5, 
      lastIdx: this.state.lastIdx - 5
    }) : 
    event.target.name === "next" ? 
    this.setState({
      startIdx: this.state.startIdx + 5, 
      lastIdx: this.state.lastIdx + 5
    }) : null 
  }
  
  render() {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(this.props.totalItems / this.props.itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className='pagination'>
          <button name="prev" onClick={this.cycle}
          >prev</button>
            {this.range(this.state.startIdx, this.state.lastIdx).map(number => (
              number === this.state.lastIdx ? <li key={number}>...</li> :
              <li key={number} className='page-item'>
                <a onClick={() => this.props.paginate(number)} href='!#' className='page-link'>
                  {number}
                </a>
              </li>
            ))}
          <button name="next" onClick={this.cycle}>next</button>
        </ul>
      </nav>
    );

  }
};

export default Pagination;