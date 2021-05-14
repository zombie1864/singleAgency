import React, { Component } from 'react';

interface Iprops {
  itemsPerPage: number, 
  totalItems: number, 
  paginate: any, 
  searchTerm: string, 
  searchTermPagination:null | number, 
  noResultFromSearch:null | number, 
  currPage:number, 
  totalSearchResultLength:number 
}

interface Istate {
  firstIdx: number, 
  lastIdx: number, 
  activePaginationSquare: number, 
}

class Pagination extends Component<Iprops, Istate> {
  constructor(props:any){
    super(props) 
    this.state = {
      firstIdx: 1, 
      lastIdx: 5, 
      activePaginationSquare: 0, 
    }
  }

  private range(start:number, end:number):number[] {
    return Array(end - start + 1).fill(0, 0).map((_, idx) => start + idx)
  }

  private paginationCycle = (event:any):void | null => {
    if ( (this.state.firstIdx === 1 && event.target.name ==="prev") || this.state.activePaginationSquare === 10 ) return null // boundary conditions 
    if ( (this.state.lastIdx === 10 && event.target.name === "next") ) {
      this.setState({
        activePaginationSquare: this.state.activePaginationSquare + 1, 
      }, () => this.props.paginate(this.state.activePaginationSquare)) 
    }
    if (event.target.name === "prev") {
      this.props.currPage !== 1 ? this.props.paginate(this.props.currPage - 1 ) : this.props.paginate(this.state.firstIdx - 1)
      this.setState({
        firstIdx: this.state.firstIdx - 1, 
        lastIdx: this.state.lastIdx - 1, 
        activePaginationSquare: this.state.activePaginationSquare - 1
      })  
    } else if (event.target.name === "next" && this.state.firstIdx !== 6) {
      this.props.currPage !== 1 ? this.props.paginate(this.props.currPage + 1 ) : this.props.paginate(this.state.firstIdx + 1)
      this.setState({
        firstIdx: this.state.firstIdx + 1, 
        lastIdx: this.state.lastIdx + 1, 
        activePaginationSquare: this.state.activePaginationSquare === 0 ? this.state.activePaginationSquare + 2 : this.state.activePaginationSquare + 1, 
      }) 
    } 
  }

  private changeClassNameBasedOn = (number:number):void => this.setState({activePaginationSquare: number})
  
  render() {
    const {totalItems, itemsPerPage, noResultFromSearch, searchTermPagination, searchTerm, paginate, currPage, totalSearchResultLength} = this.props
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log(
      `firstIdx: ${this.state.firstIdx}, lastIdx: ${this.state.lastIdx} \nactivePaginationSquare: ${this.state.activePaginationSquare}`
    );
    
    let paginationRange 
    if ( searchTerm ) {
      paginationRange = noResultFromSearch === 0 ? [] : this.range(1, Math.ceil(totalSearchResultLength / itemsPerPage) )
    } else {
      paginationRange = this.range(this.state.firstIdx, this.state.lastIdx )
    }

    return (
      <nav className="px-5">
      <ul className='pagination'>
        { <button className="page-link" name="prev" onClick={this.paginationCycle}>prev</button>}
        { 
          paginationRange.map(number => { // renders pagination
            return <li key={number} className={this.state.activePaginationSquare === number ? 'page-item active' : ''}>
              <span className='page-link paginationSpanTag' onClick={() => {
                  paginate(number) // this.props.paginate(number) => changing state to parent comp 
                  this.changeClassNameBasedOn(number)
                  }}> 
                {number}
              </span>
            </li>
          })
        }
        { <button className="page-link" name="next" onClick={this.paginationCycle}>next</button>}
      </ul>
      </nav>
    );
  }
};

export default Pagination;