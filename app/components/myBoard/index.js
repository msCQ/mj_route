import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {openPop} from '@/redux/action/pop'

let MyBoard = React.createClass({
    render(){
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
                </div>
            </div>
        )
    }
})

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


