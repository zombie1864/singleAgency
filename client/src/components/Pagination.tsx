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

let searchResultPaginationLength:number 

class Pagination extends Component<Iprops, Istate> {
  constructor(props:any){
    super(props) 
    this.state = {
      firstIdx: 1, 
      lastIdx: 5, 
      activePaginationSquare: 1, 
    }
  }
  
  public searchResultPaginationLength = ():number => Math.ceil(this.props.totalSearchResultLength / this.props.itemsPerPage)
  
  private range(start:number, end:number):number[] {
    if ( start > end ) end = start 
    return Array(end - start + 1).fill(0, 0).map((_, idx) => start + idx)
  }
  
  private paginationCycle = (event:any):void | null => {
    let {firstIdx, activePaginationSquare, lastIdx} = this.state
    const {name} = event.target,
          {paginate, currPage, searchTerm} = this.props
    if ( 
      ( firstIdx === 1 && name === "prev" && activePaginationSquare === 1) || 
      ( activePaginationSquare === 10 && name === "next") || 
      ( searchTerm && name === "next" && activePaginationSquare === searchResultPaginationLength)
    ) return null // boundary conditions 
    if ( ( lastIdx === 10 && name === "next") || ( lastIdx === 5 && name === "prev") ) {
      this.setState({ activePaginationSquare: lastIdx === 10 ? activePaginationSquare + 1 : activePaginationSquare - 1 })
      paginate(lastIdx === 10 ? activePaginationSquare + 1 : activePaginationSquare - 1) 
    } // moves activePaginationSquare to the end or front of range for 6 <= range <= 10 and 1 <= range <= 5 
    if ( searchTerm && ( name === "prev" || name === "next" || (name === "next" && searchResultPaginationLength <= 5 ) ) ) {
      this.setState({ activePaginationSquare: name === "prev" ? activePaginationSquare - 1 : activePaginationSquare + 1 })
      paginate(name === "prev" ? activePaginationSquare - 1 : activePaginationSquare + 1) 
    } // moves activePaginationSquare to the end or front of range for 1 <= range <= searchResultLength  
    if ( 
      (name === "prev" && firstIdx > 1) || 
      (name === "next" && firstIdx !== 6 && lastIdx !== searchResultPaginationLength && !(searchTerm && searchResultPaginationLength < lastIdx))
    ) { 
      name === "prev" ? paginate(currPage - 1 ) : paginate(currPage + 1 )  // moves currPage back along with activePaginationSquare 
      this.setState({
        firstIdx: name === "prev" ? firstIdx - 1 : firstIdx + 1, 
        lastIdx: name === "prev" ? lastIdx - 1 : lastIdx + 1, 
        activePaginationSquare: name === "prev" ? activePaginationSquare - 1 : activePaginationSquare === 0 ? activePaginationSquare + 2 : activePaginationSquare + 1
      }) // changes the range and moves activePaginationSquare, starting range does not go below 1 
    }
  } // 1 is the lowerLimit and 10 is the upperLimit, boundary limits are defined by dev design 

  private changeClassNameBasedOn = (number:number):void => this.setState({activePaginationSquare: number})

