import React, { Component } from 'react';

interface Iprops {
  itemsPerPage: number, 
  totalItems: number, 
  paginate: any, 
  searchTerm: string, 
  currPage:null | number, 
  noResultFromSearch:null | number 
}

interface Istate {
  firstIdx: number, 
  lastIdx: number, 
  activeKey: number, 
  paginationBtnClicked: boolean 
}

class Pagination extends Component<Iprops, Istate> {
  constructor(props:any){
    super(props) 
    this.state = {
      firstIdx: 1, 
      lastIdx: 6, 
      activeKey: 0, 
      paginationBtnClicked: false 
    }
  }

  private range(start:number, end:number) {
    return Array(end - start + 1).fill(0, 0).map((_, idx) => start + idx)
  }

  private cycle = (event:any):void | null => {
    if ( (this.state.firstIdx === 1 && event.target.name ==="prev") || (this.state.lastIdx === 21 && event.target.name === "next") ) return null 
    if (event.target.name === "prev" && this.state.paginationBtnClicked) {
      this.props.paginate(this.state.firstIdx - 5)
      return this.setState({
        firstIdx: this.state.firstIdx - 5, 
        lastIdx: this.state.lastIdx - 5, 
        activeKey: this.state.activeKey - 5
      })  
    } else if (event.target.name === "next" && !this.state.paginationBtnClicked) {
      this.props.paginate(this.state.firstIdx + 5)
      return this.setState({
        firstIdx: this.state.firstIdx + 5, 
        lastIdx: this.state.lastIdx + 5, 
        activeKey: this.state.activeKey + 6, 
        paginationBtnClicked: !this.state.paginationBtnClicked
      }) 
    } else if (event.target.name === "next" && this.state.paginationBtnClicked) {
      this.props.paginate(this.state.firstIdx + 5)
      return this.setState({
        firstIdx: this.state.firstIdx + 5, 
        lastIdx: this.state.lastIdx + 5, 
        activeKey: this.state.activeKey + 5, 
      }) 
    } 
  }

  private changeClassNameBasedOn = (number:number):void => this.setState({activeKey: number})
  
  render() {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(this.props.totalItems / this.props.itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    let paginationRange = this.props.noResultFromSearch === 0 ? [] :this.props.currPage ? [this.props.currPage] : this.range(this.state.firstIdx, this.state.lastIdx -1)
    
    return (
      <nav className="px-5">
        <ul className='pagination'>
          { this.props.searchTerm.length > 0 ? null : <button className="page-link" name="prev" onClick={this.cycle}>prev</button>}
          { 
            paginationRange.map(number => {
              return <li key={number} className={this.state.activeKey === number ? 'page-item active' : ''}>
                <span style={{cursor: "pointer",}} onClick={() => {
                    this.props.paginate(number)
                    this.changeClassNameBasedOn(number)
                    }} className='page-link'> {/**this.props.paginate(number) => changing state to parent comp */}
                  {number}
                </span>
              </li>
            })
          }
          { this.props.searchTerm.length > 0 ? null : <button className="page-link" name="next" onClick={this.cycle}>next</button>}
        </ul>
      </nav>
    );

  }
};

export default Pagination;