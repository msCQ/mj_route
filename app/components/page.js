import React, {PropTypes} from 'react'
import {Route, Switch, Redirect} from 'react-router'
import Home from '@/components/home/index'
import Search from '@/components/search/index'
import MyBoard from '@/components/myBoard/index'
import Tab from '@/components/tab/index'
import Pop from '@/components/pop/index'
import withLess from '@/services/withLess'
import styles from './page.less'

const createClass = (opt) => withLess(opt, styles)

let Page = createClass({
    render(){
        return (
            <div>
                <Tab/>
                <section styleName="page">
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/home"/>)}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/search" component={Search}/>
                        <Route path="/myBoard" component={MyBoard}/>
                    </Switch>
                    <Pop/>
                </section>
            </div>
        )
    }
})
export default Page


