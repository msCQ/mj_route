import React from 'react'
import {Route} from 'react-router'

const BoardA = (match) => {
    console.log(B);
    return (
        <div>CCCC</div>
    )
}
let Board = React.createClass({
    render(){
        return (
            <div>
                <div>Board</div>
                <Route path="/board/BoardA" exact render={({match}) => {
                    console.log(match)
                    return (<div>Home</div>)
                } }/>
            </div>
        )
    }
})

export default Board