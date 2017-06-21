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
    let pop = popTransitionManager.openPop(entry, data),
        pops = [];
    if (pop) {
        pops = new Array(pop.s).fill(null);
        pops[pop.s] = pop;
    }
    return {
        type: POP_ACTION.PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function closePop(entry) {
    let pop = popTransitionManager.closePop(entry),
        pops = [];
    if (pop) {
        pops = new Array(pop.s).fill(null);
        pops[pop.s] = pop;
    }
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
    let pop = popTransitionManager.traceBack(entry),
        pops = [];
    if (pop) {
        pops = new Array(pop.s).fill(null);
        pops[pop.s] = pop;
    }
    return {
        type: POP_ACTION.TRACEBACK,
        data: {
            entry,
            pops
        }
    }
}


export function innerPopPush(entry, data) {
    let pop = popTransitionManager.innerPush(entry, data),
        pops = [];
    if (pop) {
        pops = new Array(pop.s).fill(null);
        pops[pop.s] = pop;
    }
    return {
        type: POP_ACTION.INNER_PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function innerPopReplace(entry, data) {
    let pop = popTransitionManager.innerReplace(entry, data),
        pops = [];
    if (pop) {
        pops = new Array(pop.s).fill(null);
        pops[pop.s] = pop;
    }
    return {
        type: POP_ACTION.INNER_PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function innerPopGoBack(entry) {
    let pop = popTransitionManager.innerGoBack(entry),
        pops = [];
    if (pop) {
        pops = new Array(pop.s).fill(null);
        pops[pop.s] = pop;
    } else {
        return
    }
    return {
        type: POP_ACTION.INNER_PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function innerPopGoForword(entry) {
    let pop = popTransitionManager.innerGoForword(entry),
        pops = [];
    if (pop) {
        pops = new Array(pop.s).fill(null);
        pops[pop.s] = pop;
    } else {
        return
    }
    return {
        type: POP_ACTION.INNER_PUSH,
        data: {
            entry,
            pops
        }
    }
}

export function asyncClosePopAll(){
    return (dispatch, getState)=>{
        dispatch(closePopAll('HOME'))
    }

}

