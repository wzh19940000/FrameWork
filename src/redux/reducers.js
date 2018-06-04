import { combineReducers } from 'redux'
import combineStates, { combindStates } from './combineStates'

import access from './access/reducer'
import organization from './organization/reducer'
import user from './user/reducer'
import fileView from './fileView/reducer'

const reducers = {
    access,
    organization,
    user,
    fileView
}
Object.keys(reducers).forEach(key => (reducers[key] = combineStates(reducers[key])))

export default combineReducers(reducers)