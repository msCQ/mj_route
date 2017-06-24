import ReactDom from 'react-dom'
import React from 'react'
import {Router, Route, Redirect, Switch} from 'react-router'
import Index from '@/components/index'
import Login from '@/components/login/index'
import {createHashHistory, createMemoryHistory} from 'history'
import '@/styles/reset.css'
import {Provider} from 'react-redux'
import store from '@/redux/store'


import Perf from 'react-dom/lib/ReactPerf'    //
window.Perf = Perf

const history = createMemoryHistory()

class App extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route path="/" component={Index}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

ReactDom.render((<App />), document.getElementById('app'))