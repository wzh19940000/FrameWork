import type from './type'

const initialState = {
    login: true
}
const getNewState = (state, action) => {
    switch(action.type) {
        case type.logout:
            return {
                login: false
            }
        case type.login:
            return {
                login: true
            }
    }
}
export default {
    initialState,
    getNewState
}