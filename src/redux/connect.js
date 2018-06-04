import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import access from './access/action'
import organization from './organization/action'
import user from './user/action'
import fileView from './fileView/action'

const actions = {
    access,
    organization,
    user,
    fileView
}

const reduceObjects = objArr => objArr.reduce((a, b) => ({
    ...a,
    ...b
}), {})

export default (...keys) => {
    if (process.env.NODE_ENV === 'development' && (!keys.length)) {
        throw new Error('connect requires keys!')
    }
    if (keys.length === 1) {
        const key = keys[0]
        return connect(
            state => state[key],
            dispatch => bindActionCreators(actions[key], dispatch)
        )
    }
    return connect(
        state => reduceObjects(keys.map(key => state[key])),
        dispatch => reduceObjects(keys.map(key => bindActionCreators(actions[key], dispatch)))
    )
}