import React from 'react'
import Router from 'react-router'
import rootRoute from './routes/index'
import './ts/test.ts'



let App = React.createClass({
    render(){
        return (
            <Router
                routes={rootRoute}
            />
        )
    }
})
export default App