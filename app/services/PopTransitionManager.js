/**
 * PopTransitionManager entry 只对应 Tabtype
 * entries 为维护pop 层次  路由相关
 * 单pop内部逻辑 参考push
 */
class PopTransitionManager {
    constructor(initEntrise) {
        this.entries = {}                   //只存储hash值
        this._createEntrise(initEntrise)
        this.hashPopManager = new HashPopManager()
    }

    _createEntrise(initEntrise) {
        if (Array.isArray(initEntrise)) {
            initEntrise.forEach(entry => {
                typeof entry === 'string' && (this.entries[entry] = [])
                this.curEntry = initEntrise[0]
            })
        } else {
            typeof initEntrise === 'string' && (this.entries[initEntrise] = [])
            this.curEntry = initEntrise
        }
    }

    openPop(entry, data) {
        if (!data) {
            debugger
        }
        let hash = createHash()
        this.entries[entry].push(hash)
        this.hashPopManager.push(hash, data)
        let pop = this.hashPopManager.getCurrentData(hash);
        return {...pop, s: this.entries[entry].length - 1}
    }

    closePop(entry) {
        // 清楚之前所有的 hash
        let lastPop = this.entries[entry].pop()
        this.hashPopManager.deleleHash(lastPop)
        let {length} = this.entries[entry]
        if (length) {
            let s = this.entries[entry].length - 1,
                hash = this.entries[entry][s],
                pop = this.hashPopManager.getCurrentData(hash);
            return {...pop, s}
        } else {
            return null         //当前无视图
        }
    }

    /**
     * 用户关闭所有窗口
     * @param entry
     * @returns {null}
     */
    block(entry) {
        if (!this.entries[entry]) {
            return null
        }
        this.entries[entry].forEach((hash) => {
            this.hashPopManager.deleleHash(hash)
        })
        this.entries[entry] = []
        return null
    }

    traceBack(entry) {
        if (!this.entries[entry].length) {
            return null
        }
        let s = this.entries[entry].length - 1,
            hash = this.entries[entry][s],
            pop = this.hashPopManager.getCurrentData(hash);
        return {...pop, s}
    }

    innerPush(entry, data) {
        let s = this.entries[entry].length - 1,
            hash = this.entries[entry][s];
        this.hashPopManager.push(hash, data)
        let pop = this.hashPopManager.getCurrentData(hash);
        return {...pop, s}
    }

    innerReplace(entry, data) {
        let s = this.entries[entry].length - 1,
            hash = this.entries[entry][s];
        this.hashPopManager.replace(hash, data)
        let pop = this.hashPopManager.getCurrentData(hash);
        return {...pop, s}
    }

    innerGoBack(entry) {
        let s = this.entries[entry].length - 1,
            hash = this.entries[entry][s];
        if (!this.hashPopManager.go(hash, -1)) {
            throw new Error('goBack Failed!!!')
            return null
        }
        let pop = this.hashPopManager.getCurrentData(hash);
        return {...pop, s}
    }

    innerGoForword(entry) {
        let s = this.entries[entry].length - 1,
            hash = this.entries[entry][s];
        if (!this.hashPopManager.go(hash, 1)) {
            throw new Error('goForword Failed!!!')
            return null
        }
        let pop = this.hashPopManager.getCurrentData(hash);
        return {...pop, s}
    }

}

class HashPopManager {
    constructor() {
        this.entries = {}
    }

    push(hash, data) {
        let obj = this.entries[hash],
            action = 'PUSH'
        if (!obj) {
            this.entries[hash] = {
                action,
                l: 0,
                history: [data]
            }
        } else {
            let nextHistory = obj.history.splice(0, obj.l + 1);
            nextHistory.push(data);
            this.entries[hash] = {
                action,
                l: obj.l + 1,
                history: nextHistory
            }

        }
    }

    replace(hash, data) {
        let obj = this.entries[hash],
            action = 'REPLACE'
        this.entries[hash].history[this.entries[hash].l] = data
    }

    go(hash, n) {
        let obj = this.entries[hash];
        let nextIndex = clamp(obj.l + n, 0, obj.history.length - 1);
        let action = 'POP';
        obj.l = nextIndex;
        return nextIndex >= 0 && nextIndex <= obj.history.length - 1
    }

    getCurrentData(hash) {
        let {history, l} = this.entries[hash]
        return {
            data: history[l],
            hash,
            l,
            total: this.entries[hash].history.length
        }
    }

    deleleHash(hash) {
        delete this.entries[hash]
    }
}

function clamp(n, lowerBound, upperBound) {
    return Math.min(Math.max(n, lowerBound), upperBound);
}
function createHash() {
    return Math.random().toString(36).substr(2, 12);
}

export default PopTransitionManager