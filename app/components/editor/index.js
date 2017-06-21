import React, {PropTypes} from 'react'
import {Route} from 'react-router'

import MyBoard from '@/components/myBoard/index'
import withLess from '@/services/withLess'
import styles from './editor.less'
const createClass = (opt) => withLess(opt, styles)


let Editor = createClass({
    display: 'Editor',
    render(){
        return (
            <div styleName="editor">
                EditorEditorEditorEditor
                <Route path="/search" component={MyBoard}/>
            </div>
        )
    }
})

export default Editor


