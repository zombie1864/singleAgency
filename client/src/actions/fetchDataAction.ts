export const FETCH_DATA = 'FECTH_DATA'
export const SET_DATA = 'SET_DATA'

export const fetchData = () => ({
    type: FETCH_DATA
})

export const setData = (response:any) => ({
    type: SET_DATA, 
    response
})