  public componentDidUpdate(prevProps:any, prevState:any) { // user updates search term => range change && activePaginationSquare to last paginate number 
    const { paginate, searchTerm} = this.props    
    const { activePaginationSquare } = this.state 

    if ( ( prevProps.currPage > searchResultPaginationLength ) && this.state.activePaginationSquare > 1  && searchTerm && searchResultPaginationLength !== this.state.activePaginationSquare) {
      paginate( 1 )
      this.setState({
        firstIdx: 1, 
        lastIdx: searchResultPaginationLength, 
        activePaginationSquare: 1
      })
      console.log(`first condition`);
    } 
    if (prevProps.searchTerm !== searchTerm && prevState.lastIdx < 5) {      
      paginate( 1 )
      this.setState({
        firstIdx: 1, 
        lastIdx: 5, 
        activePaginationSquare: 1, 
      })
      console.log(`second condition`);
    } 
    if ( prevProps.currPage !== 1 && prevProps.noResultFromSearch !== null && this.props.noResultFromSearch === null && prevProps.searchTerm !== '' && this.props.searchTerm === '' ) {
      paginate( 1 )
      this.setState({
        firstIdx: 1, 
        lastIdx: 5, 
        activePaginationSquare: 1, 
      })
      console.log(`third condition`);
    }
    if ( prevProps.currPage !== 1 && prevProps.noResultFromSearch !== this.props.noResultFromSearch && prevProps.searchTerm !== searchTerm ) {
      paginate( 1 )
      this.setState({
        firstIdx: 1, 
        lastIdx: 5, 
        activePaginationSquare: 1, 
      })
      console.log(`fourth condition`);
    }

    // PREVPROPS! 
    // currPage: 2
    // itemsPerPage: 10
    // noResultFromSearch: 10
    // totalItems: 100
    // totalSearchResultLength: 21
    // searchTerm: 80

    // CURRPROPS! 
    // currPage: 2
    // itemsPerPage: 10
    // noResultFromSearch: 10
    // totalItems: 100
    // totalSearchResultLength: 100
    // searchTerm: 8

    console.log(
      // `cdup`,
      `cdup 
      1st cond: ${( prevProps.currPage > searchResultPaginationLength ) && this.state.activePaginationSquare > 1  && searchTerm && searchResultPaginationLength !== this.state.activePaginationSquare}
      2nd cond: ${prevProps.searchTerm !== searchTerm && prevState.lastIdx < 5}
      3rd cond: ${prevProps.currPage !== 1 && prevProps.noResultFromSearch !== null && this.props.noResultFromSearch === null && prevProps.searchTerm !== '' && this.props.searchTerm === ''}
      4th cond: ${prevProps.currPage !== 1 && prevProps.noResultFromSearch !== this.props.noResultFromSearch && prevProps.searchTerm !== searchTerm}
      5th cond: ${ prevProps.currPage !== 1 && prevProps.currPage === this.props.currPage && prevProps.noResultFromSearch === this.props.noResultFromSearch && prevProps.searchTerm !== searchTerm }
      `
    );
    
  } // searchTerm updates => shorter range => placing activePaginationSquare to lastIdx of shorter range 

  private onClick = (event:any):void => {
    this.props.paginate(parseInt(event.currentTarget.dataset.number)) // this.props.paginate(number) => changing state to parent comp 
    this.changeClassNameBasedOn(parseInt(event.currentTarget.dataset.number))
  }
  
  render() {
    const { noResultFromSearch, searchTerm} = this.props
    searchResultPaginationLength = this.searchResultPaginationLength()
    let paginationRange
     
    if ( searchTerm ) {
      if (searchResultPaginationLength > 5) {
        paginationRange = noResultFromSearch === 0 ? [] : this.range(this.state.firstIdx, this.state.lastIdx )
      } else {
        paginationRange = noResultFromSearch === 0 ? [] : this.range(this.state.firstIdx, searchResultPaginationLength )
      }
    } else {
      paginationRange = this.range(this.state.firstIdx, this.state.lastIdx )
    }   
    
    console.log(
      // `render`, 
      `
render
currPage: ${this.props.currPage}
itemsPerPage: ${this.props.itemsPerPage}
noResultFromSearch: ${this.props.noResultFromSearch}
totalItems: ${this.props.totalItems}
totalSearchResultLength: ${this.props.totalSearchResultLength}
searchTerm: ${this.props.searchTerm}
      `
    );
    

    return (
      <nav className="px-5">
      <ul className='pagination'>
        { searchResultPaginationLength <= 1 && searchTerm ? null : <button className="page-link" name="prev" onClick={this.paginationCycle}>prev</button>}
        { 
          paginationRange.length === 1 ? null : paginationRange.map(number => { // renders pagination
            return <li key={number} className={this.state.activePaginationSquare === number ? 'page-item active' : ''}>
              <span className='page-link paginationSpanTag' data-number={number} onClick={this.onClick}> 
                {number}
              </span>
            </li>
          })
        }
        { searchResultPaginationLength <= 1 && searchTerm ? null : <button className="page-link" name="next" onClick={this.paginationCycle}>next</button>}
      </ul>
      </nav>
    );
  }
};

export default Pagination;