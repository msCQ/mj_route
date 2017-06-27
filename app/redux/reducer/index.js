import {combineReducers} from 'redux'
import pop from './pop'
import appSetting from './appSetting'


const rootReducer = combineReducers({
    pop,
    appSetting
})

export default rootReducer

