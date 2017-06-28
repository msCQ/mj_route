import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import withCss from '@/services/withCss'
import styles from './waterfall.less'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'

const gridData = [
    {w: 236, h: 200},
    {w: 236, h: 120},
    {w: 236, h: 230},
    {w: 236, h: 180},
    {w: 236, h: 260}
]

const PADDING_TRAIL = 200   // 上一个board 距离页面顶部距离
/**
 * 分析 列之间间隔  24px
 */


@withCss(styles)
class WaterFall extends PureComponent {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        windowObj: PropTypes.object,
        dataEnd: PropTypes.bool
    }
    static props = {
        list: [],
        dataEnd: false
    }

    state = {
        firstRenderIndex: 0,
        renderList: [],
        renderNumber: 15,
        list: [],
        gridHeight: 0,
        small: {
            width: 780,
            iWidth: 756,
            column: 3
        },
        middle: {
            width: 1040,
            iWidth: 1016,
            column: 4
        },
        big: {
            width: 1040,
            iWidth: 1016,
            column: 4
        },
        loading: false,

    }

    scrollTop = 0

    componentDidMount() {
        let column = this.state[this.props.windowObj.mode].column
        this.initGrid(column)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.windowObj !== this.props.windowObj) {
            let {mode} = nextProps.windowObj,
                column = this.state[mode].column
            // this.initGrid(column)
            this.reSetGrid(column, this.props.windowObj.mode, nextProps.windowObj.mode)
        }
    }

    componentWillUnMount() {

    }

    initGrid = (column) => {
        let girdS = []
        for (let i = 0; i < 1; i++) {
            gridData.forEach((i) => {
                girdS.push({...i});
            })
        }
        let gridObject = this.getGridObject(girdS, column),
            {boards, columns} = gridObject,
            curGridHeight = maxBy(columns, (column) => {
                return column.h
            }).h
        this.setState({
            list: boards,
            gridHeight: curGridHeight,
            renderList: boards.slice(0, this.state.renderNumber)
        })
    }

    /**
     * 重置当前的数据
     * @param column
     * @param scrollTop
     */
    reSetGrid = (column, prevMode, mode) => {
        let lastScrollTop = this.scrollTop,
            lastIWidth = this.state[prevMode].iWidth,
            curIWidth = this.state[mode].iWidth,
            {list} = this.state;
        let gridObject = this.getGridObject(list, column),
            {boards, columns} = gridObject,
            curGridHeight = maxBy(columns, (column) => {
                return column.h
            }).h,
            curScrollTop = Math.ceil(lastScrollTop * lastIWidth / curIWidth);

        this.setState({
            list: boards,
            gridHeight: curGridHeight,
        })
        /**
         * 精妙
         * 当滚动存在的是否
         *  存在 重置scrollTop 触发必定触发一次onscroll
         *  不存在 安下标来渲染
         */
        this.refs['WaterFall_Gird'].scrollTop = curScrollTop
    }

    handleScroll = (e) => {
        /**
         * 获取需要渲染的10个dom
         * 如何计算一个 第一个dom
         * 设置上不可见的高度
         *  当第一个dom尾部 到达不可见高度 即可渲染
         *
         */
        let gridDom = e.target,
            {scrollTop, offsetHeight} = gridDom,
            {list, renderNumber, gridHeight, loading} = this.state,
            firstRenderIndex = 0,
            renderList = [];
        this.scrollTop = scrollTop;                     //特殊处理滚动值的状态
        for (let i = 0; i < list.length - 1; i++) {
            let board = list[i]
            if (board.y + board.h > scrollTop - PADDING_TRAIL) {
                firstRenderIndex = i
                break;
            }
        }
        if (firstRenderIndex !== this.state.firstRenderIndex) {
            renderList = list.slice(firstRenderIndex, firstRenderIndex + renderNumber)
            if (list.length - 1 - firstRenderIndex - renderNumber < renderNumber) {
                renderList = list.slice(firstRenderIndex, list.length)  //接近末尾刷出 尾数据
            }
            this.setState({
                firstRenderIndex,
                renderList
            })
            console.log('第一个渲染的DOM 下标', firstRenderIndex, `scrollTop: ${scrollTop}`)
        }

        /**
         * 判断是否scroll 距离底部还有20个长度加载数据
         */
        if (scrollTop + offsetHeight > gridHeight - 20 && !loading && !this.props.dataEnd) {
            this.setState((prevState) => {
                this.fetchData();
                return {
                    gridHeight: prevState.gridHeight + 40,
                    loading: true
                }
            })
        }
    }

    /**
     * 获取排列的  每列的数据和 单个board的偏移的数据
     * @param boards
     * @param column
     * @returns {{columns: Array.<*>, boards: *}}
     */
    getGridObject(boards, column) {
        const WIDTH_PADDING = 24;
        const HEIGHT_PADDING = 4;
        let columns = new Array(column).fill(true);
        columns = columns.map(() => {
            return {
                h: 0,
                list: []
            }
        });
        boards.forEach((board, index) => {
            let minColumn = minBy(columns, (column) => {
                return column.h
            })
            let n = columns.indexOf(minColumn)
            board.x = n * (board.w + WIDTH_PADDING)
            board.y = minColumn.h
            board.index = index
            minColumn.h = minColumn.h + board.h + HEIGHT_PADDING
            minColumn.list.push(board);
        });
        return {
            columns,
            boards
        }
    }

    fetchData = () => {
        new Promise((resolve) => {
            setTimeout(() => {
                if (this.__isMounted) return
                resolve(gridData.map((i) => {
                    return {...i}
                }))
            }, 1000)
        }).then((iList) => {
            /**
             * 添加数据数  renderList不变
             * PS 理想 list 是纯数据  父组件流入props.list
             */

            let {column} = this.state[this.props.windowObj.mode],
                curList = this.state.list.concat(iList),
                gridObject = this.getGridObject(curList, column),
                {columns} = gridObject,
                maxHeight = maxBy(columns, (column) => {
                    return column.h
                }).h,
                {renderList, list, renderNumber} = this.state;
            let firstRenderIndex = list.indexOf(renderList[0]),             //找到上一次渲染的下标
                reRenderNumber = Math.min(renderNumber, iList.length, 10),  //再次渲染进的数量
                curRenderList = curList.slice(firstRenderIndex, firstRenderIndex + renderNumber + reRenderNumber)
            this.setState({
                list: curList,
                renderList: curRenderList,
                gridHeight: maxHeight,
                loading: false
            })

        }, () => {
            this.setState((prevState) => {
                return {
                    gridHeight: prevState.gridHeight - 40,
                    loading: false
                }
            })
        })
    }

    render() {
        let {renderList, gridHeight, loading} = this.state,
            iWidth = this.state[this.props.windowObj.mode].iWidth

        return (
            <section styleName="waterfall"
                     ref="WaterFall_Gird"
                     onScroll={this.handleScroll}
            >
                <div styleName="grid-center">
                    <div>
                        <div
                            styleName="grid-contains"
                            style={{
                                width: iWidth,
                                height: gridHeight
                            }}>
                            {
                                renderList.map((board) => {
                                    return <Board key={board.index}
                                                  x={board.x}
                                                  y={board.y}
                                                  w={board.w}
                                                  h={board.h}
                                                  index={board.index}
                                    />
                                })
                            }
                            {
                                loading ? (
                                    <p styleName="grid-loading">加载中。。。。。。。。。。。</p>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </section>
        )

    }
}

@withCss(styles)
class Board extends PureComponent {
    static defaultProps = {
        x: 0,
        y: 0,
    }
    static PropTypes = {
        x: PropTypes.number,
        y: PropTypes.number,

    }
    state = {
        colors: ['#eee', '#ddd', '#ccc', '#aaa']
    }

    render() {
        let {x, y, w, h, index} = this.props,
            colorIndex = parseInt(Math.random() * 4),
            color = this.state.colors[colorIndex]
        return (
            <div styleName="board" style={{
                transform: `translateX(${x}px) translateY(${y}px)`,
                width: w,
                height: h,
                backgroundColor: color
            }}>
                {index}
                <br/>
                {index}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        windowObj: state.appSetting.windowObj
    }
}


export default connect(mapStateToProps)(WaterFall)



