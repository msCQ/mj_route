import React, {Proptypes} from 'react'
import withCSS from 'Services/withCSS'
let styles = require('./pop.less')

let Pop = React.createClass({
    getInitialState(){
        return {
            step: 0
        }
    },
    componentDidMount(){

    },
    _forward(){

    },
    _back(){

    },
    render(){
        return (
            <div styleName="pop">
                <div styleName="title">
                    <div styleName="btn"
                         onClick={() => {
                             this.props._togglePop();
                         }}>关闭
                    </div>
                    <div styleName="btn" onClick={this._forward}>前进</div>
                    <div styleName="btn" onClick={this._back}>后退</div>

                </div>
                <div>
                    step： {this.state.step}
                </div>
            </div>
        )
    }
})

export default withCSS(Pop, styles)