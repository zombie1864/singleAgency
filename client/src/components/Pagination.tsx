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

let paginationRange 

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
    let {firstIdx, activePaginationSquare, lastIdx} = this.state
    const {name} = event.target
    const {paginate, currPage} = this.props
    if ( ( firstIdx === 1 && name ==="prev" && activePaginationSquare === 0 ) || 
    ( activePaginationSquare === 10 && name === "next") || 
    ( firstIdx === 1 && name ==="prev" && activePaginationSquare === 1 )
    ) return null // boundary conditions 
    if ( ( lastIdx === 10 && name === "next") || ( lastIdx === 5 && name === "prev") ) {
      this.setState({
        activePaginationSquare: lastIdx === 10 ? activePaginationSquare + 1 : activePaginationSquare - 1, 
      })
      paginate(lastIdx === 10 ? activePaginationSquare + 1 : activePaginationSquare - 1) 
    }
    if (name === "prev" && activePaginationSquare > 5) {
      currPage !== 1 ? paginate(currPage - 1 ) : paginate( firstIdx - 1)
      this.setState({
        firstIdx: firstIdx - 1, 
        lastIdx: lastIdx - 1, 
        activePaginationSquare: activePaginationSquare - 1
      })  
    } else if (name === "next" &&  firstIdx !== 6) {
      currPage !== 1 ? paginate(currPage + 1 ) : paginate( firstIdx + 1)
      this.setState({
        firstIdx: firstIdx + 1, 
        lastIdx: lastIdx + 1, 
        activePaginationSquare: activePaginationSquare === 0 ? activePaginationSquare + 2 : activePaginationSquare + 1, 
      }) 
    } 
  }

  private changeClassNameBasedOn = (number:number):void => this.setState({activePaginationSquare: number})

  // public componentDidUpdate(nextProps:any) {
  //   const { itemsPerPage, paginate, totalSearchResultLength} = this.props

  //   if ( ( nextProps.currPage > Math.ceil(totalSearchResultLength / itemsPerPage) ) && this.state.activePaginationSquare > 1  ) {
  //     paginate( Math.ceil(totalSearchResultLength / itemsPerPage) )
  //     paginationRange = this.range(1, Math.ceil(totalSearchResultLength / itemsPerPage) )
  //     this.setState({activePaginationSquare: Math.ceil(totalSearchResultLength / itemsPerPage)})
  //   }
  // }
  
  render() {
    const {totalItems, itemsPerPage, noResultFromSearch, searchTerm, paginate, currPage, totalSearchResultLength} = this.props
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log(
      `firstIdx: ${this.state.firstIdx}, lastIdx: ${this.state.lastIdx} \nactivePaginationSquare: ${this.state.activePaginationSquare}
      \ntotalSearchResultLength: ${Math.ceil(totalSearchResultLength / itemsPerPage)}
      \ncurrPage: ${currPage}`,
      currPage > Math.ceil(totalSearchResultLength / itemsPerPage)
    );
     
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