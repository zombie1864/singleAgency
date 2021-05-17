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

let searchResultLength:number 

class Pagination extends Component<Iprops, Istate> {
  constructor(props:any){
    super(props) 
    this.state = {
      firstIdx: 1, 
      lastIdx: 5, 
      activePaginationSquare: 0, 
    }
  }
  
  public searchResultLength = ():number => Math.ceil(this.props.totalSearchResultLength / this.props.itemsPerPage)
  
  private range(start:number, end:number):number[] {
    if ( start > end ) end = start 
    return Array(end - start + 1).fill(0, 0).map((_, idx) => start + idx)
  }
  
  private paginationCycle = (event:any):void | null => {
    let {firstIdx, activePaginationSquare, lastIdx} = this.state
    const {name} = event.target,
          {paginate, currPage, searchTerm} = this.props
    if ( 
      ( firstIdx === 1 && name === "prev" && ( activePaginationSquare === 0 || activePaginationSquare === 1) ) || 
      ( activePaginationSquare === 10 && name === "next") || 
      ( searchTerm && name === "next" && activePaginationSquare === searchResultLength)
    ) return null // boundary conditions 
    if ( ( lastIdx === 10 && name === "next") || ( lastIdx === 5 && name === "prev") ) {
      this.setState({ activePaginationSquare: lastIdx === 10 ? activePaginationSquare + 1 : activePaginationSquare - 1 })
      paginate(lastIdx === 10 ? activePaginationSquare + 1 : activePaginationSquare - 1) 
    } // moves activePaginationSquare to the end or front of range for 6 <= range <= 10 and 1 <= range <= 5 
    if ( ( searchTerm && name === "prev" ) || ( ( searchTerm && name === "next" ) || searchResultLength <= 5) ) {
      this.setState({ activePaginationSquare: name === "prev" ? activePaginationSquare - 1 : activePaginationSquare + 1 })
      paginate(name === "prev" ? activePaginationSquare - 1 : activePaginationSquare + 1) 
    } // moves activePaginationSquare to the end or front of range for 1 <= range <= searchResultLength    
    if ( 
      (name === "prev" && firstIdx > 1) || 
      (name === "next" && firstIdx !== 6 && lastIdx !== searchResultLength && !(searchTerm && searchResultLength < lastIdx))
    ) { 
      currPage !== 1 && name === "prev" ? paginate(currPage - 1 ) : currPage !== 1 && name === "next" ? paginate(currPage + 1 ) : name === "prev" ? paginate( firstIdx - 1) : paginate( firstIdx + 1) // moves currPage back along with activePaginationSquare 
      this.setState({
        firstIdx: name === "prev" ? firstIdx - 1 : firstIdx + 1, 
        lastIdx: name === "prev" ? lastIdx - 1 : lastIdx + 1, 
        activePaginationSquare: name === "prev" ? activePaginationSquare - 1 : activePaginationSquare === 0 ? activePaginationSquare + 2 : activePaginationSquare + 1
      }) // changes the range and moves activePaginationSquare, starting range does not go below 1 
    } 
    else if (name === "next" && searchTerm && searchResultLength <= 5 ) {
      this.setState({ activePaginationSquare: activePaginationSquare + 1 })
      paginate(activePaginationSquare + 1) 
    } 
  }

  private changeClassNameBasedOn = (number:number):void => this.setState({activePaginationSquare: number})

  public componentDidUpdate(prevProps:any, prevState:any) { // user updates search term => range change && activePaginationSquare to last paginate number 
    const { paginate, searchTerm} = this.props    

    if ( ( prevProps.currPage > searchResultLength ) && this.state.activePaginationSquare > 1  && searchTerm) {
      paginate( searchResultLength )
      this.setState({
        firstIdx: 1, 
        lastIdx: searchResultLength, 
        activePaginationSquare: searchResultLength
      })
    } 
    if (prevProps.searchTerm !== searchTerm && prevState.lastIdx < 5) {      
      paginate( 1 )
      this.setState({
        firstIdx: 1, 
        lastIdx: 5, 
        activePaginationSquare: 0, 
      })
    } 
  } // searchTerm updates => shorter range => placing activePaginationSquare to lastIdx of shorter range 
  
  
  render() {
    const {totalItems, itemsPerPage, noResultFromSearch, searchTerm, paginate, currPage} = this.props
    const pageNumbers = []
    searchResultLength = this.searchResultLength()
    let paginationRange
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log(
      `firstIdx: ${this.state.firstIdx}, lastIdx: ${this.state.lastIdx} \nactivePaginationSquare: ${this.state.activePaginationSquare}
      \nsearchResultLength: ${searchResultLength}
      \ncurrPage: ${currPage}`,
    );
     
    if ( searchTerm ) {
      if (searchResultLength > 5) {
        paginationRange = noResultFromSearch === 0 ? [] : this.range(this.state.firstIdx, this.state.lastIdx )
      } else {
        paginationRange = noResultFromSearch === 0 ? [] : this.range(this.state.firstIdx, searchResultLength )
      }
    } else {
      paginationRange = this.range(this.state.firstIdx, this.state.lastIdx )
    }

    return (
      <nav className="px-5">
      <ul className='pagination'>
        { searchResultLength <= 1 && searchTerm ? null : <button className="page-link" name="prev" onClick={this.paginationCycle}>prev</button>}
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
        { searchResultLength <= 1 && searchTerm ? null : <button className="page-link" name="next" onClick={this.paginationCycle}>next</button>}
      </ul>
      </nav>
    );
  }
};

export default Pagination;