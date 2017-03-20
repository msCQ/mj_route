export default {
    childRoutes: [ {
        path: '/',
        component: require('./components/index.js'),
        childRoutes: [
            require('./routes/Calendar'),
        ]
    } ]
}
