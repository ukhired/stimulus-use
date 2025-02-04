import { method, extendedEvent, composeEventName } from '../support/index';
const defaultOptions = {
    dispatchEvent: true,
    eventPrefix: true,
};
export const useIntersection = (controller, options = {}) => {
    const { dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options);
    const targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
    const callback = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            dispatchAppear(entry);
        }
        else if (controller.isVisible) {
            dispatchDisappear(entry);
        }
    };
    const dispatchAppear = (entry) => {
        controller.isVisible = true;
        method(controller, 'appear').call(controller, entry);
        // emit a custom "appear" event
        if (dispatchEvent) {
            const eventName = composeEventName('appear', controller, eventPrefix);
            const appearEvent = extendedEvent(eventName, null, { controller, entry });
            targetElement.dispatchEvent(appearEvent);
        }
    };
    const dispatchDisappear = (entry) => {
        controller.isVisible = false;
        method(controller, 'disappear').call(controller, entry);
        // emit a custom "disappear" event
        if (dispatchEvent) {
            const eventName = composeEventName('disappear', controller, eventPrefix);
            const disappearEvent = extendedEvent(eventName, null, { controller, entry });
            targetElement.dispatchEvent(disappearEvent);
        }
    };
    // keep a copy of the current disconnect() function of the controller
    // to support composing several behaviors
    const controllerDisconnect = controller.disconnect.bind(controller);
    const observer = new IntersectionObserver(callback, options);
    const observe = () => {
        observer.observe(targetElement);
    };
    const unobserve = () => {
        observer.unobserve(targetElement);
    };
    Object.assign(controller, {
        isVisible: false,
        disconnect() {
            unobserve();
            controllerDisconnect();
        },
    });
    observe();
    return [observe, unobserve];
};
//# sourceMappingURL=use-intersection.js.map