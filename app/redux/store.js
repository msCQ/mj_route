import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import rootReducer from './reducer/index'

import {toggleWindowMode} from './action/appSetting'

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

let store = createStore(
    rootReducer,
    enhancer
)

store.dispatch(toggleWindowMode())

export default store