import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {openPop} from '@/redux/action/pop'

class Search extends PureComponent {
    constructor(props) {
        super(props)

    }

    state = {
        refresh: false,
        board: {
            a: 1
        }
    }

    // shouldComponentUpdate() {
    //     console.log(121231, 12312)
    //     return true
    // }

    handleClick = () => {
        console.log('search~~~~~~~~~~~')
        // this.state.refresh = true;
        // this.setState(this.state);
        this.setState({refresh: true});
    }

    render() {
        console.log('search')
        return (
            <div>
                Search
                <div>
                    <span onClick={() => {
                        this.props.openPop('SEARCH', {
                            msg: 'SEARCH  页面打开'
                        })
                    }}>打开一个pop</span>

                    <div onClick={this.handleClick}>
                        刷新子组件
                    </div>
                    <BB refresh={this.state.refresh}/>
                </div>
            </div>
        )
    }
}

class BB extends PureComponent {
    render() {
        console.log('子罪案' + this.props.refresh)
        return (
            <p>asasda阿萨德盛大的</p>
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


