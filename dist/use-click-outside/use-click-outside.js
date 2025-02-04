import { composeEventName, extendedEvent, isElementInViewport } from '../support/index';
const defaultOptions = {
    events: ['click', 'touchend'],
    onlyVisible: true,
    dispatchEvent: true,
    eventPrefix: true,
};
export const useClickOutside = (controller, options = {}) => {
    const { onlyVisible, dispatchEvent, events, eventPrefix } = Object.assign({}, defaultOptions, options);
    const onEvent = (event) => {
        const targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
        if (targetElement.contains(event.target) || (!isElementInViewport(targetElement) && onlyVisible)) {
            return;
        }
        // call the clickOutside method of the Stimulus controller
        if (controller.clickOutside) {
            controller.clickOutside(event);
        }
        // emit a custom event
        if (dispatchEvent) {
            const eventName = composeEventName('click:outside', controller, eventPrefix);
            const clickOutsideEvent = extendedEvent(eventName, event, { controller });
            targetElement.dispatchEvent(clickOutsideEvent);
        }
    };
    const observe = () => {
        events === null || events === void 0 ? void 0 : events.forEach(event => {
            window.addEventListener(event, onEvent, false);
        });
    };
    const unobserve = () => {
        events === null || events === void 0 ? void 0 : events.forEach(event => {
            window.removeEventListener(event, onEvent, false);
        });
    };
    // keep a copy of the current disconnect() function of the controller
    // to support composing several behaviors
    const controllerDisconnect = controller.disconnect.bind(controller);
    Object.assign(controller, {
        disconnect() {
            unobserve();
            controllerDisconnect();
        },
    });
    observe();
    return [observe, unobserve];
};
//# sourceMappingURL=use-click-outside.js.map