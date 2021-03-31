import React, { Component } from 'react';

interface Iprops {
  itemsPerPage: any, 
  totalItems: any, 
  paginate: any 
}

interface Istate {
  firstIdx: number, 
  lastIdx: number, 
}

const paginationCss:React.CSSProperties = {
  cursor: "pointer", 
}

class Pagination extends Component<Iprops, Istate> {
  constructor(props:any){
    super(props) 
    this.state = {
      firstIdx: 1, 
      lastIdx: 6, 
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
  
  render() {
    const pageNumbers = [],
          initialStartingIdx = 1,
          initialEndingIdx = 6 
    
    for (let i = 1; i <= Math.ceil(this.props.totalItems / this.props.itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className='pagination'>
          <button name="prev" onClick={this.cycle}
          >prev</button>
          <li>{this.state.firstIdx !== initialStartingIdx ? '...' : null}</li>
          { 
            this.range(this.state.firstIdx, this.state.lastIdx -1).map(number => {
              return <li key={number} className='page-item'>
                <span style={paginationCss} onClick={() => this.props.paginate(number)} className='page-link'>
                  {number}
                </span>
              </li>
            })
          }
          <li>{
            ( this.state.lastIdx === initialEndingIdx )  || 
            ( this.state.lastIdx !== initialEndingIdx  && this.state.lastIdx < 20 )
            ? '...' : null
          }</li>
          <button name="next" onClick={this.cycle}>next</button>
        </ul>
      </nav>
    );

  }
};

export default Pagination;