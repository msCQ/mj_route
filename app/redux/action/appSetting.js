export const SETTING_EDIT_MODE = 'SETTING_EDIT_MODE'
export const SETTING_WINDOW_MODE = 'SETTING_WINDOW_MODE'


export function toggleEditMode(mode) {
    return {
        type: SETTING_EDIT_MODE,
        mode
    }
}

export function toggleWindowMode(mode = '') {
    //可以不带参数
    return {
        type: SETTING_WINDOW_MODE,
        mode
    }
}
