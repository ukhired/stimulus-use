import { Controller } from 'stimulus';
import { useTransition } from './use-transition';
export class TransitionComposableController extends Controller {
    constructor() {
        super(...arguments);
        this.transitioned = false;
    }
}
export class TransitionController extends TransitionComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            useTransition(this, this.options);
        });
    }
}
//# sourceMappingURL=transition-controller.js.map