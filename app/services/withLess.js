import React from 'react'
import CSSModules from 'react-css-modules'
import {isPlainObject} from 'lodash'

export default function (componentOpt, style) {
    let Component;
    if (isPlainObject(componentOpt)) {
        Component = React.createClass(componentOpt);
    } else {
        Component = componentOpt;
    }
    if (!style) return Component;
    return CSSModules(Component, style, {allowMultiple: true});
};
