const reducer = (state='', action) => {
    if (action.type === "GET_ONLINE") {
        console.log(action.payload)
        return {
            ...state,
            appointments : action.payload
        }
    }
    return state
}



export default reducer;