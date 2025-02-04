export const method = (controller, methodName) => {
    const method = controller[methodName];
    if (typeof method == 'function') {
        return method;
    }
    else {
        return (...args) => { };
    }
};
export const composeEventName = (name, controller, eventPrefix) => {
    let composedName = name;
    if (eventPrefix === true) {
        composedName = `${controller.identifier}:${name}`;
    }
    else if (typeof eventPrefix === 'string') {
        composedName = `${eventPrefix}:${name}`;
    }
    return composedName;
};
export const extendedEvent = (type, event, detail) => {
    const { bubbles, cancelable, composed } = event || { bubbles: true, cancelable: true, composed: true };
    if (event) {
        Object.assign(detail, { originalEvent: event });
    }
    const customEvent = new CustomEvent(type, {
        bubbles,
        cancelable,
        composed,
        detail,
    });
    return customEvent;
};
export function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 1);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 1);
    return (vertInView && horInView);
}
//# sourceMappingURL=index.js.map