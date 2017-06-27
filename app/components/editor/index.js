import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router'

import MyBoard from '@/components/myBoard/index'
import withCss from '@/services/withCss'
import styles from './editor.less'

@withCss(styles)
class Editor extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div styleName="editor">
                EditorEditorEditorEditor
                <Route path="/search" component={MyBoard}/>
            </div>
        )
    }
}

export default Editor


