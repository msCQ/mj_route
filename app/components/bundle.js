import {Component} from 'react'

class Bundle extends Component {
    state = {
        mod: null
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        })
        props.load((mod) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null
    }
}
/*
    import loadSomething from 'bundle-loader?lazy!./Something'

    <Bundle load={loadSomething}>
        {(mod) => (
        // do something w/ the module
    )}
    </Bundle>
    <Bundle load={loadSomething}>
        {(Comp) => (Comp
                ? <Comp/>
                : <Loading/>
        )}
    </Bundle>
*/


export default Bundle