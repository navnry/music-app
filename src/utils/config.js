export const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}

export function shuffle(arr) {
    let _arr = arr.slice(0)
    for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * (i - 0 + 1) + 0)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }

    return _arr
}

export function debounce(func, delay) {
    let timer

    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

export function throttle(fn, delay) {
    let flag = true;
    return (...args) => {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true;
        }, delay);
    };
}

// 判断是添加哪种css3类型
export function prefixStyle(style) {
    let elementStyle = document.createElement('div').style

    let vendor = (() => {
        let transformNames = {
            webkit: 'webkitTransform',
            Moz: 'MozTransform',
            O: 'OTransform',
            ms: 'msTransform',
            standard: 'transform'
        }

        for (let key in transformNames) {
            if (elementStyle[transformNames[key]] !== undefined) {
                return key
            }
        }

        return false
    })()

    if (vendor === false) {
        return false
    }

    if (vendor === 'standard') {
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
