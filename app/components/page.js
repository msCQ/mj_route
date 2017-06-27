import React, {PropTypes, Component, PureComponent} from 'react'
import {Route, Switch, Redirect} from 'react-router'
import Home from '@/components/home/index'
import Search from '@/components/search/index'
import MyBoard from '@/components/myBoard/index'
import Tab from '@/components/tab/index'
import Pop from '@/components/pop/index'
import WaterFall from '@/components/waterfall/index'
import withCss from '@/services/withCss'
import styles from './page.less'

@withCss(styles)
class Page extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Tab/>
                <section styleName="page">
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/waterfall"/>)}/>
                        <Route path="/waterfall" component={WaterFall}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/search" component={Search}/>
                        <Route path="/myBoard" component={MyBoard}/>
                    </Switch>
                    <Pop/>
                </section>
            </div>
        )
    }
}

export default Page