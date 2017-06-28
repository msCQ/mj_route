import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router'
import {connect} from 'react-redux'


import Page from '@/components/page'
import Editor from '@/components/editor/index'
import {toggleWindowMode} from '@/redux/action/appSetting'

import debounce from 'lodash/debounce'

class Index extends PureComponent {
    constructor(props) {
        super(props)
    }

    state = {
        windowMode: 1,      //窗口状态
    }

    static propTypes = {
        resizeWindow: PropTypes.func.isRequired,
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize, false)
    }

    componentWillUnMount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = debounce(() => {
        this.props.resizeWindow();
        console.log('resize', Date.now())
    }, 400)

    render() {
        return (
            <div>
                <Route path="/" component={Page}/>
                <Route component={Editor}/>
            </div>
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        resizeWindow(){
            dispatch(toggleWindowMode())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)

