import { extendedEvent, method, composeEventName } from '../support/index';
const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60e3;
const defaultOptions = {
    ms: oneMinute,
    initialState: false,
    events: defaultEvents,
    dispatchEvent: true,
    eventPrefix: true,
};
export const useIdle = (controller, options = {}) => {
    const { ms, initialState, events, dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options);
    let isIdle = initialState;
    let timeout = setTimeout(() => {
        isIdle = true;
        dispatchAway();
    }, ms);
    const dispatchAway = (event) => {
        const eventName = composeEventName('away', controller, eventPrefix);
        controller.isIdle = true;
        method(controller, 'away').call(controller, event);
        if (dispatchEvent) {
            const clickOutsideEvent = extendedEvent(eventName, event || null, { controller });
            controller.element.dispatchEvent(clickOutsideEvent);
        }
    };
    const dispatchBack = (event) => {
        const eventName = composeEventName('back', controller, eventPrefix);
        controller.isIdle = false;
        method(controller, 'back').call(controller, event);
        if (dispatchEvent) {
            const clickOutsideEvent = extendedEvent(eventName, event || null, { controller });
            controller.element.dispatchEvent(clickOutsideEvent);
        }
    };
    const onEvent = (event) => {
        if (isIdle)
            dispatchBack(event);
        isIdle = false;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            isIdle = true;
            dispatchAway(event);
        }, ms);
    };
    const onVisibility = (event) => {
        if (!document.hidden)
            onEvent(event);
    };
    if (isIdle) {
        dispatchAway();
    }
    else {
        dispatchBack();
    }
    const controllerDisconnect = controller.disconnect.bind(controller);
    const observe = () => {
        events.forEach(event => {
            window.addEventListener(event, onEvent);
        });
        document.addEventListener('visibilitychange', onVisibility);
    };
    const unobserve = () => {
        events.forEach(event => {
            window.removeEventListener(event, onEvent);
        });
        document.removeEventListener('visibilitychange', onVisibility);
    };
    Object.assign(controller, {
        disconnect() {
            unobserve();
            controllerDisconnect();
        },
    });
    observe();
    return [observe, unobserve];
};
//# sourceMappingURL=use-idle.js.map