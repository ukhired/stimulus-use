import { StimulusUse } from '../stimulus-use';
export class UseMutation extends StimulusUse {
    constructor(controller, options = {}) {
        super(controller, options);
        this.observe = () => {
            try {
                this.observer.observe(this.targetElement, this.options);
            }
            catch (error) {
                this.controller.application.handleError(error, "At a minimum, one of childList, attributes, and/or characterData must be true", {});
            }
        };
        this.unobserve = () => {
            this.observer.disconnect();
        };
        this.mutation = (entries) => {
            this.call('mutate', entries);
            this.log('mutate', { entries });
            this.dispatch("mutate", { entries });
        };
        this.targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
        this.controller = controller;
        this.options = options;
        this.observer = new MutationObserver(this.mutation);
        this.enhanceController();
        this.observe();
    }
    enhanceController() {
        const controllerDisconnect = this.controller.disconnect.bind(this.controller);
        const disconnect = () => {
            this.unobserve();
            controllerDisconnect();
        };
        Object.assign(this.controller, { disconnect });
    }
}
export const useMutation = (controller, options = {}) => {
    const observer = new UseMutation(controller, options);
    return [observer.observe, observer.unobserve];
};
//# sourceMappingURL=use-mutation.js.map