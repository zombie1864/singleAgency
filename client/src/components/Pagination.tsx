import React, { Component } from 'react';

interface Iprops {
  itemsPerPage: number, 
  totalItems: number, 
  paginate: any, 
  searchTerm: string, 
  currPageForSearchTerm:null | number, 
  noResultFromSearch:null | number, 
  currPage:number 
}

interface Istate {
  firstIdx: number, 
  lastIdx: number, 
  activeKey: number, 
}

class Pagination extends Component<Iprops, Istate> {
  constructor(props:any){
    super(props) 
    this.state = {
      firstIdx: 1, 
      lastIdx: 6, 
      activeKey: 0, 
    }
  }

  private range(start:number, end:number):number[] {
    return Array(end - start + 1).fill(0, 0).map((_, idx) => start + idx)
  }

  private paginationCycle = (event:any):void | null => {
    if ( (this.state.firstIdx === 1 && event.target.name ==="prev") || (this.state.lastIdx === 11 && event.target.name === "next") ) return null // boundary conditions 
    if (event.target.name === "prev") {
      this.props.currPage !== 1 ? this.props.paginate(this.props.currPage - 1 ) : this.props.paginate(this.state.firstIdx - 1)
      this.setState({
        firstIdx: this.state.firstIdx - 1, 
        lastIdx: this.state.lastIdx - 1, 
        activeKey: this.state.activeKey - 1
      })  
    } else if (event.target.name === "next") {
      this.props.currPage !== 1 ? this.props.paginate(this.props.currPage + 1 ) : this.props.paginate(this.state.firstIdx + 1)
      this.setState({
        firstIdx: this.state.firstIdx + 1, 
        lastIdx: this.state.lastIdx + 1, 
        activeKey: this.state.activeKey === 0 ? this.state.activeKey + 2 : this.state.activeKey + 1, 
      }) 
    } 
  }

  private changeClassNameBasedOn = (number:number):void => this.setState({activeKey: number})
  
  render() {
    const {totalItems, itemsPerPage, noResultFromSearch, currPageForSearchTerm, searchTerm, paginate} = this.props
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    let paginationRange = noResultFromSearch === 0 ? [] : currPageForSearchTerm ? [currPageForSearchTerm] : this.range(this.state.firstIdx, this.state.lastIdx -1)
    
    return (
      <nav className="px-5">
      <ul className='pagination'>
        { searchTerm.length > 0 ? null : <button className="page-link" name="prev" onClick={this.paginationCycle}>prev</button>}
        { 
          paginationRange.map(number => { // renders pagination
            return <li key={number} className={this.state.activeKey === number ? 'page-item active' : ''}>
              <span className='page-link paginationSpanTag' onClick={() => {
                  paginate(number) // this.props.paginate(number) => changing state to parent comp 
                  this.changeClassNameBasedOn(number)
                  }}> 
                {number}
              </span>
            </li>
          })
        }
        { searchTerm.length > 0 ? null : <button className="page-link" name="next" onClick={this.paginationCycle}>next</button>}
      </ul>
      </nav>
    );
  }
};

export default Pagination;