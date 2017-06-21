import React, {PropTypes} from 'react'
import {Route} from 'react-router'

let Login = React.createClass({
    render(){
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
})
export default Login


