import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {openPop} from '@/redux/action/pop'

class Home extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {history} = this.props
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
}

const mapStateToProps = function () {
    return {}
}

const mapDispatchProps = function (dispatch) {
    return {
        openPop: (entry, data) => {
            dispatch(openPop(entry, data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Home)


