module.exports = {
    path: 'item',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/item/index'))
        })
    }
}