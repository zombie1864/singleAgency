export const FETCH_DATA = 'FECTH_DATA'
export const SET_DATA = 'SET_DATA'

export const fetchData = (response:any) => ({
    type: FETCH_DATA,
    response
})

export const setData = (response:any) => ({
    type: SET_DATA, 
    response
})