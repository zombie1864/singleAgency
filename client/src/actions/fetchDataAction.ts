export const SET_DATA = 'SET_DATA'

export const fetchData = (data:any) => ({
    type: SET_DATA,
    fixture:data.results
}) 

//update the type of response 


// fetchData: () => { 
//     fetch("http://127.0.0.1:5000/")
//         .then( (response:any) => {
//             return response.json()
//         })
//         .then( (data:any) => {
//             dispatch({type: SET_DATA, fixture:data.results})
//         })
// }, 