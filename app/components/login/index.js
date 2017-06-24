import React, {PropTypes, PureComponent} from 'react'
import {Route} from 'react-router'

class Login extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                用户为登陆状态
                --------------
                <div onClick={() => {
                    this.props.history.go(-1)
                }}>点击登陆
                </div>
            </div>
        )
    }
}
export default Login


