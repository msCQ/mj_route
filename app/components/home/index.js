import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {openPop} from '@/redux/action/pop'

let Home = React.createClass({
    render(){
        const {match, location, history} = this.props
        return (
            <div>
                Home
                <div onClick={() => {
                    history.push({
                        pathname: '/LOGIN'
                    })
                    console.log(2131231)
                }}>
                    点击登出
                </div>
                <div>
                    <span onClick={() => {
                        this.props.openPop('HOME', {
                            msg: 'home页面打开'
                        })
                    }}>打开一个pop</span>
                </div>
            </div>
        )
    }
});

const mapStateToProps = function (state) {
    return {}
}

const mapDispatchProps = function (dispatch, getState) {
    return {
        openPop: (entry, data) => {
            dispatch(openPop(entry, data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Home)


