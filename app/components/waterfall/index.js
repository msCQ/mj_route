import React, {PureComponent, Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import withCss from '@/services/withCss'
import styles from './waterfall.less'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'

const gridData = [
    {w: 236, h: 450},
    {w: 236, h: 120},
    {w: 236, h: 230},
    {w: 236, h: 180},
    {w: 236, h: 260}
]
/**
 * 分析 列之间间隔  24px
 */


@withCss(styles)
class WaterFall extends PureComponent {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        windowObj: PropTypes.object
    }
    static props = {}

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
    }

    componentDidMount() {
        let column = this.state[this.props.windowObj.mode].column
        this.initGrid(column)
        this.refs['WaterFall_Gird'].addEventListener('scroll', this.handleScroll, false)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.windowObj.mode !== this.props.windowObj.mode) {
            let column = this.state[nextProps.windowObj.mode].column
            this.initGrid(column)
        }
    }

    componentWillUnMount() {
        this.refs['WaterFall_Gird'].removeEventListener('scroll', this.handleScroll)
    }

    initGrid = (column) => {
        let girdS = []
        for (let i = 0; i < 17; i++) {
            gridData.forEach((i) => {
                girdS.push({...i});
            })
        }
        let gridObject = this.getGridObject(girdS, column),
            {boards, columns} = gridObject,
            maxHeight = maxBy(columns, (column) => {
                return column.h
            }).h
        this.setState({
            list: boards,
            gridHeight: maxHeight,
            renderList: boards.slice(0, this.state.renderNumber)
        })
    }

    handleScroll = (e) => {
        let gridDom = e.target,
            {scrollTop} = gridDom
        // console.log(scrollTop)
        /**
         * 获取需要渲染的10个dom
         * 如何计算一个 第一个dom
         * 设置上不可见的高度
         *  当第一个dom尾部 到达不可见高度 即可渲染
         *
         */
        const PADDING_TRAIL = 200
        let {list} = this.state,
            firstDom = {},
            firstRenderIndex = 0;
        for (let i = 0; i < this.state.list.length - 1; i++) {
            let board = this.state.list[i]
            if (board.y + board.h > scrollTop - PADDING_TRAIL) {
                firstRenderIndex = i
                break;
            }
        }
        if (firstRenderIndex !== this.state.firstRenderIndex) {
            let {renderNumber} = this.state,
                renderList = list.slice(firstRenderIndex, firstRenderIndex + renderNumber)
            if (list.length - 1 - firstRenderIndex - renderNumber < renderNumber) {
                renderList = list.slice(firstRenderIndex, list.length - 1)  //接近末尾刷出 尾数据
            }
            this.setState({
                firstRenderIndex,
                renderList
            })
            console.log('第一个渲染的DOM 下标', firstRenderIndex, `scrollTop: ${scrollTop}`)
        }
    }

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

    render() {
        let {renderList, gridHeight} = this.state,
            iWidth = this.state[this.props.windowObj.mode].iWidth

        return (
            <section styleName="waterfall"
                     ref="WaterFall_Gird">
                <div styleName="grid-center">
                    <div>
                        <div
                            styleName="grid-contains"
                            style={{
                                width: iWidth,
                                height: gridHeight
                            }}>
                            {
                                renderList.map((board, index) => {
                                    return <Board key={board.index}
                                                  x={board.x}
                                                  y={board.y}
                                                  w={board.w}
                                                  h={board.h}
                                                  index={board.index}
                                    />
                                })
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



