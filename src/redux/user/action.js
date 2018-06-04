import type from './type'
import axios from 'axios'

export default {
    signIn: () => async dispatch => {
        // const data = await axios('/ulr')
        dispatch({
            type: type.login
        })
    },
    signOut: () => dispatch => dispatch({
        type: type.logout
    })
}