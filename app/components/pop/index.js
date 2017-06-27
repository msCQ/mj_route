import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {POP_MAP} from '@/services/const'
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup"

import {
    openPop,
    closePop,
    closePopAll,
    traceBackPop,
    innerPopPush,
    innerPopReplace,
    innerPopGoBack,
    innerPopGoForword,
    asyncClosePopAll
} from '@/redux/action/pop'
import withCss from '@/services/withCss'
import styles from './pop.less'
import toUpper from 'lodash/toUpper'

@withCss(styles)
class Pop extends PureComponent {
    constructor(props) {
        super(props)
    }

    state = {}
    static defaultProps = {
        popManager: {
            pops: []
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.location !== this.props.location) {
            let nextEntryType = this._getEntryType(nextProps.location.pathname),
                prevEntryType = this._getEntryType(this.props.location.pathname);
            if (nextEntryType !== prevEntryType) {
                this.props.traceBackPop(nextEntryType);
            }
        }
    }

    _getEntryType = (pathname) => {
        for (let i = POP_MAP.length - 1; i >= 0; i--) {
            let m = toUpper(pathname);
            if (m.indexOf(POP_MAP[i]) === 1) {
                return POP_MAP[i]
            }
        }
    }

    render() {
        let {
                location,
                popManager: {pops},
            } = this.props,
            popHandle = {
                openPop: this.props.openPop,
                closePop: this.props.closePop,
                closePopAll: this.props.closePopAll,
                traceBackPop: this.props.traceBackPop,
                innerPopPush: this.props.innerPopPush,
                innerPopReplace: this.props.innerPopReplace,
                innerPopGoBack: this.props.innerPopGoBack,
                innerPopGoForword: this.props.innerPopGoForword,
                asyncClosePopAll: this.props.asyncClosePopAll
            },
            entry = this._getEntryType(location.pathname);
        return (
            <ReactCSSTransitionGroup transitionName="pop-modal"
                                     transitionLeaveTimeout={500}
                                     transitionEnterTimeout={500}
            >
                {
                    pops.map((data, index) => {
                        if (!data) {
                            return null
                        }
                        return (
                            <Modal key={data.hash}
                                   index={index}
                                   data={data}
                                   entry={entry}
                                   {...popHandle}
                                   showMsg={this.showMsg}
                            />
                        )
                    })
                }
            </ReactCSSTransitionGroup>
        )
    }
}

@withCss(styles)
class Modal extends PureComponent {
    static defaultProps = {
        /**
         *   extra 强制  无动画
         *   unfore 只有头部 没有内容
         *   fore 带动画
         */
        renderMode: PropTypes.oneOf(['extra', 'fore', 'unfore'])
    }

    state = {
        value: ''
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        const {index, data, entry} = this.props;
        let msg = `当前打开了第${index}`,
            parseData = JSON.stringify(data)
        return (
            <div styleName="modal">
                <header>
                    <div styleName="close" onClick={() => {
                        this.props.closePopAll(entry)
                    }}>
                        关闭全部
                    </div>
                    <div styleName="close" onClick={() => {
                        this.props.closePop(entry)
                    }}>
                        关闭
                    </div>
                </header>
                <section>
                    <div styleName="btnWrap">
                        <span onClick={() => {
                            this.props.innerPopPush(entry, {
                                msg: 'push内部视图',
                                value: this.state.value
                            })
                        }}>push内部视图</span>
                    </div>
                    <div styleName="btnWrap">
                        <span onClick={() => {
                            this.props.innerPopReplace(entry, {
                                msg: '已替换当前页',
                                value: this.state.value
                            })
                        }}>替换当前视图</span>
                    </div>
                    <div styleName="btnWrap">
                        <span onClick={() => {
                            this.props.innerPopGoForword(entry, {
                                msg: '下一个视图',
                                value: this.state.value
                            })
                        }}>下一个</span>
                    </div>
                    <div styleName="btnWrap">
                        <span onClick={() => {
                            this.props.innerPopGoBack(entry, {
                                msg: '上一个视图',
                                value: this.state.value
                            })
                        }}>上一个</span>
                    </div>
                    <div styleName="btnWrap">
                        <span onClick={() => {
                            this.props.openPop(entry, {
                                msg: `${entry} 内部打开`,
                                value: this.state.value
                            })
                        }}>新开pop</span>
                    </div>
                    <div styleName="btnWrap">
                        <span onClick={() => {
                            this.props.asyncClosePopAll(entry, {
                                msg: `${entry} 内部打开`,
                                value: this.state.value
                            })
                        }}>关闭所有</span>
                    </div>
                    <input type="text" value={this.state.value} onChange={(e) => {
                        this.setState({
                            value: e.target.value
                        });
                    }}/>
                    <p>{msg}</p>
                    <p>{parseData}</p>
                    <div style={{height: 400}}/>
                </section>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        popManager: state.pop
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openPop: (entry, data) => {
            // getState
            dispatch(openPop(entry, data))
        },
        closePop: (entry) => {
            dispatch(closePop(entry))
        },
        closePopAll: (entry) => {
            dispatch(closePopAll(entry));
        },
        traceBackPop: (entry) => {
            dispatch(traceBackPop(entry));
        },
        innerPopPush: (entry, data) => {
            dispatch(innerPopPush(entry, data))
        },
        innerPopReplace: (entry, data) => {
            dispatch(innerPopReplace(entry, data))
        },
        innerPopGoBack: (entry) => {
            dispatch(innerPopGoBack(entry))
        },
        innerPopGoForword: (entry) => {
            dispatch(innerPopGoForword(entry))
        },
        asyncClosePopAll: (entry) => {
            dispatch(asyncClosePopAll(entry))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pop))
