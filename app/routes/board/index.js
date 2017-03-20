module.exports = {
    path: 'board',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/item/board'))
        })
    }
}