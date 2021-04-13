import React, { Component } from 'react';

interface Iprops {
  itemsPerPage: number, 
  totalItems: number, 
  paginate: any 
}

interface Istate {
  firstIdx: number, 
  lastIdx: number
}

const paginationCss:React.CSSProperties = {
  cursor: "pointer", 
}

class Pagination extends Component<Iprops, Istate> {
  constructor(props:any){
    super(props) 
    this.state = {
      firstIdx: 1, 
      lastIdx: 6 
    }
  }
  
  private range(start:number, end:number) {
    return Array(end - start + 1).fill(0, 0).map((_, idx) => start + idx)
  }

  private cycle = (event:any) => {
    if ( (this.state.firstIdx === 1 && event.target.name ==="prev")  || (this.state.lastIdx === 21 && event.target.name === "next") ) return null 
    if (event.target.name === "prev") {
      this.props.paginate(this.state.firstIdx - 5)
      return this.setState({
        firstIdx: this.state.firstIdx - 5, 
        lastIdx: this.state.lastIdx - 5
      })  

    } else if (event.target.name === "next") {
      this.props.paginate(this.state.firstIdx + 5)
      return this.setState({
        firstIdx: this.state.firstIdx + 5, 
        lastIdx: this.state.lastIdx + 5
      }) 
    } 
  }

  private activePagination = (number:number) => {
    return number === 2 ? "active" : null 
  }
  
  render() {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(this.props.totalItems / this.props.itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="px-5">
        <ul className='pagination'>
          <button className="page-link" name="prev" onClick={this.cycle}>prev</button>
          { 
            this.range(this.state.firstIdx, this.state.lastIdx -1).map(number => {
              return <li key={number} className={`${this.activePagination}`}>
                <span style={paginationCss} onClick={() => this.props.paginate(number)} className='page-link'>
                  {number}
                </span>
              </li>
            })
          }
          <button className="page-link" name="next" onClick={this.cycle}>next</button>
        </ul>
      </nav>
    );

  }
};

export default Pagination;