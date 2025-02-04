import { composeEventName, extendedEvent, method } from '../support/index';
const defaultOptions = {
    dispatchEvent: true,
    eventPrefix: true,
};
export const useResize = (controller, options = {}) => {
    const { dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options);
    const targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
    const callback = (entries) => {
        const [entry] = entries;
        method(controller, 'resize').call(controller, entry.contentRect);
        // emit a custom "controllerIdentifier:resize" event
        if (dispatchEvent) {
            const eventName = composeEventName('resize', controller, eventPrefix);
            const appearEvent = extendedEvent(eventName, null, {
                controller,
                entry,
            });
            targetElement.dispatchEvent(appearEvent);
        }
    };
    const controllerDisconnect = controller.disconnect.bind(controller);
    const observer = new ResizeObserver(callback);
    const observe = () => {
        observer.observe(targetElement);
    };
    const unobserve = () => {
        observer.unobserve(targetElement);
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
//# sourceMappingURL=use-resize.js.map