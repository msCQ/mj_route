import React from 'react'
import {withRouter} from 'react-router'

import withLess from '@/services/withLess'
import styles from './tab.less'
const createClass = option => withLess(option, styles)


let Tab = createClass({
    displayName: 'Tab',
    getInitialState(){
        return {
            tabs: ['home', 'search', 'myBoard']
        }
    },
    render(){
        const {match, history, location} = this.props,
            {tabs} = this.state
        return (
            <div styleName="tab">
                {
                    tabs.map((tab, index) => {
                        return (
                            <div styleName={`link`}
                                 key={index}
                                 onClick={(() => {
                                     /**
                                      * 方法修改  从历史里面查找 有则回退 无则push
                                      */
                                     history.push({
                                         pathname: '/' + tab,
                                     })
                                 })}
                            >{tab}</div>
                        )
                    })
                }
            </div>
        )
    }
})

export default withRouter(Tab)