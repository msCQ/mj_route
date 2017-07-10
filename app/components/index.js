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

let headers = new Headers();
headers.append('Accept', 'application/json, text/plain, */*');
headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
let form = new FormData()
form.set('a', 1)
form.set('b', 1)

fetch('/api/login/helloworld?c=2', {
    headers,
    method: 'POST',
    body: 'asdasda=12&ad=111111'
    // cache: 'default'
}).then((res) => {
    return res.json()
}).then(() => {
    console.log(11111)
})


export default connect(mapStateToProps, mapDispatchToProps)(Index)

