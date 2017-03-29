import React from 'react'
import Project from '../project/index'
import Pop from '../pop/index'

let Item = React.createClass({
    getInitialState(){
        return {
            open: false
        }
    },
    _togglePop(){
        this.state.open = !this.state.open;
        this.setState(this.state);
    },
    render(){
        return (
            <div>
                Item
                <Project />
                <p onClick={this._togglePop}>打开Pop</p>
                {
                    this.state.open ? (<Pop _togglePop={this._togglePop}/>) : null
                }
            </div>
        )
    }
})
export default Item