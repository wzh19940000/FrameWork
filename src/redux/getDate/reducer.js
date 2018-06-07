import type from './type'
import moment from 'moment'; 

const initialState = {
    nowDate:'2018-06-06 00:00:00'
}
const getNewState = (state, action) => {
    switch(action.type) {
        case type.loadDate:
            return {
                nowDate: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        
    }
}
export default {
    initialState,
    getNewState
}
