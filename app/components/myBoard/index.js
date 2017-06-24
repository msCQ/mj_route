import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {openPop} from '@/redux/action/pop'

import throttle from 'lodash/throttle'


class MyBoard extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    state = {
        count: 0
    }

    countAdd = throttle(function () {
        this.forceUpdate()
    }, 500).bind(this)


    render() {
        const {match, location, history} = this.props
        return (
            <div>
                MyBoard
                <div>
                    <span onClick={() => {
                        this.props.openPop('MYBOARD', {
                            msg: 'board页面打开'
                        })
                    }}>打开一个pop</span>
                    <p onClick={this.countAdd}>点点点</p>
                </div>
                <BB/>
            </div>
        )
    }
}

class BB extends React.Component {
    constructor(props) {
        super(props)
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    // if (nextState === this.state) {
    //     return false
    // }
    // return true
    // }
    render() {
        console.log(1111)
        return (
            <p>asasda1</p>
        )
    }
}


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


export default connect(mapStateToProps, mapDispatchProps)(MyBoard)


