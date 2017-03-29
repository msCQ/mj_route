import React, {Proptypes} from 'react'
import CSSModules from 'react-css-modules'

export default function (Component, styles) {
    let C = CSSModules(Component, styles);
    C.displayName = Component.prototype.displayName;
    return C
};