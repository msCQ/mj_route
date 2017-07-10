import React, {PureComponent} from 'react'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'
import withCss from '@/services/withCss'
import styles from './iScroll.less'

@withCss(styles)
class IScroll extends PureComponent {
    constructor(props) {
        super(props)
    }

    state = {
        options: {
            mouseWheel: true,
            scrollbars: true,
            fadeScrollbars: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
        },
        height: 500
    }

    componentDidMount() {

    }

    render() {
        return (
            <ReactIScroll iScroll={iScroll}
                          options={this.state.options}>
                <div style={{height: this.state.height}}>
                    阿萨达达达的
                    <p style={{marginTop: 400}}
                       onClick={() => {
                           this.setState((prevState) => {
                               return {
                                   height: prevState.height + 500
                               }
                           })
                       }}>新增</p>
                </div>
            </ReactIScroll>
        )
    }
}

export default IScroll

