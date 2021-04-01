export const FETCH_DATA = 'FETCH_DATA'
export const SET_DATA = "SET_DATA"
export const FETCH_ERR = "FETCH_ERR"

// export const fetchDataRequest = () => ({
//     type: FETCH_DATA
// }) this can be used to display a loading indicator for large data 

export const fetchErrMsg = () => ({
    type: FETCH_ERR
})

export const setData = (data:any) => ({
    type: SET_DATA, 
    fixture:data.results
})

export const fetchData = () => {
    return (dispatch:any) => {
        // dispatch(fetchDataRequest()) // useful for loading 
        fetch("http://127.0.0.1:5000/")
        .then( (response:any) => {
            if (response.status === 200) {
                return response.json()
            } else {
                return dispatch(fetchErrMsg())
            }
        }).then(data =>{
            console.log("data",data);
            
            return data.type === FETCH_ERR ? null : dispatch(setData(data))
        }
        )
    }
} 


