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
        case type.inc:
            return {
                count: state.count + 1
            }
        case type.dec:
            return {
                count: state.count - 1
            }
    }
}
export default {
    initialState,
    getNewState
}
