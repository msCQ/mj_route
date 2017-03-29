import React, {PropTypes} from 'react'
import {Route} from 'react-router'

const BoardA = (match) => {
    console.log(B);
    return (
        <div>CCCC</div>
    )
}
let Board = React.createClass({
    // contextTypes: {
    //     router: PropTypes.object,
    // },
    render(){
        return (
            <div>
                <div>Board</div>
                <Route path="/board/BoardA" exact render={({match}) => {
                    console.log(match)
                    return (<div> Home
                        <p onClick={() => {
                            this.props.history.push({
                                pathname: '/item',
                            })
                        }}>点击点击点击</p>
                            </div>)
                        } }/>
                    </div>
                    )
                }
                })

                export default Board