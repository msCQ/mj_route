import ReactDom from 'react-dom'
import React from 'react'
import {Router, Route} from 'react-router'
import {createHashHistory, createMemoryHistory} from 'history'
import {Link} from 'react-router-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'


import 'Styles/reset.css'
let styles = require('Styles/index.less')
import Board from './components/board'
import Item from './components/item'
import Index from './components'
import Project from './components/board'
import withCSS from 'Services/withCSS'

//
//
const history = createHashHistory()
// const middleware = routerMiddleware(history)
// const store = createStore(
//     combineReducers({
//         ...reducers,
//         router: routerReducer
//     }),
//     applyMiddleware(middleware)
// )


let App = withCSS(React.createClass({
    render(){
        return (
            <Router history={history}>
                <div>
                    <ul styleName="tab">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/board">board</Link></li>
                        <li><Link to="/item">item</Link></li>
                    </ul>
                    <Route path="/board" component={Board}/>
                    <Route path="/item" component={Item}/>
                </div>
            </Router>
        )
    }
}), styles);

ReactDom.render((<App />), document.getElementById('app'))

if(process.env == 'pr'){

}else {
    new Worker('worker.js');
}
