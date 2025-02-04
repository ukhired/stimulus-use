const defaultOptions = {
    debug: false,
    logger: console,
    dispatchEvent: true,
    eventPrefix: true,
};
export class StimulusUse {
    constructor(controller, options = {}) {
        var _a, _b, _c;
        this.log = (functionName, args) => {
            if (!this.debug)
                return;
            this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${functionName}`, 'color: #3B82F6', 'color: unset');
            this.logger.log({
                controllerId: this.controllerId,
                ...args
            });
            this.logger.groupEnd();
        };
        this.dispatch = (eventName, details = {}) => {
            if (this.dispatchEvent) {
                const { event, ...eventDetails } = details;
                const customEvent = this.extendedEvent(eventName, event || null, eventDetails);
                this.targetElement.dispatchEvent(customEvent);
                this.log('dispatchEvent', { eventName: customEvent.type, ...eventDetails });
            }
        };
        this.call = (methodName, args = {}) => {
            const method = this.controller[methodName];
            if (typeof method == 'function') {
                return method.call(this.controller, args);
            }
        };
        this.extendedEvent = (name, event, detail) => {
            const { bubbles, cancelable, composed } = event || { bubbles: true, cancelable: true, composed: true };
            if (event) {
                Object.assign(detail, { originalEvent: event });
            }
            const customEvent = new CustomEvent(this.composeEventName(name), {
                bubbles,
                cancelable,
                composed,
                detail,
            });
            return customEvent;
        };
        this.composeEventName = (name) => {
            let composedName = name;
            if (this.eventPrefix === true) {
                composedName = `${this.controller.identifier}:${name}`;
            }
            else if (typeof this.eventPrefix === 'string') {
                composedName = `${this.eventPrefix}:${name}`;
            }
            return composedName;
        };
        this.debug = (_b = (_a = options === null || options === void 0 ? void 0 : options.debug) !== null && _a !== void 0 ? _a : controller.application.stimulusUseDebug) !== null && _b !== void 0 ? _b : defaultOptions.debug;
        this.logger = (_c = options === null || options === void 0 ? void 0 : options.logger) !== null && _c !== void 0 ? _c : defaultOptions.logger;
        this.controller = controller;
        this.controllerId = controller.element.id || controller.element.dataset.id;
        this.targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
        const { dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options);
        Object.assign(this, { dispatchEvent, eventPrefix });
        // make copies of lifecycle functions
        this.controllerInitialize = controller.initialize.bind(controller);
        this.controllerConnect = controller.connect.bind(controller);
        this.controllerDisconnect = controller.disconnect.bind(controller);
    }
}
//# sourceMappingURL=stimulus-use.js.map