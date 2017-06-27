import {SETTING_EDIT_MODE, SETTING_WINDOW_MODE} from '@/redux/action/appSetting'
const WINDOW_MODE = 'WINDOW_MODE'

let initAppSetting = {
    windowObj: {
        h: window.innerHeight,
        w: window.innerWidth,
        mode: 'middle'
    },
    edit: false
}

export default function appSetting(state = initAppSetting, action) {
    switch (action.type) {
        case SETTING_WINDOW_MODE:
            let h = window.innerHeight,
                w = window.innerWidth,
                mode = '';
            if (w > 0 && w < 780) {
                mode = 'small'
            } else if (w >= 780 && w < 1440) {
                mode = 'middle'
            } else if (w >= 1440) {
                mode = 'big'
            }
            return {...state, windowObj: {h, w, mode}}
            break;
        case SETTING_EDIT_MODE:

            break;
        default:
            return state
    }
}