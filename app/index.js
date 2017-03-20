import ReactDom from 'react-dom'
import React from 'react'
import {Router, Route} from 'react-router'

import createHashHistory from 'history/createHashHistory'
import {Link} from 'react-router-dom'
import 'Styles/reset.css'
import 'Styles/index.less'
import Board from './components/board'
import Item from './components/item'
import Index from './components'
import Project from './components/board'

const history = createHashHistory()


let App = React.createClass({
    render(){
        return (
            <Router history={history}>
                <div>
                    <ul className="tab">
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
});

ReactDom.render((<App />), document.getElementById('app'))

