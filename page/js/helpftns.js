/*
define all the helper functions I like
shouldUpdate(instance, nextProps, nextState) is by React
*/

(function attach(instance) {
// React
    /*const hasOwnProperty = Object.prototype.hasOwnProperty;
    function shallowCompare(instance, nextProps, nextState) {
        return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
    }

    function is(x, y) {
        // SameValue algorithm
        if (x === y) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    }

    function shallowEqual(objA, objB) {
        if (is(objA, objB)) {
            return true;
        }

        if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
            return false;
        }

        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) {
            return false;
        }

        // Test for A's keys different from B.
        for (var i = 0; i < keysA.length; i++) {
            if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
                return false;
            }
        }
        return true;
    }
    function setDOM(element) {
        // set this.DOM to be the actual DOM object for easy javascript manipulation
        if (element && !this.hasOwnProperty('DOM')) {
            this.DOM = element;
            // console.log('setting DOM', element);
        }
    }

    function autoBind(obj, ftns) {
        ftns.forEach(func => {
            Object.assign(obj, {
            [func.name]: func.bind(obj)
            })
        })
    }*/
// end React
    

    function $(selector, host = document) {
        if (selector.startsWith('#')) return host.querySelector(selector);
        else {
            const elements = host.querySelectorAll(selector);
            if (elements.length == 1) return elements[0];
            else return elements;
        }
    }

    function creatE(tag, attributes) {
        const ele = document.createElement(tag);
        if (attributes) {
            for (attr in attributes) {
                ele.setAttribute(attr, attributes[attr]);
            }
        }
        return ele;
    }

    function deleteE(element, parent = element.parentNode) {
        if (parent) {
            parent.removeChild(element);
        }
    }

    Object.assign(instance,
        {
            /*shouldUpdate: shallowCompare,
            setDOM, autoBind,*/
            $, creatE, deleteE, AjaxPromise
        }
    );

    function AjaxPromise(method, url, type=null, headers = [], body = null) {
    // headers is a list of lists of[key,val], resolves into XHR.response
    return new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest;
        ajax.open(method, url);
        headers.forEach(([key, val]) => {
            ajax.setRequestHeader(key, val)
        })
        if (type) ajax.responseType = type;
        ajax.send(body);
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE) {
                if (ajax.status == 200) resolve(ajax.response);
                else reject(ajax.statusText);
            }
        }
    })
}
})(window);
