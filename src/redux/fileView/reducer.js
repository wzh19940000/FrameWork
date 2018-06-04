import type from './type'

const initialState = {
    fileType: 'unknown',
    url: null,
    active: false,
    loading: false
}

const getNewState = (state, action) => {
    switch(action.type) {
        case type.changeFileView:
            return {
                fileType: action.fileType,
                url: action.url,
                loading: false
            }
        case type.reset:
            return initialState
        case type.showFileView:
            return {
                loading: true,
                active: true
            }
    }
}

export default {
    initialState,
    getNewState
}