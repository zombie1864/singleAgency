export const FETCH_DATA = 'FETCH_DATA'

export const fetchData = (data:any) => ({
    type: FETCH_DATA,
    fixture:data.results
}) 

// export const fetchData = (dispatch:any) => {
//     return fetch("http://127.0.0.1:5000/")
//         .then((response:any) => response.json())
//         .then( data =>
//          dispatch({type: FETCH_DATA, fixture:data.results
//      }))
//  } // not being used 

//update the type of response 

