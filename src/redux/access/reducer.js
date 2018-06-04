import type from './type'

const initialState = {
    count: 1
}
const getNewState = (state, action) => {
    switch(action.type) {
        case type.loadHierarchy:
            return {
                count: state.count + 1
            }
        default:
            return null
    }
}
export default {
    initialState,
    getNewState
}