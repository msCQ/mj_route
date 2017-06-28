import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {openPop} from '@/redux/action/pop'

class Search extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                Search
                <div>
                    <span onClick={() => {
                        this.props.openPop('SEARCH', {
                            msg: 'SEARCH  页面打开'
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


export default connect(mapStateToProps, mapDispatchProps)(Search)


