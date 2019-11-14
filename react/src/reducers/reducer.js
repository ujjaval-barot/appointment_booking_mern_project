const reducer = (state='', action) => {
    if (action.type === "GET_ONLINE") {
        return {
            ...state,
            appointments : action.payload
        }
    }
    return state
}



export default reducer;