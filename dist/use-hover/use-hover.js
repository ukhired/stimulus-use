import { StimulusUse } from '../stimulus-use';
export class UseHover extends StimulusUse {
    constructor(controller, options = {}) {
        super(controller, options);
        this.observe = () => {
            this.targetElement.addEventListener('mouseenter', this.onEnter);
            this.targetElement.addEventListener('mouseleave', this.onLeave);
        };
        this.unobserve = () => {
            this.targetElement.removeEventListener('mouseenter', this.onEnter);
            this.targetElement.removeEventListener('mouseleave', this.onLeave);
        };
        this.onEnter = (event) => {
            this.call("mouseEnter", event);
            this.log('mouseEnter', { hover: true });
            this.dispatch('mouseEnter', { hover: false });
        };
        this.onLeave = (event) => {
            this.call("mouseLeave", event);
            this.log('mouseLeave', { hover: false });
            this.dispatch('mouseLeave', { hover: false });
        };
        this.controller = controller;
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
export const useHover = (controller, options = {}) => {
    const observer = new UseHover(controller, options);
    return [observer.observe, observer.unobserve];
};
//# sourceMappingURL=use-hover.js.map