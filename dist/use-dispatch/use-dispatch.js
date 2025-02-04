import { composeEventName } from '../support/index';
import { StimulusUse } from '../stimulus-use';
const defaultOptions = {
    eventPrefix: true,
    bubbles: true,
    cancelable: true,
};
export class UseDispatch extends StimulusUse {
    constructor(controller, options = {}) {
        var _a, _b, _c, _d;
        super(controller, options);
        this.dispatch = (eventName, detail = {}) => {
            const { controller, targetElement, eventPrefix, bubbles, cancelable, log } = this;
            // includes the emitting controller in the event detail
            Object.assign(detail, { controller });
            const eventNameWithPrefix = composeEventName(eventName, this.controller, eventPrefix);
            // creates the custom event
            const event = new CustomEvent(eventNameWithPrefix, {
                detail,
                bubbles,
                cancelable,
            });
            // dispatch the event from the given element or by default from the root element of the controller
            targetElement.dispatchEvent(event);
            log("dispatch", { eventName: eventNameWithPrefix, detail, bubbles, cancelable });
            return event;
        };
        this.targetElement = (_a = options.element) !== null && _a !== void 0 ? _a : controller.element;
        this.eventPrefix = (_b = options.eventPrefix) !== null && _b !== void 0 ? _b : defaultOptions.eventPrefix;
        this.bubbles = (_c = options.bubbles) !== null && _c !== void 0 ? _c : defaultOptions.bubbles;
        this.cancelable = (_d = options.cancelable) !== null && _d !== void 0 ? _d : defaultOptions.cancelable;
        this.enhanceController();
    }
    enhanceController() {
        Object.assign(this.controller, { dispatch: this.dispatch });
    }
}
export const useDispatch = (controller, options = {}) => {
    return new UseDispatch(controller, options);
};
//# sourceMappingURL=use-dispatch.js.map