import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'

import withCss from '@/services/withCss'
import styles from './tab.less'

@withCss(styles)
class Tab extends PureComponent {
    constructor(props) {
        super(props)
    }

    state = {
        tabs: ['home', 'search', 'myBoard', 'waterfall', 'iscroll']
    }

    render() {
        const {history} = this.props,
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
}

export default withRouter(Tab)