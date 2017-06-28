import PopTransitionManager from '@/services/PopTransitionManager'
import {POP_MAP} from '@/services/const'

const popTransitionManager = new PopTransitionManager(POP_MAP)

export const POP_ACTION = {
    PUSH: 'PUSH',
    CLOSE: 'CLOSE',
    CLOSE_ALL: 'CLOSE_ALL',
    // GO: 'GO',
    INNER_PUSH: 'INNER_PUSH',
    INNER_REPLACE: 'INNER_REPLACE',
    INNER_GOBACK: 'INNER_GOBACK',
    INNER_GOFORWORD: 'INNER_GOFORWORD',


    TRACEBACK: 'TRACEBACK'
}


export function openPop(entry, data) {
    let pops = popTransitionManager.openPop(entry, data);
    return {
        type: POP_ACTION.PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function closePop(entry) {
    let pops = popTransitionManager.closePop(entry)
    return {
        type: POP_ACTION.CLOSE,
        data: {
            entry,
            pops
        }
    }
}
export function closePopAll(entry) {
    popTransitionManager.block(entry);
    return {
        type: POP_ACTION.CLOSE_ALL,
        data: {
            entry,
            pops: []
        }
    }
}

export function traceBackPop(entry) {
    let pops = popTransitionManager.traceBack(entry)
    return {
        type: POP_ACTION.TRACEBACK,
        data: {
            entry,
            pops
        }
    }
}


export function innerPopPush(entry, data) {
    let pops = popTransitionManager.innerPush(entry, data);
    return {
        type: POP_ACTION.INNER_PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function innerPopReplace(entry, data) {
    let pops = popTransitionManager.innerReplace(entry, data)
    return {
        type: POP_ACTION.INNER_PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function innerPopGoBack(entry) {
    let pops = popTransitionManager.innerGoBack(entry)
    return {
        type: POP_ACTION.INNER_PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function innerPopGoForword(entry) {
    let pops = popTransitionManager.innerGoForword(entry)
    return {
        type: POP_ACTION.INNER_PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function asyncClosePopAll() {
    return (dispatch) => {
        dispatch(closePopAll('HOME'))
    }

}

