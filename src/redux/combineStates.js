export default ({initialState, getNewState}) => (state = initialState, action) => {
    return {
        ...state,
        ...(getNewState(state, action) || {})
    }
}