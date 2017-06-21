import React from 'react'
import {Route} from 'react-router'
import Page from '@/components/page'
import Editor from '@/components/editor/index'

let Index = React.createClass({
    getInitialState(){
        return {
            windowMode: 1,      //窗口状态
        }
    },
    render() {
        return (
            <div>
                <Route path="/" component={Page}/>
                <Route component={Editor}/>
            </div>
        )
    }
})

module.exports = Index