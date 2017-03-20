import React, {Proptypes}from 'react'
import {withRouter} from 'react-router'


let Project = React.createClass({
    contextTypes(){
        return {
            router: Proptypes.func
        }
    },
    render(){
        return (
            <div>Project
                <p onClick={()=>{
                    this.props.history.push('/board')
                }}>娃娃11111</p>

            </div>
        )
    }
})

export default withRouter(Project)