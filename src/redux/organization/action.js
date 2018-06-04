import type from './type'

const sleep = time => new Promise(res => setTimeout(res, time))

export default {
    loadHierarchy: () => dispatch => dispatch({
        type: type.loadHierarchy
    }),
    inc: () => async dispatch => {
        await sleep(500)
        dispatch({
            type: type.inc
        })
    },
    dec: () => async dispatch => {
        await sleep(800)
        dispatch({
            type: type.dec
        })
    }
}