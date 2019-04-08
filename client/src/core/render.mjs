export function h(type, props={}, children=[]) {
    return { type, props, children: [].concat(children || "") }
}

export function createElement(vdom) {
    if (typeof vdom === 'string') {
        return vdom
    }

    const $el = document.createElement(vdom.type)
    Object.keys(vdom.props).forEach(function addProp(propName) {
        $el.setAttribute(propName, vdom.props[propName])
    })

    vdom.children.forEach(function createChild(vchild) {
        const $child = createElement(vchild)
        $el.append($child)
    })

    return $el
}